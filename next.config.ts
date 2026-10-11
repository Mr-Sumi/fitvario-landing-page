import type { NextConfig } from "next";
import path from "node:path";

// Add a path here when a page is removed for good; it will answer 410 instead of 404
const GONE_PATHS: string[] = [];

// Safe defaults that do not interfere with the Razorpay-free marketing site, GA or Turnstile.
// No Content-Security-Policy yet: GA and Turnstile need a carefully tested allow-list first.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Pinned so a stray package.json higher up the disk can't change where modules are resolved
  turbopack: { root: path.join(__dirname) },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    return GONE_PATHS.map((source) => ({ source, destination: "/gone" }));
  },
};

export default nextConfig;
