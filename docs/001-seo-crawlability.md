# 001 - SEO & Crawlability

How vocele-web stays "super crawlable" across both locales, and the non-obvious
rules that keep it that way. Read this before touching `BaseLayout.astro`,
`nginx.conf`, or adding a page.

**Related:** [README](../README.md) (stack + deploy), `src/site-pages.ts`
(the manifest everything below reads from).

## The one rule: `src/site-pages.ts` is the single source of truth

Every route and whether it has a Spanish twin lives in **one** array:

```ts
export const SITE_PAGES: SitePage[] = [
  { slug: '',        translated: true  },  // '' = home
  { slug: 'pricing', translated: true  },
  { slug: 'faq',     translated: true  },
  { slug: 'privacy', translated: false },  // English-only
  { slug: 'terms',   translated: false },
];
```

Two consumers read it, so they can never disagree:

| Consumer | Uses it for |
|---|---|
| `src/layouts/BaseLayout.astro` | `hasTranslation(slug)` → whether to emit hreflang alternates |
| `src/pages/sitemap.xml.ts` | generates `dist/sitemap.xml` at build (no `@astrojs/sitemap` — it crashed on astro@4.16) |

**Single-locale pages** set `locale: 'en' | 'es'` (default `'en'`) on their
`translated: false` entry so the sitemap lists them where they actually live —
Spanish-only blog articles sit under `/es/` and would otherwise be listed at a
404 English path.

**Blog articles** are original per locale (never translations): each is
self-canonical with **no** hreflang twin. They register once in
`src/blog-posts.ts` (title/description/date/locale), which `site-pages.ts`
appends to `SITE_PAGES` automatically — so an article can't be forgotten in the
sitemap. `src/layouts/ArticleLayout.astro` reads the same entry and emits
`BlogPosting` + `BreadcrumbList` (+ `FAQPage`) JSON-LD. The two blog index pages
(`/blog`, `/es/blog`) ARE hreflang twins (slug `blog`, `translated: true`).

`enPath(slug)` / `esPath(slug)` also live here and are reused by `Header.astro`
for the language switcher. Path logic exists in exactly one place.

## What BaseLayout emits, and the gates

`BaseLayout.astro` computes two booleans and gates the head signals on them:

```ts
const indexable  = !noindex;                       // 404 sets noindex
const translated = indexable && hasTranslation(slug);
```

| Signal | Gate | Notes |
|---|---|---|
| `<link rel="canonical">` (self, per-locale) | `indexable` | exactly one per page; 404 gets none |
| `hreflang` en-US / es-MX / x-default | `translated` | English-only pages emit **zero** — never point hreflang at a nonexistent `/es/privacy` |
| `og:locale:alternate` | `translated` | dropped on single-locale pages |
| `robots` meta | always, if/else | `noindex,nofollow` on 404, else `index,follow,max-image-preview:large,max-snippet:-1` — never two robots tags |
| `WebSite` JSON-LD | `slug==='' && indexable` | home pages only (Google site-name); both locales, correct `inLanguage` |
| `og:image` + width/height/alt | always | see coupling hazard below |

Per-page JSON-LD (`Organization`, `SoftwareApplication`, `FAQPage`,
`BreadcrumbList`) is passed in via the `structuredData` prop and merged after the
`WebSite` entry. EN and ES homes carry identical `SoftwareApplication` + `Offer`
tiers; the `Organization` `url` is `https://vocele.app` on **both** (one entity).

## Trailing slashes — the loop hazard (read before editing nginx.conf)

Astro is `trailingSlash: 'never'`; every canonical/hreflang/sitemap URL is the
non-trailing form. `nginx.conf` enforces it so there's one 200 URL per page:

```nginx
absolute_redirect off;                 # emit relative Location (TLS terminates upstream)
location ~ ^(.+)/$ { return 301 $1$is_args$args; }   # /pricing/ -> /pricing (root exempt)
location / { try_files $uri $uri.html $uri/index.html =404; }
```

Unknown URLs return a **real 404** (correct crawler signal); the 404 page itself
(`src/pages/404.astro`) client-redirects humans to the locale home (`/es/...` →
`/es`, else `/`). That lives in the page — not the server — deliberately: every
static host serves the custom 404 page, so the behavior is provider-portable.

**The trap:** the obvious `try_files $uri $uri/ ...` makes nginx auto-301
`/pricing` → `/pricing/` (its "add slash for a directory" behavior), which then
hits the redirect above and bounces back → **infinite loop**. We serve
`$uri/index.html` directly and never probe `$uri/`. Do not re-add `$uri/`.

