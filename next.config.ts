import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Ensure App Router features are enabled by default
  },
};

export default nextConfig;
