# Handoff

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
