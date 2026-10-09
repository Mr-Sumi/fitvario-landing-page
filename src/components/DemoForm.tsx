"use client";

import { useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { contact, turnstileSiteKey, whatsappLink } from "@/config/site";
import { CURRENT_METHODS, MEMBER_RANGES, validateLead, type FieldErrors, type LeadInput } from "@/lib/lead";
import { readAttribution } from "@/lib/attribution";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

const empty: LeadInput = {
  name: "",
  gymName: "",
  city: "",
  members: "",
  mobile: "",
  email: "",
  currentMethod: "",
  consent: false,
};

const inputCls =
  "mt-1.5 block h-12 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/30";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-800">
        {label}
        {optional && <span className="font-normal text-slate-500"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[13px] text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function DemoForm({ variant = "demo" }: { variant?: "demo" | "quote" }) {
  const router = useRouter();
  const pathname = usePathname();
  const [values, setValues] = useState<LeadInput>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [honeypot, setHoney] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "failed" | "retry">("idle");
  const [shownAt] = useState(() => Date.now());
  const tsBox = useRef<HTMLDivElement>(null);
  const tsToken = useRef("");
  const tsLoaded = useRef(false);

  const set = <K extends keyof LeadInput>(k: K, v: LeadInput[K]) => setValues((s) => ({ ...s, [k]: v }));

  // Turnstile is loaded the first time someone touches the form, not on page load
  function loadTurnstile() {
    if (!turnstileSiteKey || tsLoaded.current) return;
    tsLoaded.current = true;
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => {
      if (tsBox.current && window.turnstile) {
        window.turnstile.render(tsBox.current, {
          sitekey: turnstileSiteKey,
          callback: (t: string) => {
            tsToken.current = t;
          },
          "expired-callback": () => {
            tsToken.current = "";
          },
        });
      }
    };
    document.head.appendChild(s);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateLead(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const firstKey = Object.keys(found)[0];
      document.getElementById(`${variant}-${firstKey}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypot,
          t: shownAt,
          turnstileToken: tsToken.current,
          attribution: readAttribution(),
          page: pathname,
          variant,
        }),
      });
      if (res.ok) {
        try {
          sessionStorage.setItem("fv_lead_ok", "1");
        } catch {
          // thank-you page will just skip the conversion event
        }
        router.push("/thank-you");
        return;
      }
      const j = (await res.json().catch(() => ({}))) as { error?: string; fields?: FieldErrors };
      if (j.fields) setErrors(j.fields);
      setStatus(j.error === "too_fast" || j.error === "captcha_failed" || j.error === "invalid" ? "retry" : "failed");
      if (window.turnstile && tsToken.current) {
        window.turnstile.reset();
        tsToken.current = "";
      }
    } catch {
      setStatus("failed");
    }
  }

  const wa = whatsappLink("Hi Fitvario, I tried the demo form but it did not go through. I'd like a demo.");
  const errAttr = (k: keyof LeadInput) =>
    errors[k] ? { "aria-invalid": true, "aria-describedby": `${variant}-${k}-error` } : {};

  return (
    <form
      onSubmit={onSubmit}
      onFocus={loadTurnstile}
      noValidate
      className="space-y-4"
      aria-label={variant === "quote" ? "Request a quote" : "Request a demo"}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${variant}-name`} label="Your name" error={errors.name}>
          <input id={`${variant}-name`} className={inputCls} autoComplete="name" value={values.name}
            onChange={(e) => set("name", e.target.value)} {...errAttr("name")} />
        </Field>
        <Field id={`${variant}-gymName`} label="Gym name" error={errors.gymName}>
          <input id={`${variant}-gymName`} className={inputCls} autoComplete="organization" value={values.gymName}
            onChange={(e) => set("gymName", e.target.value)} {...errAttr("gymName")} />
        </Field>
        <Field id={`${variant}-city`} label="City" error={errors.city}>
          <input id={`${variant}-city`} className={inputCls} autoComplete="address-level2" value={values.city}
            onChange={(e) => set("city", e.target.value)} {...errAttr("city")} />
        </Field>
        <Field id={`${variant}-members`} label="Number of members" error={errors.members}>
          <select id={`${variant}-members`} className={inputCls} value={values.members}
            onChange={(e) => set("members", e.target.value)} {...errAttr("members")}>
            <option value="">Select</option>
            {MEMBER_RANGES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </Field>
        <Field id={`${variant}-mobile`} label="Mobile number" error={errors.mobile}>
          <input id={`${variant}-mobile`} className={inputCls} type="tel" inputMode="numeric" autoComplete="tel-national"
            placeholder="10-digit number" value={values.mobile}
            onChange={(e) => set("mobile", e.target.value)} {...errAttr("mobile")} />
        </Field>
        <Field id={`${variant}-email`} label="Email" optional error={errors.email}>
          <input id={`${variant}-email`} className={inputCls} type="email" autoComplete="email" value={values.email}
            onChange={(e) => set("email", e.target.value)} {...errAttr("email")} />
        </Field>
      </div>

      <Field id={`${variant}-currentMethod`} label="How do you manage your gym today?" error={errors.currentMethod}>
        <select id={`${variant}-currentMethod`} className={inputCls} value={values.currentMethod}
          onChange={(e) => set("currentMethod", e.target.value)} {...errAttr("currentMethod")}>
          <option value="">Select</option>
          {CURRENT_METHODS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </Field>

      {/* Honeypot: hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoney(e.target.value)} />
        </label>
      </div>

      {turnstileSiteKey && <div ref={tsBox} className="min-h-[65px]" />}

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
          <input
            id={`${variant}-consent`}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 text-teal-600 focus:ring-teal-600"
            {...errAttr("consent")}
          />
          <span>
            I agree that Fitvario may contact me on this number (and email, if given) about{" "}
            {variant === "quote" ? "a quote" : "a demo"}. See the{" "}
            <a href="/privacy" className="font-medium text-teal-700 underline underline-offset-2">Privacy Policy</a>.
          </span>
        </label>
        {errors.consent && <p id={`${variant}-consent-error`} className="mt-1 text-[13px] text-rose-600">{errors.consent}</p>}
      </div>

      <div aria-live="polite" className="text-sm">
        {status === "retry" && (
          <p className="rounded-lg bg-amber-50 p-3 text-amber-900">
            That didn&apos;t go through. Please check the fields and press the button again.
          </p>
        )}
        {status === "failed" && (
          <p className="rounded-lg bg-rose-50 p-3 text-rose-900">
            We couldn&apos;t send your request just now, and it was not saved. Please{" "}
            {wa && (
              <>
                <a href={wa} className="font-semibold underline" target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>{" "}
                or{" "}
              </>
            )}
            email <a href={`mailto:${contact.email}`} className="font-semibold underline">{contact.email}</a>.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        data-cta={`${variant}-form`}
        className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-teal-600 px-6 text-sm font-bold text-white transition hover:bg-teal-700 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending..." : variant === "quote" ? "Request a quote" : "Request a free demo"}
      </button>
    </form>
  );
}
