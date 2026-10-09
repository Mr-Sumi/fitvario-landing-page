// Run after `next build`:  node scripts/seo-check.mjs
// Checks the built HTML (not the source) the way a crawler sees it. Exits 1 on any failure.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, ".next", "server", "app");
const HOST = "https://www.fitvario.com";

if (!existsSync(appDir)) {
  console.error("No build output. Run `npm run build` first.");
  process.exit(1);
}

const failures = [];
const warnings = [];
const fail = (page, msg) => failures.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

// ---- load pages -------------------------------------------------------------
const SKIP = new Set(["_global-error", "_not-found"]);
const pages = {};
function walk(dir, prefix = "") {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) walk(join(dir, e.name), `${prefix}/${e.name}`);
    else if (e.name.endsWith(".html")) {
      const name = e.name.slice(0, -5);
      if (SKIP.has(name)) continue;
      const path = name === "index" ? prefix || "/" : `${prefix}/${name}`;
      pages[path] = readFileSync(join(dir, e.name), "utf8");
    }
  }
}
walk(appDir);

const first = (html, re) => (html.match(re) ?? [])[1];
const meta = (html, attr, key) =>
  first(html, new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`)) ??
  first(html, new RegExp(`<meta content="([^"]*)" ${attr}="${key}"`));

const info = {};
for (const [path, html] of Object.entries(pages)) {
  const robots = meta(html, "name", "robots") ?? "";
  const mainHtml = first(html, /<main id="main"[^>]*>([\s\S]*?)<\/main>/) ?? "";
  info[path] = {
    html,
    title: decode(first(html, /<title>([^<]*)<\/title>/) ?? ""),
    desc: decode(meta(html, "name", "description") ?? ""),
    canonical: first(html, /<link rel="canonical" href="([^"]*)"/),
    ogUrl: meta(html, "property", "og:url"),
    noindex: /noindex/.test(robots),
    h1s: (mainHtml.match(/<h1[\s>]/g) ?? []).length,
    main: mainHtml,
  };
}

const indexable = Object.keys(info).filter((p) => !info[p].noindex);

// ---- per-page checks --------------------------------------------------------
const titles = new Map();
const descs = new Map();
for (const p of Object.keys(info)) {
  const i = info[p];
  if (!i.title) fail(p, "missing <title>");
  if (i.title.length > 60) fail(p, `title ${i.title.length} chars (max 60): "${i.title}"`);
  if (!i.noindex && i.title.length < 50) fail(p, `title ${i.title.length} chars (min 50): "${i.title}"`);
  if (!i.desc) fail(p, "missing meta description");
  if (!i.noindex && (i.desc.length < 120 || i.desc.length > 155)) {
    fail(p, `description ${i.desc.length} chars (want 120-155)`);
  }
  if (titles.has(i.title)) fail(p, `duplicate title with ${titles.get(i.title)}`);
  titles.set(i.title, p);
  if (descs.has(i.desc)) fail(p, `duplicate description with ${descs.get(i.desc)}`);
  descs.set(i.desc, p);

  const want = p === "/" ? HOST : `${HOST}${p}`;
  if (i.canonical !== want) fail(p, `canonical is ${i.canonical}, want ${want}`);
  if (i.ogUrl !== want) fail(p, `og:url is ${i.ogUrl}, want ${want}`);
  if (i.h1s !== 1) fail(p, `${i.h1s} <h1> elements in <main> (want 1)`);
  if (/<meta name="keywords"/.test(i.html)) fail(p, "meta keywords tag present");
  if (/&amp;amp;/.test(i.html)) fail(p, "double-encoded &amp;amp;");
  if (/href="#"/.test(i.html)) fail(p, 'href="#" placeholder link');
  if (/www\.fitvario\.com/.test(i.main.replace(HOST, "")) === false && /https?:\/\/fitvario\.com/.test(i.html)) {
    fail(p, "link or tag uses the apex host instead of www");
  }
  for (const img of i.html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\balt="/.test(img)) fail(p, `image without alt: ${img.slice(0, 80)}`);
  }
  for (const m of i.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const j = JSON.parse(m[1]);
      if (!j["@context"] || !j["@type"]) fail(p, "JSON-LD missing @context/@type");
      if (j["@type"] === "Organization" && !(j.name && j.url)) fail(p, "Organization JSON-LD needs name and url");
      if (j["@type"] === "BreadcrumbList" && !j.itemListElement?.length) fail(p, "BreadcrumbList empty");
      if (j["@type"] === "SoftwareApplication") {
        if (j.aggregateRating || j.review) fail(p, "SoftwareApplication has rating/review markup");
        for (const o of [].concat(j.offers ?? [])) {
          if (!Number(o.price)) fail(p, `offer with price "${o.price}"`);
        }
      }
      if (j["@type"] === "BreadcrumbList" && p === "/") fail(p, "BreadcrumbList on home");
    } catch (e) {
      fail(p, `JSON-LD does not parse: ${e.message}`);
    }
  }
  if (p !== "/" && !i.noindex && !/"@type":"BreadcrumbList"/.test(i.html) && !["/features", "/pricing", "/about", "/contact", "/support"].includes(p)) {
    warn(p, "no BreadcrumbList JSON-LD");
  }
}

