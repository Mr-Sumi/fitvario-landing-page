import Image from "next/image";
import Link from "next/link";
import { pages, isIndexable, isPublishedPath, publishedPages, type PageDef } from "@/config/pages";
import { contact, playStoreUrl } from "@/config/site";

const labelOf = (p: PageDef) => p.navLabel ?? p.title.split("|")[0].trim();

function pick(...paths: string[]): PageDef[] {
  return paths.map((x) => pages.find((p) => p.path === x)).filter((p): p is PageDef => !!p && isIndexable(p));
}

// Columns come from the page registry, so unpublished (draft) pages never show up here.
// A column with no published pages is dropped.
function columns(): { title: string; links: PageDef[] }[] {
  return [
    {
      title: "Product",
      links: [...pick("/features", "/pricing"), ...publishedPages("feature")],
    },
    { title: "Solutions", links: publishedPages("segment") },
    {
      title: "Resources",
      links: [
        ...publishedPages("tool"),
        ...publishedPages("template"),
        ...publishedPages("blog").filter((p) => p.path === "/blog"),
        ...publishedPages("hinglish"),
      ],
    },
    { title: "Compare", links: publishedPages("compare") },
    {
      title: "Company",
      links: pick("/about", "/contact", "/support", "/grievance", "/delete-account"),
    },
    { title: "Legal", links: pick("/privacy", "/terms", "/refund", "/cookies") },
  ].filter((c) => c.links.length > 0);
}

function PlayStoreBadge({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title="Get it on Google Play"
      className="fv-btn fv-btn-secondary gap-3 px-4"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current" aria-hidden>
        <path d="M3.18 23.75c.33.19.7.25 1.07.19l11.72-11.69L12.19 8.4 3.18 23.75zM21.5 10.47l-2.83-1.64-3.28 3.25 3.28 3.28 2.85-1.65a1.83 1.83 0 000-3.24zM2.01 1.27A1.83 1.83 0 001 2.92v18.16c0 .64.34 1.2.84 1.52l.17.1 10.17-10.17v-.24L2.01 1.27zm10.63 9.93L2.26.79l.09.06 11.72 11.71-1.43 1.43-1.43-1.43.05-.05L12.64 11.2z" />
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-[11px] font-medium text-white/70">Get it on</span>
        <span className="block text-sm font-semibold">Google Play</span>
      </span>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="on-ink mt-8 rounded-t-[32px] bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-white">
              <Image src="/fitvario-icon.png" alt="" width={32} height={32} className="rounded-[8px]" />
              Fitvario
            </Link>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/75">
              Gym management software for Indian gyms: memberships, QR attendance, CRM and revenue in one place.
            </p>
            <div className="mt-5 space-y-1 text-sm leading-relaxed text-white/75">
              <p>Bhopal, Madhya Pradesh, India</p>
              <p>
                <a href={`mailto:${contact.email}`} className="inline-block py-1 text-white underline decoration-lime underline-offset-4 hover:decoration-2">
                  {contact.email}
                </a>
              </p>
              {contact.phoneNumber && (
                <p>
                  <a href={`tel:+${contact.phoneNumber}`} data-cta="footer" className="inline-block py-1 text-white underline decoration-lime underline-offset-4 hover:decoration-2">
                    +{contact.phoneNumber}
                  </a>
                </p>
              )}
              {contact.hours && <p>{contact.hours}</p>}
            </div>
            {isPublishedPath("/hi") && (
              <p className="mt-4">
                <Link href="/hi" lang="hi-Latn" className="inline-block py-1 text-sm font-medium text-white underline decoration-lime underline-offset-4 hover:decoration-2">
                  Hinglish mein dekhein
                </Link>
              </p>
            )}
            {playStoreUrl && (
              <div className="mt-6">
                <PlayStoreBadge href={playStoreUrl} />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {columns().map((col) => (
              <div key={col.title}>
                <p className="mb-3 text-sm font-semibold text-white">{col.title}</p>
                <nav className="flex flex-col" aria-label={col.title}>
                  {col.links.map((p) => (
                    <Link key={p.path} href={p.path} className="py-1.5 text-[15px] text-white/75 transition-colors hover:text-white">
                      {labelOf(p)}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-5 py-5 text-sm text-white/70 sm:flex-row sm:px-8">
          <p>© 2026 Fitvario · Bhopal, Madhya Pradesh, India · All rights reserved.</p>
          <p>
            Built by{" "}
            <a href="https://sumigyan.in" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-lime underline-offset-4 hover:decoration-2">
              Sumigyan.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
