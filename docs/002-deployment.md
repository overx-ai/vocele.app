# 002 - Deployment & Analytics

**Prerequisites**: [001 - SEO & Crawlability](001-seo-crawlability.md) — the
trailing-slash rule this deployment must preserve.

How the site actually goes live. As of 2026-07-11 the host is **Vercel** (git
push → auto-build), the domain is served from **Namecheap DNS**, search is
registered in **Google Search Console**, and traffic is measured with **GA4**.
This resolves the "whichever provider wins" thread in
[001 § Provider migration notes](001-seo-crawlability.md#provider-migration-notes):
Vercel won.

## Source & CI

- Repo: `git@github.com:hustlestar/vocele.app.git`, branch **`master`**.
- **Deploy = `git push origin master`.** Vercel's GitHub app auto-builds every
  push; PRs get preview URLs. No separate deploy step, no GitHub Actions.
- Build is `vercel.json`'s `buildCommand`: `npm run build` then the legal gate
  (`scripts/check-legal.mjs`, `LEGAL_SIBLING=skip` because the app repo is not on Vercel, so the
  pinned manifest stands in). A policy that fails the gate never deploys. Output `dist/`. **No adapter**
  (`output: 'static'`), **no env vars** — `PUBLIC_SITE_URL` in `astro.config.mjs`
  defaults to `https://vocele.app`, so prod canonicals are correct unset.

## Vercel config

**File**: `vercel.json`
```json
{ "cleanUrls": true, "trailingSlash": false }
```
This re-creates nginx's trailing-slash 301 (`/pricing/` → `/pricing`) — the one
piece of canonicalization that is the host's job, not the HTML's. Vercel also
serves `dist/404.html` automatically. `nginx.conf` + `Dockerfile` remain in the
repo but are unused by Vercel.

## DNS (Namecheap)

Domain List → Manage `vocele.app` → **Advanced DNS**. Delete Namecheap's default
parking records first (`CNAME www → parkingpage`, `URL Redirect @`), keep
Nameservers on **Namecheap BasicDNS**, then:

| Type | Host | Value | Purpose |
|---|---|---|---|
| A | `@` | `76.76.21.21` | apex → Vercel |
| CNAME | `www` | `cname.vercel-dns.com` | www → Vercel |
| TXT | `@` | `google-site-verification=…` | GSC domain verification |

In **Vercel → Settings → Domains**, add both `vocele.app` and `www`, set apex as
primary so `www` 301s to it (matches the apex-canonical HTML).

> **Resolved 2026-09-03.** Until then production had this backwards (apex 308 → www while all
> canonicals said apex, so Google was told the canonical was a redirect). Jack flipped the
> primary domain in Vercel; verified `www` → 308 → apex and `http` → 308 → `https`.

## Google Search Console

- **Domain property** for `vocele.app` (covers apex + www + http/https in one),
  verified via the TXT record above.
- Submit sitemap: GSC → Sitemaps → `sitemap.xml`. It's generated at build by
  **`src/pages/sitemap.xml.ts`** from `src/site-pages.ts` — the same manifest that
  drives head hreflang (see [001](001-seo-crawlability.md)).

## Analytics (GA4)

- Property `G-0ZQBJJGWPG`, gtag.js snippet in **`src/layouts/BaseLayout.astro`**
  `<head>` (every page routes through it).
- **Two guards**: `is:inline` on both `<script>` tags (else Astro bundles them and
  the `gtag()` global breaks), and `import.meta.env.PROD` (excludes `astro dev`, so
  local dev stays zero-JS — the one deliberate break from the site's no-client-JS
  rule, alongside the 404 redirect).
- **Known gap**: no EU consent gate (fires immediately); Vercel preview deploys are
  PROD builds so they also report — filter by hostname in GA4 Admin if it matters.

## Verification

```bash
# canonicalization live (the thing vercel.json exists for)
curl -sI https://vocele.app/pricing/   # → 301, Location: /pricing
curl -sI https://vocele.app/pricing    # → 200
# GA present on every page, emitted verbatim (not bundled)
grep -rl G-0ZQBJJGWPG dist | wc -l      # == html page count
```
Plus GA4 **Realtime** shows a session when you open the live site. Run the full
SEO verification block in [001 § Verification](001-seo-crawlability.md#verification)
after any host change.
