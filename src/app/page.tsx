import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata("/");

/* ─── Data ───────────────────────────────────────────────────────────────── */
const problems = [
  {
    bad: "Fee reminders lost in WhatsApp groups",
    good: "Automated alerts via WhatsApp & SMS — every member reminded on time",
  },
  {
    bad: "Paper registers and manual attendance",
    good: "QR check-in in seconds — no registers, no errors, full history",
  },
  {
    bad: "Leads walk in and nobody follows up",
    good: "CRM captures every enquiry with auto follow-up reminders",
  },
  {
    bad: "No visibility into what you collected today",
    good: "Live revenue dashboard — collections, dues, expenses in one place",
  },
  {
    bad: "Members forget their plan and stop coming",
    good: "Branded member app with plans, progress charts, and daily alerts",
  },
  {
    bad: "Running multiple branches in separate spreadsheets",
    good: "All branches in one account — compare revenue and attendance instantly",
  },
];

const platformViews = [
  {
    role: "Gym Owner",
    color: "teal",
    headline: "Full control of your gym",
    sub: "Everything you need to run daily operations — from a browser, anywhere.",
    points: [
      "Memberships, renewals & digital invoices",
      "QR attendance with full check-in history",
      "Revenue, expenses & collection reports",
      "CRM with automated lead follow-ups",
      "Staff access controls & HR basics",
      "Ecommerce listings & referral system",
    ],
  },
  {
    role: "Staff Portal",
    color: "indigo",
    headline: "Focused tools for your team",
    sub: "Staff log in and see only what you've allowed — nothing more.",
    points: [
      "View & manage their assigned members",
      "Mark attendance when permitted",
      "Add body measurement updates",
      "Follow up on enquiries with notes",
      "Activity logged for accountability",
    ],
  },
  {
    role: "Member App",
    color: "violet",
    headline: "Your gym in every member's pocket",
    sub: "A branded Android app — your name, your logo, not ours.",
    points: [
      "OTP login — no password hassle",
      "QR code for instant gym check-in",
      "Assigned workout & diet plans",
      "Progress charts & measurement history",
      "Renewal reminders via WhatsApp & SMS",
      "Referral codes to earn discounts",
    ],
  },
];

const features = [
  {
    d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    title: "Memberships & renewals",
    desc: "Add members, assign plans, generate invoices, and manage renewals and freezes — with automatic fee-due alerts so you never chase manually.",
  },
  {
    d: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z",
    title: "QR attendance",
    desc: "Every member gets a unique QR code. Scan at the door — attendance logs instantly with a timestamp. No registers, no manual marking.",
  },
  {
    d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    title: "CRM & lead follow-ups",
    desc: "Log every walk-in enquiry, set follow-up reminders, send automated welcome and fee messages. See which leads converted and which were lost.",
  },
  {
    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Revenue & expense tracking",
    desc: "Track daily collections, log expenses, compare revenue week-over-week and month-over-month — all from a single dashboard without any Excel.",
  },
  {
    d: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    title: "Branded Android app",
    desc: "Members install one app from Play Store and see your gym's name and logo — not Fitvario. Plans, diet charts, QR attendance, progress, and alerts in their pocket.",
  },
  {
    d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
    title: "Multi-branch management",
    desc: "Manage all your branches from one account — individual dashboards, staff controls, and side-by-side revenue and attendance comparison.",
  },
];

const steps = [
  {
    n: "1",
    title: "Share your setup",
    desc: "Tell us your gym name, city, number of members, and branches. We build your account and import your existing member data.",
  },
  {
    n: "2",
    title: "Configure and train",
    desc: "We set up plans, staff roles, QR codes, and WhatsApp messaging with you — and walk your team through the dashboard.",
  },
  {
    n: "3",
    title: "Go live",
    desc: "Members download the app with your branding. QR attendance, renewals, CRM, and revenue tracking all run from day one.",
  },
];

