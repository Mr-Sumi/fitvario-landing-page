import Link from "next/link";
import { contact, whatsappLink } from "@/config/site";

export function ClosingCta({
  heading = "See Fitvario with your own gym's numbers",
  body = "Tell us about your gym and we will walk you through the parts that matter to you. No obligation.",
  location = "closing-cta",
}: {
  heading?: string;
  body?: string;
  location?: string;
}) {
  const wa = whatsappLink("Hi Fitvario, I'd like a demo for my gym.");
  return (
    <section className="mt-16 rounded-2xl bg-slate-900 px-6 py-10 text-center sm:px-10">
      <h2 className="mx-auto max-w-xl text-balance text-xl font-bold text-white sm:text-2xl">{heading}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">{body}</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/contact#demo"
          data-cta={location}
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-teal-700 px-8 text-sm font-bold text-white transition hover:bg-teal-600 sm:w-auto"
        >
          Book a free demo
        </Link>
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={location}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-slate-600 px-8 text-sm font-semibold text-slate-100 transition hover:bg-slate-800 sm:w-auto"
          >
            Chat on WhatsApp
          </a>
        ) : (
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-slate-600 px-8 text-sm font-semibold text-slate-100 transition hover:bg-slate-800 sm:w-auto"
          >
            Email {contact.email}
          </a>
        )}
      </div>
    </section>
  );
}
