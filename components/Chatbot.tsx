"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  MessageSquare, X, Send, Bot, Phone, Mail, ExternalLink, CalendarCheck, MessageCircle, RotateCcw, Home,
  PhoneIncoming, TrendingUp, Globe, LayoutDashboard, Palette, BadgeDollarSign, ChevronRight,
} from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { SITE, SECTION_IDS, CONTACT_HREFS } from "@/lib/site";
import { openConsultation, openConsultationFor, openDemoRequest } from "@/components/BookConsultation";
import {
  respond, welcome, mainMenu, goals, EDITIONS, WHATSAPP_URL,
  type Action, type Context, type Goal, type Reply,
} from "@/lib/assistant/engine";

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
 *
 * Navigation: the welcome card shows six goals; the main menu (header button,
 * the "Main menu" chip under every answer, or typing "menu") brings them back;
 * "New chat" clears the conversation.
 */

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  /** Rendered as a bulleted list under the message. */
  lines?: string[];
  actions?: Action[];
  suggestions?: string[];
  menu?: boolean;
}

const STORE_KEY = "vx-assistant-v3";
const TEASER_KEY = "vx-assistant-teaser";

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

function teaserSeen(): boolean {
  try {
    return window.sessionStorage.getItem(TEASER_KEY) === "1";
  } catch {
    return true;
  }
}

function markTeaserSeen() {
  try {
    window.sessionStorage.setItem(TEASER_KEY, "1");
  } catch {
    /* ignore */
  }
}

const ACTION_ICONS: Record<Action["kind"], typeof Send> = {
  book: CalendarCheck,
  demo: CalendarCheck,
  link: ExternalLink,
  whatsapp: MessageCircle,
  call: Phone,
  email: Mail,
};

const GOAL_ICONS: Record<Goal["icon"], typeof Send> = {
  phone: PhoneIncoming,
  growth: TrendingUp,
  web: Globe,
  erp: LayoutDashboard,
  brand: Palette,
  price: BadgeDollarSign,
};

