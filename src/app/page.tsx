import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { pages, isIndexable, publishedPages } from "@/config/pages";
import { contact, whatsappLink } from "@/config/site";
import { pricingTiers } from "@/config/pricing";
import { isLive } from "@/lib/features";
import { SoftwareApplicationJsonLd } from "@/components/JsonLd";
import { Proof } from "@/components/Proof";
import { ClosingCta } from "@/components/ClosingCta";
import { ScreenshotFrame } from "@/components/ScreenshotFrame";

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
    bad: "Renewals chased by hand in WhatsApp groups",
    good: expiry
      ? "A WhatsApp reminder goes out 7, 3 and 1 days before a plan ends, and one the day after. Nobody at the desk sends it."
      : "WhatsApp, SMS and push alerts reach members straight from the gym, not from a message lost in a group.",
  },
  {
    bad: "A paper register at the door",
    good: "Members scan the gym's QR code with the app. The visit is saved with the time, and in two-scan mode the time spent.",
  },
  {
    bad: "Walk-in enquiries nobody calls back",
    good: "Every enquiry gets a next follow-up date, and one list shows who to call today.",
  },
  {
    bad: "Not knowing what came in today",
    good: "Collections, expenses and member growth in one app, not in three sheets.",
  },
  {
    bad: "Members who forget when their plan ends",
    good: `Members see their plan and end date in the app, with attendance and progress${diet ? ", workouts and diet" : ""}, plus notifications from the gym.`,
  },
  {
    bad: "One spreadsheet per branch",
    good: "All branches under one login, with revenue and attendance side by side.",
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

/* ─── Page ───────────────────────────────────────────────────────────────── */
const wrap = "mx-auto max-w-6xl px-5 sm:px-8";
const band = "py-[4.5rem] lg:py-28";

export default function Home() {
  const wa = whatsappLink("Hi Fitvario, I'd like a demo for my gym.");
  const segments = publishedPages("segment");
  const tools = publishedPages("tool");
  const isPublished = (path: string) => pages.some((p) => p.path === path && isIndexable(p));
  const facts = [
    "Payments via Razorpay",
    expiry ? "Automated WhatsApp reminders" : "WhatsApp, SMS and push alerts",
    "Android app for your members",
    "Registered in Bhopal, India",
  ];

  return (
    <>
      <SoftwareApplicationJsonLd />

      {/* HERO: headline left, real product screens right */}
      <section className="border-b border-line">
        <div className={`${wrap} grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:pb-24 lg:pt-20`}>
          <div>
            <p className="text-[15px] font-medium text-mute">Fitvario gym management for owners in India</p>
            <h1 className="mt-4 max-w-2xl text-[2.5rem] font-bold leading-[1.06] text-ink sm:text-6xl">
              Stop running your gym on WhatsApp groups and spreadsheets
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#2f393f]">
              {`Fitvario is gym management software for India. It keeps your members and their plan end dates, records attendance when they scan the gym QR code, holds your enquiry list, and gives your members ${memberApp}${diet ? ", with workout and diet plans" : ""}.`}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact#demo" data-cta="hero" className="fv-btn fv-btn-primary">
                Book a free demo
              </Link>
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" data-cta="hero" className="fv-btn fv-btn-secondary">
                  <span className="h-2 w-2 rounded-full bg-[#25a244]" aria-hidden />
                  Chat on WhatsApp
                </a>
              ) : (
                <a href="#problems" className="fv-btn fv-btn-secondary">
                  See what changes
                </a>
              )}
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mute">
              {facts.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-lime-deep" style={{ background: "var(--lime-deep)" }} aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            {isPublished("/hi") && (
              <p className="mt-6 text-sm text-mute">
                Hindi aur Hinglish mein padhna hai?{" "}
                <Link href="/hi" lang="hi-Latn" className="fv-link font-medium">
                  Hinglish mein dekhein
                </Link>
              </p>
            )}
          </div>

          <div className="relative mx-auto flex w-full max-w-md justify-center gap-5 lg:max-w-none lg:justify-end">
            <div className="w-full max-w-[250px]">
              <ScreenshotFrame screen="owner-home" priority />
            </div>
            <div className="mt-14 hidden w-full max-w-[250px] sm:block">
              <ScreenshotFrame screen="member-home" />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT CHANGES: a ruled before and after table, not cards */}
      <section id="problems" className={band}>
        <div className={wrap}>
          <h2 className="max-w-2xl text-[2rem] font-bold leading-tight text-ink sm:text-[2.5rem]">What changes on a normal Monday</h2>
          <div className="mt-10 border-t border-ink">
            <div className="hidden grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 border-b border-line py-3 text-sm font-semibold text-mute md:grid">
              <p>Today</p>
              <p>With Fitvario</p>
            </div>
            <ul className="divide-y divide-line">
              {problems.map((p) => (
                <li key={p.bad} className="grid gap-2 py-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10">
                  <p className="text-[17px] text-mute">{p.bad}</p>
                  <p className="text-[17px] font-medium leading-snug text-ink">{p.good}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ONE RENEWAL: a single large number on ink */}
      {expiry && (
        <section className="on-ink bg-ink text-white">
          <div className={`${wrap} grid gap-10 py-[4.5rem] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20 lg:py-24`}>
            <div>
              <h2 className="text-[2rem] font-bold leading-tight sm:text-[2.5rem]">Renewal reminders go out without anyone at the desk</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/80">
                Once a day Fitvario checks each member&apos;s plan end date. Members who are 7, 3 or 1 days from the end get
                a WhatsApp message, and members whose plan ended yesterday get one more. Each message uses a credit from your
                gym&apos;s messaging wallet.
              </p>
              {isPublished("/features/whatsapp-reminders") && (
                <p className="mt-6">
                  <Link href="/features/whatsapp-reminders" className="font-semibold text-white underline decoration-lime decoration-2 underline-offset-4 hover:decoration-4">
                    How the reminders work
                  </Link>
                </p>
              )}
            </div>
            <div>
              <ol className="grid grid-cols-4 gap-3 border-t border-white/25 pt-6">
                {[
                  ["7", "days before"],
                  ["3", "days before"],
                  ["1", "day before"],
                  ["+1", "day after"],
                ].map(([n, l]) => (
                  <li key={l + n}>
                    <p className="font-display text-5xl font-bold leading-none text-lime sm:text-7xl">{n}</p>
                    <p className="mt-3 text-sm text-white/80">{l}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-sm leading-relaxed text-white/70">
                Example: a plan that ends on the 20th is reminded on the 13th, 17th and 19th, and the expired message goes on
                the 21st. Dates are illustrative.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ROLES: three rows with a left label, not three tinted cards */}
      <section id="platform" className={band}>
        <div className={wrap}>
          <h2 className="max-w-2xl text-[2rem] font-bold leading-tight text-ink sm:text-[2.5rem]">One app, three logins</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#2f393f]">
            Owners and staff run the gym from the Fitvario Android app, with staff access set by the owner. Members use the
            same app with their own login, and it can show your gym’s name and logo on its splash and home screens.
          </p>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {platformViews.map((v) => (
              <div key={v.role} className="grid gap-5 py-8 md:grid-cols-[minmax(0,3fr)_minmax(0,5fr)] md:gap-12">
                <div>
                  <p className="text-sm font-semibold text-mute">{v.role}</p>
                  <h3 className="mt-1 text-2xl font-bold leading-snug text-ink">{v.headline}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-mute">{v.sub}</p>
                </div>
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {v.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[15px] leading-snug text-[#2f393f]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0" style={{ background: "var(--lime-deep)" }} aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES: numbered list in two columns, no icons */}
      <section id="features" className="border-t border-line bg-white">
        <div className={`${wrap} ${band}`}>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <h2 className="text-[2rem] font-bold leading-tight text-ink sm:text-[2.5rem]">
                Gym management software India owners can run from a phone
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[#2f393f]">
                From the first member you add to the daily close, the tools a small team uses most.
              </p>
              <p className="mt-6">
                <Link href="/features" className="fv-btn fv-btn-secondary">
                  See every feature
                </Link>
              </p>
            </div>
            <ol className="divide-y divide-line border-y border-line">
              {features.map((f, i) => (
                <li key={f.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 py-5">
                  <span className="tnum font-display text-lg font-semibold text-mute">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{f.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-[#2f393f]">{f.desc}</p>
                    {f.href && isPublished(f.href) && (
                      <Link href={f.href} className="fv-link mt-2 inline-block py-1 text-[15px] font-medium">
                        How it works
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR */}
      {segments.length > 0 && (
        <section className={`${band} border-t border-line`}>
          <div className={wrap}>
            <h2 className="max-w-2xl text-[2rem] font-bold leading-tight text-ink sm:text-[2.5rem]">Built for the way you run your gym</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {segments.map((s) => (
                <li key={s.path}>
                  <Link href={s.path} className="group grid gap-1 py-5 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10">
                    <span className="text-lg font-semibold text-ink underline decoration-1 underline-offset-4 group-hover:decoration-2" style={{ textDecorationColor: "var(--lime-deep)" }}>
                      {s.navLabel ?? s.title.split("|")[0].trim()}
                    </span>
                    <span className="text-[15px] leading-relaxed text-mute">{s.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FREE TOOLS */}
      {tools.length > 0 && (
        <section className="border-t border-line bg-white">
          <div className={`${wrap} ${band}`}>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <div>
                <h2 className="text-[2rem] font-bold leading-tight text-ink sm:text-[2.5rem]">Calculators for gym owners</h2>
                <p className="mt-4 text-lg leading-relaxed text-[#2f393f]">
                  Work out your break-even, pricing, churn and revenue in your browser. No sign-up.
                </p>
              </div>
              <ul className="divide-y divide-line border-y border-line">
                {tools.map((t) => (
                  <li key={t.path}>
                    <Link href={t.path} className="group block py-5">
                      <span className="text-lg font-semibold text-ink underline decoration-1 underline-offset-4 group-hover:decoration-2" style={{ textDecorationColor: "var(--lime-deep)" }}>
                        {t.navLabel ?? t.title.split("|")[0].trim()}
                      </span>
                      <span className="mt-1.5 block text-[15px] leading-relaxed text-mute">{t.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* HOW IT STARTS */}
      <section className={`${band} border-t border-line`}>
        <div className={wrap}>
          <h2 className="max-w-2xl text-[2rem] font-bold leading-tight text-ink sm:text-[2.5rem]">Three steps to go live</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#2f393f]">
            We help you set everything up. You do not need an IT team.
          </p>
          <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s) => (
              <li key={s.n} className="border-t-2 border-ink pt-4">
                <p className="font-display text-5xl font-bold leading-none text-ink">{s.n}</p>
                <h3 className="mt-4 text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#2f393f]">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Proof />

      {/* PRICING */}
      <section className="border-y border-line bg-white">
        <div className={`${wrap} flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between`}>
          <div className="max-w-xl">
            <h2 className="text-[1.75rem] font-bold leading-tight text-ink">
              {pricingTiers.length > 0 ? "Plans priced in rupees" : "Priced for your gym's size"}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-[#2f393f]">
              {pricingTiers.length > 0
                ? "See the plans and what each one includes."
                : "Your price depends on your branches, active members and how much you message. See what is included in every plan and ask for a quote."}
            </p>
          </div>
          <Link href="/pricing" data-cta="home-pricing" className="fv-btn fv-btn-secondary shrink-0">
            See pricing
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={band}>
        <div className={wrap}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
            <div>
              <h2 className="text-[2rem] font-bold leading-tight text-ink sm:text-[2.5rem]">Questions gym owners ask us</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-mute">
                Still have questions?{" "}
                <Link href="/contact" className="fv-link font-medium">
                  Talk to our team
                </Link>
                . We reply {contact.responseTime}.
              </p>
            </div>
            <dl className="divide-y divide-line border-y border-line">
              {faqs.map((faq) => (
                <div key={faq.q} className="py-5">
                  <dt className="text-lg font-semibold text-ink">{faq.q}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-[#2f393f]">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="pb-16 sm:pb-20">
        <div className={wrap}>
          <ClosingCta
            heading="Ready to run your gym the right way?"
            body="Book a demo and we will show you memberships, QR attendance, the CRM and the member app. No commitment."
            location="home-closing"
          />
          <p className="mt-6 text-sm text-mute">
            By contacting us you agree to our{" "}
            <Link href="/privacy" className="fv-link">Privacy Policy</Link> and{" "}
            <Link href="/terms" className="fv-link">Terms of Service</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
