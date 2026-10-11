"use client";

import { revenueProjection } from "@/lib/calc/revenue.mjs";
import { Assumption, Big, ErrorNote, NumberField, Panel, ShareBar, inr, useShareableState } from "./ToolKit";

const TOOL = "revenue";

const DEFAULTS = {
  m1: 120,
  f1: 1200,
  m2: 60,
  f2: 1000,
  m3: 30,
  f3: 800,
  ptClients: 12,
  ptFee: 3500,
  other: 8000,
  growth: 1,
};

export function RevenueTool() {
  const { state: s, set, reset } = useShareableState(DEFAULTS);

  let r: ReturnType<typeof revenueProjection> | null = null;
  let error = "";
  try {
    r = revenueProjection({
      plans: [
        { members: s.m1, monthlyFee: s.f1 },
        { members: s.m2, monthlyFee: s.f2 },
        { members: s.m3, monthlyFee: s.f3 },
      ],
      ptClients: s.ptClients,
      ptMonthlyFee: s.ptFee,
      otherMonthly: s.other,
      monthlyGrowthPercent: s.growth,
    });
  } catch (e) {
    error = e instanceof Error ? e.message : "Check the numbers";
  }

  const text = r
    ? `Gym revenue projection: ${inr(r.monthOne)} in month 1, ${inr(r.monthTwelve)} in month 12, ${inr(r.yearTotal)} over 12 months at ${s.growth}% monthly growth.`
    : "";

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Members and fees">
          <p className="text-sm text-slate-600">Enter each plan as members and the monthly equivalent of its fee.</p>
          {(
            [
              ["m1", "f1", "Plan 1 (for example monthly)"],
              ["m2", "f2", "Plan 2 (for example quarterly)"],
              ["m3", "f3", "Plan 3 (for example annual)"],
            ] as const
          ).map(([mk, fk, label]) => (
            <div key={mk} className="grid gap-4 sm:grid-cols-2">
              <NumberField id={`rv-${mk}`} label={`${label}: members`} value={s[mk]} onChange={(n) => set(mk, n, TOOL)} />
              <NumberField id={`rv-${fk}`} label="Fee per member per month" prefix="₹" value={s[fk]} onChange={(n) => set(fk, n, TOOL)} />
            </div>
          ))}
        </Panel>
        <Panel title="Other income and growth">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField id="rv-pt" label="Personal training clients" value={s.ptClients} onChange={(n) => set("ptClients", n, TOOL)} />
            <NumberField id="rv-ptfee" label="PT fee per client per month" prefix="₹" value={s.ptFee} onChange={(n) => set("ptFee", n, TOOL)} />
          </div>
          <NumberField
            id="rv-other"
            label="Other monthly income (supplements, merchandise, lockers)"
            prefix="₹"
            value={s.other}
            onChange={(n) => set("other", n, TOOL)}
            hint="Kept flat in the projection."
          />
          <NumberField
            id="rv-growth"
            label="Net member growth per month"
            suffix="%"
            value={s.growth}
            onChange={(n) => set("growth", n, TOOL)}
            hint="Joiners minus leavers, as a share of members. A negative number shows a shrinking gym."
          />
          <Assumption />
        </Panel>
      </div>

      {error && <ErrorNote message={error} />}

      {r && (
        <section aria-live="polite" className="space-y-4 rounded-xl border border-teal-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Your 12-month projection</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <Big label="Month 1" value={inr(r.monthOne)} />
            <Big label="Month 12" value={inr(r.monthTwelve)} />
            <Big label="Total for the year" value={inr(r.yearTotal)} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600">
                  <th className="py-2 pr-4 font-medium">Month</th>
                  <th className="py-2 pr-4 font-medium">Memberships</th>
                  <th className="py-2 pr-4 font-medium">Personal training</th>
                  <th className="py-2 pr-4 font-medium">Other</th>
                  <th className="py-2 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {r.months.map((m) => (
                  <tr key={m.month} className="border-b border-slate-100">
                    <td className="py-2 pr-4">{m.month}</td>
                    <td className="py-2 pr-4">{inr(m.membership)}</td>
                    <td className="py-2 pr-4">{inr(m.personalTraining)}</td>
                    <td className="py-2 pr-4">{inr(m.other)}</td>
                    <td className="py-2 font-semibold">{inr(m.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ShareBar resultText={text} onReset={reset} />
        </section>
      )}
    </div>
  );
}
