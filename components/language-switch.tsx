import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface LanguageSwitchProps {
  lang: Locale;
  /** Texto do botão (vem do dict do idioma OPOSTO ao atual). Ex: em /pt mostra "EN". */
  label: string;
}

/**
 * Toggle PT/EN posicionado no nav. Link server-side (sem JS), preserva o domínio
 * e troca apenas o segmento de locale. Não preserva hash anchor por enquanto —
 * voltar pra topo após troca é o comportamento esperado pra um site one-pager.
 */
export function LanguageSwitch({ lang, label }: LanguageSwitchProps): React.ReactElement {
  const target: Locale = lang === 'pt' ? 'en' : 'pt';
  return (
    <Link
      href={`/${target}`}
      aria-label={`Switch language to ${target.toUpperCase()}`}
      className="hidden items-center gap-1 rounded-[6px] border border-white/[0.08] px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-offwhite/55 transition-colors duration-200 hover:border-accent/60 hover:text-accent md:inline-flex"
    >
      {label}
    </Link>
  );
}
