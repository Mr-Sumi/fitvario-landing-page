import Link from "next/link";
import { buildMetadata, formatDate } from "@/lib/seo";
import { getPage, publishedPages } from "@/config/pages";
import { isLive } from "@/lib/features";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClosingCta } from "@/components/ClosingCta";

export const metadata = buildMetadata("/features");

const diet = isLive("workout_diet_plans");
const store = isLive("ecommerce_cart_orders");
const expiry = isLive("whatsapp_expiry_reminders");
const birthday = isLive("whatsapp_birthday_messages");
const gst = isLive("gst_tax_lines");
const biometric = isLive("biometric_adms");
const whiteLabel = isLive("white_label");
const campaigns = isLive("notification_campaigns_wallet");
const ownerReferral = isLive("owner_referral_program");
const webDashboard = isLive("owner_web_dashboard");

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
  title,
  desc,
}: {
  iconPath?: string;
  title: string;
  desc: string;
  iconBg?: string;
  iconColor?: string;
}) {
  return (
    <div className="grid gap-1 py-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-10">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="text-[15px] leading-relaxed text-[#2f393f]">{desc}</p>
    </div>
  );
}

function RoleBadge({ label }: { label: string; color?: string; dot?: string }) {
  return <span className="fv-link text-[15px] font-semibold">{label}</span>;
}

function RoleSection({
  id,
  heading,
  sub,
  children,
}: {
  id: string;
  badge?: React.ReactNode;
  heading: string;
  sub: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-14 first:pt-0">
      <div className="mb-6 max-w-2xl border-l-4 border-lime pl-5">
        <h2 className="text-[1.75rem] font-bold leading-tight text-ink sm:text-[2rem]">{heading}</h2>
        <p className="mt-2 text-[17px] leading-relaxed text-[#2f393f]">{sub}</p>
      </div>
      {children}
    </section>
  );
}

const securityPoints: [string, string][] = [
  ["Encrypted connections", "Every connection between the app and our servers is encrypted."],
  ["Staff see only what you allow", "You control exactly what each staff member can see and do."],
  ["Each gym's data is separate", "No other gym can access your members or records."],
  ["Daily automated backups", "Your data is backed up automatically every day."],
  ["Payments via Razorpay", "Fitvario subscription payments go through Razorpay, an RBI-authorised gateway. Card data never touches our servers."],
  ["Owner and staff actions are logged", "Actions by owners and staff are recorded with a timestamp, so you have an audit trail."],
];