**And:** `absolute_redirect off` is required — default builds
`Location: http://<host>/...`, downgrading an https crawler to http behind
TLS-terminating Traefik. Keep it off.

Internal links must not trigger the 301 either: `Header.astro` uses `/es` (never
`/es/`) for the ES home, and the switcher is slug-aware (`/pricing` ↔
`/es/pricing`), falling back to the locale home only when no twin exists.

## Coupling hazards (change both sides in the same commit)

- **og-image dimensions.** `og:image:width`/`height` in `BaseLayout` are hardcoded
  `1200`/`675` to match `public/og-image.jpg`. Re-crop the image → update the meta.
  (JPEG at 1200×675 is ~84 KB; the old 1.9 MB PNG was replaced — scrapers flake
  above a few hundred KB. Generation artifacts `og-image.json`/`.webp` were deleted;
  don't recommit them.)
- **iOS design tokens.** `src/styles/global.css` mirrors the app; unrelated to SEO
  but same "update both" discipline (see README).

## Adding a page (runbook)

1. Create `src/pages/<slug>.astro` (and `src/pages/es/<slug>.astro` if translated).
2. **Register it in `src/site-pages.ts`** — `{ slug, translated }`. Skipping this
   means no hreflang and no sitemap entry. (Unknown slugs default `translated: true`
   in `hasTranslation`, so an unlisted translated page still gets hreflang but no
   sitemap row — always list it.)
3. Pass `slug` (and `lang="es"` for ES pages) to `<BaseLayout>`; add per-page
   `structuredData` if warranted.
4. Rebuild and run the verification below.

## Provider migration notes

Hosting may move off the nginx container (Vercel / Cloudflare Pages / GitHub
Pages are candidates). Everything in the HTML (canonicals, hreflang, sitemap,
JSON-LD, the 404-page redirect) is provider-agnostic. Only the **trailing-slash
301** is nginx's job today and must be re-created per provider:

| Provider | Trailing-slash → non-trailing | Notes |
|---|---|---|
| Vercel | `vercel.json`: `{ "cleanUrls": true, "trailingSlash": false }` | best fit; also serves `404.html` automatically |
| Cloudflare Pages | automatic (normalizes to the shorter form for `dir/index.html`) — verify after first deploy | `_redirects` file available if needed |
| GitHub Pages | ⚠ worst fit: redirects `/pricing` → `/pricing/` (directory-style), contradicting every canonical | would need `build.format: 'file'` in astro.config (emit `pricing.html`) and re-verification |
| nginx (current) | `location ~ ^(.+)/$ { return 301 ... }` + `absolute_redirect off` | already shipped + verified |

Whichever provider wins: re-run the crawl script
(`scratchpad/crawl_404.py` pattern) + the trailing-slash curls against the real
deployment before pointing DNS.

> **Resolved: Vercel won (2026-07-11).** The live host/DNS/GSC/analytics setup is
> documented in [002 - Deployment & Analytics](002-deployment.md).

## Verification

```bash
npm run build
# one canonical per page (0 on 404); hreflang only on translated pages
find dist -name '*.html' -exec sh -c 'echo "$(grep -c "rel=\"canonical\"" "$1") $1"' _ {} \;
grep -c hreflang dist/privacy/index.html   # 0
# JSON-LD parses; WebSite only on the two homes
python3 -c "import json,re,glob; [json.loads(m) for f in glob.glob('dist/**/*.html',recursive=True) for m in re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>',open(f).read(),re.S)]; print('ld+json valid')"
# no /es/ trailing-slash internal links leaked into the HTML
grep -rl 'href="/es/"' dist/ && echo FAIL || echo OK
# production nginx behavior (relative 301, no loop, real 404s)
docker run -d --name t -p 8899:80 -v "$PWD/nginx.conf:/etc/nginx/conf.d/default.conf:ro" -v "$PWD/dist:/usr/share/nginx/html:ro" nginx:1.27-alpine
curl -sI http://localhost:8899/pricing/ | grep -i '^location'   # Location: /pricing (relative)
docker rm -f t
```
```

Live on Vercel since 2026-07-11 (see docs/002-deployment.md); `git push origin master`
deploys. Sitemap emits `<lastmod>` per URL (src/site.ts `PAGES_LASTMOD` for
marketing pages, `datePublished`/`dateModified` for articles). Site constants
(App Store URL, Organization/SoftwareApplication/author JSON-LD) live in
`src/site.ts`; `/vs/<slug>` comparison pages register in `src/vs-pages.ts`.
SEO content pipeline config lives in `seo/` (see `/seo` skill).
