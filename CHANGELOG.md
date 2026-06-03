# Changelog

All notable changes to the Donadão Labs landing page will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses revision-based versioning (`rev-X.Y`).

## [Unreleased]

### Added

- **CSP estrita com nonce (Report-Only)** — `middleware.ts` gera um nonce por request, injeta em `x-nonce` (request) + `Content-Security-Policy` (request, p/ o Next 14 propagar o nonce aos próprios `<script>`) e devolve a policy estrita (`script-src 'self' 'nonce-…' 'strict-dynamic' https:`, sem `'unsafe-inline'` em script) como `Content-Security-Policy-Report-Only` na response. Layout (`app/[lang]/layout.tsx`) lê o nonce via `headers()` e propaga aos scripts JSON-LD e ao `<GoogleAnalytics>`; o componente GA repassa aos `<Script>` (gtag + bootstrap). Validado local (Chrome headless): **zero violação de CSP de recurso próprio** — GA e Vercel Analytics OK sob `strict-dynamic`.

### Changed

- `app/[lang]/layout.tsx` passa a usar `export const dynamic = 'force-dynamic'` — pré-requisito da CSP com nonce (o nonce do HTML precisa casar com o do header, gerado por request). Custo: `/pt` e `/en` renderizam por request (sem cache estático). Demais security headers (HSTS, X-Frame-Options, etc.) preservados no `next.config.mjs`.

### Pendente (não nesta entrega)

- **Enforce** (TAREFA 4): após validar Report-Only em produção, trocar no middleware `Content-Security-Policy-Report-Only` → `Content-Security-Policy` e remover a CSP loose (Report-Only) do `next.config.mjs`.
- **GA4** (TAREFA 5): marcar `generate_lead` como evento-chave no painel.
- `/[lang]/privacidade`: revisar base legal/retenção antes de tráfego pago.

### Fixed

---

## [rev-2.8.0] — 2026-06-03

A página do brand book passa a respeitar o idioma selecionado no site. Antes, `/brand` era uma rota raiz estática fora do segmento `[lang]`, com texto hardcoded em português e `lang="pt-BR"` fixo — então selecionar EN não tinha efeito. Agora a página é localizada em `/[lang]/brand` (PT/EN), com toggle de idioma próprio. O PDF e os assets em `/brand/*` não mudam; a URL curta `/brand` redireciona para o idioma padrão.

### Added
- **`app/[lang]/brand/page.tsx`** — página do brand book localizada (PT/EN), com `generateStaticParams` + `generateMetadata` (canonical/OG por locale) e toggle de idioma no topbar.
- **Bloco `brand`** em `lib/i18n/{types,pt,en}.ts` — todos os textos da UI da página (hero, botões, preview, cards).
- **Redirect `/brand` → `/pt/brand`** em `next.config.mjs` (espelha `/` → `/pt`). Assets `/brand/*.*` não são afetados (match exato).
- Rotas `/pt/brand` e `/en/brand` no `app/sitemap.ts`.

### Changed
- **`components/nav.tsx`** — links de rota no nav agora recebem o prefixo de locale (`/{lang}/brand`); âncoras (`#secao`) seguem inalteradas.

### Removed
- **`app/brand/page.tsx`** e **`app/brand/layout.tsx`** — substituídos pela versão localizada. `app/brand/README.md` e os assets em `public/brand/` permanecem.

---

## [rev-2.7.0] — 2026-06-03

Implementação da **Auditoria 2.0** (segurança, LGPD, SEO técnico, conversão e acessibilidade). Parte da auditoria já estava no ar desde a `rev-2.5.0` (Consent Mode v2 default + banner LGPD) — esta release fecha os gaps restantes. CSP entra em **Report-Only** (observação por ~1 semana antes de virar enforce).

### Added
- **CSP `Content-Security-Policy-Report-Only`** em `next.config.mjs` — política adaptada ao stack real (GA4, Vercel Analytics/Speed Insights, iframe do brand book, form do agente). Não bloqueia nada ainda; só registra violações.
- **Página `/[lang]/privacidade`** (`app/[lang]/privacidade/page.tsx`) — Política de Privacidade bilíngue (PT/EN) com design system, `generateStaticParams` + `generateMetadata` + `hreflang`. Conteúdo i18n em `lib/i18n/{pt,en}.ts` (`privacy`).
- **Link "Política de Privacidade"** no rodapé (`components/footer.tsx`), apontando para `/{lang}/privacidade`.
- **JSON-LD `WebSite`** (global, em `app/[lang]/layout.tsx`) e **`FAQPage`** (na home, gerado a partir das respostas reais visíveis em `dict.faq.items`). O `Organization` já existia.
- **Componente `TrackedCalLink`** (`components/tracked-cal-link.tsx`) — link de agendamento que dispara o evento de conversão `generate_lead` no GA4 (`cta_location`).
- **Link estático de agendamento no herói** (SSR) como fallback de conversão caso o JS do agente falhe (`hero.scheduleCta`).
- **Evento `diagnostic_start`** no agente ao rodar um diagnóstico.
- Rotas `/pt/privacidade` e `/en/privacidade` no `app/sitemap.ts` (prioridade 0.2).

### Changed
- CTAs cal.com do nav, CTA final e blocos do agente (cap diário, rate limit, email gate) agora usam `TrackedCalLink` — rastreiam conversão e ganham `rel="noopener noreferrer"`.

### Fixed
- **a11y:** input principal do agente ganha `aria-label` (`agent.inputAria`) — não tinha `<label>` visível.
- **Segurança de links:** `rel="noreferrer"` → `rel="noopener noreferrer"` nos links externos de `cases.tsx`, `metrics.tsx` e `live-agent.tsx`.

### Note
- A CSP está em **Report-Only**. Após ~1 semana sem violações legítimas no console, trocar a chave para `Content-Security-Policy` (enforce) em `next.config.mjs`.
- A página de privacidade é informativa — revisar base legal, retenção e indicação de DPO antes de tratar como parecer jurídico (nota já visível na própria página).

---

## [rev-2.6.2] — 2026-06-03

Changelog público (seção `#changelog` da home) refrescado pra refletir o movimento recente do estúdio. As 5 entries antigas (até 24/05) dão lugar aos marcos das últimas duas semanas, com rotação natural — as mais velhas (site bilíngue, Quituteria da Fafá, Diskat, agente WhatsApp) saem da vitrine pública. Label `shipped` mantida (vem de "realmente *ships*", carro-chefe do branding). Datas editoriais/aproximadas.

### Changed
- **`lib/constants.ts`** (`CHANGELOG`) — 5 entries substituídas (`date` + `tag`): OPS (`rfc`), A Vegana (`shipped`), Brand book v2 (`shipped`), Gabriel Nabi (`shipped`), GA4/LGPD (`infra`).
- **`lib/i18n/pt.ts`** (`changelog.entries`) — textos PT alinhados às novas entries.
- **`lib/i18n/en.ts`** (`changelog.entries`) — textos EN alinhados às novas entries.

---

## [rev-2.6.1] — 2026-05-30

O preview de compartilhamento da home (`/pt`, `/en`) passa a usar a imagem oficial do brand book v2 (`/brand/og.png`, verde) em vez do card gerado dinamicamente por `/api/og` (visual antigo roxo). Alinha o OG da home ao da rota `/brand`, que já usava a peça nova. Remove a rota dinâmica e as fontes que só ela consumia.

### Changed
- **`app/[lang]/layout.tsx`** — `openGraph.images` e `twitter.images` agora apontam para `/brand/og.png` (1200×630) em vez de `/api/og`.

