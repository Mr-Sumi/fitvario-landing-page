// Real plan table goes here once Sumit supplies it. Empty = custom-quote mode.
export interface PricingTier {
  name: string;
  priceInr: number;
  period: "month" | "quarter" | "year";
  basis: string; // e.g. "per branch, up to 300 members"
  highlights: string[];
  cta: "signup" | "demo";
}

export const pricingTiers: PricingTier[] = [];

// Only flip once self-serve signup + payment is confirmed to work end to end
export const selfServeSignup = false;
export const signupUrl = process.env.NEXT_PUBLIC_SIGNUP_URL ?? "";

// Typical-setup example is shown only when real numbers are provided
export const typicalSetupExample: { description: string } | null = null;
