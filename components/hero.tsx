import Image from 'next/image';
import { CLIENT_LOGOS, HERO, LINKS } from '@/lib/constants';

export function Hero(): React.ReactElement {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden pb-32 pt-36">
      {/* Mesh background */}
      <div className="pointer-events-none absolute inset-x-0 -top-1/2 -z-20 h-[150%] bg-gradient-mesh" />

      {/* Central glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[-20%] -z-10 h-[1600px] w-[1600px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(110, 91, 255, 0.45) 0%, transparent 60%)',
        }}
      />

      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(110, 91, 255, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(110, 91, 255, 0.06) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 60% 80% at 50% 30%, black 0%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 80% at 50% 30%, black 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-8">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-accent/40 bg-accent/[0.12] px-4 py-2 font-mono text-xs font-medium uppercase tracking-widest text-accent-bright">
          <span className="h-2 w-2 animate-brand-pulse rounded-full bg-accent shadow-[0_0_16px_rgba(110,91,255,0.7)]" />
          {HERO.badge}
        </div>

        {/* Headline */}
        <h1 className="mb-8 max-w-[16ch] font-display text-[clamp(3rem,9vw,7rem)] font-extrabold leading-[0.95] tracking-tightest text-balance">
          {HERO.headline}
          <br />
          that <em className="not-italic gradient-text">{HERO.headlineEm}</em>
        </h1>

        {/* Sub */}
        <p className="mb-10 max-w-[60ch] text-lg leading-[1.55] text-stone-300 md:text-xl">
          {HERO.sub}
        </p>

        {/* CTAs */}
        <div className="mb-16 flex flex-wrap gap-3">
          <a
            href={LINKS.cal}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-brand-md bg-gradient-purple px-8 py-4 font-display text-base font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-glow-strong"
          >
            {HERO.ctaPrimary} <span aria-hidden>→</span>
          </a>
          <a
            href="#cases"
            className="rounded-brand-md border border-stone-700 px-8 py-4 font-display text-base font-medium text-offwhite transition-all hover:border-accent hover:bg-accent/[0.14]"
          >
            {HERO.ctaSecondary}
          </a>
        </div>

        {/* Trust wall */}
        <div className="border-t border-stone-800 pt-8">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-stone-500">
            Construído para
          </p>
          <div className="grid grid-cols-2 items-center gap-x-10 gap-y-6 sm:grid-cols-4 md:gap-x-16">
            {CLIENT_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-start opacity-70 transition-opacity hover:opacity-100"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={180}
                  height={40}
                  className="h-10 w-auto max-w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
