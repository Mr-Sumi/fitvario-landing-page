import { getPosts } from "@/lib/blog";
import { SITE_URL } from "@/config/site";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

// Public posts only. Drafts never appear in the feed.
export function GET() {
  const posts = getPosts();
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.published + "T00:00:00Z").toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
      <category>${esc(p.category)}</category>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Fitvario blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Practical advice for Indian gym owners.</description>
    <language>en-IN</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
