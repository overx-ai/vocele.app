export type { Lang } from '../i18n/locales';

export interface LegalSection {
  id: string;
  title: string;
  content: string;
}

export interface LegalDocument {
  pageTitle: string;
  description: string;
  heading: string;
  summaryTitle: string;
  summaryHtml: string;
  sections: readonly LegalSection[];
}

export interface LegalDates {
  effective: string;
  updated: string;
}
