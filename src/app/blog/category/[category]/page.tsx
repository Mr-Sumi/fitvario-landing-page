import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { categories, getPosts, slugify } from "@/lib/blog";
import { ContentLayout } from "@/components/ContentLayout";
import { BlogList } from "@/components/BlogList";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return buildMetadata(`/blog/category/${category}`);
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categories().find((c) => c.slug === category);
  if (!cat) notFound();
  const posts = getPosts().filter((p) => slugify(p.category) === category);

  return (
    <ContentLayout
      path={`/blog/category/${category}`}
      h1={`${cat.name}: posts for gym owners`}
      lead={`Fitvario blog posts about ${cat.name.toLowerCase()}, written for Indian gym owners.`}
      related={["/blog", "/features"]}
    >
      <BlogList posts={posts} />
    </ContentLayout>
  );
}
