// Builds docs/seo/SEO_RULES.md, keyword-map.md, page-tracker.csv and content-briefs/ from PROMPT_PACK_v2.md
// and the page registry. Run: node scripts/gen-seo-docs.mjs
import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { parseMap } from "./lib/keyword-map.mjs";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const docs = join(root, "docs", "seo");
const pack = readFileSync(join(docs, "PROMPT_PACK_v2.md"), "utf8").replace(/\r\n/g, "\n");

function between(startMarker, endMarker, from = 0) {
  const s = pack.indexOf(startMarker, from);
  if (s < 0) throw new Error(`marker not found: ${startMarker}`);
  const e = pack.indexOf(endMarker, s + startMarker.length);
  if (e < 0) throw new Error(`marker not found: ${endMarker}`);
  return pack.slice(s, e).trimEnd() + "\n";
}

// ---- SEO_RULES.md (verbatim sections) ---------------------------------------
const hard = between("HARD RULES (apply to every phase and every later session)", "PHASE 0: Discovery");
const standards = between("PAGE STANDARDS (apply to every indexable page)", "KEYWORD MAP (source of truth");
writeFileSync(join(docs, "SEO_RULES.md"), `# SEO rules\n\nCopied verbatim from PROMPT_PACK_v2.md (Prompt 1). Every session reads this file.\n\n${hard}\n${standards}`);

// ---- keyword-map.md (verbatim) ----------------------------------------------
const map = between("KEYWORD MAP (source of truth", "Start with Phase 0 now.");
writeFileSync(join(docs, "keyword-map.md"), `# Keyword map\n\nCopied verbatim from PROMPT_PACK_v2.md (Prompt 1).\n\n${map}`);

// ---- parse the map (shared parser) --------------------------------------------
const entries = parseMap(map).map((e) => ({
  path: e.path,
  wave: e.wave,
  primary: e.primary?.text ?? "",
  tag: [e.primary?.priority, e.primary?.lang, e.primary?.cluster, e.primary?.intent],
  secondary: e.secondary.filter((x) => !x.dropped).map((x) => x.text),
  dropped: [
    ...(e.primary?.dropped ? [{ text: e.primary.text, reason: e.primary.reason }] : []),
    ...e.secondary.filter((x) => x.dropped).map((x) => ({ text: x.text, reason: x.reason })),
  ],
  notes: e.notes,
  gate: e.gate,
  rule: e.rule,
}));

