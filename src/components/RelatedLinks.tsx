import Link from "next/link";
import { pages, isIndexable } from "@/config/pages";

// Links to other published pages by path; anything unpublished or unknown is dropped quietly
export function RelatedLinks({ title = "Related", paths }: { title?: string; paths: string[] }) {
  const items = paths
    .map((p) => pages.find((x) => x.path === p))
    .filter((p): p is NonNullable<typeof p> => !!p && isIndexable(p));
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="related-heading" className="mt-20">
      <h2 id="related-heading" className="text-2xl font-bold text-ink">
        {title}
      </h2>
      <ul className="mt-5 divide-y divide-line border-y border-line">
        {items.map((p) => (
          <li key={p.path}>
            <Link href={p.path} className="group grid gap-1 py-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
              <span className="font-semibold text-ink underline decoration-[#4d7c0f] decoration-1 underline-offset-4 group-hover:decoration-2">
                {p.navLabel ?? p.title.split("|")[0].trim()}
              </span>
              <span className="text-[15px] leading-relaxed text-mute">{p.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
