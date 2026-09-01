// Manifest for /vs/<competitor> comparison pages (EN-only, self-canonical).
// Consumed by src/site-pages.ts (sitemap) and src/layouts/VsLayout.astro.
// Register a page here AND create src/pages/vs/<slug>.astro; one without the
// other is either invisible to crawlers or a build error.

export interface VsPage {
  slug: string;
  competitor: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  /** Rendered as <details> and emitted as FAQPage schema — one array, two uses. */
  faq: { q: string; a: string }[];
}

export const VS_PAGES: VsPage[] = [
  {
    slug: 'praktika',
    competitor: 'Praktika',
    title: "Praktika Alternative? Vocele vs Praktika, Compared Honestly",
    description: "Praktika alternative, compared: Praktika has 12 languages, avatars and ~$8/mo. Vocele has spaced-repetition vocabulary, stories, per-word accent scores and in-sentence fixes.",
    datePublished: '2026-09-02',
    faq: [
      { q: "Is Praktika better than Vocele?", a: "Praktika has more languages, animated avatars and a lower price. Vocele has the learning system around the conversation: spaced-repetition vocabulary, stories answered aloud, grammar in your own language, per-word pronunciation tracked over time and corrections inside your own sentences. Different strengths." },
      { q: "How much does Praktika cost in 2026?", a: "Praktika's site quotes around $8 a month on the annual plan. The App Store lists $9.99 for one month, $49.99 for three months and $119.99 to $139.99 for a year. Reviewers report only the 3-month and annual plans are offered inside the app. Prices vary by country." },
      { q: "Does Vocele have avatars like Praktika?", a: "No. Vocele's coaches are voices with names, without animated faces. If a face helps you talk, Praktika is the better fit." },
      { q: "Which languages does each app teach?", a: "Praktika: English, Spanish, Japanese, Korean, French, German, Italian, Portuguese (European and Brazilian), Russian, Chinese and Arabic. Vocele: Spanish, English, French, German, Italian, Portuguese and Japanese." },
      { q: "Is Vocele available on Android?", a: "No. Vocele is iPhone only (iOS 17 or later). Praktika runs on iOS, Android and the web." },
      { q: "Can I use either app to prepare for IELTS or TOEFL?", a: "Praktika has dedicated IELTS and TOEFL lessons in its library. Vocele has no exam course, but its scored speaking practice maps to the speaking sections; see the <a href=\"/blog/ielts-toefl-speaking-practice-ai\">IELTS and TOEFL speaking guide</a>." },
    ],
  },
  {
    slug: 'fluently',
    competitor: 'Fluently',
    title: "Vocele vs Fluently: Which AI Speaking Coach Fits You",
    description: "Fluently coaches English for work calls from $24.99/mo. Vocele coaches 7 languages with per-word accent scores and in-sentence corrections. Which fits you.",
    datePublished: '2026-09-02',
    faq: [
      { q: "Is Fluently only for English?", a: "In practice, yes. Fluently's site and every review treat it as an English coach for professionals. Its App Store listing now also names French, Japanese, Portuguese and Spanish. Vocele teaches seven languages." },
      { q: "How much does Fluently cost?", a: "The App Store lists $24.99 a month, $44.99 to $89.99 for three months and $89.99 to $179.99 a year, with weekly plans from $4.99. Call analysis and a Workplace English Course are paid separately. Prices vary by region." },
      { q: "Does Vocele have anything like Fluently's real-call feedback?", a: "No. Vocele doesn't listen to or grade real meetings. Its feedback comes from conversations with the coaches and from scored accent practice." },
      { q: "Which app is better for beginners?", a: "Vocele. Fluently's scenarios and its C1 goal assume you can already hold a conversation. Vocele has a full-scaffolding mode that helps you build each sentence." },
      { q: "Does either of them have streaks or games?", a: "Both. Fluently added games you compete and score in. Vocele has streaks, friends-only duels and leaderboards, with no guilt notifications or streak punishments." },
      { q: "Is Vocele on Android?", a: "No. Vocele is iPhone only (iOS 17+). Fluently runs on iOS and Android." },
    ],
  },
];

export const vsBySlug = (slug: string): VsPage => {
  const page = VS_PAGES.find((p) => p.slug === slug);
  if (!page) throw new Error(`vs-pages.ts: no entry for slug "${slug}" — register it`);
  return page;
};
