import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { BLOG_PAGE_SIZE, getPosts, pageCount } from "@/lib/blog";
import { ContentLayout } from "@/components/ContentLayout";
import { BlogList } from "@/components/BlogList";

export const dynamicParams = false;

export function generateStaticParams() {
  const total = pageCount();
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  return buildMetadata(`/blog/page/${n}`);
}

export default async function BlogPageN({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const page = Number(n);
  const total = pageCount();
  if (!Number.isInteger(page) || page < 2 || page > total) notFound();
  const posts = getPosts().slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE);

  return (
    <ContentLayout
      path={`/blog/page/${page}`}
      h1={`Fitvario blog, page ${page}`}
      lead="Older guides for Indian gym owners on pricing, renewals, retention and running a gym."
      related={["/blog", "/features"]}
    >
      <BlogList posts={posts} />
      <p className="text-sm text-slate-600">
        <Link href={page === 2 ? "/blog" : `/blog/page/${page - 1}`} className="font-semibold text-teal-700 underline-offset-2 hover:underline">
          Newer posts
        </Link>
        {page < total && (
          <>
            {" · "}
            <Link href={`/blog/page/${page + 1}`} className="font-semibold text-teal-700 underline-offset-2 hover:underline">
              Older posts
            </Link>
          </>
        )}
      </p>
    </ContentLayout>
  );
}
