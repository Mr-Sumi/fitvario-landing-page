"use client";

import { costPerMember, priceCostPlus, priceTargetMargin, planLadder } from "@/lib/calc/pricing.mjs";
import { Assumption, Big, ErrorNote, NumberField, Panel, SelectField, ShareBar, inr, useShareableState } from "./ToolKit";

const TOOL = "membership-pricing";

const DEFAULTS = {
  fixedMonthly: 150000,
  members: 200,
  variable: 50,
  method: "cost-plus",
  markup: 60,
  margin: 35,
  d3: 10,
  d6: 15,
  d12: 25,
  roundTo: 50,
  gstRate: 18,
};

export function PricingTool() {
  const { state: s, set, reset } = useShareableState(DEFAULTS);

  let view: {
    cost: number;
    monthly: number;
    ladder: ReturnType<typeof planLadder>;
  } | null = null;
  let error = "";
  try {
    const cost = costPerMember({ fixedMonthly: s.fixedMonthly, variablePerMember: s.variable, members: s.members });
    const monthly =
      s.method === "margin"
        ? priceTargetMargin({ cost, marginPercent: s.margin })
        : priceCostPlus({ cost, markupPercent: s.markup });
    const ladder = planLadder({
      monthlyPrice: monthly,
      roundTo: s.roundTo,
      plans: [
        { months: 1, discountPercent: 0 },
        { months: 3, discountPercent: s.d3 },
        { months: 6, discountPercent: s.d6 },
        { months: 12, discountPercent: s.d12 },
      ],
    });
    view = { cost, monthly, ladder };
  } catch (e) {
    error = e instanceof Error ? e.message : "Check the numbers";
  }

  const text = view
    ? `Gym membership pricing: cost per member ${inr(view.cost)} a month, monthly price ${inr(view.monthly)}. ` +
      view.ladder.map((p) => `${p.months} month${p.months > 1 ? "s" : ""}: ${inr(p.price)}`).join(", ") +
      ". Prices exclude GST."
    : "";

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Your costs">
          <NumberField id="pr-fixed" label="Fixed costs per month" prefix="₹" value={s.fixedMonthly} onChange={(n) => set("fixedMonthly", n, TOOL)} hint="Rent, salaries, power, EMI, software, marketing." />
          <NumberField id="pr-members" label="Members you expect to serve" value={s.members} onChange={(n) => set("members", n, TOOL)} />
          <NumberField id="pr-var" label="Cost per member per month (optional)" prefix="₹" value={s.variable} onChange={(n) => set("variable", n, TOOL)} />
          <Assumption />
        </Panel>

        <Panel title="How you want to price">
          <SelectField
            id="pr-method"
            label="Method"
            value={s.method}
            onChange={(v) => set("method", v, TOOL)}
            options={[
              { value: "cost-plus", label: "Cost-plus: add a markup to cost" },
              { value: "margin", label: "Target margin: keep a share of the price" },
            ]}
          />
          {s.method === "margin" ? (
            <NumberField id="pr-margin" label="Target margin" suffix="%" value={s.margin} onChange={(n) => set("margin", n, TOOL)} hint="35 means you keep 35% of every rupee you charge." />
          ) : (
            <NumberField id="pr-markup" label="Markup on cost" suffix="%" value={s.markup} onChange={(n) => set("markup", n, TOOL)} hint="60 means the price is cost plus 60%." />
          )}
          <div className="grid gap-4 sm:grid-cols-3">
            <NumberField id="pr-d3" label="3 months discount" suffix="%" value={s.d3} onChange={(n) => set("d3", n, TOOL)} />
            <NumberField id="pr-d6" label="6 months discount" suffix="%" value={s.d6} onChange={(n) => set("d6", n, TOOL)} />
            <NumberField id="pr-d12" label="12 months discount" suffix="%" value={s.d12} onChange={(n) => set("d12", n, TOOL)} />
          </div>
          <NumberField id="pr-round" label="Round prices to the nearest" prefix="₹" value={s.roundTo} onChange={(n) => set("roundTo", n, TOOL)} hint="Use 50 for prices like 2,650. Use 0 to keep exact amounts." />
          <NumberField id="pr-gst" label="GST rate (for the tax-inclusive column)" suffix="%" value={s.gstRate} onChange={(n) => set("gstRate", n, TOOL)} hint="Confirm the rate with your CA." />
        </Panel>
      </div>

      {error && <ErrorNote message={error} />}

      {view && (
        <section aria-live="polite" className="space-y-4 rounded-xl border border-teal-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Your price ladder</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Big label="Cost per member per month" value={inr(view.cost)} />
            <Big label="Monthly price (before GST)" value={inr(view.monthly)} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600">
                  <th className="py-2 pr-4 font-medium">Plan</th>
                  <th className="py-2 pr-4 font-medium">Discount</th>
                  <th className="py-2 pr-4 font-medium">Price before GST</th>
                  <th className="py-2 pr-4 font-medium">With GST</th>
                  <th className="py-2 pr-4 font-medium">Per month</th>
                  <th className="py-2 font-medium">Member saves</th>
                </tr>
              </thead>
              <tbody>
                {view.ladder.map((p) => (
                  <tr key={p.months} className="border-b border-slate-100">
                    <td className="py-2 pr-4">{p.months} month{p.months > 1 ? "s" : ""}</td>
                    <td className="py-2 pr-4">{p.discountPercent}%</td>
                    <td className="py-2 pr-4 font-semibold">{inr(p.price)}</td>
                    <td className="py-2 pr-4">{inr(Math.round(p.price * (1 + s.gstRate / 100) * 100) / 100)}</td>
                    <td className="py-2 pr-4">{inr(p.perMonth)}</td>
                    <td className="py-2">{inr(p.saving)}</td>
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
