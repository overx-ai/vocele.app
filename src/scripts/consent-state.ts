import { CONSENT } from '../data/facts';

export const CHOICES = ['granted', 'denied'] as const;
export type Choice = (typeof CHOICES)[number];

const DAY_S = 86_400;
const ATTRIBUTES = 'Path=/; SameSite=Lax; Secure';

const isChoice = (value: string | undefined): value is Choice => CHOICES.includes(value as Choice);

export function parseCookies(header: string): Map<string, string> {
  const cookies = new Map<string, string>();
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq < 0) continue;
    try {
      cookies.set(part.slice(0, eq).trim(), decodeURIComponent(part.slice(eq + 1).trim()));
    } catch {
      continue;
    }
  }
  return cookies;
}

export function readChoice(cookieHeader: string): Choice | undefined {
  const value = parseCookies(cookieHeader).get(CONSENT.cookie);
  return isChoice(value) ? value : undefined;
}

// Global Privacy Control counts as Reject until the visitor chooses otherwise in Cookie settings (/privacy #signals).
export const initialChoice = (stored: Choice | undefined, globalPrivacyControl: boolean): Choice | undefined =>
  stored ?? (globalPrivacyControl ? 'denied' : undefined);

export const choiceCookie = (choice: Choice) =>
  `${CONSENT.cookie}=${choice}; Max-Age=${CONSENT.days * DAY_S}; ${ATTRIBUTES}`;

export const shouldShowBanner = (measurementId: string | undefined, choice: Choice | undefined) =>
  Boolean(measurementId) && choice === undefined;

export const mustReload = (previous: Choice | undefined, next: Choice) => previous === 'granted' && next === 'denied';

// gtag reports the whole URL and the referrer, and an invite link carries the inviting learner's account id in ?uid=.
// Only campaign tags may reach Google.
export function analyticsUrl(url: string): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    for (const key of [...parsed.searchParams.keys()]) if (!key.startsWith('utm_')) parsed.searchParams.delete(key);
    parsed.hash = '';
    return parsed.toString();
  } catch {
    return undefined;
  }
}

const GA_COOKIE = /^_ga(?:_|$)/;

export const analyticsCookies = (cookieHeader: string) => [...parseCookies(cookieHeader).keys()].filter((name) => GA_COOKIE.test(name));

// GA sets its cookies on the highest domain the browser accepts (.vocele.app from www.vocele.app), so a cookie is
// deleted only by a write that repeats its domain: try the host-only form and every parent domain but the TLD.
export function expiryCookies(names: string[], hostname: string): string[] {
  const labels = hostname.split('.');
  const domains = labels.slice(0, -1).map((_, i) => labels.slice(i).join('.'));
  const scopes = ['', ...domains.map((domain) => `; Domain=.${domain}`)];
  return names.flatMap((name) => scopes.map((scope) => `${name}=; Max-Age=0; Path=/${scope}`));
}
