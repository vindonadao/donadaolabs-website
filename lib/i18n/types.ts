/**
 * Dictionary contract — toda string traduzível tem que existir nos dois locales.
 * O type aqui é a fonte da verdade: PT e EN são `Dictionary` literais.
 */

export interface Dictionary {
  meta: {
    /** Tagline curto exibido no `<title>` da aba. Sai depois do nome do site. */
    titleTagline: string;
    description: string;
    notFoundTitle: string;
    notFoundDescription: string;
  };
  nav: {
    links: { label: string; href: string }[];
    statusPill: string;
    ctaButton: string;
    langSwitchLabel: string;
  };
  hero: {
    badge: string;
    headline: string;
    headlineEm: string;
    /** Conector entre headline e ship — em PT é "that", em EN também "that". Permite tradução total. */
    headlineConnector: string;
    sub: string;
  };
  metrics: {
    productsLive: { label: string; sub: string };
    /** Override para os 3 cards manuais (em construção, próximo slot, zero quedas). */
    cards: { label: string; sub: string }[];
  };
  stack: {
    label: string;
  };
  services: {
    eyebrow: string;
    title: string;
    sub: string;
    items: {
      accessibleTitle: string;
      accessibleBody: string;
      technicalTitle: string;
      technicalBody: string;
      techLabel: string;
      bullets: string[];
    }[];
    flipFront: string;
    flipBack: string;
    technicalPrefix: string;
  };
  approach: {
    eyebrow: string;
    title: string;
    sub: string;
    items: {
      day: string;
      label: string;
      title: string;
      /** Quando presente, essa palavra DEVE existir em `title` e será envolta em `<Ship variant="short">`. */
      titleShipWord?: string;
      body: string;
    }[];
  };
  cases: {
    eyebrow: string;
    title: string;
    sub: string;
    /** Selo de status nos cards (◆ interno / ● live). */
    internalLabel: string;
    liveLabel: string;
    internalSuffix: string;
    publicSuffix: string;
    /** Aria-label do card interno: `${case.title} — ${labels.internalAria}` */
    internalAria: string;
    /**
     * Traduzíveis por case, indexados por posição (mesma ordem que `CASES` em
     * `lib/constants.ts`). Campos neutros (num, client, href, internal, stack,
     * logo) permanecem em constants.
     */
    items: {
      kind: string;
      title: string;
      desc: string;
      metric: string;
    }[];
  };
  manifesto: {
    eyebrow: string;
    quote: string;
    quoteEm: string;
    attribution: string;
  };
  changelog: {
    eyebrow: string;
    title: string;
    sub: string;
    /** Label exibido na pill colorida. `shipped` mantém wordplay de marca em PT (SHIPADO). */
    tagLabels: {
      shipped: string;
      agent: string;
      infra: string;
      rfc: string;
      hotfix: string;
    };
    /** Textos traduzíveis indexados por posição (mesma ordem de `CHANGELOG` em constants). */
    entries: { text: string }[];
  };
  founder: {
    eyebrow: string;
    title: string;
    sub: string;
    /** Cargo/role exibido abaixo do nome (verde, font-mono). */
    role: string;
    badge: string;
    bio1: string;
    bio2: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  cta: {
    headline: string;
    headlineEm: string;
    sub: string;
    button: string;
    orPrefix: string;
  };
  agent: {
    /** Header pill com bolinha pulsante verde. */
    label: string;
    placeholder: string;
    placeholderDisabled: string;
    btnLabel: string;
    btnLoading: string;
    analyzing: string;
    examples: string[];
    /** Template do aria-label dos chips de exemplo (use `{example}` como placeholder). */
    exampleAriaTemplate: string;
    emailInputPlaceholder: string;
    emailGate: {
      eyebrowPlan: string;
      eyebrowContinue: string;
      title: string;
      sub: string;
      cta: string;
      ctaLoading: string;
      success: string;
      altQuestion: string;
      altButton: string;
    };
    blockedMessage: string;
    dailyCap: {
      eyebrow: string;
      message: string;
      button: string;
    };
    rateLimit: {
      eyebrow: string;
      message: string;
      altQuestion: string;
      altButton: string;
    };
    errorOffline: string;
    privacy: string;
  };
  ship: {
    ariaLabel: string;
    eyebrow: string;
    bold: string;
    rest: string;
    /** Versão resumida usada em contextos secundários (cards, pillars, callouts). */
    short: {
      eyebrow: string;
      bold: string;
      rest: string;
    };
  };
  footer: {
    rights: string;
    build: string;
  };
  notFound: {
    badge: string;
    title: string;
    titleEm: string;
    body: string;
    ctaHome: string;
    ctaCases: string;
  };
}
