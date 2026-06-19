export type Lang = "en" | "cs";

export const translations = {
  // ── Header Nav ──
  nav: {
    home: { en: "Home", cs: "Domů" },
    offerService: { en: "Offer a Service", cs: "Nabídnout službu" },
    needService: { en: "Need a Service", cs: "Potřebuji službu" },
    howItWorks: { en: "How It Works", cs: "Jak to funguje" },
    about: { en: "About Us", cs: "O nás" },
    faq: { en: "FAQ", cs: "FAQ" },
    contact: { en: "Contact", cs: "Kontakt" },
    blog: { en: "Blog", cs: "Blog" },
  },

  // ── Hero ──
  hero: {
    badge: { en: "Tool Connect Blog", cs: "Tool Connect Blog" },
    titlePre: { en: "Your Guide to", cs: "Váš průvodce" },
    titleHighlight: { en: "Expat Life", cs: "životem expata" },
    titlePost: { en: "in Czech Republic", cs: "v České republice" },
    description: {
      en: "Practical tips, honest guides, and local insights to help you navigate life in Prague and beyond — from finding trusted service providers to settling into your new home.",
      cs: "Praktické tipy, upřímné průvodce a místní rady, které vám pomohou zorientovat se v životě v Praze i jinde — od hledání ověřených poskytovatelů služeb po zabydlení se v novém domově.",
    },
    searchPlaceholder: { en: "Search articles...", cs: "Hledat články..." },
  },

  // ── Empty State ──
  empty: {
    title: { en: "Articles Coming Soon", cs: "Články již brzy" },
    description: {
      en: "We're working on practical guides and tips for expats in the Czech Republic. Check back soon!",
      cs: "Pracujeme na praktických průvodcích a tipech pro expaty v České republice. Brzy se vraťte!",
    },
  },

  // ── Categories & Posts ──
  categories: {
    providers: { en: "For Providers", cs: "Pro poskytovatele" },
    expats: { en: "For Expats in Prague", cs: "Pro expaty v Praze" },
  },
  posts: {
    craftsmanTitle: { en: "How to Get More Jobs as a Craftsman in Czechia (2026)", cs: "Jak získat víc zakázek jako řemeslník v Česku (2026)" },
    craftsmanDesc: { en: "Concrete steps for tradesmen and craftsmen looking to fill their availability: online profile, reviews, response speed...", cs: "Konkrétní kroky pro živnostníky a řemeslníky, kteří chtějí zaplnit volné kapacity: online profil, recenze, rychlost reakce..." },
    costTitle: { en: "What Services Actually Cost in Prague: A 2026 Price Guide", cs: "Kolik skutečně stojí služby v Praze: Průvodce cenami pro rok 2026" },
    costDesc: { en: "Realistic 2026 price ranges for handymen, plumbers, electricians, cleaners, tutors, translators and movers in Prague...", cs: "Reálné cenové rozpětí pro rok 2026 pro řemeslníky, instalatéry, elektrikáře, úklid, lektory, překladatele a stěhováky v Praze..." },
    readMore: { en: "Read Article", cs: "Číst článek" },
    pricingTitle: { en: "How to Price Your Services Without Underselling Yourself (2026)", cs: "Jak stanovit ceny, aniž byste podceňovali svou práci (2026)" },
    pricingDesc: { en: "Step-by-step pricing framework for tradespeople: calculate your minimum rate, raise prices confidently, and handle 'that's too expensive' without losing clients.", cs: "Kalkulační vzorec pro živnostníky: jak zjistit minimální sazbu, kdy zvýšit ceny a jak reagovat na 'je to moc drahé' bez ztráty zákazníků." },
    handymanTitle: { en: "How to Find a Reliable Handyman in Prague (Expat Guide 2026)", cs: "Jak najít spolehlivého řemeslníka v Praze (Průvodce pro cizince 2026)" },
    handymanDesc: { en: "Where to search, how to vet, red flags to avoid, and fair 2026 price ranges for home services in Prague — no Czech language required.", cs: "Kde hledat, jak ověřit, varovné signály a spravedlivé ceny za domácí opravy v Praze 2026 — bez znalosti češtiny." },
  },

  // ── CTA ──
  cta: {
    title: {
      en: "Need a Service Provider in Prague?",
      cs: "Potřebujete poskytovatele služeb v Praze?",
    },
    description: {
      en: "Tool Connect helps you find verified, English-speaking professionals — plumbers, electricians, tutors, and more. All vetted, all reviewed.",
      cs: "Tool Connect vám pomůže najít ověřené profesionály — instalatéry, elektrikáře, lektory a další. Všichni prověření, všichni hodnocení.",
    },
    button: { en: "Visit Tool Connect", cs: "Navštívit Tool Connect" },
  },

  // ── Footer ──
  footer: {
    tagline: {
      en: "Connecting people with professionals in the Czech Republic.",
      cs: "Spojujeme lidi s profesionály v České republice.",
    },
    quickLinks: { en: "Quick Links", cs: "Rychlé odkazy" },
    home: { en: "Home", cs: "Domů" },
    howItWorks: { en: "How It Works", cs: "Jak to funguje" },
    aboutUs: { en: "About Us", cs: "O nás" },
    faqFull: { en: "Frequently Asked Questions", cs: "Časté otázky" },
    serviceProviders: {
      en: "Service Providers Guide",
      cs: "Průvodce pro poskytovatele",
    },
    blog: { en: "Blog", cs: "Blog" },
    support: { en: "Support", cs: "Podpora" },
    contactSupport: { en: "Contact Support", cs: "Kontaktovat podporu" },
    privacy: { en: "Privacy Policy", cs: "Zásady ochrany osobních údajů" },
    terms: { en: "Terms & Conditions", cs: "Podmínky použití" },
    cookies: { en: "Cookie Policy", cs: "Zásady používání cookies" },
    followUs: { en: "Follow Us", cs: "Sledujte nás" },
    copyright: {
      en: "All rights reserved.",
      cs: "Všechna práva vyhrazena.",
    },
  },
} as const;

/** Helper to get a translated value */
export function t(
  obj: { en: string; cs: string },
  lang: Lang
): string {
  return obj[lang];
}
