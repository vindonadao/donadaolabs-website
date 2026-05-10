import { ServiceCard } from '@/components/service-card';
import { SERVICES } from '@/lib/constants';

export function Services(): React.ReactElement {
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <span className="mb-4 inline-block rounded border border-accent/30 bg-accent/[0.14] px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent-bright">
          01 · O que entregamos
        </span>
        <h2 className="mb-4 max-w-[26ch] font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-brand-tight text-balance">
          Tudo o que seu negócio precisa.{' '}
          <em className="not-italic text-accent-bright">Em um único lugar.</em>
        </h2>
        <p className="mb-12 max-w-[64ch] text-xl text-stone-300">
          Do site simples ao sistema completo, com automação e tudo no ar. Você não precisa
          contratar mais ninguém.
          <span className="mt-2 block text-base text-stone-400">
            Toque em cada card para ver o detalhe técnico.
          </span>
        </p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
