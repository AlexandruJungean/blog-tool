"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useLanguage } from "./i18n/LanguageProvider";
import { translations, t } from "./i18n/translations";

type LocalizedText = { readonly en: string; readonly cs: string };
type FeedSourcePost = {
  href: string;
  img: string;
  alt: string;
  title: LocalizedText;
  date: LocalizedText;
};

const expatFeed: FeedSourcePost[] = [
  { href: "/what-services-cost-prague-2026", img: "/what-services-cost-prague-2026.webp", alt: "Prague city", title: translations.posts.costTitle, date: { en: "Jun 15, 2026", cs: "15. 6. 2026" } },
  { href: "/find-reliable-handyman-prague-2026", img: "/find-reliable-handyman-prague-2026.webp", alt: "Handyman in Prague", title: translations.posts.handymanTitle, date: { en: "Jun 19, 2026", cs: "19. 6. 2026" } },
  { href: "/diy-youtube-fix-prague-2026", img: "/diy-youtube-fix-prague-2026.webp", alt: "Person fixing apartment in Prague", title: translations.posts.diyYoutubeTitle, date: { en: "Jun 27, 2026", cs: "27. 6. 2026" } },
  { href: "/hot-water-outages-prague-2026", img: "/hot-water-outages-prague-2026.webp", alt: "Bathroom shower during a Prague hot water outage", title: translations.posts.hotWaterTitle, date: { en: "Jul 6, 2026", cs: "6. 7. 2026" } },
  { href: "/apartment-maintenance-landlord-vs-yours-2026", img: "/apartment-maintenance-landlord-vs-yours-2026.webp", alt: "Apartment repair in a Prague flat", title: translations.posts.apartmentMaintenanceTitle, date: { en: "Jul 13, 2026", cs: "13. 7. 2026" } },
  { href: "/first-30-days-prague-flat-checklist-2026", img: "/first-30-days-prague-flat-checklist-2026.webp", alt: "Moving boxes and keys in a new Prague apartment", title: translations.posts.firstMonthTitle, date: { en: "Jul 21, 2026", cs: "21. 7. 2026" } },
  { href: "/how-to-find-a-tutor-czech-republic-2026", img: "/how-to-find-a-tutor-czech-republic-2026.webp", alt: "Tutor and student studying together", title: translations.posts.tutorTitle, date: { en: "Jul 27, 2026", cs: "27. 7. 2026" } },
  { href: "/security-deposits-prague-move-out-2026", img: "/security-deposits-prague-move-out-2026.webp", alt: "Hands exchanging keys during a home handover", title: translations.posts.depositTitle, date: { en: "Aug 2, 2026", cs: "2. 8. 2026" } },
  { href: "/emergency-repairs-prague-11pm-2026", img: "/emergency-repairs-prague-11pm-2026.webp", alt: "Electrician working safely on a circuit breaker panel", title: translations.posts.emergencyTitle, date: { en: "Aug 6, 2026", cs: "6. 8. 2026" } },
  { href: "/how-to-read-czech-repair-quote-2026", img: "/how-to-read-czech-repair-quote-2026.webp", alt: "Hand holding a company invoice on a clipboard with a pen", title: translations.posts.quoteReadTitle, date: { en: "Aug 13, 2026", cs: "13. 8. 2026" } },
];

const providerFeed: FeedSourcePost[] = [
  { href: "/jak-ziskat-vic-zakazek-remeslnik-2026", img: "/jak-ziskat-vic-zakazek-remeslnik-2026.webp", alt: "Craftsman at work", title: translations.posts.craftsmanTitle, date: { en: "Jun 15, 2026", cs: "15. 6. 2026" } },
  { href: "/jak-stanovit-ceny-remeslnik-2026", img: "/jak-stanovit-ceny-remeslnik-2026.webp", alt: "Tradesperson pricing work", title: translations.posts.pricingTitle, date: { en: "Jun 19, 2026", cs: "19. 6. 2026" } },
  { href: "/zakaznici-z-rad-expatu-v-cesku", img: "/zakaznici-z-rad-expatu-v-cesku.webp", alt: "Tradesperson communicating with expat client", title: translations.posts.expatCustomersTitle, date: { en: "Jul 6, 2026", cs: "6. 7. 2026" } },
  { href: "/sezonni-poptavka-tepla-voda-topeni-2026", img: "/sezonni-poptavka-tepla-voda-topeni-2026.webp", alt: "Technician servicing a boiler", title: translations.posts.seasonalTitle, date: { en: "Jul 6, 2026", cs: "6. 7. 2026" } },
  { href: "/duvera-vic-nez-rychlost-stali-expat-zakaznici-2026", img: "/duvera-vic-nez-rychlost-stali-expat-zakaznici-2026.webp", alt: "Tradesperson shaking hands with a returning customer", title: translations.posts.trustSpeedTitle, date: { en: "Jul 13, 2026", cs: "13. 7. 2026" } },
  { href: "/licence-certifikace-duvera-expatu-2026", img: "/licence-certifikace-duvera-expatu-2026.webp", alt: "Inspector reviewing certification documents", title: translations.posts.licenseTitle, date: { en: "Jul 21, 2026", cs: "21. 7. 2026" } },
  { href: "/kdy-rozsirit-zivnost-pomocnik-2026", img: "/kdy-rozsirit-zivnost-pomocnik-2026.webp", alt: "Two tradespeople discussing a work plan on site", title: translations.posts.growBusinessTitle, date: { en: "Jul 27, 2026", cs: "27. 7. 2026" } },
  { href: "/pausalni-dan-nebo-skutecne-vydaje-osvc-2026", img: "/pausalni-dan-nebo-skutecne-vydaje-osvc-2026.webp", alt: "Self-employed tradesperson calculating figures over tax documents", title: translations.posts.flatTaxTitle, date: { en: "Aug 2, 2026", cs: "2. 8. 2026" } },
  { href: "/pohotovostni-zakazky-prirazky-2026", img: "/pohotovostni-zakazky-prirazky-2026.webp", alt: "Tradesperson with tools by a van in the evening", title: translations.posts.surchargeTitle, date: { en: "Aug 6, 2026", cs: "6. 8. 2026" } },
  { href: "/jak-napsat-cenovou-nabidku-2026", img: "/jak-napsat-cenovou-nabidku-2026.webp", alt: "Person using a stylus on a tablet to write a quote", title: translations.posts.quoteWriteTitle, date: { en: "Aug 13, 2026", cs: "13. 8. 2026" } },
];

