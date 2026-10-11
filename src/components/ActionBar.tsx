"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contact } from "@/config/site";

const HIDE_ON = ["/thank-you"];

function waHref(pathname: string): string {
  if (!contact.whatsappNumber) return "";
  const msg = `Hi Fitvario, I'd like to know more about your gym software (page: ${pathname}).`;
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

// Sticky action bar on mobile, floating WhatsApp button on desktop.
// Items with no configured number are simply not rendered.
export function ActionBar() {
  const pathname = usePathname();
  if (HIDE_ON.includes(pathname)) return null;

  const wa = waHref(pathname);
  const tel = contact.phoneNumber ? `tel:+${contact.phoneNumber}` : "";

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper px-3 py-2 md:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="action-bar"
              className="flex h-12 flex-1 items-center justify-center rounded-[8px] bg-[#0b6b3a] text-sm font-semibold text-white active:bg-[#085530]"
            >
              WhatsApp
            </a>
          )}
          {tel && (
            <a
              href={tel}
              data-cta="action-bar"
              className="flex h-12 flex-1 items-center justify-center rounded-[8px] border border-ink text-sm font-semibold text-ink active:bg-black/5"
            >
              Call
            </a>
          )}
          <Link
            href="/contact#demo"
            data-cta="action-bar"
            className="flex h-12 flex-[1.4] items-center justify-center rounded-[8px] bg-lime text-sm font-semibold text-ink active:brightness-95"
          >
            Book a demo
          </Link>
        </div>
      </div>

      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="floating-whatsapp"
          aria-label="Chat with Fitvario on WhatsApp"
          className="fv-frame fixed bottom-6 right-6 z-40 hidden h-12 items-center gap-2 rounded-[8px] bg-[#0b6b3a] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#085530] md:flex"
        >
          Chat on WhatsApp
        </a>
      )}
    </>
  );
}
