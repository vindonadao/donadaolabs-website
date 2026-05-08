import { CTA_FINAL, LINKS } from '@/lib/constants';

export function Cta(): React.ReactElement {
  return (
    <section id="contact" className="relative isolate py-32 text-center">
      <div
        className="absolute left-1/2 top-1/2 -z-10 h-[800px] w-[1200px] -translate-x-1/2 -translate-y-1/2 opacity-40 blur-2xl"
        style={{
          background:
            'radial-gradient(ellipse, rgba(110, 91, 255, 0.45) 0%, transparent 60%)',
        }}
      />
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <h2 className="mb-8 font-display text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-tightest text-balance">
          {CTA_FINAL.headline}
          <br />
          para <em className="not-italic gradient-text">{CTA_FINAL.headlineEm}</em>
        </h2>
        <p className="mx-auto mb-12 max-w-[50ch] text-xl text-stone-300">{CTA_FINAL.sub}</p>
        <a
          href={LINKS.cal}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-brand-md bg-gradient-purple px-8 py-4 font-display text-base font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-glow-strong"
        >
          {CTA_FINAL.button} <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
