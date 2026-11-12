/**
 * VYNTEX Assistant engine.
 *
 * A deterministic, bilingual question answering engine. It reads what a visitor
 * types, scores it against a knowledge base built ONLY from the site's own
 * published data (services catalog, AI Blueprint, reseller terms, site contact
 * details, VYNTEX ERP editions) and answers with text plus next-step actions.
 *
 * No language model, no API call, no credits: it runs entirely in the browser,
 * so it answers instantly and can never invent a price, a timeline or a promise.
 * Service prices are never stated (they are quoted after a consultation); the
 * VYNTEX ERP plan prices live on erp.vyntexusa.com/pricing and are linked, not
 * copied, so this file never goes stale.
 *
 * Pure and framework free so tests/unit/assistant-engine.test.ts can drive it.
 */
import { SERVICES, AI_BLUEPRINT, type ServiceItem } from "@/lib/services-catalog";
import { RESELLER_PROGRAM } from "@/lib/reseller-program";
import { SITE } from "@/lib/site";

export type Lang = "en" | "es";

export type ConsultService =
  | "website" | "ai_automation" | "ai_chatbot" | "crm" | "branding"
  | "digital_marketing" | "social_media" | "reseller" | "other";

export type Action =
  | { kind: "book"; label: string; services?: ConsultService[]; message?: string }
  | { kind: "demo"; label: string; industry?: string }
  | { kind: "link"; label: string; href: string; external?: boolean }
  | { kind: "whatsapp"; label: string }
  | { kind: "call"; label: string }
  | { kind: "email"; label: string };

export interface Reply {
  intent: string;
  text: string;
  lines?: string[];
  actions?: Action[];
  /** Follow-up questions shown as chips under the answer. */
  suggestions?: string[];
}

/** What the conversation is currently about, so "how long?" knows what "it" is. */
export interface Context {
  serviceId?: string;
  industry?: string;
  lastIntent?: string;
}

export const ERP_URL = "https://erp.vyntexusa.com";
export const WHATSAPP_URL = `https://wa.me/1${SITE.phone.replace(/\D/g, "")}`;

// ---------------------------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------------------------

/** Lower case, accents removed, punctuation to spaces, single spaces. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9$+#\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const ES_MARKERS = [
  "que", "como", "cuanto", "cuesta", "precio", "quiero", "necesito", "tienen", "hacen", "pagina",
  "negocio", "hola", "gracias", "buenas", "puedo", "para", "mi", "una", "los", "las", "del", "por favor",
  "cuando", "donde", "llamar", "hablar", "espanol", "ingles", "cita", "consulta", "limpieza", "barberia",
];

/** Guesses the language of what was typed; falls back to the page language. */
export function detectLang(input: string, fallback: Lang): Lang {
  const words = normalize(input).split(" ");
  if (words.length === 0) return fallback;
  const hits = words.filter((w) => ES_MARKERS.includes(w)).length;
  if (hits >= 2 || (hits === 1 && words.length <= 3)) return "es";
  const enHits = words.filter((w) => ["what", "how", "much", "do", "you", "the", "is", "can", "need", "want", "my", "website", "hello", "hi"].includes(w)).length;
  if (enHits >= 1) return "en";
  return fallback;
}

const has = (text: string, terms: string[]) =>
  terms.reduce((score, term) => {
    const t = normalize(term);
    if (!t) return score;
    // Whole word or phrase match scores more than a fragment inside a longer word.
    const re = new RegExp(`(^|\\s)${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|$)`);
    if (re.test(text)) return score + (t.includes(" ") ? 3 : 2);
    if (t.length >= 5 && text.includes(t)) return score + 1;
    return score;
  }, 0);

// ---------------------------------------------------------------------------------------------
// Knowledge: services
// ---------------------------------------------------------------------------------------------

/** Extra words people use for each catalog service, on top of its own name. */
const SERVICE_TERMS: Record<string, string[]> = {
  starter: ["starter", "starter package", "paquete starter", "get found", "just starting", "empezando"],
  growth: ["growth", "growth package", "paquete growth", "follow up", "seguimiento", "forgotten leads"],
  complete: ["complete", "complete package", "paquete complete", "everything", "todo incluido", "all in one"],
  aifront: ["ai front desk", "front desk", "recepcionista", "answering service", "answer my phone", "contestar llamadas", "missing calls", "keep missing calls", "pierden llamadas", "se me pierden llamadas", "voice agent", "ai receptionist", "missed calls", "llamadas perdidas"],
  "crm-basic": ["basic crm", "crm basico", "simple crm"],
  "crm-standard": ["standard crm", "crm estandar", "pipeline", "embudo"],
  "crm-premium": ["premium crm", "crm premium", "ai receptionist crm"],
  "web-basic": ["basic website", "sitio basico", "one page", "landing page", "pagina sencilla", "starter site"],
  "web-std": ["standard website", "sitio estandar", "booking website", "website with booking", "galeria"],
  "web-custom": ["custom website", "sitio a la medida", "ecommerce", "e commerce", "tienda en linea", "online store", "web app"],
  "ai-simple": ["simple ai", "ai tool", "herramienta de ia"],
  "ai-standard": ["standard automation", "automatizacion estandar", "lead capture", "auto follow up"],
  "ai-advanced": ["advanced ai", "ia avanzada", "complex automation", "ai agent", "agente de ia", "ai employee"],
  "brand-logo": ["logo", "logotipo", "brand logo"],
  "brand-bundle": ["brand bundle", "paquete de marca", "business card", "tarjeta", "flyer", "volante", "whatsapp business", "facebook page", "instagram account", "redes sociales creadas", "social accounts"],
  "brand-kit": ["brand kit", "kit de marca", "brand guidelines", "guia de marca", "brand identity", "identidad"],
  "social-mgmt": ["social media management", "manejo de redes", "posting", "publicaciones", "community manager", "post for me", "publicar por mi"],
};

const GROUP_CONSULT: Record<ServiceItem["group"], ConsultService> = {
  packages: "website", crm: "crm", web: "website", ai: "ai_automation", brand: "branding",
};

function serviceConsult(s: ServiceItem): ConsultService[] {
  if (s.id === "social-mgmt") return ["social_media"];
  if (s.id === "aifront") return ["ai_chatbot", "crm"];
  if (s.group === "packages") return ["website", "crm"];
  return [GROUP_CONSULT[s.group]];
}

