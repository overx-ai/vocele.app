# 007 - Multi-Language SEO Plan: Winning Free Traffic from US Immigrants

**Status:** approved plan, v2 · **Date:** 2026-08-05 (extended to 12-month horizon; then reconciled with the July-2026 GTM deep-research doc) · **Owner:** Jack
**Site:** LIVE at vocele.app since 2026-08-05 (robots.txt allows all AI crawlers; sitemap declared)
**Locales:** en, es-MX (live) + pt-BR, ru (new)
**Method:** the SEO pipeline guide v2 (clusters → keyword backlog → SERP check → originality → anti-slop → score → publish → feedback loop → GEO), applied per locale.

**Positioning rule (from the GTM doc — governs every page here):** Vocele is a
full **AI conversation partner & coach** (conversation, accent, correction,
reading, grammar, vocabulary). Accent is the sharpest low-competition
*acquisition wedge*, not the brand identity. Homepage + App Store title lead
with identity terms ("ai conversation partner", "ai language tutor");
accent-specific keywords live on feature pages, blog articles, and the Accent
Test funnel. Every article's product section sells the full coaching loop —
the accent hook is the door, not the house.

---

## 1. Thesis

Vocele's positioning — *speaking*, not studying — maps exactly onto the highest-pain,
lowest-competition search space in the US: **immigrants who understand English but
freeze when they speak, and who search in their native language.**

Why this wins:

- **The English "learn English" SERP is a bloodbath** (Duolingo, Preply, BoldVoice,
  FluentU own it). The *native-language* SERPs for the same intent ("entiendo inglés
  pero no puedo hablarlo", "понимаю английский, но не могу говорить") are owned by
  generic listicles, immigrant news media (ForumDaily), and tutor schools — nobody
  with a product-led, first-person accent-coaching angle.
- **Spanish is ~62% of the US limited-English-proficiency population**; Russian and
  Portuguese are both top-12 LEP languages with 350k–850k speakers each,
  concentrated in metros (NY/NJ, FL, MA, WA, CA) — enough volume, thin competition
  (per Migration Policy Institute LEP data).
- **Competitors can't follow.** BoldVoice has pt-BR App Store metadata but no
  pt-BR or ru content site. Preply/italki are conflicted (they sell tutors).
  Tutor schools (Skyeng-style) can't honestly write "you don't need a $250/mo tutor."
- **One pipeline, four locales.** The v2 pipeline is locale-parameterized config,
  not new code: per-locale cluster maps, banned-word lists, experience assets, and
  judge prompts.

## 2. Audience per locale

| Locale | Avatar | Search behavior | Emotional core |
|---|---|---|---|
| en | Adult learner incl. immigrants browsing in English; exam takers | "accent training", "ielts speaking" | plateaued fluency, accent friction |
| es-MX | "María, 34, Houston" — understands EN, can't speak | Searches in Spanish for confidence + situations (DMV, interviews, school meetings) | shame → confidence |
| pt-BR | "Rafael, 29, Boston/Orlando" — Brazilian on work/student visa or new green card | Searches in Portuguese: "como falar inglês", "pronúncia", job-interview prep | sotaque embarrassment, career ceiling |
| ru | "Anna, 38, Brooklyn/Sacramento" — Russian-speaking immigrant (RU/UA/BY/KZ/... — write "русскоязычные", never nationality-code the reader; zero politics in content) | Searches in Russian: "заговорить по-английски", citizenship interview, work | reads/writes well, blocked speaking; formal-school trauma |

High-value occupational sub-niches (Year-1 backlog, §6): es — construction,
restaurants, cleaning, healthcare aides; pt-BR — housecleaning, construction,
restaurants (MA/FL/NJ corridors); ru — **truck drivers (FMCSA English-proficiency
enforcement makes this urgent, high-intent)**, IT professionals, healthcare (CNA).

Existing es-MX strategy in `000-strategy.md` stands unchanged; this plan extends
the same shame→confidence + cost-honesty playbook to pt-BR and ru.

## 3. Site architecture (Step 0 infrastructure)

Follows existing conventions — nothing new invented:

- URL prefixes: `/` (en), `/es`, **`/pt`**, **`/ru`** — locale twins of `/`,
  `/pricing`, `/faq`; blog at `/pt/blog/<slug-pt>`, `/ru/blog/<slug-ru>`.
- **Articles stay original per locale, never translations** — self-canonical, no
  hreflang twin. Marketing pages (home/pricing/faq) DO get hreflang: extend
  `src/site-pages.ts` from a boolean `hasEs` to a locale list (`['es','pt','ru']`);
  sitemap + head hreflang keep reading from the one manifest (en-US / es-MX /
  pt-BR / ru / x-default).
- `llms.txt`: add per-locale sections listing pillar articles per language.
- JSON-LD `SoftwareApplication` + `FAQPage` emitted per locale as today.
- GSC: single domain property; monitor per-locale via page-path filters
  (`/pt/`, `/ru/`) in the weekly feedback job. **Now that the site is live:
  verify GSC property, submit sitemap, request indexing on all 12 existing
  pages, and wire IndexNow — this week.**
- **Tool & feature landing pages (Tier 1, from Semrush research)** — a page
  layer above the blog, registered in `site-pages.ts` like any page:
  - **`/accent-test` — the #1 acquisition asset** (BoldVoice "Accent Oracle"
    playbook, but multi-language where theirs is EN-only). Free, no signup,
    results screen sells the full coach. Locale twins ship with each locale:
    `/es/test-de-acento`, `/pt/teste-de-sotaque`, `/ru` equivalent.
  - `/pronunciation-checker` — second tool-intent lander.
  - `/accent-reduction` — highest-CPC cluster as a feature page (not homepage).
  - `/pt/curso-ingles-ia` — KD 8 per Semrush; course-intent lander.
  - `/vs/` comparison pages (near-zero KD): BoldVoice, ELSA, Speak, Praktika —
    EN first, then locale versions where brand search exists.
