# Product definition — Vocele

Single source of truth for every claim the pipeline makes about the app. Sources: `ios-claude-hello/marketing/002-asc-submission-pack.md` §1, `fastlane/metadata/en-US/description.txt`, `Hello.storekit`, `docs/023-release-checklist-1-0.md` (all read 2026-09-02). Update in the same commit as the product change.

## One-line pitch
An AI language coach for iPhone that makes you speak from day one: voice conversation with named coaches, corrections shown inside your own sentence, and per-word pronunciation scoring. Built for adult learners and immigrants; sold against private tutoring ($200–320/mo), never against gamified free apps.

## Platforms
- iOS: yes (iOS 17+). App Store id 6805929109. **Unreleased as of 2026-09-02** — no public listing, no TestFlight build.
- Android: no
- Web: no (marketing site only)

## Pricing (USD, App Store)
- Free tier: no recurring talk or pronunciation minutes beyond the onboarding conversation, a 200-word vocabulary cap (GitOps-tunable) and limited stories (owner, 2026-10-08). Never quote free-tier numbers on a page: say "Free accounts can try the app with limited access; what's included is shown in the app."
- Metered on every plan: spoken conversation and pronunciation scoring. Per month — Core 300 talk / 90 pronunciation minutes, Fluency 600 / 180, Meta 1,200 / 360. Vocabulary caps 2,500 / 10,000 / 30,000; PDF imports 2 / 5 / 20.
- Never write "unlimited" (or "ilimitado") as a claim about any plan. Allowances are the contract; the live source is learn-words `services/minute_wallets.py` PLAN_MINUTES and `services/entitlements.py` TIER_LIMITS. Full disclosure page: /fair-use (+ /es/fair-use).
- Core — $14.99/mo ($107.88/yr, $5.99/wk)
- Fluency — $29.99/mo ($215.88/yr)
- Meta — $49.99/mo ($359.88/yr)
- 3-day free trial on all tiers. Cancel from device settings.
- Honest caveat: today every server-side gate sits at `core`. Do not describe specific Fluency/Meta-only features in articles; say "paid plans" or point to /pricing.

## Learnable languages (exactly nine)
Spanish, English, French, German, Italian, Portuguese, Japanese, Russian, Polish.

## Interface locales (a separate list from learnable languages)
English, Spanish, Portuguese, Russian, Polish. Grammar explanations and word meanings can be shown in the learner's native language.

## Features that EXIST
- Voice + text conversation with named AI coaches Luna and Lorenzo (plus Cloudy, Dela). Coach replies spoken aloud.
- Three conversation modes: full scaffolding / corrections-only / immersive.
- Correction spans — the wrong words highlighted inside the learner's own sentence with the fix beneath; rule chips; "save corrected sentence".
- Tap any word in chat to see meaning.
- Post-session analysis (fluency + turns).
- Accent practice: per-word pronunciation scoring (Azure), sound-level diagnosis, score history over weeks, phrase drills, phoneme detail. Opt-in "check pronunciation" on any spoken chat turn.
- Stories: CEFR-tuned scenes, TTS playback, comprehension questions answered aloud, retell from another character's POV, spaced re-surfacing.
- Vocabulary with spaced repetition: flashcards, matching, typing, listening, picture rounds, cloze; themed word sets (work, travel, doctor, school…).
- Phrasebook (offline-first) with its own SRS; saved from chat by long-press, coach chip, or correction.
- Grammar: rules explained in the learner's native language, adaptive quizzes, "sentences where you could have used this" reports.
- Daily plan built from yesterday's errors; streak, heatmap, per-skill stats (five skills incl. confidence trendline).
- Duels (head-to-head rounds) and friends-only leaderboards; activity feed with likes.
- Interests picker (personalises topics); memory screen ("the app knows me").
- Multiple target languages per learner, each with its own level.
- Local practice reminders.
- Sign in with Apple or Google (no email/password, no guest account); account + all data deletable from Settings.

## Positioning against vocabulary / spaced-repetition apps (WRD, Anki, Quizlet, Memrise)
Added 2026-09-12 on the owner's note: these are competitors for the same "learn words" intent, not
a separate market. They are a real comparison set, unlike Duolingo.

The wedge is **where the words come from and where they go**, never algorithm quality:
- Their words arrive as a deck you obtain (pre-made, shared, or hand-built). Ours arrive from your
  own conversation — long-press a word in chat, a coach chip, or a correction you chose to save.
- Their review ends at recall on a card. Ours re-surfaces the word in six modes (flashcards,
  matching, typing, listening, picture, cloze) and then in a spoken turn with the coach, which is
  the only place a word gets tested under time pressure out loud.
- Concede plainly: Anki's scheduler is more configurable, its deck ecosystem is enormous, it is free
  and cross-platform, and it handles any subject. We are iPhone-only and language-only.
- ⚠️ Verify at write time before asserting any competitor's limits (whether Anki ships speech
  recognition, what WRD's review modes are). These change and the fence does not cover third parties.

## Features that DO NOT exist (the hallucination fence)
Never mention these as available, planned, or "may support":
- Android or web app
- Learning Arabic, or anything beyond the nine
- A curated professional role-play scenario library ("140 scenarios", "job interview simulator pack") — conversation is open-topic + interests, not a scenario catalogue
- 90-day guarantee, 90-day roadmap, money-back guarantee, checkpoint tracker
- Offline conversation/scoring (only the phrase dictionary is offline-first; everything else needs an account + connection)
- Remote push notifications (reminders are local-only)
- Emotive/expressive character voices, animated 3D avatars, lip-sync
- CarPlay
- Call analyzer / upload-your-own-meeting feedback
- Human tutors, live classes, certificates, official exam registration
- User counts, ratings, testimonials, "X million learners" (pre-launch: none exist)

## Things we never claim
- Comparisons against Duolingo (name never appears). The comparison set is human tutors, other AI conversation apps, and vocabulary/SRS apps (see below).
- Against a flashcard app, never claim we have the better algorithm, the bigger deck library, or desktop/sync parity. We do not, and Anki's scheduler is its whole reputation.
- Guaranteed fluency, timelines ("fluent in 90 days"), CEFR level jumps as promises
- "Best app" without a stated criterion
- Competitor pricing/features from memory — web-search at write time and cite
- Anything about medical, legal (USCIS/FMCSA), or immigration outcomes as advice — informational only, with a disclaimer

## Author
- Name: Yauheni Malashchytski (owner, 2026-10-08: the person's name, never a company or trading name; never "Jack Ma", "overX.ai" or "OverX AI" on any page)
- Bio line: Founder of Vocele. Writes from the product's own data and design decisions.
- URL: https://vocele.app
