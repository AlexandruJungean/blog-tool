"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../i18n/LanguageProvider";
import { translations, t } from "../i18n/translations";

const MAIN_SITE = "https://tool-connect.com";

const languages = [
  { code: "en" as const, label: "EN" },
  { code: "cs" as const, label: "CS" },
];

export default function Header() {
  const { lang, setLang } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [langOpen]);

  const nav = translations.nav;
  const navLinks = [
    { label: t(nav.home, lang), href: MAIN_SITE },
    { label: t(nav.offerService, lang), href: MAIN_SITE },
    { label: t(nav.needService, lang), href: MAIN_SITE },
    { label: t(nav.howItWorks, lang), href: `${MAIN_SITE}/#how-it-works` },
    { label: t(nav.about, lang), href: `${MAIN_SITE}/#about` },
    { label: t(nav.faq, lang), href: `${MAIN_SITE}/#faq` },
    { label: t(nav.contact, lang), href: `${MAIN_SITE}/#contact` },
    { label: t(nav.blog, lang), href: "/", isActive: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-primary-900/95 backdrop-blur-md shadow-lg" : "bg-primary-900"
      }`}
    >
      <nav className="px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* ── Logo ── */}
          <Link href={MAIN_SITE} className="flex-shrink-0" id="header-logo">
            <Image
              src="/logo.webp"
              alt="Tool Connect"
              width={240}
              height={64}
              className="h-12 md:h-14 w-auto"
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-1 px-4">
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith("http");
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`text-sm font-medium transition-colors px-3.5 py-2 rounded-full whitespace-nowrap ${
                    "isActive" in link && link.isActive
                      ? "bg-primary-700 text-white shadow-sm hover:bg-primary-800"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                  id={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ── Language Switcher ── */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLangOpen(!langOpen);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors text-white/90 hover:bg-white/10"
                aria-label="Select language"
                id="lang-switcher"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <span>{lang.toUpperCase()}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {langOpen && (
                <div
                  className="absolute right-0 mt-2 w-28 rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden animate-[fadeIn_0.15s_ease-out]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                        lang === l.code
                          ? "bg-primary-50 text-primary-700"
                          : "text-gray-700 hover:bg-primary-50/50"
                      }`}
                      id={`lang-option-${l.code}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary-900/98 backdrop-blur-md border-t border-white/10 px-6 py-4 space-y-1 animate-[slideDown_0.2s_ease-out]">
          {navLinks.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <Link
                key={link.label}
                href={link.href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`block text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                  "isActive" in link && link.isActive
                    ? "bg-primary-700 text-white"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex gap-2 pt-3 mt-2 border-t border-white/10">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setMobileOpen(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  lang === l.code
                    ? "bg-primary-500 text-white"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
