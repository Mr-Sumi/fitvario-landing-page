import { SITE_NAME, SITE_URL, absoluteUrl, contact, sameAs } from "@/config/site";
import { pricingTiers } from "@/config/pricing";

// "<" escaped so the payload can never close the script tag
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: absoluteUrl("/logo.png"),
        email: contact.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bhopal",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: contact.email,
            ...(contact.phoneNumber ? { telephone: `+${contact.phoneNumber}` } : {}),
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
        ],
        ...(sameAs.length ? { sameAs } : {}),
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: "en-IN",
      }}
    />
  );
}

// Offers only when the pricing config has real tiers
export function SoftwareApplicationJsonLd() {
  const offers = pricingTiers.map((t) => ({
    "@type": "Offer",
    name: t.name,
    price: String(t.priceInr),
    priceCurrency: "INR",
  }));
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: SITE_NAME,
        url: SITE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, Android",
        description:
          "Gym management software for memberships, QR attendance, fee reminders, CRM, workout and diet plans and analytics, with a branded Android app for members.",
        ...(offers.length ? { offers } : {}),
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: absoluteUrl(it.path),
        })),
      }}
    />
  );
}
