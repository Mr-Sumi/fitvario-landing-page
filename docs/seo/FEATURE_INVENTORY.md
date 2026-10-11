# Feature inventory (backend audit, 2026-10-11)

Source: `fitvario-backend` (read-only): `auth_core/urls.py` routes, `models.py`, `auth_core/views/*`, management commands. "Status" is the flag in `feature-status.json`. Nothing here is marketing copy; only `live` and `live-per-site` flags may be claimed.

## Owner (gym owner and staff)

| Area | What the code has | Flag(s) | Status |
|---|---|---|---|
| Members | Create, edit, list, stats, birthdays, categories, freeze and gift days | `membership_lifecycle`, `freeze_gift_days`, `customer_categories`, `member_birthdays_list` | live-per-site / in-code |
| Plans | Membership plans, plan templates, marketplace templates | `membership_lifecycle`, `template_marketplace` | live-per-site / in-code |
| Batches | Batches and slots | `batches_time_slots` | in-code |
| Invoices | Invoices, renewals, tax lines (GST), partial payments, dues, collect payment | `invoices_renewals`, `gst_tax_lines`, `dues_partial_payments` | live-per-site / in-code |
| Expenses | Expenses with line items, recurring expenses with pause, cron `process_recurring_expenses` | `expense_manager`, `recurring_expenses` | in-code |
| Analytics | Business stats, collection, CRM, financial, member growth, multi-branch | `revenue_expense_analytics`, `multi_branch_franchise` | live-per-site |
| Attendance | QR, manual, bulk mark, settings, analytics, top attenders, auto absent | `qr_attendance`, `manual_bulk_attendance`, `attendance_analytics`, `auto_absent_marking` | live-per-site / in-code |
| Biometric | ADMS devices, punch logs, commands | `biometric_adms` | in-code |
| CRM | Enquiries, enquiry types, follow-ups, today list | `crm_enquiries_followups` | live-per-site |
| Staff | Staff accounts, permissions, change password, activity logs | `staff_permissions`, `activity_logs` | live-per-site |
| Trainers | Trainer assignment | `personal_trainer_assignment` | in-code |
| Diet and workout | Templates, days, meals, exercises, assignment, requests | `diet_plans`, `workout_plans`, `workout_diet_plans`, `plan_requests_approval` | not-live |
| Online store | Products, orders, approve and reject | `ecommerce_cart_orders` | not-live |
| Notifications | Campaigns, templates, wallet, credit packages, push, analytics, preferences | `notification_campaigns_wallet`, `owner_push_broadcast`, `whatsapp_sms_push_alerts` | in-code / live-per-site |
| Reminders | Expiry (7/3/1/+1), birthdays, due payment, daily summary | `whatsapp_expiry_reminders`, `whatsapp_birthday_messages`, `due_payment_reminders`, `daily_owner_summary` | in-code / not-live |
| Gym profile | Gallery, highlights, hours, slots, temporary closures, public profile JSON | `gym_gallery_highlights`, `gym_hours_and_closures`, `public_gym_profile_api` | in-code |
| Branding | Whitelabel config | `white_label` | in-code |
| Growth | Owner referral and coin wallet, member referral, banners | `owner_referral_program`, `referral_coins`, `platform_banners` | in-code / live-per-site |
| Owner account | Subscription, upgrade, coupons, coins, billing history, store, delete account | `self_serve_signup_subscription`, `subscription_coupons`, `owner_billing_history`, `platform_store_for_owners`, `account_deletion` | in-code |
| Platform | Backups, Razorpay | `daily_backups`, `razorpay_payments` | live-per-site |

## Member

| Area | What the code has | Flag(s) | Status |
|---|---|---|---|
| Profile and dashboard | Profile, dashboard summary, subscription, gym profile, open status | `membership_lifecycle`, `branded_android_member_app` | live-per-site |
| Attendance | QR scan (first scan in, next out) | `qr_attendance` | live-per-site |
| Progress | BMI, BMR, body measurements, progress photos | `member_progress_tracking` | live-per-site |
| Diet and workout | My plan, start, restart, mark complete | `diet_plans`, `workout_plans` | not-live |
| Shop | Cart, checkout, orders | `ecommerce_cart_orders` | not-live |
| Referral | Coins, referral | `referral_coins` | live-per-site |
| Notifications | Notification center, unread, mark read, reminder preferences | `member_notification_center`, `whatsapp_sms_push_alerts` | in-code |
| Trainer | My trainer | `personal_trainer_assignment` | in-code |
| Account | Delete account | `account_deletion` | in-code |

## Deliberately not flagged

Super-admin console, impersonation, DLT and email template admin, feature registry, app-version force update, plan-limit entitlements, Razorpay reconciliation, image upload, device registration. They are not customer-facing claims.

## Not found in code

`class_scheduling_booking`, `staff_salary_attendance_hr`, `gym_faqs_text_video` (FAQ is platform-level), `report_export_excel_pdf`, `passwordless_otp_only_login`: no evidence, so they stay `no-evidence`.