// ---- sitemap ----------------------------------------------------------------
const sitemapPath = join(appDir, "sitemap.xml.body");
if (existsSync(sitemapPath)) {
  const xml = readFileSync(sitemapPath, "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const lastmods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
  const want = new Set(indexable.map((p) => (p === "/" ? HOST : `${HOST}${p}`)));
  for (const l of locs) if (!want.has(l)) fail("sitemap", `lists non-indexable or unknown URL ${l}`);
  for (const w of want) if (!locs.includes(w)) fail("sitemap", `missing indexable URL ${w}`);
  if (/<priority>|<changefreq>/.test(xml)) fail("sitemap", "has priority/changefreq");
  if (new Set(lastmods).size < 2) warn("sitemap", "all lastmod values are identical");
  if (lastmods.some((d) => /T\d\d:\d\d:\d\d\.\d+Z$/.test(d) && !d.endsWith("T00:00:00.000Z"))) {
    fail("sitemap", "lastmod looks like a build timestamp");
  }
} else fail("sitemap", "sitemap.xml.body not found in build output");

const robotsPath = join(appDir, "robots.txt.body");
if (existsSync(robotsPath)) {
  const r = readFileSync(robotsPath, "utf8");
  if (!r.includes(`Sitemap: ${HOST}/sitemap.xml`)) fail("robots", "Sitemap line missing or wrong host");
  for (const line of r.split("\n").filter((l) => l.startsWith("Disallow:"))) {
    const path = line.replace("Disallow:", "").trim();
    for (const p of Object.keys(info)) {
      if (info[p].noindex && path && p.startsWith(path)) fail("robots", `disallows noindex page ${p}`);
    }
  }
}

// ---- links, orphans, depth ---------------------------------------------------
const publicDir = join(root, "public");
const staticOk = new Set(["/sitemap.xml", "/robots.txt", "/manifest.json", "/favicon.ico"]);
const links = {};
for (const p of Object.keys(info)) {
  links[p] = new Set();
  for (const m of info[p].html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    let h = decode(m[1]);
    if (h.startsWith(HOST)) h = h.slice(HOST.length) || "/";
    if (!h.startsWith("/") || h.startsWith("//")) continue;
    h = h.split("#")[0].split("?")[0] || "/";
    links[p].add(h.length > 1 ? h.replace(/\/$/, "") : h);
  }
  for (const h of links[p]) {
    if (info[h] || staticOk.has(h) || existsSync(join(publicDir, h))) continue;
    fail(p, `broken internal link ${h}`);
  }
}

// links from published pages to noindex pages (drafts must not be linked)
for (const p of indexable) {
  for (const h of links[p]) {
    if (info[h]?.noindex && h !== "/thank-you") fail(p, `links to noindex page ${h}`);
  }
}

const depth = { "/": 0 };
const queue = ["/"];
while (queue.length) {
  const cur = queue.shift();
  for (const h of links[cur] ?? []) {
    if (info[h] && !(h in depth)) {
      depth[h] = depth[cur] + 1;
      queue.push(h);
    }
  }
}
for (const p of indexable) {
  if (!(p in depth)) fail(p, "orphan page (not reachable from home)");
  else if (depth[p] > 3) fail(p, `${depth[p]} clicks from home (max 3)`);
}

// ---- duplicate sentences -----------------------------------------------------
function sentences(html) {
  const text = decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ")
  ).replace(/\s+/g, " ");
  return new Set(
    text
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.split(" ").length >= 7)
  );
}
const sents = Object.fromEntries(indexable.map((p) => [p, sentences(info[p].main)]));
for (let a = 0; a < indexable.length; a++) {
  for (let b = a + 1; b < indexable.length; b++) {
    const A = sents[indexable[a]];
    const B = sents[indexable[b]];
    const smaller = Math.min(A.size, B.size);
    if (smaller < 5) continue;
    let shared = 0;
    for (const s of A) if (B.has(s)) shared++;
    const pct = shared / smaller;
    if (pct > 0.25) fail(`${indexable[a]} + ${indexable[b]}`, `${Math.round(pct * 100)}% identical sentences`);
  }
}

// ---- report ------------------------------------------------------------------
console.log(`Checked ${Object.keys(info).length} pages (${indexable.length} indexable).`);
for (const w of warnings) console.log(`WARN  ${w}`);
if (failures.length) {
  for (const f of failures) console.log(`FAIL  ${f}`);
  console.log(`\n${failures.length} failure(s).`);
  process.exit(1);
}
console.log("All SEO checks passed.");
