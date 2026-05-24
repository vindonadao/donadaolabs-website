'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { GA_MEASUREMENT_ID, isGAEnabled, pageview } from '@/lib/gtag';

/**
 * Track pageview em rota change. Em App Router não tem `router.events.on`,
 * então hooka usePathname + useSearchParams (re-roda em qualquer mudança).
 */
function PageviewTracker(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const qs = searchParams?.toString();
    pageview(qs ? `${pathname}?${qs}` : pathname);
  }, [pathname, searchParams]);

  return null;
}

/**
 * Injeta gtag.js + bootstrap do Consent Mode v2.
 * Renderiza nada se NEXT_PUBLIC_GA_MEASUREMENT_ID não estiver configurado.
 *
 * Default consent = todos denied (LGPD compliance). ConsentBanner atualiza
 * pra granted quando o visitante aceita.
 */
export function GoogleAnalytics(): React.ReactElement | null {
  if (!isGAEnabled()) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="ga-bootstrap" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true,
            send_page_view: false
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
    </>
  );
}
