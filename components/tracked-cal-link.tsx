'use client';

import { event as gaEvent } from '@/lib/gtag';

interface TrackedCalLinkProps {
  href: string;
  /** Identifica de onde o clique partiu no GA4 (`cta_location`). */
  location: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Link externo para o cal.com que dispara o evento de conversão `generate_lead`
 * no GA4 ao ser clicado. A conversão real acontece fora do site (agendamento no
 * cal.com), então marcamos o clique como sinal de intenção.
 *
 * Sempre abre em nova aba com `rel="noopener noreferrer"`.
 */
export function TrackedCalLink({
  href,
  location,
  className,
  children,
}: TrackedCalLinkProps): React.ReactElement {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => gaEvent('generate_lead', { cta_location: location, currency: 'BRL' })}
    >
      {children}
    </a>
  );
}
