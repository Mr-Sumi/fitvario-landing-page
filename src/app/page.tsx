import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { pages, isIndexable, publishedPages } from "@/config/pages";
import { contact, whatsappLink } from "@/config/site";
import { pricingTiers } from "@/config/pricing";
import { isLive } from "@/lib/features";
import { SoftwareApplicationJsonLd } from "@/components/JsonLd";
import { Proof } from "@/components/Proof";
import { ClosingCta } from "@/components/ClosingCta";

export const metadata = buildMetadata("/");

/* ─── Data ───────────────────────────────────────────────────────────────── */
// Claims only appear while the matching flag is live in docs/seo/feature-status.json
const diet = isLive("workout_diet_plans");
const store = isLive("ecommerce_cart_orders");
const expiry = isLive("whatsapp_expiry_reminders");
const branded = isLive("white_label");
// One app on Google Play serves owners, staff and members; white-label only changes the name and logo shown inside it
const memberApp = branded ? "the Fitvario Android app, which can show your gym’s name and logo on its splash and home screens" : "an Android app";

const problems = [
  {
    bad: "Fee reminders lost in WhatsApp groups",
    good: expiry
      ? "Automated WhatsApp reminders go out before every membership ends, so you stop chasing renewals by hand"
      : "WhatsApp, SMS and push alerts reach members straight from the gym, not from a message lost in a group",
  },
  {
    bad: "Paper registers and manual attendance",
    good: "Members scan your gym's QR code with the app. Check-in, check-out and time spent are logged for you",
  },
  {
    bad: "Leads walk in and nobody follows up",
    good: "The CRM keeps every enquiry with a follow-up date and a list of today's calls",
  },
  {
    bad: "No visibility into what you collected today",
    good: "One app for collections, expenses and member growth",
  },
  {
    bad: "Members forget their plan and stop coming",
    good: `An Android app with their plan, attendance and progress${diet ? ", workouts and diet" : ""}, plus notifications from the gym`,
  },
  {
    bad: "Running multiple branches in separate spreadsheets",
    good: "All branches in one account, with revenue and attendance side by side",
  },
];

const platformViews = [
  {
    role: "Gym Owner",
    headline: "Full control of your gym",
    sub: "Everything you need to run daily operations, from your phone.",
    points: [
      "Memberships, renewals and digital invoices",
      "QR attendance with full check-in history",
      "Revenue, expense and collection reports",
      "CRM with follow-up dates for every lead",
      "Staff access controls and activity logs",
      store ? "Online store with orders, and referral rewards" : "Referral rewards for members",
    ],
  },
  {
    role: "Staff",
    headline: "Focused tools for your team",
    sub: "Staff log in to the app and see only what you have allowed.",
    points: [
      "View and manage the members you assign them",
      "Mark attendance when permitted",
      "Follow up on enquiries with notes",
      "Every action recorded in the activity log",
    ],
  },
  {
    role: "Member App",
    headline: "Your gym in every member's pocket",
    sub: branded ? "The Fitvario Android app, which can show your gym’s name and logo on its splash and home screens." : "An Android app for your members.",
    points: [
      "Log in with a mobile number and OTP",
      "Scan the gym's QR code to check in and out",
      ...(diet ? ["Assigned workout and diet plans"] : []),
      "Progress charts and measurement history",
      expiry ? "Renewal reminders on WhatsApp" : "Alerts from the gym on WhatsApp, SMS and push",
      "Referral codes to earn rewards",
    ],
  },
];

const features: { d: string; title: string; desc: string; href?: string }[] = [
  {
    d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    title: "Memberships and renewals",
    desc: "Add members, assign plans, generate invoices and manage renewals, with automatic reminders so you don't chase anyone by hand.",
  },
  {
    d: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z",
    title: "QR attendance",
    desc: "A QR code on your entrance wall. Members scan it with the app to check in and scan again on the way out. You see who came and for how long.",
  },
  {
    d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    title: "Gym CRM and follow-ups",
    desc: "Log every walk-in enquiry, set the next follow-up date and open today's list of people to call.",
    href: "/features/gym-crm",
  },
  {
    d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    title: expiry ? "Automated WhatsApp reminders" : "WhatsApp, SMS and push alerts",
    desc: expiry
      ? "Members get WhatsApp reminders 7, 3 and 1 days before their membership ends, and a message the day after it expires. You don't send them."
      : "Send alerts to your members by WhatsApp, SMS and push notification, instead of relying on a group chat.",
    href: "/features/whatsapp-reminders",
  },
  {
    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Revenue and expense tracking",
    desc: "Track daily collections, log expenses and see your revenue trend, all in one app instead of Excel.",
  },
  {
    d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
    title: "Multi-branch management",
    desc: "Run all your branches from one account, each with its own staff and members, and compare revenue and attendance.",
  },
];

