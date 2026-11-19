import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { isPublishedPath } from "@/config/pages";
import { ContentLayout, Section, Faq, ExampleBox, ScreenshotPlaceholder } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";

const PATH = "/features/razorpay-payments";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "who", label: "Who it is for" },
  { id: "problem", label: "The problem today" },
  { id: "how", label: "How it works" },
  { id: "capabilities", label: "What you can do" },
  { id: "india", label: "UPI, GST and WhatsApp" },
  { id: "limits", label: "What it does not do" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "Does Fitvario work with Razorpay?",
    a: "Yes, for paying Fitvario. Your Fitvario subscription and messaging credits are paid through Razorpay by UPI, card or net banking. Collecting your members' fees through Razorpay is not something Fitvario does today.",
  },
  {
    q: "Can my members pay their gym fees online inside Fitvario?",
    a: "Not today. Members pay your gym the way they already do, by UPI, cash, card or cheque, and your desk records each payment on the member's invoice. If online fee collection matters to you, tell us in the demo.",
  },
  {
    q: "Can I keep using my own Razorpay account for member fees?",
    a: "Yes. Keep sending your own Razorpay links or showing your UPI QR at the desk. Fitvario does not read payments from your Razorpay account, so the desk records each one in Fitvario with its reference number.",
  },
  {
    q: "Is my card safe when I pay for Fitvario?",
    a: "Card details are entered with Razorpay, an RBI-authorised payment gateway, and are not stored on Fitvario's servers.",
  },
  {
    q: "Is GST included in the Fitvario price?",
    a: "No. Fitvario quotes in rupees and GST is added on top. Pricing depends on your branches, active members and messaging volume. See how Fitvario pricing works.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Gym software with Razorpay: what Fitvario connects today"
      lead="Fitvario uses Razorpay, an RBI-authorised payment gateway, for one job today: you pay for your Fitvario subscription and messaging credits through it, by UPI, card or net banking, and your card details never reach our servers. Your members' fees work differently. Members pay your gym the way they already do, and your desk records each payment on the member's invoice with its UPI or cheque reference. Fitvario does not collect members' fees through Razorpay for you. This page explains what is connected, what is not, and how to run online fee payments alongside Fitvario."
      toc={toc}
      related={["/features/gst-billing", "/pricing", "/features", "/blog/gym-fee-collection-tips"]}
    >
      <Section id="who" title="Who it is for">
        <p>
          Owners search for gym software with Razorpay for two different reasons. Some want to pay for their software
          in rupees by UPI, without an international card. Others want members to pay gym fees online and see those
          payments land against the right name. Fitvario covers the first fully. For the second, it gives the desk one
          place to record every online payment, but the payment itself still goes through your own UPI ID or
          Razorpay account.
        </p>
      </Section>

      <Section id="problem" title="The problem today">
        <p>
          A member pays by UPI on a Sunday evening and sends a screenshot to the desk&apos;s WhatsApp. Another pays
          half in cash and promises the rest by Friday. By the end of the month the bank statement, the Razorpay
          dashboard and the register all show different totals, and nobody is sure which ₹2,500 belonged to whom.
        </p>
        <p>
          The trouble is rarely the payment app. It is the missing link between a payment and a member&apos;s plan,
          and a record of what is still due.
        </p>
      </Section>

      <Section id="how" title="How it works, step by step">
        <p>
          <strong>Paying for Fitvario.</strong> After the demo we agree your plan and set up your account. You then
          pay the subscription through Razorpay, and buy WhatsApp and SMS credits the same way when you need more.
        </p>
        <p>
          <strong>Recording a member&apos;s online payment.</strong>
        </p>
        <ol className="list-decimal space-y-3 pl-5">
          <li>The member pays your gym by UPI, for example by scanning your QR at the desk or using your own Razorpay link.</li>
          <li>Open the member&apos;s invoice in the Fitvario app.</li>
          <li>Collect the payment, choose online as the method and type the UPI reference from the member&apos;s payment screen.</li>
          <li>If the member paid only part, the invoice keeps the balance and you can set a date to follow it up.</li>
          <li>The dues list shows who still owes money, so the next shift does not have to ask around.</li>
        </ol>
        <ExampleBox title="Example">
          <p>
            Neha renews a six-month plan priced at ₹7,500. She pays ₹5,000 by UPI from her phone at the desk, and the
            desk records it as an online payment with the UPI reference from her screen. The invoice now shows ₹2,500
            due, with a follow-up date next Saturday. On Saturday she pays the rest in cash, the desk records it and
            the balance drops to zero. Anyone checking the invoice later sees both payments, their methods and the UPI
            reference.
          </p>
        </ExampleBox>
        <ScreenshotPlaceholder screen="invoice-tax-due" />
      </Section>

      <MidCta text="Want to see how the desk records a UPI payment?" location="razorpay-mid" />

      <Section id="capabilities" title="What you can do">
        <ul className="list-disc space-y-2 pl-5">
          <li>Pay your Fitvario subscription through Razorpay by UPI, card or net banking.</li>
          <li>Buy WhatsApp and SMS credits through Razorpay when your balance runs low.</li>
          <li>Record each member payment as cash, cheque, card or online, with a reference number.</li>
          <li>Take part payments and keep the remaining balance on the same invoice.</li>
          <li>See dues for today, a summary of what is outstanding and the members who owe money.</li>
          <li>
            Add your gym&apos;s tax lines to invoices, as described on{" "}
            <Link href="/features/gst-billing" className="font-medium text-teal-700 underline-offset-2 hover:underline">
              gym billing with tax lines and dues
            </Link>
            .
          </li>
        </ul>
      </Section>

      <Section id="india" title="UPI, GST and WhatsApp">
        <p>
          Most Indian members now pay by UPI, so the reference number is your best proof of payment. Ask the desk to
          type it every time. It takes seconds and settles most disputes before they start.
        </p>
        <p>
          Fitvario&apos;s own price is quoted in rupees with GST on top. For your members&apos; invoices, you set up
          the tax lines your gym uses. Which GST rate applies to your memberships, and what must appear on the
          invoice, is a question for your CA or tax advisor.
        </p>
        <p>
          {isPublishedPath("/features/whatsapp-reminders") ? (
            <>
              Members also get{" "}
              <Link href="/features/whatsapp-reminders" className="font-medium text-teal-700 underline-offset-2 hover:underline">
                WhatsApp reminders before their membership ends
              </Link>
              , which is often when a renewal payment happens.
            </>
          ) : (
            "Renewal time is often when an online payment happens, so keep your UPI details easy to find."
          )}{" "}
          For a routine your desk can follow, read{" "}
          <Link href="/blog/gym-fee-collection-tips" className="font-medium text-teal-700 underline-offset-2 hover:underline">
            how to collect gym fees on time
          </Link>
          .
        </p>
      </Section>

      <Section id="limits" title="What it does not do">
        <p>
          Fitvario does not collect members&apos; fees through Razorpay, does not send members a payment link and does
          not read settlements from your own Razorpay account. Online payments from members are recorded by your
          team. If you need members to pay inside the gym&apos;s software, say so in the demo and we will tell you
          plainly where that stands.
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
        <Link href="/tools/gym-membership-pricing-calculator" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          membership pricing calculator
        </Link>
        ,{" "}
        <Link href="/pricing" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          pricing
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