/** The catalog service a message is about, if one stands out. */
export function matchService(text: string): ServiceItem | undefined {
  let best: { s: ServiceItem; score: number } | undefined;
  for (const s of SERVICES) {
    const score = has(text, [s.name.en, s.name.es, s.id.replace(/-/g, " "), ...(SERVICE_TERMS[s.id] ?? [])]);
    if (score > 0 && (!best || score > best.score)) best = { s, score };
  }
  return best && best.score >= 2 ? best.s : undefined;
}

// ---------------------------------------------------------------------------------------------
// Knowledge: VYNTEX ERP editions
// ---------------------------------------------------------------------------------------------

export const EDITIONS: { id: string; en: string; es: string; terms: string[] }[] = [
  { id: "contractors", en: "General Contractors", es: "Contratistas Generales", terms: ["contractor", "contratista", "construction", "construccion", "remodel", "remodelacion", "roofing", "techos", "builder", "handyman"] },
  { id: "clean", en: "Cleaning Services", es: "Servicios de Limpieza", terms: ["cleaning", "limpieza", "janitorial", "maid", "housekeeping", "cleaners"] },
  { id: "landscape", en: "Landscaping", es: "Jardinería y Paisajismo", terms: ["landscaping", "landscape", "lawn", "jardineria", "paisajismo", "hardscape", "jardin"] },
  { id: "wash", en: "Pressure Washing", es: "Lavado a Presión", terms: ["pressure washing", "power washing", "lavado a presion", "window cleaning", "gutter", "canaletas"] },
  { id: "haul", en: "Junk Removal and Moving", es: "Retiro de Basura y Mudanzas", terms: ["junk removal", "moving", "mudanza", "mudanzas", "hauling", "retiro de basura"] },
  { id: "snow", en: "Snow Removal", es: "Remoción de Nieve", terms: ["snow", "nieve", "plowing", "salting"] },
  { id: "turnover", en: "Property Turnover", es: "Preparación de Propiedades", terms: ["turnover", "make ready", "property management", "apartment turn", "preparacion de propiedades"] },
  { id: "events", en: "Event Services", es: "Servicios para Eventos", terms: ["events", "event staffing", "eventos", "catering staff", "event setup"] },
  { id: "hvac", en: "HVAC Contractors", es: "Contratistas de HVAC", terms: ["hvac", "heating", "air conditioning", "aire acondicionado", "calefaccion", "furnace"] },
  { id: "plumbing", en: "Plumbing Contractors", es: "Contratistas de Plomería", terms: ["plumbing", "plumber", "plomeria", "plomero", "drain", "water heater"] },
  { id: "practice", en: "Professional Services", es: "Servicios Profesionales", terms: ["tax", "taxes", "impuestos", "bookkeeping", "contabilidad", "accounting", "payroll", "nomina", "tax preparer", "cpa", "notary", "insurance agency", "law firm", "professional services"] },
  { id: "barber", en: "Barbershops", es: "Barberías", terms: ["barber", "barbershop", "barberia", "barbero", "salon", "beauty", "grooming", "peluqueria"] },
];

export function matchEdition(text: string) {
  let best: { e: (typeof EDITIONS)[number]; score: number } | undefined;
  for (const e of EDITIONS) {
    const score = has(text, [e.en, e.es, ...e.terms]);
    if (score > 0 && (!best || score > best.score)) best = { e, score };
  }
  return best?.e;
}

const editionName = (e: (typeof EDITIONS)[number], lang: Lang) =>
  lang === "es" ? `VYNTEX ERP para ${e.es}` : `VYNTEX ERP for ${e.en}`;

// ---------------------------------------------------------------------------------------------
// Intents
// ---------------------------------------------------------------------------------------------

interface Intent { id: string; terms: string[]; weight?: number }

const INTENTS: Intent[] = [
  { id: "greeting", terms: ["hi", "hello", "hey", "good morning", "good afternoon", "hola", "buenas", "buenos dias", "buenas tardes", "que tal"] },
  { id: "thanks", terms: ["thanks", "thank you", "gracias", "muchas gracias", "perfect thanks", "great thanks"] },
  { id: "bye", terms: ["bye", "goodbye", "adios", "hasta luego", "nos vemos"] },
  { id: "who", terms: ["who are you", "are you a bot", "are you human", "are you ai", "quien eres", "eres un bot", "eres humano", "what are you"] },
  { id: "about", terms: ["about vyntex", "who is vyntex", "what is vyntex", "que es vyntex", "quienes son", "about you", "company", "empresa"] },
  { id: "pricing", terms: ["price", "prices", "pricing", "cost", "costs", "how much", "rates", "fee", "fees", "quote", "budget", "expensive", "cheap", "precio", "precios", "cuanto cuesta", "cuanto cobran", "cotizacion", "presupuesto", "tarifa"], weight: 2 },
  { id: "services", terms: ["services", "what do you build", "what do you do", "what do you offer", "offer", "options", "packages", "servicios", "que ofrecen", "paquetes", "que hacen", "que construyen"] },
  { id: "timeline", terms: ["how long", "timeline", "when ready", "ready in", "turnaround", "how fast", "delivery time", "cuanto tiempo", "cuanto tarda", "plazo", "tiempo de entrega", "cuando estaria"], weight: 2 },
  { id: "included", terms: ["included", "includes", "what do i get", "what comes with", "incluye", "que incluye", "que trae"], weight: 2 },
  { id: "excluded", terms: ["not included", "excluded", "extra cost", "hidden fees", "hosting", "domain", "third party", "no incluye", "costos extra", "dominio", "cargos ocultos"], weight: 2 },
  { id: "consultation", terms: ["book", "schedule", "appointment", "consultation", "meeting", "call me", "agendar", "cita", "consulta", "reunion", "llamenme", "quiero empezar", "get started", "start", "empezar", "sign up"], weight: 2 },
  { id: "contact", terms: ["contact", "phone", "number", "email", "whatsapp", "address", "where are you", "location", "office", "contacto", "telefono", "correo", "direccion", "donde estan", "oficina", "human", "person", "talk to someone", "talk to a person", "agent", "persona", "humano", "representative", "hablar con alguien"], weight: 3 },
  { id: "hours", terms: ["hours", "open", "when are you open", "horario", "abren", "que hora"] },
  { id: "languages", terms: ["spanish", "english", "bilingual", "espanol", "ingles", "bilingue", "language", "idioma", "hablan espanol", "do you speak"] },
  { id: "support", terms: ["support", "maintenance", "changes", "after launch", "updates", "soporte", "mantenimiento", "cambios", "actualizaciones", "help after"] },
  { id: "reseller", terms: ["reseller", "resell", "partner", "partnership", "white label", "agency partner", "referral", "commission", "revendedor", "socio", "socios", "referido", "comision", "marca blanca"], weight: 2 },
  { id: "blueprint", terms: ["ai blueprint", "blueprint", "custom", "custom project", "custom app", "build an app", "mobile app", "aplicacion", "a la medida", "personalizado", "plan de ia", "not sure what i need"] },
  { id: "erp", terms: ["erp", "software", "business software", "platform", "management software", "vyntex erp", "job management", "scheduling software", "crm software", "sistema", "programa", "plataforma", "software de gestion"], weight: 2 },
  { id: "erpPlans", terms: ["erp price", "erp pricing", "erp plans", "software price", "subscription", "monthly plan", "basic plan", "essential plan", "pro plan", "plan basic", "plan essential", "plan pro", "planes", "suscripcion", "mensualidad", "plan basico", "plan esencial", "plans", "the plans", "los planes"], weight: 3 },
  { id: "trial", terms: ["trial", "free trial", "try it", "7 day", "seven day", "prueba", "prueba gratis", "probar", "7 dias"], weight: 2 },
  { id: "demo", terms: ["demo", "live demo", "see it", "demostracion", "verlo", "ver demo"], weight: 2 },
  { id: "recommend", terms: ["what do i need", "recommend", "which one", "best for me", "help me choose", "where do i start", "suggest", "que me recomiendas", "cual me conviene", "que necesito", "por donde empiezo", "no se que necesito"], weight: 3 },
  { id: "leads", terms: ["more leads", "more clients", "more customers", "grow", "get customers", "mas clientes", "conseguir clientes", "crecer"] },
  { id: "missedCalls", terms: ["missed calls", "miss calls", "missing calls", "pierden llamadas", "answer calls", "phone calls", "after hours", "24 7", "llamadas perdidas", "no contesto", "contestar el telefono", "fuera de horario"], weight: 2 },
  { id: "marketing", terms: ["seo", "local seo", "google business", "google business profile", "google maps", "ranking", "rank on google", "ads", "advertising", "campaigns", "digital marketing", "marketing digital", "posicionamiento", "aparecer en google", "campanas"], weight: 2 },
  { id: "results", terms: ["guarantee", "guaranteed", "results", "roi", "garantia", "garantizan", "resultados"] },
  { id: "payment", weight: 2, terms: ["payment plans", "payment plan", "plan de pagos", "payment", "pay", "installments", "card", "financing", "deposit", "pago", "pagos", "cuotas", "tarjeta", "financiamiento", "deposito"] },
  { id: "portfolio", terms: ["portfolio", "examples", "examples of your work", "past work", "your work", "case studies", "reviews", "testimonials", "ejemplos", "trabajos", "portafolio", "resenas"], weight: 2 },
];

