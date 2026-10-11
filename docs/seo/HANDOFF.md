# Handoff

Resume from here in a fresh session. Do not push or deploy. Last updated 2026-10-11, after Prompt 8. Current branch: **`seo-release`**, the integration branch. It contains everything below.

1. **Merged:** `seo-overhaul` (Prompts 1 and 3 plus corrections), `seo-blog` (Prompt 4), `seo-hinglish` (Prompt 5), `seo-compare` (Prompt 6). Conflicts were in `pages.ts` (both sides kept, one closing brace restored), `gen-seo-docs.mjs` (same fix twice) and append-only docs (both sides kept).
2. **Not built:** Prompt 2 (feature and segment pages), blocked on the owner's flag answers and the one-app-or-separate-apps question; Prompt 7 (Django repo). Pilot feature pages exist: gym CRM (public), WhatsApp reminders and GST billing (drafts).
3. **Public pages (31):** home, features hub, pricing, about, contact, support and legal pages, gym CRM, four calculators, blog index and seven posts, Hinglish hub and five Hinglish pages.
4. **Drafts, hidden everywhere and 404 on production:** WhatsApp reminders and GST billing feature pages, four tools or templates (GST calculator, startup cost, invoice generator, diet charts), four blog posts, five comparison pages.
5. **Checks (`npm run seo:check`):** build, `seo-check` (52 pages, 31 public), `keyword-coverage` (29 keywords, 0 missing, 3 dropped), `feature-truth` (0 failing claims; 1 legal-text item for the owner), `launch-checks` (conversion, crawl hygiene, bundle leaks, security headers). `npm run test:calc` runs the 38 calculator tests.
6. **Lighthouse (mobile, local production server):** performance 96 to 98, accessibility, best practices and SEO 100 on `/`, `/pricing`, `/features`, `/features/gym-crm`, a tool, a blog post and `/hi`. LCP 2.3 to 2.8 s on simulated slow 4G.
7. **Security headers** now set in `next.config.ts` (HSTS, nosniff, referrer policy, frame options, permissions policy). No CSP yet: GA and Turnstile need a tested allow-list.
8. **Owner answers applied:** no owner web dashboard; due-payment reminders not live. The other flags are still unanswered (`OWNER_CONFIRM.md`).
9. **Next steps for you:** answer the flags; follow `LAUNCH_CHECKLIST.md`; clear the drafts you want live (it lists what unlocks each); set the lead-delivery env vars before deploying.
10. **Local server:** `npm run dev` on http://localhost:3000.
