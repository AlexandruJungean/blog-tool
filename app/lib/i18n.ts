import type { Lang } from "../i18n/translations";

export type { Lang };

export const locales = ["en", "cs"] as const;
export const defaultLocale: Lang = "cs";
export const SITE_URL = "https://blog.tool-connect.com";
export const LANGUAGE_COOKIE = "tool-connect-blog-language";

export function isLang(value: string | undefined | null): value is Lang {
  return value === "en" || value === "cs";
}

export function localePath(lang: Lang, slug?: string): string {
  return slug ? `/${lang}/${slug}` : `/${lang}`;
}

export function absoluteUrl(lang: Lang, slug?: string): string {
  return `${SITE_URL}${localePath(lang, slug)}`;
}

export function replaceLocalePath(pathname: string, locale: Lang): string {
  const segments = pathname.split("/");
  if (segments.length >= 2 && isLang(segments[1])) {
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }
  return `/${locale}`;
}

export function localizeInternalHref(
  href: string | undefined,
  lang: Lang
): string | undefined {
  if (!href) return href;
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const [path, suffix] = href.split(/([?#].*)/);
  const rest = suffix ?? "";

  if (path === "/en" || path === "/cs" || path.startsWith("/en/") || path.startsWith("/cs/")) {
    return href;
  }

  // Static files in /public stay unprefixed.
  if (/\.[a-zA-Z0-9]+$/.test(path)) return href;

  return `/${lang}${path}${rest}`;
}

export function hreflangLanguages(
  available: readonly Lang[],
  slug?: string
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const lang of available) {
    languages[lang] = absoluteUrl(lang, slug);
  }
  const xDefault = available.includes("cs") ? "cs" : available[0];
  if (xDefault) {
    languages["x-default"] = absoluteUrl(xDefault, slug);
  }
  return languages;
}

export function ogLocale(lang: Lang): string {
  return lang === "cs" ? "cs_CZ" : "en_GB";
}

export function htmlLang(lang: Lang): string {
  return lang === "cs" ? "cs" : "en";
}