- **Launch gate (ru):** RU pages publish when app ru *native-language* support
  ships (decision 2026-08-05: ru is planned as an equal locale). The learnable-7
  guardrail is unchanged — ru is a native/marketing locale, never a learnable
  language. Update the guardrail wording in `CLAUDE.md` + `000-strategy.md`
  accordingly (see §12).

## 4. Cluster map per locale (Step 0)

Every locale gets the same five-cluster shape (same intent space, original
content, locale-specific angle). Cornerstone = pillar page of the cluster.
Clusters A–C launch in Phase 1; D–E are the Year-1 build-out.

**A — "I understand but can't speak" (confidence cornerstone).** The single
highest-empathy query family; extremely quotable → GEO magnet.

**B — Pronunciation & accent for <L1> speakers.** The differentiated product
story (per-word scoring). L1-specific error content is unfakeable by generic
sites (ES: b/v, "estress"; PT: final -m, ão, dental th; RU: w/v, th, rhythm,
hard/soft vowels). Year 1 deepens this into a **sound-by-sound series** per
locale (th, American r, ship/sheep vowels, word stress) — each sound page a
supporting article under the B cornerstone.

**C — High-stakes situations + the money decision.** Job interview ·
citizenship interview · "classes vs AI app" cost comparison ($200–320/mo tutor
anchor, in dollars, in every locale).

**D — Situational & occupational English (Year 1).** Everyday ladder (phone
calls, doctor, DMV, school meetings, banking, small talk at work) + occupation
pages per locale's real job market (§2). These are the lowest-competition,
highest-intent queries in the whole plan — nobody writes "английский для
дальнобойщиков" with a product behind it.

**E — Brand & comparison (pulled forward — near-zero KD per Semrush).**
`/vs/` pages + "alternatives" articles for BoldVoice, ELSA, Speak, Praktika,
TalkPal — honest comparison tables with FAQ schema. Angle per peer set: vs
accent-only apps (BoldVoice/ELSA) we add the full conversation loop; vs
conversation apps (Speak/Praktika/TalkPal) we add real per-word accent depth.
**Guardrail: never against Duolingo.** Plus "best app for ..." listicles per
locale — the same roundup format the current thin AI-answer sources use (§10).

## 5. Phase-1 keyword backlog (Steps 1–2) — first 90 days

Rules from the pipeline apply verbatim: backlog is the only source of topics;
cannibalization check runs **within a locale** (cross-locale same-intent articles
are by design — different SERPs entirely); every article gets a live SERP format
check at write time — formats below are hypotheses to verify, not facts.

### EN (deepen — 6 new)

