import { LiveAgent } from '@/components/live-agent';
import { Ship } from '@/components/ship';
import { HERO } from '@/lib/constants';

export function Hero(): React.ReactElement {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/[0.08] pb-16 pt-[120px] md:pb-20 md:pt-[140px]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 70% 20%, rgba(0, 245, 122, 0.14) 0%, transparent 40%)',
        }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <div className="max-w-[820px]">
          <div className="mb-6 font-mono text-[11px] uppercase tracking-widest text-accent">
            {HERO.badge}
          </div>
          <h1 className="m-0 font-display text-[clamp(2.75rem,8vw,5.125rem)] font-semibold leading-[0.98] tracking-tightest text-pretty">
            {HERO.headline}
            <br />
            that{' '}
            <Ship>
              <span className="italic gradient-text">{HERO.headlineEm}</span>
            </Ship>
            <span className="dl-cursor" />
          </h1>
          <p className="mt-7 max-w-[600px] text-[19px] leading-[1.5] text-offwhite/55">
            {HERO.sub}
          </p>
        </div>

        <div className="mt-14 max-w-[880px]">
          <LiveAgent />
        </div>
      </div>
    </section>
  );
}
