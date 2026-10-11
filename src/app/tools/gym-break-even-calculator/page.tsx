import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq, ExampleBox } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";
import { BreakEvenTool } from "@/components/tools/BreakEvenTool";

const PATH = "/tools/gym-break-even-calculator";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "calculator", label: "The calculator" },
  { id: "how", label: "How to use it" },
  { id: "formula", label: "The formula" },
  { id: "example", label: "A worked example" },
  { id: "gst", label: "GST and your fee" },
  { id: "limits", label: "What it leaves out" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "What should I count as a fixed cost?",
    a: "Anything you pay whether you have 50 members or 500: rent, staff salaries, electricity, equipment EMI or lease, software, insurance, and a steady marketing spend. If you would still pay it in a slow month, it is fixed.",
  },
  {
    q: "My members pay for 3, 6 or 12 months at once. Which fee do I enter?",
    a: "Divide each plan's price by its months and average them across your members. A 12-month plan at ₹9,000 counts as ₹750 a month. Using the monthly equivalent keeps income and monthly costs on the same footing.",
  },
  {
    q: "Why is my break-even number higher than I expected?",
    a: "Most often because GST was left inside the fee, or because small costs such as repairs, cleaning and card charges were left out. Put every recurring cost in the last box and run it again.",
  },
  {
    q: "Does the number include the money I spent to set the gym up?",
    a: "No. This is a monthly break-even on running costs. Equipment bought with a loan appears through its EMI. To budget the one-time cost of opening, use the set-up cost calculator when it is available.",
  },
  {
    q: "How often should I recalculate?",
    a: "Whenever rent, salaries or your fee change, and at least once a quarter. Keep the shareable link from each run so you can compare quarters.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Gym break even calculator for India: how many members do you need?"
      lead="Your gym breaks even when the money from members covers every fixed cost: rent, salaries, power, equipment EMI, marketing and software. Enter those costs and your average monthly fee below. The calculator shows how many members you need, what you make at your current count, and how the answer moves when your fee changes. It runs in your browser, and the starting numbers are illustrative."
      toc={toc}
      related={[
        "/tools/gym-membership-pricing-calculator",
        "/tools/gym-churn-calculator",
        "/tools/gym-revenue-calculator",
        "/pricing",
      ]}
    >
      <section id="calculator" className="scroll-mt-24">
        <h2 className="sr-only">The calculator</h2>
        <BreakEvenTool />
      </section>

      <MidCta text="Track real collections and expenses next to this estimate." location="breakeven-mid" />

      <Section id="how" title="How to use it">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Pick your city tier for a starting rent per square foot, then change it to your actual rent.</li>
          <li>Fill in each monthly cost. Leave a box at zero if it does not apply.</li>
          <li>Enter the average fee a member pays per month, and tick the GST box if that fee already includes GST.</li>
          <li>Enter how many members you have now to see your monthly result.</li>
          <li>Read the table at the bottom to see how a higher or lower fee changes the target.</li>
        </ol>
      </Section>

      <Section id="formula" title="The formula">
        <p>
          Break-even members equals fixed monthly costs divided by what each member leaves you after any per-member
          cost. If you charge ₹1,000 a month, GST has already been taken out, and a member costs you ₹100 in towels
          and card charges, each member contributes ₹900. A gym with ₹90,000 of fixed costs needs 100 members.
        </p>
        <p>
          The answer is rounded up, because 99.4 members is not something you can enrol. The calculator works in
          paise internally, so a fee like ₹1,179.66 does not drift when it is multiplied across hundreds of members.
        </p>
      </Section>

      <Section id="example" title="A worked example">
        <ExampleBox title="Example">
          <p>
            With the starting numbers, a 2,500 sq ft gym at ₹35 a sq ft pays ₹87,500 rent. Add ₹60,000 salaries,
            ₹25,000 power and water, ₹30,000 EMI, ₹15,000 marketing, ₹5,000 software and ₹10,000 for everything
            else, and fixed costs are ₹2,32,500 a month. At a fee of ₹1,200, break-even is 194 members, since
            193.75 rounds up. With 100 members the gym loses ₹1,12,500 a month. A ₹100 fee increase, to ₹1,300,
            brings break-even down to 179 members.
          </p>
        </ExampleBox>
        <p>These figures are only an example. Your rent, salaries and fee will differ.</p>
      </Section>

      <Section id="gst" title="GST and your fee">
        <p>
          If the fee you quote members already includes GST, part of it belongs to the government, not to the gym.
          Tick the GST box and the calculator takes that part out before counting your income. If you add GST on top
          of your fee, leave the box clear. Which rate applies to gym memberships is a question for your CA, so the
          rate here is something you type in, not a fact the page asserts.
        </p>
      </Section>

      <Section id="limits" title="What it leaves out">
        <ul className="list-disc space-y-2 pl-5">
          <li>One-time costs of opening, such as interiors and deposits.</li>
          <li>Income tax on profit, and any change in GST credit.</li>
          <li>Seasonality. January is rarely like June, and the average hides that.</li>
          <li>Members who leave. A gym that loses members every month needs more joiners just to stand still, so read this together with the <PageLink href="/tools/gym-churn-calculator">churn calculator</PageLink>.</li>
        </ul>
        <p>
          Once you know your target, the next question is how to reach it. Pricing is one lever, and the{" "}
          <PageLink href="/tools/gym-membership-pricing-calculator">membership pricing calculator</PageLink> shows
          how a plan ladder changes what each member pays.
        </p>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        More for gym owners: see the{" "}
        <Link href="/features/gym-crm" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          gym CRM for enquiries and follow-ups
        </Link>
        , how{" "}
        <Link href="/pricing" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Fitvario pricing works
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
