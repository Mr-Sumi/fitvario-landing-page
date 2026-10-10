import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/PageShell";
import { ThankYouTracker } from "@/components/ThankYouTracker";
import { contact, whatsappLink } from "@/config/site";

export const metadata = buildMetadata("/thank-you");

export default function ThankYouPage() {
  const wa = whatsappLink("Hi Fitvario, I just submitted the demo form on your website.");
  return (
    <PageShell>
      <ThankYouTracker />
      <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Request received</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Thanks, we have your request</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-slate-600">
        Someone from Fitvario will get back to you {contact.responseTime}
        {contact.hours ? ` (${contact.hours})` : ""}.
      </p>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">What happens next</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
          <li>We read what you sent and note your gym size and how you run things today.</li>
          <li>We contact you on the mobile number you gave to fix a time for the demo.</li>
          <li>In the demo we show the parts that matter to your gym and answer your questions.</li>
        </ol>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="thank-you"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-emerald-700 px-6 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Message us on WhatsApp
          </a>
        )}
        <Link
          href="/features"
          className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
        >
          See what Fitvario does
        </Link>
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Need something sooner? Email{" "}
        <a href={`mailto:${contact.email}`} className="font-medium text-teal-700 underline-offset-2 hover:underline">
          {contact.email}
        </a>
        .
      </p>
    </PageShell>
  );
}