| ID | Keyword / working title | Cluster | Intent | Priority |
|---|---|---|---|---|
| P-101 | why can I understand english but not speak it | A (new cornerstone) | troubleshooting | **high** |
| P-102 | job interview english: the 27 phrases (=I-001) | C | how-to | **high** |
| P-103 | US citizenship interview english practice | C | how-to | **high** |
| P-104 | how long does it take to become fluent (=I-003) | A | definition | med |
| P-105 | english speaking practice app (comparison incl. us, honest) | E | buying guide | med |
| P-106 | shadowing technique: does it fix your accent? | B | how-to | med |

### ES (deepen — 6 new)

| ID | Keyword / working title | Cluster | Intent | Priority |
|---|---|---|---|---|
| P-201 | entiendo inglés pero no puedo hablarlo | A | troubleshooting | **high** |
| P-202 | inglés para la entrevista de ciudadanía (=I-002) | C | how-to | **high** |
| P-203 | inglés para entrevista de trabajo en EE.UU. | C | how-to | **high** |
| P-204 | cómo perder el miedo a hablar inglés | A | how-to | med |
| P-205 | inglés básico para adultos: por dónde empezar (=I-004) | A | how-to | med |
| P-206 | apps para aprender inglés hablando (comparativa honesta) | E | buying guide | med |

### PT-BR (new locale — launch set of 8)

| ID | Keyword / working title | Cluster | Intent | Priority |
|---|---|---|---|---|
| P-301 | como falar inglês com confiança (cornerstone) | A | how-to | **high** |
| P-302 | entendo inglês mas não consigo falar | A | troubleshooting | **high** |
| P-303 | pronúncia de inglês para brasileiros: os erros que entregam o sotaque | B (cornerstone) | list | **high** |
| P-304 | inglês para entrevista de emprego nos EUA | C | how-to | **high** |
| P-305 | inglês para a entrevista de cidadania americana | C | how-to | med |
| P-306 | aulas de inglês ou aplicativo com IA? (custos em dólares) | C (cornerstone) | comparison | med |
| P-307 | aplicativo para treinar conversação em inglês | E | buying guide | med |
| P-308 | quanto tempo para ficar fluente em inglês | A | definition | low |

### RU (new locale — launch set of 8, gated on app ru support)

| ID | Keyword / working title | Cluster | Intent | Priority |
|---|---|---|---|---|
| P-401 | как заговорить по-английски свободно (cornerstone) | A | how-to | **high** |
| P-402 | понимаю английский, но не могу говорить | A | troubleshooting | **high** |
| P-403 | английское произношение для русскоговорящих: акцент и типичные ошибки | B (cornerstone) | list | **high** |
| P-404 | английский для собеседования на работу в США | C | how-to | **high** |
| P-405 | английский для интервью на гражданство США | C | how-to | med |
| P-406 | репетитор или приложение с ИИ: сколько стоит английский в США | C (cornerstone) | comparison | med |
| P-407 | приложение для разговорного английского | E | buying guide | med |
| P-408 | сколько времени нужно, чтобы заговорить на английском | A | definition | low |

Theme counterparts across locales (NOT translations):
P-101↔P-201↔P-302↔P-402 · P-103↔P-202↔P-305↔P-405 · 002↔005↔P-306↔P-406.

## 6. Year-1 extended backlog (months 4–12)

Same pipeline rules. Priorities within each batch get re-ranked by the feedback
loop before writing — a Phase-1 winner promotes its counterparts and siblings.

### EN extended (P-107..P-120)

| ID | Keyword / working title | Cluster |
|---|---|---|
| P-107 | english for healthcare workers: phrases nurses & aides actually use | D |
| P-108 | english for construction workers | D |
| P-109 | english for rideshare & delivery drivers | D |
| P-110 | phone call english: why calls are harder than conversations | D |
| P-111 | small talk at work: scripts that don't feel fake | D |
| P-112 | english for doctor appointments (patient side) | D |
| P-113 | parent-teacher conference english | D |
| P-114 | the TH sound: a fix that actually works | B |
| P-115 | the american R for non-native speakers | B |
| P-116 | ship vs sheep: the vowel pairs that change the word | B |
| P-117 | boldvoice alternatives (honest comparison) | E |
| P-118 | elsa speak alternatives (honest comparison) | E |
| P-119 | how to think in english (stop translating in your head) | A |
| P-120 | DATA REPORT: the hardest english sounds, by native language — from N million per-word scores | B/GEO |

### ES extended (P-207..P-218)

