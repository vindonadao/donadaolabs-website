// A Content-Security-Policy agora vive em `middleware.ts` (CSP estrita com nonce
// + 'strict-dynamic', enforce — rev-2.9.0). Foi removida daqui a versão loose
// (com 'unsafe-inline') que rodava em Report-Only — substituída pela estrita.
// Este arquivo mantém os demais headers de segurança (HSTS, X-Frame-Options,
// X-Content-Type-Options, Referrer-Policy, Permissions-Policy).

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
