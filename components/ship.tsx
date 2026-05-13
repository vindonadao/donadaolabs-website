'use client';

import { useEffect, useRef, useState } from 'react';
import { SHIP_TOOLTIP } from '@/lib/constants';

interface ShipProps {
  children: React.ReactNode;
}

export function Ship({ children }: ShipProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent): void => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return (): void => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  return (
    <span ref={wrapRef} className="relative inline">
      <span
        role="button"
        tabIndex={0}
        aria-label="O que significa ship? Clique para ver a tradução."
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={(e) => {
          e.preventDefault();
          setOpen((o) => !o);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="cursor-help border-b-[1.5px] border-dotted border-accent pb-0.5"
      >
        {children}
      </span>
      <sup className="ml-1 select-none align-super font-mono text-[0.42em] font-semibold text-accent">
        *
      </sup>
      {open && (
        <span
          role="tooltip"
          className="absolute left-0 top-full z-[100] mt-3.5 block w-[340px] max-w-[90vw] rounded-brand-lg border border-white/[0.08] bg-charcoal p-[16px_18px] text-left font-sans text-sm font-normal not-italic leading-[1.55] tracking-normal text-offwhite shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.4)]"
          style={{ WebkitTextFillColor: '#f0f0f5' }}
        >
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-accent">
            {SHIP_TOOLTIP.eyebrow}
          </span>
          <strong className="font-semibold text-offwhite">{SHIP_TOOLTIP.bold}</strong>{' '}
          <span className="text-offwhite/55">{SHIP_TOOLTIP.rest}</span>
        </span>
      )}
    </span>
  );
}
