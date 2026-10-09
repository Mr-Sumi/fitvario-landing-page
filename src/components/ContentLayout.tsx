import { notFound } from "next/navigation";
import { getPage, isDraft } from "@/config/pages";
import { formatDate } from "@/lib/seo";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedLinks } from "@/components/RelatedLinks";
import { ClosingCta } from "@/components/ClosingCta";
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
  related,
  children,
}: {
  path: string;
  h1: string;
  /** First ~100 words: the direct answer to the searcher's question */
  lead: string;
  toc?: TocItem[];
  showByline?: boolean;
  related: string[];
  children: React.ReactNode;
}) {
  const page = getPage(path);
  const draft = isDraft(page);
  if (draft && process.env.VERCEL_ENV === "production") notFound();

  return (
    <PageShell wide>
      <Breadcrumbs path={path} />
      {draft && (
        <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          Draft. This page is not published: it is noindex, out of the sitemap and out of the navigation until its
          gate is cleared in docs/seo/feature-status.json.
        </p>
      )}
      <header className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{h1}</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-slate-700">{lead}</p>
        <p className="mt-3 text-sm text-slate-500">
          {showByline && author ? `By ${author} · ` : ""}Last updated: {formatDate(page.updated)}
        </p>
      </header>

      {toc && toc.length > 0 && (
        <nav aria-label="On this page" className="mt-8 max-w-3xl rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">On this page</p>
          <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {toc.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="inline-block py-1.5 text-sm text-teal-700 underline-offset-2 hover:underline">
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="mt-10 max-w-3xl space-y-12">{children}</div>

      <div className="max-w-3xl">
        <RelatedLinks paths={related} />
      </div>
      <ClosingCta location={`${path}-closing`} />
    </PageShell>
  );
}

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
      <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <dl className="space-y-3">
      {items.map((f) => (
        <div key={f.q} className="rounded-xl border border-slate-200 bg-white p-5">
          <dt className="text-[15px] font-semibold text-slate-900">{f.q}</dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-slate-600">{f.a}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ExampleBox({ title = "Example", children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="rounded-xl border border-teal-200 bg-teal-50/60 p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-teal-800">{title} (illustrative)</p>
      <div className="mt-2 space-y-2 text-[15px] leading-relaxed text-slate-700">{children}</div>
    </aside>
  );
}

// Real product screenshots only. Until one is supplied this shows a clearly marked placeholder.
export function ScreenshotPlaceholder({ alt, caption }: { alt: string; caption: string }) {
  return (
    <figure>
      <div
        role="img"
        aria-label={`Placeholder for screenshot: ${alt}`}
        className="flex aspect-[16/9] items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-100 px-6 text-center text-sm text-slate-500"
      >
        Screenshot placeholder. {alt}
      </div>
      <figcaption className="mt-2 text-[13px] text-slate-500">{caption}</figcaption>
    </figure>
  );
}
