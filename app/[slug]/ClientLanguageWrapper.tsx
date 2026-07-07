"use client";

import { useEffect } from "react";
import { useLanguage } from "../i18n/LanguageProvider";

export default function ClientLanguageWrapper({
  enContent,
  csContent,
}: {
  enContent: React.ReactNode;
  csContent: React.ReactNode;
}) {
  const { lang, setLang } = useLanguage();

  const onlyEn = !!enContent && !csContent;
  const onlyCs = !!csContent && !enContent;

  // A single-language article is its own locale: force the whole page (nav,
  // language switcher, html lang) to the language that actually exists, so an
  // English-only post never shows a Czech header, and vice versa.
  useEffect(() => {
    if (onlyEn && lang !== "en") setLang("en");
    else if (onlyCs && lang !== "cs") setLang("cs");
  }, [onlyEn, onlyCs, lang, setLang]);

  // Show whichever version exists for the current language; fall back to the
  // only available one so the body never renders blank.
  const showEn = !!enContent && (lang === "en" || !csContent);
  const showCs = !!csContent && (lang === "cs" || !enContent);

  return (
    <>
      <div style={{ display: showEn ? "block" : "none" }}>{enContent}</div>
      <div style={{ display: showCs ? "block" : "none" }}>{csContent}</div>
    </>
  );
}
