import Link from "next/link";
import { buildMetadata, formatDate } from "@/lib/seo";
import { getPage } from "@/config/pages";
import { contact } from "@/config/site";
import { founder } from "@/config/proof";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClosingCta } from "@/components/ClosingCta";

export const metadata = buildMetadata("/about");

export default function AboutPage() {
  const page = getPage("/about");
  return (
    <PageShell>
      <Breadcrumbs path="/about" />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">About Fitvario</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {formatDate(page.updated)}</p>

      <p className="mt-8 text-[17px] leading-relaxed text-slate-600">
        Fitvario is gym management software from Bhopal, built for Indian gym owners and front-desk teams who need
        one place to run memberships, attendance, leads, staff and revenue, instead of a patchwork of spreadsheets,
        registers and WhatsApp groups. It is a cloud product with web dashboards for gym owners and staff, and an
        Android app for members.
      </p>
      <p className="mt-6 text-[17px] leading-relaxed text-slate-600">
        What it covers: QR attendance, a CRM with follow-up dates, workout and diet plans, measurement history and
        progress, expense tracking, analytics dashboards, referral rewards, automated WhatsApp, SMS and push
        reminders, and an online store for gym products. Payments for Fitvario subscriptions run through Razorpay.
      </p>
      <p className="mt-6 text-[17px] leading-relaxed text-slate-600">
        Whether you run one gym or a franchise group, Fitvario supports several branches under one account, with
        revenue and attendance comparison across them. See the full list on the{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          features page
        </Link>
        , or check{" "}
        <Link href="/pricing" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          how pricing works
        </Link>
        .
      </p>

      {founder && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">{founder.name}</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{founder.bio}</p>
        </section>
      )}

      <section className="mt-10" aria-labelledby="security-heading">
        <h2 id="security-heading" className="text-lg font-semibold text-slate-900">How we look after your data</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
          <li>Every connection between your browser, the app and our servers is encrypted.</li>
          <li>Each gym&apos;s data is kept separate from every other gym&apos;s.</li>
          <li>Staff see only the modules you give them access to, and every action is logged.</li>
          <li>Backups run automatically every day.</li>
        </ul>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
          Read the{" "}
          <Link href="/privacy" className="font-medium text-teal-700 underline-offset-2 hover:underline">Privacy Policy</Link>
          , or contact the{" "}
          <Link href="/grievance" className="font-medium text-teal-700 underline-offset-2 hover:underline">Grievance Officer</Link>{" "}
          or{" "}
          <Link href="/support" className="font-medium text-teal-700 underline-offset-2 hover:underline">Support</Link>.
        </p>
      </section>

      <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-base font-semibold text-slate-900">Contact</h2>
        <div className="mt-4 space-y-2 text-[15px] text-slate-600">
          <p><strong className="text-slate-800">Product:</strong> Fitvario</p>
          <p><strong className="text-slate-800">Location:</strong> Bhopal, Madhya Pradesh, India</p>
          <p>
            <strong className="text-slate-800">Support:</strong>{" "}
            <a href={`mailto:${contact.email}`} className="font-medium text-teal-700 underline-offset-2 hover:underline">
              {contact.email}
            </a>
          </p>
        </div>
      </div>

      <ClosingCta location="about-closing" />
    </PageShell>
  );
}
