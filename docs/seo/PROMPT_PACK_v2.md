# Fitvario: Claude Code SEO Prompt Pack (v2, code-verified)

Banaya: 10 Oct 2026. v1 ke upar backend code (`fitvario-backend`) aur landing repo (`fitvario-landing`) se verify karke changes. v1 se kya badla, wo sabse neeche "v1 se changes" section mein hai.

## Kaise use karna hai

1. Ye file landing repo mein `docs/seo/` mein hai. Cowork ka audit `.md` aur `.xlsx` bhi wahin rakh de (abhi repo mein nahi hain).
2. Prompts **order se, ek-ek session mein** chala. Har prompt ke baad branch ka diff review kar, phir agla.
3. Prompt 1 Phase 0 ke baad **ruk jaayega** aur sawal puchega. Jawab de, tab aage badhega.
4. Prompt 1 keyword map aur product facts ko `docs/seo/` mein save karta hai. Baaki prompts wahi files padhte hain.
5. Prompt 7 ab **do repos** mein hai: 7A backend (`fitvario-backend`, Django API), 7B marketing (Next.js). Public gym profile abhi sirf JSON API hai, HTML page nahi.

| # | Prompt | Kya banta hai | Repo |
|---|---|---|---|
| 1 | Foundation | Technical SEO, conversion layer, core page rewrite, templates, 3 pilot feature pages | fitvario-landing |
| 2 | Feature + segment pages | 6 baaki feature pages + 3 /for/* pages | fitvario-landing |
| 3 | Tools + templates | 7 tools + diet-chart template | fitvario-landing |
| 4 | Blog | Blog engine + 11 mapped posts | fitvario-landing |
| 5 | Hinglish section | /hi/ hub + 5 Hinglish pages | fitvario-landing |
| 6 | Compare pages | 5 alternative pages, sourced | fitvario-landing |
| 7A | Gym pages: data + consent + gate | opt-in, `is_indexable`, sitemap feed API | fitvario-backend |
| 7B | Gym pages: rendering | /gyms/* server-rendered from the 7A API | fitvario-landing |
| 8 | Final QA + handoff | Crawl, checks, report, Search Console checklist | fitvario-landing |

Realistic scale: 48 mapped pages + core/support pages = lagbhag 55-60 URLs. Isse zyada pages (khaas kar city/area templates) Google ki scaled-content spam policy ke risk mein aate hain. Ranking guarantee nahi hai; non-brand traffic mein usually 3-6 mahine lagte hain.

---

## PROMPT 1: Foundation, conversion layer, core pages, templates, keyword map

Claude Code ko **fitvario-landing** mein kholke paste kar.

````
You are a senior technical-SEO engineer, front-end developer and India B2B SaaS copywriter, working inside the repository of the Fitvario MARKETING website (fitvario.com): `fitvario-landing`.

MISSION
Make the site technically clean, conversion-ready and structured so it can be indexed and can rank on Google India for gym-owner search queries, then ship the first set of pages. Work in phases on a branch named `seo-overhaul`, one commit per phase. Do not deploy. Do not push to main.

REPO FACTS (verified)
- Next.js 16.2.3, React 19, Tailwind 4, TypeScript, App Router under `src/app/`. Existing routes: /, /about, /contact, /cookies, /delete-account, /features, /grievance, /pricing, /privacy, /refund, /support, /terms, plus `robots.ts`, `sitemap.ts`, `not-found.tsx`. Components: Header, Footer, PageShell, AppPreview, CookieBanner.
- `AGENTS.md` says: "This is NOT the Next.js you know. This version has breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices." Obey it: before touching metadata, sitemap, robots, redirects, middleware/proxy, fonts, images or caching, read the matching guide in `node_modules/next/dist/docs/` and use only APIs documented there. Do not rely on memory of older Next.js.
- The product backend is at `D:\coding\Python\django\New folder\fitvario-backend` (Django). You may READ it to verify product behaviour. Never modify it from this repo's sessions, never run its server, tests or management commands, never read its `.env`.

CONTEXT
- Fitvario is a multi-tenant gym management SaaS for Indian gyms. Buyer: gym owners in India (tier 1, 2, 3 cities), mostly on mobile, WhatsApp-first, comfortable in English, Hindi and Hinglish. Revenue comes from owners, not members.
- Primary conversion: demo request (form + WhatsApp). The brand name is ambiguous in search (Fitvio, Technogym Vario), so entity signals matter.
- docs/seo/ should hold an SEO audit (.md) and a keyword/page workbook (.xlsx). If they are missing, say so in Phase 0 and continue with the keyword map below. They contain NO measured search volumes, so priorities (P1/P2/P3) are judgement, not data.
- Two audit items are unverified; check them in the BUILT HTML: (a) the claim that the home <title> is double-encoded (a single "&amp;" in source is correct; only "&amp;amp;" is a bug), (b) www vs non-www behaviour. Known: canonical URLs, sitemap and robots use https://fitvario.com (apex) but internal links in nav, footer and CTAs may point to https://www.fitvario.com. Check `src/components/Header.tsx`, `Footer.tsx`, `sitemap.ts`, `robots.ts`, `layout.tsx`.

PRODUCT FACTS (verified against fitvario-backend on 2026-10-10 by reading routes, models and views; save verbatim as docs/seo/product-facts.md in Phase 0)
Status vocabulary: IN-CODE = implemented in backend, production not confirmed by Sumit. CLAIMED = on the live site. NO-EVIDENCE = claimed on the live site but I found no backend support.

Verified in code (IN-CODE; becomes "live" only when Sumit confirms):
- Members: add/edit/list, stats, detail, health data, suspend, freeze/unfreeze, gift free days, renew, edit subscription, reset password, today's birthdays, member invoices.
- Plans and billing: membership plans, batches (time slots), per-gym configurable taxes (name, tax number, percentage) applied to invoices with a per-invoice tax breakdown, a company GST field on the owner profile, invoices with collect-payment (partial payments tracked as dues), dues today/summary/member list, expenses and recurring expenses (with pause), financial/collection/member-growth analytics.
- Attendance: member QR scan, manual mark, bulk mark, edit records, settings, analytics, top attenders, nightly auto-mark-absent job. Biometric: ZKTeco/eSSL-style ADMS push endpoints (`iclock/cdata`, `getrequest`, `devicecmd`), device CRUD, command queue, punch logs, user mapping, block/unblock, membership-validity resync to devices.
- Training: diet plans and workout plans (plan > day > meal/exercise > item), quick-create, assign/restart/remove per member, member requests for plans with owner approve/reject, template marketplace (library, claim, purchase, copy), personal-trainer assignment.
- CRM: enquiries, enquiry types, customer categories, follow-ups, today's follow-up list, CRM analytics. Referral program (config, list, stats, apply) and a loyalty coins ledger (member and owner side).
- Communication: notification campaigns (templates, audience preview, launch, cancel, progress), channels SMS / WhatsApp / push / email / in-app, per-channel credit wallet and purchasable packages, marketing WhatsApp charged at a separate admin-set credit rate, notification preferences and analytics, member reminder preferences, scheduled jobs for expiring memberships, due payments, birthdays, daily summary. Providers: Fast2SMS (SMS and WhatsApp), FCM push, ZeptoMail email. Do NOT claim "WhatsApp Business API" in copy until Sumit confirms the provider arrangement.
- Store: owner products; member cart, checkout and orders with owner approve/reject; platform store where owners buy from Fitvario.
- Member app: profile, gym info, subscription status, plans, gallery, highlights, attendance, progress photos, BMI/BMR/body measurements, workout and diet tracking, my trainer, referral and coins, in-app notifications, account delete request and reactivate.
- Owner platform: multi-branch (franchise > gyms), multi-branch analytics (overview, revenue, members, attendance, CRM), staff accounts with ~90 granular permission codes, activity logs, white-label endpoint (`owner/whitelabel`), banners, gym gallery and highlights, gym schedule/opening hours and temporary closures, QR code per gym, public gym profile API (JSON, `GET /api/public/gym/<slug>/profile`).
- SaaS billing: owners can self-register and subscribe via Razorpay (plans, upgrade, coupons, coin wallet, billing history, entitlement limits per plan). Plan tiers come from the database (seeded by `seed_plans`), so never hard-code plan names or prices; ask Sumit.
- Member login supports BOTH password and OTP verification.

NO-EVIDENCE claims on the live site (do not repeat them; remove or soften in Phase 3 unless Sumit confirms they exist):
- "Class Scheduling: class slots, capacity, enrolments, members book in the app". No booking or enrolment routes exist. Batches (time slots) and gym opening hours exist.
- "Staff attendance, salary dates, HR basics". No staff attendance or salary models. Staff accounts, permissions and activity logs exist.
- "FAQ & Content Management: gym FAQs with text and video answers". The FAQ model is platform-level, super-admin managed and read-only for owners. No per-gym FAQ.
- "Export reports (Excel/PDF)" on /features and /pricing. I found no export endpoints; the web dashboard may export client-side. Ask.
- "Passwordless OTP-only login" for members. Password login also exists.

Understated on the live site (fix the copy once Sumit confirms they are live): ecommerce is a full cart > checkout > order > owner-approval flow, not just "express interest"; freeze and gift days; dues and partial payments; batches; personal-trainer assignment; plan requests; campaigns and credit wallet; loyalty coins; progress photos and BMR; birthdays; multi-branch CRM analytics.

HARD RULES (apply to every phase and every later session)
1. NO FABRICATION. Never invent prices, testimonials, client names or logos, customer counts, ratings, awards, statistics, screenshots, certifications, founder bios, phone numbers or addresses. If a fact is missing, read it from a config file, render nothing (or a draft state), and add an entry to docs/seo/TODO_FOR_SUMIT.md.
2. FEATURE GATING. Only claim a capability if docs/seo/feature-status.json marks it "live" or "live-per-site". "in-code" and "no-evidence" items are not claimable. Pages that depend on them are DRAFTS: `noindex`, excluded from sitemap, nav and internal links, listed in TODO_FOR_SUMIT.md. Flipping the flag publishes them.
3. QUALITY OVER COUNT. Never create a page just to have a URL. Every indexable page must (a) target one primary keyword and one clear intent from the keyword map, (b) contain information that is not on any other page of this site, (c) have a specific call to action. No near-duplicate templated pages, no spun text, no city or area doorway pages. Write `scripts/seo-check` (TypeScript or Node, matching the repo) that fails when two pages share more than 25% identical sentences.
4. SCOPE. Marketing site only. Do not modify the backend or app repos, databases, DNS, hosting accounts or secrets. Configuration goes through environment variables; update `.env.example`; never commit secrets.
5. URL SAFETY. Keep every existing URL. If one must change, add a 301 from the old URL and update internal links.
6. NO SPAM TACTICS. No keyword stuffing, hidden text, cloaking, fake review or rating schema, link schemes, or auto-generated content at scale.
7. PERFORMANCE FIRST. Assume Indian mobile on 4G. No autoplay video, heavy sliders, chat widgets or third-party scripts unless required and loaded after interaction.
8. INDIA-FIRST COPY. Use rupees, GST, UPI/Razorpay, WhatsApp, tier-2/3 realities, plain language, short sentences. Examples must be realistic and labelled as examples. Any tax, licence or legal statement gets a "verify with your CA / advisor" note and an entry in TODO_FOR_SUMIT.md for expert review.
9. DO NOT MIGRATE FRAMEWORKS. Stay on the existing Next.js App Router setup and its conventions, and read its docs first (see REPO FACTS).
10. COMMUNICATION. After Phase 0, STOP and ask. After my answers, proceed through the phases without asking again; unknowns become config placeholders plus TODO entries. End every phase with a 5-line summary: what changed, files touched, how it was verified, what is left, what I must do.
11. COMMITS AND COMMENTS. Commit messages are plain `type: message`. Never add Co-Authored-By lines or "Generated with" lines to commits or PRs. Code comments read like a teammate's quick note: short, no AI-style explanations of reasoning. Run no git command beyond what the phases require (branch, add, commit).

PHASE 0: Discovery (read-only, then STOP)
- Read the Next.js docs in node_modules/next/dist/docs/ that cover metadata, sitemap, robots, redirects and rendering. Summarise the conventions you will follow.
- Detect build tool, how <head> tags are produced, image handling, form handling, analytics, env var handling, deploy method, existing redirects, and the www/apex setup in code or hosting config.
- Determine rendering: does a plain HTTP GET of each page return full content without running JavaScript? If any page is client-rendered only, STOP and propose the lowest-risk fix first.
- Build the site and inspect the output HTML for the home <title>, meta tags, canonical, links (www vs apex), JSON-LD, alt text, headings.
- Create docs/seo/product-facts.md (verbatim from PRODUCT FACTS above) and docs/seo/feature-status.json listing every capability with status "live-per-site" (on the live site AND backed by code), "in-code", or "no-evidence", plus a `evidence` field with the backend route or model. Do not mark anything "live" yourself.
- Output: (a) stack summary, (b) problem list with file paths, (c) the phase plan with estimated effort, (d) at most 10 questions. The questions MUST include: canonical host (default: keep apex https://fitvario.com and 301 www to it); pricing (show the real self-serve plan tiers and rupee prices, or "from ₹X", or keep custom quote; note the product supports self-serve signup and Razorpay subscription, while the site says custom quote and "we build your account"); WhatsApp number, phone, support email, working hours; which IN-CODE capabilities are live in production (GST taxes on invoices, biometric ADMS, white-label, template marketplace, campaigns/wallet, plan requests, ecommerce orders); for each NO-EVIDENCE claim, does it exist elsewhere (web dashboard, Flutter app) or should I remove it; free trial yes/no; the WhatsApp provider arrangement (may we say "WhatsApp Business API"); may a founder name and bio be shown; may real customers be named (with written permission); can the hosting accept a form endpoint or serverless function.
- Then STOP and wait for my answers.

PHASE 1: Technical SEO foundation
1.1 Host and URL policy. One canonical host (from my answer). 301 the other host and http to https at the hosting layer or via the mechanism the Next.js docs describe. No trailing slash; 301 normalise. Replace every hard-coded absolute internal link with a relative link or the canonical host. Canonical, sitemap, Open Graph URLs and JSON-LD URLs must all use the same host.
1.2 Head management. Use the Next.js metadata API as documented in the installed version, with one shared helper used by every page: title (50-60 characters, primary keyword near the front, brand at the end), meta description (120-155 characters, benefit plus action), absolute canonical, robots, Open Graph and Twitter tags with a real image per page type, `lang`, theme-color. No meta keywords tag. Add a build-time check that fails on missing, duplicate or over-length titles and descriptions. Only fix "&amp;" if the built HTML is actually double-encoded.
1.3 Structured data. JSON-LD component with: Organization (name, url, logo, contactPoint from config, sameAs only for real profiles in config), WebSite, BreadcrumbList on every non-home page, BlogPosting for posts (author, datePublished, dateModified), SoftwareApplication on home and pricing (applicationCategory BusinessApplication; operatingSystem Web, Android; offers ONLY when real prices exist in config; NEVER aggregateRating or review unless real, visible, verifiable reviews exist). FAQPage markup is optional and low priority (Google limits FAQ rich results to authoritative government and health sites); keep FAQs as visible HTML. Add a script that parses every JSON-LD block and checks required fields.
1.4 robots. Allow all public pages. Disallow app, admin and API paths only (ask in Phase 0 if unknown). NEVER disallow a URL that carries a noindex tag. Include the Sitemap line. Implement via the existing `robots.ts`.
1.5 sitemap. Generate from the route manifest via the existing `sitemap.ts`. Include only indexable pages (no draft, noindex, thank-you or 404). Real `lastmod` from the content's `updated` front-matter or the last git commit date for that page, never a build timestamp. Omit priority and changefreq.
1.6 Performance. Target on mobile: LCP 2.5 s or less, INP 200 ms or less, CLS 0.1 or less. Use the framework's documented image and font handling, WebP or AVIF, explicit width and height, lazy-load below the fold, priority on the LCP image, self-hosted subset fonts with `font-display: swap`, remove unused CSS and JS, defer third-party code. Report bundle sizes before and after.
1.7 Semantics and accessibility. One H1 per page, logical H2/H3, landmarks, alt text for every meaningful image, visible focus, contrast AA, tap targets at least 48 px, `<html lang>` correct.
1.8 Error handling. Helpful 404 with links to key pages and the demo CTA (HTTP 404). Prepare a 410 route for permanently removed pages.
1.9 Internal linking system. Header nav with a Features menu (hub plus children), footer with Product, Solutions, Resources, Compare, Company and Legal columns, breadcrumbs, a RelatedLinks component, a closing CTA block. No orphan pages; every indexable page within 3 clicks of home; descriptive anchor text.
1.10 Analytics (env vars): GA4 measurement ID, Google Search Console and Bing verification tags. Load GA4 async and behind a lightweight consent control consistent with the existing /cookies page and `CookieBanner`. Events: demo_submit, whatsapp_click, call_click, pricing_view, calculator_use, cta_click (with location parameter), outbound_click. Capture UTM parameters, landing page and referrer into the lead.
Commit: "seo: technical foundation".

PHASE 2: Conversion layer
2.1 Sticky mobile action bar (WhatsApp, Call, Book demo) and a floating WhatsApp button on desktop. Link format https://wa.me/<number>?text=<prefilled message including page name>. Numbers come from config; if empty, render nothing and add a TODO.
2.2 DemoForm component reused on pages. Fields: name, gym name, city, number of members (range select), mobile (10-digit Indian mobile starting 6-9), email (optional), current method (Excel/register/other software/none), consent checkbox linking to the privacy policy (DPDP Act: say clearly we will contact them about the demo). Spam protection: honeypot, minimum-time check, rate limit; Cloudflare Turnstile only if I approve. Submit to a server endpoint (Route Handler as documented for this Next.js version) that emails support and POSTs to LEAD_WEBHOOK_URL (env). On success redirect to /thank-you (noindex, not in sitemap) which fires demo_submit, shows a WhatsApp button, what happens next, and the response time from config. Replace every mailto demo link with this flow (keep a visible support email as fallback).
2.3 Pricing page. Config-driven (`pricing.config`). If tiers are configured: tier cards with rupee prices, billing period, GST note, member or branch basis, what is included, FAQ. If not: keep "custom quote" with a short quote form, an explanation of the pricing factors already on the page, and a "typical setup" example ONLY if I provide numbers. Keep refund text consistent with /refund. SoftwareApplication offers markup only for real prices. Remove the "Excel/PDF export" line unless confirmed.
2.4 Proof component. Logos, testimonials and case studies only from config with written-permission flags; hidden when empty.
2.5 Play Store badge: real link from config or remove it. No href="#".
Commit: "seo: conversion layer".

PHASE 3: Core page rewrites (keep URLs)
- Home: keep the H1 "Stop running your gym on WhatsApp groups and spreadsheets". New title around "Gym Management Software India | Billing, CRM, WhatsApp | Fitvario" (60 characters or fewer). Sections: hero with demo CTA and WhatsApp CTA, problem to solution, feature grid linking to each feature page, how it works in 3 steps (reconcile with self-serve signup per my pricing/onboarding answer), who it is for (links to /for/*), proof (conditional), pricing teaser, 8 real FAQs, closing CTA. Remove or fix every NO-EVIDENCE claim per my answers; mention diet plans next to workout plans.
- /features becomes a hub: cards linking to child pages; migrate the current long page's content into the child pages; correct ecommerce wording to the real cart/checkout/approval flow if confirmed; add the understated capabilities only if live.
- /pricing: as in 2.3.
- /about: company story, Bhopal registered address from config, founder and team only if I allow, security summary from existing site text, links to Grievance and Support.
- /contact: DemoForm, WhatsApp, phone, email, address, hours (config).
- Keep legal pages; add `updated` dates; keep delete-account and grievance reachable from the footer.
Commit: "seo: core pages".

PHASE 4: Architecture, templates and docs
- Content collections or route patterns (as this Next.js version documents) for: feature pages, segment pages, tool pages, template pages, blog posts, Hinglish pages, comparison pages. Each gets a layout with breadcrumbs, TOC where useful, RelatedLinks, DemoForm CTA, `updated` date, `draft` flag.
- Create in docs/seo/: SEO_RULES.md (the HARD RULES and PAGE STANDARDS sections of this prompt, verbatim), keyword-map.md (the KEYWORD MAP section below, verbatim), TODO_FOR_SUMIT.md, page-tracker.csv (URL, keyword, status, wave, gate, owner), SEO_CHANGELOG.md, content-briefs/ (one brief per mapped page: primary and secondary keywords, intent, outline, FAQs, internal links, CTA, facts to verify, gate, backend evidence paths).
- Mapped pages whose gate is not satisfied are created as draft stubs, not published.
Commit: "seo: templates and docs".

PHASE 5: Three pilot pages
Build /features/gst-billing (draft unless I confirm GST tax lines on invoices are live; see the GST note in the map), /features/whatsapp-reminders, /features/gym-crm. Quality bar in PAGE STANDARDS. Read the backend code (path in REPO FACTS) to describe real behaviour: partial payments tracked as dues, renewals, freeze/unfreeze and gift days, enquiry follow-up lists, reminder jobs and channel credits. Cite backend file paths in the content brief only, never on the page. Never describe behaviour you did not verify.
Commit: "seo: pilot feature pages".

PHASE 6: QA and report
Run and report: production build passes; `scripts/seo-check` passes; no broken internal links (write a link checker); every indexable page has a unique title, description and H1; canonicals correct; sitemap equals the set of indexable pages; drafts absent from sitemap, nav and links; JSON-LD parses; every image has alt; no orphan pages; Lighthouse mobile for /, /pricing, /features, one feature page, one more page; if Lighthouse cannot run, give the exact commands. Write results into SEO_CHANGELOG.md and finish with: what is done, what is blocked on me, and the recommended next prompt.

PAGE STANDARDS (apply to every indexable page)
- Title 50-60 characters with the primary keyword near the front; meta description 120-155 characters; exactly one H1 containing the primary keyword in natural wording.
- The first 100 words answer the searcher's question directly. Secondary keywords appear naturally in H2s and body; never force or repeat them.
- At least 5 descriptive internal links (hub, two sibling pages, one tool, one blog post or compare page as relevant) and at least two CTA blocks (mid-page and end).
- KEYWORD COVERAGE: the primary keyword and every secondary keyword listed for the page in the KEYWORD MAP must each appear at least once, naturally, in the title, H1, an H2, body copy or FAQ. Use close natural variants where the exact phrase reads badly (for example Hinglish phrasing), and never repeat a phrase for its own sake.
- Visible "Last updated" date. Editorial pages get an author byline from config.
- Depth: as long as needed to be the best answer to the query, typically 900-1,500 words for feature and blog pages; tool pages at least 500 words of explanation under the tool. Never pad.
- Feature page structure: direct answer; who it is for; the problem today (Excel, register, WhatsApp groups); how it works in Fitvario step by step; capabilities (only live ones); India-specific details (GST, Razorpay/UPI, WhatsApp, Hindi/Hinglish); a worked example clearly labelled as an example; screenshot placeholders with alt text and a TODO for real screenshots; 4-6 genuinely asked FAQs; related pages; CTA.
- Images: real product screenshots only (placeholders flagged in TODO). No stock-photo filler.
- Tone: practical, direct, owner-to-owner. No hype adjectives, no unsourced statistics.

KEYWORD MAP (source of truth; save verbatim as docs/seo/keyword-map.md in Phase 4)
Notes: 76 keywords across 48 target pages. Priority is judgement, not volume. "primary" is the highest-priority keyword for that page. Pages marked GATE must not be published until the gate is satisfied. Pattern pages such as /gyms/[city]/[area] are templates for Prompt 7, not pages to generate now.

PAGE /
  wave: Rewrite now
  primary: fitvario [P1, English, Brand, Navigational]
  secondary: gym management software india [P2]; gym management system india [P3]; fitvario gym management [P1]
  sheet notes: gym management software india: Long game; needs links and proof | gym management system india: Use as secondary in copy | fitvario: Organization schema + GBP + directories to own brand SERP

PAGE /pricing
  wave: Rewrite now
  primary: gym software price in india [P1, English, Pricing, Commercial investigation]
  secondary: gym membership software price [P2]; cheap gym software india [P3]; free gym software india [P3]
  sheet notes: gym software price in india: Needs real price anchor | cheap gym software india: Avoid cheap-positioning unless true | free gym software india: Only if a free tier exists
  GATE: DECISION GATE: rupee figures only from pricing config; "free" and "cheap" keywords only if literally true. Product has self-serve plans (Starter and higher, DB-driven); Sumit decides whether to publish them.

PAGE /features/member-app
  wave: Wave 2
  primary: gym member management app [P1, Hinglish, Hindi/Hinglish, Commercial]
  secondary: gym management app india [P2]; branded gym app for members [P2]
  sheet notes: gym management app india: Needs store links live | gym member management app: English title but Hinglish queries land here too
  GATE: STORE-LINK GATE: real store links in config, else no store badges; Android only unless iOS confirmed

PAGE /features/gst-billing
  wave: Wave 1
  primary: gym software with gst billing [P1, English, GST billing, Commercial]
  secondary: gym billing software india [P1]; gym partial payment dues tracking software [P2]
  sheet notes: gym software with gst billing: Only claim if GST invoices are live | gym partial payment dues tracking software: Fitvario has partial payments/dues in code (verified)
  GATE: FEATURE GATE: draft unless GST invoicing is "live" in feature-status.json. Code evidence: per-gym configurable tax lines (name, tax number, percentage) with a per-invoice breakdown, and a company GST field. Not verified: CGST/SGST vs IGST split, GSTIN printed on the invoice, HSN/SAC. Describe only what Sumit confirms.

PAGE /features/biometric-attendance
  wave: Wave 1
  primary: biometric attendance for gym [P1, English, Biometric, Commercial]
  secondary: zkteco gym software [P1]; gym fingerprint attendance software [P2]; gym access control software india [P3]; gym attendance machine software [P3, Hinglish]
  sheet notes: biometric attendance for gym: Only if ADMS biometric is shipped | zkteco gym software: Co-market with ZKTeco/eSSL dealers
  GATE: FEATURE GATE: draft unless ADMS/ZKTeco biometric is "live"; resolve the /pricing "optional biometrics" mention. Code evidence: ADMS push endpoints, device and command management, punch logs, user mapping, block/unblock, validity resync. Device models supported are not listed in code; ask.

PAGE /features/qr-attendance
  wave: Wave 2
  primary: gym attendance app qr code [P2, English, Biometric, Commercial]
  sheet notes: gym attendance app qr code: QR check-in is on live Features page; manual and bulk marking verified in code

PAGE /features/whatsapp-reminders
  wave: Wave 1
  primary: whatsapp reminders for gym [P1, English, WhatsApp, Commercial]
  secondary: gym membership renewal reminder [P1]; gym whatsapp automation [P2]; whatsapp business api for gym [P3]
  sheet notes: whatsapp reminders for gym: Live on Features as WhatsApp Business | whatsapp business api for gym: use only if the provider arrangement is confirmed (code uses Fast2SMS WhatsApp)

PAGE /features/gym-crm
  wave: Wave 1
  primary: gym crm software india [P1, English, CRM, Commercial]
  secondary: gym lead management software [P2]; gym enquiry follow up app [P1]
  sheet notes: gym enquiry follow up app: Matches enquiry/follow-up modules (verified)

PAGE /features/white-label-gym-app
  wave: Wave 2
  primary: white label gym app india [P2, English, White-label, Commercial]
  secondary: gym app with own branding [P2]
  sheet notes: white label gym app india: Only if white-label is shipped | gym app with own branding: Features page already says gym-branded Android app
  GATE: FEATURE GATE: draft unless white-label is "live"; otherwise use the site's "gym-branded Android app" wording. Code evidence: `owner/whitelabel` endpoint exists; how the Android app is branded per gym is not verified.

PAGE /features/multi-branch-gym-software
  wave: Wave 2
  primary: multi branch gym software [P2, English, Franchise, Commercial]
  sheet notes: verified in code: franchise > gyms, per-gym staff scope, multi-branch analytics (overview, revenue, members, attendance, CRM)

PAGE /features/diet-workout-plans
  wave: Wave 3
  primary: gym diet plan software [P3, English, Diet/workout, Commercial]
  secondary: workout plan builder for gym trainers [P3]
  sheet notes: verified in code: plan builders, assignment, member requests with approval, member progress tracking; template marketplace only if live

PAGE /for/franchise-gyms
  wave: Wave 3
  primary: franchise gym management software [P2, English, Franchise, Commercial]
  secondary: gym chain management software india [P3]

PAGE /for/small-gyms
  wave: Wave 3
  primary: gym software for small gyms india [P2, English, Segment, Commercial]

PAGE /for/crossfit-yoga-studios
  wave: Wave 3
  primary: crossfit gym software india [P3, English, Segment, Commercial]
  secondary: yoga studio software india [P3]
  GATE: FEATURE GATE: the product has batches (time slots) and opening hours but NO class booking or enrolment. Do not promise class booking, capacity or waitlists unless Sumit confirms they exist elsewhere.

PAGE /tools/gym-invoice-generator
  wave: Wave 2
  primary: gym invoice format gst [P2, English, GST billing, Informational]
  secondary: gym fees receipt format [P3]
  sheet notes: gym invoice format gst: Free generator tool; funnel to trial
  GATE: CONTENT GATE: CA review of GST wording; do not claim Fitvario auto-generates GST invoices unless GST is live

PAGE /tools/gym-gst-calculator
  wave: Wave 2
  primary: gym membership gst calculator [P1, English, GST billing, Tool]
  sheet notes: gym membership gst calculator: India inputs: 18% GST, inclusive/exclusive
  GATE: CONTENT GATE: CA review; editable rate, default 18%

PAGE /tools/gym-startup-cost-calculator
  wave: Wave 3
  primary: gym business cost in india [P3, English, Start-a-gym, Informational]
  GATE: CONTENT GATE: state-wise licence and cost rules vary; expert review

PAGE /tools/gym-break-even-calculator
  wave: Wave 1
  primary: gym break even calculator [P1, English, Tools, Tool]
  sheet notes: gym break even calculator: India inputs: rent by city tier, GST

PAGE /tools/gym-membership-pricing-calculator
  wave: Wave 2
  primary: gym membership pricing calculator [P1, English, Tools, Tool]

PAGE /tools/gym-churn-calculator
  wave: Wave 3
  primary: gym churn rate calculator [P2, English, Tools, Tool]

PAGE /tools/gym-revenue-calculator
  wave: Wave 3
  primary: gym revenue calculator [P3, English, Tools, Tool]

PAGE /templates/diet-charts
  wave: Wave 3
  primary: indian diet chart for gym members [P3, English, Diet/workout, Informational]
  sheet notes: indian diet chart for gym members: Long-term template library
  GATE: CONTENT GATE: nutritionist review before publishing; build as draft; no medical claims

PAGE /blog/best-gym-management-software-india
  wave: Wave 2
  primary: best gym management software in india [P2, English, Head term, Commercial investigation]
  secondary: best gym software india 2026 [P2]
  sheet notes: best gym management software in india: Build own honest listicle with dated price table | best gym software india 2026: Same page; refresh title yearly
  GATE: ACCURACY GATE: same rules as compare pages; disclose that Fitvario makes this site

PAGE /blog/gym-renewal-reminder-message-formats
  wave: Wave 1
  primary: gym membership renewal message format [P1, English, WhatsApp, Informational]
  sheet notes: gym membership renewal message format: Copy-paste templates; high link/share potential

PAGE /blog/gym-lead-follow-up-script
  wave: Wave 2
  primary: gym lead follow up script [P2, English, CRM, Informational]
  sheet notes: gym lead follow up script: Add Hinglish version

PAGE /blog/gym-referral-program
  wave: Wave 3
  primary: gym referral program ideas india [P3, English, CRM, Informational]
  sheet notes: gym referral program ideas india: Ties to referral/coins feature (verified in code)

PAGE /blog/gym-software-pricing-in-india
  wave: Wave 2
  primary: gym management software cost [P1, English, Pricing, Commercial investigation]
  sheet notes: gym management software cost: Honest pricing guide with Fitvario tiers
  GATE: DECISION GATE: needs real pricing config

PAGE /blog/reduce-gym-member-churn-india
  wave: Wave 2
  primary: how to reduce gym member churn [P1, English, Problem-led, Informational]
  secondary: gym member retention strategies india [P1]
  sheet notes: how to reduce gym member churn: Win with India examples | gym member retention strategies india: Same page; H2 variants

PAGE /blog/get-more-gym-members-india
  wave: Wave 2
  primary: how to get more gym members india [P1, English, Problem-led, Informational]
  sheet notes: how to get more gym members india: Instagram, Google Maps, referral, WhatsApp

PAGE /blog/gym-membership-pricing-india
  wave: Wave 1
  primary: gym membership pricing strategy [P1, English, Problem-led, Informational]
  secondary: gym membership plans and fees india [P2]
  sheet notes: gym membership pricing strategy: Pairs with pricing calculator

PAGE /blog/gym-freeze-policy-template
  wave: Wave 3
  primary: gym membership freeze policy [P3, English, Problem-led, Informational]
  GATE: CONTENT GATE: template, not legal advice; expert review

PAGE /blog/gym-fee-collection-tips
  wave: Wave 2
  primary: how to collect gym fees on time [P2, English, Problem-led, Informational]

PAGE /blog/how-to-start-a-gym-in-india
  wave: Wave 3
  primary: how to start a gym in india [P2, English, Start-a-gym, Informational]
  sheet notes: how to start a gym in india: Pillar; pairs with break-even tool
  GATE: CONTENT GATE: licences, costs and tax need expert review

PAGE /hi/gym-fee-reminder-message
  wave: Wave 2
  primary: gym fee reminder message in hindi [P1, Hinglish, WhatsApp, Informational]
  sheet notes: gym fee reminder message in hindi: Hinglish template page

PAGE /hi/
  wave: Wave 2
  primary: gym management software hindi [P1, Hinglish, Hindi/Hinglish, Commercial]
  secondary: gym ke liye software [P2, Hinglish]
  sheet notes: gym management software hindi: Validate with a phone SERP check first
  GATE: VALIDATION GATE: Sumit's phone SERP check first (Prompt 5, Step 0)

PAGE /hi/gym-billing-software
  wave: Wave 2
  primary: gym ka billing software [P1, Hinglish, Hindi/Hinglish, Commercial]

PAGE /hi/gym-software-kaise-chune
  wave: Wave 2
  primary: gym software kaise chune [P2, Hinglish, Hindi/Hinglish, Informational]

PAGE /hi/whatsapp-reminder
  wave: Wave 2
  primary: gym ka fees reminder whatsapp [P1, Hinglish, Hindi/Hinglish, Informational]

PAGE /hi/blog/gym-me-member-kaise-badhaye
  wave: Wave 3
  primary: gym me member kaise badhaye [P2, Hinglish, Hindi/Hinglish, Informational]
  sheet notes: gym me member kaise badhaye: YouTube companion

PAGE /compare/easy-gym-software-alternative
  wave: Wave 2
  primary: easy gym software alternative [P2, English, Comparison, Commercial investigation]
  sheet notes: easy gym software alternative: Factual, cited, dated
  GATE: ACCURACY GATE: cited public facts with verified dates; legal read; draft until cleared

PAGE /compare/okfit-alternative
  wave: Wave 2
  primary: okfit alternative [P2, English, Comparison, Commercial investigation]
  GATE: ACCURACY GATE: cited public facts with verified dates; legal read; draft until cleared

PAGE /compare/gymsmart-alternative
  wave: Wave 3
  primary: gymsmart alternative [P3, English, Comparison, Commercial investigation]
  GATE: ACCURACY GATE: cited public facts with verified dates; legal read; draft until cleared

PAGE /compare/mindbody-alternative-india
  wave: Wave 2
  primary: mindbody alternative india [P2, English, Comparison, Commercial investigation]
  GATE: ACCURACY GATE: cited public facts with verified dates; legal read; draft until cleared

PAGE /compare/gymmaster-alternative-india
  wave: Wave 3
  primary: gymmaster alternative india [P3, English, Comparison, Commercial investigation]
  GATE: ACCURACY GATE: cited public facts with verified dates; legal read; draft until cleared

PAGE /gyms/bhopal
  wave: Wave 3
  primary: gyms in bhopal [P2, English, Local/programmatic, Local]
  sheet notes: gyms in bhopal: Goal is owner backlinks, not consumer traffic
  GATE: QUALITY GATE: Prompt 7A/7B only; indexable hub only when >= 5 qualifying opted-in gyms; no consumer doorway pages

PAGE /gyms/bhopal/arera-colony
  wave: Wave 3
  primary: gyms in arera colony bhopal [P2, English, Local/programmatic, Local]
  sheet notes: gyms in arera colony bhopal: Template: /gyms/[city]/[area]
  GATE: QUALITY GATE: Prompt 7A/7B only; same hub threshold

PAGE /gyms/[city]/[area]
  wave: Wave 3
  primary: gym fees in [area] [city] [P3, English, Local/programmatic, Local]
  sheet notes: gym fees in [area] [city]: Pattern; only with owner-entered fees
  GATE: PATTERN, not a page to generate now; Prompt 7 template, owner-entered fees only

PAGE /gyms/[city]/[area]/[slug]
  wave: Wave 3
  primary: [gym name] [area] [city] [P3, English, Local/programmatic, Navigational]
  sheet notes: [gym name] [area] [city]: Brand queries for each gym
  GATE: PATTERN, not a page to generate now; Prompt 7 profile template, opt-in plus quality gate

SUPPORT PAGES (no target keyword): /features (hub), /contact, /about, /customers and /customers/[case-study] (only with real, permitted customers), /thank-you (noindex), 404, existing legal, support, grievance and delete-account pages.

Start with Phase 0 now.
````

---

## PROMPT 2: Feature and segment pages

Prompt 1 merge/review ke baad, naye session mein, fitvario-landing.

````
Read first: docs/seo/SEO_RULES.md, keyword-map.md, product-facts.md, feature-status.json, TODO_FOR_SUMIT.md, page-tracker.csv, content-briefs/, and the three pilot feature pages plus their templates. Read the relevant guides in node_modules/next/dist/docs/ before writing code (see AGENTS.md). Every HARD RULE and PAGE STANDARD in SEO_RULES.md applies. Continue on branch `seo-overhaul` (or branch `seo-features` from it).

TASK
Build the remaining feature and segment pages from the keyword map. For each page: (1) read its content brief and gate; (2) if the gate is not satisfied, build it as a DRAFT (noindex, not in sitemap, nav or links) and log it in TODO_FOR_SUMIT.md; (3) write unique content; (4) include EVERY primary and secondary keyword of that page from keyword-map.md at least once, naturally; (5) add internal links both ways (hub, siblings, tool, blog, compare); (6) update page-tracker.csv and the sitemap; (7) run scripts/seo-check. Commit after every 2-3 pages. Describe only behaviour in product-facts.md that feature-status.json marks live; read the backend (path in product-facts.md) to confirm details, and cite file paths in the content brief only.

PAGES
- /features/member-app. Keywords: gym management app india; branded gym app for members; gym member management app (Hinglish query, add a short Hinglish FAQ block). Gate: real store links in config, otherwise no store badges. Android only; do not claim iOS. Member-side features to cover when live: plan and subscription status, QR check-in, workout and diet tracking, progress photos, BMI/BMR/measurements, trainer, referral and coins, notifications, reminder preferences. Login is OTP and password; do not say "passwordless".
- /features/biometric-attendance. Keywords: biometric attendance for gym; zkteco gym software; gym fingerprint attendance software; gym access control software india; gym attendance machine software (Hinglish query, add a short Hinglish FAQ block). GATE: ADMS/ZKTeco biometric "live". Make /pricing consistent either way. Describe supported devices only as confirmed by me; the code implements the ZKTeco-style ADMS push protocol (device management, command queue, punch logs, member-to-device user mapping, block/unblock, validity resync) but lists no device models. Do not claim door-lock or access-controller integration unless confirmed ("access control" keyword: describe blocking expired members on the device only if confirmed).
- /features/qr-attendance. Keyword: gym attendance app qr code. Live per site. Cover member QR check-in, manual and bulk marking by owner/staff, attendance analytics and top attenders, auto-marking absent, and why QR and biometric differ without overselling.
- /features/white-label-gym-app. Keywords: white label gym app india; gym app with own branding. GATE: white-label live. If not confirmed, use the site's "gym-branded Android app" wording and keep this page draft.
- /features/multi-branch-gym-software. Keyword: multi branch gym software. Franchise > gyms, branch-scoped staff, multi-branch analytics for revenue, members, attendance and CRM.
- /features/diet-workout-plans. Keywords: gym diet plan software; workout plan builder for gym trainers. Plan builders, assignment, restart/remove, member plan requests with approval, member progress tracking. Template marketplace only if live.
- /for/small-gyms. Keyword: gym software for small gyms india. Write for the 100-300 member gym owner: what they actually need, what to ignore, a setup checklist. No price claims unless pricing config exists.
- /for/franchise-gyms. Keywords: franchise gym management software; gym chain management software india. Branch-level permissions, consolidated reports, owner vs branch-manager visibility, only as live.
- /for/crossfit-yoga-studios. Keywords: crossfit gym software india; yoga studio software india. The product has batches (time slots) and opening hours but no class booking, capacity or enrolment. Write about batches, attendance, membership packs and plan tracking; never promise class booking. If the two audiences would be thin or duplicate, keep one page with two clearly separate sections.

Also refine the three pilot pages (gst-billing, whatsapp-reminders, gym-crm) so all of their keywords are covered: gym software with gst billing; gym billing software india; gym partial payment dues tracking software; whatsapp reminders for gym; gym membership renewal reminder; gym whatsapp automation; whatsapp business api for gym (only per my provider answer); gym crm software india; gym lead management software; gym enquiry follow up app.

Update the /features hub, header menu and footer so every page is reachable. Finish with a 5-line summary plus the list of draft pages awaiting my decision.
````

---

## PROMPT 3: Tools and templates

````
Read first: docs/seo/SEO_RULES.md, keyword-map.md, product-facts.md, feature-status.json, TODO_FOR_SUMIT.md, page-tracker.csv, and the existing templates. Read the relevant guides in node_modules/next/dist/docs/ first (AGENTS.md). All HARD RULES and PAGE STANDARDS apply. Branch `seo-tools` from `seo-overhaul`.

TASK
Build seven free tools and one template page. These attract gym owners, earn links and feed the demo funnel. They must be genuinely useful and correct.

TOOL REQUIREMENTS (all tools)
- Client-side only. No login, no data sent anywhere unless the user explicitly submits the optional "email me this result / talk to us" form (reuse DemoForm in a light variant).
- Mobile-first, keyboard accessible, shareable state via query parameters, a copy-result button, print-friendly result.
- All defaults are editable assumptions labelled "illustrative, replace with your numbers". Never present defaults as market data or benchmarks. Never include unsourced statistics.
- Show the formulas used and a worked example (labelled as an example) below the tool, plus how-to-use, 4-6 FAQs, related posts and a CTA. At least 500 words of original explanation.
- Unit tests for every calculation (add a test runner only if the repo has none; keep it light). Edge cases: zero, negatives rejected, GST inclusive vs exclusive, rounding to paise. Fire the calculator_use analytics event on first meaningful interaction.
- Include every keyword of the page from keyword-map.md naturally. Put calculation logic in plain functions separate from the UI so it can be tested.

PAGES
- /tools/gym-break-even-calculator. Keyword: gym break even calculator. Inputs: city tier with editable rent bands, area, rent, trainer salaries, utilities, equipment EMI, marketing, software, average membership fee, GST handling. Outputs: break-even member count, monthly profit at a chosen member count, a simple sensitivity table.
- /tools/gym-gst-calculator. Keyword: gym membership gst calculator. Inclusive vs exclusive amount, editable rate with 18% as the default and a "verify the current rate with your CA" note, CGST+SGST vs IGST split, invoice line preview. Flag for CA review in TODO_FOR_SUMIT.md.
- /tools/gym-membership-pricing-calculator. Keyword: gym membership pricing calculator. Cost-plus and target-margin methods, plan durations (1/3/6/12 months) with editable discounts, suggested price ladder.
- /tools/gym-churn-calculator. Keyword: gym churn rate calculator. Monthly churn, retention, average member lifetime, lifetime value, revenue lost to churn; scenarios for reducing churn.
- /tools/gym-revenue-calculator. Keyword: gym revenue calculator. Members x fee x plan mix plus personal training and store revenue; 12-month projection.
- /tools/gym-startup-cost-calculator. Keyword: gym business cost in india. Line-item setup costs with editable defaults; licences and local rules vary by state and must be verified; expert-review flag.
- /tools/gym-invoice-generator. Keywords: gym invoice format gst; gym fees receipt format. Browser-only invoice and receipt generator (gym details, optional GSTIN, member, plan, amount, GST toggle, invoice number, date); print or save as PDF via the browser. Mark as a sample format and add the CA note. Do not claim Fitvario generates GST invoices unless feature-status.json says so; the safe wording is the invoice, tax-line and dues management that is live.
- /templates/diet-charts. Keyword: indian diet chart for gym members. Generic Indian diet-chart templates (vegetarian, eggetarian, non-vegetarian; fat loss, muscle gain, maintenance) as printable pages with copy buttons. General information only, no medical claims, no calorie prescriptions for medical conditions, says to consult a qualified dietitian. Build as DRAFT until I confirm a nutritionist has reviewed it.

Link each tool from the matching blog post and feature page. Finish with a 5-line summary and the list of items needing expert review.
````

---

## PROMPT 4: Blog engine and posts

````
Read first: docs/seo/SEO_RULES.md, keyword-map.md, product-facts.md, feature-status.json, TODO_FOR_SUMIT.md, page-tracker.csv, and the existing templates. Read the relevant guides in node_modules/next/dist/docs/ first (AGENTS.md). All HARD RULES and PAGE STANDARDS apply. Branch `seo-blog` from `seo-overhaul`.

TASK 1: Blog engine
Markdown or MDX posts with front-matter (title, description, slug, primaryKeyword, secondaryKeywords, updated, published, author, category, draft), using the content approach this Next.js version documents. Table of contents, reading time, related posts, prev/next, author box from config, RSS at /blog/rss.xml, blog index with pagination. Category pages are noindex unless they hold at least 5 substantial posts. No tag pages. BlogPosting JSON-LD and BreadcrumbList. Flat URLs: /blog/<slug>.

TASK 2: Write the 11 mapped posts (each must include all of its keywords from keyword-map.md naturally)
1. /blog/gym-renewal-reminder-message-formats. Keyword: gym membership renewal message format. Copy-paste templates (English), timing strategy (days before and after expiry), do and don't. Different content from /hi/gym-fee-reminder-message; no shared sentences.
2. /blog/gym-membership-pricing-india. Keywords: gym membership pricing strategy; gym membership plans and fees india. Pricing logic, plan ladder, discount discipline, festival offers; link the pricing calculator.
3. /blog/reduce-gym-member-churn-india. Keywords: how to reduce gym member churn; gym member retention strategies india. Attendance-drop signals, follow-up routines, renewal timing; Indian examples labelled as examples; link the churn calculator.
4. /blog/get-more-gym-members-india. Keyword: how to get more gym members india. Instagram, Google Maps profile, referrals, WhatsApp, local partnerships, trial-pass funnel.
5. /blog/gym-fee-collection-tips. Keyword: how to collect gym fees on time. Dues follow-up scripts, partial payments, reminders.
6. /blog/gym-lead-follow-up-script. Keyword: gym lead follow up script. Call and WhatsApp scripts for walk-ins, enquiries and no-shows, English plus a short Hinglish version.
7. /blog/gym-referral-program. Keyword: gym referral program ideas india. Reward structures, tracking, abuse prevention; mention Fitvario referral and loyalty coins only as live.
8. /blog/gym-freeze-policy-template. Keyword: gym membership freeze policy. Editable policy text; "template, not legal advice" notice and an expert-review flag. Mention Fitvario freeze/unfreeze and gift days only as live.
9. /blog/how-to-start-a-gym-in-india. Keyword: how to start a gym in india. Pillar guide: location, layout, equipment, staffing, licences, pricing, marketing, first 90 days; every licence, tax or cost statement carries a "verify locally" note and an expert-review flag; link the break-even and startup-cost calculators.
10. /blog/gym-software-pricing-in-india. Keyword: gym management software cost. DECISION GATE: needs the real pricing config. Honest guide to pricing models and what drives cost; competitor prices only if publicly stated, cited and dated.
11. /blog/best-gym-management-software-india. Keywords: best gym management software in india; best gym software india 2026. Honest, dated listicle. Disclose at the top that Fitvario makes this site. Every competitor statement needs a cited public source and a verified date. Include "where Fitvario is not the best fit". Refresh the year in title and content when updated.

POST RULES
- Original angle for an Indian gym owner, concrete examples, templates, checklists, tables. No filler introductions.
- Never invent statistics, studies or quotes. A statistic needs a linked source and date, otherwise leave it out.
- Byline from config; "Last updated" date; a Sources section when anything is cited.
- Each post links to one feature page, one tool (if relevant), one more post, and ends with a CTA matching the topic.
- 900-1,800 words depending on the topic; never pad.
- Reuse nothing word-for-word from other posts or pages; scripts/seo-check must pass.

Do NOT write extra posts beyond these 11. Finish with a 5-line summary and a list of posts that need expert review.
````

---

## PROMPT 5: Hinglish section (/hi/)

````
Read first: docs/seo/SEO_RULES.md, keyword-map.md, product-facts.md, feature-status.json, TODO_FOR_SUMIT.md, page-tracker.csv, and the existing templates. Read the relevant guides in node_modules/next/dist/docs/ first (AGENTS.md). All HARD RULES and PAGE STANDARDS apply. Branch `seo-hinglish` from `seo-overhaul`.

STEP 0 (ask me once, then continue)
The workbook marks the Hinglish opportunity as "validate with a phone SERP check first", because the research used a US-only search tool. Give me this list to search on my phone in Google India: gym management software hindi; gym ke liye software; gym ka billing software; gym software kaise chune; gym ka fees reminder whatsapp; gym fee reminder message in hindi; gym me member kaise badhaye. Ask me to tell you, for each, whether Hindi or Hinglish gym-software pages already rank. Pages for queries with strong Hinglish competitors are still built, but flagged as lower expectation.

BUILD
Roman-script Hinglish, written the way a gym owner talks and types on WhatsApp. NOT a literal translation of the English pages and not machine-sounding. Set the document language correctly for these pages (`hi-Latn`, using the documented way in this Next.js version, since the root layout sets `lang`). Each page is its own content for its own query, with a self-referencing canonical. Add hreflang only between pages that are true equivalents, and check Google's current hreflang documentation first. Do not auto-redirect users by language. Devanagari versions are out of scope.

PAGES (every keyword included naturally)
- /hi/ hub. Keywords: gym management software hindi; gym ke liye software. Overview in Hinglish, links to all /hi/ pages and to the English feature pages.
- /hi/gym-billing-software. Keyword: gym ka billing software. Billing, dues, partial payments and invoices as live; tax lines/GST only if live; plain explanation of fee collection and partial payments.
- /hi/whatsapp-reminder. Keyword: gym ka fees reminder whatsapp. How automated WhatsApp, SMS and push reminders work (expiring memberships, due payments, birthdays, campaigns, credits); sample message flows; placeholder for the Hindi YouTube demo (TODO). Do not say "WhatsApp Business API" unless confirmed.
- /hi/gym-fee-reminder-message. Keyword: gym fee reminder message in hindi. A template library of Hinglish fee and due reminder messages with copy buttons; different content from the English renewal-template post.
- /hi/gym-software-kaise-chune. Keyword: gym software kaise chune. A neutral buyer's checklist: features, support, data export, pricing, WhatsApp, GST, biometrics; questions to ask any vendor; red flags. No competitor bashing.
- /hi/blog/gym-me-member-kaise-badhaye. Keyword: gym me member kaise badhaye. Practical member-acquisition guide in Hinglish; YouTube companion placeholder; must not duplicate the English get-more-members post.
- Also add a short Hinglish FAQ block (4 questions) to /features/member-app and /features/biometric-attendance if not already added in Prompt 2.

Add a small "Hinglish mein dekhein" link in the header or footer, and link /hi/ from the home page. Finish with a 5-line summary.
````

---

## PROMPT 6: Comparison pages

````
Read first: docs/seo/SEO_RULES.md, keyword-map.md, product-facts.md, feature-status.json, TODO_FOR_SUMIT.md, page-tracker.csv, and the existing templates. Read the relevant guides in node_modules/next/dist/docs/ first (AGENTS.md). All HARD RULES and PAGE STANDARDS apply. Branch `seo-compare` from `seo-overhaul`.

TASK
Build five comparison pages for people evaluating alternatives. Accuracy is the whole point; a wrong or unfair claim is worse than no page.

PAGES AND KEYWORDS
- /compare/easy-gym-software-alternative: easy gym software alternative
- /compare/okfit-alternative: okfit alternative
- /compare/gymsmart-alternative: gymsmart alternative
- /compare/mindbody-alternative-india: mindbody alternative india
- /compare/gymmaster-alternative-india: gymmaster alternative india

PROCESS
1. Fact collection. For each competitor, open its public pages (home, pricing, features, FAQ, app store listing, directory listings). Record every fact you intend to use in docs/seo/competitor-facts.csv with: competitor, claim, source URL, date verified, short quote (15 words or fewer) or paraphrase. If a page cannot be fetched, do not make the claim.
2. Only use facts publicly stated on a source you can cite. Prices only if publicly stated; show the date. Never state or imply anything about a competitor's quality, reliability, support, customers or numbers that you cannot cite. Treat vendor-published figures as claims ("Easy Gym says it has ...").
3. Page structure: who each tool is for; an honest feature comparison table (Fitvario column uses only capabilities marked live in feature-status.json); where the competitor is the better choice; where Fitvario fits better; pricing as publicly stated with date; migration notes only if Fitvario really offers them; a decision checklist; a Sources section; a visible "Last verified: <date>" line; the footer note "All product names and trademarks belong to their owners. Information is based on public sources as of <date>. Tell us if anything is out of date." and a contact link for corrections.
4. Tone: neutral, specific, no insults, no superlatives, no "best" claims. No competitor logos.
5. Mindbody and GymMaster are global products; frame around Indian owners' needs (rupee pricing, GST, WhatsApp, local support) using only cited facts.
6. Add a monthly review reminder to TODO_FOR_SUMIT.md and a `verifiedOn` field that the sitemap lastmod does not fake.
7. List these pages in TODO_FOR_SUMIT.md for a legal read; build them as DRAFT until I clear them.

Link the pages from the footer Compare column and from the "best gym management software in india" post. Finish with a 5-line summary.
````

---

## PROMPT 7A: Gym pages, data layer (run in fitvario-backend)

Pehle ye. Public gym profile abhi `PublicGymProfileView` (`auth_core/views/marketing_views.py`, `GET /api/public/gym/<slug>/profile`) se sirf JSON deta hai, to HTML pages marketing site (Next.js) banayegi, 7B mein. Ye prompt sirf backend ka data, consent aur gate banata hai.

````
You are a senior Django engineer working in `fitvario-backend` (Django, DRF, Postgres, Redis, Celery). Goal: give the marketing site a safe, consent-based data feed to render public gym pages. You build ONLY the data, consent, quality gate and sitemap feed. You do NOT build HTML pages (that is Prompt 7B in the marketing repo).

GIT WORKFLOW (follow exactly)
- `git fetch`; branch from `origin/main`, name `feat/gym-public-pages`. Do not use `feat/invoice-subscription-sync` (stale vs main). Diff against `origin/main`, not local branches. Commit messages are plain `type: message`. NEVER add Co-Authored-By or "Generated with" lines. PR target is `staging`; do not push to main and do not deploy. One feature at a time; if you find unrelated bugs, list them, do not fix them.
- Comments read like a teammate's quick note; name methods so the "why" is obvious instead of explaining it in comments.

SAFETY RULES
- Never run against production or real data. No real accounts, DB or R2. Use throwaway local resources or test fixtures only. Never read or print `.env`.
- Pytest may not run here (the configured DB host is unreachable on a clean checkout). Write the tests anyway, try to run them against a local throwaway database, and if that is impossible say so plainly in your summary instead of claiming they pass.
- All earlier SEO rules apply: no fabrication, no doorway pages, no scaled low-value content, no auto-generated gym copy.

STEP 0 (read-only, then STOP and ask)
Read `PublicGymProfileView`, `_gym_profile_queryset`, the Gym model and related models (gallery, highlights, plans, schedule, batches, address/geo/phone fields, slug), the existing visibility flags (`is_active`), activity-log conventions, the notification facade (never call providers directly), caching conventions (Redis, `invalidate_*` helpers), and the entitlement system (`has_feature`). Report: which fields exist for address, city, area, geo, phone, description, facilities, trainers, FAQs (note: the FAQ model is platform-level, not per-gym); how slugs are generated and whether they are unique across cities; what the profile endpoint currently exposes and whether any of it is private. Then ask me: consent wording for owners; which fields are mandatory; how white-label gyms should canonicalise; whether to add a `public_page` plan feature flag; where the owner opt-in lives in the web dashboard.

BUILD (after my answers; migrations are additive and reversible)
1. Consent model: per-gym `public_page_consent` (opted_in, opted_in_at, wording_version, opted_in_by, hidden_at). Never expose a gym on any new public endpoint without opt-in. Owner endpoints (org scope, via the helpers in `auth_core/permissions/base.py`) to opt in, edit public fields, and hide the page (hiding = 410 within 24 hours, purge caches, drop from the sitemap feed). Log opt-in and hide in the activity log.
2. Public fields owner-editable and approved: public description (owner-written, min 120 words to qualify), facilities, mandatory city and area as normalised values (not free text), phone-publish choice, fee range or plans shown, 3-5 owner FAQs (new per-gym model; do not reuse the platform FAQ model). No auto-generated text.
3. `is_indexable(gym)` as a pure, unit-tested function in its own module. Indexable only if ALL: opted in and not hidden; at least 120 words of unique owner text; at least 4 photos with alt text; address and phone verified; at least 3 plans or a fee range; description not duplicated on any other gym (content-hash check, normalised); owner-approved. Return the reasons when false (list of failed conditions).
4. Public read endpoints (AllowAny, no JWT; keep paths under `/api/public/`, which is outside the exempt-path list, so check `AuthContextMiddleware` and `SubscriptionGuardMiddleware` behaviour for anonymous requests and add the new prefix to exemptions deliberately): gym page by city/area/slug returning only whitelisted public fields plus `indexable` and `reasons` flags; area hub and city hub listing endpoints that return qualifying gyms with a short owner-written summary (hub qualifies at 5 qualifying gyms; a city hub at 2 qualifying area hubs); a sitemap feed endpoint returning only indexable URLs with real `lastmod` (profile `updated_at`), paginated at under 50,000 per page. Hidden gyms return 410, unknown return 404. No member data, no private fields, no owner contact data beyond what the owner chose to publish.
5. Performance: cache responses in Redis with a distinct key prefix and invalidate on profile change, consent change, gallery change; avoid N+1 queries (prefetch like the existing profile view); throttle anonymous endpoints (see `auth_core/throttles.py`) and the owner edit endpoints.
6. Old slug-only endpoint stays working and unchanged for the mobile app. Add the canonical `city/area/slug` path to its response so 7B can redirect.
7. Management command `report_public_gym_pages` printing per city: eligible, ineligible with reasons, hidden counts. Read-only.
8. Entitlements: if I say the feature is plan-gated, use `has_feature`; call `invalidate_plan_cache(owner_id)` on any plan change.
9. Tests: `is_indexable` for each gate condition; hub thresholds; hidden gym returns 410; anonymous access works without JWT; private fields never appear; sitemap feed contains only eligible URLs; cache invalidation on change; opt-in required.
10. Feature-flag the whole feature (env or settings) so nothing is exposed until I switch it on. Pilot in Bhopal with 10-20 opted-in gyms; do NOT bulk-create pages or bulk-opt-in anyone.

Finish with a 5-line summary, the migration and flag instructions, API contract (paths + JSON shape) for 7B, and the owner-facing consent copy I must approve.
````

---

## PROMPT 7B: Gym pages, rendering (fitvario-landing)

7A merge hone ke baad.

````
Read first: docs/seo/SEO_RULES.md, keyword-map.md, product-facts.md, feature-status.json, TODO_FOR_SUMIT.md, the 7A API contract, and the Next.js docs in node_modules/next/dist/docs/ (AGENTS.md) covering server rendering, revalidation/caching, metadata, sitemaps (including multiple sitemaps) and 404/410 handling. All HARD RULES apply. Branch `seo-gym-pages` from `seo-overhaul`. The backend API base URL comes from an env var; never hard-code it and never call anything but the documented public endpoints.

BUILD
1. Routes: /gyms (directory), /gyms/<city>, /gyms/<city>/<area>, /gyms/<city>/<area>/<gym-slug>. Server-rendered HTML with content in the initial response, revalidated on a sensible interval using the documented mechanism. If the API returns `indexable: false` or a hub below threshold, render the page with `noindex,follow` and keep it out of the sitemap. 404 for unknown, 410 for hidden (use the documented approach; if this Next.js version cannot return 410 for a page route, tell me and use the closest documented alternative and say so). Old slug URLs redirect 301 to the canonical path.
2. Profile template: H1 "<Gym name>, <Area>, <City>"; address with map link; opening hours; plans or fee ranges (owner-entered only); facilities; trainers; gallery with alt text; owner FAQs (3-5); nearby gyms; "Claim or edit this page" (links to the owner dashboard); footer link "Powered by Fitvario" to the home page with the brand name as anchor text, not keyword-rich anchors.
3. Structured data: ExerciseGym (or HealthClub) with name, url, image, address, geo, telephone (only if published), openingHoursSpecification, priceRange; BreadcrumbList on every page. NO AggregateRating or review markup unless real, visible, verifiable reviews exist.
4. Hubs list gyms with a short owner-written summary, not copied profile text. "gyms in bhopal" and "gyms in arera colony bhopal" are served by the Bhopal hubs only once the 7A thresholds pass. "Gym fees in <area> <city>" content appears only as a section built from owner-entered fees on hubs that pass the gate; never auto-generate fee text.
5. Sitemap: a dedicated gym sitemap generated from the 7A feed (documented multi-sitemap mechanism), indexable URLs only, real lastmod, referenced from robots.
6. Performance and safety: no member data; images via the framework image handling with explicit sizes; graceful behaviour (cached page or friendly error, never a stack trace) if the API is down.
7. Tests: noindex and sitemap exclusion for ineligible pages, 410/404 handling, redirect from old slug, JSON-LD validity, hub thresholds, API-down behaviour (mock the API).
8. Everything behind a feature flag env var, off by default.

Finish with a 5-line summary and the owner-facing copy I must approve.
````

---

## PROMPT 8: Final QA, keyword coverage and handoff (fitvario-landing)

````
Read first: docs/seo/SEO_RULES.md, keyword-map.md, product-facts.md, feature-status.json, TODO_FOR_SUMIT.md, page-tracker.csv, SEO_CHANGELOG.md. Read the relevant Next.js docs in node_modules/next/dist/docs/ first (AGENTS.md). Branch: integration branch `seo-release` merging seo-overhaul, seo-tools, seo-blog, seo-hinglish, seo-compare and seo-gym-pages (resolve conflicts, do not drop content). Do not deploy.

TASK
Audit the whole site as Googlebot and as a mobile user, fix what is wrong, and hand me a launch report.

CHECKS (script everything that can be scripted, keep scripts in scripts/)
1. Build passes. Crawl the built site locally: HTTP status of every internal link, no 404s, no redirect chains, no mixed content, no www/apex links, trailing-slash consistency.
2. Per page: unique title (50-60 characters), unique description (120-155), exactly one H1, canonical correct, robots meta as intended, Open Graph present, JSON-LD parses, images have alt, no orphan pages, depth from home 3 clicks or fewer.
3. Sitemap equals the set of indexable pages exactly; drafts, noindex pages, thank-you and 404 are absent; lastmod values are real and differ across pages. robots does not disallow any noindex page.
4. KEYWORD COVERAGE. Write `scripts/keyword-coverage`. For every one of the 76 keywords in keyword-map.md that belongs to a published page, check that the keyword (or a close natural variant) appears in that page's title, H1, an H2, body or FAQ. Report in a table: keyword, page, where it appears, status (covered / missing / page is draft and blocked by <gate>). Fix every "missing" by editing the copy naturally; never stuff. Pattern keywords are reported as "handled by Prompt 7".
5. Duplicate-content check: no two pages share more than 25% identical sentences (scripts/seo-check). Check that primary keywords are not shared by two pages (cannibalisation) except where the map assigns one page to several keywords.
6. Feature-truth audit: list every capability claimed anywhere on the site and match it to feature-status.json; flag any claim whose status is not "live" or "live-per-site"; fix by removing or drafting. Explicitly re-check the NO-EVIDENCE list in product-facts.md (class booking, staff salary/attendance, per-gym FAQs, Excel/PDF export, passwordless-only login, "WhatsApp Business API") and /pricing vs /features consistency (biometrics, exports).
7. Conversion audit: every indexable page has a visible demo CTA and WhatsApp/call access on mobile; DemoForm validates, rate-limits, delivers to the webhook/email and fires demo_submit; thank-you page is noindex.
8. Performance: Lighthouse mobile for /, /pricing, /features, one feature page, one tool, one blog post, one /hi/ page, one /gyms/ page if enabled. Targets: LCP 2.5 s or less, INP 200 ms or less, CLS 0.1 or less, accessibility 90 or more. If Lighthouse cannot run here, give exact commands.
9. Security headers sanity (HSTS if the host supports it, no exposed source maps, no secrets in the bundle).

OUTPUT
- Fix everything you can in code. Commit with a clear message per fix group (plain `type: message`, no attribution lines).
- Update SEO_CHANGELOG.md and page-tracker.csv.
- Write docs/seo/LAUNCH_CHECKLIST.md in plain language: DNS and redirect confirmation commands (curl -I for http/https and www/apex), Search Console steps (verify via DNS TXT, submit sitemap, URL Inspection on 10 key pages, Pages report review), Bing import from Search Console, GA4 conversion events to mark, Rich Results Test URLs, PageSpeed URLs, and a 30/60/90-day review plan naming the exact Search Console reports and queries to export.
- If I place a Google Keyword Planner export at docs/seo/keyword-planner.csv, add `scripts/merge-volumes` that merges volumes into keyword-map.md and proposes a re-ranked top 10 P1 list (the current 25 P1 keywords are too many).
- Final message: pass/fail table of all checks, what is blocked on me (from TODO_FOR_SUMIT.md), and the 5 highest-impact next actions.
````

---

## Tere kaam (code ke bahar, Claude Code ye nahi kar sakta)

**Pehle 48 ghante:**
- Search Console aur Bing verify (DNS TXT), GA4 property bana, ID env mein daal.
- Pricing ka faisla: backend mein self-serve plans (Starter wagairah) hain aur Razorpay se subscribe hota hai, jabki site "custom quote" aur "we build your account" bolti hai. Decide kar: real tiers dikhane hain, "from ₹X", ya custom quote.
- WhatsApp number, phone, support email, working hours.
- Production mein kaun se features live hain (code mein sab hain, par live confirm tu karega): GST tax lines invoice pe, biometric ADMS, white-label, template marketplace, campaigns/wallet, plan requests, ecommerce orders.
- Jo 5 claims code mein nahi mile (class booking, staff salary/attendance, per-gym FAQs, Excel/PDF export, passwordless-only login), unke baare mein bata ki web dashboard ya Flutter app mein hain ya site se hatane hain.
- WhatsApp provider: code Fast2SMS use karta hai. "WhatsApp Business API" bolna theek hai ya nahi, confirm kar.
- Phone pe 5-7 Hinglish queries Google India mein search kar (Prompt 5 ka Step 0).

**Pehle mahine mein:**
- Real product screenshots: dashboard, WhatsApp reminder, invoice, QR check-in, member app.
- 2-3 existing gym clients se written permission ke saath quote, logo, ek number. PR Fitness / RAW Fitness jaise clients ho sakte hain, owner ki permission ke saath.
- Listings: Capterra, GetApp, Techjockey, SoftwareSuggest, G2, Google Business Profile (Bhopal), LinkedIn, YouTube, Instagram.
- Google Keyword Planner export `docs/seo/keyword-planner.csv` mein; Prompt 8 25 P1 ko ghata ke top 10 banayega.
- CA se GST wale content aur tools ka review, legal se compare pages, nutritionist se diet-chart page.
- Gym owners se public page ke liye consent wording approve (7A).

**Chalte rehne wale kaam:**
- Hindi YouTube demos (billing, WhatsApp reminders); har video ka matching page.
- Listicle authors (Codingclave, Picky Assist) ko outreach; ZKTeco/eSSL dealers se partnership.
- Har mahine Search Console dekh ke decide kar kaunsa page double down karna hai.

---

## v1 se changes (kyun)

1. **Repo facts add kiye.** Marketing site `fitvario-landing` hai: Next.js 16 App Router, aur uska `AGENTS.md` kehta hai ki code likhne se pehle `node_modules/next/dist/docs/` padho. v1 mein "framework detect karo" tha, ab har prompt mein docs-first rule hai. Existing `sitemap.ts`, `robots.ts` reuse karne ko kaha.
2. **PRODUCT FACTS block** (backend se verify), `docs/seo/product-facts.md` ban jaata hai. Feature-status ab 3 status use karta hai: `live-per-site`, `in-code`, `no-evidence`. v1 mein "class scheduling" "claimed by site" ki wajah se safe maana gaya tha; code mein koi booking/enrolment nahi mila.
3. **5 no-evidence claims** explicitly list kiye (class booking, staff salary/attendance, per-gym FAQs, Excel/PDF export, passwordless-only login). Phase 3 aur Prompt 8 inhe hatate/poochte hain.
4. **Understated features** list kiye (cart/checkout/orders, freeze, gift days, dues, batches, PT, campaigns, coins, progress photos, etc.), taaki copy asli product se match kare.
5. **GST gate sharper.** Code mein per-gym tax lines, tax number, per-invoice breakdown aur company GST field hai, par CGST/SGST split, GSTIN on invoice, HSN/SAC verify nahi hue. Gate ab batata hai kya verified hai aur kya nahi.
6. **Biometric / white-label / multi-branch / crossfit gates** mein code evidence add kiya. CrossFit page ka gate ab class booking ka vaada karne se rokta hai.
7. **WhatsApp:** code Fast2SMS WhatsApp use karta hai, to "whatsapp business api" keyword ab provider confirm hone par hi.
8. **Pricing:** v1 ne maana tha site custom-quote hai. Product mein self-serve plans hain, to pricing/onboarding ka sawal Phase 0 mein explicitly pooche jaate hain.
9. **Prompt 7 do hisson mein.** v1 ne maana tha public profile Django templates se serve hota hai. Asal mein `PublicGymProfileView` DRF JSON API hai, HTML nahi. 7A backend (consent, `is_indexable`, hub thresholds, sitemap feed API), 7B Next.js rendering.
10. **7A mein tera git workflow:** `origin/main` se branch, stale `feat/invoice-subscription-sync` se door, PR staging mein, ek feature ek time, no AI attribution lines, real/prod data pe kuch nahi, pytest DB unreachable hai to sach batao.
11. **Hard rule 11 add:** commits mein Co-Authored-By / "Generated with" nahi, comments teammate jaise short.
12. **Scope fix:** marketing sessions backend ko sirf read kar sakte hain (path diya), modify nahi.
13. Chhote fixes: audit/xlsx repo mein nahi hain to Phase 0 bataye; `html lang` Next.js layout ke hisaab se; sitemap/robots existing `.ts` files se.
