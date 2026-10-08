import { mailto } from './facts';
import { legalSections, legalTable } from './sections';
import type { Lang, LegalDocument } from './types';

// Not an FAQ accordion on purpose: ASA v EE (2025) held a fair-use policy misleading on PLACEMENT alone, because it
// sat behind an FAQ expander. Never fold this into /faq. No prices here (the paywall is the price surface).
// Paid allowances verified 2026-10-08 against learn-words at 1B-bots origin/master: services/minute_wallets.py
// PLAN_MINUTES (300/90, 600/180, 1200/360) and services/entitlements.py TIER_LIMITS (vocabulary, PDF imports).
// The FREE column was dropped (owner, 2026-10-08): free gets no recurring minutes beyond the onboarding
// conversation, a GitOps-tunable vocabulary cap and limited stories, and a table cell cannot stay exactly true to
// that. Top-ups are absent because no top-up product can be bought in the app.
const IDS = ['metered', 'plans', 'arrival', 'limit', 'fair-use', 'changes', 'questions'] as const;

const PLANS = ['Core', 'Fluency', 'Meta'] as const;
const ALLOWANCE = {
  talkPerMonth: [300, 600, 1200],
  pronunciationPerMonth: [90, 180, 360],
  vocabulary: [2500, 10000, 30000],
  pdfPerMonth: [2, 5, 20],
} as const;
const DAYS_PER_MONTH = 30;
const EN = legalSections(IDS);
const ES = legalSections(IDS, 'Sección');

function table(lang: Lang) {
  const n = (v: number) => v.toLocaleString('en-US').replace(/,/g, lang === 'es' ? '.' : ',');
  const t =
    lang === 'es'
      ? { talk: 'Conversación', pron: 'Práctica de pronunciación', vocab: 'Vocabulario guardado', pdf: 'Importaciones de PDF', rest: 'Sets de palabras, historias, repasos, gramática', day: 'min al día', month: 'al mes', words: 'palabras', included: 'Incluido' }
      : { talk: 'Conversation', pron: 'Pronunciation practice', vocab: 'Saved vocabulary', pdf: 'PDF imports', rest: 'Word sets, stories, reviews, grammar', day: 'min a day', month: 'a month', words: 'words', included: 'Included' };
  const perDay = (month: number) => n(month / DAYS_PER_MONTH);
  return legalTable(['&nbsp;', ...PLANS], [
    [t.talk, ...ALLOWANCE.talkPerMonth.map((m) => `<strong>${perDay(m)} ${t.day}</strong><br />${n(m)} ${t.month}`)],
    [t.pron, ...ALLOWANCE.pronunciationPerMonth.map((m) => `${perDay(m)} ${t.day}<br />${n(m)} ${t.month}`)],
    [t.vocab, ...ALLOWANCE.vocabulary.map((v) => `${n(v)} ${t.words}`)],
    [t.pdf, ...ALLOWANCE.pdfPerMonth.map((v) => `${v} ${t.month}`)],
    [t.rest, ...PLANS.map(() => t.included)],
  ]);
}

