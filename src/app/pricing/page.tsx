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
  ...(isLive("owner_web_dashboard") ? ["Owner web dashboard at dash.fitvario.com"] : []),
  isLive("white_label") ? "Your gym’s name and logo on the app’s splash and home screens" : "Android app for members",
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

      <header className="mt-8 max-w-3xl border-l-4 border-lime pl-5 sm:pl-7">
        <h1 className="text-[2.25rem] font-bold leading-[1.1] text-ink sm:text-5xl">
          Gym software price in India: what Fitvario costs and why
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#2f393f]">
          {haveTiers
            ? "Fitvario plans are priced in Indian Rupees. Pick the one that fits your gym, or talk to us if you run several branches."
            : "Fitvario does not publish a fixed price list yet. The gym software price you pay in India depends on your branches, your active members, how much you message and which modules you use. Tell us about your gym and we will send a quote, usually within 1 to 2 business days."}
        </p>
        <p className="mt-4 text-sm text-mute">Last updated: {formatDate(page.updated)}</p>
      </header>

      {haveTiers && (
        <div className="mt-12 grid gap-px overflow-hidden rounded-[8px] border border-line bg-line md:grid-cols-3">
          {pricingTiers.map((t) => (
            <div key={t.name} className="flex flex-col bg-white p-6">
              <h2 className="text-xl font-bold text-ink">{t.name}</h2>
              <p className="tnum mt-3 font-display text-4xl font-bold text-ink">
                ₹{t.priceInr.toLocaleString("en-IN")}
                <span className="ml-1 font-sans text-sm font-medium text-mute">{periodLabel(t.period)}</span>
              </p>
              <p className="mt-1 text-xs text-mute">Plus GST. {t.basis}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-[#2f393f]">
                {t.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              {t.cta === "signup" && selfServeSignup && signupUrl ? (
                <a href={signupUrl} data-cta="pricing-tier" className="fv-btn fv-btn-primary mt-5">
                  Sign up
                </a>
              ) : (
                <Link href="/contact#demo" data-cta="pricing-tier" className="fv-btn fv-btn-primary mt-5">
                  Book a demo
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      <section className="mt-20" aria-labelledby="factors-heading">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div>
            <h2 id="factors-heading" className="text-[1.75rem] font-bold leading-tight text-ink sm:text-[2rem]">What decides your price</h2>
            {typicalSetupExample && (
              <p className="mt-5 border-l-4 border-lime bg-white py-3 pl-4 pr-3 text-[15px] leading-relaxed text-[#2f393f]">
                <strong className="text-ink">Example setup:</strong> {typicalSetupExample.description}
              </p>
            )}
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {factors.map((f) => (
              <div key={f.title} className="grid gap-1 py-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
                <dt className="text-lg font-semibold text-ink">{f.title}</dt>
                <dd className="text-[15px] leading-relaxed text-[#2f393f]">{f.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="on-ink mt-20 rounded-[8px] bg-ink p-7 text-white sm:p-10" aria-labelledby="included-heading">
        <h2 id="included-heading" className="text-[1.75rem] font-bold leading-tight sm:text-[2rem]">What is included in every plan</h2>
        <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[15px] leading-snug text-white/90">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-lime" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section id="quote" className="mt-20 scroll-mt-28" aria-labelledby="quote-heading">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div>
            <h2 id="quote-heading" className="text-[1.75rem] font-bold leading-tight text-ink sm:text-[2rem]">Get a quote for your gym</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[#2f393f]">
              Share a few details and we will send a proposal for your setup. Prefer to talk first? You can{" "}
              <Link href="/contact#demo" className="fv-link font-medium">book a demo</Link>{" "}
              instead.
            </p>
          </div>
          <div className="fv-card p-6 sm:p-8">
            <DemoForm variant="quote" />
          </div>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="compare-heading">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div>
            <h2 id="compare-heading" className="text-[1.75rem] font-bold leading-tight text-ink sm:text-[2rem]">
              Comparing gym membership software price quotes
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[#2f393f]">
              Two quotes with the same headline number can end up very different a year later. Ask every vendor, us
              included, these questions before you decide:
            </p>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {vendorQuestions.map((q, i) => (
              <li key={q} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 py-4 text-[15px] leading-relaxed text-[#2f393f]">
                <span className="tnum font-display text-lg font-semibold text-mute">{String(i + 1).padStart(2, "0")}</span>
                {q}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-[1.75rem] font-bold leading-tight text-ink sm:text-[2rem]">Pricing questions</h2>
        <dl className="mt-6 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <div key={f.q} className="grid gap-2 py-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
              <dt className="text-base font-semibold text-ink">{f.q}</dt>
              <dd className="text-[15px] leading-relaxed text-[#2f393f]">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-12 border-t border-line pt-6 text-sm leading-relaxed text-mute">
        All prices are in Indian Rupees (INR) and exclude applicable taxes (GST) unless stated otherwise. Payments are
        processed securely through Razorpay. Subscription fees are non-refundable per our{" "}
        <Link href="/refund" className="fv-link font-medium">Refund Policy</Link>.
        Questions? Email{" "}
        <a href={`mailto:${contact.email}`} className="fv-link font-medium">{contact.email}</a>{" "}
        or read about{" "}
        <Link href="/about" className="fv-link font-medium">Fitvario</Link>.
      </div>

      <RelatedLinks title="See what you get" paths={["/features", "/features/gym-crm", "/features/whatsapp-reminders"]} />
    </PageShell>
  );
}
