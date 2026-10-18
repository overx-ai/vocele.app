import {
  AGES,
  CONSENT,
  CONTACT_EMAIL,
  EU_REPRESENTATIVE,
  EXTERNAL,
  GA_COOKIES,
  GA_MEASUREMENT_ID,
  OPERATOR,
  OPERATOR_COUNTRY,
  OPERATOR_KIND,
  PROCESSOR_CATEGORIES,
  RETENTION,
  SITE_HOST,
  SUPERVISORY_AUTHORITY,
  UK_REPRESENTATIVE,
  externalLink,
  mailto,
} from './facts';
import { legalSections, legalTable } from './sections';
import type { LegalDocument } from './types';

// OWNER: publish only after the app and backend fixes this text describes have deployed (facts.ts OWNER_NOTES).
// #app-store-labels is the app's Template/PrivacyInfo.xcprivacy in Apple's names, plus CustomerSupport: check-legal
// fails on any difference from scripts/fixtures/PrivacyInfo.pinned.xcprivacy, and on the sibling manifest drifting
// from that pin. Change the manifest, the pin, this block and the App Store Connect answers together.
// No vendor, model, host or pipeline detail appears here (owner, 2026-10-08): data, purpose, retention, recipient
// category and rights only. Apple, Google, AppsFlyer and Google Analytics are the only names.

const ANALYTICS = Boolean(GA_MEASUREMENT_ID);
const CONSENT_MONTHS = Math.round(CONSENT.days / 30);
const MY_DATA = 'Settings &rarr; My Data';
const DELETE_ACCOUNT = 'Settings &rarr; Account &rarr; Delete account';
const ATT_SETTINGS = 'iOS Settings &rarr; Privacy &amp; Security &rarr; Tracking';

const REPRESENTATIVES = [
  ['EU representative', EU_REPRESENTATIVE],
  ['UK representative', UK_REPRESENTATIVE],
].filter(([, who]) => who);
const REPRESENTATIVE_ROWS = REPRESENTATIVES.map(([role, who]) => `<li><strong>${role}:</strong> ${who}</li>`).join('');

const ALL_IDS = [
  'who-we-are', 'representatives', 'app-store-labels', 'not-collected', 'account', 'learning-profile', 'voice',
  'conversations', 'ai-processing', 'automated-decisions', 'progress', 'public', 'purchases', 'support',
  'diagnostics', 'attribution', 'website', 'legal-bases', 'recipients', 'transfers', 'retention', 'deletion',
  'security', 'children', 'rights', 'us-privacy', 'signals', 'changes', 'contact',
] as const;
const IDS = ALL_IDS.filter((id) => id !== 'representatives' || REPRESENTATIVES.length > 0);
const { ref, build } = legalSections(IDS);

type Purpose = 'App Functionality' | 'Analytics' | 'Third-Party Advertising';
const label = (type: string, purposes: readonly Purpose[], what: string) =>
  `<li><span class="label">${type}</span> <span class="purposes">(${purposes.join(', ')})</span>: ${what}</li>`;

const CONTACT_ROWS = `
          <li><strong>Controller:</strong> ${OPERATOR}, ${OPERATOR_KIND}, ${OPERATOR_COUNTRY}</li>
          <li><strong>Email:</strong> ${mailto()}</li>
          <li><strong>Postal address:</strong> available on request by email</li>`;

