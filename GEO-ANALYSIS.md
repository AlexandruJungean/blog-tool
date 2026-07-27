# GEO Analysis: First 30 Days Checklist + Licenses & Certifications

Scope: two new posts and their infrastructure.
- `content/posts/en/first-30-days-prague-flat-checklist-2026.mdx` (EN only)
- `content/posts/cs/licence-certifikace-duvera-expatu-2026.mdx` + `content/posts/en/licence-certifikace-duvera-expatu-2026.mdx` (CS+EN)

Site: Next.js 16 App Router, fully static via `generateStaticParams` (content read from the filesystem at build time). Verified via `curl` against the running build, not just browser DOM, so this reflects what a non-JS AI crawler actually receives.

## GEO Readiness Score: 77/100

| Category | Weight | Score | Notes |
|---|---|---|---|
| Citability | 25% | 20/25 | Most H2s answer-first with named sources; 2 sections open conversationally instead of stat-first |
| Structural Readability | 20% | 18/20 | Clean H1→H2→H3, 9 of 10 H2s phrased as questions, FAQ + sources tables present |
| Multi-Modal Content | 15% | 14/15 | Real Pexels photos + custom SVG infographics in every post, all confirmed loaded |
| Authority & Brand Signals | 20% | 13/20 | Strong sourcing and freshness (see below), but zero brand presence on Wikipedia/Reddit/YouTube (site-wide, not fixable per-post) |
| Technical Accessibility | 20% | 12/20 | Fully SSR, nothing blocks AI crawlers, but no robots.txt, no sitemap, no JSON-LD anywhere on the site |

## Platform Breakdown

- **Google AI Overviews**: Best-positioned platform. SSR content, question-form H2s, and tables are exactly what AIO extracts. Missing sitemap likely slows initial discovery.
- **ChatGPT / Perplexity**: Both lean heavily on Wikipedia and Reddit citations industry-wide; Tool Connect has neither. Direct crawling (OAI-SearchBot, PerplexityBot) isn't blocked, so long-tail citation is possible, but the brand-presence gap caps upside here regardless of on-page quality.
- **Bing Copilot**: Unverifiable without Bing Webmaster Tools access; no IndexNow signal detected.

## AI Crawler Access Status

**No `robots.txt` exists anywhere on the site.** In the absence of one, every crawler (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, CCBot) is implicitly allowed by default, nothing is blocking access. That's a functional pass, but it's accidental rather than deliberate: there's no explicit "you're welcome here" signal, and no sitemap reference for crawlers to discover new posts efficiently.

## llms.txt Status

Missing (site-wide). Per this skill's own primary-source guidance (Google's Mueller/Illyes statements plus the SE Ranking 300k-domain study), llms.txt currently has **no measured effect** on citation by major AI systems, so this is correctly low priority, not a real gap despite frequent blogosphere claims otherwise.

## Brand Mention Analysis

No presence found or expected on Wikipedia, Reddit, YouTube, or LinkedIn. Tool Connect is an early-stage Prague marketplace; this is a business-maturity limitation, not something either of these two articles can fix on their own. Flagging it here because it's the single largest drag on the Authority score, and no amount of on-page polish closes that gap.

## Passage-Level Citability

Several openers already land in a genuinely citable, self-contained zone:

> "Foreigners must report their place of residence to the Police of the Czech Republic within 3 working days of moving in, unless the landlord or accommodation provider already filed it electronically through the UBYPORT system on the tenant's behalf (Police of the Czech Republic). Missing this deadline is a genuine offence, with a fine of up to 3,000 CZK."

That's ~55 words with a named source and a specific number, close to the 134-167 word ideal once combined with the following paragraph. Two sections don't do this yet (see reformatting suggestions below).

## Server-Side Rendering Check

Confirmed via direct `curl` against the built site (not the browser): SVG infographic text (e.g. "Elektro a plyn") is present verbatim in the raw HTML response. Nothing on these pages depends on client-side JavaScript execution to become visible text. This is the strongest single technical signal both posts have going for them.

## Top 5 Highest-Impact Changes

1. **Add a `robots.txt`** that explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, and PerplexityBot, and points to a sitemap. Currently correct by accident, not by design.
2. **Add `app/sitemap.ts`.** There is no sitemap anywhere on the site; new posts (including both of these) rely purely on crawl discovery.
3. **Add JSON-LD Article schema** (headline, author, datePublished) site-wide. Zero structured data exists anywhere on the blog right now, this is the single biggest gap in the Authority score.
4. **Add FAQPage schema** wrapping the FAQ sections already present in both new posts. The content is already well-formatted for humans; it isn't yet machine-marked as an FAQ.
5. **Trim the EN licence-certifications meta description** from 175 to ~155 characters, and give the "small setup details" (Article 1) and "how do you show this to a customer" (Article 2) sections an answer-first opening sentence with an inline citation, matching the other sections.

## Schema Recommendations

- `Article` (or `BlogPosting`) on every post: `headline`, `author`, `datePublished`, `dateModified`, `image`
- `FAQPage` wrapping each post's existing FAQ section
- `Organization` for Tool Connect at the site level, with `sameAs` once any social profiles exist

## Content Reformatting Suggestions

- **First 30 Days, "How do I transfer utilities into my name?"**: cite the source inline ("... typically takes 10 to 30 days, according to Czech energy suppliers") rather than leaving the attribution only in the closing sources table.
- **First 30 Days, "The small setup details that get missed"**: rephrase as a question ("What small details get missed after move-in?") for heading consistency with the rest of the post.
- **Licenses & Certifications (EN), "How do you actually show all of this to a customer, especially an expat?"**: open with the plain-language reframing sentence before the "customer who doesn't know the Czech trade system" framing, so the answer lands in the first sentence rather than the second.

## What's Already Working Well (don't touch)

- Both new regulatory citations are **current**, not outdated: Government Regulation 194/2022 Sb. (electrical) and 191/2022 and 192/2022 Sb. (gas) correctly replace the repealed 1978/1979 rules that most Czech trade content online still cites. This is a genuine, checkable freshness advantage over competing content.
- Key Takeaways / Shrnutí v krátkosti boxes are present in all three files and are themselves close to ideal self-contained citation length.
- Every SVG infographic and every image has descriptive alt text or an `aria-label`, and all images were verified loaded, not just linked.
