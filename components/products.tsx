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
      className="group flex flex-col rounded-brand-lg border border-white/[0.08] bg-charcoal p-6 text-offwhite no-underline transition-all duration-200 hover:-translate-y-1 hover:border-purple hover:shadow-card-hover-purple focus-visible:-translate-y-1 focus-visible:border-purple focus-visible:shadow-card-hover-purple md:p-7"
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
      <p className="mt-2.5 max-w-[560px] text-sm leading-relaxed text-offwhite/55">{item?.body}</p>

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
 * Card de jogo (tier `playground`) — agora com a FOTOGRAFIA do jogo no topo
 * (16:9), pra provar que a engenharia é real e usável. Peso menor que o
 * ProductCard (sem stack, badge ◆), mas com destaque visual próprio.
 */
function GameCard({ p, item, labels }: { p: Product; item?: ProductItem; labels: ProductLabels }): React.ReactElement {
  return (
    <TrackedProductLink
      href={p.url}
      contentType="playground"
      itemId={p.slug}
      ariaLabel={`${p.name} — ${item?.body ?? ''}`}
      className="group flex flex-col overflow-hidden rounded-brand-lg border border-white/[0.08] bg-charcoal text-offwhite no-underline transition-all duration-200 hover:-translate-y-1 hover:border-purple hover:shadow-card-hover-purple focus-visible:-translate-y-1 focus-visible:border-purple focus-visible:shadow-card-hover-purple"
    >
      {p.shot && (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/[0.08] bg-ink">
          <Image
            src={p.shot}
            alt={`${p.name} — captura de tela do jogo`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-purple">
            <span aria-hidden="true">◆</span>
            {p.status === 'live' ? labels.liveLabel : labels.buildingLabel}
          </span>
          <span className="font-mono text-[10px] text-offwhite/40">{hostname(p.url)}</span>
        </div>
        <span className="font-display text-[22px] font-bold leading-none tracking-brand-tight text-offwhite">
          {p.name}
        </span>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-offwhite/55">{item?.body}</p>
        <span className="mt-3.5 inline-flex items-center gap-1.5 font-mono text-[11px] text-offwhite/40 transition-colors group-hover:text-purple">
          {labels.playCta} →
        </span>
      </div>
    </TrackedProductLink>
  );
}

export function Products({ dict }: ProductsProps): React.ReactElement {
  const t = dict.products;
  const indexed = PRODUCTS.map((p, i) => ({ p, item: t.items[i] }));
  const featured = indexed.filter(({ p }) => p.tier === 'product');
  const playground = indexed.filter(({ p }) => p.tier === 'playground');

  return (
    <section id="produtos" className="border-t border-white/[0.08]">
      <SectionHeader idx="04" eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
      <div className="flex flex-col gap-6 px-6 pb-6 md:px-10">
        {/* Produto próprio em destaque (PregApp) */}
        <div className="grid grid-cols-1 gap-4">
          {featured.map(({ p, item }) => (
            <ProductCard key={p.slug} p={p} item={item} labels={t} />
          ))}
        </div>

        {/* Playground — jogos próprios, agora com fotografia */}
        {playground.length > 0 && (
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-purple">
              <span aria-hidden="true">◆</span>
              {t.playgroundEyebrow}
            </div>
            <p className="mb-4 max-w-[680px] text-sm leading-relaxed text-offwhite/55">
              {t.playgroundSub}
            </p>
            <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2">
              {playground.map(({ p, item }) => (
                <GameCard key={p.slug} p={p} item={item} labels={t} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
