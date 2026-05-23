import { SectionHeader } from '@/components/section-header';
import { ServiceCard } from '@/components/service-card';
import type { Dictionary } from '@/lib/i18n';

interface ServicesProps {
  dict: Dictionary;
}

export function Services({ dict }: ServicesProps): React.ReactElement {
  return (
    <section id="abordagem">
      <SectionHeader
        idx="01"
        eyebrow={dict.services.eyebrow}
        title={dict.services.title}
        sub={dict.services.sub}
      />
      <div className="grid grid-cols-1 gap-4 px-6 pb-4 md:px-10 sm:grid-cols-2 lg:grid-cols-4">
        {dict.services.items.map((item, i) => (
          <ServiceCard
            key={`${item.accessibleTitle}-${i}`}
            item={item}
            num={String(i + 1).padStart(2, '0')}
            labels={{
              flipFront: dict.services.flipFront,
              flipBack: dict.services.flipBack,
              technicalPrefix: dict.services.technicalPrefix,
            }}
          />
        ))}
      </div>
    </section>
  );
}
