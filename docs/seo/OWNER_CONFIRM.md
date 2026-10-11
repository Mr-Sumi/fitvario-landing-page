# Owner confirmation checklist

Last updated 2026-10-11. Nothing below was guessed. A flag stays `in-code` or `not-live` in `feature-status.json` until you answer here. Browser verification is cancelled: owners use the mobile app, so there is no dashboard to test.

## 1. Flags still waiting for your Y/N

Your last message gave `due_payment_reminders: N` and "no owner web dashboard". The other flags were still the `[Y/N]` template. Reply with Y or N for each ("works in production today for gym owners"):

| Flag | What Y unlocks |
|---|---|
| `workout_diet_plans` (workout plans, and diet plans separately if they differ) | Restores workout and diet claims; publishes `/features/diet-workout-plans` |
| `ecommerce_cart_orders` (products, cart, checkout, owner order approval) | Restores the online store claims |
| `gst_tax_lines` | Publishes `/features/gst-billing` |
| `biometric_adms` (tested with a real device in production) | Publishes `/features/biometric-attendance` |
| `white_label` (a gym with its own branded app in production) | Publishes `/features/white-label-gym-app` |
| `template_marketplace`, `notification_campaigns_wallet`, `plan_requests_approval` | Mentioned only when Y |
| `whatsapp_expiry_reminders` (cron scheduled and delivering) | Publishes `/features/whatsapp-reminders`; restores reminder wording |
| `whatsapp_birthday_messages` | Adds the birthday line |
| `self_serve_signup_subscription` (a new owner can sign up and pay without help) | Allows a "Sign up" CTA |
| `qr_attendance` scan-in / scan-out (first scan checks in, next checks out) | Confirms the QR wording and publishes `/features/qr-attendance` |

## 2. The app question

- [ ] Is it **one Android app** for owners, staff and members with role-based login, or **separate apps** (names)? The Play listing `com.fitvario.sumigyan` ("Fitvario – Gym Management App") is written for gym owners and trainers. Until you answer, the site says "the Fitvario Android app" for owners and staff and "an Android app" for members, without saying whether they are the same app.

## 3. Things only a phone or server can show (unchanged)

| Check | How |
|---|---|
| `send_membership_alerts` and `notify_member_birthdays` scheduled and delivering | `crontab -l -u ubuntu` on the live server; last run in the log |
| `notify_due_payments` scheduled (currently N) | Same; tell me when it changes |
| ADMS punches arriving | nginx log for the `iClock Proxy` user agent |
| `backup_database` scheduled daily | Server crontab |
| WhatsApp message actually reaching a test member | Your own phone |

## 4. Wording kept but unverified (confirm or remove)

- "We help you bring in your existing member list" (a service).
- "Reply within 24 hours on business days" and "quote within 1 to 2 business days".
- "Registered in Bhopal".
- "Messaging credit allowance is included in every plan".
