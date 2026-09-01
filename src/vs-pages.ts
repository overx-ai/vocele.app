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

export const VS_PAGES: VsPage[] = [];

export const vsBySlug = (slug: string): VsPage => {
  const page = VS_PAGES.find((p) => p.slug === slug);
  if (!page) throw new Error(`vs-pages.ts: no entry for slug "${slug}" — register it`);
  return page;
};
