import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq, ExampleBox } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";
import { ChurnTool } from "@/components/tools/ChurnTool";

const PATH = "/tools/gym-churn-calculator";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "calculator", label: "The calculator" },
  { id: "meaning", label: "What the numbers mean" },
  { id: "example", label: "A worked example" },
  { id: "counting", label: "Counting churn properly" },
  { id: "acting", label: "What to do with it" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "What is a good churn rate for a gym?",
    a: "There is no single right number, and quoting one without a source would mislead you. Track your own rate month after month. The useful signal is whether it is falling, and whether it spikes after a particular event such as a price rise or the exam season.",
  },
  {
    q: "Who counts as a lost member?",
    a: "Someone whose plan ended and who did not renew or restart within your usual grace window. Members on a freeze or a break are not lost, so leave them out of the count.",
  },
  {
    q: "Why is lifetime just one divided by churn?",
    a: "If a steady share of members leaves every month, the average stay is the reciprocal of that share. At 5% monthly churn a member stays about 20 months on average. It is an estimate, and it gets shaky when churn is very low.",
  },
  {
    q: "Should I use members or plans?",
    a: "Members. If one person holds two plans, count them once, otherwise the rate will look better or worse than it is.",
  },
  {
    q: "How is the yearly saving worked out?",
    a: "It multiplies the members kept each month by your monthly fee and by twelve. It is a simple figure that ignores compounding, so treat it as an order of magnitude rather than a forecast.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Gym churn rate calculator: retention, lifetime and what leaving costs"
      lead="Churn is the share of your members who leave in a month. Enter how many members you had at the start of last month, how many left and your average fee. The calculator returns your monthly churn and retention, how long the average member stays, what one member is worth over that stay, and what you would keep each year by cutting churn by 10, 20 or 30 percent."
      toc={toc}
      related={[
        "/tools/gym-membership-pricing-calculator",
        "/tools/gym-break-even-calculator",
        "/tools/gym-revenue-calculator",
        "/features/gym-crm",
      ]}
    >
      <section id="calculator" className="scroll-mt-24">
        <h2 className="sr-only">The calculator</h2>
        <ChurnTool />
      </section>

      <MidCta text="Keep every renewal and follow-up where your team can see it." location="churn-mid" />

      <Section id="meaning" title="What the numbers mean">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Churn</strong> is members lost divided by members at the start of the month.
          </li>
          <li>
            <strong>Retention</strong> is the opposite: one minus churn.
          </li>
          <li>
            <strong>Average stay</strong> is one divided by churn, in months.
          </li>
          <li>
            <strong>Value of one member</strong> is the average stay multiplied by the fee you keep each month.
          </li>
        </ul>
        <p>
          The last figure is the one that changes behaviour. Seeing that a member is worth ₹12,000 over their stay
          makes a free personal-training session to win one back look like a bargain.
        </p>
      </Section>

      <Section id="example" title="A worked example">
        <ExampleBox title="Example">
          <p>
            A gym starts the month with 300 members, loses 30 and enrols 40. Churn is 30 divided by 300, which is
            10%. Retention is 90%, the average stay is 10 months, and at a ₹1,200 fee one member is worth ₹12,000.
            The 30 who left took ₹36,000 of monthly fees with them. If the gym cuts churn by a fifth, to 8%, it
            keeps six more members every month, which is worth ₹86,400 of fees over a year.
          </p>
        </ExampleBox>
        <p>These are illustrative numbers. Use your own counts.</p>
      </Section>

      <Section id="counting" title="Counting churn properly">
        <p>
          Pick one rule and keep it. A common rule is that a member is lost when their plan has been expired for 30
          days with no renewal. Count new joiners separately, because a busy month of joiners can hide a leak.
          Track the rate for members who joined in the last three months apart from older members, since new
          members usually leave faster, and the fix for them is different from the fix for long-standing ones.
        </p>
      </Section>

      <Section id="acting" title="What to do with it">
        <p>
          Churn is rarely one problem. Look at when members leave: right after the first month, at plan expiry, or
          after a gap in attendance. Early exits point to onboarding, expiry exits to renewal follow-up, and
          mid-plan fade to engagement. Pricing matters too. A longer plan locks members in for a period, so the{" "}
          <PageLink href="/tools/gym-membership-pricing-calculator">membership pricing calculator</PageLink> helps you
          design that ladder, and the <PageLink href="/tools/gym-break-even-calculator">break-even calculator</PageLink>{" "}
          shows how many members you need to stay afloat.
        </p>
        <p>
          Follow-up is where most gyms win or lose renewals. A shared list of who to call today, like the{" "}
          <PageLink href="/features/gym-crm">gym CRM</PageLink>, keeps that work from depending on one person&apos;s
          memory.
        </p>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        See also{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          what Fitvario does
        </Link>{" "}
        or{" "}
        <Link href="/contact#demo" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          book a demo
        </Link>
        .
      </p>
    </ContentLayout>
  );
}
