import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";
import { InvoiceTool } from "@/components/tools/InvoiceTool";

const PATH = "/tools/gym-invoice-generator";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "generator", label: "The generator" },
  { id: "format", label: "What a gym invoice usually shows" },
  { id: "receipt", label: "Invoice or fee receipt" },
  { id: "privacy", label: "Your details stay put" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "Is this a valid GST invoice?",
    a: "It is a sample format. What a valid tax invoice must contain for your business is for your CA to confirm. Use this to see the layout and the maths, and check the final wording with them.",
  },
  {
    q: "Can I save it as a PDF?",
    a: "Yes. Press Print or save as PDF and choose Save as PDF as the destination in your browser's print window. Only the invoice is printed.",
  },
  {
    q: "Where is the information stored?",
    a: "Nowhere. Everything you type stays in your browser and is gone when you close or reload the page. It is also not put in the page address.",
  },
  {
    q: "How should I number invoices?",
    a: "Use a running sequence with no gaps, such as INV-0001, INV-0002, so each invoice is easy to find. Keep the series consistent through the financial year.",
  },
  {
    q: "What if the member paid in parts?",
    a: "Issue the invoice for the full amount and note each payment against it, or issue a receipt for each payment. Ask your CA which they prefer.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Gym invoice format with GST: a free invoice and fee receipt generator"
      lead="Use it as a gym invoice format GST-registered gyms can adapt, or as a simple gym fees receipt format with GST switched off. Fill in your gym details, the member and what they bought, and you get a clean invoice you can print or save as a PDF. Switch on GST to add CGST and SGST or IGST lines, with a discount taken off before tax. It is a sample format, built in your browser, and nothing you type is sent anywhere or added to the page address."
      toc={toc}
      related={["/tools/gym-gst-calculator", "/tools/gym-membership-pricing-calculator", "/features", "/pricing"]}
    >
      <section id="generator" className="scroll-mt-24">
        <h2 className="sr-only">The generator</h2>
        <InvoiceTool />
      </section>

      <MidCta text="Want invoices and dues handled for you?" location="invoice-mid" />

      <Section id="format" title="What a gym invoice usually shows">
        <ul className="list-disc space-y-2 pl-5">
          <li>The gym&apos;s name, address and, if registered, its GSTIN.</li>
          <li>An invoice number and a date.</li>
          <li>The member&apos;s name, and a phone number if you keep one.</li>
          <li>What was bought, the period it covers and the amount.</li>
          <li>Any discount, taken off before tax.</li>
          <li>Each tax line separately, and a clear total.</li>
          <li>How the member paid.</li>
        </ul>
        <p>
          Which of these your invoice must carry depends on your registration and the rules that apply to you. Treat
          this list as a starting point and confirm it with your CA.
        </p>
      </Section>

      <Section id="receipt" title="Invoice or fee receipt">
        <p>
          An invoice asks for payment or records a sale, and a receipt confirms that money arrived. Many small gyms
          use one document for both. If a member pays in two instalments, a receipt for each payment and an invoice
          for the full amount keeps the record clear for both sides. The generator works for either: leave GST off
          for a simple fee receipt.
        </p>
        <p>
          If you are unsure what to put on a tax line, work it out first in the{" "}
          <PageLink href="/tools/gym-gst-calculator">GST calculator</PageLink>, then paste the amount here.
        </p>
      </Section>

      <Section id="privacy" title="Your details stay put">
        <p>
          The form runs entirely in your browser. There is no account, nothing is uploaded and nothing is added to
          the page address, so a link to this page never contains a member&apos;s name. Close the tab and the data is
          gone. If you need a record, print or save the PDF before you leave.
        </p>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        Running a gym with more than a handful of members? See what{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Fitvario covers
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
