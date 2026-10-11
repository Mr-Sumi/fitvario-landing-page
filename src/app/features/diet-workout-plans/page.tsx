import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq, ExampleBox } from "@/components/ContentLayout";

// DRAFT. Gated on workout_diet_plans, which the owner says is not available.
// Written from the backend code so it is ready; not linked or published until the flag is live.
const PATH = "/features/diet-workout-plans";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "who", label: "Who it is for" },
  { id: "how", label: "How plans work" },
  { id: "members", label: "What members do" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "Can I reuse a plan for many members?",
    a: "Yes. Build a template once and assign it to individual members, and restart or remove it later.",
  },
  {
    q: "Can members ask for a plan?",
    a: "Members can send a request and the owner approves or rejects it.",
  },
  {
    q: "Does Fitvario write the plan?",
    a: "No. You or your trainer build it. Fitvario stores it and tracks completion.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Gym diet plan and workout plan software"
      lead="Fitvario lets trainers build workout plans and diet plans day by day, assign them to individual members and track completion in the member's app. Plans are made of days, and each day holds exercises or meals. Members mark days and exercises done, and the gym restarts or replaces a plan when it is time. This is a gym diet plan software and workout plan builder for gym trainers."
      toc={toc}
      related={["/features/member-app", "/features/gym-crm", "/pricing"]}
    >
      <Section id="who" title="Who it is for">
        <p>
          Gyms with trainers who write plans on paper or in a chat and lose track of who is on which plan.
        </p>
      </Section>
      <Section id="how" title="How plans work">
        <ol className="list-decimal space-y-3 pl-5">
          <li>Create a plan template with days.</li>
          <li>Add exercises to each workout day, or meals and items to each diet day.</li>
          <li>Assign the plan to a member.</li>
          <li>Restart or remove it when the cycle ends.</li>
        </ol>
        <ExampleBox>
          <p>A trainer builds a 4-day workout plan once and assigns it to twelve members in an afternoon.</p>
        </ExampleBox>
      </Section>
      <Section id="members" title="What members do">
        <p>Members see their assigned plan, mark exercises and days complete and can ask for a new plan.</p>
      </Section>
      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>
      <p className="text-[15px] text-slate-600">
        See <Link href="/features" className="font-medium text-teal-700 hover:underline">all features</Link>.
      </p>
    </ContentLayout>
  );
}
