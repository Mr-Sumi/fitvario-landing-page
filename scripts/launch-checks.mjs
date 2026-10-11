// Run after `next build`:  node scripts/launch-checks.mjs
// Conversion audit, crawl hygiene and bundle-security checks that seo-check does not cover.
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, ".next", "server", "app");
const staticDir = join(root, ".next", "static");
if (!existsSync(appDir)) {
  console.error("No build output. Run `npm run build` first.");
  process.exit(1);
}

const failures = [];
const placeholders = [];
const warnings = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

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

let indexable = 0;
for (const [path, file] of walk(appDir)) {
  const html = readFileSync(file, "utf8");
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);

  // ---- crawl hygiene (all pages) ----
  for (const m of html.matchAll(/\s(?:src|href)="(http:\/\/[^"]+)"/g)) {
    // http:// to a stylesheet, script or image is mixed content; a plain outbound link is only a warning
    const tag = html.slice(Math.max(0, m.index - 40), m.index + 5);
    if (/<(script|img|link|iframe|source)\b/i.test(tag)) fail(path, `mixed content: ${m[1]}`);
    else warn(path, `insecure outbound link ${m[1]}`);
  }
  for (const m of html.matchAll(/<a\b[^>]*\shref="(\/[^"#?]*\/)(?:[#?][^"]*)?"/g)) {
    if (m[1] !== "/") fail(path, `internal link with trailing slash: ${m[1]}`);
  }
  if (/href="https?:\/\/(www\.)?fitvario\.com\/?["#]/.test(html) && /href="https:\/\/fitvario\.com/.test(html)) {
    fail(path, "link to the apex host (canonical host is www)");
  }

  if (noindex) continue;
  indexable++;

  // ---- placeholders: nothing ships with a placeholder on a page search engines can index ----
  for (const m of html.matchAll(/data-placeholder="([^"]*)"/g)) {
    placeholders.push(`${path}  (${m[1]})`);
  }

  // ---- conversion audit (public pages) ----
  const hasDemo = /href="\/contact#demo"/.test(html) || path === "/contact";
  if (!hasDemo) fail(path, "no demo call-to-action link");
  if (!/data-cta="action-bar"/.test(html) && path !== "/thank-you") fail(path, "mobile action bar missing");
  const ctaCount = (html.match(/href="\/contact#demo"/g) ?? []).length;
  if (path !== "/contact" && ctaCount < 2) warn(path, `only ${ctaCount} demo CTA link(s); aim for a mid-page and an end CTA`);
}

// ---- form + thank-you ----
const contact = readFileSync(join(appDir, "contact.html"), "utf8");
if (!/<form[^>]*aria-label="Request a demo"/.test(contact)) fail("/contact", "demo form not found");
if (!/name="robots" content="noindex/.test(readFileSync(join(appDir, "thank-you.html"), "utf8"))) fail("/thank-you", "not noindex");
const leadRoute = join(root, "src", "app", "api", "lead", "route.ts");
const lead = existsSync(leadRoute) ? readFileSync(leadRoute, "utf8") : "";
for (const needle of ["not_configured", "too_fast", "website", "verifyTurnstile", "tooMany"]) {
  if (!lead.includes(needle)) fail("/api/lead", `missing safeguard: ${needle}`);
}

// ---- bundle security ----
function filesIn(d) {
  let out = [];
  if (!existsSync(d)) return out;
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) out = out.concat(filesIn(p));
    else out.push(p);
  }
  return out;
}
const staticFiles = filesIn(staticDir);
const maps = staticFiles.filter((f) => f.endsWith(".map"));
if (maps.length) fail("bundle", `${maps.length} source map file(s) are exposed in .next/static`);

const secretNeedles = ["TURNSTILE_SECRET_KEY", "SMTP_PASS", "LEAD_WEBHOOK_URL", "SMTP_USER", "BEGIN PRIVATE KEY"];
for (const f of staticFiles.filter((x) => /\.(js|css|html|json)$/.test(x))) {
  const t = readFileSync(f, "utf8");
  for (const n of secretNeedles) if (t.includes(n)) fail("bundle", `${n} found in ${f.split(".next")[1]}`);
}

// ---- security headers configured ----
const cfg = readFileSync(join(root, "next.config.ts"), "utf8");
for (const h of ["Strict-Transport-Security", "X-Content-Type-Options", "Referrer-Policy"]) {
  if (!cfg.includes(h)) fail("next.config.ts", `header ${h} not configured`);
}

if (placeholders.length) {
  fail("placeholders", `${placeholders.length} placeholder(s) on indexable pages. Add the real screenshots (docs/seo/screens, then node scripts/process-screens.mjs) or unpublish the page:`);
  for (const p of placeholders) failures.push(`    - ${p}`);
}

// Screens the site is ready to show once real screenshots exist (frames render nothing until then)
{
  const scr = readFileSync(join(root, "src", "config", "screens.ts"), "utf8");
  const man = JSON.parse(readFileSync(join(root, "public", "screens", "manifest.json"), "utf8"));
  const missing = [...scr.matchAll(/\{ n: (\d+), id: "([^"]+)"[^}]*usedOn: \[([^\]]*)\]/g)]
    .filter((m) => !man[m[2]])
    .map((m) => `${String(m[1]).padStart(2, "0")} ${m[2]} (${m[3].replace(/"/g, "")})`);
  if (missing.length) warn("screenshots", `${missing.length} still to supply, frames are hidden until then: ${missing.join("; ")}`);
}

console.log(`Checked ${indexable} public pages for conversion, ${staticFiles.length} static files for leaks.`);
for (const w of warnings) console.log(`WARN  ${w}`);
if (failures.length) {
  for (const f of failures) console.log(`FAIL  ${f}`);
  console.log(`\n${failures.length} failure(s).`);
  process.exit(1);
}
console.log("All launch checks passed.");
