import { THROUGHPUT } from '@/lib/constants';

export function ThroughputChart(): React.ReactElement {
  const bars = THROUGHPUT.bars;
  const max = Math.max(...bars);

  return (
    <div className="relative overflow-hidden rounded-brand-lg border border-white/[0.08] bg-charcoal p-4.5">
      {/* Subtle green grid background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-faint opacity-50" />

      {/* Header row: label/total/delta + live indicator */}
      <div className="relative mb-3.5 flex items-start justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-offwhite/55">
            {THROUGHPUT.label}
          </div>
          <div className="mt-1 font-mono text-[22px] text-offwhite">
            {THROUGHPUT.total}{' '}
            <span className="text-xs text-offwhite/55">{THROUGHPUT.unit}</span>
            <span className="ml-2.5 text-xs text-accent">{THROUGHPUT.delta}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-offwhite/55">
          <span
            className="h-1.5 w-1.5 animate-dl-pulse rounded-full bg-accent"
            style={{ boxShadow: '0 0 6px #00F57A' }}
          />
          live
        </div>
      </div>

      {/* Bars */}
      <div className="relative grid h-[90px] grid-cols-7 items-end gap-2">
        {bars.map((v, i) => (
          <div
            key={i}
            className="relative animate-dl-tick rounded-t-[3px] bg-gradient-to-t from-accent to-accent-deep"
            style={{
              height: `${(v / max) * 100}%`,
              animationDelay: `${i * 0.07}s`,
            }}
          >
            {i === bars.length - 1 && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[3px] bg-ink px-1.5 py-0.5 font-mono text-[10px] text-accent">
                {v}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Day labels */}
      <div className="relative mt-2 grid grid-cols-7 gap-2 text-center font-mono text-[10px] text-offwhite/55">
        {THROUGHPUT.days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
    </div>
  );
}
