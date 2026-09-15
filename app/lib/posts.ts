import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { locales, type Lang } from "./i18n";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type Frontmatter = {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  date?: string;
  author?: string;
  section?: "client" | "provider" | "community";
  lang?: string;
};

export type Post = {
  slug: string;
  lang: Lang;
  data: Frontmatter;
  content: string;
};

export type FeedPost = {
  slug: string;
  img: string;
  date: string;
  title: string;
};

export type FeedSections = {
  client: FeedPost[];
  provider: FeedPost[];
  community: FeedPost[];
};

function postPath(lang: Lang, slug: string) {
  return path.join(POSTS_DIR, lang, `${slug}.mdx`);
}

export function getPost(lang: Lang, slug: string): Post | null {
  const filePath = postPath(lang, slug);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, lang, data: data as Frontmatter, content };
}

export function getSlugs(lang: Lang): string[] {
  const dir = path.join(POSTS_DIR, lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAvailableLangs(slug: string): Lang[] {
  return locales.filter((lang) => fs.existsSync(postPath(lang, slug)));
}

export function getAllLocalizedPosts(): {
  lang: Lang;
  slug: string;
  date?: string;
}[] {
  const posts: { lang: Lang; slug: string; date?: string }[] = [];
  for (const lang of locales) {
    for (const slug of getSlugs(lang)) {
      posts.push({ lang, slug, date: getPost(lang, slug)?.data.date });
    }
  }
  return posts;
}

// A post appears on a language homepage only when that language file exists.
export function getFeedSections(lang: Lang): FeedSections {
  const sections: FeedSections = { client: [], provider: [], community: [] };
  const dir = path.join(POSTS_DIR, lang);
  if (!fs.existsSync(dir)) return sections;

  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".mdx")) continue;
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);
    const fm = data as Frontmatter;
    if (!fm.section) continue;

    sections[fm.section].push({
      slug,
      img: fm.ogImage ?? "/og-image.webp",
      date: fm.date ?? "",
      title: fm.title,
    });
  }

  for (const section of Object.keys(sections) as (keyof FeedSections)[]) {
    sections[section].sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  return sections;
}
