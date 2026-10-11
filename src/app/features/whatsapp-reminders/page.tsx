import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { isLive } from "@/lib/features";
import { ContentLayout, Section, Faq, ExampleBox, ScreenshotPlaceholder } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";

const PATH = "/features/whatsapp-reminders";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "who", label: "Who it is for" },
  { id: "problem", label: "The problem with reminding by hand" },
  { id: "how", label: "How the reminders work" },
  { id: "messages", label: "Which WhatsApp messages go out" },
  { id: "control", label: "What you control" },
  { id: "credits", label: "Credits" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "Do members need to install anything to get the reminders?",
    a: "No. The reminder arrives as an ordinary WhatsApp message on the mobile number saved in the member's profile.",
  },
  {
    q: "Can I turn a reminder off?",
    a: "Yes. In your notification preferences you can switch individual messages on or off, for example the expiring-soon message or the birthday wish. A message you switch off is skipped.",
  },
  {
    q: "Do I get a copy of every member's reminder?",
    a: "No. Membership reminders go to the member only. They are a matter between the member and the gym, so they do not flood the owner's phone.",
  },
  {
    q: "Do members who have already renewed still get a reminder?",
    a: "No. The reminder looks at each member's current end date, so a member who has renewed is not reminded about the old one.",
  },
  {
    q: "What does it cost to send reminders?",
    a: "Each WhatsApp message uses credits from your gym's messaging wallet. A messaging allowance is part of every plan, and the right size depends on your member count, so we work it out with you. See how Fitvario pricing works.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="WhatsApp reminders for gym membership renewals"
      lead="Fitvario sends automated WhatsApp reminders to your members before their gym membership ends, and a message the day after it expires. The reminders go out 7, 3 and 1 days before the end date. You do not type or send anything. Each message uses one credit from your gym's messaging wallet, and you can switch individual messages on or off."
      toc={toc}
      related={["/features/gym-crm", "/pricing", "/features"]}
    >
      <Section id="who" title="Who it is for">
        <p>
          This is for gym owners and front-desk teams who lose renewals because nobody remembered to message the
          member in time. It suits a single gym with a few hundred members just as well as a franchise group. The
          gym membership renewal reminder runs on its own, which makes this gym WhatsApp automation for the job that
          costs gyms the most: renewals. It does not depend on who is at the desk that day.
        </p>
      </Section>

      <Section id="problem" title="The problem with reminding members by hand">
        <p>
          Most gyms still track expiry dates in Excel or a paper register and remind people from the owner&apos;s
          phone or a WhatsApp group. It works while you have forty members. Past that, someone has to scan the sheet
          every morning, copy numbers, type the same message again and again, and remember who they already told.
          Miss a few days and the member quietly drifts away. The cost is a lost renewal that one message would have
          saved.
        </p>
        <p>
          Group messages make it worse: a reminder posted in a group is read by everyone, answered by no one, and
          scrolls out of sight within hours.
        </p>
      </Section>

      <Section id="how" title="How the reminders work, step by step">
        <ol className="list-decimal space-y-3 pl-5">
          <li>Every member has a plan with an end date. That date is the only thing the reminder needs.</li>
          <li>
            Once a day, Fitvario looks for memberships that end in 7 days, 3 days and 1 day, and for memberships that
            ended yesterday.
          </li>
          <li>
            It skips memberships that are not active, so only members who are really about to lapse are contacted.
          </li>
          <li>
            For each of the others it sends a WhatsApp message to the member&apos;s mobile number: an &quot;expiring
            soon&quot; message on the three reminder days and an &quot;expired&quot; message the day after the end
            date.
          </li>
          <li>
            Each message uses credit from your gym&apos;s messaging wallet. If the wallet has no credit, the message
            is not sent, so keep an eye on the balance.
          </li>
        </ol>
        <ExampleBox title="Example">
          <p>
            A member&apos;s plan ends on the 20th. They get a reminder on the 13th, another on the 17th and another
            on the 19th. If the plan lapses, a message arrives on the 21st. Nobody at the gym sent any of them.
          </p>
        </ExampleBox>
        <ScreenshotPlaceholder
          alt="The membership expiring WhatsApp message as it appears on a member's phone"
          caption="Placeholder. TODO: add a real screenshot of the expiry reminder."
        />
      </Section>

      <MidCta text="Want to see the reminders running on a sample gym?" location="whatsapp-mid" />

      <Section id="messages" title="Which WhatsApp messages go out">
        <p>
          This page covers two kinds of automatic WhatsApp message, and both run once a day without anyone at the
          gym sending them:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Membership expiring soon:</strong> to the member, 7, 3 and 1 days before the plan ends.
          </li>
          <li>
            <strong>Membership expired:</strong> to the member, the day after the plan ended.
          </li>
          {isLive("whatsapp_birthday_messages") && (
            <li>
              <strong>Birthday wishes:</strong> to the member on their birthday, with a separate birthday alert to the
              owner.
            </li>
          )}
        </ul>
        <p>
          Fitvario does not send automatic WhatsApp reminders for unpaid balances. To follow up on dues, use the dues
          list in the app and message the member yourself.
        </p>
        <p>
          WhatsApp lets businesses send this kind of message only from pre-approved templates, so the wording follows
          a template for each message type.
        </p>
      </Section>

      <Section id="control" title="What you control">
        <p>
          You decide which messages are on. Each one has its own switch in your notification preferences, and a
          switched-off message is skipped. Reminders go to members, not to you, so your own phone stays quiet.
        </p>
        <p>
          Fitvario keeps the templates and sending set-up in order. If you have a question about a message, write to{" "}
          <Link href="/support" className="font-medium text-teal-700 underline-offset-2 hover:underline">
            Fitvario Support
          </Link>
          .
        </p>
      </Section>

      <Section id="credits" title="Credits">
        <p>
          Messaging runs on credits in a wallet that belongs to your gym. Each message deducts credit when it is
          sent. A messaging allowance is included in every plan, and how big it needs to be depends on how many
          members you have and how many messages you switch on. Read{" "}
          <Link href="/pricing" className="font-medium text-teal-700 underline-offset-2 hover:underline">
            how Fitvario pricing works
          </Link>{" "}
          or{" "}
          <Link href="/contact#demo" className="font-medium text-teal-700 underline-offset-2 hover:underline">
            ask for a demo
          </Link>{" "}
          and we will size it for your gym.
        </p>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        WhatsApp reminders are one part of the platform. See everything on the{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          features page
        </Link>
        , learn about the{" "}
        <Link href="/features/gym-crm" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          gym CRM for enquiries and follow-ups
        </Link>
        , or read{" "}
        <Link href="/about" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          about Fitvario
        </Link>
        .
      </p>
    </ContentLayout>
  );
}
