# Handoff

Resume from here in a fresh session. Do not push or deploy. Last updated 2026-10-11, after the design pass. Current branch: **`seo-design`** (from `seo-release`).

1. **Design pass v2 done** (after your feedback and the two reference designs): a large lime hero panel with black headline, black pill buttons, hand-drawn sparkle and loop-arrow doodles, floating information cards, soft grey tiles, a black banner and footer, lime numbered dots. Palette is the app's graphite `#192126` and lime `#BBF246`; type is Outfit headings with Instrument Sans text (one variable file each). Content pages open with a lime page panel. Before and after shots at 390 and 1440 px are in `docs/seo/design/`.
2. **No placeholders shown, no invented app screens.** `ScreenshotFrame` and the video slot now render nothing until a real file exists, so visitors see no placeholders. `launch-checks.mjs` still fails if a `data-placeholder` is ever rendered into an indexable page, and prints a WARN listing the 12 screenshots still to supply. The cards on the home page (renewal schedule, QR flow, part payment arithmetic) are information graphics labelled as examples, not screenshots.
3. **Screenshots:** the numbered list is in `TODO_FOR_SUMIT.md` section 20. Drop files in `docs/seo/screens/`, then `node scripts/process-screens.mjs` writes WebP and AVIF and the manifest.
4. **Web dashboard:** `owner_web_dashboard` is live on your word; `web_dashboard_staff_login` is not-live. Copy says only "owner web dashboard at dash.fitvario.com" (about, support, pricing included list, features card, JSON-LD). No staff mention, no feature list. `dashboard-evidence.md` was not written: the Chrome extension could not read the page.
5. **Brand assets:** the real app icon replaces my placeholder "F" mark (header, footer, apple-touch icon, logo, og-image, manifest).
6. **GymSmart:** keyword marked DEFERRED, page stays draft.
7. **Checks:** build, `seo-check` (61 pages, 40 public), `keyword-coverage` (50 covered, 0 missing), `feature-truth` (0 failing, incl. white-label), `launch-checks` (pass, 1 WARN for screenshots), 38 of 38 calculator tests.
8. **Lighthouse (mobile):** home 96, pricing 96, features 96, feature page 96, tool 95, blog 96; accessibility, best practices and SEO 100; CLS 0. Simulated LCP 2.7 to 2.9 s, above the 2.5 s target; browser-observed LCP is about 0.2 s. See SEO_CHANGELOG.
9. **Still open:** your answers on dashboard login and scope, the screenshots, `verify_features.py` output, legal pages for an advisor, the Play listing text, comparison and review gates.
10. **Capture tool:** `node scripts/capture-pages.mjs <before|after> [baseUrl]` uses Chrome device emulation; headless `--window-size` crops 390 px captures.
