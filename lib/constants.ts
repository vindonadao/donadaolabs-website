/**
 * Donadão Labs — Site constants
 * Source of truth for copy, URLs, and structured data.
 * Voice/tone: 70% formal · 60% técnico · vocab: ships, built, real, lab, craft.
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
  { label: 'Abordagem', href: '#approach' },
  { label: 'Cases', href: '#cases' },
  { label: 'Founder', href: '#founder' },
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
}

export const SERVICES: readonly Service[] = [
  {
    id: 'build',
    num: '01',
    techLabel: 'BUILD',
    accessibleTitle: 'Software sob medida',
    accessibleBody:
      'Construímos o software que seu negócio precisa, do zero — ou resgatamos sistemas que pararam de escalar.',
    technicalTitle: 'Apps from scratch',
    technicalBody:
      'Engenharia full-stack pragmática, sem stack frankenstein. Apps from scratch, legacy rescue e enterprise build.',
  },
  {
    id: 'systems',
    num: '02',
    techLabel: 'SYSTEMS',
    accessibleTitle: 'Sistemas de gestão',
    accessibleBody:
      'CRM, painéis e ferramentas internas pra sua operação rodar organizada. Novos ou evoluindo o que já existe.',
    technicalTitle: 'CRM & SaaS',
    technicalBody:
      'CRM e SaaS — novos ou existentes. Multi-tenant, queries em ms, dashboards reais. Database engineering quando importa.',
  },
  {
    id: 'automate',
    num: '03',
    techLabel: 'AUTOMATE',
    accessibleTitle: 'Automação com AI',
    accessibleBody:
      'Atendimento, follow-up e qualificação de lead automatizados. AI que tira trabalho repetitivo da sua mesa.',
    technicalTitle: 'AI agents',
    technicalBody:
      'AI agents que rodam atendimento, follow-up e qualificação. Layer em cima do software existente, com guardrails e observabilidade.',
  },
  {
    id: 'infra',
    num: '04',
    techLabel: 'INFRA',
    accessibleTitle: 'Tudo no ar',
    accessibleBody:
      'Domínio, servidor, atualizações, segurança. Cuidamos da infraestrutura inteira — você só vê o produto rodando.',
    technicalTitle: 'Full setup',
    technicalBody:
      'Domínio, DNS, repositório, CI/CD, deploy, SSL e monitoramento. Bundled em todo projeto — não vendido em separado.',
  },
] as const;

export interface Pillar {
  num: string;
  label: string;
  title: string;
  body: string;
}

export const PILLARS: readonly Pillar[] = [
  {
    num: '01',
    label: 'Diagnose',
    title: 'Entender o problema comercial',
    body: 'Antes de uma linha de código: onde sua receita escapa, que processo você roda no braço e o que tecnologia pode mover de fato.',
  },
  {
    num: '02',
    label: 'Build',
    title: 'Software que ships',
    body: 'Engenharia full-stack pragmática. Sem stack frankenstein, sem promessas. O que sobe em produção, escala.',
  },
  {
    num: '03',
    label: 'Automate',
    title: 'Camada de AI agents',
    body: 'Em cima do software, agents que automatizam operação: atendimento, follow-up, gestão. AI que tira trabalho chato da sua mesa.',
  },
] as const;

export interface Case {
  num: string;
  client: string;
  meta: string;
  title: string;
  desc: string;
  stack: readonly string[];
}

export const CASES: readonly Case[] = [
  {
    num: '01',
    client: 'Gabriel Nabi',
    meta: 'Landing page · Pet Photography',
    title: 'Landing page completa para fotógrafo',
    desc: 'Site de apresentação do trabalho com captação de contato, agenda e pagamento integrado. Substitui Linktree + WhatsApp + cobrança manual em um único endereço.',
    stack: ['React', 'Node', 'Stripe', 'Postgres'],
  },
  {
    num: '02',
    client: 'Diskat Presentes',
    meta: 'E-commerce · Impressão 3D',
    title: 'E-commerce de produtos de impressão 3D',
    desc: 'Loja completa com checkout otimizado e painel de gestão para venda de produtos impressos em 3D. UX premium em categoria commoditizada.',
    stack: ['Next.js', 'Stripe', 'Postgres'],
  },
  {
    num: '03',
    client: 'Diskat Ops',
    meta: 'CRM interno · SaaS',
    title: 'Software de controle de operação',
    desc: 'Painel enxuto para acompanhar vendas, estoque e performance — sem cair no excesso de uma ERP cara.',
    stack: ['React', 'Node', 'Postgres', 'Redis'],
  },
  {
    num: '04',
    client: 'Cali Garage',
    meta: 'Landing page · Manutenção veicular',
    title: 'Site institucional para oficina automotiva',
    desc: 'Landing de apresentação dos serviços, captação de contato e canal direto com o cliente. Site real para um negócio que vive offline.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
  },
] as const;

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

export const FOUNDER = {
  name: 'Vinicius Donadão',
  role: 'Computer Scientist · Founder · Industrial Systems',
  bio1: 'Cientista da computação com background em automação industrial crítica. Construo software e AI agents que resolvem o problema certo — o de gerar receita.',
  bio2: 'Donadão Labs é a operação que rodo: quatro produtos no ar e foco atual em AI agents para negócios que já faturam, mas ainda operam no WhatsApp.',
} as const;

export const MANIFESTO = {
  quote: 'Software não é arte.',
  quoteEm: 'É infraestrutura de receita.',
} as const;

export const HERO = {
  badge: 'AI Software Lab · 2026',
  headline: 'AI software',
  headlineEm: 'actually ships.',
  sub: 'Construímos sites, sistemas e automações pro seu negócio crescer. Você fala o problema, a gente entrega rodando — sem promessa furada.',
  ctaPrimary: 'Agendar diagnóstico',
  ctaSecondary: 'Ver os cases',
} as const;

export const CTA_FINAL = {
  headline: 'Pronto',
  headlineEm: 'ship?',
  sub: 'Conta o que precisa rodar. Em 30 minutos sai o diagnóstico e um plano de implementação real.',
  button: 'Agendar diagnóstico',
} as const;
