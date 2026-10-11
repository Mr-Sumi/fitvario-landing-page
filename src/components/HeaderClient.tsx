"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface NavLink {
  href: string;
  label: string;
}

const flatNav: NavLink[] = [
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const linkBase = "rounded-md px-3.5 py-3 text-[15px] font-medium transition-colors";

export function HeaderClient({ featureLinks }: { featureLinks: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const activeCls = (href: string) =>
    isActive(href) ? "text-ink underline decoration-lime decoration-[3px] underline-offset-[10px]" : "text-mute hover:text-ink";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 font-display text-xl font-bold tracking-tight text-ink">
          <Image src="/fitvario-icon.png" alt="" width={32} height={32} className="rounded-[8px]" priority />
          Fitvario
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <div className="group relative">
            <Link href="/features" className={`${linkBase} inline-block ${activeCls("/features")}`}>
              Features
            </Link>
            {featureLinks.length > 0 && (
              <div className="invisible absolute left-0 top-full z-50 min-w-64 pt-1 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="fv-frame rounded-[8px] border border-line bg-white p-1.5">
                  <Link href="/features" className="block rounded-md px-3.5 py-3 text-sm font-semibold text-ink hover:bg-paper">
                    All features
                  </Link>
                  {featureLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="block rounded-md px-3.5 py-3 text-sm text-mute hover:bg-paper hover:text-ink">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {flatNav.map((item) => (
            <Link key={item.href} href={item.href} className={`${linkBase} ${activeCls(item.href)}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center md:flex">
          <Link href="/contact#demo" data-cta="header" className="fv-btn fv-btn-primary">
            Book a demo
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-md text-ink transition-colors hover:bg-black/5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-paper px-5 pb-6 pt-3 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            <Link href="/features" className={`px-1 py-3.5 text-base font-medium ${activeCls("/features")}`}>
              Features
            </Link>
            {featureLinks.map((l) => (
              <Link key={l.href} href={l.href} className="border-l border-line py-3 pl-5 text-[15px] text-mute hover:text-ink">
                {l.label}
              </Link>
            ))}
            {flatNav.map((item) => (
              <Link key={item.href} href={item.href} className={`px-1 py-3.5 text-base font-medium ${activeCls(item.href)}`}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-line pt-4">
            <Link href="/contact#demo" data-cta="header-mobile" className="fv-btn fv-btn-primary w-full">
              Book a free demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