const en: LegalDocument = {
  pageTitle: 'Usage & Fair Use',
  heading: 'Usage &amp; fair use',
  description:
    'Exactly how many conversation minutes and pronunciation minutes each Vocele plan includes, what happens when you reach them, and what counts as fair use.',
  summaryTitle: '',
  summaryHtml:
    '<strong>We do not sell anything as unlimited.</strong> Speaking with an AI coach costs real money to run, so every plan includes a stated amount of it. We would rather print the number than hide a cap behind a word. This page is the number, in full, before you pay for anything.',
  sections: EN.build({
    metered: {
      title: 'What is metered, and what is not',
      content: `
        <p><strong>Metered:</strong> spoken conversation with your AI coach, and pronunciation scoring. These are the
        two things that run live AI on every use.</p>
        <p><strong>Not metered:</strong> word sets, stories, listening, reviews, grammar, writing exercises,
        translations of words you look up, your vocabulary and your whole progress history. They are included in your
        plan and do not consume conversation minutes, however much you use them. Saved vocabulary has a storage limit,
        listed below.</p>
        <p>A typed turn in a conversation is cheaper to run than a spoken one, and is charged as roughly eight seconds
        of conversation rather than as speaking time.</p>`,
    },
    plans: {
      title: 'What each plan includes',
      content: `${table('en')}
        <p class="table-note">Core is also sold weekly: that plan grants the same monthly amounts across a cycle,
        weighted towards the first week. An annual plan grants its twelve months together. The figures shown in the app
        for your own plan are the ones that apply, and they are shown before you pay.</p>
        <p>Free accounts can try the app with limited access; what's included is shown in the app.</p>`,
    },
    arrival: {
      title: 'How minutes arrive',
      content: `
        <p>A monthly plan grants its whole allowance when you subscribe, and again at each renewal. The weekly Core plan
        spreads the same monthly amounts across a cycle, weighted towards the first week, so a week of it and a quarter
        of a month come to the same thing. An annual plan grants its twelve months together.</p>
        <p>Unused minutes carry over, and we never sweep them. What is capped is the balance you can hold at once: two
        months' worth on a monthly or weekly plan, and on an annual plan the twelve months you bought.</p>`,
    },
    limit: {
      title: 'What happens when you reach the limit',
      content: `
        <p>The exercise you are in the middle of finishes: we never cut you off mid-sentence. New spoken exercises then
        pause until your next instalment, and the app tells you exactly when that is. <strong>Everything that is not
        metered stays open</strong>: you can keep reading, listening, reviewing and building vocabulary.</p>
        <p>If you want to keep speaking sooner, you can move to a larger plan. That is never required, and nothing is
        ever charged automatically because you ran out.</p>`,
    },
    'fair-use': {
      title: 'Fair use',
      content: `
        <p>Practising a lot is not misuse. Your allowance is what your plan is for, and using all of it, every day, is
        ordinary use. It will never on its own cause us to limit or close your account.</p>
        <p>Fair use is about something else: one person, one account, used through the app. It means not sharing your
        account or your sign-in with anyone, not reselling access, not using scripts or automated tools, and not
        sending more requests than a person could reasonably produce using the app as designed. Those are set out in
        the <a href="/terms#acceptable-use">acceptable-use section of the Terms of Service</a>, and they are the only
        usage-related grounds on which we would act against an account.</p>
        <p>Separately, we may queue or slow requests for short periods where that is needed to keep Vocele working for
        everyone or to stop an attack. That is a technical measure, not a penalty, and it is not aimed at any
        individual's volume.</p>`,
    },
    changes: {
      title: 'If we change an allowance',
      content: `
        <p>We may change what a plan includes. If we reduce an allowance on a plan you are already subscribed to, we
        will tell you at least 30 days beforehand, the change will not take effect before your next renewal, and you
        can cancel first. We will not reduce an allowance during a period you have already paid for.</p>`,
    },
    questions: {
      title: 'Questions',
      content: `
        <p>${mailto()}</p>`,
    },
  }),
};

