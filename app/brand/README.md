# Rota `/brand` — Brand Book

Página pública que publica o **brand book da Donadão Labs** em PDF, com preview embed e card social (Open Graph).

- **No ar:** https://donadaolabs.com/brand
- **Versão atual:** brand book **rev-0.2** (site rev-2.6.0 · 2026-05-29)
- **URL estável do PDF:** https://donadaolabs.com/brand/latest.pdf *(nunca muda — sempre aponta pra revisão atual)*

---

## Como funciona

| Peça | Arquivo | O que faz |
|------|---------|-----------|
| Página | [`page.tsx`](./page.tsx) | Hero, preview do PDF (iframe), grid de destaques, footer |
| Layout | [`layout.tsx`](./layout.tsx) | Fontes + meta tags Open Graph (card social) |
| PDF | `public/brand/brand-book-rev-0.2.pdf` | O brand book em si |
| Imagem do card | `public/brand/og.png` | Capa renderizada (1200×630) que aparece no WhatsApp/LinkedIn/X |
| URL estável | `next.config.mjs` → `rewrites()` | `/brand/latest.pdf` → arquivo da revisão atual |

> A rota vive **fora** de `app/[lang]/` (sem PT/EN). O `middleware.ts` já exclui `/brand` do redirect de idioma.

---

## 📋 Publicar uma revisão nova (ex.: rev-0.3)

Faça tudo a partir da raiz do projeto (`03-website-next/`).

### 1. Copiar o novo PDF
```bash
cp "/Users/donadao/Desktop/Donadao Labs Branding/rev-0.3/SEU-ARQUIVO.pdf" \
   public/brand/brand-book-rev-0.3.pdf
```

### 2. Apontar a URL estável pro novo arquivo
Em [`../../next.config.mjs`](../../next.config.mjs), no bloco `rewrites()`, troque **só o destination**:
```js
{
  source: '/brand/latest.pdf',
  destination: '/brand/brand-book-rev-0.3.pdf', // ← só isso muda
}
```
> ⚠️ **Não mude a `source`** (`/brand/latest.pdf`). Ela é o link público que você espalha por aí — tem que continuar igual.

### 3. Regenerar a imagem do card social (OG)
Precisa de `pdftoppm` (poppler) e `sips` (já vem no macOS):
```bash
PDF=public/brand/brand-book-rev-0.3.pdf
pdftoppm -png -f 1 -l 1 -scale-to-x 2400 "$PDF" /tmp/og-hi
sips --resampleWidth 1200 /tmp/og-hi-01.png --out /tmp/og-fit.png
sips --padToHeightWidth 630 1200 --padColor 070709 /tmp/og-fit.png --out public/brand/og.png
```
Confere o resultado: deve ser **1200×630**, fundo `#070709`.

### 4. Atualizar o texto da versão na página
- Em [`layout.tsx`](./layout.tsx): `BRAND_TITLE` e `BRAND_DESCRIPTION` (`rev-0.3`)
- Em [`page.tsx`](./page.tsx): o eyebrow `REV-0.3 · AAAA-MM-DD`, o `download="..."` e o "(1.3 MB · 24 páginas)" se mudou

### 5. Validar localmente
```bash
npm run typecheck && npm run lint && npm run build
npm run dev   # abre http://localhost:3000/brand
```
Confirme: a página abre, o PDF aparece no preview (iframe), o botão "Baixar PDF" baixa o arquivo certo.

### 6. Publicar (via @devops)
Versionamento do projeto: **rev-X.Y + entrada no CHANGELOG.md + tag git**.
O **@devops** faz o commit, push, PR/merge e tag — o deploy na Vercel é automático no merge da `main`.

> **Não faça `git push` direto.** Peça pro @devops (regra do projeto: só ele publica).

### 7. Conferir o card social (opcional)
Depois do deploy, cole `https://donadaolabs.com/brand` em:
- https://www.opengraph.xyz/ — mostra como o card aparece no Facebook/LinkedIn/X
- Ou manda o link pra você mesmo no WhatsApp e vê o preview

---

## ⚙️ Detalhes técnicos (não mexer sem motivo)

- **`X-Frame-Options: SAMEORIGIN`** (em `next.config.mjs`): necessário pro PDF renderizar dentro do iframe. Se voltar pra `DENY`, o preview quebra (aparece só o link de download).
- **Cores da marca:** verde `#00F57A`, roxo `#7B6BFF`. Regra firme: **nunca misturar verde + roxo no mesmo elemento** (no card "ships*", o `ships` é verde e o `*` é roxo — elementos separados).
- **OG image:** sempre 1200×630. O card social não funciona bem em outras proporções.
