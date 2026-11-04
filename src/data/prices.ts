import type { Lang } from '../i18n/locales';

export const PLANS = ['core', 'fluency', 'meta'] as const;
export type Plan = (typeof PLANS)[number];
export const PLAN_NAMES: Record<Plan, string> = { core: 'Core', fluency: 'Fluency', meta: 'Meta' };

export interface LocalePrices {
  currency: string;
  amounts: Record<Plan, string>;
  display: Record<Plan, string>;
}

type Format = (amount: string) => string;

const NBSP = '\u00a0';
const suffixed = (symbol: string): Format => (amount) => `${amount}${NBSP}${symbol}`;
const usd: Format = (amount) => `$${amount}`;
const jpy: Format = (amount) => `¥${amount}`;
const brl: Format = (amount) => `R$${NBSP}${amount}`;
const eur = suffixed('€');
const pln = suffixed('zł');
const rub = suffixed('₽');
const sar = suffixed('ر.س.');
const decimalComma = (amount: string) => amount.replace('.', ',');

const prices = (currency: string, [core, fluency, meta]: readonly [string, string, string], format: Format): LocalePrices => ({
  currency,
  amounts: { core, fluency, meta },
  display: { core: format(core), fluency: format(fluency), meta: format(meta) },
});

const USD = prices('USD', ['14.99', '29.99', '49.99'], usd);
const EUR = prices('EUR', ['17.99', '34.99', '59.99'], (a) => eur(decimalComma(a)));

// App Store monthly prices per storefront. Amounts are schema.org Offer prices, display is what the page prints.
export const PRICES: Record<Lang, LocalePrices> = {
  en: USD,
  es: USD,
  de: EUR,
  fr: EUR,
  it: EUR,
  pl: prices('PLN', ['69.99', '129.99', '229.99'], (a) => pln(decimalComma(a))),
  pt: prices('BRL', ['99.90', '199.90', '299.90'], (a) => brl(decimalComma(a))),
  ja: prices('JPY', ['2500', '5000', '8000'], (a) => jpy(Number(a).toLocaleString('en-US'))),
  ru: prices('RUB', ['1290', '2490', '4490'], (a) => rub(a.replace(/\B(?=\d{3}$)/, NBSP))),
  ar: prices('SAR', ['59.99', '129.99', '199.99'], sar),
};

// What a private tutor twice a week costs per month in each market: eight lessons at sourced hourly rates, listed in
// spec 002. Never guess one: without a source, a locale stays in USD.
const tutor = (format: Format, low: string, high: string, rangeDash = '–') => ({
  tutorLow: format(low),
  tutorHigh: format(high),
  tutorRange: format(`${low}${rangeDash}${high}`),
});
const USD_TUTOR = tutor(usd, '200', '320');

export const TUTOR: Record<Lang, ReturnType<typeof tutor>> = {
  en: USD_TUTOR,
  es: USD_TUTOR,
  de: tutor(eur, '180', '295'),
  fr: tutor(eur, '160', '480'),
  it: tutor(eur, '120', '200'),
  pl: tutor(pln, '400', '660'),
  pt: tutor(brl, '400', '1.200'),
  ja: tutor(jpy, '60,000', '75,000', '〜'),
  ru: tutor(rub, `12${NBSP}000`, `19${NBSP}000`),
  ar: tutor(sar, '800', '1,200'),
};
