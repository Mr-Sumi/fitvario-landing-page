import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq, ExampleBox } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";
import { RevenueTool } from "@/components/tools/RevenueTool";

const PATH = "/tools/gym-revenue-calculator";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "calculator", label: "The calculator" },
  { id: "inputs", label: "What to enter" },
  { id: "example", label: "A worked example" },
  { id: "growth", label: "Choosing a growth rate" },
  { id: "use", label: "Using the projection" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "Is this revenue or profit?",
    a: "Revenue: money coming in before any cost comes out. Put it next to your monthly costs, or run the break-even calculator, to see profit.",
  },
  {
    q: "How do I enter a quarterly or annual plan?",
    a: "Divide its price by the months and enter that as the monthly fee, with the number of members on that plan. A ₹9,000 annual plan is ₹750 a month.",
  },
  {
    q: "Why is other income not growing with members?",
    a: "Because it depends on what you sell and how often, which a simple growth rate would guess at. Change that figure yourself if you expect it to move.",
  },
  {
    q: "Can I model a decline?",
    a: "Yes. Enter a negative growth rate. The projection shrinks members and personal-training clients by that share each month.",
  },
  {
    q: "Does the projection include GST?",
    a: "Use fees without GST if you want income net of tax, or with GST if you want the cash that comes in. Whichever you choose, use it for every plan.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Gym revenue calculator: a 12-month income projection"
      lead="Enter your plan mix, personal training clients and other monthly income, set a monthly growth rate, and the calculator projects your gym's income for the next 12 months, month by month. It is a planning aid: a clear way to see what a steady 1% or 2% a month of growth, or a slow slide, does to a year of revenue."
      toc={toc}
      related={[
        "/tools/gym-break-even-calculator",
        "/tools/gym-churn-calculator",
        "/tools/gym-membership-pricing-calculator",
        "/pricing",
      ]}
    >
      <section id="calculator" className="scroll-mt-24">
        <h2 className="sr-only">The calculator</h2>
        <RevenueTool />
      </section>

      <MidCta text="Compare this projection with your real collections." location="revenue-mid" />

      <Section id="inputs" title="What to enter">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Plans:</strong> up to three, each as a number of members and the monthly equivalent of the fee.
          </li>
          <li>
            <strong>Personal training:</strong> how many clients pay you for it and what each pays per month.
          </li>
          <li>
            <strong>Other income:</strong> anything else that comes in monthly, such as supplements, merchandise or
            locker rent.
          </li>
          <li>
            <strong>Growth:</strong> your net change in members each month, joiners minus leavers.
          </li>
        </ul>
      </Section>

      <Section id="example" title="A worked example">
        <ExampleBox title="Example">
          <p>
            Take 120 members at ₹1,200, 60 at ₹1,000 and 30 at ₹800, that is ₹2,28,000 from memberships. Add 12
            personal-training clients at ₹3,500, which is ₹42,000, and ₹8,000 of other income. Month one is ₹2,78,000.
            With no growth the year comes to ₹33,36,000. At 1% growth a month the same gym ends the year with a
            higher run rate, because memberships and training compound while other income stays flat.
          </p>
        </ExampleBox>
        <p>The figures illustrate the arithmetic and are not a forecast for any gym.</p>
      </Section>

      <Section id="growth" title="Choosing a growth rate">
        <p>
          Be honest about the number. A gym that joins 10 and loses 8 a month on a base of 200 grows by 1% a month.
          Look at the last six months of joiners and leavers, and use their average rather than your best month.
          Run the projection three times: once with your realistic rate, once with half of it, and once with zero.
          If the plan only works in the optimistic case, it is not much of a plan.
        </p>
        <p>
          Growth and leaving are two sides of the same coin. The{" "}
          <PageLink href="/tools/gym-churn-calculator">churn calculator</PageLink> shows how many members you lose
          each month, which is the number you need to beat before any growth shows up.
        </p>
      </Section>

      <Section id="use" title="Using the projection">
        <p>
          Put the year total next to your yearly costs and the target from the{" "}
          <PageLink href="/tools/gym-break-even-calculator">break-even calculator</PageLink>. If the plan needs a
          price rise to work, test it in the{" "}
          <PageLink href="/tools/gym-membership-pricing-calculator">membership pricing calculator</PageLink> first.
          Then compare the projection with real collections each month, because the gap between plan and actual is
          where the learning is.
        </p>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        Read about{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Fitvario&apos;s features
        </Link>
        ,{" "}
        <Link href="/about" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          who we are
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
