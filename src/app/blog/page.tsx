import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BLOG_PAGE_SIZE, categories, getPosts, pageCount } from "@/lib/blog";
import { ContentLayout } from "@/components/ContentLayout";
import { isPublishedPath } from "@/config/pages";
import { BlogList } from "@/components/BlogList";

export const metadata = {
  ...buildMetadata("/blog"),
  alternates: { canonical: "https://www.fitvario.com/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default function BlogIndexPage() {
  const posts = getPosts().slice(0, BLOG_PAGE_SIZE);
  const total = pageCount();
  const cats = categories();

  return (
    <ContentLayout
      path="/blog"
      h1="Fitvario blog: practical advice for Indian gym owners"
      lead="Plain guides on the things that decide whether a gym does well: what to charge, how to keep members, how to follow up leads and how to collect fees. Each one has examples and templates you can copy into your own gym."
      related={["/features", "/pricing", "/tools/gym-break-even-calculator"]}
    >
      <BlogList posts={posts} />

      {total > 1 && (
        <p className="text-sm text-slate-600">
          <Link href="/blog/page/2" className="font-semibold text-teal-700 underline-offset-2 hover:underline">
            Older posts
          </Link>
        </p>
      )}

      {cats.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Topics</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {cats.map((c) => (
              <li key={c.slug}>
                {isPublishedPath(`/blog/category/${c.slug}`) ? (
                  <Link
                    href={`/blog/category/${c.slug}`}
                    className="inline-flex h-11 items-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-800 hover:bg-slate-50"
                  >
                    {c.name} ({c.count})
                  </Link>
                ) : (
                  <span className="inline-flex h-11 items-center rounded-lg bg-slate-100 px-4 text-sm font-medium text-slate-700">
                    {c.name} ({c.count})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="text-sm text-slate-500">
        <a href="/blog/rss.xml" className="underline underline-offset-2">
          RSS feed
        </a>
      </p>
    </ContentLayout>
  );
}
