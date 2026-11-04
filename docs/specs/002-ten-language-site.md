---
id: 002
title: "The site speaks all ten languages the app does"
status: approved
priority: p1
created: 2026-11-04
updated: 2026-11-04
repo: vocele-web
release:
story:
depends_on: []
conflicts_with: []
tasks: []
---

# 002 - The site speaks all ten languages the app does

> **TL;DR** — vocele.app gains home, pricing, FAQ, fair-use and blog index in ru, pl, pt, de, fr, it, ja and ar on one shared template, replacing the en/es ternaries and the duplicated /es tree. Every existing en and es URL keeps its text. Pilot articles follow separately.

## Requirements
- Locales match the app's `LocalizationHelper.supportedLanguages`: en es ru pl pt de fr it ja ar. pt is pt-BR, es stays es-MX.
- Core pages per locale: home, pricing, FAQ, fair-use, blog index. True twins with reciprocal hreflang and x-default.
- Audience: people in their home country, mostly learning English, sold against private tutors.
- Copy is written natively per locale from `seo/product.md` and `ios-claude-hello/marketing/006-asc-nine-locales.md`, never translated line by line.
- Privacy and terms stay English. `/vs/` stays English. `/es/invite` stays.
- /de ships without an Impressum (owner, 2026-11-04). The no-address rule stands.
- Arabic is interface-only and renders RTL. No page may offer learning Arabic.

## Architecture
- `src/i18n/locales.ts`: locale table modelled on `ffly-site/src/i18n/locales.ts`.
- `src/i18n/<lang>.ts`: all copy for one locale, typed by the English file.
- `src/views/*.astro`: one template per core page. `src/pages/*.astro` and `src/pages/[lang]/*.astro` are thin routes.
- `src/site-pages.ts`: `translated: boolean` becomes a locale list that drives sitemap and hreflang.
- This replaces the "inline ternaries, duplicated page trees" rule in `CLAUDE.md`.

## Edge Cases & Risks
| Case | Impact | Mitigation | Source |
|------|--------|------------|--------|
| Existing es/en pages drift in the refactor | Ranking loss | Diff built HTML before and after; only intended changes survive | plan |
| hreflang stays en/es-only on some pages | Google drops twins | Test reciprocal sets from the manifest | plan |
| Outfit lacks Polish and Cyrillic glyphs | Mixed fonts in headings | Add subsets, system stacks for ja and ar | exploration |
| `text-transform: uppercase` on ja/ar and German ß | Broken display type | Per-locale override | plan |
| RTL breaks offset shadows, marquee | Ugly Arabic pages | Logical properties, mirrored shadow | plan |
| Local prices guessed | False claims | Real storefront data or USD, never guessed | plan |
| Content fence and legal checks only scan en/es copies | Banned claims ship in new locales | Run checks over every built page, with per-language "unlimited" terms | plan |
| fair-use legal text mistranslated | Consumer-law exposure | Render from one structure; numbers from `facts.ts` | plan |

## Tasks
| ID | Description | Agent | Depends On | Status | Files |
|----|-------------|-------|------------|--------|-------|
| T1 | Locale table, copy extraction for en and es, shared views, manifest, layouts, language menu, 404, parity proof | dev | - | pending | src/i18n, src/views, src/pages, src/site-pages.ts, src/layouts, src/components |
| T2 | Fonts, per-locale type overrides, RTL | dev | T1 | pending | src/styles/global.css, public/fonts, src/layouts/BaseLayout.astro |
| T3 | Native copy for ru pl pt de fr it ja ar | dev | T1 | pending | src/i18n/*.ts, src/data/fair-use.ts |
| T4 | Tests and legal checks across every locale | dev | T3 | pending | tests/site.test.js, scripts/check-legal.mjs |
| T5 | llms.txt sections and CLAUDE.md rule update | dev | T3 | pending | public/llms.txt, CLAUDE.md, docs/001-seo-crawlability.md |

## Acceptance Criteria
- [ ] Every locale serves all five core pages with correct `html lang`, `dir`, canonical and reciprocal hreflang.
- [ ] Sitemap matches the build.
- [ ] en and es built text and URLs are unchanged, apart from the language menu and hreflang.
- [ ] No "unlimited" equivalent, 90-day guarantee, Duolingo comparison or learn-Arabic claim in any locale.
- [ ] Prices are real storefront values or USD.
- [ ] 390px and desktop reviewed for every locale, including Arabic RTL.
- [ ] All tests passing.
- [ ] Code review clean.
