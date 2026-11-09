// Single source of truth for blog article metadata. Consumed by:
//   - src/site-pages.ts (appends these to SITE_PAGES → sitemap + head logic)
//   - src/views/BlogIndex.astro (card lists)
//   - src/layouts/ArticleLayout.astro (per-article meta via postBySlug)
//
// Articles are ORIGINAL PER LOCALE, not translations — each is self-canonical
// with no hreflang twin (a single-locale entry in the manifest). Register every new
// article here; the page file alone is not enough.

import type { Lang } from './i18n/locales';

/** Category accent — the gradient key drives the index-card pill + breadcrumb
 *  pill (via var(--gradient-<key>)) and the row hover offset-shadow (via the
 *  solid color below). Kept here so index + ArticleLayout share one mapping. */
export type CategoryKey = 'talk' | 'accent' | 'learn';
export const categoryAccent: Record<CategoryKey, string> = {
  talk: '#f04582',
  accent: '#21c7eb',
  learn: '#635ccf',
};

export interface BlogPost {
  /** Shared-slug form used by the manifest, e.g. 'blog/ai-accent-training'. */
  slug: string;
  locale: Lang;
  title: string;
  description: string;
  datePublished: string; // ISO date
  dateModified?: string; // ISO date; set on a real content refresh
  /** Short label for index cards / breadcrumbs. */
  cardTitle: string;
  /** Category pill label + accent key. */
  category: { label: string; gradient: CategoryKey };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'blog/understand-english-but-cant-speak',
    locale: 'en',
    title: "Why You Understand English But Can't Speak It (And What Fixes It)",
    cardTitle: 'Understand English but can\'t speak it?',
    description: "You understand English but freeze when you speak. Here's what happens in the three seconds before you go quiet, why more listening won't fix it, and what does.",
    datePublished: '2026-09-02',
    category: { label: 'Confidence', gradient: 'talk' },
  },
  {
    slug: 'blog/ai-accent-training',
    locale: 'en',
    title: 'AI Accent Training: How Per-Word Pronunciation Scoring Actually Works',
    cardTitle: 'AI accent training, explained',
    description:
      'What accent training with AI really does: per-word pronunciation scoring, which sounds to fix first, and how to measure your accent improving week over week.',
    datePublished: '2026-07-10',
    category: { label: 'Accent', gradient: 'accent' },
  },
  {
    slug: 'blog/ai-speaking-coach-vs-human-tutor',
    locale: 'en',
    title: 'AI Speaking Coach vs. Human Tutor: An Honest Cost and Outcome Comparison',
    cardTitle: 'AI coach vs. human tutor',
    description:
      'A private English tutor costs $200–320 a month for two lessons a week. Here is what an AI speaking coach does better, what it does worse, and how to decide.',
    datePublished: '2026-07-10',
    category: { label: 'Coaching', gradient: 'talk' },
  },
  {
    slug: 'blog/ielts-toefl-speaking-practice-ai',
    locale: 'en',
    title: 'IELTS & TOEFL Speaking Practice with AI: Drill the Test Before You Take It',
    cardTitle: 'IELTS/TOEFL speaking with AI',
    description:
      'How to use AI conversation practice and pronunciation scoring to prepare for the IELTS and TOEFL speaking sections — daily, scored, and without a tutor.',
    datePublished: '2026-07-10',
    category: { label: 'Exams', gradient: 'learn' },
  },
  {
    slug: 'blog/entiendo-ingles-pero-no-puedo-hablarlo',
    locale: 'es',
    title: 'Entiendo inglés pero no puedo hablarlo: por qué y qué hacer',
    cardTitle: '¿Entiendes inglés pero no lo hablas?',
    description:
      '¿Entiendes inglés pero no puedes hablarlo? Qué pasa en esos tres segundos, las trampas de traducir del español y qué cierra la brecha.',
    datePublished: '2026-10-09',
    category: { label: 'Confianza', gradient: 'talk' },
  },
  {
    slug: 'blog/como-hablar-ingles-con-confianza',
    locale: 'es',
    title: 'Cómo hablar inglés con confianza (aunque te dé pena)',
    cardTitle: 'Hablar inglés con confianza',
    description:
      'No es gramática, es miedo. Una guía práctica para hablar inglés con confianza en el trabajo, en la escuela de tus hijos y en cualquier conversación que hoy evitas.',
    datePublished: '2026-07-10',
    category: { label: 'Confianza', gradient: 'talk' },
  },
  {
    slug: 'blog/clases-de-ingles-o-app-con-ia',
    locale: 'es',
    title: '¿Clases de inglés o una app con IA? Cuánto cuesta cada una',
    cardTitle: '¿Clases de inglés o app con IA?',
    description:
      'Un buen maestro cobra unos $25–40 la hora: $200–320 al mes por dos clases a la semana. Vocele tendrá planes de $14.99–$49.99. ¿Cuál te conviene?',
    datePublished: '2026-07-10',
    dateModified: '2026-11-02',
    category: { label: 'Comparativa', gradient: 'learn' },
  },
  {
    slug: 'blog/errores-de-pronunciacion-en-ingles',
    locale: 'es',
    title: 'Errores de pronunciación en inglés: los 9 que nos delatan',
    cardTitle: 'Errores de pronunciación en inglés',
    description:
      'La "i" corta, la schwa, la "h" que suena a "j": los 9 errores de pronunciación en inglés más comunes en hispanohablantes, con pares para practicar.',
    datePublished: '2026-07-10',
    dateModified: '2026-10-09',
    category: { label: 'Pronunciación', gradient: 'accent' },
  },
  {
    slug: 'blog/apps-para-aprender-ingles-hablando',
    locale: 'es',
    title: 'Apps para aprender inglés hablando: cuál te conviene',
    cardTitle: 'Apps para aprender inglés hablando',
    description:
      'Speak, Praktika, ELSA Speak, Fluently y Vocele comparadas: cuál te hace hablar, cómo te corrige cada una y cuál elegir según lo que te frena.',
    datePublished: '2026-10-24',
    category: { label: 'Comparativa', gradient: 'learn' },
  },
  {
    slug: 'blog/ingles-para-entrevista-de-trabajo',
    locale: 'es',
    title: 'Inglés para entrevista de trabajo en Estados Unidos',
    cardTitle: 'Inglés para tu entrevista de trabajo',
    description:
      'Inglés para entrevista de trabajo en Estados Unidos: cuatro respuestas para decir en voz alta, frases para ganar tiempo y los calcos que más se notan.',
    datePublished: '2026-10-26',
    category: { label: 'Trabajo', gradient: 'talk' },
  },
  {
    slug: 'blog/como-pronunciar-la-th-en-ingles',
    locale: 'es',
    title: 'Cómo pronunciar la TH en inglés: los dos sonidos',
    cardTitle: 'Cómo pronunciar la TH en inglés',
    description:
      'Cómo pronunciar la TH en inglés: dónde va la lengua, la TH sorda y la sonora, el sonido del español que ya tienes y cómo saber si te salió bien.',
    datePublished: '2026-11-02',
    category: { label: 'Pronunciación', gradient: 'accent' },
  },
  {
    slug: 'blog/best-ai-language-tutor-app',
    locale: 'en',
    title: 'Best AI Language Tutor App in 2026: 7 Compared by Problem',
    cardTitle: 'Best AI language tutor app in 2026',
    description:
      'The best AI language tutor app in 2026 depends on what stops you speaking. Seven apps compared by a founder who built one, including where ours loses.',
    datePublished: '2026-11-02',
    category: { label: 'Comparison', gradient: 'learn' },
  },
  {
    slug: "blog/ponimayu-anglijskij-no-ne-mogu-govorit",
    locale: 'ru',
    title: "Понимаю английский, но не могу говорить: что делать",
    cardTitle: "Понимаю, но не могу говорить",
    description:
      "Понимаю английский, но не могу говорить: трёхминутная проверка покажет, откуда берётся барьер (память, страх, скорость, произношение) и что с этим делать.",
    datePublished: '2026-11-04',
    category: { label: "Языковой барьер", gradient: 'talk' },
  },
  {
    slug: "blog/kak-ubrat-akcent-v-anglijskom",
    locale: 'ru',
    title: "Как убрать акцент в английском: с чего начать",
    cardTitle: "Как убрать акцент",
    description:
      "Как убрать акцент в английском: какие ошибки в произношении мешают вас понять, какие только слышны и как тренировать пары звуков от ship и sheep до th.",
    datePublished: '2026-11-04',
    category: { label: "Произношение", gradient: 'accent' },
  },
  {
    slug: "blog/kak-perestat-boyatsya-govorit-na-anglijskom",
    locale: 'ru',
    title: "Как перестать бояться говорить на английском",
    cardTitle: "Как перестать бояться говорить",
    description:
      "Как перестать бояться говорить на английском: какой страх мешает вам, фразы на случай паузы и пять уровней практики с оценкой тревоги от 0 до 10.",
    datePublished: '2026-11-09',
    category: { label: "Языковой барьер", gradient: 'talk' },
  },
  {
    slug: "blog/jak-przelamac-bariere-jezykowa",
    locale: 'pl',
    title: "Jak przełamać barierę językową, gdy rozumiesz angielski",
    cardTitle: "Rozumiem po angielsku, ale nie mówię",
    description:
      "Rozumiem po angielsku, ale nie potrafię mówić: skąd ta blokada u Polaków, co pokazują dane i jak przełamać barierę językową codziennym mówieniem.",
    datePublished: '2026-11-04',
    category: { label: "Bariera językowa", gradient: 'talk' },
  },
  {
    slug: "blog/polski-akcent-w-angielskim",
    locale: 'pl',
    title: "Polski akcent w angielskim: które błędy naprawdę szkodzą",
    cardTitle: "Polski akcent: co poprawić najpierw",
    description:
      "Polski akcent w angielskim nie musi zniknąć. Co poprawić najpierw, żeby cię rozumiano: czytanie liter, -ing, akcent wyrazowy, samogłoski i końcówki słów.",
    datePublished: '2026-11-04',
    category: { label: "Wymowa", gradient: 'accent' },
  },
  {
    slug: "blog/entendo-ingles-mas-nao-consigo-falar",
    locale: 'pt',
    title: "Entendo inglês, mas não consigo falar: por que você trava",
    cardTitle: "Entendo inglês, mas não consigo falar",
    description:
      "Entende inglês, mas não consegue falar? O que acontece na hora em que você trava, o que os estudos mostram e o que ajuda de verdade.",
    datePublished: '2026-11-04',
    category: { label: "Confiança", gradient: 'talk' },
  },
  {
    slug: "blog/pronuncia-do-ed-em-ingles",
    locale: 'pt',
    title: "Pronúncia do -ed em inglês: os 3 sons e o erro do brasileiro",
    cardTitle: "Pronúncia do -ed em inglês",
    description:
      "Pronúncia do -ed em inglês: quando tem som de t, d ou id, por que o brasileiro acrescenta uma vogal no fim e um treino de cinco minutos para corrigir.",
    datePublished: '2026-11-04',
    category: { label: "Pronúncia", gradient: 'accent' },
  },
  {
    slug: "blog/englisch-verstehen-aber-nicht-sprechen",
    locale: 'de',
    title: "Englisch verstehen, aber nicht sprechen: Woran es liegt",
    cardTitle: "Englisch verstehen, aber nicht sprechen?",
    description:
      "Du verstehst Englisch, aber beim Sprechen ist alles weg? Warum das so ist, was die Schule damit zu tun hat und wie du mit drei Tests deine Ursache findest.",
    datePublished: '2026-11-04',
    category: { label: "Sprechen", gradient: 'talk' },
  },
  {
    slug: "blog/englische-aussprache-verbessern",
    locale: 'de',
    title: "Englische Aussprache verbessern: Womit Deutsche anfangen",
    cardTitle: "Englische Aussprache verbessern",
    description:
      "Englische Aussprache verbessern: Die typischen Fehler Deutscher, nach Wirkung sortiert. Warum du bei den Wortenden anfängst und das th warten kann, mit Übungen.",
    datePublished: '2026-11-04',
    category: { label: "Aussprache", gradient: 'accent' },
  },
  {
    slug: "blog/je-comprends-l-anglais-mais-je-n-arrive-pas-a-parler",
    locale: 'fr',
    title: "Je comprends l’anglais mais je n’arrive pas à parler",
    cardTitle: "Tu comprends l’anglais, mais tu bloques à l’oral ?",
    description:
      "Tu comprends l’anglais mais tu n’arrives pas à parler ? Pourquoi l’oral bloque, ce qui ne marche pas et six habitudes pour t’y mettre enfin.",
    datePublished: '2026-11-04',
    category: { label: "Confiance", gradient: 'talk' },
  },
  {
    slug: "blog/perdre-son-accent-francais-en-anglais",
    locale: 'fr',
    title: "Perdre son accent français en anglais : par où commencer",
    cardTitle: "Perdre son accent français : par où commencer",
    description:
      "Faut-il perdre son accent français en anglais ? Non. Voici les sons qui gênent vraiment la compréhension, ceux qui peuvent attendre et comment les travailler.",
    datePublished: '2026-11-04',
    category: { label: "Accent", gradient: 'accent' },
  },
  {
    slug: "blog/capisco-inglese-ma-non-riesco-a-parlare",
    locale: 'it',
    title: "Capisco l'inglese ma non riesco a parlare: perché e che fare",
    cardTitle: "Capisci l'inglese ma non lo parli?",
    description:
      "Capisci l'inglese ma non riesci a parlare? I dati italiani, la prova dei due minuti per trovare il tuo blocco e cosa fare per superarlo.",
    datePublished: '2026-11-04',
    category: { label: "Parlare", gradient: 'talk' },
  },
  {
    slug: "blog/errori-pronuncia-inglese-italiani",
    locale: 'it',
    title: "Errori di pronuncia inglese degli italiani: quali correggere",
    cardTitle: "Errori di pronuncia degli italiani",
    description:
      "Gli errori di pronuncia inglese degli italiani in ordine di peso: vocale finale, schwa, s sonora, th e h. Con dati misurati e coppie di parole.",
    datePublished: '2026-11-04',
    category: { label: "Pronuncia", gradient: 'accent' },
  },
  {
    slug: "blog/eigo-kikitoreru-kedo-hanasenai",
    locale: 'ja',
    title: "英語が聞き取れるけど話せない理由と練習法",
    cardTitle: "英語が聞き取れるけど話せない理由",
    description:
      "英語が聞き取れるけど話せないのは、聞く力と話す力が別の技能だからです。文部科学省の調査データ、日本人が文の出だしでつまずく理由、どこで止まっているかの確かめ方、毎日の練習法を紹介します。",
    datePublished: '2026-11-04',
    category: { label: "スピーキング", gradient: 'talk' },
  },
  {
    slug: "blog/l-to-r-no-hatsuon",
    locale: 'ja',
    title: "LとRの発音の違い｜日本人がつまずく理由と舌の使い方",
    cardTitle: "LとRの発音の違いと舌の使い方",
    description:
      "LとRの発音の違いは舌先にあります。日本語のラ行がどちらとも違う理由、Lは舌先をつけ、Rは舌先を上あごに触れさせない出し方、単語ペアでの練習、聞き分け訓練の研究結果まで、順番に説明します。",
    datePublished: '2026-11-04',
    category: { label: "発音", gradient: 'accent' },
  },
  {
    slug: "blog/afham-alinjliziya-wala-astatie-altahadduth",
    locale: 'ar',
    title: "لماذا أفهم الإنجليزية ولا أستطيع التحدث بطلاقة؟",
    cardTitle: "أفهم الإنجليزية ولا أستطيع التحدث",
    description:
      "تفهم الإنجليزية ويتعطل لسانك؟ جدول يحدد السبب عندك: الترجمة أو الخوف أو الكلمة أو الصوت، ولماذا لا يكفي الاستماع، وما الذي يضيّق الفارق.",
    datePublished: '2026-11-04',
    category: { label: "الثقة", gradient: 'talk' },
  },
  {
    slug: "blog/alfarq-bayn-p-wa-b-fi-alnutq",
    locale: 'ar',
    title: "الفرق بين p و b في النطق: تدريب للناطقين بالعربية",
    cardTitle: "الفرق بين p و b في النطق",
    description:
      "الفرق بين p و b في الأوتار الصوتية والنفخة. كيف تنطق p، ولماذا تحل الباء محله، واختبار المنديل وأين يخدعك، مع أزواج كلمات وجمل للتدريب.",
    datePublished: '2026-11-04',
    category: { label: "النطق", gradient: 'accent' },
  },
];

export const postsFor = (locale: Lang) => BLOG_POSTS.filter((p) => p.locale === locale);

export const postBySlug = (slug: string): BlogPost => {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) throw new Error(`blog-posts.ts: no entry for slug "${slug}" — register it`);
  return post;
};
