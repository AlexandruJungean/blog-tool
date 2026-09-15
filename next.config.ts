import type { NextConfig } from "next";
import { defaultLocale, localePath, locales } from "./app/lib/i18n";
import { getAvailableLangs, getSlugs } from "./app/lib/posts";

const nextConfig: NextConfig = {
  async redirects() {
    const slugs = new Set(locales.flatMap((lang) => getSlugs(lang)));

    // Build a stable migration map. A permanent redirect must not vary by cookie.
    return [...slugs].map((slug) => {
      const available = getAvailableLangs(slug);
      const lang = available.includes(defaultLocale) ? defaultLocale : available[0];
      return {
        source: `/${slug}`,
        destination: localePath(lang, slug),
        permanent: true,
      };
    });
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
