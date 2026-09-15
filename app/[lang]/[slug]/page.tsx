import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { createMdxComponents } from "../../components/mdx";
import {
  SITE_URL,
  absoluteUrl,
  hreflangLanguages,
  isLang,
  ogLocale,
  type Lang,
} from "../../lib/i18n";
import { getAvailableLangs, getPost, getSlugs } from "../../lib/posts";

function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFaqs(content: string): { question: string; answer: string }[] {
  const faqMatch = content.match(/##\s*FAQ\b([\s\S]*?)(?=\n##\s|\n---\s*\n##|$)/i);
  if (!faqMatch) return [];

  const section = faqMatch[1];
  const pairs: { question: string; answer: string }[] = [];
  const pairRegex = /\*\*(.+?)\*\*\s*\n+([\s\S]*?)(?=\n\*\*.+?\*\*|$)/g;
  let match: RegExpExecArray | null;

  while ((match = pairRegex.exec(section)) !== null) {
    const question = stripMarkdown(match[1]);
    const answer = stripMarkdown(match[2]);
    if (question && answer) pairs.push({ question, answer });
  }

  return pairs;
}

export function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!isLang(params.lang)) return [];
  return getSlugs(params.lang).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  if (!isLang(raw)) return {};
  const post = getPost(raw, slug);
  if (!post) return {};

  const { data } = post;
  const canonical = absoluteUrl(raw, slug);
  const available = getAvailableLangs(slug);

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: {
      canonical,
      languages: hreflangLanguages(available, slug),
    },
    openGraph: {
      title: data.title,
      description: data.description,
      type: "article",
      url: canonical,
      locale: ogLocale(raw),
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

export default async function PostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  if (!isLang(raw)) notFound();

  const post = getPost(raw, slug);
  if (!post) notFound();

  const { data, content } = post;
  const canonical = absoluteUrl(raw, slug);
  const imageUrl = data.ogImage
    ? data.ogImage.startsWith("http")
      ? data.ogImage
      : `${SITE_URL}${data.ogImage}`
    : undefined;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    inLanguage: raw === "cs" ? "cs-CZ" : "en-GB",
    headline: data.title,
    description: data.description,
    image: imageUrl,
    author: { "@type": "Organization", name: data.author ?? "Tool Connect Team" },
    publisher: { "@type": "Organization", name: "Tool Connect" },
    datePublished: data.date,
    dateModified: data.date,
    url: canonical,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  const faqs = extractFaqs(content);
  const faqSchema = faqs.length > 0 && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: raw === "cs" ? "cs-CZ" : "en-GB",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Header />

      <main className="flex-1 pb-20">
        <div
          className="pt-36 pb-14 px-6"
          style={{
            background: "linear-gradient(135deg, #0F0A32 0%, #431E90 50%, #BC95FB 100%)",
          }}
        >
          <div className="mx-auto max-w-3xl">
            {data.section && (
              <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/15 text-white/80">
                {sectionLabel(data.section, raw)}
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
                      raw === "cs" ? "cs-CZ" : "en-GB",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </time>
                )}
              </p>
            )}
          </div>
        </div>

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
              components={createMdxComponents(raw)}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}

function sectionLabel(section: "client" | "provider" | "community", lang: Lang) {
  if (section === "client") {
    return lang === "cs" ? "Pro expaty v Praze" : "For expats in Prague";
  }
  if (section === "community") {
    return lang === "cs" ? "Příběh komunity" : "Community Story";
  }
  return lang === "cs" ? "Pro poskytovatele" : "For providers";
}
