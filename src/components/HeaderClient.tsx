"use client";

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

const linkBase = "rounded-md px-3.5 py-3 text-sm font-medium transition";

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
    isActive(href) ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-[1.0625rem] font-bold tracking-tight text-slate-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-extrabold text-white shadow-sm">
            F
          </span>
          Fitvario
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
          <div className="group relative">
            <Link href="/features" className={`${linkBase} inline-block ${activeCls("/features")}`}>
              Features
            </Link>
            {featureLinks.length > 0 && (
              <div className="invisible absolute left-0 top-full z-50 min-w-64 pt-1 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                  <Link href="/features" className="block rounded-lg px-3.5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                    All features
                  </Link>
                  {featureLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block rounded-lg px-3.5 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    >
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
          <Link
            href="/contact#demo"
            data-cta="header"
            className="inline-flex h-12 items-center rounded-lg bg-teal-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 active:bg-teal-800"
          >
            Book a demo
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 md:hidden"
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
        <div id="mobile-menu" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 pb-6 pt-3 md:hidden">
          <nav className="flex flex-col gap-0.5" aria-label="Mobile navigation">
            <Link href="/features" className={`rounded-lg px-4 py-3.5 text-sm font-medium ${activeCls("/features")}`}>
              Features
            </Link>
            {featureLinks.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-lg py-3 pl-8 pr-4 text-sm text-slate-600 hover:bg-slate-50">
                {l.label}
              </Link>
            ))}
            {flatNav.map((item) => (
              <Link key={item.href} href={item.href} className={`rounded-lg px-4 py-3.5 text-sm font-medium ${activeCls(item.href)}`}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-slate-100 pt-4">
            <Link
              href="/contact#demo"
              data-cta="header-mobile"
              className="block w-full rounded-xl bg-teal-600 px-4 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Book a free demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
