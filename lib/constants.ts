/**
 * Donadão Labs — Site constants (rev-2.0 · dataviz)
 * Source of truth for all copy, numbers, links and editable site data.
 * Edit values here, no need to touch component files.
 */

export const SITE = {
  name: 'Donadão Labs',
  tagline: 'AI software that actually ships.',
  taglineEm: 'actually ships.',
  description:
    'Lab AI-first que constrói software e AI agents para negócios que precisam crescer. Do diagnóstico ao deploy, com infraestrutura que escala.',
  url: 'https://donadaolabs.com',
  email: 'contato@donadaolabs.com',
} as const;

export const LINKS = {
  cal: 'https://cal.com/donadaolabs/diagnostico',
  linkedin: 'https://linkedin.com/in/viniciusdonadao',
  github: 'https://github.com/vindonadao',
  instagram: 'https://instagram.com/donadaolabs',
} as const;

export const NAV_LINKS = [
  { label: 'Abordagem', href: '#abordagem' },
  { label: 'Cases', href: '#cases' },
  { label: 'Founder', href: '#founder' },
  { label: 'Changelog', href: '#changelog' },
  { label: 'FAQ', href: '#faq' },
] as const;

// Status pill shown at top-right of the nav. Update when slots change.
export const HEADER = {
  status: 'live · operando · 2 slots jul/26',
} as const;

// 7-day throughput chart in the hero (right side, sticky).
// `bars`: 7 numbers (mon–sun). The chart normalizes to the max.
export const THROUGHPUT = {
  label: 'AGENT THROUGHPUT · 7D',
  total: '474',
  unit: 'conv/sem',
  delta: '↑ 18.4%',
  days: ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'],
  bars: [42, 58, 51, 73, 88, 67, 95],
} as const;

export interface Metric {
  label: string;
  value: string;
  sub: string;
  spark?: readonly number[];
  /** Quando presente, o MetricCard é renderizado como <a> clicável (target external auto-detectado) */
  href?: string;
}

/**
 * Métricas declarativas exibidas na faixa Metrics.
 * "Produtos no ar" é derivada de CASES.length no componente [components/metrics.tsx]
 * — nunca drifta quando você adiciona/remove case.
 */
export const METRICS: readonly Metric[] = [
  { label: 'Em construção', value: '03', sub: 'no laboratório' },
  { label: 'Próximo slot',  value: '02', sub: 'vagas abertas · agendar →', href: 'https://cal.com/donadaolabs/diagnostico' },
  { label: 'Zero quedas',   value: '0',  sub: 'incidentes em 2026' },
] as const;

export interface ClientLogo {
  name: string;
  src: string;
  alt: string;
  url?: string;
  maxWidth?: string;
}

export const CLIENT_LOGOS: readonly ClientLogo[] = [
  {
    name: 'Gabriel Nabi',
    src: '/clients/gabriel-nabi.png',
    alt: 'Gabriel Nabi Pet Photography',
    url: 'https://gabrielnabi.donadaolabs.com',
  },
  {
    name: 'Diskat Presentes',
    src: '/clients/diskat-presentes.png',
    alt: 'Diskat Presentes Criativos',
    url: 'https://diskatpresentes.com.br',
  },
  {
    name: 'Diskat Ops',
    src: '/clients/diskat-ops.png',
    alt: 'Diskat Ops — Relíquia Nerd · Controle Interno',
    maxWidth: '320px',
  },
  {
    name: 'Cali Garage',
    src: '/clients/cali-garage.png',
    alt: 'Cali Garage — Reparos Automotivos',
    url: 'https://caligarage.donadaolabs.com',
  },
] as const;

export interface Service {
  id: string;
  num: string;
  techLabel: string;
  accessibleTitle: string;
  accessibleBody: string;
  technicalTitle: string;
  technicalBody: string;
  bullets: readonly string[];
}

