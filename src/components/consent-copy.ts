import type { Lang } from '../data/types';

export const CONSENT_COPY: Record<Lang, { label: string; text: string; accept: string; reject: string; privacy: string; settings: string }> = {
  en: {
    label: 'Cookie choice',
    text: "We'd like to measure visits to improve this site. Nothing is measured unless you accept.",
    accept: 'Accept',
    reject: 'Reject',
    privacy: 'Privacy',
    settings: 'Cookie settings',
  },
  es: {
    label: 'Aviso de cookies',
    text: 'Nos gustaría medir las visitas para mejorar este sitio. No se mide nada si no aceptas.',
    accept: 'Aceptar',
    reject: 'Rechazar',
    privacy: 'Privacidad',
    settings: 'Configuración de cookies',
  },
};
