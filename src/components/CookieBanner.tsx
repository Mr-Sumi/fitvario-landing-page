"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("fitvario_cookie_consent");
      if (!consent) setVisible(true);
    } catch {
      // localStorage blocked
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem("fitvario_cookie_consent", "accepted");
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event("fitvario:consent"));
    setVisible(false);
  }

  function decline() {
    try {
      localStorage.setItem("fitvario_cookie_consent", "declined");
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event("fitvario:consent"));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-2xl sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm sm:rounded-xl sm:border"
    >
      <div className="px-5 py-4">
        <p className="text-sm font-semibold text-slate-900">We use cookies</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
          We use strictly necessary, functional, analytics, and marketing cookies (including Meta Pixel). See our{" "}
          <Link href="/cookies" className="font-medium text-teal-700 underline-offset-2 hover:underline">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-medium text-teal-700 underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={accept}
            className="flex-1 rounded-lg bg-teal-600 py-2 text-[13px] font-semibold text-white transition hover:bg-teal-700"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={decline}
            className="flex-1 rounded-lg border border-slate-300 py-2 text-[13px] font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
