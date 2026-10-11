import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq, ExampleBox, ScreenshotPlaceholder } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { PageLink } from "@/components/PageLink";

const PATH = "/features/white-label-gym-app";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "who", label: "Who it is for" },
  { id: "problem", label: "The problem today" },
  { id: "how", label: "How branding works" },
  { id: "what", label: "What is and is not branded" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "Is this a gym app with own branding, like a custom-built app?",
    a: "It is branding inside the Fitvario app: your gym's name and logo. It is not a custom-built app. The app, its features and its store listing are shared with every Fitvario gym.",
  },
  {
    q: "Will my gym have its own listing on Google Play?",
    a: "No. Members install the Fitvario app from Google Play. Your gym's name and logo then show inside it. If you need an app published under your own name in the store, this is not that.",
  },
  {
    q: "Who sees the branding?",
    a: "Everyone in your organisation: you, your staff and your members. A different gym owner's members see that owner's branding, not yours.",
  },
  {
    q: "What do I need to set it up?",
    a: "An app name of your choice and a logo image in JPEG, PNG or WebP, up to 5 MB. The branding applies only when both are set and the switch is on.",
  },
  {
    q: "Can I turn it off without losing my logo?",
    a: "Yes. There is an on and off switch, so you can turn branding off and back on while the name and logo stay saved. You can also clear the branding completely.",
  },
  {
    q: "Is there an extra charge for it?",
    a: "Pricing depends on your branches, members and messaging, so ask for a quote and mention that you want branding. See how Fitvario pricing works.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="White label gym app for India: your gym's name and logo"
      lead="Fitvario lets a gym owner set an app name and upload a logo, and those show inside the Fitvario Android app for the owner, the staff and every member. It is a white label gym app in the sense of branding what your people see, not a separate app published under your name. Members install the same Fitvario app from Google Play, log in with their number and see your gym's name and logo."
      toc={toc}
      related={["/features/member-app", "/features/multi-branch-gym-software", "/pricing"]}
    >
      <Section id="who" title="Who it is for">
        <p>
          This is for owners who want members to feel the app belongs to their gym: a premium gym, a gym group or
          a studio that spends money on its name. If you want a gym app with your own branding without paying for a
          custom app, this covers that. If you need your own store listing, it does not.
        </p>
      </Section>

      <Section id="problem" title="The problem today">
        <p>
          A generic app asks the member to trust a name they do not know. Owners who invest in their gym&apos;s brand
          would rather see their own name when the member opens the phone. Building a custom app for one gym costs
          far more than most gyms should spend, and it has to be kept up to date.
        </p>
      </Section>

      <Section id="how" title="How branding works, step by step">
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong>Open the branding settings</strong> in the Fitvario app as the gym owner.
          </li>
          <li>
            <strong>Enter your app name</strong> (up to 100 characters).
          </li>
          <li>
            <strong>Upload a logo.</strong> JPEG, PNG or WebP, up to 5 MB. Fitvario compresses it for the app.
          </li>
          <li>
            <strong>Switch it on.</strong> The branding takes effect when both the name and the logo are set and the
            switch is on.
          </li>
        </ol>
        <ExampleBox title="Example">
          <p>
            A gym called Iron Temple sets &quot;Iron Temple Fitness&quot; and its logo. When its members open the
            Fitvario app they see that name and logo. Members of a different owner&apos;s gym see theirs.
          </p>
        </ExampleBox>
        <ScreenshotPlaceholder
          alt="The branding settings with an app name and logo in the Fitvario app"
          caption="Placeholder. TODO: add a real screenshot of the branding settings."
        />
      </Section>

      <MidCta text="Want to see a branded gym in the app?" location="whitelabel-mid" />

      <Section id="what" title="What is and is not branded">
        <p>
          Your app name and logo show to your owner, staff and members inside the app. The app itself is still the
          Fitvario app on Google Play: its store name, icon and listing are Fitvario&apos;s. If you manage several
          locations, the branding belongs to the owner, so all of your branches show the same name and logo.{" "}
          <PageLink href="/features/multi-branch-gym-software">See how multi-branch works</PageLink>.
        </p>
        <p>
          Colour themes and a branded app icon are not part of this feature. If those matter, tell us before you
          decide.
        </p>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        Related:{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          all features
        </Link>
        ,{" "}
        <PageLink href="/features/member-app">the member app</PageLink>, or{" "}
        <Link href="/contact#demo" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          book a demo
        </Link>
        .
      </p>
    </ContentLayout>
  );
}
