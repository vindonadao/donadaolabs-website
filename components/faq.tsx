'use client';

import { useState } from 'react';
import { SectionHeader } from '@/components/section-header';
import { FAQ } from '@/lib/constants';

export function Faq(): React.ReactElement {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="border-t border-white/[0.08]">
      <SectionHeader idx="06" eyebrow="FAQ" title="Perguntas que sempre aparecem." />
      <div className="px-6 md:px-10">
        <div className="overflow-hidden rounded-brand-lg border border-white/[0.08] bg-charcoal">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={i < FAQ.length - 1 ? 'border-b border-white/[0.08]' : ''}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="grid w-full cursor-pointer grid-cols-[50px_1fr_30px] items-center gap-3.5 bg-transparent px-6 py-5 text-left text-offwhite transition-colors duration-200 hover:bg-white/[0.02] focus-visible:bg-white/[0.02]"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg font-medium tracking-brand-normal">{f.q}</span>
                  <span className="text-right font-mono text-base text-offwhite/55">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="grid grid-cols-[50px_1fr_30px] gap-3.5 px-6 pb-5">
                    <span />
                    <p className="m-0 max-w-[720px] text-[15px] leading-relaxed text-offwhite/55">
                      {f.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
