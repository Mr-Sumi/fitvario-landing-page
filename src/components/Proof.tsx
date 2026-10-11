import { proofItems } from "@/config/proof";

// Renders only items with written permission; nothing at all when the list is empty
export function Proof() {
  const items = proofItems.filter((p) => p.permissionGranted);
  if (items.length === 0) return null;
  const testimonials = items.filter((i) => i.kind === "testimonial" && i.quote);
  const names = items.filter((i) => i.kind === "logo");
  return (
    <section aria-labelledby="proof-heading" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="proof-heading" className="text-center text-2xl font-bold tracking-tight text-slate-900">
          Gyms using Fitvario
        </h2>
        {names.length > 0 && (
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-base font-semibold text-slate-600">
            {names.map((n) => (
              <li key={n.name}>{n.name}</li>
            ))}
          </ul>
        )}
        {testimonials.length > 0 && (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <blockquote className="text-[15px] leading-relaxed text-slate-700">{t.quote}</blockquote>
                <figcaption className="mt-3 text-sm font-semibold text-slate-900">{t.name}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
