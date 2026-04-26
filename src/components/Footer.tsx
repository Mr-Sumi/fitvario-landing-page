import Link from "next/link";

const productLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const supportLinks = [
  { href: "/support", label: "Support" },
  { href: "/delete-account", label: "Delete Account" },
  { href: "/grievance", label: "Grievance Officer" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund", label: "Refund Policy" },
  { href: "/cookies", label: "Cookie Policy" },
];

function PlayStoreBadge() {
  return (
    <a
      href="#"
      aria-label="Get it on Google Play"
      className="inline-flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-white transition hover:bg-slate-700"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current" aria-hidden>
        <path d="M3.18 23.75c.33.19.7.25 1.07.19l11.72-11.69L12.19 8.4 3.18 23.75zM21.5 10.47l-2.83-1.64-3.28 3.25 3.28 3.28 2.85-1.65a1.83 1.83 0 000-3.24zM2.01 1.27A1.83 1.83 0 001 2.92v18.16c0 .64.34 1.2.84 1.52l.17.1 10.17-10.17v-.24L2.01 1.27zm10.63 9.93L2.26.79l.09.06 11.72 11.71-1.43 1.43-1.43-1.43.05-.05L12.64 11.2z" />
      </svg>
      <span className="text-left leading-none">
        <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400">Get it on</span>
        <span className="block text-sm font-bold">Google Play</span>
      </span>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-white">
      {/* Main grid */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand — wider column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 text-base font-bold tracking-tight text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500 text-sm font-extrabold text-white">
                F
              </span>
              Fitvario
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              All-in-one gym management software for memberships, QR attendance, CRM, analytics, messaging, and
              ecommerce — built for India.
            </p>
            <div className="mt-4 text-xs leading-relaxed text-slate-500">
              <p className="font-medium text-slate-400">Fitvario</p>
              <p>Bhopal, Madhya Pradesh, India</p>
              <a
                href="mailto:support@fitvario.com"
                className="mt-1 inline-block text-teal-400 underline-offset-2 hover:underline"
              >
                support@fitvario.com
              </a>
            </div>
            <div className="mt-5">
              <PlayStoreBadge />
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">Product</p>
            <nav className="flex flex-col gap-2.5">
              {productLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">Support</p>
            <nav className="flex flex-col gap-2.5">
              {supportLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">Legal</p>
            <nav className="flex flex-col gap-2.5">
              {legalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row sm:px-6">
          <p className="text-center text-xs text-slate-600 sm:text-left">
            © 2026 Fitvario · Bhopal, Madhya Pradesh, India · All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built by{" "}
            <a
              href="https://sumigyan.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 underline-offset-2 hover:text-slate-300 hover:underline"
            >
              Sumigyan.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
