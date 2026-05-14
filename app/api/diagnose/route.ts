/**
 * /api/diagnose — agent de diagnóstico (rev-2.0)
 *
 * O QUE FAZ:
 *   - Recebe POST { action, question, email, clientId }
 *   - Cap diário global de 100 diagnósticos (configurável)
 *   - Rate-limit de 10s por IP
 *   - Email gate: 2ª pergunta sem email → 403 NEED_EMAIL
 *   - Chama Anthropic Claude Haiku 4.5
 *   - Notifica founder via WhatsApp (Z-API)
 *
 * VARS DE AMBIENTE (ver .env.example):
 *   ANTHROPIC_API_KEY      chave do console.anthropic.com
 *   UPSTASH_REDIS_URL      REST URL do banco upstash.com
 *   UPSTASH_REDIS_TOKEN    REST token do mesmo banco
 *   TELEGRAM_BOT_TOKEN     token do bot criado no @BotFather
 *   TELEGRAM_CHAT_ID       seu chat ID (descobre via @userinfobot)
 *   ZAPI_INSTANCE_ID       ID da instância z-api.io        (opcional)
 *   ZAPI_TOKEN             token da instância z-api.io     (opcional)
 *   ZAPI_CLIENT_TOKEN      account token do z-api          (opcional)
 *   FOUNDER_WHATSAPP       seu número, formato 55DDDNUMERO (opcional)
 *
 * Canais de notificação são opcionais e independentes — preencha os env
 * vars do(s) canal(is) que quiser usar. Se nenhum estiver configurado, a
 * função apenas loga no console do servidor.
 */

import { NextResponse, type NextRequest } from 'next/server';

const DAILY_CAP = 100;
const RATE_LIMIT_SECONDS = 10;
const MODEL = 'claude-haiku-4-5';
const MAX_TOKENS = 500;
const ASKED_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 dias

export const runtime = 'nodejs';

interface DiagnoseBody {
  action?: 'diagnose' | 'register-email';
  question?: string;
  email?: string | null;
  clientId?: string;
}

interface ErrorPayload {
  code?: 'NEED_EMAIL' | 'DAILY_CAP' | 'RATE_LIMIT';
  message: string;
  detail?: string;
}

