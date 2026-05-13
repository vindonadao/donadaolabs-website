import { SectionHeader } from '@/components/section-header';
import { SERVICES } from '@/lib/constants';

export function Services(): React.ReactElement {
  return (
    <section id="abordagem">
      <SectionHeader
        idx="01"
        eyebrow="O que entregamos"
        title="Tudo o que seu negócio precisa em um único lugar."
        sub="Do site simples ao sistema completo, com automação e tudo no ar. Você não precisa contratar mais ninguém."
      />
      <div className="grid grid-cols-1 gap-4 px-6 pb-4 md:grid-cols-2 md:px-10">
        {SERVICES.map((s) => (
          <article
            key={s.id}
            className="group relative overflow-hidden rounded-brand-lg border border-white/[0.08] bg-charcoal p-7 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-card-hover"
          >
            {/* Top accent stripe */}
            <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-green opacity-60" />

            <div className="mb-5 flex items-start justify-between gap-3">
              <span className="rounded-[4px] bg-accent px-2 py-[3px] font-mono text-[11px] text-black">
                {s.num}
              </span>
              <span className="text-right font-mono text-[10px] uppercase tracking-widest text-offwhite/55">
                {s.techLabel}
              </span>
            </div>

            <h3 className="m-0 font-display text-[28px] font-semibold tracking-brand-tight">
              {s.accessibleTitle}
            </h3>
            <p className="my-3.5 text-pretty text-[15px] leading-relaxed text-offwhite">
              {s.accessibleBody}
            </p>

            {/* Technical block */}
            <div className="mb-5 flex items-start gap-2 rounded-[8px] border border-dashed border-white/[0.08] bg-ink px-3 py-2.5">
              <span className="mt-0.5 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
                {'//'} téc.
              </span>
              <span className="text-[13px] leading-relaxed text-offwhite/55">
                {s.technicalBody}
              </span>
            </div>

            <ul className="flex flex-col gap-2">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-[13px] text-offwhite">
                  <span className="grid h-4 w-4 place-items-center rounded-[4px] bg-accent/[0.14] text-[10px] font-bold text-accent">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