const es: LegalDocument = {
  pageTitle: 'Uso y uso justo',
  heading: 'Uso y uso justo',
  description:
    'Cuántos minutos de conversación y de práctica de pronunciación incluye cada plan de Vocele, qué pasa cuando los agotas, y qué cuenta como uso justo.',
  summaryTitle: '',
  summaryHtml:
    '<strong>No vendemos nada como ilimitado.</strong> Hablar con un coach de IA cuesta dinero real, así que cada plan incluye una cantidad declarada. Preferimos escribir el número antes que esconder un límite detrás de una palabra. Esta página es ese número, completo, antes de que pagues nada.',
  sections: ES.build({
    metered: {
      title: 'Qué se mide y qué no',
      content: `
        <p><strong>Se mide:</strong> la conversación hablada con tu coach de IA y la puntuación de pronunciación. Son
        las dos cosas que ejecutan IA en vivo cada vez que las usas.</p>
        <p><strong>No se mide:</strong> los sets de palabras, las historias, la escucha, los repasos, la gramática, los
        ejercicios de escritura, las traducciones de palabras que consultas, tu vocabulario y todo tu historial de
        progreso. Están incluidos en tu plan y no consumen minutos de conversación, los uses cuanto los uses. El
        vocabulario guardado tiene un límite de almacenamiento, indicado abajo.</p>
        <p>Un turno escrito en una conversación cuesta menos que uno hablado, y se cobra como unos ocho segundos de
        conversación en lugar de como tiempo hablado.</p>`,
    },
    plans: {
      title: 'Qué incluye cada plan',
      content: `${table('es')}
        <p class="table-note">Core también se vende por semana: ese plan entrega las mismas cantidades mensuales
        repartidas a lo largo de un ciclo, con más peso en la primera semana. Un plan anual entrega sus doce meses
        juntos. Las cifras que la app muestra para tu propio plan son las que aplican, y se muestran antes de que
        pagues.</p>
        <p>Las cuentas gratuitas pueden probar la app con acceso limitado; lo que incluye se muestra en la app.</p>`,
    },
    arrival: {
      title: 'Cómo llegan los minutos',
      content: `
        <p>Un plan mensual entrega toda su cantidad al suscribirte, y otra vez en cada renovación. El plan Core semanal
        reparte esas mismas cantidades mensuales a lo largo de un ciclo, con más peso en la primera semana, así que una
        semana de ese plan y una cuarta parte del mes vienen a ser lo mismo. Un plan anual entrega sus doce meses
        juntos.</p>
        <p>Los minutos no usados se acumulan, y nunca los borramos. Lo que sí tiene tope es el saldo que puedes tener a
        la vez: dos meses en un plan mensual o semanal, y en un plan anual los doce meses que compraste.</p>`,
    },
    limit: {
      title: 'Qué pasa cuando llegas al límite',
      content: `
        <p>El ejercicio que estés haciendo termina: nunca te cortamos a media frase. Los nuevos ejercicios hablados se
        pausan hasta tu siguiente entrega, y la app te dice exactamente cuándo es. <strong>Todo lo que no se mide sigue
        abierto</strong>: puedes seguir leyendo, escuchando, repasando y construyendo vocabulario.</p>
        <p>Si quieres seguir hablando antes, puedes pasar a un plan más grande. Nunca es obligatorio, y nunca se te
        cobra nada automáticamente por haberte quedado sin minutos.</p>`,
    },
    'fair-use': {
      title: 'Uso justo',
      content: `
        <p>Practicar mucho no es un mal uso. Tu cantidad incluida es para eso, y usarla entera, todos los días, es uso
        normal. Por sí solo nunca hará que limitemos o cerremos tu cuenta.</p>
        <p>El uso justo es otra cosa: una persona, una cuenta, a través de la app. Significa no compartir tu cuenta ni
        tu acceso con nadie, no revender el acceso, no usar scripts ni herramientas automatizadas, y no enviar más
        peticiones de las que una persona podría producir razonablemente usando la app como está diseñada. Están en la
        <a href="/terms#acceptable-use">sección de uso aceptable de los Términos de servicio</a>, y son los únicos
        motivos relacionados con el uso por los que actuaríamos contra una cuenta.</p>
        <p>Aparte de eso, podemos poner peticiones en cola o ralentizarlas durante periodos cortos cuando haga falta
        para que Vocele siga funcionando para todos o para frenar un ataque. Es una medida técnica, no una sanción, y no
        va dirigida al volumen de nadie en particular.</p>`,
    },
    changes: {
      title: 'Si cambiamos una cantidad incluida',
      content: `
        <p>Podemos cambiar lo que incluye un plan. Si reducimos una cantidad de un plan al que ya estás suscrito, te lo
        diremos con al menos 30 días de antelación, el cambio no tendrá efecto antes de tu siguiente renovación, y
        podrás cancelar antes. No reduciremos una cantidad durante un periodo que ya hayas pagado.</p>`,
    },
    questions: {
      title: 'Preguntas',
      content: `
        <p>${mailto()}</p>`,
    },
  }),
};

export const FAIR_USE: Record<Lang, LegalDocument> = { en, es };
