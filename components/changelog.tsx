import { SectionHeader } from '@/components/section-header';
import { CHANGELOG } from '@/lib/constants';
import type { Dictionary } from '@/lib/i18n';

interface ChangelogProps {
  dict: Dictionary;
}

export function Changelog({ dict }: ChangelogProps): React.ReactElement {
  return (
    <section id="changelog" className="border-t border-white/[0.08]">
      <SectionHeader
        idx="05"
        eyebrow={dict.changelog.eyebrow}
        title={dict.changelog.title}
        sub={dict.changelog.sub}
      />
      <div className="px-6 pb-4 md:px-10">
        <div className="overflow-hidden rounded-brand-lg border border-white/[0.08] bg-charcoal">
          {CHANGELOG.map((c, i) => {
            const tagLabel = dict.changelog.tagLabels[c.tag];
            const text = dict.changelog.entries[i]?.text ?? '';
            return (
              <div
                key={`${c.date}-${i}`}
                className={`grid items-center gap-5 px-5 py-4 text-sm md:grid-cols-[120px_90px_1fr_100px] ${
                  i < CHANGELOG.length - 1 ? 'border-b border-white/[0.08]' : ''
                }`}
              >
                <span className="font-mono text-xs text-offwhite/55">{c.date}</span>
                <span className="inline-flex w-fit items-center justify-center rounded-full bg-accent/[0.14] px-2 py-1 text-center font-mono text-[10px] uppercase tracking-widest text-accent md:w-auto">
                  {tagLabel}
                </span>
                <span className="text-offwhite">{text}</span>
                <span className="hidden text-right font-mono text-[11px] text-offwhite/30 md:block">
                  #a4f{i}b2c
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
