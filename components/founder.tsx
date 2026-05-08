import { FOUNDER, LINKS } from '@/lib/constants';

export function Founder(): React.ReactElement {
  return (
    <section id="founder" className="relative py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <span className="mb-4 inline-block rounded border border-accent/30 bg-accent/[0.14] px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent-bright">
          04 · Quem opera
        </span>
        <h2 className="mb-4 max-w-[24ch] font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-brand-tight text-balance">
          Pessoa por trás <em className="not-italic text-accent-bright">do código.</em>
        </h2>
        <p className="mb-12 max-w-[60ch] text-xl text-stone-300">
          Sem agência intermediária. Você fala direto com quem constrói.
        </p>

        <div className="relative isolate overflow-hidden rounded-brand-xl border border-stone-800 bg-stone-900 p-12">
          <div
            className="absolute right-0 top-0 -z-10 h-[400px] w-[400px] opacity-40 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(110, 91, 255, 0.45) 0%, transparent 70%)',
            }}
          />
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[280px_1fr] md:gap-16">
            <div className="relative flex h-[240px] w-[240px] items-center justify-center rounded-brand-xl border border-accent-deep bg-gradient-to-br from-ink via-accent-darker/40 to-ink shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_60px_rgba(110,91,255,0.45)]">
              <span className="font-display text-[6rem] font-extrabold tracking-tightest gradient-text">
                VD
              </span>
            </div>

            <div>
              <h3 className="mb-2 font-display text-4xl font-bold tracking-brand-tight md:text-5xl">
                {FOUNDER.name}
              </h3>
              <p className="mb-8 font-mono text-sm tracking-brand-wide text-accent-bright">
                {FOUNDER.role}
              </p>
              <p className="mb-4 max-w-[56ch] text-base leading-[1.65] text-stone-300">
                {FOUNDER.bio1}
              </p>
              <p className="mb-6 max-w-[56ch] text-base leading-[1.65] text-stone-300">
                {FOUNDER.bio2}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-brand-md border border-stone-700 bg-stone-800 px-4 py-2 font-mono text-sm text-stone-300 transition-all hover:border-accent hover:bg-accent/[0.14] hover:text-offwhite"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-brand-md border border-stone-700 bg-stone-800 px-4 py-2 font-mono text-sm text-stone-300 transition-all hover:border-accent hover:bg-accent/[0.14] hover:text-offwhite"
                >
                  GitHub ↗
                </a>
                <a
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-brand-md border border-stone-700 bg-stone-800 px-4 py-2 font-mono text-sm text-stone-300 transition-all hover:border-accent hover:bg-accent/[0.14] hover:text-offwhite"
                >
                  Instagram ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
