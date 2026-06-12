# Ghid de brand — Tool Connect

Tot ce ai nevoie ca blogul să arate la fel ca site-ul principal (tool-connect.com) și aplicația mobilă.

## Culorile brandului

Brandul are **doar 3 culori**. Tot restul paletei e derivat matematic din ele.

| Culoare | Hex | Când o folosești |
|---|---|---|
| **Main Purple** | `#7631EE` | Butoane, link-uri, accente — culoarea principală de acțiune (CTA) |
| **Dark Purple** | `#0F0A32` | Fundaluri închise (hero, footer), titluri pe fundal deschis |
| **Light Purple** | `#BC95FB` | Hover states, fundaluri colorate subtile, decorațiuni |

Pentru text normal pe fundal alb se folosește `#1F2937` (gri închis), nu negru pur.

### Paleta completă (pentru Tailwind)

Paleta de 10 nuanțe e derivată din cele 3 culori de mai sus — o ai gata de copiat în [`colors.ts`](colors.ts). În Tailwind o adaugi așa:

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
          500: '#7631EE', // mainPurple — culoarea principală
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

Apoi în cod folosești clase ca `bg-primary-500`, `text-primary-900`, `hover:bg-primary-600`.

### Reguli simple

- Buton principal: fundal `primary-500`, text alb, hover `primary-600`.
- Secțiuni închise (hero, footer): fundal `primary-900`, text alb.
- Fundaluri deschise: alb sau `primary-50` / `primary-100`.
- Gradient folosit pe site: `linear-gradient(135deg, #0F0A32 0%, #BC95FB 100%)`.
- **Nu adăuga alte culori** (verde, albastru etc.) decât pentru stări standard (eroare = roșu, succes = verde).

## Font

**Inter**, de pe Google Fonts, în greutățile 400, 500, 600 și 700.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

(În Next.js e și mai simplu cu `next/font/google` — încarcă fontul automat, fără import în CSS.)

## Logo și iconițe

Toate fișierele sunt în folderul [`logo/`](logo/):

| Fișier | La ce folosește |
|---|---|
| `logo.webp` | Logo-ul principal (folosit pe site, inclusiv în datele SEO) |
| `logo-header.png` | Varianta pentru header / navbar |
| `logo.png` | Varianta PNG generică |
| `favicon.ico` | Favicon-ul site-ului |
| `icons/icon-16.png`, `icon-32.png` | Favicon PNG pentru browsere |
| `icons/icon-192.png`, `icon-512.png` | Iconițe PWA / manifest |
| `icons/apple-touch-icon.png` | Iconiță pentru iOS (180×180) |
| `icons/safari-pinned-tab.svg` | Pinned tab Safari (se colorează cu `#7631EE`) |

Nu modifica, nu întinde și nu recolora logo-ul.

## Imagini

În folderul [`images/`](images/):

- `og-image.webp` — imaginea care apare când dai share pe social media (1200×630). Poți porni de la ea pentru varianta de blog.
- `background.webp` — fundalul subtil folosit pe site-ul principal.

## Ton și conținut

- Numele brandului se scrie mereu **Tool Connect** (două cuvinte, cu majuscule).
- Publicul: oameni din Cehia care caută prestatori de servicii + prestatorii înșiși. Limbile site-ului: engleză și cehă.
- Important (juridic/SEO): Tool Connect **nu are nicio legătură** cu DeWalt "Tool Connect" sau alți producători de scule — nu folosi imagini sau referințe la scule electrice care ar putea crea confuzie.
