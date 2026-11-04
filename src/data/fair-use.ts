import { PLAN_ALLOWANCE as ALLOWANCE, mailto } from './facts';
import { PLANS, PLAN_NAMES } from './prices';
import { legalSections, legalTable } from './sections';
import type { Lang, LegalDocument } from './types';
import { useLang } from '../i18n';

// Not an FAQ accordion on purpose: ASA v EE (2025) held a fair-use policy misleading on PLACEMENT alone, because it
// sat behind an FAQ expander. Never fold this into /faq. No prices here (the paywall is the price surface).
// The FREE column was dropped (owner, 2026-10-08): free gets no recurring minutes beyond the onboarding
// conversation, a GitOps-tunable vocabulary cap and limited stories, and a table cell cannot stay exactly true to
// that. Top-ups are absent because no top-up product can be bought in the app.
const IDS = ['metered', 'plans', 'arrival', 'limit', 'fair-use', 'changes', 'questions'] as const;

const DAYS_PER_MONTH = 30;
const SECTIONS = legalSections(IDS);

export function fairUseDocument(lang: Lang): LegalDocument {
  const { t: { fairUse: copy }, fmt: { number: n } } = useLang(lang);
  const { talk, pron, vocab, pdf, rest, day, month, words, included } = copy.table;
  const perDay = (minutes: number) => n(minutes / DAYS_PER_MONTH);
  const table = legalTable(['&nbsp;', ...PLANS.map((plan) => PLAN_NAMES[plan])], [
    [talk, ...ALLOWANCE.talkPerMonth.map((m) => `<strong>${perDay(m)} ${day}</strong><br />${n(m)} ${month}`)],
    [pron, ...ALLOWANCE.pronunciationPerMonth.map((m) => `${perDay(m)} ${day}<br />${n(m)} ${month}`)],
    [vocab, ...ALLOWANCE.vocabulary.map((v) => `${n(v)} ${words}`)],
    [pdf, ...ALLOWANCE.pdfPerMonth.map((v) => `${n(v)} ${month}`)],
    [rest, ...PLANS.map(() => included)],
  ]);
  const { plans, questions, ...prose } = copy.sections;
  return {
    pageTitle: copy.pageTitle,
    heading: copy.heading,
    description: copy.description,
    summaryTitle: '',
    summaryHtml: copy.summaryHtml,
    sections: SECTIONS.build({
      ...prose,
      plans: { title: plans.title, content: `${table}${plans.note}` },
      questions: { title: questions.title, content: `
        <p>${mailto()}</p>` },
    }),
  };
}
