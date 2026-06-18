"use client";

import { useLanguage } from "../i18n/LanguageProvider";

export default function ClientLanguageWrapper({
  enContent,
  csContent,
}: {
  enContent: React.ReactNode;
  csContent: React.ReactNode;
}) {
  const { lang } = useLanguage();

  return (
    <>
      <div style={{ display: lang === "en" ? "block" : "none" }}>{enContent}</div>
      <div style={{ display: lang === "cs" ? "block" : "none" }}>{csContent}</div>
    </>
  );
}
