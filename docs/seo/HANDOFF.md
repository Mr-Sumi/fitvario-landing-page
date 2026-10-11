# Handoff

Resume from here in a fresh session. Do not push or deploy. Last updated 2026-10-11, after Prompt 6. Current branch: `seo-compare` (cut from `seo-overhaul`, as Prompt 6 specifies).

1. **Branches:** `seo-overhaul` (Prompts 1 and 3 plus corrections), `seo-blog` (Prompt 4), `seo-hinglish` (Prompt 5) and `seo-compare` (this one) each branch from `seo-overhaul`. Prompt 8 merges them. Expect small conflicts in `src/config/pages.ts`, `Footer.tsx` and `scripts/gen-seo-docs.mjs`; the Hinglish and compare branches both fixed the docs generator for CRLF.
2. **Prompt 6 output:** five comparison pages, all DRAFT: Easy Gym Software, Okfit, GymSmart, Mindbody (India), GymMaster (India). They are noindex, out of the sitemap, nav and links, and return 404 on the production deployment.
3. **Facts:** every competitor statement is in `docs/seo/competitor-facts.csv` with source URL, date (2026-10-11) and a quote of 15 words or fewer or a paraphrase. They were read through a page-fetch tool that summarises pages, so **re-check each fact on the live page before publishing**.
4. **Fitvario column is computed:** each cell reads `feature-status.json`. It says "Yes" only for live flags, "Not claimed on this site yet" for in-code ones and "No" for not-live ones. Flip a flag and the table follows.
5. **GymSmart:** no official website could be confirmed and listings disagree about the maker, so that page compares nothing line by line and says so. Do not publish it until the vendor's own site is found.
6. **Mindbody and GymMaster:** neither states India availability, rupee pricing or GST on the pages read. The pages say that and tell readers to ask the vendor; "not stated" is not proof they lack it.
7. **Rules honoured:** no superlatives, no logos, no insults, no migration claims, no "WhatsApp Business API" (the checker enforces it), nothing claimed that is not live.
8. **Checks:** build, `seo-check` (29 pages, 17 public) and `keyword-coverage` pass. Data lives in `src/content/compare.ts`; layout in `src/components/ComparePage.tsx`.
9. **Before publishing any page:** legal read, owner sign-off on accuracy, re-verify facts, and set `draft: true` off in `src/config/pages.ts`. Review monthly after that.
10. **Next:** Prompt 8 (final QA and integration branch). Prompt 2 stays blocked on `OWNER_CONFIRM.md` sections 1 and 2.
