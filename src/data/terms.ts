import {
  AGES,
  CONTACT_EMAIL,
  COURTS,
  EXTERNAL,
  GOVERNING_LAW,
  LIABILITY_FLOOR,
  OPERATOR,
  OPERATOR_COUNTRY,
  OPERATOR_KIND,
  RETENTION,
  externalLink,
  mailto,
} from './facts';
import { legalSections } from './sections';
import type { LegalDocument } from './types';

// NO PRICES and never "unlimited": the in-app paywall is the only price surface (Three-Surface Check), and every plan
// hard-stops at its allowance. #plans' figures live on /fair-use. #subscriptions and #trials are App Store Guideline
// 3.1.2(c) disclosures and #apple is Apple's minimum EULA terms: keep each whole (check-legal asserts their clauses).
// The trial copy is conditional on purpose: no offer is live today, and deleting it would sell the next one without
// its disclosures.
const IDS = [
  'who', 'acceptance', 'eligibility', 'plans', 'limits', 'acceptable-use', 'moderation', 'ai-content',
  'your-content', 'report', 'our-content', 'subscriptions', 'trials', 'cancelling', 'refunds', 'termination',
  'availability', 'disclaimer', 'liability', 'indemnity', 'changes', 'governing-law', 'apple', 'general', 'contact',
] as const;
const { ref, build } = legalSections(IDS);

const APPLE_SUBSCRIPTIONS = 'Settings &rarr; your name &rarr; Subscriptions';
const appleRefund = externalLink(EXTERNAL.appleRefund, 'reportaproblem.apple.com');

