import Image from 'next/image';
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
 * Card de produto próprio — mesmo formato/tamanho dos cards de Cases: thumbnail
 * fixo de 180px (aqui com a FOTOGRAFIA do produto/jogo), meta, título, descrição
 * e stack. PregApp (tier `product`) e os jogos (tier `playground`) usam o mesmo
 * card; a cor do layer Products é ROXA (nunca mistura verde e roxo).
 */
function ProductCard({ p, item, labels }: { p: Product; item?: ProductItem; labels: ProductLabels }): React.ReactElement {
  const statusLabel = p.status === 'live' ? labels.liveLabel : labels.buildingLabel;
  return (
    <TrackedProductLink
      href={p.url}
      contentType={p.tier === 'product' ? 'own_product' : 'playground'}
      itemId={p.slug}
      ariaLabel={`${p.name} — ${item?.title ?? item?.body ?? ''}`}
      className="group block rounded-brand-lg border border-white/[0.08] bg-charcoal p-6 text-offwhite no-underline transition-all duration-200 hover:-translate-y-1 hover:border-purple hover:shadow-card-hover-purple focus-visible:-translate-y-1 focus-visible:border-purple focus-visible:shadow-card-hover-purple"
    >
      {/* Thumbnail — preview numa "janela de navegador" sobre um fundo com grid:
          um retângulo (a telinha) dentro do retângulo (o thumb), com respiro. */}
      <div className="relative mb-4.5 h-[180px] overflow-hidden rounded-[8px] border border-white/[0.08] bg-ink transition-colors duration-200 group-hover:border-purple/40 group-focus-visible:border-purple/40">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint opacity-50" />
        <div className="absolute inset-3.5 flex flex-col overflow-hidden rounded-[6px] border border-white/[0.12] bg-charcoal shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:-translate-y-0.5">
          {/* Barra da janela */}
          <div className="flex items-center gap-2 border-b border-white/[0.08] bg-ink/70 px-2.5 py-1.5">
            <span className="flex gap-1" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
            </span>
            <span className="ml-1 flex-1 truncate font-mono text-[9px] text-offwhite/35">
              {hostname(p.url)}
            </span>
          </div>
          {/* Preview: produto = lockup de marca (logo + tagline); jogo = screenshot */}
          <div className="relative flex-1 overflow-hidden bg-ink">
            {p.tier === 'product' ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-4 text-center">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_135%,rgba(0,245,122,0.12),transparent_55%)]" />
                {p.logo && (
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={44}
                    height={44}
                    className="relative h-11 w-11 object-contain"
                  />
                )}
                <span className="relative font-display text-[20px] font-bold leading-none tracking-brand-tight text-offwhite">
                  {p.name}
                </span>
                {item?.tagline && (
                  <span className="relative font-['Instrument_Serif',Georgia,serif] text-[15px] italic leading-tight text-offwhite/70">
                    {item.tagline}
                  </span>
                )}
              </div>
            ) : (
              p.shot && (
                <Image
                  src={p.shot}
                  alt={`${p.name} — captura de tela`}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover object-top"
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Meta: status (roxo). O domínio fica na barra da janela do preview. */}
      <div className="mb-2.5 flex items-center gap-3">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-purple">
          <span aria-hidden="true">◆</span>
          {statusLabel}
        </span>
      </div>

      <h3 className="m-0 font-display text-[22px] font-semibold tracking-brand-tight">
        {item?.title ?? p.name}
      </h3>
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

export function Products({ dict }: ProductsProps): React.ReactElement {
  const t = dict.products;
  const indexed = PRODUCTS.map((p, i) => ({ p, item: t.items[i] }));

  return (
    <section id="produtos" className="mt-6 border-t border-white/[0.08]">
      <SectionHeader idx="04" eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
      <div className="grid grid-cols-1 items-stretch gap-4 px-6 pb-6 md:grid-cols-2 md:px-10">
        {indexed.map(({ p, item }) => (
          <ProductCard key={p.slug} p={p} item={item} labels={t} />
        ))}
      </div>
    </section>
  );
}
