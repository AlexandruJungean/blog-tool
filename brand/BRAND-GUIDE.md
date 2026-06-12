# Brand Guide — Tool Connect

Everything you need to make the blog look the same as the main website (tool-connect.com) and the mobile app.

## Brand colors

The brand has **only 3 colors**. The rest of the palette is mathematically derived from them.

| Color | Hex | When to use it |
|---|---|---|
| **Main Purple** | `#7631EE` | Buttons, links, accents — the main action color (CTA) |
| **Dark Purple** | `#0F0A32` | Dark backgrounds (hero, footer), headings on light backgrounds |
| **Light Purple** | `#BC95FB` | Hover states, subtle tinted backgrounds, decorations |

For regular text on a white background use `#1F2937` (dark gray), not pure black.

### Full palette (for Tailwind)

The 10-shade palette is derived from the 3 colors above — it's ready to copy in [`colors.ts`](colors.ts). Add it to Tailwind like this:

```ts
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#F7F1FF',
          100: '#F1E7FE',
          200: '#E3CFFD',
          300: '#CFB1FC',
          400: '#BC95FB', // lightPurple
          500: '#7631EE', // mainPurple — the main brand color
          600: '#5C27BF',
          700: '#431E90',
          800: '#291461',
          900: '#0F0A32', // darkPurple
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

Then in your code use classes like `bg-primary-500`, `text-primary-900`, `hover:bg-primary-600`.

### Simple rules

- Primary button: `primary-500` background, white text, hover `primary-600`.
- Dark sections (hero, footer): `primary-900` background, white text.
- Light backgrounds: white or `primary-50` / `primary-100`.
- Gradient used on the website: `linear-gradient(135deg, #0F0A32 0%, #BC95FB 100%)`.
- **Don't add other colors** (green, blue, etc.) except for standard states (error = red, success = green).

## Font

The website uses **Inter** (from Google Fonts), in weights 400, 500, 600 and 700. It is the only font of the brand — use it for everything: headings, body text, buttons.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

Note: in the font stack `'Inter', system-ui, sans-serif`, the `system-ui` and `sans-serif` parts are **just fallbacks** — they only kick in if Inter fails to load. Don't treat them as brand fonts.

(In Next.js it's even simpler with `next/font/google` — it loads the font automatically, no CSS import needed.)

## Logo and icons

All files are in the [`logo/`](logo/) folder:

| File | What it's for |
|---|---|
| `logo.webp` | The main logo (used on the website, including in SEO data) |
| `logo-header.png` | Header / navbar variant |
| `logo.png` | Generic PNG variant |
| `favicon.ico` | The website favicon |
| `icons/icon-16.png`, `icon-32.png` | PNG favicons for browsers |
| `icons/icon-192.png`, `icon-512.png` | PWA / manifest icons |
| `icons/apple-touch-icon.png` | iOS icon (180×180) |
| `icons/safari-pinned-tab.svg` | Safari pinned tab (tinted with `#7631EE`) |

Don't modify, stretch or recolor the logo.

## Images

In the [`images/`](images/) folder:

- `og-image.webp` — the image shown when sharing on social media (1200×630). You can start from it for the blog's own variant.
- `background.webp` — the subtle background used on the main website.

## Tone and content

- The brand name is always written **Tool Connect** (two words, capitalized).
- Audience: people in the Czech Republic looking for service providers + the providers themselves. Website languages: English and Czech.
- Important (legal/SEO): Tool Connect has **no relation** to DeWalt "Tool Connect" or any other power tool manufacturer — don't use images or references to power tools that could create confusion.
