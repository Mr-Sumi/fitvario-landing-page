# Keyword map

Copied verbatim from PROMPT_PACK_v2.md (Prompt 1).

KEYWORD MAP (source of truth; save verbatim as docs/seo/keyword-map.md in Phase 4)
Notes: 76 keywords across 48 target pages. Keywords tagged DROPPED stay listed for the record but are never targeted, never counted and are reported separately by scripts/keyword-coverage.mjs. A RULE line is a content restriction for that page. Priority is judgement, not volume. "primary" is the highest-priority keyword for that page. Pages marked GATE must not be published until the gate is satisfied. Pattern pages such as /gyms/[city]/[area] are templates for Prompt 7, not pages to generate now.

PAGE /
  wave: Rewrite now
  primary: fitvario [P1, English, Brand, Navigational]
  secondary: gym management software india [P2]; gym management system india [P3]; fitvario gym management [P1]
  sheet notes: gym management software india: Long game; needs links and proof | gym management system india: Use as secondary in copy | fitvario: Organization schema + GBP + directories to own brand SERP

PAGE /pricing
  wave: Rewrite now
  primary: gym software price in india [P1, English, Pricing, Commercial investigation]
  secondary: gym membership software price [P2]; cheap gym software india [P3, DROPPED: no cheap or free plan]; free gym software india [P3, DROPPED: no free plan exists]
  sheet notes: gym software price in india: Needs real price anchor | cheap gym software india: Avoid cheap-positioning unless true | free gym software india: Only if a free tier exists
  GATE: DECISION GATE: rupee figures only from pricing config; "free" and "cheap" keywords only if literally true. Product has self-serve plans (Starter and higher, DB-driven); Sumit decides whether to publish them.

PAGE /features/member-app
  wave: Wave 2
  primary: gym member management app [P1, Hinglish, Hindi/Hinglish, Commercial]
  secondary: gym management app india [P2]; branded gym app for members [P2]
  sheet notes: gym management app india: Needs store links live | gym member management app: English title but Hinglish queries land here too
  GATE: STORE-LINK GATE: real store links in config, else no store badges; Android only unless iOS confirmed

PAGE /features/gst-billing
  wave: Wave 1
  primary: gym software with gst billing [P1, English, GST billing, Commercial]
  secondary: gym billing software india [P1]; gym partial payment dues tracking software [P2]
  sheet notes: gym software with gst billing: Only claim if GST invoices are live | gym partial payment dues tracking software: Fitvario has partial payments/dues in code (verified)
  GATE: FEATURE GATE: draft unless GST invoicing is "live" in feature-status.json. Code evidence: per-gym configurable tax lines (name, tax number, percentage) with a per-invoice breakdown, and a company GST field. Not verified: CGST/SGST vs IGST split, GSTIN printed on the invoice, HSN/SAC. Describe only what Sumit confirms.

PAGE /features/biometric-attendance
  wave: Wave 1
  primary: biometric attendance for gym [P1, English, Biometric, Commercial]
  secondary: zkteco gym software [P1]; gym fingerprint attendance software [P2]; gym access control software india [P3]; gym attendance machine software [P3, Hinglish]
  sheet notes: biometric attendance for gym: Only if ADMS biometric is shipped | zkteco gym software: Co-market with ZKTeco/eSSL dealers
  GATE: FEATURE GATE: draft unless ADMS/ZKTeco biometric is "live"; resolve the /pricing "optional biometrics" mention. Code evidence: ADMS push endpoints, device and command management, punch logs, user mapping, block/unblock, validity resync. Device models supported are not listed in code; ask.

PAGE /features/qr-attendance
  wave: Wave 2
  primary: gym attendance app qr code [P2, English, Biometric, Commercial]
  sheet notes: gym attendance app qr code: QR check-in is on live Features page; manual and bulk marking verified in code

