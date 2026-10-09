import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata = buildMetadata("/delete-account");

export default function DeleteAccountPage() {
  return (
    <PageShell>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Delete Your Fitvario Account</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-slate-600">
        You have the right to delete your account and associated personal data at any time, in line with
        India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act) and Google Play Store data deletion
        requirements.
      </p>

      <div className="mt-10 space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Option 1 — Delete from app or web</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600">
            <li>Open the Fitvario web dashboard or Android member app.</li>
            <li>Go to <strong className="text-slate-800">Account Settings</strong>.</li>
            <li>Select <strong className="text-slate-800">Delete Account</strong>.</li>
            <li>Confirm your identity and submit the deletion request.</li>
          </ol>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Option 2 — Email request</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
            Email us at{" "}
            <a href="mailto:support@fitvario.com?subject=Account%20Deletion%20Request" className="font-semibold text-teal-700 underline-offset-2 hover:underline">
              support@fitvario.com
            </a>{" "}
            with the subject <em>&quot;Account Deletion Request&quot;</em>. Include your registered email address
            and gym/organization name for verification.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-sm font-semibold text-amber-900">What happens after deletion</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-amber-800">
          <li>Your account and personal data will be <strong>deleted within 7 days</strong> of the verified request.</li>
          <li>Backup copies are purged within 30 days.</li>
          <li>Certain data (e.g. financial transaction records) may be retained for up to 7 years to comply with Indian tax and accounting law.</li>
          <li>For gym organizations: member data deletion must be requested by the gym owner or in accordance with their data retention policies.</li>
        </ul>
      </div>

      <p className="mt-10 text-sm leading-relaxed text-slate-500">
        For more information on your data rights, see our{" "}
        <Link href="/privacy" className="font-semibold text-teal-700 underline-offset-2 hover:underline">
          Privacy Policy
        </Link>{" "}
        or contact our{" "}
        <Link href="/grievance" className="font-semibold text-teal-700 underline-offset-2 hover:underline">
          Grievance Officer
        </Link>
        .
      </p>
    </PageShell>
  );
}
