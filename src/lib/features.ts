import raw from "../../docs/seo/feature-status.json";

type Status = "live" | "live-per-site" | "in-code" | "not-live" | "no-evidence";
const features = raw.features as Record<string, { status: Status }>;

export type FeatureKey = keyof typeof raw.features;

// Only these two statuses may be claimed in copy
export function isLive(key: FeatureKey): boolean {
  const s = features[key]?.status;
  return s === "live" || s === "live-per-site";
}
