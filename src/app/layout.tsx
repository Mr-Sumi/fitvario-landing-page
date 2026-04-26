import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://fitvario.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Fitvario — Gym Management App & Software with Ecommerce",
    template: "%s | Fitvario",
  },
  description:
    "Fitvario is gym management software and app for memberships, QR attendance, CRM, workouts, analytics, messaging, and ecommerce — built for single clubs and franchise groups across India.",
  keywords: [
    "gym management software",
    "gym management app",
    "gym membership software",
    "gym CRM",
    "gym attendance app",
    "QR attendance",
    "fitness app India",
    "gym software India",
    "gym billing software",
    "fitness studio management",
    "gym franchise software",
    "member app gym",
  ],
  authors: [{ name: "Fitvario", url: BASE_URL }],
  creator: "Sumigyan.in",
  publisher: "Fitvario",
  category: "Software",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Fitvario",
    title: "Fitvario — Gym Management App & Software with Ecommerce",
    description:
      "Run memberships, QR attendance, CRM, workouts, analytics, and ecommerce from one gym management platform — for single clubs and growing franchise groups.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fitvario — Gym Management Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitvario — Gym Management App & Software",
    description:
      "All-in-one gym management platform: memberships, QR attendance, CRM, workouts, analytics, and ecommerce — built for India.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    // Add your Google Search Console verification token here when you have it
    // google: "your-google-verification-token",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d9488",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Fitvario",
  url: BASE_URL,
  description:
    "Fitvario is gym management software with memberships, QR attendance, CRM, WhatsApp alerts, analytics, and a branded Android app — for single gyms and franchise groups across India.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Android, Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description: "Contact for custom pricing",
  },
  provider: {
    "@type": "Organization",
    name: "Fitvario",
    url: BASE_URL,
    email: "support@fitvario.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@fitvario.com",
      availableLanguage: ["English", "Hindi"],
    },
    areaServed: "IN",
    foundingLocation: {
      "@type": "Country",
      name: "India",
    },
  },
  screenshot: `${BASE_URL}/og-image.png`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-slate-50 font-sans text-slate-900">
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
