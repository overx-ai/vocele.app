// Single source of truth for blog article metadata. Consumed by:
//   - src/site-pages.ts (appends these to SITE_PAGES → sitemap + head logic)
//   - src/pages/blog/index.astro + src/pages/es/blog/index.astro (card lists)
//   - src/layouts/ArticleLayout.astro (per-article meta via postBySlug)
//
// Articles are ORIGINAL PER LOCALE, not translations — each is self-canonical
// with no hreflang twin (translated: false in the manifest). Register every new
// article here; the page file alone is not enough.

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
  locale: 'en' | 'es';
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
    title: 'Clases de inglés o app con IA: costo real y cuál te conviene',
    cardTitle: '¿Clases de inglés o app con IA?',
    description:
      'Un maestro cobra $200–320 al mes por dos clases a la semana; una app como Vocele, de $14.99 a $49.99. Cuál te hace hablar más y cuándo sí vale el maestro.',
    datePublished: '2026-07-10',
    dateModified: '2026-10-09',
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
];

export const postsFor = (locale: 'en' | 'es') => BLOG_POSTS.filter((p) => p.locale === locale);

export const postBySlug = (slug: string): BlogPost => {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) throw new Error(`blog-posts.ts: no entry for slug "${slug}" — register it`);
  return post;
};
