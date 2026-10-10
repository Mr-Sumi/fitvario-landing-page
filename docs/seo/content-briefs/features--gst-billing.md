# Brief: /features/gst-billing

Status: draft · Wave: Wave 1 · Kind: feature

## Keywords
- Primary: gym software with gst billing (P1, English, GST billing)
- Secondary: gym billing software india; gym partial payment dues tracking software
- DROPPED (never target or count): none

## Search intent
Commercial. One page, one intent. Do not overlap with another page's primary keyword.

## Gate
FEATURE GATE: draft unless GST invoicing is "live" in feature-status.json. Code evidence: per-gym configurable tax lines (name, tax number, percentage) with a per-invoice breakdown, and a company GST field. Not verified: CGST/SGST vs IGST split, GSTIN printed on the invoice, HSN/SAC. Describe only what Sumit confirms.

## Content rule
None beyond SEO_RULES.md.

## Outline (starting point: refine before writing)
1. Direct answer: what gym software with gst billing means in Fitvario (first 100 words)
2. Who it is for
3. The problem today (Excel, paper register, WhatsApp groups)
4. How it works in Fitvario, step by step
5. Capabilities (only features marked live)
6. India-specific details (GST, Razorpay/UPI, WhatsApp, Hindi/Hinglish)
7. Worked example, clearly labelled as an example
8. Screenshot placeholders with alt text (TODO: real screenshots)
9. 4-6 FAQs people really ask
10. Related pages and closing CTA

## FAQ stems (replace with real questions from Search Console, sales calls and support email)
- What is gym software with gst billing?
- Does it work for a small gym?
- What does it cost?
- How long does set-up take?

## Internal links to include
- /features (hub)
- two sibling feature pages
- one tool
- one blog post or compare page
- /pricing
- /contact#demo

## CTA
Book a free demo (/contact#demo) at mid-page and at the end. WhatsApp and call options come from config.

## Facts to verify before writing
- gym software with gst billing: Only claim if GST invoices are live
- gym partial payment dues tracking software: Fitvario has partial payments/dues in code (verified)
- Every capability named must be "live" or "live-per-site" in feature-status.json.

## Backend evidence (for the writer; do not cite file paths on the page)
models.py (GymTax, InvoiceTax); tax_views.py; invoice_views.py (invoice recalculation, collect-payment); dues routes