// ---- registry (read the TS file as text, no TS toolchain needed) ------------
const regSrc = readFileSync(join(root, "src", "config", "pages.ts"), "utf8");
const registry = [];
for (const block of regSrc.split(/\n  \{\n/).slice(1)) {
  const g = (k) => (block.match(new RegExp(`${k}:\\s*\\n?\\s*"([^"]*)"`)) ?? [])[1];
  registry.push({
    path: g("path"),
    kind: g("kind"),
    gate: g("gate"),
    noindex: /noindex:\s*true/.test(block),
    draft: /draft:\s*true/.test(block),
  });
}
const statusJson = JSON.parse(readFileSync(join(docs, "feature-status.json"), "utf8")).features;
const live = (k) => ["live", "live-per-site"].includes(statusJson[k]?.status);
function statusOf(path) {
  const r = registry.find((x) => x.path === path);
  if (!r) return "planned";
  if (r.noindex) return "noindex";
  if (r.draft || (r.gate && !live(r.gate))) return "draft";
  return "published";
}

// ---- kind + outline templates -----------------------------------------------
function kindOf(path) {
  if (path.startsWith("/features/")) return "feature";
  if (path.startsWith("/for/")) return "segment";
  if (path.startsWith("/tools/")) return "tool";
  if (path.startsWith("/templates/")) return "template";
  if (path.startsWith("/blog/") || path.startsWith("/hi/blog/")) return "blog";
  if (path.startsWith("/hi")) return "hinglish";
  if (path.startsWith("/compare/")) return "compare";
  if (path.startsWith("/gyms/")) return "local";
  return "core";
}

const outlines = {
  feature: (p) => [
    `Direct answer: what ${p} means in Fitvario (first 100 words)`,
    "Who it is for",
    "The problem today (Excel, paper register, WhatsApp groups)",
    "How it works in Fitvario, step by step",
    "Capabilities (only features marked live)",
    "India-specific details (GST, Razorpay/UPI, WhatsApp, Hindi/Hinglish)",
    "Worked example, clearly labelled as an example",
    "Screenshot placeholders with alt text (TODO: real screenshots)",
    "4-6 FAQs people really ask",
    "Related pages and closing CTA",
  ],
  segment: (p) => [
    `Direct answer: what a ${p} owner needs and what to ignore`,
    "A day in this kind of gym, and where manual work piles up",
    "What Fitvario covers for this segment (live features only)",
    "Setup checklist",
    "What to ask any vendor",
    "FAQs",
    "Related feature pages and CTA",
  ],
  tool: (p) => [
    `Tool: ${p} (client-side, editable defaults labelled illustrative)`,
    "How to use it",
    "Formulas used",
    "Worked example, labelled as an example",
    "FAQs (4-6)",
    "Related posts and CTA",
    "Unit tests for every calculation",
  ],
  template: (p) => [
    `Direct answer: ${p}`,
    "Templates grouped by need, each copyable and printable",
    "How to adapt them",
    "General-information disclaimer and expert-review note",
    "FAQs and CTA",
  ],
  blog: (p) => [
    `Direct answer to "${p}" in the first 100 words`,
    "Original angle for an Indian gym owner with concrete examples",
    "Templates, checklists or tables the reader can reuse",
    "Common mistakes",
    "Sources section if anything is cited",
    "FAQs and a CTA that matches the topic",
  ],
  hinglish: (p) => [
    `Direct answer to "${p}" in Roman-script Hinglish`,
    "Owner-to-owner explanation, short sentences",
    "Examples and message templates where relevant",
    "YouTube companion placeholder (TODO)",
    "FAQs and CTA",
  ],
  compare: (p) => [
    `Who each tool is for (${p})`,
    "Honest feature table (Fitvario column uses live features only)",
    "Where the competitor is the better choice",
    "Where Fitvario fits better",
    "Pricing as publicly stated, with date",
    "Decision checklist",
    "Sources and 'Last verified' date",
  ],
  local: (p) => [`Template page for ${p}. Built in Prompt 7A/7B, not as a standalone page.`],
  core: (p) => [`Core page for ${p}. See the Phase 3 rewrite.`],
};

const faqStems = {
  feature: (p) => [`What is ${p}?`, "Does it work for a small gym?", "What does it cost?", "How long does set-up take?"],
  segment: (p) => [`What is the best way to start with ${p}?`, "What can I skip at the beginning?", "How many members is it built for?"],
  tool: (p) => [`How does the ${p} work out the result?`, "Can I change the assumptions?", "Is my data saved?"],
  template: (p) => [`How do I use ${p}?`, "Can I edit the wording?", "Is this professional advice?"],
  blog: (p) => [`${p}: what works in India?`, "How quickly can I see results?", "What is the most common mistake?"],
  hinglish: (p) => [`${p} ke baare mein sabse common sawal?`, "Shuru kaise karein?", "Kitna time lagta hai?"],
  compare: (p) => [`Is ${p} a fair comparison?`, "What should I check before switching?", "Can I export my data?"],
  local: () => [],
  core: () => [],
};

const backend = {
  "/features/member-app": "dashboard_views.py; bmi_views.py, bmr_views.py, body_measurement_views.py, progress_photo_views.py; workout_member_views.py, diet_member_views.py; referral_views.py; user_notification_views.py",
  "/features/gst-billing": "models.py (GymTax, InvoiceTax); tax_views.py; invoice_views.py (invoice recalculation, collect-payment); dues routes",
  "/features/biometric-attendance": "biometric_adms_views.py; biometric_owner_views.py; management/commands/resync_biometric_validity.py",
  "/features/qr-attendance": "attendance_views.py (scan, mark, bulk-mark, settings, analytics); qr_views.py",
  "/features/whatsapp-reminders": "auth_core/notifications/*; management/commands/notify_expiring_memberships.py, notify_due_payments.py, notify_member_birthdays.py; notification_campaign_views.py; notification_wallet_views.py",
  "/features/gym-crm": "enquiry_views.py; analytics (CRM); activity_log_views.py",
  "/features/white-label-gym-app": "whitelabel_views.py (OwnerWhitelabelView)",
  "/features/multi-branch-gym-software": "owner_views.py (franchise, gyms); multi_branch_analytics_views.py",
  "/features/diet-workout-plans": "diet_owner_views.py, workout_owner_views.py, diet_member_views.py, workout_member_views.py, plan_assign_views.py, plan_template_views.py",
  "/for/franchise-gyms": "owner_views.py (franchise, gyms); multi_branch_analytics_views.py; staff_views.py; permissions/permission_registry.py",
  "/for/crossfit-yoga-studios": "batch_views.py; schedule_views.py; attendance_views.py. No class booking exists.",
  "/blog/gym-referral-program": "referral_views.py (config, list, stats, apply); coin ledger routes",
  "/blog/gym-freeze-policy-template": "member freeze/unfreeze and gift-days routes in member_views.py",
};

const links = {
  feature: ["/features (hub)", "two sibling feature pages", "one tool", "one blog post or compare page", "/pricing", "/contact#demo"],
  segment: ["/features (hub)", "two relevant feature pages", "one tool", "one blog post", "/pricing", "/contact#demo"],
  tool: ["matching blog post", "matching feature page", "/features", "/contact#demo"],
  template: ["matching blog post", "matching feature page", "/contact#demo"],
  blog: ["one feature page", "one tool (if relevant)", "one more post", "/contact#demo"],
  hinglish: ["/hi/ hub", "matching English feature page", "/contact#demo"],
  compare: ["/features", "/pricing", "best-gym-management-software-india post", "/contact#demo"],
  local: [],
  core: [],
};

// ---- briefs -----------------------------------------------------------------
const briefDir = join(docs, "content-briefs");
mkdirSync(briefDir, { recursive: true });
for (const f of readdirSync(briefDir)) if (f.endsWith(".md")) unlinkSync(join(briefDir, f));

const slugOf = (p) => (p === "/" ? "home" : p.replace(/^\//, "").replace(/[\[\]]/g, "").replace(/\//g, "--"));

for (const e of entries) {
  const kind = kindOf(e.path);
  const [prio, lang, cluster, intent] = e.tag;
  const status = statusOf(e.path);
  const outline = outlines[kind](e.primary).map((x, i) => `${i + 1}. ${x}`).join("\n");
  const faqs = faqStems[kind](e.primary).map((x) => `- ${x}`).join("\n") || "- n/a";
  const body = `# Brief: ${e.path}

Status: ${status} · Wave: ${e.wave} · Kind: ${kind}

## Keywords
- Primary: ${e.primary} (${prio ?? "?"}, ${lang ?? "?"}, ${cluster ?? "?"})
- Secondary: ${e.secondary.length ? e.secondary.join("; ") : "none"}
- DROPPED (never target or count): ${e.dropped.length ? e.dropped.map((d) => `${d.text} (${d.reason})`).join("; ") : "none"}

## Search intent
${intent ?? "n/a"}. One page, one intent. Do not overlap with another page's primary keyword.

## Gate
${e.gate || "None."}

## Content rule
${e.rule || "None beyond SEO_RULES.md."}

## Outline (starting point: refine before writing)
${outline}

## FAQ stems (replace with real questions from Search Console, sales calls and support email)
${faqs}

## Internal links to include
${links[kind].map((x) => `- ${x}`).join("\n") || "- n/a"}

## CTA
Book a free demo (/contact#demo) at mid-page and at the end. WhatsApp and call options come from config.

## Facts to verify before writing
${e.notes ? e.notes.split(" | ").map((x) => `- ${x}`).join("\n") : "- none noted in the workbook"}
- Every capability named must be "live" or "live-per-site" in feature-status.json.

## Backend evidence (for the writer; do not cite file paths on the page)
${backend[e.path] ?? "None needed, or not a product page."}
`;
  writeFileSync(join(briefDir, `${slugOf(e.path)}.md`), body);
}

// ---- tracker ----------------------------------------------------------------
const csv = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const rows = [["URL", "primary_keyword", "secondary_keywords", "dropped_keywords", "status", "wave", "gate", "owner"]];
for (const e of entries) {
  const gate = e.gate.split(":")[0];
  rows.push([
    e.path,
    e.primary,
    e.secondary.join("; "),
    e.dropped.map((d) => d.text).join("; "),
    statusOf(e.path),
    e.wave,
    gate,
    e.gate ? "Sumit (gate) then Claude Code" : "Claude Code",
  ]);
}
for (const r of registry) {
  if (entries.some((e) => e.path === r.path)) continue;
  rows.push([r.path, "(none)", "", "", statusOf(r.path), "Support", "", "Claude Code"]);
}
writeFileSync(join(docs, "page-tracker.csv"), rows.map((r) => r.map(csv).join(",")).join("\n") + "\n");

console.log(`briefs: ${entries.length}, tracker rows: ${rows.length - 1}`);
