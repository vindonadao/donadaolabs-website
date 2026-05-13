import { Ship } from '@/components/ship';
import { CTA_FINAL, LINKS, SITE } from '@/lib/constants';

export function Cta(): React.ReactElement {
  return (
    <section
      id="contact"
      className="relative isolate mt-6 overflow-hidden border-t border-white/[0.08] px-6 py-28 text-center md:px-10"
      style={{
        background:
          'radial-gradient(circle at 50% 100%, rgba(0, 245, 122, 0.14) 0%, transparent 60%)',
      }}
    >
      <div className="mx-auto max-w-[1280px]">
        <h2 className="m-0 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-[1] tracking-tightest text-pretty">
          {CTA_FINAL.headline}{' '}
          <Ship>
            <span className="italic gradient-text">{CTA_FINAL.headlineEm}</span>
          </Ship>
        </h2>
        <p className="mx-auto mt-5.5 max-w-[560px] text-[18px] text-offwhite/55">
          {CTA_FINAL.sub}
        </p>
        <a
          href={LINKS.cal}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-block rounded-[8px] bg-gradient-green px-6 py-3.5 text-[15px] font-semibold text-black shadow-glow transition-all duration-200 hover:-translate-y-1 hover:shadow-glow-strong"
        >
          {CTA_FINAL.button} →
        </a>
        <div className="mt-4.5 font-mono text-[11px] text-offwhite/55">
          ou{' '}
          <a href={`mailto:${SITE.email}`} className="text-offwhite/55 underline-offset-2 hover:underline">
            {SITE.email}
          </a>
        </div>
      </div>
    </section>
  );
}
