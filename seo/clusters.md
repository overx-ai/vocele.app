# Topic clusters

Same five-cluster shape per locale (all ten locales; ru pl pt de fr it ja ar are pilots from 2026-11-04). Content is original per locale, never translated. Cannibalization checks run within a locale only. Full backlog IDs (P-1xx en, P-2xx es, P-3xx pt, P-4xx ru, V-00x vs) live in blog/007-multilang-seo-plan.md §5–6.

## Cluster A — "I understand but can't speak" (confidence cornerstone, GEO magnet)
- Pillar (en): Why you understand English but can't speak it — /blog/understand-english-but-cant-speak
- Pillar (es): Cómo hablar inglés con confianza — /es/blog/como-hablar-ingles-con-confianza
- Supporting:
  - entiendo inglés pero no puedo hablarlo — /es/blog/entiendo-ingles-pero-no-puedo-hablarlo (P-201, written 2026-10-09, pending deploy) — es
  - how long does it take to become fluent — planned (P-104) — en
  - cómo perder el miedo a hablar inglés — planned (P-204) — es
  - how to think in English (stop translating) — planned (P-119) — en
- Notes from review: 2026-10-09: neither pillar has impressions yet. P-201 takes the diagnosis intent ("why"), como-hablar keeps the how-to plan; they link both ways so the two ES pages don't split one query.

## Cluster B — Pronunciation & accent for L1 speakers (the per-word-scoring story)
- Pillar (en): AI Accent Training: how per-word pronunciation scoring works — /blog/ai-accent-training
- Pillar (es): Errores de pronunciación en inglés que delatan a hispanohablantes — /es/blog/errores-de-pronunciacion-en-ingles
- Supporting:
  - shadowing technique: does it fix your accent — planned (P-106) — en
  - the TH sound / American R / ship vs sheep — planned (P-114..116) — en
  - cómo pronunciar la TH en inglés: /es/blog/como-pronunciar-la-th-en-ingles (P-214, 2026-11-02), es
  - la R americana / vocales — planned (P-215..216) — es
  - /accent-reduction, /pronunciation-checker landers — deferred post-launch (P-121/122)
- Notes from review: —

