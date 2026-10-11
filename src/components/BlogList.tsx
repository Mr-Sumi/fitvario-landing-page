import Link from "next/link";
import type { Post } from "@/lib/blog";

export function BlogList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="text-[15px] text-slate-600">No posts yet. Check back soon.</p>;
  }
  return (
    <ul className="space-y-4">
      {posts.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/blog/${p.slug}`}
            className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-300"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-teal-700">{p.category}</span>
            <span className="mt-1 block text-lg font-semibold text-slate-900">{p.title}</span>
            <span className="mt-1 block text-[14px] leading-relaxed text-slate-600">{p.description}</span>
            <span className="mt-2 block text-[12px] text-slate-500">{p.minutes} min read</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
