import { PLAN_ALLOWANCE } from '../data/facts';
import { PLANS, PRICES, TUTOR } from '../data/prices';
import { localePath } from '../site-pages';
import { localeOf, type Lang } from './locales';
import type { Copy } from './en';

// A copy file plugs in by existing: src/i18n/<code>.ts, default-exporting a `Copy`, is all the loader needs.
const FILES = import.meta.glob<{ default: Copy }>('./[a-z][a-z].ts', { eager: true });

const copyFile = (lang: Lang): Copy => {
  const file = FILES[`./${lang}.ts`];
  if (!file) throw new Error(`src/i18n/${lang}.ts is missing, but "${lang}" is in LIVE_LANGS`);
  return file.default;
};

type Vars = Record<string, string>;

const fill = (text: string, vars: Vars) =>
  text.replace(/\{(\w+)\}/g, (_, name: string) => {
    if (!(name in vars)) throw new Error(`Unknown placeholder {${name}} in copy: "${text}"`);
    return vars[name];
  });

const fillAll = <T>(value: T, vars: Vars): T => {
  if (typeof value === 'string') return fill(value, vars) as T;
  if (Array.isArray(value)) return value.map((v) => fillAll(v, vars)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fillAll(v, vars)])) as T;
  }
  return value;
};

// What a copy file may write as {name}. Prices, allowances and links stay out of the prose, so no locale can misquote one.
const placeholders = (lang: Lang, number: (n: number) => string): Vars => {
  const { talkPerMonth, pronunciationPerMonth, vocabulary, pdfPerMonth } = PLAN_ALLOWANCE;
  const perPlan = PLANS.flatMap((plan, i) => [
    [`${plan}Price`, PRICES[lang].display[plan]],
    [`${plan}Talk`, number(talkPerMonth[i])],
    [`${plan}Pron`, number(pronunciationPerMonth[i])],
    [`${plan}Words`, number(vocabulary[i])],
    [`${plan}Pdf`, number(pdfPerMonth[i])],
  ]);
  return {
    ...Object.fromEntries(perPlan),
    ...TUTOR[lang],
    pricingHref: localePath(lang, 'pricing'),
    fairUseHref: localePath(lang, 'fair-use'),
  };
};

const formatters = (lang: Lang) => {
  const { dateTag, numberTag } = localeOf(lang);
  return {
    number: (n: number) => new Intl.NumberFormat(numberTag, { useGrouping: 'always' }).format(n),
    date: (iso: string, options: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(dateTag, { timeZone: 'UTC', ...options }).format(new Date(`${iso}T00:00:00Z`)),
  };
};

const load = (lang: Lang) => {
  const fmt = formatters(lang);
  return { t: fillAll(copyFile(lang), placeholders(lang, fmt.number)), fmt, locale: localeOf(lang) };
};

const LOADED = new Map<Lang, ReturnType<typeof load>>();

export const useLang = (lang: Lang) => {
  if (!LOADED.has(lang)) LOADED.set(lang, load(lang));
  return LOADED.get(lang)!;
};