## Cluster C — High-stakes situations + the money decision
- Pillar (en): AI Speaking Coach vs. Human Tutor — /blog/ai-speaking-coach-vs-human-tutor
- Pillar (es): ¿Clases de inglés o una app con IA? — /es/blog/clases-de-ingles-o-app-con-ia
- Supporting:
  - IELTS & TOEFL speaking practice with AI — /blog/ielts-toefl-speaking-practice-ai
  - job interview English: the 27 phrases — planned (P-102) — en
  - US citizenship interview English practice — planned (P-103) — en
  - how much does an English tutor cost (2026) — planned — en (Praktika's best-performing format)
  - inglés para entrevista de trabajo: /es/blog/ingles-para-entrevista-de-trabajo (P-203, 2026-10-26), es
  - inglés para la entrevista de ciudadanía — planned (P-202) — es
- Notes from review: 2026-10-09: the ES pillar is the site's biggest non-brand earner (222 impr, pos ~7.9) with 0 clicks. The SERP above it is schools selling classes (Berlitz, aprendemas: "la IA no reemplaza al profesor") and AI-app listicles; retitled to promise the cost answer and a verdict. Spanish money-decision content is where Google already trusts us; P-206 (apps para aprender inglés hablando) is the natural next ES piece.

## Cluster D — Situational & occupational English (Year 1, lowest competition)
- Pillar: planned (phone-call English / everyday ladder)
- Supporting: healthcare, construction, rideshare, doctor visit, parent-teacher (P-107..113 en; P-207..213 es)
- Notes from review: —

## Cluster E — Brand & comparison (near-zero KD, EN-only /vs/ pages)
- Pillar (en): Best AI Language Tutor App in 2026: 7 Compared by Problem, /blog/best-ai-language-tutor-app (P-105, 2026-11-02)
- Supporting:
  - Vocele vs Praktika — /vs/praktika — praktika alternative / praktika review
  - Vocele vs Fluently — /vs/fluently — fluently ai alternative / review
  - Vocele vs TalkPal — /vs/talkpal — talkpal alternative / review
  - Vocele vs ELSA Speak: /vs/elsa, elsa speak alternative (V-002)
  - Vocele vs Speak: /vs/speak, speak app alternative (V-003)
  - Vocele vs BoldVoice: /vs/boldvoice, boldvoice alternative (V-001)
  - Vocele vs Anki (for language learners) — planned (V-006) — the vocabulary axis
  - apps para aprender inglés hablando: /es/blog/apps-para-aprender-ingles-hablando (P-206, es buying guide; the one ES page in E)
- Guardrail: never against Duolingo. Three axes, three different angles:
  - accent-only apps (BoldVoice/ELSA) — we add the full conversation loop
  - conversation apps (Praktika/Speak/TalkPal/Fluently) — we add per-word accent depth + 9 languages
  - vocabulary/SRS apps (WRD/Anki/Quizlet/Memrise) — the words come from your own conversation and
    get spoken back, not obtained as a deck. Never argue scheduler quality. See product.md
    § Positioning against vocabulary / spaced-repetition apps.
- Notes from review: —

## Cluster F — Vocabulary that survives (added 2026-09-12)
The retention audience: people already using a flashcard app, or people who "learn" words and lose
them. Distinct from A (confidence), B (pronunciation) and C (the money decision) — the pain here is
forgetting, and the competitors are WRD/Anki/Quizlet rather than tutors or conversation apps.
- Pillar (en): why you forget the words you study — planned (P-130)
- Pillar (es): planned (P-230)
- Supporting:
  - anki for language learning: what it's good at and what it isn't — planned (P-131) — en
  - how many words do you need to be conversational — planned (P-132) — en
  - the words you save from your own conversations — planned (P-133) — en
  - /vs/anki — planned (V-006) — sits in E, links here
- ASO reality (2026-09-12): on the App Store this whole category is one head term — `anki` 67 pop /
  63 diff (US), 61/48 (MX). Everything else tested sits at the popularity floor of 5. So this
  cluster is a web-SEO and GEO play, not an ASO keyword play.
- Notes from review: —

## Internal linking

- Layers: 3-5 inbound links at publish from the same cluster and locale; the home page links the 3 newest articles, same locale (`HOME_ARTICLES` in `src/views/Home.astro`); `/seo review` runs `links.py`.
- `~/.claude/skills/seo/scripts/links.py` proposes phrases that pages at position 4-15 rank for, using first-party `gsc.py` only. Add a link only after the owner's OK, log it in `published.md`, and never rewrite a sentence to fit an anchor. The weekly job prints the count and edits nothing.

## Orphans (published pages with no cluster — assign or prune)
- none

## Locale pilots (2026-11-04)

### ru
- A (ru): pillar Понимаю английский, но не могу говорить: что делать, /ru/blog/ponimayu-anglijskij-no-ne-mogu-govorit (P-402, 2026-11-04)
- B (ru): pillar Как убрать акцент в английском: с чего начать, /ru/blog/kak-ubrat-akcent-v-anglijskom (P-403 reframed, 2026-11-04)

### pl
- A (pl): pillar Jak przełamać barierę językową, gdy rozumiesz angielski, /pl/blog/jak-przelamac-bariere-jezykowa
- B (pl): pillar Polski akcent w angielskim: które błędy naprawdę szkodzą, /pl/blog/polski-akcent-w-angielskim
- C (pl): planned, ile kosztują korepetycje z angielskiego
- D (pl): planned, small talk i spotkania po angielsku

### pt
- A (pt): Pillar: Entendo inglês mas não consigo falar, /pt/blog/entendo-ingles-mas-nao-consigo-falar (P-302, 2026-11-04)
- B (pt): Pronúncia do -ed em inglês, /pt/blog/pronuncia-do-ed-em-ingles (2026-11-04); pillar erros de pronúncia planned (P-303)

### de
- A pillar (de): Englisch verstehen, aber nicht sprechen: Woran es liegt, /de/blog/englisch-verstehen-aber-nicht-sprechen (2026-11-04)
- B pillar (de): Englische Aussprache verbessern: Womit Deutsche anfangen, /de/blog/englische-aussprache-verbessern (2026-11-04)

### fr
- Cluster A (fr) pillar: Je comprends l’anglais mais je n’arrive pas à parler, /fr/blog/je-comprends-l-anglais-mais-je-n-arrive-pas-a-parler
- Cluster B (fr) pillar: Perdre son accent français en anglais : par où commencer, /fr/blog/perdre-son-accent-francais-en-anglais

### it
- A (it): pillar /it/blog/capisco-inglese-ma-non-riesco-a-parlare (diagnosis with Italian data, four blocks); supporting planned: paura di parlare in inglese, parlare senza pensare in italiano, inglese scolastico.
- B (it): pillar /it/blog/errori-pronuncia-inglese-italiani (errors ranked with measured rates); supporting planned: schwa, -ed finale, h aspirata.
- C (it): planned: quanto costa un insegnante di inglese, colloquio di lavoro in inglese, esame cambridge b2 speaking.

### ja
- A (ja): pillar 英語が聞き取れるけど話せない, /ja/blog/eigo-kikitoreru-kedo-hanasenai
- B (ja): pillar LとRの発音の違い, /ja/blog/l-to-r-no-hatsuon
- C (ja): planned, 英会話スクールの料金とAI英会話の比較 (no page yet)

### ar
- A (ar): Pillar: لماذا أفهم الإنجليزية ولا أستطيع التحدث بطلاقة؟: /ar/blog/afham-alinjliziya-wala-astatie-altahadduth
- B (ar): Pillar: الفرق بين p و b في النطق: /ar/blog/alfarq-bayn-p-wa-b-fi-alnutq