export const PRIVACY: LegalDocument = {
  pageTitle: 'Privacy Policy',
  heading: 'Privacy policy',
  description:
    'Vocele privacy policy: what the app and this website collect, why, how long we keep it, who processes it, and how to see, export or delete it.',
  summaryTitle: 'The short version',
  summaryHtml: `
    <ul>
      <li>You sign in with Apple or Google. We keep what Vocele needs to teach you: your account, your learning
      profile, your progress, and what you say and write in lessons.</li>
      <li>When you speak, the recording goes to our speech providers to be transcribed and scored. We keep the
      transcript and the score, not the recording, unless you choose to share a take with other learners.</li>
      <li>AI providers process your content to run the coach. We do not use your content to train AI models.</li>
      <li>Only if you turn it on in ${MY_DATA}, AppsFlyer measures which ad brought you to Vocele, and it reads your
      advertising identifier only if you also allow tracking when iOS asks. We do not sell personal information for
      money.</li>
      <li>This website uses Google Analytics only after you accept cookies.</li>
      <li>You can delete your account in the app, see and delete what the coach remembers about you, and ask us for a
      copy of your data.</li>
    </ul>`,
  sections: build({
    'who-we-are': {
      title: 'Who we are',
      content: `
        <p>Vocele is an iPhone app for learning languages by speaking. The app and this website at ${SITE_HOST} are
        run by <strong>${OPERATOR}</strong> ("we", "us"), ${OPERATOR_KIND} based in ${OPERATOR_COUNTRY}, who is the
        controller of your personal data: the person who decides how it is used and is responsible for it.</p>
        <ul>${CONTACT_ROWS}
        </ul>`,
    },
    representatives: {
      title: 'Our representatives in the EU and the UK',
      content: `
        <p>We are established outside the European Economic Area and the United Kingdom. Under Article 27 of the
        GDPR and of the UK GDPR we have appointed representatives, whom you can contact instead of us or as well as
        us:</p>
        <ul>${REPRESENTATIVE_ROWS}</ul>`,
    },
    'app-store-labels': {
      title: 'App Store privacy details',
      content: `
        <p>The App Store shows these details on Vocele's page. They are the data types the app declares to Apple,
        in Apple's own names and with Apple's purposes, and the sections below explain each one in plain words.</p>
        <p><strong>Data used to track you</strong></p>
        <ul class="labels" data-group="track">
          ${label('Device ID', ['Third-Party Advertising'], `Apple's advertising identifier, only if you turn on attribution and allow tracking (${ref('attribution')})`)}
        </ul>
        <p><strong>Data linked to you</strong></p>
        <ul class="labels" data-group="linked">
          ${label('User ID', ['App Functionality'], `your account identifier (${ref('account')})`)}
          ${label('Email Address', ['App Functionality'], `the address your Apple or Google sign-in gives us (${ref('account')})`)}
          ${label('Name', ['App Functionality'], `the name your Apple or Google sign-in shares, if it does (${ref('account')})`)}
          ${label('Other Data Types', ['App Functionality', 'Analytics'], `your learning profile and setup answers (${ref('learning-profile')})`)}
          ${label('Coarse Location', ['App Functionality'], `the country we infer from your IP address, shown as a flag if you join a leaderboard (${ref('learning-profile')})`)}
          ${label('Audio Data', ['App Functionality'], `your voice when you speak in an exercise (${ref('voice')})`)}
          ${label('Other User Content', ['App Functionality'], `what you write and the coach's conversations with you (${ref('conversations')})`)}
          ${label('Other Usage Data', ['App Functionality'], `how much of your plan you have used, and your progress (${ref('progress')})`)}
          ${label('Purchase History', ['App Functionality'], `your subscription status (${ref('purchases')})`)}
          ${label('Customer Support', ['App Functionality'], `messages you send us (${ref('support')})`)}
          ${label('Crash Data', ['App Functionality'], `crash reports (${ref('diagnostics')})`)}
          ${label('Performance Data', ['App Functionality'], `how fast the app works for you (${ref('diagnostics')})`)}
          ${label('Device ID', ['Third-Party Advertising'], `the advertising identifier above (${ref('attribution')})`)}
        </ul>`,
    },
    'not-collected': {
      title: 'What we do not collect',
      content: `
        <ul>
          <li>No password: you sign in only with Apple or Google.</li>
          <li>No phone number, contacts, photos or health data from your iPhone.</li>
          <li>No precise location: no GPS. We work out only your country, from your IP address (${ref('learning-profile')}).</li>
          <li>No payment card or bank details: Apple handles every payment (${ref('purchases')}).</li>
          <li>No advertising inside the app.</li>
        </ul>`,
    },
    account: {
      title: 'Your account',
      content: `
        <p>You need an account to use Vocele, and you create it by signing in with Apple or with Google. There is no
        email-and-password sign-in and no guest account. When you sign in we receive and store:</p>
        <ul>
          <li>your email address. With Sign in with Apple you can hide your real address, and then we only receive a
          private relay address from Apple;</li>
          <li>your name and profile picture, if Apple or Google shares them with us;</li>
          <li>an account identifier, which is how we keep your learning data together;</li>
          <li>an identifier for your device and the device's name, to keep your sessions secure.</li>
        </ul>
        <p>We use these to run your account, to sign you in on your devices and to contact you about the service.
        We do not send marketing email. Signing in is covered by ${externalLink(EXTERNAL.applePrivacy, "Apple's Privacy Policy")}
        or ${externalLink(EXTERNAL.googlePrivacy, "Google's Privacy Policy")}, whichever you use.</p>`,
    },
    'learning-profile': {
      title: 'Your learning profile',
      content: `
        <p>To build your lessons we keep the languages you learn and the language the app talks to you in, your
        level in each language, your time zone and the times you want reminders.</p>
        <p>When you set the app up you can also tell us your age range, your goals, how you heard about Vocele and
        how you like to learn. Every one of these questions can be skipped. We use the answers to shape your daily
        plan and how the coach talks to you, and in total to understand who Vocele helps.</p>
        <p>We work out your country from your IP address. It is not your precise location. If you join a
        leaderboard, your country is shown there as a flag (${ref('public')}).</p>`,
    },
    voice: {
      title: 'Your voice',
      content: `
        <p>Vocele listens only while you are doing something spoken that you started: a lesson, a chat with the
        coach, a pronunciation drill or a duel. Your recording is sent to our speech providers so that what you said
        can be transcribed and scored.</p>
        <ul>
          <li><strong>Recordings</strong> are not kept after they have been processed.</li>
          <li><strong>The transcript and the scores</strong> are kept with your progress, for up to
          ${RETENTION.speechResultsDays} days.</li>
          <li><strong>On your iPhone</strong>, your recent takes are kept so you can listen back. You can delete them,
          and they are removed when you sign out or delete your account.</li>
          <li>Some short answers are recognised by Apple's speech recognition, on your iPhone where it supports that;
          otherwise iOS sends that recording to Apple, under Apple's privacy policy.</li>
        </ul>
        <p>Two features keep a recording on purpose, and only if you opt in:</p>
        <ul>
          <li><strong>Arena duels.</strong> If you take part, your duel takes can be played to other learners as their
          opponent. They are kept for ${RETENTION.duelTakesDaysAfterRefresh} days after you last refreshed them, or
          until you withdraw your consent.</li>
          <li><strong>Week's Best.</strong> If you enter, your showcase take can be played to other learners of that
          language. It is deleted ${RETENTION.showcaseDaysAfterWeek} days after its week ends, or when you withdraw.</li>
        </ul>
        <p>Other learners hear these takes under a generated handle, never your name.</p>`,
    },
    conversations: {
      title: 'What you write, and your conversations with the coach',
      content: `
        <p>We keep your chat messages, the answers you type, the words you save and the translations you ask for, so
        your history is there next time and the coach can correct you. The messages in a conversation are kept for up
        to ${RETENTION.conversationsDays} days after it ends; its topic and the short summary the coach writes of it
        stay while your account exists. Words you save stay in your vocabulary while your account exists.</p>
        <p>The coach remembers some facts about you between conversations, such as your job or a trip you are
        planning, so lessons can be about your life. You can see these AI memories, and delete any of them or all of
        them, in ${MY_DATA}.</p>`,
    },
    'ai-processing': {
      title: 'How AI is used on your content',
      content: `
        <p>The coach's replies, corrections, feedback, translations and spoken audio are produced by AI. To do that,
        what you write and say is processed by AI providers on our behalf (${ref('recipients')}). They receive what
        each request needs and nothing more:</p>
        <ul>
          <li><strong>Your voice recordings</strong> go to ${PROCESSOR_CATEGORIES[1]}, to transcribe and score what
          you said.</li>
          <li><strong>Your chat messages and typed answers</strong> go to ${PROCESSOR_CATEGORIES[0]}, to write the
          coach's replies, corrections and translations.</li>
          <li><strong>The coach's replies and other text the app reads aloud</strong> go to
          ${PROCESSOR_CATEGORIES[2]}, to produce the spoken audio.</li>
        </ul>
        <p><strong>The app asks you first.</strong> Before any of your recordings or messages is sent to these
        providers, the app asks whether you agree. You can change your answer at any time in
        ${MY_DATA} &rarr; AI processing. If you say no, the features that need these providers, such as talking with
        the coach and pronunciation scores, are switched off and show you how to turn them back on; everything else in
        the app keeps working.</p>
        <p><strong>We do not use your content to train AI models.</strong></p>`,
    },
    'automated-decisions': {
      title: 'Automated decisions and safety',
      content: `
        <p>Automated systems help us find abuse and harassment, and signs that someone may be at risk. They may limit
        what an account can do or suspend it, and they may show you crisis resources.</p>
        <p>If an automated decision affects you, you can contest it: write to ${mailto()} and a person will review it.
        You can also give your point of view and ask us to explain the decision. This is your right under Article 22
        of the GDPR and the UK GDPR, and we give it to everyone.</p>`,
    },
    progress: {
      title: 'Your progress and learning history',
      content: `
        <p>We keep your vocabulary and its review schedule, the exercises you do, your streaks and achievements, and
        how many minutes you have spoken and how much of your plan you have used. This is what your daily plan,
        statistics and allowance are built from.</p>
        <p>It is kept while your account exists. Your exercise history is kept for up to
        ${RETENTION.exerciseHistoryDays} days.</p>`,
    },
    public: {
      title: 'What other people can see',
      content: `
        <p>Nothing you do in Vocele is public unless you choose to make it so.</p>
        <ul>
          <li><strong>Leaderboards, the public duel board, the Arena and Week's Best</strong>, if you opt in, show a
          handle the app generates for you, your score, your country flag and, for the Arena and Week's Best, your
          takes (${ref('voice')}).</li>
          <li><strong>Friends</strong> you add see your activity, such as wins and level-ups, and your challenge
          ratings.</li>
          <li><strong>Roadmap ideas</strong> you submit may be shown publicly after we review them.</li>
          <li><strong>Anything you share yourself</strong>, such as an invite link, a share card or a clip, goes
          wherever you send it.</li>
        </ul>`,
    },
    purchases: {
      title: 'Purchases',
      content: `
        <p>Subscriptions are sold and paid for through Apple's App Store. We never see your card or bank details.
        We receive the status of your purchase and subscription (which plan, when it renews or lapses, and whether
        it was refunded), linked to your account, through our subscription and purchase management provider. That is
        how the app knows what your plan includes.</p>`,
    },
    support: {
      title: 'Support and feedback',
      content: `
        <p>When you write to us through the in-app support chat or the feedback form, we receive your message, your
        email address if you give it, and your device model, iOS version and app version, so we can answer and fix
        what you report. A customer-support messaging provider handles these messages for us. We keep them for up to
        ${RETENTION.supportMonths} months.</p>`,
    },
    diagnostics: {
      title: 'Diagnostics and analytics',
      content: `
        <p>The app sends us crash reports, performance measurements and usage events, linked to your account. We use
        them to keep Vocele working, to find what is slow or broken and to understand, in total, which parts help
        people learn. They never contain the text of what you said or wrote. We keep them for up to
        ${RETENTION.diagnosticsMonths} months.</p>
        <p>Our own analytics do not use your advertising identifier.</p>`,
    },
    attribution: {
      title: 'Advertising attribution',
      content: `
        <p>We want to know which ads and links bring people to Vocele, so we spend money where it reaches people who
        want to learn a language. This is measurement, and Vocele itself shows no ads.</p>
        <ul>
          <li><strong>Apple.</strong> If you found Vocele through an ad on the App Store, Apple can tell us which
          campaign led to the install, without telling us who you are.</li>
          <li><strong>AppsFlyer.</strong> AppsFlyer matches an install to the ad or link that led to it. It starts
          only after you turn on attribution in ${MY_DATA}, wherever you live. It then receives information about your
          device and the install, such as the device model, iOS version, app version, your IP address and when the app
          was installed and opened. It reads Apple's advertising identifier (IDFA) only if you also choose
          <strong>Allow</strong> when iOS asks whether Vocele may track you. Using the advertising identifier this way
          is tracking as Apple defines it, and the App Store lists it so.
          ${externalLink(EXTERNAL.appsflyerPrivacy, "AppsFlyer's Privacy Policy")}.</li>
        </ul>
        <p>Under California law, giving AppsFlyer this information can count as "sharing" personal information for
        cross-context behavioural advertising (${ref('us-privacy')}). To stop it, turn attribution off in
        ${MY_DATA}, turn off tracking for Vocele in ${ATT_SETTINGS}, or use
        ${externalLink(EXTERNAL.appsflyerOptout, "AppsFlyer's opt-out page")}. Saying no changes nothing else in the
        app.</p>`,
    },
    website: {
      title: 'This website and cookies',
      content: ANALYTICS
        ? `
        <p>If you agree, this website uses Google Analytics, from Google, to count visits and see which pages help.
        It measures the pages you visit, how you use the site, your device and browser type, and your approximate
        location worked out from your IP address. Google receives your IP address and details of your browser and
        device. We have turned off Google's advertising features, so it is not used for advertising.
        ${externalLink(EXTERNAL.googlePartnerSites, 'How Google uses data from sites that use its services')}.</p>
        <p>Nothing is measured until you choose <strong>Accept</strong> in the cookie banner. If you choose
        <strong>Reject</strong>, nothing loads. If your browser sends the Global Privacy Control signal, we treat it
        as <strong>Reject</strong> and do not show the banner. To change your choice or withdraw your consent, choose
        <strong>Cookie settings</strong> at the bottom of any page; withdrawing removes the analytics cookies.</p>
        <p>Cookies this website sets:</p>
        <ul>
          <li>${GA_COOKIES.map((c) => `<code>${c}</code>`).join(' and ')}: Google Analytics, only after you accept, to
          tell visits apart. They last up to ${RETENTION.websiteAnalyticsMonths} months, and we keep the analytics for
          no longer than ${RETENTION.websiteAnalyticsMonths} months.</li>
          <li><code>${CONSENT.cookie}</code>: your answer to the cookie banner, for about ${CONSENT_MONTHS} months.</li>
        </ul>
        <p>Our hosting provider receives your IP address and basic details of each visit to deliver the page and
        protect the site.</p>`
        : `
        <p>This website runs no analytics and sets no cookies. Our hosting provider receives your IP address and basic
        details of each visit to deliver the page and protect the site.</p>`,
    },
    'legal-bases': {
      title: 'Why we are allowed to use your data',
      content: `
        <p>Where the GDPR, the UK GDPR or a similar law applies, these are our legal bases:</p>
        ${legalTable(['Data', 'Legal basis'], [
          ['Your account, sign-in and session security', 'Contract: we need it to give you the service'],
          ['Your learning profile', 'Contract; your optional setup answers: consent (you can skip or change them)'],
          ['Your voice, transcripts and scores', 'Contract'],
          ['Arena and Week\'s Best takes, leaderboards', 'Consent: only if you opt in, and you can withdraw'],
          ['Conversations, saved words, AI memories', 'Contract'],
          ['Your progress and learning history', 'Contract'],
          ['Purchases', 'Contract; keeping purchase records: legal obligation'],
          ['Support and feedback', 'Contract, and our legitimate interest in fixing what you report'],
          ['Diagnostics and analytics in the app', 'Legitimate interests: keeping Vocele working and improving it'],
          ['Automated safety checks and abuse prevention', 'Legitimate interests: keeping learners safe and the service usable'],
          ['Country from your IP address', 'Legitimate interests: leaderboards and protecting the service'],
          ['The sign-in fingerprint after deletion', 'Legitimate interests: stopping the free allowance being claimed again and again'],
          ['Attribution and the advertising identifier', 'Consent: the switch in My Data, and Apple\'s tracking prompt'],
          ...(ANALYTICS ? [['Website analytics', 'Consent: we measure visits to this website only with your consent']] : []),
          ['Answering lawful requests, tax and accounting records', 'Legal obligation'],
        ])}
        <p>Where we rely on legitimate interests we have weighed them against your interests, and you can object at
        any time (${ref('rights')}). Where we rely on consent, you can withdraw it at any time without affecting what
        happened before.</p>`,
    },
    recipients: {
      title: 'Who processes your data',
      content: `
        <p>We use service providers to run Vocele. Each receives only what its part of the service needs, processes it
        on our instructions under a data-processing agreement, and may not use it for its own purposes. By category,
        they are:</p>
        <ul>
          ${PROCESSOR_CATEGORIES.map((c) => `<li>${c.charAt(0).toUpperCase()}${c.slice(1)}</li>`).join('\n          ')}
        </ul>
        <p>We name any provider on request: write to ${mailto()}.</p>
        <p>These companies receive data for their own part and under their own policies:</p>
        <ul>
          <li><strong>Apple</strong>: the App Store, Sign in with Apple, purchases and speech recognition.
          ${externalLink(EXTERNAL.applePrivacy, "Apple's Privacy Policy")}.</li>
          <li><strong>Google</strong>: Sign in with Google${ANALYTICS ? ', and Google Analytics on this website if you accept cookies' : ''}.
          ${externalLink(EXTERNAL.googlePrivacy, "Google's Privacy Policy")}.</li>
          <li><strong>AppsFlyer</strong>: mobile attribution, only if you turn it on (${ref('attribution')}).
          ${externalLink(EXTERNAL.appsflyerPrivacy, "AppsFlyer's Privacy Policy")}.</li>
        </ul>
        <p>Other learners see what you choose to make public (${ref('public')}). We may also disclose data when the
        law requires it, or to protect someone's safety.</p>`,
    },
    transfers: {
      title: 'Where your data is processed',
      content: `
        <p>Your data is hosted in the European Union. Some of our providers process data outside the EU and the EEA,
        including in the United States. Where they do, the transfer relies on an adequacy decision or on the European
        Commission's Standard Contractual Clauses, with the UK Addendum for data from the UK. We are based in
        ${OPERATOR_COUNTRY}, outside the EEA and the UK. You can ask us for a copy of the safeguards at ${mailto()}.</p>`,
    },
    retention: {
      title: 'How long we keep your data',
      content: `
        ${legalTable(['Data', 'How long'], [
          ['Your account, learning profile, saved words and progress', 'While your account exists'],
          ['Voice recordings', 'Not kept after processing'],
          ['Transcripts and pronunciation scores', `Up to ${RETENTION.speechResultsDays} days`],
          ['Arena duel takes (opt-in)', `${RETENTION.duelTakesDaysAfterRefresh} days after you last refresh them, or until you withdraw`],
          ['Week\'s Best takes (opt-in)', `${RETENTION.showcaseDaysAfterWeek} days after their week ends, or until you withdraw`],
          ['Messages in conversations with the coach', `Up to ${RETENTION.conversationsDays} days after the conversation ends`],
          ['Conversation topics and the coach\'s summaries of them', 'While your account exists'],
          ['AI memories', 'Until you delete them, or your account'],
          ['Exercise history', `Up to ${RETENTION.exerciseHistoryDays} days`],
          ['Support and feedback messages', `Up to ${RETENTION.supportMonths} months`],
          ['Crash reports, performance and usage events', `Up to ${RETENTION.diagnosticsMonths} months`],
          ...(ANALYTICS ? [['Website analytics', `No longer than ${RETENTION.websiteAnalyticsMonths} months`]] : []),
          ['Purchase records', 'As long as tax and accounting law requires, pseudonymised'],
        ])}
        <p>When you delete your account we erase your data within ${RETENTION.deletionDays} days, including from
        backups, which roll off within ${RETENTION.backupDays} days. We keep three things: purchase records, as above;
        copies of messages you sent to support, for up to ${RETENTION.supportMonths} months; and a one-way fingerprint
        of your sign-in for up to ${RETENTION.trialFingerprintYears} years, which cannot be turned back into your
        identity and is used only to stop the same person claiming the free allowance again and again.</p>`,
    },
    deletion: {
      title: 'Deleting your account, and getting a copy',
      content: `
        <p>You can delete your account in the app at any time: ${DELETE_ACCOUNT}. This erases your account and your
        sign-in record, your learning profile, progress, saved words, conversations, AI memories, transcripts, scores
        and any takes you shared, and removes your data from your iPhone. It also revokes Vocele's access to your
        Apple sign-in, and we ask our attribution and subscription-management providers to delete their records about
        you. It cannot be undone. Deleting your account does not cancel an Apple subscription: cancel that in your
        Apple Account settings.</p>
        <p>To get a copy of your data, write to ${mailto()}. We send it in a machine-readable format within
        ${RETENTION.exportDays} days.</p>`,
    },
    security: {
      title: 'Security',
      content: `
        <p>Your data is encrypted in transit and at rest, and access to it is limited to the people who need it to
        run Vocele. No system is perfectly secure. If a breach affects your personal data and is likely to put you at
        risk, we will tell you and the authorities as the law requires.</p>`,
    },
    children: {
      title: 'Children',
      content: `
        <p>Vocele is not directed at children under ${AGES.minimum}. In the EEA and the UK it is not for anyone under
        ${AGES.minimumEeaUk} unless a parent or guardian consents, or the law of their country sets a lower age. If we
        learn that we have collected data from a child without that, we delete it. If you think a child has given us
        personal data, write to ${mailto()}.</p>`,
    },
    rights: {
      title: 'Your rights',
      content: `
        <p>Under the GDPR and the UK GDPR, and in the same way wherever you live, you have the right to:</p>
        <ul>
          <li>access your personal data and get a copy of it;</li>
          <li>correct it if it is wrong;</li>
          <li>delete it;</li>
          <li>restrict how we use it while a question about it is settled;</li>
          <li>receive the data you gave us in a portable, machine-readable form;</li>
          <li>object to processing based on our legitimate interests;</li>
          <li>withdraw your consent at any time, without affecting what happened before;</li>
          <li>contest an automated decision and have a person review it (${ref('automated-decisions')});</li>
          <li>complain to a data protection authority.</li>
        </ul>
        <p>Brazil's LGPD and similar laws elsewhere give you comparable rights, and we honour them the same way.</p>
        <p>To use a right, write to ${mailto()}. We may ask for something that confirms the request is yours, so we
        never hand your data to someone else, and we answer within ${RETENTION.rightsResponseDays} days. If a request
        is complex we may need up to two more months, and we will tell you why. We will not treat you differently for
        using a right.</p>
        <p>We are supervised by ${SUPERVISORY_AUTHORITY}. If you are in the EU, the EEA or the UK, you can also
        complain to the data protection authority where you live or work. We would rather you came to us first.</p>`,
    },
    'us-privacy': {
      title: 'California and other US state privacy rights',
      content: `
        <p>If you live in California, the California Consumer Privacy Act, as amended by the California Privacy Rights
        Act, gives you the rights below, and this section is our notice at collection. We give residents of other US
        states with similar laws the same rights.</p>
        <ul>
          <li><strong>Categories we collect:</strong> identifiers (account identifier, email address, name, device
          identifier, IP address, and the advertising identifier if you allow it); commercial information (your
          subscription); audio (your voice in exercises); internet or other electronic network activity (usage,
          crash and performance data, and website analytics if you accept); approximate location (your country);
          inferences (your level and what the coach remembers about you); and the content of what you write and send
          us. We collect them from you and your device, for the purposes in ${ref('legal-bases')}, and keep them as
          ${ref('retention')} says.</li>
          <li><strong>Categories we disclose</strong> for business purposes, to the service providers in
          ${ref('recipients')}: all of the above, each provider only for its part.</li>
          <li><strong>Sharing.</strong> If you turn attribution on, we give AppsFlyer identifiers and internet activity
          (${ref('attribution')}). That can count as "sharing" for cross-context behavioural advertising. You can opt
          out of sharing by turning attribution off in ${MY_DATA}, turning off tracking for Vocele in ${ATT_SETTINGS}, or
          choosing <strong>Ask App Not to Track</strong> when iOS asks. This website treats a Global Privacy Control
          signal as an opt-out (${ref('signals')}).</li>
          <li><strong>We do not sell personal information for money</strong>, and have not done so in the past 12
          months.</li>
          <li><strong>Your rights:</strong> to know what we collect, use and disclose; to delete it; to correct it; to
          opt out of sharing; to limit the use of any sensitive personal information to what is needed to give you the
          service; and not to be treated differently for using these rights. Make a request at ${mailto()}. An
          authorised agent may act for you with your signed permission, and we check requests as ${ref('rights')}
          describes.</li>
        </ul>`,
    },
    signals: {
      title: 'Do Not Track and Global Privacy Control',
      content: `
        <p>This website honours the Global Privacy Control signal: if your browser sends it, we treat it as
        <strong>Reject</strong> for cookies and as an opt-out of sharing, and do not show the cookie banner. There
        is no agreed standard for the older Do Not Track signal, so we do not respond to it separately; the website
        loads no analytics without your consent either way.</p>`,
    },
    changes: {
      title: 'Changes to this policy',
      content: `
        <p>If we change what we collect or why, we update this page and the app's privacy details together, and the
        dates at the top change. If a change is material, we announce it in the app or by email at least
        ${RETENTION.changeNoticeDays} days before it takes effect. From this version on, each version we replace stays
        available at a dated address on this site.</p>`,
    },
    contact: {
      title: 'Contact',
      content: `
        <ul>${CONTACT_ROWS}${REPRESENTATIVE_ROWS}
        </ul>
        <p>Questions about this policy, or a request about your data: ${mailto(CONTACT_EMAIL)}.</p>`,
    },
  }),
};
