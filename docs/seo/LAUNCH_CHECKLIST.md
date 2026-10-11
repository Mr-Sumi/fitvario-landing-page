# Launch checklist

Plain steps for you. Nothing here deploys the site; that is your call. Branch to deploy from: `seo-release`.

## 1. Before you deploy

1. Read `TODO_FOR_SUMIT.md` and `OWNER_CONFIRM.md`. Anything you leave blank stays hidden or generic on the site, which is safe.
2. Set these in Vercel (Production and Preview). `NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.
   - Lead delivery (needed, otherwise the form shows an error in production): `LEAD_WEBHOOK_URL` and/or `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `LEAD_EMAIL_FROM`, `LEAD_EMAIL_TO`.
   - Spam protection: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` (and add the domain in Cloudflare).
   - Contact details (optional, hidden if empty): `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_PHONE_NUMBER`, `NEXT_PUBLIC_WORKING_HOURS`.
   - Analytics and verification: `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`.
3. In Vercel, change the apex-to-www redirect from 307 to **308** (you said you would).
4. Run locally and make sure everything passes:
   ```
   npm run build
   npm run seo:check
   npm run test:calc
   ```

## 2. After you deploy: confirm the redirects

Run these in a terminal. Each line should end at `https://www.fitvario.com/...` with a 308 (or 301), and the last one should be 200.

```
curl -sI http://fitvario.com        | grep -iE "^(HTTP|location)"
curl -sI https://fitvario.com       | grep -iE "^(HTTP|location)"
curl -sI http://www.fitvario.com    | grep -iE "^(HTTP|location)"
curl -sI https://www.fitvario.com   | grep -iE "^(HTTP|location)"
```

Also check:
- `https://www.fitvario.com/robots.txt` shows `Sitemap: https://www.fitvario.com/sitemap.xml`.
- `https://www.fitvario.com/sitemap.xml` lists only public pages (no `/compare/`, no draft posts, no `/thank-you`).
- A draft URL returns 404, for example `https://www.fitvario.com/compare/okfit-alternative`.
- `https://www.fitvario.com/og-image.png` loads.

## 3. Google Search Console

1. Add the property as a **Domain** and verify with the DNS TXT record Google gives you (or set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` for a URL-prefix property).
2. Submit `https://www.fitvario.com/sitemap.xml` under Sitemaps.
3. Use **URL Inspection** on these 10 pages, then "Request indexing":
   - `/`
   - `/pricing`
   - `/features`
   - `/features/gym-crm`
   - `/tools/gym-break-even-calculator`
   - `/tools/gym-membership-pricing-calculator`
   - `/blog`
   - `/blog/reduce-gym-member-churn-india`
   - `/hi`
   - `/contact`
4. After a few days open **Pages** (Indexing) and read "Why pages aren't indexed". Pages blocked by `noindex` that you meant to publish are the thing to look for.

## 4. Bing

In Bing Webmaster Tools choose **Import from Google Search Console** and sign in. This brings the site and sitemap across.

## 5. GA4

1. Create the property, copy the Measurement ID into `NEXT_PUBLIC_GA_MEASUREMENT_ID`. GA only loads after a visitor accepts cookies, so expect lower numbers than raw visits.
2. Events the site sends: `demo_submit`, `whatsapp_click`, `call_click`, `cta_click`, `pricing_view`, `calculator_use`, `outbound_click`.
3. In GA4 Admin > Events, mark **`demo_submit`** as a key event. Add `whatsapp_click` and `call_click` if you count those as leads.
4. Test with GA4 DebugView: accept cookies, submit the demo form on a preview deployment with a test lead, and confirm `demo_submit` appears once.

## 6. Check structured data and speed

Rich Results Test (https://search.google.com/test/rich-results), enter each:
- `https://www.fitvario.com/` (Organization, WebSite, SoftwareApplication)
- `https://www.fitvario.com/pricing` (SoftwareApplication, breadcrumb)
- `https://www.fitvario.com/blog/reduce-gym-member-churn-india` (BlogPosting, breadcrumb)

PageSpeed Insights (https://pagespeed.web.dev), enter each and read the **mobile** tab:
- `https://www.fitvario.com/`
- `https://www.fitvario.com/pricing`
- `https://www.fitvario.com/features`
- `https://www.fitvario.com/tools/gym-break-even-calculator`
- `https://www.fitvario.com/blog/reduce-gym-member-churn-india`
- `https://www.fitvario.com/hi`

Lab results from the last run: performance 96 to 98, accessibility, best practices and SEO 100. LCP was 2.3 to 2.8 s on Lighthouse's simulated slow 4G, so a few pages sit just above the 2.5 s target. Real-user numbers appear in PageSpeed after enough traffic.

## 7. What will unlock more pages (nothing is published by accident)

| Page or section | Unlocks when |
|---|---|
| `/features/gst-billing` | You set `gst_tax_lines` to live |
| `/features/whatsapp-reminders` | You confirm the reminder cron and set `whatsapp_expiry_reminders` to live |
| Store, workout and diet claims on the site | Their flags go live |
| Comparison pages | Facts re-verified, legal read, then `draft: true` removed in `src/config/pages.ts` |
| Draft calculators and the diet charts | CA or nutritionist review, then `draft: true` removed |
| Draft blog posts | Review or pricing/competitor facts, then `draft: true` removed in the post |

## 8. Review plan

**Day 30**
- Search Console > Performance > Queries: export the top 100 queries and pages (last 28 days). Look for queries with impressions but no clicks.
- Pages report: confirm all public pages are indexed.
- GA4: count `demo_submit` and the page each lead came from.
- Add `keyword-planner.csv` if you have it and run `node scripts/merge-volumes.mjs`.

**Day 60**
- Search Console > Performance: filter by page type (`/blog/`, `/tools/`, `/hi/`) and export clicks, impressions and average position.
- Check Core Web Vitals report for mobile.
- Update the 5 posts or tools that have impressions but weak titles.

**Day 90**
- Export Queries for the full period and compare with day 30 and day 60.
- Decide which blog topics to add next from real queries, not guesses.
- Re-verify competitor facts and publish comparison pages only if cleared.
- Review the Hinglish pages against what you saw in the phone-SERP check.
