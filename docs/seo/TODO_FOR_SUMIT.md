# TODO for Sumit

Everything the SEO work could not do without you. Nothing here is guessed or invented in the site; where an answer was missing, the site renders nothing for it (or the page stays draft).

## 1. Hosting (you said you'll do these)

- [ ] Change the Vercel apex-to-www redirect from 307 to **308**. The code now treats `https://www.fitvario.com` as canonical everywhere.
- [ ] Set the env vars below in Vercel (Production and Preview). `NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.
- [ ] Add the site's domain to the Cloudflare Turnstile widget's allowed hostnames.

## 2. Your Phase 0 answers that were still `[FILL]`

Until you fill these, the site uses the safe default shown.

| Item | Safe default used now | Where to set it |
|---|---|---|
| Plan table (name, rupee price, period, limits) | No prices shown, custom-quote mode, no `offers` in JSON-LD | `src/config/pricing.ts` |
| Self-serve signup works end to end? | Treated as **no**: "Book a demo" only | `selfServeSignup`, `NEXT_PUBLIC_SIGNUP_URL` |
| WhatsApp number | WhatsApp buttons not rendered | `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Phone number | Call button not rendered | `NEXT_PUBLIC_PHONE_NUMBER` |
| Working hours | Not shown | `NEXT_PUBLIC_WORKING_HOURS` |
| Support email | `support@fitvario.com` (already on the live site) | `src/config/site.ts` |
| Which in-code features are live | **None marked live**; gated pages stay draft | `docs/seo/feature-status.json` |
| Free trial (yes/no, days) | Not mentioned anywhere | n/a |
| Founder name and bio | Not shown | `founder` in `src/config/proof.ts` |
| Named customers | None; Proof section hidden | `proofItems` in `src/config/proof.ts` |
| Lead destination (Apps Script sheet or Django endpoint) | Form shows a "not saved" error in production until set | `LEAD_WEBHOOK_URL` |

Set at least one of these for leads, otherwise the production form returns an error and tells the visitor to use WhatsApp or email (it never pretends a lead was saved):
- `LEAD_WEBHOOK_URL`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `LEAD_EMAIL_FROM`, `LEAD_EMAIL_TO` (ZeptoMail SMTP works)

Other env vars: `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_PLAY_STORE_URL` (footer badge appears only when set), `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_AUTHOR_NAME` (byline for blog posts). See `.env.example`.

## 3. Feature flags to decide (feature-status.json)

Flip a feature to `"live"` only when gym owners can use it today without developer help.

- [ ] `gst_tax_lines` -> publishes `/features/gst-billing`. Code has per-gym tax lines with a breakdown and a company GST field. Confirm: CGST/SGST split? GSTIN on the invoice? Then edit the page to match what is true.
- [ ] `biometric_adms` (tested on a real device) -> allows the biometric page and restores the biometric wording. **Removed meanwhile:** "optional biometrics" on `/pricing` and the home FAQ line "Optional biometric support is available."
- [ ] `white_label`, `template_marketplace`, `notification_campaigns_wallet`, `plan_requests_approval`, `freeze_gift_days`, `dues_partial_payments`, `personal_trainer_assignment`.
- [ ] `public_gym_profile_api` (needs Prompts 7A and 7B first).

## 4. Claims removed from the site (confirm none of these exist elsewhere)

I searched the backend again for "faq" as you asked: only a platform-level FAQ exists (super-admin managed, read-only for owners). No per-gym FAQs.

- Class scheduling (slots, capacity, enrolments, members book in app). Only batches and opening hours exist.
- Staff salary dates and staff HR (staff attendance via QR/manual **does** exist and is kept).
- Gym FAQs with text and video answers.
- Excel/PDF export of reports.
- "Passwordless OTP-only login" (member login also supports a password).
- "WhatsApp Business API" wording. Now "automated WhatsApp reminders". The keyword "whatsapp business api for gym" is intentionally not used.
- "Members install from Google Play" and "not Fitvario branding" (white-label and the Play URL are unconfirmed).
- "Media files are private", "built to handle high-traffic check-in hours", broadcast "instant reminder blasts".
- **QR attendance was described backwards.** The code uses one signed QR per gym, shown at the entrance, which members **and staff** scan with the app (first scan = check-in, next = check-out with duration). The site said each member has a unique QR scanned at the door. Fixed everywhere; check the Flutter app agrees.