### Removed
- **`app/api/og/route.tsx`** — rota de OG dinâmico aposentada (substituída pela imagem estática).
- **`public/fonts/InterTight-600.ttf`**, **`public/fonts/InterTight-800.ttf`** — fontes consumidas exclusivamente pela rota `/api/og` removida.
- **`public/brand/monogram-dd-accent.svg`** — asset sem referências no código.

### Note
- Os scrapers (LinkedIn, WhatsApp, Meta) mantêm cache do preview por URL. Após o deploy, forçar re-scrape via LinkedIn Post Inspector / Meta Sharing Debugger.

---

## [rev-2.6.0] — 2026-05-29

Nova rota pública `/brand` publica o brand book v2 (`rev-0.2`) como página dedicada — header + preview em `<iframe>` + download direto. O PDF fica acessível por uma URL estável (`/brand/latest.pdf`) que aponta sempre para a revisão canônica atual, então ao subir uma `rev-0.3` basta trocar o destino no rewrite. OG card próprio (`article`, 1200×630) pra compartilhamento. Link **Brand** entra no nav PT/EN.

### Added
- **`app/brand/page.tsx`** — página da rota `/brand`: apresentação do brand book v2, preview embed do PDF e download.
- **`app/brand/layout.tsx`** — metadata da rota: `og:type` `article`, OG card dedicado (`/brand/og.png`, 1200×630), título/descrição próprios.
- **`public/brand/brand-book-rev-0.2.pdf`** — brand book v2 (`rev-0.2`), 1.3 MB. Versão canônica atual servida em `/brand/latest.pdf`.
- **`public/brand/og.png`** — OG card da rota `/brand` (1200×630).
- **Rewrite `/brand/latest.pdf` → `/brand/brand-book-rev-0.2.pdf`** em `next.config.mjs` — URL pública estável e independente da revisão. Próxima rev só troca o destino.
- **Link `Brand` no nav** (PT e EN) — aponta para `/brand`.

### Changed
- **`X-Frame-Options`** `DENY` → `SAMEORIGIN` em `next.config.mjs` — permite o preview do brand book em `<iframe>` na própria origem. Embeds de terceiros continuam bloqueados (proteção contra clickjacking mantida).

---

## [rev-2.5.1] — 2026-05-24

Hero PT (`actually` → `realmente`) + Changelog público refrescado com trabalhos dos últimos dias (novo cliente + auditorias + i18n + analytics).

### Changed
- **`hero.headlineEm`** PT: `actually ships` → `realmente ships`. Toda a expressão segue dentro do `<Ship>` (gradient italic + tooltip). Padrão simétrico com EN `actually ships`.
- **`hero.headlineConnector`** PT: mantém `que` (simétrico com EN `that`).
- **Changelog público (5 entries)** — atualizado pra refletir movimento recente do estúdio:
  1. `2026-05-24` infra · GA4 + Consent Mode v2 + banner LGPD (donadaolabs.com)
  2. `2026-05-23` shipped · Site bilíngue PT/EN com SEO duplo + Live Agent em 2 idiomas
  3. `2026-05-22` shipped · **Quituteria da Fafá** (novo cliente · MVP e-commerce + checkout WhatsApp)
  4. `2026-05-21` infra · **Diskat Presentes** (auditoria Cowork · RLS + LGPD + GA4)
  5. `2026-05-02` agent · Agente WhatsApp em produção (38s/lead) — mantida da rev anterior, vende o produto principal
- **Removidas:** Redesign UI rev-2.1.0 (2026-05-19), email setup (2026-05-19), Diskat Ops forecasting (2026-05-09), Cloudflare Tunnel (2026-04-24). 4 entries antigas saem pra dar espaço pras novas, mantendo padrão de 5 totais (rev-2.2.1).
- **EN dictionary** também recebeu as 5 entries traduzidas — simétrico com PT.

### Notes
- **Datas estimadas** pra entries 3 e 4 (Quituteria + Diskat audit) — user pode ajustar via PR direto em `lib/constants.ts` se necessário.
- **Changelog vira vitrine** do estúdio, não só do donadaolabs.com. Mostra clientes reais sendo movimentados, não só features internas.

---

## [rev-2.5.0] — 2026-05-24

GA4 + Consent Mode v2 + banner LGPD — wiring de analytics pronto pra tráfego pago (Google Ads/LinkedIn/Meta). Sem `NEXT_PUBLIC_GA_MEASUREMENT_ID` o código fica inerte (zero impact até ligar).

