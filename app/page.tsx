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
import { PlainPortuguese } from '@/components/plain-portuguese';
import { Services } from '@/components/services';
import { Stack } from '@/components/stack';

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PlainPortuguese />
        <Metrics />
        <Stack />
        <Services />
        <Approach />
        <Cases />
        <Manifesto />
        <Changelog />
        <Founder />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
