import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-slate-600">
        We couldn&apos;t find the page you&apos;re looking for. It may have been moved or doesn&apos;t exist.
      </p>
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-teal-600 px-6 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          Go home
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Contact support
        </Link>
      </div>
    </main>
  );
}
