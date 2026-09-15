import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeClient from "../HomeClient";
import { translations, t } from "../i18n/translations";
import {
  absoluteUrl,
  hreflangLanguages,
  isLang,
  locales,
  ogLocale,
} from "../lib/i18n";
import { getFeedSections } from "../lib/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) return {};

  const title = t(translations.hero.blogTitle, raw);
  const description = t(translations.hero.description, raw);

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: absoluteUrl(raw),
      languages: hreflangLanguages(locales),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(raw),
      locale: ogLocale(raw),
      type: "website",
      images: [
        {
          url: "/og-image.webp",
          width: 1200,
          height: 630,
          alt: "Tool Connect Blog",
        },
      ],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const { client, provider, community } = getFeedSections(lang);

  return (
    <HomeClient
      lang={lang}
      clientPosts={client}
      providerPosts={provider}
      communityPosts={community}
    />
  );
}
