# Brief: /features/member-app

Status: planned · Wave: Wave 2 · Kind: feature

## Keywords
- Primary: gym member management app (P1, Hinglish, Hindi/Hinglish)
- Secondary: gym management app india; branded gym app for members
- DROPPED (never target or count): none

## Search intent
Commercial. One page, one intent. Do not overlap with another page's primary keyword.

## Gate
STORE-LINK GATE: real store links in config, else no store badges; Android only unless iOS confirmed

## Content rule
None beyond SEO_RULES.md.

## Outline (starting point: refine before writing)
1. Direct answer: what gym member management app means in Fitvario (first 100 words)
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
- What is gym member management app?
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
- gym management app india: Needs store links live
- gym member management app: English title but Hinglish queries land here too
- Every capability named must be "live" or "live-per-site" in feature-status.json.

## Backend evidence (for the writer; do not cite file paths on the page)
dashboard_views.py; bmi_views.py, bmr_views.py, body_measurement_views.py, progress_photo_views.py; workout_member_views.py, diet_member_views.py; referral_views.py; user_notification_views.py
