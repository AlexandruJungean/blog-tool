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

const LANGUAGE_STORAGE_KEY = "tool-connect-blog-language";
const languageListeners = new Set<() => void>();

function getStoredLanguage(): Lang {
  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return savedLanguage === "en" || savedLanguage === "cs" ? savedLanguage : "cs";
}

function subscribeToLanguage(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === LANGUAGE_STORAGE_KEY) onStoreChange();
  };

  languageListeners.add(onStoreChange);
  window.addEventListener("storage", onStorage);

  return () => {
    languageListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
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
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
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
