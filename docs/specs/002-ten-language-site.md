---
id: 002
title: "The site speaks all ten languages the app does"
status: done
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

> **TL;DR** — vocele.app now serves home, pricing, FAQ, fair-use and a blog index in all ten app languages from one template, with local prices and sourced tutor ranges. en and es text stayed unchanged. Owner: get a native read of ja, ar, pl and the fair-use pages.

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

## Price sources
Plan prices: App Store Connect monthly customer prices, read 2026-11-04 (Core / Fluency / Meta): DE, FR, IT EUR 17.99 / 34.99 / 59.99; PL PLN 69.99 / 129.99 / 229.99; BR BRL 99.90 / 199.90 / 299.90; JP JPY 2500 / 5000 / 8000; RU RUB 1290 / 2490 / 4490; SA SAR 59.99 / 129.99 / 199.99.

Tutor ranges, read 2026-11-04. Each is about eight lessons a month, so a derived estimate, not a published figure.

| Locale | Range | Basis | Sources |
|--------|-------|-------|---------|
| de | 180–295 € | 22.49-36.99 €/h, one online school | giga.de Lingoda prices, 2026-01-14; superprof.de adult average 22 €/h |
| fr | 160–480 € | 20-60 €/h | acadomia.fr/tarifs; groupe-reussite.fr |
| it | 120–200 € | 15-25 €/h online | cronoshare.it lezioni-inglese, 2026-01-07; superprof.it |
| pl | 400–660 zł | 50-82.50 zł/h, middle 50% of 38,012 ads | e-korepetycje.net report 2026; wprost.pl |
| pt | R$ 400–1.200 | R$ 50-150/h | cronoshare.com.br, 2026-01-09; getninjas.com.br |
| ja | ¥60,000〜75,000 | one-to-one conversation schools, 40 min | shane.co.jp/lesson/price; berlitz.com/ja-jp/adults/pricing |
| ru | 12 000–19 000 ₽ | 1,500 ₽/h low; school entry price high | repetit.ru; skyeng.ru |
| ar | 800–1,200 ر.س. | 25 listed tutors, median 114 SAR/h | apprentus.com Saudi English tutors; modarby.com and learn.sa as floors |

## Tasks
| ID | Description | Agent | Depends On | Status | Files |
|----|-------------|-------|------------|--------|-------|
| T1 | Locale table, copy extraction for en and es, shared views, manifest, layouts, language menu, 404, parity proof | dev | - | done | src/i18n, src/views, src/pages, src/site-pages.ts, src/layouts, src/components |
| T2 | Fonts, per-locale type overrides, RTL | dev | T1 | done | src/styles/global.css, public/fonts, src/layouts/BaseLayout.astro |
| T3 | Native copy for ru pl pt de fr it ja ar | dev | T1 | done | src/i18n/*.ts, src/data/fair-use.ts |
| T4 | Tests and legal checks across every locale | dev | T3 | done | tests/site.test.js, scripts/check-legal.mjs |
| T5 | llms.txt sections and CLAUDE.md rule update | dev | T3 | done | public/llms.txt, CLAUDE.md, docs/001-seo-crawlability.md |

## Acceptance Criteria
- [x] Every locale serves all five core pages with correct `html lang`, `dir`, canonical and reciprocal hreflang.
- [x] Sitemap matches the build.
- [x] en and es built text and URLs are unchanged, apart from the language menu and hreflang.
- [x] No "unlimited" equivalent, 90-day guarantee, Duolingo comparison or learn-Arabic claim in any locale.
- [x] Prices are real storefront values or USD.
- [x] 390px and desktop reviewed for every locale, including Arabic RTL.
- [x] All tests passing.
- [x] Code review clean.
