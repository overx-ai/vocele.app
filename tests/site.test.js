// SEO invariants, asserted against dist/ after a build. These are the checks that
// used to live as copy-paste greps in docs/001 § Verification.
//
// They read the built HTML, not the source, because every failure this guards
// against (an unregistered page, a canonical that disagrees with the sitemap, a
// trailing-slash link that 301s) is only visible in the output.

import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const ORIGIN = 'https://vocele.app';

const pages = new Map(); // absolute url -> { file, html }
const sitemap = new Map(); // loc -> alternates[]

const walk = (dir) =>
  readdirSync(dir).flatMap((e) => {
    const p = path.join(dir, e);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

// dist/blog/foo/index.html -> https://vocele.app/blog/foo  (home -> .../)
const urlOf = (file) => {
  const rel = path.relative(DIST, file).replace(/(^|\/)index\.html$/, '');
  return rel === '' ? `${ORIGIN}/` : `${ORIGIN}/${rel}`;
};

before(() => {
  if (!existsSync(path.join(DIST, 'sitemap.xml'))) {
    execFileSync('npm', ['run', 'build'], { cwd: ROOT, stdio: 'inherit' });
  }
  for (const file of walk(DIST)) pages.set(urlOf(file), { file, html: readFileSync(file, 'utf8') });

  const xml = readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
  for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)[1];
    sitemap.set(loc, [...block.matchAll(/hreflang="([^"]+)"\s+href="([^"]+)"/g)].map((m) => `${m[1]} ${m[2]}`).sort());
  }
});

const indexable = () => [...pages].filter(([, p]) => !/name="robots"[^>]*noindex/.test(p.html));
const rel = (file) => path.relative(ROOT, file);
const hreflangs = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => `${m[1]} ${m[2]}`).sort();
const withoutCode = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');

test('sitemap and build agree on which pages exist', () => {
  assert.ok(sitemap.size > 0, 'sitemap.xml has no <url> entries');
  for (const loc of sitemap.keys()) assert.ok(pages.has(loc), `sitemap lists ${loc} but nothing was built for it`);
  for (const [url] of indexable()) {
    assert.ok(sitemap.has(url), `${url} is indexable but missing from the sitemap — register it in src/site-pages.ts`);
  }
});

