# Product facts (verified against fitvario-backend, 2026-10-10)

Source: routes in `fitvario-backend/auth_core/urls.py`, models in `auth_core/models.py`, views in `auth_core/views/`, management commands in `auth_core/management/commands/`. Read-only review; nothing was run.

Status vocabulary
- IN-CODE: implemented in the backend; production use not confirmed by Sumit.
- CLAIMED: stated on the live site.
- NO-EVIDENCE: claimed on the live site but no backend support found.

Backend path (read-only from marketing sessions): `D:\coding\Python\django\New folder\fitvario-backend`

## Verified in code (IN-CODE until Sumit confirms live)

- Members: add/edit/list, stats, detail, health data, suspend, freeze/unfreeze, gift free days, renew, edit subscription, reset password, today's birthdays, member invoices.
- Plans and billing: membership plans, batches (time slots), per-gym configurable taxes (name, tax number, percentage) applied to invoices with a per-invoice tax breakdown, company GST field on the owner profile, invoices with collect-payment (partial payments tracked as dues), dues today/summary/member list, expenses and recurring expenses (with pause), financial/collection/member-growth analytics.
- Attendance: member QR scan, manual mark, bulk mark, edit records, settings, analytics, top attenders, nightly auto-mark-absent job. Biometric: ZKTeco/eSSL-style ADMS push endpoints (`iclock/cdata`, `getrequest`, `devicecmd`), device CRUD, command queue, punch logs, user mapping, block/unblock, membership-validity resync to devices.
- Training: diet plans and workout plans (plan > day > meal/exercise > item), quick-create, assign/restart/remove per member, member requests for plans with owner approve/reject, template marketplace (library, claim, purchase, copy), personal-trainer assignment.
- CRM: enquiries, enquiry types, customer categories, follow-ups, today's follow-up list, CRM analytics. Referral program (config, list, stats, apply) and loyalty coins ledger (member and owner side).
- Communication: notification campaigns (templates, audience preview, launch, cancel, progress); channels SMS / WhatsApp / push / email / in-app; per-channel credit wallet and purchasable packages; marketing WhatsApp charged at a separate admin-set credit rate; notification preferences and analytics; member reminder preferences; scheduled jobs for expiring memberships, due payments, birthdays, daily summary. Providers: Fast2SMS (SMS and WhatsApp), FCM push, ZeptoMail email. Do NOT claim "WhatsApp Business API" until Sumit confirms the provider arrangement.
- Store: owner products; member cart, checkout and orders with owner approve/reject; platform store where owners buy from Fitvario.
- Member app: profile, gym info, subscription status, plans, gallery, highlights, attendance, progress photos, BMI/BMR/body measurements, workout and diet tracking, my trainer, referral and coins, in-app notifications, account delete request and reactivate.
- Owner platform: multi-branch (franchise > gyms), multi-branch analytics (overview, revenue, members, attendance, CRM), staff accounts with ~90 granular permission codes, activity logs, white-label endpoint (`owner/whitelabel`), banners, gym gallery and highlights, gym schedule/opening hours and temporary closures, QR code per gym, public gym profile API (JSON, `GET /api/public/gym/<slug>/profile`).
- SaaS billing: owners can self-register and subscribe via Razorpay (plans, upgrade, coupons, coin wallet, billing history, entitlement limits per plan). Plan tiers come from the database (seeded by `seed_plans`); never hard-code plan names or prices.
- Member login supports BOTH password and OTP verification.
- Backups: `backup_database` management command exists (pg_dump, encrypted, off-site bucket, rolling prune).

## NO-EVIDENCE claims on the live site (remove or soften unless Sumit confirms)

- "Class Scheduling: class slots, capacity, enrolments, members book in the app" (/features). No booking or enrolment routes. Batches and gym opening hours exist.
- "Staff attendance, salary dates, HR basics" (/features, /pricing, home). No staff attendance or salary models. Staff accounts, permissions and activity logs exist.
- "FAQ & Content Management: gym FAQs with text and video answers" (/features). The FAQ model is platform-level, super-admin managed, read-only for owners.
- "Export reports (Excel/PDF)" (/features and /pricing). No export endpoints found; the web dashboard might export client-side. Ask.
- "OTP login, passwordless" for members (home, /features). Password login also exists.

## Understated on the live site (fix copy once confirmed live)

Ecommerce is a full cart > checkout > order > owner-approval flow, not just "express interest". Also: freeze and gift days, dues and partial payments, batches, personal-trainer assignment, plan requests, campaigns and credit wallet, loyalty coins, progress photos and BMR, birthdays, multi-branch CRM analytics.

## Status corrections from Sumit (2026-10-10). These override everything above.

- **Automated due-payment reminders: NOT live.** `notify_due_payments` exists but the job is not scheduled in production (25 Sep audit). No page may claim them. Fee-reminder topics are covered with template messages and manual workflows only.
- **WhatsApp expiry reminders (7, 3, 1 days before, and the day after) and birthday messages: in code, live only after Sumit confirms they run.** Until then pages use generic wording ("WhatsApp, SMS and push alerts") and the WhatsApp reminders page stays draft.
- **Online store, cart and orders: NOT live.** Do not mention a store, products, cart or orders.
- **Workout plans and diet plans: NOT live.** Do not mention them, including plan requests and plan-assigned messages.
- **The phrase "WhatsApp Business API" is banned.** Use "automated WhatsApp reminders" (once expiry reminders are confirmed) or "WhatsApp alerts".
- **Dropped keywords:** `whatsapp business api for gym`, `free gym software india`, `cheap gym software india`.

## Status corrections from Sumit (2026-10-11). These override everything above.

- **Now live (verified by owner):** GST/tax lines, dues and partial payments, biometric ADMS (tested on a real device), QR attendance (one QR per gym, first scan in, next scan out), WhatsApp expiry reminders (cron scheduled and delivering), birthday messages, notification campaigns and wallet, owner referral, white-label, multi-branch and franchise, template marketplace.
- **Still not live:** diet plans, workout plans, online store, automated due-payment reminders, self-serve sign-up and pay.
- **One app:** the Fitvario app on Google Play (`com.fitvario.sumigyan`) with role-based login for owners, staff and members. White-label means the gym's app name and logo show inside it; it is not a separate store listing.
- **Template marketplace:** live per owner, but it holds diet and workout plan templates, so it is not described anywhere while diet and workout plans are N.
- **QR modes:** `AttendanceSettings` has `single` (one scan marks present) and `dual` (first scan in, next out). Owner statement describes dual mode; copy explains both.
- **Biometric devices:** ADMS push protocol, ZKTeco-style and eSSL-style terminals. No model list is published. Fitvario blocks or unblocks the user on the device; it does not drive a door lock.
- **White-label, code-verified (2026-10-11):** the name and logo appear on the app's splash screen, the owner home screen and the member dashboard. The Android app label and launcher icon stay "Fitvario", there is no colour theming, and the store listing is Fitvario's. Staff screens were not found to show it.
- **Held pending usage data (owner, 2026-10-11):** diet plans, workout plans, template marketplace and batches stay out of public copy until `verify_features.py` shows real usage.
- **Class booking:** does not exist. Batches have a capacity that is checked when a member is assigned, but `batches_time_slots` is still `in-code`, so batches are mentioned only if that flag goes live.
