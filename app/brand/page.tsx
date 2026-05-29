import { LINKS, SITE } from '@/lib/constants';

const PDF_LATEST = '/brand/latest.pdf';

/** Corner brackets brutalistas — 4 cantos, verde (accent) ou roxo (purple). */
interface CornerBracketsProps {
  color?: 'accent' | 'purple';
}

function CornerBrackets({ color = 'accent' }: CornerBracketsProps): React.ReactElement {
  const c = color === 'purple' ? 'border-purple' : 'border-accent';
  return (
    <>
      <span
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 h-3.5 w-3.5 border-l-2 border-t-2 ${c}`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute right-0 top-0 h-3.5 w-3.5 border-r-2 border-t-2 ${c}`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-0 left-0 h-3.5 w-3.5 border-b-2 border-l-2 ${c}`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-0 right-0 h-3.5 w-3.5 border-b-2 border-r-2 ${c}`}
      />
    </>
  );
}

interface HighlightCardProps {
  num: string;
  label: string;
  color: 'accent' | 'purple';
  children: React.ReactNode;
}

function HighlightCard({ num, label, color, children }: HighlightCardProps): React.ReactElement {
  const pill =
    color === 'purple'
      ? 'bg-purple text-offwhite'
      : 'bg-accent text-black';
  const labelColor = color === 'purple' ? 'text-purple' : 'text-accent';
  return (
    <div className="relative flex min-h-[200px] flex-col justify-between rounded-brand-lg border border-white/[0.08] bg-charcoal p-6">
      <CornerBrackets color={color} />
      <div className="flex items-center gap-2.5">
        <span className={`rounded-[4px] px-2 py-[3px] font-mono text-[11px] ${pill}`}>{num}</span>
        <span className={`font-mono text-[10px] uppercase tracking-widest ${labelColor}`}>
          {label}
        </span>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export default function BrandPage(): React.ReactElement {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 70% 12%, rgba(0, 245, 122, 0.12) 0%, transparent 42%)',
        }}
      />

      <div className="mx-auto w-full max-w-[1120px] px-6 py-8 md:px-10 md:py-12">
        {/* Top bar brutalista: pill numerada + wordmark */}
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
          <span className="rounded-[4px] border border-accent/60 px-2.5 py-1 text-accent">
            001 · Brand Book
          </span>
          <a href="/" className="text-offwhite/55 transition-colors hover:text-offwhite">
            donadão<span className="text-accent">/</span>labs · 2026
          </a>
        </div>

        {/* HERO compacto */}
        <section className="relative mt-14 border-t border-white/[0.08] pt-12">
          <CornerBrackets color="accent" />
          <div className="mb-5 font-mono text-[11px] uppercase tracking-widest text-accent">
            REV-0.2 · 2026-05-29
          </div>
          <h1 className="m-0 font-display text-[clamp(2.75rem,8vw,5.125rem)] font-semibold leading-[0.98] tracking-tightest">
            Brand Book.
          </h1>
          <p className="mt-6 max-w-[640px] text-[19px] leading-[1.5] text-offwhite/55">
            Foundation, sistema verbal, identidade visual, canais e ativação da Donadão Labs em uma
            peça única. 24 páginas.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={PDF_LATEST}
              download="donadao-labs-brand-book-rev-0.2.pdf"
              className="rounded-[6px] bg-gradient-green px-5 py-2.5 text-[14px] font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow"
            >
              ↓ Baixar PDF
            </a>
            <a
              href={`${PDF_LATEST}#toolbar=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[6px] border border-white/[0.18] px-5 py-2.5 text-[14px] font-semibold text-offwhite/85 transition-colors duration-200 hover:border-accent hover:text-offwhite"
            >
              Ver no navegador
            </a>
          </div>
        </section>

        {/* PREVIEW embed */}
        <section className="mt-12">
          <div className="relative rounded-brand-lg border-2 border-accent/40 bg-charcoal p-1.5">
            <iframe
              src={`${PDF_LATEST}#toolbar=1&navpanes=1`}
              title="Brand Book Donadão Labs — preview (rev-0.2)"
              className="h-[720px] w-full rounded-[8px] bg-ink"
            />
          </div>
          <p className="mt-3 font-mono text-[11px] text-offwhite/40">
            Preview não carregou?{' '}
            <a
              href={PDF_LATEST}
              download="donadao-labs-brand-book-rev-0.2.pdf"
              className="text-accent underline-offset-2 hover:underline"
            >
              Baixar o PDF (1.3 MB · 24 páginas)
            </a>
            .
          </p>
        </section>

        {/* GRID de destaques */}
        <section className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <HighlightCard num="001" label="Arquétipo" color="accent">
            <h2 className="font-display text-[26px] font-semibold leading-tight tracking-brand-tight text-accent">
              Pragmatic Builder
            </h2>
          </HighlightCard>

          <HighlightCard num="002" label="Bordão bilíngue" color="accent">
            <h2 className="font-display text-[32px] font-semibold leading-tight tracking-brand-tight">
              <span className="text-accent">ships</span>
              <span className="text-purple">*</span>
            </h2>
          </HighlightCard>

          <HighlightCard num="003" label="3 Layers" color="purple">
            <h2 className="font-display text-[22px] font-semibold leading-tight tracking-brand-tight text-purple">
              Person · Lab · Products
            </h2>
          </HighlightCard>
        </section>

        {/* FOOTER variante B (canônica do brand book) */}
        <footer className="mt-16 flex flex-col gap-2 border-t border-white/[0.08] pt-8 font-mono text-[11px] text-offwhite/55 md:flex-row md:items-center md:gap-3">
          <span className="text-offwhite/85">
            Built by Donadão<span className="text-accent">/</span>Labs
          </span>
          <span aria-hidden className="hidden md:inline">·</span>
          <span>{SITE.tagline}</span>
          <span aria-hidden className="hidden md:inline">·</span>
          <a href="/" className="transition-colors hover:text-offwhite">
            donadaolabs.com
          </a>
          <span aria-hidden className="hidden md:inline">·</span>
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-offwhite"
          >
            @donadaolabs
          </a>
        </footer>
      </div>
    </main>
  );
}
