"use client";

import { churn, churnScenarios } from "@/lib/calc/churn.mjs";
import { Assumption, Big, ErrorNote, NumberField, Panel, ShareBar, inr, pct, useShareableState } from "./ToolKit";

const TOOL = "churn";

const DEFAULTS = {
  start: 300,
  lost: 30,
  joined: 40,
  fee: 1200,
  margin: 100,
};

export function ChurnTool() {
  const { state: s, set, reset } = useShareableState(DEFAULTS);

  let base: ReturnType<typeof churn> | null = null;
  let scenarios: ReturnType<typeof churnScenarios> = [];
  let error = "";
  try {
    base = churn({
      startMembers: s.start,
      lostMembers: s.lost,
      newMembers: s.joined,
      monthlyFee: s.fee,
      grossMarginPercent: s.margin,
    });
    scenarios = churnScenarios({ startMembers: s.start, churnRate: base.churnRate, monthlyFee: s.fee });
  } catch (e) {
    error = e instanceof Error ? e.message : "Check the numbers";
  }

  const text = base
    ? `Gym churn: ${pct(base.churnRate)} a month, retention ${pct(base.retentionRate)}, average member stays ${
        base.lifetimeMonths === null ? "indefinitely" : base.lifetimeMonths.toFixed(1) + " months"
      }, ${inr(base.revenueLostPerMonth)} of monthly fees lost.`
    : "";

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Last month">
          <NumberField id="ch-start" label="Active members at the start of the month" value={s.start} onChange={(n) => set("start", n, TOOL)} />
          <NumberField id="ch-lost" label="Members who left (did not renew)" value={s.lost} onChange={(n) => set("lost", n, TOOL)} />
          <NumberField id="ch-joined" label="New members who joined" value={s.joined} onChange={(n) => set("joined", n, TOOL)} />
        </Panel>
        <Panel title="Money">
          <NumberField id="ch-fee" label="Average fee per member per month" prefix="₹" value={s.fee} onChange={(n) => set("fee", n, TOOL)} />
          <NumberField
            id="ch-margin"
            label="Share of the fee you keep"
            suffix="%"
            value={s.margin}
            onChange={(n) => set("margin", n, TOOL)}
            hint="Leave at 100 to value members at full fee. Lower it to count only what is left after variable costs."
          />
          <Assumption />
        </Panel>
      </div>

      {error && <ErrorNote message={error} />}

      {base && (
        <section aria-live="polite" className="space-y-4 rounded-xl border border-teal-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Your result</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Big label="Monthly churn" value={pct(base.churnRate)} note={`${s.lost} of ${s.start} members left`} />
            <Big label="Retention" value={pct(base.retentionRate)} note={`${pct(base.yearRetention, 0)} of today's members still here in a year at this rate`} />
            <Big
              label="Average time a member stays"
              value={base.lifetimeMonths === null ? "No exits" : `${base.lifetimeMonths.toFixed(1)} months`}
            />
            <Big
              label="Value of one member"
              value={base.lifetimeValue === null ? "n/a" : inr(base.lifetimeValue)}
              note="average lifetime times monthly fee kept"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Big label="Fees lost to churn each month" value={inr(base.revenueLostPerMonth)} />
            <Big label="Members at the end of the month" value={String(base.closingMembers)} note="start, minus lost, plus new" />
          </div>

          {scenarios.length > 0 && base.churnRate > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="mb-2 text-left text-sm font-semibold text-slate-900">If you cut churn</caption>
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600">
                    <th className="py-2 pr-4 font-medium">Churn falls by</th>
                    <th className="py-2 pr-4 font-medium">New monthly churn</th>
                    <th className="py-2 pr-4 font-medium">Members kept each month</th>
                    <th className="py-2 font-medium">Fees kept in a year</th>
                  </tr>
                </thead>
                <tbody>
                  {scenarios.map((r) => (
                    <tr key={r.reductionPercent} className="border-b border-slate-100">
                      <td className="py-2 pr-4">{r.reductionPercent}%</td>
                      <td className="py-2 pr-4">{pct(r.churnRate, 2)}</td>
                      <td className="py-2 pr-4">{r.membersSavedPerMonth.toFixed(1)}</td>
                      <td className="py-2">{inr(r.revenueSavedPerYear)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <ShareBar resultText={text} onReset={reset} />
        </section>
      )}
    </div>
  );
}
