import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build plain HTML/CSS/JS into ./out, served by Cloudflare as static assets.
  output: "export",
  // The default image optimizer needs a server, which a static export lacks.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
