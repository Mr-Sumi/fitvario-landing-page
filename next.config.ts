import type { NextConfig } from "next";
import path from "node:path";

// Add a path here when a page is removed for good; it will answer 410 instead of 404
const GONE_PATHS: string[] = [];

const nextConfig: NextConfig = {
  // Pinned so a stray package.json higher up the disk can't change where modules are resolved
  turbopack: { root: path.join(__dirname) },
  async rewrites() {
    return GONE_PATHS.map((source) => ({ source, destination: "/gone" }));
  },
};

export default nextConfig;
