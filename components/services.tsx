import { SERVICES } from '@/lib/constants';

export function Services(): React.ReactElement {
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <span className="mb-4 inline-block rounded border border-accent/30 bg-accent/[0.14] px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent-bright">
          01 · O que entregamos
        </span>
        <h2 className="mb-4 max-w-[24ch] font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-brand-tight text-balance">
          Quatro frentes. <em className="not-italic text-accent-bright">Um operador.</em>
        </h2>
        <p className="mb-12 max-w-[60ch] text-xl text-stone-300">
          Build, systems, AI agents e infra. Pacote completo — não um pedaço só do problema.
        </p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, idx) => (
            <article
              key={service.id}
              className="group relative isolate overflow-hidden rounded-brand-lg border border-stone-800 bg-stone-900 p-8 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-card-hover"
            >
              <span className="mb-6 block font-mono text-xs uppercase tracking-widest text-stone-500">
                0{idx + 1}
              </span>
              <h3 className="mb-3 font-display text-2xl font-bold tracking-brand-tight">
                {service.title}
              </h3>
              <p className="text-base leading-[1.6] text-stone-300">{service.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
