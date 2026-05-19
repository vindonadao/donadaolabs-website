import { SectionHeader } from '@/components/section-header';
import { PILLARS } from '@/lib/constants';

export function Approach(): React.ReactElement {
  return (
    <section className="mt-6 border-t border-white/[0.08]">
      <SectionHeader
        idx="02"
        eyebrow="Como trabalhamos"
        title="Três passos. Sem teatro."
        sub="Quase tudo em AI hoje para no slide ou no demo bonito. Aqui o software vai pro ar e fatura — e poucos entregam isso."
      />
      <div className="grid grid-cols-1 gap-4 px-6 pb-4 md:grid-cols-3 md:px-10">
        {PILLARS.map((p) => (
          <article
            key={p.num}
            className="group relative rounded-brand-lg border border-white/[0.08] bg-charcoal p-7 transition-all duration-200 hover:border-accent hover:shadow-card-hover"
          >
            <div className="mb-6 flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-gradient-green font-mono text-lg font-bold text-black">
                {p.num}
              </div>
              <span className="font-mono text-[11px] text-accent">{p.day}</span>
            </div>
            <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-offwhite/55">
              {p.label}
            </div>
            <h3 className="m-0 font-display text-[22px] font-semibold tracking-brand-tight">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-offwhite/55">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
