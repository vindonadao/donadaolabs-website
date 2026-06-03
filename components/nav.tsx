import Link from 'next/link';
import { LanguageSwitch } from '@/components/language-switch';
import { LogoMark } from '@/components/logo-mark';
import { TrackedCalLink } from '@/components/tracked-cal-link';
import { LINKS, SITE } from '@/lib/constants';
import type { Dictionary, Locale } from '@/lib/i18n';

interface NavProps {
  dict: Dictionary;
  lang: Locale;
}

export function Nav({ dict, lang }: NavProps): React.ReactElement {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-3.5 md:px-10">
        <div className="flex items-center gap-7">
          <Link href={`/${lang}`} className="flex items-center gap-2.5" aria-label={SITE.name}>
            <LogoMark />
            <span className="font-display text-base font-semibold tracking-brand-normal">
              donadão<span className="text-accent">/</span>labs
            </span>
          </Link>
          <div className="hidden items-center gap-5 md:flex">
            {dict.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-[13px] text-offwhite/55 transition-colors hover:text-offwhite"
              >
                {link.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-200 group-hover:w-full"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[11px] text-offwhite/55 md:flex">
            <span
              className="h-1.5 w-1.5 animate-dl-pulse rounded-full bg-accent"
              style={{ boxShadow: '0 0 8px #00F57A' }}
            />
            {dict.nav.statusPill}
          </div>
          <LanguageSwitch lang={lang} label={dict.nav.langSwitchLabel} />
          <TrackedCalLink
            href={LINKS.cal}
            location="nav"
            className="rounded-[6px] bg-gradient-green px-3.5 py-2 text-[13px] font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow"
          >
            {dict.nav.ctaButton}
          </TrackedCalLink>
        </div>
      </div>
    </nav>
  );
}
