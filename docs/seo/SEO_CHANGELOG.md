# SEO changelog

Branch: `seo-overhaul`. One commit per phase.

## 2026-10-10

### Phase 0: discovery (no code changes)
- Built the site and inspected the output HTML. All pages are statically prerendered, so content is visible without JavaScript.
- Audit claim "double-encoded &amp; in the home title": **false**. The built HTML has a single `&amp;`.
- Audit claim "internal links point to www": **false for this repo**. Internal links are relative. The real problem was the reverse: canonical, sitemap, robots and Open Graph said apex, while production redirects apex to www (307).
- Found: missing `og-image.png` and `apple-touch-icon.png`, `og:url` and `og:title` inherited from the layout on every page, `offers.price: "0"` in JSON-LD on every page, build-timestamp `lastmod`, `<meta name="keywords">`, `href="#"` Play Store badge, `mailto:` demo flow.

### Phase 1: technical foundation (`seo: technical foundation`)
- Canonical host is `https://www.fitvario.com` (`src/config/site.ts`), used by canonical, sitemap, robots, Open Graph and JSON-LD.
- `src/lib/seo.ts` `buildMetadata(path)` is the single source for head tags. Titles and descriptions live in the page registry (`src/config/pages.ts`) with a real `updated` date.
- JSON-LD: Organization and WebSite in the layout; SoftwareApplication on home and pricing (offers only from real pricing config, currently none); BreadcrumbList on inner pages. Removed `offers.price "0"`.
- Sitemap generated from the registry: indexable pages only, real `lastmod`, no priority or changefreq. robots allows the site and disallows `/api/` and `/gone`.
- Header Features menu and footer columns (Product, Solutions, Resources, Compare, Company, Legal) are built from the registry, so draft pages never appear.
- 410 mechanism: add a path to `GONE_PATHS` in `next.config.ts`; it rewrites to `/gone`, which answers 410.
- GA4 loads only after "Accept all"; click events (whatsapp, call, cta, outbound) come from link attributes; UTM and first page are kept in sessionStorage and sent only with a submitted lead.
- Brand images generated with `scripts/generate-brand-assets.mjs` (og-image, apple-touch-icon, logo).
- `scripts/seo-check.mjs` checks the built HTML: title/description length and uniqueness, canonical and `og:url`, one H1, JSON-LD parses, sitemap equals the indexable set, robots, internal links, orphans and depth, duplicate sentences (over 25% fails).
- Dev server: pinned `turbopack.root` because a stray `package.json` in the home folder made Turbopack resolve from the wrong place and crash with an out-of-memory error.

### Phase 2: conversion layer (`seo: conversion layer`)
- DemoForm (Turnstile loaded on first touch, honeypot, minimum fill time, Indian mobile validation, DPDP consent) posts to `/api/lead`.
- `/api/lead` delivers to `LEAD_WEBHOOK_URL` and SMTP email. In production, if neither is configured or both fail, it returns an error and the form tells the visitor to use WhatsApp or email. It never reports success for an unsaved lead.
- `/thank-you` is noindex, out of the sitemap, and fires `demo_submit` once.
- Mobile action bar and floating WhatsApp button render only the items that have a configured number.
- Pricing page is config-driven; with no tiers it runs in custom-quote mode with a quote form.

### Phase 3: core pages (`seo: core pages`)
- Home, features hub, pricing, about and contact rewritten. Removed claims with no backend support (see TODO_FOR_SUMIT.md section 4). QR attendance copy corrected.
- Legal and support pages: breadcrumbs, visible updated dates.
- `.env.example` was being ignored by `.gitignore` (`.env*`); added an exception.

### Phase 4: templates and docs (`seo: templates and docs`)
- `ContentLayout`, `Section`, `Faq`, `ExampleBox`, `ScreenshotPlaceholder`, `MidCta` for feature, segment, tool, template, blog, Hinglish and compare pages. Drafts render for review but 404 on the production deployment (`VERCEL_ENV=production`).
- `scripts/gen-seo-docs.mjs` generates `SEO_RULES.md` and `keyword-map.md` (verbatim from the pack), `page-tracker.csv`, and 48 briefs in `content-briefs/`.
- **Deviation from the prompt:** gated pages are not created as stub routes. A route with empty content would ship a thin page the moment a flag is flipped. Their gate lives in the brief and the tracker (status `planned`), and the page is built when the gate is cleared.

