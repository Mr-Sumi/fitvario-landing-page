# Brief: /features/white-label-gym-app

Status: planned · Wave: Wave 2 · Kind: feature

## Keywords
- Primary: white label gym app india (P2, English, White-label)
- Secondary: gym app with own branding

## Search intent
Commercial. One page, one intent. Do not overlap with another page's primary keyword.

## Gate
FEATURE GATE: draft unless white-label is "live"; otherwise use the site's "gym-branded Android app" wording. Code evidence: `owner/whitelabel` endpoint exists; how the Android app is branded per gym is not verified.

## Outline (starting point: refine before writing)
1. Direct answer: what white label gym app india means in Fitvario (first 100 words)
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
- What is white label gym app india?
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
- white label gym app india: Only if white-label is shipped
- gym app with own branding: Features page already says gym-branded Android app
- Every capability named must be "live" or "live-per-site" in feature-status.json.

## Backend evidence (for the writer; do not cite file paths on the page)
whitelabel_views.py (OwnerWhitelabelView)
