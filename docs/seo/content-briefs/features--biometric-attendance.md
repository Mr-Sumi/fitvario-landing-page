# Brief: /features/biometric-attendance

Status: planned · Wave: Wave 1 · Kind: feature

## Keywords
- Primary: biometric attendance for gym (P1, English, Biometric)
- Secondary: zkteco gym software; gym fingerprint attendance software; gym access control software india; gym attendance machine software
- DROPPED (never target or count): none

## Search intent
Commercial. One page, one intent. Do not overlap with another page's primary keyword.

## Gate
FEATURE GATE: draft unless ADMS/ZKTeco biometric is "live"; resolve the /pricing "optional biometrics" mention. Code evidence: ADMS push endpoints, device and command management, punch logs, user mapping, block/unblock, validity resync. Device models supported are not listed in code; ask.

## Content rule
None beyond SEO_RULES.md.

## Outline (starting point: refine before writing)
1. Direct answer: what biometric attendance for gym means in Fitvario (first 100 words)
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
- What is biometric attendance for gym?
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
- biometric attendance for gym: Only if ADMS biometric is shipped
- zkteco gym software: Co-market with ZKTeco/eSSL dealers
- Every capability named must be "live" or "live-per-site" in feature-status.json.

## Backend evidence (for the writer; do not cite file paths on the page)
biometric_adms_views.py; biometric_owner_views.py; management/commands/resync_biometric_validity.py
