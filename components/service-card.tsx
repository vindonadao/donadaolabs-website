'use client';

import { useEffect, useState } from 'react';
import type { Service } from '@/lib/constants';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps): React.ReactElement {
  const [isTechnical, setIsTechnical] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setSupportsHover(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent): void => {
      setSupportsHover(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return (): void => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleClick = (): void => {
    setIsTechnical((prev) => !prev);
  };

  const handleMouseEnter = (): void => {
    if (supportsHover) setIsTechnical(true);
  };

  const handleMouseLeave = (): void => {
    if (supportsHover) setIsTechnical(false);
  };

  const handleFocus = (): void => {
    if (supportsHover) setIsTechnical(true);
  };

  const handleBlur = (): void => {
    if (supportsHover) setIsTechnical(false);
  };

  const stateLabel = isTechnical ? `× ${service.techLabel}` : '+ Ver detalhe técnico';
  const stateClasses = isTechnical
    ? 'border-accent/50 bg-accent/[0.14] text-accent-bright'
    : 'border-stone-700 bg-stone-800/40 text-stone-400';

  return (
    <button
      type="button"
      aria-pressed={isTechnical}
      aria-label={`${service.accessibleTitle}. Toque para alternar entre descrição acessível e técnica.`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      className="group relative isolate flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-brand-lg border border-stone-800 bg-stone-900 p-8 text-left transition-all hover:-translate-y-1 hover:border-accent hover:shadow-card-hover focus-visible:border-accent focus-visible:shadow-card-hover"
    >
      {/* Header: number + state pill */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-stone-500">
          {service.num}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-widest transition-all duration-300 ${stateClasses}`}
        >
          {stateLabel}
        </span>
      </div>

      {/* Stack: 2 versions cross-fade in same grid cell */}
      <div className="grid flex-1">
        <div
          className={`col-start-1 row-start-1 transition-opacity duration-300 ${
            isTechnical ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <h3 className="mb-3 font-display text-2xl font-bold tracking-brand-tight">
            {service.accessibleTitle}
          </h3>
          <p className="text-base leading-[1.6] text-stone-300">{service.accessibleBody}</p>
        </div>

        <div
          className={`col-start-1 row-start-1 transition-opacity duration-300 ${
            isTechnical ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <h3 className="mb-3 font-display text-2xl font-bold tracking-brand-tight">
            {service.technicalTitle}
          </h3>
          <p className="text-base leading-[1.6] text-stone-300">{service.technicalBody}</p>
        </div>
      </div>
    </button>
  );
}