| ID | Keyword / working title | Cluster |
|---|---|---|
| P-207 | inglés para la construcción: frases del sitio de trabajo | D |
| P-208 | inglés para restaurantes y meseros | D |
| P-209 | inglés para limpieza de casas y oficinas | D |
| P-210 | inglés para cuidadores y auxiliares de salud | D |
| P-211 | hablar por teléfono en inglés sin pánico | D |
| P-212 | inglés para ir al médico | D |
| P-213 | inglés para juntas escolares de tus hijos | D |
| P-214 | la TH en inglés para hispanohablantes | B |
| P-215 | la R americana (no es la R española) | B |
| P-216 | beach/bitch, sheet/shit: las vocales que te meten en problemas | B |
| P-217 | cómo pensar en inglés (dejar de traducir) | A |
| P-218 | INFORME: los sonidos más difíciles del inglés para hispanohablantes (datos reales) | B/GEO |

### PT-BR extended (P-309..P-318)

| ID | Keyword / working title | Cluster |
|---|---|---|
| P-309 | inglês para housecleaning: frases do dia a dia do trabalho | D |
| P-310 | inglês para construção nos EUA | D |
| P-311 | inglês para restaurantes | D |
| P-312 | falar inglês ao telefone sem travar | D |
| P-313 | inglês para consulta médica | D |
| P-314 | o TH em inglês para brasileiros | B |
| P-315 | o R americano (não é o R do português) | B |
| P-316 | as vogais que brasileiros trocam (beach/bitch, live/leave) | B |
| P-317 | como pensar em inglês (parar de traduzir de cabeça) | A |
| P-318 | RELATÓRIO: os sons mais difíceis do inglês para brasileiros (dados reais) | B/GEO |

### RU extended (P-409..P-418)

| ID | Keyword / working title | Cluster |
|---|---|---|
| P-409 | английский для дальнобойщиков: требования FMCSA и что учить | D **high** |
| P-410 | английский для собеседования в IT в США | D |
| P-411 | английский для медработников (CNA, caregivers) | D |
| P-412 | телефонный разговор на английском: почему это сложнее всего | D |
| P-413 | английский у врача: фразы пациента | D |
| P-414 | звук TH для русскоговорящих | B |
| P-415 | американское R (это не русское Р) | B |
| P-416 | гласные, которые выдают акцент (ship/sheep, bad/bed) | B |
| P-417 | как начать думать на английском | A |
| P-418 | ОТЧЁТ: самые трудные звуки английского для русскоговорящих (реальные данные) | B/GEO |

### Semrush-sourced additions (from the GTM doc — validated volume/KD)

| ID | Keyword / page | Locale | Cluster | Note |
|---|---|---|---|---|
| P-121 | accent reduction (feature lander /accent-reduction) | en | B | highest-CPC cluster |
| P-122 | pronunciation checker (tool lander) | en | B | tool intent |
| V-001..005 | /vs/ boldvoice, elsa, speak, praktika, talkpal | en | E | near-zero KD, ship early |
| P-219 | cómo pronunciar inglés (words hispanohablantes get wrong) | es | B | Semrush MX |
| P-220 | cómo hablar inglés fluido | es | A | Semrush MX |
| P-319 | como perder o sotaque em inglês | pt | B | Semrush BR |
| P-320 | melhorar pronúncia em inglês | pt | B | Semrush BR |
| P-321 | falar inglês fluente | pt | A | Semrush BR |
| P-322 | curso de inglês com IA (lander /pt/curso-ingles-ia) | pt | C/E | KD 8 |

### The data-report series (P-120/218/318/418) is the Year-1 centerpiece

The backend already stores per-word pronunciation scores by native language —
an asset **no competitor can publish**. One aggregated analysis (anonymized,
aggregate-only) yields four locale-native reports + a PR/backlink hook +
the single most GEO-citable page on the site ("according to Vocele data…").
Ship in Q2–Q3 once enough score volume exists per L1.

## 7. Pipeline adaptation per language (Steps 3–7)

- **Product definition file** (Step 3): one file, one truth — but add a
  `locale_claims` section: which app native-languages are live (blocks RU articles
  from claiming ru support before it ships), prices, learnable-7 list. Versioned
  next to pipeline code, changed in the same commit as product changes.
- **Experience assets** (Step 4): the library needs per-locale assets — screenshots
  of the app in that display language, and first-person material *from that
  speaker's perspective* (e.g., real per-word scores of a Brazilian saying "world",
  a Russian speaker's w/v scores). Every article ships ≥1 asset that a generic AI
  site cannot fake. First-person voice rule applies in all four languages.
