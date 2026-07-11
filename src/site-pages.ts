// Single source of truth for the site's indexable routes and which of them have
// a Spanish (/es) counterpart. Consumed by BOTH the sitemap generator
// (src/pages/sitemap.xml.ts) and the <head> hreflang logic (BaseLayout.astro),
// so the two can never disagree.
//
// Add a route here when you add a page. `slug: ''` is the home page.

import { BLOG_POSTS } from './blog-posts';

export interface SitePage {
  slug: string;
  translated: boolean; // true = has an /es twin, gets hreflang alternates
  /** For translated:false pages only: which locale the single page lives in.
   *  Defaults to 'en'. ES-only pages (Spanish blog articles) set 'es' so the
   *  sitemap lists them under /es/. */
  locale?: 'en' | 'es';
}

export const SITE_PAGES: SitePage[] = [
  { slug: '', translated: true },
  { slug: 'pricing', translated: true },
  { slug: 'faq', translated: true },
  { slug: 'privacy', translated: false },
  { slug: 'terms', translated: false },
  { slug: 'blog', translated: true }, // the two index pages ARE locale twins
  // Articles are original per locale (never translations): self-canonical, no
  // hreflang twin. Registered once in blog-posts.ts, appended here so the
  // sitemap can't miss them.
  ...BLOG_POSTS.map((p) => ({ slug: p.slug, translated: false, locale: p.locale })),
];

export const enPath = (slug: string) => (slug ? `/${slug}` : '/');
export const esPath = (slug: string) => (slug ? `/es/${slug}` : '/es');

// Unknown slugs default to translated so a new content page isn't silently
// dropped from hreflang; single-locale pages must be listed above explicitly.
export const hasTranslation = (slug: string) =>
  SITE_PAGES.find((p) => p.slug === slug)?.translated ?? true;
