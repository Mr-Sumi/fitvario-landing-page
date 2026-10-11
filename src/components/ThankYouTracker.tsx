"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

// Fires demo_submit exactly once, and only for someone who just submitted the form (not a direct visit).
// If GA hasn't finished loading yet, it checks again for a few seconds. No GA (declined cookies) means no event.
export function ThankYouTracker() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      if (sessionStorage.getItem("fv_lead_ok") !== "1") return;
      sessionStorage.removeItem("fv_lead_ok");
    } catch {
      return;
    }
    let tries = 0;
    const fire = () => {
      if (window.gtag) {
        track("demo_submit");
        return;
      }
      if (++tries < 10) timer = setTimeout(fire, 500);
    };
    fire();
    return () => clearTimeout(timer);
  }, []);
  return null;
}
