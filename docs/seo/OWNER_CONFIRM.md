# Owner confirmation checklist

Last updated 2026-10-11. Nothing below was guessed. A flag stays `in-code` or `not-live` in `feature-status.json` until you answer here. Browser verification is cancelled: owners use the mobile app, so there is no dashboard to test.

The earlier list was incomplete. A fresh audit of the backend (routes, models, management commands) added 20 flags, including the expense manager, recurring expenses, gallery, opening hours, customer categories and account deletion. The full inventory is in `FEATURE_INVENTORY.md`. Each section below is one table; put **Y** or **N** in the last column (Y = works in production today for gym owners or members).

## 1. Already decided

| Flag | Status | Source |
|---|---|---|
| `due_payment_reminders` | N | you |
| `owner_web_dashboard` | N (owners use the app) | you |
| `workout_diet_plans`, `diet_plans`, `workout_plans` | N (not available) | you, 2026-10-11 |
| `ecommerce_cart_orders` | N (not available) | you, 2026-10-11 |

If any of these changed (diet, workout or the store now work), say so and I will flip them.

## 2. Money and billing

| Flag | What it is | Y/N |
|---|---|---|
| `gst_tax_lines` | Owner picks tax lines (for example GST) on invoices | |
| `invoices_renewals` | Invoices and renewals (already live per site) | already live |
| `dues_partial_payments` | Dues summary, partial payments, collect payment | |
| `expense_manager` | Add expenses with line items and dates | |
| `recurring_expenses` | Repeating expenses, pause and resume | |
| `revenue_expense_analytics` | Revenue, collection and financial analytics (already live per site) | already live |
| `razorpay_payments` | Online payment (already live per site) | already live |
| `owner_billing_history` | Owner sees Fitvario subscription invoices and payments | |
| `subscription_coupons` | Coupon on the Fitvario subscription | |
| `platform_store_for_owners` | Owners buy products from Fitvario | |

## 3. Members and attendance

| Flag | What it is | Y/N |
|---|---|---|
| `freeze_gift_days` | Freeze membership, gift days | |
| `batches_time_slots` | Batches and time slots | |
| `customer_categories` | Owner-defined member groups | |
| `member_birthdays_list` | Birthday list for the owner | |
| `qr_attendance` | First scan checks in, next scan checks out (already live per site) | confirm wording |
| `manual_bulk_attendance` | Owner marks or bulk-marks attendance | |
| `attendance_analytics` | Attendance analytics and top attenders | |
| `auto_absent_marking` | Absentees marked automatically (needs cron) | |
| `biometric_adms` | Biometric device, tested with a real device in production | |
| `personal_trainer_assignment` | Assign a trainer to a member | |
| `member_progress_tracking` | BMI, BMR, body measurements, progress photos (already live per site) | already live |
| `template_marketplace` | Plan templates shared by the platform | |
| `plan_requests_approval` | Members request a plan, owner approves | |

## 4. Plans and the shop (all currently N)

| Flag | What it is | Y/N |
|---|---|---|
| `diet_plans` | Diet plan templates, assignment, daily completion | N |
| `workout_plans` | Workout plan templates, assignment, exercise completion | N |
| `ecommerce_cart_orders` | Products, cart, checkout, owner approves orders | N |

## 5. Reminders and messages

| Flag | What it is | Y/N |
|---|---|---|
| `whatsapp_expiry_reminders` | 7, 3 and 1 day before and the day after expiry; cron scheduled and delivering | |
| `whatsapp_birthday_messages` | Automatic birthday message | |
| `whatsapp_sms_push_alerts` | WhatsApp, SMS and push alerts (already live per site) | already live |
| `notification_campaigns_wallet` | Bulk campaigns with a credit wallet | |
| `owner_push_broadcast` | Owner sends a push message to members | |
| `member_notification_center` | In-app notifications and preferences for members | |
| `daily_owner_summary` | Daily summary to the owner (cron not scheduled) | |

## 6. Gym profile, growth and the app

| Flag | What it is | Y/N |
|---|---|---|
| `gym_gallery_highlights` | Gallery photos and highlights | |
| `gym_hours_and_closures` | Opening hours, slots, temporary closures | |
| `public_gym_profile_api` | Public gym profile data (no web pages yet) | |
| `white_label` | A gym with its own branded app in production | |
| `branded_android_member_app` | Member Android app (already live per site) | already live |
| `referral_coins` | Member referral coins (already live per site) | already live |
| `owner_referral_program` | Owner refers owner, earns coins | |
| `platform_banners` | Banners from Fitvario inside the apps | |
| `crm_enquiries_followups` | Enquiries and follow-ups (already live per site) | already live |
| `multi_branch_franchise`, `staff_permissions`, `activity_logs` | Already live per site | already live |
| `self_serve_signup_subscription` | A new owner can sign up and pay without help | |
| `account_deletion` | Delete account from the app | |

## 7. The app question

- [ ] Is it **one Android app** for owners, staff and members with role-based login, or **separate apps** (names)? The Play listing `com.fitvario.sumigyan` ("Fitvario – Gym Management App") is written for gym owners and trainers. Until you answer, the site says "the Fitvario Android app" for owners and staff and "an Android app" for members, without saying whether they are the same app.

## 8. Things only a phone or server can show (unchanged)

| Check | How |
|---|---|
| `send_membership_alerts` and `notify_member_birthdays` scheduled and delivering | `crontab -l -u ubuntu` on the live server; last run in the log |
| `notify_due_payments` scheduled (currently N) | Same; tell me when it changes |
| `process_recurring_expenses`, `mark_absent_attendance`, `notify_daily_summary` scheduled | Same |
| ADMS punches arriving | nginx log for the `iClock Proxy` user agent |
| `backup_database` scheduled daily | Server crontab |
| WhatsApp message actually reaching a test member | Your own phone |

## 9. Wording kept but unverified (confirm or remove)

- "We help you bring in your existing member list" (a service; `member_data_import` is `no-evidence`).
- "Reply within 24 hours on business days" and "quote within 1 to 2 business days".
- "Registered in Bhopal".
- "Messaging credit allowance is included in every plan".

## 10. Not listed on purpose

Platform-admin and internal tools are not marketing claims: super-admin console, impersonation, DLT and email template management, feature registry, app-version force update, plan-limit entitlements, payment reconciliation, image upload, device registration.
