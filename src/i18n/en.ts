// The copy shape: every other src/i18n/<code>.ts is `const x: Copy`, so a missing key, an extra key or a list of the
// wrong length fails `astro check`. Text only: colours, images and order live in src/views.
//
// [before, emphasis, after] tuples are headlines; the middle part gets the gradient and any part may be ''.
// Write prices, allowances and internal links as placeholders, never as literals. An unknown one fails the build:
//   {corePrice} {fluencyPrice} {metaPrice}  {tutorRange} {tutorLow} {tutorHigh}  {pricingHref} {fairUseHref}
//   {coreTalk} {corePron} {coreWords} {corePdf}, and the same four for fluency and meta
// Keys named *Html, `features`, `notes`, `compareLinks`, faq `a` and fair-use `heading`/`content`/`note` are HTML.
const en = {
  skipLink: 'Skip to content',
  ogImageAlt: 'Vocele — AI Language Coach',
  meetVocele: 'Meet Vocele',
  nav: {
    home: 'Home',
    pricing: 'Pricing',
    faq: 'FAQ',
    blog: 'Blog',
    fairUse: 'Fair use',
    privacy: 'Privacy',
    terms: 'Terms',
    getApp: 'Get the App',
    logoLabel: 'Vocele home',
    primaryLabel: 'Primary',
    footerLabel: 'Footer',
    breadcrumbLabel: 'Breadcrumb',
    switchLanguage: 'Switch language',
  },
  badge: { line1: 'Download on the' },
  consent: {
    label: 'Cookie choice',
    text: "We'd like to measure visits to improve this site. Nothing is measured unless you accept.",
    accept: 'Accept',
    reject: 'Reject',
    privacy: 'Privacy',
    settings: 'Cookie settings',
  },
  legal: { eyebrow: 'Legal', effective: 'Effective', updated: 'Last updated' },
  article: {
    faqHeading: 'Frequently asked questions',
    founderOf: ['founder of ', ''],
    updated: 'Updated',
    ctaTitle: ['Coming soon to iPhone: your ', 'AI coach.', ''],
    ctaBody: "Vocele isn't on the App Store yet. When it launches, it will correct your spoken sentences and train your accent, word by word.",
  },
  home: {
    meta: {
      title: 'Vocele: AI Language Tutor',
      description:
        'Learn English, Spanish, French, German, Italian, Portuguese, Japanese, Russian, or Polish with an AI coach that corrects your speech in real time and trains your accent. Built for the confidence you need in a new country.',
      appDescription:
        'AI language coaching app that teaches Spanish, English, French, German, Italian, Portuguese, Japanese, Russian, and Polish through real conversation practice, instant correction, and accent coaching.',
    },
    eyebrow: 'Vocele — The AI Language Coach',
    heroLines: ['The words', 'you know.'],
    heroEmphasis: 'Finally, out\u00a0loud.',
    lead: "Real-time speech correction. Accent training that scores every word. And rehearsal for the exact conversation you're dreading — until it isn't scary anymore.",
    chat: {
      live: '● live session',
      question: 'Tell me about your last job interview.',
      fixLabel: 'Coach fix',
      tryLabel: 'Try:',
      holdToSpeak: 'Hold to speak…',
    },
    scenarios: [
      'The job interview',
      'The team meeting',
      'The parent-teacher conference',
      "The doctor's visit",
      'The apartment viewing',
      'The salary negotiation',
    ],
    modules: {
      talk: { name: 'Conversation', desc: 'Talk with Luna or Lorenzo in three modes — no script, no scheduling, no judgment.' },
      accent: { name: 'Accent', desc: 'Per-word pronunciation scoring — see exactly which sounds hold you back, and watch them improve.' },
      learn: { name: 'Correction', desc: 'Mistakes highlighted in the sentence you actually said, with the fix right beneath — patterns, not red ink.' },
      read: { name: 'Reading', desc: 'Short stories generated at your exact level — always just hard enough to grow.' },
      grammar: { name: 'Grammar', desc: "Spaced repetition brings rules back right before you'd forget them." },
      sets: { name: 'Word sets', desc: 'Vocabulary built around real situations — job interviews, doctor visits — not random flashcards.' },
    },
    proof: {
      title: ["You don't have a talent problem. You have a ", 'practice problem.', ''],
      copy: 'Fluency isn\'t something you either have or don\'t — it\'s a trained skill, like an accent, a golf swing, or a musical ear. Vocele gives you the one thing a classroom never can: daily, judgment-free repetition on your own schedule, with a coach that tells you exactly what to fix, every single time you speak.',
      stats: { languages: 'languages', modes: 'modes', schedule: 'no scheduling' },
    },
    coaches: {
      luna: {
        alt: 'Luna, Conversation Coach — AI coach in Vocele',
        role: 'Conversation Coach',
        desc: 'Warm, curious, and relentlessly encouraging — Luna is who you talk to when you want to just speak and build momentum.',
      },
      lorenzo: {
        alt: 'Lorenzo, Structure Coach — AI coach in Vocele',
        role: 'Structure Coach',
        desc: 'Precise and direct — Lorenzo is who you talk to when you want the grammar, the vocabulary, and the correction spelled out.',
      },
    },
    languagesTitle: ['One coach.', 'Nine languages.'],
    languagesSub: 'Learn any of them from any language you already speak.',
    languages: {
      english: 'English',
      spanish: 'Spanish',
      french: 'French',
      german: 'German',
      italian: 'Italian',
      portuguese: 'Portuguese',
      japanese: 'Japanese',
      russian: 'Russian',
      polish: 'Polish',
    },
    topicsTitle: 'Vocabulary for the moments that matter',
    topicsSub: 'Word sets built around real situations — not random flashcards.',
    topics: {
      work: { label: 'Work & Office', alt: 'Work and office vocabulary set' },
      business: { label: 'Business & Finance', alt: 'Business and finance vocabulary set' },
      restaurant: { label: 'Restaurant & Dining', alt: 'Restaurant and dining vocabulary set' },
      travel: { label: 'Travel & Transport', alt: 'Travel and transport vocabulary set' },
      city: { label: 'City & Places', alt: 'City and places vocabulary set' },
      school: { label: 'School & Education', alt: 'School and education vocabulary set' },
    },
    ctaTitle: ['The English you need for the life you came here to ', 'build.', ''],
    ctaSub: 'Start today. Your first conversation is free.',
  },
  pricing: {
    meta: {
      title: 'Pricing',
      description:
        'Vocele pricing: Core {corePrice}/mo, Fluency {fluencyPrice}/mo, and Meta {metaPrice}/mo — an AI language coach priced against private tutoring ($200-320/mo), not against free apps.',
    },
    eyebrow: 'Pricing',
    title: ['Cheaper than a ', 'tutor.', ' Built to actually work.'],
    lead: 'A private tutor twice a week runs {tutorRange}/month. Vocele gives you daily practice, on your schedule, for a fraction of that — pick the depth you need.',
    period: '/ month',
    popular: '★ Most Popular',
    plans: {
      core: {
        tagline: 'Never miss your daily practice.',
        cta: 'Start with Core',
        features: [
          '{coreTalk} minutes of AI conversation a month',
          '{corePron} minutes of pronunciation scoring a month',
          '{coreWords} saved words',
          'Daily conversation practice with Luna &amp; Lorenzo',
          'Streaks &amp; progress charts',
          'Standard voice playback',
        ],
      },
      fluency: {
        tagline: "Prove to yourself you're improving.",
        cta: 'Start with Fluency',
        features: [
          '<strong>Everything in Core</strong>',
          '{fluencyTalk} minutes of AI conversation a month, any mode',
          '{fluencyPron} minutes of pronunciation scoring a month',
          '{fluencyWords} saved words',
          'Personalized reading at your level',
          'Premium natural voices',
          'Adaptive learning plan',
        ],
      },
      meta: {
        tagline: 'Become who you came here to be.',
        cta: 'Start with Meta',
        features: [
          '<strong>Everything in Fluency</strong>',
          '{metaTalk} minutes of AI conversation a month',
          '{metaPron} minutes of pronunciation scoring a month',
          '{metaWords} saved words',
          '{metaPdf} PDF imports a month',
          'Up to 5 languages at once',
        ],
      },
    },
    notes: [
      'All plans billed monthly, cancel anytime · Annual plans available in the app at a discount',
      'Conversation minutes and pronunciation checks are metered. <a href="{fairUseHref}">See exactly what each plan includes</a> — we do not sell anything as unlimited.',
    ],
    anchorTitle: ["Why {metaPrice} still isn't the ", 'expensive', ' option'],
    compareLinks:
      'Comparing AI coaches instead? <a href="/vs/praktika">Vocele vs Praktika</a> · <a href="/vs/fluently">Vocele vs Fluently</a> · <a href="/vs/talkpal">Vocele vs TalkPal</a>',
    perMonth: '/mo',
    tutor: {
      label: 'Private tutor, 2×/week',
      copy: "Scheduled, limited to your tutor's availability, no correction outside the lesson.",
    },
    vocele: {
      label: 'Vocele Meta',
      copy: 'Daily practice, any time, plus a roadmap built around the one conversation that actually matters to you.',
    },
  },
  faq: {
    meta: {
      title: 'FAQ',
      description:
        'Answers to common questions about Vocele: which languages it teaches, how it compares to a private tutor, pricing tiers, and how the AI coaches Luna and Lorenzo work.',
    },
    eyebrow: 'FAQ',
    title: ['Questions, ', 'answered.', ''],
    items: [
      {
        q: 'Is Vocele only for learning English?',
        a: 'No. Vocele teaches nine languages today — Spanish, English, French, German, Italian, Portuguese, Japanese, Russian, and Polish — and you can learn any of them regardless of which language you already speak. English is our most popular course, but it is not the only one.',
      },
      {
        q: 'How does Vocele compare to a private tutor?',
        a: 'A private tutor twice a week runs {tutorRange} a month, and the correction stops when the lesson ends. Vocele is built around <strong>speaking every day</strong>: an AI coach that corrects your actual sentences in real time, scores your pronunciation word by word, and builds reading and vocabulary around scenarios you\'ll actually face, like job interviews or a doctor\'s visit. See the full <a href="/blog/ai-speaking-coach-vs-human-tutor">AI coach vs. human tutor comparison</a>, or compare Vocele with <a href="/vs/praktika">Praktika</a> and <a href="/vs/fluently">Fluently</a>.',
      },
      {
        q: 'Who are Luna and Lorenzo?',
        a: 'Luna and Lorenzo are your two AI coaches inside the app. Luna focuses on warm, free-flowing conversation practice. Lorenzo focuses on structure — grammar, vocabulary, and precise correction. You can talk to either one depending on what you need that day.',
      },
      {
        q: 'Do I need any prior level to start?',
        a: "No. Vocele adapts conversation difficulty, reading level, and vocabulary to wherever you're starting from, whether that's complete beginner or already conversational and looking to polish your accent.",
      },
      {
        q: 'Is there a free version?',
        a: 'Yes. Free accounts can try the app with limited access, and the app shows what is included. Speaking with the coach every day is what the paid plans are for — the <a href="{fairUseHref}">usage page</a> lists exactly what each one includes.',
      },
      {
        q: "What's the difference between the three pricing tiers?",
        a: 'Core gives you {coreTalk} minutes of AI conversation and {corePron} minutes of per-word pronunciation scoring a month, {coreWords} saved words, and unmetered word sets, stories and reviews. Fluency doubles both to {fluencyTalk} and {fluencyPron} minutes a month, raises the vocabulary limit to {fluencyWords} words and adds personalized reading. Meta doubles Fluency again to {metaTalk} and {metaPron} minutes a month, with {metaWords} saved words and up to five languages at once. See the <a href="{pricingHref}">pricing page</a> for full details.',
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes. All plans are billed monthly (or annually at a discount) through the App Store and can be cancelled anytime from your device settings.',
      },
      {
        q: 'Does Vocele work offline?',
        a: 'Vocele needs an internet connection for AI conversation practice and pronunciation scoring, since these run through cloud-based speech models. Vocabulary review and previously downloaded content can work with a limited connection.',
      },
      {
        q: 'What devices does Vocele support?',
        a: 'Vocele is currently available for iPhone, running iOS 17 or later.',
      },
    ],
    ctaTitle: ['Still wondering? Ask your coach ', 'in person.', ''],
  },
  blog: {
    meta: {
      title: 'Blog',
      description:
        'Practical guides on speaking English and other languages with confidence: accent training, AI coaching vs. tutors, and exam speaking practice.',
    },
    eyebrow: 'The Vocele Blog',
    title: ['Guides for ', 'speaking,', ' not just studying'],
    lead: 'Practical, honest articles on accent training, AI coaching, and speaking under pressure.',
    empty: 'The first guides are on their way.',
    ctaTitle: ["Reading about speaking won't make you ", 'speak.', ''],
  },
  fairUse: {
    pageTitle: 'Usage & Fair Use',
    heading: 'Usage &amp; fair use',
    description:
      'Exactly how many conversation minutes and pronunciation minutes each Vocele plan includes, what happens when you reach them, and what counts as fair use.',
    summaryHtml:
      '<strong>We do not sell anything as unlimited.</strong> Speaking with an AI coach costs real money to run, so every plan includes a stated amount of it. We would rather print the number than hide a cap behind a word. This page is the number, in full, before you pay for anything.',
    table: {
      talk: 'Conversation',
      pron: 'Pronunciation practice',
      vocab: 'Saved vocabulary',
      pdf: 'PDF imports',
      rest: 'Word sets, stories, reviews, grammar',
      day: 'min a day',
      month: 'a month',
      words: 'words',
      included: 'Included',
    },
    sections: {
      metered: {
        title: 'What is metered, and what is not',
        content: `
        <p><strong>Metered:</strong> spoken conversation with your AI coach, and pronunciation scoring. These are the
        two things that run live AI on every use.</p>
        <p><strong>Not metered:</strong> word sets, stories, listening, reviews, grammar, writing exercises,
        translations of words you look up, your vocabulary and your whole progress history. They are included in your
        plan and do not consume conversation minutes, however much you use them. Saved vocabulary has a storage limit,
        listed below.</p>
        <p>A typed turn in a conversation is cheaper to run than a spoken one, and is charged as roughly eight seconds
        of conversation rather than as speaking time.</p>`,
      },
      plans: {
        title: 'What each plan includes',
        note: `
        <p class="table-note">Core is also sold weekly: that plan grants the same monthly amounts across a cycle,
        weighted towards the first week. An annual plan grants its twelve months together. The figures shown in the app
        for your own plan are the ones that apply, and they are shown before you pay.</p>
        <p>Free accounts can try the app with limited access; what's included is shown in the app.</p>`,
      },
      arrival: {
        title: 'How minutes arrive',
        content: `
        <p>A monthly plan grants its whole allowance when you subscribe, and again at each renewal. The weekly Core plan
        spreads the same monthly amounts across a cycle, weighted towards the first week, so a week of it and a quarter
        of a month come to the same thing. An annual plan grants its twelve months together.</p>
        <p>Unused minutes carry over, and we never sweep them. What is capped is the balance you can hold at once: two
        months' worth on a monthly or weekly plan, and on an annual plan the twelve months you bought.</p>`,
      },
      limit: {
        title: 'What happens when you reach the limit',
        content: `
        <p>The exercise you are in the middle of finishes: we never cut you off mid-sentence. New spoken exercises then
        pause until your next instalment, and the app tells you exactly when that is. <strong>Everything that is not
        metered stays open</strong>: you can keep reading, listening, reviewing and building vocabulary.</p>
        <p>If you want to keep speaking sooner, you can move to a larger plan. That is never required, and nothing is
        ever charged automatically because you ran out.</p>`,
      },
      'fair-use': {
        title: 'Fair use',
        content: `
        <p>Practising a lot is not misuse. Your allowance is what your plan is for, and using all of it, every day, is
        ordinary use. It will never on its own cause us to limit or close your account.</p>
        <p>Fair use is about something else: one person, one account, used through the app. It means not sharing your
        account or your sign-in with anyone, not reselling access, not using scripts or automated tools, and not
        sending more requests than a person could reasonably produce using the app as designed. Those are set out in
        the <a href="/terms#acceptable-use">acceptable-use section of the Terms of Service</a>, and they are the only
        usage-related grounds on which we would act against an account.</p>
        <p>Separately, we may queue or slow requests for short periods where that is needed to keep Vocele working for
        everyone or to stop an attack. That is a technical measure, not a penalty, and it is not aimed at any
        individual's volume.</p>`,
      },
      changes: {
        title: 'If we change an allowance',
        content: `
        <p>We may change what a plan includes. If we reduce an allowance on a plan you are already subscribed to, we
        will tell you at least 30 days beforehand, the change will not take effect before your next renewal, and you
        can cancel first. We will not reduce an allowance during a period you have already paid for.</p>`,
      },
      questions: { title: 'Questions' },
    },
  },
} as const;

type Widen<T> = T extends string ? string : { -readonly [K in keyof T]: Widen<T[K]> };

export type Copy = Widen<typeof en>;

export default en;
