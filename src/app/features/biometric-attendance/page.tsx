import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq, ExampleBox, ScreenshotPlaceholder } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";

const PATH = "/features/biometric-attendance";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "who", label: "Who it is for" },
  { id: "problem", label: "The problem today" },
  { id: "how", label: "How it works" },
  { id: "devices", label: "Devices" },
  { id: "access", label: "Blocking expired members" },
  { id: "limits", label: "What it does not do" },
  { id: "faq", label: "FAQs" },
  { id: "hinglish", label: "Hinglish FAQs" },
];

const faqs = [
  {
    q: "Which devices work?",
    a: "Devices that push their punches to a server using the ADMS protocol, which is how ZKTeco-style and eSSL-style fingerprint and face terminals work. Fitvario does not publish a list of device models. Send us the model before you buy, and we will tell you whether it fits.",
  },
  {
    q: "Does it open a door or turnstile?",
    a: "No. Fitvario blocks or restores a person on the device, and the device decides what its own relay or door does. Fitvario does not control a door lock or an access controller directly.",
  },
  {
    q: "Can one gym use more than one device?",
    a: "Yes. You can register several devices for a gym, for example one per entrance, and map each member to a user on each device.",
  },
  {
    q: "What happens when a member renews?",
    a: "Fitvario sends the new validity window to the device and restores access, so a renewed member does not need to be re-enrolled.",
  },
  {
    q: "Is it extra to use biometric attendance?",
    a: "The device is bought by the gym. Pricing for the software depends on your branches, members and messaging; see how Fitvario pricing works.",
  },
];

const hinglish = [
  {
    q: "Kaun si biometric machine chalegi?",
    a: "Woh machines jo ADMS protocol se server ko punch bhejti hain, jaise ZKTeco aur eSSL style devices. Machine kharidne se pehle model hume bhej dijiye, hum bata denge.",
  },
  {
    q: "Plan khatam hone par entry rukegi?",
    a: "Fitvario device par us member ka access block kar deta hai. Gate ya door lock ko device khud sambhalta hai.",
  },
  {
    q: "Kya QR aur biometric dono saath chal sakte hain?",
    a: "Haan, ek gym dono tarike use kar sakta hai. Pehle QR se shuru karke baad mein device jod sakte hain.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Biometric attendance for gyms: fingerprint and face devices"
      lead="Fitvario connects to fingerprint and face attendance devices that push their punches over the ADMS protocol, the way ZKTeco-style and eSSL-style terminals do. Each punch lands in the member's attendance record, members are mapped to users on the device, and a member whose plan has ended is blocked on the device until they renew. You register the device in the app; the device keeps working as its own machine."
      toc={toc}
      related={["/features/qr-attendance", "/features/member-app", "/features/whatsapp-reminders", "/pricing"]}
    >
      <Section id="who" title="Who it is for">
        <p>
          This is for gyms that want attendance they do not have to trust a member to record: larger gyms, gyms
          with a front desk that cannot watch the door, and owners who want expired members stopped at the entrance
          rather than chased later. If you are looking for gym fingerprint attendance software, have a ZKTeco gym software need, or already have an eSSL
          or similar terminal on the wall, this is the page for you.
        </p>
      </Section>

      <Section id="problem" title="The problem today">
        <p>
          A standalone fingerprint machine records who came, but the data stays inside the machine. Someone exports it
          to a computer and matches names by hand, and the machine does not know that a member&apos;s plan ended last
          week. The gym ends up with attendance in one place and memberships in another, and an expired member walking
          in as usual.
        </p>
      </Section>

      <Section id="how" title="How it works, step by step">
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong>Register the device.</strong> Add the device&apos;s serial number to the gym in the app. The
            serial number is how the device is recognised.
          </li>
          <li>
            <strong>Point the device at Fitvario.</strong> The device is set to push its punches to the Fitvario
            server. This is a device setting made once at installation.
          </li>
          <li>
            <strong>Map members to device users.</strong> Each member is matched to a user ID on the device. A member
            can be mapped on more than one device.
          </li>
          <li>
            <strong>Punches arrive.</strong> Each punch is saved as an attendance record for the member and shows in
            the punch log, which you can filter by device, date and member or staff.
          </li>
          <li>
            <strong>Access follows the plan.</strong> When a membership ends, Fitvario queues a command to the device
            that blocks the user. When the member renews, the new validity window is sent and access is restored.
          </li>
        </ol>
        <ExampleBox title="Example">
          <p>
            Arjun&apos;s plan ends on the 31st. On the 1st the device no longer accepts his finger. He renews at the
            desk, Fitvario sends the new end date to the device, and his next punch on the 2nd is accepted and counted
            in his attendance.
          </p>
        </ExampleBox>
        <ScreenshotPlaceholder screen="biometric-punches" />
      </Section>

      <MidCta text="Want to see how a device connects to a sample gym?" location="biometric-mid" />

      <Section id="devices" title="Devices">
        <p>
          Fitvario supports devices that use the ADMS push protocol. That covers many ZKTeco-style and eSSL-style
          fingerprint and face terminals, but not every model. We do not publish a model list, so
          the safe approach is to send us the exact model before you buy, and we will tell you whether it fits.
          Fitvario has been tested with a real device in production.
        </p>
        <p>
          A gym can register more than one device, for example one per entrance, and a gym attendance machine software
          set-up like this gives you one combined record for the member across all of them.
        </p>
      </Section>

      <Section id="access" title="Blocking expired members, and what &quot;access control&quot; means here">
        <p>
          For gym access control software in India the useful part is simple: a member whose plan has ended should
          not be let in without a conversation. Fitvario blocks that person on the device, and restores them when the
          plan is renewed. Owners can also block or unblock a person by hand.
        </p>
        <p>
          The blocking happens on the device, so what the door does depends on how your device and lock are wired.
        </p>
      </Section>

      <Section id="limits" title="What it does not do">
        <p>
          Fitvario does not drive a door lock or an access controller itself, and it does not replace the device&apos;s
          own set-up. It does not enrol fingerprints: members register their finger on the device itself.
        </p>
        <p>
          If you do not want hardware, <PageLink href="/features/qr-attendance">QR attendance</PageLink> needs only a
          printed code.
        </p>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <Section id="hinglish" title="Hinglish FAQs">
        <div lang="hi-Latn">
          <Faq items={hinglish} />
        </div>
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        See the{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          features page
        </Link>{" "}
        for the rest of the platform, or{" "}
        <Link href="/contact#demo" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          book a demo
        </Link>{" "}
        to talk about your device.
      </p>
    </ContentLayout>
  );
}
