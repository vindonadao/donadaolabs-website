import { STACK_CHIPS } from '@/lib/constants';

export function Stack(): React.ReactElement {
  return (
    <section className="border-b border-white/[0.08] px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-8 gap-y-4">
        <div className="whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-offwhite/55">
          Stack em produção
        </div>
        <div className="flex flex-wrap gap-2">
          {STACK_CHIPS.map((chip) => (
            <span
              key={chip.label}
              className="rounded-[6px] border border-white/[0.08] bg-charcoal px-3 py-1.5 font-mono text-xs text-offwhite transition-colors duration-200 hover:border-accent/60 hover:text-accent"
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
