import type { MetadataRoute } from "next";
import { absoluteUrl, hreflangLanguages, locales } from "./lib/i18n";
import { getAllLocalizedPosts, getAvailableLangs } from "./lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllLocalizedPosts();

  return [
    ...locales.map((lang) => ({
      url: absoluteUrl(lang),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
      alternates: {
        languages: hreflangLanguages(locales),
      },
    })),
    ...posts.map(({ lang, slug, date }) => ({
      url: absoluteUrl(lang, slug),
      lastModified: date ? new Date(date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: hreflangLanguages(getAvailableLangs(slug), slug),
      },
    })),
  ];
}
