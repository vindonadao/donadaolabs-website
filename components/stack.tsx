import { STACK_CHIPS } from '@/lib/constants';

export function Stack(): React.ReactElement {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-[1200px] px-6 text-center md:px-8">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-stone-500">
          Stack que rodamos
        </p>
        <div className="mx-auto flex max-w-[800px] flex-wrap justify-center gap-2">
          {STACK_CHIPS.map((chip) => (
            <span
              key={chip.label}
              className="rounded-full border border-stone-700 bg-stone-900 px-4 py-2 font-mono text-sm text-stone-300"
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
