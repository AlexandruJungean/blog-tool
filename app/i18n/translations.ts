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
