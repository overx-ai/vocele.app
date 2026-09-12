# vocele-web

Marketing site for Vocele (vocele.app) — Astro 4 static output served as plain
HTML. SEO/GEO is the entire point of this app. Full reference:
[docs/001-seo-crawlability.md](docs/001-seo-crawlability.md).

## Tech Stack
- Astro 4, `output: 'static'`, `trailingSlash: 'never'` — zero client JS
  (two exceptions: the 404 page's locale-aware redirect script, and the GA4
  gtag.js snippet in BaseLayout — prod builds only)
- Served today by nginx in Docker; **hosting will likely move to Vercel /
  Cloudflare Pages / GitHub Pages**

## Critical Conventions
- **Register every page in `src/site-pages.ts`** (blog articles in
  `src/blog-posts.ts` — they append automatically). This single manifest drives
  the sitemap AND head hreflang; an unregistered page is invisible to crawlers.
- **Canonical URLs are non-trailing** (`/pricing`, `/es`). Never emit or link a
  trailing-slash internal URL (`/es/` etc.) — they 301.
- **Blog articles are original per locale, never translations**: EN under
  `/blog/<slug>`, es-MX under `/es/blog/<es-slug>`, each self-canonical with NO
  hreflang twin. Content briefs + strategy live in [blog/](blog/INDEX.md).
- Localization: no i18n library — `lang` prop + inline ternaries in components,
  duplicated page trees (`src/pages/es/`). Stick to it.

## Project-Specific Rules
- **Design is "Bold Poster" — a deliberate divergence from the iOS app mirror.**
  Outfit display type (self-hosted `public/fonts/outfit-latin.woff2`, preloaded in
  BaseLayout), `2px #1c1c1e` ink rules, full-bleed color blocks, hard offset shadows
  (`8px 8px 0 <accent>`), uppercase headings, marquee tickers. Color tokens/gradients
  in `global.css` still mirror the app; the display/border/shadow tokens are web-only.
  **Light-only (v1)** — no dark tokens. Don't "fix" this back to the app's rounded/
  soft-shadow language. Full rationale in README "Design system — Bold Poster".
- **Do NOT add behavior to nginx.conf** (user decision 2026-07-11): hosting is
  moving to a static provider, so URL behavior belongs in the HTML/pages where
  every host honors it (e.g. the 404 page's client redirect). Per-provider
  config (trailing-slash) is tabled in docs/001 § Provider migration notes.
- Never re-add `$uri/` to nginx `try_files` — it makes nginx 301 `/pricing` →
  `/pricing/`, which fights canonicalization and loops.
- `og:image:width/height` in BaseLayout are hardcoded to match
  `public/og-image.jpg` (1200×675) — change both together.
- Content guardrails (from ios-claude-hello ASO doc): never publish the 90-day
  guarantee; only 7 learnable languages (es en fr de it pt ja — never ru/pl/ar);
  prices $14.99/$29.99/$49.99; sell against human tutors ($200–320/mo), never
  against Duolingo.

## Workflows
- Verify after changes: `npm run check` — `astro check` under a strict tsconfig,
  then `tests/site.test.js`, which builds and asserts the SEO invariants that used
  to be manual greps (sitemap/build parity, canonical, hreflang, trailing-slash
  links, JSON-LD, the AASA, the content fence, plan prices). Adding a page without
  registering it in `src/site-pages.ts` fails the first test.
- Full link check: run the crawl_404.py pattern (scratchpad) against
  `docker run -p 8899:80` with nginx.conf + dist mounted.
- Deploy: `git push origin master` → Vercel auto-builds (no separate step, no CI
  config). Host/DNS/GSC/GA4 setup in [docs/002-deployment.md](docs/002-deployment.md).
