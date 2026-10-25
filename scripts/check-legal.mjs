// The legal gate: asserts the legal pack in the built output (run after `astro build`; `npm test` runs it).
// Ported from ffly-site scripts/check-legal.mjs. Each check names the owner decision or rule it holds.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const source = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');
const FACTS = source('src/data/facts.ts');
// A string constant's value in src/data/facts.ts, or undefined when its declaration is missing.
const fact = (name) => FACTS.match(new RegExp(`export const ${name}\\b[^=]*=\\s*(['"])(.*?)\\1;`))?.[2];
const factList = (name) => FACTS.match(new RegExp(`export const ${name}\\b[^=]*=\\s*\\[([\\s\\S]*?)\\]\\s*as const;`))?.[1] ?? '';

const failures = [];
const check = (ok, message) => {
  if (!ok) failures.push(message);
};

const walk = (dir) =>
  readdirSync(dir).flatMap((e) => {
    const p = path.join(dir, e);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const rel = (file) => path.relative(DIST, file);
const readHtml = (page) => readFileSync(path.join(DIST, page, 'index.html'), 'utf8');
const plainText = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
// Astro escapes ' as &#39; in {expressions} but not in set:html, so copy checks see both as one apostrophe.
const copyText = (text) =>
  text
    .replace(/&#0*39;|&#x0*27;|&apos;|&rsquo;|’/gi, "'")
    .replace(/&quot;|&#34;|&ldquo;|&rdquo;/g, '"')
    .replace(/&rarr;/g, '→')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');
const INLINE_MODULE = /<script type="module"[^>]*>[\s\S]*?<\/script>/g;
// What a reader or a crawler sees: inlined CSS and executable scripts are not copy; JSON-LD and attributes are.
const copyOf = (html) =>
  html.replace(/<style\b[\s\S]*?<\/style>/g, '').replace(INLINE_MODULE, '').replace(/<script\b(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/g, '');

if (!existsSync(path.join(DIST, 'privacy', 'index.html'))) {
  console.error('check-legal: dist/ has no /privacy, run `astro build` first');
  process.exit(1);
}

const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'));
const htmlPages = htmlFiles.map((f) => [rel(f), readFileSync(f, 'utf8')]);
const llms = readFileSync(path.join(DIST, 'llms.txt'), 'utf8');
// robots.txt is left out: its crawler user-agents (ClaudeBot, GPTBot) are configuration, not copy.
const copyPages = [['llms.txt', llms], ...htmlPages.map(([f, h]) => [f, copyOf(h)])];

// ---------------------------------------------------------------------------------------------------------------
// (a) App Store labels == the app's privacy manifest. The sibling manifest is the truth when it is checked out; the
// pinned copy is the target state CI checks against, and the two must agree.
// LEGAL_SIBLING=skip skips the comparison, any other value is the manifest's path. A missing manifest fails: a worktree
// at another depth would otherwise skip it silently and never see the app drift from the pin.
const SIBLING_MODE = process.env.LEGAL_SIBLING;
const SIBLING = SIBLING_MODE && SIBLING_MODE !== 'skip'
  ? path.resolve(SIBLING_MODE)
  : path.resolve(ROOT, '../../0E-extensions/ios-claude-hello/Template/PrivacyInfo.xcprivacy');
const PINNED = path.join(ROOT, 'scripts/fixtures/PrivacyInfo.pinned.xcprivacy');
const APPLE_NAMES = {
  UserID: 'User ID', DeviceID: 'Device ID', EmailAddress: 'Email Address', Name: 'Name', PhoneNumber: 'Phone Number',
  AudioData: 'Audio Data', PhotosorVideos: 'Photos or Videos', OtherUserContent: 'Other User Content',
  CustomerSupport: 'Customer Support', PurchaseHistory: 'Purchase History', ProductInteraction: 'Product Interaction',
  OtherUsageData: 'Other Usage Data', CrashData: 'Crash Data', PerformanceData: 'Performance Data',
  OtherDiagnosticData: 'Other Diagnostic Data', CoarseLocation: 'Coarse Location', PreciseLocation: 'Precise Location',
  OtherDataTypes: 'Other Data Types', SearchHistory: 'Search History', BrowsingHistory: 'Browsing History',
  Contacts: 'Contacts', Health: 'Health', Fitness: 'Fitness',
};
const PURPOSES = {
  AppFunctionality: 'App Functionality', Analytics: 'Analytics', ThirdPartyAdvertising: 'Third-Party Advertising',
  DeveloperAdvertising: "Developer's Advertising or Marketing", ProductPersonalization: 'Product Personalization',
  Other: 'Other Purposes',
};
function manifest(xml, where) {
  const body = xml.replace(/<!--[\s\S]*?-->/g, '');
  const tracking = /<key>NSPrivacyTracking<\/key>\s*<true\/>/.test(body);
  const list = body.split(/<key>NSPrivacyCollectedDataTypes<\/key>/)[1] ?? '';
  const labels = [...list.matchAll(/<dict>([\s\S]*?)<\/dict>/g)].map(([, d]) => {
    const key = d.match(/<string>NSPrivacyCollectedDataType(\w+)<\/string>/)?.[1];
    const type = APPLE_NAMES[key];
    check(type !== undefined, `${where}: unknown data type NSPrivacyCollectedDataType${key}; add its App Store name to APPLE_NAMES`);
    const purposes = [...d.matchAll(/<string>NSPrivacyCollectedDataTypePurpose(\w+)<\/string>/g)].map(([, p]) => PURPOSES[p] ?? p).sort();
    return {
      type: type ?? key,
      linked: /NSPrivacyCollectedDataTypeLinked<\/key>\s*<true\/>/.test(d),
      tracking: /NSPrivacyCollectedDataTypeTracking<\/key>\s*<true\/>/.test(d),
      purposes,
    };
  });
  check(labels.length > 0, `${where}: no collected data types parsed`);
  return { tracking, labels };
}
const describe = (l) => `${l.type} (${l.purposes.join(', ')})${l.linked ? ' linked' : ' not linked'}${l.tracking ? ', TRACKING' : ''}`;
const pinned = manifest(readFileSync(PINNED, 'utf8'), 'pinned manifest');

if (SIBLING_MODE === 'skip') {
  console.warn('check-legal: LEGAL_SIBLING=skip, the sibling app manifest is not compared');
} else if (!existsSync(SIBLING)) {
  check(false, `the app manifest ${SIBLING} is missing: set LEGAL_SIBLING to its path, or LEGAL_SIBLING=skip to compare against the pin only`);
} else {
  const sibling = manifest(readFileSync(SIBLING, 'utf8'), 'app manifest');
  const a = new Set(sibling.labels.map(describe));
  const b = new Set(pinned.labels.map(describe));
  const onlyApp = [...a].filter((x) => !b.has(x));
  const onlyPin = [...b].filter((x) => !a.has(x));
  check(
    onlyApp.length === 0 && onlyPin.length === 0 && sibling.tracking === pinned.tracking,
    `the app manifest (${SIBLING}) differs from scripts/fixtures/PrivacyInfo.pinned.xcprivacy:` +
      `${onlyPin.map((x) => `\n    pinned only:   ${x}`).join('')}${onlyApp.map((x) => `\n    app only:      ${x}`).join('')}` +
      `${sibling.tracking !== pinned.tracking ? `\n    NSPrivacyTracking: app ${sibling.tracking}, pinned ${pinned.tracking}` : ''}` +
      '\n    Update the pin and the /privacy labels with the app, or land the app change the pin is waiting for.',
  );
}

const sectionsOf = (html) =>
  [...html.matchAll(/<section class="block" id="([^"]+)"[^>]*>\s*<h2[^>]*><span class="num"[^>]*>(\d+)<\/span>([\s\S]*?)<\/h2>([\s\S]*?)<\/section>/g)]
    .map(([, id, num, title, body]) => ({ id, num: Number(num), title, body, text: copyText(plainText(body)) }));
function reader(page) {
  const html = readHtml(page);
  const sections = sectionsOf(html);
  const get = (id) => {
    const s = sections.find((x) => x.id === id);
    check(s !== undefined, `${page}: section #${id} missing from the build`);
    return s?.text ?? '';
  };
  return { html, sections, get, raw: (id) => sections.find((x) => x.id === id)?.body ?? '' };
}
const privacy = reader('privacy');

const labelsHtml = privacy.raw('app-store-labels');
const pageGroup = (group) =>
  [...(labelsHtml.match(new RegExp(`<ul class="labels" data-group="${group}">([\\s\\S]*?)</ul>`))?.[1] ?? '')
    .matchAll(/<span class="label">([^<]+)<\/span>\s*<span class="purposes">\(([^)]*)\)<\/span>/g)]
    .map(([, type, p]) => `${type} (${p.split(', ').sort().join(', ')})`).sort();
const want = (pick) => pinned.labels.filter(pick).map((l) => `${l.type} (${l.purposes.join(', ')})`).sort();
for (const [group, heading, pick] of [
  ['track', 'Data used to track you', (l) => l.tracking],
  ['linked', 'Data linked to you', (l) => l.linked],
  ['not-linked', 'Data not linked to you', (l) => !l.linked],
]) {
  const got = pageGroup(group);
  const expected = want(pick);
  check(
    JSON.stringify(got) === JSON.stringify(expected),
    `privacy #app-store-labels "${heading}" must list exactly [${expected.join('; ') || 'nothing, and the group is left out'}], got [${got.join('; ') || 'nothing'}]`,
  );
}
check(pinned.tracking === /data-group="track"/.test(labelsHtml), 'privacy: "Data used to track you" must be shown exactly while the manifest declares tracking');

// ---------------------------------------------------------------------------------------------------------------
// (b) Tracking exists (AppsFlyer + the IDFA after opt-in), so no page may say otherwise. "We do not sell personal
// information for money" is the one honest sale statement and passes.
const TRACKING_CLAIMS = [
  [/\bno tracking\b/i, '"no tracking"'],
  [/\b(?:do not|don't|does not|doesn't|never|will not|won't)\s+track(?:s)?(?:\s+(?:you|users|learners|anyone))?\b(?!\s+(?:the|your|our)\s+(?:score|progress))/i, 'a "does not track" claim'],
  [/\bnever\s+(?:sell|sells|sold|share|shares|shared)\b(?!\s+anything\s+as\s+"?unlimited)/i, 'a "never sell / never share" claim'],
  [/\b(?:do not|don't|does not|doesn't|will not|won't)\s+share\s+(?:your|any|personal)\b/i, 'a "do not share your data" claim'],
  [/\b(?:do not|don't|does not|doesn't|will not|won't)\s+sell\s+(?:your\s+|any\s+)?(?:personal\s+)?(?:data|information)\b(?!\s+for money)/i, 'a "do not sell your data" claim without "for money"'],
  [/\b(?:never|not)\s+used\s+for\s+tracking\b/i, '"never used for tracking"'],
  [/\buses?\s+no\s+advertising\s+identifier\b/i, '"uses no advertising identifier"'],
  [/track you:?\s*none/i, '"Data used to track you: none"'],
];
for (const [where, html] of copyPages) {
  // "Do Not Track" is the name of a browser signal, not a claim.
  const text = copyText(plainText(html)).replace(/Do Not Track/g, '');
  for (const [pattern, what] of TRACKING_CLAIMS) {
    const hit = text.match(pattern);
    check(!hit, `${where}: must not make ${what} ("${hit?.[0]}"): the app tracks via AppsFlyer and the IDFA when the user opts in`);
  }
}

// ---------------------------------------------------------------------------------------------------------------
// (c) No implementation detail on any page (owner, 2026-10-08): no AI vendor or model, routing, infra, storage,
// hosting or internal tool name. Apple, Google and AppsFlyer are allowed. An allowlist row needs a written reason.
const INTERNALS = [
  'OpenRouter', 'OpenAI', 'GPT', 'Anthropic', 'Claude', 'Gemini', 'DeepSeek', 'Grok', 'xAI', 'Whisper', 'Azure',
  'Microsoft', 'ElevenLabs', 'Langfuse', 'ClickHouse', 'Scaleway', 'Netcup', 'Hetzner', 'Kubernetes', 'k3s', 'S3',
  'RevenueCat', 'Telegram', 'Prometheus', 'Postgres', 'Grafana', 'Redis', 'Vercel', 'Cloudflare', 'Mistral', 'Deepgram',
];
const INTERNALS_ALLOWLIST = [
  // { file: 'blog/x/index.html', term: 'OpenAI', reason: '...' },
];
// Lookarounds rather than \b: \b is ASCII-only, and "GPTBot" or "ChatGPT" must not read as "GPT".
const word = (term) => new RegExp(`(?<![\\p{L}\\p{N}])${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}\\p{N}])`, 'iu');
for (const [where, text] of copyPages) {
  const flat = copyText(text);
  for (const term of INTERNALS) {
    if (INTERNALS_ALLOWLIST.some((a) => a.file === where && a.term === term && a.reason)) continue;
    const hit = flat.match(word(term));
    if (hit) check(false, `${where}: names the internal "${term}" ("…${flat.slice(Math.max(0, hit.index - 40), hit.index + 40)}…")`);
  }
}

// ---------------------------------------------------------------------------------------------------------------
// (d) Identity: filled facts, the operator's name and nothing else, one email, no address or phone, no "OverX".
const IDENTITY = ['OPERATOR', 'OPERATOR_KIND', 'OPERATOR_COUNTRY', 'CONTACT_EMAIL', 'GOVERNING_LAW', 'COURTS', 'SUPERVISORY_AUTHORITY'];
for (const name of IDENTITY) {
  const v = fact(name);
  check(v !== undefined && v.trim() !== '' && !/REPLACE_ME|TODO|TBD|XXX/i.test(v), `src/data/facts.ts: ${name} must be filled (got ${JSON.stringify(v)})`);
}
check(!/REPLACE_ME/.test(FACTS), 'src/data/facts.ts: a REPLACE_ME placeholder is left');
const OPERATOR = fact('OPERATOR') ?? '';
const COUNTRY = fact('OPERATOR_COUNTRY');
const CONTACT = fact('CONTACT_EMAIL') ?? '';
const REPRESENTED = Boolean(fact('EU_REPRESENTATIVE') || fact('UK_REPRESENTATIVE'));

for (const [where, text] of copyPages) {
  check(!/overx/i.test(text.replaceAll(CONTACT, '')), `${where}: must not mention OverX (the contact address aside)`);
  check(!/jack ma\b/i.test(text), `${where}: must not name "Jack Ma"`);
  const emails = [...text.matchAll(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g)].map(([e]) => e).filter((e) => e !== CONTACT && !/\.(?:png|jpe?g|webp|svg)$/i.test(e));
  check(emails.length === 0, `${where}: the only email address is ${CONTACT}, found ${[...new Set(emails)].join(', ')}`);
}
const PHONE = [/\+\d[\d\s().-]{6,}\d/, /\(\d{3}\)\s?\d{3}[-\s]\d{4}/];
const STREET = [
  /\b\d{1,5}[a-z]?,?\s+(?:[A-Z][\w'.-]*\s+){1,4}(?:Street|St\.|Avenue|Ave\.|Road|Rd\.|Boulevard|Blvd|Lane|Drive|Square|Highway)\b/,
  /\b(?:Street|Avenue|Road|Boulevard|Lane|Str\.|ulitsa|kucha|gamziri)\s+\d{1,5}\b/i,
  /\b(?:flat|apt\.?|apartment|suite)\s+\d+/i,
];
for (const [where, text] of copyPages) {
  const plain = copyText(plainText(text));
  for (const p of PHONE) check(!p.test(plain), `${where}: a phone number pattern ${p} must not be published ("${plain.match(p)?.[0]}")`);
  check(!/\btel:/i.test(text), `${where}: a tel: link must not be published`);
  for (const p of STREET) check(!p.test(plain), `${where}: a street-address pattern ${p} must not be published ("${plain.match(p)?.[0]}")`);
}

const PRIVACY_IDS = [
  'who-we-are', ...(REPRESENTED ? ['representatives'] : []), 'app-store-labels', 'not-collected', 'account',
  'learning-profile', 'voice', 'conversations', 'ai-processing', 'automated-decisions', 'progress', 'public',
  'purchases', 'support', 'diagnostics', 'attribution', 'website', 'legal-bases', 'recipients', 'transfers',
  'retention', 'deletion', 'security', 'children', 'rights', 'us-privacy', 'signals', 'changes', 'contact',
];
const TERMS_IDS = [
  'who', 'acceptance', 'eligibility', 'plans', 'limits', 'acceptable-use', 'moderation', 'ai-content',
  'your-content', 'report', 'our-content', 'subscriptions', 'trials', 'cancelling', 'refunds', 'termination',
  'availability', 'disclaimer', 'liability', 'indemnity', 'changes', 'governing-law', 'apple', 'general', 'contact',
];
const FAIR_USE_IDS = ['metered', 'plans', 'arrival', 'limit', 'fair-use', 'changes', 'questions'];
const BANNED_WORDS = [
  'delve', 'unlock', 'unleash', 'elevate', 'empower', 'seamless', 'robust', 'leverage', 'supercharge', 'cutting-edge',
  'state-of-the-art', 'journey', 'navigate', 'crucial', 'utilize', 'facilitate', 'Furthermore', 'Moreover', 'Additionally',
];
const terms = reader('terms');
for (const [page, r, ids] of [
  ['privacy', privacy, PRIVACY_IDS],
  ['terms', terms, TERMS_IDS],
  ['fair-use', reader('fair-use'), FAIR_USE_IDS],
  ['es/fair-use', reader('es/fair-use'), FAIR_USE_IDS],
]) {
  check(JSON.stringify(r.sections.map((s) => s.id)) === JSON.stringify(ids), `${page}: sections must be, in order, ${ids.join(', ')}; got ${r.sections.map((s) => s.id).join(', ')}`);
  r.sections.forEach((s, i) => check(s.num === i + 1, `${page}: #${s.id} is numbered ${s.num}, expected ${i + 1}`));
  // "Section N" links must name the number the target section is shown under.
  for (const [, id, n] of r.html.matchAll(/<a href="#([^"]+)">(?:Section|Sección) (\d+)<\/a>/g)) {
    const target = r.sections.find((s) => s.id === id);
    check(target?.num === Number(n), `${page}: "Section ${n}" links #${id}, which is ${target ? `Section ${target.num}` : 'missing'}`);
  }
  const text = plainText(r.html);
  check(!/REPLACE_ME|\bTODO\b|\bTBD\b/.test(text) && !/lorem ipsum/i.test(text), `${page}: a placeholder (REPLACE_ME/TODO/TBD) is published`);
  const unrendered = text.match(/\bundefined\b|\bNaN\b|\[object Object\]/)?.[0];
  check(!unrendered, `${page}: "${unrendered}" is published, a fact the page interpolates no longer exists`);
  check(!/—|&mdash;/.test(r.sections.map((s) => s.body).join('')), `${page}: no em dashes in legal copy (seo/banned.md)`);
  for (const w of BANNED_WORDS) check(!word(w).test(text), `${page}: seo/banned.md word "${w}"`);
}

// Dates: Effective + Last updated from LEGAL_DATES, and the sitemap's lastmod is the same "Last updated".
const sitemap = readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
for (const [page, key] of [['privacy', 'privacy'], ['terms', 'terms'], ['fair-use', 'fair-use'], ['es/fair-use', 'fair-use']]) {
  const dates = FACTS.match(new RegExp(`'?${key}'?: \\{ effective: '([\\d-]+)', updated: '([\\d-]+)' \\}`));
  const [, effective, updated] = readHtml(page).match(/: <time datetime="([\d-]+)"[^>]*>[^<]+<\/time> · [^:]+: <time datetime="([\d-]+)"[^>]*>/) ?? [];
  check(dates && effective === dates[1] && updated === dates[2], `${page}: must show Effective ${dates?.[1]} and Last updated ${dates?.[2]} from LEGAL_DATES`);
  const lastmod = sitemap.match(new RegExp(`/${page}</loc>\\s*<lastmod>([^<]+)<`))?.[1];
  check(lastmod === dates?.[2], `${page}: sitemap lastmod ${lastmod} must equal Last updated ${dates?.[2]}`);
}

// ---------------------------------------------------------------------------------------------------------------
// (e) Every recipient category in the facts file is named on /privacy.
const CATEGORIES = [...factList('PROCESSOR_CATEGORIES').matchAll(/'([^']+)'/g)].map(([, c]) => c);
check(CATEGORIES.length >= 7, `src/data/facts.ts: PROCESSOR_CATEGORIES not parsed (${CATEGORIES.length})`);
const recipients = privacy.get('recipients');
for (const c of CATEGORIES) check(recipients.toLowerCase().includes(c.toLowerCase()), `privacy #recipients must name the category "${c}"`);
check(/name any provider on request/.test(recipients), 'privacy #recipients must offer to name any provider on request');
for (const [name, policy] of [['Apple', 'https://www.apple.com/legal/privacy/'], ['Google', 'https://policies.google.com/privacy'], ['AppsFlyer', 'https://www.appsflyer.com/legal/privacy-policy/']]) {
  check(recipients.includes(name) && privacy.raw('recipients').includes(`href="${policy}"`), `privacy #recipients must name ${name} with ${policy}`);
}

// ---------------------------------------------------------------------------------------------------------------
// Privacy content the owner decisions and GDPR/CCPA/App Store require.
// A term read from facts.ts is undefined when its declaration stops parsing, and includes(undefined) searches for
// the word "undefined", which a page rendering that same missing constant contains.
const has = (text, terms, what) => {
  for (const t of terms) {
    const ok = t instanceof RegExp ? t.test(text) : typeof t === 'string' && t !== '' && text.includes(t);
    check(ok, `${what} must cover ${t === undefined || t === '' ? 'a fact that src/data/facts.ts no longer declares' : t}`);
  }
};
const SUPERVISORY = fact('SUPERVISORY_AUTHORITY') ?? '';
has(privacy.get('who-we-are'), [OPERATOR, COUNTRY, CONTACT, 'available on request'], 'privacy #who-we-are');
has(privacy.get('account'), ['Apple', 'Google', /no email-and-password/, /no guest/, 'name and profile picture', "device's name"], 'privacy #account');
has(privacy.get('learning-profile'), ['IP address', 'not your precise location', 'flag'], 'privacy #learning-profile');
// Coarse Location is declared, so the page may deny only PRECISE location.
has(privacy.get('not-collected'), ['No precise location', 'GPS', 'country'], 'privacy #not-collected');
has(privacy.get('voice'), ['not kept after', '400 days', 'sign out', 'Arena', "Week's Best", 'generated handle', 'withdraw'], 'privacy #voice');
has(privacy.get('conversations'), ['180 days', 'Settings → My Data', 'AI memories'], 'privacy #conversations');
const ai = privacy.get('ai-processing');
check(ai.includes('We do not use your content to train AI models'), 'privacy #ai-processing must say "We do not use your content to train AI models"');
check(!/train (?:their|theirs)|contractually barred|providers (?:may|can) not use/i.test(copyText(plainText(privacy.html))), 'privacy: the provider no-training claim is OWNER_VERIFY and must not be published');
has(privacy.get('automated-decisions'), [CONTACT, 'a person will review', 'Article 22', 'crisis resources'], 'privacy #automated-decisions');
has(privacy.get('attribution'), ['AppsFlyer', 'Settings → My Data', 'Allow', 'IDFA', 'tracking as Apple defines it', 'sharing', 'Privacy & Security → Tracking'], 'privacy #attribution');
check(privacy.raw('attribution').includes('href="https://www.appsflyer.com/optout"'), "privacy #attribution must link AppsFlyer's opt-out page");
has(privacy.get('diagnostics'), ['13 months', 'advertising identifier'], 'privacy #diagnostics');
has(privacy.get('support'), ['24 months'], 'privacy #support');
const GA_ID = fact('GA_MEASUREMENT_ID');
const gaOn = GA_ID !== undefined;
const CONSENT_COOKIE = FACTS.match(/cookie: '([^']+)'/)?.[1];
if (gaOn) {
  has(privacy.get('website'), ['Google Analytics', 'Accept', 'Reject', 'Global Privacy Control', 'Cookie settings', '_ga', `_ga_${GA_ID.replace(/^G-/, '')}`, CONSENT_COOKIE, '14 months'], 'privacy #website');
}
has(privacy.get('legal-bases'), ['Contract', 'Legitimate interests', 'Consent', 'Legal obligation'], 'privacy #legal-bases');
has(privacy.get('transfers'), ['European Union', 'Standard Contractual Clauses', 'UK', COUNTRY], 'privacy #transfers');
has(privacy.get('retention'), ['400 days', '180 days', '24 months', '13 months', '2 years', '30 days', 'pseudonymised'], 'privacy #retention');
has(privacy.get('deletion'), ['Settings → Account → Delete account', 'sign-in record', 'Apple sign-in', 'attribution', 'subscription', CONTACT, 'machine-readable', '30 days'], 'privacy #deletion');
has(privacy.get('children'), ['13', '16', 'parent'], 'privacy #children');
has(privacy.get('rights'), ['access', 'correct', 'delete', 'restrict', 'portable', 'object', 'withdraw', 'automated decision', 'LGPD', SUPERVISORY, 'where you live', '30 days', CONTACT], 'privacy #rights');
has(copyText(privacy.get('us-privacy')), ['"sharing"', 'We do not sell personal information for money', 'Ask App Not to Track', 'Global Privacy Control', 'authorised agent', 'limit', 'correct', 'not to be treated differently'], 'privacy #us-privacy');
has(privacy.get('signals'), ['Global Privacy Control', 'Do Not Track'], 'privacy #signals');
has(privacy.get('changes'), ['30 days', 'in the app or by email', 'dated address'], 'privacy #changes');
if (!REPRESENTED) check(!/Article 27|representative/i.test(plainText(privacy.html)), 'privacy: no Art. 27 representative is appointed, so none is mentioned');

// Terms content: Apple's minimum EULA terms, 3.1.2(c), EU/UK withdrawal, liability and law (owner decisions 1, 4).
has(terms.get('who'), [OPERATOR, fact('OPERATOR_KIND'), COUNTRY, CONTACT, 'available on request'], 'terms #who');
check(terms.raw('acceptance').includes('href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"'), 'terms #acceptance must link the Apple Standard EULA');
has(terms.get('acceptance'), ['supplement', 'prevail'], 'terms #acceptance');
has(terms.get('eligibility'), ['13', '16', '18', 'parent'], 'terms #eligibility');
check(terms.raw('plans').includes('href="/fair-use"'), 'terms #plans must link /fair-use');
has(terms.get('subscriptions'), ['charged to your Apple ID account at confirmation of purchase', 'renews automatically at the same price', 'at least 24 hours before the end of the current period', 'within 24 hours before the end of the current period', 'Apple ID account settings', "Apple's rules"], 'terms #subscriptions (3.1.2(c))');
has(terms.get('trials'), ['If a free trial', 'forfeited when you purchase a subscription', '24 hours'], 'terms #trials');
has(terms.get('refunds'), ['14 days', 'immediate', 'Apple'], 'terms #refunds');
check(terms.raw('refunds').includes('href="https://reportaproblem.apple.com"'), "terms #refunds must link Apple's refund page");
has(terms.get('moderation'), ['Automated', 'contest', 'a person will review'], 'terms #moderation');
has(terms.get('ai-content'), ['inaccurate', 'not a certified exam', 'immigration', 'medical', 'legal', 'do not guarantee'], 'terms #ai-content');
has(terms.get('your-content'), ['licence', 'withdraw', 'already happened', 'we do not use it to train AI models'], 'terms #your-content');
has(terms.get('report'), ['infring', 'person will review', 'contest'], 'terms #report');
has(terms.get('disclaimer'), ['"as is"', 'To the extent permitted by law'], 'terms #disclaimer');
has(terms.get('liability'), [fact('LIABILITY_FLOOR'), '12 months', 'indirect', 'cannot be limited or excluded by law', 'death or personal injury', 'fraud', 'consumers'], 'terms #liability');
has(terms.get('indemnity'), ['breach', 'consumer'], 'terms #indemnity');
has(terms.get('changes'), ['30 days', 'cancel', 'keep using'], 'terms #changes');
has(terms.get('governing-law'), [`law of ${fact('GOVERNING_LAW')}`, fact('COURTS'), 'consumer', 'mandatory', 'courts where they live', 'data protection authority'], 'terms #governing-law');
check(!/arbitrat|class[- ]action|\bjury\b/i.test(plainText(terms.html)), 'terms: no arbitration, class-action waiver or jury clause (owner decision 4)');
const apple = terms.get('apple').toLowerCase();
for (const clause of ['acknowledgement', 'scope of licence', 'maintenance and support', 'warranty', 'product claims', 'intellectual property', 'legal compliance', 'embargo', 'developer contact', 'third-party terms', 'third-party beneficiar']) {
  check(apple.includes(clause), `terms #apple must carry the Apple EULA clause on ${clause}`);
}
has(terms.get('general'), ['unenforceable', 'not a waiver', 'transfer', 'whole agreement', 'English version prevails'], 'terms #general');
check(!/\bunlimited\b/i.test(terms.get('plans') + terms.get('limits')), 'terms: no plan is called unlimited');

// Fair use: no Free column (owner, 2026-10-08), paid figures only, both locales.
for (const page of ['fair-use', 'es/fair-use']) {
  const html = readHtml(page);
  const head = html.match(/<thead>([\s\S]*?)<\/thead>/)?.[1] ?? '';
  check(!/Free|Gratis/i.test(head), `${page}: the allowance table must not carry a Free column`);
  for (const n of ['300', '600', '1[,.]200', '90', '180', '360', '2[,.]500', '10[,.]000', '30[,.]000']) check(new RegExp(`\\b${n}\\b`).test(head + html.match(/<tbody>([\s\S]*?)<\/tbody>/)?.[1]), `${page}: allowance ${n} missing`);
  check(/limited access|acceso limitado/.test(plainText(html)), `${page}: must say free accounts get limited access, shown in the app`);
}

// ---------------------------------------------------------------------------------------------------------------
// Website consent (Consent Mode v2, GPC = reject): gtag.js loads only from the consent module, after Accept.
// Astro inlines a small module and emits a large one to /_astro, so a page's modules are read in both forms. Only the
// consent module may name gtag: exempting every module would let any other script load it before consent.
const isConsentModule = (js) => js.includes('globalPrivacyControl') && CONSENT_COOKIE !== undefined && js.includes(CONSENT_COOKIE);
const modulesOf = (html) => [
  ...(html.match(INLINE_MODULE) ?? []),
  ...[...html.matchAll(/<script\b[^>]*\bsrc="(\/_astro\/[^"]+\.js)"/g)].map(([, src]) => readFileSync(path.join(DIST, src), 'utf8')),
];
const consentModules = htmlPages.flatMap(([, h]) => modulesOf(h).filter(isConsentModule)).join('\n');
if (gaOn) {
  for (const needle of ['globalPrivacyControl', 'googletagmanager.com/gtag/js', 'ad_user_data', 'ad_personalization', 'analytics_storage', 'data-consent-open', 'page_location']) {
    check(consentModules.includes(needle), `consent module: must contain ${needle}`);
  }
}
for (const [file, html] of htmlPages) {
  const page = html.replace(INLINE_MODULE, '');
  const modules = modulesOf(html);
  check(
    !/googletagmanager|gtag\(/.test(page) && modules.every((js) => !/googletagmanager|gtag\(/.test(js) || isConsentModule(js)),
    `${file}: Google Analytics must load only from the consent module, never from the page or another script`,
  );
  if (gaOn) check(modules.some(isConsentModule), `${file}: the consent module is not loaded, so the banner and Cookie settings are dead`);
  const banner = html.match(/<div id="consent"[^>]*>[\s\S]*?<\/div>\s*<\/div>/)?.[0] ?? '';
  if (!gaOn) {
    check(!banner && !html.includes('data-consent-open'), `${file}: no consent banner or Cookie settings while GA_MEASUREMENT_ID is unset`);
    continue;
  }
  check(/^<div[^>]*\brole="region"[^>]*\shidden\b/.test(banner), `${file}: the consent banner must be a region, hidden until the script shows it`);
  check(banner.includes('data-consent="granted"') && banner.includes('data-consent="denied"'), `${file}: the consent banner needs Accept and Reject`);
  check(banner.includes('href="/privacy#website"'), `${file}: the consent banner must link /privacy#website`);
  if (html.includes('<footer')) {
    check(html.includes('data-consent-open'), `${file}: the footer must carry Cookie settings`);
    check(html.match(/<footer[\s\S]*?<\/footer>/)?.[0].includes(OPERATOR), `${file}: the footer copyright must name ${OPERATOR}`);
  }
}

if (failures.length) {
  console.error(`check-legal: ${failures.length} failed\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log('check-legal: ok');
