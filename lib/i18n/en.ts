import type { Dictionary } from './types';

export const en: Dictionary = {
  meta: {
    titleTagline: 'AI software that actually ships.',
    description:
      'AI-first lab building software and AI agents for businesses that need to grow. From diagnosis to deploy, with infrastructure that scales.',
    notFoundTitle: 'Page not found · Donadão Labs',
    notFoundDescription:
      'The page you were looking for does not exist — or it shipped somewhere else.',
  },
  nav: {
    links: [
      { label: 'Approach', href: '#abordagem' },
      { label: 'Cases', href: '#cases' },
      { label: 'Founder', href: '#founder' },
      { label: 'Changelog', href: '#changelog' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Brand', href: '/brand' },
    ],
    statusPill: 'live · operating · 2 slots jul/26',
    ctaButton: 'Book a diagnosis →',
    langSwitchLabel: 'PT',
  },
  hero: {
    badge: 'AI Software Lab · live · 2026',
    headline: 'AI software',
    headlineEm: 'actually ships',
    headlineConnector: 'that',
    sub: 'We build sites, systems and automations to grow your business. You bring the problem, we ship it running — no empty promises.',
  },
  metrics: {
    productsLive: { label: 'Products live', sub: 'in production' },
    cards: [
      { label: 'In progress', sub: 'in the lab' },
      { label: 'Next slot', sub: 'open spots · book now →' },
      { label: 'Zero downtime', sub: 'incidents in 2026' },
    ],
  },
  stack: {
    label: 'Production stack',
  },
  services: {
    eyebrow: 'What we deliver',
    title: 'Everything your business needs in one place.',
    sub: 'From a simple site to a full system, with automation, all live. You don’t need to hire anyone else.',
    items: [
      {
        accessibleTitle: 'Custom software',
        accessibleBody:
          'That site, system or app your business needs, built from scratch for you — or fixing something that stopped working.',
        technicalTitle: 'Apps from scratch',
        technicalBody:
          'Build apps from scratch or legacy-rescue systems that stopped scaling. Pragmatic full-stack, no Frankenstein stack.',
        techLabel: 'Apps from scratch · Legacy rescue',
        bullets: ['Pragmatic full-stack', 'No Frankenstein stack', 'Deploy in 2–6 weeks'],
      },
      {
        accessibleTitle: 'Management systems',
        accessibleBody:
          'A dashboard to track sales, inventory, team and clients in one place — no more scattered spreadsheets.',
        technicalTitle: 'CRM & SaaS',
        technicalBody:
          'CRM, internal dashboard and multi-tenant SaaS. Queries in ms, real dashboards, observability when it matters.',
        techLabel: 'CRM · Internal SaaS',
        bullets: ['Multi-tenant', 'Queries in ms', 'Real dashboards'],
      },
      {
        accessibleTitle: 'AI automation',
        accessibleBody:
          'A “bot” that talks to your client on WhatsApp, follows up and qualifies leads — 24/7, without you having to be there.',
        technicalTitle: 'AI agents',
        technicalBody:
          'AI agents on top of existing software. Guardrails, observability and cost controlled per conversation.',
        techLabel: 'AI agents · WhatsApp · Email',
        bullets: ['Guardrails and logs', 'Observability', 'Cost controlled'],
      },
      {
        accessibleTitle: 'Infra & deploy',
        accessibleBody:
          'The boring part: domain, server, security updates. We handle it. You just see it running.',
        technicalTitle: 'Full setup',
        technicalBody:
          'Domain, DNS, CI/CD, SSL and monitoring bundled into every project. SLA with response < 4 business hours.',
        techLabel: 'Bundled · Not sold separately',
        bullets: ['Monitored SLA', 'Daily backups', 'Response < 4h business'],
      },
    ],
    flipFront: 'see technical',
    flipBack: 'back',
    technicalPrefix: 'tech.',
  },
  approach: {
    eyebrow: 'How we work',
    title: 'Three steps. No theatre.',
    sub: 'Most of AI today stops at the slide or the pretty demo. Here software goes live and earns — and few actually deliver that.',
    items: [
      {
        day: 'Day 0–3',
        label: 'Diagnose',
        title: 'Understand the business problem',
        body: 'Before a line of code: where your revenue leaks, what process you run manually and what tech can actually move.',
      },
      {
        day: 'Day 3–21',
        label: 'Build',
        title: 'Software that ships',
        titleShipWord: 'ships',
        body: 'Pragmatic full-stack engineering. No Frankenstein stack, no promises. What goes live scales.',
      },
      {
        day: 'Day 21+',
        label: 'Automate',
        title: 'AI agent layer',
        body: 'On top of software, agents that automate ops: support, follow-up, management. AI that takes boring work off your desk.',
      },
    ],
  },
  cases: {
    eyebrow: 'Cases · 2025–2026',
    title: 'Four products running. No mockups.',
    sub: 'Real software, live, generating sales.',
    internalLabel: 'internal',
    liveLabel: 'live',
    internalSuffix: '· internal',
    publicSuffix: '.app',
    internalAria: 'internal system, no public link',
    items: [
      {
        kind: 'Landing page · Pet Photography',
        title: 'Full landing page for a photographer',
        desc: 'Portfolio site with lead capture, booking and integrated payment. Replaces Linktree + WhatsApp + manual billing.',
        metric: '↑ 3.2× qualified leads',
      },
      {
        kind: 'E-commerce · 3D Printing',
        title: '3D-printing e-commerce',
        desc: 'Full store with optimized checkout and management dashboard for selling 3D-printed products. Premium UX in a commoditized category.',
        metric: 'Checkout < 90s',
      },
      {
        kind: 'Internal CRM · SaaS',
        title: 'Internal operations dashboard',
        desc: 'Client’s internal system — no public demo, but the results speak. Lean dashboard to track sales, inventory and performance without the bloat of a heavy ERP.',
        metric: '12h/week saved',
      },
      {
        kind: 'Landing page · Auto repair',
        title: 'Institutional site for an auto shop',
        desc: 'Landing page presenting services, capturing leads and opening a direct channel with the client. A real site for a business that lives offline.',
        metric: '↑ web quotes',
      },
    ],
  },
  manifesto: {
    eyebrow: '◆ principle',
    quote: 'Software is not art.',
    quoteEm: 'It’s revenue infrastructure.',
    attribution: 'Vinicius Donadão · Founder',
  },
  changelog: {
    eyebrow: 'Public changelog',
    title: 'What shipped in the last weeks.',
    sub: 'Public release log. No makeup.',
    tagLabels: {
      shipped: 'shipped',
      agent: 'agent',
      infra: 'infra',
      rfc: 'rfc',
      hotfix: 'hotfix',
    },
    entries: [
      { text: 'GA4 + Consent Mode v2 + LGPD banner set up — ready for paid traffic.' },
      { text: 'Bilingual site — /pt and /en routes live with dual SEO. Live Agent replies in visitor’s language.' },
      { text: 'Quituteria da Fafá · new client · MVP e-commerce + WhatsApp checkout live.' },
      { text: 'Diskat Presentes · Cowork security audit completed · RLS lockdown + LGPD + GA4 with checkout tracking.' },
      { text: 'WhatsApp qualification agent live in production — 38s/lead average.' },
    ],
  },
  founder: {
    eyebrow: 'Who operates',
    title: 'The person behind the code.',
    sub: 'No middleman agency. You talk directly with who builds it.',
    role: 'Computer Scientist · Founder',
    badge: 'founder · live',
    bio1: 'Computer scientist with a background in critical industrial automation. I build software and AI agents that solve the right problem — generating revenue.',
    bio2: 'Donadão Labs is the operation I run: four products live, three in the lab and current focus on AI agents for businesses already earning, but still operating on WhatsApp.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions that always come up.',
    items: [
      {
        q: 'Do I need to know exactly what I want?',
        a: 'No. The 30-minute diagnosis is for that. You arrive with the problem, leave with a plan: scope, timeline and what makes sense to build first.',
      },
      {
        q: 'How long does it take?',
        a: 'Simple landing: 2–3 weeks. E-commerce or internal dashboard: 4–6 weeks. AI agent layer: depends on volume, but typically 2–4 weeks on top of something already live.',
      },
      {
        q: 'Do you maintain the system afterwards?',
        a: 'Yes. Every project enters a light retainer after deploy: monitoring, security updates, bug fixes. Product evolution comes as a separate sprint.',
      },
      {
        q: 'What if I want to touch the code myself?',
        a: 'It’s all yours. Repo, infra, provider accounts — everything delivered in your name. No lock-in, no hidden proprietary CMS.',
      },
      {
        q: 'How much does it cost?',
        a: 'Depends on scope. Projects usually fall between 5 and 6 figures (USD/BRL equivalent). The diagnosis already delivers a price range — no obligation to proceed.',
      },
    ],
  },
  cta: {
    headline: 'Ready to',
    headlineEm: 'ship?',
    sub: 'Tell us what needs to run. In 30 minutes you get diagnosis + a real implementation plan.',
    button: 'Book a diagnosis',
    orPrefix: 'or',
  },
  agent: {
    label: '◆ diagnosis agent · processing live',
    placeholder: 'describe your business problem in 1 sentence',
    placeholderDisabled: '— drop your email below to continue —',
    btnLabel: 'run diagnosis',
    btnLoading: 'running…',
    analyzing: 'analyzing',
    examples: [
      'i have a shopify e-commerce and want to automate post-purchase',
      'my team wastes 10h/week copying data between spreadsheets and WhatsApp',
      'i want a landing page that captures leads straight into CRM',
    ],
    exampleAriaTemplate:
      'Fill input with example: {example}. You still need to click run diagnosis to submit.',
    emailInputPlaceholder: 'you@email.com',
    emailGate: {
      eyebrowPlan: 'full plan',
      eyebrowContinue: 'continue —',
      title: 'Want the full plan + roadmap by email?',
      sub: 'I’ll drop a detailed implementation plan in your inbox. No spam, no boring newsletter.',
      cta: 'Get the plan',
      ctaLoading: 'sending…',
      success: '✓ Sent! I’ll reach out via WhatsApp/email within 24h.',
      altQuestion: 'Prefer to talk directly without leaving an email?',
      altButton: 'Book a diagnosis →',
    },
    blockedMessage:
      'To keep asking, drop your email — I’ll reach back. If you’d rather talk directly, book the diagnosis below. Both paths work.',
    dailyCap: {
      eyebrow: 'daily cap reached',
      message:
        'The agent already ran 100 diagnoses today (daily cap to guarantee answer quality). You came close to the limit — let’s talk directly. Book a 30min call with me, no commitment.',
      button: 'Book a human diagnosis →',
    },
    rateLimit: {
      eyebrow: 'hold on a sec',
      message:
        'Easy — only 1 question every 10 seconds per visitor. Try again in a moment.',
      altQuestion: 'Or prefer to talk directly?',
      altButton: 'Book a diagnosis →',
    },
    errorOffline:
      'ERROR: agent offline. Try again in a few seconds — or book directly on cal.com.',
    privacy:
      'By using the agent, you agree that your question, IP and email (if provided) are stored for contact and service improvement. Per LGPD.',
  },
  ship: {
    ariaLabel: 'What does ship mean? Click to read the definition.',
    eyebrow: '* ship · /ʃɪp/ · verb',
    bold: 'To actually deliver.',
    rest: 'Software live, working, generating sales. Not a demo, not a promise, not a project stuck in the middle.',
    short: {
      eyebrow: '* ship · /ʃɪp/',
      bold: 'To actually deliver.',
      rest: 'Software live, generating sales.',
    },
  },
  footer: {
    rights: '© 2026 donadão/labs · donadaolabs.com',
    build: 'build · 2026.05.13 · live',
  },
  notFound: {
    badge: '404 · Not found',
    title: 'This page',
    titleEm: 'didn’t ship.',
    body: 'The address you were looking for doesn’t exist — or it was moved. No drama, head back home and keep going.',
    ctaHome: 'Back to home',
    ctaCases: 'See the cases',
  },
  consent: {
    message:
      'We use cookies to understand site usage and improve experience. Per LGPD/GDPR.',
    accept: 'Accept',
    reject: 'Decline',
  },
};
