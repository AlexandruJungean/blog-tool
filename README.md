# blog-tool — Blogul Tool Connect

Acest repository este pentru **blogul Tool Connect**, care va fi publicat pe **https://blog.tool-connect.com**.

Tool Connect este un marketplace de servicii profesionale din Cehia care leagă clienții de prestatori locali de încredere (reparații, traduceri, meditații etc.). Blogul are rolul de a aduce trafic organic (SEO) și de a ajuta utilizatorii cu articole utile.

> Ești nou aici? Citește acest fișier până la capăt, apoi [`brand/BRAND-GUIDE.md`](brand/BRAND-GUIDE.md). Ai acolo tot ce trebuie ca blogul să arate "în familie" cu restul produsului.

---

## Ce găsești în acest repo

```
blog-tool/
├── README.md              ← ești aici
└── brand/
    ├── BRAND-GUIDE.md     ← ghidul de brand (culori, font, logo) — citește-l!
    ├── colors.ts          ← culorile exacte, gata de copiat în cod
    ├── logo/              ← logo-uri, favicon, iconițe (16/32/192/512 px)
    └── images/            ← og-image (pentru share pe social media) + background
```

---

## Cu ce este construit website-ul principal (tool-connect.com)

Ca să fii în aceeași direcție cu restul echipei, e bine să știi stack-ul site-ului principal:

| Tehnologie | Ce face | Versiune folosită |
|---|---|---|
| [Next.js](https://nextjs.org/) (App Router) | Framework React pentru site-uri rapide și SEO bun | 16 |
| [React](https://react.dev/) | Biblioteca UI | 19 |
| [TypeScript](https://www.typescriptlang.org/) | JavaScript cu tipuri (mai puține bug-uri) | 5 |
| [Tailwind CSS](https://tailwindcss.com/) | Stilizare cu clase utilitare | 3 |
| [Supabase](https://supabase.com/) | Bază de date + autentificare | — |
| [lucide-react](https://lucide.dev/) | Iconițe | — |
| Netlify | Hosting / deploy | — |

Fontul folosit peste tot este **Inter** (de pe Google Fonts).

## Recomandare de stack pentru blog

Cea mai simplă variantă care rămâne în aceeași direcție cu site-ul principal:

- **Next.js + TypeScript + Tailwind CSS** — exact ca site-ul principal, deci colegii te pot ajuta ușor dacă te blochezi.
- Conținutul articolelor în **Markdown / MDX** (fișiere text simple, fără bază de date). Pentru un blog e mai mult decât suficient și nu ai nevoie de Supabase.

Pornești un proiect nou cu:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app
```

Apoi copiezi paleta de culori din `brand/colors.ts` și config-ul Tailwind din `brand/BRAND-GUIDE.md`.

## Primii pași (setup local)

1. Instalează [Node.js](https://nodejs.org/) (versiunea LTS).
2. Clonează repo-ul:

```bash
git clone https://github.com/AlexandruJungean/blog-tool.git
cd blog-tool
```

3. După ce există proiectul Next.js, rulezi:

```bash
npm install
npm run dev
```

și deschizi `http://localhost:3000`.

## De ținut minte

- **Domeniul final**: `blog.tool-connect.com` — toate link-urile interne către site-ul principal merg spre `https://tool-connect.com`.
- **SEO contează** — blogul există în primul rând pentru trafic organic: fiecare articol are nevoie de `title`, `description`, URL curat (ex. `/cum-gasesti-un-instalator-in-praga`) și imagine Open Graph (poți porni de la `brand/images/og-image.webp`).
- **Limbi**: site-ul principal e în engleză și cehă (`en` / `cs`). Gândește structura blogului ca să poată suporta ambele limbi.
- **Nu inventa culori noi** — folosește doar paleta din `brand/colors.ts`. Detalii în ghidul de brand.

## Întrebări?

Dacă te blochezi pe ceva legat de stack sau de brand, întreabă echipa — site-ul principal (`web-tool`) și aplicația mobilă (`app-tool`, React Native / Expo) folosesc aceleași culori și același font, deci există mereu un exemplu funcțional la care te poți uita.
