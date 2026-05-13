# Donadão Labs — Website

Landing page do [donadaolabs.com](https://donadaolabs.com). Next.js 14 (App Router) + TypeScript + Tailwind. Deploy contínuo no Vercel.

## Stack

- **Next.js 14** (App Router, Edge + Node runtimes)
- **TypeScript** estrito (`npm run typecheck`)
- **Tailwind CSS** com tokens custom (verde phosphor + ink)
- **Anthropic Claude Haiku 4.5** pro agent de diagnóstico no hero
- **Upstash Redis** pra rate-limit + cap diário + email gate
- **Z-API** pra notificação WhatsApp em cada interação
- Vercel Analytics + Speed Insights

## Quickstart (dev)

```bash
# 1. Instalar deps
npm install

# 2. Configurar env (opcional — sem isso o agent retorna "AI provider error")
cp .env.example .env.local
# Edita .env.local com as chaves reais

# 3. Rodar
npm run dev
# Abre http://localhost:3000
```

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Dev server (HMR) em `localhost:3000` |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Estrutura

```
app/
  api/diagnose/route.ts    ← agent backend (Anthropic + Upstash + Z-API)
  api/og/                  ← Open Graph image generator
  page.tsx                 ← composição da landing
  layout.tsx               ← fonts + metadata + JSON-LD
  globals.css              ← tokens CSS

components/
  hero.tsx                 ← headline + throughput chart + live agent
  live-agent.tsx           ← componente client com fluxo de captura
  ship.tsx                 ← tooltip do termo "ship*"
  metrics.tsx              ← 4 cards com count-up + sparklines
  services.tsx, approach.tsx, cases.tsx, manifesto.tsx,
  changelog.tsx, founder.tsx, faq.tsx, cta.tsx, nav.tsx, footer.tsx
  …

lib/
  constants.ts             ← TODA copy, números, links e textos do agent

public/
  founder.jpg              ← foto editorial
  brand/                   ← logo mark + favicon (SVG, gradient verde)
  clients/                 ← logos dos 4 clientes
```

## Editando conteúdo

Quase tudo (textos, métricas, cases, FAQ, changelog, copy do agent, links) vive em [lib/constants.ts](lib/constants.ts). Trocar um valor lá, salvar, recarregar — sem precisar abrir componente.

## Deploy do agent em produção

Veja [README-DEPLOY.md](README-DEPLOY.md) — passo-a-passo das 3 contas (Anthropic, Upstash, Z-API), config local, deploy no Vercel, custo estimado, troubleshooting.

## Changelog

Veja [CHANGELOG.md](CHANGELOG.md). Versionamento por revisão (`rev-X.Y`).

## Owner

Vinicius Donadão · [contato@donadaolabs.com](mailto:contato@donadaolabs.com) · [LinkedIn](https://linkedin.com/in/viniciusdonadao) · [GitHub](https://github.com/vindonadao)
