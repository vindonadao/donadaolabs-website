import Link from 'next/link';

/**
 * 404 in-segment: aplica quando uma rota /[lang]/algo-invalido é acessada
 * mas o segmento [lang] existe. Mantém em PT por padrão — o usuário pode
 * estar perdido em qualquer idioma. Para versão traduzida real, criaríamos
 * variantes futuras.
 */
export default function NotFound(): React.ReactElement {
  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-1/2 -z-20 h-[150%] bg-gradient-mesh" />
      <div
        className="pointer-events-none absolute left-1/2 top-[-20%] -z-10 h-[1200px] w-[1200px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(110, 91, 255, 0.45) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-32 md:px-8">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-accent/40 bg-accent/[0.12] px-4 py-2 font-mono text-xs font-medium uppercase tracking-widest text-accent-bright">
          <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(110,91,255,0.7)]" />
          404 · Not found
        </div>

        <h1 className="mb-6 max-w-[20ch] font-display text-[clamp(3rem,9vw,7rem)] font-extrabold leading-[0.95] tracking-tightest text-balance">
          This page{' '}
          <em className="not-italic gradient-text">didn’t ship.</em>
        </h1>

        <p className="mb-10 max-w-[60ch] text-lg leading-[1.55] text-stone-300 md:text-xl">
          The address you were looking for doesn’t exist — or it was moved. No drama, head back
          home and keep going.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/pt"
            className="inline-flex items-center gap-2 rounded-brand-md bg-gradient-purple px-8 py-4 font-display text-base font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-glow-strong"
          >
            <span aria-hidden>←</span> Back to home
          </Link>
          <Link
            href="/pt#cases"
            className="rounded-brand-md border border-stone-700 px-8 py-4 font-display text-base font-medium text-offwhite transition-all hover:border-accent hover:bg-accent/[0.14]"
          >
            See the cases
          </Link>
        </div>
      </div>
    </main>
  );
}
