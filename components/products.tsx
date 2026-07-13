import Image from 'next/image';
import { CaseMark } from '@/components/case-mark';
import { SectionHeader } from '@/components/section-header';
import { TrackedProductLink } from '@/components/tracked-product-link';
import { PRODUCTS, type Product } from '@/lib/constants';
import type { Dictionary } from '@/lib/i18n';

type ProductLabels = Dictionary['products'];
type ProductItem = ProductLabels['items'][number];

interface ProductsProps {
  dict: Dictionary;
}

/** Domínio limpo pra exibir como âncora textual (sem www, sem protocolo). */
function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/**
 * Card do produto próprio (tier `product`) — peso de case, mas em ROXO (layer
 * Products do brand book). Nunca mistura verde e roxo no mesmo elemento.
 */
function ProductCard({ p, item, labels }: { p: Product; item?: ProductItem; labels: ProductLabels }): React.ReactElement {
  return (
    <TrackedProductLink
      href={p.url}
      contentType="own_product"
      itemId={p.slug}
      ariaLabel={`${p.name} — ${item?.title ?? ''}`}
      className="group flex flex-col rounded-brand-lg border border-white/[0.08] bg-charcoal p-6 text-offwhite no-underline transition-all duration-200 hover:-translate-y-1 hover:border-purple hover:shadow-card-hover-purple focus-visible:-translate-y-1 focus-visible:border-purple focus-visible:shadow-card-hover-purple"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-purple">
          <span aria-hidden="true">◆</span>
          {p.status === 'live' ? labels.liveLabel : labels.buildingLabel}
        </span>
        <span className="font-mono text-[10px] text-offwhite/40">{hostname(p.url)}</span>
      </div>

      <div className="mb-4 flex items-center gap-3">
        {p.logo ? (
          <Image
            src={p.logo}
            alt={p.name}
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 object-contain"
          />
        ) : (
          <span className="flex shrink-0 text-purple">
            <CaseMark shape="grid" />
          </span>
        )}
        <span className="font-display text-[26px] font-bold leading-none tracking-brand-tight text-offwhite">
          {p.name}
        </span>
      </div>

      {item?.tag && (
        <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-offwhite/55">
          {item.tag}
        </div>
      )}
      {item?.title && (
        <h3 className="m-0 font-display text-[22px] font-semibold tracking-brand-tight">{item.title}</h3>
      )}
      <p className="mt-2.5 text-sm leading-relaxed text-offwhite/55">{item?.body}</p>

      {p.stack && (
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-dashed border-white/[0.08] pt-4">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/[0.08] px-2 py-0.5 font-mono text-[10px] text-offwhite/55"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </TrackedProductLink>
  );
}

/**
 * Faixa playground (tier `playground`) — peso visual menor que um case de
 * cliente: uma linha por jogo, badge ◆ playground. Protege o posicionamento
 * (os jogos não competem com os cases pagos).
 */
function PlaygroundStrip({
  games,
  labels,
}: {
  games: { p: Product; item?: ProductItem }[];
  labels: ProductLabels;
}): React.ReactElement {
  return (
    <div className="flex flex-col rounded-brand-lg border border-white/[0.08] bg-charcoal p-6">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-purple">
        {labels.playgroundEyebrow}
      </div>
      <p className="mb-4 text-sm leading-relaxed text-offwhite/55">{labels.playgroundSub}</p>
      <div className="mt-auto flex flex-col divide-y divide-white/[0.08] border-t border-white/[0.08]">
        {games.map(({ p, item }) => (
          <TrackedProductLink
            key={p.slug}
            href={p.url}
            contentType="playground"
            itemId={p.slug}
            ariaLabel={`${p.name} — ${item?.body ?? ''}`}
            className="group flex items-center justify-between gap-3 py-3.5 no-underline"
          >
            <span className="min-w-0 text-sm">
              <strong className="font-semibold text-offwhite transition-colors group-hover:text-purple">
                {p.name}
              </strong>
              <span className="text-offwhite/55"> — {item?.body}</span>
            </span>
            <span className="shrink-0 whitespace-nowrap font-mono text-[11px] text-offwhite/40 transition-colors group-hover:text-purple">
              {hostname(p.url)} →
            </span>
          </TrackedProductLink>
        ))}
      </div>
    </div>
  );
}

export function Products({ dict }: ProductsProps): React.ReactElement {
  const t = dict.products;
  const indexed = PRODUCTS.map((p, i) => ({ p, item: t.items[i] }));
  const featured = indexed.filter(({ p }) => p.tier === 'product');
  const playground = indexed.filter(({ p }) => p.tier === 'playground');

  return (
    <section id="produtos" className="mt-6 border-t border-white/[0.08]">
      <SectionHeader idx="06" eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
      <div className="grid grid-cols-1 items-stretch gap-4 px-6 pb-6 md:grid-cols-2 md:px-10">
        {featured.map(({ p, item }) => (
          <ProductCard key={p.slug} p={p} item={item} labels={t} />
        ))}
        {playground.length > 0 && <PlaygroundStrip games={playground} labels={t} />}
      </div>
    </section>
  );
}
