"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { MessageSquare, X, ArrowLeft, Send, Bot, Phone, Mail, ExternalLink, CalendarCheck, MessageCircle, RotateCcw } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { SITE, SECTION_IDS, CONTACT_HREFS } from "@/lib/site";
import { openConsultation, openConsultationFor, openDemoRequest } from "@/components/BookConsultation";
import { respond, welcome, EDITIONS, WHATSAPP_URL, type Action, type Context, type Reply } from "@/lib/assistant/engine";

/**
 * VYNTEX Assistant.
 *
 * HONEST BY DESIGN. A deterministic, bilingual assistant (lib/assistant/engine.ts)
 * that understands typed questions and answers only from the site's own
 * published data: the services catalog, the AI Blueprint, the reseller terms,
 * the contact details and the VYNTEX ERP editions. It is not a large language
 * model and it costs nothing to run: every answer is computed in the browser.
 *
 * It never states a service price (those are quoted after a consultation) and
 * links to erp.vyntexusa.com/pricing for software prices instead of copying
 * them. For anything outside its knowledge it hands the visitor to a person.
 */

type TopicKey =
  | "pricing"
  | "services"
  | "timeline"
  | "included"
  | "thirdParty"
  | "reseller"
  | "support"
  | "languages"
  | "contact";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  /** Rendered as a bulleted list under the message. */
  lines?: string[];
  actions?: Action[];
  suggestions?: string[];
}

const TOPICS: TopicKey[] = [
  "pricing",
  "services",
  "timeline",
  "included",
  "thirdParty",
  "reseller",
  "support",
  "languages",
  "contact",
];

const STORE_KEY = "vx-assistant-v2";

function readStore(): { messages: Message[]; ctx: Context } | null {
  try {
    const raw = window.sessionStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.messages)) return null;
    return { messages: parsed.messages.slice(-40), ctx: parsed.ctx ?? {} };
  } catch {
    return null;
  }
}

function writeStore(messages: Message[], ctx: Context) {
  try {
    window.sessionStorage.setItem(STORE_KEY, JSON.stringify({ messages: messages.slice(-40), ctx }));
  } catch {
    /* private mode or storage blocked: the chat still works for this visit */
  }
}

const ICONS: Record<Action["kind"], typeof Send> = {
  book: CalendarCheck,
  demo: CalendarCheck,
  link: ExternalLink,
  whatsapp: MessageCircle,
  call: Phone,
  email: Mail,
};

