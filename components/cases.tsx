import { CASES } from '@/lib/constants';

export function Cases(): React.ReactElement {
  return (
    <section id="cases" className="relative py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <span className="mb-4 inline-block rounded border border-accent/30 bg-accent/[0.14] px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent-bright">
          03 · Cases · 2025-2026
        </span>
        <h2 className="mb-4 max-w-[24ch] font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-brand-tight text-balance">
          Quatro produtos <em className="not-italic text-accent-bright">rodando.</em>
        </h2>
        <p className="mb-12 max-w-[60ch] text-xl text-stone-300">
          Sem mockup, sem mockumentary. Software real, no ar, gerando venda.
        </p>

        <div className="grid grid-cols-1 gap-3">
          {CASES.map((caseItem) => (
            <article
              key={caseItem.num}
              className="group grid grid-cols-1 items-center gap-6 rounded-brand-lg border border-stone-800 bg-stone-900 p-8 transition-all hover:translate-x-1 hover:border-accent hover:shadow-card-hover md:grid-cols-[80px_1fr_auto] md:gap-8 md:p-10"
            >
              <div className="font-display text-5xl font-extrabold leading-none tracking-tightest gradient-text md:text-[3rem]">
                {caseItem.num}
              </div>
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-stone-500">
                  {caseItem.client} · {caseItem.meta}
                </p>
                <h3 className="mb-2 font-display text-2xl font-semibold tracking-brand-tight">
                  {caseItem.title}
                </h3>
                <p className="text-base leading-[1.55] text-stone-300">{caseItem.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2 md:flex-col md:items-end">
                {caseItem.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-stone-700 bg-stone-800 px-3 py-1 font-mono text-xs text-stone-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
