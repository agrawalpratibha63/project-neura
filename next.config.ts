import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "concepta-sable.vercel.app",
      },
    ],
  },
};

export default nextConfig;
