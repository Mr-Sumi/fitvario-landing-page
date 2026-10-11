"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { gaMeasurementId } from "@/config/site";
import { consentGiven, track } from "@/lib/track";
import { captureAttribution } from "@/lib/attribution";

// GA4 loads only after the visitor accepts cookies. Click events are picked up from link attributes,
// so components just need href (wa.me, tel:, external) or data-cta="<location>".
export function Analytics() {
  const [consented, setConsented] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const sync = () => setConsented(consentGiven());
    sync();
    window.addEventListener("fitvario:consent", sync);
    return () => window.removeEventListener("fitvario:consent", sync);
  }, []);

  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    if (pathname === "/pricing") track("pricing_view");
  }, [pathname, consented]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const location = a.dataset.cta ?? "unspecified";
      if (href.startsWith("https://wa.me/")) track("whatsapp_click", { location });
      else if (href.startsWith("tel:")) track("call_click", { location });
      else if (/^https?:\/\//.test(href) && !href.includes(window.location.host)) {
        track("outbound_click", { url: href.slice(0, 100) });
      }
      if (a.dataset.cta) track("cta_click", { location });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!gaMeasurementId || !consented) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaMeasurementId}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
