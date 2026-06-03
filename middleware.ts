import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALES } from '@/lib/i18n/config';

const PUBLIC_FILE = /\.[^/]+$/;

/**
 * CSP estrita com nonce + 'strict-dynamic' (rev-2.9.0).
 *
 * 'strict-dynamic': um script confiável (com nonce) propaga confiança aos
 * scripts que ELE carregar — cobre o `gtag/js` baixado pelo bootstrap do GA
 * sem precisar listar domínio. `https:` é fallback p/ browsers sem suporte a
 * strict-dynamic (ignorado pelos que suportam).
 *
 * style-src ainda usa 'unsafe-inline' (estilos inline do Next/fonts).
 */
function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https:`,
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
}

// TAREFA 4 (após validar Report-Only sem violação de recurso próprio): trocar
// este nome p/ 'Content-Security-Policy' (enforce). O header da REQUEST abaixo
// permanece 'Content-Security-Policy' — é dele que o Next 14 extrai o nonce p/
// injetar nos próprios <script>; esse header é interno e nunca chega ao browser.
const RESPONSE_CSP_HEADER = 'Content-Security-Policy-Report-Only';

export function middleware(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;

  // Rotas que não renderizam HTML com nossos scripts → sem nonce/CSP.
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/brand') ||
    pathname.startsWith('/clients') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname === '/founder.jpg' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return undefined;
  }

  // Sem locale → redirect pro idioma padrão (é só um redirect, não precisa nonce).
  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }

  // Página com locale → gera nonce por request.
  const nonce = btoa(crypto.randomUUID());
  const csp = buildCsp(nonce);

  // REQUEST: nonce em x-nonce (lido pelo layout) + CSP no nome de ENFORCE
  // ('Content-Security-Policy') — é assim que o Next 14 acha o nonce e o aplica
  // aos próprios <script>. Header interno; não vai pro browser.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  // RESPONSE: CSP em Report-Only → o browser só REPORTA violações (não bloqueia).
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set(RESPONSE_CSP_HEADER, csp);
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|brand|clients|.*\\..*).*)'],
};
