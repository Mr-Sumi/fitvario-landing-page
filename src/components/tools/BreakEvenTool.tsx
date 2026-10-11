"use client";

import { breakEven } from "@/lib/calc/breakEven.mjs";
import { Assumption, Big, ErrorNote, NumberField, Panel, SelectField, ShareBar, inr, useShareableState } from "./ToolKit";

const TOOL = "break-even";
const TIER_RENT: Record<string, number> = { "1": 60, "2": 35, "3": 18 };

const DEFAULTS = {
  tier: "2",
  areaSqFt: 2500,
  rentPerSqFt: 35,
  trainers: 60000,
  utilities: 25000,
  equipmentEmi: 30000,
  marketing: 15000,
  software: 5000,
  other: 10000,
  fee: 1200,
  feeIncludesGst: false,
  gstRate: 18,
  variable: 0,
  membersNow: 100,
};

export function BreakEvenTool() {
  const { state: s, set, reset } = useShareableState(DEFAULTS);
  const rent = s.areaSqFt * s.rentPerSqFt;

  let result: ReturnType<typeof breakEven> | null = null;
  let error = "";
  try {
    result = breakEven({
      fixedCosts: [rent, s.trainers, s.utilities, s.equipmentEmi, s.marketing, s.software, s.other],
      feePerMember: s.fee,
      feeIncludesGst: s.feeIncludesGst,
      gstRatePercent: s.gstRate,
      variableCostPerMember: s.variable,
      membersNow: s.membersNow,
    });
  } catch (e) {
    error = e instanceof Error ? e.message : "Check the numbers";
  }

  const text = result
    ? result.reachable
      ? `Gym break-even: ${result.breakEvenMembers} members. Fixed costs ${inr(result.fixed)} a month, ${inr(result.netFee)} income per member after GST. At ${s.membersNow} members the monthly result is ${inr(result.profitAtMembersNow)}.`
      : "With these numbers each member costs more than they bring in, so break-even is not reachable."
    : "";

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Your fixed monthly costs">
          <SelectField
            id="be-tier"
            label="City tier (sets an illustrative rent per sq ft)"
            value={s.tier}
            onChange={(v) => {
              set("tier", v, TOOL);
              set("rentPerSqFt", TIER_RENT[v] ?? 35, TOOL);
            }}
            options={[
              { value: "1", label: "Tier 1 metro" },
              { value: "2", label: "Tier 2 city" },
              { value: "3", label: "Tier 3 town" },
            ]}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField id="be-area" label="Gym area" suffix="sq ft" value={s.areaSqFt} onChange={(n) => set("areaSqFt", n, TOOL)} />
            <NumberField id="be-rentsf" label="Rent per sq ft" prefix="₹" value={s.rentPerSqFt} onChange={(n) => set("rentPerSqFt", n, TOOL)} />
          </div>
          <p className="text-sm text-slate-700">
            Rent per month: <strong>{inr(rent)}</strong>
          </p>
          <NumberField id="be-trainers" label="Trainer and staff salaries" prefix="₹" value={s.trainers} onChange={(n) => set("trainers", n, TOOL)} />
          <NumberField id="be-util" label="Electricity, water, internet" prefix="₹" value={s.utilities} onChange={(n) => set("utilities", n, TOOL)} />
          <NumberField id="be-emi" label="Equipment EMI or lease" prefix="₹" value={s.equipmentEmi} onChange={(n) => set("equipmentEmi", n, TOOL)} />
          <NumberField id="be-mkt" label="Marketing" prefix="₹" value={s.marketing} onChange={(n) => set("marketing", n, TOOL)} />
          <NumberField id="be-soft" label="Software and subscriptions" prefix="₹" value={s.software} onChange={(n) => set("software", n, TOOL)} />
          <NumberField id="be-other" label="Everything else" prefix="₹" value={s.other} onChange={(n) => set("other", n, TOOL)} />
        </Panel>

        <Panel title="Your fee and members">
          <NumberField
            id="be-fee"
            label="Average fee per member per month"
            prefix="₹"
            value={s.fee}
            onChange={(n) => set("fee", n, TOOL)}
            hint="For a 3 or 12 month plan, use the price divided by the months."
          />
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={s.feeIncludesGst}
              onChange={(e) => set("feeIncludesGst", e.target.checked, TOOL)}
              className="mt-0.5 h-5 w-5 rounded border-slate-300 text-teal-600"
            />
            <span>My fee already includes GST, so take it out before counting it as income</span>
          </label>
          {s.feeIncludesGst && (
            <NumberField
              id="be-gst"
              label="GST rate"
              suffix="%"
              value={s.gstRate}
              onChange={(n) => set("gstRate", n, TOOL)}
              hint="Confirm the rate that applies to you with your CA."
            />
          )}
          <NumberField
            id="be-var"
            label="Cost that grows with each member (optional)"
            prefix="₹"
            value={s.variable}
            onChange={(n) => set("variable", n, TOOL)}
            hint="For example towels, lockers or card fees per member."
          />
          <NumberField id="be-now" label="Members you have now" value={s.membersNow} onChange={(n) => set("membersNow", n, TOOL)} />
          <Assumption />
        </Panel>
      </div>

      {error && <ErrorNote message={error} />}

      {result && (
        <section aria-live="polite" className="space-y-4 rounded-xl border border-teal-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Your result</h3>
          {result.reachable ? (
            <>
              <div className="grid gap-3 sm:grid-cols-3">
                <Big label="Members to break even" value={String(result.breakEvenMembers)} note={`${inr(result.fixed)} of fixed costs a month`} />
                <Big label="Income per member" value={inr(result.netFee)} note="after GST and any per-member cost" />
                <Big
                  label={`Monthly result at ${s.membersNow} members`}
                  value={inr(result.profitAtMembersNow)}
                  note={result.profitAtMembersNow >= 0 ? "profit before tax" : "loss"}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <caption className="mb-2 text-left text-sm font-semibold text-slate-900">If your fee moves</caption>
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-600">
                      <th className="py-2 pr-4 font-medium">Fee change</th>
                      <th className="py-2 pr-4 font-medium">Income per member</th>
                      <th className="py-2 pr-4 font-medium">Members to break even</th>
                      <th className="py-2 font-medium">Result at {s.membersNow} members</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.sensitivity.map((r) => (
                      <tr key={r.deltaPercent} className="border-b border-slate-100">
                        <td className="py-2 pr-4">{r.deltaPercent > 0 ? `+${r.deltaPercent}%` : `${r.deltaPercent}%`}</td>
                        <td className="py-2 pr-4">{inr(r.netFee)}</td>
                        <td className="py-2 pr-4">{r.breakEvenMembers === null ? "Not reachable" : r.breakEvenMembers}</td>
                        <td className="py-2">{inr(r.profitAtMembersNow)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <ErrorNote message="With these numbers each member costs more than they bring in, so no number of members breaks even. Raise the fee or lower the per-member cost." />
          )}
          <ShareBar resultText={text} onReset={reset} />
        </section>
      )}
    </div>
  );
}
