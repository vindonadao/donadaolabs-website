import { LiveAgent } from '@/components/live-agent';
import { Ship } from '@/components/ship';
import { TrackedCalLink } from '@/components/tracked-cal-link';
import { LINKS } from '@/lib/constants';
import type { Dictionary, Locale } from '@/lib/i18n';

interface HeroProps {
  dict: Dictionary;
  lang: Locale;
}

export function Hero({ dict, lang }: HeroProps): React.ReactElement {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/[0.08] pb-16 pt-[120px] md:pb-20 md:pt-[140px]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 70% 20%, rgba(0, 245, 122, 0.14) 0%, transparent 40%)',
        }}
      />

      <div className="mx-auto w-full max-w-[960px] px-6 md:px-10">
        <div>
          <div className="mb-6 font-mono text-[11px] uppercase tracking-widest text-accent">
            {dict.hero.badge}
          </div>
          <h1 className="m-0 font-display text-[clamp(2.75rem,8vw,5.125rem)] font-semibold leading-[0.98] tracking-tightest text-pretty">
            {dict.hero.headline}
            <br />
            {dict.hero.headlineConnector}{' '}
            <Ship dict={dict}>
              <span className="italic gradient-text">{dict.hero.headlineEm}</span>
            </Ship>
            <span className="dl-cursor" />
          </h1>
          <p className="mt-7 max-w-[640px] text-[19px] leading-[1.5] text-offwhite/55">
            {dict.hero.sub}
          </p>
        </div>

        <div className="mt-14">
          <LiveAgent dict={dict} lang={lang} />
          {/* Fallback SSR: caminho de conversão sobrevive mesmo se o JS do agente falhar. */}
          <div className="mt-3.5 font-mono text-[12px] text-offwhite/40">
            <TrackedCalLink
              href={LINKS.cal}
              location="hero_fallback"
              className="underline-offset-2 transition-colors hover:text-accent hover:underline"
            >
              {dict.hero.scheduleCta} →
            </TrackedCalLink>
          </div>
        </div>
      </div>
    </section>
  );
}