const steps = [
  {
    n: "1",
    title: "Tell us about your gym",
    desc: "Share your gym name, city, number of members and branches through the demo form.",
  },
  {
    n: "2",
    title: "We set it up with you",
    desc: "We help set up your plans, staff roles and QR code, bring in your existing member list, and walk your team through the app.",
  },
  {
    n: "3",
    title: "Go live",
    desc: "Members start using the app. QR attendance, renewals, CRM and revenue tracking run from day one.",
  },
];

const faqs = [
  {
    q: "Who is Fitvario for?",
    a: "Fitvario is a gym management system in India built for gym owners, fitness studio operators and franchise groups who want to replace spreadsheets, paper registers and WhatsApp groups.",
  },
  {
    q: "Does my gym get its own member app?",
    a: `Yes. Members use the Fitvario Android app${branded ? ", which can show your gym’s name and logo on its splash and home screens," : ""} for their plan${diet ? ", workout and diet plans" : ""}, QR attendance, progress charts and alerts.`,
  },
  {
    q: "How does QR attendance work?",
    a: "You put your gym's QR code at the entrance. A member scans it with the app to check in and scans again to check out, and Fitvario records the time spent. Staff can scan the same code, and you or your staff can also mark attendance by hand.",
  },
  expiry
    ? {
        q: "How are membership reminders sent?",
        a: "Fitvario sends automated WhatsApp reminders to members 7, 3 and 1 days before their membership ends, and one the day after it expires. Each message uses a credit from your gym's messaging wallet.",
      }
    : {
        q: "How do members get alerts?",
        a: "Fitvario can send alerts to members by WhatsApp, SMS and push notification. Ask us in a demo which alerts are active for your gym.",
      },
  {
    q: "Can I manage multiple branches?",
    a: "Yes. Run several branches from one account, each with its own staff and members, and compare revenue and attendance across them. The number of branches depends on your plan.",
  },
  {
    q: "How are payments handled?",
    a: "Fitvario's own subscription payments go through Razorpay, an RBI-authorised payment gateway, by UPI, card or net banking. Card details never touch our servers. Inside the app you record your members' fee payments and issue invoices.",
  },
  {
    q: "Is my data safe?",
    a: "All connections are encrypted and each gym's data is kept separate from every other gym's. Staff see only what you permit, and every action is logged. Automated backups run daily.",
  },
  {
    q: "How do I get started?",
    a: "Book a demo with the form, or email support@fitvario.com with your gym name and approximate member count. We will walk you through the platform and help you set up.",
  },
];

