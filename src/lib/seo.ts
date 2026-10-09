import type { Metadata } from "next";
import { getPage, isIndexable } from "@/config/pages";
import { SITE_NAME, absoluteUrl } from "@/config/site";

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Fitvario gym management software",
};

// One place for every page's head tags; title and description come from the page registry
export function buildMetadata(path: string): Metadata {
  const page = getPage(path);
  const url = absoluteUrl(path);
  const indexable = isIndexable(page);

  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true, googleBot: { index: false, follow: true } },
    openGraph: {
      type: page.kind === "blog" ? "article" : "website",
      locale: "en_IN",
      url,
      siteName: SITE_NAME,
      title: page.title,
      description: page.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [OG_IMAGE.url],
    },
  };
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