PAGE /features/whatsapp-reminders
  wave: Wave 1
  primary: whatsapp reminders for gym [P1, English, WhatsApp, Commercial]
  secondary: gym membership renewal reminder [P1]; gym whatsapp automation [P2]; whatsapp business api for gym [P3, DROPPED: phrase banned]
  sheet notes: whatsapp reminders for gym: Live on Features as WhatsApp Business | whatsapp business api for gym: dropped, the phrase is banned
  GATE: FEATURE GATE: draft until whatsapp_expiry_reminders is confirmed live. Never claim automated due-payment reminders (due_payment_reminders is not-live).

PAGE /features/gym-crm
  wave: Wave 1
  primary: gym crm software india [P1, English, CRM, Commercial]
  secondary: gym lead management software [P2]; gym enquiry follow up app [P1]
  sheet notes: gym enquiry follow up app: Matches enquiry/follow-up modules (verified)

PAGE /features/white-label-gym-app
  wave: Wave 2
  primary: white label gym app india [P2, English, White-label, Commercial]
  secondary: gym app with own branding [P2]
  sheet notes: white label gym app india: Only if white-label is shipped | gym app with own branding: Features page already says gym-branded Android app
  GATE: FEATURE GATE: draft unless white-label is "live"; otherwise use the site's "gym-branded Android app" wording. Code evidence: `owner/whitelabel` endpoint exists; how the Android app is branded per gym is not verified.

PAGE /features/multi-branch-gym-software
  wave: Wave 2
  primary: multi branch gym software [P2, English, Franchise, Commercial]
  sheet notes: verified in code: franchise > gyms, per-gym staff scope, multi-branch analytics (overview, revenue, members, attendance, CRM)

PAGE /features/diet-workout-plans
  wave: Wave 3
  primary: gym diet plan software [P3, English, Diet/workout, Commercial]
  secondary: workout plan builder for gym trainers [P3]
  sheet notes: plan builders exist in code but Sumit says workout and diet plans are not available to users
  GATE: FEATURE GATE: NOT LIVE. Draft until workout_diet_plans is live in feature-status.json.

PAGE /for/franchise-gyms
  wave: Wave 3
  primary: franchise gym management software [P2, English, Franchise, Commercial]
  secondary: gym chain management software india [P3]

PAGE /for/small-gyms
  wave: Wave 3
  primary: gym software for small gyms india [P2, English, Segment, Commercial]

PAGE /for/crossfit-yoga-studios
  wave: Wave 3
  primary: crossfit gym software india [P3, English, Segment, Commercial]
  secondary: yoga studio software india [P3]
  GATE: FEATURE GATE: the product has batches (time slots) and opening hours but NO class booking or enrolment. Do not promise class booking, capacity or waitlists unless Sumit confirms they exist elsewhere.

PAGE /tools/gym-invoice-generator
  wave: Wave 2
  primary: gym invoice format gst [P2, English, GST billing, Informational]
  secondary: gym fees receipt format [P3]
  sheet notes: gym invoice format gst: Free generator tool; funnel to trial
  GATE: CONTENT GATE: CA review of GST wording; do not claim Fitvario auto-generates GST invoices unless GST is live

PAGE /tools/gym-gst-calculator
  wave: Wave 2
  primary: gym membership gst calculator [P1, English, GST billing, Tool]
  sheet notes: gym membership gst calculator: India inputs: 18% GST, inclusive/exclusive
  GATE: CONTENT GATE: CA review; editable rate, default 18%

PAGE /tools/gym-startup-cost-calculator
  wave: Wave 3
  primary: gym business cost in india [P3, English, Start-a-gym, Informational]
  GATE: CONTENT GATE: state-wise licence and cost rules vary; expert review

PAGE /tools/gym-break-even-calculator
  wave: Wave 1
  primary: gym break even calculator [P1, English, Tools, Tool]
  sheet notes: gym break even calculator: India inputs: rent by city tier, GST

PAGE /tools/gym-membership-pricing-calculator
  wave: Wave 2
  primary: gym membership pricing calculator [P1, English, Tools, Tool]

PAGE /tools/gym-churn-calculator
  wave: Wave 3
  primary: gym churn rate calculator [P2, English, Tools, Tool]

PAGE /tools/gym-revenue-calculator
  wave: Wave 3
  primary: gym revenue calculator [P3, English, Tools, Tool]

