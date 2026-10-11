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
    // A statement that the product does NOT do something is honest copy, so a negation just before the match is skipped.
    // The banned phrase and dropped keywords are never excused this way.
    const never = flag === "whatsapp_business_api_banned" || flag === "dropped_keyword";
    const all = [...text.matchAll(new RegExp(`.{0,60}(${re.source}).{0,60}`, "gi"))];
    const m = all.find((x) => {
      if (never) return true;
      const before = x[0].slice(0, x[0].toLowerCase().indexOf(x[1].toLowerCase()));
      return !/\b(no|not|without|never|cannot|can't|doesn't|don't|isn't|neither|nor)\b[^.]{0,40}$/i.test(before);
    });
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

// ---- White-label promise check ----------------------------------------------------------------------------
// The owner-approved wording (code-verified against the app, 2026-10-11): a gym's app name and logo show on the
// splash screen, the owner home screen and the member dashboard ONLY. The Android app label, launcher icon,
// colours and store listing stay Fitvario's. Any sentence that promises more fails the build.
// It scans every built page including drafts, the visible body, the meta tags and the JSON-LD descriptions,
// so a draft cannot be published later with an overpromise. Questions ("...?") and negated sentences are skipped.
const SURFACES = /\b(splash|opening screen|opening and home|home screens?|dashboard)\b/i;
const NEGATED = /\b(not|no|never|isn't|aren't|doesn't|without|stay|stays|neither|nor|cannot|can't)\b/i;
const WL_RULES = [
  [/\b(gym-)?branded (gym |android |member )?app\b/i, "promises a branded app"],
  [/\byour (own )?brand\b/i, "promises \"your brand\""],
  [/\byour (own )?app\b(?! name)/i, "promises \"your app\""],
  [/\bown (app|branding|brand|store listing|app icon|colou?rs?|play store)\b/i, "promises an own app, brand, icon or listing"],
  [/\b(custom|separate) app (published )?(under|in) your\b/i, "promises an app in your name"],
  [/\b(app icon|launcher icon|colou?rs?|colou?r themes?|themes?)\b[^.]{0,60}\b(your|gym'?s?|owner'?s?)\b|\b(your|gym'?s?|owner'?s?)\b[^.]{0,60}\b(app icon|launcher icon|colou?rs?|colou?r themes?|themes?)\b/i, "promises icon, colours or theme"],
  [/\bstaff\b[^.]{0,80}\b(name and logo|branding)\b|\b(name and logo|branding)\b[^.]{0,80}\bstaff\b/i, "says staff see the branding"],
];

let wlFails = 0;
let wlScanned = 0;
for (const [path, file] of walk(appDir)) {
  const html = readFileSync(file, "utf8");
  wlScanned++;
  const body = (html.match(/<body[\s\S]*<\/body>/) ?? [html])[0];
  // Block-level closing tags become sentence breaks, so list items, headings and nav links are judged on their own
  const visible = decode(
    body
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<\/(p|li|h[1-6]|dd|dt|td|th|div|section|header|footer|nav|button|a|span|strong)>/g, ". ")
      .replace(/<[^>]+>/g, " ")
  ).replace(/\s+/g, " ");
  const metas = [...html.matchAll(/<meta[^>]+(?:name|property)="(?:description|og:description|og:title|twitter:description)"[^>]+content="([^"]*)"/g)]
    .map((m) => decode(m[1]));
  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap((m) => [...m[1].matchAll(/"description":"((?:\\.|[^"\\])*)"/g)].map((d) => d[1]));
  const sentences = [visible, ...metas, ...ld]
    .flatMap((t) => t.split(/(?<=[.!?])\s+/))
    .map((s) => s.trim())
    .filter(Boolean);

  const seen = new Set();
  for (const s of sentences) {
    if (/\?\.?$/.test(s) || seen.has(s)) continue;
    seen.add(s);
    // Row labels in a comparison table name the competitor's feature ("Branded app"); Fitvario's cell is judged separately
    if (path.startsWith("/compare/") && s.split(/\s+/).length < 5) continue;
    if (NEGATED.test(s)) continue;
    // Describing what a competitor sells ("add-ons such as a branded app") is not a Fitvario promise
    if (/\b(Mindbody|GymMaster|Okfit|Easy Gym|GymSmart|competitor|add-ons? such as)\b/i.test(s)) continue;
    for (const [re, label] of WL_RULES) {
      if (re.test(s)) {
        wlFails++;
        console.log(`FAIL    ${path}  white-label ${label}: ...${s.slice(0, 170)}`);
      }
    }
    // A sentence that says the name and logo show or appear somewhere must name only the allowed surfaces.
    if (/\bname and logo\b/i.test(s) && /\b(show|shows|see|appear|appears|display|displayed)\b/i.test(s) && !SURFACES.test(s)) {
      wlFails++;
      console.log(`FAIL    ${path}  white-label names no allowed surface (splash, owner home, member dashboard): ...${s.slice(0, 170)}`);
    }
  }
}
fails += wlFails;
console.log(`White-label check: ${wlScanned} built pages (drafts included), ${wlFails} promise(s) beyond splash screen, owner home and member dashboard.`);

console.log(`\nScanned ${scanned} public pages. ${fails} failing claim(s), ${legal} in legal text (owner to review), ${reviews} to review.`);
if (fails) process.exit(1);