### Added
- **`lib/gtag.ts`** — wrapper tipado pro `window.gtag`. Funções: `pageview(url)`, `event(name, params)`, `setConsent(granted)`. Guard `isGAEnabled()` baseado em `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- **`components/google-analytics.tsx`** ([components/google-analytics.tsx](components/google-analytics.tsx)) — injeta gtag.js + bootstrap Consent Mode v2 (default `denied` em todos os 4 storage types: ad_storage, ad_user_data, ad_personalization, analytics_storage). Pageview tracker via `usePathname` + `useSearchParams` (App Router não tem `router.events`).
- **`components/consent-banner.tsx`** — banner LGPD bottom-left, dismissible, persiste decisão em `localStorage['dl_consent_v1']`. Não renderiza se GA não configurado. Estados: `null` → mostra banner; `'granted'` → atualiza consent no mount; `'denied'` → mantém default denied.
- **`Dictionary['consent']`** ([lib/i18n/types.ts](lib/i18n/types.ts)) — `{ message, accept, reject }` traduzidos. PT: "Usamos cookies pra entender o uso do site e melhorar a experiência. Conforme LGPD." EN: "We use cookies to understand site usage and improve experience. Per LGPD/GDPR."
- **Evento custom `agent_run`** — disparado em [components/live-agent.tsx](components/live-agent.tsx) após resposta do Claude voltar com sucesso. Params: `{ lang: 'pt' | 'en', has_email: boolean }`. Permite filtrar quem rodou diagnóstico (mid-funnel) — futura conversão pra Google Ads.

### Changed
- **`app/[lang]/layout.tsx`** — `<GoogleAnalytics />` + `<ConsentBanner dict={...} />` adicionados ao `<body>` (depois dos `children`, antes do Vercel Analytics). Mantém Vercel Analytics + Speed Insights operando em paralelo.

### Configuration (action needed)
1. **Criar propriedade GA4** em [analytics.google.com](https://analytics.google.com) na conta `donadaolabs@gmail.com`.
2. **Pegar Measurement ID** (formato `G-XXXXXXXXXX`) em Admin → Data Streams → Web.
3. **Adicionar `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`** em:
   - `.env.local` (dev)
   - Vercel env vars (Production + Preview + Development)
4. Redeploy. Sem o env var, `<GoogleAnalytics />` retorna `null` e `<ConsentBanner />` não mostra banner — zero impacto.

### Notes
- **Privacy stance:** Consent Mode v2 default denied = LGPD compliance. Visitantes que **recusam** ainda contribuem pra agregados via "consent pings" cookieless (modelagem GA4), mas sem identificação individual ou remarketing.
- **Não conflita com Vercel Analytics** — os dois rodam lado a lado. Vercel = pageviews privacy-first; GA4 = funnel + atribuição + Ads integration.
- **Tráfego pago next steps**: depois do baseline de 2-4 semanas, ligar Google Ads + criar conversion event `agent_run` no GA4 (Admin → Events → Mark as conversion). Eventos adicionais recomendados pra expansão futura: `click_cta_cal` (botões de cal.com), `agent_email_captured` (email gate), `switch_language` (toggle PT/EN).

---

## [rev-2.4.7] — 2026-05-23

Live Agent (diagnóstico via Claude) ganha tradução EN **completa** — UI inteira + system prompt do Claude. Antes vazava 100% em PT na aba EN (UI e resposta).

### Added
- **`Dictionary['agent']`** ([lib/i18n/types.ts](lib/i18n/types.ts)) — ~25 strings UI consolidadas: `label`, `placeholder`, `placeholderDisabled`, `btnLabel`, `btnLoading`, `analyzing`, `examples[]`, `exampleAriaTemplate`, `emailInputPlaceholder`, `emailGate.{eyebrowPlan, eyebrowContinue, title, sub, cta, ctaLoading, success, altQuestion, altButton}`, `blockedMessage`, `dailyCap.{eyebrow, message, button}`, `rateLimit.{eyebrow, message, altQuestion, altButton}`, `errorOffline`, `privacy`.
- **EN agent strings** — examples em inglês ("i have a shopify e-commerce…"), email gate ("Want the full plan + roadmap…"), errors ("ERROR: agent offline…"), LGPD privacy nota traduzida.
- **`exampleAriaTemplate`** — template com placeholder `{example}` (replaced inline). Antes era string interpolada hardcoded em PT no componente.

### Changed
- **`components/live-agent.tsx`** — recebe `dict: Dictionary` como prop, consome `dict.agent.*` em vez de `AGENT.*` (constants) e strings hardcoded. ~15 strings que estavam dentro do JSX viraram dict-driven.
- **`components/hero.tsx`** — passa `dict={dict}` pra `<LiveAgent />`.
- **PT `agent.label`**: `agent diagnóstico` → `agente diagnóstico`.
- **PT `agent.errorOffline`** / `dailyCap.message`: `agent offline/já rodou` → `agente offline/já rodou`.

### Added (API)
- **`/api/diagnose` aceita `lang: 'pt' | 'en'`** no payload ([app/api/diagnose/route.ts](app/api/diagnose/route.ts)). Default `pt` (mantém compat).
- **`buildPrompt(question, lang)`** — split do system prompt do Claude em duas variantes:
  - PT: `Você é o agente de diagnóstico do Donadão Labs (lab brasileiro de software IA-first)... DIAGNÓSTICO / SOLUÇÃO / STACK SUGERIDA / PRAZO / PRÓXIMO PASSO`
  - EN: `You are the diagnosis agent for Donadão Labs... DIAGNOSIS / SOLUTION / SUGGESTED STACK / TIMELINE / NEXT STEP`
- **`normalizeLang(value)`** — sanitiza input do client. Qualquer valor != 'en' vira 'pt'. Defensive contra payload manipulado.

### Changed (API/component)
- **`components/live-agent.tsx`** — `CallPayload` ganha `lang: Locale`. Passado no POST `/api/diagnose`. UI inteira agora dict-driven (~25 strings UI consolidadas em `dict.agent.*`).
- **`components/hero.tsx`** — recebe `lang: Locale` como prop, propaga pra `<LiveAgent lang={lang} dict={dict} />`.
- **`app/[lang]/page.tsx`** — passa `lang={params.lang}` pro `<Hero />` (antes só Nav recebia).

### Notes
- **Output parser do AgentOutput** (regex `^([A-ZÀ-Ú\s]+):\s*(.+)$`) funciona em ambos idiomas — labels PT (`DIAGNÓSTICO`, `SOLUÇÃO`) com acentos via `À-Ú` range, e EN (`DIAGNOSIS`, `SOLUTION`) ASCII puro.
- **Notificações pro founder** (Telegram + WhatsApp + Email) seguem em PT — quem recebe é o founder brasileiro, idioma da resposta do Claude não importa pra esse canal.
- **`AGENT.apiEndpoint`** em `lib/constants.ts` permanece — config técnica idioma-neutra.

---

## [rev-2.4.6] — 2026-05-23

Cases header + header/footer status — última leva de termos em inglês visíveis no PT (Cases, mockup, live, build).

### Changed
- **`cases.eyebrow`** PT: `Cases · 2025–2026` → `Projetos · 2025–2026`. Alinha com o nav PT (`Projetos`) — categoria fica consistente em todo o site.
- **`cases.title`** PT: `Quatro produtos rodando. Sem mockup.` → `Quatro produtos rodando. Sem firula.`. Brand voice direto/brasileiro, casa com `Sem teatro` (approach) e `Sem maquiagem` (changelog) e o "sem promessa furada" do Hero.
- **`cases.liveLabel`** PT: `live` → `no ar`. Selo nos cards (verde, ● bolinha pulsante).
- **`nav.statusPill`** PT: `live · operando · 2 slots jul/26` → `no ar · operando · 2 slots jul/26`. Pill verde no canto direito do header.
- **`footer.build`** PT: `build · 2026.05.13 · live` → `versão · 2026.05.13 · no ar`.

### Notes
- **Padrão "live" em PT:** `no ar` em contextos técnicos (header, footer, cases). `ao vivo` mantido só no `founder.badge` (mais humano/emocional, casa com "founder · live streaming").
- **EN intocado** — `live`, `build`, `Cases`, `mockup` continuam naturais em inglês.

---

## [rev-2.4.5] — 2026-05-23

Changelog tags & entries traduzidas, Founder role no dict, e fix de spacing no CTA pro `*` do Ship não cruzar o subtítulo.

### Added
- **`Dictionary['changelog'].tagLabels`** ([lib/i18n/types.ts](lib/i18n/types.ts)) — record `{ shipped, agent, infra, rfc, hotfix }` traduzido por idioma. PT mantém wordplay de marca: `shipped → shipado` (vs. literal "entregue"). Outras tags ficam universais.
- **`Dictionary['changelog'].entries[]`** — array indexado por posição (mesma ordem de `CHANGELOG` em constants) com `text` traduzível. Permite EN ter Changelog 100% inglês sem duplicar `date`/`tag` em constants.
- **`Dictionary['founder'].role`** — cargo do founder ("Cientista da Computação · Fundador" / "Computer Scientist · Founder"). Antes vinha de `FOUNDER.role` em constants (compartilhado, sempre em EN).
- **EN Changelog completo** — 5 entries traduzidas pra inglês. Antes ficavam em PT mesmo na aba EN (vazamento de escopo da rev-2.4.0).

### Changed
- **`founder.badge`** PT: `founder · ao vivo` → `fundador · ao vivo`. EN mantém `founder · live`.
- **`changelog.entries[2]`** PT: "novo módulo de previsão de estoque com forecasting semanal" → "novo módulo de previsão semanal de estoque" (remove anglicismo + redundância).
- **`changelog.entries[3]`** PT: "Agent de qualificação" → "Agente de qualificação".
- **`components/changelog.tsx`** — `c.tag` agora roteia por `dict.changelog.tagLabels[c.tag]`. `c.text` substituído por `dict.changelog.entries[i].text`.
- **`components/founder.tsx`** — exibe `dict.founder.role` em vez de `FOUNDER.role` (constants).
- **`components/cta.tsx`** — sub `mt-5.5` → `mt-10`. Aumenta gap entre h2 (com `*` superscript do Ship) e parágrafo, evitando a dotted-underline do "ship?" colidir com a 1ª linha do subtítulo em viewports wide. Universal — funciona em PT ("Pronto para ship?*") e EN ("Ready to ship?*").

---

## [rev-2.4.4] — 2026-05-23

Back dos service cards PT — última leva de termos em inglês que ainda vazavam quando o usuário virava o card pra ver o lado técnico.

### Changed
- **`services.items[0]`** (Apps): `Apps from scratch` → `Apps do zero`, `Legacy rescue` → `Resgate de legado`, body atualizado, bullet `Deploy em 2–6 semanas` → `Entrega em 2–6 semanas`.
- **`services.items[1]`** (CRM/SaaS): body `Queries em ms, dashboards reais` → `Consultas em ms, painéis reais`. Bullets idem.
- **`services.items[3]`** (Infra): `Full setup` → `Setup completo`, `Bundled` (techLabel) → `Incluso`, body `monitoramento bundled` → `monitoramento inclusos`.

### Notes
- **Mantidos em inglês intencionalmente** (jargão tech adotado em PT BR): `Full-stack`, `stack frankenstein`, `Multi-tenant`, `SaaS`, `CRM`, `DNS`, `CI/CD`, `SSL`, `SLA`, `Backups`. Trocar esses faria o copy soar acadêmico/distante do mercado.
- **`services.items[2]`** (IA agents) já estava 100% PT desde rev-2.4.3.

---

## [rev-2.4.3] — 2026-05-23

PT vira PT pra valer — substitui todas as ocorrências visíveis de **AI** por **IA** e adiciona tooltip "ship*" também no pillar 02 (Build).

### Added
- **`Dictionary['ship'].short`** ([lib/i18n/types.ts](lib/i18n/types.ts)) — variante resumida do tooltip pra contextos secundários (pillars, cards, callouts). Componente `Ship` ganha prop `variant?: 'full' | 'short'` (default `full`).
- **`Dictionary['approach'].items[].titleShipWord?`** — quando presente, a palavra dentro de `title` vira `<Ship variant="short">{word}</Ship>` (com gradient italic). Habilitado no pillar 02 (`titleShipWord: 'ships'` em PT e EN).
- **`Dictionary['meta'].titleTagline`** — tagline curto exibido em `<title>`. Antes vinha de `SITE.tagline` (compartilhado). Agora idioma-aware: PT = "Software de IA que ships pra valer.", EN = "AI software that actually ships."
- **`components/approach.tsx::renderPillarTitle()`** — splita o title na `titleShipWord` e injeta `<Ship variant="short">`. Fallback pra texto puro se a palavra não existir no title.

### Changed
- **`lib/i18n/pt.ts`** — todas as ocorrências visíveis de **AI** → **IA**:
  - `hero.badge`: "AI Software Lab" → "IA Software Lab"
  - `hero.headline`: "AI software" → "Software de IA"
  - `hero.headlineConnector`: "that" → "que" (gramática casa com "Software de IA que ships")
  - `meta.description`: "Lab AI-first … AI agents" → "Lab IA-first … agentes de IA"
  - `services.items[2]` (AI agents card): "Automação com AI" → "Automação com IA", "AI agents" → "Agentes de IA", techBody/techLabel idem
  - `approach.items[2].title`: "Camada de AI agents" → **"Camada de agentes de IA"**
  - `approach.items[2].body`: "agents que automatizam … AI que tira trabalho" → "agentes que automatizam … IA que tira trabalho"
  - `approach.sub`: "Quase tudo em AI hoje" → "Quase tudo em IA hoje"
  - `founder.bio1`, `founder.bio2`: "AI agents" → "agentes de IA"
  - `faq.items[1].a`: "AI agent layer" → "Camada de agentes de IA"
- **`app/[lang]/layout.tsx`** — `<title>` agora usa `dict.meta.titleTagline` em vez de `SITE.tagline`. Pro Google e pra aba do browser, cada idioma vira seu próprio tagline.

### Notes
- **Pillar 02 "Software que ships"** — agora exibe `ships*` com tooltip (gradient italic, hover/click revela definição resumida). Mesmo tratamento usado no Hero e no CTA, mas com versão curta da explicação.
- **Tooltip resumido vs completo**: full = "Software no ar, funcionando, gerando venda. Não é demo, não é promessa, não é projeto que trava no meio." / short = "Software no ar, gerando venda."
- **Mantidos em inglês intencionalmente** (termos de SEO universais, fora do copy visível):
  - `metadata.keywords` em `app/[lang]/layout.tsx` (AI software, AI agents, AI development)
  - `JSON-LD knowsAbout` (AI software, AI agents) — schema.org pro Google entender o nicho
  - **EN dictionary** segue como tá — "AI software / AI agents" são naturalmente em inglês

---

## [rev-2.4.2] — 2026-05-23

Nav PT despinglesa — `Cases / Founder / Changelog / FAQ` viram `Projetos / Fundador / Atualizações / Dúvidas`. Visualmente, o nav PT vinha misturando português e jargão técnico em inglês.

### Changed
- **`lib/i18n/pt.ts`** — labels do nav PT traduzidos. Âncoras (`#cases`, `#founder`, etc) **não mudam** porque os IDs dos sections continuam neutros (mantém PT e EN apontando pros mesmos anchors).

