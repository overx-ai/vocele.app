// English lives at the root; every other language under its prefix (/es, /es/pricing...).
// `tag` is <html lang> and the schema.org language; `dateTag` and `numberTag` drive Intl, and differ from `tag` where the
// site's published format does: Spanish writes 2.500 under es-MX pages, Arabic keeps Latin digits to match its prices.
// `displayFont: 'outfit'` needs a Latin alphabet: Outfit has no Cyrillic, Japanese or Arabic (see global.css).
export const LANGS = [
  { code: 'en', prefix: '', hreflang: 'en-US', tag: 'en-US', og: 'en_US', name: 'English', dir: 'ltr', dateTag: 'en-US', numberTag: 'en-US', displayFont: 'outfit' },
  { code: 'es', prefix: 'es', hreflang: 'es-MX', tag: 'es-MX', og: 'es_MX', name: 'Español', dir: 'ltr', dateTag: 'es-MX', numberTag: 'es-ES', displayFont: 'outfit' },
  { code: 'ru', prefix: 'ru', hreflang: 'ru', tag: 'ru', og: 'ru_RU', name: 'Русский', dir: 'ltr', dateTag: 'ru', numberTag: 'ru', displayFont: 'system' },
  { code: 'pl', prefix: 'pl', hreflang: 'pl', tag: 'pl', og: 'pl_PL', name: 'Polski', dir: 'ltr', dateTag: 'pl', numberTag: 'pl', displayFont: 'outfit' },
  { code: 'pt', prefix: 'pt', hreflang: 'pt-BR', tag: 'pt-BR', og: 'pt_BR', name: 'Português', dir: 'ltr', dateTag: 'pt-BR', numberTag: 'pt-BR', displayFont: 'outfit' },
  { code: 'de', prefix: 'de', hreflang: 'de', tag: 'de', og: 'de_DE', name: 'Deutsch', dir: 'ltr', dateTag: 'de', numberTag: 'de', displayFont: 'outfit' },
  { code: 'fr', prefix: 'fr', hreflang: 'fr', tag: 'fr', og: 'fr_FR', name: 'Français', dir: 'ltr', dateTag: 'fr', numberTag: 'fr', displayFont: 'outfit' },
  { code: 'it', prefix: 'it', hreflang: 'it', tag: 'it', og: 'it_IT', name: 'Italiano', dir: 'ltr', dateTag: 'it', numberTag: 'it', displayFont: 'outfit' },
  { code: 'ja', prefix: 'ja', hreflang: 'ja', tag: 'ja', og: 'ja_JP', name: '日本語', dir: 'ltr', dateTag: 'ja', numberTag: 'ja', displayFont: 'system' },
  { code: 'ar', prefix: 'ar', hreflang: 'ar', tag: 'ar', og: 'ar_SA', name: 'العربية', dir: 'rtl', dateTag: 'ar-u-nu-latn', numberTag: 'ar-u-nu-latn', displayFont: 'system' },
] as const;

export type Locale = (typeof LANGS)[number];
export type Lang = Locale['code'];

export const DEFAULT_LANG: Lang = 'en';

// Publishing a locale means adding its code here: routes, sitemap, hreflang, the language menu and the 404 redirect all
// read this list. A code without its src/i18n/<code>.ts fails the build.
export const LIVE_LANGS = ['en', 'es', 'ru', 'pl', 'pt', 'de', 'fr', 'it', 'ja', 'ar'] as const satisfies readonly Lang[];

export const X_DEFAULT = 'x-default';

export const localeOf = (lang: Lang): Locale => LANGS.find((l) => l.code === lang)!;

export const liveLocales = (): Locale[] => LIVE_LANGS.map(localeOf);

export const translatedPaths = () =>
  LIVE_LANGS.filter((lang) => lang !== DEFAULT_LANG).map((lang) => ({ params: { lang }, props: { lang } }));
