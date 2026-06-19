import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.emeoutlookmag.com",
      },
      {
        protocol: "https",
        hostname: "static.toprecepty.cz",
      },
    ],
  },
};

export default nextConfig;
