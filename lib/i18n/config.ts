/**
 * i18n config — locales suportados e default.
 * `pt` é canônico: URL raiz `/` redireciona pra `/pt`, SEO histórico preservado.
 * `en` é a aba pra interessados internacionais (investidor, cliente gringo).
 */

export const LOCALES = ['pt', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'pt';

/** HTML lang attribute por locale (BCP-47). */
export const HTML_LANG: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en-US',
};

/** OpenGraph locale por idioma (formato `xx_XX`). */
export const OG_LOCALE: Record<Locale, string> = {
  pt: 'pt_BR',
  en: 'en_US',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
