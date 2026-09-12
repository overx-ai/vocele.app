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
    const head = [...p.html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
      .map((m) => `${m[1]} ${m[2]}`)
      .sort();
    assert.deepEqual(head, sitemap.get(url), `${rel(p.file)} head alternates differ from the sitemap entry`);
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
  /money[- ]back/i,
  /garant[ií]a de devoluci/i,
  /duolingo/i,
  /high[- ]stakes simulation/i,
];

test('no page makes a banned claim', () => {
  for (const [, p] of pages) {
    for (const pattern of BANNED) {
      assert.ok(!pattern.test(p.html), `${rel(p.file)} matches banned pattern ${pattern}`);
    }
  }
});

// Every price a plan page quotes, including the tutor comparison it sells against.
const ALLOWED_PRICES = new Set(['$14.99', '$29.99', '$49.99', '$200', '$320']);

test('plan pages quote only approved prices', () => {
  for (const slug of ['pricing', 'es/pricing']) {
    const { html, file } = pages.get(`${ORIGIN}/${slug}`);
    for (const [price] of html.matchAll(/\$\d+(?:\.\d{2})?/g)) {
      assert.ok(ALLOWED_PRICES.has(price), `${rel(file)} quotes ${price}, which is not an approved price`);
    }
  }
});
