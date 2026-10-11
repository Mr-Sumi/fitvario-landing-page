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

## 10. Status corrections applied (your 10 Oct message)

Flags in `docs/seo/feature-status.json` are now: `due_payment_reminders` not-live, `ecommerce_cart_orders` not-live, `workout_diet_plans` not-live, `plan_requests_approval` not-live, `whatsapp_expiry_reminders` and `whatsapp_birthday_messages` in-code (live after you confirm).

- [ ] Each claim returns to the site by itself when you set its flag to `"live"` (home, features hub, pricing list, WhatsApp page lines). Flip `whatsapp_expiry_reminders` to publish `/features/whatsapp-reminders` once you have confirmed the cron.
- [ ] **Legal pages still mention features that are not live.** I left the legal text alone apart from one word. Review: `/privacy` (class bookings, workout/diet data, ecommerce flows), `/terms` (workout and diet content, ecommerce listings, class features), `/privacy` also lists "fee reminders" sent via WhatsApp's "Business Cloud API" (not live, and close to the phrase you banned for marketing copy). `/support` is already fixed.
- [ ] **One legal edit I made:** `/refund` said "WhatsApp Business API message delivery"; it now says "WhatsApp message delivery" because the phrase is banned. Confirm you are happy with that wording.
- [ ] `src/components/AppPreview.tsx` still has a "Storefront / Ecommerce" tile. It is unused, so it is not on the site; delete it or fix it before anyone imports it.
- [ ] Contact page title changed from "...Free Gym Software Demo" to "...Free Demo for Your Gym" so it no longer matches the dropped keyword "free gym software".

## 11. Owner answers applied (11 Oct)

- [x] "No owner web dashboard; owners use the mobile app": every "web dashboard", "web panel" and "staff portal" claim was removed from home, features hub, pricing, about, support, CRM and billing pages, the page registry and structured data (`operatingSystem` is now "Android"). Legal pages were not touched; `/privacy`, `/terms` and `/delete-account` may still mention web access (see section 10).
- [x] `due_payment_reminders` recorded as N, "verified by owner".
- [ ] **Still waiting:** the Y/N for every other flag, and "one app vs separate apps". See `OWNER_CONFIRM.md` section 1 and 2.

## 12. Added by Prompt 3

- [ ] **CA review** of `/tools/gym-gst-calculator` and `/tools/gym-invoice-generator` wording (both draft). The GST rate is a user input that starts at 18%; the pages do not assert a rate.
- [ ] **Nutritionist review** of `/templates/diet-charts` (draft, no calorie numbers, general information only).
- [ ] **Expert review** of `/tools/gym-startup-cost-calculator` (draft): licence and cost rules vary by state. The starting figures are placeholders, not market data.
- [ ] To publish a draft, remove `draft: true` for it in `src/config/pages.ts`.
- [ ] The four published calculators have illustrative defaults (for example rent per sq ft by city tier). Replace them with numbers you are comfortable standing behind, or leave them labelled as illustrative.

## 13. Added by Prompt 4 (blog)

- [ ] **Author byline:** posts show "Fitvario" as author. Set `NEXT_PUBLIC_AUTHOR_NAME` if you want a person's name, and add a short bio only if you want one shown.
- [ ] **Expert review** of the two draft posts that give guidance: `gym-freeze-policy-template` (policy wording, "not legal advice") and `how-to-start-a-gym-in-india` (licences, costs, tax: every point says to verify locally).
- [ ] **`gym-software-pricing-in-india`** stays draft until you confirm Fitvario's real pricing; it has a `{TODO}` marker for the plan table.
- [ ] **`best-gym-management-software-india`** stays draft until competitor facts are collected with public sources and verified dates. It already carries the disclosure and a "where Fitvario is not the best fit" section; check that section is honest for you.
- [ ] The posts use illustrative figures (for example rent, fees, referral rewards). They are labelled as examples; replace them if you would rather use your own.
- [ ] Linking posts from the matching feature pages happens in Prompt 2.

## 14. Added by Prompt 5 (Hinglish)

- [ ] **Phone-SERP check** (skipped, pending). On your phone, in Google India, search: gym management software hindi; gym ke liye software; gym ka billing software; gym software kaise chune; gym ka fees reminder whatsapp; gym fee reminder message in hindi; gym me member kaise badhaye. Tell me for each whether Hindi or Hinglish gym-software pages already rank. Pages where strong results exist stay, with lower expectations.
- [ ] **Language review:** have someone who writes Hinglish daily read the six pages for tone. I wrote them as spoken Hinglish; native readers will catch phrasing that sounds off.
- [ ] **Hindi YouTube demos:** two marked placeholders await a recording (WhatsApp fee reminder, Instagram reels for gyms). Replace `VideoPlaceholder` with an embed when ready.
- [ ] **Devanagari versions** are out of scope for now.
- [ ] `/hi/gym-billing-software` links to `/tools/gym-gst-calculator` only while that page is public (it is a draft until CA review).

## 15. Added by Prompt 6 (comparison pages, all draft)

- [ ] **Legal read** of all five comparison pages before publishing (Easy Gym Software, Okfit, GymSmart, Mindbody, GymMaster).
- [ ] **Re-verify every fact** in `competitor-facts.csv` on the live vendor pages. The facts were read through a tool that summarises pages; quotes may not be word-for-word.
- [ ] **GymSmart:** find the official website. Until then the page compares nothing line by line and should stay unpublished.
- [ ] **Mindbody and GymMaster for India:** ask each vendor (or check their sales pages) whether they serve Indian gyms in rupees and handle GST invoices. The pages currently say "not found" and invite the reader to ask.
- [ ] **Monthly review:** re-check prices and terms on all five pages each month and update `VERIFIED_ON` and `VERIFIED_LABEL` in `src/content/compare.ts`. These are separate from the sitemap `lastmod`, which does not move.
- [ ] **Fitvario cells will change on their own** when you flip flags in `feature-status.json` (for example GST or biometric). Re-read the pages after each flip.
- [ ] **Free trial and published prices:** the pages say Fitvario has neither stated on this site. If you decide to offer a trial or publish prices, tell me and I will update the rows.
- [ ] When the comparison pages go live, link them from the footer "Compare" column (automatic) and from the "best gym management software" post.
