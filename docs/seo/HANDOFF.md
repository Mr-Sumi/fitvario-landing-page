# Handoff

Resume from here in a fresh session. Do not push or deploy. Last updated 2026-10-11, after Prompt 2 and the owner's follow-up decisions. Current branch: **`seo-release`**.

1. **Owner answers applied** (`feature-status.json`, "verified by owner", 2026-10-11): live = GST, dues, biometric, QR, WhatsApp expiry and birthday, campaigns, owner referral, white-label, multi-branch, template marketplace. Not live = diet, workout, store, due-payment reminders, self-serve sign-up. One app: Fitvario on Google Play.
2. **Published now (40 public pages):** GST billing, WhatsApp reminders, member app, QR attendance, biometric attendance, white-label, multi-branch, small gyms, franchise gyms, plus everything from before. CrossFit and yoga is a draft until class booking exists.
3. **Draft, hidden and 404 on production (14):** diet-workout-plans (flag N), GST calculator, invoice generator, startup cost calculator, diet charts (reviews), four blog posts (review, pricing, competitor facts), five comparison pages (accuracy and legal).
4. **Withheld on purpose, pending `docs/seo/verify_features.py` output:** diet plans, workout plans, template marketplace (now `in-code`) and batches. The script is read-only and prints counts only; the owner runs it and pastes the result.
5. **WhatsApp page** describes only expiring-soon (7, 3, 1 days), expired (day after) and birthday. It says outright that automatic due-payment reminders do not exist.
6. **White-label** is code-verified: name and logo show on the splash screen, owner home and member dashboard only; the launcher icon, app label, colours and store listing are Fitvario's. Copy says exactly that.
7. **Checks (`npm run seo:check`):** build; `seo-check` 61 pages, 40 public; `keyword-coverage` 50 covered, 0 missing, 3 dropped; `feature-truth` 0 failing (1 legal-text item); `launch-checks` pass; 38 of 38 calculator tests.
8. **Lighthouse (mobile, 13 pages):** performance 97 to 98, accessibility, best practices and SEO 100, CLS 0, LCP 2.5 to 2.7 s.
9. **Keywords without a published page:** 21, all behind a review, accuracy, decision or flag gate, or Prompt 7. See `keyword-gaps.md`.
10. **Next:** run `verify_features.py`; paste the Play listing's description (the fetch tool could not read it) and GymSmart's real site if you know it; your items in `TODO_FOR_SUMIT.md` sections 17 and 18, then deploy per `LAUNCH_CHECKLIST.md`. Prompt 7 (Django repo) and the gyms pages are still to do.
