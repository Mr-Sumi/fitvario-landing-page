import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Fitvario gym management software pricing — custom plans based on locations, active members, ecommerce volume, and enabled modules. Contact us for a quote.",
  alternates: { canonical: "https://fitvario.com/pricing" },
};

const included = [
  "Multi-gym & franchise management",
  "Web dashboards for owners and staff",
  "Branded Android app for members",
  "QR attendance with optional biometrics",
  "CRM, leads, and automated follow-ups",
  "Workout & diet plan builder with media",
  "Membership, renewal & invoice management",
  "WhatsApp & SMS messaging credits",
  "Push notifications for members",
  "Payments via Razorpay (UPI, card, net banking)",
  "Ecommerce product listings",
  "Analytics, reports, and exports (Excel/PDF)",
  "Multi-branch performance comparison",
  "Staff access controls and HR basics",
  "Daily automated cloud backups",
  "Encrypted data & secure connections",
];

export default function PricingPage() {
  return (
    <PageShell>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Pricing</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-slate-600">
        Fitvario pricing is custom-quoted based on your gym&apos;s specific setup. Pricing factors include:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
        <li>Number of active locations / branches</li>
        <li>Estimated active members</li>
        <li>Ecommerce and messaging credit volume</li>
        <li>Modules and integrations enabled</li>
      </ul>

      <div className="mt-10 rounded-xl border border-teal-200 bg-teal-50/50 p-7">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">What&apos;s included in all plans</p>
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
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Get a custom quote</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
          Share a bit about your gym and we&apos;ll send a tailored proposal—usually within 1–2 business days.
        </p>
        <a
          href="mailto:support@fitvario.com?subject=Fitvario%20pricing%20enquiry"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-teal-600 px-6 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          Email for pricing
        </a>
        <p className="mt-4">
          <Link href="/contact#demo" className="text-sm font-semibold text-teal-700 underline-offset-2 hover:underline">
            Or request a demo first →
          </Link>
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm text-slate-500">
        All prices are in Indian Rupees (INR) and exclude applicable taxes (GST) unless stated otherwise. Payments
        are processed securely via Razorpay. Subscription fees are non-refundable per our{" "}
        <Link href="/refund" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Refund Policy
        </Link>
        .
      </div>
    </PageShell>
  );
}
