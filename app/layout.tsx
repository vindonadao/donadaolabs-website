import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { LINKS, SITE } from '@/lib/constants';
import './globals.css';

const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  alternateName: 'Donadão Labs',
  url: SITE.url,
  logo: `${SITE.url}/brand/monogram-dd-accent.svg`,
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
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
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    creator: '@donadaolabs',
    images: ['/api/og'],
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

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  return (
    <html
      lang="pt-BR"
      className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
      </head>
      <body className="bg-charcoal text-offwhite antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
