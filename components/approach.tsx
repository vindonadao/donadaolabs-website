import { PILLARS } from '@/lib/constants';

export function Approach(): React.ReactElement {
  return (
    <section id="approach" className="relative py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <span className="mb-4 inline-block rounded border border-accent/30 bg-accent/[0.14] px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent-bright">
          02 · Como trabalhamos
        </span>
        <h2 className="mb-4 max-w-[24ch] font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-brand-tight text-balance">
          Três passos. <em className="not-italic text-accent-bright">Sem teatro.</em>
        </h2>
        <p className="mb-12 max-w-[60ch] text-xl text-stone-300">
          A maioria das soluções AI hoje é demonstração de tech ou apresentação bonita. Aqui você
          compra entrega que sobe em produção e gera receita.
        </p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.num}
              className="group relative isolate overflow-hidden rounded-brand-lg border border-stone-800 bg-stone-900 p-10 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-card-hover"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/[0.08] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-6 inline-block font-mono text-3xl font-extrabold tracking-brand-tight gradient-text">
                {pillar.num}
              </div>
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-stone-500">
                {pillar.label}
              </p>
              <h3 className="mb-4 font-display text-2xl font-bold tracking-brand-tight">
                {pillar.title}
              </h3>
              <p className="text-base leading-[1.6] text-stone-300">{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