PAGE /templates/diet-charts
  wave: Wave 3
  primary: indian diet chart for gym members [P3, English, Diet/workout, Informational]
  sheet notes: indian diet chart for gym members: Long-term template library
  GATE: CONTENT GATE: nutritionist review before publishing; build as draft; no medical claims

PAGE /blog/best-gym-management-software-india
  wave: Wave 2
  primary: best gym management software in india [P2, English, Head term, Commercial investigation]
  secondary: best gym software india 2026 [P2]
  sheet notes: best gym management software in india: Build own honest listicle with dated price table | best gym software india 2026: Same page; refresh title yearly
  GATE: ACCURACY GATE: same rules as compare pages; disclose that Fitvario makes this site

PAGE /blog/gym-renewal-reminder-message-formats
  wave: Wave 1
  primary: gym membership renewal message format [P1, English, WhatsApp, Informational]
  sheet notes: gym membership renewal message format: Copy-paste templates; high link/share potential
  RULE: Templates the owner sends by hand. Do not say Fitvario sends them automatically until whatsapp_expiry_reminders is live.

PAGE /blog/gym-lead-follow-up-script
  wave: Wave 2
  primary: gym lead follow up script [P2, English, CRM, Informational]
  sheet notes: gym lead follow up script: Add Hinglish version

PAGE /blog/gym-referral-program
  wave: Wave 3
  primary: gym referral program ideas india [P3, English, CRM, Informational]
  sheet notes: gym referral program ideas india: Ties to referral/coins feature (verified in code)

PAGE /blog/gym-software-pricing-in-india
  wave: Wave 2
  primary: gym management software cost [P1, English, Pricing, Commercial investigation]
  sheet notes: gym management software cost: Honest pricing guide with Fitvario tiers
  GATE: DECISION GATE: needs real pricing config

PAGE /blog/reduce-gym-member-churn-india
  wave: Wave 2
  primary: how to reduce gym member churn [P1, English, Problem-led, Informational]
  secondary: gym member retention strategies india [P1]
  sheet notes: how to reduce gym member churn: Win with India examples | gym member retention strategies india: Same page; H2 variants

PAGE /blog/get-more-gym-members-india
  wave: Wave 2
  primary: how to get more gym members india [P1, English, Problem-led, Informational]
  sheet notes: how to get more gym members india: Instagram, Google Maps, referral, WhatsApp

PAGE /blog/gym-membership-pricing-india
  wave: Wave 1
  primary: gym membership pricing strategy [P1, English, Problem-led, Informational]
  secondary: gym membership plans and fees india [P2]
  sheet notes: gym membership pricing strategy: Pairs with pricing calculator

PAGE /blog/gym-freeze-policy-template
  wave: Wave 3
  primary: gym membership freeze policy [P3, English, Problem-led, Informational]
  GATE: CONTENT GATE: template, not legal advice; expert review

PAGE /blog/gym-fee-collection-tips
  wave: Wave 2
  primary: how to collect gym fees on time [P2, English, Problem-led, Informational]
  RULE: Cover with template messages and manual or expiry-reminder workflows only. No automated due-payment claims. Mention expiry reminders only once whatsapp_expiry_reminders is live.

PAGE /blog/how-to-start-a-gym-in-india
  wave: Wave 3
  primary: how to start a gym in india [P2, English, Start-a-gym, Informational]
  sheet notes: how to start a gym in india: Pillar; pairs with break-even tool
  GATE: CONTENT GATE: licences, costs and tax need expert review

PAGE /hi/gym-fee-reminder-message
  wave: Wave 2
  primary: gym fee reminder message in hindi [P1, Hinglish, WhatsApp, Informational]
  sheet notes: gym fee reminder message in hindi: Hinglish template page
  RULE: Cover with template messages and manual or expiry-reminder workflows only. No automated due-payment claims. Mention expiry reminders only once whatsapp_expiry_reminders is live.

PAGE /hi/
  wave: Wave 2
  primary: gym management software hindi [P1, Hinglish, Hindi/Hinglish, Commercial]
  secondary: gym ke liye software [P2, Hinglish]
  sheet notes: gym management software hindi: Validate with a phone SERP check first
  GATE: VALIDATION GATE: Sumit's phone SERP check first (Prompt 5, Step 0)