export default function FeaturesPage() {
  const page = getPage("/features");
  const detail = publishedPages("feature");
  const segments = publishedPages("segment");

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pb-24 pt-8 sm:px-8">
      <Breadcrumbs path="/features" />

      <div className="mb-14 mt-8 max-w-3xl border-l-4 border-lime pl-5 sm:pl-7">
        <h1 className="text-[2.25rem] font-bold leading-[1.1] text-ink sm:text-5xl">
          Gym management software features for Indian gyms
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#2f393f]">
          Fitvario gives gym owners and staff an Android app to run the gym, and members the same Android app with their own login. Each one is built for that person&apos;s job. Jump to a section below, or open a feature in detail.
        </p>
        <p className="mt-4 text-sm text-mute">Last updated: {formatDate(page.updated)}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <a href="#gym-owner"><RoleBadge label="Gym Owner" color="bg-teal-50 text-teal-800" dot="bg-teal-500" /></a>
          <a href="#staff"><RoleBadge label="Staff" color="bg-indigo-50 text-indigo-800" dot="bg-indigo-500" /></a>
          <a href="#member-app"><RoleBadge label="Member App" color="bg-violet-50 text-violet-800" dot="bg-violet-500" /></a>
        </div>
      </div>

      {detail.length > 0 && (
        <section aria-labelledby="detail-heading" className="mb-6">
          <h2 id="detail-heading" className="text-2xl font-bold text-ink">Explore in detail</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {detail.map((p) => (
              <li key={p.path}>
                <Link href={p.path} className="group grid gap-1 py-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-10">
                  <span className="font-semibold text-ink underline decoration-[#4d7c0f] decoration-1 underline-offset-4 group-hover:decoration-2">{p.navLabel ?? p.title.split("|")[0].trim()}</span>
                  <span className="text-[15px] leading-relaxed text-mute">{p.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {segments.length > 0 && (
        <section aria-labelledby="segments-heading" className="mb-6 mt-10">
          <h2 id="segments-heading" className="text-2xl font-bold text-ink">By type of gym</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {segments.map((p) => (
              <li key={p.path}>
                <Link href={p.path} className="group grid gap-1 py-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-10">
                  <span className="font-semibold text-ink underline decoration-[#4d7c0f] decoration-1 underline-offset-4 group-hover:decoration-2">{p.navLabel ?? p.title.split("|")[0].trim()}</span>
                  <span className="text-[15px] leading-relaxed text-mute">{p.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div>
        <RoleSection
          id="gym-owner"
          badge={<RoleBadge label="Gym Owner" color="bg-teal-50 text-teal-800" dot="bg-teal-500" />}
          heading="For gym owners"
          sub="Run memberships, revenue, staff and leads from the Fitvario app on your phone."
          accent="border-teal-500"
        >
          <div className="divide-y divide-line border-y border-line">
            <FeatureCard iconPath={icons.building} title="Gym profile" desc="Set up your gym name, logo, photo gallery, highlights and opening hours." />
            <FeatureCard iconPath={icons.users} title="Memberships and renewals" desc="Add members, assign plans, generate invoices and handle renewals in one flow." />
            <FeatureCard iconPath={icons.qr} title="QR attendance" desc="Show your gym's QR code at the entrance. Members and staff scan it with the app to check in and out. You can also mark attendance by hand and review logs and analytics." />
            {webDashboard && <FeatureCard iconPath={icons.building} title="Owner web dashboard" desc="Owners can also sign in on a computer at dash.fitvario.com." />}
            {biometric && <FeatureCard iconPath={icons.lock} title="Biometric attendance" desc="Connect a fingerprint or face device that pushes punches over ADMS. Members are mapped to device users and blocked on the device when their plan ends." />}
            {gst && <FeatureCard iconPath={icons.creditcard} title="Tax lines, part payments and dues" desc="Choose which of your tax lines (for example GST) apply to an invoice, take part payments and see who still owes." />}
            <FeatureCard iconPath={icons.chart} title="Revenue and analytics" desc="Track daily collections, expenses and member growth, and see income and expenses side by side." />
            <FeatureCard iconPath={icons.chat} title="CRM and lead management" desc="Log walk-in enquiries, schedule follow-ups and open today's follow-up list." />
            {diet && <FeatureCard iconPath={icons.dumbbell} title="Workout and diet plans" desc="Build workout and diet plans day by day and assign them to individual members." />}
            <FeatureCard iconPath={icons.star} title="Measurements and progress" desc="Record weight, BMI and body measurements over time. Members see their progress charts in the app." />
            <FeatureCard iconPath={icons.bell} title={expiry ? "Automated WhatsApp reminders" : "WhatsApp, SMS and push alerts"} desc={expiry ? `Members get WhatsApp reminders before their membership ends and after it expires${birthday ? ", and a birthday wish on the day" : ""}, without you sending anything.` : "Send alerts to members by WhatsApp, SMS and push notification."} />
            {store && <FeatureCard iconPath={icons.bag} title="Online store" desc="List supplements, gear or merchandise. Members add items to a cart and place orders, and you approve or reject each order." />}
            <FeatureCard iconPath={icons.creditcard} title="Expense tracking" desc="Record expenses such as rent, utilities and salaries and compare them against revenue." />
            <FeatureCard iconPath={icons.map} title="Multi-branch and franchise" desc="Manage several gym locations under one account, with branch-level views and comparison across locations." />
            <FeatureCard iconPath={icons.users} title="Staff management" desc="Add staff with role-specific permissions, see staff attendance and review activity logs." />
            <FeatureCard iconPath={icons.bolt} title="Referrals and rewards" desc="Set referral rules and reward members with credits for bringing in new sign-ups, and track usage." />
            {ownerReferral && <FeatureCard iconPath={icons.bolt} title="Refer another gym owner" desc="Owners can refer other gym owners to Fitvario and earn coins when the referral is rewarded." />}
            {campaigns && <FeatureCard iconPath={icons.chat} title="Message campaigns" desc="Send a message to a chosen group of members from a template, preview the audience first and pay for it from your messaging credit wallet." />}
            {whiteLabel && <FeatureCard iconPath={icons.phone} title="Your gym's name and logo in the app" desc="Set an app name and logo that show on the splash screen and on the owner and member home screens of the Fitvario app." />}
          </div>
        </RoleSection>

        <RoleSection
          id="staff"
          badge={<RoleBadge label="Staff" color="bg-indigo-50 text-indigo-800" dot="bg-indigo-500" />}
          heading="For staff"
          sub="Focused tools in the app for trainers and front-desk staff, with access controlled by the gym owner."
          accent="border-indigo-500"
        >
          <div className="divide-y divide-line border-y border-line">
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
          sub="The same Android app, with everything a member needs to stay on track."
          accent="border-violet-500"
        >
          <div className="divide-y divide-line border-y border-line">
            <FeatureCard iconPath={icons.phone} title={whiteLabel ? "Your gym's name and logo" : "Android app for members"} desc={whiteLabel ? "Members use the Fitvario Android app and see your gym's name and logo on the opening screen and their home screen. It is one app for owners, staff and members, with a login for each role." : "Members use an Android app set up for your gym."} iconBg="bg-violet-50" iconColor="text-violet-700" />
            <FeatureCard iconPath={icons.lock} title="Mobile number login" desc="Members log in with their mobile number and an OTP." iconBg="bg-violet-50" iconColor="text-violet-700" />
            <FeatureCard iconPath={icons.qr} title="QR check-in and check-out" desc="Members scan your gym's QR code with the app to check in, and scan again to check out. Time spent is recorded." iconBg="bg-violet-50" iconColor="text-violet-700" />
            {diet && <FeatureCard iconPath={icons.dumbbell} title="Workout and diet plans" desc="View assigned workout routines and diet plans, and mark progress as you go." iconBg="bg-violet-50" iconColor="text-violet-700" />}
            <FeatureCard iconPath={icons.chart} title="Progress tracking" desc="See measurement history, BMI and body progress over time, and add progress photos." iconBg="bg-violet-50" iconColor="text-violet-700" />
            <FeatureCard iconPath={icons.bell} title="Reminders and alerts" desc={expiry ? "WhatsApp reminders before and after your membership expires, plus notifications from the gym." : "Alerts and notifications from the gym by WhatsApp, SMS and push."} iconBg="bg-violet-50" iconColor="text-violet-700" />
            <FeatureCard iconPath={icons.star} title="Referral rewards" desc="Share a referral code. When a friend joins, you both earn rewards." iconBg="bg-violet-50" iconColor="text-violet-700" />
            <FeatureCard iconPath={icons.building} title="Gym info" desc="Browse gym photos, highlights, opening hours and contact details." iconBg="bg-violet-50" iconColor="text-violet-700" />
            {store && <FeatureCard iconPath={icons.bag} title="Store" desc="Browse the gym's products, add items to a cart and place orders." iconBg="bg-violet-50" iconColor="text-violet-700" />}
          </div>
        </RoleSection>

        <section className="py-16" aria-labelledby="channels-heading">
          <div className="mb-6">
            <h2 id="channels-heading" className="text-[1.75rem] font-bold text-ink">
              Channels your members already use
            </h2>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {[
              ["Razorpay", "UPI, card and net banking for Fitvario subscriptions"],
              ["WhatsApp", expiry ? "Membership reminders" : "Alerts from your gym"],
              ["SMS", "OTP and alerts"],
              ["Android app", "For your members"],
            ].map(([label, sub]) => (
              <div key={label} className="grid gap-1 py-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-10">
                <dt className="font-semibold text-ink">{label}</dt>
                <dd className="text-[15px] text-mute">{sub}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="py-16" aria-labelledby="security-heading">
          <div className="mb-6">
            <h2 id="security-heading" className="text-[1.75rem] font-bold text-ink">Your gym data is looked after</h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {securityPoints.map(([title, desc]) => (
              <div key={title} className="grid gap-1 py-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-10">
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="text-[15px] leading-relaxed text-[#2f393f]">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <p className="mt-10 text-[15px] text-[#2f393f]">
        Wondering what it costs? See{" "}
        <Link href="/pricing" className="fv-link font-medium">how Fitvario pricing works</Link>
        , or read{" "}
        <Link href="/about" className="fv-link font-medium">about Fitvario</Link>.
      </p>
      <ClosingCta location="features-closing" />
    </div>
  );
}
