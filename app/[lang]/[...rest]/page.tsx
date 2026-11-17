import { notFound } from 'next/navigation';

/**
 * Pega-tudo de /[lang]/qualquer-coisa. Sem ele, um endereço inexistente caía
 * no 404 padrão do Next (sem marca e estático, com os scripts barrados pela
 * CSP por não ter nonce) e o `app/[lang]/not-found.tsx` nunca renderizava.
 * Chamando `notFound()` aqui, o 404 da marca roda dentro do layout de [lang],
 * que injeta o nonce. O status HTTP continua 404.
 */
export default function CatchAllNotFound(): never {
  notFound();
}
