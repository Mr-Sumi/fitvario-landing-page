import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq, ExampleBox } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";
import { StartupTool } from "@/components/tools/StartupTool";

const PATH = "/tools/gym-startup-cost-calculator";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "calculator", label: "The calculator" },
  { id: "lines", label: "What goes in each line" },
  { id: "buffer", label: "Working capital and contingency" },
  { id: "example", label: "A worked example" },
  { id: "verify", label: "What to verify locally" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "How much does it cost to open a gym in India?",
    a: "It depends too much on the city, the size, the equipment and the lease for one number to be honest. Fill the lines with quotes from your own suppliers and landlord. The total is only as good as those quotes.",
  },
  {
    q: "Should I lease or buy equipment?",
    a: "Leasing lowers the up-front cost and turns it into a monthly EMI. Buying costs more at the start and may cost less over years. Put the up-front figure here and the EMI in the break-even calculator.",
  },
  {
    q: "Are the starting figures realistic for my city?",
    a: "They are placeholders to show how the sheet works, not market prices. Replace every one.",
  },
  {
    q: "How many months of working capital is enough?",
    a: "Enough to run until the gym reaches break-even membership. If your break-even needs 180 members and you add 15 a month, that is a year. Work it out rather than guessing.",
  },
  {
    q: "Does this include GST on purchases?",
    a: "Only if you enter amounts with GST included. Whether you can claim credit on purchases is a question for your CA.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Gym business cost in India: a set-up cost calculator"
      lead="Opening a gym takes more than the equipment. This calculator adds your one-time costs (equipment, interiors, deposits, licences, branding, software and pre-launch marketing), then a cushion of working capital and a contingency percentage, and gives you a single figure to arrange before opening day. Every starting number is a placeholder. Replace them with quotes you have collected."
      toc={toc}
      related={["/tools/gym-break-even-calculator", "/tools/gym-membership-pricing-calculator", "/tools/gym-revenue-calculator", "/pricing"]}
    >
      <section id="calculator" className="scroll-mt-24">
        <h2 className="sr-only">The calculator</h2>
        <StartupTool />
      </section>

      <MidCta text="Plan the software side of your gym before you open." location="startup-mid" />

      <Section id="lines" title="What goes in each line">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Equipment:</strong> cardio machines, strength machines, free weights, mats and accessories.
          </li>
          <li>
            <strong>Interiors:</strong> flooring, air conditioning, lighting, mirrors, changing rooms and reception.
          </li>
          <li>
            <strong>Deposit and advance rent:</strong> often several months of rent paid before you open.
          </li>
          <li>
            <strong>Licences and registrations:</strong> local trade, fire and building requirements.
          </li>
          <li>
            <strong>Branding and software:</strong> signage, a website, and the systems you will run daily operations
            on.
          </li>
        </ul>
      </Section>

      <Section id="buffer" title="Working capital and contingency">
        <p>
          A gym is usually not full on opening day, but the rent and salaries start immediately. Working capital is
          the number of months of running cost you keep in hand so that a slow start does not close you down.
          Contingency is a separate percentage for the things you did not plan for: a cracked floor, a late
          licence, a machine that needs replacing. Treating both as part of the budget, rather than as spare cash, is
          what separates a gym that survives its first year from one that does not.
        </p>
      </Section>

      <Section id="example" title="A worked example">
        <ExampleBox title="Example">
          <p>
            Suppose one-time costs add up to ₹29,80,000. Three months of a ₹2,50,000 running cost is ₹7,50,000 of
            working capital. A 10% contingency on the ₹37,30,000 base adds ₹3,73,000, for a total of ₹41,03,000.
            Over 2,500 sq ft that is about ₹1,641 per square foot.
          </p>
        </ExampleBox>
        <p>Those figures show the arithmetic only. They are not a price list for any city.</p>
      </Section>

      <Section id="verify" title="What to verify locally">
        <p>
          Licence requirements, fire and building rules, and the tax treatment of your purchases differ by state and
          city and change over time. Check them with your local authority and your CA before you commit money. This
          page does not give legal or tax advice.
        </p>
        <p>
          When the budget is clear, the next question is how many members cover the running cost. The{" "}
          <PageLink href="/tools/gym-break-even-calculator">break-even calculator</PageLink> answers it, and the{" "}
          <PageLink href="/tools/gym-revenue-calculator">revenue calculator</PageLink> shows how fast a plan could get
          you there.
        </p>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        Looking at software for your gym? Compare{" "}
        <Link href="/pricing" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          how Fitvario is priced
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
