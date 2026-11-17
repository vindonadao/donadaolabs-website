import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { LOCALES, getDictionary, isLocale, type Locale } from '@/lib/i18n';

interface PrivacyPageProps {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams(): { lang: Locale }[] {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.privacy.title,
    alternates: {
      canonical: `/${lang}/privacidade`,
      languages: {
        'pt-BR': '/pt/privacidade',
        'en-US': '/en/privacidade',
        'x-default': '/pt/privacidade',
      },
    },
    // Página utilitária: indexável, mas sem destaque de snippet.
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps): Promise<React.ReactElement> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.privacy;

  return (
    <>
      <Nav dict={dict} lang={lang} />
      <main className="mx-auto w-full max-w-[760px] px-6 pb-24 pt-[140px] md:px-10">
        <h1 className="m-0 font-display text-[clamp(2.25rem,6vw,3.5rem)] font-semibold leading-[1.02] tracking-tightest">
          {t.title}
        </h1>
        <div className="mt-5 flex flex-col gap-1 font-mono text-[12px] text-offwhite/55">
          <span>{t.controller}</span>
          <span>{t.updated}</span>
        </div>

        <div className="mt-12 flex flex-col gap-10">
          {t.sections.map((section) => (
            <section key={section.title}>
              <h2 className="m-0 text-[19px] font-medium tracking-brand-normal text-offwhite">
                {section.title}
              </h2>
              <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-offwhite/55">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <p className="mt-14 border-t border-white/[0.08] pt-6 font-mono text-[11px] leading-relaxed text-offwhite/40">
          {t.legalNote}
        </p>
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
