import { MANIFESTO } from '@/lib/constants';

export function Manifesto(): React.ReactElement {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-32">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(110, 91, 255, 0.18) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(75, 61, 217, 0.12) 0%, transparent 50%)',
        }}
      />
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <blockquote className="mx-auto max-w-[22ch] text-center font-display text-[clamp(2rem,6vw,5rem)] font-bold leading-[1.05] tracking-tightest text-balance">
          {MANIFESTO.quote}
          <br />
          <em className="not-italic gradient-text">{MANIFESTO.quoteEm}</em>
        </blockquote>
      </div>
    </section>
  );
}
