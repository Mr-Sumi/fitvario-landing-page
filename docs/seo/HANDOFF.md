# Handoff

Resume from here in a fresh session. Do not push or deploy. Last updated 2026-10-11, after the design pass. Current branch: **`seo-design`** (from `seo-release`).

1. **Design pass done** per `DESIGN_BRIEF.md`: graphite `#192126` and lime `#BBF246` from the app, Bricolage Grotesque headings with Instrument Sans text, one 8 px radius, one shadow, no gradients. Home, features hub, pricing, header, footer, CTAs and all content pages use it. Before and after shots at 390 and 1440 px are in `docs/seo/design/`.
2. **No invented UI.** `ScreenshotFrame` renders a neutral block marked `data-placeholder` until a real screenshot exists. `launch-checks.mjs` **fails** while any placeholder is on an indexable page: 12 today (10 screens, 2 Hindi videos). This is deliberate; `npm run seo:check` ends red until they are replaced.
3. **Screenshots:** the numbered list is in `TODO_FOR_SUMIT.md` section 20. Drop files in `docs/seo/screens/`, then `node scripts/process-screens.mjs` writes WebP and AVIF and the manifest.
4. **Web dashboard:** `owner_web_dashboard` is live on your word; `web_dashboard_staff_login` is not-live. Copy says only "owner web dashboard at dash.fitvario.com" (about, support, pricing included list, features card, JSON-LD). No staff mention, no feature list. `dashboard-evidence.md` was not written: the Chrome extension could not read the page.
5. **Brand assets:** the real app icon replaces my placeholder "F" mark (header, footer, apple-touch icon, logo, og-image, manifest).
6. **GymSmart:** keyword marked DEFERRED, page stays draft.
7. **Checks:** build, `seo-check` (61 pages, 40 public), `keyword-coverage` (50 covered, 0 missing), `feature-truth` (0 failing, incl. white-label), 38 of 38 calculator tests all pass. `launch-checks` fails only on the 12 placeholders.
8. **Lighthouse (mobile, 8 pages):** performance 95 to 97, accessibility, best practices and SEO 100, CLS 0. Simulated LCP is 2.6 to 2.9 s, above the 2.5 s target; the browser-observed LCP is about 0.2 s and the element is the lead paragraph. See SEO_CHANGELOG for what I tried.
9. **Still open:** your answers on dashboard login and scope, the screenshots, `verify_features.py` output, legal pages for an advisor, the Play listing text, comparison and review gates.
10. **Capture tool:** `node scripts/capture-pages.mjs <before|after> [baseUrl]` uses Chrome device emulation; headless `--window-size` crops 390 px captures.
