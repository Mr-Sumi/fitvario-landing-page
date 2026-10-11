import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { parseFrontmatter } from "./frontmatter.mjs";
import { BLOG_PAGE_SIZE } from "@/config/blog-pages.generated";

const DIR = path.join(process.cwd(), "src", "content", "blog");

export interface TocEntry {
  id: string;
  label: string;
}

export interface Post {
  slug: string;
  seoTitle: string;
  title: string;
  lead: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  updated: string;
  published: string;
  author: string;
  category: string;
  draft: boolean;
  related: string[];
  html: string;
  toc: TocEntry[];
  words: number;
  minutes: number;
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&amp;|&/g, " and ")
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const stripTags = (h: string) => h.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;|&quot;/g, "'").trim();

function render(body: string): { html: string; toc: TocEntry[] } {
  const raw = marked.parse(body, { async: false, gfm: true }) as string;
  const toc: TocEntry[] = [];
  const seen = new Set<string>();
  const html = raw.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, level: string, inner: string) => {
    let id = slugify(stripTags(inner));
    while (seen.has(id)) id += "-2";
    seen.add(id);
    if (level === "2") toc.push({ id, label: stripTags(inner) });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  // Tables scroll sideways on a phone instead of breaking the layout
  const wrapped = html
    .replace(/<table>/g, '<div class="overflow-x-auto"><table>')
    .replace(/<\/table>/g, "</table></div>");
  return { html: wrapped, toc };
}

let cache: Post[] | null = null;

export function getPosts({ includeDrafts = false } = {}): Post[] {
  if (!cache) {
    const files = existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith(".md")) : [];
    cache = files
      .map((f): Post => {
        const { data, body } = parseFrontmatter(readFileSync(path.join(DIR, f), "utf8"));
        const { html, toc } = render(body);
        const words = body.split(/\s+/).filter(Boolean).length;
        const str = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
        const list = (k: string) => (Array.isArray(data[k]) ? (data[k] as string[]) : []);
        return {
          slug: str("slug") || f.replace(/\.md$/, ""),
          seoTitle: str("seoTitle"),
          title: str("title"),
          lead: str("lead"),
          description: str("description"),
          primaryKeyword: str("primaryKeyword"),
          secondaryKeywords: list("secondaryKeywords"),
          updated: str("updated"),
          published: str("published"),
          author: str("author"),
          category: str("category"),
          draft: data.draft === true,
          related: list("related"),
          html,
          toc,
          words,
          minutes: Math.max(1, Math.round(words / 200)),
        };
      })
      .sort((a, b) => (a.published < b.published ? 1 : -1));
  }
  return includeDrafts ? cache : cache.filter((p) => !p.draft);
}

export function getPost(slug: string): Post | undefined {
  return getPosts({ includeDrafts: true }).find((p) => p.slug === slug);
}

export function neighbours(slug: string): { prev?: Post; next?: Post } {
  const list = getPosts();
  const i = list.findIndex((p) => p.slug === slug);
  if (i < 0) return {};
  return { prev: list[i + 1], next: list[i - 1] };
}

export function categories(): { name: string; slug: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of getPosts()) m.set(p.category, (m.get(p.category) ?? 0) + 1);
  return [...m].map(([name, count]) => ({ name, slug: slugify(name), count }));
}

export function pageCount(): number {
  return Math.max(1, Math.ceil(getPosts().length / BLOG_PAGE_SIZE));
}

export { BLOG_PAGE_SIZE };