PAGE /hi/gym-billing-software
  wave: Wave 2
  primary: gym ka billing software [P1, Hinglish, Hindi/Hinglish, Commercial]

PAGE /hi/gym-software-kaise-chune
  wave: Wave 2
  primary: gym software kaise chune [P2, Hinglish, Hindi/Hinglish, Informational]

PAGE /hi/whatsapp-reminder
  wave: Wave 2
  primary: gym ka fees reminder whatsapp [P1, Hinglish, Hindi/Hinglish, Informational]
  RULE: Cover with template messages and manual or expiry-reminder workflows only. No automated due-payment claims. Mention expiry reminders only once whatsapp_expiry_reminders is live.

PAGE /hi/blog/gym-me-member-kaise-badhaye
  wave: Wave 3
  primary: gym me member kaise badhaye [P2, Hinglish, Hindi/Hinglish, Informational]
  sheet notes: gym me member kaise badhaye: YouTube companion

PAGE /compare/easy-gym-software-alternative
  wave: Wave 2
  primary: easy gym software alternative [P2, English, Comparison, Commercial investigation]
  sheet notes: easy gym software alternative: Factual, cited, dated
  GATE: ACCURACY GATE: cited public facts with verified dates; legal read; draft until cleared

PAGE /compare/okfit-alternative
  wave: Wave 2
  primary: okfit alternative [P2, English, Comparison, Commercial investigation]
  GATE: ACCURACY GATE: cited public facts with verified dates; legal read; draft until cleared

PAGE /compare/gymsmart-alternative
  wave: Wave 3
  primary: gymsmart alternative [P3, English, Comparison, Commercial investigation, DEFERRED: vendor could not be verified (owner decision 2026-10-11); page stays draft]
  GATE: ACCURACY GATE: cited public facts with verified dates; legal read; draft until cleared

PAGE /compare/mindbody-alternative-india
  wave: Wave 2
  primary: mindbody alternative india [P2, English, Comparison, Commercial investigation]
  GATE: ACCURACY GATE: cited public facts with verified dates; legal read; draft until cleared

PAGE /compare/gymmaster-alternative-india
  wave: Wave 3
  primary: gymmaster alternative india [P3, English, Comparison, Commercial investigation]
  GATE: ACCURACY GATE: cited public facts with verified dates; legal read; draft until cleared

PAGE /gyms/bhopal
  wave: Wave 3
  primary: gyms in bhopal [P2, English, Local/programmatic, Local]
  sheet notes: gyms in bhopal: Goal is owner backlinks, not consumer traffic
  GATE: QUALITY GATE: Prompt 7A/7B only; indexable hub only when >= 5 qualifying opted-in gyms; no consumer doorway pages

PAGE /gyms/bhopal/arera-colony
  wave: Wave 3
  primary: gyms in arera colony bhopal [P2, English, Local/programmatic, Local]
  sheet notes: gyms in arera colony bhopal: Template: /gyms/[city]/[area]
  GATE: QUALITY GATE: Prompt 7A/7B only; same hub threshold

PAGE /gyms/[city]/[area]
  wave: Wave 3
  primary: gym fees in [area] [city] [P3, English, Local/programmatic, Local]
  sheet notes: gym fees in [area] [city]: Pattern; only with owner-entered fees
  GATE: PATTERN, not a page to generate now; Prompt 7 template, owner-entered fees only

PAGE /gyms/[city]/[area]/[slug]
  wave: Wave 3
  primary: [gym name] [area] [city] [P3, English, Local/programmatic, Navigational]
  sheet notes: [gym name] [area] [city]: Brand queries for each gym
  GATE: PATTERN, not a page to generate now; Prompt 7 profile template, opt-in plus quality gate

SUPPORT PAGES (no target keyword): /features (hub), /contact, /about, /customers and /customers/[case-study] (only with real, permitted customers), /thank-you (noindex), 404, existing legal, support, grievance and delete-account pages.
