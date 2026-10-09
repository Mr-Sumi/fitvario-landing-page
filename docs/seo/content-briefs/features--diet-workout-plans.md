# Brief: /features/diet-workout-plans

Status: planned · Wave: Wave 3 · Kind: feature

## Keywords
- Primary: gym diet plan software (P3, English, Diet/workout)
- Secondary: workout plan builder for gym trainers

## Search intent
Commercial. One page, one intent. Do not overlap with another page's primary keyword.

## Gate
None.

## Outline (starting point: refine before writing)
1. Direct answer: what gym diet plan software means in Fitvario (first 100 words)
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
- What is gym diet plan software?
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
- verified in code: plan builders, assignment, member requests with approval, member progress tracking; template marketplace only if live
- Every capability named must be "live" or "live-per-site" in feature-status.json.

## Backend evidence (for the writer; do not cite file paths on the page)
diet_owner_views.py, workout_owner_views.py, diet_member_views.py, workout_member_views.py, plan_assign_views.py, plan_template_views.py
