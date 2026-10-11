"use client";

import { setupCost } from "@/lib/calc/startup.mjs";
import { Assumption, Big, ErrorNote, NumberField, Panel, ShareBar, inr, useShareableState } from "./ToolKit";

const TOOL = "startup-cost";

const DEFAULTS = {
  equipment: 1500000,
  interiors: 800000,
  deposit: 300000,
  licences: 50000,
  branding: 100000,
  software: 30000,
  prelaunch: 100000,
  other: 100000,
  running: 250000,
  months: 3,
  contingency: 10,
  area: 2500,
};

const ITEMS: { key: keyof typeof DEFAULTS; label: string; hint?: string }[] = [
  { key: "equipment", label: "Equipment (cardio, strength, accessories)" },
  { key: "interiors", label: "Interiors, flooring, air conditioning, lighting" },
  { key: "deposit", label: "Security deposit and advance rent" },
  { key: "licences", label: "Licences, registrations and legal", hint: "Rules differ by state and city. Check locally." },
  { key: "branding", label: "Branding and signage" },
  { key: "software", label: "Software and systems set-up" },
  { key: "prelaunch", label: "Pre-launch marketing" },
  { key: "other", label: "Everything else (furniture, lockers, first-aid, CCTV)" },
];

export function StartupTool() {
  const { state: s, set, reset } = useShareableState(DEFAULTS);

  let r: ReturnType<typeof setupCost> | null = null;
  let error = "";
  try {
    r = setupCost({
      items: ITEMS.map((i) => ({ name: i.label, amount: s[i.key] as number })),
      monthlyRunningCost: s.running,
      workingCapitalMonths: s.months,
      contingencyPercent: s.contingency,
      areaSqFt: s.area,
    });
  } catch (e) {
    error = e instanceof Error ? e.message : "Check the numbers";
  }

  const text = r
    ? `Gym set-up budget: one-time ${inr(r.oneTime)}, working capital ${inr(r.workingCapital)}, contingency ${inr(r.contingency)}, total ${inr(r.total)}.`
    : "";

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="One-time costs">
          {ITEMS.map((i) => (
            <NumberField
              key={i.key}
              id={`su-${i.key}`}
              label={i.label}
              prefix="₹"
              value={s[i.key] as number}
              hint={i.hint}
              onChange={(n) => set(i.key, n, TOOL)}
            />
          ))}
        </Panel>
        <Panel title="Running costs and buffer">
          <NumberField id="su-area" label="Gym area" suffix="sq ft" value={s.area} onChange={(n) => set("area", n, TOOL)} />
          <NumberField id="su-running" label="Monthly running cost" prefix="₹" value={s.running} onChange={(n) => set("running", n, TOOL)} hint="Rent, salaries, power and everything else that repeats every month." />
          <NumberField id="su-months" label="Months of running cost to keep in hand" value={s.months} onChange={(n) => set("months", n, TOOL)} hint="A new gym rarely fills on day one. This is the cushion until it does." />
          <NumberField id="su-cont" label="Contingency" suffix="%" value={s.contingency} onChange={(n) => set("contingency", n, TOOL)} hint="Extra for what you did not plan for." />
          <Assumption />
          <p className="text-[12px] leading-snug text-slate-500">
            Licences, fire and building rules, and tax treatment vary by state and city and change over time. Confirm
            them locally and with your CA before you commit money.
          </p>
        </Panel>
      </div>

      {error && <ErrorNote message={error} />}

      {r && (
        <section aria-live="polite" className="space-y-4 rounded-xl border border-teal-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Your set-up budget</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Big label="One-time costs" value={inr(r.oneTime)} />
            <Big label="Working capital" value={inr(r.workingCapital)} note={`${s.months} months of running cost`} />
            <Big label="Contingency" value={inr(r.contingency)} />
            <Big label="Total to arrange" value={inr(r.total)} note={r.perSqFt === null ? undefined : `${inr(r.perSqFt)} per sq ft`} />
          </div>
          <ShareBar resultText={text} onReset={reset} />
        </section>
      )}
    </div>
  );
}
