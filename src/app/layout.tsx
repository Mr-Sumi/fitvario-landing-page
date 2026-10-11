import type { Metadata, Viewport } from "next";
import { Outfit, Instrument_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CookieBanner } from "@/components/CookieBanner";
import { Analytics } from "@/components/Analytics";
import { ActionBar } from "@/components/ActionBar";
import { AutoReveal } from "@/components/AutoReveal";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { OG_IMAGE } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/config/site";
import "./globals.css";

// One pairing: Outfit (a round geometric sans) for headings, Instrument Sans for text. Variable fonts: one file each.
const heading = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});
const text = Instrument_Sans({
  variable: "--font-text",
  subsets: ["latin"],
  display: "swap",
});

const DEFAULT_TITLE = "Fitvario | Gym Management Software for Indian Gyms";
const DEFAULT_DESCRIPTION =
  "Gym management software for Indian gyms: memberships, QR attendance, CRM, billing and analytics.";

// Pages set their own canonical and Open Graph via buildMetadata(); nothing page-specific lives here
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: "%s" },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  publisher: SITE_NAME,
  category: "Software",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  manifest: "/manifest.json",
  // Icons come from the file convention: src/app/favicon.ico, icon.png and apple-icon.png (scripts/make-favicon.mjs)
};

export const viewport: Viewport = {
  themeColor: "#192126",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${heading.variable} ${text.variable} h-full scroll-smooth antialiased`}>
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="flex min-h-full flex-col bg-paper pb-16 font-sans text-ink md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <ActionBar />
        <AutoReveal />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
