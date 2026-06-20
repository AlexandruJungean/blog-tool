# blog-tool — The Tool Connect Blog

This repository is for the **Tool Connect blog**, which will be published at **https://blog.tool-connect.com**.

Tool Connect is a Czech professional services marketplace that connects clients with trusted local service providers (repairs, translations, tutoring, etc.). The blog's main purpose is to bring organic traffic (SEO) and help users with useful articles.

> New here? Read this file to the end, then [`brand/BRAND-GUIDE.md`](brand/BRAND-GUIDE.md). It has everything you need to make the blog look consistent with the rest of the product.

---

## What's in this repo

```
blog-tool/
├── README.md              ← you are here
├── app/                   ← Next.js App Router
│   ├── page.tsx           ← blog home (article list)
│   ├── [slug]/            ← individual article page
│   ├── components/        ← Header, Footer
│   ├── i18n/              ← language provider + translations (en / cs)
│   ├── layout.tsx         ← root layout, metadata, fonts
│   └── globals.css        ← global styles (Tailwind)
├── content/posts/         ← article content in MDX
│   ├── en/                ← English articles
│   └── cs/                ← Czech articles
├── public/                ← images, og-image, favicons & app icons
├── briefs/                ← article briefs (planning/SEO)
├── editorial-calendar-Q3-2026.md
└── brand/
    ├── BRAND-GUIDE.md     ← brand guide (colors, font, logo) — read it!
    └── colors.ts          ← the exact brand colors, ready to copy into code
```

---

## What the main website (tool-connect.com) is built with

So you can stay aligned with the rest of the team, here is the stack of the main website:

| Technology | What it does | Version used |
|---|---|---|
| [Next.js](https://nextjs.org/) (App Router) | React framework for fast, SEO-friendly websites | 16 |
| [React](https://react.dev/) | UI library | 19 |
| [TypeScript](https://www.typescriptlang.org/) | JavaScript with types (fewer bugs) | 5 |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-class styling | 3 |
| [Supabase](https://supabase.com/) | Database + authentication | — |
| [lucide-react](https://lucide.dev/) | Icons | — |
| Netlify | Hosting / deployment | — |

The font used everywhere is **Inter**, loaded from Google Fonts (weights 400–700). You may see `system-ui` and `sans-serif` next to it in the code — those are just fallbacks in case Inter fails to load; Inter is the only font actually used.

## How the blog is built

The blog is already set up and stays in the same direction as the main website:

| Technology | What it does | Version |
|---|---|---|
| [Next.js](https://nextjs.org/) (App Router) | React framework, SEO-friendly | 16 |
| [React](https://react.dev/) | UI library | 19 |
| [TypeScript](https://www.typescriptlang.org/) | JavaScript with types | 5 |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-class styling | 4 |
| [MDX](https://mdxjs.com/) via `next-mdx-remote` + `gray-matter` + `remark-gfm` | Article content as plain text files (no database) | — |
| [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography) | Nice default styling for article body | — |
| Netlify | Hosting / deployment | — |

Articles live in `content/posts/en` and `content/posts/cs` as `.mdx` files. Each file has front-matter (title, description, etc.) at the top, then the article body in Markdown. The site is bilingual (en / cs) via the provider in `app/i18n/`.

## First steps (local setup)

1. Install [Node.js](https://nodejs.org/) (LTS version).
2. Clone the repo:

```bash
git clone https://github.com/AlexandruJungean/blog-tool.git
cd blog-tool
```

3. Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

and open `http://localhost:3000`.

### Adding a new article

1. Create a `.mdx` file in `content/posts/en/` (and/or `content/posts/cs/`) — the file name becomes the URL slug (e.g. `find-reliable-handyman-prague-2026.mdx` → `/find-reliable-handyman-prague-2026`).
2. Fill in the front-matter at the top (title, description, date, image).
3. Add an Open Graph image to `public/` and reference it from the front-matter.

## Things to keep in mind

- **Final domain**: `blog.tool-connect.com` — all internal links to the main site should point to `https://tool-connect.com`.
- **SEO matters** — the blog exists primarily for organic traffic: every article needs a `title`, a `description`, a clean URL (e.g. `/how-to-find-a-plumber-in-prague`) and an Open Graph image (you can start from `public/og-image.webp`).
- **Languages**: the main site is in English and Czech (`en` / `cs`). Structure the blog so it can support both languages.
- **Don't invent new colors** — only use the palette from `brand/colors.ts`. Details in the brand guide.

## Questions?

If you get stuck on anything related to the stack or the brand, ask the team — the main website (`web-tool`) and the mobile app (`app-tool`, React Native / Expo) use the same colors and the same font, so there is always a working example you can look at.
