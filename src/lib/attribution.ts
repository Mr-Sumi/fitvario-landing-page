const KEY = "fv_attr";

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  landing_page?: string;
  referrer?: string;
}

// First touch of the session, kept in sessionStorage and sent only with a lead the visitor submits
export function captureAttribution() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const q = new URLSearchParams(window.location.search);
    const out: Attribution = { landing_page: window.location.pathname };
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const) {
      const v = q.get(k);
      if (v) out[k] = v.slice(0, 200);
    }
    if (document.referrer) out.referrer = document.referrer.slice(0, 300);
    sessionStorage.setItem(KEY, JSON.stringify(out));
  } catch {
    // storage blocked, lead just goes without attribution
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}
