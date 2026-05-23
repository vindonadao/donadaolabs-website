import Image from 'next/image';
import { SectionHeader } from '@/components/section-header';
import { FOUNDER, LINKS } from '@/lib/constants';
import type { Dictionary } from '@/lib/i18n';

const SOCIALS = [
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'GitHub', href: LINKS.github },
  { label: 'Instagram', href: LINKS.instagram },
] as const;

interface FounderProps {
  dict: Dictionary;
}

export function Founder({ dict }: FounderProps): React.ReactElement {
  return (
    <section id="founder" className="mt-6 border-t border-white/[0.08]">
      <SectionHeader
        idx="05"
        eyebrow={dict.founder.eyebrow}
        title={dict.founder.title}
        sub={dict.founder.sub}
      />
      <div className="grid grid-cols-1 gap-12 px-6 pb-20 md:grid-cols-[260px_1fr] md:px-10">
        <div className="relative h-[280px] w-[240px] overflow-hidden rounded-brand-lg border border-white/[0.08] bg-charcoal">
          <Image
            src={FOUNDER.photo}
            alt={FOUNDER.name}
            fill
            sizes="240px"
            className="object-cover"
            priority
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent 55%, #070709 100%)',
            }}
          />
          <div
            className="absolute bottom-2.5 left-3 flex items-center gap-1.5 font-mono text-[10px] text-accent"
            style={{ textShadow: '0 1px 4px #070709' }}
          >
            <span
              className="h-1.5 w-1.5 animate-dl-pulse rounded-full bg-accent"
              style={{ boxShadow: '0 0 6px #00F57A' }}
            />
            {dict.founder.badge}
          </div>
        </div>

        <div>
          <h3 className="m-0 font-display text-[36px] font-semibold tracking-brand-tight">
            {FOUNDER.name}
          </h3>
          <div className="mt-1.5 font-mono text-xs uppercase tracking-widest text-accent">
            {dict.founder.role}
          </div>
          <p className="mt-5.5 max-w-[680px] text-base leading-[1.6] text-offwhite">
            {dict.founder.bio1}
          </p>
          <p className="mt-3.5 max-w-[680px] text-base leading-[1.6] text-offwhite/55">
            {dict.founder.bio2}
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[6px] border border-white/[0.08] bg-charcoal px-3.5 py-2 text-[13px] text-offwhite transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/[0.08] hover:text-accent"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
