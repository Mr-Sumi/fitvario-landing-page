"use client";

import { useState } from "react";

// A ready message with a copy button. Placeholders like {naam} stay in the text for the owner to replace.
export function CopyBlock({ label, text }: { label: string; text: string }) {
  const [state, setState] = useState<"idle" | "done" | "fail">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("done");
    } catch {
      setState("fail");
    }
    setTimeout(() => setState("idle"), 2200);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-teal-800">{label}</p>
      <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-slate-800">{text}</p>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={copy}
          className="inline-flex h-11 items-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          Copy karein
        </button>
        <span aria-live="polite" className="text-[13px] text-teal-800">
          {state === "done" ? "Copy ho gaya" : state === "fail" ? "Is browser mein copy nahi hua" : ""}
        </span>
      </div>
    </div>
  );
}
