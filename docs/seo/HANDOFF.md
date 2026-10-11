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
