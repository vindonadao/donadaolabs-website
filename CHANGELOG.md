# Changelog

All notable changes to the Donadão Labs landing page will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses revision-based versioning (`rev-X.Y`).

## [Unreleased]

### Added

### Changed

### Fixed

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

[Unreleased]: https://github.com/vindonadao/donadaolabs-website/compare/rev-2.0...HEAD
[rev-2.0]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-2.0
[rev-1.3]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-1.3
[rev-1.2]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-1.2
[rev-1.1]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-1.1
[rev-1.0]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-1.0
