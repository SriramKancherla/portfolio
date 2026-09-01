import type { NextConfig } from "next";

/**
 * Static export for Cloudflare Pages.
 *
 * Every route in this app prerenders — there are no route handlers, no
 * middleware, no server actions — so a static export is a complete build, not a
 * downgrade. Output lands in `out/`.
 *
 * Security headers are NOT set here: `headers()` is ignored under
 * `output: "export"`. They live in `public/_headers`, which Cloudflare Pages
 * applies at the edge. Change them there.
 *
 * To go back to Cloudflare Workers instead, drop `output`/`images` below and
 * restore the `headers()` block (kept at _to_delete/next.config.workers.ts.bak).
 */
const nextConfig: NextConfig = {
  output: "export",
  // Emits out/resume/index.html rather than out/resume.html, so the route
  // resolves on any static host without relying on extension-stripping.
  trailingSlash: true,
  reactStrictMode: true,
  turbopack: {},
  allowedDevOrigins: ["portfolio7967.builtwithrocket.new"],

  // The export has no image optimisation server. Nothing here uses next/image,
  // so this only guards against it being added later without noticing.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.simpleicons.org" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
