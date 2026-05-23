/**
 * Dictionary contract — toda string traduzível tem que existir nos dois locales.
 * O type aqui é a fonte da verdade: PT e EN são `Dictionary` literais.
 */

export interface Dictionary {
  meta: {
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
  };
  founder: {
    eyebrow: string;
    title: string;
    sub: string;
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
  ship: {
    ariaLabel: string;
    eyebrow: string;
    bold: string;
    rest: string;
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
