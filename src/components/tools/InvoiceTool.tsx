"use client";

import { useEffect, useRef, useState } from "react";
import { invoiceTotals } from "@/lib/calc/invoice.mjs";
import { track } from "@/lib/track";
import { ErrorNote, Panel, inr } from "./ToolKit";

type Form = {
  gymName: string;
  gymAddress: string;
  gstin: string;
  memberName: string;
  memberPhone: string;
  item: string;
  period: string;
  amount: number;
  discount: number;
  gstOn: boolean;
  rate: number;
  mode: "exclusive" | "inclusive";
  supply: "intra" | "inter";
  method: string;
  number: string;
  date: string;
};

const EMPTY: Form = {
  gymName: "",
  gymAddress: "",
  gstin: "",
  memberName: "",
  memberPhone: "",
  item: "Gym membership",
  period: "",
  amount: 0,
  discount: 0,
  gstOn: false,
  rate: 18,
  mode: "exclusive",
  supply: "intra",
  method: "Cash",
  number: "INV-0001",
  date: "",
};

const input =
  "mt-1.5 block h-12 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-[15px] text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/30";

function Text({ id, label, value, onChange, placeholder }: { id: string; label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <input id={id} className={input} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Num({ id, label, value, onChange }: { id: string; label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <input
        id={id}
        type="number"
        min={0}
        inputMode="decimal"
        className={input}
        value={value}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Math.max(0, parseFloat(e.target.value) || 0))}
      />
    </div>
  );
}