function scoreIntents(text: string): { id: string; score: number }[] {
  return INTENTS.map((i) => ({ id: i.id, score: has(text, i.terms) * (i.weight ?? 1) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

// ---------------------------------------------------------------------------------------------
// Answers
// ---------------------------------------------------------------------------------------------

const L = (lang: Lang, en: string, es: string) => (lang === "es" ? es : en);

function bookAction(lang: Lang, services?: ConsultService[], message?: string): Action {
  return { kind: "book", label: L(lang, "Book a free consultation", "Agendar consulta gratis"), services, message };
}
const whatsapp = (lang: Lang): Action => ({ kind: "whatsapp", label: L(lang, "WhatsApp us", "Escríbenos por WhatsApp") });
const call = (lang: Lang): Action => ({ kind: "call", label: L(lang, `Call ${SITE.phone}`, `Llamar al ${SITE.phone}`) });
const email = (lang: Lang): Action => ({ kind: "email", label: L(lang, "Email us", "Envíanos un correo") });
const servicesLink = (lang: Lang): Action => ({ kind: "link", label: L(lang, "See all services", "Ver todos los servicios"), href: lang === "es" ? "/es/servicios" : "/services" });
const erpPricing = (lang: Lang, industry?: string): Action => ({ kind: "link", external: true, label: L(lang, "VYNTEX ERP plans and prices", "Planes y precios de VYNTEX ERP"), href: `${ERP_URL}/pricing${industry ? `?industry=${industry}` : ""}${lang === "es" ? (industry ? "&" : "?") + "lang=es" : ""}` });
const erpDemo = (lang: Lang, industry?: string): Action => ({ kind: "link", external: true, label: L(lang, "Open the live demo", "Abrir la demo en vivo"), href: `${ERP_URL}/demo${industry ? `?industry=${industry}` : ""}${lang === "es" ? (industry ? "&" : "?") + "lang=es" : ""}` });
const erpTrial = (lang: Lang): Action => ({ kind: "link", external: true, label: L(lang, "Start the 7-day free trial", "Empezar la prueba gratis de 7 días"), href: `${ERP_URL}/start-trial${lang === "es" ? "?lang=es" : ""}` });
const guidedDemo = (lang: Lang, industry?: string): Action => ({ kind: "demo", label: L(lang, "Book a free guided demo", "Agendar demo guiada gratis"), industry });

function serviceReply(s: ServiceItem, lang: Lang, focus: "overview" | "timeline" | "included" | "excluded" | "price"): Reply {
  const name = s.name[lang];
  const consult = serviceConsult(s);
  const msg = L(lang, `I'm interested in ${s.name.en}.`, `Me interesa ${s.name.es}.`);
  const actions: Action[] = [bookAction(lang, consult, msg), whatsapp(lang)];
  const more = [
    L(lang, `How long does ${name} take?`, `¿Cuánto tarda ${name}?`),
    L(lang, `What's not included in ${name}?`, `¿Qué no incluye ${name}?`),
    L(lang, "What does it cost?", "¿Cuánto cuesta?"),
  ];
  if (focus === "timeline") {
    return { intent: "service.timeline", text: L(lang, `${name} is typically ready in ${s.readyIn.en.toLowerCase()}. Your written proposal confirms the exact date before any work starts.`, `${name} normalmente está listo en ${s.readyIn.es.toLowerCase()}. Tu propuesta por escrito confirma la fecha exacta antes de empezar.`), actions, suggestions: more.filter((_, i) => i !== 0) };
  }
  if (focus === "excluded") {
    return { intent: "service.excluded", text: L(lang, `${name} does not include:`, `${name} no incluye:`), lines: s.excludes[lang], actions, suggestions: more.filter((_, i) => i !== 1) };
  }
  if (focus === "price") {
    return { intent: "service.price", text: L(lang, `${name} is quoted in a free 30-minute consultation, because the right setup depends on your business. You leave the call with a clear recommendation and its price, with no obligation.`, `${name} se cotiza en una consulta gratis de 30 minutos, porque la configuración correcta depende de tu negocio. Sales de la llamada con una recomendación clara y su precio, sin compromiso.`), actions, suggestions: more.filter((_, i) => i !== 2) };
  }
  return {
    intent: "service.overview",
    text: `${name}: ${s.line[lang]}`,
    lines: [
      ...s.includes[lang],
      L(lang, `Best for: ${s.bestFor.en}`, `Ideal para: ${s.bestFor.es}`),
      L(lang, `Ready in: ${s.readyIn.en}`, `Listo en: ${s.readyIn.es}`),
    ],
    actions,
    suggestions: more,
  };
}

function editionReply(e: (typeof EDITIONS)[number], lang: Lang): Reply {
  return {
    intent: "erp.edition",
    text: L(
      lang,
      `${editionName(e, lang)} runs the whole operation in one place: leads, clients, scheduling, documents, payments, your team and reports, set up in your industry's own words. You can open the live demo right now with a sample company, no account needed.`,
      `${editionName(e, lang)} maneja toda la operación en un solo lugar: prospectos, clientes, agenda, documentos, pagos, tu equipo y reportes, con las palabras de tu industria. Puedes abrir la demo en vivo ahora mismo con una empresa de ejemplo, sin crear cuenta.`,
    ),
    lines: [
      L(lang, "Three plans for every industry: Basic, Essential and Pro", "Tres planes para cada industria: Básico, Esencial y Pro"),
      L(lang, "7-day free trial with every feature open", "Prueba gratis de 7 días con todo abierto"),
      L(lang, "Setup done together with you, in English or Spanish", "La instalación la hacemos contigo, en inglés o español"),
    ],
    actions: [erpDemo(lang, e.id), erpPricing(lang, e.id), erpTrial(lang), guidedDemo(lang, e.id)],
    suggestions: [L(lang, "What's the difference between the plans?", "¿Qué diferencia hay entre los planes?"), L(lang, "Do I also need a website?", "¿También necesito una página web?")],
  };
}

const RECOMMEND_MAP: { terms: string[]; ids: string[]; reason: Localized }[] = [
  { terms: ["missed calls", "answer calls", "after hours", "llamadas perdidas", "contestar", "phone", "telefono"], ids: ["aifront", "crm-premium"], reason: { en: "You're losing calls. These answer the phone for you, day and night, in both languages.", es: "Estás perdiendo llamadas. Esto contesta por ti, de día y de noche, en los dos idiomas." } },
  { terms: ["website", "web site", "site", "pagina", "sitio", "online presence", "presencia"], ids: ["web-std", "starter"], reason: { en: "You need to be found and look professional online.", es: "Necesitas que te encuentren y verte profesional en internet." } },
  { terms: ["follow up", "leads", "forgotten", "seguimiento", "prospectos", "clientes se olvidan", "more clients", "mas clientes"], ids: ["growth", "crm-standard"], reason: { en: "Nobody who contacts you should be forgotten. These answer, follow up and remind for you.", es: "Nadie que te contacte debe quedar olvidado. Esto responde, da seguimiento y recuerda por ti." } },
  { terms: ["logo", "brand", "marca", "business card", "tarjeta", "flyer", "volante", "new business", "negocio nuevo"], ids: ["brand-bundle", "brand-kit"], reason: { en: "A new or refreshed brand, with your social accounts and WhatsApp Business set up to match.", es: "Una marca nueva o renovada, con tus redes y WhatsApp Business configurados para combinar." } },
  { terms: ["social", "instagram", "facebook", "tiktok", "redes", "posts", "publicaciones"], ids: ["social-mgmt", "brand-bundle"], reason: { en: "Consistent posting without you doing it.", es: "Publicaciones constantes sin que tengas que hacerlo tú." } },
  { terms: ["automate", "automation", "repetitive", "manual", "automatizar", "automatizacion", "repetitivo"], ids: ["ai-standard", "ai-simple"], reason: { en: "Take repetitive work off your team.", es: "Quitarle trabajo repetitivo a tu equipo." } },
  { terms: ["everything", "all of it", "todo", "complete", "completo"], ids: ["complete"], reason: { en: "The whole public face of your business handled in one package.", es: "Toda la cara pública de tu negocio resuelta en un solo paquete." } },
];

type Localized = { en: string; es: string };

function recommend(text: string, lang: Lang): Reply | undefined {
  const hits = RECOMMEND_MAP.map((r) => ({ r, score: has(text, r.terms) })).filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
  if (hits.length === 0) return undefined;
  const top = hits[0].r;
  const picks = top.ids.map((id) => SERVICES.find((s) => s.id === id)).filter(Boolean) as ServiceItem[];
  return {
    intent: "recommend.match",
    text: L(lang, `Here's where I'd start. ${top.reason.en}`, `Por aquí empezaría. ${top.reason.es}`),
    lines: picks.map((s) => `${s.name[lang]}: ${s.line[lang]}`),
    actions: [bookAction(lang, Array.from(new Set(picks.flatMap(serviceConsult))), L(lang, `Interested in ${picks.map((p) => p.name.en).join(" or ")}.`, `Me interesa ${picks.map((p) => p.name.es).join(" o ")}.`)), whatsapp(lang)],
    suggestions: picks.map((s) => L(lang, `Tell me about ${s.name.en}`, `Cuéntame de ${s.name.es}`)),
  };
}

// ---------------------------------------------------------------------------------------------
// Main entry
// ---------------------------------------------------------------------------------------------

export function respond(input: string, pageLang: Lang, ctx: Context = {}): { reply: Reply; lang: Lang; ctx: Context } {
  const lang = detectLang(input, pageLang);
  const text = normalize(input);
  const next: Context = { ...ctx };
  const done = (reply: Reply) => {
    next.lastIntent = reply.intent;
    return { reply, lang, ctx: next };
  };

  if (!text) return done(welcome(lang));

  const intents = scoreIntents(text);
  const top = intents[0]?.id;
  const asksWhatsappIncluded = /\b(include|includes|included|incluye|incluido)\b/.test(text) && /\bwhatsapp\b/.test(text);
  const service = asksWhatsappIncluded ? SERVICES.find((x) => x.id === "brand-bundle") : matchService(text);
  const edition = matchEdition(text);
  if (service) next.serviceId = service.id;
  if (edition) next.industry = edition.id;
  const current = service ?? SERVICES.find((s) => s.id === ctx.serviceId);

  // A question about a specific service (or a follow-up about the one we're on).
  const followUp = ["timeline", "included", "excluded", "pricing"].includes(top ?? "");
  if (service || (current && followUp && !edition && !intents.some((i) => ["erp", "erpPlans", "trial", "demo"].includes(i.id)))) {
    const s = current!;
    const focus = top === "timeline" ? "timeline" : top === "excluded" ? "excluded" : top === "pricing" ? "price" : "overview";
    if (top === "included" || !followUp || service) return done(serviceReply(s, lang, focus === "overview" || top === "included" ? "overview" : focus));
    return done(serviceReply(s, lang, focus));
  }

  // Software questions, with or without an industry.
  if (top === "erpPlans" || (top === "pricing" && (intents.some((i) => i.id === "erp") || ctx.lastIntent?.startsWith("erp")))) {
    return done(erpPlans(lang, edition?.id ?? ctx.industry));
  }
  if (top === "trial") return done(erpTrialReply(lang, edition?.id ?? ctx.industry));
  if (top === "demo") return done(demoReply(lang, edition?.id ?? ctx.industry));
  if (edition && (top === "erp" || !top || top === "recommend" || top === "services")) return done(editionReply(edition, lang));
  if (top === "erp") return done(erpReply(lang));

  // "What do I need?" style questions: match on the problem described, else ask.
  if (top === "recommend" || top === "leads" || top === "missedCalls") {
    const rec = recommend(text, lang);
    if (rec) return done(rec);
    return done(recommendAsk(lang));
  }

  switch (top) {
    case "greeting": return done(welcome(lang));
    case "thanks": return done({ intent: "thanks", text: L(lang, "You're welcome. Anything else I can help with?", "Con gusto. ¿Te ayudo con algo más?"), suggestions: starterChips(lang) });
    case "bye": return done({ intent: "bye", text: L(lang, `Thanks for stopping by. When you're ready, we're one message away at ${SITE.phone}.`, `Gracias por visitarnos. Cuando quieras, estamos a un mensaje al ${SITE.phone}.`), actions: [bookAction(lang), whatsapp(lang)] });
    case "who": return done(who(lang));
    case "about": return done(about(lang));
    case "pricing": return done(pricing(lang));
    case "services": return done(services(lang));
    case "timeline": return done(timeline(lang));
    case "included": return done(included(lang));
    case "excluded": return done(excluded(lang));
    case "consultation": return done(consultation(lang, current));
    case "contact": return done(contact(lang));
    case "hours": return done(hours(lang));
    case "languages": return done(languages(lang));
    case "support": return done(support(lang));
    case "reseller": return done(reseller(lang));
    case "blueprint": return done(blueprint(lang));
    case "results": return done(results(lang));
    case "payment": return done(payment(lang));
    case "portfolio": return done(portfolio(lang));
    case "marketing": return done(marketing(lang));
  }

  // Nothing matched clearly: try the problem-based recommender before giving up.
  const rec = recommend(text, lang);
  if (rec) return done(rec);
  if (edition) return done(editionReply(edition, lang));
  return done(fallback(lang));
}

export function welcome(lang: Lang): Reply {
  return {
    intent: "welcome",
    text: L(lang, "Hi, I'm the VYNTEX Assistant. Ask me anything about our websites, CRM, AI automation, branding, VYNTEX ERP, or how to get started. Type a question or pick one below.", "Hola, soy el Asistente de VYNTEX. Pregúntame lo que quieras sobre páginas web, CRM, automatización con IA, marca, VYNTEX ERP o cómo empezar. Escribe tu pregunta o elige una abajo."),
    suggestions: starterChips(lang),
  };
}

export function starterChips(lang: Lang): string[] {
  return [
    L(lang, "What do I need for my business?", "¿Qué necesito para mi negocio?"),
    L(lang, "What do you do?", "¿Qué hacen?"),
    L(lang, "What does it cost?", "¿Cuánto cuesta?"),
    L(lang, "Tell me about VYNTEX ERP", "Cuéntame de VYNTEX ERP"),
    L(lang, "I keep missing calls", "Se me pierden llamadas"),
    L(lang, "Talk to a person", "Hablar con una persona"),
  ];
}

function who(lang: Lang): Reply {
  return { intent: "who", text: L(lang, "I'm the VYNTEX Assistant, an automated helper that answers instantly from VYNTEX's own published information. I don't guess: if something is outside what I know, I'll connect you with a real person on our team.", "Soy el Asistente de VYNTEX, un asistente automático que responde al instante con la información publicada de VYNTEX. No adivino: si algo está fuera de lo que sé, te conecto con una persona de nuestro equipo."), actions: [whatsapp(lang), call(lang)], suggestions: starterChips(lang).slice(0, 4) };
}

function about(lang: Lang): Reply {
  return {
    intent: "about",
    text: L(lang, `VYNTEX is a bilingual AI automation, web development and digital technology company in ${SITE.address.locality}, New Jersey, serving businesses across the United States. We connect your website, CRM, automations and brand into one system that answers, follows up and runs the busy work for you.`, `VYNTEX es una empresa bilingüe de automatización con IA, desarrollo web y tecnología digital en ${SITE.address.locality}, Nueva Jersey, que atiende negocios en todo Estados Unidos. Conectamos tu página web, CRM, automatizaciones y marca en un solo sistema que responde, da seguimiento y hace el trabajo pesado por ti.`),
    lines: [
      L(lang, "Websites, CRM systems, AI automation and AI front desks", "Páginas web, CRM, automatización con IA y recepcionista con IA"),
      L(lang, "Branding, social media and digital marketing", "Marca, redes sociales y marketing digital"),
      L(lang, "VYNTEX ERP, our business software for 12 industries", "VYNTEX ERP, nuestro software de gestión para 12 industrias"),
      L(lang, "Everything in English and Spanish", "Todo en inglés y español"),
    ],
    actions: [servicesLink(lang), bookAction(lang)],
    suggestions: [L(lang, "What do I need for my business?", "¿Qué necesito para mi negocio?"), L(lang, "Tell me about VYNTEX ERP", "Cuéntame de VYNTEX ERP")],
  };
}

function pricing(lang: Lang): Reply {
  return {
    intent: "pricing",
    text: L(lang, "Our services are quoted in a free 30-minute consultation, because the right package depends on your business. Here's how it works:", "Nuestros servicios se cotizan en una consulta gratis de 30 minutos, porque el paquete correcto depende de tu negocio. Así funciona:"),
    lines: [
      L(lang, "Book a free 30-minute consultation", "Agenda una consulta gratis de 30 minutos"),
      L(lang, "We recommend the package that fits and walk you through its price", "Te recomendamos el paquete que te conviene y te explicamos su precio"),
      L(lang, "You get a written proposal with the scope before anything starts", "Recibes una propuesta por escrito con el alcance antes de empezar"),
      L(lang, "Something custom? It starts with an AI Blueprint, a written plan of exactly what we'll create", "¿Algo a la medida? Empieza con un AI Blueprint, un plan por escrito de exactamente qué construir"),
      L(lang, "VYNTEX ERP software plans have published monthly prices on erp.vyntexusa.com", "Los planes del software VYNTEX ERP tienen precios mensuales publicados en erp.vyntexusa.com"),
    ],
    actions: [bookAction(lang), erpPricing(lang), whatsapp(lang)],
    suggestions: [L(lang, "What do I need for my business?", "¿Qué necesito para mi negocio?"), L(lang, "What's not included?", "¿Qué no está incluido?")],
  };
}

function services(lang: Lang): Reply {
  const pick = (id: string) => SERVICES.find((s) => s.id === id)!;
  return {
    intent: "services",
    text: L(lang, "Here's what we set up for businesses. Ask about any of them for the details:", "Esto es lo que configuramos para los negocios. Pregúntame por cualquiera para ver los detalles:"),
    lines: [
      L(lang, "Packages: Starter, Growth, Complete and AI Front Desk", "Paquetes: Starter, Growth, Complete y AI Front Desk"),
      L(lang, "CRM: Basic, Standard and Premium", "CRM: Básico, Estándar y Premium"),
      L(lang, "Websites: Basic, Standard and Custom", "Páginas web: Básica, Estándar y a la medida"),
      L(lang, "AI automation: Simple AI Tool, Standard Automation and Advanced AI", "Automatización con IA: herramienta simple, automatización estándar e IA avanzada"),
      L(lang, "Brand: Logo, Brand Bundle, Full Brand Kit and Social Media Management", "Marca: Logo, Paquete de marca, Kit de marca completo y Manejo de redes"),
      L(lang, "VYNTEX ERP: business software for your industry", "VYNTEX ERP: software de gestión para tu industria"),
    ],
    actions: [servicesLink(lang), bookAction(lang)],
    suggestions: [pick("growth"), pick("aifront"), pick("brand-bundle")].map((s) => L(lang, `Tell me about ${s.name.en}`, `Cuéntame de ${s.name.es}`)).concat(L(lang, "What do I need for my business?", "¿Qué necesito para mi negocio?")),
  };
}

function timeline(lang: Lang): Reply {
  return {
    intent: "timeline",
    text: L(lang, "It depends on the service. Typical ready-in times:", "Depende del servicio. Tiempos típicos de entrega:"),
    lines: ["brand-logo", "web-basic", "crm-basic", "web-std", "growth", "complete"].map((id) => {
      const s = SERVICES.find((x) => x.id === id)!;
      return `${s.name[lang]}: ${s.readyIn[lang]}`;
    }).concat(L(lang, "Your written proposal confirms the exact date before work starts", "Tu propuesta por escrito confirma la fecha exacta antes de empezar")),
    actions: [bookAction(lang), servicesLink(lang)],
    suggestions: [L(lang, "What do I need for my business?", "¿Qué necesito para mi negocio?"), L(lang, "What's included?", "¿Qué incluye?")],
  };
}

function included(lang: Lang): Reply {
  return {
    intent: "included",
    text: L(lang, "Every project includes:", "Todo proyecto incluye:"),
    lines: [
      L(lang, "A free consultation and a written proposal with the scope before we start", "Una consulta gratis y una propuesta por escrito con el alcance antes de empezar"),
      L(lang, "Setup and technical delivery by the VYNTEX team", "Configuración y entrega técnica por el equipo de VYNTEX"),
      L(lang, "Everything in English and Spanish", "Todo en inglés y español"),
      L(lang, "The final files and accounts are yours", "Los archivos y cuentas finales son tuyos"),
    ],
    actions: [bookAction(lang)],
    suggestions: [L(lang, "What's not included?", "¿Qué no está incluido?"), L(lang, "Tell me about the Brand Bundle", "Cuéntame del Paquete de marca")],
  };
}

function excluded(lang: Lang): Reply {
  return {
    intent: "excluded",
    text: L(lang, "Our quotes cover our work. Billed separately by the provider, directly to you:", "Nuestras cotizaciones cubren nuestro trabajo. Aparte, lo cobra el proveedor directamente a ti:"),
    lines: [
      L(lang, "Hosting and domains", "Hosting y dominios"),
      L(lang, "Software or CRM licenses", "Licencias de software o CRM"),
      L(lang, "Email and text message sending", "Envío de correos y mensajes de texto"),
      L(lang, "Advertising spend", "Inversión en publicidad"),
      L(lang, "Premium plugins and stock images", "Plugins premium e imágenes de stock"),
      L(lang, "We tell you each cost before we start, so there are no surprises", "Te decimos cada costo antes de empezar, sin sorpresas"),
    ],
    actions: [bookAction(lang)],
    suggestions: [L(lang, "What does it cost?", "¿Cuánto cuesta?"), L(lang, "How long does it take?", "¿Cuánto tarda?")],
  };
}

function consultation(lang: Lang, s?: ServiceItem): Reply {
  return {
    intent: "consultation",
    text: L(lang, "Great. The free consultation takes 30 minutes, by phone or video, in English or Spanish. You'll leave with a clear recommendation and its price, no obligation. Pick a time below and a person confirms within one business day.", "Perfecto. La consulta gratis dura 30 minutos, por teléfono o video, en inglés o español. Sales con una recomendación clara y su precio, sin compromiso. Elige un horario abajo y una persona te confirma en un día hábil."),
    actions: [bookAction(lang, s ? serviceConsult(s) : undefined, s ? L(lang, `I'm interested in ${s.name.en}.`, `Me interesa ${s.name.es}.`) : undefined), whatsapp(lang), call(lang)],
  };
}

function contact(lang: Lang): Reply {
  const a = SITE.address;
  return {
    intent: "contact",
    text: L(lang, "Here's how to reach a real person on our team. We reply within one business day.", "Así hablas con una persona de nuestro equipo. Respondemos en un día hábil."),
    lines: [
      L(lang, `Call, text or WhatsApp: ${SITE.phone}`, `Llamada, texto o WhatsApp: ${SITE.phone}`),
      L(lang, `Email: ${SITE.email}`, `Correo: ${SITE.email}`),
      L(lang, `Office: ${a.street}, ${a.locality}, ${a.region} ${a.postalCode}`, `Oficina: ${a.street}, ${a.locality}, ${a.region} ${a.postalCode}`),
    ],
    actions: [whatsapp(lang), call(lang), email(lang), bookAction(lang)],
  };
}

function hours(lang: Lang): Reply {
  return {
    intent: "hours",
    text: L(lang, `Message us any time at ${SITE.phone} (call, text or WhatsApp) or ${SITE.email}, and a person replies within one business day. To pick a set time, book the free consultation.`, `Escríbenos cuando quieras al ${SITE.phone} (llamada, texto o WhatsApp) o a ${SITE.email}, y una persona te responde en un día hábil. Para elegir un horario fijo, agenda la consulta gratis.`),
    actions: [bookAction(lang), whatsapp(lang)],
  };
}

function languages(lang: Lang): Reply {
  return {
    intent: "languages",
    text: L(lang, "Yes. Everything we do is in English and Spanish: the conversation, your website, your automations, VYNTEX ERP and your support. You can switch language any time.", "Sí. Todo lo que hacemos es en inglés y español: la conversación, tu página web, tus automatizaciones, VYNTEX ERP y tu soporte. Puedes cambiar de idioma cuando quieras."),
    actions: [bookAction(lang), whatsapp(lang)],
    suggestions: [L(lang, "What do you do?", "¿Qué hacen?")],
  };
}

function support(lang: Lang): Reply {
  return {
    intent: "support",
    text: L(lang, "Your written proposal spells out the support included and how changes are handled after delivery. For an active project, message us and the team picks it up.", "Tu propuesta por escrito indica el soporte incluido y cómo se manejan los cambios después de la entrega. Si tienes un proyecto activo, escríbenos y el equipo lo atiende."),
    actions: [whatsapp(lang), email(lang), { kind: "link", label: L(lang, "Client Portal", "Portal de clientes"), href: "/portal" }],
  };
}

function reseller(lang: Lang): Reply {
  return {
    intent: "reseller",
    text: L(lang, "The Authorized Reseller Program lets you offer VYNTEX services to your own clients while we handle the technical delivery:", "El Programa de Revendedor Autorizado te permite ofrecer los servicios de VYNTEX a tus propios clientes mientras nosotros hacemos la entrega técnica:"),
    lines: [
      L(lang, `${RESELLER_PROGRAM.activationFee} annual activation`, `Activación anual de ${RESELLER_PROGRAM.activationFee}`),
      L(lang, `Minimum of ${RESELLER_PROGRAM.minimumResalesPerYear} resales per 12-month period`, `Mínimo de ${RESELLER_PROGRAM.minimumResalesPerYear} reventas por periodo de 12 meses`),
      L(lang, "Approval and a signed agreement are required", "Se requiere aprobación y firmar el acuerdo"),
      L(lang, "Wholesale pricing is confidential and opens after activation", "El precio mayorista es confidencial y se abre después de la activación"),
      L(lang, "VYNTEX handles delivery; you own the client relationship", "VYNTEX hace la entrega; la relación con el cliente es tuya"),
    ],
    actions: [{ kind: "link", label: L(lang, "Partner program", "Programa de socios"), href: lang === "es" ? "/es/socios" : "/partners" }, { kind: "link", label: L(lang, "Apply", "Aplicar"), href: "/partners/apply" }, bookAction(lang, ["reseller"])],
  };
}

function blueprint(lang: Lang): Reply {
  return {
    intent: "blueprint",
    text: `${AI_BLUEPRINT.name[lang]}: ${AI_BLUEPRINT.line[lang]}`,
    lines: [...AI_BLUEPRINT.includes[lang]],
    actions: [bookAction(lang, ["other"], L(lang, "I'd like an AI Blueprint for a custom project.", "Quiero un AI Blueprint para un proyecto a la medida."))],
    suggestions: [L(lang, "Tell me about Advanced AI", "Cuéntame de IA avanzada"), L(lang, "Tell me about the Custom Website", "Cuéntame del sitio a la medida")],
  };
}

function erpReply(lang: Lang): Reply {
  return {
    intent: "erp",
    text: L(lang, "VYNTEX ERP is our business software: leads, clients, jobs, scheduling, documents, e-signature, payments, your team, automations and reports in one place, set up for your industry. Which industry are you in? I'll show you your edition.", "VYNTEX ERP es nuestro software de gestión: prospectos, clientes, trabajos, agenda, documentos, firma electrónica, pagos, tu equipo, automatizaciones y reportes en un solo lugar, adaptado a tu industria. ¿En qué industria estás? Te muestro tu edición."),
    lines: [
      L(lang, "Live demo opens instantly with a sample company, no account", "La demo en vivo abre al instante con una empresa de ejemplo, sin cuenta"),
      L(lang, "7-day free trial, then Basic, Essential or Pro", "Prueba gratis de 7 días, luego Básico, Esencial o Pro"),
      L(lang, "VYNTEX AI built in on Essential and Pro", "VYNTEX AI incluido en Esencial y Pro"),
    ],
    actions: [erpDemo(lang), erpPricing(lang), erpTrial(lang), guidedDemo(lang)],
    suggestions: EDITIONS.slice(0, 4).map((e) => L(lang, `ERP for ${e.en}`, `ERP para ${e.es}`)).concat(L(lang, "ERP for Barbershops", "ERP para Barberías")),
  };
}

function erpPlans(lang: Lang, industry?: string): Reply {
  return {
    intent: "erp.plans",
    text: L(lang, "VYNTEX ERP has the same three plans for every industry, with monthly or yearly billing and no setup fee:", "VYNTEX ERP tiene los mismos tres planes para cada industria, con pago mensual o anual y sin costo de instalación:"),
    lines: [
      L(lang, "Basic: for the owner working alone. Every core feature, agreements and invoices", "Básico: para el dueño que trabaja solo. Todas las funciones principales, acuerdos y facturas"),
      L(lang, "Essential (most popular): up to 5 users, worker portal, 1099 tracking, VYNTEX AI for questions, two-way Google Calendar and automatic client emails", "Esencial (el más popular): hasta 5 usuarios, portal del equipo, seguimiento 1099, VYNTEX AI para preguntas, Google Calendar en ambos sentidos y correos automáticos a clientes"),
      L(lang, "Pro: unlimited users, 1099 reports and filing, full VYNTEX AI, profit reports and priority phone support", "Pro: usuarios ilimitados, reportes y presentación de 1099, VYNTEX AI completo, reportes de ganancia y soporte prioritario por teléfono"),
      L(lang, "Current monthly and yearly prices are on the plans page", "Los precios mensuales y anuales actuales están en la página de planes"),
    ],
    actions: [erpPricing(lang, industry), erpTrial(lang), erpDemo(lang, industry), guidedDemo(lang, industry)],
    suggestions: [L(lang, "How does the free trial work?", "¿Cómo funciona la prueba gratis?"), L(lang, "Book a free guided demo", "Agendar una demo guiada")],
  };
}

function erpTrialReply(lang: Lang, industry?: string): Reply {
  return {
    intent: "erp.trial",
    text: L(lang, "You can try VYNTEX ERP free for 7 days with every feature open. Sign up from erp.vyntexusa.com, pick your industry, and you get your own workspace. When the trial ends, you choose Basic, Essential or Pro.", "Puedes probar VYNTEX ERP gratis por 7 días con todas las funciones abiertas. Regístrate en erp.vyntexusa.com, elige tu industria y recibes tu propio espacio de trabajo. Al terminar la prueba eliges Básico, Esencial o Pro."),
    actions: [erpTrial(lang), erpDemo(lang, industry), erpPricing(lang, industry)],
  };
}

function demoReply(lang: Lang, industry?: string): Reply {
  return {
    intent: "erp.demo",
    text: L(lang, "Two ways to see it: open the live demo right now (a sample company with made-up records, no account needed), or book a free guided demo and we walk you through your industry's edition in English or Spanish.", "Dos formas de verlo: abre la demo en vivo ahora mismo (una empresa de ejemplo con datos inventados, sin cuenta) o agenda una demo guiada gratis y te mostramos la edición de tu industria en inglés o español."),
    actions: [erpDemo(lang, industry), guidedDemo(lang, industry)],
  };
}

function recommendAsk(lang: Lang): Reply {
  return {
    intent: "recommend.ask",
    text: L(lang, "Happy to point you to the right thing. What's the biggest problem right now?", "Con gusto te oriento. ¿Cuál es el problema más grande ahora mismo?"),
    suggestions: [
      L(lang, "I keep missing calls", "Se me pierden llamadas"),
      L(lang, "I need a website", "Necesito una página web"),
      L(lang, "Leads aren't followed up", "No le doy seguimiento a los prospectos"),
      L(lang, "I need a logo and brand", "Necesito logo y marca"),
      L(lang, "I want software to run my business", "Quiero un software para manejar mi negocio"),
      L(lang, "I need help with social media", "Necesito ayuda con redes sociales"),
    ],
  };
}

function results(lang: Lang): Reply {
  return {
    intent: "results",
    text: L(lang, "We set up well-structured systems that make it much harder to lose a lead, but we don't guarantee a specific number of leads, sales or rankings. Anyone who does should be treated with caution. Your proposal states exactly what you get.", "Construimos sistemas bien hechos que hacen mucho más difícil perder un prospecto, pero no garantizamos un número de prospectos, ventas o posiciones. Desconfía de quien lo haga. Tu propuesta dice exactamente lo que recibes."),
    actions: [bookAction(lang)],
  };
}

function payment(lang: Lang): Reply {
  return {
    intent: "payment",
    text: L(lang, "Payment terms are set in your written proposal, after the free consultation, so you know every amount and date before anything starts. VYNTEX ERP plans are paid monthly or yearly by card, Apple Pay, Google Pay or bank debit.", "Las condiciones de pago se fijan en tu propuesta por escrito, después de la consulta gratis, así conoces cada monto y fecha antes de empezar. Los planes de VYNTEX ERP se pagan mensual o anualmente con tarjeta, Apple Pay, Google Pay o débito bancario."),
    actions: [bookAction(lang), erpPricing(lang)],
  };
}

function portfolio(lang: Lang): Reply {
  return {
    intent: "portfolio",
    text: L(lang, "The fastest way to see our work is the VYNTEX ERP live demo, which opens instantly, and our case studies page. In the consultation we can also show examples close to your industry.", "La forma más rápida de ver nuestro trabajo es la demo en vivo de VYNTEX ERP, que abre al instante, y nuestra página de casos. En la consulta también te mostramos ejemplos de tu industria."),
    actions: [{ kind: "link", label: L(lang, "Case studies", "Casos"), href: "/case-studies" }, erpDemo(lang), bookAction(lang)],
  };
}

function marketing(lang: Lang): Reply {
  return {
    intent: "marketing",
    text: L(lang, "Yes. Our digital marketing work covers local SEO, your Google Business Profile, social media and campaigns, connected to your website and CRM so every new lead is answered and followed up.", "Sí. Nuestro marketing digital cubre SEO local, tu perfil de Google Business, redes sociales y campañas, conectado a tu página web y CRM para que cada prospecto nuevo reciba respuesta y seguimiento."),
    lines: [
      L(lang, "Ad spend is billed by the ad platform directly to you", "La inversión en anuncios la pagas tú directo a la plataforma"),
      L(lang, "We don't promise rankings or a number of leads; your proposal states exactly what we do", "No prometemos posiciones ni número de prospectos; tu propuesta dice exactamente lo que hacemos"),
    ],
    actions: [{ kind: "link", label: L(lang, "Digital marketing", "Marketing digital"), href: lang === "es" ? "/es/servicios/marketing-digital" : "/services/digital-marketing" }, bookAction(lang, ["digital_marketing"])],
    suggestions: [L(lang, "Tell me about Social Media Management", "Cuéntame del Manejo de redes"), L(lang, "Tell me about the Growth package", "Cuéntame del paquete Growth")],
  };
}

function fallback(lang: Lang): Reply {
  return {
    intent: "fallback",
    text: L(lang, "I want to get this right rather than guess. A person on our team can answer that within one business day, or try asking another way. Here are things I know well:", "Prefiero no adivinar. Una persona de nuestro equipo te responde en un día hábil, o pregúntame de otra forma. Esto lo sé muy bien:"),
    actions: [whatsapp(lang), bookAction(lang)],
    suggestions: starterChips(lang),
  };
}