### Notes
- Nav EN segue como estava (`Approach · Cases · Founder · Changelog · FAQ`) — palavras já em inglês, sem mudança.

---

## [rev-2.4.1] — 2026-05-23

Cards de Cases ganham tradução EN. Visualmente ficava estranho ter os 4 cards em PT no meio da home internacional.

### Added
- **`Dictionary['cases'].items[]`** ([lib/i18n/types.ts](lib/i18n/types.ts)) — array indexado por posição com `kind`, `title`, `desc`, `metric` traduzíveis. Campos neutros (num, client, href, internal, stack, logo) permanecem em [lib/constants.ts](lib/constants.ts).
- **`Dictionary['cases'].internalAria`** — aria-label específico do card interno ("sistema interno, sem link público" / "internal system, no public link"). Antes vinha hardcoded em PT no JSX.
- **Tradução EN dos 4 cases**: Gabriel Nabi (Pet Photography), Diskat Presentes (3D printing e-commerce), Diskat Ops (internal operations dashboard), Cali Garage (auto repair landing).

### Changed
- **`components/cases.tsx`** — função `localizeCase(c, item)` funde `CASES[i]` (constants) com `dict.cases.items[i]` (i18n). Mantém ordem e a chave `meta` (legado).

---

## [rev-2.4.0] — 2026-05-23

Suporte bilíngue PT/EN com rotas dedicadas (`/pt`, `/en`) para atrair interessados internacionais — investidor, cliente gringo, recruiter — sem perder SEO em PT.

### Added
- **`lib/i18n/`** — nova estrutura de dicionários tipados. `config.ts` (locales + defaults), `types.ts` (contrato `Dictionary`), `pt.ts`, `en.ts`, `index.ts` (loader `getDictionary(lang)`). PT segue como `DEFAULT_LOCALE`.
- **`app/[lang]/`** — segmento dinâmico vira o ROOT layout do App Router. `[lang]/layout.tsx` define `<html lang>` dinâmico (`pt-BR`/`en-US`), metadata com `alternates.languages` + `openGraph.locale`/`alternateLocale` por idioma. `[lang]/page.tsx` consome o dict server-side e propaga via props.
- **`middleware.ts`** — redireciona `/` → `/pt` (307). Detecta locale no path, bypass de `/api/*`, `/brand/*`, `/clients/*`, `/sitemap.xml`, `/robots.txt` e static assets.
- **`components/language-switch.tsx`** — toggle no nav (server-side `<Link>`, sem JS). Em `/pt` mostra "EN", em `/en` mostra "PT". Escondido em mobile (`md:inline-flex`) — voltará via menu mobile em rev-2.4.1 se necessário.
- **Tradução EN** — todo copy estático: Hero, Metrics labels/subs, Stack label, Services (4 itens × accessible/technical/bullets), Approach (3 pillars), Cases section header + labels live/internal, Manifesto, Changelog header, Founder eyebrow/title/sub/bio1/bio2/badge, FAQ (5 entradas Q&A), CTA, Ship tooltip, Footer, Nav status pill + CTA, 404. Hero `actually ships` permanece intencionalmente em inglês nos dois idiomas (wordplay de marca).
- **`app/sitemap.ts`** — agora inclui `/pt` (priority 1) e `/en` (priority 0.9), cada um com `alternates.languages` (`pt-BR`, `en-US`, `x-default=pt`) para `<xhtml:link rel="alternate" hreflang="…">` no XML.

