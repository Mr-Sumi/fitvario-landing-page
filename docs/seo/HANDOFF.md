# Handoff

Resume from here in a fresh session. Branch `seo-overhaul`. Do not push or deploy. Last updated 2026-10-11, after Prompt 3.

1. **Done and committed:** Prompt 1 (foundation, conversion, core pages, 3 pilot pages), status corrections, web-dashboard claim removal, and Prompt 3 (tools and template).
2. **Prompt 3 output:** 4 published calculators (break-even, membership pricing, churn, revenue) and 4 content-gated drafts (GST calculator, startup cost, invoice generator, `/templates/diet-charts`). Calculation logic is in `src/lib/calc/*.mjs` with 38 passing tests (`npm run test:calc`).
3. **Drafts and why:** GST calculator and invoice generator and startup cost need CA review; diet charts need a nutritionist. Flip by removing `draft: true` in `src/config/pages.ts` once cleared.
4. **Checks:** `npm run build`, `node scripts/seo-check.mjs`, `node scripts/keyword-coverage.mjs` all pass (or `npm run seo:check`). Keyword coverage: 13 keywords on 7 published pages, 0 missing.
5. **Owner answers applied:** no owner web dashboard (owners use the mobile app); `due_payment_reminders` N. Every other flag is still unanswered, see `OWNER_CONFIRM.md` sections 1 and 2.
6. **Why the chain stopped before Prompt 2:** Prompt 2 builds feature and segment pages that depend on those flags (QR attendance, biometric, white-label, GST, workout/diet, store, member app wording). Do not guess them.
7. **Open link task:** each tool should be linked from its matching blog post and feature page. Blog posts do not exist yet (Prompt 4), so add those links when they are written.
8. **Next, once flags are answered:** Prompt 2, then 4, 5, 6 (compare pages as DRAFT only), 8. Skip 7. Prompt 5 Step 0: do not stop; mark phone-SERP validation as pending.
9. **Rules:** `SEO_RULES.md` rule 12 applies: no claims for flags that are not live, no automated due-payment reminders, no "WhatsApp Business API", dropped keywords stay dropped.
10. **Local server:** `npm run dev` serves http://localhost:3000. `.env.example` lists every env var; lead delivery needs `LEAD_WEBHOOK_URL` or SMTP in production.
