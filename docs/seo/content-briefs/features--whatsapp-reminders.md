# Brief: /features/whatsapp-reminders

Status: published · Wave: Wave 1 · Kind: feature

## Keywords
- Primary: whatsapp reminders for gym (P1, English, WhatsApp)
- Secondary: gym membership renewal reminder; gym whatsapp automation
- DROPPED (never target or count): whatsapp business api for gym (phrase banned)

## Search intent
Commercial. One page, one intent. Do not overlap with another page's primary keyword.

## Gate
FEATURE GATE: draft until whatsapp_expiry_reminders is confirmed live. Never claim automated due-payment reminders (due_payment_reminders is not-live).

## Content rule
None beyond SEO_RULES.md.

## Outline (starting point: refine before writing)
1. Direct answer: what whatsapp reminders for gym means in Fitvario (first 100 words)
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
- What is whatsapp reminders for gym?
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
- whatsapp reminders for gym: Live on Features as WhatsApp Business
- whatsapp business api for gym: dropped, the phrase is banned
- Every capability named must be "live" or "live-per-site" in feature-status.json.

## Backend evidence (for the writer; do not cite file paths on the page)
auth_core/notifications/*; management/commands/notify_expiring_memberships.py, notify_due_payments.py, notify_member_birthdays.py; notification_campaign_views.py; notification_wallet_views.py
