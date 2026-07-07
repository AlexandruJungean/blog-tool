"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useLanguage } from "./i18n/LanguageProvider";
import { translations, t } from "./i18n/translations";

export default function BlogPage() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = t(translations.hero.blogTitle, lang);
  }, [lang]);

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* ═══════════ HERO ═══════════ */}
        <section
          className="relative overflow-hidden pt-20 md:pt-24"
          style={{
            background: "linear-gradient(135deg, #0F0A32 0%, #431E90 50%, #BC95FB 100%)",
          }}
        >
          {/* Decorative blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-400/10 blur-3xl" />
            <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                <span className="text-xs font-medium text-white/90 tracking-wide uppercase">
                  {t(translations.hero.badge, lang)}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                {t(translations.hero.titlePre, lang)}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-400">
                  {t(translations.hero.titleHighlight, lang)}
                </span>{" "}
                {t(translations.hero.titlePost, lang)}
              </h1>

              <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl">
                {t(translations.hero.description, lang)}
              </p>

              {/* Search bar */}
              <div className="mt-8 relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/40"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder={t(translations.hero.searchPlaceholder, lang)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 transition-all"
                  id="hero-search"
                />
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* ═══════════ BLOG POSTS ═══════════ */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32 space-y-20">
          
          {/* Category: For Expats in Prague — always shown in English */}
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-2xl font-bold text-primary-900 tracking-tight">
                {translations.categories.expats.en}
              </h2>
              <div className="flex-1 h-px bg-primary-100" />
            </div>
            <p className="text-sm text-gray-500 mb-8">
              {translations.categories.expatsDesc.en}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <Link href="/what-services-cost-prague-2026" className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary-500/10 group-hover:bg-transparent transition-colors z-10" />
                  <Image src="/what-services-cost-prague-2026.webp" alt="Prague city" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-primary-50 text-primary-700 text-xs font-semibold">
                      {translations.categories.expats.en}
                    </span>
                    <span className="text-xs text-gray-400">Jun 15, 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {translations.posts.costTitle.en}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1">
                    {translations.posts.costDesc.en}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium text-sm mt-auto">
                    {translations.posts.readMore.en}
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Card 4 — Handyman guide */}
              <Link href="/find-reliable-handyman-prague-2026" className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary-500/10 group-hover:bg-transparent transition-colors z-10" />
                  <Image src="/find-reliable-handyman-prague-2026.webp" alt="Handyman in Prague" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-primary-50 text-primary-700 text-xs font-semibold">
                      {translations.categories.expats.en}
                    </span>
                    <span className="text-xs text-gray-400">Jun 19, 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {translations.posts.handymanTitle.en}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1">
                    {translations.posts.handymanDesc.en}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium text-sm mt-auto">
                    {translations.posts.readMore.en}
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Card — DIY YouTube fix */}
              <Link href="/diy-youtube-fix-prague-2026" className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary-500/10 group-hover:bg-transparent transition-colors z-10" />
                  <Image src="/diy-youtube-fix-prague-2026.webp" alt="Person fixing apartment in Prague" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-primary-50 text-primary-700 text-xs font-semibold">
                      {translations.categories.expats.en}
                    </span>
                    <span className="text-xs text-gray-400">Jun 27, 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {translations.posts.diyYoutubeTitle.en}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1">
                    {translations.posts.diyYoutubeDesc.en}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium text-sm mt-auto">
                    {translations.posts.readMore.en}
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Card — Hot water outages */}
              <Link href="/hot-water-outages-prague-2026" className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary-500/10 group-hover:bg-transparent transition-colors z-10" />
                  <Image src="/hot-water-outages-prague-2026.webp" alt="Bathroom shower during a Prague hot water outage" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-primary-50 text-primary-700 text-xs font-semibold">
                      {translations.categories.expats.en}
                    </span>
                    <span className="text-xs text-gray-400">Jul 6, 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {translations.posts.hotWaterTitle.en}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1">
                    {translations.posts.hotWaterDesc.en}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium text-sm mt-auto">
                    {translations.posts.readMore.en}
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Category: For Providers — always shown in Czech */}
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-2xl font-bold text-primary-900 tracking-tight">
                {translations.categories.providers.cs}
              </h2>
              <div className="flex-1 h-px bg-primary-100" />
            </div>
            <p className="text-sm text-gray-500 mb-8">
              {translations.categories.providersDesc.cs}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 2 */}
              <Link href="/jak-ziskat-vic-zakazek-remeslnik-2026" className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary-500/10 group-hover:bg-transparent transition-colors z-10" />
                  <Image src="/jak-ziskat-vic-zakazek-remeslnik-2026.webp" alt="Craftsman at work" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-primary-50 text-primary-700 text-xs font-semibold">
                      {translations.categories.providers.cs}
                    </span>
                    <span className="text-xs text-gray-400">15. 6. 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {translations.posts.craftsmanTitle.cs}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1">
                    {translations.posts.craftsmanDesc.cs}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium text-sm mt-auto">
                    {translations.posts.readMore.cs}
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Card 3 — Pricing */}
              <Link href="/jak-stanovit-ceny-remeslnik-2026" className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary-500/10 group-hover:bg-transparent transition-colors z-10" />
                  <Image src="/jak-stanovit-ceny-remeslnik-2026.webp" alt="Tradesperson pricing work" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-primary-50 text-primary-700 text-xs font-semibold">
                      {translations.categories.providers.cs}
                    </span>
                    <span className="text-xs text-gray-400">19. 6. 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {translations.posts.pricingTitle.cs}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1">
                    {translations.posts.pricingDesc.cs}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium text-sm mt-auto">
                    {translations.posts.readMore.cs}
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Card — Expat customers guide */}
              <Link href="/zakaznici-z-rad-expatu-v-cesku" className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary-500/10 group-hover:bg-transparent transition-colors z-10" />
                  <Image src="/zakaznici-z-rad-expatu-v-cesku.webp" alt="Tradesperson communicating with expat client" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-primary-50 text-primary-700 text-xs font-semibold">
                      {translations.categories.providers.cs}
                    </span>
                    <span className="text-xs text-gray-400">6. 7. 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {translations.posts.expatCustomersTitle.cs}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1">
                    {translations.posts.expatCustomersDesc.cs}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium text-sm mt-auto">
                    {translations.posts.readMore.cs}
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Card — Seasonal demand */}
              <Link href="/sezonni-poptavka-tepla-voda-topeni-2026" className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary-500/10 group-hover:bg-transparent transition-colors z-10" />
                  <Image src="/sezonni-poptavka-tepla-voda-topeni-2026.webp" alt="Technik provádí servis kotle" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-primary-50 text-primary-700 text-xs font-semibold">
                      {translations.categories.providers.cs}
                    </span>
                    <span className="text-xs text-gray-400">6. 7. 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {translations.posts.seasonalTitle.cs}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1">
                    {translations.posts.seasonalDesc.cs}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium text-sm mt-auto">
                    {translations.posts.readMore.cs}
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>

        </section>

        {/* ═══════════ TOOL CONNECT CTA ═══════════ */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-50 to-primary-100 p-10 lg:p-14">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-200/50 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-primary-900 tracking-tight">
                  {t(translations.cta.title, lang)}
                </h2>
                <p className="mt-3 text-foreground/60 leading-relaxed max-w-lg">
                  {t(translations.cta.description, lang)}
                </p>
              </div>

              <div className="flex-shrink-0">
                <Link
                  href="https://tool-connect.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25"
                  id="cta-tool-connect"
                >
                  {t(translations.cta.button, lang)}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