export default function Chatbot() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [teaser, setTeaser] = useState(false);
  const ctxRef = useRef<Context>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const counter = useRef(0);
  const restored = useRef(false);

  const c = t.chat;
  const es = lang === "es";
  const menuLabel = es ? "Menú principal" : "Main menu";

  // A small invitation next to the launcher, once per visit, a few seconds in.
  useEffect(() => {
    if (teaserSeen()) return;
    const id = window.setTimeout(() => setTeaser(true), 7000);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (open && teaser) {
      setTeaser(false);
      markTeaserSeen();
    }
  }, [open, teaser]);

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

  // ESC closes, and focus returns to the trigger. On desktop, opening focuses the question box.
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
    }, 80);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
    };
  }, [open]);

  // Keep the newest message in view, smoothly.
  useEffect(() => {
    const el = logRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const push = useCallback((m: Omit<Message, "id">) => {
    counter.current += 1;
    const msg = { ...m, id: counter.current };
    setMessages((prev) => [...prev, msg].slice(-40));
  }, []);

  const reply = useCallback(
    (r: Reply) => {
      push({ from: "bot", text: r.text, lines: r.lines, actions: r.actions, suggestions: r.suggestions, menu: r.menu });
    },
    [push],
  );

  const ask = useCallback(
    (question: string) => {
      const q = question.trim().slice(0, 500);
      if (!q || typing) return;
      push({ from: "user", text: q });
      setTyping(true);
      const { reply: r, ctx } = respond(q, lang, ctxRef.current);
      ctxRef.current = ctx;
      // A short beat so the answer doesn't teleport in and get missed by a screen reader.
      window.setTimeout(() => {
        reply(r);
        setTyping(false);
      }, 420);
    },
    [lang, push, reply, typing],
  );

  const showMenu = () => {
    if (typing) return;
    if (messages.length === 0) return;
    reply(mainMenu(lang));
  };

  const newChat = () => {
    ctxRef.current = {};
    setMessages([]);
    setDraft("");
    inputRef.current?.focus();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = draft;
    setDraft("");
    ask(q);
  };

  const runAction = (a: Action) => {
    if (a.kind === "book") {
      setOpen(false);
      if (a.services || a.message) openConsultationFor({ services: a.services, message: a.message });
      else openConsultation();
    } else if (a.kind === "demo") {
      setOpen(false);
      const e = EDITIONS.find((x) => x.id === a.industry);
      openDemoRequest(e ? { industry: es ? e.es : e.en } : {});
    }
  };

  const actionHref = (a: Action): string | undefined => {
    if (a.kind === "link") return a.href;
    if (a.kind === "whatsapp") return WHATSAPP_URL;
    if (a.kind === "call") return CONTACT_HREFS.phone;
    if (a.kind === "email") return CONTACT_HREFS.email;
    return undefined;
  };

  const intro = welcome(lang);
  const goalList = goals(lang);
  const last = messages[messages.length - 1];

  return (
    <>
      {/* Invitation, once per visit */}
      {teaser && !open ? (
        <div className="fixed bottom-[5.5rem] right-5 z-40 w-[min(280px,calc(100vw-2.5rem))] motion-safe:animate-fade-up lg:bottom-[6.5rem] lg:right-8">
          <div className="relative rounded-2xl rounded-br-sm border border-[rgba(14,165,233,0.3)] bg-vx-bg2 p-3.5 pr-9 shadow-vx-glow">
            <button
              type="button"
              onClick={() => {
                setTeaser(false);
                markTeaserSeen();
              }}
              aria-label={c.close}
              className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-lg text-vx-muted hover:text-vx-ink"
            >
              <X size={14} aria-hidden />
            </button>
            <button type="button" onClick={() => setOpen(true)} className="block text-left">
              <span className="block text-sm font-semibold text-vx-ink">
                {es ? "¿Buscas la solución correcta?" : "Looking for the right solution?"}
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-vx-muted">
                {es ? "Dime qué quieres resolver y te respondo en segundos." : "Tell me what you want to fix and I'll answer in seconds."}
              </span>
            </button>
          </div>
        </div>
      ) : null}

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
        {!open ? (
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-vx-cyan motion-safe:animate-pulse-glow" />
        ) : null}
        {open ? <X size={22} aria-hidden /> : <MessageSquare size={22} aria-hidden />}
        {teaser && !open ? (
          <span aria-hidden className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-vx-bg bg-vx-cyan" />
        ) : null}
      </button>

      {/* Panel: a full-height sheet on phones, a floating card from 640px up. */}
      {open ? (
        <div
          id="vx-chat-panel"
          role="dialog"
          aria-label={c.title}
          className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-vx-bg2 pb-[env(safe-area-inset-bottom)] motion-safe:animate-[fadeUp_200ms_ease-out] sm:inset-auto sm:bottom-24 sm:right-4 sm:z-40 sm:h-[min(680px,calc(100dvh-8rem))] sm:w-[410px] sm:rounded-2xl sm:border sm:border-[rgba(14,165,233,0.25)] sm:pb-0 sm:shadow-vx-glow lg:bottom-28 lg:right-8"
        >
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-[rgba(14,165,233,0.14)] bg-vx-bg3 px-3 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4 sm:pt-3">
            <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-vx-blue/30 bg-vx-bg text-vx-blue">
              <Bot size={17} aria-hidden />
              <span aria-hidden className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-vx-bg3 bg-vx-cyan" />
            </span>
            <div className="min-w-0 flex-1 pl-1">
              <p className="truncate text-sm font-semibold text-vx-ink">{c.title}</p>
              <p className="truncate text-xs text-vx-muted">{es ? "En línea · respuestas al instante" : "Online · instant answers"}</p>
            </div>
            <HeaderButton label={menuLabel} onClick={showMenu} disabled={messages.length === 0}>
              <Home size={15} aria-hidden />
            </HeaderButton>
            <HeaderButton label={c.newChat} onClick={newChat} disabled={messages.length === 0}>
              <RotateCcw size={15} aria-hidden />
            </HeaderButton>
            <HeaderButton
              label={c.close}
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
            >
              <X size={16} aria-hidden />
            </HeaderButton>
          </div>

          {/* Log */}
          <div ref={logRef} role="log" aria-live="polite" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
            <div className="flex flex-col gap-3">
              {/* Welcome card: always the first thing in the conversation. */}
              <div className="motion-safe:animate-fade-up">
                <BotBubble text={intro.text} />
                <GoalGrid items={goalList} onPick={ask} disabled={typing} />
                <p className="mt-3 text-[11px] leading-relaxed text-vx-silver-dim">{c.disclosure}</p>
              </div>

              {messages.map((m) =>
                m.from === "user" ? (
                  <div key={m.id} className="flex justify-end motion-safe:animate-[fadeUp_220ms_ease-out_both]">
                    <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-sm bg-gradient-to-r from-vx-blue to-vx-cyan px-3.5 py-2 text-sm font-medium text-vx-onaccent">
                      {m.text}
                    </p>
                  </div>
                ) : (
                  <div key={m.id} className="flex flex-col items-start gap-2 motion-safe:animate-[fadeUp_300ms_ease-out_both]">
                    <BotBubble text={m.text} lines={m.lines} />
                    {m.actions && m.actions.length > 0 ? (
                      <div className="flex w-full max-w-[94%] flex-wrap gap-1.5">
                        {m.actions.map((a) => {
                          const Icon = ACTION_ICONS[a.kind];
                          const href = actionHref(a);
                          const primary = a.kind === "book" || a.kind === "demo";
                          const cls = primary
                            ? "inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-gradient-to-r from-vx-blue to-vx-cyan px-3 py-1.5 text-xs font-semibold text-vx-onaccent shadow-vx-glow-sm transition-transform motion-safe:hover:-translate-y-0.5"
                            : "inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-[rgba(14,165,233,0.28)] bg-vx-bg px-3 py-1.5 text-xs font-medium text-vx-silver transition-colors hover:border-vx-blue hover:text-vx-blue";
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
                              <Icon size={13} aria-hidden className="shrink-0" />
                              {a.label}
                            </a>
                          ) : (
                            <button key={a.label} type="button" onClick={() => runAction(a)} className={cls}>
                              <Icon size={13} aria-hidden className="shrink-0" />
                              {a.label}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                    {m.menu ? <GoalGrid items={goalList} onPick={ask} disabled={typing} /> : null}
                  </div>
                ),
              )}

              {typing ? (
                <div className="flex justify-start motion-safe:animate-[fadeUp_200ms_ease-out_both]">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-[rgba(14,165,233,0.14)] bg-vx-bg px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-vx-blue motion-safe:animate-bounce"
                        style={{ animationDelay: `${i * 120}ms` }}
                      />
                    ))}
                    <span className="sr-only">{es ? "Escribiendo" : "Typing"}</span>
                  </div>
                </div>
              ) : null}

              {/* Follow-ups for the latest answer, always with a way back to the main menu. */}
              {!typing && last && last.from === "bot" && !last.menu ? (
                <div className="flex flex-wrap gap-1.5 motion-safe:animate-[fadeUp_350ms_ease-out_both]">
                  {(last.suggestions ?? []).map((q) => (
                    <Chip key={q} onClick={() => ask(q)}>
                      {q}
                    </Chip>
                  ))}
                  <Chip onClick={showMenu} accent>
                    <Home size={12} aria-hidden className="shrink-0" />
                    {menuLabel}
                  </Chip>
                </div>
              ) : null}
            </div>
          </div>

          {/* Question box and the two standing actions */}
          <div className="border-t border-[rgba(14,165,233,0.14)] bg-vx-bg3 px-3 py-3 sm:px-4">
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
                className="min-h-[44px] min-w-0 flex-1 rounded-xl border border-[rgba(14,165,233,0.25)] bg-vx-bg px-3.5 text-base text-vx-ink transition-colors placeholder:text-vx-muted focus:border-vx-blue focus:outline-none sm:text-sm"
              />
              <button
                type="submit"
                disabled={!draft.trim() || typing}
                aria-label={c.send}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-vx-blue to-vx-cyan text-vx-onaccent transition-[opacity,transform] motion-safe:active:scale-95 disabled:opacity-40"
              >
                <Send size={16} aria-hidden />
              </button>
            </form>

            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openConsultation();
                }}
                className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-vx-blue to-vx-cyan px-2 py-2 text-center text-xs font-semibold leading-tight text-vx-onaccent"
              >
                <CalendarCheck size={13} aria-hidden className="shrink-0" />
                {c.bookCta}
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg border border-[rgba(14,165,233,0.25)] px-2 py-2 text-center text-xs font-medium leading-tight text-vx-silver hover:border-vx-blue hover:text-vx-blue"
              >
                <MessageCircle size={13} aria-hidden className="shrink-0" />
                {c.humanCta}
              </a>
            </div>
            <p className="mt-2 text-center text-[11px] text-vx-muted">
              {es ? "¿Prefieres llamar?" : "Prefer to call?"}{" "}
              <a href={CONTACT_HREFS.phone} className="font-medium text-vx-blue hover:text-vx-cyan">
                {SITE.phone}
              </a>
              <span aria-hidden> · </span>
              <a href={`/#${SECTION_IDS.contact}`} onClick={() => setOpen(false)} className="font-medium text-vx-blue hover:text-vx-cyan">
                {es ? "Contacto" : "Contact"}
              </a>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}

function HeaderButton({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-vx-muted transition-colors hover:bg-vx-bg hover:text-vx-ink disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function GoalGrid({ items, onPick, disabled }: { items: Goal[]; onPick: (q: string) => void; disabled?: boolean }) {
  return (
    <div className="mt-2.5 grid w-full grid-cols-2 gap-2">
      {items.map((g, i) => {
        const Icon = GOAL_ICONS[g.icon];
        return (
          <button
            key={g.id}
            type="button"
            disabled={disabled}
            onClick={() => onPick(g.ask)}
            style={{ animationDelay: `${60 + i * 45}ms` }}
            className="group flex min-h-[84px] flex-col items-start gap-1.5 rounded-xl border border-[rgba(14,165,233,0.22)] bg-vx-bg p-3 text-left transition-[border-color,transform,box-shadow] hover:border-vx-blue hover:shadow-vx-glow-sm motion-safe:animate-[fadeUp_320ms_ease-out_both] motion-safe:hover:-translate-y-0.5 disabled:opacity-60"
          >
            <span className="flex w-full items-center justify-between">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-vx-blue/20 to-vx-cyan/20 text-vx-cyan">
                <Icon size={15} aria-hidden />
              </span>
              <ChevronRight size={14} aria-hidden className="text-vx-muted transition-transform group-hover:translate-x-0.5 group-hover:text-vx-blue" />
            </span>
            <span className="text-[13px] font-semibold leading-snug text-vx-ink">{g.title}</span>
            <span className="text-[11px] leading-snug text-vx-muted">{g.sub}</span>
          </button>
        );
      })}
    </div>
  );
}

function Chip({ onClick, accent, children }: { onClick: () => void; accent?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-left text-xs transition-colors ${
        accent
          ? "border-vx-blue/40 bg-vx-blue/10 font-medium text-vx-blue hover:bg-vx-blue/20"
          : "border-[rgba(14,165,233,0.28)] bg-vx-bg text-vx-silver hover:border-vx-blue hover:text-vx-blue"
      }`}
    >
      {children}
    </button>
  );
}

function BotBubble({ text, lines }: { text: string; lines?: string[] }) {
  return (
    <div className="max-w-[94%] rounded-2xl rounded-bl-sm border border-[rgba(14,165,233,0.14)] bg-vx-bg px-3.5 py-2.5">
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
