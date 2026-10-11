# Handoff

Resume from here in a fresh session. Do not push or deploy. Last updated 2026-10-11, after Prompt 4. Current branch: `seo-blog` (cut from `seo-overhaul` after Prompt 3, as Prompt 4 specifies). Prompt 8 merges the branches.

1. **Done:** Prompt 1, status corrections, web-dashboard removal, Prompt 3 (tools, on `seo-overhaul`), and Prompt 4 (blog, on `seo-blog`).
2. **Prompt 4 output:** blog engine (Markdown in `src/content/blog/`, front-matter, index, pagination, category pages, RSS at `/blog/rss.xml`, BlogPosting and breadcrumb JSON-LD, TOC, reading time, prev/next, author box) and 11 posts.
3. **Public posts (7):** renewal message formats, membership pricing, reduce churn, get more members, fee collection tips, lead follow-up script, referral programme.
4. **Draft posts (4):** freeze policy template and start-a-gym (expert review), software cost (needs real pricing), best software (needs cited competitor facts). Remove `draft: true` in the post's front-matter to publish.
5. **Add a post:** drop a `.md` file in `src/content/blog/` with the front-matter used by the others; `npm run build` regenerates `src/config/blog-pages.generated.ts` (or run `npm run gen:blog`). Do not edit the generated file.
6. **Checks:** build, `seo-check` (41 pages, 25 indexable) and `keyword-coverage` (22 keywords on public pages, 0 missing) pass. 38 calculator tests pass.
7. **Rules honoured:** posts about renewal messages and fee collection are template and manual workflows only; no automated due-payment or expiry-reminder claims; no "WhatsApp Business API"; Fitvario mentioned only for the CRM and referral codes.
8. **Still waiting on the owner:** the Y/N flags and the one-app-or-separate-apps answer (`OWNER_CONFIRM.md`). Prompt 2 stays blocked on them.
9. **Next:** Prompt 2 once the flags are in; otherwise Prompt 5 (Hinglish, do not stop at Step 0; flag phone-SERP validation as pending), Prompt 6 (compare pages as DRAFT only), then Prompt 8. Skip Prompt 7.
10. **Local server:** `npm run dev` on http://localhost:3000. Blog at `/blog`.

Resume from here in a fresh session. Do not push or deploy. Last updated 2026-10-11, after Prompt 5. Current branch: `seo-hinglish` (cut from `seo-overhaul`, as Prompt 5 specifies).

1. **Branches:** `seo-overhaul` has Prompts 1 and 3 (and the owner-answer and status corrections). `seo-blog` (Prompt 4, blog engine and 11 posts) and `seo-hinglish` (this one) each branch from `seo-overhaul`. Prompt 8 merges them; expect small conflicts in `src/config/pages.ts`, `Footer.tsx` and `scripts/gen-seo-docs.mjs`.
2. **Prompt 5 output:** six Roman-Hinglish pages under `/hi`: hub, billing software, WhatsApp fee reminder, fee reminder message library (10 copy-ready messages), "gym software kaise chune" checklist, and "gym me member kaise badhaye". All six are public.
3. **Validation is pending.** Step 0 (Sumit's phone SERP check for the 7 Hinglish queries) was skipped on instruction. The pages are built and public with lower expectations. Run the check on a phone and tell me which queries already have strong Hinglish results.
4. **Language:** content sits in a `lang="hi-Latn"` wrapper (the site has one root layout, so `<html lang>` stays `en-IN`). Self-referencing canonicals. No hreflang: no Hinglish page is a true equivalent of an English page.
5. **Rules honoured:** fee-reminder pages are hand-sent templates and routines only; no automated due-payment or expiry-reminder claims; no "WhatsApp Business API"; GST described as "ask your CA", nothing claimed about tax lines.
6. **Placeholders to replace:** two `VideoPlaceholder` blocks (WhatsApp reminder demo, Instagram reels) wait for Hindi YouTube videos. They are clearly marked and show no fake player.
7. **Checks:** build, `seo-check` (30 pages, 23 public) and `keyword-coverage` (20 keywords on public pages, 0 missing) pass.
8. **Not done:** the 4-question Hinglish FAQ blocks for `/features/member-app` and `/features/biometric-attendance`. Those pages do not exist (Prompt 2 is blocked on the owner's flags and the one-app question).
9. **Next:** Prompt 6 (comparison pages, DRAFT only), then Prompt 8. Prompt 2 stays blocked on `OWNER_CONFIRM.md` sections 1 and 2.
10. **Local server:** `npm run dev` on http://localhost:3000; Hinglish hub at `/hi`.

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
