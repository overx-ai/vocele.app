// Single source of truth for the site's indexable routes and the locales each one exists in. Consumed by BOTH the
// sitemap generator (src/pages/sitemap.xml.ts) and the <head> hreflang logic (BaseLayout.astro), so the two can never
// disagree. Add a route here when you add a page. `slug: ''` is the home page.

import { BLOG_POSTS } from './blog-posts';
import { VS_PAGES } from './vs-pages';
import { PAGES_LASTMOD } from './site';
import { LEGAL_DATES } from './data/facts';
import { DEFAULT_LANG, LIVE_LANGS, X_DEFAULT, localeOf, type Lang } from './i18n/locales';

export interface SitePage {
  slug: string;
  /** More than one = twins, with reciprocal hreflang. One = self-canonical, no hreflang, listed where it lives. */
  locales: readonly Lang[];
  /** Where the page is built, when wider than `locales`: linkable, but noindex and so out of hreflang and the sitemap. */
  builtIn?: readonly Lang[];
  /** ISO date for sitemap <lastmod>. */
  lastmod?: string;
}

const ENGLISH_ONLY = [DEFAULT_LANG];

export const SITE_PAGES: SitePage[] = [
  { slug: '', locales: LIVE_LANGS, lastmod: PAGES_LASTMOD },
  { slug: 'pricing', locales: LIVE_LANGS, lastmod: PAGES_LASTMOD },
  { slug: 'faq', locales: LIVE_LANGS, lastmod: '2026-10-08' },
  // Fair-use IS translated (unlike privacy/terms): it is a purchase-decision disclosure and each locale's pricing page
  // links to it. An English-only cap disclosure on a translated pricing page does not clear UCPD Art. 7.
  { slug: 'fair-use', locales: LIVE_LANGS, lastmod: LEGAL_DATES['fair-use'].updated },
  { slug: 'privacy', locales: ENGLISH_ONLY, lastmod: LEGAL_DATES.privacy.updated },
  { slug: 'terms', locales: ENGLISH_ONLY, lastmod: LEGAL_DATES.terms.updated },
  // The index pages ARE locale twins. A locale with no article yet keeps a noindex page, so the nav link still works.
  { slug: 'blog', locales: LIVE_LANGS.filter((lang) => BLOG_POSTS.some((p) => p.locale === lang)), builtIn: LIVE_LANGS, lastmod: PAGES_LASTMOD },
  // Articles are original per locale (never translations): self-canonical, no hreflang twin. Registered once in
  // blog-posts.ts, appended here so the sitemap can't miss them.
  // NOT listed: /privacy/<yyyy-mm>. A policy replaced from 2026-10-08 on is kept there (the promise in /privacy#changes),
  // noindex, so it never ranks in place of the current one.
  // NOT listed: /invite (+ /es/invite). They are noindex, reached only from an invite link, and this manifest is the
  // *indexable* route list. See src/pages/invite.astro.
  ...BLOG_POSTS.map((p) => ({ slug: p.slug, locales: [p.locale], lastmod: p.dateModified ?? p.datePublished })),
  ...VS_PAGES.map((v) => ({ slug: `vs/${v.slug}`, locales: ENGLISH_ONLY, lastmod: v.dateModified ?? v.datePublished })),
];

export const localePath = (lang: Lang, slug: string) => `/${[localeOf(lang).prefix, slug].filter(Boolean).join('/')}`;

// The #download target only exists on the home pages.
export const downloadPath = (lang: Lang) => `${localePath(lang, '')}#download`;

// Unknown slugs default to every live locale so a new content page isn't silently dropped from hreflang; single-locale
// pages must be listed above explicitly.
export const localesOf = (slug: string): readonly Lang[] => SITE_PAGES.find((p) => p.slug === slug)?.locales ?? LIVE_LANGS;

export const hasTwins = (slug: string) => localesOf(slug).length > 1;

export const alternates = (slug: string, origin: string) => {
  if (!hasTwins(slug)) return [];
  const href = (lang: Lang) => `${origin}${localePath(lang, slug)}`;
  return [
    ...localesOf(slug).map((lang) => ({ hreflang: localeOf(lang).hreflang, href: href(lang) })),
    { hreflang: X_DEFAULT, href: href(DEFAULT_LANG) },
  ];
};

// Same page in another language wherever it is built, otherwise that language's home: never link a 404. Reads the
// manifest directly: localesOf's every-locale default would send an unregistered page to URLs that do not exist.
export const switchPath = (target: Lang, slug: string) => {
  const page = SITE_PAGES.find((p) => p.slug === slug);
  return localePath(target, (page?.builtIn ?? page?.locales)?.includes(target) ? slug : '');
};
