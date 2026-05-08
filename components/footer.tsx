import { LINKS, NAV_LINKS, SITE } from '@/lib/constants';

export function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-800 bg-ink pb-8 pt-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-2 font-display text-2xl font-extrabold tracking-tightest">
              {SITE.name}
            </div>
            <p className="text-sm text-stone-300">{SITE.tagline}</p>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-stone-500">
              Site
            </h4>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mb-2 block text-sm text-stone-300 transition-colors hover:text-accent-bright"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-stone-500">
              Contato
            </h4>
            <a
              href={`mailto:${SITE.email}`}
              className="mb-2 block text-sm text-stone-300 transition-colors hover:text-accent-bright"
            >
              {SITE.email}
            </a>
            <a
              href={LINKS.cal}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 block text-sm text-stone-300 transition-colors hover:text-accent-bright"
            >
              Agendar diagnóstico
            </a>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-stone-500">
              Founder
            </h4>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 block text-sm text-stone-300 transition-colors hover:text-accent-bright"
            >
              LinkedIn
            </a>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 block text-sm text-stone-300 transition-colors hover:text-accent-bright"
            >
              GitHub
            </a>
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 block text-sm text-stone-300 transition-colors hover:text-accent-bright"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-stone-900 pt-8 font-mono text-xs tracking-brand-wide text-stone-500 md:flex-row">
          <span>© {currentYear} {SITE.name} · Todos os direitos reservados.</span>
          <span>donadaolabs.com</span>
        </div>
      </div>
    </footer>
  );
}
