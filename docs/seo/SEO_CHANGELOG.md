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

## 2026-10-10 (later): status corrections

Triggered by Sumit: due-payment reminders, online store, workout plans and diet plans are not live; expiry and birthday reminders only after confirmation; "WhatsApp Business API" banned; three keywords dropped.

- `feature-status.json`: new status `not-live`; new keys `due_payment_reminders`, `whatsapp_expiry_reminders`, `whatsapp_birthday_messages`; `ecommerce_cart_orders`, `workout_diet_plans`, `plan_requests_approval` set to `not-live`.
- Copy on home, features hub, pricing, about, support, footer, layout and JSON-LD no longer mentions the store, workout plans, diet plans or automated reminders. The claims are conditional on the flags, so each returns when its flag is flipped.
- `/features/whatsapp-reminders` is gated on `whatsapp_expiry_reminders` and is now a draft (noindex, out of sitemap, nav and links, 404 on production). The CRM page only links to it while it is published.
- `keyword-map.md`: three keywords tagged DROPPED; RULE lines on the fee-reminder and renewal-template pages; GATE on `/features/diet-workout-plans`. `SEO_RULES.md` has a new rule 12.
- `scripts/keyword-coverage.mjs` (new): skips DROPPED keywords and lists them separately, fails on a missing keyword or a dropped keyword still present. `scripts/lib/keyword-map.mjs` is the shared parser.
- `scripts/seo-check.mjs`: now fails on the banned phrase, on claims of automated due-payment/fee reminders, and on "free/cheap gym software".
- Found by the new checks and fixed: `/contact` title contained "Free Gym Software Demo"; the CRM page linked to a draft; home was missing "gym management system in India". Removed the banned phrase from `/refund`.

## 2026-10-11: Prompt 3, tools and templates

- Owner answers applied first: no owner web dashboard (all "web dashboard", "web panel", "staff portal" claims removed; `operatingSystem` is "Android"); `due_payment_reminders` N.
- Four published tools: `/tools/gym-break-even-calculator`, `/tools/gym-membership-pricing-calculator`, `/tools/gym-churn-calculator`, `/tools/gym-revenue-calculator`. Four drafts awaiting review: `/tools/gym-gst-calculator`, `/tools/gym-startup-cost-calculator`, `/tools/gym-invoice-generator` (CA), `/templates/diet-charts` (nutritionist).
- All client-side, no data sent anywhere. State lives in the URL so a result can be shared, except the invoice generator, which keeps member details out of the URL. Defaults are labelled illustrative. `calculator_use` fires once per page on first input.
- Calculations run in paise (`src/lib/calc/`), with 38 unit tests covering zero, negatives, inclusive vs exclusive GST, CGST/SGST odd-paisa split and rounding. `.d.mts` files give TypeScript the types.
- Home page gets a "Free tools" section once tools are published; footer "Resources" column lists them automatically.
- Not done: links from matching blog posts and feature pages (those pages do not exist yet).

## 2026-10-11: Prompt 4, blog engine and posts (branch `seo-blog`)

- Engine: Markdown with a small front-matter reader (no YAML dependency) and `marked` for HTML. `scripts/gen-blog-registry.mjs` runs before every build and writes `src/config/blog-pages.generated.ts`, so posts, the index, pagination pages and category pages go through the same registry as every other page (sitemap, footer, breadcrumbs, `seo-check`).
- Index at `/blog` (10 per page, `/blog/page/N` when needed). Category pages exist but stay `noindex` until a category has 5 public posts, and the index does not link to them while they are noindex. No tag pages. RSS lists public posts only. Draft posts render for review and return 404 on the production deployment.
- Posts: seven public, four drafts. All 11 are 890 to 1,170 words, written with examples labelled as illustrative and no unsourced statistics.
- Gates: freeze policy and start-a-gym need expert review; software cost needs real pricing; best-software needs cited competitor facts with dates (no competitor is named yet).
- Rule 12 respected: renewal and fee-collection posts are hand-sent templates and routines; nothing claims automated reminders.
- `seo-check` now ignores "Related" card text in the duplicate-sentence test (those cards summarise other pages by design) and knows the RSS route.
- Not done: links from the posts' matching feature pages to the posts (feature pages are Prompt 2).

## 2026-10-11: Prompt 5, Hinglish section (branch `seo-hinglish`)

- Six pages: `/hi`, `/hi/gym-billing-software`, `/hi/whatsapp-reminder`, `/hi/gym-fee-reminder-message`, `/hi/gym-software-kaise-chune`, `/hi/blog/gym-me-member-kaise-badhaye`. Written in Roman-script Hinglish as an owner would type it, each for its own query and not translated from an English page.
- Step 0 skipped on instruction: phone-SERP validation is **pending**. Pages are public; the hub's VALIDATION GATE in the keyword map is waived by that instruction and recorded here.
- `PageShell` and `ContentLayout` take a `lang` prop. The content wrapper carries `lang="hi-Latn"`; the document `<html lang>` stays `en-IN` because the app has a single root layout (a second root layout would mean restructuring every route).
- hreflang: none. No Hinglish page is a true equivalent of an English page, so pairing them would be wrong.
- New components: `CopyBlock` (message with a copy button) and `VideoPlaceholder` (marked slot, no fake player).
- "Hinglish mein dekhein" link added to the footer and below the home hero, shown only while `/hi` is public.
- Fee-reminder pages follow keyword-map RULE lines: template messages and manual routines only. They say plainly that messages are sent by hand and that Fitvario's alert set-up should be checked in a demo.
- `gen-seo-docs.mjs` now treats `/hi/` and `/hi` as the same page and reads CRLF registry files.