export const SERVICES: readonly Service[] = [
  {
    id: 'build',
    num: '01',
    techLabel: 'Apps from scratch · Legacy rescue',
    accessibleTitle: 'Software sob medida',
    accessibleBody:
      'Aquele site, sistema ou app que seu negócio precisa, feito do zero pra você — ou consertando algo que parou de funcionar.',
    technicalTitle: 'Apps from scratch',
    technicalBody:
      'Construa apps from scratch ou faça legacy rescue de sistemas que pararam de escalar. Full-stack pragmático, sem stack frankenstein.',
    bullets: ['Full-stack pragmático', 'Sem stack frankenstein', 'Deploy em 2–6 semanas'],
  },
  {
    id: 'systems',
    num: '02',
    techLabel: 'CRM · SaaS interno',
    accessibleTitle: 'Sistemas de gestão',
    accessibleBody:
      'Um painel pra acompanhar vendas, estoque, equipe e clientes em um lugar só — sem mil planilhas espalhadas.',
    technicalTitle: 'CRM & SaaS',
    technicalBody:
      'CRM, painel interno e SaaS multi-tenant. Queries em ms, dashboards reais, observabilidade quando importa.',
    bullets: ['Multi-tenant', 'Queries em ms', 'Dashboards reais'],
  },
  {
    id: 'automate',
    num: '03',
    techLabel: 'AI agents · WhatsApp · E-mail',
    accessibleTitle: 'Automação com AI',
    accessibleBody:
      'Um “robô” que atende seu cliente no WhatsApp, faz follow-up e qualifica lead — 24h por dia, sem você precisar estar lá.',
    technicalTitle: 'AI agents',
    technicalBody:
      'AI agents em cima do software existente. Guardrails, observabilidade e custo controlado por conversa.',
    bullets: ['Guardrails e logs', 'Observabilidade', 'Custo controlado'],
  },
  {
    id: 'infra',
    num: '04',
    techLabel: 'Bundled · Não vendido separado',
    accessibleTitle: 'Infra & deploy',
    accessibleBody:
      'Aquela parte chata por trás: domínio, servidor, atualizações de segurança. A gente cuida. Você só vê rodando.',
    technicalTitle: 'Full setup',
    technicalBody:
      'Domínio, DNS, CI/CD, SSL e monitoramento bundled em todo projeto. SLA com resposta < 4h úteis.',
    bullets: ['SLA monitorado', 'Backups diários', 'Resposta < 4h úteis'],
  },
] as const;

export interface Pillar {
  num: string;
  day: string;
  label: string;
  title: string;
  body: string;
}

export const PILLARS: readonly Pillar[] = [
  {
    num: '01',
    day: 'Dia 0–3',
    label: 'Diagnose',
    title: 'Entender o problema comercial',
    body: 'Antes de uma linha de código: onde sua receita escapa, que processo você roda no braço e o que tecnologia pode mover de fato.',
  },
  {
    num: '02',
    day: 'Dia 3–21',
    label: 'Build',
    title: 'Software que ships',
    body: 'Engenharia full-stack pragmática. Sem stack frankenstein, sem promessas. O que sobe em produção, escala.',
  },
  {
    num: '03',
    day: 'Dia 21+',
    label: 'Automate',
    title: 'Camada de AI agents',
    body: 'Em cima do software, agents que automatizam operação: atendimento, follow-up, gestão. AI que tira trabalho chato da sua mesa.',
  },
] as const;

export type CaseShape = 'aperture' | 'layers' | 'grid' | 'hex';
export type CaseStyle = 'serif' | 'sans-bold' | 'sans-condensed' | 'mono';

export interface Case {
  num: string;
  client: string;
  kind: string;
  meta: string;
  title: string;
  desc: string;
  metric: string;
  /** URL pública do case, ou `null` quando é sistema interno (sem demo pública) */
  href: string | null;
  /** Quando `true`, renderiza com selo "◆ interno" (roxo) e sem affordance de clique */
  internal?: boolean;
  stack: readonly string[];
  logo: {
    image: string | null;
    shape: CaseShape;
    display: string;
    style: CaseStyle;
  };
}

