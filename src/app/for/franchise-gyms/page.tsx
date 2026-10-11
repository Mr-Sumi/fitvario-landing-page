import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq, ExampleBox } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";

const PATH = "/for/franchise-gyms";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "who", label: "Who this is for" },
  { id: "need", label: "What a chain needs" },
  { id: "roles", label: "Owner and branch roles" },
  { id: "ask", label: "What to ask any vendor" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "Is this for franchises or for chains?",
    a: "Both. One owner account holds a franchise with several gyms, whether those gyms are franchisees under you or your own branches. Each gym keeps its own members and staff.",
  },
  {
    q: "Can one location see another location's data?",
    a: "Not if you set it up with separate staff accounts for each location. Staff accounts are assigned to specific gyms and see only the permissions you give them.",
  },
  {
    q: "Can we use one brand across all locations?",
    a: "Yes. The app name and logo you set belong to the owner, so every location shows the same ones on the splash screen and on the owner and member home screens.",
  },
  {
    q: "Is a separate login needed for each branch?",
    a: "No. The owner has one login for all branches.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Franchise gym management software for chains in India"
      lead="A gym franchise or chain needs each location to run on its own while the head office sees them all. Fitvario gives the owner one login for every branch, keeps members, enquiries and staff separate per branch and compares revenue, members, attendance and CRM numbers across branches. This page is for owners of gym chains and franchise groups who are comparing gym chain management software in India."
      toc={toc}
      related={["/features/multi-branch-gym-software", "/features/white-label-gym-app", "/pricing"]}
    >
      <Section id="who" title="Who this is for">
        <p>
          Owners of two or more gyms, franchise heads who need a standard way of running locations, and chain
          operators who are tired of collecting a different spreadsheet from every branch.
        </p>
      </Section>

      <Section id="need" title="What a chain needs">
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong>One view across branches.</strong> Revenue, members, attendance and CRM side by side, with a date
            range and a choice of branches.{" "}
            <PageLink href="/features/multi-branch-gym-software">See how multi-branch works</PageLink>.
          </li>
          <li>
            <strong>Separation where it matters.</strong> Each branch has its own members, plans, invoices and
            enquiries, so one location&apos;s front desk is not working in a shared list.
          </li>
          <li>
            <strong>The same brand everywhere.</strong> One app name and logo for every branch.{" "}
            <PageLink href="/features/white-label-gym-app">See branding</PageLink>.
          </li>
          <li>
            <strong>The same reminders everywhere.</strong> Renewal messages follow the same schedule in every branch,
            so members get the same experience.{" "}
            <PageLink href="/features/whatsapp-reminders">See WhatsApp reminders</PageLink>.
          </li>
        </ul>
      </Section>

      <MidCta text="Running a chain? See the branch comparison." location="franchise-mid" />

      <Section id="roles" title="Owner and branch roles">
        <p>
          The owner sees everything. Staff accounts are assigned to the gyms they work in, and each person gets only the
          permissions you choose, such as adding members, logging enquiries or taking payments. A branch manager can
          run a location without seeing the rest of the chain, and staff actions are logged for the owner to review.
        </p>
        <ExampleBox title="Example">
          <p>
            A chain with four branches gives each branch manager access to their own gym only. The owner opens the
            comparison on the 1st of the month, sees which branch lost members and calls that manager first.
          </p>
        </ExampleBox>
      </Section>

      <Section id="ask" title="What to ask any vendor, including us">
        <ul className="list-disc space-y-2 pl-5">
          <li>Is a member shared across branches or separate per branch? In Fitvario a member belongs to one branch.</li>
          <li>How many branches does the plan allow, and what happens when you add the next one?</li>
          <li>Can a franchisee export their own data?</li>
          <li>Who owns the member data if a franchisee leaves?</li>
        </ul>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        Next:{" "}
        <Link href="/contact#demo" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          book a demo
        </Link>{" "}
        or see{" "}
        <Link href="/pricing" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          how pricing works
        </Link>
        .
      </p>
    </ContentLayout>
  );
}
