import Link from "next/link";
import { pages, isIndexable } from "@/config/pages";

// Links to other published pages by path; anything unpublished or unknown is dropped quietly
export function RelatedLinks({ title = "Related", paths }: { title?: string; paths: string[] }) {
  const items = paths
    .map((p) => pages.find((x) => x.path === p))
    .filter((p): p is NonNullable<typeof p> => !!p && isIndexable(p));
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="related-heading" className="mt-14">
      <h2 id="related-heading" className="text-lg font-semibold text-slate-900">
        {title}
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((p) => (
          <li key={p.path}>
            <Link
              href={p.path}
              className="block rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm transition hover:border-teal-300"
            >
              <span className="font-semibold text-teal-700">{p.navLabel ?? p.title.split("|")[0].trim()}</span>
              <span className="mt-1 block text-[13px] leading-relaxed text-slate-500">{p.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
