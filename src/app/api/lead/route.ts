import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { normaliseMobile, validateLead, type LeadInput } from "@/lib/lead";

export const runtime = "nodejs";

const MIN_FILL_MS = 2000;
const RATE_LIMIT = 5; // per IP per hour
const hits = new Map<string, number[]>();

// In-memory, so it's per server instance. It stops casual repeat posts; Turnstile does the heavy lifting.
function tooMany(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

interface Body extends LeadInput {
  website?: string; // honeypot
  t?: number; // when the form was rendered
  turnstileToken?: string;
  attribution?: Record<string, string>;
  page?: string;
  variant?: "demo" | "quote";
}

const clip = (s: unknown, n: number) => String(s ?? "").trim().slice(0, n);

async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured yet
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(6000),
    });
    const j = (await res.json()) as { success?: boolean };
    return j.success === true;
  } catch {
    return false;
  }
}

// The Fitvario backend stores the lead as an enquiry that shows up in the admin dashboard's Enquiries screen.
// Server to server only: the key never reaches a browser.
async function sendToBackend(lead: Record<string, string>, input: LeadInput, attribution: Record<string, string>, ip: string): Promise<boolean> {
  const url = process.env.LEAD_BACKEND_URL;
  const key = process.env.LEAD_BACKEND_KEY;
  if (!url || !key) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Lead-Key": key, "X-Forwarded-For": ip },
      body: JSON.stringify({
        name: input.name,
        gym_name: input.gymName,
        city: input.city,
        members: input.members,
        mobile: lead.mobile,
        email: input.email,
        current_method: input.currentMethod,
        variant: lead.variant,
        page: lead.page,
        consent: true,
        attribution,
      }),
      signal: AbortSignal.timeout(8000),
    });
    // 201 stored, 200 duplicate of a lead already stored in the last day
    return res.status === 201 || res.status === 200;
  } catch {
    return false;
  }
}

async function sendWebhook(payload: Record<string, unknown>): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendEmail(lead: Record<string, string>, subject: string): Promise<boolean> {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return false;
  const port = Number(process.env.SMTP_PORT ?? 587);
  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    const text = Object.entries(lead)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    await transport.sendMail({
      from: process.env.LEAD_EMAIL_FROM ?? SMTP_USER,
      to: process.env.LEAD_EMAIL_TO ?? "support@fitvario.com",
      replyTo: lead.email || undefined,
      subject,
      text,
    });
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Bots fill the hidden field, so they get a quiet "ok". An instant post gets a retryable error instead of a
  // silent drop, in case a real person's autofill was just very fast.
  if (body.website) return NextResponse.json({ ok: true });
  if (typeof body.t !== "number" || Date.now() - body.t < MIN_FILL_MS) {
    return NextResponse.json({ error: "too_fast" }, { status: 400 });
  }

  if (tooMany(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const input: LeadInput = {
    name: clip(body.name, 100),
    gymName: clip(body.gymName, 150),
    city: clip(body.city, 80),
    members: clip(body.members, 40),
    mobile: clip(body.mobile, 20),
    email: clip(body.email, 150),
    currentMethod: clip(body.currentMethod, 40),
    consent: body.consent === true,
  };
  const errors = validateLead(input);
  if (Object.keys(errors).length) return NextResponse.json({ error: "invalid", fields: errors }, { status: 400 });

  if (!(await verifyTurnstile(body.turnstileToken, ip))) {
    return NextResponse.json({ error: "captcha_failed" }, { status: 400 });
  }

  const attribution = Object.fromEntries(
    Object.entries(body.attribution ?? {}).map(([k, v]) => [clip(k, 30), clip(v, 300)])
  );
  const lead = {
    receivedAt: new Date().toISOString(),
    variant: body.variant === "quote" ? "quote" : "demo",
    page: clip(body.page, 200),
    name: input.name,
    gymName: input.gymName,
    city: input.city,
    members: input.members,
    mobile: normaliseMobile(input.mobile) as string,
    email: input.email,
    currentMethod: input.currentMethod,
    consentToContact: "yes",
    ...attribution,
  };

  const backendConfigured = !!(process.env.LEAD_BACKEND_URL && process.env.LEAD_BACKEND_KEY);
  const webhookConfigured = !!process.env.LEAD_WEBHOOK_URL;
  const emailConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

  if (!backendConfigured && !webhookConfigured && !emailConfigured) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[lead] no delivery configured, dev mode. Lead received for", lead.gymName, lead.city);
      return NextResponse.json({ ok: true, dev: true });
    }
    // Never pretend a lead was saved when nothing can save it
    console.error("[lead] LEAD_BACKEND_URL, LEAD_WEBHOOK_URL and SMTP_* are all unset; lead was NOT stored");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const subject = `New ${lead.variant === "quote" ? "quote" : "demo"} request: ${lead.gymName}, ${lead.city}`;
  const [stored, hook, mail] = await Promise.all([
    sendToBackend(lead, input, attribution, ip),
    sendWebhook(lead),
    sendEmail(lead, subject),
  ]);

  if (!stored && !hook && !mail) {
    console.error("[lead] every configured delivery channel failed");
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
  if (backendConfigured && !stored) console.error("[lead] backend did not store the lead; check LEAD_BACKEND_URL and the key");
  if (webhookConfigured && !hook) console.error("[lead] webhook failed");
  if (emailConfigured && !mail) console.error("[lead] email failed");

  return NextResponse.json({ ok: true });
}
