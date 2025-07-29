import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure page extensions
  pageExtensions: ["ts", "tsx", "js", "jsx"],

  // Other configurations can go here
  trailingSlash: false,

  // Rewrites for API routes
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots.txt",
      },
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap.xml",
      },
    ];
  },
};

export default nextConfig;
