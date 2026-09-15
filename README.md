# blog-tool — The Tool Connect Blog
# Netlify Push nr 6.

This repository is for the **Tool Connect blog**, which will be published at **https://blog.tool-connect.com**.

Tool Connect is a Czech professional services marketplace that connects clients with trusted local service providers (repairs, translations, tutoring, etc.). The blog's main purpose is to bring organic traffic (SEO) and help users with useful articles.

> New here? Read this file to the end, then [`brand/BRAND-GUIDE.md`](brand/BRAND-GUIDE.md). It has everything you need to make the blog look consistent with the rest of the product.

---

## What's in this repo

```
blog-tool/
├── README.md              ← you are here
├── proxy.ts               ← temporary language preference redirect for /
├── next.config.ts         ← permanent redirects from old article URLs
├── app/                   ← Next.js App Router
│   ├── [lang]/            ← /cs and /en homepages + /[lang]/[slug] articles
│   │   └── layout.tsx     ← root HTML layout, language, metadata, fonts
│   ├── components/        ← Header, Footer
│   ├── i18n/              ← language provider + translations (en / cs)
│   └── globals.css        ← global styles (Tailwind)
├── scripts/verify-seo.mjs  ← HTTP audit of all localized pages and redirects
├── content/posts/         ← article content in MDX
│   ├── en/                ← English articles → /en/<slug>
│   └── cs/                ← Czech articles → /cs/<slug>
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

Articles live in `content/posts/en` and `content/posts/cs` as `.mdx` files. Each file has front-matter (title, description, etc.) at the top, then the article body in Markdown.

Each language is a separate URL: Czech at `/cs/<slug>`, English at `/en/<slug>`. The homepages are `/cs` and `/en`. Every old article URL (`/<slug>`) has a stable 308 redirect to its Czech version, or its English version if no Czech translation exists. These redirects are generated from all content files at build time and do not depend on cookies. Unknown URLs return 404.

Only `/` uses the saved language preference (Czech by default), with a temporary, non-cacheable 307 redirect. A locale-prefixed URL always serves that language, regardless of cookies. Each page has one H1, language-matching title/description, a self-referencing canonical tag, and reciprocal `hreflang` links using `cs`, `en`, and a Czech `x-default` when both translations exist.

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

and open `http://localhost:3000` (you will be redirected to `/cs` or `/en`).

### Adding a new article

1. Create a `.mdx` file in `content/posts/en/` and/or `content/posts/cs/` — the file name becomes the slug (e.g. `find-reliable-handyman-prague-2026.mdx` → `/en/find-reliable-handyman-prague-2026` and `/cs/find-reliable-handyman-prague-2026`).
2. Fill in the front-matter at the top (title, description, date, image) in that file's language.
3. Add an Open Graph image to `public/` and reference it from the front-matter.
4. Internal links to other articles can stay unprefixed (`/other-article-slug`); they are localized automatically to the current language.
5. Start the article body with a paragraph or an H2 (`##`). The page already renders the front-matter title as its single H1.

## Checking the language migration

Run the production build and start it on port 3100:

```sh
npm run lint
npm run build
node node_modules/next/dist/bin/next start --port 3100
```

In another terminal, run `npm run test:seo`. The audit reads all existing MDX files, then checks the actual server-rendered HTML, localized titles/descriptions, one H1, canonical URLs, reciprocal hreflang links, structured data, internal links, homepage coverage, the sitemap, robots.txt, cookie behavior, legacy redirects, and 404 responses. It does not require JavaScript in a browser. Set `SEO_ORIGIN` to check another running server; canonical URLs must still use the production domain.

The repository currently contains **25 articles in both languages (50 article URLs)**, even though the original request mentioned 23. The audit discovers files automatically, so all existing articles and future additions are included. The sitemap contains those 50 URLs plus the two language homepages.

## After deployment: indexing

Indexing submission is a separate post-deployment step; building the app does not submit URLs to Google.

1. Run the same audit against production. In PowerShell: `$env:SEO_ORIGIN = 'https://blog.tool-connect.com'`, then `npm run test:seo`. Clear the override afterward with `Remove-Item Env:SEO_ORIGIN`.
2. In the Search Console property covering `https://blog.tool-connect.com`, submit/resubmit `https://blog.tool-connect.com/sitemap.xml`.
3. Export the complete list of localized article URLs with `node scripts/verify-seo.mjs --list-urls > indexing-urls.txt`. Use URL Inspection → Test live URL → Request indexing for each URL in both languages, subject to Google's daily quota. Access as a property owner or full user is required. Record completed requests and resume remaining ones when the quota allows.
4. Monitor indexing and the selected canonical URLs in Search Console. Keep the old article redirects for at least one year, preferably indefinitely.

Google recommends sitemap submission for many URLs and URL Inspection for individual requests; submitting does not guarantee indexing or a particular timeline. See [Google's recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) and [URL migration guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

## Things to keep in mind

- **Final domain**: `blog.tool-connect.com` — all internal links to the main site should point to `https://tool-connect.com`.
- **SEO matters** — the blog exists primarily for organic traffic: every article needs a `title`, a `description`, a language-prefixed URL (e.g. `/en/how-to-find-a-plumber-in-prague` and `/cs/how-to-find-a-plumber-in-prague`) and an Open Graph image (you can start from `public/og-image.webp`).
- **Languages**: Czech and English are separate indexed pages (`/cs/...` and `/en/...`), linked with `hreflang` and canonical tags. Do not put both languages on one URL.
- **Don't invent new colors** — only use the palette from `brand/colors.ts`. Details in the brand guide.

## Questions?

If you get stuck on anything related to the stack or the brand, ask the team — the main website (`web-tool`) and the mobile app (`app-tool`, React Native / Expo) use the same colors and the same font, so there is always a working example you can look at.
