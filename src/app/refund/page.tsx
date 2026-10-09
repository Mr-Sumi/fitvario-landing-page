import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = buildMetadata("/refund");

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-lg font-semibold text-slate-900 first:mt-8">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{children}</p>;
}

export default function RefundPage() {
  return (
    <PageShell wide>
      <Breadcrumbs path="/refund" />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">Refund &amp; Cancellation Policy — Fitvario</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: 26 April 2026</p>
      <P>
        This Refund and Cancellation Policy explains how refunds may apply to Fitvario software subscriptions,
        messaging credits, and consumer purchases made through mobile app stores. Specific terms in your order form or
        enterprise agreement may override this policy where they explicitly say so. This policy is governed by Indian
        law, including the Consumer Protection Act, 2019.
      </P>

      <H2>1. SaaS subscriptions (direct from Fitvario)</H2>
      <P>
        Unless your contract states otherwise, subscription fees are generally <strong className="text-slate-800">non-refundable
        for partial billing periods</strong>. If you cancel your subscription:
      </P>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
        <li>You retain full access until the end of the current paid billing period.</li>
        <li>Your subscription will not auto-renew for the next period.</li>
        <li>No partial refund is issued for the remaining days unless a billing error occurred.</li>
      </ul>
      <P>
        We may issue refunds or credits at our discretion in the following cases:
      </P>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
        <li>Service was materially unavailable for an extended period due to our fault (not force majeure).</li>
        <li>You were charged incorrectly due to a billing error on our side.</li>
        <li>Required by applicable Indian consumer protection law.</li>
      </ul>

      <H2>2. Razorpay payment gateway</H2>
      <P>
        Payments on Fitvario are processed by <strong className="text-slate-800">Razorpay Financial Solutions Pvt. Ltd.</strong>,
        an RBI-authorised payment aggregator. Once a payment is captured by Razorpay, refunds (where applicable) are
        processed back to the original payment instrument. Refund timelines depend on the payment method:
      </P>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
        <li><strong className="text-slate-800">UPI / Net Banking:</strong> 3–5 business days to the source account.</li>
        <li><strong className="text-slate-800">Debit / Credit Card:</strong> 5–7 business days, subject to the issuing bank&apos;s processing time.</li>
        <li><strong className="text-slate-800">Wallet:</strong> 1–3 business days to the wallet.</li>
      </ul>
      <P>
        Once we initiate a refund, Fitvario has no control over the exact processing time at Razorpay or the bank.
        You can track refund status via your bank statement or Razorpay&apos;s customer portal.
      </P>

      <H2>3. Messaging credits &amp; add-ons (SMS / WhatsApp)</H2>
      <P>
        Prepaid credits for SMS, WhatsApp Business messaging, or similar channels are generally{" "}
        <strong className="text-slate-800">non-refundable once purchased</strong>, as credits are pre-allocated to
        your account. Unused credits expire per product terms. However:
      </P>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
        <li>If you were charged for credits not received due to a system error, contact support within 7 days.</li>
        <li>Credits consumed for messages already delivered are non-refundable.</li>
        <li>WhatsApp Business API message delivery is subject to Meta&apos;s policies; failures due to Meta&apos;s infrastructure are outside our control.</li>
      </ul>

      <H2>4. Google Play Store purchases</H2>
      <P>
        In-app purchases or subscriptions completed through the Google Play Store are processed by Google and are
        governed by{" "}
        <strong className="text-slate-800">Google Play&apos;s refund policies</strong>. Refund requests for Play Store
        purchases must be submitted through Google Play directly (within 48 hours of purchase for automatic refund, or
        via Google&apos;s support for later requests). Fitvario does not control Google&apos;s refund decisions.
      </P>

      <H2>5. Chargebacks &amp; disputes</H2>
      <P>
        If you initiate a chargeback or payment dispute through your bank or card issuer without first contacting us,
        we may immediately suspend your access pending resolution. We strongly encourage you to contact us at{" "}
        <a href="mailto:support@fitvario.com" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          support@fitvario.com
        </a>{" "}
        first—we aim to resolve genuine issues within 5 business days. Fraudulent chargeback attempts may result in
        permanent account suspension.
      </P>

      <H2>6. Force majeure</H2>
      <P>
        Refunds will not be provided for service interruptions caused by events beyond our reasonable control,
        including natural disasters, government orders, third-party infrastructure failures (payment gateway,
        messaging providers, etc.), or network outages.
      </P>

      <H2>7. How to request a refund</H2>
      <P>
        Email{" "}
        <a href="mailto:support@fitvario.com" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          support@fitvario.com
        </a>{" "}
        with the subject line <em>&quot;Refund Request — [Your Gym Name]&quot;</em> and include:
      </P>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
        <li>Your registered organization/gym name and email address.</li>
        <li>Razorpay Payment ID or transaction reference number.</li>
        <li>Amount charged and date of transaction.</li>
        <li>Reason for the refund request with supporting details.</li>
      </ul>
      <P>
        We will acknowledge your request within <strong className="text-slate-800">2 business days</strong> and aim to
        resolve eligible refunds within <strong className="text-slate-800">7 business days</strong> of approval.
      </P>

      <p className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
        <strong className="text-slate-800">Disclaimer.</strong> Final refund eligibility depends on your specific
        contract, payment method, and applicable Indian consumer protection law. This page is informational and not a
        substitute for legal advice. For billing disputes under Indian law, you may also contact the National Consumer
        Helpline (NCH) at 1800-11-4000.
      </p>
      <p className="mt-8 flex flex-wrap gap-4">
        <Link href="/terms" className="text-sm font-semibold text-teal-700 hover:underline">
          ← Terms of Service
        </Link>
        <Link href="/contact" className="text-sm font-semibold text-teal-700 hover:underline">
          Contact support →
        </Link>
      </p>
    </PageShell>
  );
}
