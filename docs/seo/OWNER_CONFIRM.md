# Owner confirmation checklist

Last updated 2026-10-11. Nothing below was guessed. Each flag stays `unverified` (in `feature-status.json`: `in-code` or `not-live`) until you tick it, or ask me to re-run the browser checks.

## 0. What the browser run did and did not cover

| Check | Result |
|---|---|
| Play Store listing | **Verified.** `app.fitvario.com` redirects (301) to `https://play.google.com/store/apps/details?id=com.fitvario.sumigyan`. The listing loads with an Install button and says it was updated Sep 28, 2026. |
| Owner web dashboard (workout plans, diet plans, store, GST, plans and pricing, signup, marketplace, campaigns, plan requests) | **Not run.** No dashboard hostname could be found, and the browser showed no signed-in session or test gym. Stopped under safety rule 2. |

To run the browser checks I need from you:
- [ ] The production URL of the owner web dashboard (the `Pr-website-main` app; it calls `https://api.fitvario.com/api`). `app.fitvario.com` is only a Play Store redirect.
- [ ] Confirmation that the test gym named **"SEO-TEST (delete me)"** exists, that it is the account the browser is signed in to, and that the browser is NOT signed in to a real gym or super-admin.
- [ ] Your own phone number, only if a test message turns out to be unavoidable. I will skip any action that could message people and mark it "needs owner confirmation".

## 1. Owner web dashboard (I can run these in Chrome once section 0 is done)

- [ ] Workout plans: create a plan with a day and an exercise, assign it to a test member. Flag: `workout_diet_plans`.
- [ ] Diet plans: same. Flag: `workout_diet_plans`.
- [ ] Online store: add a product, confirm the owner order list and approve/reject screens exist. Flag: `ecommerce_cart_orders`. (Member ordering is in the mobile app, see section 2.)
- [ ] GST: create a tax, create an invoice for the test member, confirm the tax lines show. Flag: `gst_tax_lines`.
- [ ] Plans and pricing: read-only copy of plan names, prices, billing periods and limits into `plan-table-observed.md`. Not published without your OK.
- [ ] Self-serve signup: confirm the public signup and plan-selection screens load; stop before payment. Flag: `self_serve_signup_subscription`.
- [ ] Template marketplace, campaigns and wallet, plan requests: record which screens exist (no campaign is launched).

## 2. Things a browser cannot verify. Please check on your phone or server.

| # | Check | How | Flag it unlocks |
|---|---|---|---|
| 1 | QR check-in and check-out: a member scans the gym's QR code, then scans again on leaving, and the app shows time spent | Member app on a test member | `qr_attendance`, and confirms the copy on the site |
| 2 | Member sees their plan, attendance and progress in the app | Member app | `branded_android_member_app`, `member_progress_tracking` |
| 3 | Member places a store order in the app and the owner sees it | Member app + dashboard | `ecommerce_cart_orders` |
| 4 | Workout and diet plan visible and trackable in the member app | Member app | `workout_diet_plans` |
| 5 | Expiry reminders: `send_membership_alerts` is scheduled. Run `crontab -l -u ubuntu` on the live server and look for it; check the last run in the log | Server | `whatsapp_expiry_reminders` |
| 6 | Birthday messages: `notify_member_birthdays` is scheduled | Server | `whatsapp_birthday_messages` |
| 7 | Due-payment reminders: `notify_due_payments` is scheduled. As of the 25 Sep audit it was not. If you schedule it, say so and I will update the copy | Server | `due_payment_reminders` (stays not-live until then) |
| 8 | A WhatsApp message really reaches a test member's phone, using a gym owned by you and your own number | Phone | `whatsapp_sms_push_alerts` delivery |
| 9 | ADMS biometric device pushes punches to the server (check nginx for the `iClock Proxy` user agent, then punch logs in the dashboard) | Device + server | `biometric_adms` |
| 10 | White-label: a branded build exists for a gym and uses that gym's name and logo | Phone / Play Console | `white_label` |
| 11 | Is the Play Store app the member app, the owner app, or both? | Play Console | wording on `/features/member-app` |
| 12 | `backup_database` is scheduled daily | Server | "daily automated backups" claim |

## 3. Wording I could not verify and kept (please confirm or tell me to remove)

- "We help you bring in your existing member list" (a service, not a product feature).
- "Reply within 24 hours on business days" and "quote within 1 to 2 business days".
- "Registered in Bhopal".
- "Messaging credit allowance is included in every plan".
