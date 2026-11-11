/**
 * Reads a "Book a Free Demo" address (/contact?intent=demo, /es/contacto?intent=demo)
 * and turns its optional parameters into form pre-fill. Pure, so it is shared
 * by the modal and the unit tests.
 *
 *   intent=demo                 opens the demo form
 *   industry=<edition>          pre-fills the industry (contractors, clean, landscape, ...; 'build' is the old id for contractors and still works)
 *   plan=<0|1|2>&billing=<monthly|yearly>  notes the plan the person picked
 */

export interface DemoPrefill {
  industry?: string;
  message?: string;
}

const EDITIONS: Record<string, { en: string; es: string }> = {
  build: { en: "General contractors", es: "Contratistas generales" },
  contractors: { en: "General contractors", es: "Contratistas generales" },
  clean: { en: "Cleaning services", es: "Servicios de limpieza" },
  landscape: { en: "Landscaping", es: "Jardinería y paisajismo" },
  wash: { en: "Pressure washing, windows and gutters", es: "Lavado a presión, ventanas y canaletas" },
  haul: { en: "Junk removal and moving", es: "Retiro de basura y mudanzas" },
  snow: { en: "Snow removal", es: "Remoción de nieve" },
  turnover: { en: "Property turnover and make-ready", es: "Preparación de propiedades entre inquilinos" },
  events: { en: "Event setup and staffing", es: "Montaje y personal para eventos" },
  hvac: { en: "HVAC: heating, cooling and air quality", es: "Calefacción, aire acondicionado y calidad del aire" },
  plumbing: { en: "Plumbing", es: "Plomería" },
  practice: { en: "Professional services", es: "Servicios profesionales" },
  barber: { en: "Barbershops", es: "Barberías" },
};

const PLANS = {
  en: ["entry plan", "middle plan", "top plan"],
  es: ["plan de entrada", "plan intermedio", "plan superior"],
} as const;

export function isDemoIntent(search: string): boolean {
  return new URLSearchParams(search).get("intent") === "demo";
}

export function demoPrefillFromSearch(search: string, lang: "en" | "es"): DemoPrefill {
  const params = new URLSearchParams(search);
  const prefill: DemoPrefill = {};

  const edition = params.get("industry")?.trim().toLowerCase();
  const editionLabel = edition ? EDITIONS[edition] : undefined;
  if (editionLabel) prefill.industry = editionLabel[lang];

  const plan = params.get("plan");
  const billing = params.get("billing");
  if (plan === "0" || plan === "1" || plan === "2") {
    const name = PLANS[lang][Number(plan)] ?? PLANS[lang][0];
    const billed =
      billing === "monthly" || billing === "yearly"
        ? lang === "es"
          ? `, con pago ${billing === "yearly" ? "anual" : "mensual"}`
          : `, billed ${billing}`
        : "";
    prefill.message =
      lang === "es" ? `Plan que me interesa: ${name}${billed}.` : `Plan I'm interested in: ${name}${billed}.`;
  }

  return prefill;
}
