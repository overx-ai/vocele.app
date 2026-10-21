---
id: 001
title: "The pricing page and FAQ state the monthly minutes the app sells"
status: approved
priority: p1
created: 2026-10-10
updated: 2026-10-21
repo: vocele-web
release: 2.0.0
---

# 001 - The pricing page and FAQ state the monthly minutes the app sells

> **TL;DR** — `/pricing` and the FAQ still promise 10/20/40 conversation minutes **a day** (and
> pronunciation only on Meta). The app's paywall and all ten App Store descriptions sell
> 150/300/600 talk and 30/60/120 pronunciation minutes **a month**, plus 5 free talk minutes once.
> Replace the per-day lines with the monthly numbers below; nothing else on the pages changes.

## Context

Apple's three-surface rule (the in-app paywall, the App Store description, the subscription terms)
requires one set of numbers. The iOS app moved to monthly minute wallets on 2026-10-10
(`ios-claude-hello` spec 255, `AppFlags.paywallMinutes`). Its single source is
`Template/Core/Models/TierBenefits.swift` (`monthlyMinutes`, `freeTalkMinutes`), which mirrors
backend 547's `PLAN_MINUTES`. The store paragraph is `fastlane/dormant/<locale>/description-minutes.txt`,
and `PublishedClaimsMatchTheBuildTests` pins it to that table. The site cannot be pinned from the
app repo, because a sibling checkout is not on its scan root.

## The numbers

| Plan | Talk minutes / month | Pronunciation minutes / month | Saved words |
|---|---|---|---|
| Free | 5, once, after the level check | 0 | unchanged |
| Core | 150 | 30 | 2,500 |
| Fluency | 300 | 60 | 10,000 |
| Meta | 600 | 120 | 30,000 |

The minutes are monthly on every plan, Core weekly included: a weekly cycle grants the month on a
schedule, so never state a weekly figure. Never call the free minutes a trial.

## Stale lines (measured at `cde9586`, 2026-10-09)

- `src/pages/pricing.astro:41` `'10 minutes of AI conversation a day'`
- `src/pages/pricing.astro:58` `'20 minutes of AI conversation a day, any mode'`
- `src/pages/pricing.astro:75-76` `'40 minutes of AI conversation a day'`, `'12 minutes of pronunciation practice a day'`
- `src/pages/es/pricing.astro:43,61,80` and `src/pages/es/faq.astro:28`: the same claims in Spanish (`al día`).
- `seo/product.md:15` states 300/600/1,200 talk and 90/180/360 pronunciation minutes. That is stale; backend `PLAN_MINUTES` on `1B-bots` master (`456b29ae5`) is the table above.
- `src/pages/faq.astro:28`: the whole Core/Fluency/Meta answer, including *"adds accent coaching"* on
  Fluency. Core now includes pronunciation minutes too.

## Tasks

| # | Task | Files | Agent | Status |
|---|---|---|---|---|
| T1 | Replace the per-day lines with the monthly table above, in the pages' existing voice | `src/pages/pricing.astro`, `src/pages/faq.astro` | dev | open |
| T2 | Grep the rest of `src/` (blog, `vs/`) for `minutes … a day` and correct any plan claim the same way | `src/pages/pricing.astro` | dev | open |
| T3 | Same as T1 in Spanish, in the pages' existing voice (`al mes`) | `src/pages/es/pricing.astro`, `src/pages/es/faq.astro` | dev | open |
| T4 | Correct the minute table in `seo/product.md` | `seo/product.md` | dev | open |

## Acceptance

- [ ] No page says a plan's minutes are per day.
- [ ] Each plan's numbers equal the table above.
- [ ] `/fair-use` is still linked from `/pricing`.
