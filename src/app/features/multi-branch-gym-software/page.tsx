import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq, ExampleBox, ScreenshotPlaceholder } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";

const PATH = "/features/multi-branch-gym-software";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "who", label: "Who it is for" },
  { id: "problem", label: "The problem today" },
  { id: "how", label: "How multi-branch works" },
  { id: "reports", label: "Comparing branches" },
  { id: "staff", label: "Staff and branches" },
  { id: "limits", label: "What to check" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "Is one member's record shared across branches?",
    a: "No. A member belongs to one branch, and each branch keeps its own members, plans, invoices and enquiries. If someone joins a second branch, they are a separate member there.",
  },
  {
    q: "Can I see all branches together?",
    a: "Yes. The comparison reports show revenue, members, attendance and CRM numbers for your branches side by side, and you can pick a date range or limit the view to chosen branches.",
  },
  {
    q: "Can a branch manager see only their branch?",
    a: "Staff accounts are assigned to the gyms they work at, and you give each person only the permissions they need. A branch's staff work in that branch, while you as the owner see all of them.",
  },
  {
    q: "Is there a limit on the number of branches?",
    a: "Your plan sets the number of branches you can add, so mention how many you run when you ask for a quote.",
  },
  {
    q: "Can each branch have different plans and prices?",
    a: "Membership plans belong to a branch, so each branch can have its own plans.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Multi branch gym software: run every location from one login"
      lead="Fitvario lets one gym owner run several branches under one account. Each branch keeps its own members, plans, invoices, enquiries and staff, and you compare revenue, members, attendance and CRM numbers across branches in a single view. You do not log in and out of separate accounts, and nobody has to merge spreadsheets at the end of the month."
      toc={toc}
      related={["/for/franchise-gyms", "/features/white-label-gym-app", "/features/gym-crm", "/pricing"]}
    >
      <Section id="who" title="Who it is for">
        <p>
          This is for owners with two or more gyms, and for franchise groups and chains. It is multi branch gym
          software built around one owner who needs to see all locations and managers who should see only theirs.
        </p>
      </Section>

      <Section id="problem" title="The problem today">
        <p>
          A second branch usually means a second spreadsheet, a second register and a second set of numbers that
          arrive late. The owner cannot answer simple questions: which branch grew last month, which one lost members,
          which one has staff who never follow up on enquiries. Each manager reports in a different format, so the
          comparison is only as good as the person who typed it.
        </p>
      </Section>

      <Section id="how" title="How it works, step by step">
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong>Set up your organisation.</strong> You have one owner account with a franchise name and your
            gyms under it.
          </li>
          <li>
            <strong>Add branches.</strong> Each branch is a gym with its own address and details. Your plan sets how
            many you can add.
          </li>
          <li>
            <strong>Run each branch normally.</strong> Members, plans, invoices, attendance and enquiries are recorded
            per branch.
          </li>
          <li>
            <strong>Switch or compare.</strong> Open a single branch to work in it, or open the multi-branch reports to
            compare them.
          </li>
        </ol>
        <ExampleBox title="Example">
          <p>
            An owner with three branches opens the comparison for the month. One branch brought in the most
            revenue, another added the most members but collected less, and the third had the best attendance. The
            owner now knows which branch to call first.
          </p>
        </ExampleBox>
        <ScreenshotPlaceholder
          alt="The multi-branch overview in the Fitvario app comparing three branches"
          caption="Placeholder. TODO: add a real screenshot of the multi-branch overview."
        />
      </Section>

      <MidCta text="Running more than one gym? See the comparison view." location="multibranch-mid" />

      <Section id="reports" title="Comparing branches">
        <p>
          The multi-branch reports cover five areas: an overview, revenue, members, attendance and CRM. Each one can
          be limited to a date range and to chosen branches. The same figures are used inside each branch, so a
          branch manager and the owner are looking at the same numbers.
        </p>
      </Section>

      <Section id="staff" title="Staff and branches">
        <p>
          Staff accounts are assigned to the gyms they work in, and the owner decides what each person may do. A
          receptionist can log enquiries without deleting them, and a manager can see their branch without seeing
          revenue elsewhere, if you set it that way.{" "}
          <PageLink href="/for/franchise-gyms">Read the franchise gym guide</PageLink> for how owners usually
          split responsibility.
        </p>
      </Section>

      <Section id="limits" title="What to check before you commit">
        <ul className="list-disc space-y-2 pl-5">
          <li>Members are per branch. A person who trains at two branches has two member records.</li>
          <li>The number of branches depends on your plan.</li>
          <li>The CRM and attendance are per branch, and the comparison is where they come together.</li>
        </ul>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        More:{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          all features
        </Link>
        ,{" "}
        <Link href="/pricing" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          pricing
        </Link>{" "}
        and{" "}
        <Link href="/contact#demo" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          a demo
        </Link>
        .
      </p>
    </ContentLayout>
  );
}