export async function POST(req: NextRequest): Promise<Response> {
  let body: DiagnoseBody;
  try {
    body = (await req.json()) as DiagnoseBody;
  } catch {
    return json({ message: 'invalid json' }, 400);
  }

  const action = body.action ?? 'diagnose';
  const { question, email, clientId } = body;

  if (!clientId || typeof clientId !== 'string' || clientId.length > 80) {
    return json({ message: 'clientId required' }, 400);
  }

  const ip =
    (req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? '')
      .split(',')[0]
      .trim() || '0.0.0.0';
  const ua = (req.headers.get('user-agent') ?? '').slice(0, 200);

  // ─── register-email ────────────────────────────────────────────────────────
  if (action === 'register-email') {
    if (!isEmail(email)) return json({ message: 'invalid email' }, 400);
    await redis('SET', [
      `dl:cid:${clientId}:email`,
      email!,
      'EX',
      String(ASKED_TTL_SECONDS),
    ]);
    await notify(
      `📩 EMAIL CAPTURADO\n` +
        `cid: ${clientId.slice(0, 8)}\n` +
        `email: ${email}\n` +
        `IP: ${ip}\n` +
        `(visitante já tinha rodado um diagnóstico)`,
    );
    return json({ ok: true }, 200);
  }

  // ─── diagnose ──────────────────────────────────────────────────────────────
  if (!question || typeof question !== 'string' || question.length < 4 || question.length > 1000) {
    return json({ message: 'question must be 4–1000 chars' }, 400);
  }

  // 1) cap diário global
  const today = new Date().toISOString().slice(0, 10);
  const capKey = `dl:cap:${today}`;
  const used = parseInt(((await redis('GET', [capKey])) as string | null) ?? '0', 10);
  if (used >= DAILY_CAP) {
    return json({ code: 'DAILY_CAP', message: 'daily limit reached' }, 429);
  }

  // 2) rate-limit por IP
  const rlKey = `dl:rl:${ip}`;
  if (await redis('GET', [rlKey])) {
    return json({ code: 'RATE_LIMIT', message: 'too fast' }, 429);
  }
  await redis('SET', [rlKey, '1', 'EX', String(RATE_LIMIT_SECONDS)]);

  // 3) email gate por clientId
  const askedKey = `dl:cid:${clientId}:asked`;
  const emailKey = `dl:cid:${clientId}:email`;
  const [askedBefore, storedEmail] = await Promise.all([
    redis('GET', [askedKey]) as Promise<string | null>,
    redis('GET', [emailKey]) as Promise<string | null>,
  ]);
  const effectiveEmail = (isEmail(email) ? email! : null) ?? storedEmail ?? null;
  if (askedBefore && !effectiveEmail) {
    return json({ code: 'NEED_EMAIL', message: 'email required to continue' }, 403);
  }

  // 4) Anthropic
  let diagnostic: string;
  try {
    diagnostic = await callAnthropic(question);
  } catch (e) {
    const msg = (e as Error).message;
    console.error('[anthropic]', msg);
    return json({ message: 'AI provider error', detail: msg }, 502);
  }

  // 5) persiste estado + incrementa cap
  await redis('SET', [askedKey, '1', 'EX', String(ASKED_TTL_SECONDS)]);
  if (effectiveEmail && !storedEmail) {
    await redis('SET', [emailKey, effectiveEmail, 'EX', String(ASKED_TTL_SECONDS)]);
  }
  await redis('INCR', [capKey]);
  await redis('EXPIRE', [capKey, String(60 * 60 * 26)]);

  // 6) notifica founder em todos os canais configurados.
  // Awaited (não fire-and-forget) — em Vercel serverless o processo morre
  // assim que a resposta sai, descartando promises pendentes.
  await notify(
    `🔥 NOVO DIAGNÓSTICO\n` +
      `cid: ${clientId.slice(0, 8)}\n` +
      `email: ${effectiveEmail ?? '(não fornecido — gate ativa na 2ª pergunta)'}\n` +
      `IP: ${ip}\n` +
      `UA: ${ua.slice(0, 60)}\n` +
      `cap: ${used + 1}/${DAILY_CAP}\n\n` +
      `PERGUNTA:\n${question.slice(0, 400)}\n\n` +
      `RESPOSTA:\n${diagnostic.slice(0, 700)}`,
  );

  return json({ ok: true, diagnostic, capRemaining: DAILY_CAP - used - 1 }, 200);
}

export async function OPTIONS(): Promise<Response> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function json(payload: Record<string, unknown> | ErrorPayload, status = 200): Response {
  return NextResponse.json(payload, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

function isEmail(s: unknown): s is string {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 120;
}

interface AnthropicResponse {
  content?: ReadonlyArray<{ text: string }>;
  error?: { message: string };
}

async function callAnthropic(question: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY missing');

  const prompt = [
    'Você é o agent de diagnóstico do Donadão Labs (lab brasileiro de software AI-first).',
    'Responda EM PORTUGUÊS, tom direto, sem firula. Devolva NESSE FORMATO EXATO,',
    'cada bloco em uma linha curta separada por quebra de linha simples:',
    '',
    'DIAGNÓSTICO: <1 frase, ≤18 palavras>',
    'SOLUÇÃO: <1 frase, ≤18 palavras>',
    'STACK SUGERIDA: <3-4 itens separados por vírgula>',
    'PRAZO: <faixa em semanas>',
    'PRÓXIMO PASSO: <call to action>',
    '',
    'Problema: ' + question,
  ].join('\n');

  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = (await r.json()) as AnthropicResponse;
  if (!r.ok) throw new Error(data.error?.message ?? 'Anthropic error');
  return (data.content?.[0]?.text ?? '').trim();
}

// Fan-out: dispara pra todos os canais configurados em paralelo.
// Cada canal individual checa suas próprias env vars e skipa se não houver.
//
// Awaited (não fire-and-forget): em Vercel/serverless, qualquer trabalho
// pendente depois do `return` é descartado quando a função termina. Isso
// fazia o Telegram nunca chegar em produção. Adicionar ~500ms na resposta
// é trade-off aceitável pra garantir que cada lead/diagnóstico notifique.
async function notify(text: string): Promise<void> {
  await Promise.allSettled([
    notifyTelegram(text).catch((e) => console.error('[telegram]', (e as Error).message)),
    notifyWhatsApp(text).catch((e) => console.error('[whatsapp]', (e as Error).message)),
  ]);
}

async function notifyTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (isPlaceholder(token) || isPlaceholder(chatId)) {
    return; // canal não configurado — segue em frente em silêncio
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!r.ok) {
    const t = await r.text();
    throw new Error(`telegram ${r.status}: ${t.slice(0, 200)}`);
  }
}

async function notifyWhatsApp(text: string): Promise<void> {
  const instance = process.env.ZAPI_INSTANCE_ID;
  const token = process.env.ZAPI_TOKEN;
  const phone = process.env.FOUNDER_WHATSAPP;
  const clientToken = process.env.ZAPI_CLIENT_TOKEN;

  if (isPlaceholder(instance) || isPlaceholder(token) || isPlaceholder(phone)) {
    console.warn('[notifyWhatsApp] env vars missing or placeholder — skipping');
    return;
  }

  const url = `https://api.z-api.io/instances/${instance}/token/${token}/send-text`;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (clientToken) headers['Client-Token'] = clientToken;

  const r = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ phone, message: text }),
  });

  if (!r.ok) {
    const t = await r.text();
    throw new Error(`z-api ${r.status}: ${t.slice(0, 200)}`);
  }
}

