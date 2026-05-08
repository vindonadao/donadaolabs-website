import Image from 'next/image';
import Link from 'next/link';
import { LINKS, NAV_LINKS, SITE } from '@/lib/constants';

export function Nav(): React.ReactElement {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-stone-900 bg-charcoal/65 backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/monogram-dd-accent.svg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          <span className="font-display text-base font-bold tracking-brand-tight">{SITE.name}</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-300 transition-colors hover:text-offwhite"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={LINKS.cal}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-brand-md bg-gradient-purple px-5 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-glow-strong"
        >
          Agendar diagnóstico
        </a>
      </div>
    </nav>
  );
}
