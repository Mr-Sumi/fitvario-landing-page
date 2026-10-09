import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Fitvario" },
  description: "The page you are looking for does not exist. Try one of the links below.",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
];

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Page not found</h1>
      <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-slate-600">
        We couldn&apos;t find that page. It may have moved. These links should get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="inline-flex h-12 items-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 hover:border-slate-400 hover:bg-slate-50"
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-lg px-6 text-sm font-semibold text-teal-700 hover:underline"
        >
          Go to the home page
        </Link>
        <Link
          href="/contact#demo"
          data-cta="not-found"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-teal-600 px-6 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          Book a free demo
        </Link>
      </div>
    </div>
  );
}
