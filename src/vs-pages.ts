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
    title: "Praktika Review and Alternative: Vocele vs Praktika",
    description: "Praktika review: 4.7 stars on the App Store, 3.6 on Trustpilot, ~$8 a month. What reviewers praise and flag, and when Vocele is the better pick.",
    datePublished: '2026-09-02',
    dateModified: '2026-10-09',
    faq: [
      { q: "Is Praktika worth it?", a: "For a beginner who wants a guided path and a face to talk to, yes. Reviewers flag rigid learning paths, feedback that's easy to miss and no spaced repetition. If you want to measure your accent or keep the words you learn, look elsewhere." },
      { q: "Is Praktika legit?", a: "Yes. It's a real company with apps on the App Store and Google Play and a web version. Its App Store rating is 4.7 from about 165,000 ratings. Many Trustpilot complaints are about billing after the trial and refunds, so read the plan terms before you start the trial." },
      { q: "Is Praktika better than Vocele?", a: "More languages, avatars and a lower price on Praktika's side; spaced-repetition words, per-word accent history and in-sentence corrections on Vocele's." },
      { q: "How much does Praktika cost in 2026?", a: "Praktika's site quotes about $8 a month. The US App Store lists Premium plans from $6.99 to $139.99, including a $9.99 one-month option, but LanguaTalk and PracticeMe both say the app itself only offered 3-month and annual plans. Prices vary by country." },
      { q: "Does Vocele have avatars like Praktika?", a: "No. Vocele's coaches are voices with names, without animated faces. If a face helps you talk, Praktika is the better fit." },
      { q: "Which languages does each app teach?", a: "Praktika: English, Spanish, French, German, Italian, Portuguese (European and Brazilian), Japanese, Korean, Chinese, Arabic, Russian, Polish and Dutch. Vocele: Spanish, English, French, German, Italian, Portuguese, Japanese, Russian and Polish." },
    ],
  },
  {
    slug: 'fluently',
    competitor: 'Fluently',
    title: "Vocele vs Fluently: Which AI Speaking Coach Fits You",
    description: "Fluently coaches English for work calls from $24.99/mo. Vocele coaches 9 languages with per-word accent scores and in-sentence corrections. Which fits you.",
    datePublished: '2026-09-02',
    faq: [
      { q: "Is Fluently only for English?", a: "In practice, yes. Fluently's site and every review treat it as an English coach for professionals. Its App Store listing now also names French, Japanese, Portuguese and Spanish. Vocele teaches nine languages." },
      { q: "How much does Fluently cost?", a: "The App Store lists $24.99 a month, $44.99 to $89.99 for three months and $89.99 to $179.99 a year, with weekly plans from $4.99. Call analysis and a Workplace English Course are paid separately. Prices vary by region." },
      { q: "Does Vocele have anything like Fluently's real-call feedback?", a: "No. Vocele doesn't listen to or grade real meetings. Its feedback comes from conversations with the coaches and from scored accent practice." },
      { q: "Which app is better for beginners?", a: "Vocele. Fluently's scenarios and its C1 goal assume you can already hold a conversation. Vocele has a full-scaffolding mode that helps you build each sentence." },
      { q: "Does either of them have streaks or games?", a: "Both. Fluently added games you compete and score in. Vocele has streaks, friends-only duels and leaderboards, with no guilt notifications or streak punishments." },
      { q: "Is Vocele on Android?", a: "No. Vocele is iPhone only (iOS 17+). Fluently runs on iOS and Android." },
    ],
  },
  {
    slug: 'talkpal',
    competitor: 'TalkPal',
    title: "TalkPal Alternative? Vocele vs TalkPal, Compared Honestly",
    description: "TalkPal alternative, compared: TalkPal has 130+ languages and roleplays. Vocele has spaced-repetition words, per-sound accent history and in-sentence fixes.",
    datePublished: '2026-09-23',
    faq: [
      { q: "Is TalkPal worth paying for?", a: "If you want many conversation modes and a language most apps don't cover, yes. LanguaTalk rated it 3 out of 5, citing shallow content at higher levels, no spaced repetition and pronunciation feedback without actionable guidance. Try the 14-day trial before paying." },
      { q: "How much does TalkPal cost in 2026?", a: "The US App Store lists Premium at $19.99 for one month, $49.99 for three months and $119.99 for a year, with a 14-day free trial. Reviewers have seen $59.88 to $89.99 a year on promotional or regional pricing. Prices vary by country." },
      { q: "Is TalkPal free?", a: "Partly. The free plan allows 10 minutes of practice a day. Vocele's free tier includes word sets, stories, reviews and grammar without metering, but only a one-time 5 minutes of conversation." },
      { q: "Does TalkPal have pronunciation scoring?", a: "Yes, color-coded per word. Vocele also scores each word, then names the sound behind the score, suggests phrase drills and charts that sound over weeks." },
      { q: "Which languages does Vocele teach?", a: "Spanish, English, French, German, Italian, Portuguese, Japanese, Russian and Polish. TalkPal lists more than 130." },
      { q: "Is Vocele on Android or the web?", a: "No. Vocele is iPhone only (iOS 17 or later). TalkPal runs on iOS, Android and the web." },
    ],
  },
];

export const vsBySlug = (slug: string): VsPage => {
  const page = VS_PAGES.find((p) => p.slug === slug);
  if (!page) throw new Error(`vs-pages.ts: no entry for slug "${slug}" — register it`);
  return page;
};
