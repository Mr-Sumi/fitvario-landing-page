import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq, ExampleBox } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";
import { GstTool } from "@/components/tools/GstTool";

const PATH = "/tools/gym-gst-calculator";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "calculator", label: "The calculator" },
  { id: "inclusive", label: "Inclusive and exclusive" },
  { id: "split", label: "CGST, SGST and IGST" },
  { id: "example", label: "A worked example" },
  { id: "rounding", label: "Rounding" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "What GST rate applies to a gym membership?",
    a: "The rate is a matter of tax law that can change, so this page does not assert one. It starts at 18% only so the calculator has a number to work with. Confirm the rate for your services with your CA before you bill.",
  },
  {
    q: "My fee is ₹1,000 including GST. How do I find the GST part?",
    a: "Choose the option that says the amount includes GST. At 18%, ₹1,000 splits into ₹847.46 before tax and ₹152.54 of GST. The calculator divides by 1.18 instead of taking 18% off, which would be wrong.",
  },
  {
    q: "When is it IGST instead of CGST and SGST?",
    a: "When the supply crosses a state border. Most gym memberships are supplied in the same state as the gym, so CGST and SGST apply, but check your own situation with your CA.",
  },
  {
    q: "Do I need to register for GST?",
    a: "That depends on your turnover and your state. It is a question for your CA, not for a calculator.",
  },
  {
    q: "Can I use this for a receipt?",
    a: "You can copy the lines into your invoice. What a valid invoice must show is for your CA to confirm.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Gym membership GST calculator: add or remove GST in one step"
      lead="Enter a membership fee, say whether it already includes GST, and set the rate. The calculator returns the amount before tax, the GST, and the total, and splits the GST into CGST and SGST for a same-state sale or IGST for an inter-state one. Amounts are rounded to the paisa so the lines always add up. The rate is a number you control. Confirm it with your CA."
      toc={toc}
      related={["/tools/gym-invoice-generator", "/tools/gym-membership-pricing-calculator", "/tools/gym-break-even-calculator", "/pricing"]}
    >
      <section id="calculator" className="scroll-mt-24">
        <h2 className="sr-only">The calculator</h2>
        <GstTool />
      </section>

      <MidCta text="Keep invoices, tax lines and part payments organised." location="gst-calc-mid" />

      <Section id="inclusive" title="Inclusive and exclusive amounts">
        <p>
          An exclusive price is the figure before tax, and GST is added on top. An inclusive price already contains
          the tax. The two are not interchangeable: adding 18% to a price and removing 18% from a price do not
          reverse each other. To take GST out of an inclusive price you divide by one plus the rate, not subtract the
          rate. The calculator does this correctly in both directions.
        </p>
      </Section>

      <Section id="split" title="CGST, SGST and IGST">
        <p>
          For a sale inside one state the tax is shown as two equal halves: CGST to the centre and SGST to the state.
          For a sale across states it appears as a single IGST line. In both cases the total tax is the same. The
          split only changes how the invoice shows it. When the tax has an odd paisa, the extra paisa goes to SGST so
          that the two halves always add up exactly to the whole.
        </p>
      </Section>

      <Section id="example" title="A worked example">
        <ExampleBox title="Example">
          <p>
            A 3-month membership is priced at ₹5,000 before GST. At 18%, GST is ₹900, shown as ₹450 CGST and ₹450
            SGST, and the member pays ₹5,900. If instead ₹5,900 is the all-in price on your board, the calculator
            takes it back to ₹5,000 plus ₹900 of GST.
          </p>
        </ExampleBox>
        <p>The 18% rate is used only to illustrate the arithmetic. Use the rate your CA gives you.</p>
      </Section>

      <Section id="rounding" title="Rounding">
        <p>
          Money is worked out in paise, and each tax amount is rounded once, not after every step. That keeps an
          invoice with several items from drifting by a rupee or two against what the member actually pays. If your
          accountant rounds to the nearest rupee on the final bill, apply that last, to the total.
        </p>
        <p>
          Once your amounts are right you can print a sample bill with the{" "}
          <PageLink href="/tools/gym-invoice-generator">invoice generator</PageLink>, and test the price itself in the{" "}
          <PageLink href="/tools/gym-membership-pricing-calculator">membership pricing calculator</PageLink>.
        </p>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        This is general information, not tax advice. Questions about Fitvario? See{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          the features
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
