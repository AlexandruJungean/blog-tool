"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { LANGUAGE_COOKIE, type Lang } from "../lib/i18n";

interface LanguageContextValue {
  lang: Lang;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "cs",
});

function writeCookie(name: string, value: string) {
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${oneYear}; SameSite=Lax`;
}

export function persistLanguageCookie(lang: Lang) {
  writeCookie(LANGUAGE_COOKIE, lang);
}

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  return (
    <LanguageContext.Provider value={{ lang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
