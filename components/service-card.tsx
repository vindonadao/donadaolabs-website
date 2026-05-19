'use client';

import { useState } from 'react';
import type { Service } from '@/lib/constants';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps): React.ReactElement {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="group relative w-full sm:aspect-square [perspective:1200px]">
      <div
        className={`relative h-full min-h-[260px] w-full transition-transform duration-[700ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] [transform-style:preserve-3d] motion-reduce:duration-200 ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* FRONT — 100% acessível, zero jargão técnico */}
        <button
          type="button"
          aria-label={`${service.accessibleTitle} — ver detalhes técnicos`}
          aria-expanded={flipped}
          onClick={() => setFlipped(true)}
          className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-brand-lg border border-white/[0.08] bg-charcoal p-5 text-left transition-all duration-200 hover:border-purple hover:shadow-card-hover-purple [backface-visibility:hidden]"
        >
          <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-green opacity-60 transition-opacity duration-200 group-hover:bg-purple group-hover:opacity-100" />

          <div className="mb-4">
            <span className="inline-block rounded-[4px] bg-accent px-2 py-[3px] font-mono text-[11px] text-black transition-colors duration-200 group-hover:bg-purple group-hover:text-offwhite">
              {service.num}
            </span>
          </div>

          <h3 className="m-0 font-display text-[20px] font-semibold leading-tight tracking-brand-tight">
            {service.accessibleTitle}
          </h3>

          <p className="mt-2 text-pretty text-[12.5px] leading-snug text-offwhite/65">
            {service.accessibleBody}
          </p>

          <ul className="mt-3 flex flex-col gap-1.5">
            {service.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2 text-[12px] leading-snug text-offwhite/85"
              >
                <span className="mt-[3px] grid h-3 w-3 flex-shrink-0 place-items-center rounded-[3px] bg-accent/[0.14] text-[9px] font-bold text-accent transition-colors duration-200 group-hover:bg-purple/[0.18] group-hover:text-purple">
                  ✓
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <span className="absolute bottom-3 right-4 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-offwhite/40 transition-colors duration-200 group-hover:text-purple">
            ver técnico
            <span aria-hidden="true" className="text-[11px]">
              ↻
            </span>
          </span>
        </button>

        {/* BACK — bloco técnico drill-down */}
        <button
          type="button"
          aria-label={`${service.accessibleTitle} — voltar à descrição`}
          onClick={() => setFlipped(false)}
          className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-brand-lg border border-purple/40 bg-ink p-5 text-left transition-colors duration-200 hover:border-purple [transform:rotateY(180deg)] [backface-visibility:hidden]"
        >
          <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-purple" />

          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-purple">
              {'//'} téc.
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-offwhite/45">
              {service.techLabel}
            </span>
          </div>

          <h4 className="m-0 mb-2 font-display text-[16px] font-semibold leading-tight tracking-brand-tight text-offwhite">
            {service.technicalTitle}
          </h4>

          <p className="text-pretty text-[12.5px] leading-snug text-offwhite/85">
            {service.technicalBody}
          </p>

          <span className="absolute bottom-3 right-4 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-offwhite/50 transition-colors duration-200 hover:text-purple">
            voltar
            <span aria-hidden="true" className="text-[11px]">
              ↺
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
