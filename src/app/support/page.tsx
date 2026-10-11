import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = buildMetadata("/support");

export default function SupportPage() {
  return (
    <PageShell>
      <Breadcrumbs path="/support" />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">Fitvario Support</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-slate-600">
        We&apos;re here to help you get the most out of Fitvario—whether you&apos;re setting up your gym, troubleshooting
        an issue, or need billing help.
      </p>

      <p className="mt-2 text-sm text-slate-500">Last updated: 10 October 2026</p>


      <div className="mt-10 space-y-5">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Email support</h2>
          <p className="mt-2 text-sm text-slate-600">Our primary support channel:</p>
          <a
            href="mailto:support@fitvario.com"
            className="mt-3 inline-block text-lg font-semibold text-teal-700 underline-offset-2 hover:underline"
          >
            support@fitvario.com
          </a>
          <p className="mt-2 text-sm text-slate-500">Response time: 24–48 hours on business days</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">What to include in your support email</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
            <li>Your registered gym/organization name and email address.</li>
            <li>A clear description of the issue or question.</li>
            <li>Screenshots or screen recordings if relevant.</li>
            <li>Your phone model and Android version, for app issues.</li>
            <li>Any error messages you see.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Common help topics</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              "Setting up QR attendance and member codes",
              "Importing member data from spreadsheets",
              "Configuring WhatsApp / SMS messaging credits",
              "Setting up subscription plans and pricing",
              "Staff roles, access controls, and permissions",
              "Billing, invoices, and Razorpay payments",
              "Android member app installation and OTP login",
              "Account deletion requests",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-slate-600">
                <span className="mt-0.5 h-4 w-4 shrink-0 text-teal-600">
                  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.707 6.707l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L7 8.586l3.293-3.293a1 1 0 011.414 1.414z" />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
          <p className="text-sm text-slate-600">
            For data or content grievances under Indian law, contact our{" "}
            <Link href="/grievance" className="font-semibold text-teal-700 underline-offset-2 hover:underline">
              Grievance Officer
            </Link>
            . For refund requests, see our{" "}
            <Link href="/refund" className="font-semibold text-teal-700 underline-offset-2 hover:underline">
              Refund Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </PageShell>
  );
}
