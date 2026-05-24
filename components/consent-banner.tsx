'use client';

import { useEffect, useState } from 'react';
import { isGAEnabled, setConsent } from '@/lib/gtag';
import type { Dictionary } from '@/lib/i18n';

const STORAGE_KEY = 'dl_consent_v1';

interface ConsentBannerProps {
  dict: Dictionary;
}

/**
 * Banner LGPD: bottom-left, dismissible, persiste decisão em localStorage.
 *
 * Estados possíveis em `localStorage[dl_consent_v1]`:
 *   - `null` (nunca decidiu) → banner aparece
 *   - `'granted'` → banner some, consent atualizado pra granted no mount
 *   - `'denied'` → banner some, mantém default denied do Consent Mode v2
 *
 * Não renderiza se GA não está configurado (sem ID) — não tem o que pedir.
 */
export function ConsentBanner({ dict }: ConsentBannerProps): React.ReactElement | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isGAEnabled()) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === null) {
        setVisible(true);
      } else if (stored === 'granted') {
        setConsent(true);
      }
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  const decide = (granted: boolean) => (): void => {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? 'granted' : 'denied');
    } catch {
      /* localStorage unavailable */
    }
    setConsent(granted);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-50 max-w-md rounded-brand-lg border border-white/[0.08] bg-charcoal p-4 text-sm shadow-[0_16px_40px_rgba(0,0,0,0.5)] md:right-auto"
    >
      <p className="m-0 mb-3 leading-relaxed text-offwhite/85">{dict.consent.message}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={decide(true)}
          className="rounded-[6px] bg-accent px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.06em] text-black transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow"
        >
          {dict.consent.accept}
        </button>
        <button
          type="button"
          onClick={decide(false)}
          className="rounded-[6px] border border-white/[0.08] px-3 py-1.5 font-mono text-xs text-offwhite/55 transition-colors duration-200 hover:border-white/20 hover:text-offwhite"
        >
          {dict.consent.reject}
        </button>
      </div>
    </div>
  );
}
