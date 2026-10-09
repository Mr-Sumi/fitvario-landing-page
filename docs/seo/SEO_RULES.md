# SEO rules

Copied verbatim from PROMPT_PACK_v2.md (Prompt 1). Every session reads this file.

HARD RULES (apply to every phase and every later session)
1. NO FABRICATION. Never invent prices, testimonials, client names or logos, customer counts, ratings, awards, statistics, screenshots, certifications, founder bios, phone numbers or addresses. If a fact is missing, read it from a config file, render nothing (or a draft state), and add an entry to docs/seo/TODO_FOR_SUMIT.md.
2. FEATURE GATING. Only claim a capability if docs/seo/feature-status.json marks it "live" or "live-per-site". "in-code" and "no-evidence" items are not claimable. Pages that depend on them are DRAFTS: `noindex`, excluded from sitemap, nav and internal links, listed in TODO_FOR_SUMIT.md. Flipping the flag publishes them.
3. QUALITY OVER COUNT. Never create a page just to have a URL. Every indexable page must (a) target one primary keyword and one clear intent from the keyword map, (b) contain information that is not on any other page of this site, (c) have a specific call to action. No near-duplicate templated pages, no spun text, no city or area doorway pages. Write `scripts/seo-check` (TypeScript or Node, matching the repo) that fails when two pages share more than 25% identical sentences.
4. SCOPE. Marketing site only. Do not modify the backend or app repos, databases, DNS, hosting accounts or secrets. Configuration goes through environment variables; update `.env.example`; never commit secrets.
5. URL SAFETY. Keep every existing URL. If one must change, add a 301 from the old URL and update internal links.
6. NO SPAM TACTICS. No keyword stuffing, hidden text, cloaking, fake review or rating schema, link schemes, or auto-generated content at scale.
7. PERFORMANCE FIRST. Assume Indian mobile on 4G. No autoplay video, heavy sliders, chat widgets or third-party scripts unless required and loaded after interaction.
8. INDIA-FIRST COPY. Use rupees, GST, UPI/Razorpay, WhatsApp, tier-2/3 realities, plain language, short sentences. Examples must be realistic and labelled as examples. Any tax, licence or legal statement gets a "verify with your CA / advisor" note and an entry in TODO_FOR_SUMIT.md for expert review.
9. DO NOT MIGRATE FRAMEWORKS. Stay on the existing Next.js App Router setup and its conventions, and read its docs first (see REPO FACTS).
10. COMMUNICATION. After Phase 0, STOP and ask. After my answers, proceed through the phases without asking again; unknowns become config placeholders plus TODO entries. End every phase with a 5-line summary: what changed, files touched, how it was verified, what is left, what I must do.
11. COMMITS AND COMMENTS. Commit messages are plain `type: message`. Never add Co-Authored-By lines or "Generated with" lines to commits or PRs. Code comments read like a teammate's quick note: short, no AI-style explanations of reasoning. Run no git command beyond what the phases require (branch, add, commit).

PAGE STANDARDS (apply to every indexable page)
- Title 50-60 characters with the primary keyword near the front; meta description 120-155 characters; exactly one H1 containing the primary keyword in natural wording.
- The first 100 words answer the searcher's question directly. Secondary keywords appear naturally in H2s and body; never force or repeat them.
- At least 5 descriptive internal links (hub, two sibling pages, one tool, one blog post or compare page as relevant) and at least two CTA blocks (mid-page and end).
- KEYWORD COVERAGE: the primary keyword and every secondary keyword listed for the page in the KEYWORD MAP must each appear at least once, naturally, in the title, H1, an H2, body copy or FAQ. Use close natural variants where the exact phrase reads badly (for example Hinglish phrasing), and never repeat a phrase for its own sake.
- Visible "Last updated" date. Editorial pages get an author byline from config.
- Depth: as long as needed to be the best answer to the query, typically 900-1,500 words for feature and blog pages; tool pages at least 500 words of explanation under the tool. Never pad.
- Feature page structure: direct answer; who it is for; the problem today (Excel, register, WhatsApp groups); how it works in Fitvario step by step; capabilities (only live ones); India-specific details (GST, Razorpay/UPI, WhatsApp, Hindi/Hinglish); a worked example clearly labelled as an example; screenshot placeholders with alt text and a TODO for real screenshots; 4-6 genuinely asked FAQs; related pages; CTA.
- Images: real product screenshots only (placeholders flagged in TODO). No stock-photo filler.
- Tone: practical, direct, owner-to-owner. No hype adjectives, no unsourced statistics.