test('every indexable page has exactly one canonical, matching its sitemap URL', () => {
  for (const [url, p] of indexable()) {
    const found = [...p.html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(found.length, 1, `${rel(p.file)} has ${found.length} canonical tags`);
    assert.equal(found[0], url, `${rel(p.file)} canonical disagrees with its own URL`);
  }
});

test('hreflang in the head matches hreflang in the sitemap', () => {
  for (const [url, p] of indexable()) {
    assert.deepEqual(hreflangs(p.html), sitemap.get(url), `${rel(p.file)} head alternates differ from the sitemap entry`);
  }
});

test('no internal link carries a trailing slash', () => {
  for (const [, p] of pages) {
    const bad = [...p.html.matchAll(/href="(\/[^"]*\/)"/g)].map((m) => m[1]).filter((h) => h !== '/');
    assert.deepEqual(bad, [], `${rel(p.file)} links to trailing-slash URLs (they 301): ${bad}`);
  }
});

test('every JSON-LD block parses', () => {
  for (const [, p] of pages) {
    for (const [, json] of p.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      assert.doesNotThrow(() => JSON.parse(json), `${rel(p.file)} has unparseable JSON-LD`);
      assert.ok(!json.includes('<'), `${rel(p.file)} has a raw < in JSON-LD, which could close its script`);
    }
  }
});

test('the apple-app-site-association is valid and claims the invite path', () => {
  const file = path.join(DIST, '.well-known/apple-app-site-association');
  assert.ok(existsSync(file), 'AASA missing from the build — Universal Links will not route');
  const aasa = JSON.parse(readFileSync(file, 'utf8'));
  const [detail] = aasa.applinks.details;
  assert.match(detail.appIDs[0], /^[A-Z0-9]{10}\.[\w.]+$/);
  // /invite/* does not match /invite?uid=x, which is the link the app builds.
  assert.ok(detail.components.some((c) => c['/'] === '/invite'), 'AASA must claim /invite itself, not just /invite/*');
});

// The content fence. Claims on this list are either legally unshippable or
// describe features that do not exist. See CLAUDE.md and seo/product.md.
const BANNED = [
  /90[- ]day (guarantee|roadmap)/i,
  /plan de 90 d/i,
  /90[\s\u00a0-]*(?:Tage|jours|giorni|dias|dni|дней|日間|يوم)/i,
  /money[- ]back/i,
  /garant[ií]a de devoluci/i,
  /duolingo/i,
  /high[- ]stakes simulation/i,
  // Plan minutes are monthly (spec 001).
  /minutes of (AI conversation|pronunciation)[^.<]{0,30}\ba day/i,
  /minutos de (conversación|práctica de pronunciación|calificación)[^.<]{0,30}al día/i,
];

test('no page makes a banned claim', () => {
  for (const [, p] of pages) {
    for (const pattern of BANNED) {
      assert.ok(!pattern.test(p.html), `${rel(p.file)} matches banned pattern ${pattern}`);
    }
  }
});

// "Unlimited" in every language. The only allowed use is each fair-use page's own denial of it.
const UNLIMITED = /unlimited|ilimitad|illimit|unbegrenzt|grenzenlos|ohne limit|sans limite|senza limit|sem limite|bez limitu|nielimitowan|безлимит|неогранич|без ограничен|無制限|使い放題|制限なし|غير محدود|بلا حدود|دون حدود/i;
const DENIALS = [
  /do(?:es)? not sell anything as (?:&quot;|")?unlimited/gi,
  /never sells? anything as (?:&quot;|")?unlimited/gi,
  /No vendemos nada como ilimitado/gi,
  /N[ãa]o vendemos nada como ilimitado/gi,
  /Nous ne vendons rien d(?:’|&#x27;|&rsquo;)illimité/gi,
  /Nie sprzedajemy niczego jako „bez limitu”/g,
  /ничего не продаём как безлимитное/gi,
];

test('no page calls a plan unlimited, in any language', () => {
  for (const [, p] of pages) {
    if (rel(p.file).includes('terms')) continue; // check-legal holds the terms to this
    const html = DENIALS.reduce((text, denial) => text.replace(denial, ''), p.html);
    assert.ok(!UNLIMITED.test(html), `${rel(p.file)} says unlimited: ${html.match(UNLIMITED)?.[0]}`);
  }
});

// Arabic is an interface language, never a learnable one, and only the Arabic pages have reason to name it.
const ARABIC = /\barabic\b|\b[áa]rabe\b|arabisch|\barabo\b|arabsk|арабск|アラビア語/i;

test('no locale offers Arabic as a language to learn', () => {
  for (const [, p] of pages) {
    if (/privacy|terms|dist\/vs\//.test(rel(p.file))) continue; // /vs pages describe competitors' catalogues
    const text = withoutCode(p.html).replace(/<[^>]+>/g, ' ');
    assert.ok(!ARABIC.test(text), `${rel(p.file)} names Arabic: ${text.match(ARABIC)?.[0]}`);
  }
});

const LOCALES = ['en', 'es', 'ru', 'pl', 'pt', 'de', 'fr', 'it', 'ja', 'ar'];
const HTML_LANG = { en: 'en-US', es: 'es-MX', pt: 'pt-BR' };
const CORE_SLUGS = ['', 'pricing', 'faq', 'fair-use'];
const urlFor = (lang, slug) => `${ORIGIN}/${[lang === 'en' ? '' : lang, slug].filter(Boolean).join('/')}`;
const pageFor = (lang, slug) => pages.get(urlFor(lang, slug));

test('every locale serves its core pages with the right lang, dir and reciprocal hreflang', () => {
  for (const lang of LOCALES) {
    for (const slug of CORE_SLUGS) {
      const page = pageFor(lang, slug);
      assert.ok(page, `missing /${lang}/${slug}`);
      const tag = page.html.match(/<html[^>]*>/)[0];
      assert.ok(tag.includes(`lang="${HTML_LANG[lang] ?? lang}"`), `${rel(page.file)} has ${tag}`);
      assert.ok(tag.includes(`dir="${lang === 'ar' ? 'rtl' : 'ltr'}"`), `${rel(page.file)} has ${tag}`);
      assert.equal(hreflangs(page.html).length, LOCALES.length + 1, `${rel(page.file)} hreflang set is incomplete`);
      assert.deepEqual(hreflangs(page.html), hreflangs(pageFor('en', slug).html), `${rel(page.file)} is not reciprocal`);
    }
  }
});

test('no placeholder survives into a page', () => {
  for (const [, p] of pages) {
    assert.ok(!/\{[a-z][A-Za-z]+\}/.test(withoutCode(p.html)), `${rel(p.file)} has an unfilled placeholder`);
  }
});

test('a blog index with no article stays out of the index', () => {
  for (const [, p] of pages) {
    if (!/<p class="lead empty/.test(p.html)) continue;
    assert.ok(/name="robots" content="noindex/.test(p.html), `${rel(p.file)} is empty and indexable`);
    assert.ok(!sitemap.has(urlOf(p.file)), `${rel(p.file)} is empty and in the sitemap`);
  }
});

const langMenu = (html) => [...html.match(/<details class="lang-menu[\s\S]*?<\/details>/)[0].matchAll(/<a href="([^"]+)"/g)].map((m) => m[1]);

test('the language menu never links a missing page, and keeps blog readers on a blog index', () => {
  for (const [, p] of pages) {
    if (!p.html.includes('class="lang-menu')) continue;
    for (const href of langMenu(p.html)) assert.ok(pages.has(new URL(href, ORIGIN).href), `${rel(p.file)} links ${href} from its language menu`);
  }
  for (const from of ['es', 'ru']) {
    assert.deepEqual(langMenu(pageFor(from, 'blog').html).map((href) => new URL(href, ORIGIN).href), LOCALES.map((lang) => urlFor(lang, 'blog')));
  }
});

// Every price a locale's plan page may quote, as printed, nbsp included, tutor comparison included.
const NBSP = '\u00a0';
const USD_TUTOR = ['$200', '$320'];
const TUTOR_PRICES = {
  en: USD_TUTOR,
  es: USD_TUTOR,
  de: [`295${NBSP}€`],
  fr: [`480${NBSP}€`],
  it: [`200${NBSP}€`],
  pl: [`660${NBSP}zł`],
  pt: [`R$${NBSP}400`],
  ja: ['¥60,000'],
  ru: [`19${NBSP}000${NBSP}₽`],
  ar: [`1,200${NBSP}ر.س.`],
};
const EUR_PRICES = [`17,99${NBSP}€`, `34,99${NBSP}€`, `59,99${NBSP}€`];
const USD_PRICES = ['$14.99', '$29.99', '$49.99'];
const ALLOWED_PRICES = {
  en: USD_PRICES,
  es: USD_PRICES,
  de: EUR_PRICES,
  fr: EUR_PRICES,
  it: EUR_PRICES,
  pl: [`69,99${NBSP}zł`, `129,99${NBSP}zł`, `229,99${NBSP}zł`],
  pt: [`R$${NBSP}99,90`, `R$${NBSP}199,90`, `R$${NBSP}299,90`],
  ja: ['¥2,500', '¥5,000', '¥8,000'],
  ru: [`1${NBSP}290${NBSP}₽`, `2${NBSP}490${NBSP}₽`, `4${NBSP}490${NBSP}₽`],
  ar: [`59.99${NBSP}ر.س.`, `129.99${NBSP}ر.س.`, `199.99${NBSP}ر.س.`],
};
// R$ before $, so a real is never read as a dollar. A space inside a number is a thousands separator.
const QUOTED_PRICE = new RegExp(
  `R\\$${NBSP}?[\\d.,]*\\d|\\$\\d+(?:\\.\\d{2})?|¥[\\d,]*\\d|\\d[\\d.,${NBSP}]*${NBSP}(?:€|zł|₽|ر\\.س\\.)`,
  'g',
);

test('plan pages quote only approved prices, and every plan price', () => {
  const planPages = Object.entries(ALLOWED_PRICES)
    .map(([lang, prices]) => ({ lang, prices, page: pageFor(lang, 'pricing') }))
    .filter(({ page }) => page);
  assert.ok(planPages.length >= 2, 'no plan pages found');
  for (const { lang, prices, page } of planPages) {
    const html = page.html.replace(/&nbsp;|&#160;|&#xa0;/gi, NBSP);
    const quoted = html.match(QUOTED_PRICE) ?? [];
    for (const price of quoted) {
      assert.ok([...prices, ...TUTOR_PRICES[lang]].includes(price), `${rel(page.file)} quotes ${price}, which is not an approved price`);
    }
    for (const price of prices) assert.ok(quoted.includes(price), `${rel(page.file)} never quotes ${price}`);
  }
});
