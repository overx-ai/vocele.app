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
    title: "Praktika App Review 2026: Is It Good, and Who It's For",
    description: "Praktika app review: 4.7 stars from 167K App Store ratings, 3.8 on Trustpilot, a $9.99 monthly plan. Who it suits, and when Vocele fits better.",
    datePublished: '2026-09-02',
    dateModified: '2026-11-02',
    faq: [
      { q: "Is Praktika good?", a: "For a beginner who wants a guided course and a tutor with a face, yes. Reviewers praise natural conversations and patient tutors. They flag trial billing, rigid learning paths, corrections that are easy to miss and no spaced repetition. If you want to measure your accent or keep the words you learn, look elsewhere." },
      { q: "Is Praktika legit?", a: "Yes. It's an established app on the App Store, Google Play and the web, rated 4.7 from about 167,000 App Store ratings and 3.8 from 1,701 Trustpilot reviews. The most common Trustpilot complaint is a plan renewing after the trial, so check what the trial converts into before you start it." },
      { q: "How much does Praktika cost in 2026?", a: "Praktika's site says about $8 a month, which matches an annual plan. The US App Store lists Premium from $6.99 to $139.99, including a $9.99 one-month plan, $49.99 for three months and annual plans at $49.99, $119.99 and $139.99. Prices vary by country." },
      { q: "Is Praktika better than Vocele?", a: "Praktika has more languages, animated tutors, Android and web apps and a lower price. Vocele has spaced-repetition vocabulary, per-word accent scores with history and corrections inside your own sentence." },
      { q: "Does Vocele have avatars like Praktika?", a: "No. Vocele's coaches are voices with names, without animated faces. If a face helps you talk, Praktika is the better fit." },
      { q: "Which languages does each app teach?", a: "Praktika: English, Spanish, French, German, Italian, Portuguese (European and Brazilian), Japanese, Korean, Chinese, Arabic, Russian, Polish and Dutch. Vocele: Spanish, English, French, German, Italian, Portuguese, Japanese, Russian and Polish." },
    ],
  },
  {
    slug: 'fluently',
    competitor: 'Fluently',
    title: "Fluently Price 2026: Plans, Free Version and Weekly Limit",
    description: "Fluently costs $24.99 a month or $89.99 to $179.99 a year in the US. What's free, the 100-minute weekly cap, and when Vocele fits better.",
    datePublished: '2026-09-02',
    dateModified: '2026-11-26',
    faq: [
      { q: "How much does Fluently cost?", a: "On the US App Store: $24.99 a month, $44.99 or $89.99 for three months, $89.99 or $179.99 a year, and weekly plans at $9.99 or $19.99. A Workplace English course is $19.99 extra. Prices vary by country and offer, and appear after sign-up." },
      { q: "Is the Fluently app free?", a: "No. The level assessment, its results and some practice games are free, but conversations with the AI tutor need Premium. Fluently says some offers include a 7-day trial. Vocele's free accounts can try the app with limited access; what's included is shown in the app." },
      { q: "Does Fluently have a time limit?", a: "Yes. In its replies on Google Play, Fluently says Premium includes 100 speaking minutes a week, available again after the weekly reset, and that Pro is an optional upgrade without the weekly cap. Vocele states its monthly conversation and pronunciation minutes for each plan on the pricing page." },
      { q: "Can I get a refund from Fluently?", a: "Fluently's November 2026 replies on Google Play say refunds can be requested within 30 days for web purchases or 7 days on Google Play, if you've spoken for less than 15 minutes. App Store purchases are refunded through Apple." },
      { q: "Is Fluently only for English?", a: "No. Its About page lists 22 languages, though its homepage still sells it as a work-English coach. Vocele teaches nine languages." },
      { q: "Is Vocele on Android?", a: "No. Vocele is iPhone only (iOS 17+) and not on the App Store yet. Fluently runs on iPhone and Android." },
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
  {
    slug: 'speak',
    competitor: 'Speak',
    title: "Speak App Alternative? Vocele vs Speak, Compared Honestly",
    description: "Speak app alternative, compared: Speak is the polished beginner course. Vocele adds open conversation, in-sentence corrections and words that come back.",
    datePublished: '2026-10-24',
    faq: [
      { q: "Is the Speak app worth it?", a: "For a beginner who wants a guided course, yes. Reviewers praise its polish and structure. They also report lenient scoring, brief feedback and a ceiling at intermediate level, so if you're past the basics, use the 7-day trial to check whether the lessons still stretch you." },
      { q: "Is there a free version of Speak?", a: "Not for daily practice. Headway's review says Speak has no ongoing free tier and offers a 7-day trial of Premium. Vocele's free accounts can try the app with limited access; what's included is shown in the app." },
      { q: "Does Speak use spaced repetition?", a: "Reviewers disagree. LanguaTalk found no spaced repetition or long-term vocabulary tracking; Headway describes a Smart Review that brings weak words back over time. Speak's site lists personalized review in Premium Plus. Vocele reviews saved words on a spaced-repetition schedule in six modes." },
      { q: "Is Speak good for intermediate learners?", a: "Less so. Headway lists a ceiling for intermediate and advanced learners as a con, and LanguaTalk found tutor lessons and vocab builders almost absent at those levels. Vocele's conversation has no lesson script to finish; you pick how much help you get." },
      { q: "What languages does Speak teach?", a: "Speak's site lists Spanish, French, Korean, Japanese, Italian and Chinese for English speakers, and its App Store listing adds English. Vocele teaches Spanish, English, French, German, Italian, Portuguese, Japanese, Russian and Polish." },
      { q: "Is Vocele on Android?", a: "No. Vocele is iPhone only (iOS 17 or later) and not on the App Store yet. Speak runs on iPhone, Android and the web." },
    ],
  },
  {
    slug: 'elsa',
    competitor: 'ELSA Speak',
    title: "ELSA Speak Alternative? An Honest Vocele vs ELSA Comparison",
    description: "ELSA Speak alternative, compared: ELSA is the deeper English pronunciation drill. Vocele adds coached conversation, saved words and 9 languages.",
    datePublished: '2026-10-23',
    faq: [
      { q: "Is ELSA Speak worth it in 2026?", a: "For English pronunciation, yes. Reviewers, including rival apps, rate its phoneme-level feedback highly, and it now adds role-plays and a Speech Analyzer. It's weaker on grammar and vocabulary, teaches only English, and its pricing is hard to compare, so read the plan before the 7-day trial ends." },
      { q: "Is ELSA Speak free?", a: "Partly. ELSA's free plan includes the Speech Analyzer with test-score predictions, but reviewers say most lessons are locked, and exam preparation needs Premium. Vocele's free accounts can try the app with limited access; what's included is shown in the app." },
      { q: "How much does ELSA Speak cost?", a: "The US App Store lists $19.99 a month, three-month plans from $39.99 to $52.00 and yearly plans from $71.00 to $129.99. Headway saw yearly Pro, Premium and Professional plans at $89.99, $99.99 and $159.99 in October 2026. Prices vary by region and promotion." },
      { q: "Does ELSA Speak support British English?", a: "Yes. Its current App Store listing offers American, British and Australian accents as targets. FluentU's 2024 review described it as American English only, which is out of date." },
      { q: "Is there an ELSA alternative for languages other than English?", a: "Yes. ELSA teaches only English. Vocele teaches Spanish, English, French, German, Italian, Portuguese, Japanese, Russian and Polish." },
      { q: "Is Vocele on Android?", a: "No. Vocele is iPhone only (iOS 17 or later). ELSA runs on iPhone, iPad and Android." },
    ],
  },
  {
    slug: 'boldvoice',
    competitor: 'BoldVoice',
    title: "BoldVoice Alternative? Vocele vs BoldVoice, Compared Honestly",
    description: "BoldVoice alternative, compared: BoldVoice is the American accent specialist. Vocele trains your accent inside real conversation and teaches 9 languages.",
    datePublished: '2026-10-26',
    faq: [
      { q: "Is BoldVoice worth it?", a: "If your English is already strong and you want an American accent, yes. Reviewers praise its coach videos and sensitive scoring. One review says it isn't built for people still learning English, and some users report scores that misfire, so use the 7-day trial to check it on your own voice." },
      { q: "Is BoldVoice only for American English?", a: "Its site calls it an American accent training app and doesn't list a British or other target accent. Vocele scores pronunciation word by word inside its conversations and drills, and teaches nine languages." },
      { q: "Does BoldVoice have conversation practice?", a: "Yes, its App Store listing names an AI chat partner and scenarios for meetings, interviews and exams. In Vocele, conversation is the main exercise, and you can check pronunciation on any spoken turn." },
      { q: "Is there a BoldVoice alternative for other languages?", a: "Yes. BoldVoice teaches English only. Vocele teaches Spanish, English, French, German, Italian, Portuguese, Japanese, Russian and Polish." },
      { q: "Does Vocele have video lessons like BoldVoice?", a: "No. Vocele has no coach videos or mouth diagrams. Its pronunciation work is per-word scoring, sound-level diagnosis, phrase drills and a score history over weeks." },
      { q: "Is Vocele on Android?", a: "No. Vocele is iPhone only (iOS 17 or later) and not on the App Store yet. BoldVoice runs on iPhone, iPad and Android." },
    ],
  },
];

export const vsBySlug = (slug: string): VsPage => {
  const page = VS_PAGES.find((p) => p.slug === slug);
  if (!page) throw new Error(`vs-pages.ts: no entry for slug "${slug}" — register it`);
  return page;
};
