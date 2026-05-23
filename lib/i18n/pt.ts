import type { Dictionary } from './types';

export const pt: Dictionary = {
  meta: {
    titleTagline: 'Software de IA que ships pra valer.',
    description:
      'Lab IA-first que constrói software e agentes de IA para negócios que precisam crescer. Do diagnóstico ao deploy, com infraestrutura que escala.',
    notFoundTitle: 'Página não encontrada · Donadão Labs',
    notFoundDescription:
      'A página que você procurou não existe — ou foi shipada para outro lugar.',
  },
  nav: {
    links: [
      { label: 'Abordagem', href: '#abordagem' },
      { label: 'Projetos', href: '#cases' },
      { label: 'Fundador', href: '#founder' },
      { label: 'Atualizações', href: '#changelog' },
      { label: 'Dúvidas', href: '#faq' },
    ],
    statusPill: 'live · operando · 2 slots jul/26',
    ctaButton: 'Agendar diagnóstico →',
    langSwitchLabel: 'EN',
  },
  hero: {
    badge: 'IA Software Lab · ao vivo · 2026',
    headline: 'Software de IA',
    headlineEm: 'actually ships',
    headlineConnector: 'que',
    sub: 'Construímos sites, sistemas e automações pro seu negócio crescer. Você fala o problema, a gente entrega rodando — sem promessa furada.',
  },
  metrics: {
    productsLive: { label: 'Produtos no ar', sub: 'em produção' },
    cards: [
      { label: 'Em construção', sub: 'no laboratório' },
      { label: 'Próximo slot', sub: 'vagas abertas · agendar →' },
      { label: 'Zero quedas', sub: 'incidentes em 2026' },
    ],
  },
  stack: {
    label: 'Stack em produção',
  },
  services: {
    eyebrow: 'O que entregamos',
    title: 'Tudo o que seu negócio precisa em um único lugar.',
    sub: 'Do site simples ao sistema completo, com automação e tudo no ar. Você não precisa contratar mais ninguém.',
    items: [
      {
        accessibleTitle: 'Software sob medida',
        accessibleBody:
          'Aquele site, sistema ou app que seu negócio precisa, feito do zero pra você — ou consertando algo que parou de funcionar.',
        technicalTitle: 'Apps from scratch',
        technicalBody:
          'Construa apps from scratch ou faça legacy rescue de sistemas que pararam de escalar. Full-stack pragmático, sem stack frankenstein.',
        techLabel: 'Apps from scratch · Legacy rescue',
        bullets: ['Full-stack pragmático', 'Sem stack frankenstein', 'Deploy em 2–6 semanas'],
      },
      {
        accessibleTitle: 'Sistemas de gestão',
        accessibleBody:
          'Um painel pra acompanhar vendas, estoque, equipe e clientes em um lugar só — sem mil planilhas espalhadas.',
        technicalTitle: 'CRM & SaaS',
        technicalBody:
          'CRM, painel interno e SaaS multi-tenant. Queries em ms, dashboards reais, observabilidade quando importa.',
        techLabel: 'CRM · SaaS interno',
        bullets: ['Multi-tenant', 'Queries em ms', 'Dashboards reais'],
      },
      {
        accessibleTitle: 'Automação com IA',
        accessibleBody:
          'Um “robô” que atende seu cliente no WhatsApp, faz follow-up e qualifica lead — 24h por dia, sem você precisar estar lá.',
        technicalTitle: 'Agentes de IA',
        technicalBody:
          'Agentes de IA em cima do software existente. Guardrails, observabilidade e custo controlado por conversa.',
        techLabel: 'Agentes de IA · WhatsApp · E-mail',
        bullets: ['Guardrails e logs', 'Observabilidade', 'Custo controlado'],
      },
      {
        accessibleTitle: 'Infra & deploy',
        accessibleBody:
          'Aquela parte chata por trás: domínio, servidor, atualizações de segurança. A gente cuida. Você só vê rodando.',
        technicalTitle: 'Full setup',
        technicalBody:
          'Domínio, DNS, CI/CD, SSL e monitoramento bundled em todo projeto. SLA com resposta < 4h úteis.',
        techLabel: 'Bundled · Não vendido separado',
        bullets: ['SLA monitorado', 'Backups diários', 'Resposta < 4h úteis'],
      },
    ],
    flipFront: 'ver técnico',
    flipBack: 'voltar',
    technicalPrefix: 'téc.',
  },
  approach: {
    eyebrow: 'Como trabalhamos',
    title: 'Três passos. Sem teatro.',
    sub: 'Quase tudo em IA hoje para no slide ou no demo bonito. Aqui o software vai pro ar e fatura — e poucos entregam isso.',
    items: [
      {
        day: 'Dia 0–3',
        label: 'Diagnose',
        title: 'Entender o problema comercial',
        body: 'Antes de uma linha de código: onde sua receita escapa, que processo você roda no braço e o que tecnologia pode mover de fato.',
      },
      {
        day: 'Dia 3–21',
        label: 'Build',
        title: 'Software que ships',
        titleShipWord: 'ships',
        body: 'Engenharia full-stack pragmática. Sem stack frankenstein, sem promessas. O que sobe em produção, escala.',
      },
      {
        day: 'Dia 21+',
        label: 'Automate',
        title: 'Camada de agentes de IA',
        body: 'Em cima do software, agentes que automatizam operação: atendimento, follow-up, gestão. IA que tira trabalho chato da sua mesa.',
      },
    ],
  },
  cases: {
    eyebrow: 'Cases · 2025–2026',
    title: 'Quatro produtos rodando. Sem mockup.',
    sub: 'Software real, no ar, gerando venda.',
    internalLabel: 'interno',
    liveLabel: 'live',
    internalSuffix: '· interno',
    publicSuffix: '.app',
    internalAria: 'sistema interno, sem link público',
    items: [
      {
        kind: 'Landing page · Pet Photography',
        title: 'Landing completa para fotógrafo',
        desc: 'Site de apresentação do trabalho com captação de contato, agenda e pagamento integrado. Substitui Linktree + WhatsApp + cobrança manual.',
        metric: '↑ 3.2× contato qualificado',
      },
      {
        kind: 'E-commerce · Impressão 3D',
        title: 'E-commerce de impressão 3D',
        desc: 'Loja completa com checkout otimizado e painel de gestão para venda de produtos impressos em 3D. UX premium em categoria commoditizada.',
        metric: 'Checkout < 90s',
      },
      {
        kind: 'CRM interno · SaaS',
        title: 'Painel de operação interna',
        desc: 'Sistema interno do cliente — sem demo pública, mas o resultado fala. Painel enxuto pra acompanhar vendas, estoque e performance, sem cair no excesso de uma ERP cara.',
        metric: '12h/semana economizadas',
      },
      {
        kind: 'Landing page · Manutenção veicular',
        title: 'Site institucional para oficina',
        desc: 'Landing de apresentação dos serviços, captação de contato e canal direto com o cliente. Site real para um negócio que vive offline.',
        metric: '↑ orçamentos via web',
      },
    ],
  },
  manifesto: {
    eyebrow: '◆ princípio',
    quote: 'Software não é arte.',
    quoteEm: 'É infraestrutura de receita.',
    attribution: 'Vinicius Donadão · Founder',
  },
  changelog: {
    eyebrow: 'Changelog público',
    title: 'O que rodou nas últimas semanas.',
    sub: 'Registro público das releases. Sem maquiagem.',
  },
  founder: {
    eyebrow: 'Quem opera',
    title: 'Pessoa por trás do código.',
    sub: 'Sem agência intermediária. Você fala direto com quem constrói.',
    badge: 'founder · ao vivo',
    bio1: 'Cientista da computação com background em automação industrial crítica. Construo software e agentes de IA que resolvem o problema certo — o de gerar receita.',
    bio2: 'Donadão Labs é a operação que rodo: quatro produtos no ar, três em construção e foco atual em agentes de IA para negócios que já faturam, mas ainda operam no WhatsApp.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Perguntas que sempre aparecem.',
    items: [
      {
        q: 'Preciso saber exatamente o que quero?',
        a: 'Não. O diagnóstico de 30 minutos serve pra isso. Você chega com o problema, sai com um plano com escopo, prazo e o que faz sentido construir primeiro.',
      },
      {
        q: 'Quanto tempo demora?',
        a: 'Landing simples: 2–3 semanas. E-commerce ou painel interno: 4–6 semanas. Camada de agentes de IA: depende do volume, mas tipicamente 2–4 semanas em cima de algo já no ar.',
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
    ],
  },
  cta: {
    headline: 'Pronto para',
    headlineEm: 'ship?',
    sub: 'Conta o que precisa rodar. Em 30 minutos sai diagnóstico + plano real de implementação.',
    button: 'Agendar diagnóstico',
    orPrefix: 'ou',
  },
  ship: {
    ariaLabel: 'O que significa ship? Clique para ver a tradução.',
    eyebrow: '* ship · /ʃɪp/ · do inglês',
    bold: 'Entregar pra valer.',
    rest: 'Software no ar, funcionando, gerando venda. Não é demo, não é promessa, não é projeto que trava no meio.',
    short: {
      eyebrow: '* ship · /ʃɪp/',
      bold: 'Entregar pra valer.',
      rest: 'Software no ar, gerando venda.',
    },
  },
  footer: {
    rights: '© 2026 donadão/labs · donadaolabs.com',
    build: 'build · 2026.05.13 · live',
  },
  notFound: {
    badge: '404 · Não encontrado',
    title: 'Essa página',
    titleEm: 'não shipou.',
    body: 'O endereço que você procurou não existe — ou foi movido. Sem drama, volta pra home e continua de lá.',
    ctaHome: 'Voltar pra home',
    ctaCases: 'Ver os cases',
  },
};
