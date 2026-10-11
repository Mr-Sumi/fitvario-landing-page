import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getPost, getPosts, neighbours } from "@/lib/blog";
import { author as configuredAuthor, SITE_NAME } from "@/config/site";
import { ContentLayout } from "@/components/ContentLayout";
import { BlogPostingJsonLd } from "@/components/JsonLd";
import { MidCta } from "@/components/MidCta";

export const dynamicParams = false;

export function generateStaticParams() {
  // Drafts are built too so they can be reviewed; production returns 404 for them (see ContentLayout)
  return getPosts({ includeDrafts: true }).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return buildMetadata(`/blog/${slug}`);
}

function toPath(ref: string): string {
  return ref.startsWith("/") ? ref : `/blog/${ref}`;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const byline = configuredAuthor || post.author || SITE_NAME;
  const { prev, next } = neighbours(post.slug);

  return (
    <>
      <BlogPostingJsonLd
        headline={post.title}
        description={post.description}
        path={path}
        published={post.published}
        updated={post.updated}
        author={byline}
      />
      <ContentLayout
        path={path}
        h1={post.title}
        lead={post.lead}
        toc={post.toc}
        showByline
        related={post.related.map(toPath)}
      >
        <p className="-mt-6 text-sm text-slate-500">
          {post.minutes} min read · Published {new Date(post.published + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}
        </p>
        <article className="fv-prose" dangerouslySetInnerHTML={{ __html: post.html }} />

        <MidCta text="Want your team to work from one shared list?" location={`blog-${post.slug}`} />

        <aside className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">About the author</p>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
            Written by {byline}. Fitvario is gym management software from Bhopal, India. See{" "}
            <Link href="/about" className="font-medium text-teal-700 underline-offset-2 hover:underline">
              about Fitvario
            </Link>
            .
          </p>
        </aside>

        {(prev || next) && (
          <nav aria-label="More posts" className="grid gap-3 sm:grid-cols-2">
            {prev && (
              <Link href={`/blog/${prev.slug}`} className="rounded-xl border border-slate-200 bg-white p-4 hover:border-teal-300">
                <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Previous</span>
                <span className="mt-1 block text-sm font-semibold text-teal-700">{prev.title}</span>
              </Link>
            )}
            {next && (
              <Link href={`/blog/${next.slug}`} className="rounded-xl border border-slate-200 bg-white p-4 hover:border-teal-300 sm:text-right">
                <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Next</span>
                <span className="mt-1 block text-sm font-semibold text-teal-700">{next.title}</span>
              </Link>
            )}
          </nav>
        )}
      </ContentLayout>
    </>
  );
}
