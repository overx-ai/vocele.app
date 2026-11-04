import type { Lang } from '../i18n/locales';

export const PLANS = ['core', 'fluency', 'meta'] as const;
export type Plan = (typeof PLANS)[number];
export const PLAN_NAMES: Record<Plan, string> = { core: 'Core', fluency: 'Fluency', meta: 'Meta' };

export interface LocalePrices {
  currency: string;
  amounts: Record<Plan, string>;
  display: Record<Plan, string>;
}

const prices = (currency: string, amounts: readonly [string, string, string], format: (amount: string) => string): LocalePrices => ({
  currency,
  amounts: { core: amounts[0], fluency: amounts[1], meta: amounts[2] },
  display: { core: format(amounts[0]), fluency: format(amounts[1]), meta: format(amounts[2]) },
});

const NBSP = '\u00a0';
const decimalComma = (amount: string) => amount.replace('.', ',');
const USD = prices('USD', ['14.99', '29.99', '49.99'], (a) => `$${a}`);
const EUR = prices('EUR', ['17.99', '34.99', '59.99'], (a) => `${decimalComma(a)}${NBSP}€`);

// App Store monthly prices per storefront. Amounts are schema.org Offer prices, display is what the page prints.
export const PRICES: Record<Lang, LocalePrices> = {
  en: USD,
  es: USD,
  de: EUR,
  fr: EUR,
  it: EUR,
  pl: prices('PLN', ['69.99', '129.99', '229.99'], (a) => `${decimalComma(a)}${NBSP}zł`),
  pt: prices('BRL', ['99.90', '199.90', '299.90'], (a) => `R$${NBSP}${decimalComma(a)}`),
  ja: prices('JPY', ['2500', '5000', '8000'], (a) => `¥${Number(a).toLocaleString('en-US')}`),
  ru: prices('RUB', ['1290', '2490', '4490'], (a) => `${a.replace(/\B(?=\d{3}$)/, NBSP)}${NBSP}₽`),
  ar: prices('SAR', ['59.99', '129.99', '199.99'], (a) => `${a}${NBSP}ر.س.`),
};

// What a private tutor twice a week costs per month in each market: eight lessons at sourced hourly rates, listed in
// spec 002. Never guess one: without a source, a locale stays in USD.
const tutor = (tutorLow: string, tutorHigh: string, tutorRange: string) => ({ tutorLow, tutorHigh, tutorRange });
const USD_TUTOR = tutor('$200', '$320', '$200–320');

export const TUTOR: Record<Lang, ReturnType<typeof tutor>> = {
  en: USD_TUTOR,
  es: USD_TUTOR,
  de: tutor(`180${NBSP}€`, `295${NBSP}€`, `180–295${NBSP}€`),
  fr: tutor(`160${NBSP}€`, `540${NBSP}€`, `160–540${NBSP}€`),
  it: tutor(`120${NBSP}€`, `200${NBSP}€`, `120–200${NBSP}€`),
  pl: tutor(`400${NBSP}zł`, `660${NBSP}zł`, `400–660${NBSP}zł`),
  pt: tutor(`R$${NBSP}400`, `R$${NBSP}1.200`, `R$${NBSP}400–1.200`),
  ja: tutor('¥60,000', '¥75,000', '¥60,000〜75,000'),
  ru: tutor(`12${NBSP}000${NBSP}₽`, `19${NBSP}000${NBSP}₽`, `12${NBSP}000–19${NBSP}000${NBSP}₽`),
  ar: tutor(`800${NBSP}ر.س.`, `1,200${NBSP}ر.س.`, `800–1,200${NBSP}ر.س.`),
};