### Phase 5: pilot pages (`seo: pilot feature pages`)
- `/features/whatsapp-reminders` (about 1,050 words), `/features/gym-crm` (about 980), `/features/gst-billing` (about 940, **draft**: noindex, out of sitemap/nav/links, 404 on production until `gst_tax_lines` is live).
- Written from the backend code, not from the old site copy. What the code showed, and what changed because of it:
  - **Reminders:** `send_membership_alerts` sends WhatsApp at 7, 3 and 1 days before expiry and the day after, to the member only, skipping frozen, terminated and inactive memberships. Owners can switch each message on or off. Messages cost wallet credits and are skipped when the wallet is empty.
  - **Payment reminders are not claimed.** `notify_due_payments` exists but, per the 25 Sep audit, had no cron on the live server. Removed "payment reminders" wording from home, features and the page registry.
  - **CRM:** enquiry with category, type, plan of interest, follow-up history and a "today" list. No automatic messages to leads, and no reminder when a follow-up is due, so the page says so.
  - **Billing:** tax lines are chosen per invoice (not auto-applied), taxes are worked out after discount, part payments are logged with a timestamp, invoice numbers are automatic per gym. Not claimed: CGST/SGST split, GSTIN printing, HSN/SAC.
- Keyword coverage: all primary and secondary keywords present, except `whatsapp business api for gym` (deliberately not used, per your Phase 0 answer 6). `gym billing software india` appears as "gym billing software in India", a natural variant. `gym crm software india` is in the title and as a variant in the body.

### Phase 6: QA
Checks run on the production build (`node scripts/seo-check.mjs`): 16 pages, 14 indexable, **all pass**. That covers title and description length and uniqueness, canonical and `og:url` per page, one H1, JSON-LD parses, sitemap equals the indexable set with real dates, robots, internal links, orphan pages and depth, and duplicate sentences under 25%.

Production-mode behaviour (`next start`):
- `/api/lead` with no delivery configured returns **503 `not_configured`** (fails loud, never fakes success).
- `/thank-you` is `noindex, follow`. robots.txt disallows only `/api/` and `/gone`. Unknown URLs return 404. `/og-image.png` returns 200.
- With `VERCEL_ENV=production`, `/features/gst-billing` returns **404**, and it is not in the sitemap.
- Dev-mode lead tests: invalid input, valid lead, honeypot, too-fast and missing-consent all behave correctly.

Lighthouse, mobile, local production server (simulated slow 4G):

| Page | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| / | 97 | 100 | 100 | 100 | 2.7 s | 0 | 30 ms |
| /pricing | 97 | 100 | 100 | 100 | 2.5 s | 0 | 40 ms |
| /features | 97 | 100 | 100 | 100 | 2.6 s | 0 | 40 ms |
| /features/gym-crm | 98 | 96 then fixed* | 100 | 100 | 2.5 s | 0 | 30 ms |
| /contact | 98 | 100 | 100 | 100 | 2.3 s | 0 | 10 ms |

\* One screenshot-placeholder text colour failed contrast; fixed after this run, not re-measured.
Accessibility started at 96 everywhere: white text on `teal-600` buttons (3.66:1) and `slate-500` on the dark footer (3.74:1). Buttons are now `teal-700`/`emerald-700` and the footer text `slate-400`.
**LCP is 2.3 to 2.7 s, so the home page (2.7 s) is slightly over the 2.5 s target** on Lighthouse's simulated throttling. INP is not measurable in a lab run. Re-check with PageSpeed Insights once deployed to see real-user (CrUX) numbers.

Bundle size (`.next/static`, uncompressed): JS 640,790 -> 659,408 bytes (+2.9%), CSS 45,761 -> 49,885 bytes (+9%). The growth is the form, analytics, action bar and layout components. No images are loaded on any page.

Rerun Lighthouse yourself:
```
npm run build && npx next start -p 3100
npx lighthouse http://localhost:3100/ --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new"
```
