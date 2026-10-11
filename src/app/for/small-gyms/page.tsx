import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { isLive } from "@/lib/features";
import { ContentLayout, Section, Faq, ExampleBox } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";

const PATH = "/for/small-gyms";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "who", label: "Who this is for" },
  { id: "need", label: "What you actually need" },
  { id: "skip", label: "What to skip for now" },
  { id: "checklist", label: "Setup checklist" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "Is Fitvario too big for a gym with 100 members?",
    a: "It is the same app at any size. A small gym uses only the parts it needs: members, plans, QR attendance, renewal reminders and the enquiry list. You do not need to switch on anything else.",
  },
  {
    q: "How long does setup take?",
    a: "Most of the time goes into entering your plans and existing members. Adding plans and the gym profile is quick; a list of a few hundred members is the long part, so do it over an evening or two with the register open.",
  },
  {
    q: "Do I need staff accounts?",
    a: "Not at the start. As the owner you can do everything. Add staff when someone else needs to log enquiries or take payments, and give them only those permissions.",
  },
  {
    q: "What does it cost for a small gym?",
    a: "Pricing depends on your members, branches and messaging, so a small gym is quoted for what it uses. See how Fitvario pricing works, or ask for a quote.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Gym software for small gyms in India"
      lead="A gym with 100 to 300 members needs four things from software: a list of members with plan end dates, a record of who came, a reminder before a plan ends and a list of enquiries to call back. Everything else can wait. This page lists what to set up first, what to ignore for now and a setup checklist for the Fitvario app. It is written for an owner who is also the person at the desk."
      toc={toc}
      related={["/features/qr-attendance", "/features/whatsapp-reminders", "/features/gym-crm", "/pricing"]}
    >
      <Section id="who" title="Who this is for">
        <p>
          This is for owner-run gyms: one location, one or two trainers, a desk that is sometimes empty and a
          register that is sometimes missing. You need gym software for a small gym in India that does not need an IT
          person or a training week.
        </p>
      </Section>

      <Section id="need" title="What a small gym actually needs">
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong>Members and plans with end dates.</strong> This is the base. Every other useful thing, such as
            reminders and reports, works off the end date.
          </li>
          <li>
            <strong>Invoices and dues.</strong> A receipt for each payment and a list of who still owes.{" "}
            <PageLink href="/features/gst-billing">See billing and dues</PageLink>.
          </li>
          <li>
            <strong>Attendance without hardware.</strong> A printed QR code at the entrance.{" "}
            <PageLink href="/features/qr-attendance">See QR attendance</PageLink>.
          </li>
          <li>
            <strong>Renewal reminders that send themselves.</strong>{" "}
            {isLive("whatsapp_expiry_reminders") ? (
              <>
                WhatsApp messages go out 7, 3 and 1 days before a plan ends.{" "}
                <PageLink href="/features/whatsapp-reminders">See the reminders</PageLink>.
              </>
            ) : (
              "Alerts from the gym reach members by WhatsApp, SMS and push."
            )}
          </li>
          <li>
            <strong>An enquiry list.</strong> Walk-ins written down with a call-back date.{" "}
            <PageLink href="/features/gym-crm">See the CRM</PageLink>.
          </li>
        </ul>
      </Section>

      <MidCta text="Want to see this on a gym your size?" location="smallgyms-mid" />

      <Section id="skip" title="What to skip for now">
        <p>
          You can leave multi-branch reports, staff permission tuning and campaign messages until the basics run on
          their own. A gym that switches on everything in week one often stops using most of it by week four. Start
          small and add one thing a month.
        </p>
      </Section>

      <Section id="checklist" title="Setup checklist">
        <ol className="list-decimal space-y-3 pl-5">
          <li>Create your gym profile with name, address and contact number.</li>
          <li>Add your plans: names, durations and prices.</li>
          <li>Add members from the register. Start with those whose plans are still running.</li>
          <li>Print your gym&apos;s QR code and put it at the entrance.</li>
          <li>Ask five regular members to install the app and scan once.</li>
          <li>Check which messages are switched on in your notification preferences.</li>
          <li>Write down this week&apos;s enquiries in the CRM and set a call-back date for each.</li>
        </ol>
        <ExampleBox title="Example">
          <p>
            A 150-member gym adds its 4 plans in half an hour and its members over two evenings. By the second week
            the desk stops writing in the register, and the owner opens the dues list on Monday instead of counting
            cash on Sunday.
          </p>
        </ExampleBox>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        Next:{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          all features
        </Link>
        , or{" "}
        <Link href="/contact#demo" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          book a demo
        </Link>
        .
      </p>
    </ContentLayout>
  );
}
