import { headers } from 'next/headers';
import Link from 'next/link';
import { DEFAULT_LOCALE } from '@/lib/i18n/config';
import { getDictionary, isLocale } from '@/lib/i18n';

/**
 * 404 in-segment: aplica quando uma rota /[lang]/algo-invalido é acessada
 * mas o segmento [lang] existe (o pega-tudo `[...rest]` garante isso). O
 * not-found não recebe `params`, então o idioma vem do header `x-locale`, que
 * o proxy preenche com o locale da URL. Textos do `notFound` de pt.ts/en.ts,
 * que ficavam sem uso enquanto o texto vivia fixo aqui, em inglês.
 * Verde primário da v2 (o roxo secundário fica pra hover de case e badge).
 */
export default async function NotFound(): Promise<React.ReactElement> {
  const fromHeader = (await headers()).get('x-locale') ?? '';
  const lang = isLocale(fromHeader) ? fromHeader : DEFAULT_LOCALE;
  const t = getDictionary(lang).notFound;

  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-1/2 -z-20 h-[150%] bg-gradient-mesh" />
      <div
        className="pointer-events-none absolute left-1/2 top-[-20%] -z-10 h-[1200px] w-[1200px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(0, 245, 122, 0.28) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-32 md:px-8">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-accent/40 bg-accent/[0.12] px-4 py-2 font-mono text-xs font-medium uppercase tracking-widest text-accent-bright">
          <span className="h-2 w-2 rounded-full bg-accent" />
          {t.badge}
        </div>

        <h1 className="mb-6 max-w-[20ch] font-display text-[clamp(3rem,9vw,7rem)] font-extrabold leading-[0.95] tracking-tightest text-balance">
          {t.title} <em className="not-italic gradient-text">{t.titleEm}</em>
        </h1>

        <p className="mb-10 max-w-[60ch] text-lg leading-[1.55] text-stone-300 md:text-xl">
          {t.body}
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-2 rounded-brand-md bg-gradient-green px-8 py-4 font-display text-base font-semibold text-black transition-all hover:-translate-y-0.5"
          >
            <span aria-hidden>←</span> {t.ctaHome}
          </Link>
          <Link
            href={`/${lang}#cases`}
            className="rounded-brand-md border border-stone-700 px-8 py-4 font-display text-base font-medium text-offwhite transition-all hover:border-accent hover:bg-accent/[0.14]"
          >
            {t.ctaCases}
          </Link>
        </div>
      </div>
    </main>
  );
}
