import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContentLayout, Section, Faq } from "@/components/ContentLayout";
import { MidCta } from "@/components/MidCta";
import { DietCharts } from "@/components/tools/DietCharts";

const PATH = "/templates/diet-charts";
export const metadata = buildMetadata(PATH);

const toc = [
  { id: "charts", label: "The charts" },
  { id: "use", label: "How to use a chart" },
  { id: "goals", label: "How the goals differ" },
  { id: "limits", label: "What these charts are not" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    q: "Are these personal diet plans?",
    a: "No. They are general templates built from everyday Indian foods, meant as a starting point for a conversation with a member or a dietitian.",
  },
  {
    q: "Why are there no calorie numbers?",
    a: "Calorie and protein needs depend on a person's age, weight, activity and health. A single number on a template would suit very few people, so these charts leave it out.",
  },
  {
    q: "Can I change the foods?",
    a: "Yes. Copy the chart, replace what the member does not eat or cannot get, and keep the structure of the meals.",
  },
  {
    q: "What about members with a medical condition?",
    a: "Anyone with diabetes, a thyroid or kidney problem, an allergy, who is pregnant or on medication should get advice from a qualified dietitian or doctor, not from a template.",
  },
  {
    q: "Is there a Jain, vegan or regional version?",
    a: "Not yet. The three food preferences here are a starting point.",
  },
];

export default function Page() {
  return (
    <ContentLayout
      path={PATH}
      h1="Indian diet chart for gym members: printable templates"
      lead="Choose a food preference and a goal to see a simple one-day Indian diet chart with options for each meal. The templates use everyday foods such as dal, roti, curd, sprouts, paneer and eggs, and cover fat loss, muscle gain and maintenance. Copy a chart or print it. They are general information, not personal dietary advice."
      toc={toc}
      related={["/features", "/pricing", "/features/gym-crm"]}
    >
      <section id="charts" className="scroll-mt-24">
        <h2 className="sr-only">The charts</h2>
        <DietCharts />
      </section>

      <MidCta text="Keep each member's plan and progress in one place." location="diet-mid" />

      <Section id="use" title="How to use a chart">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Pick the food preference that matches the member.</li>
          <li>Pick the goal. The note under it explains how the plan leans.</li>
          <li>For each meal, choose one option, not all of them.</li>
          <li>Adjust portions to the person, their routine and their appetite.</li>
          <li>Copy or print the chart and go through it with the member.</li>
        </ol>
      </Section>

      <Section id="goals" title="How the goals differ">
        <p>
          The three goals share the same structure of meals. They differ in how much grain goes on the plate, whether
          a snack sits around training, and how protein-heavy the dinner is. A fat-loss chart keeps grains lighter and
          dinner lighter. A muscle-gain chart adds larger portions of roti and rice and a snack before training. A
          maintenance chart sits between them.
        </p>
      </Section>

      <Section id="limits" title="What these charts are not">
        <p>
          They are not a prescription, and they are not tailored. A trainer who hands them out should say so. They
          work best as a conversation starter that shows a member what a balanced day of Indian food can look like,
          and they stop being useful the moment a member&apos;s health or goals need individual attention.
        </p>
        <p>
          For anything beyond general guidance, send the member to a qualified dietitian. The charts will have
          done their job if they got that conversation started.
        </p>
      </Section>

      <Section id="faq" title="FAQs">
        <Faq items={faqs} />
      </Section>

      <p className="text-[15px] leading-relaxed text-slate-600">
        Learn what else{" "}
        <Link href="/features" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          Fitvario does for gyms
        </Link>
        , or{" "}
        <Link href="/contact#demo" className="font-medium text-teal-700 underline-offset-2 hover:underline">
          book a demo
        </Link>
        .
      </p>
    </ContentLayout>
  );
}