### Changed
- **Todos os componentes consumidores de copy** — passaram a receber `dict: Dictionary` como prop server-side. Componentes afetados: `nav`, `hero`, `metrics`, `stack`, `services`, `service-card`, `approach`, `cases`, `manifesto`, `changelog`, `founder`, `faq`, `cta`, `ship`, `footer`. ServiceCard refatorado para receber `item` + `num` (string formatada) + `labels` (3 strings UI), removendo dependência de `Service.id` que não existia no dict.
- **`app/[lang]/not-found.tsx`** — substitui `app/not-found.tsx`. Copy traduzido para EN como default (visitor perdido pode estar em qualquer idioma; o 404 vive dentro do segment).
- **Constants que SOBRARAM em `lib/constants.ts`** (idioma-neutros): `SITE`, `LINKS`, `HEADER`, `THROUGHPUT` (chart), `METRICS` (valores + hrefs; labels/subs vêm do dict), `CLIENT_LOGOS`, `CASES` (mantido em PT por escolha de escopo — Cases não traduzidos nesta rev), `STACK_CHIPS`, `CHANGELOG`, `FOUNDER` (name/role/photo — bio veio pro dict), `AGENT` (Live Agent fica em PT inteiramente nesta rev).

### Notes
- **Escopo intencional do EN**: copy estático (Hero, Services, FAQ, Manifesto, CTA, etc). Cases (cards), Changelog (entradas históricas), Live Agent (UI + API `/api/diagnose`) ficam em PT — agendado para rev-2.5.x se necessário.
- **SEO duplo**: Google indexa `/pt` e `/en` separadamente via hreflang. OG card e meta description diferem por idioma. Link direto pra LinkedIn: `donadaolabs.com/en`.
- **`<html lang>` dinâmico**: o App Router exige que `<html>` esteja num root layout único. A solução foi mover `app/layout.tsx` → `app/[lang]/layout.tsx` (esse vira ROOT) e usar middleware pra redirecionar `/`. Não há mais `app/layout.tsx` na raiz.
- **Live Agent permanece em PT**: o `/api/diagnose` recebe pergunta em qualquer idioma e o Claude responde em PT. Ajuste por idioma exigiria parâmetro `lang` na API + system prompt bilíngue (fora do escopo desta rev).

---

## [rev-2.3.2] — 2026-05-23

Refresh editorial da faixa Metrics — remove valores aspiracionais/que vencem no calendário e amarra "Produtos no ar" à fonte de verdade (CASES).

### Added
- **`Metric.href?: string`** ([lib/constants.ts](lib/constants.ts)) — quando presente, o `MetricCard` é renderizado como `<a>` clicável com hover sutil (bg-white/2%). External link detectado automaticamente (target=_blank + rel=noreferrer).

### Changed
- **`Produtos no ar`** — não vive mais em `METRICS`. Agora é derivado dinamicamente de `CASES.length` em [components/metrics.tsx](components/metrics.tsx). Nunca drifta quando você adiciona/remove case. Eliminate o risco de "site diz 04 mas tem 5 cases listados".
- **`Em construção`** — sub `'paralelos · Q2/26'` → `'no laboratório'`. Tira a âncora trimestral (que vencia em julho) e casa com a brand "Donadão Labs".
- **`Próximo slot`** — value `'JUL'` → `'02'`, sub `'2 vagas · 2026'` → `'vagas abertas · agendar →'`. Card vira **clicável** para `https://cal.com/donadaolabs/diagnostico`. Atemporal (não vence no calendário) e vira micro-CTA.
- **`Uptime do portfólio · 99.9%`** → **`Zero quedas · 0 incidentes em 2026`**. Métrica era aspiracional (sem monitor real). Substituído por número verificável e fácil de defender. Se algo cair, troca pra `1` e atualiza o ano.

### Notes
- Total de cards mantido em 4. Layout grid 2x2 (mobile) / 4-col (desktop) inalterado.
- Animação count-up preservada quando `value` começa com número (`'04'`, `'03'`, `'02'`, `'0'` todos animam).

---

## [rev-2.3.1] — 2026-05-23

### Fixed
- **`components/live-agent.tsx`** — Click nos chips de exemplo (`↳ tenho um e-commerce…` etc) disparava o agent imediatamente via `void run(ex)` no `onClick`. Resultado: clique acidental queimava a cota do IP/clientId sem o visitante ter chance de revisar ou editar o texto. Fix: removida a chamada `run(ex)`; agora o click apenas `setInput(ex)` + foca o input via `inputRef.current?.focus()`. Visitante precisa clicar explicitamente em **RODAR DIAGNÓSTICO** para enviar.
- Adicionado `aria-label` descritivo nos chips deixando claro pra screen-readers que clicar apenas preenche, não envia.

---

## [rev-2.3.0] — 2026-05-21

Implementação do **Path A do audit do Diskat Ops** — resolve o card de case
que tinha `href="#"` (âncora vazia, affordance de clique falsa). Cases agora
suportam duas categorias visuais: público (verde, clicável) e interno (roxo,
sem link). A hierarquia roxo/verde estabelecida na rev-2.1.0 ganha um novo
sinal: **roxo = restrito/interno**, além do papel anterior de "capítulo do site".

### Added
- **`lib/constants.ts` — interface `Case`**: novo campo opcional `internal?: boolean` + tipo de `href` ampliado pra `string | null` (permite expressar "sistema interno, sem demo pública" no schema).

### Changed
- **`components/cases.tsx`**: `CaseCard` agora ramifica em duas variantes:
  - **Público (`internal !== true`)**: `<a href={c.href}>` com hover lift, selo `● live` verde no canto superior direito, kind label `${client}.app`, pill do número e métrica em verde. Inalterado em relação à rev-2.2.x.
  - **Interno (`internal === true`)**: `<article>` sem `href`, sem cursor pointer, sem hover lift. Selo `◆ interno` em roxo, kind label `${client} · interno` (sem `.app` que sugeria subdomínio público), pill do número e métrica em roxo. Borda do thumbnail vira roxa sutil no hover.
- **Diskat Ops entry**: `href: '#'` → `href: null` + `internal: true`. `desc` reescrito conforme audit: "Sistema interno do cliente — sem demo pública, mas o resultado fala. Painel enxuto pra acompanhar vendas, estoque e performance, sem cair no excesso de uma ERP cara."

### Notes
- **Path B do audit** (página de case completa em `app/cases/diskat-ops/page.tsx` com header, contexto, solução, screenshots anonimizadas, resultado e CTA) fica como rev separada — requer screenshots reais do cliente (com dados anonimizados, princípio LGPD) que ainda não foram fornecidas.
- A11y: `aria-label` no `<article>` interno explicita "sistema interno, sem link público" pra screen readers.

---

## [rev-2.2.1] — 2026-05-20

Atualização das entries do `Changelog` público (componente do site) — mantém honrada a promessa "lab vivo" agora que o subtítulo foi neutralizado na rev-2.2.0. Data mais recente passa a ser de ontem (2026-05-19), não mais 10 dias atrás.

### Changed
- **`lib/constants.ts` — array `CHANGELOG`**: substituídas as 2 entries mais antigas (`2026-04-15 shipped: Gabriel Nabi · agenda integrada com Stripe` e `2026-04-03 rfc: RFC interno · padronização de observabilidade pra agents em produção`) por 2 novas baseadas em fatos reais dessa semana:
  - `2026-05-19 shipped: Redesign UI · service cards com flip 3D + hierarquia visual roxo/verde estabelecida.`
  - `2026-05-19 infra: Email do estúdio migrado pro domínio próprio — lead@donadaolabs.com via Resend + catch-all.`

