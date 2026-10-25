// Every fact the legal pages state about who runs Vocele and how long data is kept. Pages must not hardcode any of
// it, and scripts/check-legal.mjs reads the identity constants below by name.

// The controller on /privacy and the trader on /terms: a person, never a company or trading name (owner, 2026-10-08).
export const OPERATOR = 'Yauheni Malashchytski';
export const OPERATOR_KIND = 'an individual entrepreneur (sole trader)';
export const OPERATOR_COUNTRY = 'Georgia';
// One address for support, privacy requests and legal notices. No street address or phone is published: the postal
// address is given on request by email (owner, 2026-10-08).
export const CONTACT_EMAIL = 'support@overx.ai';
// GDPR and UK GDPR Art. 27 representatives. Empty = none appointed, and /privacy leaves the section out.
export const EU_REPRESENTATIVE = '';
export const UK_REPRESENTATIVE = '';
export const GOVERNING_LAW = 'Georgia';
export const COURTS = 'the courts of Tbilisi, Georgia';
export const SUPERVISORY_AUTHORITY = "Georgia's Personal Data Protection Service";

export const SITE_HOST = 'vocele.app';
export const LIABILITY_FLOOR = 'USD 50';

// Owner notes that must never render. OWNER_VERIFY items are true only once the owner confirms them.
export const OWNER_NOTES = {
  publishAfterBackend:
    'The privacy policy describes the state after the app and backend fixes now in flight (CustomerSupport label, ' +
    'retention jobs, deletion scope, attribution consent everywhere). Publish it only after those deploy.',
  OWNER_VERIFY_providersNoTraining:
    'Before saying "our providers may not use your content to train their models", confirm every AI, speech and ' +
    'TTS contract says so. Until then only "we do not use your content to train AI models" is published.',
} as const;

export const LEGAL_DATES = {
  privacy: { effective: '2026-10-08', updated: '2026-10-19' },
  terms: { effective: '2026-10-08', updated: '2026-10-26' },
  'fair-use': { effective: '2026-10-08', updated: '2026-10-08' },
} as const;

export const RETENTION = {
  speechResultsDays: 400,
  exerciseHistoryDays: 400,
  conversationsDays: 180,
  duelTakesDaysAfterRefresh: 30,
  showcaseDaysAfterWeek: 30,
  supportMonths: 24,
  diagnosticsMonths: 13,
  deletionDays: 30,
  backupDays: 30,
  trialFingerprintYears: 2,
  websiteAnalyticsMonths: 14,
  exportDays: 30,
  rightsResponseDays: 30,
  changeNoticeDays: 30,
} as const;

// Recipients are named by category only, except the four third parties in EXTERNAL (owner, 2026-10-08).
export const PROCESSOR_CATEGORIES = [
  'AI language-model providers',
  'speech-recognition and pronunciation-assessment providers',
  'text-to-speech providers',
  'cloud hosting and storage (in the European Union)',
  'subscription and purchase management',
  'customer-support messaging',
  'DNS/content delivery and security',
] as const;

export const AGES = { minimum: 13, minimumEeaUk: 16, adult: 18 } as const;

// Google Analytics 4 for this website, loaded only after Accept in the consent banner (src/scripts/consent.ts).
export const GA_MEASUREMENT_ID: string | undefined = 'G-0ZQBJJGWPG';
export const GA_COOKIES = GA_MEASUREMENT_ID ? ['_ga', `_ga_${GA_MEASUREMENT_ID.replace(/^G-/, '')}`] : [];
export const GA_COOKIE_SECONDS = RETENTION.websiteAnalyticsMonths * 30 * 86_400;
export const GTAG_SCRIPT = (id: string) => `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
export const CONSENT = { cookie: 'vocele_consent', days: 182 } as const;

export const EXTERNAL = {
  appleEula: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/',
  applePrivacy: 'https://www.apple.com/legal/privacy/',
  appleRefund: 'https://reportaproblem.apple.com',
  googlePrivacy: 'https://policies.google.com/privacy',
  googlePartnerSites: 'https://policies.google.com/technologies/partner-sites',
  appsflyerPrivacy: 'https://www.appsflyer.com/legal/privacy-policy/',
  appsflyerOptout: 'https://www.appsflyer.com/optout',
} as const;

export const mailto = (email: string = CONTACT_EMAIL) => `<a href="mailto:${email}">${email}</a>`;

export const externalLink = (url: string, label: string = url) =>
  `<a href="${url}" rel="noopener noreferrer">${label}</a>`;

const LOCALES = { en: 'en-GB', es: 'es-ES' } as const;

export const formatDate = (iso: string, lang: keyof typeof LOCALES = 'en') =>
  new Intl.DateTimeFormat(LOCALES[lang], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${iso}T00:00:00Z`),
  );
