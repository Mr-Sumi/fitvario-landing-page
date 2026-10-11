// Run after `next build`:  node scripts/keyword-coverage.mjs
// Checks that every non-dropped keyword of every PUBLISHED page appears on it (title, H1, an H2 or the body, FAQs
// included). DROPPED keywords are skipped and reported separately. Exits 1 on a missing keyword or on a dropped
// keyword still present on a published page.
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseMap } from "./lib/keyword-map.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, ".next", "server", "app");
if (!existsSync(appDir)) {
  console.error("No build output. Run `npm run build` first.");
  process.exit(1);
}

const entries = parseMap(readFileSync(join(root, "docs", "seo", "keyword-map.md"), "utf8"));

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const textOf = (h) =>
  decode(h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .toLowerCase();

function loadPage(path) {
  const rel = path === "/" ? "index.html" : `${path.replace(/^\//, "").replace(/\/$/, "")}.html`;
  const f = join(appDir, rel);
  if (!existsSync(f)) return null;
  const html = readFileSync(f, "utf8");
  const robots = (html.match(/<meta name="robots" content="([^"]*)"/) ?? [])[1] ?? "";
  if (/noindex/.test(robots)) return { noindex: true };
  const main = (html.match(/<main id="main"[^>]*>([\s\S]*?)<\/main>/) ?? [])[1] ?? "";
  const h2s = [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => textOf(m[1])).join(" | ");
  return {
    title: textOf((html.match(/<title>([^<]*)/) ?? [])[1] ?? ""),
    h1: textOf((main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) ?? [])[1] ?? ""),
    h2s,
    body: textOf(main),
  };
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// "gym crm software india" also matches "gym crm software in india"
const looseRe = (kw) =>
  new RegExp(kw.split(/\s+/).map(esc).join("(?:\\s+(?:in|for|of|the|a|to))?\\s+"), "i");

function locate(page, kw) {
  const k = kw.toLowerCase();
  const exact = [];
  if (page.title.includes(k)) exact.push("title");
  if (page.h1.includes(k)) exact.push("h1");
  if (page.h2s.includes(k)) exact.push("h2");
  if (page.body.includes(k)) exact.push("body");
  if (exact.length) return { status: "covered", where: exact.join(", ") };
  const re = looseRe(k);
  const loose = [];
  if (re.test(page.title)) loose.push("title");
  if (re.test(page.h1)) loose.push("h1");
  if (re.test(page.h2s)) loose.push("h2");
  if (re.test(page.body)) loose.push("body");
  if (loose.length) return { status: "variant", where: loose.join(", ") };
  return { status: "MISSING", where: "" };
}

const rows = [];
const dropped = [];
let missing = 0;
let droppedFound = 0;
const publishedPages = [];

for (const e of entries) {
  const kws = [e.primary, ...e.secondary].filter(Boolean);
  const isPattern = e.path.includes("[");
  const page = isPattern ? null : loadPage(e.path);
  const published = !!page && !page.noindex;
  if (published) publishedPages.push({ path: e.path, page });

  for (const k of kws) {
    if (k.dropped) {
      dropped.push({ path: e.path, kw: k.text, reason: k.reason, deferred: !!k.deferred });
      continue;
    }
    if (isPattern) {
      rows.push([k.text, e.path, "", "handled by Prompt 7"]);
    } else if (!published) {
      const why = page?.noindex ? "draft" : "not built yet";
      rows.push([k.text, e.path, "", `page ${why}${e.gate ? ` (${e.gate.split(":")[0]})` : ""}`]);
    } else {
      const r = locate(page, k.text);
      if (r.status === "MISSING") missing++;
      rows.push([k.text, e.path, r.where, r.status]);
    }
  }
}

// A dropped keyword must not appear on any published page
for (const d of dropped.filter((x) => !x.deferred)) {
  const stems = [d.kw.toLowerCase(), d.kw.toLowerCase().replace(/\s+india$/, "")];
  const hits = publishedPages.filter(({ page }) => stems.some((s) => page.body.includes(s) || page.title.includes(s)));
  d.found = hits.map((h) => h.path);
  if (hits.length) droppedFound++;
}

const pad = (s, n) => String(s).padEnd(n);
const published = rows.filter((r) => ["covered", "variant", "MISSING"].includes(r[3]));
console.log(`PUBLISHED PAGES: ${publishedPages.length}\n`);
console.log(`${pad("keyword", 46)}${pad("page", 34)}${pad("where", 20)}status`);
for (const r of published) console.log(`${pad(r[0], 46)}${pad(r[1], 34)}${pad(r[2], 20)}${r[3]}`);

const blocked = rows.filter((r) => !["covered", "variant", "MISSING"].includes(r[3]));
console.log(`\nNOT CHECKED (page unpublished or a Prompt 7 pattern): ${blocked.length} keywords`);
const byReason = new Map();
for (const r of blocked) byReason.set(r[3], (byReason.get(r[3]) ?? 0) + 1);
for (const [reason, n] of byReason) console.log(`  ${n} x ${reason}`);

const deferredKw = dropped.filter((x) => x.deferred);
console.log(`\nDEFERRED by the owner (skipped, may return): ${deferredKw.length}`);
for (const d of deferredKw) console.log(`  ${pad(d.kw, 36)} on ${pad(d.path, 34)} reason: ${d.reason}`);
const droppedOnly = dropped.filter((x) => !x.deferred);
console.log(`\nDROPPED (skipped, never counted): ${droppedOnly.length}`);
for (const d of droppedOnly) {
  console.log(`  ${pad(d.kw, 36)} on ${pad(d.path, 22)} reason: ${d.reason}${d.found.length ? `  !! FOUND ON: ${d.found.join(", ")}` : ""}`);
}

console.log(
  `\ncovered/variant: ${published.length - missing}  missing: ${missing}  dropped-but-present: ${droppedFound}`
);
if (missing || droppedFound) process.exit(1);
console.log("Keyword coverage OK.");
