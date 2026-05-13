# Deploy do agent ao vivo

Guia passo-a-passo pra colocar o **agent de diagnóstico** do site no ar com:

- **Anthropic Haiku 4.5** rodando o diagnóstico
- **Upstash Redis** controlando cap diário (100/dia) + rate-limit + email gate
- **Z-API** mandando notificação no seu WhatsApp em cada interação

Tempo estimado: **~30 minutos** se for a primeira vez. **~10 minutos** se você já usa Vercel.

---

## 1. Provisionar as 3 contas

### 1.1 Anthropic (chave de API)
1. Vai em [console.anthropic.com](https://console.anthropic.com) → **API Keys** → **Create Key**.
2. Copia a chave (`sk-ant-...`) — só aparece uma vez.
3. Adiciona crédito no billing (US$ 10 já dá pra ~3.000 diagnósticos com Haiku).

### 1.2 Upstash Redis (rate-limit + estado)
1. [upstash.com](https://upstash.com) → **Create Database** → escolhe região mais próxima (São Paulo ou US-east).
2. Modo **Regional** (mais barato) e tipo **Free**.
3. Na página do banco, vai em **REST API** e copia:
   - **UPSTASH_REDIS_REST_URL** → vai virar `UPSTASH_REDIS_URL`
   - **UPSTASH_REDIS_REST_TOKEN** → vai virar `UPSTASH_REDIS_TOKEN`

### 1.3 Z-API (WhatsApp)
1. [z-api.io](https://z-api.io) → cria conta → cria uma **instância**.
2. Conecta sua conta de WhatsApp escaneando o QR (igual WhatsApp Web).
3. Na página da instância, copia:
   - **Instance ID** → `ZAPI_INSTANCE_ID`
   - **Token** → `ZAPI_TOKEN`
   - Se aparecer um **Client Token / Account Token**, copia → `ZAPI_CLIENT_TOKEN`
4. Seu próprio número (que vai receber as notificações), no formato `55DDDNUMERO` sem o `+` nem espaço. Ex: `5511987654321`.

> **Alternativa**: se preferir Twilio WhatsApp ou Meta Cloud API, abre [app/api/diagnose/route.ts](app/api/diagnose/route.ts) e edita a função `notifyWhatsApp`. A interface é a mesma — só troca a URL e os headers.

---

## 2. Configurar local (testar antes de subir)

```bash
# Na raiz do projeto
cp .env.example .env.local
# Edita .env.local e cola as chaves
```

```bash
npm run dev
# acesse http://localhost:3000 — o agent já chama /api/diagnose
```

Quando você usar o agent no site, o servidor de dev faz a chamada real pra Anthropic + Upstash + Z-API. Confere se você recebe o WhatsApp.

---

## 3. Deploy no Vercel

1. `git push` o repositório.
2. [vercel.com/new](https://vercel.com/new) → importa o repo.
3. Em **Settings → Environment Variables**, cola **todas** as variáveis do `.env.example` com os valores reais. Marca **Production**, **Preview** e **Development**.
4. **Deploy**.

Em ~2 minutos o site sobe. Teste rodando uma pergunta no agent — você deve receber a notificação no WhatsApp em ~3 segundos.

---

## 4. Como o fluxo funciona em produção

```
visitante → site → POST /api/diagnose { question, clientId }
                ↓
        [cap diário < 100?] ── não → 429 DAILY_CAP
                ↓ sim
        [rate-limit IP?]    ── ativo → 429 RATE_LIMIT
                ↓ ok
        [já fez 1 pergunta antes E não tem email?] ── sim → 403 NEED_EMAIL
                ↓ não
        chama Anthropic Haiku → diagnóstico estruturado
                ↓
        INCR cap_hoje, SET asked[clientId]
                ↓
        🚨 notifica seu WhatsApp ← (não bloqueia resposta)
                ↓
        devolve { diagnostic } pro frontend
```

Após receber o diagnóstico, o frontend mostra o email gate. Se o visitante:
- Preencher email → POST `/api/diagnose` com `action: 'register-email'` → você recebe outro WhatsApp com o lead completo.
- Tentar 2ª pergunta sem email → o frontend trava localmente. Se ele bypassar o JS, o backend bate 403.

---

## 5. Custo estimado

Com 100 diagnósticos/dia (cap máximo):
- **Anthropic Haiku**: ~US$ 0.30/dia → **~US$ 9/mês**
- **Upstash Redis**: free tier cobre folgado
- **Z-API**: depende do plano. O básico é ~R$ 50/mês.
- **Vercel**: free tier cobre

**Total: ~R$ 100/mês no cap máximo.** Subindo o cap, o custo é linear em Haiku.

---

## 6. Ajustes que você provavelmente vai querer

Tudo no topo de [app/api/diagnose/route.ts](app/api/diagnose/route.ts):

```ts
const DAILY_CAP = 100;          // → muda o cap
const RATE_LIMIT_SECONDS = 10;  // → muda o cooldown por IP
const MODEL = 'claude-haiku-4-5';  // → trocar pra sonnet se quiser mais qualidade
const MAX_TOKENS = 500;         // → cap de tokens da resposta
```

Textos das mensagens (cap atingido, email gate, etc) ficam em [lib/constants.ts](lib/constants.ts) → `AGENT`.

---

## 7. Como ver os leads acumulados

A função grava tudo no Upstash. Pra ver:

1. [console.upstash.com](https://console.upstash.com) → seu banco → **Data Browser**
2. Procura por chaves:
   - `dl:cid:*:email` — todos os emails capturados
   - `dl:cid:*:asked` — todos os clientIds que rodaram diagnóstico
   - `dl:cap:YYYY-MM-DD` — contador do dia

Pra um painel mais bonito, próximo passo é criar uma rota `/api/leads` autenticada que lista as chaves do dia. Me chama quando quiser que eu monte.

---

## 8. Troubleshooting

- **"AI provider error"** → cheque `ANTHROPIC_API_KEY` e crédito no console.
- **WhatsApp não chega** → entra no painel Z-API e veja se a instância tá conectada (QR ativo). Se desconectou, escaneia de novo.
- **Cap nunca zera / sempre rate-limit** → variáveis de Upstash erradas. O fallback in-memory funciona em dev mas em produção precisa do Upstash real (cada cold start zera).
- **Agent funciona localmente mas não em produção** → confere as env vars no Vercel (Settings → Environment Variables). Se a chave for nova, faça um redeploy pra ela ser puxada.
- **`/api/diagnose` retorna 502 em dev** → significa que `ANTHROPIC_API_KEY` não tá no `.env.local`. Coloca a chave e reinicia `npm run dev`.
