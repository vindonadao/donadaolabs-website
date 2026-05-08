# DevOps Handoff — Story 1.1 (Landing v1)

**From:** @aiox-master (Orion)
**To:** @devops (Gage)
**Story:** 1.1 — Landing v1 (donadaolabs.com)
**Status:** Ready for deploy
**Date:** 2026-05-07

---

## What's done

- ✅ Next.js 14 (App Router) scaffold
- ✅ Brand integration (tokens.css, Tailwind config, fonts via next/font)
- ✅ All 9 sections built and rendering
- ✅ Quality gates: lint, typecheck, build all passing
- ✅ Local git repo initialized by `create-next-app`

## What @devops needs to do (not done — outside agent authority)

### 1. GitHub remote
```bash
cd "~/Desktop/Donadao Labs Branding/03-website-next"
gh repo create donadaolabs/website --private --source=. --remote=origin --push
# OR for personal account:
gh repo create viniciusdonadao/donadaolabs-website --private --source=. --remote=origin --push
```

### 2. Vercel deploy
```bash
# From the project root:
npx vercel link
npx vercel --prod

# OR via web UI:
# https://vercel.com/new → import the repo → deploy (no env vars needed for v1)
```

Vercel auto-detects Next.js 14, no manual config needed.

### 3. Cloudflare DNS
Domain: `donadaolabs.com` (already registered per founder confirmation)

```
# A records (Vercel apex)
@   A   76.76.21.21

# CNAME (www)
www CNAME cname.vercel-dns.com.
```

Add `donadaolabs.com` and `www.donadaolabs.com` in Vercel dashboard → Domains.

### 4. Post-deploy validation

- [ ] `https://donadaolabs.com` resolves and renders
- [ ] `https://www.donadaolabs.com` redirects to apex (or vice-versa)
- [ ] SSL active (Let's Encrypt via Vercel)
- [ ] All Cal.com CTAs open `https://cal.com/donadaolabs/diagnostico` in new tab
- [ ] Mobile responsive on iPhone + Android
- [ ] Run Lighthouse on production URL (target: Performance ≥ 90)

### 5. Quality gates pre-push (Constitution: Quality First)

```bash
cd "~/Desktop/Donadao Labs Branding/03-website-next"
npm run lint && npm run typecheck && npm run build
```

All three must pass. Already validated locally — should reproduce.

---

## Outstanding items (post-launch backlog)

These are NOT blockers for v1 launch. Backlog stories (1.2 → 1.8) listed in `docs/stories/1.1.landing-v1.story.md` under "Out of Scope".

Priority order recommendation:
1. **1.6** Custom OG image (Vercel OG generator) — visibilidade em LinkedIn/X
2. **1.3** Analytics (Plausible/Umami) — tracking conversões Cal.com
3. **1.8** Trocar logos PNG/placeholder por SVG real dos clientes
4. **1.7** Atualizar `07-contexto/donadaolabs.md` com Case 04 (Cali Garage)
5. **1.2** Form de contato real (Resend) — só se Cal.com não for suficiente
6. **1.4** Blog / case studies aprofundados

---

## Local dev commands

```bash
cd "~/Desktop/Donadao Labs Branding/03-website-next"

npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve production build
npm run lint         # ESLint (Next config)
npm run typecheck    # TypeScript noEmit check
```

---

## Files reference

```
03-website-next/
├── app/
│   ├── globals.css       # tokens + base reset + utilities
│   ├── layout.tsx        # SEO + fonts + metadata
│   └── page.tsx          # composes all sections
├── components/           # 10 PascalCase'd in code, kebab-case files
│   ├── nav.tsx
│   ├── hero.tsx
│   ├── services.tsx
│   ├── approach.tsx
│   ├── cases.tsx
│   ├── manifesto.tsx
│   ├── founder.tsx
│   ├── stack.tsx
│   ├── cta.tsx
│   └── footer.tsx
├── lib/
│   └── constants.ts      # all copy, URLs, structured data
├── public/
│   ├── brand/            # 5 SVGs (favicon, monogram, wordmark)
│   └── clients/          # 4 SVG placeholders
├── docs/
│   ├── stories/1.1.landing-v1.story.md
│   └── devops-handoff.md (this file)
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

— Orion, orquestrando o sistema 🎯
