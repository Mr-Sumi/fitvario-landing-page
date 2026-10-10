import Link from "next/link";

export function MidCta({
  text = "Want to see this with your own gym's numbers?",
  location = "mid-page",
}: {
  text?: string;
  location?: string;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-teal-200 bg-teal-50/70 p-5 sm:flex-row sm:items-center">
      <p className="text-[15px] font-semibold text-slate-900">{text}</p>
      <Link
        href="/contact#demo"
        data-cta={location}
        className="inline-flex h-12 shrink-0 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-800"
      >
        Book a free demo
      </Link>
    </div>
  );
}
