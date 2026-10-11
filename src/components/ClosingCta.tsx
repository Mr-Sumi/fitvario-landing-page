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
    <section className="on-ink mt-20 rounded-[8px] bg-ink px-6 py-10 sm:px-10 sm:py-12">
      <h2 className="max-w-xl text-[1.75rem] font-bold leading-tight text-white sm:text-3xl">{heading}</h2>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-white/80">{body}</p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link href="/contact#demo" data-cta={location} className="fv-btn fv-btn-primary">
          Book a free demo
        </Link>
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" data-cta={location} className="fv-btn fv-btn-secondary">
            Chat on WhatsApp
          </a>
        ) : (
          <a href={`mailto:${contact.email}`} className="fv-btn fv-btn-secondary">
            Email {contact.email}
          </a>
        )}
      </div>
    </section>
  );
}