export const CASES: readonly Case[] = [
  {
    num: '01',
    client: 'Gabriel Nabi',
    kind: 'Landing page · Pet Photography',
    meta: 'Landing page · Pet Photography',
    title: 'Landing completa para fotógrafo',
    desc: 'Site de apresentação do trabalho com captação de contato, agenda e pagamento integrado. Substitui Linktree + WhatsApp + cobrança manual.',
    metric: '↑ 3.2× contato qualificado',
    href: 'https://gabrielnabi.donadaolabs.com',
    stack: ['React', 'Node', 'Stripe', 'Postgres'],
    logo: {
      image: '/clients/gabriel-nabi.png',
      shape: 'aperture',
      display: 'gabriel nabi',
      style: 'serif',
    },
  },
  {
    num: '02',
    client: 'Diskat Presentes',
    kind: 'E-commerce · Impressão 3D',
    meta: 'E-commerce · Impressão 3D',
    title: 'E-commerce de impressão 3D',
    desc: 'Loja completa com checkout otimizado e painel de gestão para venda de produtos impressos em 3D. UX premium em categoria commoditizada.',
    metric: 'Checkout < 90s',
    href: 'https://diskatpresentes.com.br',
    stack: ['Next.js', 'Stripe', 'Postgres'],
    logo: {
      image: '/clients/diskat-presentes.png',
      shape: 'layers',
      display: 'DISKAT presentes',
      style: 'sans-bold',
    },
  },
  {
    num: '03',
    client: 'Diskat Ops',
    kind: 'CRM interno · SaaS',
    meta: 'CRM interno · SaaS',
    title: 'Painel de operação interna',
    desc: 'Sistema interno do cliente — sem demo pública, mas o resultado fala. Painel enxuto pra acompanhar vendas, estoque e performance, sem cair no excesso de uma ERP cara.',
    metric: '12h/semana economizadas',
    href: null,
    internal: true,
    stack: ['React', 'Node', 'Postgres', 'Redis'],
    logo: {
      image: '/clients/diskat-ops.png',
      shape: 'grid',
      display: 'diskat/ops',
      style: 'mono',
    },
  },
  {
    num: '04',
    client: 'Cali Garage',
    kind: 'Landing page · Manutenção veicular',
    meta: 'Landing page · Manutenção veicular',
    title: 'Site institucional para oficina',
    desc: 'Landing de apresentação dos serviços, captação de contato e canal direto com o cliente. Site real para um negócio que vive offline.',
    metric: '↑ orçamentos via web',
    href: 'https://caligarage.donadaolabs.com',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
    logo: {
      image: '/clients/cali-garage.png',
      shape: 'hex',
      display: 'CALI GARAGE',
      style: 'sans-condensed',
    },
  },
  {
    num: '05',
    client: 'A Vegana',
    kind: 'Blog editorial · Vegano',
    meta: 'Blog editorial · Vegano',
    title: 'Blog editorial com newsletter própria',
    desc: 'Blog de conteúdo vegano em MDX, com categorias, receitas com SEO estruturado e newsletter própria. Domínio no ar, publicando toda semana.',
    metric: '28 posts no ar',
    href: 'https://avegana.com.br',
    stack: ['Next.js', 'MDX', 'Brevo', 'Vercel'],
    logo: {
      image: '/clients/a-vegana.png',
      shape: 'aperture',
      display: 'a vegana',
      style: 'serif',
    },
  },
  {
    num: '06',
    client: 'Quituteria da Fafá',
    kind: 'E-commerce · Checkout WhatsApp',
    meta: 'E-commerce · Checkout WhatsApp',
    title: 'Loja de quitutes com pedido no WhatsApp',
    desc: 'Catálogo de doces e salgados caseiros com carrinho e fechamento de pedido direto no WhatsApp. Domínio próprio no ar.',
    metric: 'Pedido direto no WhatsApp',
    href: 'https://quituteriadafafa.com.br',
    stack: ['Next.js', 'TypeScript', 'Vercel'],
    logo: {
      image: '/clients/quituteria-da-fafa.png',
      shape: 'layers',
      display: 'quituteria',
      style: 'sans-bold',
    },
  },
] as const;

/**
 * Produtos próprios do Lab (fonte única).
 *
 * Duas trilhas:
 *  - `product`    → produto próprio com peso de case (ex.: PregApp). Card cheio, roxo.
 *  - `playground` → demos de engenharia usáveis (jogos). Faixa compacta, badge ◆.
 *
 * Campos NEUTROS (slug, name, tier, url, status, stack) vivem aqui; os textos
 * traduzíveis (tag, title, body) ficam em `dict.products.items`, casados por
 * índice — mesmo padrão de CASES/CHANGELOG. ORIGEM entra aqui ao lançar
 * (`tier: 'product'`, `status: 'building'`) sem refactor.
 *
 * O footer deriva os jogos daqui (`tier === 'playground'`) — os backlinks
 * site-wide para os domínios próprios (SEO) continuam saindo de uma fonte só.
 */
export type ProductTier = 'product' | 'playground';

export interface Product {
  slug: string;
  /** Nome próprio — não traduz. */
  name: string;
  tier: ProductTier;
  url: string;
  status: 'live' | 'building';
  stack?: readonly string[];
  /** Símbolo da marca (PNG transparente) exibido no lockup do card, quando houver. */
  logo?: string;
}

