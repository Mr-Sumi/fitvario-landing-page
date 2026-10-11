import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { pages, isIndexable, publishedPages } from "@/config/pages";
import { contact, whatsappLink } from "@/config/site";
import { pricingTiers } from "@/config/pricing";
import { isLive } from "@/lib/features";
import { SoftwareApplicationJsonLd } from "@/components/JsonLd";
import { Proof } from "@/components/Proof";
import { ClosingCta } from "@/components/ClosingCta";
import { Sparkle, LoopArrow, Squiggle, PulseLine, TileArtRings, TileArtBlocks } from "@/components/Doodles";
import { ReminderCard, AttendanceCard, DuesCard } from "@/components/FactCards";

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
const band = "py-16 lg:py-24";
const h2 = "text-[2rem] font-bold leading-[1.1] text-ink sm:text-[2.5rem]";

// Simple outline icons for the "what changes" grid, matched to the order of `problems`
const problemIcons = [features[3].d, features[1].d, features[2].d, features[4].d, features[0].d, features[5].d];

function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export default function Home() {
  const wa = whatsappLink("Hi Fitvario, I'd like a demo for my gym.");
  const segments = publishedPages("segment");
  const tools = publishedPages("tool");
  const isPublished = (path: string) => pages.some((p) => p.path === path && isIndexable(p));
  const chips = ["UPI", "Razorpay", "WhatsApp", "SMS", "Push notifications", "Android app", "GST invoices"];

  return (
    <>
      <SoftwareApplicationJsonLd />

      {/* HERO: big lime panel, black headline, cards floating over its edge */}
      <section className="mx-auto max-w-[88rem] px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="on-lime fv-panel relative bg-lime px-6 pb-12 pt-12 sm:px-12 sm:pt-16 lg:pb-24 lg:pt-20">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
            <div className="relative">
              <Sparkle className="absolute -top-2 right-2 hidden h-10 w-10 sm:right-10 sm:block lg:-right-2" />
              <p className="text-[15px] font-semibold text-ink/80">Fitvario gym management for owners in India</p>
              <h1 className="mt-4 max-w-2xl text-[2.6rem] font-bold leading-[1.02] text-ink sm:text-6xl lg:text-[4.5rem]">
                Stop running your gym on WhatsApp groups and spreadsheets
              </h1>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink/90 sm:text-lg">
                {`Fitvario is gym management software for India. It keeps your members and their plan end dates, records attendance when they scan the gym QR code, holds your enquiry list, and gives your members ${memberApp}${diet ? ", with workout and diet plans" : ""}.`}
              </p>
              <div className="relative mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <LoopArrow className="pointer-events-none absolute -top-9 left-[23.5rem] hidden h-20 w-32 lg:block" />
                <Link href="/contact#demo" data-cta="hero" className="fv-btn fv-btn-primary">
                  Book a free demo
                  <ArrowRight />
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
              <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-ink/85">
                {[
                  "Payments via Razorpay",
                  expiry ? "Automated WhatsApp reminders" : "WhatsApp, SMS and push alerts",
                  "Android app for your members",
                  "Registered in Bhopal, India",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-ink" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
              {isPublished("/hi") && (
                <p className="mt-5 text-sm text-ink/80">
                  Hindi aur Hinglish mein padhna hai?{" "}
                  <Link href="/hi" lang="hi-Latn" className="font-semibold text-ink underline underline-offset-4">
                    Hinglish mein dekhein
                  </Link>
                </p>
              )}
            </div>

            <div className="relative grid gap-4 sm:grid-cols-2 lg:block lg:min-h-[34rem]">
              <ReminderCard className="lg:absolute lg:left-0 lg:top-0 lg:w-[22rem] lg:-rotate-2" />
              <AttendanceCard className="lg:absolute lg:right-0 lg:top-[11.5rem] lg:w-[19rem] lg:rotate-2" />
              <DuesCard className="hidden lg:absolute lg:left-8 lg:top-[24rem] lg:block lg:w-[21rem] lg:-rotate-1" />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT CHANGES: two soft tiles, then a two-column grid with lime icon dots */}
      <section id="problems" className={`${band} lg:pt-40`}>
        <div className={wrap}>
          <h2 className={`${h2} max-w-xl`}>What changes on a normal Monday</h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="fv-tile relative overflow-hidden p-7 sm:p-9">
              <h3 className="max-w-[16rem] text-2xl font-bold leading-tight text-ink">{problems[0].bad}</h3>
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-[#2f393f]">{problems[0].good}</p>
              {isPublished("/features/whatsapp-reminders") && (
                <Link href="/features/whatsapp-reminders" className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-ink">
                  How the reminders work <ArrowRight />
                </Link>
              )}
              <TileArtRings className="pointer-events-none absolute -bottom-2 right-0 h-36 w-52" />
            </div>
            <div className="fv-tile relative overflow-hidden p-7 sm:p-9">
              <h3 className="max-w-[16rem] text-2xl font-bold leading-tight text-ink">{problems[1].bad}</h3>
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-[#2f393f]">{problems[1].good}</p>
              {isPublished("/features/qr-attendance") && (
                <Link href="/features/qr-attendance" className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-ink">
                  How QR attendance works <ArrowRight />
                </Link>
              )}
              <TileArtBlocks className="pointer-events-none absolute -bottom-2 right-0 h-36 w-52" />
            </div>
          </div>

          <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {problems.slice(2).map((p, i) => (
              <li key={p.bad}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime">
                  <svg className="h-5 w-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d={problemIcons[i + 2]} />
                  </svg>
                </span>
                <p className="mt-4 text-sm font-medium text-mute">{p.bad}</p>
                <p className="mt-1.5 text-[1.0625rem] font-semibold leading-snug text-ink">{p.good}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WORKS WITH: chips, not logos */}
      <section className="border-y border-line">
        <div className={`${wrap} py-12 text-center lg:py-14`}>
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">Built around how Indian gyms collect and communicate</h2>
          <ul className="mt-7 flex flex-wrap justify-center gap-3">
            {chips.map((c) => (
              <li key={c} className="rounded-full bg-soft px-5 py-3 text-[15px] font-semibold text-ink">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BLACK BANNER: the reminder schedule, with the numerals as the visual */}
      {expiry && (
        <section className={`${wrap} py-16 lg:py-24`}>
          <div className="on-ink fv-panel relative grid items-center gap-10 overflow-hidden bg-ink px-6 py-12 sm:px-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:py-16">
            <PulseLine className="pointer-events-none absolute bottom-6 right-8 hidden h-16 w-44 text-white/25 lg:block" />
            <div className="lg:pl-14">
              <h2 className="text-[2rem] font-bold leading-[1.1] text-white sm:text-[2.5rem]">
                Renewal reminders go out without anyone at the desk
              </h2>
              <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-white/80">
                Once a day Fitvario checks each member&apos;s plan end date. Members who are 7, 3 or 1 days from the end get a
                WhatsApp message, and members whose plan ended yesterday get one more. Each message uses a credit from your
                gym&apos;s messaging wallet.
              </p>
              {isPublished("/features/whatsapp-reminders") && (
                <Link href="/features/whatsapp-reminders" className="fv-btn fv-btn-primary mt-7">
                  How the reminders work
                </Link>
              )}
            </div>
            <div>
              <ol className="grid grid-cols-4 gap-3">
                {[
                  ["7", "days before"],
                  ["3", "days before"],
                  ["1", "day before"],
                  ["+1", "day after"],
                ].map(([n, l]) => (
                  <li key={l + n} className="rounded-[20px] bg-white/10 px-3 py-5 text-center">
                    <p className="font-display text-5xl font-bold leading-none text-lime sm:text-6xl">{n}</p>
                    <p className="mt-3 text-[13px] text-white/80">{l}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-sm leading-relaxed text-white/70">
                Example: a plan that ends on the 20th is reminded on the 13th, 17th and 19th, and the expired message goes
                on the 21st. Dates are illustrative.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ROLES: three coloured columns */}
      <section id="platform" className={`${band} pt-0`}>
        <div className={wrap}>
          <div className="max-w-2xl">
            <h2 className={h2}>One app, three logins</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#2f393f]">
              Owners and staff run the gym from the Fitvario Android app, with staff access set by the owner. Members use the
              same app with their own login, and it can show your gym’s name and logo on its splash and home screens.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {platformViews.map((v, i) => (
              <div
                key={v.role}
                className={`fv-panel flex flex-col p-7 sm:p-8 ${i === 0 ? "bg-lime text-ink" : i === 1 ? "bg-soft text-ink" : "bg-ink text-white on-ink"}`}
                style={{ borderRadius: 28 }}
              >
                <p className={`text-sm font-semibold ${i === 2 ? "text-lime" : "text-ink/70"}`}>{v.role}</p>
                <h3 className="mt-2 text-2xl font-bold leading-snug">{v.headline}</h3>
                <p className={`mt-2 text-[15px] leading-relaxed ${i === 2 ? "text-white/75" : "text-ink/80"}`}>{v.sub}</p>
                <ul className="mt-6 space-y-3">
                  {v.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[15px] leading-snug">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${i === 2 ? "bg-lime" : "bg-ink"}`} aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DUES: a big lime circle with floating cards, as in the reference's last feature row */}
      <section className="border-t border-line">
        <div className={`${wrap} grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24`}>
          <div>
            <h2 className={h2}>Part payments stay on the invoice until they are paid</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[#2f393f]">
              Record what the member paid today and the invoice keeps the balance, with a dues list for who still owes. You
              choose which of your tax lines apply, and each shows as its own line.
            </p>
            {isPublished("/features/gst-billing") && (
              <Link href="/features/gst-billing" className="fv-btn fv-btn-primary mt-7">
                How billing and dues work
                <ArrowRight />
              </Link>
            )}
            <Squiggle className="mt-8 h-6 w-28" />
          </div>
          <div className="relative mx-auto min-h-[19rem] w-full max-w-md">
            <div className="absolute -right-6 top-2 h-72 w-72 rounded-full bg-lime sm:h-80 sm:w-80" aria-hidden />
            <DuesCard className="relative z-10 mx-auto mt-10 w-[21rem] max-w-full -rotate-2" />
          </div>
        </div>
      </section>

      {/* FEATURES: soft tiles, numbered */}
      <section id="features" className={`${band} border-t border-line`}>
        <div className={wrap}>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <h2 className={h2}>Gym management software India owners can run from a phone</h2>
              <p className="mt-4 text-lg leading-relaxed text-[#2f393f]">
                From the first member you add to the daily close, the tools a small team uses most.
              </p>
              <Link href="/features" className="fv-btn fv-btn-secondary mt-7">
                See every feature
                <ArrowRight />
              </Link>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {features.map((f, i) => (
                <li key={f.title} className="fv-tile p-6">
                  <span className="tnum flex h-9 w-9 items-center justify-center rounded-full bg-lime font-display text-sm font-bold text-ink">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{f.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[#2f393f]">{f.desc}</p>
                  {f.href && isPublished(f.href) && (
                    <Link href={f.href} className="mt-3 inline-flex items-center gap-1.5 py-1 text-[15px] font-semibold text-ink">
                      How it works <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR */}
      {segments.length > 0 && (
        <section className={`${wrap} pb-16 lg:pb-24`}>
          <h2 className={`${h2} max-w-2xl`}>Built for the way you run your gym</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {segments.map((s) => (
              <li key={s.path}>
                <Link href={s.path} className="fv-tile group flex h-full flex-col p-6 transition-colors hover:bg-[#e9edda]">
                  <span className="flex items-center justify-between gap-3 text-xl font-bold text-ink">
                    {s.navLabel ?? s.title.split("|")[0].trim()}
                    <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="mt-2 text-[15px] leading-relaxed text-[#2f393f]">{s.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FREE TOOLS */}
      {tools.length > 0 && (
        <section className="bg-soft">
          <div className={`${wrap} ${band}`}>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <div>
                <h2 className={h2}>Calculators for gym owners</h2>
                <p className="mt-4 text-lg leading-relaxed text-[#2f393f]">
                  Work out your break-even, pricing, churn and revenue in your browser. No sign-up.
                </p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {tools.map((t) => (
                  <li key={t.path}>
                    <Link href={t.path} className="group flex h-full flex-col rounded-[24px] bg-white p-6 transition-shadow hover:shadow-md">
                      <span className="flex items-center justify-between gap-3 text-lg font-bold text-ink">
                        {t.navLabel ?? t.title.split("|")[0].trim()}
                        <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="mt-2 text-[15px] leading-relaxed text-[#2f393f]">{t.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* HOW IT STARTS */}
      <section className={band}>
        <div className={wrap}>
          <h2 className={`${h2} max-w-2xl`}>Three steps to go live</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#2f393f]">
            We help you set everything up. You do not need an IT team.
          </p>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="rounded-[24px] border border-line p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lime font-display text-xl font-bold text-ink">{s.n}</span>
                <h3 className="mt-5 text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#2f393f]">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Proof />

      {/* PRICING */}
      <section className={`${wrap} pb-16 lg:pb-24`}>
        <div className="fv-tile flex flex-col gap-6 px-7 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-10">
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
          <Link href="/pricing" data-cta="home-pricing" className="fv-btn fv-btn-primary shrink-0">
            See pricing
            <ArrowRight />
          </Link>
        </div>
      </section>

      {/* FAQ: native accordion */}
      <section id="faq" className={`${wrap} pb-16 lg:pb-24`}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div>
            <h2 className={h2}>Questions gym owners ask us</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-mute">
              Still have questions?{" "}
              <Link href="/contact" className="fv-link font-medium">
                Talk to our team
              </Link>
              . We reply {contact.responseTime}.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group fv-tile open:bg-lime/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[1.0625rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-lg leading-none transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 text-[15px] leading-relaxed text-[#2f393f]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className={`${wrap} pb-16 sm:pb-20`}>
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
      </section>
    </>
  );
}
