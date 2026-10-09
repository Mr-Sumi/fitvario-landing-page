import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/PageShell";

export const metadata = buildMetadata("/contact");

export default function ContactPage() {
  return (
    <PageShell>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Contact Us</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-slate-600">
        Questions about the platform, pricing, or a demo — reach out and we&apos;ll get back to you within 24 hours
        on business days.
      </p>

      {/* Contact details */}
      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</p>
            <a
              href="mailto:support@fitvario.com"
              className="mt-2 inline-block text-xl font-semibold text-teal-700 underline-offset-2 hover:underline"
            >
              support@fitvario.com
            </a>
            <p className="mt-1 text-sm text-slate-500">Response within 24 hours on business days</p>
          </div>

          <div className="border-t border-slate-100 pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Registered address</p>
            <address className="mt-2 not-italic text-[15px] leading-relaxed text-slate-700">
              Fitvario<br />
              Bhopal, Madhya Pradesh<br />
              India
            </address>
          </div>
        </div>
      </div>

      {/* Demo request */}
      <section
        id="demo"
        className="mt-10 scroll-mt-28 rounded-xl border border-teal-200 bg-teal-50/60 p-8 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-slate-900">Request a demo</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Tell us about your gym and we&apos;ll schedule a walkthrough — we&apos;ll show you memberships, QR
          attendance, the CRM, the member app, and answer every question you have. No obligation.
        </p>
        <div className="mt-5 rounded-lg border border-teal-200 bg-white p-5 text-sm leading-relaxed text-slate-600">
          <p className="font-semibold text-slate-800">When you email us, mention:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Your gym name and city.</li>
            <li>Approximate number of active members.</li>
            <li>Number of branches (if more than one).</li>
            <li>Features you are most interested in.</li>
          </ul>
        </div>
        <a
          href="mailto:support@fitvario.com?subject=Fitvario%20demo%20request"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-teal-600 px-6 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          Email to request a demo
        </a>
      </section>

      {/* Grievance */}
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Grievance Officer</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          For data, content, or platform complaints under India&apos;s IT Act 2000 and DPDP Act 2023:
        </p>
        <p className="mt-3 text-sm text-slate-700">
          <strong className="text-slate-800">Email:</strong>{" "}
          <a href="mailto:support@fitvario.com" className="font-medium text-teal-700 underline-offset-2 hover:underline">
            support@fitvario.com
          </a>
        </p>
        <a href="/grievance" className="mt-3 inline-block text-sm font-semibold text-teal-700 underline-offset-2 hover:underline">
          View grievance details →
        </a>
      </section>

      <p className="mt-8 text-sm leading-relaxed text-slate-500">
        By contacting us you acknowledge our{" "}
        <a href="/privacy" className="font-medium text-teal-700 underline-offset-2 hover:underline">Privacy Policy</a>
        {" "}and{" "}
        <a href="/terms" className="font-medium text-teal-700 underline-offset-2 hover:underline">Terms of Service</a>.
      </p>
    </PageShell>
  );
}