export const TERMS: LegalDocument = {
  pageTitle: 'Terms of Service',
  heading: 'Terms of service',
  description:
    'Vocele terms of service: who you contract with, what each plan includes, subscriptions and cancelling, acceptable use, AI-generated content, and your rights as a consumer.',
  summaryTitle: 'Before you start',
  summaryHtml: `Please read ${ref('plans')}, which says how much conversation practice each plan includes, and
    ${ref('limits')}, which says what happens when you reach it. We do not describe any plan as unlimited, because none
    of them is: every plan includes a stated amount of AI conversation, and we would rather print the number.
    Subscriptions renew automatically until you cancel them in your Apple Account settings (${ref('subscriptions')}).`,
  sections: build({
    who: {
      title: 'Who you are contracting with',
      content: `
        <p>Vocele is operated by <strong>${OPERATOR}</strong> ("we", "us"), ${OPERATOR_KIND} based in
        ${OPERATOR_COUNTRY}. You can reach us at ${mailto()}. Our postal address is available on request by
        email.</p>`,
    },
    acceptance: {
      title: 'Accepting these terms',
      content: `
        <p>These terms apply to the Vocele app and this website. By creating an account or using Vocele you accept
        them. If you do not accept them, do not use Vocele.</p>
        <p>The app is licensed to you under Apple's
        ${externalLink(EXTERNAL.appleEula, 'Licensed Application End User License Agreement (Standard EULA)')}. These
        terms supplement it, and where the two differ, these terms prevail as far as the Standard EULA allows.
        ${ref('apple')} sets out the terms Apple requires between you, us and Apple. Our
        <a href="/privacy">Privacy Policy</a> explains how we handle your data.</p>`,
    },
    eligibility: {
      title: 'Who can use Vocele',
      content: `
        <p>You must be at least ${AGES.minimum} years old. In the European Economic Area and the United Kingdom you
        must be at least ${AGES.minimumEeaUk}, unless the law of your country sets a lower age for consenting to
        online services, in which case that age applies. If you are under ${AGES.adult}, you may use Vocele only with
        the consent of a parent or guardian, who accepts these terms with you. We may close an account if we learn it
        belongs to someone below these ages.</p>`,
    },
    plans: {
      title: 'Plans and what each one includes',
      content: `
        <p>Spoken conversation with the AI coach and pronunciation scoring are <strong>metered</strong>: each paid
        plan includes a stated number of conversation minutes and pronunciation minutes. The numbers for your plan are
        shown on the purchase screen in the app, before you pay, and on our <a href="/fair-use">Usage &amp; Fair Use</a>
        page. They are part of these terms. Free accounts can try the app with limited access, and the app shows what
        is included.</p>
        <p>Everything else, such as word sets, stories, reviews, grammar, your vocabulary and your progress, is included
        in your plan and does not consume conversation minutes. Any storage limit on saved vocabulary is stated in the
        same places.</p>
        <p>A monthly plan's allowance arrives when you subscribe and at each renewal. A weekly plan spreads the same
        monthly amounts across a cycle, weighted towards the first week; an annual plan grants its twelve months
        together. Unused minutes carry over and are not swept, but the balance you may hold at once is capped: two
        months' worth on a monthly or weekly plan, and on an annual plan the twelve months you bought.</p>`,
    },
    limits: {
      title: 'Reaching your limit, and our right to set limits',
      content: `
        <p>When you have used the conversation minutes included in your plan, the exercise you are in the middle of
        finishes (we do not cut you off mid-sentence), and new spoken exercises pause until your next instalment
        arrives. The app tells you when that is. Everything unmetered stays available. You can move to a larger plan
        at any time; you are never required to, and nothing is charged automatically because you ran out.</p>
        <p>We may change, suspend or discontinue any part of the service, and <strong>we may set or change usage
        limits for the service</strong>, including the allowances described above. If we reduce an allowance included
        in a plan you have already paid for, we will tell you at least ${RETENTION.changeNoticeDays} days beforehand and
        the change will not take effect until your next renewal, so you can cancel first. We will not reduce it during
        a period you have already paid for.</p>
        <p>We may also apply short-term technical limits, such as queuing or slowing requests, where that is necessary
        to keep the service working for everyone or to protect it from abuse.</p>`,
    },
    'acceptable-use': {
      title: 'Acceptable use',
      content: `
        <p>Vocele is licensed to you for your own personal, non-commercial language learning. You agree not to:</p>
        <ul>
          <li>share your account or sign-in with anyone else, let anyone else use your subscription, or make Vocele
          available to more than one person;</li>
          <li>resell, sublicense, rent or transfer your account or your access to Vocele;</li>
          <li>access the service by automated means, or send more requests than a person could reasonably produce in
          the same period using the app as it is designed to be used;</li>
          <li>scrape, harvest or systematically extract our content, or use it to build or train a competing product
          or a machine-learning model;</li>
          <li>reverse-engineer, decompile or attempt to derive the source code of the app, except to the extent the
          law does not allow us to prevent it;</li>
          <li>interfere with the service, probe or test its security, or place an unreasonable load on it;</li>
          <li>use Vocele to create or send unlawful, abusive, harassing, hateful or sexually exploitative content, or
          content that infringes someone else's rights;</li>
          <li>harass or impersonate other learners, or submit another person's voice as your own in a duel or a
          showcase;</li>
          <li>try to make the AI coach produce content these terms prohibit, or present its output as coming from a
          person;</li>
          <li>leave your device or Apple sign-in open to others. Tell us promptly at ${mailto()} if you think someone
          else is using your account.</li>
        </ul>
        <p>These are the things that make use of Vocele illegitimate. Practising a lot is not one of them: heavy
        ordinary personal use, within your allowance, is exactly what your plan is for, and it will never on its own
        cause us to limit or close your account.</p>`,
    },
    moderation: {
      title: 'Safety and automated moderation',
      content: `
        <p>Automated systems help us find abuse, harassment and signs that someone may be at risk. Depending on what
        they find, content may be hidden, a feature may be limited, or an account may be suspended, and the app may
        show crisis resources.</p>
        <p>You can contest any such decision: write to ${mailto()} and a person will review it and tell you the
        outcome. Vocele is not an emergency or crisis service. If you or someone else is in danger, contact your local
        emergency services.</p>`,
    },
    'ai-content': {
      title: 'AI-generated content',
      content: `
        <p>Conversations, corrections, translations, pronunciation feedback, level estimates, stories and exercises
        are produced by artificial intelligence. The output <strong>may be inaccurate, incomplete or unsuitable for
        your purpose</strong>, may state errors confidently, and may be similar or identical to output another learner
        receives. We give no warranty as to its accuracy or fitness, and you rely on it at your own risk.</p>
        <p>Vocele is a learning tool. It is not a certified exam or a certification service, and any level or score
        it shows you is an estimate for your own practice, not an academic credential, qualification or proof of
        proficiency for any employer, school or authority. It is not professional translation, and it is not legal,
        medical, financial, educational or immigration advice. We do not guarantee any learning result. Do not rely on
        it where accuracy matters.</p>`,
    },
    'your-content': {
      title: 'Your content',
      content: `
        <p>What you write and say in Vocele remains yours. You grant us a worldwide, non-exclusive, royalty-free
        licence to host, store, transmit, transcribe, translate, analyse and display it, and to pass it to the service
        providers described in our <a href="/privacy#recipients">Privacy Policy</a>, only to operate Vocele for you and
        keep it secure. The licence ends when you delete the content or your account. We do not sell your content or
        use it to advertise to you, and <strong>we do not use it to train AI models</strong>.</p>
        <p>If you opt in to a feature that plays your takes to other learners, such as Arena duels or Week's Best, you
        also grant us a licence to show and play those takes to other learners in Vocele. It ends when you withdraw
        your consent or delete the take or your account, except for plays that have already happened.</p>
        <p>You confirm that you have the right to submit what you submit, and that it does not infringe anyone else's
        rights.</p>`,
    },
    report: {
      title: 'Reporting content that infringes your rights',
      content: `
        <p>If you believe a take or other content that Vocele shows to learners infringes your rights, including your
        copyright or your voice, or is illegal, write to ${mailto()}. Say which content it is, where you saw it, and
        why you believe it infringes your rights or is unlawful. A person will review your notice, act on it without
        undue delay, and tell you the outcome.</p>
        <p>If we remove or restrict your content after a notice, we will tell you why. You can contest that decision
        as described in ${ref('moderation')}.</p>`,
    },
    'our-content': {
      title: 'Our content',
      content: `
        <p>Vocele, its software, lessons, stories, word sets, audio, artwork and branding are ours or our licensors',
        and are protected by copyright and other laws. We grant you a personal, revocable, non-transferable,
        non-sublicensable licence to use the app on Apple devices you own or control, for the purposes these terms
        allow, and nothing more.</p>
        <p>If you send us feedback or ideas about Vocele, we may use them freely, without any obligation to you.</p>`,
    },
    subscriptions: {
      title: 'Subscriptions, billing and renewal',
      content: `
        <ul>
          <li>Paid plans are sold as auto-renewable subscriptions through Apple's App Store. The price, the length of
          the period and what the plan includes are shown on the purchase screen before you pay, in your local
          currency.</li>
          <li>Payment is charged to your Apple ID account at confirmation of purchase.</li>
          <li>Your subscription renews automatically at the same price for the same period unless it is cancelled at
          least 24 hours before the end of the current period. Your account is charged for renewal within 24 hours
          before the end of the current period.</li>
          <li>You can manage and cancel your subscription in your Apple ID account settings after purchase (on iPhone:
          ${APPLE_SUBSCRIPTIONS}).</li>
          <li>If we change the price, Apple tells you before it takes effect, under Apple's rules. Where those rules or
          the law require your agreement to a higher price, the subscription does not renew unless you agree.</li>
          <li>Billing for in-app purchases is handled by Apple under Apple's terms, not by us. Refunds are covered in
          ${ref('refunds')}.</li>
        </ul>`,
    },
    trials: {
      title: 'Free trials and introductory offers',
      content: `
        <p>If a free trial or an introductory price is offered, its length and the price that follows it are shown on
        the purchase screen before you start. <strong>Unless you cancel at least 24 hours before the trial ends, it
        converts to a paid subscription and Apple charges you the price shown.</strong> Any unused portion of a free
        trial is forfeited when you purchase a subscription. Trials are limited to one per person and per Apple
        Account, and we may change or withdraw an offer at any time before you accept it.</p>`,
    },
    cancelling: {
      title: 'Cancelling',
      content: `
        <p>You can cancel at any time in your Apple ID account settings, up to 24 hours before the next renewal.
        Cancelling stops future renewals; your plan keeps working until the end of the period you have already paid
        for. Deleting the app does not cancel a subscription.</p>
        <p>You can delete your account, and everything in it, in the app under Settings &rarr; Account &rarr; Delete
        account. Deleting your account does not cancel your Apple subscription: cancel that separately.</p>`,
    },
    refunds: {
      title: 'Refunds, and your right to change your mind',
      content: `
        <p>Purchases made through the App Store are refunded by <strong>Apple</strong>, under Apple's policy and at
        Apple's discretion. We cannot issue or refuse a refund for an in-app purchase. Request one at ${appleRefund}.
        Except where the law requires otherwise, fees already paid are not refundable, and cancelling does not refund
        the current period.</p>
        <p><strong>If you are a consumer in the European Economic Area or the United Kingdom</strong>, you have a
        statutory right to withdraw from your subscription within 14 days of entering into it, without giving a
        reason. This right applies even though Vocele is supplied to you immediately. To withdraw, ask Apple at ${appleRefund} within the 14 days, or tell us at ${mailto()} and we
        will help; sending the message in time is enough. Any reimbursement for an App Store purchase is made through
        Apple, without undue delay and by the same means you paid.</p>
        <p>This section does not affect any other right you have under the consumer law of your country, including a
        remedy where the service is not as described.</p>`,
    },
    termination: {
      title: 'Suspension and termination',
      content: `
        <p>We may suspend or close your account if you materially breach these terms, if the law requires it, or to
        protect the service or other people from harm (${ref('moderation')}). Except where the breach is serious or
        urgent, or where telling you first would defeat the purpose, we will give you notice and a chance to put it
        right. You can contest a suspension or closure by writing to ${mailto()}, and a person will review it. If we
        close your account for a reason that is not your breach, we will refund the unused part of any period you
        have paid for.</p>
        <p>You may stop using Vocele at any time. ${ref('ai-content')}, ${ref('your-content')}, ${ref('our-content')},
        ${ref('disclaimer')}, ${ref('liability')}, ${ref('indemnity')} and ${ref('governing-law')} survive the end of
        these terms.</p>`,
    },
    availability: {
      title: 'Availability and changes to the service',
      content: `
        <p>We aim to keep Vocele available, but we do not promise it will be uninterrupted or error-free. It depends on
        third-party services, including AI providers, which can fail or change. We may carry out maintenance, and we
        may change or remove features. Where a change is material and to your disadvantage, we will give you
        reasonable notice, and you can cancel.</p>`,
    },
    disclaimer: {
      title: 'Disclaimers',
      content: `
        <p>To the extent permitted by law, Vocele is provided "as is" and "as available", without warranties of any
        kind, express or implied, including any implied warranty of merchantability, fitness for a particular purpose
        or non-infringement. We do not warrant that using Vocele will produce any particular level of language
        proficiency. If you are a consumer, this does not affect the rights your national law gives you.</p>`,
    },
    liability: {
      title: 'Limitation of liability',
      content: `
        <p>To the extent permitted by law, we are not liable for indirect, incidental, special or consequential loss,
        or for loss of profit, data, goodwill or opportunity. Our total liability to you for all claims about Vocele
        is limited to the greater of the amount you paid us for Vocele in the 12 months before the claim arose, or
        ${LIABILITY_FLOOR}.</p>
        <p><strong>Nothing in these terms limits or excludes liability that cannot be limited or excluded by law,
        including liability for death or personal injury caused by negligence, for fraud or fraudulent
        misrepresentation, and the statutory rights of consumers in the EU, the EEA and the UK.</strong> If you are a
        consumer, you keep every right your mandatory national law gives you, and the paragraph above applies only so
        far as that law permits.</p>`,
    },
    indemnity: {
      title: 'Indemnity',
      content: `
        <p>You agree to compensate us for reasonable losses, including reasonable legal costs, that result from your
        breach of these terms or from content you submit that infringes someone else's rights. This applies only so
        far as the law that protects you as a consumer allows, and never to a loss we caused.</p>`,
    },
    changes: {
      title: 'Changes to these terms',
      content: `
        <p>We may update these terms. If a change is material and to your disadvantage, we will tell you in the app
        or by email at least ${RETENTION.changeNoticeDays} days before it takes effect, and you may cancel before then.
        Other changes take effect when we publish them, and the dates at the top change. If you keep using Vocele after
        a change takes effect, you accept the updated terms.</p>`,
    },
    'governing-law': {
      title: 'Law and disputes',
      content: `
        <p>These terms are governed by the law of ${GOVERNING_LAW}, and ${COURTS} have jurisdiction over any dispute
        about them.</p>
        <p><strong>If you are a consumer, this does not deprive you of the protection of the mandatory
        consumer-protection law of the country where you live.</strong> Consumers in the EU, the EEA and the UK may
        bring proceedings in the courts where they live, and may complain to their local data protection authority
        about how we handle their data.</p>
        <p>Before going to court, please write to us at ${mailto()}: most things are faster to fix that way.</p>`,
    },
    apple: {
      title: 'Apple',
      content: `
        <p>You and we acknowledge and agree that:</p>
        <ul>
          <li><strong>Acknowledgement.</strong> These terms are between you and us only, not Apple, and we, not Apple,
          are solely responsible for the app and its content.</li>
          <li><strong>Scope of licence.</strong> Your licence to use the app is a non-transferable licence to use it on
          any Apple-branded product that you own or control, as permitted by the Usage Rules in the App Store Terms of
          Service.</li>
          <li><strong>Maintenance and support.</strong> We alone are responsible for providing any maintenance and
          support for the app. Apple has no obligation whatsoever to furnish any maintenance and support services for
          the app.</li>
          <li><strong>Warranty.</strong> We are responsible for any product warranty, whether express or implied by
          law, to the extent not effectively disclaimed. If the app fails to conform to any applicable warranty, you may
          notify Apple, and Apple will refund the purchase price, if any, for the app to you. To the maximum extent
          permitted by law, Apple has no other warranty obligation with respect to the app, and any other claims,
          losses, liabilities, damages, costs or expenses attributable to a failure to conform to any warranty are our
          responsibility.</li>
          <li><strong>Product claims.</strong> We, not Apple, are responsible for addressing any claims by you or a third
          party relating to the app or your possession or use of it, including product liability claims, any claim
          that the app fails to conform to any applicable legal or regulatory requirement, and claims arising under
          consumer protection, privacy or similar legislation.</li>
          <li><strong>Intellectual property rights.</strong> If a third party claims that the app or your possession and
          use of it infringes that third party's intellectual property rights, we, not Apple, are solely responsible for
          the investigation, defence, settlement and discharge of that claim.</li>
          <li><strong>Legal compliance.</strong> You represent and warrant that you are not located in a country that is
          subject to a US Government embargo, or that has been designated by the US Government as a "terrorist
          supporting" country, and that you are not listed on any US Government list of prohibited or restricted
          parties.</li>
          <li><strong>Developer contact.</strong> Questions, complaints or claims about the app go to ${OPERATOR},
          ${mailto(CONTACT_EMAIL)}. Our postal address is available on request by email.</li>
          <li><strong>Third-party terms.</strong> When you use the app, you must comply with applicable third-party
          terms, such as your mobile network's terms.</li>
          <li><strong>Third-party beneficiary.</strong> Apple and Apple's subsidiaries are third-party beneficiaries of
          these terms, and once you accept them, Apple will have the right (and will be deemed to have accepted the
          right) to enforce them against you as a third-party beneficiary.</li>
        </ul>`,
    },
    general: {
      title: 'General',
      content: `
        <p>If a provision of these terms is found unenforceable, the rest stays in force. Our not enforcing a term is
        not a waiver of it. You may not transfer your rights under these terms; we may transfer ours to someone who
        takes over Vocele, and that will not reduce your rights. These terms, the Standard EULA and the
        <a href="/privacy">Privacy Policy</a> are the whole agreement between you and us about Vocele. If these terms
        are translated, the English version prevails.</p>`,
    },
    contact: {
      title: 'Contact',
      content: `
        <ul>
          <li><strong>Operator:</strong> ${OPERATOR}, ${OPERATOR_KIND}, ${OPERATOR_COUNTRY}</li>
          <li><strong>Email:</strong> ${mailto()}</li>
          <li><strong>Postal address:</strong> available on request by email</li>
        </ul>`,
    },
  }),
};
