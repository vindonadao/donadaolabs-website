import { MANIFESTO } from '@/lib/constants';

export function Manifesto(): React.ReactElement {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/[0.08] py-24 text-center md:py-[100px]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(0, 245, 122, 0.14) 0%, transparent 50%)',
        }}
      />
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-6 font-mono text-[11px] uppercase tracking-widest text-accent">
          ◆ princípio
        </div>
        <p className="m-0 max-w-[1100px] text-pretty font-display text-[clamp(2rem,6vw,4rem)] font-semibold leading-[1.05] tracking-brand-tight md:mx-auto">
          {MANIFESTO.quote}{' '}
          <span className="italic gradient-text">{MANIFESTO.quoteEm}</span>
        </p>
        <div className="mt-7 font-mono text-xs text-offwhite/55">— {MANIFESTO.attribution}</div>
      </div>
    </section>
  );
}
