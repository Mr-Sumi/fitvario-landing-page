import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/PageShell";

export const metadata = buildMetadata("/privacy");

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-lg font-semibold text-slate-900 first:mt-8">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{children}</p>;
}

export default function PrivacyPage() {
  return (
    <PageShell wide>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Privacy Policy — Fitvario</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: 26 April 2026</p>
      <P>
        Fitvario (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides a cloud-based gym management software
        platform (web dashboards and mobile applications) for fitness businesses and their members. This Privacy Policy
        describes how we collect, use, store, share, and protect personal information when you use our websites,
        products, or services (collectively, the &quot;Service&quot;).
      </P>
      <P>
        <strong className="text-slate-800">Data Controller / Data Fiduciary.</strong> For personal data processed in
        connection with the Fitvario Service, the data fiduciary (as defined under India&apos;s Digital Personal Data
        Protection Act, 2023) and data controller is Fitvario, registered in Bhopal, Madhya Pradesh, India. Contact:{" "}
        <a href="mailto:support@fitvario.com" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          support@fitvario.com
        </a>
        . Where a gym or organization uses Fitvario to process data about its own members or staff, that organization
        may also act as an independent controller or data fiduciary for certain processing—we process such data on
        their instructions as a data processor where applicable.
      </P>
      <P>
        <strong className="text-slate-800">Governing law.</strong> This policy is governed by and intended to comply
        with India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act), the Information Technology Act, 2000
        (as amended), and other applicable Indian and international privacy laws.
      </P>

      <H2>1. Information we collect</H2>
      <P>Depending on your role (visitor, gym operator, staff, or end-user member), we may collect:</P>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
        <li>
          <strong className="text-slate-800">Identity &amp; contact:</strong> name, email address, phone number, OTP
          verification data, profile photo (if provided).
        </li>
        <li>
          <strong className="text-slate-800">Account &amp; business:</strong> gym name, branding, address, timings,
          facilities, subscription or plan selections, billing identifiers, and configuration you provide.
        </li>
        <li>
          <strong className="text-slate-800">Members &amp; operations:</strong> membership status, attendance
          (including QR or biometric events where enabled), class bookings, measurements, assigned workout/diet
          content consumption signals, and CRM or enquiry records you or your team create.
        </li>
        <li>
          <strong className="text-slate-800">Health &amp; fitness related (sensitive data):</strong> BMI, calorie
          estimates, progress metrics, and similar data you or members enter—treated as sensitive personal data where
          required under the DPDP Act 2023 and applicable law. Explicit consent is obtained before processing.
        </li>
        <li>
          <strong className="text-slate-800">Commerce &amp; payments:</strong> product interest, orders, payment
          references, and related metadata. Full payment card details are handled exclusively by Razorpay (our
          payment gateway partner) and are never stored on our servers.
        </li>
        <li>
          <strong className="text-slate-800">Communications:</strong> messages sent through the platform, support
          tickets, WhatsApp/SMS delivery logs, email delivery records, and marketing preferences where applicable.
        </li>
        <li>
          <strong className="text-slate-800">Technical &amp; usage:</strong> IP address, device type, operating
          system, browser, app version, cookies or similar identifiers (including advertising identifiers), diagnostic
          logs, and security audit trails.
        </li>
        <li>
          <strong className="text-slate-800">Media:</strong> images and videos you upload (e.g., gym gallery, workout
          content), stored in our cloud object storage provider.
        </li>
        <li>
          <strong className="text-slate-800">Location (limited):</strong> where QR attendance is configured
          location-aware, we may process signals to validate check-in integrity.
        </li>
        <li>
          <strong className="text-slate-800">Advertising data (if marketing enabled):</strong> Meta Pixel may collect
          page-view events, conversion signals, and device identifiers when you interact with our marketing website.
          See Section 4 and our Cookie Policy for details.
        </li>
      </ul>

      <H2>2. How we use information</H2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
        <li>To provide, operate, secure, and improve the Fitvario Service (including multi-gym data isolation and access controls).</li>
        <li>To authenticate users, send OTPs, and deliver transactional notifications (SMS, WhatsApp, email, push).</li>
        <li>To process subscriptions, messaging credits, payments via Razorpay, and ecommerce flows.</li>
        <li>To generate analytics, exports, and reports for authorized roles.</li>
        <li>To comply with law, respond to lawful requests, and enforce our Terms of Service.</li>
        <li>To send product updates, promotional messages, or marketing (with appropriate legal basis and opt-out).</li>
        <li>To measure advertising effectiveness via Meta Pixel and similar tools (where you consent).</li>
        <li>To detect and prevent fraud, abuse, and security incidents.</li>
      </ul>

      <H2>3. Legal bases for processing (DPDP Act 2023 &amp; applicable law)</H2>
      <P>
        Under India&apos;s Digital Personal Data Protection Act, 2023, and other applicable laws, we process your
        personal data based on:
      </P>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
        <li>
          <strong className="text-slate-800">Consent:</strong> For health/sensitive data, optional marketing
          communications, analytics cookies, and Meta Pixel. You may withdraw consent at any time.
        </li>
        <li>
          <strong className="text-slate-800">Contractual necessity:</strong> To perform our agreement with you
          (provide subscriptions, attendance, payments, etc.).
        </li>
        <li>
          <strong className="text-slate-800">Legal obligation:</strong> Where required by Indian law (IT Act,
          tax/accounting requirements, court orders).
        </li>
        <li>
          <strong className="text-slate-800">Legitimate interests:</strong> For security, fraud prevention, service
          improvement, and direct marketing to existing customers, balanced against your rights.
        </li>
      </ul>

      <H2>4. Third-party processors &amp; integrations</H2>
      <P>
        We use the following subprocessors and third-party services. Specific vendor versions may change; material
        changes will be disclosed:
      </P>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
        <li>
          <strong className="text-slate-800">Razorpay Financial Solutions Pvt. Ltd.</strong> — Payment gateway for
          subscriptions, credits, and ecommerce transactions. Razorpay is PCI DSS compliant and RBI-authorised.
          Card data is processed directly by Razorpay and not stored by us. Razorpay&apos;s Privacy Policy governs
          data it collects during payment flows.
        </li>
        <li>
          <strong className="text-slate-800">Meta Platforms, Inc. (Meta Pixel / Meta Business):</strong> We use
          Meta Pixel on our marketing website to measure ad campaign effectiveness and show relevant advertisements
          on Facebook and Instagram. Meta may receive event data (page views, conversions) and device identifiers.
          Meta&apos;s Data Policy governs their use of this data. You can opt out via our Cookie Policy.
        </li>
        <li>
          <strong className="text-slate-800">WhatsApp Business Cloud API (Meta Platforms):</strong> We send
          transactional and operational messages (OTPs, attendance alerts, fee reminders) via WhatsApp&apos;s
          official Business Cloud API. Your phone number is shared with Meta to facilitate message delivery, subject
          to WhatsApp&apos;s Business Policy. Only approved message templates are used.
        </li>
        <li>
          <strong className="text-slate-800">Zoho Mail (Zoho Corporation Pvt. Ltd.):</strong> Our business email
          and support communications are handled via Zoho Mail. Support emails you send us are processed and stored
          on Zoho&apos;s infrastructure under their Privacy Policy.
        </li>
        <li>
          <strong className="text-slate-800">SMS gateway provider(s):</strong> For OTP delivery and SMS reminders.
          Your phone number is transmitted to the SMS provider to facilitate delivery.
        </li>
        <li>
          <strong className="text-slate-800">Firebase Cloud Messaging (Google LLC):</strong> For push notifications
          to Android member app users. Device tokens are shared with Firebase to enable message delivery. Governed
          by Google&apos;s Privacy Policy.
        </li>
        <li>
          <strong className="text-slate-800">Google Play Store (Google LLC):</strong> The Fitvario member app is
          distributed via Google Play. Google processes app installation and usage data per their Privacy Policy.
          The in-app Data Safety section on Play Store reflects data collected by the app.
        </li>
        <li>
          <strong className="text-slate-800">Cloud hosting &amp; object storage:</strong> AWS S3-class services for
          media storage (gym gallery, workout content). Data is stored with encryption at rest.
        </li>
        <li>
          <strong className="text-slate-800">Analytics &amp; error monitoring (optional):</strong> We may use
          aggregated analytics or error tracking tools to improve performance.
        </li>
      </ul>
      <P>All processors are engaged under contractual terms requiring appropriate data protection measures.</P>

      <H2>5. Cookies &amp; similar technologies</H2>
      <P>
        We use cookies, pixels (including Meta Pixel), local storage, and mobile SDK identifiers for session
        management, security, preferences, analytics, and marketing. See our{" "}
        <a href="/cookies" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Cookie Policy
        </a>{" "}
        for details on categories, specific technologies, and your choices.
      </P>

      <H2>6. Data retention</H2>
      <P>
        We retain personal data only as long as needed for the purposes described, plus legal, tax, accounting, and
        dispute resolution requirements (typically 7 years for financial records under Indian law). Gym organizations
        may configure data export or deletion within product limits. Backup copies may persist for a limited period
        (typically up to 30 days) after deletion requests are processed.
      </P>

      <H2>7. Security</H2>
      <P>
        We implement administrative, technical, and organizational measures including: encrypted connections across
        all services; authenticated and access-controlled APIs; staff permission controls (each role accesses only
        what is permitted); encryption of personal data at rest; private and access-restricted media delivery; daily
        automated backups; access logging and security audit trails. Payment data security is delegated to Razorpay
        (PCI DSS compliant). No transmission or storage method is 100% secure; we continuously improve our safeguards.
      </P>

      <H2>8. International data transfers</H2>
      <P>
        Our primary infrastructure is based in India. Some third-party processors (e.g. Meta, Firebase, cloud storage)
        operate internationally. Where data is transferred across borders, we ensure appropriate safeguards are in
        place as required by applicable Indian law, including data processing agreements with Standard Contractual
        Clauses or equivalent protections where applicable.
      </P>

      <H2>9. Your rights as a Data Principal (DPDP Act 2023)</H2>
      <P>
        Under India&apos;s DPDP Act 2023 and other applicable laws, you have the right to:
      </P>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
        <li><strong className="text-slate-800">Access:</strong> obtain a summary of personal data we hold about you.</li>
        <li><strong className="text-slate-800">Correction &amp; update:</strong> request we correct inaccurate or incomplete data.</li>
        <li><strong className="text-slate-800">Erasure (right to be forgotten):</strong> request deletion of your personal data, subject to legal retention requirements.</li>
        <li><strong className="text-slate-800">Withdraw consent:</strong> at any time, where processing is based on consent, without affecting prior processing.</li>
        <li><strong className="text-slate-800">Nomination:</strong> nominate another person to exercise data rights on your behalf in case of death or incapacity.</li>
        <li><strong className="text-slate-800">Grievance redressal:</strong> raise a complaint with our Grievance Officer (see Section 13 and our{" "}
          <a href="/grievance" className="font-medium text-teal-700 underline-offset-2 hover:underline">Grievance page</a>).
        </li>
        <li><strong className="text-slate-800">Data Protection Board:</strong> if unsatisfied with our response, lodge a complaint with India&apos;s Data Protection Board once constituted.</li>
      </ul>
      <P>
        Members should often contact their gym first; gym administrators should contact us at{" "}
        <a href="mailto:support@fitvario.com" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          support@fitvario.com
        </a>{" "}
        for account-level requests. We will verify your identity before fulfilling requests.
      </P>

      <H2>10. Children&apos;s data</H2>
      <P>
        Our Service is intended for businesses and their adult members. We do not knowingly collect personal data from
        children below the age of 18 (or the applicable minimum age in your jurisdiction) without verifiable parental
        consent. In compliance with the DPDP Act 2023, where a user is a child, we will seek verifiable parental
        consent before processing. If you believe we have inadvertently collected a child&apos;s data without consent,
        contact us for prompt deletion.
      </P>

      <H2>11. Data sharing</H2>
      <P>We do not sell your personal data. We may share data with:</P>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
        <li>Service providers and processors listed in Section 4 who assist in operating the platform.</li>
        <li>Your gym organization, as visible within the product permissions you configure.</li>
        <li>Government authorities, courts, or law enforcement when required by Indian law or a lawful order.</li>
        <li>A successor entity in a merger, acquisition, or asset sale, with advance notice where required by law.</li>
        <li>Meta Platforms, for advertising measurement via Meta Pixel (where consent is given).</li>
      </ul>

      <H2>12. Google Play &amp; app-specific disclosures</H2>
      <P>
        The Fitvario Android app (distributed via Google Play Store) collects data as described in this Privacy Policy
        and our Play Store Data Safety section. The app requests permissions including: Camera (QR scanning), Storage
        (downloading content/reports), Internet (core functionality), Notifications (push alerts), and Biometrics
        (optional attendance—where device supports it and user enables it). You can review and manage app permissions
        in your device settings. To delete your account and associated data, visit our{" "}
        <a href="/delete-account" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Delete Account
        </a>{" "}
        page.
      </P>

      <H2>13. Grievance Officer</H2>
      <P>
        In accordance with the Information Technology Act, 2000 and IT (Intermediary Guidelines) Rules, 2021, and in
        anticipation of the DPDP Act 2023, we have appointed a Grievance Officer:
      </P>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 text-[15px] leading-relaxed text-slate-700">
        <p>
          <strong className="text-slate-900">Email:</strong>{" "}
          <a href="mailto:support@fitvario.com" className="font-medium text-teal-700 underline-offset-2 hover:underline">
            support@fitvario.com
          </a>
        </p>
        <p className="mt-1"><strong className="text-slate-900">Product:</strong> Fitvario, India</p>
        <p className="mt-2 text-sm text-slate-500">Acknowledged within 24 hours · Resolved within 15 days</p>
      </div>
      <P>
        See our{" "}
        <a href="/grievance" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Grievance Officer page
        </a>{" "}
        for full details on how to raise a complaint.
      </P>

      <H2>14. Changes to this policy</H2>
      <P>
        We may update this Privacy Policy periodically. We will post the updated version with a new &quot;Last
        updated&quot; date. For material changes, we will provide additional notice (e.g. email or in-app
        notification) as required under the DPDP Act 2023 and other applicable law.
      </P>

      <H2>15. Contact us</H2>
      <P>
        Privacy-related questions:{" "}
        <a href="mailto:support@fitvario.com" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          support@fitvario.com
        </a>
      </P>
      <p className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
        <strong className="text-slate-800">Disclaimer.</strong> This policy is provided for transparency. It is not a
        substitute for legal advice. Consult qualified counsel for compliance with all laws applicable to your
        organization and jurisdiction.
      </p>
    </PageShell>
  );
}
