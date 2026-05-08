import { Approach } from '@/components/approach';
import { Cases } from '@/components/cases';
import { Cta } from '@/components/cta';
import { Footer } from '@/components/footer';
import { Founder } from '@/components/founder';
import { Hero } from '@/components/hero';
import { Manifesto } from '@/components/manifesto';
import { Nav } from '@/components/nav';
import { Services } from '@/components/services';
import { Stack } from '@/components/stack';

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Approach />
        <Cases />
        <Manifesto />
        <Founder />
        <Stack />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
