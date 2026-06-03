import Image from 'next/image';
import { CaseMark } from '@/components/case-mark';
import { SectionHeader } from '@/components/section-header';
import { Sparkline } from '@/components/sparkline';
import { CASES, type Case, type CaseStyle } from '@/lib/constants';
import type { Dictionary } from '@/lib/i18n';

const CASE_SPARK = [12, 18, 16, 22, 28, 35, 41, 47];

const FONT_STYLES: Record<CaseStyle, string> = {
  serif: 'font-["Instrument_Serif",Georgia,serif] italic font-normal tracking-[-0.005em]',
  'sans-bold': 'font-display font-bold tracking-[-0.04em]',
  'sans-condensed': 'font-display font-bold tracking-[-0.05em] [transform:scaleX(0.92)] origin-left',
  mono: 'font-mono font-medium tracking-[-0.02em]',
};

interface CasesProps {
  dict: Dictionary;
}

function CaseLogoLockup({ c }: { c: Case }): React.ReactElement {
  if (c.logo.image) {
    return (
      <Image
        src={c.logo.image}
        alt={c.client}
        width={720}
        height={216}
        sizes="(min-width: 768px) 280px, 240px"
        className="max-h-16 w-auto max-w-[85%] object-contain"
      />
    );
  }
  return (
    <div className="flex items-center gap-3">
      <span className="flex shrink-0 text-accent">
        <CaseMark shape={c.logo.shape} />
      </span>
      <span
        className={`text-[24px] leading-none text-offwhite [white-space:pre] ${FONT_STYLES[c.logo.style]}`}
      >
        {c.logo.display}
      </span>
    </div>
  );
}

interface CaseCardContentProps {
  c: Case;
  labels: Dictionary['cases'];
}

function CaseCardContent({ c, labels }: CaseCardContentProps): React.ReactElement {
  const isInternal = c.internal === true;
  const clientLabel = isInternal
    ? `${c.client.toLowerCase()} ${labels.internalSuffix}`
    : `${c.client.toLowerCase()}${labels.publicSuffix}`;

  return (
    <>
      {/* Thumbnail */}
      <div
        className={`relative mb-4.5 h-[180px] overflow-hidden rounded-[8px] border border-white/[0.08] bg-ink transition-colors duration-200 ${
          isInternal
            ? 'group-hover:border-purple/40 group-focus-visible:border-purple/40'
            : 'group-hover:border-accent/40 group-focus-visible:border-accent/40'
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-faint opacity-60" />

        {isInternal ? (
          <div className="absolute right-3.5 top-3 flex items-center gap-1.5 font-mono text-[10px] text-purple">
            <span aria-hidden="true">◆</span>
            {labels.internalLabel}
          </div>
        ) : (
          <div className="absolute right-3.5 top-3 flex items-center gap-1.5 font-mono text-[10px] text-accent">
            <span
              className="h-1.5 w-1.5 animate-dl-pulse rounded-full bg-accent"
              style={{ boxShadow: '0 0 6px #00F57A' }}
            />
            {labels.liveLabel}
          </div>
        )}

        <div className="absolute left-3.5 top-3 font-mono text-[10px] uppercase tracking-[0.08em] text-offwhite/55">
          {clientLabel}
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-3.5 pb-11 pt-8">
          <CaseLogoLockup c={c} />
        </div>

        <div className="absolute inset-x-3.5 bottom-2.5 flex items-end justify-between">
          <div className={`font-mono text-xs ${isInternal ? 'text-purple' : 'text-accent'}`}>
            {c.metric}
          </div>
          <Sparkline data={CASE_SPARK} width={84} />
        </div>
      </div>

      <div className="mb-2.5 flex items-center justify-between gap-3">
        <span
          className={`rounded-[4px] px-1.5 py-0.5 font-mono text-[10px] ${
            isInternal ? 'bg-purple text-offwhite' : 'bg-accent text-black'
          }`}
        >
          {c.num}
        </span>
        <span className="text-right font-mono text-[10px] uppercase tracking-[0.08em] text-offwhite/55">
          {c.kind}
        </span>
      </div>
      <h3 className="m-0 font-display text-[22px] font-semibold tracking-brand-tight">
        {c.title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-offwhite/55">{c.desc}</p>

      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-dashed border-white/[0.08] pt-4">
        {c.stack.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/[0.08] px-2 py-0.5 font-mono text-[10px] text-offwhite/55"
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );
}

function CaseCard({ c, labels }: { c: Case; labels: Dictionary['cases'] }): React.ReactElement {
  if (c.internal === true || c.href === null) {
    return (
      <article
        className="group block rounded-brand-lg border border-white/[0.08] bg-charcoal p-6 text-offwhite transition-colors duration-200 hover:border-purple/40"
        aria-label={`${c.title} — ${labels.internalAria}`}
      >
        <CaseCardContent c={c} labels={labels} />
      </article>
    );
  }

  const isExternal = c.href.startsWith('http');
  return (
    <a
      href={c.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group block rounded-brand-lg border border-white/[0.08] bg-charcoal p-6 text-offwhite no-underline transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-card-hover focus-visible:-translate-y-1 focus-visible:border-accent focus-visible:shadow-card-hover"
    >
      <CaseCardContent c={c} labels={labels} />
    </a>
  );
}

/**
 * Funde campos neutros de `CASES` (num, client, href, internal, stack, logo)
 * com campos traduzidos de `dict.cases.items` (kind, title, desc, metric).
 * `meta` é mantido em paralelo com `kind` por compat (legado do constants).
 */
function localizeCase(c: Case, item: Dictionary['cases']['items'][number] | undefined): Case {
  if (!item) return c;
  return {
    ...c,
    kind: item.kind,
    meta: item.kind,
    title: item.title,
    desc: item.desc,
    metric: item.metric,
  };
}

export function Cases({ dict }: CasesProps): React.ReactElement {
  const items = CASES.map((c, i) => localizeCase(c, dict.cases.items[i]));

  return (
    <section id="cases" className="mt-6 border-t border-white/[0.08]">
      <SectionHeader
        idx="03"
        eyebrow={dict.cases.eyebrow}
        title={dict.cases.title}
        sub={dict.cases.sub}
      />
      <div className="grid grid-cols-1 gap-4 px-6 pb-6 md:grid-cols-2 md:px-10">
        {items.map((c) => (
          <CaseCard key={c.num} c={c} labels={dict.cases} />
        ))}
      </div>
    </section>
  );
}
