"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/track";

type Primitive = number | string | boolean;
type State = Record<string, Primitive>;

/** Rupees, no decimals unless the amount has paise */
export function inr(n: number): string {
  const whole = Math.abs(n % 1) < 1e-9;
  return "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2 });
}

export function pct(n: number, digits = 1): string {
  return (n * 100).toFixed(digits).replace(/\.0+$/, "") + "%";
}

/**
 * Tool state that lives in the URL, so a result can be shared as a link.
 * Only values that differ from the defaults are written. Reading happens after mount, so the server HTML
 * always shows the defaults.
 */
export function useShareableState<T extends State>(defaults: T) {
  const [state, setState] = useState<T>(defaults);
  const ready = useRef(false);
  const used = useRef(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const next = { ...defaults } as State;
    for (const k of Object.keys(defaults)) {
      const raw = q.get(k);
      if (raw === null) continue;
      const d = defaults[k];
      if (typeof d === "number") {
        const n = Number(raw);
        if (Number.isFinite(n)) next[k] = n;
      } else if (typeof d === "boolean") {
        next[k] = raw === "1";
      } else {
        next[k] = raw;
      }
    }
    setState(next as T);
    ready.current = true;
    // defaults are a constant object per tool
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready.current) return;
    const q = new URLSearchParams();
    for (const k of Object.keys(defaults)) {
      const v = state[k];
      if (v !== defaults[k]) q.set(k, typeof v === "boolean" ? (v ? "1" : "0") : String(v));
    }
    const qs = q.toString();
    window.history.replaceState(null, "", window.location.pathname + (qs ? `?${qs}` : ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const set = useCallback(<K extends keyof T>(key: K, value: T[K], tool: string) => {
    if (!used.current) {
      used.current = true;
      track("calculator_use", { tool });
    }
    setState((s) => ({ ...s, [key]: value }));
  }, []);

  const reset = useCallback(() => setState(defaults), [defaults]);
  return { state, set, reset };
}

export function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
  step = 1,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
  step?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <div className="relative mt-1.5">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-500">{prefix}</span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => {
            const n = e.target.value === "" ? 0 : parseFloat(e.target.value);
            onChange(Number.isFinite(n) ? n : 0);
          }}
          className={`block h-12 w-full rounded-lg border border-slate-300 bg-white text-[15px] text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/30 ${
            prefix ? "pl-8" : "pl-3.5"
          } ${suffix ? "pr-12" : "pr-3.5"}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-slate-500">{suffix}</span>
        )}
      </div>
      {hint && <p className="mt-1 text-[12px] leading-snug text-slate-500">{hint}</p>}
    </div>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 block h-12 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-[15px] text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/30"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && <p className="mt-1 text-[12px] leading-snug text-slate-500">{hint}</p>}
    </div>
  );
}

export function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function Big({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-xl bg-teal-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      {note && <p className="mt-1 text-[12px] leading-snug text-slate-600">{note}</p>}
    </div>
  );
}

export function ErrorNote({ message }: { message: string }) {
  return (
    <p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-900">
      {message}
    </p>
  );
}

export function Assumption() {
  return (
    <p className="text-[12px] leading-snug text-slate-500">
      The starting numbers are illustrative, not market data. Replace them with your own.
    </p>
  );
}

/** Copy the result as text, copy a link to this exact state, print the page, or start over. */
export function ShareBar({ resultText, onReset }: { resultText: string; onReset: () => void }) {
  const [note, setNote] = useState("");

  async function copy(text: string, ok: string) {
    try {
      await navigator.clipboard.writeText(text);
      setNote(ok);
    } catch {
      setNote("Copy is not available in this browser.");
    }
    setTimeout(() => setNote(""), 2500);
  }

  const btn =
    "inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-50";
  return (
    <div className="print:hidden">
      <div className="flex flex-wrap gap-2">
        <button type="button" className={btn} onClick={() => copy(resultText, "Result copied")}>
          Copy result
        </button>
        <button type="button" className={btn} onClick={() => copy(window.location.href, "Link copied")}>
          Copy link
        </button>
        <button type="button" className={btn} onClick={() => window.print()}>
          Print
        </button>
        <button type="button" className={btn} onClick={onReset}>
          Start over
        </button>
      </div>
      <p aria-live="polite" className="mt-2 h-5 text-[13px] text-teal-800">
        {note}
      </p>
    </div>
  );
}
