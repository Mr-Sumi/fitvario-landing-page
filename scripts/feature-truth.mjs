// Run after `next build`:  node scripts/feature-truth.mjs
// Feature-truth audit: looks at the visible text of every PUBLIC page and flags wording that claims a
// capability whose flag in docs/seo/feature-status.json is not live. FAIL patterns exit 1; REVIEW patterns
// are printed for a human to read in context (they are often fine, for example advice to a gym owner).
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, ".next", "server", "app");
if (!existsSync(appDir)) {
  console.error("No build output. Run `npm run build` first.");
  process.exit(1);
}
const status = JSON.parse(readFileSync(join(root, "docs", "seo", "feature-status.json"), "utf8")).features;
const live = (k) => ["live", "live-per-site"].includes(status[k]?.status);

// [flag, regex, label]. A pattern only applies while its flag is NOT live.
const FAIL = [
  ["workout_diet_plans", /\bFitvario[^.]{0,80}\b(workout|diet) plans?\b/i, "Fitvario workout/diet plans"],
  ["ecommerce_cart_orders", /\b(online store|product listings?|shopping cart|store orders?)\b/i, "online store, cart or orders"],
  ["class_scheduling_booking", /\bclass (scheduling|booking)\b|\bbook (a )?class\b/i, "class scheduling or booking"],
  ["owner_web_dashboard", /\b(web dashboard|web panel|staff portal|owner dashboard|control panel)\b/i, "web dashboard or staff portal"],
  ["report_export_excel_pdf", /\bexport(s|ed)?\b[^.]{0,40}\b(excel|pdf)\b|\b(excel|pdf) export\b/i, "Excel/PDF export"],
  ["passwordless_otp_only_login", /\bpasswordless\b|\bno password\b/i, "passwordless login"],
  ["due_payment_reminders", /\bautomat\w+[^.]{0,50}\b(due|payment|fee)s?\b[^.]{0,25}reminder/i, "automated due-payment reminders"],
  ["whatsapp_business_api_banned", /whatsapp business api/i, 'banned phrase "WhatsApp Business API"'],
  ["dropped_keyword", /\b(free|cheap) gym software\b/i, "dropped keyword"],
];

const REVIEW = [
  ["gst_tax_lines", /\bGST (invoic|billing|bill)/i, "GST invoicing/billing mentioned"],
  ["biometric_adms", /\bbiometric\b/i, "biometric mentioned"],
  ["white_label", /\bwhite[- ]label\b/i, "white-label mentioned"],
  ["whatsapp_expiry_reminders", /\b(renewal|expiry|expiring) reminders?\b/i, "renewal/expiry reminders mentioned"],
];

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function walk(d, base = "") {
  let out = [];
  for (const e of readdirSync(d, { withFileTypes: true })) {
    if (e.isDirectory()) out = out.concat(walk(join(d, e.name), `${base}/${e.name}`));
    else if (e.name.endsWith(".html") && !e.name.startsWith("_")) {
      const n = e.name.slice(0, -5);
      out.push([n === "index" ? base || "/" : `${base}/${n}`, join(d, e.name)]);
    }
  }
  return out;
}

const LEGAL = new Set(["/privacy", "/terms", "/refund", "/cookies", "/grievance", "/delete-account"]);
let fails = 0;
let reviews = 0;
let legal = 0;
let scanned = 0;

for (const [path, file] of walk(appDir)) {
  const html = readFileSync(file, "utf8");
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue; // drafts are not public
  scanned++;
  const main = (html.match(/<main id="main"[^>]*>([\s\S]*?)<\/main>/) ?? [])[1] ?? "";
  const text = decode(
    main.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ")
  ).replace(/\s+/g, " ");
  const where = LEGAL.has(path) ? "[legal] " : "";

  for (const [flag, re, label] of FAIL) {
    if (flag !== "whatsapp_business_api_banned" && flag !== "dropped_keyword" && live(flag)) continue;
    const m = text.match(new RegExp(`.{0,60}(${re.source}).{0,60}`, "i"));
    if (m && LEGAL.has(path)) {
      // Legal text is the owner's call and is listed in TODO_FOR_SUMIT.md, so it is reported without failing
      legal++;
      console.log(`LEGAL   ${path}  ${label}: ...${m[0].trim()}...`);
    } else if (m) {
      fails++;
      console.log(`FAIL    ${where}${path}  ${label}: ...${m[0].trim()}...`);
    }
  }
  for (const [flag, re, label] of REVIEW) {
    if (live(flag)) continue;
    const m = text.match(new RegExp(`.{0,60}(${re.source}).{0,60}`, "i"));
    if (m) {
      reviews++;
      console.log(`REVIEW  ${where}${path}  ${label}: ...${m[0].trim()}...`);
    }
  }
}

console.log(`\nScanned ${scanned} public pages. ${fails} failing claim(s), ${legal} in legal text (owner to review), ${reviews} to review.`);
if (fails) process.exit(1);