// Nothing typed here leaves the browser, and no personal details go into the URL.
export function InvoiceTool() {
  const [f, setF] = useState<Form>(EMPTY);
  const used = useRef(false);

  useEffect(() => {
    setF((s) => ({ ...s, date: new Date().toISOString().slice(0, 10) }));
    document.body.classList.add("printing-invoice");
    return () => document.body.classList.remove("printing-invoice");
  }, []);

  function update<K extends keyof Form>(k: K, v: Form[K]) {
    if (!used.current) {
      used.current = true;
      track("calculator_use", { tool: "invoice-generator" });
    }
    setF((s) => ({ ...s, [k]: v }));
  }

  let totals: ReturnType<typeof invoiceTotals> | null = null;
  let error = "";
  try {
    totals = invoiceTotals({
      amount: f.amount,
      discount: f.discount,
      gstEnabled: f.gstOn,
      gstRatePercent: f.rate,
      mode: f.mode,
      supply: f.supply,
    });
  } catch (e) {
    error = e instanceof Error ? e.message : "Check the numbers";
  }

  const half = f.rate / 2;

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2 print:hidden">
        <Panel title="Gym and member">
          <Text id="iv-gym" label="Gym name" value={f.gymName} onChange={(v) => update("gymName", v)} />
          <Text id="iv-addr" label="Gym address" value={f.gymAddress} onChange={(v) => update("gymAddress", v)} />
          <Text id="iv-gstin" label="GSTIN (leave empty if you do not have one)" value={f.gstin} onChange={(v) => update("gstin", v)} />
          <Text id="iv-member" label="Member name" value={f.memberName} onChange={(v) => update("memberName", v)} />
          <Text id="iv-phone" label="Member phone (optional)" value={f.memberPhone} onChange={(v) => update("memberPhone", v)} />
        </Panel>
        <Panel title="Invoice details">
          <div className="grid gap-4 sm:grid-cols-2">
            <Text id="iv-no" label="Invoice number" value={f.number} onChange={(v) => update("number", v)} />
            <div>
              <label htmlFor="iv-date" className="block text-sm font-medium text-slate-800">Date</label>
              <input id="iv-date" type="date" className={input} value={f.date} onChange={(e) => update("date", e.target.value)} />
            </div>
          </div>
          <Text id="iv-item" label="What was bought" value={f.item} onChange={(v) => update("item", v)} />
          <Text id="iv-period" label="Period (optional)" value={f.period} onChange={(v) => update("period", v)} placeholder="1 Nov 2026 to 31 Jan 2027" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Num id="iv-amt" label="Amount (₹)" value={f.amount} onChange={(v) => update("amount", v)} />
            <Num id="iv-disc" label="Discount (₹)" value={f.discount} onChange={(v) => update("discount", v)} />
          </div>
          <Text id="iv-method" label="Payment method" value={f.method} onChange={(v) => update("method", v)} />
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input type="checkbox" checked={f.gstOn} onChange={(e) => update("gstOn", e.target.checked)} className="mt-0.5 h-5 w-5 rounded border-slate-300 text-teal-600" />
            <span>Add GST lines</span>
          </label>
          {f.gstOn && (
            <div className="grid gap-4 sm:grid-cols-3">
              <Num id="iv-rate" label="GST rate (%)" value={f.rate} onChange={(v) => update("rate", v)} />
              <div>
                <label htmlFor="iv-mode" className="block text-sm font-medium text-slate-800">Amount</label>
                <select id="iv-mode" className={input} value={f.mode} onChange={(e) => update("mode", e.target.value as Form["mode"])}>
                  <option value="exclusive">Excludes GST</option>
                  <option value="inclusive">Includes GST</option>
                </select>
              </div>
              <div>
                <label htmlFor="iv-supply" className="block text-sm font-medium text-slate-800">Member is in</label>
                <select id="iv-supply" className={input} value={f.supply} onChange={(e) => update("supply", e.target.value as Form["supply"])}>
                  <option value="intra">Same state</option>
                  <option value="inter">Another state</option>
                </select>
              </div>
            </div>
          )}
        </Panel>
      </div>

      {error && <ErrorNote message={error} />}

      <div className="flex flex-wrap gap-2 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex h-12 items-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Print or save as PDF
        </button>
        <button
          type="button"
          onClick={() => setF({ ...EMPTY, date: f.date })}
          className="inline-flex h-12 items-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          Clear the form
        </button>
      </div>

      {totals && (
        <article id="invoice-print" className="rounded-xl border border-slate-300 bg-white p-6 text-slate-900 shadow-sm sm:p-8">
          <header className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 sm:flex-row">
            <div>
              <h3 className="text-xl font-bold">{f.gymName || "Gym name"}</h3>
              <p className="mt-1 whitespace-pre-line text-sm text-slate-600">{f.gymAddress || "Gym address"}</p>
              {f.gstin && <p className="mt-1 text-sm text-slate-600">GSTIN: {f.gstin}</p>}
            </div>
            <div className="text-sm sm:text-right">
              <p className="text-lg font-semibold">{f.gstOn ? "Tax invoice" : "Invoice"}</p>
              <p>No: {f.number || "-"}</p>
              <p>Date: {f.date || "-"}</p>
            </div>
          </header>

          <section className="py-4 text-sm">
            <p className="font-semibold">Billed to</p>
            <p>{f.memberName || "Member name"}</p>
            {f.memberPhone && <p>{f.memberPhone}</p>}
          </section>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-y border-slate-200">
                <th className="py-2 pr-4 font-medium">Description</th>
                <th className="py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4">
                  {f.item || "Item"}
                  {f.period && <span className="block text-slate-500">{f.period}</span>}
                </td>
                <td className="py-2 text-right">{inr(totals.subtotal)}</td>
              </tr>
              {totals.discount > 0 && (
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-4">Discount</td>
                  <td className="py-2 text-right">-{inr(totals.discount)}</td>
                </tr>
              )}
              {f.gstOn && (
                <>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 pr-4">Taxable value</td>
                    <td className="py-2 text-right">{inr(totals.taxable)}</td>
                  </tr>
                  {f.supply === "intra" ? (
                    <>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 pr-4">CGST at {half}%</td>
                        <td className="py-2 text-right">{inr(totals.cgst)}</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 pr-4">SGST at {half}%</td>
                        <td className="py-2 text-right">{inr(totals.sgst)}</td>
                      </tr>
                    </>
                  ) : (
                    <tr className="border-b border-slate-100">
                      <td className="py-2 pr-4">IGST at {f.rate}%</td>
                      <td className="py-2 text-right">{inr(totals.igst)}</td>
                    </tr>
                  )}
                </>
              )}
              <tr>
                <td className="py-3 pr-4 text-base font-bold">Total</td>
                <td className="py-3 text-right text-base font-bold">{inr(totals.total)}</td>
              </tr>
            </tbody>
          </table>

          <footer className="mt-4 border-t border-slate-200 pt-3 text-xs text-slate-500">
            <p>Paid by: {f.method || "-"}</p>
            <p className="mt-1">Sample format. Check what a valid invoice must show for your business with your CA.</p>
          </footer>
        </article>
      )}
    </div>
  );
}