const faqs = [
  {
    q: "Who is Fitvario for?",
    a: "Fitvario is built for gym owners, fitness studio operators, and franchise groups across India who want to replace spreadsheets, paper registers, and WhatsApp groups with a proper digital system.",
  },
  {
    q: "Does my gym get its own member app?",
    a: "Yes. Members install the Fitvario app from Google Play and see your gym's name and logo — not Fitvario branding. Workout plan, diet chart, QR attendance, progress charts, and alerts — all in one place.",
  },
  {
    q: "How does QR attendance work?",
    a: "Each member has a unique QR code in the app. They open it at the entrance, the front desk or a scanner reads it, and attendance is logged instantly. No registers, no manual steps. Optional biometric support is available.",
  },
  {
    q: "How are fee reminders sent?",
    a: "Fitvario sends automated renewal reminders via WhatsApp and SMS before the due date — so you don't have to manually chase anyone. You can also send instant reminder blasts from the dashboard.",
  },
  {
    q: "Can I manage multiple branches?",
    a: "Yes. Add as many branches as you run, each with their own dashboard, staff, and members. Compare revenue and attendance across all branches from one organization view.",
  },
  {
    q: "How are payments handled?",
    a: "Payments are processed via Razorpay — an RBI-authorised payment gateway. Members can pay by UPI, card, or net banking. Card data never touches our servers.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. All connections are encrypted. Each gym's data is completely isolated. Staff see only what you permit. Daily backups run automatically. Media files are private and access-controlled.",
  },
  {
    q: "How do I get started?",
    a: "Email support@fitvario.com with your gym name and approximate member count. We'll schedule a walkthrough, help you import existing data, and get you live — typically within a few days.",
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
  return (
    <p className="text-xs font-bold uppercase tracking-widest text-teal-700">{children}</p>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40"
          aria-hidden
        />
        {/* Teal glow top-center */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-teal-400/20 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
          {/* Badge */}
          <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-teal-700">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            Built for gyms across India
          </span>

          {/* Headline */}
          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
            Stop running your gym on WhatsApp groups and spreadsheets
          </h1>

          {/* Sub */}
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-500 sm:text-xl">
            Fitvario gives you digital memberships, QR attendance, automated fee reminders, CRM for leads, workout
            plans, and a branded Android app — all in one platform.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact#demo"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-teal-600 px-8 text-sm font-bold text-white shadow-md transition hover:bg-teal-700 active:scale-95 sm:w-auto"
            >
              Request a free demo
            </Link>
            <a
              href="#problems"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 active:scale-95 sm:w-auto"
            >
              See what we solve
            </a>
          </div>

          {/* Trust pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
            {[
              "Payments via Razorpay",
              "WhatsApp Business API",
              "Android app on Play Store",
              "Registered in Bhopal, India",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <Check className="text-teal-500" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-slate-50" aria-hidden />
      </section>

      {/* ── PROBLEMS WE SOLVE ────────────────────────────────────────────── */}
      <section id="problems" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <SectionLabel>Why gym owners choose Fitvario</SectionLabel>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Every gym has these problems.
              <br className="hidden sm:block" /> We built the fix.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p) => (
              <div
                key={p.bad}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-50">
                    <svg className="h-3 w-3 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <p className="text-sm font-medium leading-snug text-slate-500">{p.bad}</p>
                </div>
                <div className="mx-5 border-t border-dashed border-slate-100" />
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50">
                    <svg className="h-3 w-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold leading-snug text-slate-800">{p.good}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM VIEWS ───────────────────────────────────────────────── */}
      <section id="platform" className="border-y border-slate-200 bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <SectionLabel>Platform</SectionLabel>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              One platform. Three experiences.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-500">
              Gym owners get a full web dashboard. Staff get a focused management panel. Members get a branded Android app. All connected, always in sync.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Owner */}
            <div className="flex flex-col rounded-2xl border border-teal-100 bg-gradient-to-b from-teal-50/60 to-white p-6 shadow-sm">
              <span className="mb-4 self-start rounded-full bg-teal-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-teal-800">
                Gym Owner
              </span>
              <h3 className="text-base font-bold text-slate-900">{platformViews[0].headline}</h3>
              <p className="mt-1.5 text-sm text-slate-500">{platformViews[0].sub}</p>
              <ul className="mt-5 space-y-2.5">
                {platformViews[0].points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check className="text-teal-500" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Staff */}
            <div className="flex flex-col rounded-2xl border border-indigo-100 bg-gradient-to-b from-indigo-50/60 to-white p-6 shadow-sm">
              <span className="mb-4 self-start rounded-full bg-indigo-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-indigo-800">
                Staff Portal
              </span>
              <h3 className="text-base font-bold text-slate-900">{platformViews[1].headline}</h3>
              <p className="mt-1.5 text-sm text-slate-500">{platformViews[1].sub}</p>
              <ul className="mt-5 space-y-2.5">
                {platformViews[1].points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check className="text-indigo-500" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Member App — spans 2 cols on sm, 1 on lg */}
            <div className="flex flex-col rounded-2xl border border-violet-100 bg-gradient-to-b from-violet-50/60 to-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
              <span className="mb-4 self-start rounded-full bg-violet-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-violet-800">
                Member App · Android
              </span>
              <h3 className="text-base font-bold text-slate-900">{platformViews[2].headline}</h3>
              <p className="mt-1.5 text-sm text-slate-500">{platformViews[2].sub}</p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                {platformViews[2].points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check className="text-violet-500" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <SectionLabel>Features</SectionLabel>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Everything your gym needs to run digitally
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-500">
              From the first member you add to your daily operations — the tools your team actually needs, in one place.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li
                key={f.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-200 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.d} />
                  </svg>
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <Link
              href="/features"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              See every feature in detail →
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <SectionLabel>Getting started</SectionLabel>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Go live in days, not months
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-500">
              We migrate your existing member list and configure everything. No IT team needed.
            </p>
          </div>

          <div className="relative grid gap-6 sm:grid-cols-3">
            {/* connector line — desktop only */}
            <div
              className="absolute left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] top-8 hidden border-t-2 border-dashed border-slate-200 sm:block"
              aria-hidden
            />

            {steps.map((s) => (
              <div key={s.n} className="relative flex flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:items-center sm:text-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-600 text-base font-extrabold text-white shadow-md">
                  {s.n}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Questions gym owners ask us
            </h2>
          </div>

          <dl className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <dt className="text-sm font-bold text-slate-900">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-500">{faq.a}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-center text-sm text-slate-400">
            Still have questions?{" "}
            <Link href="/contact" className="font-semibold text-teal-700 underline-offset-2 hover:underline">
              Email our team
            </Link>{" "}
            — we reply within 24 hours.
          </p>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-14 text-center shadow-2xl sm:px-12 sm:py-16">
            {/* Background glow */}
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-500/20 blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <SectionLabel>
                <span className="text-teal-400">Get started</span>
              </SectionLabel>
              <h2 className="mx-auto mt-3 max-w-xl text-balance text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                Ready to run your gym the right way?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-400">
                Request a demo and we&apos;ll show you everything — memberships, QR attendance, the member app, and
                more. No commitment, no pressure.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact#demo"
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-teal-500 px-8 text-sm font-bold text-white shadow-lg transition hover:bg-teal-400 active:scale-95 sm:w-auto"
                >
                  Request a free demo
                </Link>
                <a
                  href="mailto:support@fitvario.com"
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-8 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-700 active:scale-95 sm:w-auto"
                >
                  Email us directly
                </a>
              </div>
              <p className="mt-6 text-xs text-slate-600">
                By contacting us you agree to our{" "}
                <Link href="/privacy" className="text-slate-500 underline underline-offset-2 hover:text-slate-300">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="text-slate-500 underline underline-offset-2 hover:text-slate-300">
                  Terms of Service
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
