'use client';

import { event as gaEvent } from '@/lib/gtag';

interface TrackedProductLinkProps {
  href: string;
  /** Vai pro GA4 `select_content` — distingue produto próprio de playground. */
  contentType: 'own_product' | 'playground';
  /** Slug do produto (`item_id` no GA4). */
  itemId: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

/**
 * Link externo pra um produto próprio que dispara `select_content` no GA4 ao ser
 * clicado — é o critério de reversão da seção (medir clique por produto sem
 * atrair lead anti-ICP). Sempre abre em nova aba com `rel="noopener noreferrer"`.
 */
export function TrackedProductLink({
  href,
  contentType,
  itemId,
  className,
  ariaLabel,
  children,
}: TrackedProductLinkProps): React.ReactElement {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={() => gaEvent('select_content', { content_type: contentType, item_id: itemId })}
    >
      {children}
    </a>
  );
}
