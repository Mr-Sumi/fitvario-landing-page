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
