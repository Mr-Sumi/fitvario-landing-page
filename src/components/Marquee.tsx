// A slow, continuous strip of plain text chips. Pauses on hover and focus, and is a static wrapped list when the
// visitor prefers reduced motion. The second copy is hidden from assistive technology.
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {items.map((c) => (
        <li key={c} className="whitespace-nowrap rounded-full bg-soft px-6 py-3.5 text-[15px] font-semibold text-ink">
          {c}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="fv-marquee group relative overflow-hidden">
      <div className="fv-marquee-track flex w-max">
        {row(false)}
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}
