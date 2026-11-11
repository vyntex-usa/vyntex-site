import { describe, expect, it } from "vitest";
import {
  demoRequestSchema,
  isAcceptableDemoDate,
  isDemoRequestBody,
} from "@/lib/validation/demo-request";
import { consultationSchema } from "@/lib/validation/consultation";
import { demoPrefillFromSearch, isDemoIntent } from "@/lib/demo-intent";
import { demoBookingHref } from "@/lib/site";

const valid = {
  requestType: "demo",
  fullName: "Ana Ruiz",
  businessName: "Acme Cleaning LLC",
  email: "ana@example.com",
  phone: "609-555-0100",
  industry: "Cleaning services",
  teamSize: "6_15",
  preferredDate: "",
  preferredTime: "morning",
  preferredContact: "whatsapp",
  message: "",
  consent: true,
  language: "es",
};

describe("Book a Free Demo validation", () => {
  it("accepts a complete demo request", () => {
    expect(demoRequestSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an empty submission with an error for every required field", () => {
    const result = demoRequestSchema.safeParse({ requestType: "demo" });
    expect(result.success).toBe(false);
    if (result.success) return;
    const fields = new Set(result.error.issues.map((i) => i.path[0]));
    for (const f of ["fullName", "businessName", "email", "industry", "teamSize", "preferredTime", "preferredContact", "consent"]) {
      expect(fields.has(f), f).toBe(true);
    }
  });

  it("rejects unknown option values", () => {
    expect(demoRequestSchema.safeParse({ ...valid, teamSize: "1000" }).success).toBe(false);
    expect(demoRequestSchema.safeParse({ ...valid, preferredTime: "midnight" }).success).toBe(false);
  });

  it("only accepts real dates from today on, within a year", () => {
    const now = new Date("2026-10-22T15:00:00Z");
    expect(isAcceptableDemoDate("2026-10-22", now)).toBe(true);
    expect(isAcceptableDemoDate("2026-11-03", now)).toBe(true);
    expect(isAcceptableDemoDate("2026-10-01", now)).toBe(false);
    expect(isAcceptableDemoDate("2026-02-31", now)).toBe(false);
    expect(isAcceptableDemoDate("2028-01-01", now)).toBe(false);
    expect(isAcceptableDemoDate("next tuesday", now)).toBe(false);
  });

  it("is told apart from a consultation only by requestType, so old consultation bodies still validate", () => {
    expect(isDemoRequestBody(valid)).toBe(true);
    expect(isDemoRequestBody({ ...valid, requestType: undefined })).toBe(false);
    expect(isDemoRequestBody(null)).toBe(false);
    const consultation = consultationSchema.safeParse({
      fullName: "Ana Ruiz",
      email: "ana@example.com",
      services: ["crm"],
      budget: "unsure",
      timeline: "asap",
      preferredContact: "email",
      message: "We need a CRM for our office.",
      consent: true,
    });
    expect(consultation.success).toBe(true);
  });
});

describe("Book a Free Demo links", () => {
  it("point to the website demo form, in each language", () => {
    expect(demoBookingHref()).toBe("/contact?intent=demo");
    expect(demoBookingHref({ lang: "es" })).toBe("/es/contacto?intent=demo");
    expect(demoBookingHref({ lang: "en", absolute: true })).toBe("https://www.vyntexusa.com/contact?intent=demo");
  });

  it("read intent, industry and plan from the address", () => {
    expect(isDemoIntent("?intent=demo")).toBe(true);
    expect(isDemoIntent("?intent=other")).toBe(false);
    expect(demoPrefillFromSearch("?intent=demo&industry=clean&plan=1&billing=yearly", "en")).toEqual({
      industry: "Cleaning services",
      message: "Plan I'm interested in: middle plan, billed yearly.",
    });
    expect(demoPrefillFromSearch("?intent=demo&industry=build&plan=0&billing=monthly", "es")).toEqual({
      industry: "Contratistas generales",
      message: "Plan que me interesa: plan de entrada, con pago mensual.",
    });
    expect(demoPrefillFromSearch("?intent=demo&industry=<script>&plan=9", "en")).toEqual({});
  });
});
