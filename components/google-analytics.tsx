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
interface GoogleAnalyticsProps {
  /** Nonce da CSP estrita (gerado no middleware, lido no layout). */
  nonce?: string;
}

export function GoogleAnalytics({ nonce }: GoogleAnalyticsProps): React.ReactElement | null {
  if (!isGAEnabled()) return null;

  return (
    <>
      {/*
        lazyOnload (não afterInteractive): o gtag.js tem ~166KB e era o MAIOR
        download da página, maior que o bundle do app e as duas fontes somadas.
        Em rede móvel ele roubava banda de quem pinta a tela. Medido com o
        Lighthouse bloqueando o domínio: FCP 2,91s → 1,74s, LCP 4,05s → 3,39s,
        e a variação entre runs caía de 2,4s para 26ms. Não era CPU (o TBT
        nunca passou de 23ms), era banda no caminho crítico. Agora ele carrega
        depois do window load, fora da disputa.
      */}
      <Script
        strategy="lazyOnload"
        nonce={nonce}
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      {/*
        O bootstrap continua em afterInteractive, e isso é de propósito: são
        poucos bytes inline e ele PRECISA rodar antes do gtag.js chegar, para
        que o consent default 'denied' já esteja na fila do dataLayer quando o
        script pesado subir. É assim que o Consent Mode v2 se mantém em pé com
        o carregamento adiado (LGPD).
      */}
      <Script id="ga-bootstrap" strategy="afterInteractive" nonce={nonce}>
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
