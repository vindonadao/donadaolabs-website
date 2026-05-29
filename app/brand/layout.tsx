import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { ConsentBanner } from '@/components/consent-banner';
import { GoogleAnalytics } from '@/components/google-analytics';
import { SITE } from '@/lib/constants';
import { getDictionary } from '@/lib/i18n';
import '../globals.css';

const BRAND_TITLE = 'Brand Book · Donadão Labs (rev-0.2)';
const BRAND_DESCRIPTION =
  'Software de IA que realmente ships*. Brand foundation, identidade e canais — open source.';

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
  title: BRAND_TITLE,
  description: BRAND_DESCRIPTION,
  alternates: {
    canonical: '/brand',
  },
  icons: {
    icon: [{ url: '/brand/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/brand/favicon.svg',
  },
  openGraph: {
    type: 'article',
    url: `${SITE.url}/brand`,
    siteName: SITE.name,
    title: BRAND_TITLE,
    description: BRAND_DESCRIPTION,
    images: [
      {
        url: '/brand/og.png',
        width: 1200,
        height: 630,
        alt: BRAND_TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: BRAND_TITLE,
    description: BRAND_DESCRIPTION,
    creator: '@donadaolabs',
    images: ['/brand/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface BrandLayoutProps {
  children: React.ReactNode;
}

export default function BrandLayout({ children }: BrandLayoutProps): React.ReactElement {
  return (
    <html
      lang="pt-BR"
      className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-ink text-offwhite antialiased">
        {children}
        <GoogleAnalytics />
        <ConsentBanner dict={getDictionary('pt')} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