## 2026-10-11: Prompt 6, comparison pages (branch `seo-compare`)

- Fact collection first: 38 statements recorded in `docs/seo/competitor-facts.csv` from the vendors' own pages (Easy Gym Software, Okfit, Mindbody, GymMaster) and one third-party listing (GymSmart), each with source URL and date. Pages that returned 404 (Easy Gym and Okfit `/pricing`) were not used. Where a page did not say something, the comparison says "not stated" and not "no".
- Five DRAFT pages built from that data (`src/content/compare.ts`), none published. Layout per the prompt: who each is for, feature table, where the competitor may be better, where Fitvario may fit better, pricing as publicly stated with date, decision checklist, sources, "Last verified" date, trademark footnote and a correction contact.
- Fitvario's table cells are computed from `feature-status.json`, so the page can never claim a feature that is not live.
- The competitor's own claim of an official WhatsApp integration is paraphrased, because the exact phrase is banned on this site.
- Not included: migration notes (Fitvario's import help is an unverified service claim), competitor logos, "best" claims.

## 2026-10-11: Prompt 8, integration and launch QA (branch `seo-release`)

- Integration branch built from `seo-overhaul` by merging `seo-blog`, `seo-hinglish` and `seo-compare`. All three merged without losing content. The build failed once after the merge because the both-sides resolver dropped a shared closing brace in the page registry; restored and committed separately.
- New scripts: `feature-truth.mjs` (flags wording that claims a capability whose flag is not live; legal text is reported but does not fail), `launch-checks.mjs` (conversion audit, mixed content, trailing slashes, apex links, source maps, secrets in the bundle, header config), `merge-volumes.mjs` (Keyword Planner export to a ranked list; verified with a dummy file). `npm run seo:check` runs all four checkers.
- Found and fixed: `/delete-account` told people to use a "web dashboard" (there is none) and now says the Android app; the Play badge's `aria-label` did not match its visible text (the only failing audit on every page).
- Added security headers in `next.config.ts` and confirmed them on a production server. No Content-Security-Policy yet by design.
- Lighthouse on seven page types: see HANDOFF. Written `docs/seo/LAUNCH_CHECKLIST.md`.
- Known: legal pages still mention class scheduling, workout and diet content, and "WhatsApp Business messaging" (`/terms`), biometric events and class bookings (`/privacy`). These are in `TODO_FOR_SUMIT.md` for the owner's review.

## 2026-10-11: feature list completed (branch `seo-release`)

- Owner pointed out the flag list was missing features (expense manager and others). Re-audited the backend routes, models and management commands.
- Added 20 flags to `feature-status.json`, all `in-code` (or `not-live`/`no-evidence` where the owner already said so); none is claimable. New: `diet_plans`, `workout_plans` (split from `workout_diet_plans`), `expense_manager`, `recurring_expenses`, `customer_categories`, `gym_gallery_highlights`, `gym_hours_and_closures`, `platform_banners`, `owner_referral_program`, `subscription_coupons`, `platform_store_for_owners`, `owner_billing_history`, `member_notification_center`, `owner_push_broadcast`, `attendance_analytics`, `auto_absent_marking`, `member_birthdays_list`, `daily_owner_summary`, `account_deletion`, `member_data_import`.
- New `FEATURE_INVENTORY.md`; `OWNER_CONFIRM.md` rewritten as one Y/N table per area. No existing status changed, so nothing on the site changed.

## 2026-10-11: Prompt 2, feature and segment pages (branch `seo-release`)

- Owner answers applied to `feature-status.json` (verified by owner, 2026-10-11): 11 flags live, 5 not-live, new `single_app_role_login`. Unlisted flags unchanged.
- Published (flag-gated, now live): `/features/gst-billing`, `/features/whatsapp-reminders`. New and published: `/features/member-app`, `/features/qr-attendance`, `/features/biometric-attendance`, `/features/white-label-gym-app`, `/features/multi-branch-gym-software`, `/for/small-gyms`, `/for/franchise-gyms`, `/for/crossfit-yoga-studios`. Written but held as draft: `/features/diet-workout-plans`.
- `/features/whatsapp-reminders` trimmed to the verified behaviour only: expiring-soon (7, 3, 1 days before), expired (day after) and birthday. Welcome, receipt, renewed, frozen and plan-assigned messages removed from the copy. It states that automatic due-payment reminders do not exist.
- Restored on `/features`: biometric attendance, tax lines and part payments, birthday wish, campaigns, owner referral, white-label cards, plus a "By type of gym" section linking the segment pages.
- "Gym-branded app" wording replaced across home, pricing and JSON-LD by the single-app truth: the Fitvario app with the gym's name and logo inside it.
- Template marketplace answered Y but withheld from all copy because it sells diet and workout templates.
- `feature-truth.mjs` no longer flags honest negations ("no class booking").
- The five comparison pages stay draft; their Fitvario column now reads from the new flags (GST, biometric, QR and others show "Yes").
- Keyword coverage: 52 covered, 0 missing. Keywords without a published page and why: `keyword-gaps.md`.
