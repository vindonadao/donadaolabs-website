import { SectionHeader } from '@/components/section-header';
import { ServiceCard } from '@/components/service-card';
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
      <div className="grid grid-cols-1 gap-4 px-6 pb-4 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {SERVICES.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </section>
  );
}
