import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

type PostFrontmatter = {
  title: string;
  date?: string;
  section?: "client" | "provider" | "community";
  ogImage?: string;
};

export type FeedPost = {
  slug: string;
  img: string;
  date: string;
  title: { en: string; cs: string };
};

export type FeedSections = {
  client: FeedPost[];
  provider: FeedPost[];
  community: FeedPost[];
};

// Every post lives under content/posts/{en,cs}/<slug>.mdx. A post published in
// only one language still gets a feed card, using that language's title for
// both locales, so a post never needs a manual entry anywhere else to appear
// on the homepage.
export function getFeedSections(): FeedSections {
  const bySlug = new Map<string, { en?: PostFrontmatter; cs?: PostFrontmatter }>();

  for (const lang of ["en", "cs"] as const) {
    const dir = path.join(POSTS_DIR, lang);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".mdx")) continue;
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      const entry = bySlug.get(slug) ?? {};
      entry[lang] = data as PostFrontmatter;
      bySlug.set(slug, entry);
    }
  }

  const sections: FeedSections = { client: [], provider: [], community: [] };

  for (const [slug, langs] of bySlug) {
    const primary = langs.en ?? langs.cs;
    if (!primary?.section) continue;

    const post: FeedPost = {
      slug,
      img: primary.ogImage ?? "/og-image.webp",
      date: primary.date ?? "",
      title: {
        en: langs.en?.title ?? langs.cs?.title ?? slug,
        cs: langs.cs?.title ?? langs.en?.title ?? slug,
      },
    };

    sections[primary.section].push(post);
  }

  for (const section of Object.keys(sections) as (keyof FeedSections)[]) {
    sections[section].sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  return sections;
}
