import Link from "next/link";
import { buildMetadata, formatDate } from "@/lib/seo";
import { getPage } from "@/config/pages";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DemoForm } from "@/components/DemoForm";
import { RelatedLinks } from "@/components/RelatedLinks";
import { SoftwareApplicationJsonLd } from "@/components/JsonLd";
import { pricingTiers, selfServeSignup, signupUrl, typicalSetupExample } from "@/config/pricing";
import { contact } from "@/config/site";
import { isLive } from "@/lib/features";

export const metadata = buildMetadata("/pricing");

const factors = [
  {
    title: "Number of branches",
    body: "One gym and a five-branch franchise need different setups: staff access per branch, reports across branches, and a member app for each location.",
  },
  {
    title: "Active members",
    body: "The number of members you manage at one time. A 150-member gym and a 1,500-member gym do not cost the same to run.",
  },
  {
    title: "Messaging volume",
    body: "WhatsApp, SMS and push messages run on credits. A gym that messages every member often sends far more than one that sends a few alerts.",
  },
  {
    title: "Modules you turn on",
    body: "Attendance, CRM, billing and franchise reporting are modules. You pay for the ones you use.",
  },
];

const included = [
  "Multi-gym and franchise management",
  "The Fitvario Android app for owners and staff",
  isLive("white_label") ? "Your gym’s name and logo in the Android app" : "Android app for members",
  "QR attendance for members",
  "CRM, enquiries and follow-up reminders",
  ...(isLive("workout_diet_plans") ? ["Workout and diet plan builder"] : []),
  "Membership, renewal and invoice management",
  "WhatsApp and SMS messaging credits",
  "Push notifications for members",
  "Payments through Razorpay (UPI, card, net banking)",
  ...(isLive("ecommerce_cart_orders") ? ["Online store for gym products"] : []),
  "Analytics and reports for collections, members and expenses",
  "Multi-branch comparison",
  "Staff access controls and activity logs",
  "Daily automated cloud backups",
  "Encrypted data and secure connections",
];

const vendorQuestions = [
  "Is the price per member, per branch, or a flat fee? What happens when you add 100 members?",
  "Are WhatsApp and SMS credits included, or billed on top? How many credits does your size really need?",
  "Is there a set-up or data-import fee?",
  "Can you export your member and payment data whenever you want?",
  "Is the member app in your gym's name, or the vendor's?",
  "What does GST add to the quote, and what is the refund policy?",
];

const faqs = [
  {
    q: "How is my quote calculated?",
    a: "From your number of branches, your active members, how much you expect to message, and the modules you want. Share those four things and we reply with a proposal, usually within 1 to 2 business days.",
  },
  {
    q: "Are messaging credits included?",
    a: "Yes, a messaging credit allowance is part of every plan. How many credits make sense depends on your member count and how often you remind, so we size it with you.",
  },
  {
    q: "Do the prices include GST?",
    a: "Quotes are in Indian Rupees and exclude GST unless the quote says otherwise.",
  },
  {
    q: "What if I want to cancel?",
    a: "Subscription fees are non-refundable under our Refund Policy. Read it before you subscribe so there are no surprises.",
  },
];

function periodLabel(p: "month" | "quarter" | "year") {
  return p === "month" ? "per month" : p === "quarter" ? "per quarter" : "per year";
}

export default function PricingPage() {
  const page = getPage("/pricing");
  const haveTiers = pricingTiers.length > 0;

  return (
    <PageShell wide>
      <SoftwareApplicationJsonLd />
      <Breadcrumbs path="/pricing" />

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Gym software price in India: what Fitvario costs and why
      </h1>
      <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-slate-600">
        {haveTiers
          ? "Fitvario plans are priced in Indian Rupees. Pick the one that fits your gym, or talk to us if you run several branches."
          : "Fitvario does not publish a fixed price list yet. The gym software price you pay in India depends on your branches, your active members, how much you message and which modules you use. Tell us about your gym and we will send a quote, usually within 1 to 2 business days."}
      </p>
      <p className="mt-2 text-sm text-slate-500">Last updated: {formatDate(page.updated)}</p>

      {haveTiers && (
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pricingTiers.map((t) => (
            <div key={t.name} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{t.name}</h2>
              <p className="mt-3 text-3xl font-bold text-slate-900">
                ₹{t.priceInr.toLocaleString("en-IN")}
                <span className="ml-1 text-sm font-medium text-slate-500">{periodLabel(t.period)}</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">Plus GST. {t.basis}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-600">
                {t.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              {t.cta === "signup" && selfServeSignup && signupUrl ? (
                <a href={signupUrl} data-cta="pricing-tier" className="mt-5 inline-flex h-12 items-center justify-center rounded-lg bg-teal-700 text-sm font-semibold text-white hover:bg-teal-800">
                  Sign up
                </a>
              ) : (
                <Link href="/contact#demo" data-cta="pricing-tier" className="mt-5 inline-flex h-12 items-center justify-center rounded-lg bg-teal-700 text-sm font-semibold text-white hover:bg-teal-800">
                  Book a demo
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      <section className="mt-12" aria-labelledby="factors-heading">
        <h2 id="factors-heading" className="text-xl font-semibold text-slate-900">What decides your price</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {factors.map((f) => (
            <div key={f.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
        {typicalSetupExample && (
          <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            <strong className="text-slate-800">Example setup:</strong> {typicalSetupExample.description}
          </p>
        )}
      </section>

      <section className="mt-12 rounded-xl border border-teal-200 bg-teal-50/50 p-7" aria-labelledby="included-heading">
        <h2 id="included-heading" className="text-xl font-semibold text-slate-900">What is included in every plan</h2>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[14px] leading-relaxed text-slate-700">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section id="quote" className="mt-12 scroll-mt-28 rounded-xl border border-slate-200 bg-white p-7 shadow-sm" aria-labelledby="quote-heading">
        <h2 id="quote-heading" className="text-xl font-semibold text-slate-900">Get a quote for your gym</h2>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-600">
          Share a few details and we will send a proposal for your setup. Prefer to talk first? You can{" "}
          <Link href="/contact#demo" className="font-semibold text-teal-700 underline-offset-2 hover:underline">book a demo</Link>{" "}
          instead.
        </p>
        <div className="mt-6">
          <DemoForm variant="quote" />
        </div>
      </section>

      <section className="mt-12" aria-labelledby="compare-heading">
        <h2 id="compare-heading" className="text-xl font-semibold text-slate-900">
          Comparing gym membership software price quotes
        </h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-slate-600">
          Two quotes with the same headline number can end up very different a year later. Ask every vendor, us
          included, these questions before you decide:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
          {vendorQuestions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-xl font-semibold text-slate-900">Pricing questions</h2>
        <dl className="mt-4 space-y-3">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <dt className="text-sm font-bold text-slate-900">{f.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-8 rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm text-slate-500">
        All prices are in Indian Rupees (INR) and exclude applicable taxes (GST) unless stated otherwise. Payments are
        processed securely through Razorpay. Subscription fees are non-refundable per our{" "}
        <Link href="/refund" className="font-medium text-teal-700 underline-offset-2 hover:underline">Refund Policy</Link>.
        Questions? Email{" "}
        <a href={`mailto:${contact.email}`} className="font-medium text-teal-700 underline-offset-2 hover:underline">{contact.email}</a>{" "}
        or read about{" "}
        <Link href="/about" className="font-medium text-teal-700 underline-offset-2 hover:underline">Fitvario</Link>.
      </div>

      <RelatedLinks title="See what you get" paths={["/features", "/features/gym-crm", "/features/whatsapp-reminders"]} />
    </PageShell>
  );
}