// ─── Upstash Redis REST (sem SDK) ─────────────────────────────────────────
// Em produção, configure UPSTASH_REDIS_URL + UPSTASH_REDIS_TOKEN.
// Em dev sem credenciais, cai pro fallback in-memory (não persiste em cold start).

type RedisCommand = 'GET' | 'SET' | 'INCR' | 'EXPIRE';

function isPlaceholder(v: string | undefined): boolean {
  if (!v) return true;
  return v.endsWith('...') || v.includes('xxx') || v.includes('YOUR_');
}

async function redis(cmd: RedisCommand, args: string[] = []): Promise<unknown> {
  // Aceita os dois nomes: o que o Upstash exporta (UPSTASH_REDIS_REST_*) e o
  // nome mais curto que era a convenção antiga. Evita surpresa quando colando
  // o snippet do painel Upstash direto no .env.
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.UPSTASH_REDIS_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.UPSTASH_REDIS_TOKEN;
  if (isPlaceholder(url) || isPlaceholder(token)) return memoryStore(cmd, args);

  const path = args.map(encodeURIComponent).join('/');
  const r = await fetch(`${url}/${cmd}/${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = (await r.json()) as { result?: unknown; error?: string };

  // Misconfig fail-loud: rate-limit/cap/email-gate dependem de ler/escrever
  // estado. Se o Upstash rejeitar (WRONGPASS, token errado, etc), seguir
  // adiante deixa o agent sem proteção. Melhor explodir uma vez e investigar.
  if (!r.ok || data.error) {
    throw new Error(`Upstash ${r.status}: ${data.error ?? r.statusText}`);
  }

  return data.result;
}

interface MemEntry {
  value: string;
  expiresAt: number | null;
}

const _mem: Map<string, MemEntry> =
  (globalThis as { __dl_mem?: Map<string, MemEntry> }).__dl_mem ??
  ((globalThis as { __dl_mem?: Map<string, MemEntry> }).__dl_mem = new Map());

function memGet(key: string): string | null {
  const e = _mem.get(key);
  if (!e) return null;
  if (e.expiresAt !== null && Date.now() > e.expiresAt) {
    _mem.delete(key);
    return null;
  }
  return e.value;
}

function memoryStore(cmd: RedisCommand, args: string[]): string | number | null {
  if (cmd === 'GET') return memGet(args[0]);
  if (cmd === 'SET') {
    // SET key value [EX seconds]
    const exIdx = args.findIndex((a) => a === 'EX');
    const ttl = exIdx >= 0 ? parseInt(args[exIdx + 1] ?? '0', 10) : 0;
    _mem.set(args[0], {
      value: args[1],
      expiresAt: ttl > 0 ? Date.now() + ttl * 1000 : null,
    });
    return 'OK';
  }
  if (cmd === 'INCR') {
    const prev = parseInt(memGet(args[0]) ?? '0', 10);
    const v = prev + 1;
    const existing = _mem.get(args[0]);
    _mem.set(args[0], {
      value: v.toString(),
      expiresAt: existing?.expiresAt ?? null,
    });
    return v;
  }
  if (cmd === 'EXPIRE') {
    // EXPIRE key seconds
    const entry = _mem.get(args[0]);
    if (!entry) return 0;
    const ttl = parseInt(args[1] ?? '0', 10);
    entry.expiresAt = ttl > 0 ? Date.now() + ttl * 1000 : null;
    return 1;
  }
  return null;
}
