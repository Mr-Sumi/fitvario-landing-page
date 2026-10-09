// Logos, testimonials and case studies appear only with written permission.
export interface ProofItem {
  kind: "logo" | "testimonial" | "case-study";
  name: string;
  quote?: string;
  href?: string;
  permissionGranted: boolean;
}

export const proofItems: ProofItem[] = [];

export const founder: { name: string; bio: string } | null = null;
