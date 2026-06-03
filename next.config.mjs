// Content-Security-Policy em modo Report-Only: NÃO bloqueia nada, apenas
// registra violações no console do navegador. Adaptada ao stack real do site:
//   - Google Analytics 4 (googletagmanager + google-analytics)
//   - Vercel Analytics / Speed Insights (vercel-insights + vercel-scripts)
//   - iframe do brand book PDF (frame-src 'self', mesma origem)
//   - form do agente de diagnóstico (form-action 'self' → /api/diagnose)
// 'unsafe-inline' em script/style é necessário enquanto não há nonce no GA/Next.
// Após ~1 semana sem violações legítimas, trocar a chave para
// 'Content-Security-Policy' (enforce).
const ContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.vercel-insights.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://region1.google-analytics.com https://*.vercel-insights.com",
  "frame-src 'self'",
  "worker-src 'self' blob:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  // A página do brand book agora é localizada em /[lang]/brand. A URL curta
  // /brand (sem locale) redireciona para o idioma padrão — espelha o
  // comportamento de `/` → `/pt`. Os assets /brand/*.* (PDF, og.png, logos)
  // têm extensão e não são capturados por este redirect (match exato de /brand).
  async redirects() {
    return [
      {
        source: '/brand',
        destination: '/pt/brand',
        permanent: false,
      },
    ];
  },

  // /brand/latest.pdf é uma URL estável que aponta sempre para a revisão
  // canônica atual do brand book. Ao publicar uma nova revisão, troque apenas
  // o destino aqui (ex.: brand-book-rev-0.3.pdf) — a URL pública não muda.
  async rewrites() {
    return [
      {
        source: '/brand/latest.pdf',
        destination: '/brand/brand-book-rev-0.2.pdf',
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // SAMEORIGIN (não DENY) para permitir o preview do brand book em
            // <iframe src="/brand/latest.pdf"> na rota /brand. Continua
            // bloqueando embeds de terceiros (proteção contra clickjacking).
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy-Report-Only',
            value: ContentSecurityPolicy,
          },
        ],
      },
      {
        source: '/brand/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/clients/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