## 5. Claims kept that I could not verify (confirm or remove)

- "We import your existing member data / help you bring in your member list" (service, not product).
- "We reply within 24 hours on business days" and "quote within 1 to 2 business days".
- "Automated backups run daily" (a `backup_database` command exists; confirm it is scheduled).
- "Registered in Bhopal, India" and the "free demo, no obligation" wording.
- "Messaging credit allowance is included in every plan" (`/pricing`). Credits and top-up packages exist in code; the allowance per plan is a commercial fact.
- Subscription fees "non-refundable" (from the existing refund page; the pricing page repeats it).

## 6. Legal and expert review

- [ ] **Cookie Policy** now says GA4 loads only after "Accept all" and that UTM/first-page details are stored with a demo request. Have it reviewed.
- [ ] **Cookie banner and Privacy Policy mention Meta Pixel**, but no Meta Pixel loads on this site. Either add it behind consent or remove the mention.
- [ ] **Demo-form consent text** (DPDP Act). Review the wording in `src/components/DemoForm.tsx`.
- [ ] GST wording on `/features/gst-billing` and every later GST tool: CA review.

## 7. Content you need to supply

- [ ] Real product screenshots (dashboard, WhatsApp reminder, invoice/dues, QR check-in, member app). Pages currently show clearly marked placeholders.
- [ ] A designed 1200x630 share image if you want one. A simple generated one is in `public/og-image.png` (`node scripts/generate-brand-assets.mjs` rebuilds it).

## 8. Notes

- The lead endpoint's rate limit is in-memory (per server instance). Turnstile and the honeypot do the real work. If spam gets through, add a shared store (Upstash/Redis).
- `src/components/AppPreview.tsx` is unused; delete it when convenient.
- A stray `package.json` and `package-lock.json` sit in `C:\Users\sumit\`. `next.config.ts` pins `turbopack.root` so it no longer breaks the dev server, but consider deleting them.
- The Cowork audit `.md` and keyword workbook `.xlsx` mentioned in the pack were never in this repo. Drop them in `docs/seo/` if you want them read.

## 9. Added during Phase 5 and 6

- [ ] **Confirm the reminder cron on the live server.** The site now says members get WhatsApp reminders 7, 3 and 1 days before expiry and one the day after. That is `send_membership_alerts`, plus `notify_member_birthdays` for birthdays. As of the 25 Sep audit those two were scheduled; `notify_due_payments`, `notify_expiring_memberships` and `notify_daily_summary` were not. If that is still true, nothing on the site promises due-payment reminders. If you schedule `notify_due_payments`, update the WhatsApp page and the home FAQ.
- [ ] Check the list of WhatsApp messages on `/features/whatsapp-reminders` (welcome, receipt, expiring, expired, renewed, birthday, plan assigned, order updates, freeze/unfreeze/terminated). It comes from the owner notification catalog; confirm each one really fires today.
- [ ] Add links from the three pilot pages to a tool, a blog post and a compare page once those exist (Prompts 3, 4 and 6). Until then each page has 10+ internal links but no tool or post link.
- [ ] Home LCP is 2.7 s on Lighthouse's simulated mobile throttling (target 2.5 s). Check PageSpeed Insights after deploy.
- [ ] When you edit a page, bump its `updated` date in `src/config/pages.ts`. That date drives the sitemap `lastmod` and the "Last updated" line.
- [ ] Re-run `node scripts/gen-seo-docs.mjs` after changing the registry to refresh `page-tracker.csv`.
