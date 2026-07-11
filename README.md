# vocele-web

Marketing site for **Vocele** (vocele.app), the AI language-coaching app by overX.ai.
Per-product frontend → lives in `apps/` per the monorepo layout rules.

## What this is

A **statically rendered** multi-page marketing site (landing, pricing, FAQ, legal),
in English + Spanish (es-MX). Every page is fully-rendered HTML at build time.

## Stack — and why it diverges from the other web apps here

The other frontends in `apps/` (`1ak-storefront`, `admin-console-web`) are **Vite +
React SPAs**. This one is **[Astro](https://astro.build) in static output mode**. That
divergence is deliberate and specific to this app's job:

| | SPA (1ak-storefront) | This site (Astro static) |
|---|---|---|
| Render | Client-side JS | Pre-rendered HTML at build |
| Crawler sees | Empty shell until JS runs | Full content, zero JS |
| SEO approach | Needs the `1ak-bff` **Rendertron** prerender layer | None needed — HTML *is* the output |
| Right for | Logged-in app behind auth | Public marketing pages that must rank |

The entire point of this site is SEO and perfect crawler/AI-answer-engine rendering.
A client-rendered SPA is the wrong tool for that (it ships an empty `<div id="root">`
and needs a separate prerender proxy to be indexable). Astro static emits real HTML
per URL, so Google, Bing, GPTBot, PerplexityBot, and ClaudeBot get everything with no
JS execution and no Rendertron. It still **deploys identically** to the SPAs — `npm run
build` → static `dist/` → nginx — so the only real difference is the build tool. Per
the `apps/README.md` instruction to document divergence from the established shape,
that's the divergence: **build tool only, chosen for SEO; deploy model unchanged.**

(There is a separate copy of this site in the iOS app repo at
`ios-claude-hello/website`. Treat **this** one as canonical — the deploy pipeline lives
in this monorepo. The iOS-repo copy can be retired.)

## Design system — "Bold Poster"

The marketing site runs the **"Bold Poster"** display direction: the **Outfit**
display face (uppercase, tight tracking), `2px #1c1c1e` ink rules, full-bleed
color-blocked sections, hard offset shadows (`8px 8px 0 <accent>`, no blur), and
marquee tickers. This is a **deliberate divergence** from the iOS app's rounded /
soft-shadow language — it's a marketing surface, not the product UI. Do **not**
"correct" it back to the app mirror.

What still mirrors the app (keep in sync — same rule as the app's DESIGN.md mirror):
the **color tokens** in `src/styles/global.css` — the six feature gradients (pink
Talk/Luna, periwinkle Lorenzo, cyan Accent, …), plus spacing and radii — are still
1:1 from `AppColors.swift` / `UIConstants.swift`. What's web-only and has **no** app
mirror: the Outfit `--font-display`, `--border-bold`, and the offset-shadow helpers.

- **Outfit is self-hosted** — `public/fonts/outfit-latin.woff2` (variable, latin
  subset), one same-origin request, `@font-face` in `global.css`, preloaded in
  `BaseLayout`. Display type only; body copy stays on the system stack. `ui-rounded`
  remains the fallback, so a missing webfont still renders SF Pro Rounded on Apple
  devices. (This replaces the previous strictly-zero-webfont setup; the perf hit is a
  single preloaded subset, CSS still inlined.)
- **Light-only (v1)** — the Bold Poster comps have no dark variants, so the site
  forces `color-scheme: light`; the old `prefers-color-scheme: dark` token block was
  removed. Re-add dark treatments if/when they're designed.

## Develop

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # -> dist/
npm run preview
```

No backend, no env vars required to run (mock/static content only). `PUBLIC_SITE_URL`
overrides the canonical origin at build time (defaults to `https://vocele.app`).

## Pages

`/`, `/pricing`, `/faq`, `/privacy`, `/terms`, `/404` and the Spanish equivalents at
`/es`, `/es/pricing`, `/es/faq`. English is the default locale (no `/en` prefix);
Spanish is prefixed `/es`. This mirrors the App Store listing strategy (broad en-US,
English-first es-MX) documented in `ios-claude-hello/marketing/001-aso-offer-strategy.md`.

**Blog:** `/blog` + `/es/blog` (index pages, locale twins) and keyword-targeted
articles under `/blog/<slug>` (en) and `/es/blog/<es-slug>` (es-MX). Articles are
**original per locale, never translations** — each is self-canonical with no
hreflang twin. Register new articles in `src/blog-posts.ts` (that alone wires the
sitemap + index pages); content briefs and strategy live in [`blog/`](blog/INDEX.md).

## SEO / AI-indexing (already wired)

**Full reference + gotchas: [docs/001-seo-crawlability.md](docs/001-seo-crawlability.md).**
The one rule: `src/site-pages.ts` is the single source of truth for routes + which
have a Spanish twin — both the `<head>` hreflang and the sitemap read from it, so
they can't drift. Register every new page there.

- Fully static HTML, one `<h1>` per page, semantic landmarks
- Per-page `<title>`, meta description, self-canonical, `hreflang` (en-US / es-MX /
  x-default) — English-only pages (privacy/terms) emit a canonical but **no** hreflang
- `robots` meta: `index,follow,max-image-preview:large,max-snippet:-1` (noindex on 404)
- Open Graph + Twitter cards; `public/og-image.jpg` (1200×675; dims hardcoded in
  `BaseLayout` — keep in sync)
- JSON-LD: `WebSite` (homes), `Organization`, `SoftwareApplication` (with pricing, both
  locales), `FAQPage`, `BreadcrumbList`
- `public/robots.txt` allowlisting AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- `public/llms.txt` structured summary for AI assistants
- `sitemap.xml` **generated at build** by `src/pages/sitemap.xml.ts` from the manifest
  (no `@astrojs/sitemap` — it crashed on astro@4.16; see `astro.config.mjs`)
- `nginx.conf` 301s trailing slashes to the non-trailing canonical form — **do not
  re-add `$uri/` to `try_files`** (causes a redirect loop; see the doc)

## Deploy (Docker → nginx, same as other apps/)

```bash
docker build -t vocele-web --build-arg PUBLIC_SITE_URL=https://vocele.app .
docker run -p 8080:80 vocele-web
```

The image is a static `dist/` served by nginx (`nginx.conf`), no SPA fallback — a
missing path is a real 404 (correct crawler signal). The 404 page itself
client-redirects humans to the locale-appropriate home (`/es/...` → `/es`, else
`/`) — that logic lives in `src/pages/404.astro`, NOT in nginx, so it survives a
move to Vercel / Cloudflare Pages / GitHub Pages unchanged. Trailing slashes 301
to the non-trailing canonical form (nginx; re-create per provider on migration —
see [docs/001-seo-crawlability.md](docs/001-seo-crawlability.md#provider-migration-notes)).

### To wire into CI/CD + cluster (not done here — touches shared infra)

This app is **not yet** hooked into the pipeline. To deploy it via the existing
GitHub Actions → Scaleway → Flux flow, add (in a reviewed change):

1. **`.github/workflows/build-and-push.yaml`** — add `apps/vocele-web/**` to the
   `paths:` triggers and add `vocele-web` to the build matrix (note: this is a Node/
   nginx image, not the Python `uv` build the matrix assumes — it may need a matrix
   branch or a dedicated job, since the shared-wheel/pytest steps don't apply).
2. **`infra-config/k8s/apps/vocele-web/`** — Deployment + Service + IngressRoute. This
   is a **public website on its own domain** (`vocele.app`), not an `api.overx.ai`
   path-prefixed service, so it needs its own `Host(\`vocele.app\`)` IngressRoute and a
   TLS cert, not the `/api/v1/<svc>` routing convention the READMEs describe.
3. **Image automation** — add the `vocele-web` ImageRepository/ImagePolicy entry if you
   want Flux auto-deploys on new tags.

Because #2 spans a new public domain + TLS, do it as its own reviewed PR rather than
folding it into an unrelated change.

## Pre-launch checklist (content, not infra)

Carried over from the site build — do not ship without these:

1. **Real screenshots** — the hero "phone mockup" is a hand-built CSS approximation;
   replace with actual app screenshots, and regenerate `og-image.jpg` (1200×675) from a real design.
2. **Official App Store badge + real URL** — `AppStoreBadge.astro` is a placeholder
   (`href="#"`).
3. **Legal review** — `privacy.astro` / `terms.astro` are honest drafts, not legal
   advice; the subscription-disclosure copy must match App Store Connect and the in-app
   paywall (the "Three-Surface Check").
4. **90-day guarantee copy is intentionally absent** from pricing until the in-app
   checkpoint tracker (`ios-claude-hello/docs/specs/020-gamification-progress-system.md`)
   ships — publishing an unbacked guarantee is a refund/support liability.
5. Set real support/privacy emails and confirm all three subscription prices match the
   app's RevenueCat config once wired.
