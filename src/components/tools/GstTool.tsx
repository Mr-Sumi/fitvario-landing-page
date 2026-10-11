"use client";

import { splitGst } from "@/lib/calc/gst.mjs";
import { Assumption, Big, ErrorNote, NumberField, Panel, SelectField, ShareBar, inr, useShareableState } from "./ToolKit";

const TOOL = "gst";

const DEFAULTS = {
  amount: 5000,
  rate: 18,
  mode: "exclusive",
  supply: "intra",
  label: "3-month gym membership",
};

export function GstTool() {
  const { state: s, set, reset } = useShareableState(DEFAULTS);

  let r: ReturnType<typeof splitGst> | null = null;
  let error = "";
  try {
    r = splitGst({
      amount: s.amount,
      ratePercent: s.rate,
      mode: s.mode as "exclusive" | "inclusive",
      supply: s.supply as "intra" | "inter",
    });
  } catch (e) {
    error = e instanceof Error ? e.message : "Check the numbers";
  }

  const half = s.rate / 2;
  const text = r
    ? `${s.label}: ${inr(r.base)} + ` +
      (r.supply === "intra" ? `CGST ${half}% ${inr(r.cgst)} + SGST ${half}% ${inr(r.sgst)}` : `IGST ${s.rate}% ${inr(r.igst)}`) +
      ` = ${inr(r.total)}`
    : "";

  return (
    <div className="space-y-5">
      <Panel title="Amount and tax">
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="gst-amount" label="Amount" prefix="₹" value={s.amount} onChange={(n) => set("amount", n, TOOL)} />
          <NumberField
            id="gst-rate"
            label="GST rate"
            suffix="%"
            value={s.rate}
            onChange={(n) => set("rate", n, TOOL)}
            hint="18% is the starting value. Verify the current rate for your service with your CA."
          />
          <SelectField
            id="gst-mode"
            label="The amount you entered"
            value={s.mode}
            onChange={(v) => set("mode", v, TOOL)}
            options={[
              { value: "exclusive", label: "Excludes GST (add GST on top)" },
              { value: "inclusive", label: "Includes GST (take GST out)" },
            ]}
          />
          <SelectField
            id="gst-supply"
            label="Where the member is"
            value={s.supply}
            onChange={(v) => set("supply", v, TOOL)}
            options={[
              { value: "intra", label: "Same state as your gym (CGST + SGST)" },
              { value: "inter", label: "Another state (IGST)" },
            ]}
          />
        </div>
        <Assumption />
      </Panel>

      {error && <ErrorNote message={error} />}

      {r && (
        <section aria-live="polite" className="space-y-4 rounded-xl border border-teal-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Your result</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <Big label="Amount before GST" value={inr(r.base)} />
            <Big label="GST" value={inr(r.tax)} />
            <Big label="Total to collect" value={inr(r.total)} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <caption className="mb-2 text-left text-sm font-semibold text-slate-900">Invoice lines</caption>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-4">{s.label}</td>
                  <td className="py-2 text-right">{inr(r.base)}</td>
                </tr>
                {r.supply === "intra" ? (
                  <>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 pr-4">CGST at {half}%</td>
                      <td className="py-2 text-right">{inr(r.cgst)}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 pr-4">SGST at {half}%</td>
                      <td className="py-2 text-right">{inr(r.sgst)}</td>
                    </tr>
                  </>
                ) : (
                  <tr className="border-b border-slate-100">
                    <td className="py-2 pr-4">IGST at {s.rate}%</td>
                    <td className="py-2 text-right">{inr(r.igst)}</td>
                  </tr>
                )}
                <tr>
                  <td className="py-2 pr-4 font-semibold">Total</td>
                  <td className="py-2 text-right font-semibold">{inr(r.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ShareBar resultText={text} onReset={reset} />
        </section>
      )}
    </div>
  );
}
