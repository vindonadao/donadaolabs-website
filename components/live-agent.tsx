'use client';

import { useEffect, useRef, useState } from 'react';
import { AGENT, LINKS } from '@/lib/constants';

type BlockKind = '' | 'cap' | 'rate';

interface AgentState {
  askedOnce: boolean;
  email: string;
}

interface CallPayload {
  question: string;
  email: string | null;
  clientId: string;
}

interface CallResult {
  diagnostic?: string;
  source?: string;
}

interface CallError extends Error {
  code?: 'NEED_EMAIL' | 'DAILY_CAP' | 'RATE_LIMIT';
  fallback?: boolean;
}

// Stable clientId per browser. The backend keys rate-limit and "asked-once"
// state off this UUID so the same visitor can't drive-by spam by closing
// the tab.
function getClientId(): string {
  try {
    const KEY = 'dl_cid';
    let id = localStorage.getItem(KEY);
    if (!id) {
      id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `cid-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return 'cid-anon';
  }
}

function loadState(): AgentState {
  try {
    const raw = localStorage.getItem('dl_agent_state');
    return raw ? (JSON.parse(raw) as AgentState) : { askedOnce: false, email: '' };
  } catch {
    return { askedOnce: false, email: '' };
  }
}

function saveState(s: AgentState): void {
  try {
    localStorage.setItem('dl_agent_state', JSON.stringify(s));
  } catch {
    /* localStorage unavailable */
  }
}

async function callAgent(payload: CallPayload): Promise<CallResult> {
  const res = await fetch(AGENT.apiEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    throw Object.assign(new Error('not-deployed'), { fallback: true } satisfies Partial<CallError>);
  }
  const data = (await res.json()) as CallResult & { message?: string; code?: CallError['code'] };
  if (!res.ok) {
    throw Object.assign(new Error(data.message ?? 'Erro'), { code: data.code });
  }
  return data;
}

async function registerEmail(payload: { email: string; clientId: string }): Promise<void> {
  try {
    await fetch(AGENT.apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'register-email', ...payload }),
    });
  } catch {
    /* preview without backend */
  }
}

function AgentOutput({ raw }: { raw: string }): React.ReactElement {
  const lines = raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const rows = lines.map((l) => {
    const m = l.match(/^([A-ZÀ-Ú\s]+):\s*(.+)$/);
    return m ? { k: m[1].trim(), v: m[2].trim() } : { k: null, v: l };
  });
  return (
    <div className="flex flex-col gap-2">
      {rows.map((r, i) => (
        <div
          key={i}
          className="grid grid-cols-1 gap-1 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-3"
        >
          {r.k ? (
            <>
              <div className="pt-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                {r.k}
              </div>
              <div className="min-w-0 break-words text-offwhite">{r.v}</div>
            </>
          ) : (
            <div className="break-words text-offwhite/55 sm:col-span-2">{r.v}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export function LiveAgent(): React.ReactElement {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [blockMsg, setBlockMsg] = useState('');
  const [blockKind, setBlockKind] = useState<BlockKind>('');
  const [needEmail, setNeedEmail] = useState(false);
  const [persisted, setPersisted] = useState<AgentState>({ askedOnce: false, email: '' });
  const [email, setEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const clientId = useRef('');

  useEffect(() => {
    clientId.current = getClientId();
    const s = loadState();
    setPersisted(s);
    if (s.email) {
      setEmail(s.email);
      setEmailSuccess(true);
    }
  }, []);

  const run = async (q: string): Promise<void> => {
    if (!q || loading) return;
    if (persisted.askedOnce && !persisted.email) {
      setNeedEmail(true);
      setBlockMsg(AGENT.blockedMessage);
      setBlockKind('');
      return;
    }
    setLoading(true);
    setOutput('');
    setBlockMsg('');
    setBlockKind('');
    try {
      const data = await callAgent({
        question: q,
        email: persisted.email || null,
        clientId: clientId.current,
      });
      setOutput(data.diagnostic ?? '');
      const next: AgentState = { ...persisted, askedOnce: true };
      setPersisted(next);
      saveState(next);
      if (!next.email) setNeedEmail(true);
    } catch (e) {
      const err = e as CallError;
      if (err.code === 'NEED_EMAIL') {
        setNeedEmail(true);
        setBlockMsg(AGENT.blockedMessage);
        setBlockKind('');
      } else if (err.code === 'DAILY_CAP') {
        setBlockMsg(AGENT.dailyCapMessage);
        setBlockKind('cap');
      } else if (err.code === 'RATE_LIMIT') {
        setBlockMsg(AGENT.rateLimitMessage);
        setBlockKind('rate');
      } else {
        setOutput(
          'ERRO: agent offline. Tenta de novo em alguns segundos — ou agenda direto no cal.com.',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const submitEmail = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const v = email.trim();
    if (!v.includes('@') || v.length < 5) return;
    setEmailLoading(true);
    await registerEmail({ email: v, clientId: clientId.current });
    const next: AgentState = { askedOnce: true, email: v };
    setPersisted(next);
    saveState(next);
    setEmailSuccess(true);
    setNeedEmail(false);
    setBlockMsg('');
    setEmailLoading(false);
  };

  const inputDisabled = persisted.askedOnce && !persisted.email && needEmail;

  return (
    <div className="relative overflow-hidden rounded-brand-lg border border-white/[0.08] bg-charcoal p-[20px_22px] text-offwhite">
      {/* Header label */}
      <div className="mb-3.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
        <span
          className="h-[7px] w-[7px] animate-dl-pulse rounded-full bg-accent"
          style={{ boxShadow: '0 0 8px #00F57A' }}
        />
        {AGENT.label}
      </div>

      {/* Prompt input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void run(input);
        }}
        className="mb-3 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            inputDisabled ? '— deixe seu email abaixo pra continuar —' : AGENT.placeholder
          }
          disabled={inputDisabled}
          className="min-w-0 flex-1 rounded-[8px] border border-white/[0.08] bg-ink px-3.5 py-3 text-[15px] text-offwhite outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim() || inputDisabled}
          className="whitespace-nowrap rounded-[8px] bg-accent px-4.5 font-mono text-xs font-semibold uppercase tracking-[0.06em] text-black disabled:cursor-not-allowed disabled:opacity-50"
          style={{ padding: '0 18px' }}
        >
          {loading ? 'rodando…' : AGENT.btnLabel} →
        </button>
      </form>

      {/* Example prompts (only before first ask) */}
      {!persisted.askedOnce && (
        <div className={`flex flex-wrap gap-1.5 ${output || loading ? 'mb-4' : ''}`}>
          {AGENT.examples.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setInput(ex);
                void run(ex);
              }}
              className="rounded-full border border-dashed border-white/[0.08] px-2.5 py-1.5 font-mono text-[11px] text-offwhite/55 transition-all duration-200 hover:border-solid hover:border-accent hover:text-accent"
            >
              ↳ {ex}
            </button>
          ))}
        </div>
      )}

      {/* Output panel */}
      {(loading || output) && (
        <div className="mb-3 min-h-[90px] whitespace-pre-wrap rounded-[8px] border border-white/[0.08] bg-ink p-[14px_16px] font-mono text-[13px] leading-relaxed text-offwhite">
          {loading && !output && (
            <span className="text-offwhite/55">
              analisando<span className="dl-dots">…</span>
            </span>
          )}
          {output && <AgentOutput raw={output} />}
        </div>
      )}

      {/* Hard blocks (cap diário / rate limit) */}
      {blockMsg && !needEmail && (
        <div
          className={`mt-1 rounded-[10px] border p-[16px_18px] ${
            blockKind === 'cap'
              ? 'border-accent bg-gradient-to-b from-white/[0.04] to-transparent'
              : 'border-[#FFB85C]/35 bg-[#FFB85C]/5'
          }`}
        >
          <div
            className={`mb-2 font-mono text-[10px] uppercase tracking-widest ${
              blockKind === 'cap' ? 'text-accent' : 'text-[#FFB85C]'
            }`}
          >
            ◆ {blockKind === 'cap' ? 'cap diário atingido' : 'aguarde um instante'}
          </div>
          <div className="mb-4 text-sm leading-relaxed text-offwhite">{blockMsg}</div>

          {blockKind === 'cap' ? (
            <a
              href={LINKS.cal}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-[8px] bg-accent font-mono text-xs font-semibold uppercase tracking-[0.06em] text-black"
              style={{ padding: '11px 18px' }}
            >
              Agendar diagnóstico humano →
            </a>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-[#FFB85C]/25 pt-3.5">
              <span className="text-[13px] text-offwhite/55">
                Ou prefere falar direto?
              </span>
              <a
                href={LINKS.cal}
                target="_blank"
                rel="noreferrer"
                className="rounded-[6px] border border-[#FFB85C] px-3 py-1.5 font-mono text-xs text-[#FFB85C]"
              >
                Agendar diagnóstico →
              </a>
            </div>
          )}
        </div>
      )}

      {/* Email gate */}
      {needEmail && !emailSuccess && (
        <div className="mt-1 rounded-[10px] border border-accent bg-gradient-to-b from-white/[0.04] to-transparent p-[16px_18px]">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-accent">
            ◆ {persisted.askedOnce && blockMsg ? 'continue —' : 'plano completo'}
          </div>
          <div className="mb-1 text-[15px] font-medium text-offwhite">
            {AGENT.emailGate.title}
          </div>
          <div className="mb-3.5 text-[13px] leading-relaxed text-offwhite/55">
            {blockMsg || AGENT.emailGate.sub}
          </div>
          <form onSubmit={submitEmail} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              autoComplete="email"
              className="min-w-0 flex-1 rounded-[8px] border border-white/[0.08] bg-ink px-3.5 py-2.5 text-sm text-offwhite outline-none"
            />
            <button
              type="submit"
              disabled={emailLoading || !email.includes('@')}
              className="rounded-[8px] bg-accent font-mono text-xs font-semibold uppercase tracking-[0.06em] text-black disabled:opacity-50"
              style={{ padding: '0 18px' }}
            >
              {emailLoading ? 'enviando…' : AGENT.emailGate.cta} →
            </button>
          </form>
          <div className="mt-2.5 font-mono text-[10px] leading-relaxed text-offwhite/55">
            {AGENT.privacy}
          </div>
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-white/[0.08] pt-3.5">
            <span className="text-[13px] text-offwhite/55">
              Prefere falar comigo direto, sem deixar email?
            </span>
            <a
              href={LINKS.cal}
              target="_blank"
              rel="noreferrer"
              className="rounded-[6px] border border-accent px-3 py-1.5 font-mono text-xs text-accent"
            >
              Agendar diagnóstico →
            </a>
          </div>
        </div>
      )}

      {/* Email success confirmation */}
      {emailSuccess && persisted.email && (
        <div className="flex items-center gap-2 pt-2.5 font-mono text-xs text-accent">
          <span>✓</span> {AGENT.emailGate.success}
        </div>
      )}
    </div>
  );
}
