import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

// Noindex pages (like /thank-you) are not disallowed on purpose: Google has to crawl them to see the tag
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/gone"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
