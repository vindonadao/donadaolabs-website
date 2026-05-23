import { Ship } from '@/components/ship';
import { SectionHeader } from '@/components/section-header';
import type { Dictionary } from '@/lib/i18n';

interface ApproachProps {
  dict: Dictionary;
}

/**
 * Quando `titleShipWord` existir, splita o title naquela palavra e envolve a
 * palavra em `<Ship variant="short">`. Tooltip resumido aparece on-hover.
 * Se a palavra não estiver presente no title, faz fallback pra texto puro.
 */
function renderPillarTitle(
  title: string,
  shipWord: string | undefined,
  dict: Dictionary,
): React.ReactNode {
  if (!shipWord) return title;
  const idx = title.indexOf(shipWord);
  if (idx === -1) return title;
  const before = title.slice(0, idx);
  const after = title.slice(idx + shipWord.length);
  return (
    <>
      {before}
      <Ship dict={dict} variant="short">
        <span className="italic gradient-text">{shipWord}</span>
      </Ship>
      {after}
    </>
  );
}

export function Approach({ dict }: ApproachProps): React.ReactElement {
  return (
    <section className="mt-6 border-t border-white/[0.08]">
      <SectionHeader
        idx="02"
        eyebrow={dict.approach.eyebrow}
        title={dict.approach.title}
        sub={dict.approach.sub}
      />
      <div className="grid grid-cols-1 gap-4 px-6 pb-4 md:grid-cols-3 md:px-10">
        {dict.approach.items.map((p, i) => (
          <article
            key={`${p.label}-${i}`}
            className="group relative rounded-brand-lg border border-white/[0.08] bg-charcoal p-7 transition-all duration-200 hover:border-accent hover:shadow-card-hover"
          >
            <div className="mb-6 flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-gradient-green font-mono text-lg font-bold text-black">
                {String(i + 1).padStart(2, '0')}
              </div>
              <span className="font-mono text-[11px] text-accent">{p.day}</span>
            </div>
            <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-offwhite/55">
              {p.label}
            </div>
            <h3 className="m-0 font-display text-[22px] font-semibold tracking-brand-tight">
              {renderPillarTitle(p.title, p.titleShipWord, dict)}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-offwhite/55">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
