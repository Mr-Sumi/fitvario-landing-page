import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { getPage } from "@/config/pages";

export interface Crumb {
  name: string;
  path: string;
}

// Builds Home > parent segments > current page from the registry. Parents without a registry entry are skipped.
export function crumbsFor(path: string): Crumb[] {
  const out: Crumb[] = [{ name: "Home", path: "/" }];
  const parts = path.split("/").filter(Boolean);
  for (let i = 1; i < parts.length; i++) {
    const parent = "/" + parts.slice(0, i).join("/");
    try {
      const p = getPage(parent);
      out.push({ name: p.navLabel ?? p.title.split("|")[0].trim(), path: parent });
    } catch {
      // no page at that segment
    }
  }
  const self = getPage(path);
  out.push({ name: self.navLabel ?? self.title.split("|")[0].trim(), path });
  return out;
}

export function Breadcrumbs({ path }: { path: string }) {
  const items = crumbsFor(path);
  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav aria-label="Breadcrumb" className="text-sm text-mute">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>/</span>}
              {i === items.length - 1 ? (
                <span aria-current="page" className="text-ink">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="py-2 underline-offset-2 hover:text-ink hover:underline">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
