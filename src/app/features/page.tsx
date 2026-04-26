import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Fitvario features for gym owners, staff, and members — QR attendance, CRM, workout plans, analytics, ecommerce, WhatsApp messaging, and a branded Android member app.",
  alternates: { canonical: "https://fitvario.com/features" },
};

/* ─── Icons ──────────────────────────────────────────────────────────────── */
function Icon({ path, className = "h-5 w-5" }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}
const icons = {
  building:   "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  users:      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  qr:         "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z",
  chart:      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  chat:       "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  calendar:   "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  bag:        "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
  shield:     "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  bell:       "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  bolt:       "M13 10V3L4 14h7v7l9-11h-7z",
  phone:      "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
  dumbbell:   "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6",
  creditcard: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  star:       "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  eye:        "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  cog:        "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  map:        "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  lock:       "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  refresh:    "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
};

/* ─── Feature card ───────────────────────────────────────────────────────── */
function FeatureCard({
  iconPath,
  title,
  desc,
  iconBg = "bg-teal-50",
  iconColor = "text-teal-700",
}: {
  iconPath: string;
  title: string;
  desc: string;
  iconBg?: string;
  iconColor?: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg} ring-1 ring-black/5`}>
        <Icon path={iconPath} className={`h-5 w-5 ${iconColor}`} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{desc}</p>
      </div>
    </div>
  );
}

/* ─── Role badge ─────────────────────────────────────────────────────────── */
function RoleBadge({ label, color, dot }: { label: string; color: string; dot: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${color}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

/* ─── Section wrapper ────────────────────────────────────────────────────── */
function RoleSection({
  id,
  badge,
  heading,
  sub,
  children,
  accent = "border-teal-500",
}: {
  id?: string;
  badge: React.ReactNode;
  heading: string;
  sub: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-16 first:pt-0">
      <div className={`mb-8 border-l-4 pl-5 ${accent}`}>
        <div className="mb-2">{badge}</div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{heading}</h2>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-500">{sub}</p>
      </div>
      {children}
    </section>
  );
}

/* ─── Integration chip ───────────────────────────────────────────────────── */
function IntegrationChip({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      <p className="mt-0.5 text-xs text-slate-400">{sub}</p>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function FeaturesPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-14 sm:px-6">

      {/* Hero */}
      <div className="mb-14 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Platform overview</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Everything your gym needs, in one place
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-slate-600">
          Fitvario gives gym owners a full web control panel, staff a focused management portal, and members a
          branded Android app — each experience built for that specific role. Jump to a section below.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <a href="#gym-owner"><RoleBadge label="Gym Owner / Admin" color="bg-teal-50 text-teal-800" dot="bg-teal-500" /></a>
          <a href="#staff"><RoleBadge label="Staff Portal" color="bg-indigo-50 text-indigo-800" dot="bg-indigo-500" /></a>
          <a href="#member-app"><RoleBadge label="Member App" color="bg-violet-50 text-violet-800" dot="bg-violet-500" /></a>
        </div>
      </div>

      <div className="divide-y divide-slate-100">

        {/* ── GYM OWNER ─────────────────────────────────────────────────── */}
        <RoleSection
          id="gym-owner"
          badge={<RoleBadge label="Gym Owner / Admin" color="bg-teal-50 text-teal-800" dot="bg-teal-500" />}
          heading="Gym Owner & Admin Dashboard"
          sub="A complete web control panel to run every aspect of your gym—memberships, revenue, staff, fitness content, leads, and more."
          accent="border-teal-500"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              iconPath={icons.building}
              title="Gym Profile & Branding"
              desc="Set up your gym name, logo, gallery, facilities, operating hours, and member-facing branding."
            />
            <FeatureCard
              iconPath={icons.users}
              title="Membership & Lifecycle"
              desc="Add members, assign plans, generate invoices, and handle renewals, freezes, and cancellations in one flow."
            />
            <FeatureCard
              iconPath={icons.qr}
              title="QR Attendance"
              desc="Generate unique member QR codes, validate check-ins in real time, set location-aware rules, and view attendance logs."
            />
            <FeatureCard
              iconPath={icons.chart}
              title="Revenue & Analytics"
              desc="Track daily collections, compare weekly/monthly/quarterly/yearly revenue, view expense vs. income charts, and export reports."
            />
            <FeatureCard
              iconPath={icons.chat}
              title="CRM & Lead Management"
              desc="Log walk-in enquiries, schedule follow-up reminders, send automated welcome/fee messages, and track lost vs. converted leads."
            />
            <FeatureCard
              iconPath={icons.dumbbell}
              title="Workout & Diet Plans"
              desc="Create plan templates with exercises, sets, reps, photos, and videos. Assign personalized plans to individual members."
            />
            <FeatureCard
              iconPath={icons.calendar}
              title="Class Scheduling"
              desc="Add class slots, set capacity, manage enrolments, and let members book via the app."
            />
            <FeatureCard
              iconPath={icons.star}
              title="Body Measurements & Progress"
              desc="Record weight, BMI, and body measurements over time. Members can view their progress charts in the app."
            />
            <FeatureCard
              iconPath={icons.bell}
              title="WhatsApp, SMS & Push Alerts"
              desc="Send fee reminders, renewal nudges, and broadcast messages via WhatsApp Business, SMS, or push notifications—scheduled or instant, from one place."
            />
            <FeatureCard
              iconPath={icons.bag}
              title="Ecommerce Listings"
              desc="List supplements, gear, or merchandise. Members can express interest from the app and purchases are tracked."
            />
            <FeatureCard
              iconPath={icons.creditcard}
              title="Expense Tracking"
              desc="Record staff salaries, rent, utilities, and other costs. Compare against revenue to monitor profitability."
            />
            <FeatureCard
              iconPath={icons.map}
              title="Multi-branch & Franchise"
              desc="Manage multiple gym locations under one account with branch-level dashboards and cross-location performance comparisons."
            />
            <FeatureCard
              iconPath={icons.users}
              title="Staff Management"
              desc="Add staff with role-specific permissions, track their attendance, manage salary dates, and view activity logs."
            />
            <FeatureCard
              iconPath={icons.bolt}
              title="Referral & Credit System"
              desc="Set referral rules, assign discount credits to members for bringing in new sign-ups, and track usage."
            />
            <FeatureCard
              iconPath={icons.cog}
              title="FAQ & Content Management"
              desc="Add gym FAQs with text and video answers that members can browse in their app."
            />
          </div>
        </RoleSection>

        {/* ── STAFF ─────────────────────────────────────────────────────── */}
        <RoleSection
          id="staff"
          badge={<RoleBadge label="Staff Portal" color="bg-indigo-50 text-indigo-800" dot="bg-indigo-500" />}
          heading="Staff Portal"
          sub="A focused web panel for trainers and front-desk staff—only the tools they need, with access controlled by the gym owner."
          accent="border-indigo-500"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FeatureCard
              iconPath={icons.lock}
              title="Permission-based Login"
              desc="Staff log in with their own credentials and only see the modules the owner has granted them access to."
              iconBg="bg-indigo-50"
              iconColor="text-indigo-700"
            />
            <FeatureCard
              iconPath={icons.users}
              title="Member Management"
              desc="View and manage assigned member lists, update profile details, and add measurement entries."
              iconBg="bg-indigo-50"
              iconColor="text-indigo-700"
            />
            <FeatureCard
              iconPath={icons.qr}
              title="Attendance Marking"
              desc="Mark manual attendance for members when permitted. View daily check-in logs."
              iconBg="bg-indigo-50"
              iconColor="text-indigo-700"
            />
            <FeatureCard
              iconPath={icons.chat}
              title="Enquiry Follow-ups"
              desc="Add notes to leads, log follow-up calls or visits, and update lead status within the CRM."
              iconBg="bg-indigo-50"
              iconColor="text-indigo-700"
            />
            <FeatureCard
              iconPath={icons.eye}
              title="Activity Logs"
              desc="All staff actions are logged and visible to the gym owner for accountability."
              iconBg="bg-indigo-50"
              iconColor="text-indigo-700"
            />
          </div>
        </RoleSection>

        {/* ── MEMBER APP ────────────────────────────────────────────────── */}
        <RoleSection
          id="member-app"
          badge={<RoleBadge label="Member App · Android" color="bg-violet-50 text-violet-800" dot="bg-violet-500" />}
          heading="Member App (Android)"
          sub="A branded Android app your members install from Google Play. OTP login, your gym's look, and everything they need to stay engaged."
          accent="border-violet-500"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              iconPath={icons.phone}
              title="Gym-branded Experience"
              desc="Members see your gym name, logo, and brand colors—not generic Fitvario branding. Feels like your own app."
              iconBg="bg-violet-50"
              iconColor="text-violet-700"
            />
            <FeatureCard
              iconPath={icons.lock}
              title="OTP Login"
              desc="Passwordless sign-in via mobile OTP—fast, secure, and hassle-free for members."
              iconBg="bg-violet-50"
              iconColor="text-violet-700"
            />
            <FeatureCard
              iconPath={icons.qr}
              title="QR Check-in"
              desc="Members open the app, tap their QR code, and scan at the gym entrance. Attendance logs instantly."
              iconBg="bg-violet-50"
              iconColor="text-violet-700"
            />
            <FeatureCard
              iconPath={icons.dumbbell}
              title="Workout & Diet Plans"
              desc="View assigned workout routines and diet charts with photos and videos. Daily reminders keep members on track."
              iconBg="bg-violet-50"
              iconColor="text-violet-700"
            />
            <FeatureCard
              iconPath={icons.chart}
              title="Progress Tracking"
              desc="See measurement history, BMI trends, and body progress charts over time—right in the app."
              iconBg="bg-violet-50"
              iconColor="text-violet-700"
            />
            <FeatureCard
              iconPath={icons.bell}
              title="Push, SMS & WhatsApp Alerts"
              desc="Get renewal reminders, fee dues, class updates, and gym announcements via push, SMS, or WhatsApp."
              iconBg="bg-violet-50"
              iconColor="text-violet-700"
            />
            <FeatureCard
              iconPath={icons.star}
              title="Referral Rewards"
              desc="Members share a unique referral code. When a friend joins, they both earn credits or discounts."
              iconBg="bg-violet-50"
              iconColor="text-violet-700"
            />
            <FeatureCard
              iconPath={icons.building}
              title="Gym Gallery & Info"
              desc="Browse gym photos, facilities list, class schedule, FAQs, and contact details—all in the app."
              iconBg="bg-violet-50"
              iconColor="text-violet-700"
            />
            <FeatureCard
              iconPath={icons.bag}
              title="Product Browsing"
              desc="View available gym merchandise or supplements and express interest—the gym gets notified."
              iconBg="bg-violet-50"
              iconColor="text-violet-700"
            />
          </div>
        </RoleSection>

        {/* ── PAYMENTS & CHANNELS ───────────────────────────────────────── */}
        <section className="py-16">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Payments & communication</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Built-in channels your members already use</h2>
            <p className="mt-2 text-[15px] text-slate-500">No third-party plugins to configure. These channels are native to the platform.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <IntegrationChip label="Razorpay" sub="UPI, card & net banking payments" />
            <IntegrationChip label="WhatsApp Business" sub="Fee alerts & member messages" />
            <IntegrationChip label="SMS" sub="OTP & renewal reminders" />
            <IntegrationChip label="Google Play" sub="Member app on Android" />
          </div>
        </section>

        {/* ── SECURITY ──────────────────────────────────────────────────── */}
        <section className="py-16">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Security & reliability</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Your gym data is safe with us</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Encrypted connections", "Every connection between your browser, the app, and our servers is encrypted. No exceptions."],
              ["Staff see only what you allow", "You control exactly what each staff member can see and do. Nothing more, nothing less."],
              ["Member data is isolated", "Each gym's data is completely separate. No other gym can ever access your members or records."],
              ["Media files are private", "Workout videos, gym gallery images, and member documents are only accessible to authorised users."],
              ["Daily automated backups", "Your data is backed up automatically every day. Even if something goes wrong, nothing is lost."],
              ["Payments via Razorpay", "All payments go through Razorpay — an RBI-authorised, PCI-DSS-compliant gateway. Card data never touches our servers."],
              ["All actions are logged", "Every action by owners, staff, and members is recorded with a timestamp — a full audit trail at all times."],
              ["Uptime & performance", "The platform is built to handle high-traffic check-in hours without slowdowns or dropped attendance."],
            ].map(([title, desc]) => (
              <div key={title} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{title}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-slate-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>


      </div>

      {/* CTA */}
      <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Link
          href="/contact#demo"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-teal-600 px-6 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          Request a demo
        </Link>
        <Link href="/" className="text-sm font-semibold text-teal-700 underline-offset-2 hover:underline">
          ← Back to home
        </Link>
      </div>

    </div>
  );
}
