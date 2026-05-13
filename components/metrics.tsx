'use client';

import { useEffect, useState } from 'react';
import { Sparkline } from '@/components/sparkline';
import { METRICS, type Metric } from '@/lib/constants';

function useCountUp(target: number, durationMs = 1400): number {
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

interface MetricCardProps {
  metric: Metric;
  idx: number;
}

function MetricCard({ metric, idx }: MetricCardProps): React.ReactElement {
  const numMatch = metric.value.match(/^(\d+\.?\d*)/);
  const num = numMatch ? parseFloat(numMatch[1]) : 0;
  const rest = numMatch ? metric.value.slice(numMatch[0].length) : metric.value;
  const animated = useCountUp(num, 1200);
  const padLen = metric.value.replace(rest, '').length;
  const display = numMatch
    ? (num % 1 === 0 ? Math.round(animated) : animated.toFixed(1))
        .toString()
        .padStart(padLen, '0') + rest
    : metric.value;

  return (
    <div className="relative p-7">
      <div className="mb-3.5 flex items-center justify-between gap-3">
        <div className="font-mono text-[10px] uppercase tracking-widest text-offwhite/55">
          {String(idx + 1).padStart(2, '0')} · {metric.label}
        </div>
        {metric.spark && <Sparkline data={metric.spark} />}
      </div>
      <div className="font-mono text-[48px] font-medium leading-none tracking-tight">
        {display}
      </div>
      <div className="mt-2 font-mono text-[11px] text-offwhite/55">{metric.sub}</div>
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
          <MetricCard metric={m} idx={i} />
        </div>
      ))}
    </section>
  );
}
