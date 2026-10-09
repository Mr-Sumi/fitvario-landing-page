import type { MetadataRoute } from "next";
import { pages, isIndexable } from "@/config/pages";
import { absoluteUrl } from "@/config/site";

// Indexable pages only, with each page's real "updated" date (never the build time)
export default function sitemap(): MetadataRoute.Sitemap {
  return pages
    .filter(isIndexable)
    .map((p) => ({ url: absoluteUrl(p.path), lastModified: new Date(`${p.updated}T00:00:00Z`) }));
}
