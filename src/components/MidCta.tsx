import Link from "next/link";

export function MidCta({
  text = "Want to see this with your own gym's numbers?",
  location = "mid-page",
}: {
  text?: string;
  location?: string;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 border-y border-line py-6 sm:flex-row sm:items-center">
      <p className="max-w-md font-display text-xl font-semibold leading-snug text-ink">{text}</p>
      <Link href="/contact#demo" data-cta={location} className="fv-btn fv-btn-primary shrink-0">
        Book a free demo
      </Link>
    </div>
  );
}