// Never feature a client's photo or story as a homepage hero; it belongs here as
// one ordinary feed card among others, exactly like the two columns above.
const communityFeed: FeedSourcePost[] = [
  { href: "/about-trust-stranger-prague-story", img: "/about-trust-stranger-prague-story.webp", alt: "A quiet street in Prague on a Saturday morning", title: translations.posts.aboutTrustTitle, date: { en: "Jul 15, 2026", cs: "15. 7. 2026" } },
];

function FeedColumn({
  title,
  description,
  posts,
}: {
  title: string;
  description: string;
  posts: { href: string; img: string; alt: string; title: string; date: string }[];
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-primary-900 tracking-tight">{title}</h2>
      <p className="text-xs text-gray-500 mt-1 mb-5">{description}</p>

      <div className="flex flex-col">
        {posts.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            className="group flex gap-3 py-3.5 border-b border-gray-100 last:border-0"
          >
            <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
              <Image
                src={post.img}
                alt={post.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors leading-snug line-clamp-2">
                {post.title}
              </h3>
              <span className="text-xs text-gray-400 mt-1 block">{post.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function BlogPage() {
  const { lang } = useLanguage();
  const localizeFeed = (posts: FeedSourcePost[]) =>
    posts.map((post) => ({
      ...post,
      title: t(post.title, lang),
      date: t(post.date, lang),
    }));

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

          <div className="relative mx-auto max-w-7xl px-6 pt-6 pb-10 lg:px-8 lg:pt-8 lg:pb-14">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                <span className="text-xs font-medium text-white/90 tracking-wide uppercase">
                  {t(translations.hero.badge, lang)}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[1.15]">
                {t(translations.hero.titlePre, lang)}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-400">
                  {t(translations.hero.titleHighlight, lang)}
                </span>{" "}
                {t(translations.hero.titlePost, lang)}
              </h1>

              <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed max-w-xl">
                {t(translations.hero.description, lang)}
              </p>

              {/* Search bar */}
              <div className="mt-5 relative max-w-md">
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
                  className="w-full pl-12 pr-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 transition-all"
                  id="hero-search"
                />
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* ═══════════ THREE-COLUMN BLOG FEED ═══════════ */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-0 lg:divide-x lg:divide-gray-100">
            {/* Column: For Expats */}
            <div className="lg:pr-8">
              <FeedColumn
                title={t(translations.categories.expats, lang)}
                description={t(translations.categories.expatsDesc, lang)}
                posts={localizeFeed(expatFeed)}
              />
            </div>

            {/* Column: For Service Providers */}
            <div className="lg:px-8">
              <FeedColumn
                title={t(translations.categories.providers, lang)}
                description={t(translations.categories.providersDesc, lang)}
                posts={localizeFeed(providerFeed)}
              />
            </div>

            {/* Column: Community Stories — real submitted stories, kept as ordinary
                feed cards. Never feature a client's photo or story as a homepage
                hero element; falls back to an empty state until the first story
                exists. */}
            <div className="lg:pl-8">
              {communityFeed.length > 0 ? (
                <FeedColumn
                  title={t(translations.categories.community, lang)}
                  description={t(translations.categories.communityDesc, lang)}
                  posts={localizeFeed(communityFeed)}
                />
              ) : (
                <>
                  <h2 className="text-lg font-bold text-primary-900 tracking-tight">
                    {t(translations.categories.community, lang)}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1 mb-5">
                    {t(translations.categories.communityDesc, lang)}
                  </p>

                  <div className="flex flex-col items-center justify-center text-center py-10 px-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50/50">
                    <div className="w-11 h-11 rounded-full bg-primary-50 flex items-center justify-center mb-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary-400"
                      >
                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                      {t(translations.communityEmpty.title, lang)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed max-w-[220px]">
                      {t(translations.communityEmpty.description, lang)}
                    </p>
                  </div>
                </>
              )}
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
