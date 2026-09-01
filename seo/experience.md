# Experience assets — things only I could know

The originality gate (Step 4) pulls from here. Every article needs at least one item, written in first person. **No user metrics, reviews, or testimonials exist yet (app unreleased).** What exists is process, design and competitor-teardown material from the iOS repo (`/Users/user/JACK/0E-extensions/ios-claude-hello`). Items marked `owner-verify` need Jack's confirmation before they ship in an article.

Format: `- [YYYY-MM] <cluster or topic> — <the concrete thing> (asset: path/url if any)`

## Metrics I've measured
- [2026-09] product/gamification — Five Octalysis audits of our own app scored 28 → 36 → 46 → 54 → 57 out of 80. The last cycle was the smallest gain (+3) after the largest engineering batch (340 commits); every drive engineering can lift is at or one point from its ceiling. (asset: docs/product/octalysis-re-audit-2026-09-01.md)
- [2026-08] localisation — Our Portuguese UI catalogue had 0 occurrences of «você» across 2,305 strings (European third-person courtesy) while the Brazilian store page used it 11 times; 429 strings were re-authored for pt-BR. (asset: bug 087 → spec 180)
- [2026-08] ASO — 175 keywords tracked across US/RU/BR storefronts. Winnable band on US: `esl` 38/43, `ielts` 41/45, `toefl` 25/19, `fluency` 16/7. Head terms we deliberately skip: `language learning` 63/80, `learn spanish` 56/78. (asset: marketing/002-asc-submission-pack.md §2)
- [2026-08] naming — 96 candidate names screened, ~95% killed; two whole families died on audience landmines ("Zor-" echoes Spanish *zorra*; Habla/Parla/Rumbo already taken). (asset: marketing/001-aso-offer-strategy.md §8)

## Experiments / tests I ran
- [2026-08] competitor teardown — Read Fluently, Praktika, Speak and ELSA from listings/reviews, then audited "what they have that we don't" against our own tree: five of six gap claims were already shipped or stale. Lesson: competitor lists from marketing copy overstate gaps. (asset: docs/product/competitor-research-fluently-2026-08-19.md §4)
- [2026-07] Praktika reference study — 46 screenshots of Praktika's onboarding/chat/paywall collected as design references. (asset: praktika_refs/, 46 PNGs) `owner-verify` before describing specifics.
- [2026-08] App Review — three rejections under 3.1.2(c) (subscription disclosure) led to a build-failing disclosure checker (`Scripts/check-paywall-disclosures.py`, 17/17 checks) that caught three real defects prose review missed: a ₽ price parsed as "no price", a Russian trial trigger that knew one inflection, a screen promising "Start 3 days free" that couldn't name the converted price. (asset: docs/specs/175)

## Decisions I made and why
- [2026-07] positioning — I wrote the core pain as shame, not grammar: the learner who freezes in the team meeting, the parent whose kid translates for them. Avatar 'María, 34, Houston'. (asset: marketing/001-aso-offer-strategy.md §1)
- [2026-07] positioning — Sell against human tutors ($200–320/mo for 2×/week; Preply/italki $25–40/hr), never against Duolingo. Reason: the comparison set is chosen by marketing, not by App Store category, and "cheaper than a tutor" is a claim we can win. (asset: marketing/001 §0.1, §3)
- [2026-07] gamification — "Dignified gamification, not Duolingo's": no guilt push copy, no global stranger leaderboard, no punitive streak reset, never paywall the anxiety-preventing feature, never a fabricated number. Confetti bursts and XP count-ups were built and then killed as off-brand. (asset: docs/specs/020, docs/design/microinteractions-haptics-v2.md)
- [2026-08] title — "Coach" over "Tutor" in the App Store name: `coach` pop 64 vs `tutor` 19, and "AI language tutor" is a four-way exact-title collision (Praktika, Lily Speak, BetterSpeak, Verbatica). (asset: marketing/002 §3.1)
- [2026-08] locales — es-MX is effectively a second 100-char keyword field on the US storefront, so the es-MX listing leads with "Aprende inglés" (Babbel's locale-split precedent; Apple's CPP case study: +20% tap-through). (asset: marketing/002 §3.2)
- [2026-08] emotive voice — Expressive character voices are built and switched off on cost (2× per minute), not capability. (asset: AppFlags.emotiveCharacterVoice)
- [2026-07] correction spans — Highlight the exact wrong substring inside the learner's own bubble instead of re-writing the sentence in a separate card; the learner sees *where*, not just *what*. (asset: docs/002-talk-correction-spans.md)

## Screenshots / recordings
- None public yet. `fastlane/screenshots/` does not exist (release blocker). Site og-image is a render, not a capture. Do not describe screenshots as real product captures until this changes.

## Things that broke and how I fixed them
- [2026-08] Two concurrent RevenueCat `customerInfo()` calls caused a production `SIGABRT`; serialised the calls. (asset: spec 175)
- [2026-07] `@astrojs/sitemap` crashed on astro@4.16; replaced with a 40-line hand-rolled sitemap driven by the same manifest as hreflang so the two can't drift. (asset: vocele-web/src/pages/sitemap.xml.ts)
- [2026-07] nginx `try_files $uri/` made `/pricing` 301 to `/pricing/`, fighting canonicals; removed and later moved to Vercel `cleanUrls`. (asset: vocele-web/docs/001)

## Opinions I'll defend
- Accent is the acquisition wedge, not the brand: nobody searches "AI conversation partner", everybody searches "why do I sound foreign".
- The per-word score matters less than the *history* of the score. A single number is a verdict; a trend is a coach.
- A comparison page that isn't willing to say what the competitor does better will not rank and doesn't deserve to.
