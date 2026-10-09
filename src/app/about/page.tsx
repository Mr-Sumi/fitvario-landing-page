import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata = buildMetadata("/about");

export default function AboutPage() {
  return (
    <PageShell>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">About Fitvario</h1>

      <p className="mt-8 text-[17px] leading-relaxed text-slate-600">
        Fitvario is gym management software built for Indian gym owners and front-desk teams who need one place to
        run memberships, attendance, leads, staff, and revenue—not a patchwork of spreadsheets and disconnected apps.
        The platform is designed as a cloud SaaS with role-based web experiences for platform administrators, gym
        owners, and staff, plus a branded Android app for members.
      </p>
      <p className="mt-6 text-[17px] leading-relaxed text-slate-600">
        Core capabilities include QR and biometric-ready attendance, CRM with automated follow-ups, workout and diet
        content libraries with media, measurement history, class scheduling, expense tracking, analytics dashboards,
        referral and credit-based messaging (SMS and WhatsApp Business API), optional ecommerce listings, and
        integrations for payments, messaging, push notifications, and email—so your team operates digitally
        end-to-end.
      </p>
      <p className="mt-6 text-[17px] leading-relaxed text-slate-600">
        Whether you run a single club or a franchise group with multiple locations, Fitvario is structured to support
        multi-branch reporting, performance comparison, and collection views over time.
      </p>

      <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-base font-semibold text-slate-900">Contact</h2>
        <div className="mt-4 space-y-2 text-[15px] text-slate-600">
          <p><strong className="text-slate-800">Product:</strong> Fitvario</p>
          <p><strong className="text-slate-800">Location:</strong> Bhopal, Madhya Pradesh, India</p>
          <p>
            <strong className="text-slate-800">Support:</strong>{" "}
            <a href="mailto:support@fitvario.com" className="font-medium text-teal-700 underline-offset-2 hover:underline">
              support@fitvario.com
            </a>
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/features"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-teal-600 px-5 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          View all features
        </Link>
        <Link
          href="/contact#demo"
          className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Request a demo
        </Link>
      </div>
    </PageShell>
  );
}
