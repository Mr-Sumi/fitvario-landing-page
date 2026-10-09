// Canonical host: www (live site already serves from it).
export const SITE_URL = "https://www.fitvario.com";
export const SITE_NAME = "Fitvario";

const digits = (v: string) => v.replace(/\D/g, "");

const whatsappRaw = digits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "");
const phoneRaw = digits(process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "");

// 10-digit Indian numbers get the 91 prefix wa.me needs
const withCountry = (n: string) => (n.length === 10 ? `91${n}` : n);

export const contact = {
  email: "support@fitvario.com",
  whatsappNumber: whatsappRaw ? withCountry(whatsappRaw) : "",
  phoneNumber: phoneRaw ? withCountry(phoneRaw) : "",
  hours: process.env.NEXT_PUBLIC_WORKING_HOURS ?? "",
  responseTime: process.env.NEXT_PUBLIC_RESPONSE_TIME ?? "within 24 hours on business days",
  addressLines: ["Fitvario", "Bhopal, Madhya Pradesh", "India"],
};

// Byline for editorial pages. Empty = no byline shown (nothing is invented)
export const author = process.env.NEXT_PUBLIC_AUTHOR_NAME ?? "";

export const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "";
export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

// Only real, public profiles go here
export const sameAs: string[] = [];

export function whatsappLink(message: string): string {
  if (!contact.whatsappNumber) return "";
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
