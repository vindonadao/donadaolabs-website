import { PLAIN_PORTUGUESE } from '@/lib/constants';

export function PlainPortuguese(): React.ReactElement {
  return (
    <section className="border-b border-white/[0.08] bg-gradient-to-b from-charcoal to-ink px-6 py-8 md:px-10">
      <div className="mx-auto grid w-full max-w-[1280px] items-start gap-8 md:grid-cols-[200px_1fr]">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
          <span className="block h-px w-3 bg-accent" />
          {PLAIN_PORTUGUESE.eyebrow}
        </div>
        <p className="m-0 max-w-[920px] text-pretty text-[18px] leading-[1.5] text-offwhite md:text-[22px]">
          {PLAIN_PORTUGUESE.body}{' '}
          <span className="text-offwhite/55">{PLAIN_PORTUGUESE.bodyMuted}</span>
        </p>
      </div>
    </section>
  );
}