/* ─── Small helpers ──────────────────────────────────────────────────────── */
function Check({ className = "text-teal-600" }: { className?: string }) {
  return (
    <svg className={`mt-0.5 h-4 w-4 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-widest text-teal-700">{children}</p>;
}

const roleStyles = [
  { badge: "bg-teal-100 text-teal-800", card: "border-teal-100 from-teal-50/60", check: "text-teal-500" },
  { badge: "bg-indigo-100 text-indigo-800", card: "border-indigo-100 from-indigo-50/60", check: "text-indigo-500" },
  { badge: "bg-violet-100 text-violet-800", card: "border-violet-100 from-violet-50/60", check: "text-violet-500" },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function Home() {
  const wa = whatsappLink("Hi Fitvario, I'd like a demo for my gym.");
  const segments = publishedPages("segment");
  const tools = publishedPages("tool");
  const isPublished = (path: string) => pages.some((p) => p.path === path && isIndexable(p));

  return (
    <>
      <SoftwareApplicationJsonLd />

      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40"
          aria-hidden
        />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-teal-400/20 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
          <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-teal-700">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            Fitvario gym management, built for gyms across India
          </span>

          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
            Stop running your gym on WhatsApp groups and spreadsheets
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-600 sm:text-xl">
            {`Fitvario is gym management software for India: digital memberships, QR attendance, member alerts, a CRM for leads${diet ? ", workout and diet plans" : ""} and ${memberApp} for your members.`}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact#demo"
              data-cta="hero"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-teal-700 px-8 text-sm font-bold text-white shadow-md transition hover:bg-teal-800 active:scale-95 sm:w-auto"
            >
              Book a free demo
            </Link>
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="hero"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-emerald-600 bg-white px-8 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50 active:scale-95 sm:w-auto"
              >
                Chat on WhatsApp
              </a>
            ) : (
              <a
                href="#problems"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 active:scale-95 sm:w-auto"
              >
                See what we solve
              </a>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
            {["Payments via Razorpay", expiry ? "Automated WhatsApp reminders" : "WhatsApp, SMS and push alerts", "Android app for your members", "Registered in Bhopal, India"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Check className="text-teal-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
        {isPublished("/hi") && (
          <p className="relative -mt-8 pb-12 text-center text-sm text-slate-600">
            Hindi aur Hinglish mein padhna hai?{" "}
            <Link href="/hi" lang="hi-Latn" className="font-semibold text-teal-700 underline-offset-2 hover:underline">
              Hinglish mein dekhein
            </Link>
          </p>
        )}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-slate-50" aria-hidden />
      </section>

      {/* PROBLEMS WE SOLVE */}
      <section id="problems" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <SectionLabel>Why gym owners choose Fitvario</SectionLabel>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Every gym has these problems.
              <br className="hidden sm:block" /> Here is how we fix them.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p) => (
              <div key={p.bad} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-50">
                    <svg className="h-3 w-3 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <p className="text-sm font-medium leading-snug text-slate-600">{p.bad}</p>
                </div>
                <div className="mx-5 border-t border-dashed border-slate-100" />
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50">
                    <Check className="mt-0 text-teal-600" />
                  </span>
                  <p className="text-sm font-semibold leading-snug text-slate-800">{p.good}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM VIEWS */}
      <section id="platform" className="border-y border-slate-200 bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <SectionLabel>Platform</SectionLabel>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              One platform. Three experiences.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Owners and staff run the gym from the Fitvario Android app, with staff access set by the owner. Members use the same app with their own login, and it can show your gym’s name and logo on its splash and home screens. All three stay in sync.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {platformViews.map((v, i) => (
              <div key={v.role} className={`flex flex-col rounded-2xl border bg-gradient-to-b to-white p-6 shadow-sm ${roleStyles[i].card}`}>
                <span className={`mb-4 self-start rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${roleStyles[i].badge}`}>
                  {v.role}
                </span>
                <h3 className="text-base font-bold text-slate-900">{v.headline}</h3>
                <p className="mt-1.5 text-sm text-slate-600">{v.sub}</p>
                <ul className="mt-5 space-y-2.5">
                  {v.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className={roleStyles[i].check} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <SectionLabel>Features</SectionLabel>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Gym management software India owners can run from a phone
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              From the first member you add to your daily operations, the tools your team actually needs in one place.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li key={f.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-200 hover:shadow-md">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.d} />
                  </svg>
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{f.desc}</p>
                  {f.href && isPublished(f.href) && (
                    <Link href={f.href} className="mt-2 inline-block py-1 text-[13px] font-semibold text-teal-700 underline-offset-2 hover:underline">
                      How it works
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <Link
              href="/features"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              See every feature
            </Link>
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR (shows once segment pages are published) */}
      {segments.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-xl text-center">
              <SectionLabel>Who it is for</SectionLabel>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Built for the way you run your gym</h2>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {segments.map((s) => (
                <li key={s.path}>
                  <Link href={s.path} className="block h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-300">
                    <span className="text-sm font-bold text-teal-700">{s.navLabel ?? s.title.split("|")[0].trim()}</span>
                    <span className="mt-2 block text-[13px] leading-relaxed text-slate-600">{s.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FREE TOOLS (shows once tool pages are published) */}
      {tools.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-xl text-center">
              <SectionLabel>Free tools</SectionLabel>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Calculators for gym owners
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Work out your break-even, pricing, churn and revenue in your browser. No sign-up.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {tools.map((t) => (
                <li key={t.path}>
                  <Link href={t.path} className="block h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-300">
                    <span className="text-sm font-bold text-teal-700">{t.navLabel ?? t.title.split("|")[0].trim()}</span>
                    <span className="mt-2 block text-[13px] leading-relaxed text-slate-600">{t.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="border-t border-slate-200 bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <SectionLabel>Getting started</SectionLabel>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">Three steps to go live</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              We help you set everything up. You don&apos;t need an IT team.
            </p>
          </div>
          <ol className="relative grid gap-6 sm:grid-cols-3">
            <div className="absolute left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] top-8 hidden border-t-2 border-dashed border-slate-200 sm:block" aria-hidden />
            {steps.map((s) => (
              <li key={s.n} className="relative flex flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:items-center sm:text-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-700 text-base font-extrabold text-white shadow-md">{s.n}</div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Proof />

      {/* PRICING TEASER */}
      <section className="border-t border-slate-200 bg-slate-50 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {pricingTiers.length > 0 ? "Plans priced in rupees" : "Priced for your gym's size"}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {pricingTiers.length > 0
              ? "See the plans and what each one includes."
              : "Your price depends on your branches, active members and how much you message. See what is included in every plan and ask for a quote."}
          </p>
          <Link
            href="/pricing"
            data-cta="home-pricing"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            See pricing
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-slate-200 bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Questions gym owners ask us</h2>
          </div>
          <dl className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <dt className="text-sm font-bold text-slate-900">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">{faq.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-center text-sm text-slate-500">
            Still have questions?{" "}
            <Link href="/contact" className="font-semibold text-teal-700 underline-offset-2 hover:underline">
              Talk to our team
            </Link>
            . We reply {contact.responseTime}.
          </p>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-slate-50 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <ClosingCta
            heading="Ready to run your gym the right way?"
            body="Book a demo and we will show you memberships, QR attendance, the CRM and the member app. No commitment."
            location="home-closing"
          />
          <p className="mt-6 text-center text-xs text-slate-500">
            By contacting us you agree to our{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-slate-700">Privacy Policy</Link> and{" "}
            <Link href="/terms" className="underline underline-offset-2 hover:text-slate-700">Terms of Service</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