### Fixed
- **`components/live-agent.tsx`** — LiveAgent vazava da viewport em mobile. 3 causas:
  - `AgentOutput` usava `grid-cols-[130px_1fr]` com label fixa de 130px e value `1fr` sem `min-width: 0`, forçando a coluna a crescer com textos longos (diagnostico do Anthropic) e empurrando o container além da viewport em devices <400px. Fix: mobile empilha (`grid-cols-1`), desktop usa `sm:grid-cols-[110px_minmax(0,1fr)]` (o `minmax(0,...)` força min-width zero), values ganham `min-w-0 break-words`.
  - Inputs `flex-1` em forms (prompt input + email gate) sem `min-w-0` — flex padrão é `min-width: auto`, então um button de texto longo ao lado forçava o input a empurrar o container. Fix: adicionado `min-w-0` em ambos os inputs.
  - Container raiz sem `overflow-hidden` defensivo. Fix: adicionado pra cortar qualquer overflow residual ao border-radius.

### Notes
- Total de entries do `Changelog` público mantido em 5 (limite visual da seção `Changelog` no site).
- Tags usadas: `shipped` (2x), `infra` (2x), `agent` (1x) — distribuição balanceada do tipo de atividade do lab.

---

## [rev-2.2.0] — 2026-05-19

UI cleanup P2 — corte de redundância textual e refinamento do tom em pontos-chave. Página passa de 12 para 11 seções no flow principal.

### Removed
- **`components/plain-portuguese.tsx`** — seção entre Hero e Metrics que dizia "A gente faz o site, o sistema ou a automação que seu negócio precisa. Você fala o problema..." Era duplicação quase ipsis litteris do `HERO.sub`. Deletado o componente, o import em [app/page.tsx](app/page.tsx) e a constant `PLAIN_PORTUGUESE` em [lib/constants.ts](lib/constants.ts).
- Removida a transição visual (gradient `from-charcoal to-ink`) que existia entre Hero e Metrics via PlainPortuguese — agora Metrics começa direto após Hero com seu próprio `bg-charcoal`.

### Changed
- **`components/changelog.tsx`** — subtítulo "Lab vivo · atualizado toda semana." → **"Registro público das releases. Sem maquiagem."** A versão antiga prometia cadência semanal que não está sendo cumprida (última entry em 2026-05-09, hoje 2026-05-19). A nova é neutra, honesta, e alinhada ao tom "sem promessa furada" do resto do site.
- **`components/approach.tsx`** — sub da seção "Três passos. Sem teatro." reescrito: "A maioria das soluções AI hoje é demo de tech ou apresentação bonita. Aqui você compra entrega que sobe em produção e gera receita." → **"Quase tudo em AI hoje para no slide ou no demo bonito. Aqui o software vai pro ar e fatura — e poucos entregam isso."** Substituições principais: "demo de tech ou apresentação bonita" (sinônimos quase redundantes) → "slide ou demo bonito" (mais ritmo, contraste mais nítido); "código sobe em produção" (jargão técnico) → "software vai pro ar" (linguagem que cliente leigo entende, ressonância com "site no ar"); adicionado o sinal de raridade "e poucos entregam isso" que reforça o contraste implícito.

### Notes
- Nova ordem de seções: `Hero → Metrics → Stack → Services → Approach → Cases → Manifesto → Changelog → Founder → Faq → Cta`.
- Primeira dobra agora vai direto do Hero pra Metrics — sem texto-ponte duplicando a mensagem.

---

## [rev-2.1.1] — 2026-05-19

UI cleanup P1 — Metrics minimalista e correção do "buraco preto" do Hero em viewports wide.

### Changed
- **`components/metrics.tsx`** — sparklines removidas, número de `48px → 36px`, sub-text agora baseline-aligned na mesma linha do número. Removido o prefixo `01 ·  02 ·` do label (numeração duplicada). Padding `p-7 → px-6 py-5`. Count-up animation preservada. Vira uma "stat strip" mais minimalista, sem competir visualmente com Hero e Services.
- **`components/hero.tsx`** — container externo `max-w-[1280px] → max-w-[960px]` com `mx-auto`. Em viewports `> 1400px` o conteúdo ficava encostado à esquerda (efeito "buraco preto" no lado direito após a remoção do ThroughputChart no rev-2.1.0). Agora o bloco fica centralizado com margens iguais em ambos os lados; LiveAgent acompanha o mesmo container.

### Notes
- Hero sub-text testado mais curto durante o desenvolvimento e revertido — versão longa lê melhor que punch line de 1 linha (decisão do founder).
- Bullets dos services já estavam limitados a 3 nos constants — esse item do P1 já estava atendido pelo rev-2.1.0.

---

## [rev-2.1.0] — 2026-05-19

UI cleanup P0 — primeira dobra com foco único, service cards com flip 3D drill-down, e nova hierarquia visual roxo/verde que separa títulos de seção (capítulos do site) de passos de implementação.

### Added
- **`components/service-card.tsx`** — client component novo, encapsula um service com **flip 3D** (CSS `perspective: 1200px` + `transform-style: preserve-3d` + `backface-visibility: hidden`). Click na frente vira pro back (técnico), click no back volta. Transição 700ms com `cubic-bezier(0.4, 0, 0.2, 1)`; respeita `prefers-reduced-motion` (cai pra 200ms). Botões reais nos dois lados (acessibilidade via teclado + screen reader, `aria-expanded`).
- **Cor `purple`** no Tailwind (`#7B6BFF` DEFAULT, `#6E5BFF` deep) — extraída do "olho" central do logo, agora disponível como `text-purple`, `border-purple`, `bg-purple` etc.
- **Shadow `card-hover-purple`** no Tailwind (`0 0 0 1px #7B6BFF, 0 16px 48px rgba(123, 107, 255, 0.22)`) — variação roxa do `card-hover` existente, pra hover dos service cards.

### Changed
- **`components/hero.tsx`** — removido `ThroughputChart` (estava competindo com a headline pela atenção na primeira dobra). Layout migrou de grid 2-col (`lg:grid-cols-[1.5fr_1fr]`) para single-column `max-w-[820px]`. LiveAgent permanece embaixo full-width. Foco único agora: a promessa + entrada do agente.
- **`components/services.tsx`** — grid passou de `md:grid-cols-2` para `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`. Markup do card extraído pro novo `service-card.tsx`. Padding original (`p-7` por card) e bloco técnico inline foram embora — vivem agora no back do card.
- **`components/section-header.tsx`** — pill do idx (01-06) trocou `bg-accent` (verde) → `bg-purple`. Sinaliza visualmente "isto é uma seção do site" e diferencia dos números de PILLARS (verde, dentro de `Approach`) que sinalizam "isto é um passo da implementação".

### Removed (do front dos cards)
- `techLabel` ("Apps from scratch · Legacy rescue", "CRM · SaaS interno", etc) — era jargão técnico no canto superior direito. Agora só aparece no back.
- Bloco `// téc.` hachurado inline. Agora vive no back e só é revelado ao clicar.

### Visual hierarchy
- 🟣 **Roxo `#7B6BFF`**: títulos de seção (SectionHeader 01-06), seleção/hover dos service cards, "olho" do logo
- 🟢 **Verde `#00F57A`**: passos de implementação (PILLARS), estado default de cards e bullets, accent geral
- Hover em service card vira tudo roxo (pill, ticks ✓, stripe top, borda, sombra)

### Notes
- Cards desktop ficaram `aspect-square` (4 cards de 280×280px em viewport lg). Em mobile a altura volta a auto (`sm:aspect-square` apenas em ≥640px).
- Build do preview: `Ready` em 39s, sem regressão de Lighthouse perceptível.

