import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { isLive } from "@/lib/features";
import { ContentLayout, Section, Faq, ExampleBox, ScreenshotPlaceholder } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";

const PATH = "/features/qr-attendance";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "who", label: "Who it is for" },
  { id: "problem", label: "The problem today" },
  { id: "how", label: "How QR attendance works" },
  { id: "modes", label: "Single and dual scan" },
  { id: "vs", label: "QR or biometric?" },
  { id: "limits", label: "What it does not do" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "Is there one QR code per member?",
    a: "No. There is one QR code per gym. Every member scans the same code with their own app, and the app knows who is scanning.",
  },
  {
    q: "Can someone scan from home?",
    a: "The scan is a QR code plus a login, so a person must be logged in to the app. The code identifies your gym and cannot be edited, but it does not prove that the phone is physically at the gym. If that matters to you, keep the QR code printed at the entrance and not shared online.",
  },
  {
    q: "What if a member forgets to scan out?",
    a: "In dual scan mode a member who scans in and never scans again has a check-in without a check-out time. Single scan mode avoids the problem because it records the visit with one scan.",
  },
  {
    q: "Do staff scan the same code?",
    a: "Yes. Staff assigned to the gym scan the same gym QR code with their own login. Staff and members can use different modes.",
  },
  {
    q: "Does it need a special device?",
    a: "No. A printed or displayed QR code and members' own phones are enough. For a fingerprint or face device, see biometric attendance.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Gym attendance app with QR code check-in"
      lead="Fitvario gives each gym one QR code. Members and staff scan it with the Fitvario app, and the scan is saved as that day's attendance with the time. In dual scan mode the first scan checks the person in and the next scan checks them out, so the gym also gets time spent. In single scan mode one scan marks the visit. There is nothing to install at the entrance except a printed or displayed code."
      toc={toc}
      related={["/features/biometric-attendance", "/features/member-app", "/features/whatsapp-reminders", "/pricing"]}
    >
      <Section id="who" title="Who it is for">
        <p>
          This is for gyms that still use a paper register or a shared sheet and want a simple gym attendance app QR code
          setup that needs no hardware. It suits small and mid-size gyms, studios and multi-branch groups,
          because the only fixed cost is a printed code.
        </p>
      </Section>

      <Section id="problem" title="The problem today">
        <p>
          Paper registers are filled in by whoever is at the desk, usually after the rush. Names are misspelt, some
          members are missed and nobody can say how often a member really came. Without that, an owner cannot tell
          which members are about to drift away or when the floor is full.
        </p>
      </Section>

      <Section id="how" title="How QR attendance works, step by step">
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong>The gym gets its QR code.</strong> The owner opens the gym&apos;s QR code in the app and prints it
            or shows it at the entrance. It is signed, so an edited or copied-and-altered code is rejected.
          </li>
          <li>
            <strong>The member scans it.</strong> They open the Fitvario app, scan the code and the app records the
            visit against their account for that gym.
          </li>
          <li>
            <strong>The record is saved.</strong> The date and time are stored with the member&apos;s name. Only
            members of that gym, and staff assigned to it, can scan its code.
          </li>
          <li>
            <strong>The owner sees it.</strong> Attendance records are available to the owner and to staff who have the
            permission.
          </li>
        </ol>
        <ExampleBox title="Example">
          <p>
            Priya scans the QR code at 6:10 a.m. and the gym is in dual scan mode, so that is her check-in. At 7:20 she
            scans again on the way out and the record shows she was there for 1 hour 10 minutes. Nobody at the desk
            wrote anything down.
          </p>
        </ExampleBox>
        <ScreenshotPlaceholder
          alt="A member scanning the gym QR code in the Fitvario app"
          caption="Placeholder. TODO: add a real screenshot of the scan screen."
        />
      </Section>

      <MidCta text="Want to see a QR check-in on a sample gym?" location="qr-mid" />

      <Section id="modes" title="Single and dual scan modes">
        <p>
          Each gym chooses how scans are counted, and members and staff can use different modes:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Single scan:</strong> the first scan of the day marks the person present. No check-out is needed.
          </li>
          <li>
            <strong>Dual scan:</strong> the first scan is the check-in and the next scan is the check-out. The time
            spent is worked out for you.
          </li>
        </ul>
        {isLive("manual_bulk_attendance") && (
          <p>
            If someone cannot scan, an owner or permitted staff member can also mark attendance by hand, one person
            at a time or in bulk.
          </p>
        )}
        {isLive("attendance_analytics") && (
          <p>Attendance analytics and a top attenders list help you see who comes regularly and who has stopped.</p>
        )}
      </Section>

      <Section id="vs" title="QR or biometric attendance?">
        <p>
          QR check-in is the cheaper and quicker way to start: no hardware, and members use their own phones. It trusts
          the member to scan honestly. A fingerprint or face device at the door is stronger on identity and can block
          members whose plan has ended. Many gyms start with QR and add a device later.{" "}
          <PageLink href="/features/biometric-attendance">Read how biometric attendance works</PageLink>.
        </p>
      </Section>

      <Section id="limits" title="What it does not do">
        <p>
          A QR scan records a visit. It does not stop an expired member from entering the gym, because there is no door
          lock in this set-up, and it does not check where the phone is. If you need entry control, a biometric device
          is the tool for that.
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
        , or{" "}
        <Link href="/pricing" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          how pricing works
        </Link>
        .
      </p>
    </ContentLayout>
  );
}
