import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { isLive } from "@/lib/features";
import { ContentLayout, Section, Faq } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";

const PATH = "/for/crossfit-yoga-studios";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "honest", label: "Read this first" },
  { id: "crossfit", label: "For CrossFit boxes" },
  { id: "yoga", label: "For yoga studios" },
  { id: "who", label: "When it fits" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "Can members reserve a spot in a class in the app?",
    a: "No. Fitvario has no class booking, waitlists or class enrolment. Members do not reserve a spot in a session.",
  },
  {
    q: "Can I run drop-in or class packs?",
    a: "Fitvario works on membership plans with a duration. A pack of classes that runs down with each visit is not something it tracks.",
  },
  {
    q: "Is it still useful for a studio?",
    a: "If your studio sells time-based memberships and wants attendance, renewals and enquiry follow-up handled, yes. If reserving classes is the main thing you need, look at a booking tool first.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="CrossFit and yoga studio software in India: what fits and what does not"
      lead="Fitvario is gym management software for time-based memberships. For a CrossFit box or yoga studio it handles memberships, renewals, QR check-in, enquiry follow-up and reminders before a plan ends. It does not handle class booking, waitlists or class packs. If you sell memberships and want the admin done, read on. If members must reserve a spot in a class, you need a booking tool first."
      toc={toc}
      related={["/features/qr-attendance", "/features/whatsapp-reminders", "/features/gym-crm", "/pricing"]}
    >
      <Section id="honest" title="Read this first: no class booking">
        <p>
          A CrossFit box or yoga studio is often chosen on one feature: the member opens an app, picks a class and
          takes a spot. Fitvario does not do that. There is no class timetable that members book into and no waitlist.
          Picking software for a studio on that basis would be a mistake, so we say it plainly.
        </p>
      </Section>

      <Section id="crossfit" title="For CrossFit boxes: what the software covers">
        <p>
          A box runs on memberships, coaches and a community that turns up daily. For anyone searching for CrossFit gym
          software in India, what Fitvario covers is the administration around that:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Membership plans with end dates and a record of who has paid and who still owes.</li>
          {isLive("qr_attendance") && (
            <li>
              Attendance by QR code at the door, with check-in and check-out in dual scan mode.{" "}
              <PageLink href="/features/qr-attendance">See QR attendance</PageLink>.
            </li>
          )}
          {isLive("whatsapp_expiry_reminders") && (
            <li>
              WhatsApp reminders before a plan ends, so a quiet member is asked back.{" "}
              <PageLink href="/features/whatsapp-reminders">See the reminders</PageLink>.
            </li>
          )}
          <li>
            A list of enquiries and trial-class follow-ups.{" "}
            <PageLink href="/features/gym-crm">See the CRM</PageLink>.
          </li>
        </ul>
      </Section>

      <MidCta text="Want to check whether it fits your studio?" location="studio-mid" />

      <Section id="yoga" title="For yoga studios: what to compare">
        <p>
          Yoga studio software in India usually has to do two jobs: run the timetable and run the memberships.
          Fitvario covers the membership side: plans, renewals, attendance and reminders. For the timetable you can
          keep your own schedule, or use a separate booking tool alongside it.
          {isLive("batches_time_slots") &&
            " Batches with a start time, an end time and a capacity let you group members into time slots, but they are not a booking system."}
        </p>
      </Section>

      <Section id="who" title="When it fits, and when it does not">
        <ul className="list-disc space-y-2 pl-5">
          <li>It fits if you sell monthly or quarterly memberships and the paperwork is the problem.</li>
          <li>It fits if the main loss is renewals and unanswered enquiries.</li>
          <li>It does not fit if members must book each class, or you sell a pack of 10 classes.</li>
        </ul>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        See{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          all features
        </Link>{" "}
        before you decide, or{" "}
        <Link href="/contact#demo" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          ask us a direct question
        </Link>
        .
      </p>
    </ContentLayout>
  );
}