- **Anti-slop configs** (Step 6): banned-word lists are per-language config files —
  AI slop patterns differ (es: "sumérgete", "en el mundo actual"; pt: "mergulhe",
  "no mundo de hoje", "desbloqueie"; ru: "погрузитесь", "в современном мире",
  "не секрет, что"). Same versioned-config mechanism, four files.
- **Editing/judge models** (Steps 6–7): judge ≠ writer, as in the guide; judge
  prompts run in the article's language, and the rubric adds one question per
  locale: "does this read like a native speaker wrote it, or like translated
  English?" Translated-sounding structure is the #1 giveaway in ru/pt AI content.
- **External facts** (Step 3): forced web search before any claim about competitor
  pricing, visa/citizenship procedures (USCIS numbers change!), FMCSA rules
  (P-409), or tutor rates. Citizenship/immigration articles get a standing
  disclaimer: language practice, not legal advice.

## 8. Publishing & indexing (Step 8)

Per the guide, on every publish: hero image → **edit 3–5 existing same-locale
cluster pages to link TO the new article** (inbound from crawled pages = fast
indexing) → build → deploy (git push → Vercel) → sitemap ping + IndexNow → GSC
manual indexing request while the site is young → Telegram notification.

New-locale bootstrap order matters: publish the cornerstone (P-301/P-401) first,
then supporting articles each linking up to it and sideways to 2 siblings; add
the locale to `llms.txt` and home-page footer nav in the same deploy so the
cluster is discoverable from day one.

## 9. Off-page: links, PR, lead magnets (Year 1)

A new domain needs inbound authority; the plan is asset-led, not outreach-spam:

- **Data reports (§6)** pitched to immigrant and niche media per locale:
  ForumDaily / RTVI-style outlets (ru), AcheiUSA / Brazilian community media
  (pt-BR), Hispanic outlets + teacher/ESL newsletters (es/en). One report,
  four localized pitches.
- **Lead magnets** per locale, gated by email: the 27 interview phrases
  checklist (P-102 and counterparts), citizenship-interview question audio
  pack, occupational phrase cards (P-409 truck-driver pack is the strongest).
  Builds the email list that de-risks SEO entirely.
- **Accent Test (`/accent-test`) — promoted from "Q3 candidate" to the #1
  priority asset (GTM doc, top move).** BoldVoice proved the playbook; ours is
  multi-language. Free, no signup, shareable results screen that sells the full
  coach. It's simultaneously the tool-page link magnet, the GEO citation hook,
  the short-form CTA ("link in bio: test your accent"), and the lead magnet.
  Needs scoring-API cost gating — spec it as its own doc, but in Phase 0–1,
  not Q3.
- **Reddit + roundups (GEO groundwork):** genuine, non-promotional presence in
  r/languagelearning / r/EnglishLearning (Reddit is the fastest-growing LLM
  citation source, +73% in 2026); pitch inclusion on the mid-tier "best accent
  app" roundup sites that already rank competitors. Later, once there's real
  traction: Wikidata entity (Wikipedia drives ~48% of ChatGPT's top brand
  citations).
- **Short-form loop** (per ASO doc §6 + vidIQ outlier research): accent
  comparison/reveal formats are pulling 12x–277x median engagement right now
  (side-by-side accent comparison, "basic vs native", skit-to-app-demo reveal,
  minimal pairs — exactly our cluster-B article material). Fluently's
  4-account nano-creator squad is the replicable model. Every B/D-cluster
  article is a Reels/Shorts script in its locale; video links to article or
  accent test. Web winners feed ASO/ASA keyword lists (aso-light) and vice
  versa — ASA search-term reports are free keyword research for this backlog.

## 10. GEO layer (Step 10)

Free if Steps 5–6 are followed, per locale:

- 40–60-word quotable short answer at the top of every article, in the article's
  language — AI answers in Spanish/Portuguese/Russian pull Spanish/Portuguese/
  Russian sources; those pools are far shallower than English → easier citations.
- FAQ schema per article; `llms.txt` per-locale article lists.
- Original per-word scoring data (§6 reports) is the disproportionately-cited
  element — unique numbers no other site has.
- **The "best accent app" AI-answer space is winnable now** (GTM research):
  current citations come from competitor blogs ranking themselves #1 and
  mid-tier affiliate roundups — no authoritative outlet has weighed in. Our
  `/vs/` pages with real comparison tables + FAQ schema, the roundup pitches,
  and Reddit presence (§9) target exactly the sources LLMs currently cite.

