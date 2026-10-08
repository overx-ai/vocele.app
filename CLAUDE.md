# vocele-web

Marketing site for Vocele (vocele.app) — Astro 4 static output served as plain
HTML. SEO/GEO is the entire point of this app. Full reference:
[docs/001-seo-crawlability.md](docs/001-seo-crawlability.md).

## Tech Stack
- Astro 4, `output: 'static'`, `trailingSlash: 'never'` — zero client JS
  (two exceptions: the 404 page's locale-aware redirect script, and the cookie
  consent module `src/scripts/consent.ts`, which loads GA4 only after Accept —
  Consent Mode v2, Global Privacy Control = Reject, prod builds only)
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
- **Legal pages are data, not markup.** `/privacy`, `/terms` and `/fair-use` (+ `/es/fair-use`) render from
  `src/data/{privacy,terms,fair-use}.ts`; every identity, retention and date fact lives in `src/data/facts.ts`.
  Sections have stable ids and "Section N" links come from their order (`src/data/sections.ts`), so never
  type a section number by hand. `scripts/check-legal.mjs` (in `npm test`) fails the build on: App Store
  labels that differ from the pin in `scripts/fixtures/`, a pin that differs from the app's `PrivacyInfo.xcprivacy`
  (sibling repo), any "we do not track / never share" claim, a banned internal name (AI vendors,
  infra, hosting) on ANY page, "OverX" outside the contact email, a second email, an address or phone
  pattern, a missing section or clause, or a recipient category missing from `/privacy`.
  A missing sibling manifest fails: `LEGAL_SIBLING=<path>` points at it, `LEGAL_SIBLING=skip` skips only that comparison.
- **Owner rules for the legal pack (2026-10-08):** the operator is the person (Yauheni Malashchytski), never a
  company or trading name, on every page, footer, JSON-LD and llms.txt; one email (`support@overx.ai`); no
  street address or phone; and no implementation detail on any public page: name data, purpose, retention,
  recipient category and rights, never vendors, models, hosts or pipelines. Apple, Google, AppsFlyer and
  Google Analytics are the only third parties named. From this version on, a replaced policy stays at
  `/privacy/<yyyy-mm>` (noindex, not in the sitemap), and it falls under every check like any other page.
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

## Code comments

- **A comment is written only when it is essential to understanding intricate logic** — a non-obvious
  algorithm, a workaround and why the obvious way fails, an invariant the code cannot state. If the
  code already says it, the comment is noise and gets deleted.
- **No boilerplate docstrings.** Nothing on getters, setters, DTOs, config, plumbing, or anything the
  signature already says. Never a comment "just in case".
- Comments rot; code does not. A wrong comment is worse than none.
