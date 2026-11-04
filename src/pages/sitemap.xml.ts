import type { APIRoute } from 'astro';
import { SITE_PAGES, alternates, localePath } from '../site-pages';
import { siteOrigin } from '../site';

// Sitemap generated from src/site-pages.ts so it can never drift from the <head> hreflang. (We avoid @astrojs/sitemap —
// it crashed on this Astro version — with our own few lines instead.) Static build emits dist/sitemap.xml.
export const GET: APIRoute = ({ site }) => {
  const origin = siteOrigin(site);

  const links = (slug: string) =>
    alternates(slug, origin).map(({ hreflang, href }) => `\n    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`).join('');

  const lastmod = (page: { lastmod?: string }) => (page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : '');

  // Every twin shares the identical alternate set (reciprocity).
  const urls = SITE_PAGES.flatMap((page) =>
    page.locales.map((lang) => `  <url>\n    <loc>${origin}${localePath(lang, page.slug)}</loc>${lastmod(page)}${links(page.slug)}\n  </url>`),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
