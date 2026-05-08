# DevOps Handoff — Story 1.1 (Landing v1)

**From:** @aiox-master (Orion)
**To:** @devops (Gage)
**Story:** 1.1 — Landing v1 (donadaolabs.com)
**Status:** Deployed to Vercel — pending DNS cutover
**Date:** 2026-05-08

---

## What's done

- [x] Next.js 14 (App Router) scaffold
- [x] Brand integration (tokens.css, Tailwind config, fonts via next/font)
- [x] All 9 sections built and rendering
- [x] Quality gates: lint, typecheck, build all passing
- [x] Local git repo initialized by `create-next-app`
- [x] **GitHub remote live:** https://github.com/vindonadao/donadaolabs-website (public)
- [x] **Vercel project linked + deployed to production** (2026-05-08)
- [x] **GitHub auto-deploy connected** — every push to `main` triggers a Vercel build
- [x] **Custom domains added to Vercel project** (`donadaolabs.com` + `www.donadaolabs.com`) — pending DNS

---

## Vercel deploy summary

| Field | Value |
|---|---|
| Vercel scope | `vindonadaos-projects` |
| Project | `donadaolabs-website` |
| Project URL (dashboard) | https://vercel.com/vindonadaos-projects/donadaolabs-website |
| Production deploy URL | https://donadaolabs-website.vercel.app |
| Deployment ID | `dpl_CnsgiBdXfJBkNNPhmNqiZSR6bPQ2` |
| Inspector URL | https://vercel.com/vindonadaos-projects/donadaolabs-website/CnsgiBdXfJBkNNPhmNqiZSR6bPQ2 |
| Build time | ~49s |
| Build region | Washington, D.C. (iad1) |
| Build machine | 2 cores, 8 GB |
| Status | READY (HTTP 200, 67.8 KB rendered) |
| GitHub integration | Connected (`vindonadao/donadaolabs-website`) |

Validation:
```
$ curl -sI https://donadaolabs-website.vercel.app
HTTP 200 · 67883 bytes · 0.99s
```

---

## DNS cutover — ACTION REQUIRED by founder

**Important correction from earlier assumption:** The domain's nameservers are currently pointing at **`registrar-servers.com`** (Namecheap), NOT Cloudflare. The DNS records below must be added wherever DNS is currently managed for `donadaolabs.com`.

If the founder wants to keep DNS at the current Namecheap nameservers, add these records there. If he wants to migrate to Cloudflare DNS, he should first move the domain there and then add the records.

### Records to add (Vercel-provided)

```
# Apex (donadaolabs.com)
Type:  A
Host:  @
Value: 76.76.21.21
TTL:   Auto / 300

# www subdomain
Type:  A
Host:  www
Value: 76.76.21.21
TTL:   Auto / 300
```

> Vercel reported the apex requires `A 76.76.21.21` for both `donadaolabs.com` and `www.donadaolabs.com`. (Vercel auto-handles SSL via Let's Encrypt once DNS resolves.)
>
> Alternative path Vercel offered: change nameservers to `ns1.vercel-dns.com` / `ns2.vercel-dns.com` to delegate DNS entirely to Vercel. Either approach works.

### Cloudflare-specific note (only if domain is migrated there)

If/when DNS is moved to Cloudflare:
- Set the apex `A` record to **DNS only (gray cloud)** initially — Vercel handles SSL.
- After cert is provisioned and confirmed working, the founder can switch to **proxied (orange cloud)** if desired — but this may briefly break SSL handshake during cutover.

---

## Post-DNS validation checklist

After DNS is updated and propagated (5min – 48h depending on provider):

- [ ] `https://donadaolabs.com` resolves and renders
- [ ] `https://www.donadaolabs.com` redirects to apex (or vice-versa — Vercel handles this automatically)
- [ ] SSL active (Let's Encrypt via Vercel)
- [ ] All Cal.com CTAs open `https://cal.com/donadaolabs/diagnostico` in new tab
- [ ] Mobile responsive on iPhone + Android
- [ ] Run Lighthouse on production URL (target: Performance ≥ 90)

To re-check Vercel domain status after DNS update:
```bash
cd "~/Desktop/Donadao Labs Branding/03-website-next"
vercel domains ls
vercel domains inspect donadaolabs.com
```

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

— Gage, deploy entregue. Aguardando DNS para encerrar v1.
