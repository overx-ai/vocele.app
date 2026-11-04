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

// The human tutor the plans are sold against stays in USD everywhere: it is a researched US figure, not a storefront
// price, and no per-country figure has been sourced (spec 002: real storefront data or USD, never guessed).
export const TUTOR = { tutorLow: '$200', tutorHigh: '$320', tutorRange: '$200–320' } as const;
