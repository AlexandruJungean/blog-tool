import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { LanguageProvider } from "../i18n/LanguageProvider";
import { translations, t } from "../i18n/translations";
import "../globals.css";
import {
  SITE_URL,
  htmlLang,
  isLang,
  locales,
  ogLocale,
  type Lang,
} from "../lib/i18n";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

function layoutCopy(lang: Lang) {
  return {
    title: t(translations.hero.blogTitle, lang),
    description: t(translations.hero.description, lang),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) return {};
  const { title, description } = layoutCopy(raw);

  return {
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: [
        { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/icon-16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    robots: { index: true, follow: true },
    title: {
      default: title,
      template: "%s | Tool Connect Blog",
    },
    description,
    openGraph: {
      title,
      description,
      siteName: "Tool Connect Blog",
      images: [
        {
          url: "/og-image.webp",
          width: 1200,
          height: 630,
          alt: "Tool Connect Blog",
        },
      ],
      locale: ogLocale(raw),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.webp"],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={htmlLang(lang)} className={`${inter.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col font-sans">
        <LanguageProvider lang={lang}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
