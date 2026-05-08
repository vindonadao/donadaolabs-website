# Changelog

All notable changes to the Donadão Labs landing page will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses revision-based versioning (`rev-X.Y`).

## [Unreleased]

### Added
- HSTS header (`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`) to force HTTPS in browsers that have visited at least once
- Security headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- Immutable cache headers for `/brand/*` and `/clients/*` static assets (`max-age=31536000`)
- `next.config.mjs`: `poweredByHeader: false`, `compress: true`, `reactStrictMode: true`
- Dynamic Open Graph image route at `/api/og` (next/og, edge runtime, 1200×630 PNG)
- Inter Tight static TTFs (600 + 800) in `public/fonts/`, extracted from Google Fonts variable font
- Twitter Card metadata wired with `summary_large_image` referencing `/api/og`

### Changed
- Removed "Donadão Labs Manifesto" attribution from the manifesto section (visual front-end only — file/constant names retained for code clarity)

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

[Unreleased]: https://github.com/vindonadao/donadaolabs-website/compare/rev-1.0...HEAD
[rev-1.0]: https://github.com/vindonadao/donadaolabs-website/releases/tag/rev-1.0
