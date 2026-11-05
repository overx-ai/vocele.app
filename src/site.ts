import { OPERATOR } from './data/facts';
import { PLANS, PLAN_NAMES, PRICES } from './data/prices';
import { localeOf, type Lang } from './i18n/locales';

// Site-wide constants shared by JSON-LD, the App Store badge and the sitemap.
// One place to flip when the listing goes live.

/** App Store listing (ASC app id 6800364555). `undefined` until the app is live —
 *  a dead store link in schema/badges is worse than none. */
export const APP_STORE_URL: string | undefined = undefined;

/** Bumped by hand when marketing-page copy changes (sitemap <lastmod>).
 *  A build-date stamp on every deploy is noise Google learns to discount. */
export const PAGES_LASTMOD = '2026-09-02';
export const HOME_LASTMOD = '2026-11-05';

const SITE_URL = 'https://vocele.app';

export const siteOrigin = (site: URL | undefined) => site?.toString().replace(/\/$/, '') ?? SITE_URL;

// "01", "02"...: how every numbered list on the site prints its rows.
export const rowNumber = (index: number) => String(index + 1).padStart(2, '0');

export const jsonLd = (node: object) => ({ '@context': 'https://schema.org', ...node });

// A raw `<` could close the <script> it is printed in; \u003c parses back to the same string.
export const jsonLdScript = (node: object) => JSON.stringify(node).replace(/</g, '\\u003c');

export const ORG = {
  '@type': 'Organization',
  name: 'Vocele',
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
};

// The person behind Vocele, never a company or trading name (owner, 2026-10-08).
export const AUTHOR = {
  '@type': 'Person',
  name: OPERATOR,
  url: SITE_URL,
  jobTitle: 'Founder, Vocele',
};

export interface ArticleMeta {
  type: 'Article' | 'BlogPosting';
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  lang: Lang;
  url: string;
  site: string;
}

export const articleSchema = ({ type, headline, description, datePublished, dateModified, lang, url, site }: ArticleMeta) =>
  jsonLd({
    '@type': type,
    headline,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: localeOf(lang).tag,
    author: AUTHOR,
    publisher: ORG,
    mainEntityOfPage: url,
    image: `${site}/og-image.jpg`,
  });

export const breadcrumbSchema = (crumbs: readonly { name: string; url: string }[]) =>
  jsonLd({
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(({ name, url }, i) => ({ '@type': 'ListItem', position: i + 1, name, item: url })),
  });

export const faqPageSchema = (items: readonly { q: string; a: string }[]) =>
  jsonLd({
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') },
    })),
  });

export const softwareApp = (lang: Lang) => {
  const { currency, amounts } = PRICES[lang];
  return {
    '@type': 'SoftwareApplication',
    name: 'Vocele',
    url: SITE_URL,
    image: ORG.logo,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'iOS',
    author: ORG,
    ...(APP_STORE_URL ? { installUrl: APP_STORE_URL, downloadUrl: APP_STORE_URL } : {}),
    offers: PLANS.map((plan) => ({
      '@type': 'Offer',
      name: PLAN_NAMES[plan],
      price: amounts[plan],
      priceCurrency: currency,
      priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1M' },
    })),
  };
};