export default function Chatbot() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const ctxRef = useRef<Context>({});
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const counter = useRef(0);
  const restored = useRef(false);

  const c = t.chat;

  // Bring back this visit's conversation when the panel first opens.
  useEffect(() => {
    if (!open || restored.current) return;
    restored.current = true;
    const saved = readStore();
    if (saved && saved.messages.length > 0) {
      ctxRef.current = saved.ctx;
      counter.current = Math.max(...saved.messages.map((m) => m.id), 0);
      setMessages(saved.messages);
    }
  }, [open]);

  useEffect(() => {
    if (restored.current) writeStore(messages, ctxRef.current);
  }, [messages]);

  // ESC closes, and focus returns to the trigger. Opening focuses the question box.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const id = window.setTimeout(() => {
      if (window.matchMedia("(min-width: 640px)").matches) inputRef.current?.focus();
    }, 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
    };
  }, [open]);

  // Keep the newest message in view.
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, typing]);

  const push = useCallback((m: Omit<Message, "id">) => {
    counter.current += 1;
    const msg = { ...m, id: counter.current };
    setMessages((prev) => [...prev, msg].slice(-40));
  }, []);

  const ask = useCallback(
    (question: string) => {
      const q = question.trim().slice(0, 500);
      if (!q || typing) return;
      push({ from: "user", text: q });
      setTyping(true);
      const { reply, ctx } = respond(q, lang, ctxRef.current);
      ctxRef.current = ctx;
      // A short beat so the answer doesn't teleport in and get missed by a screen reader.
      window.setTimeout(() => {
        push(toMessage(reply));
        setTyping(false);
      }, 380);
    },
    [lang, push, typing],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = draft;
    setDraft("");
    ask(q);
  };

  const reset = () => {
    ctxRef.current = {};
    setMessages([]);
    setDraft("");
    inputRef.current?.focus();
  };

  const runAction = (a: Action) => {
    switch (a.kind) {
      case "book":
        setOpen(false);
        if (a.services || a.message) openConsultationFor({ services: a.services, message: a.message });
        else openConsultation();
        return;
      case "demo":
        setOpen(false);
        {
          const e = EDITIONS.find((x) => x.id === a.industry);
          openDemoRequest(e ? { industry: lang === "es" ? e.es : e.en } : {});
        }
        return;
      default:
        return;
    }
  };

  const actionHref = (a: Action): string | undefined => {
    if (a.kind === "link") return a.href;
    if (a.kind === "whatsapp") return WHATSAPP_URL;
    if (a.kind === "call") return CONTACT_HREFS.phone;
    if (a.kind === "email") return CONTACT_HREFS.email;
    return undefined;
  };

  const lastBot = [...messages].reverse().find((m) => m.from === "bot");
  const chips = messages.length === 0 ? null : lastBot?.suggestions ?? null;
  const intro = welcome(lang);

  return (
    <>
      {/* Launcher */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="vx-chat-panel"
        aria-label={open ? c.close : c.open}
        className={`fixed bottom-5 right-5 z-40 h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-vx-blue to-vx-cyan text-vx-onaccent shadow-vx-glow transition-transform motion-safe:hover:scale-105 lg:bottom-8 lg:right-8 ${open ? "hidden sm:grid" : "grid"}`}
      >
        {open ? <X size={22} aria-hidden /> : <MessageSquare size={22} aria-hidden />}
      </button>

      {/* Panel: a full-height sheet on phones, a floating card from 640px up. */}
      {open ? (
        <div
          id="vx-chat-panel"
          ref={panelRef}
          role="dialog"
          aria-label={c.title}
          className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-vx-bg2 pb-[env(safe-area-inset-bottom)] motion-safe:animate-[fadeUp_180ms_ease-out] sm:inset-auto sm:bottom-24 sm:right-4 sm:z-40 sm:h-[min(640px,calc(100dvh-8rem))] sm:w-[400px] sm:rounded-2xl sm:border sm:border-[rgba(14,165,233,0.25)] sm:pb-0 sm:shadow-vx-glow lg:bottom-28 lg:right-8"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-[rgba(14,165,233,0.14)] bg-vx-bg3 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-vx-blue/30 bg-vx-bg text-vx-blue">
              <Bot size={17} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-sm font-semibold text-vx-ink">
                {c.title}
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-vx-cyan">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-vx-cyan" />
                  {lang === "es" ? "En línea" : "Online"}
                </span>
              </p>
              <p className="truncate text-xs text-vx-muted">{c.subtitle}</p>
            </div>
            {messages.length > 0 ? (
              <button
                type="button"
                onClick={reset}
                aria-label={c.newChat}
                title={c.newChat}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-vx-muted transition-colors hover:text-vx-ink"
              >
                <RotateCcw size={15} aria-hidden />
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label={c.close}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-vx-muted transition-colors hover:text-vx-ink"
            >
              <X size={16} aria-hidden />
            </button>
          </div>

          {/* Log */}
          <div ref={logRef} role="log" aria-live="polite" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
            {/* Honest disclosure, shown before the first exchange, always. */}
            <p className="rounded-xl border border-[rgba(14,165,233,0.16)] bg-vx-bg px-3 py-2.5 text-xs leading-relaxed text-vx-silver-dim">
              {c.disclosure}
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <BotBubble text={intro.text} />
              {messages.length === 0 ? (
                <Chips items={intro.suggestions ?? []} onPick={ask} />
              ) : null}

              {messages.map((m) =>
                m.from === "user" ? (
                  <div key={m.id} className="flex justify-end">
                    <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-sm bg-gradient-to-r from-vx-blue to-vx-cyan px-3.5 py-2 text-sm font-medium text-vx-onaccent">
                      {m.text}
                    </p>
                  </div>
                ) : (
                  <div key={m.id} className="flex flex-col items-start gap-2">
                    <BotBubble text={m.text} lines={m.lines} />
                    {m.actions && m.actions.length > 0 ? (
                      <div className="flex max-w-[92%] flex-wrap gap-1.5">
                        {m.actions.map((a) => {
                          const Icon = ICONS[a.kind];
                          const href = actionHref(a);
                          const cls =
                            a.kind === "book" || a.kind === "demo"
                              ? "inline-flex min-h-[36px] items-center gap-1.5 rounded-lg bg-gradient-to-r from-vx-blue to-vx-cyan px-3 py-1.5 text-xs font-semibold text-vx-onaccent"
                              : "inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-[rgba(14,165,233,0.28)] bg-vx-bg px-3 py-1.5 text-xs font-medium text-vx-silver transition-colors hover:border-vx-blue hover:text-vx-blue";
                          return href ? (
                            <a
                              key={a.label}
                              href={href}
                              className={cls}
                              {...(a.kind === "whatsapp" || (a.kind === "link" && a.external) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                              onClick={() => {
                                if (a.kind === "link" && !a.external) setOpen(false);
                              }}
                            >
                              <Icon size={13} aria-hidden />
                              {a.label}
                            </a>
                          ) : (
                            <button key={a.label} type="button" onClick={() => runAction(a)} className={cls}>
                              <Icon size={13} aria-hidden />
                              {a.label}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                ),
              )}

              {typing ? (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-[rgba(14,165,233,0.14)] bg-vx-bg px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-vx-blue motion-safe:animate-pulse"
                        style={{ animationDelay: `${i * 140}ms` }}
                      />
                    ))}
                    <span className="sr-only">…</span>
                  </div>
                </div>
              ) : null}

              {!typing && chips && chips.length > 0 ? <Chips items={chips} onPick={ask} /> : null}
            </div>
          </div>

          {/* Topics, question box and the two standing actions */}
          <div className="border-t border-[rgba(14,165,233,0.14)] bg-vx-bg3 px-4 py-3">
            {messages.length > 0 ? (
              <button
                type="button"
                onClick={reset}
                className="mb-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-vx-blue hover:text-vx-cyan"
              >
                <ArrowLeft size={13} aria-hidden />
                {c.backToTopics}
              </button>
            ) : null}

            {messages.length === 0 ? (
              <div className="-mx-4 mb-3 flex gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
                {TOPICS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => ask(c.topics[topic])}
                    className="shrink-0 rounded-lg border border-[rgba(14,165,233,0.22)] bg-vx-bg px-2.5 py-1.5 text-xs text-vx-silver transition-colors hover:border-vx-blue hover:text-vx-blue"
                  >
                    {c.topics[topic]}
                  </button>
                ))}
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <label htmlFor="vx-chat-input" className="sr-only">
                {c.placeholder}
              </label>
              <input
                id="vx-chat-input"
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={c.placeholder}
                autoComplete="off"
                enterKeyHint="send"
                maxLength={500}
                className="min-h-[44px] min-w-0 flex-1 rounded-xl border border-[rgba(14,165,233,0.25)] bg-vx-bg px-3.5 text-base text-vx-ink placeholder:text-vx-muted focus:border-vx-blue focus:outline-none sm:text-sm"
              />
              <button
                type="submit"
                disabled={!draft.trim() || typing}
                aria-label={c.send}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-vx-blue to-vx-cyan text-vx-onaccent transition-opacity disabled:opacity-40"
              >
                <Send size={16} aria-hidden />
              </button>
            </form>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openConsultation();
                }}
                className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-vx-blue to-vx-cyan px-3 py-2 text-center text-xs font-semibold leading-tight text-vx-onaccent"
              >
                <CalendarCheck size={13} aria-hidden className="shrink-0" />
                {c.bookCta}
              </button>
              <a
                href={`/#${SECTION_IDS.contact}`}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-[rgba(14,165,233,0.25)] px-3 py-2 text-center text-xs font-medium leading-tight text-vx-silver hover:border-vx-blue hover:text-vx-blue"
              >
                {c.humanCta}
              </a>
            </div>
            <p className="mt-2 text-center text-[11px] text-vx-muted">
              {lang === "es" ? "¿Prefieres hablar?" : "Prefer to talk?"}{" "}
              <a href={CONTACT_HREFS.phone} className="font-medium text-vx-blue hover:text-vx-cyan">
                {SITE.phone}
              </a>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}

function toMessage(r: Reply): Omit<Message, "id"> {
  return { from: "bot", text: r.text, lines: r.lines, actions: r.actions, suggestions: r.suggestions };
}

function BotBubble({ text, lines }: { text: string; lines?: string[] }) {
  return (
    <div className="max-w-[92%] rounded-2xl rounded-bl-sm border border-[rgba(14,165,233,0.14)] bg-vx-bg px-3.5 py-2.5">
      <p className="break-words text-sm leading-relaxed text-vx-silver">{text}</p>
      {lines && lines.length > 0 ? (
        <ul className="mt-2 flex flex-col gap-1.5">
          {lines.map((line) => (
            <li key={line} className="flex gap-2 text-sm leading-snug text-vx-muted">
              <span aria-hidden className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-vx-cyan" />
              <span className="min-w-0 break-words">{line}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Chips({ items, onPick }: { items: string[]; onPick: (q: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((q) => (
        <button
          key={q}
          type="button"
          onClick={() => onPick(q)}
          className="rounded-full border border-[rgba(14,165,233,0.28)] bg-vx-bg px-3 py-1.5 text-left text-xs text-vx-silver transition-colors hover:border-vx-blue hover:text-vx-blue"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
