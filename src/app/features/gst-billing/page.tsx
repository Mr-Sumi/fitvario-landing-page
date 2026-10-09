import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq, ExampleBox, ScreenshotPlaceholder } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";

const PATH = "/features/gst-billing";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "who", label: "Who it is for" },
  { id: "problem", label: "The problem today" },
  { id: "how", label: "How billing works" },
  { id: "dues", label: "Part payments and dues" },
  { id: "tax", label: "Tax lines and GST" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "Can I add GST to my invoices?",
    a: "You set up tax lines for your gym, each with a name, a percentage and an optional tax number, and you choose which of them apply to an invoice. Fitvario shows each chosen tax as its own line. Which rate applies to your memberships is something to confirm with your CA.",
  },
  {
    q: "Can a member pay in parts?",
    a: "Yes. Record a part payment and the invoice keeps the remaining due amount. Every payment is logged with the time it was collected.",
  },
  {
    q: "Which payment methods can I record?",
    a: "Cash, cheque, card and online. For a cheque or an online payment you can note details such as the cheque number or UPI reference.",
  },
  {
    q: "Can I cancel a wrong invoice?",
    a: "Yes. An invoice can be voided, and payment cannot be collected on a voided invoice.",
  },
  {
    q: "What does billing cost?",
    a: "Invoicing is part of the platform. Pricing depends on your branches, members and messaging, and a quote is free. See how Fitvario pricing works.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Gym software with GST billing and dues tracking"
      lead="Fitvario creates an invoice for every membership, lets you pick which of your gym's tax lines apply and shows each tax as a separate line. When a member pays in parts, the invoice keeps the remaining amount and a log of every payment, and a dues list shows who still owes what. This page describes how billing works. Confirm the GST rate and wording for your gym with your CA."
      toc={toc}
      related={["/features/whatsapp-reminders", "/features/gym-crm", "/pricing"]}
    >
      <Section id="who" title="Who it is for">
        <p>
          This is for gym owners who issue invoices to members and want gym billing software in India that also
          shows who has paid in full and who has not. It suits gyms where members often pay half now and the rest
          later.
        </p>
      </Section>

      <Section id="problem" title="The problem today">
        <p>
          Many gyms still write a receipt by hand, note the balance in a register and try to remember who owes what
          at the end of the month. Partial payments get lost, a receipt is never issued twice the same way, and at
          tax time someone has to rebuild the numbers from three notebooks and a phone gallery.
        </p>
      </Section>

      <Section id="how" title="How billing works, step by step">
        <ol className="list-decimal space-y-3 pl-5">
          <li>Add a member and assign a plan. Fitvario creates the invoice with an invoice number.</li>
          <li>Apply a discount if you give one. Tax is worked out after the discount.</li>
          <li>Choose the tax lines that apply. Fitvario works out each tax and shows the total.</li>
          <li>Record how the member paid: cash, cheque, card or online, with a reference if you have one.</li>
          <li>If the member paid only part, the invoice keeps the due amount and an optional date to chase it.</li>
        </ol>
        <ExampleBox title="Example">
          <p>
            A 3-month plan is priced at ₹3,000 and the gym has one tax line set up at 18% and it is selected for this invoice. The invoice shows ₹3,000,
            a tax line of ₹540 and a total of ₹3,540. The member pays ₹2,000 in cash today, so the invoice shows
            ₹1,540 due. When the member pays the rest, that payment is logged and the due amount drops to zero. The
            rate here is only for the example. Use the rate your CA gives you.
          </p>
        </ExampleBox>
        <ScreenshotPlaceholder
          alt="An invoice in the Fitvario dashboard showing the tax line and the due amount"
          caption="Placeholder. TODO: add a real screenshot of an invoice with a tax line."
        />
      </Section>

      <MidCta text="Want to see an invoice with tax lines and dues?" location="billing-mid" />

      <Section id="dues" title="Part payments and dues">
        <p>
          When a payment is only part of the total, the invoice stays open with the remaining due amount. Each time
          you collect more, Fitvario logs the payment with the time it was collected and updates the balance. You can
          set a date by which to chase the rest, and the dashboard lists dues for today, a summary of what is
          outstanding and the members who owe money. That is the practical core of gym partial payment dues tracking
          software: one place that remembers who owes what.
        </p>
      </Section>

      <Section id="tax" title="Tax lines and GST">
        <p>
          You create the tax lines for each gym yourself: a name such as GST, a percentage and, if you want, a tax
          number such as your GSTIN. You pick which of them apply to an invoice, and Fitvario keeps a breakdown per tax line, so you
          can see exactly how much of an invoice is tax. If you change the invoice, the tax is worked out again.
        </p>
        <p>
          Fitvario does not decide which rate applies to your memberships or how to file. Check the current rate and
          what must appear on an invoice with your CA or tax advisor.
        </p>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        More on the platform: the{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          features page
        </Link>
        , the{" "}
        <Link href="/features/gym-crm" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          gym CRM
        </Link>{" "}
        and{" "}
        <Link href="/support" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Support
        </Link>
        .
      </p>
    </ContentLayout>
  );
}
