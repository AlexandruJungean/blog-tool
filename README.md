# blog-tool — The Tool Connect Blog

This repository is for the **Tool Connect blog**, which will be published at **https://blog.tool-connect.com**.

Tool Connect is a Czech professional services marketplace that connects clients with trusted local service providers (repairs, translations, tutoring, etc.). The blog's main purpose is to bring organic traffic (SEO) and help users with useful articles.

> New here? Read this file to the end, then [`brand/BRAND-GUIDE.md`](brand/BRAND-GUIDE.md). It has everything you need to make the blog look consistent with the rest of the product.

---

## What's in this repo

```
blog-tool/
├── README.md              ← you are here
└── brand/
    ├── BRAND-GUIDE.md     ← brand guide (colors, font, logo) — read it!
    ├── colors.ts          ← the exact brand colors, ready to copy into code
    ├── logo/              ← logos, favicon, icons (16/32/192/512 px)
    └── images/            ← og-image (for social media sharing) + background
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

## Recommended stack for the blog

The simplest option that stays in the same direction as the main website:

- **Next.js + TypeScript + Tailwind CSS** — exactly like the main site, so the team can easily help you if you get stuck.
- Article content in **Markdown / MDX** (plain text files, no database). For a blog this is more than enough — you don't need Supabase.

Start a new project with:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app
```

Then copy the color palette from `brand/colors.ts` and the Tailwind config snippet from `brand/BRAND-GUIDE.md`.

## First steps (local setup)

1. Install [Node.js](https://nodejs.org/) (LTS version).
2. Clone the repo:

```bash
git clone https://github.com/AlexandruJungean/blog-tool.git
cd blog-tool
```

3. Once the Next.js project exists, run:

```bash
npm install
npm run dev
```

and open `http://localhost:3000`.

## Things to keep in mind

- **Final domain**: `blog.tool-connect.com` — all internal links to the main site should point to `https://tool-connect.com`.
- **SEO matters** — the blog exists primarily for organic traffic: every article needs a `title`, a `description`, a clean URL (e.g. `/how-to-find-a-plumber-in-prague`) and an Open Graph image (you can start from `brand/images/og-image.webp`).
- **Languages**: the main site is in English and Czech (`en` / `cs`). Structure the blog so it can support both languages.
- **Don't invent new colors** — only use the palette from `brand/colors.ts`. Details in the brand guide.

## Questions?

If you get stuck on anything related to the stack or the brand, ask the team — the main website (`web-tool`) and the mobile app (`app-tool`, React Native / Expo) use the same colors and the same font, so there is always a working example you can look at.
