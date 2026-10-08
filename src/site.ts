import { OPERATOR } from './data/facts';

// Site-wide constants shared by JSON-LD, the App Store badge and the sitemap.
// One place to flip when the listing goes live.

/** App Store listing (ASC id 6805929109). `undefined` until the app is live —
 *  a dead store link in schema/badges is worse than none. */
export const APP_STORE_URL: string | undefined = undefined;

/** Bumped by hand when marketing-page copy changes (sitemap <lastmod>).
 *  A build-date stamp on every deploy is noise Google learns to discount. */
export const PAGES_LASTMOD = '2026-09-02';

export const ORG = {
  '@type': 'Organization',
  name: 'Vocele',
  url: 'https://vocele.app',
  logo: 'https://vocele.app/icon-512.png',
};

// The person behind Vocele, never a company or trading name (owner, 2026-10-08).
export const AUTHOR = {
  '@type': 'Person',
  name: OPERATOR,
  url: 'https://vocele.app',
  jobTitle: 'Founder, Vocele',
};

export const SOFTWARE_APP = {
  '@type': 'SoftwareApplication',
  name: 'Vocele',
  url: 'https://vocele.app',
  image: 'https://vocele.app/icon-512.png',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'iOS',
  author: ORG,
  ...(APP_STORE_URL ? { installUrl: APP_STORE_URL, downloadUrl: APP_STORE_URL } : {}),
  offers: [
    ['Core', '14.99'],
    ['Fluency', '29.99'],
    ['Meta', '49.99'],
  ].map(([name, price]) => ({
    '@type': 'Offer',
    name,
    price,
    priceCurrency: 'USD',
    priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1M' },
  })),
};
