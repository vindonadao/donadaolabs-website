import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página não encontrada · Donadão Labs',
  description: 'A página que você procurou não existe — ou foi shipada para outro lugar.',
  robots: { index: false, follow: false },
};

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
          404 · Não encontrado
        </div>

        <h1 className="mb-6 max-w-[20ch] font-display text-[clamp(3rem,9vw,7rem)] font-extrabold leading-[0.95] tracking-tightest text-balance">
          Essa página{' '}
          <em className="not-italic gradient-text">não shipou.</em>
        </h1>

        <p className="mb-10 max-w-[60ch] text-lg leading-[1.55] text-stone-300 md:text-xl">
          O endereço que você procurou não existe — ou foi movido. Sem drama, volta pra home e
          continua de lá.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-brand-md bg-gradient-purple px-8 py-4 font-display text-base font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-glow-strong"
          >
            <span aria-hidden>←</span> Voltar pra home
          </Link>
          <Link
            href="/#cases"
            className="rounded-brand-md border border-stone-700 px-8 py-4 font-display text-base font-medium text-offwhite transition-all hover:border-accent hover:bg-accent/[0.14]"
          >
            Ver os cases
          </Link>
        </div>
      </div>
    </main>
  );
}
