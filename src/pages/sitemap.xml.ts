import type { APIRoute } from 'astro';
import { SITE_PAGES, enPath, esPath } from '../site-pages';

// Sitemap generated from src/site-pages.ts so it can never drift from the
// <head> hreflang. (We avoid @astrojs/sitemap — it crashed on this Astro
// version — with our own few lines instead.) Static build emits dist/sitemap.xml.
export const GET: APIRoute = ({ site }) => {
  const origin = (site?.toString() ?? 'https://vocele.app').replace(/\/$/, '');

  const alternates = (slug: string) =>
    [
      `    <xhtml:link rel="alternate" hreflang="en-US" href="${origin}${enPath(slug)}" />`,
      `    <xhtml:link rel="alternate" hreflang="es-MX" href="${origin}${esPath(slug)}" />`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${enPath(slug)}" />`,
    ].join('\n');

  const urls = SITE_PAGES.flatMap((page) => {
    if (!page.translated) {
      // Single-locale page: list it where it actually lives (ES-only articles
      // sit under /es/ — enPath would 404).
      const path = page.locale === 'es' ? esPath(page.slug) : enPath(page.slug);
      return [`  <url>\n    <loc>${origin}${path}</loc>\n  </url>`];
    }
    // en + es entries share the identical alternate set (reciprocity).
    return [enPath(page.slug), esPath(page.slug)].map(
      (path) => `  <url>\n    <loc>${origin}${path}</loc>\n${alternates(page.slug)}\n  </url>`,
    );
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
