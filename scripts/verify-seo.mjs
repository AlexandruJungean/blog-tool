import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = "https://blog.tool-connect.com";
const origin = process.env.SEO_ORIGIN ?? "http://localhost:3100";
const locales = ["cs", "en"];
const cookieName = "tool-connect-blog-language";
const posts = locales.flatMap((lang) => {
  const directory = path.join(root, "content", "posts", lang);
  return fs.readdirSync(directory).filter((file) => file.endsWith(".mdx")).map((file) => {
    const slug = file.slice(0, -4);
    const { data } = matter(fs.readFileSync(path.join(directory, file), "utf8"));
    return { lang, slug, data, pathname: `/${lang}/${slug}` };
  });
});

if (process.argv.includes("--list-urls")) {
  console.log(posts.map((post) => site + post.pathname).join("\n"));
  process.exit(0);
}

const pages = new Set([...locales.map((lang) => `/${lang}`), ...posts.map((post) => post.pathname)]);
const failures = [];
let passed = 0;

function decode(value) {
  return value.replace(/&#(x[\da-f]+|\d+);|&(amp|lt|gt|quot|apos);/gi, (_, numeric, named) => {
    if (numeric) return String.fromCodePoint(numeric[0].toLowerCase() === "x"
      ? parseInt(numeric.slice(1), 16) : Number(numeric));
    return { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" }[named.toLowerCase()];
  });
}

function text(html) {
  return decode(html.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(([tag]) =>
    Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)]
      .map(([, key, value]) => [key.toLowerCase(), decode(value)])));
}

function single(items, label) {
  assert.equal(items.length, 1, `Expected one ${label}, found ${items.length}`);
  return items[0];
}

function alternates(slug) {
  const available = slug ? locales.filter((lang) => pages.has(`/${lang}/${slug}`)) : locales;
  const result = Object.fromEntries(available.map((lang) => [lang, `${site}/${lang}${slug ? `/${slug}` : ""}`]));
  result["x-default"] = result.cs ?? result.en;
  return result;
}

function checkAlternates(links, expected) {
  assert.equal(links.length, Object.keys(expected).length, "Unexpected hreflang count");
  assert.deepEqual(Object.fromEntries(links.map((link) => [link.hreflang, link.href])), expected,
    "Missing or incorrect reciprocal hreflang URLs");
}

async function request(pathname, cookie) {
  return fetch(new URL(pathname, origin), {
    redirect: "manual",
    headers: cookie ? { cookie: `${cookieName}=${cookie}` } : {},
    signal: AbortSignal.timeout(15000),
  });
}

async function check(label, action) {
  try {
    await action();
    passed++;
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
  }
}

function checkPage(html, pathname, lang, slug) {
  // Inspect the server-rendered HTML, without executing JavaScript or counting RSC payloads.
  const rendered = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  assert.equal(single(tags(rendered, "html"), "html element").lang, lang);
  single(tags(rendered, "body"), "body element");
  const head = single([...rendered.matchAll(/<head\b[^>]*>([\s\S]*?)<\/head>/gi)], "head")[1];
  const h1 = single([...rendered.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)], "H1")[1];
  const title = text(single([...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)], "title")[1]);
  const metas = tags(head, "meta");
  const meta = (name) => single(metas.filter((tag) => tag.name === name || tag.property === name), name).content;
  const description = meta("description");
  assert.ok(description?.trim(), "Missing meta description");
  assert.ok(!metas.some((tag) => /^(robots|googlebot)$/.test(tag.name ?? "") && /noindex|none/.test(tag.content)), "Page is noindex");
  const links = tags(head, "link");
  assert.equal(single(links.filter((link) => link.rel === "canonical"), "canonical").href, site + pathname);
  checkAlternates(links.filter((link) => link.rel === "alternate" && link.hreflang), alternates(slug));
  assert.equal(meta("og:url"), site + pathname);
  assert.equal(meta("og:locale"), lang === "cs" ? "cs_CZ" : "en_GB");
  assert.equal(meta("og:description"), description);
  assert.equal(meta("twitter:description"), description);

  for (const link of tags(rendered, "a")) {
    if (!link.href) continue;
    const url = new URL(link.href, site + pathname);
    if (url.origin !== site || /\.[a-z0-9]+$/i.test(url.pathname)) continue;
    assert.ok(pages.has(url.pathname), `Broken or unprefixed internal link: ${link.href}`);
    if (!link.hreflang) assert.ok(url.pathname === `/${lang}` || url.pathname.startsWith(`/${lang}/`), `Internal link changes language: ${link.href}`);
  }
  return { rendered, title, h1: text(h1), description, meta };
}

