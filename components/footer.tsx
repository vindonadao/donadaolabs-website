import Link from 'next/link';
import { LogoMark } from '@/components/logo-mark';
import { LAB_GAMES } from '@/lib/constants';
import type { Dictionary, Locale } from '@/lib/i18n';

interface FooterProps {
  dict: Dictionary;
  lang: Locale;
}

export function Footer({ dict, lang }: FooterProps): React.ReactElement {
  return (
    <footer className="flex flex-col gap-3 border-t border-white/[0.08] px-6 py-8 font-mono text-[11px] text-offwhite/55 md:flex-row md:items-center md:justify-between md:px-10">
      <div className="flex items-center gap-2.5">
        <LogoMark size={32} />
        <span>{dict.footer.rights}</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="flex items-center gap-2">
          <span className="text-offwhite/40">{dict.footer.games}:</span>
          {LAB_GAMES.map((g) => (
            <a
              key={g.href}
              href={g.href}
              target="_blank"
              rel="noopener"
              className="underline-offset-2 transition-colors hover:text-offwhite hover:underline"
            >
              {g.name}
            </a>
          ))}
        </span>
        <Link
          href={`/${lang}/privacidade`}
          className="underline-offset-2 transition-colors hover:text-offwhite hover:underline"
        >
          {dict.footer.privacy}
        </Link>
        <span>{dict.footer.build}</span>
      </div>
    </footer>
  );
}
