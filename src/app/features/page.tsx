import Link from "next/link";
import { buildMetadata, formatDate } from "@/lib/seo";
import { getPage, publishedPages } from "@/config/pages";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClosingCta } from "@/components/ClosingCta";

export const metadata = buildMetadata("/features");

/* ─── Icons ──────────────────────────────────────────────────────────────── */
function Icon({ path, className = "h-5 w-5" }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}
const icons = {
  building: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  users: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  qr: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z",
  chart: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  chat: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  bag: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
  bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  bolt: "M13 10V3L4 14h7v7l9-11h-7z",
  phone: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
  dumbbell: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6",
  creditcard: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  eye: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  map: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  lock: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
};

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
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

function RoleBadge({ label, color, dot }: { label: string; color: string; dot: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${color}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function RoleSection({
  id,
  badge,
  heading,
  sub,
  children,
  accent,
}: {
  id: string;
  badge: React.ReactNode;
  heading: string;
  sub: string;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-16 first:pt-0">
      <div className={`mb-8 border-l-4 pl-5 ${accent}`}>
        <div className="mb-2">{badge}</div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{heading}</h2>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-600">{sub}</p>
      </div>
      {children}
    </section>
  );
}

const securityPoints: [string, string][] = [
  ["Encrypted connections", "Every connection between your browser, the app and our servers is encrypted."],
  ["Staff see only what you allow", "You control exactly what each staff member can see and do."],
  ["Each gym's data is separate", "No other gym can access your members or records."],
  ["Daily automated backups", "Your data is backed up automatically every day."],
  ["Payments via Razorpay", "Fitvario subscription payments go through Razorpay, an RBI-authorised gateway. Card data never touches our servers."],
  ["Owner and staff actions are logged", "Actions by owners and staff are recorded with a timestamp, so you have an audit trail."],
];

export default function FeaturesPage() {
  const page = getPage("/features");
  const detail = publishedPages("feature");

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-10 sm:px-6">
      <Breadcrumbs path="/features" />

      <div className="mb-14 mt-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Platform overview</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Gym management software features for Indian gyms
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-slate-600">
          Fitvario gives gym owners a web dashboard, staff a focused panel, and members a gym-branded Android app.
          Each one is built for that person&apos;s job. Jump to a section below, or open a feature in detail.
        </p>
        <p className="mt-2 text-sm text-slate-500">Last updated: {formatDate(page.updated)}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <a href="#gym-owner"><RoleBadge label="Gym Owner" color="bg-teal-50 text-teal-800" dot="bg-teal-500" /></a>
          <a href="#staff"><RoleBadge label="Staff Portal" color="bg-indigo-50 text-indigo-800" dot="bg-indigo-500" /></a>
          <a href="#member-app"><RoleBadge label="Member App" color="bg-violet-50 text-violet-800" dot="bg-violet-500" /></a>
        </div>
      </div>

      {detail.length > 0 && (
        <section aria-labelledby="detail-heading" className="mb-6">
          <h2 id="detail-heading" className="text-xl font-semibold text-slate-900">Explore in detail</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {detail.map((p) => (
              <li key={p.path}>
                <Link href={p.path} className="block h-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300">
                  <span className="text-sm font-semibold text-teal-700">{p.navLabel ?? p.title.split("|")[0].trim()}</span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-slate-600">{p.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="divide-y divide-slate-100">
        <RoleSection
          id="gym-owner"
          badge={<RoleBadge label="Gym Owner" color="bg-teal-50 text-teal-800" dot="bg-teal-500" />}
          heading="Gym owner dashboard"
          sub="A web control panel to run memberships, revenue, staff, plans and leads."
          accent="border-teal-500"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard iconPath={icons.building} title="Gym profile" desc="Set up your gym name, logo, photo gallery, highlights and opening hours." />
            <FeatureCard iconPath={icons.users} title="Memberships and renewals" desc="Add members, assign plans, generate invoices and handle renewals in one flow." />
            <FeatureCard iconPath={icons.qr} title="QR attendance" desc="Show your gym's QR code at the entrance. Members and staff scan it with the app to check in and out. You can also mark attendance by hand and review logs and analytics." />
            <FeatureCard iconPath={icons.chart} title="Revenue and analytics" desc="Track daily collections, expenses and member growth, and see income and expenses side by side." />
            <FeatureCard iconPath={icons.chat} title="CRM and lead management" desc="Log walk-in enquiries, schedule follow-ups and open today's follow-up list." />
            <FeatureCard iconPath={icons.dumbbell} title="Workout and diet plans" desc="Build workout and diet plans day by day and assign them to individual members." />
            <FeatureCard iconPath={icons.star} title="Measurements and progress" desc="Record weight, BMI and body measurements over time. Members see their progress charts in the app." />
            <FeatureCard iconPath={icons.bell} title="Automated WhatsApp reminders" desc="Members get WhatsApp reminders before their membership ends and after it expires, without you sending anything." />
            <FeatureCard iconPath={icons.bag} title="Online store" desc="List supplements, gear or merchandise. Members add items to a cart and place orders, and you approve or reject each order." />
            <FeatureCard iconPath={icons.creditcard} title="Expense tracking" desc="Record expenses such as rent, utilities and salaries and compare them against revenue." />
            <FeatureCard iconPath={icons.map} title="Multi-branch and franchise" desc="Manage several gym locations under one account, with branch-level views and comparison across locations." />
            <FeatureCard iconPath={icons.users} title="Staff management" desc="Add staff with role-specific permissions, see staff attendance and review activity logs." />
            <FeatureCard iconPath={icons.bolt} title="Referrals and rewards" desc="Set referral rules and reward members with credits for bringing in new sign-ups, and track usage." />
          </div>
        </RoleSection>

        <RoleSection
          id="staff"
          badge={<RoleBadge label="Staff Portal" color="bg-indigo-50 text-indigo-800" dot="bg-indigo-500" />}
          heading="Staff portal"
          sub="A focused web panel for trainers and front-desk staff, with access controlled by the gym owner."
          accent="border-indigo-500"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FeatureCard iconPath={icons.lock} title="Permission-based login" desc="Staff log in with their own credentials and see only the modules you have given them." iconBg="bg-indigo-50" iconColor="text-indigo-700" />
            <FeatureCard iconPath={icons.users} title="Member management" desc="View and manage the member details you allow, for the members assigned to them." iconBg="bg-indigo-50" iconColor="text-indigo-700" />
            <FeatureCard iconPath={icons.qr} title="Attendance marking" desc="Mark attendance by hand when permitted, and scan the gym's QR code for their own check-in." iconBg="bg-indigo-50" iconColor="text-indigo-700" />
            <FeatureCard iconPath={icons.chat} title="Enquiry follow-ups" desc="Add follow-up notes to leads and set the next follow-up date in the CRM." iconBg="bg-indigo-50" iconColor="text-indigo-700" />
            <FeatureCard iconPath={icons.eye} title="Activity logs" desc="Staff actions are logged and visible to the gym owner." iconBg="bg-indigo-50" iconColor="text-indigo-700" />
          </div>
        </RoleSection>

        <RoleSection
          id="member-app"
          badge={<RoleBadge label="Member App · Android" color="bg-violet-50 text-violet-800" dot="bg-violet-500" />}
          heading="Member app (Android)"
          sub="A gym-branded Android app with everything a member needs to stay on track."
          accent="border-violet-500"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard iconPath={icons.phone} title="Gym-branded app" desc="Members use an Android app set up for your gym." iconBg="bg-violet-50" iconColor="text-violet-700" />
            <FeatureCard iconPath={icons.lock} title="Mobile number login" desc="Members log in with their mobile number and an OTP." iconBg="bg-violet-50" iconColor="text-violet-700" />
            <FeatureCard iconPath={icons.qr} title="QR check-in and check-out" desc="Members scan your gym's QR code with the app to check in, and scan again to check out. Time spent is recorded." iconBg="bg-violet-50" iconColor="text-violet-700" />
            <FeatureCard iconPath={icons.dumbbell} title="Workout and diet plans" desc="View assigned workout routines and diet plans, and mark progress as you go." iconBg="bg-violet-50" iconColor="text-violet-700" />
            <FeatureCard iconPath={icons.chart} title="Progress tracking" desc="See measurement history, BMI and body progress over time, and add progress photos." iconBg="bg-violet-50" iconColor="text-violet-700" />
            <FeatureCard iconPath={icons.bell} title="Reminders and alerts" desc="WhatsApp reminders before and after your membership expires, plus notifications from the gym." iconBg="bg-violet-50" iconColor="text-violet-700" />
            <FeatureCard iconPath={icons.star} title="Referral rewards" desc="Share a referral code. When a friend joins, you both earn rewards." iconBg="bg-violet-50" iconColor="text-violet-700" />
            <FeatureCard iconPath={icons.building} title="Gym info" desc="Browse gym photos, highlights, opening hours and contact details." iconBg="bg-violet-50" iconColor="text-violet-700" />
            <FeatureCard iconPath={icons.bag} title="Store" desc="Browse the gym's products, add items to a cart and place orders." iconBg="bg-violet-50" iconColor="text-violet-700" />
          </div>
        </RoleSection>

        <section className="py-16" aria-labelledby="channels-heading">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Payments and communication</p>
            <h2 id="channels-heading" className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Channels your members already use
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              ["Razorpay", "UPI, card and net banking for Fitvario subscriptions"],
              ["WhatsApp", "Membership reminders"],
              ["SMS", "OTP and alerts"],
              ["Android app", "For your members"],
            ].map(([label, sub]) => (
              <div key={label} className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
                <p className="text-sm font-semibold text-slate-800">{label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16" aria-labelledby="security-heading">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Security and reliability</p>
            <h2 id="security-heading" className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Your gym data is looked after</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {securityPoints.map(([title, desc]) => (
              <div key={title} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-slate-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <p className="mt-2 text-sm text-slate-600">
        Wondering what it costs? See{" "}
        <Link href="/pricing" className="font-semibold text-teal-700 underline-offset-2 hover:underline">how Fitvario pricing works</Link>
        , or read{" "}
        <Link href="/about" className="font-semibold text-teal-700 underline-offset-2 hover:underline">about Fitvario</Link>.
      </p>
      <ClosingCta location="features-closing" />
    </div>
  );
}
