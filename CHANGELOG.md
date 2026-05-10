# Changelog

All notable changes to the Donadão Labs landing page will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses revision-based versioning (`rev-X.Y`).

## [Unreleased]

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

[Unreleased]: https://github.com/vindonadao/donadaolabs-website/compare/rev-1.2...HEAD
[rev-1.2]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-1.2
[rev-1.1]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-1.1
[rev-1.0]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-1.0
