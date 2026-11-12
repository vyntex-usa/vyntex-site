import { describe, expect, it } from "vitest";
import { respond, detectLang, matchEdition, type Context } from "@/lib/assistant/engine";
import { RESELLER_PROGRAM } from "@/lib/reseller-program";

const intent = (q: string, lang: "en" | "es" = "en", ctx: Context = {}) => respond(q, lang, ctx).reply.intent;

describe("VYNTEX Assistant engine", () => {
  it("answers the topic buttons in both languages", () => {
    const cases: [string, "en" | "es", string][] = [
      ["What does it cost?", "en", "pricing"], ["¿Cuánto cuesta?", "es", "pricing"],
      ["What do you do?", "en", "services"], ["¿Qué hacen?", "es", "services"],
      ["How long does it take?", "en", "timeline"], ["¿Cuánto tarda?", "es", "timeline"],
      ["What's included?", "en", "included"], ["¿Qué incluye?", "es", "included"],
      ["What's NOT included?", "en", "excluded"], ["¿Qué NO incluye?", "es", "excluded"],
      ["Reseller program", "en", "reseller"], ["Programa de revendedor", "es", "reseller"],
      ["Support & changes", "en", "support"], ["Soporte y cambios", "es", "support"],
      ["Do you work in Spanish?", "en", "languages"], ["¿Trabajan en español?", "es", "languages"],
      ["Talk to a person", "en", "contact"], ["Hablar con una persona", "es", "contact"],
    ];
    for (const [q, lang, want] of cases) expect(intent(q, lang), q).toBe(want);
  });

  it("understands typed questions", () => {
    expect(intent("I keep missing calls")).toMatch(/^(service\.overview|recommend\.match)$/);
    expect(intent("I need a website")).toBe("recommend.match");
    expect(intent("tell me about the brand bundle")).toBe("service.overview");
    expect(intent("does it include whatsapp")).toBe("service.overview");
    expect(intent("I own a cleaning company, do you have software?")).toBe("erp.edition");
    expect(intent("tengo una barberia", "es")).toBe("erp.edition");
    expect(intent("what are the erp plans")).toBe("erp.plans");
    expect(intent("free trial")).toBe("erp.trial");
    expect(intent("payment plans?")).toBe("payment");
    expect(intent("can you do seo")).toBe("marketing");
    expect(intent("custom app")).toBe("blueprint");
    expect(intent("asdkjh qwe")).toBe("fallback");
  });

  it("follows the conversation", () => {
    let ctx: Context = {};
    const step = (q: string) => {
      const r = respond(q, "en", ctx);
      ctx = r.ctx;
      return r.reply.intent;
    };
    expect(step("tell me about standard website")).toBe("service.overview");
    expect(step("how long does it take?")).toBe("service.timeline");
    expect(step("what's not included?")).toBe("service.excluded");
    expect(step("I'm a landscaper")).toBe("erp.edition");
    expect(step("what are the plans")).toBe("erp.plans");
  });

  it("answers in the language the visitor writes in", () => {
    expect(detectLang("cuanto cuesta una pagina web", "en")).toBe("es");
    expect(detectLang("how much is a website", "es")).toBe("en");
  });

  it("maps every industry to an ERP edition", () => {
    expect(matchEdition("i run a plumbing company")?.id).toBe("plumbing");
    expect(matchEdition("soy contratista")?.id).toBe("contractors");
    expect(matchEdition("tax and bookkeeping office")?.id).toBe("practice");
  });

  it("never states a service price; the only dollar figure is the published reseller activation fee", () => {
    const questions = [
      "how much is a website", "price of growth", "cost of the brand bundle", "erp pricing", "how much is the ai front desk",
      "cuanto cuesta el logo", "precio del crm", "what does it cost", "reseller program",
    ];
    for (const q of questions) {
      const r = respond(q, "en").reply;
      const all = [r.text, ...(r.lines ?? [])].join(" ");
      const dollars = all.match(/\$\s?\d[\d,.]*/g) ?? [];
      for (const d of dollars) expect(d, q).toBe(RESELLER_PROGRAM.activationFee);
    }
  });

  it("uses only the official VYNTEX phone number", () => {
    const r = respond("what is your phone number", "en").reply;
    const all = [r.text, ...(r.lines ?? [])].join(" ");
    expect(all).toContain("609-780-3218");
    expect(all).not.toContain("813-0633");
  });
});
