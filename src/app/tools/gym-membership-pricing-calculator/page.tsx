import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq, ExampleBox } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";
import { PricingTool } from "@/components/tools/PricingTool";

const PATH = "/tools/gym-membership-pricing-calculator";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "calculator", label: "The calculator" },
  { id: "methods", label: "Two ways to price" },
  { id: "ladder", label: "Building the plan ladder" },
  { id: "example", label: "A worked example" },
  { id: "check", label: "Check before you publish" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "Which method should I use, cost-plus or target margin?",
    a: "Cost-plus is easier to explain to a partner: cost, plus a markup. Target margin answers a different question, namely what share of each rupee you keep. If you think in terms of keeping 30 paise of every rupee, use margin.",
  },
  {
    q: "How many members should I enter?",
    a: "Use the number you can realistically serve in a normal month, not your capacity. If you enter a hopeful number, the cost per member comes out low and the price looks cheaper than your real position.",
  },
  {
    q: "How big should the long-plan discount be?",
    a: "Big enough to move people to longer plans, small enough that the per-month price stays above your cost per member. The table shows the per-month figure for every plan so you can check that.",
  },
  {
    q: "Do the prices include GST?",
    a: "The main price is before GST. The next column adds GST at the rate you set. Confirm the correct rate for memberships with your CA.",
  },
  {
    q: "Should I match the gym down the road?",
    a: "Look at it, but price from your own costs first. A competitor's price tells you what members will compare you with, not whether that price covers your rent.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Gym membership pricing calculator: set fees from your costs"
      lead="Start from what one member costs you each month, then add a markup or a target margin to get a monthly price. The calculator turns that price into a ladder of 1, 3, 6 and 12 month plans with the discounts you choose, and shows the per-month price of each so you can see where discounts start to hurt. Every figure is a before-GST price unless a column says otherwise."
      toc={toc}
      related={[
        "/tools/gym-break-even-calculator",
        "/tools/gym-revenue-calculator",
        "/tools/gym-churn-calculator",
        "/pricing",
      ]}
    >
      <section id="calculator" className="scroll-mt-24">
        <h2 className="sr-only">The calculator</h2>
        <PricingTool />
      </section>

      <MidCta text="See your plans, renewals and collections in one place." location="pricing-calc-mid" />

      <Section id="methods" title="Two ways to price">
        <p>
          <strong>Cost-plus</strong> takes your cost per member and adds a percentage. A cost of ₹750 with a 60%
          markup gives ₹1,200. It is simple and it never sells below cost.
        </p>
        <p>
          <strong>Target margin</strong> works backwards from the share of the price you want to keep. Margin and
          markup are not the same number: a 25% margin means price minus cost is a quarter of the price, so ₹750 of
          cost needs a ₹1,000 price, which is a 33% markup. Mixing the two up is the most common pricing slip, and
          it usually leaves the gym with less than it planned.
        </p>
      </Section>

      <Section id="ladder" title="Building the plan ladder">
        <p>
          A monthly price is the anchor. Longer plans get a discount in exchange for money up front and a longer
          commitment. A 12-month plan is attractive to members who already train regularly, and it protects your
          income against the quiet months. The risk is the other direction: discount too far and the per-month price
          falls below the cost of serving that member.
        </p>
        <p>
          The rounding box rounds each plan to a tidy number. Rounding to ₹50 gives prices such as ₹2,650 instead of
          ₹2,673, which are easier to say, write on a board and remember.
        </p>
      </Section>

      <Section id="example" title="A worked example">
        <ExampleBox title="Example">
          <p>
            Fixed costs of ₹1,50,000 across 200 members is ₹750 each, and ₹50 per member for towels and card
            charges makes the cost ₹800. A 60% markup gives a monthly price of ₹1,280. With 10%, 15% and 25%
            discounts on the 3, 6 and 12 month plans, rounded to ₹50, the 12-month plan comes to ₹11,500, which is
            ₹958 a month, still above the ₹800 cost.
          </p>
        </ExampleBox>
        <p>The numbers are only a worked example. Replace them with your own costs.</p>
      </Section>

      <Section id="check" title="Check before you publish">
        <ul className="list-disc space-y-2 pl-5">
          <li>Is the per-month price of the longest plan still above your cost per member?</li>
          <li>Does your break-even still work at this price? Check it in the <PageLink href="/tools/gym-break-even-calculator">break-even calculator</PageLink>.</li>
          <li>Does the price ladder leave room for a joining offer or festival discount?</li>
          <li>Have you added GST correctly on the bill the member sees?</li>
        </ul>
        <p>
          Prices are only half the story: a gym that keeps members longer needs fewer new joiners. The{" "}
          <PageLink href="/tools/gym-churn-calculator">churn calculator</PageLink> puts a rupee value on that.
        </p>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        Related: how{" "}
        <Link href="/pricing" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Fitvario is priced
        </Link>
        , the{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Fitvario features
        </Link>{" "}
        or{" "}
        <Link href="/contact#demo" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          a demo
        </Link>
        .
      </p>
    </ContentLayout>
  );
}
