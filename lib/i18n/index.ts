/**
 * Public surface do i18n. Componentes importam `getDictionary(lang)` server-side.
 * Mantém Dictionary tipo-fonte-da-verdade; PT e EN são literais (sem fetch async).
 */

import { en } from './en';
import { pt } from './pt';
import type { Locale } from './config';
import type { Dictionary } from './types';

const DICTIONARIES: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(lang: Locale): Dictionary {
  return DICTIONARIES[lang];
}

export type { Dictionary } from './types';
export {
  DEFAULT_LOCALE,
  HTML_LANG,
  LOCALES,
  OG_LOCALE,
  isLocale,
  type Locale,
} from './config';
