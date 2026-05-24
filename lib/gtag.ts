/**
 * Google Analytics 4 — wiring com Consent Mode v2.
 *
 * COMO LIGAR:
 *   1. Cria uma propriedade GA4 em analytics.google.com (conta donadaolabs@gmail.com)
 *   2. Pega o Measurement ID (G-XXXXXXXXXX) na Admin → Data Streams → Web
 *   3. Adiciona NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX em:
 *      - .env.local (dev)
 *      - Vercel env vars (production + preview)
 *   4. Redeploy
 *
 * Sem o env var, `isGAEnabled()` retorna `false` e o <GoogleAnalytics> não
 * injeta nada — zero impacto em performance até o ID estar lá.
 *
 * CONSENT MODE V2 (LGPD):
 *   Default = todos denied. ConsentBanner pede aceite, persiste em
 *   localStorage. Sem aceite, GA4 envia "pings" cookieless agregados
 *   (modelagem de comportamento sem identificação individual).
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

export function isGAEnabled(): boolean {
  return GA_MEASUREMENT_ID.startsWith('G-');
}

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Track pageview. Chamado automaticamente pelo PageviewTracker em rota change. */
export function pageview(url: string): void {
  if (!isGAEnabled() || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', { page_path: url });
}

/** Track custom event. Use pra conversões e interações relevantes. */
export function event(name: string, params: Record<string, unknown> = {}): void {
  if (!isGAEnabled() || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}

/** Atualiza consent (Consent Mode v2). Granted libera cookies + remarketing. */
export function setConsent(granted: boolean): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  const state = granted ? 'granted' : 'denied';
  window.gtag('consent', 'update', {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  });
}
