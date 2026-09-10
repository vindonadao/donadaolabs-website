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
    /** Rótulo curto do CTA para telas estreitas (evita o botão quebrar em 2 linhas no mobile). */
    ctaButtonShort: string;
    langSwitchLabel: string;
  };
  hero: {
    badge: string;
    headline: string;
    headlineEm: string;
    /** Conector entre headline e ship — em PT é "that", em EN também "that". Permite tradução total. */
    headlineConnector: string;
    sub: string;
    /** Link estático de agendamento (fallback SSR caso o JS do agente falhe). */
    scheduleCta: string;
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
  products: {
    eyebrow: string;
    title: string;
    sub: string;
    /** Selos de status dos produtos (◆). */
    liveLabel: string;
    buildingLabel: string;
    /** Faixa playground (jogos). */
    playgroundEyebrow: string;
    playgroundSub: string;
    /** CTA no rodapé do card de jogo (ex.: "jogar"). */
    playCta: string;
    /**
     * Traduzíveis por produto, indexados por posição (mesma ordem de `PRODUCTS`
     * em `lib/constants.ts`). Campos neutros (slug, name, tier, url, status,
     * stack) permanecem em constants. `tag`/`title` só existem no tier product.
     */
    items: { tag?: string; title?: string; body: string; tagline?: string }[];
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
    /** Header pill quando o agente está no estado de gate (não "processando"). */
    labelGated: string;
    placeholder: string;
    placeholderDisabled: string;
    /** aria-label do input principal do agente (input sem `<label>` visível). */
    inputAria: string;
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
    /** Estado de limite atingido pela REDE (IP compartilhado/CGNAT), não pelo visitante. */
    blockedNetworkMessage: string;
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
    /** Label do link para a Política de Privacidade. */
    privacy: string;
    /** Rótulo do grupo de links para os jogos próprios (Lab). */
    games: string;
  };
  notFound: {
    badge: string;
    title: string;
    titleEm: string;
    body: string;
    ctaHome: string;
    ctaCases: string;
  };
  consent: {
    message: string;
    accept: string;
    reject: string;
  };
  /** Página /[lang]/brand — wrapper do brand book (textos da UI, não do PDF). */
  brand: {
    topPill: string;
    revLine: string;
    title: string;
    description: string;
    downloadBtn: string;
    viewBtn: string;
    previewTitle: string;
    previewFallback: string;
    previewFallbackLink: string;
    /** Label do toggle de idioma (idioma OPOSTO ao atual). */
    langSwitch: string;
    cards: {
      archetypeLabel: string;
      archetypeValue: string;
      sloganLabel: string;
      layersLabel: string;
      layersValue: string;
    };
  };
  /** Página /[lang]/privacidade — Política de Privacidade (LGPD). */
  privacy: {
    title: string;
    /** Linha de identificação do controlador. */
    controller: string;
    updated: string;
    sections: {
      title: string;
      body: string;
    }[];
    /** Nota de revisão jurídica (não exibida como seção formal). */
    legalNote: string;
  };
}
