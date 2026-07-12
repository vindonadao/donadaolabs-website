'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Dictionary } from '@/lib/i18n';

interface ShipProps {
  children: React.ReactNode;
  dict: Dictionary;
  /** `full` (default) usa dict.ship.{eyebrow,bold,rest}; `short` usa dict.ship.short.* — pra cards/pillars. */
  variant?: 'full' | 'short';
}

/** Coordenadas do balão em viewport (position: fixed), já clampadas às bordas. */
interface Coords {
  top: number;
  left: number;
  width: number;
}

const MAX_WIDTH = 340;
const EDGE_PAD = 12; // margem mínima entre o balão e as bordas da viewport
const GAP = 10; // distância vertical do gatilho até o balão

export function Ship({ children, dict, variant = 'full' }: ShipProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<Coords | null>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const tooltip = variant === 'short' ? dict.ship.short : dict.ship;

  // Posiciona o balão sob o gatilho, mas centralizado e preso dentro da
  // viewport — em mobile o `left-0` antigo fazia o tooltip vazar e cortar o
  // texto (pior no CTA centralizado). `fixed` também o tira do `overflow-hidden`
  // das seções, então nunca é recortado por um pai.
  const place = useCallback((): void => {
    const el = wrapRef.current;
    if (!el) return;
    const vw = document.documentElement.clientWidth;
    const width = Math.min(MAX_WIDTH, vw - EDGE_PAD * 2);
    const rect = el.getBoundingClientRect();
    const centered = rect.left + rect.width / 2 - width / 2;
    const left = Math.max(EDGE_PAD, Math.min(centered, vw - width - EDGE_PAD));
    setCoords({ top: rect.bottom + GAP, left, width });
  }, []);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent): void => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onReflow = (): void => place();
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    window.addEventListener('scroll', onReflow, { passive: true, capture: true });
    window.addEventListener('resize', onReflow);
    return (): void => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
      window.removeEventListener('scroll', onReflow, { capture: true } as EventListenerOptions);
      window.removeEventListener('resize', onReflow);
    };
  }, [open, place]);

  return (
    <span ref={wrapRef} className="relative inline">
      <span
        role="button"
        tabIndex={0}
        aria-label={dict.ship.ariaLabel}
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
      {open && coords && (
        <span
          role="tooltip"
          className="fixed z-[100] block rounded-brand-lg border border-white/[0.08] bg-charcoal p-[16px_18px] text-left font-sans text-sm font-normal not-italic leading-[1.55] tracking-normal text-offwhite shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.4)]"
          style={{
            WebkitTextFillColor: '#f0f0f5',
            top: coords.top,
            left: coords.left,
            width: coords.width,
          }}
        >
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-accent">
            {tooltip.eyebrow}
          </span>
          <strong className="font-semibold text-offwhite">{tooltip.bold}</strong>{' '}
          <span className="text-offwhite/55">{tooltip.rest}</span>
        </span>
      )}
    </span>
  );
}
