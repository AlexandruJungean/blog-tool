import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClientLanguageWrapper from "./ClientLanguageWrapper";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

type Frontmatter = {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  date?: string;
  author?: string;
  section?: "client" | "provider";
  lang?: string;
};

function findPosts(slug: string): Record<string, { data: Frontmatter; content: string }> {
  const posts: Record<string, { data: Frontmatter; content: string }> = {};
  for (const lang of ["en", "cs"]) {
    const filePath = path.join(POSTS_DIR, lang, `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      posts[lang] = { data: data as Frontmatter, content };
    }
  }
  return posts;
}

export async function generateStaticParams() {
  const slugs = new Set<string>();
  for (const lang of ["en", "cs"]) {
    const dir = path.join(POSTS_DIR, lang);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith(".mdx")) {
        slugs.add(file.replace(/\.mdx$/, ""));
      }
    }
  }
  return Array.from(slugs).map(slug => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const posts = findPosts(slug);
  const post = posts.en || posts.cs;
  if (!post) return {};
  const { data } = post;
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    openGraph: {
      title: data.title,
      description: data.description,
      type: "article",
      images: [{ url: data.ogImage ?? "/og-image.webp", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.ogImage ?? "/og-image.webp"],
    },
  };
}

export default async function PostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const posts = findPosts(slug);
  if (!posts.en && !posts.cs) notFound();

  const renderPost = (langData: { data: Frontmatter; content: string } | undefined) => {
    if (!langData) return null;
    const { data, content } = langData;
    return (
      <main className="flex-1 pb-20">
        {/* Article header */}
        <div
          className="pt-36 pb-14 px-6"
          style={{
            background: "linear-gradient(135deg, #0F0A32 0%, #431E90 50%, #BC95FB 100%)",
          }}
        >
          <div className="mx-auto max-w-3xl">
            {data.section && (
              <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/15 text-white/80">
                {data.section === "client" ? "For expats in Prague" : "Pro poskytovatele"}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {data.title}
            </h1>
            {(data.author || data.date) && (
              <p className="mt-4 text-white/60 text-sm">
                {data.author && <span>{data.author}</span>}
                {data.author && data.date && <span className="mx-2">·</span>}
                {data.date && (
                  <time dateTime={data.date}>
                    {new Date(data.date).toLocaleDateString(
                      data.lang === "cs" ? "cs-CZ" : "en-GB",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </time>
                )}
              </p>
            )}
          </div>
        </div>

        {/* Article body */}
        <article className="mx-auto max-w-3xl px-6 lg:px-8 mt-12 mb-8">
          <div className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-[#0F0A32] prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-5
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[#1F2937] prose-p:leading-relaxed prose-p:my-5
            prose-a:text-[#7631EE] prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-[#5C27BF]
            prose-strong:text-[#0F0A32]
            prose-ul:my-5 prose-ol:my-5
            prose-li:text-[#1F2937] prose-li:my-1
            prose-table:w-full prose-table:text-sm prose-table:border-collapse
            prose-thead:border-b-2 prose-thead:[border-color:#7631EE]
            prose-th:bg-[#F7F1FF] prose-th:text-[#0F0A32] prose-th:font-semibold prose-th:px-4 prose-th:py-3 prose-th:text-left
            prose-td:text-[#1F2937] prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:[border-color:#E3CFFD]
            prose-hr:border-[#E3CFFD] prose-hr:my-10
            prose-blockquote:not-italic prose-blockquote:border-l-4 prose-blockquote:border-[#7631EE] prose-blockquote:bg-[#F7F1FF] prose-blockquote:rounded-r-lg prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:text-[#1F2937]
            prose-code:text-[#7631EE] prose-code:bg-[#F7F1FF] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
            prose-figure:my-10
            prose-figcaption:text-center prose-figcaption:text-xs prose-figcaption:text-gray-400 prose-figcaption:mt-2
          ">
            <MDXRemote
                source={content}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
          </div>
        </article>
      </main>
    );
  };

  return (
    <>
      <Header />

      <ClientLanguageWrapper
        enContent={renderPost(posts.en)}
        csContent={renderPost(posts.cs)}
      />

      <Footer />
    </>
  );
}
