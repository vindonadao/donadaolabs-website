import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { ConsentBanner } from '@/components/consent-banner';
import { GoogleAnalytics } from '@/components/google-analytics';
import { LINKS, SITE } from '@/lib/constants';
import {
  HTML_LANG,
  LOCALES,
  OG_LOCALE,
  getDictionary,
  isLocale,
  type Locale,
} from '@/lib/i18n';
import '../globals.css';

const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  alternateName: 'Donadão Labs',
  url: SITE.url,
  logo: `${SITE.url}/brand/logo-mark.svg`,
  description: SITE.description,
  email: SITE.email,
  founder: {
    '@type': 'Person',
    name: 'Vinicius Donadão',
    jobTitle: 'Computer Scientist · Founder',
    url: LINKS.linkedin,
  },
  sameAs: [LINKS.linkedin, LINKS.github, LINKS.instagram],
  knowsAbout: ['AI software', 'AI agents', 'SaaS', 'Next.js', 'TypeScript', 'Postgres'],
} as const;

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export function generateStaticParams(): { lang: Locale }[] {
  return LOCALES.map((lang) => ({ lang }));
}

interface LangLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};
  const dict = getDictionary(params.lang);
  const titleDefault = `${SITE.name} — ${dict.meta.titleTagline}`;

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: titleDefault,
      template: `%s · ${SITE.name}`,
    },
    description: dict.meta.description,
    keywords: [
      'AI software',
      'AI agents',
      'software lab',
      'Donadão Labs',
      'Vinicius Donadão',
      'AI development',
      'SaaS',
      'Next.js',
    ],
    authors: [{ name: 'Vinicius Donadão' }],
    creator: 'Vinicius Donadão',
    publisher: 'Donadão Labs',
    icons: {
      icon: [{ url: '/brand/favicon.svg', type: 'image/svg+xml' }],
      shortcut: '/brand/favicon.svg',
    },
    alternates: {
      canonical: `/${params.lang}`,
      languages: {
        'pt-BR': '/pt',
        'en-US': '/en',
        'x-default': '/pt',
      },
    },
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[params.lang],
      alternateLocale: LOCALES.filter((l) => l !== params.lang).map((l) => OG_LOCALE[l]),
      url: `${SITE.url}/${params.lang}`,
      siteName: SITE.name,
      title: titleDefault,
      description: dict.meta.description,
      images: [
        {
          url: '/brand/og.png',
          width: 1200,
          height: 630,
          alt: titleDefault,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleDefault,
      description: dict.meta.description,
      creator: '@donadaolabs',
      images: ['/brand/og.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function LangLayout({ children, params }: LangLayoutProps): React.ReactElement {
  if (!isLocale(params.lang)) notFound();

  return (
    <html
      lang={HTML_LANG[params.lang]}
      className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
      </head>
      <body className="bg-ink text-offwhite antialiased">
        {children}
        <GoogleAnalytics />
        <ConsentBanner dict={getDictionary(params.lang as Locale)} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
