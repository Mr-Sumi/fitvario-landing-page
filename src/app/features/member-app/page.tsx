import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { isLive } from "@/lib/features";
import { playStoreUrl } from "@/config/site";
import { ContentLayout, Section, Faq, ScreenshotPlaceholder } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";

const PATH = "/features/member-app";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "who", label: "Who it is for" },
  { id: "problem", label: "The problem today" },
  { id: "what", label: "What members see" },
  { id: "branding", label: "Gym branding" },
  { id: "install", label: "Getting the app" },
  { id: "faq", label: "FAQs" },
  { id: "hinglish", label: "Hinglish FAQs" },
];

const faqs = [
  {
    q: "Is there an iPhone version?",
    a: "No. Fitvario is an Android app on Google Play. Members with an iPhone cannot use it today.",
  },
  {
    q: "Do owners, staff and members use different apps?",
    a: "No. It is one app, the Fitvario app on Google Play. What each person sees depends on whether they log in as an owner, a staff member or a member.",
  },
  {
    q: "How do members log in?",
    a: "With their mobile number and an OTP, or with a password if they have set one. The gym adds the member first, so the number must match what is on the member's profile.",
  },
  {
    q: "Can members pay their fees inside the app?",
    a: "The member app shows plan and subscription status. Fee collection is recorded by the gym, so ask your gym how it takes payments.",
  },
  {
    q: "Does the gym pay extra for the member app?",
    a: "The Android app for members is part of the platform. Pricing depends on your branches, members and messaging; see how Fitvario pricing works.",
  },
];

const hinglish = [
  {
    q: "Member app mein kya-kya dikhta hai?",
    a: "Member apna plan aur subscription status dekhta hai, gym ka QR scan karke check-in karta hai, apna progress dekhta hai aur gym ke alerts paata hai.",
  },
  {
    q: "Kya yeh iPhone par chalta hai?",
    a: "Abhi nahi. Fitvario sirf Android app hai, Google Play par milta hai.",
  },
  {
    q: "Member login kaise karta hai?",
    a: "Mobile number aur OTP se, ya password se agar member ne set kiya ho. Gym pehle member ko add karta hai, isliye number wahi hona chahiye jo profile mein hai.",
  },
  {
    q: "Kya gym ka naam aur logo app mein dikh sakta hai?",
    a: "Haan, gym owner apna app naam aur logo set kar sakta hai, jo splash screen par aur owner aur member ki home screen par dikhta hai.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Gym member app for Android: plan, QR check-in and progress"
      lead="Fitvario's member app gives each member of your gym a place to see their plan and subscription status, check in by scanning your gym's QR code, track their progress and receive alerts from the gym. It is one Android app on Google Play, the same Fitvario app that owners and staff use, with a role-based login that shows each person only their own side. Members do not need a separate gym app, and you do not have to build one. It is Android only."
      toc={toc}
      related={["/features/qr-attendance", "/features/white-label-gym-app", "/features/whatsapp-reminders", "/pricing"]}
    >
      <Section id="who" title="Who it is for">
        <p>
          This is for gym owners who want a gym member management app, and a gym management app in India, that members actually open: the member who
          wants to know when the plan ends, the one who checks in every morning and the one who likes to see numbers
          move. It also suits owners who are tired of answering &quot;when does my plan end?&quot; messages.
        </p>
      </Section>

      <Section id="problem" title="The problem today">
        <p>
          In most gyms the member&apos;s information lives with the desk: the end date in a register, the attendance
          on a sheet and the progress in a trainer&apos;s notebook. Members have to ask for all of it, and they ask
          at the busiest time of the day. A member app puts the same information in the member&apos;s own phone, so
          the desk is asked less and the member feels looked after.
        </p>
      </Section>

      <Section id="what" title="What members see in the app">
        <ul className="list-disc space-y-2 pl-5">
          {isLive("membership_lifecycle") && (
            <li>
              <strong>Plan and subscription status:</strong> which plan they are on and when it ends.
            </li>
          )}
          {isLive("qr_attendance") && (
            <li>
              <strong>QR check-in:</strong> scan your gym&apos;s QR code to check in, and scan again to check out when
              the gym uses two-scan mode.{" "}
              <PageLink href="/features/qr-attendance">How QR attendance works</PageLink>.
            </li>
          )}
          {isLive("member_progress_tracking") && (
            <li>
              <strong>Progress:</strong> BMI, BMR, body measurements and progress photos over time.
            </li>
          )}
          {isLive("referral_coins") && (
            <li>
              <strong>Referral rewards:</strong> a referral code to share, with rewards when a friend joins.
            </li>
          )}
          {isLive("whatsapp_sms_push_alerts") && (
            <li>
              <strong>Alerts from the gym:</strong> notifications, with{" "}
              <PageLink href="/features/whatsapp-reminders">WhatsApp reminders before a plan ends</PageLink> arriving
              on the member&apos;s phone.
            </li>
          )}
        </ul>
        <ScreenshotPlaceholder screen="member-home" />
      </Section>

      <MidCta text="Want to see the member side on a sample gym?" location="member-app-mid" />

      <Section id="branding" title="Gym branding: one app, your gym&apos;s name inside">
        <p>
          The member app is the Fitvario app. It is not a separate app published under your gym&apos;s name.{" "}
          {isLive("white_label") ? (
            <>
              It is not a branded gym app for members with its own store listing. What you can do is set your gym&apos;s app name
              and logo, and they show on the splash screen and on the owner&apos;s and members&apos; home screens. See{" "}
              <PageLink href="/features/white-label-gym-app">how the white-label branding works</PageLink> for what is
              and is not branded.
            </>
          ) : (
            "Branding options depend on your set-up; ask us what is available for your gym."
          )}
        </p>
      </Section>

      <Section id="install" title="Getting the app">
        <p>
          Members install the Fitvario app from Google Play on an Android phone, then log in with the mobile number the
          gym added for them. There is no iPhone version.
        </p>
        {playStoreUrl && (
          <p>
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="member-app-play"
              className="inline-flex min-h-12 items-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-teal-700 hover:border-teal-400"
            >
              Open on Google Play
            </a>
          </p>
        )}
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
        See everything on the{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          features page
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