## 11. Feedback loop (Step 9) + 12-month roadmap

Weekly GSC job, segmented by path prefix (`/`, `/es/`, `/pt/`, `/ru/`):
impressions+low CTR → title/meta rewrite · positions 5–15 → refresh queue ·
zero impressions after 3–4 months → prune/301 to cornerstone · winners →
pattern-extract into that locale's prompts. New locales get a 4–6 month
patience window before pruning. Monthly: cross-locale counterpart check — a
winner in one locale queues its counterparts in the others.

| Phase | When | What | Exit criteria |
|---|---|---|---|
| 0 — infra | wk 1–2 | GSC verify + sitemap submit + request indexing on all 12 live pages; IndexNow; `site-pages.ts` locale-list refactor; hreflang×4; llms.txt sections; per-language slop configs; `locale_claims`; guardrail wording update (§12); homepage identity-terms pass ("ai conversation partner / ai language tutor" leads, accent moves to feature copy); **spec the Accent Test** | all live pages indexed; accent-test spec approved |
| 1 — deepen | wk 2–6 | **Ship EN `/accent-test`** + `/accent-reduction` + `/pronunciation-checker`; EN P-101..106 + ES P-201..206 (≈3/wk); **V-001..005 `/vs/` pages** (near-zero KD — cheapest early wins) | accent test live; 12 articles + 5 vs-pages live |
| 2 — pt-BR | wk 5–9 | `/pt` marketing pages + `/pt/teste-de-sotaque` + `/pt/curso-ingles-ia` + P-301..308 (+P-319..322 as capacity allows — GTM ranks pt-BR the best-ROI secondary market) | /pt indexed, accent test pt live, 8+ articles |
| 3 — ru | wk 8–12 | `/ru` same shape incl. ru accent test — **gated on app ru support**; if it slips, pull P-319..322 + ES P-219/220 forward | /ru indexed, 8 articles live |
| 4 — Q2 (mo 4–6) | | Cluster D wave 1: occupational cornerstones per locale (P-107/207/309/**409**...); sound-series start (TH + R × 4 locales); `/es/test-de-acento`; first lead magnets (interview checklist ×4); first title/meta rewrites from GSC data | 20+ Q2 articles; email capture live; first page-one L1 rankings |
| 5 — Q3 (mo 7–9) | | Data-report series P-120/218/318/418 + media pitches (fed by accent-test score volume); sound-series wave 2 (vowels, stress); locale vs-pages where brand search exists; first refresh wave (positions 5–15) | reports live + ≥5 referring domains; first AI-answer citations in es/pt/ru |
| 6 — Q4 (mo 10–12) | | Cluster D wave 2 (phone/doctor/school across locales); prune/301 pass on 6-month-old zero-impression pages; pattern-extraction pass into pipeline prompts; Wikidata entity if traction supports it; Year-2 backlog research run | ~90–95 pages live across 4 locales |

**KPI ladder:** day 90 — 4 locales indexed, ≥30 articles, first L1 page-one
rankings (P-303/P-403 class), GSC CTR ≥3%. Month 6 — 50+ articles, 100+
clicks/day aggregate, email list started. Month 12 — 85+ articles, 500+
clicks/day aggregate, ≥10 referring domains, AI-answer citations in all 4
languages, ≥1 occupational cluster ranking #1–3 in a non-EN locale.

## 12. Guardrails (restated)

- 7 learnable languages only (es en fr de it pt ja) — ru is a **native/marketing
  locale**, never listed as learnable.
- No 90-day guarantee anywhere until the checkpoint tracker ships.
- Prices $14.99/$29.99/$49.99; tutor anchor $200–320/mo; sell against tutors,
  **never against Duolingo** (cluster E targets BoldVoice/ELSA/Speak brand
  queries only).
- RU content: "русскоязычные", no nationality framing, no politics.
- Citizenship/visa/FMCSA content: practice framing + non-legal-advice
  disclaimer; procedural facts grounded in live search at write time.
- Data reports: aggregate + anonymized only; nothing user-identifiable.
- **Positioning:** homepage/title = "AI conversation partner & coach"; accent
  keywords on feature pages/subtitles/tool funnel only. Every article's product
  section sells the full loop, not accent drills alone.
- **Brand watch:** "Vocali – AI Accent Trainer" (App Store id6746229095) —
  negligible traction today, but trademark-check "Vocele" before heavy paid UA,
  and monitor the brand SERP for confusion.
