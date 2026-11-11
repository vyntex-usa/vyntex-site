"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, DraftingCompass, Search, Wrench } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/home/ScrollReveal";
import { useLang } from "@/context/LanguageContext";
import { revealVariants, staggerVariants } from "@/components/home/motion";

const copy = {
  en: {
    eyebrow: "IMPLEMENTATION",
    title: "A Clear Path From Scattered Tools to a Working System",
    items: [
      ["01", "Review", "We identify your current tools, manual work, and operational gaps."],
      ["02", "Design", "We map the connected workflow and recommend what should stay, connect, or change."],
      ["03", "Implement", "We configure, automate, test, launch, and support the approved system."],
    ],
  },
  es: {
    eyebrow: "IMPLEMENTACIÓN",
    title: "Un Camino Claro de Herramientas Dispersas a un Sistema Funcional",
    items: [
      ["01", "Revisión", "Identificamos sus herramientas actuales, trabajo manual y brechas operativas."],
      ["02", "Diseño", "Trazamos el flujo conectado y recomendamos qué mantener, conectar o cambiar."],
      ["03", "Construcción", "Configuramos, automatizamos, probamos, lanzamos y apoyamos el sistema aprobado."],
    ],
  },
} as const;

const icons = [Search, DraftingCompass, Wrench] as const;

export default function ImplementationProcess() {
  const { lang } = useLang();
  const c = copy[lang];
  const reduceMotion = useReducedMotion();
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-vx-cyan">{c.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] sm:text-5xl">{c.title}</h2>
        </ScrollReveal>
        <motion.ol className="process-grid mt-10" variants={staggerVariants} initial={reduceMotion ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {c.items.map(([number, title, body], index) => { const Icon = icons[index]!; return (
            <motion.li key={title} variants={revealVariants} className="process-card">
              <div className="flex items-center justify-between"><span className="font-mono text-xs tracking-[0.2em] text-vx-cyan">{number}</span><Icon size={20} className="text-vx-silver" aria-hidden /></div>
              <h3 className="mt-6 text-2xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-vx-muted">{body}</p>
              <div className="process-visual" aria-hidden><span /><span /><span /><CheckCircle2 size={15} /></div>
            </motion.li>
          ); })}
        </motion.ol>
      </Container>
    </section>
  );
}
