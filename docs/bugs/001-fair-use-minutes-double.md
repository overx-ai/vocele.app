---
id: 001
title: "/fair-use states double the minutes each plan sells"
status: done
priority: p1
created: 2026-11-02
updated: 2026-11-02
repo: vocele-web
---

# 001 - /fair-use states double the minutes each plan sells

> **TL;DR** — The allowance table on `/fair-use` and `/es/fair-use` showed 300/90, 600/180 and
> 1,200/360 conversation/pronunciation minutes a month for Core/Fluency/Meta. The backend sells
> 150/30, 300/60 and 600/120, which `/pricing` already showed. Both pages now render from one
> constant, and the legal check asserts they agree.

## Reproduction

1. `npm run build`, open `dist/fair-use/index.html` (or https://vocele.app/fair-use), section "What
   each plan includes".
2. Conversation row: 10 / 20 / 40 min a day, 300 / 600 / 1,200 a month. Pronunciation row: 3 / 6 /
   12 min a day, 90 / 180 / 360 a month.
3. Compare with `git show origin/master:learn-words/src/services/minute_wallets.py` in 1B-bots:
   `PLAN_MINUTES` is core 150/30, fluency 300/60, meta 600/120. `/pricing` and `seo/product.md` say
   the same.

## Root cause

`src/data/fair-use.ts` kept its own `ALLOWANCE` copy with the doubled figures, and
`scripts/check-legal.mjs` hardcoded those same figures, so the check guarded the wrong numbers.
`/pricing` typed its minutes separately, so nothing compared the two pages.

## Fix

- `src/data/facts.ts`: new `PLAN_ALLOWANCE` (minutes 150/300/600 and 30/60/120, vocabulary, PDF
  imports), verified 2026-11-02 against backend `PLAN_MINUTES`. `LEGAL_DATES['fair-use'].updated` →
  2026-11-02.
- `src/data/fair-use.ts`: imports `PLAN_ALLOWANCE`; its local copy and the stale "verified" comment
  are gone.
- `src/pages/pricing.astro`, `src/pages/es/pricing.astro`: plan-card minutes interpolate
  `PLAN_ALLOWANCE`.
- `scripts/check-legal.mjs`: the fair-use table check parses `PLAN_ALLOWANCE` instead of hardcoding,
  and `/pricing` + `/es/pricing` must state the same minutes.
- `src/pages/blog/ai-speaking-coach-vs-human-tutor.astro`: a mangled "10– min/day by plan" cell now
  reads "150–600 min/month by plan".

Vocele is unreleased with no subscribers, so the correction needs no notice period.
