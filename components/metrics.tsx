'use client';

import { useEffect, useState } from 'react';
import { METRICS, type Metric } from '@/lib/constants';

function useCountUp(target: number, durationMs = 1200): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number): void => {
      const p = Math.min(1, (t - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return (): void => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return value;
}

function MetricCard({ metric }: { metric: Metric }): React.ReactElement {
  const numMatch = metric.value.match(/^(\d+\.?\d*)/);
  const num = numMatch ? parseFloat(numMatch[1]) : 0;
  const rest = numMatch ? metric.value.slice(numMatch[0].length) : metric.value;
  const animated = useCountUp(num, 1100);
  const padLen = metric.value.replace(rest, '').length;
  const display = numMatch
    ? (num % 1 === 0 ? Math.round(animated) : animated.toFixed(1))
        .toString()
        .padStart(padLen, '0') + rest
    : metric.value;

  return (
    <div className="px-6 py-5 md:px-7 md:py-6">
      <div className="font-mono text-[10px] uppercase tracking-widest text-offwhite/45">
        {metric.label}
      </div>
      <div className="mt-2 flex items-baseline gap-2.5">
        <div className="font-mono text-[36px] font-medium leading-none tracking-tight">
          {display}
        </div>
        <div className="font-mono text-[11px] text-offwhite/55">{metric.sub}</div>
      </div>
    </div>
  );
}

export function Metrics(): React.ReactElement {
  return (
    <section className="grid grid-cols-2 border-b border-white/[0.08] bg-charcoal md:grid-cols-4">
      {METRICS.map((m, i) => (
        <div
          key={m.label}
          className={
            i < METRICS.length - 1
              ? `border-white/[0.08] ${i % 2 === 0 ? 'border-r' : 'md:border-r'} ${i < 2 ? 'border-b md:border-b-0' : ''}`
              : ''
          }
        >
          <MetricCard metric={m} />
        </div>
      ))}
    </section>
  );
}
