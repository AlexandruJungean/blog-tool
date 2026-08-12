import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://blog.tool-connect.com";
const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function getSlugData(): { slug: string; lastModified: string }[] {
  const bySlug = new Map<string, string>();

  for (const lang of ["en", "cs"]) {
    const dir = path.join(POSTS_DIR, lang);
    if (!fs.existsSync(dir)) continue;

    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".mdx")) continue;
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      const date: string | undefined = data.date;

      const existing = bySlug.get(slug);
      if (!existing || (date && date > existing)) {
        bySlug.set(slug, date ?? existing ?? "");
      }
    }
  }

  return Array.from(bySlug.entries()).map(([slug, lastModified]) => ({
    slug,
    lastModified,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSlugData();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...posts.map(({ slug, lastModified }) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: lastModified ? new Date(lastModified) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
