import { notFound } from 'next/navigation';
import { Approach } from '@/components/approach';
import { Cases } from '@/components/cases';
import { Changelog } from '@/components/changelog';
import { Cta } from '@/components/cta';
import { Faq } from '@/components/faq';
import { Footer } from '@/components/footer';
import { Founder } from '@/components/founder';
import { Hero } from '@/components/hero';
import { Manifesto } from '@/components/manifesto';
import { Metrics } from '@/components/metrics';
import { Nav } from '@/components/nav';
import { Services } from '@/components/services';
import { Stack } from '@/components/stack';
import { getDictionary, isLocale } from '@/lib/i18n';

interface HomePageProps {
  params: { lang: string };
}

export default function HomePage({ params }: HomePageProps): React.ReactElement {
  if (!isLocale(params.lang)) notFound();
  const dict = getDictionary(params.lang);

  return (
    <>
      <Nav dict={dict} lang={params.lang} />
      <main>
        <Hero dict={dict} />
        <Metrics dict={dict} />
        <Stack dict={dict} />
        <Services dict={dict} />
        <Approach dict={dict} />
        <Cases dict={dict} />
        <Manifesto dict={dict} />
        <Changelog dict={dict} />
        <Founder dict={dict} />
        <Faq dict={dict} />
        <Cta dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
