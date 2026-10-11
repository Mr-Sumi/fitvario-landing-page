import { Sparkle } from "@/components/Doodles";

// The lime panel that opens every content page: big heading, one short answer, the date.
export function PageHero({
  h1,
  lead,
  meta,
  children,
}: {
  h1: string;
  lead?: string;
  meta?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="on-lime fv-panel relative mt-6 overflow-hidden bg-lime px-6 py-10 sm:px-12 sm:py-14">
      <Sparkle className="absolute right-6 top-6 hidden h-12 w-12 sm:block sm:right-12 sm:top-10" />
      <h1 className="max-w-3xl text-[2.25rem] font-bold leading-[1.08] text-ink sm:text-5xl lg:text-[3.25rem]">{h1}</h1>
      {lead && <p className="mt-5 max-w-3xl text-[1.0625rem] leading-relaxed text-ink/90 sm:text-lg">{lead}</p>}
      {meta && <p className="mt-5 text-sm text-ink/75">{meta}</p>}
      {children}
    </header>
  );
}
