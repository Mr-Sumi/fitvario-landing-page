"use client";

import { useState } from "react";
import { track } from "@/lib/track";
import { DIET_TYPES, GOALS, mealPlan, planAsText, type DietType, type Goal } from "@/content/dietCharts";

export function DietCharts() {
  const [diet, setDiet] = useState<DietType>("veg");
  const [goal, setGoal] = useState<Goal>("fatloss");
  const [note, setNote] = useState("");

  function pick<T>(setter: (v: T) => void, v: T) {
    track("calculator_use", { tool: "diet-charts" });
    setter(v);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(planAsText(diet, goal));
      setNote("Chart copied");
    } catch {
      setNote("Copy is not available in this browser.");
    }
    setTimeout(() => setNote(""), 2500);
  }

  const goalInfo = GOALS.find((g) => g.value === goal);
  const btn = (active: boolean) =>
    `inline-flex h-11 items-center rounded-lg border px-4 text-sm font-semibold transition ${
      active ? "border-teal-700 bg-teal-700 text-white" : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
    }`;

  return (
    <div className="space-y-5">
      <div className="space-y-3 print:hidden">
        <div>
          <p className="text-sm font-medium text-slate-800">Food preference</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {DIET_TYPES.map((d) => (
              <button key={d.value} type="button" aria-pressed={diet === d.value} className={btn(diet === d.value)} onClick={() => pick(setDiet, d.value)}>
                {d.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-800">Goal</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {GOALS.map((g) => (
              <button key={g.value} type="button" aria-pressed={goal === g.value} className={btn(goal === g.value)} onClick={() => pick(setGoal, g.value)}>
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" aria-live="polite">
        <h3 className="text-base font-semibold text-slate-900">
          {DIET_TYPES.find((d) => d.value === diet)?.label} chart for {goalInfo?.label.toLowerCase()}
        </h3>
        <p className="mt-1 text-sm text-slate-600">{goalInfo?.note}</p>
        <dl className="mt-4 divide-y divide-slate-100">
          {mealPlan(diet, goal).map((m) => (
            <div key={m.slot} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr]">
              <dt className="text-sm font-semibold text-slate-900">{m.slot}</dt>
              <dd className="text-sm text-slate-700">
                <ul className="list-disc space-y-0.5 pl-5">
                  {m.options.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-[12px] leading-snug text-slate-500">
          General information only, not medical or personal dietary advice. Pick one option for each meal. Anyone with a
          medical condition, an allergy, who is pregnant or on medication should see a qualified dietitian or doctor.
        </p>
      </section>

      <div className="flex flex-wrap items-center gap-2 print:hidden">
        <button type="button" onClick={copy} className="inline-flex h-11 items-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50">
          Copy chart
        </button>
        <button type="button" onClick={() => window.print()} className="inline-flex h-11 items-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50">
          Print
        </button>
        <span aria-live="polite" className="text-[13px] text-teal-800">
          {note}
        </span>
      </div>
    </div>
  );
}
