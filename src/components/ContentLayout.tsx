import { notFound } from "next/navigation";
import { getPage, isDraft } from "@/config/pages";
import { formatDate } from "@/lib/seo";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedLinks } from "@/components/RelatedLinks";
import { ClosingCta } from "@/components/ClosingCta";
import { ScreenshotFrame } from "@/components/ScreenshotFrame";
import { author } from "@/config/site";

export interface TocItem {
  id: string;
  label: string;
}

// Shared layout for feature, segment, tool, template, blog, Hinglish and comparison pages.
// Drafts render for review (noindex comes from buildMetadata) but 404 on the production deployment.
export function ContentLayout({
  path,
  h1,
  lead,
  toc,
  showByline = false,
  lang,
  related,
  children,
}: {
  path: string;
  h1: string;
  /** First ~100 words: the direct answer to the searcher's question */
  lead: string;
  toc?: TocItem[];
  showByline?: boolean;
  lang?: string;
  related: string[];
  children: React.ReactNode;
}) {
  const page = getPage(path);
  const draft = isDraft(page);
  if (draft && process.env.VERCEL_ENV === "production") notFound();

  return (
    <PageShell wide lang={lang}>
      <Breadcrumbs path={path} />
      {draft && (
        <p className="mt-4 rounded-[8px] border border-[#e0c36b] bg-[#fdf6dc] p-3 text-sm text-[#5b4300]">
          Draft. This page is not published: it is noindex, out of the sitemap and out of the navigation until its
          gate is cleared in docs/seo/feature-status.json.
        </p>
      )}
      <header className="mt-8 max-w-3xl border-l-4 border-lime pl-5 sm:pl-7">
        <h1 className="text-[2.25rem] font-bold leading-[1.1] text-ink sm:text-5xl">{h1}</h1>
        <p className="mt-5 text-lg leading-relaxed text-[#2f393f]">{lead}</p>
        <p className="mt-4 text-sm text-mute">
          {showByline && author ? `By ${author} · ` : ""}Last updated: {formatDate(page.updated)}
        </p>
      </header>

      {toc && toc.length > 0 && (
        <nav aria-label="On this page" className="mt-10 max-w-3xl border-y border-line py-5">
          <p className="text-sm font-semibold text-ink">On this page</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-0.5">
            {toc.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="fv-link inline-block py-1.5 text-[15px]">
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="mt-12 max-w-3xl space-y-16">{children}</div>

      <div className="max-w-3xl">
        <RelatedLinks paths={related} />
      </div>
      <ClosingCta location={`${path}-closing`} />
    </PageShell>
  );
}

export function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-[1.75rem] font-bold leading-tight text-ink sm:text-[2rem]">{title}</h2>
      <div className="fv-section mt-5 space-y-4 text-[1.0625rem] leading-[1.65] text-[#2f393f]">
        {children}
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <div key={f.q} className="grid gap-2 py-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
          <dt className="text-base font-semibold text-ink">{f.q}</dt>
          <dd className="text-[15px] leading-relaxed text-[#2f393f]">{f.a}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ExampleBox({ title = "Example", children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="border-l-4 border-lime bg-white py-4 pl-5 pr-4">
      <p className="text-sm font-semibold text-ink">{title} (illustrative)</p>
      <div className="mt-2 space-y-2 text-[15px] leading-relaxed text-[#2f393f]">{children}</div>
    </aside>
  );
}

// Real product screenshots only. Until the owner supplies one, ScreenshotFrame shows a neutral block marked
// data-placeholder, and the launch check fails while any placeholder is on an indexable page.
// `alt` and `caption` stay for the page copy; the frame uses the alt text registered in src/config/screens.ts.
export function ScreenshotPlaceholder({
  screen,
  caption,
}: {
  screen: string;
  alt?: string;
  caption?: string;
}) {
  return <ScreenshotFrame screen={screen} caption={caption} />;
}
