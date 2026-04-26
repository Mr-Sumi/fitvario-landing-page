import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Fitvario Terms of Service — acceptable use, subscriptions, Razorpay payments, disclaimers, governing law (India), and Grievance Officer.",
  alternates: { canonical: "https://fitvario.com/terms" },
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-lg font-semibold text-slate-900 first:mt-8">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{children}</p>;
}

export default function TermsPage() {
  return (
    <PageShell wide>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Terms of Service — Fitvario</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: 26 April 2026</p>
      <P>
        These Terms of Service (&quot;Terms&quot;) govern access to and use of Fitvario websites, web applications,
        Android mobile applications, and related services (collectively, the &quot;Service&quot;) provided by Fitvario
        (&quot;we&quot;, &quot;us&quot;), operated from India. By creating an account, clicking to accept, or using
        the Service, you agree to these Terms on behalf of yourself or the organization you represent.
      </P>
      <P>
        These Terms are an electronic contract under the Information Technology Act, 2000 (India). By accessing or
        using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and
        our{" "}
        <a href="/privacy" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Privacy Policy
        </a>
        .
      </P>

      <H2>1. The Service</H2>
      <P>
        Fitvario is a cloud-based gym management platform that may include: multi-gym administration, member and
        staff portals, QR and biometric attendance, CRM and leads management, workout and diet content, fitness
        progress tracking, class scheduling, SMS and WhatsApp Business messaging (via approved templates), push
        notifications, email communications, analytics and reports, ecommerce listings, messaging credit packs,
        and integrations with Razorpay (payments), Meta (optional advertising), and other third-party providers.
        Features depend on your plan and configuration.
      </P>

      <H2>2. Eligibility &amp; accounts</H2>
      <P>
        You must be at least 18 years of age and legally capable of entering a binding contract under Indian law. If
        you use the Service on behalf of a gym, company, or organization, you represent that you have authority to
        bind that entity to these Terms. You are responsible for maintaining the confidentiality of your login
        credentials and for all activity under your account. Notify us promptly of unauthorized access.
      </P>

      <H2>3. Gym organizations &amp; end users</H2>
      <P>
        Where a gym uses Fitvario to manage members, the gym is responsible for its relationship with those members,
        obtaining all lawful consents and notices (including for health-related data, WhatsApp/SMS marketing, biometric
        attendance, and any applicable DPDP Act 2023 requirements). Fitvario provides the platform as a data processor
        for member data on the gym&apos;s instructions; the gym acts as the data fiduciary for its member data.
      </P>

      <H2>4. Subscriptions, credits &amp; payments</H2>
      <P>
        Fees, billing cycles, taxes, and payment methods are as agreed at purchase or in your order form.
        Subscriptions and messaging credits (SMS/WhatsApp) may be purchased through Razorpay, our RBI-authorised
        payment gateway. By making a payment, you also agree to Razorpay&apos;s Terms of Service and Privacy Policy.
        App purchases via Google Play Store are governed by Google&apos;s policies.
      </P>
      <P>
        Late or failed payments may result in suspension of access. Unless otherwise stated, fees are non-refundable
        except as required by law or our{" "}
        <a href="/refund" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Refund Policy
        </a>
        .
      </P>

      <H2>5. Acceptable use</H2>
      <P>You agree not to:</P>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
        <li>Violate any applicable law, regulation, or third-party rights.</li>
        <li>Upload malware, conduct unauthorized scans, or interfere with the Service or its infrastructure.</li>
        <li>
          Misuse attendance, QR, biometric, or messaging features to harass, deceive, stalk, or track individuals
          without lawful authorization.
        </li>
        <li>
          Reverse engineer, decompile, or disassemble the Service (except where expressly permitted by applicable
          law), or resell or sublicense access without written consent.
        </li>
        <li>
          Send unsolicited commercial communications (spam) through SMS, WhatsApp, email, or push channels; or
          send messages outside the scope of approved WhatsApp Business message templates.
        </li>
        <li>
          Use the Service to process data of individuals without their lawful consent, particularly biometric data or
          health-sensitive data of minors, in violation of applicable law.
        </li>
        <li>
          Impersonate any person or entity or misrepresent your affiliation with any person or entity.
        </li>
      </ul>

      <H2>6. Content &amp; intellectual property</H2>
      <P>
        Fitvario retains all rights, title, and interest in the Service, software, branding, and documentation. You
        retain rights in content you upload; you grant us a worldwide, royalty-free license to host, process,
        transmit, and display such content solely to provide and improve the Service. You represent that you have all
        necessary rights, licenses, and consents for your content.
      </P>

      <H2>7. Third-party services</H2>
      <P>
        The Service integrates with third parties including Razorpay (payments), Meta / WhatsApp Business Cloud API
        (messaging and advertising), push notification providers, email delivery services, SMS gateways, and
        cloud infrastructure providers. Your use of these integrations may be subject to the respective third party&apos;s
        terms and privacy policies. We are not responsible for third-party outages, policy changes, or practices
        beyond our reasonable control.
      </P>

      <H2>8. Health &amp; fitness disclaimer</H2>
      <P>
        Workout, diet, BMI, calorie, and similar features are for general wellness and operational purposes only. They
        do not constitute medical advice, diagnosis, or treatment. Consult qualified healthcare professionals for
        medical decisions. Gyms are solely responsible for the accuracy and appropriateness of fitness content
        provided to their members.
      </P>

      <H2>9. Availability &amp; changes</H2>
      <P>
        We target high availability but do not guarantee uninterrupted access. Scheduled maintenance will be announced
        where practicable. We may modify, suspend, or discontinue features with reasonable notice. We may update these
        Terms; continued use after the effective date constitutes acceptance. Material changes that adversely affect
        your rights will require your explicit acceptance or allow you to terminate.
      </P>

      <H2>10. Confidentiality</H2>
      <P>
        Each party will protect the other&apos;s confidential information with at least the same care used for its own
        confidential information (and no less than reasonable care), and use it only in connection with the Service.
        Standard exceptions apply (public domain, independent development, lawful disclosure).
      </P>

      <H2>11. Limitation of liability</H2>
      <P>
        To the maximum extent permitted by applicable law, neither party will be liable for indirect, incidental,
        special, consequential, or punitive damages, or loss of profits, data, business opportunity, or goodwill,
        arising out of or related to the Service. Our total aggregate liability for all claims in any twelve-month
        period is limited to the fees you paid to us in that period (or, if none, ₹500 or equivalent). These
        limitations do not apply where prohibited by law, including applicable consumer protection laws in India.
      </P>

      <H2>12. Indemnification</H2>
      <P>
        You will defend, indemnify, and hold harmless Fitvario and its team from any claims, losses, or damages
        (including legal fees) arising from: your content, your breach of these Terms, your violation of applicable
        law or third-party rights, or your misuse of the Service—except to the extent caused by our gross negligence
        or willful misconduct.
      </P>

      <H2>13. Termination</H2>
      <P>
        You may stop using the Service and close your account at any time by contacting us. We may suspend or
        terminate your access for breach of these Terms, fraud, legal requirements, or prolonged non-payment. Upon
        termination, you may export your data within the grace period provided. Provisions that by nature survive
        termination (intellectual property, limitation of liability, indemnification, governing law) will survive.
      </P>

      <H2>14. Governing law &amp; disputes</H2>
      <P>
        These Terms are governed by the laws of India, including the Information Technology Act, 2000, the Consumer
        Protection Act, 2019, and the Digital Personal Data Protection Act, 2023, without regard to conflict-of-law
        principles. Any dispute arising from these Terms shall be subject to the exclusive jurisdiction of competent
        courts in India, subject to mandatory consumer rights in your jurisdiction.
      </P>
      <P>
        Before initiating any legal proceedings, parties agree to attempt good-faith resolution by contacting our
        Grievance Officer (see Section 15) within 30 days of the dispute arising.
      </P>

      <H2>15. Grievance Officer</H2>
      <P>
        In compliance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules,
        2021, our designated Grievance Officer is:
      </P>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 text-[15px] leading-relaxed text-slate-700">
        <p>
          <strong className="text-slate-900">Email:</strong>{" "}
          <a href="mailto:support@fitvario.com" className="font-medium text-teal-700 underline-offset-2 hover:underline">
            support@fitvario.com
          </a>
        </p>
        <p className="mt-1"><strong className="text-slate-900">Product:</strong> Fitvario, India</p>
      </div>
      <P>
        For full details, visit our{" "}
        <a href="/grievance" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Grievance Officer page
        </a>
        .
      </P>

      <H2>16. Contact</H2>
      <P>
        General queries:{" "}
        <a href="mailto:support@fitvario.com" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          support@fitvario.com
        </a>
      </P>
      <p className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
        <strong className="text-slate-800">Legal disclaimer.</strong> These Terms are a framework for using our
        platform. A qualified Indian law attorney should review and adapt them for your specific entity, contractual
        relationships, and applicable regulations (including data processing agreements if required).
      </p>
    </PageShell>
  );
}