export const PRODUCTS: readonly Product[] = [
  {
    slug: 'pregapp',
    name: 'PregApp',
    tier: 'product',
    url: 'https://pregapp.com.br',
    status: 'live',
    stack: ['Next.js', 'Postgres', 'Supabase', 'Resend'],
    logo: '/products/pregapp.png',
  },
  { slug: 'zona75', name: 'ZONA75', tier: 'playground', url: 'https://zona75.com', status: 'live' },
  { slug: 'naipe', name: 'Naipe', tier: 'playground', url: 'https://naipe.donadaolabs.com', status: 'live' },
] as const;

/** Jogos do Lab, derivados de PRODUCTS — usados como backlinks no footer. */
export const PLAYGROUND_PRODUCTS: readonly Product[] = PRODUCTS.filter(
  (p) => p.tier === 'playground',
);

export interface StackChip {
  label: string;
}

export const STACK_CHIPS: readonly StackChip[] = [
  { label: 'Next.js' },
  { label: 'TypeScript' },
  { label: 'Postgres' },
  { label: 'Stripe' },
  { label: 'OpenAI' },
  { label: 'Anthropic' },
  { label: 'Vercel' },
  { label: 'Cloudflare' },
] as const;

export interface ChangelogEntry {
  date: string;
  tag: 'shipped' | 'agent' | 'infra' | 'rfc' | 'hotfix';
  text: string;
}

export const CHANGELOG: readonly ChangelogEntry[] = [
  { date: '2026-07-12', tag: 'shipped', text: 'Site · seção Produtos próprios no ar — PregApp, ZONA75 e Naipe saem do rodapé e ganham vitrine. Layer Products do brand book, agora no site.' },
  { date: '2026-07-11', tag: 'shipped', text: 'Site · seção de projetos ampliada — A Vegana e Quituteria da Fafá agora nos cases.' },
  { date: '2026-07-10', tag: 'shipped', text: 'Starck Representações · novo cliente · plataforma B2B de catálogo + captação de leads concluída.' },
  { date: '2026-07-08', tag: 'shipped', text: 'PregApp · SaaS de licitações PNCP (produto próprio) pronto — busca no PNCP + alertas de prazo por e-mail · pregapp.com.br.' },
  { date: '2026-06-24', tag: 'shipped', text: 'Donadão Labs OPS · CRM interno no ar, feature-complete — clientes, propostas, faturas e entregas num só lugar.' },
  { date: '2026-06-19', tag: 'rfc',     text: 'Starck Representações · novo cliente · sistema de catálogo B2B (em construção).' },
  { date: '2026-06-17', tag: 'rfc',     text: 'ORIGEM · novo produto próprio · app mobile de quiz em construção (Expo + Supabase + IA).' },
  { date: '2026-06-15', tag: 'shipped', text: 'Diskat OPS · atualização no painel interno do cliente (ops.diskatpresentes.com.br).' },
  { date: '2026-06-13', tag: 'infra',   text: 'Site · backlinks pros jogos próprios (Naipe, ZONA75) no footer — SEO site-wide.' },
  { date: '2026-06-12', tag: 'shipped', text: 'Quituteria da Fafá · cliente migrado pro domínio próprio quituteriadafafa.com.br.' },
  { date: '2026-06-10', tag: 'rfc',     text: 'PregApp · SaaS de licitações PNCP (produto próprio) · demo no ar com busca + alertas de prazo.' },
  { date: '2026-06-07', tag: 'shipped', text: 'ZONA75 · jogo web (remake do JezzBall) no ar em zona75.com — ranking online + Modo Âncora.' },
  { date: '2026-06-04', tag: 'shipped', text: 'Naipe · suíte de paciência (Spider/Klondike/FreeCell) no ar com ranking online · naipe.donadaolabs.com.' },
  { date: '2026-06-02', tag: 'rfc',     text: 'Donadão Labs OPS · CRM interno em construção — clientes, propostas e entregas orquestrados num só lugar.' },
  { date: '2026-06-01', tag: 'shipped', text: 'A Vegana · novo cliente · blog editorial vegano no ar (Next.js 16 + MDX + newsletter Brevo).' },
  { date: '2026-05-30', tag: 'shipped', text: 'Brand book v2 publicado em /brand — identidade completa, URL estável /brand/latest.pdf e OG oficial.' },
  { date: '2026-05-27', tag: 'shipped', text: 'Gabriel Nabi · novo cliente · site do fotógrafo pet no ar (Vite + Supabase).' },
  { date: '2026-05-24', tag: 'infra',   text: 'GA4 + Consent Mode v2 + banner LGPD configurados — pronto pra tráfego pago.' },
] as const;

export interface FAQEntry {
  q: string;
  a: string;
}

