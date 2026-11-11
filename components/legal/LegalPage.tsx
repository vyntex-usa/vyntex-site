"use client";

import { useLang } from "@/context/LanguageContext";
import { LEGAL, LEGAL_EFFECTIVE_DATE, type LegalKey } from "@/lib/legal";
import Container from "@/components/ui/Container";
import GlowCard from "@/components/ui/GlowCard";

/**
 * Renders a legal document in the active language. Bilingual by the same
 * mechanism as the rest of the site, so a Spanish-speaking client reads the
 * policy in Spanish rather than being handed an English PDF.
 */
export default function LegalPage({ doc }: { doc: LegalKey }) {
  const { t, lang } = useLang();
  const content = LEGAL[doc][lang];

  // noon, so the date never shifts to the day before in a US time zone
  const date = new Date(`${content.effective ?? LEGAL_EFFECTIVE_DATE}T12:00:00`).toLocaleDateString(
    lang === "es" ? "es-US" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold leading-tight text-vx-ink sm:text-4xl">
            {content.title}
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-wide text-vx-blue">
            {content.updated}: {date}
          </p>
          <p className="mt-5 text-vx-muted sm:text-lg">{content.intro}</p>

          <div className="mt-12 flex flex-col gap-8">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-semibold text-vx-ink">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 40)}
                    className="mt-2.5 leading-relaxed text-vx-muted"
                  >
                    {p}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="mt-3 flex flex-col gap-2">
                    {section.bullets.map((b) => (
                      <li
                        key={b.slice(0, 40)}
                        className="flex gap-2.5 text-sm leading-relaxed text-vx-silver"
                      >
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-vx-blue" />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.after?.map((p) => (
                  <p
                    key={p.slice(0, 40)}
                    className="mt-3 leading-relaxed text-vx-muted"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <GlowCard className="mt-12 p-6">
            <p className="text-sm text-vx-muted">
              {t.legal.questions}{" "}
              <a
                href={`mailto:${t.legal.emailAddress}`}
                className="text-vx-blue underline-offset-4 hover:underline"
              >
                {t.legal.emailAddress}
              </a>
            </p>
          </GlowCard>
        </div>
      </Container>
    </section>
  );
}
