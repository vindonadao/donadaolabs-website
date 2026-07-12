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
import { Products } from '@/components/products';
import { Services } from '@/components/services';
import { Stack } from '@/components/stack';
import { PRODUCTS, SITE } from '@/lib/constants';
import { getDictionary, isLocale } from '@/lib/i18n';

interface HomePageProps {
  params: { lang: string };
}

export default function HomePage({ params }: HomePageProps): React.ReactElement {
  if (!isLocale(params.lang)) notFound();
  const dict = getDictionary(params.lang);

  // FAQPage JSON-LD montado a partir das perguntas visíveis na seção FAQ
  // (requisito do rich result: o texto da resposta tem que existir na página).
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dict.faq.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  // ItemList dos produtos próprios (PregApp, ZONA75, Naipe) — sinaliza pro
  // Google que o Lab opera produtos próprios, apontando pros domínios reais.
  const productsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE.name} — ${dict.products.eyebrow.replace(/^◆\s*/, '')}`,
    itemListElement: PRODUCTS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: p.url,
      name: p.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />
      <Nav dict={dict} lang={params.lang} />
      <main>
        <Hero dict={dict} lang={params.lang} />
        <Metrics dict={dict} />
        <Stack dict={dict} />
        <Services dict={dict} />
        <Approach dict={dict} />
        <Cases dict={dict} />
        <Manifesto dict={dict} />
        <Changelog dict={dict} />
        <Founder dict={dict} />
        <Products dict={dict} />
        <Faq dict={dict} />
        <Cta dict={dict} />
      </main>
      <Footer dict={dict} lang={params.lang} />
    </>
  );
}