---

## [rev-2.0.1] — 2026-05-14

Logo identity refresh — replaced the rev-2.0 placeholder (3 ascending green bars) with a founder-approved hexagonal circuit-board mark featuring DL letterforms embedded as PCB traces, central purple "processor" eye, and corner I/O terminals. Phosphor-green palette preserved, purple accents tie back to rev-1.x heritage.

### Added
- `public/brand/logo-mark.png` + 4 sized variants (128/64/32/512px) — PNG backups for og:image, Slack/email previews, and any context where SVG filters don't render.

### Changed
- **`public/brand/logo-mark.svg`** — vector mark recomposed from an AI-generated reference image. Generated by separating green and purple channels of the founder's reference PNG (Python/Pillow with hue masks), vectorizing each channel via potrace, and merging back into a single SVG with the original `transform="translate(0,672) scale(0.1,-0.1)"` coordinate space. Sharp vector (no SVG filter) — clean at any size from 16px favicon to 320px hero.
- **`public/brand/favicon.svg`** — same vector content as `logo-mark.svg`, kept under the favicon filename so `app/layout.tsx` icons metadata doesn't need to change.
- **`components/logo-mark.tsx`** — switched from inline SVG component to `<img src="/brand/logo-mark.svg">`. Native `<img>` is used (not `next/image`) because Next.js image optimization rasterizes SVGs and would destroy potential filter effects.
- **Mark size bumped** — `LogoMark` default 28 → 50px, footer instance 18 → 32px. The new mark is detail-rich and was reading too small at the rev-2.0 default sizes.

### Fixed
- Earlier iteration shipped `logo-mark.svg` with a `feGaussianBlur` glow filter for CRT phosphor effect. The blur was relative to viewBox, so at 28-50px display sizes the filter dominated the rendered output and the mark looked smudged. Filter removed for production; the sharp vector renders crisply everywhere. (A future hero-scale context could re-introduce glow via CSS `drop-shadow` as an opt-in.)

---

## [rev-2.0] — 2026-05-14

Major redesign — "Dataviz" direction from Claude Design handoff bundle. Palette pivot purple → green phosphor, live AI agent in hero, six new sections (PlainPortuguese, Metrics, Throughput chart, Changelog, FAQ, Process), editorial founder photo, and a real backend for the diagnose agent (Anthropic Haiku + Upstash rate-limit + Telegram push + Resend email + Z-API WhatsApp).

### Added
- **Live AI agent in hero** (`components/live-agent.tsx`) — POST to `/api/diagnose`, structured response (DIAGNÓSTICO / SOLUÇÃO / STACK / PRAZO / PRÓXIMO PASSO), localStorage clientId persistence, email-gate after first ask, hard blocks for daily cap and rate-limit, graceful "agent offline" fallback when backend isn't deployed.
- **`/api/diagnose` route** (`app/api/diagnose/route.ts`) — Next.js App Router serverless function: cap diário 100/dia, rate-limit 10s/IP, email-gate per clientId, Anthropic Haiku 4.5 call, WhatsApp notification via Z-API, fallback in-memory store when Upstash creds are missing.
- **`.env.example`** with the 6 vars needed for the agent backend (Anthropic, Upstash REST, Z-API instance/token/client-token, founder WhatsApp number).
- **Hero throughput chart** (`components/throughput-chart.tsx`) — 7-day animated bar chart with grid background, live pulse, headline number + delta.
- **PlainPortuguese section** (`components/plain-portuguese.tsx`) — bridge block between technical headline and non-technical audience.
- **Metrics row** (`components/metrics.tsx`) — 4 cards with count-up animation + sparklines (Produtos no ar · Em construção · Próximo slot · Uptime).
- **Changelog section** (`components/changelog.tsx`) — public 5-entry timeline (`shipped` / `agent` / `infra` / `rfc` / `hotfix` tags).
- **FAQ accordion** (`components/faq.tsx`) — 5 entries, first one open by default.
- **Ship tooltip** (`components/ship.tsx`) — dotted underline + asterisk on the word "ship*" in hero and final CTA, popover explains the english term in plain portuguese.
- **Editorial founder photo** at `public/founder.jpg` (replaces "VD" monogram square in the founder section); new `● founder · ao vivo` pulse badge on the 240×280 frame.
- **Logo mark** (`components/logo-mark.tsx`, `public/brand/logo-mark.svg`) — 3 ascending bars (metáfora de "ships") in green gradient, used in nav and footer.
- **Shared primitives**: `components/sparkline.tsx`, `components/case-mark.tsx`, `components/section-header.tsx`.
- **Status pill in nav** — `live · operando · 2 slots jul/26` with pulsing accent dot.

### Changed
- **Palette pivot** — accent moved from electric purple (`#6e5bff`/`#4b3dd9`) to green phosphor (`#00F57A`/`#056B30`). Background bumped from `#0e0e10` → `#070709` (ink). All gradients, shadows, glows and CSS tokens migrated.
- **`tailwind.config.ts`** — new color scale (ink, charcoal, surface, accent.{DEFAULT,bright,deep,darker}), removed purple gradients, added `gradient-green`, `gradient-green-text`, `gradient-mesh`, `bg-grid-faint`, new shadows (`glow-cursor` for the headline cursor), and 3 keyframes (`dl-pulse`, `dl-blink`, `dl-tick`).
- **`globals.css`** — CSS custom properties rewritten as `--ddl-accent`/`--ddl-accent-deep` (green), surface/border tokens follow the dataviz theme, plus utilities `.dl-cursor` (blinking cursor with glow), `.dl-dots`, `.text-pretty`, `.bg-grid-faint`.
- **Hero** — two-column layout (headline left, sticky throughput chart right). Headline keeps "AI software that *actually ships*" but the gradient italic span now uses green and ends with a blinking cursor with halo. Subhead reads as plain-portuguese, no jargon.
- **Services cards** — dual-track layout: human copy (large) + `// téc.` dashed block (smaller, muted) + 3 check-bullets. Replaces the toggle-card pattern from rev-1.x (`components/service-card.tsx` removed).
- **Approach → Process** — kept 3 cards but added `Dia 0–3 / 3–21 / 21+` time badges and gradient-green numeric tile.
- **Cases** — full redesign: each card has a 180px thumbnail with grid background, `client.app` kind label, pulsing `● live` indicator, centered logo lockup (real PNG with `brightness-0 invert` filter), metric + 8-point sparkline footer, and a stack pills row below.
- **Manifesto** — gained attribution line (`— Vinicius Donadão · Founder`) and a `◆ princípio` mono eyebrow; green radial glow replaces purple.
- **Stack** — switched from centered chip cloud to left-aligned "Stack em produção" label + pills row.
- **Founder** — `Computer Scientist · Founder` role (dropped `· Industrial Systems` qualifier — the industrial automation note now lives in the bio); photo replaces the "VD" monogram tile; bio mentions "três em construção" alongside "quatro produtos no ar".
- **CTA** — "Pronto para ship?" gains the same Ship tooltip as the hero.
- **Nav** — green `/` separator in wordmark (`donadão/labs`), new logo mark, hidden status pill on mobile (visible md+), green gradient CTA button.
- **Footer** — collapsed from 4-column grid to a single-line build banner (`© 2026 donadão/labs · donadaolabs.com` · `build · 2026.05.13 · live`) — links live in the sectioned page itself.
- **`app/page.tsx`** — section order redone to match the dataviz mockup: Hero → PlainPortuguese → Metrics → Stack → Services → Approach → Cases → Manifesto → Changelog → Founder → FAQ → CTA → Footer.
- **`lib/constants.ts`** — extended with `HEADER`, `THROUGHPUT`, `METRICS`, `CHANGELOG`, `FAQ`, `PLAIN_PORTUGUESE`, `SHIP_TOOLTIP`, `AGENT`; `Case` interface expanded with `kind`, `metric`, `href`, `logo` (shape/display/style). New nav links for `#changelog` and `#faq`.
- **`app/layout.tsx`** — body bg now `bg-ink`; Organization JSON-LD logo path updated to `/brand/logo-mark.svg`.
- **Founder bio** — `· Industrial Systems` removed from role per dataviz design; "background em automação industrial crítica" already captured in bio1.

