import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq, ExampleBox, ScreenshotPlaceholder } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";

const PATH = "/features/gym-crm";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "who", label: "Who it is for" },
  { id: "problem", label: "The problem today" },
  { id: "how", label: "How it works" },
  { id: "capabilities", label: "What you can do" },
  { id: "limits", label: "What it does not do" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "Can my front-desk staff use it?",
    a: "Yes. You choose what each staff member can do in the CRM: view enquiries, add them, add follow-ups, edit or delete. A receptionist can log follow-ups without being able to delete enquiries.",
  },
  {
    q: "Can I add my own enquiry sources and customer types?",
    a: "Yes. Each gym keeps its own list of enquiry types and customer categories, so you can use names that match how people reach you.",
  },
  {
    q: "Will Fitvario remind me when a follow-up is due?",
    a: "You see the list of today's follow-ups whenever you open the CRM. Fitvario does not send a separate reminder message for follow-ups, so make opening that list part of the front desk's morning routine.",
  },
  {
    q: "Are enquiries shared across branches?",
    a: "Each enquiry belongs to one branch. If you run several branches, every branch keeps its own enquiries and its own follow-up list.",
  },
  {
    q: "What does the CRM cost?",
    a: "The CRM is one of the modules in the platform, and pricing depends on your branches, members and messaging. See how Fitvario pricing works.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Gym CRM software for Indian gyms: enquiries and follow-ups"
      lead="Fitvario's gym CRM keeps every walk-in enquiry in one place with the next follow-up date, and shows you today's follow-ups as a single list. You record who enquired, which plan they asked about and when to call back. Each follow-up adds a dated note. It replaces the front-desk notebook and the numbers lost in WhatsApp chats. Fitvario does not call or message the lead for you. It tells you who is due."
      toc={toc}
      related={["/features/whatsapp-reminders", "/pricing", "/features"]}
    >
      <Section id="who" title="Who it is for">
        <p>
          This is for gym owners and front-desk teams who get enquiries every day, by walk-in, phone call or a
          message, and want to turn more of them into members. It works as a gym lead management software for a single
          gym, and each branch of a multi-branch gym gets its own.
        </p>
      </Section>

      <Section id="problem" title="The problem today">
        <p>
          A typical enquiry starts as a name and a number in a notebook, a note on a phone or a chat that is already
          buried. The person says &quot;I will come on Monday&quot; and nobody writes down Monday. A week later no one
          remembers who asked about the three-month plan or whether anyone called back. The gym pays for ads and
          Instagram posts, then loses the people they brought in.
        </p>
        <p>
          A spreadsheet helps until two people edit it, or the follow-up column fills with dates nobody checks.
        </p>
      </Section>

      <Section id="how" title="How it works, step by step">
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong>Log the enquiry.</strong> Enter the date, name and phone number, how they found you (enquiry
            type), what kind of customer they are (category), the plan they asked about and any notes.
          </li>
          <li>
            <strong>Set the next follow-up date.</strong> If you add a date when you create the enquiry, Fitvario
            creates the first follow-up entry for you.
          </li>
          <li>
            <strong>Log each follow-up.</strong> After every call or visit, add a dated note. The newest follow-up
            date becomes the enquiry&apos;s next follow-up date.
          </li>
          <li>
            <strong>Open today&apos;s follow-ups.</strong> One list shows every active enquiry due today, so the desk
            knows exactly whom to call.
          </li>
          <li>
            <strong>Close it out.</strong> When the person joins or says no, record the outcome in the closing note
            and add them as a member if they signed up.
          </li>
        </ol>
        <ExampleBox title="Example">
          <p>
            Rohit walks in on the 3rd and asks about a three-month plan. The desk logs him as a walk-in, notes the
            plan and sets a follow-up for the 5th. On the 5th the call goes unanswered and the desk adds a note and a
            new date, the 8th. On the 8th he agrees to come in. The desk adds him as a member and notes the outcome.
            Every step is visible to anyone with access.
          </p>
        </ExampleBox>
        <ScreenshotPlaceholder
          alt="The list of today's enquiry follow-ups in the Fitvario dashboard"
          caption="Placeholder. TODO: add a real screenshot of the follow-ups list."
        />
      </Section>

      <MidCta text="Want to see the enquiry list on a sample gym?" location="crm-mid" />

      <Section id="capabilities" title="What you can do">
        <ul className="list-disc space-y-2 pl-5">
          <li>Keep every enquiry with its phone number, plan of interest and notes in one list.</li>
          <li>Create your own enquiry types and customer categories, such as walk-in, referral or student.</li>
          <li>Attach a full history of dated follow-up notes to each enquiry.</li>
          <li>See today&apos;s follow-ups at a glance as a gym enquiry follow up app for the front desk.</li>
          <li>Give staff only the CRM rights you want them to have, including view, add, follow-up and delete.</li>
          <li>Work from the web dashboard on a phone or a computer.</li>
        </ul>
        <p>
          Gym CRM software in India is mostly about discipline: the same list, checked every day. Fitvario gives the
          desk that list. You can see how the other parts connect on the{" "}
          <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
            features page
          </Link>
          .
        </p>
      </Section>

      <Section id="limits" title="What it does not do">
        <p>
          The CRM does not message or call leads for you, and it does not send you a reminder when a follow-up is
          due. It is a clear, shared list that your team works through. If you want members, not leads, to get
          automatic messages, see{" "}
          <Link href="/features/whatsapp-reminders" className="font-medium text-teal-700 underline-offset-2 hover:underline">
            WhatsApp reminders for gym membership renewals
          </Link>
          .
        </p>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        Questions about how it fits your gym? Visit{" "}
        <Link href="/support" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Support
        </Link>
        , check{" "}
        <Link href="/pricing" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          pricing
        </Link>{" "}
        or{" "}
        <Link href="/about" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          read about Fitvario
        </Link>
        .
      </p>
    </ContentLayout>
  );
}
