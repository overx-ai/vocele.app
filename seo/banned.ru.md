# Russian anti-slop patterns

Loaded in Step 6 alongside seo/banned.md. Add one line per new pattern.

## Hype words
уникальный, инновационный, революционный, передовой, идеальный, волшебный, секрет успеха, лайфхак, раскройте потенциал, откройте для себя, погрузитесь, прокачайте, выведите на новый уровень, без усилий, легко и просто, ключевой (as filler), эффективный (as filler), мощный (as filler), путешествие (as metaphor), экосистема (unless literal)

## Empty and bureaucratic phrases
в современном мире, в наше время, ни для кого не секрет, важно отметить, стоит отметить, следует отметить, необходимо подчеркнуть, давайте разберёмся, давайте рассмотрим, в данной статье, в заключение, подводя итог, таким образом (as an opener), кроме того (stacked), более того, играет важную роль, является (where a dash-free rewrite is possible), осуществлять, данный (for этот), на самом деле (as filler)

## Calques from English
хорошая новость в том, плохая новость, в конце дня, на ежедневной основе, делать разницу, иметь смысл (for "make sense"), это про (for "it's about"), быть уверенным в том, что (for "make sure"), инсайт, вовлечённость, в этом руководстве, как насчёт, "вы не одиноки", "вы не один", возможность + инфинитив stacked, английский порядок слов с подлежащим в начале каждой фразы

## Fake hooks
"Знакомо?", "Узнали себя?", "Хотите узнать как?", "А что, если...", "Устали от...?", opening a section with a question the next line answers

## Constructions
- "Не X, а Y" and "дело не в X, а в Y": state Y directly.
- Em dash (U+2014) is banned site-wide, and Russian normally needs one in "X это Y" and in noun-noun definitions. Do not just delete it, which leaves a punctuation error. Rewrite with a colon, a verb ("звучит как", "работает как") or a new sentence. Spotted 2026-11-04.
- Three short declaratives in a row with the same subject "вы": vary the opening.

## Register
- Address the reader as "вы", lowercase, matching src/i18n/ru.ts.
- ИИ-тренер, тариф, разговор: terms as in src/i18n/ru.ts. Coach names stay Latin: Luna, Lorenzo.
- Keep ё, as the site does.

## Fence
- Write "русскоязычные". No nationality words in published copy, including "русский акцент" and "русский человек". "В русском" for the language is fine. No politics.
- безлимит, неограниченный, без ограничений: never about a plan (tests/site.test.js fails the build).
- Prices and tutor range: import from src/data/prices.ts, minutes from src/data/facts.ts. Never typed by hand.
- Scoring vendor, AI vendors and models are never named (scripts/check-legal.mjs).