### Fixed
- **Favicon** — old purple-D-on-purple-square SVG replaced with the same 3-bar mark on `#070709` so the favicon matches the live brand.

---

## [rev-1.3] — 2026-05-10

Polish & truth pass: factual case corrections, clickable client logos with Vercel subdomains, accessibility audit (Lighthouse 100 on a11y).

### Added
- Clickable client logos in trust wall: Gabriel Nabi, Diskat Presentes, Cali Garage open in new tab. Diskat Ops (internal CRM) intentionally not linked.
- `ClientLogo` interface gained optional `url?: string` field for per-client links.
- Vercel subdomains wired: `gabrielnabi.donadaolabs.com` → Gabriel Nabi project; `caligarage.donadaolabs.com` → Cali Garage project. Diskat Presentes uses external domain `diskatpresentes.com.br`.

### Changed

### Fixed
- Case 01 (Gabriel Nabi) and Case 02 (Diskat Presentes) reframed in HERO/Cases section: Case 01 is a full photographer landing page with payment integration (not "payment platform"); Case 02 sells products manufactured by 3D printing (not "3D visualization e-commerce"). Three.js removed from Case 02 stack pills.
- Accessibility (Lighthouse mobile 94 → ~100): color-contrast on `text-stone-500` mono labels (3.66:1 below AA 4.5) bumped to `text-stone-400`; footer column labels switched from `<h4>` to `<p>` to fix heading-order skip (h2 → h4); removed conflicting `aria-label` on ServiceCard buttons so accessible name matches visible content.

---

## [rev-1.2] — 2026-05-10

Observability, SEO & polish: analytics wired, sitemap + robots + JSON-LD, custom 404, HSTS preload submitted.

### Added
- Vercel Web Analytics + Speed Insights (free tier, page views + Core Web Vitals tracking)
- `app/robots.ts` — Next.js native robots.txt route (allow all, disallow /api/)
- `app/sitemap.ts` — Next.js native sitemap.xml route (single URL, priority 1)
- Schema.org Organization JSON-LD markup in `<head>` (founder, sameAs, knowsAbout)
- Custom 404 page (`app/not-found.tsx`) — brand-aligned with mesh + glow + CTA back to home
- HSTS preload submission to hstspreload.org (status: pending, 6-12 weeks until baked into Chromium)

### Changed
- `donadaolabs.md` (parent context dir) updated with Case 04 Cali Garage, accessible hero copy, manifesto attribution note (founder ref outside repo)

---

## [rev-1.1] — 2026-05-10

Quality, accessibility and authenticity pass: real client logos, dual-state services for non-tech audiences, dynamic OG image, security headers, mobile fix.

### Added
- HSTS header (`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`) to force HTTPS in browsers that have visited at least once
- Security headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- Immutable cache headers for `/brand/*` and `/clients/*` static assets (`max-age=31536000`)
- `next.config.mjs`: `poweredByHeader: false`, `compress: true`, `reactStrictMode: true`
- Dynamic Open Graph image route at `/api/og` (next/og, edge runtime, 1200×630 PNG)
- Inter Tight static TTFs (600 + 800) in `public/fonts/`, extracted from Google Fonts variable font
- Twitter Card metadata wired with `summary_large_image` referencing `/api/og`
- Dual-state Services cards: accessible PT default (visible to all) + technical detail revealed on hover (desktop) or tap (mobile). Hover-capability detection via `matchMedia` prevents iOS hover-sticky bug.
- New `components/service-card.tsx` client component with cross-fade transition between accessible and technical copy.
- Real client logos in trust wall: Gabriel Nabi, Diskat Presentes, Diskat Ops, Cali Garage (PNG with transparent background, processed via rembg + Python thresholding to integrate with dark theme)
- Optional `maxWidth` field in `ClientLogo` interface for per-logo width tuning (Diskat Ops 320px due to 5.71:1 aspect ratio)

### Changed
- Removed "Donadão Labs Manifesto" attribution from the manifesto section (visual front-end only — file/constant names retained for code clarity)
- Hero subline rewritten in accessible PT (target: non-technical audiences). Tagline `AI software that actually ships.` retained as brand signature.
- Services section title (`Tudo o que seu negócio precisa. Em um único lugar.`) and subline rewritten to remove jargon.
- `Service` interface refactored to carry both accessible and technical title/body pairs.
- Trust wall layout reworked: 4-column grid on desktop with per-cell width sizing and extra padding around the center pair (Diskat Ops) for visual balance across logos with very different aspect ratios.
- Replaced 4 typographic SVG placeholders with real client PNG logos.

### Fixed
- Mobile horizontal overflow caused by CTA section glow leaking beyond viewport (`<section id="contact">` was missing `overflow-hidden`). Defensive `overflow-x: hidden` also applied to `html`.

---

## [rev-1.0] — 2026-05-08

First public release of donadaolabs.com.

### Added
- Next.js 14 (App Router) scaffold with TypeScript and Tailwind
- Brand integration: Donadão Labs tokens (dark-first, electric purple accent)
- Inter Tight + Inter + JetBrains Mono via `next/font/google`
- Single-page landing with 9 sections:
  - Nav (sticky, backdrop-blur)
  - Hero (`AI software that actually ships.` + 4-client trust wall)
  - Services (Build · Systems · Automate · Infra)
  - Approach (Diagnose · Build · Automate)
  - Cases (Gabriel Nabi · Diskat Presentes · Diskat Ops · Cali Garage)
  - Manifesto (`Software não é arte. É infraestrutura de receita.`)
  - Founder (Vinicius Donadão bio + LinkedIn / GitHub / Instagram)
  - Stack pills (Next.js · TypeScript · Postgres · Stripe · OpenAI · Anthropic · Vercel · Cloudflare)
  - CTA (`Pronto para ship?` → cal.com/donadaolabs/diagnostico)
  - Footer
- SEO + Open Graph metadata
- 4 client logo placeholders (SVG, to be replaced by real logos in next revision)
- Vercel production deploy with auto-deploy on push to `main`
- Custom domain `donadaolabs.com` + `www` with HTTPS (Let's Encrypt via Vercel)

### Tech notes
- Build: 13.4 kB page, 101 kB First Load JS, 4 static pages
- Quality gates: `npm run lint`, `npm run typecheck`, `npm run build` all passing
- Repo: https://github.com/vindonadao/donadaolabs-website (public)

### Story
- `docs/stories/1.1.landing-v1.story.md` (Done)

[Unreleased]: https://github.com/vindonadao/donadaolabs-website/compare/rev-2.3.2...HEAD
[rev-2.3.2]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-2.3.2
[rev-2.3.1]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-2.3.1
[rev-2.3.0]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-2.3.0
[rev-2.2.1]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-2.2.1
[rev-2.2.0]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-2.2.0
[rev-2.1.1]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-2.1.1
[rev-2.1.0]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-2.1.0
[rev-2.0.1]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-2.0.1
[rev-2.0]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-2.0
[rev-1.3]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-1.3
[rev-1.2]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-1.2
[rev-1.1]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-1.1
[rev-1.0]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-1.0
