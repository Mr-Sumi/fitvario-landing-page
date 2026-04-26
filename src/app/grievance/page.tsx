import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Grievance Officer",
  description:
    "Fitvario Grievance Officer contact — complaints under IT Act 2000, IT Rules 2021, and DPDP Act 2023. Email support@fitvario.com.",
  alternates: { canonical: "https://fitvario.com/grievance" },
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-lg font-semibold text-slate-900 first:mt-8">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{children}</p>;
}

export default function GrievancePage() {
  return (
    <PageShell wide>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Grievance Officer</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: 26 April 2026</p>

      <P>
        In compliance with the Information Technology Act, 2000 (as amended) and the Information Technology
        (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, Fitvario has designated a Grievance
        contact to address complaints, concerns, or reports regarding content or use of our platform.
      </P>

      <H2>Grievance contact — Product &amp; service complaints</H2>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 text-[15px] leading-relaxed text-slate-700">
        <p><strong className="text-slate-900">For:</strong> Content complaints, data rights, platform misuse, billing, and general service grievances.</p>
        <p className="mt-3">
          <strong className="text-slate-900">Email:</strong>{" "}
          <a href="mailto:support@fitvario.com" className="font-medium text-teal-700 underline-offset-2 hover:underline">
            support@fitvario.com
          </a>
        </p>
        <p className="mt-2"><strong className="text-slate-900">Product:</strong> Fitvario</p>
        <p className="mt-2"><strong className="text-slate-900">Location:</strong> Bhopal, Madhya Pradesh, India</p>
        <p className="mt-3 text-sm text-slate-500">Complaints acknowledged within 24 hours · Resolved within 15 days</p>
      </div>

      <H2>Technical &amp; infrastructure contact</H2>
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 text-[15px] leading-relaxed text-slate-700">
        <p className="text-sm leading-relaxed text-slate-600">
          For matters related to server infrastructure, technical data processing, hosting, and related
          engineering concerns—contact the technology partner responsible for platform infrastructure:
        </p>
        <p className="mt-3">
          <strong className="text-slate-900">Email:</strong>{" "}
          <a href="mailto:contact@sumigyan.in" className="font-medium text-teal-700 underline-offset-2 hover:underline">
            contact@sumigyan.in
          </a>
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Note: Sumigyan.in is the technology agency responsible for building and maintaining the Fitvario platform.
          All product and service complaints should still be directed to support@fitvario.com first.
        </p>
      </div>

      <H2>How to raise a grievance</H2>
      <P>
        Email{" "}
        <a href="mailto:support@fitvario.com" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          support@fitvario.com
        </a>{" "}
        with the subject line <em>&quot;Grievance — [brief description]&quot;</em> and include:
      </P>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
        <li>Your full name and registered email or phone number.</li>
        <li>A clear description of the issue, content, or concern.</li>
        <li>Relevant screenshots, URLs, or supporting information if applicable.</li>
        <li>The nature of your request — content removal, data correction, account deletion, billing dispute, etc.</li>
      </ul>

      <H2>Response timeline</H2>
      <P>
        We will acknowledge your grievance within <strong className="text-slate-800">24 hours</strong> of receipt and
        aim to resolve it within <strong className="text-slate-800">15 days</strong> from the date of acknowledgement,
        as required under applicable law. If additional time is needed, we will inform you of the reason and the
        expected resolution date.
      </P>

      <H2>Data protection grievances (DPDP Act 2023)</H2>
      <P>
        For grievances related to personal data processing under India&apos;s Digital Personal Data Protection Act,
        2023, email{" "}
        <a href="mailto:support@fitvario.com" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          support@fitvario.com
        </a>
        . If you remain dissatisfied after our response, you may approach the Data Protection Board of India once it
        is constituted, or another competent supervisory authority as applicable.
      </P>

      <H2>Consumer grievances</H2>
      <P>
        For subscription, billing, or service-related disputes, also refer to our{" "}
        <a href="/refund" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Refund Policy
        </a>
        . If your complaint remains unresolved, you may file with the National Consumer Helpline (NCH) at
        1800-11-4000 or approach a consumer forum under the Consumer Protection Act, 2019.
      </P>

      <p className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
        <strong className="text-slate-800">Note.</strong> This page is provided in compliance with Indian law. For
        legal proceedings, courts of competent jurisdiction in India shall apply.
      </p>
    </PageShell>
  );
}
