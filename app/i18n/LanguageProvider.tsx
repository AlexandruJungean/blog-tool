"use client";

import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Lang } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "cs",
  setLang: () => {},
});

const LANGUAGE_COOKIE_KEY = "tool-connect-blog-language";
const languageListeners = new Set<() => void>();

function readCookie(name: string): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}

function writeCookie(name: string, value: string) {
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${oneYear}; SameSite=Lax`;
}

function getStoredLanguage(): Lang {
  const savedLanguage = readCookie(LANGUAGE_COOKIE_KEY);
  return savedLanguage === "en" || savedLanguage === "cs" ? savedLanguage : "cs";
}

function subscribeToLanguage(onStoreChange: () => void) {
  languageListeners.add(onStoreChange);
  return () => {
    languageListeners.delete(onStoreChange);
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(
    subscribeToLanguage,
    getStoredLanguage,
    (): Lang => "cs"
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((newLang: Lang) => {
    writeCookie(LANGUAGE_COOKIE_KEY, newLang);
    languageListeners.forEach((listener) => listener());
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