for (const post of posts) {
  await check(post.pathname, async () => {
    assert.equal(post.data.lang, post.lang, "Frontmatter language differs from its directory");
    assert.ok(post.data.title?.trim() && post.data.description?.trim(), "Localized title and description are required");
    const response = await request(post.pathname);
    assert.equal(response.status, 200);
    assert.ok(!/noindex|none/.test(response.headers.get("x-robots-tag") ?? ""));
    const html = await response.text();
    const page = checkPage(html, post.pathname, post.lang, post.slug);
    assert.equal(page.title, `${post.data.title} | Tool Connect Blog`);
    assert.equal(page.h1, post.data.title);
    assert.equal(page.description, post.data.description);
    assert.equal(page.meta("og:title"), post.data.title);
    assert.equal(page.meta("twitter:title"), post.data.title);
    const other = posts.find((candidate) => candidate.slug === post.slug && candidate.lang !== post.lang);
    if (other && other.data.title !== post.data.title) {
      assert.ok(!text(page.rendered).includes(other.data.title), "Other language's article is also rendered");
    }
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([, json]) => JSON.parse(json));
    const article = single(schemas.filter((schema) => schema["@type"] === "Article"), "Article schema");
    assert.equal(article.headline, post.data.title);
    assert.equal(article.description, post.data.description);
    assert.equal(article.inLanguage, post.lang === "cs" ? "cs-CZ" : "en-GB");
    assert.equal(article.url, site + post.pathname);
    assert.equal(article.mainEntityOfPage["@id"], site + post.pathname);
    for (const schema of schemas) assert.equal(schema.inLanguage, article.inLanguage);
    const oppositeCookie = await request(post.pathname, post.lang === "cs" ? "en" : "cs");
    assert.equal(oppositeCookie.status, 200, "Language cookie redirects a localized URL");
    assert.equal(await oppositeCookie.text(), html, "Language cookie changes a localized page");
  });
}

for (const lang of locales) {
  await check(`/${lang} homepage`, async () => {
    const response = await request(`/${lang}`);
    assert.equal(response.status, 200);
    const page = checkPage(await response.text(), `/${lang}`, lang);
    assert.equal(page.title, page.h1);
    const hrefs = tags(page.rendered, "a").map((tag) => tag.href);
    for (const post of posts.filter((post) => post.lang === lang)) {
      assert.ok(hrefs.includes(post.pathname), `Article missing from homepage: ${post.pathname}`);
    }
  });
}

await check("sitemap.xml", async () => {
  const response = await request("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  assert.ok(xml.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"'));
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, entry]) => entry);
  assert.equal(entries.length, pages.size, "Sitemap must contain every localized page exactly once");
  const urls = entries.map((entry) => decode(entry.match(/<loc>(.*?)<\/loc>/)?.[1] ?? ""));
  assert.deepEqual(urls.toSorted(), [...pages].map((pathname) => site + pathname).toSorted());
  for (let index = 0; index < entries.length; index++) {
    const slug = new URL(urls[index]).pathname.split("/")[2];
    checkAlternates(tags(entries[index], "xhtml:link"), alternates(slug));
  }
});

await check("robots.txt", async () => {
  const response = await request("/robots.txt");
  assert.equal(response.status, 200);
  const robots = await response.text();
  assert.ok(robots.includes(`Sitemap: ${site}/sitemap.xml`));
  assert.ok(!/^Disallow:\s*\/\s*$/m.test(robots));
});

for (const slug of new Set(posts.map((post) => post.slug))) {
  await check(`Legacy redirect /${slug}`, async () => {
    const expected = alternates(slug)["x-default"];
    for (const cookie of [undefined, "en", "cs"]) {
      const response = await request(`/${slug}?utm_source=seo-audit`, cookie);
      assert.equal(response.status, 308);
      const destination = new URL(response.headers.get("location"), origin);
      assert.equal(destination.pathname, new URL(expected).pathname, "Permanent redirect changes with cookie");
      assert.equal(destination.search, "?utm_source=seo-audit");
    }
  });
}

await check("Homepage language preference", async () => {
  for (const cookie of [undefined, "en", "cs", "invalid"]) {
    const response = await request("/?utm_source=seo-audit", cookie);
    assert.equal(response.status, 307, "Preference redirect must be temporary");
    const destination = new URL(response.headers.get("location"), origin);
    assert.equal(destination.pathname, cookie === "en" ? "/en" : "/cs");
    assert.equal(destination.search, "?utm_source=seo-audit");
    assert.ok(response.headers.get("cache-control")?.includes("no-store"));
    assert.ok(response.headers.get("vary")?.toLowerCase().includes("cookie"));
  }
});

for (const pathname of ["/cs/nonexistent-seo-audit", "/en/nonexistent-seo-audit", "/fr", "/fr/nonexistent-seo-audit", "/nonexistent-seo-audit"]) {
  await check(`404 ${pathname}`, async () => {
    const response = await request(pathname);
    assert.equal(response.status, 404, "Unknown URLs must not redirect or return a soft 404");
    const html = await response.text();
    single(tags(html, "html"), "404 html element");
    single(tags(html, "body"), "404 body element");
  });
}

console.log(`SEO audit: ${posts.length} article URLs, ${locales.length} homepages, ${new Set(posts.map((post) => post.slug)).size} legacy URLs.`);
console.log(`${passed} checks passed; ${failures.length} failed.`);
if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
}