export const FAQ: readonly FAQEntry[] = [
  {
    q: 'Preciso saber exatamente o que quero?',
    a: 'Não. O diagnóstico de 30 minutos serve pra isso. Você chega com o problema, sai com um plano com escopo, prazo e o que faz sentido construir primeiro.',
  },
  {
    q: 'Quanto tempo demora?',
    a: 'Landing simples: 2–3 semanas. E-commerce ou painel interno: 4–6 semanas. AI agent layer: depende do volume, mas tipicamente 2–4 semanas em cima de algo já no ar.',
  },
  {
    q: 'Vocês mantêm o sistema depois?',
    a: 'Sim. Todo projeto entra em retainer leve pós-deploy: monitoramento, atualizações de segurança, bug fixes. Evolução de produto entra como sprint separado.',
  },
  {
    q: 'E se eu quiser mexer eu mesmo no código?',
    a: 'Tudo seu. Repositório, infra, contas de provider — tudo entregue no seu nome. Sem lock-in, sem CMS proprietário escondido.',
  },
  {
    q: 'Quanto custa?',
    a: 'Depende do escopo. Projetos costumam ficar entre 5 e 6 dígitos. O diagnóstico já entrega faixa de preço — sem compromisso de seguir.',
  },
] as const;

export const FOUNDER = {
  name: 'Vinicius Donadão',
  role: 'Computer Scientist · Founder',
  bio1: 'Cientista da computação com background em automação industrial crítica. Construo software e AI agents que resolvem o problema certo — o de gerar receita.',
  bio2: 'Donadão Labs é a operação que rodo: quatro produtos no ar, três em construção e foco atual em AI agents para negócios que já faturam, mas ainda operam no WhatsApp.',
  photo: '/founder.jpg',
} as const;

export const MANIFESTO = {
  quote: 'Software não é arte.',
  quoteEm: 'É infraestrutura de receita.',
  attribution: 'Vinicius Donadão · Founder',
} as const;

export const HERO = {
  badge: 'AI Software Lab · ao vivo · 2026',
  headline: 'AI software',
  headlineEm: 'actually ships',
  sub: 'Construímos sites, sistemas e automações pro seu negócio crescer. Você fala o problema, a gente entrega rodando — sem promessa furada.',
  ctaPrimary: 'Agendar diagnóstico',
  ctaSecondary: 'Ver os cases',
} as const;


export const SHIP_TOOLTIP = {
  eyebrow: '* ship · /ʃɪp/ · do inglês',
  bold: 'Entregar pra valer.',
  rest:
    'Software no ar, funcionando, gerando venda. Não é demo, não é promessa, não é projeto que trava no meio.',
} as const;

export const CTA_FINAL = {
  headline: 'Pronto para',
  headlineEm: 'ship?',
  sub: 'Conta o que precisa rodar. Em 30 minutos sai diagnóstico + plano real de implementação.',
  button: 'Agendar diagnóstico',
} as const;

export const AGENT = {
  apiEndpoint: '/api/diagnose',
  label: '◆ agent diagnóstico · processando ao vivo',
  placeholder: 'descreva o problema do seu negócio em 1 frase',
  btnLabel: 'rodar diagnóstico',
  examples: [
    'tenho um e-commerce no shopify e quero automatizar o pós-venda',
    'minha equipe perde 10h/semana copiando dado entre planilha e WhatsApp',
    'quero um site de apresentação que capte lead direto pra CRM',
  ],
  emailGate: {
    title: 'Quer o plano completo + roadmap por email?',
    sub: 'Deixo um plano detalhado de implementação na sua caixa. Sem spam, sem newsletter chata.',
    cta: 'Receber plano',
    success: '✓ Enviado! Te chamo no WhatsApp/email em até 24h.',
  },
  blockedMessage:
    'Pra continuar perguntando, deixe seu email — assim eu te chamo de volta. Se prefere falar comigo direto, agenda o diagnóstico ali embaixo. Os dois caminhos funcionam.',
  dailyCapMessage:
    'O agent já rodou 100 diagnósticos hoje (cap diário pra eu garantir qualidade nas respostas). Você chegou bem perto do limite — vamos conversar direto. Agenda uma call de 30min comigo, sem compromisso.',
  rateLimitMessage:
    'Calma — só 1 pergunta a cada 10 segundos por visitante. Tenta de novo em alguns instantes.',
  privacy:
    'Ao usar o agent, você concorda que sua pergunta, IP e email (se fornecido) sejam armazenados para contato e melhoria do serviço. Conforme LGPD.',
} as const;
