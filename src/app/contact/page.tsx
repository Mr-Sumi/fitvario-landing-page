import Link from "next/link";
import { buildMetadata, formatDate } from "@/lib/seo";
import { getPage } from "@/config/pages";
import { contact, whatsappLink } from "@/config/site";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DemoForm } from "@/components/DemoForm";

export const metadata = buildMetadata("/contact");

export default function ContactPage() {
  const page = getPage("/contact");
  const wa = whatsappLink("Hi Fitvario, I'd like to talk about my gym.");

  return (
    <PageShell>
      <Breadcrumbs path="/contact" />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">Contact Fitvario and request a demo</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-slate-600">
        Questions about the platform, pricing or a demo? Reach out and we will get back to you {contact.responseTime}.
      </p>
      <p className="mt-2 text-sm text-slate-500">Last updated: {formatDate(page.updated)}</p>

      {/* Demo request */}
      <section id="demo" className="mt-10 scroll-mt-28 rounded-xl border border-teal-200 bg-teal-50/60 p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-slate-900">Request a free demo</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Tell us about your gym and we will schedule a walkthrough of memberships, QR attendance, the CRM and the
          member app, and answer your questions. No obligation.
        </p>
        <div className="mt-6 rounded-lg bg-white p-5">
          <DemoForm variant="demo" />
        </div>
      </section>

      {/* Contact details */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Prefer to reach us directly?</h2>
        <div className="mt-5 space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-2 inline-block text-xl font-semibold text-teal-700 underline-offset-2 hover:underline"
            >
              {contact.email}
            </a>
            <p className="mt-1 text-sm text-slate-500">Reply {contact.responseTime}</p>
          </div>

          {wa && (
            <div className="border-t border-slate-100 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">WhatsApp</p>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="contact"
                className="mt-2 inline-flex h-12 items-center rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Chat with us on WhatsApp
              </a>
            </div>
          )}

          {contact.phoneNumber && (
            <div className="border-t border-slate-100 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Phone</p>
              <a
                href={`tel:+${contact.phoneNumber}`}
                data-cta="contact"
                className="mt-2 inline-block text-lg font-semibold text-teal-700 underline-offset-2 hover:underline"
              >
                +{contact.phoneNumber}
              </a>
            </div>
          )}

          {contact.hours && (
            <div className="border-t border-slate-100 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Working hours</p>
              <p className="mt-2 text-[15px] text-slate-700">{contact.hours}</p>
            </div>
          )}

          <div className="border-t border-slate-100 pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Registered address</p>
            <address className="mt-2 not-italic text-[15px] leading-relaxed text-slate-700">
              {contact.addressLines.map((l, i) => (
                <span key={l}>
                  {l}
                  {i < contact.addressLines.length - 1 && <br />}
                </span>
              ))}
            </address>
          </div>
        </div>
      </div>

      {/* Grievance */}
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Grievance Officer</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          For data, content or platform complaints under India&apos;s IT Act 2000 and DPDP Act 2023, see the{" "}
          <Link href="/grievance" className="font-semibold text-teal-700 underline-offset-2 hover:underline">
            Grievance Officer details
          </Link>
          . For product help, visit{" "}
          <Link href="/support" className="font-semibold text-teal-700 underline-offset-2 hover:underline">
            Support
          </Link>
          .
        </p>
      </section>

      <p className="mt-8 text-sm leading-relaxed text-slate-500">
        By contacting us you acknowledge our{" "}
        <Link href="/privacy" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Terms of Service
        </Link>
        .
      </p>
    </PageShell>
  );
}
