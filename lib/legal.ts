import { SITE } from "@/lib/site";

/**
 * Legal page content — bilingual, factual, and derived from what this
 * application ACTUALLY does.
 *
 * Every claim below is verifiable against the code:
 *  - "we hash IPs" -> lib/request.ts#hashIp
 *  - "we do not store card details" -> Square-hosted Payment Links; there is no
 *    card field anywhere in this codebase
 *  - "we retain your signed agreement" -> reseller_agreements + private bucket
 *
 * No invented certifications, no unearned compliance badges, no promises the
 * software does not keep. Where a policy is a business decision rather than a
 * code fact (e.g. retention periods), it is stated as the current practice.
 */

export const LEGAL_EFFECTIVE_DATE = "2026-01-01";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  /** Paragraphs shown after the bullets. */
  after?: string[];
}

export interface LegalDocument {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  /** The date this document last changed, when it differs from LEGAL_EFFECTIVE_DATE (YYYY-MM-DD). */
  effective?: string;
}

type Lang = "en" | "es";

const CONTACT = `${SITE.email} · ${SITE.phone} · ${SITE.address.locality}, ${SITE.address.region} ${SITE.address.postalCode}`;

// ---------------------------------------------------------------- PRIVACY
const privacyEn: LegalDocument = {
  title: "Privacy Policy",
  effective: "2026-11-12",
  updated: "Last updated",
  intro:
    "This policy explains what VYNTEX collects, why, and what we do with it. It describes how this website actually behaves — not a generic template.",
  sections: [
    {
      heading: "1. Who we are",
      paragraphs: [
        `VYNTEX is a digital technology agency based in ${SITE.address.locality}, ${SITE.address.region}, serving businesses across the United States in English and Spanish. You can reach us at ${CONTACT}.`,
      ],
    },
    {
      heading: "2. What we collect",
      paragraphs: [
        "We collect only what a given interaction needs. We do not sell personal information, and we do not run advertising trackers on this site.",
      ],
      bullets: [
        "Contact and consultation forms: your name, business name, email, phone, the services you selected, and your message.",
        "Account and login: your email address. We use one-time codes; we never store a password.",
        "Reseller applications: your business details, location, client count, services of interest, and how you plan to resell.",
        "Signed agreements: your typed legal name, business name, title, email, the time you signed, your browser user agent, and a one-way hash of your IP address.",
        "Orders: what you bought, the amount, and your contact details. Payment card details are entered on Square's hosted page and are never sent to, seen by, or stored on VYNTEX systems.",
        "Uploaded files: only files you deliberately upload, stored in a private bucket that is not publicly reachable.",
      ],
    },
    {
      heading: "3. IP addresses",
      paragraphs: [
        "We do not store raw IP addresses. Where an IP is recorded — for abuse prevention, rate limiting, and as evidence attached to an electronic signature — it is stored only as a salted one-way SHA-256 hash. The original address cannot be recovered from what we keep.",
      ],
    },
    {
      heading: "4. Payments",
      paragraphs: [
        "Payments are processed by Square through their hosted checkout. Your card number, expiry, and security code are entered on Square's page and are handled entirely by Square. This website contains no card entry field of any kind. We receive from Square only the fact that a payment succeeded, its amount, and its identifiers.",
      ],
    },
    {
      heading: "5. Cookies and local storage",
      paragraphs: [
        "We use no advertising cookies and no third-party analytics trackers. We use: an authentication session cookie set by Supabase when you sign in, and a browser localStorage entry that remembers whether you prefer English or Spanish. See our Cookie Policy for detail.",
      ],
    },
    {
      heading: "6. Who we share with",
      paragraphs: [
        "We share data only with the service providers required to run this site, and only what each one needs to do its job:",
      ],
      bullets: [
        "Supabase — database, authentication, and private file storage.",
        "Square — payment processing.",
        "Resend — transactional email delivery.",
        "Upstash — rate limiting (stores request counters, not personal data).",
        "Vercel — application hosting.",
      ],
    },
    {
      heading: "7. Retention",
      paragraphs: [
        "Form submissions and account data are kept while your relationship with VYNTEX is active and for as long as needed for legitimate business and legal purposes. Signed reseller agreements and their audit records are retained for the life of the agreement and afterwards, because they are legal records — the agreement's confidentiality and non-circumvention obligations survive termination.",
      ],
    },
    {
      heading: "8. Your choices",
      paragraphs: [
        `You may request access to, correction of, or deletion of your personal information by emailing ${SITE.email}. We will respond within a reasonable period. Note that we cannot delete a signed agreement or payment record where we are required to retain it, and we will tell you plainly when that applies.`,
      ],
    },
    {
      heading: "9. Google user data in VYNTEX ERP",
      paragraphs: [
        "When a company connects a Google account in VYNTEX ERP (Settings, Integrations), VYNTEX ERP asks Google only for what each connection needs:",
      ],
      bullets: [
        "Gmail (send only): to send the emails a person chooses to send from VYNTEX ERP, such as invoices, contracts, signature requests and messages to their own clients, from that person's own address. VYNTEX ERP does not read, search or store the mailbox.",
        "Google Calendar and Google Meet: to create a separate \"VYNTEX ERP\" calendar in the connected account, keep the company's appointments on it, and add Google Meet links to video appointments. VYNTEX ERP works only with the calendar it creates, never with the account's other calendars.",
        "Email address and basic profile: to show which Google account is connected.",
      ],
      after: [
        "Access tokens are stored encrypted and are used only to perform these actions for the company that connected them. VYNTEX ERP does not sell Google user data, does not use it for advertising, and does not use it to develop, improve or train generalized AI or machine learning models. People at VYNTEX do not read it, except with the user's permission, for security, or where the law requires.",
        "A connection can be removed at any time with Disconnect on the Integrations screen, which deletes its stored tokens. Access can also be removed from the Google account at myaccount.google.com/permissions.",
        "VYNTEX ERP's use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.",
      ],
    },
    {
      heading: "10. Children",
      paragraphs: [
        "This is a service for businesses. It is not directed to children, and we do not knowingly collect information from anyone under 18.",
      ],
    },
    {
      heading: "11. Changes",
      paragraphs: [
        "If we change this policy we will update the date above. Material changes will be communicated to account holders by email.",
      ],
    },
  ],
};

const privacyEs: LegalDocument = {
  title: "Política de Privacidad",
  effective: "2026-11-12",
  updated: "Última actualización",
  intro:
    "Esta política explica qué recopila VYNTEX, por qué, y qué hacemos con ello. Describe cómo se comporta realmente este sitio — no es una plantilla genérica.",
  sections: [
    {
      heading: "1. Quiénes somos",
      paragraphs: [
        `VYNTEX es una agencia de tecnología digital en ${SITE.address.locality}, ${SITE.address.region}, que atiende negocios en todo Estados Unidos en inglés y español. Puedes contactarnos en ${CONTACT}.`,
      ],
    },
    {
      heading: "2. Qué recopilamos",
      paragraphs: [
        "Recopilamos solo lo que cada interacción necesita. No vendemos información personal y no usamos rastreadores publicitarios en este sitio.",
      ],
      bullets: [
        "Formularios de contacto y consulta: tu nombre, nombre del negocio, correo, teléfono, los servicios que seleccionaste y tu mensaje.",
        "Cuenta e inicio de sesión: tu correo electrónico. Usamos códigos de un solo uso; nunca guardamos una contraseña.",
        "Solicitudes de revendedor: datos de tu negocio, ubicación, número de clientes, servicios de interés y cómo planeas revender.",
        "Acuerdos firmados: tu nombre legal escrito, nombre del negocio, cargo, correo, la hora en que firmaste, el agente de usuario de tu navegador y un hash unidireccional de tu dirección IP.",
        "Pedidos: qué compraste, el monto y tus datos de contacto. Los datos de tu tarjeta se ingresan en la página alojada por Square y nunca se envían, ven ni almacenan en los sistemas de VYNTEX.",
        "Archivos subidos: solo los archivos que subes deliberadamente, guardados en un bucket privado que no es accesible públicamente.",
      ],
    },
    {
      heading: "3. Direcciones IP",
      paragraphs: [
        "No guardamos direcciones IP en texto claro. Cuando se registra una IP — para prevención de abuso, límites de solicitudes y como evidencia adjunta a una firma electrónica — se guarda únicamente como un hash SHA-256 unidireccional con sal. La dirección original no se puede recuperar de lo que conservamos.",
      ],
    },
    {
      heading: "4. Pagos",
      paragraphs: [
        "Los pagos los procesa Square mediante su checkout alojado. El número de tu tarjeta, la fecha de vencimiento y el código de seguridad se ingresan en la página de Square y los maneja Square por completo. Este sitio no contiene ningún campo de tarjeta. De Square recibimos solo el hecho de que un pago se completó, su monto y sus identificadores.",
      ],
    },
    {
      heading: "5. Cookies y almacenamiento local",
      paragraphs: [
        "No usamos cookies publicitarias ni rastreadores de analítica de terceros. Usamos: una cookie de sesión de autenticación creada por Supabase al iniciar sesión, y una entrada en localStorage que recuerda si prefieres inglés o español. Consulta nuestra Política de Cookies para más detalle.",
      ],
    },
    {
      heading: "6. Con quién compartimos",
      paragraphs: [
        "Compartimos datos solo con los proveedores necesarios para operar este sitio, y solo lo que cada uno necesita para hacer su trabajo:",
      ],
      bullets: [
        "Supabase — base de datos, autenticación y almacenamiento privado de archivos.",
        "Square — procesamiento de pagos.",
        "Resend — envío de correo transaccional.",
        "Upstash — límites de solicitudes (guarda contadores, no datos personales).",
        "Vercel — alojamiento de la aplicación.",
      ],
    },
    {
      heading: "7. Retención",
      paragraphs: [
        "Los envíos de formularios y los datos de cuenta se conservan mientras tu relación con VYNTEX esté activa y durante el tiempo necesario para fines comerciales y legales legítimos. Los acuerdos de revendedor firmados y sus registros de auditoría se conservan durante la vigencia del acuerdo y después, porque son registros legales — las obligaciones de confidencialidad y no circunvención sobreviven la terminación.",
      ],
    },
    {
      heading: "8. Tus opciones",
      paragraphs: [
        `Puedes solicitar acceso, corrección o eliminación de tu información personal escribiendo a ${SITE.email}. Responderemos en un plazo razonable. Ten en cuenta que no podemos eliminar un acuerdo firmado o un registro de pago cuando estamos obligados a conservarlo, y te lo diremos claramente cuando sea el caso.`,
      ],
    },
    {
      heading: "9. Datos de Google en VYNTEX ERP",
      paragraphs: [
        "Cuando una empresa conecta una cuenta de Google en VYNTEX ERP (Configuración, Integraciones), VYNTEX ERP le pide a Google solo lo que cada conexión necesita:",
      ],
      bullets: [
        "Gmail (solo enviar): para enviar los correos que una persona decide enviar desde VYNTEX ERP, como facturas, contratos, solicitudes de firma y mensajes a sus propios clientes, desde su propia dirección. VYNTEX ERP no lee, no busca y no guarda el buzón.",
        "Google Calendar y Google Meet: para crear un calendario aparte llamado \"VYNTEX ERP\" en la cuenta conectada, mantener allí las citas de la empresa y agregar enlaces de Google Meet a las citas por video. VYNTEX ERP trabaja solo con el calendario que crea, nunca con los demás calendarios de la cuenta.",
        "Correo y perfil básico: para mostrar qué cuenta de Google está conectada.",
      ],
      after: [
        "Los tokens de acceso se guardan cifrados y se usan solo para hacer estas acciones para la empresa que los conectó. VYNTEX ERP no vende los datos de usuario de Google, no los usa para publicidad y no los usa para desarrollar, mejorar ni entrenar modelos generales de inteligencia artificial o aprendizaje automático. Nadie en VYNTEX los lee, salvo con el permiso del usuario, por seguridad o cuando la ley lo exige.",
        "Una conexión se puede quitar en cualquier momento con Desconectar en la pantalla de Integraciones, que borra sus tokens guardados. El acceso también se puede quitar desde la cuenta de Google en myaccount.google.com/permissions.",
        "El uso y la transferencia que VYNTEX ERP hace de la información recibida de las API de Google cumple con la Política de Datos de Usuario de los Servicios de API de Google, incluidos los requisitos de Uso Limitado.",
      ],
    },
    {
      heading: "10. Menores",
      paragraphs: [
        "Este es un servicio para negocios. No está dirigido a menores y no recopilamos información a sabiendas de personas menores de 18 años.",
      ],
    },
    {
      heading: "11. Cambios",
      paragraphs: [
        "Si cambiamos esta política actualizaremos la fecha arriba. Los cambios importantes se comunicarán por correo a los titulares de cuenta.",
      ],
    },
  ],
};

// ------------------------------------------------------------------ TERMS
const termsEn: LegalDocument = {
  title: "Terms of Service",
  updated: "Last updated",
  intro:
    "These terms govern your use of vyntexusa.com and the services you order through it.",
  sections: [
    {
      heading: "1. Services",
      paragraphs: [
        "VYNTEX provides websites, AI automation, CRM systems, branding, social media, and related digital work. Prices published on this site cover VYNTEX labor and creation only.",
      ],
    },
    {
      heading: "2. What is not included",
      paragraphs: [
        "Our prices do not include third-party fees: hosting, domains, software or CRM licenses, email/SMS sending, advertising spend, premium plugins, stock assets, or any service that carries its own recurring fee. Those are billed by the provider, directly to you.",
      ],
    },
    {
      heading: "3. Support and changes",
      paragraphs: [
        "Each service includes 30 days of support after delivery, where applicable. Changes requested after that period are billed hourly at the published rate, with a one-hour minimum and 30-minute increments thereafter.",
      ],
    },
    {
      heading: "4. Quotes",
      paragraphs: [
        "Prices shown with a plus sign (for example \"$2,000+\") are starting points, not fixed prices. Work at that level is quoted per project and cannot be purchased online.",
      ],
    },
    {
      heading: "5. Payment",
      paragraphs: [
        "Payments are processed by Square. An order is confirmed only when we receive verified confirmation from Square — not when your browser returns from the payment page. Until that confirmation arrives, your order shows as awaiting payment, and we will tell you so.",
      ],
    },
    {
      heading: "6. Reseller program",
      paragraphs: [
        "The Authorized Reseller Program is governed by the separate Authorized Reseller Agreement, which each partner must sign. In the event of any conflict between these Terms and that Agreement, the Agreement controls for matters within its scope.",
      ],
    },
    {
      heading: "7. Your responsibilities",
      paragraphs: [
        "You are responsible for the accuracy of the content and materials you provide, for holding the rights to any assets you send us, and for the lawfulness of the business you conduct using what we build.",
      ],
    },
    {
      heading: "8. Intellectual property",
      paragraphs: [
        "On full payment, you own the deliverables created specifically for you. VYNTEX retains ownership of its own underlying methods, tooling, and reusable components, and may reuse them for other clients.",
      ],
    },
    {
      heading: "9. Limitation of liability",
      paragraphs: [
        "To the extent permitted by law, VYNTEX's total liability arising from a service is limited to the amount you paid for that service. We are not liable for indirect or consequential loss, including lost profits or lost data.",
      ],
    },
    {
      heading: "10. Governing law",
      paragraphs: [
        "These terms are governed by the laws of the State of New Jersey.",
      ],
    },
    {
      heading: "11. Contact",
      paragraphs: [`Questions about these terms: ${CONTACT}`],
    },
  ],
};

const termsEs: LegalDocument = {
  title: "Términos de Servicio",
  updated: "Última actualización",
  intro:
    "Estos términos rigen tu uso de vyntexusa.com y los servicios que ordenas a través de este sitio.",
  sections: [
    {
      heading: "1. Servicios",
      paragraphs: [
        "VYNTEX ofrece sitios web, automatización con IA, sistemas CRM, imagen de marca, redes sociales y trabajo digital relacionado. Los precios publicados en este sitio cubren solo la mano de obra y creación de VYNTEX.",
      ],
    },
    {
      heading: "2. Qué no está incluido",
      paragraphs: [
        "Nuestros precios no incluyen cuotas de terceros: hosting, dominios, licencias de software o CRM, envío de correos/SMS, pauta publicitaria, plugins premium, imágenes de stock, ni ningún servicio con cuota recurrente propia. Esos los cobra el proveedor directamente a ti.",
      ],
    },
    {
      heading: "3. Soporte y cambios",
      paragraphs: [
        "Cada servicio incluye 30 días de soporte después de la entrega, cuando aplica. Los cambios solicitados después de ese periodo se cobran por hora a la tarifa publicada, con un mínimo de una hora y luego en incrementos de 30 minutos.",
      ],
    },
    {
      heading: "4. Cotizaciones",
      paragraphs: [
        "Los precios con signo de más (por ejemplo \"$2,000+\") son puntos de partida, no precios fijos. El trabajo en ese nivel se cotiza por proyecto y no se puede comprar en línea.",
      ],
    },
    {
      heading: "5. Pago",
      paragraphs: [
        "Los pagos los procesa Square. Un pedido se confirma solo cuando recibimos la confirmación verificada de Square — no cuando tu navegador regresa de la página de pago. Hasta que llegue esa confirmación, tu pedido aparece como pendiente de pago, y así te lo indicamos.",
      ],
    },
    {
      heading: "6. Programa de revendedores",
      paragraphs: [
        "El Programa de Revendedor Autorizado se rige por el Acuerdo de Revendedor Autorizado, que cada socio debe firmar. En caso de conflicto entre estos Términos y ese Acuerdo, el Acuerdo prevalece en los asuntos dentro de su alcance.",
      ],
    },
    {
      heading: "7. Tus responsabilidades",
      paragraphs: [
        "Eres responsable de la exactitud del contenido y los materiales que proporcionas, de tener los derechos sobre los recursos que nos envías, y de la legalidad del negocio que realizas con lo que construimos.",
      ],
    },
    {
      heading: "8. Propiedad intelectual",
      paragraphs: [
        "Al pago total, los entregables creados específicamente para ti son tuyos. VYNTEX conserva la propiedad de sus métodos, herramientas y componentes reutilizables, y puede usarlos para otros clientes.",
      ],
    },
    {
      heading: "9. Limitación de responsabilidad",
      paragraphs: [
        "En la medida permitida por la ley, la responsabilidad total de VYNTEX derivada de un servicio se limita al monto que pagaste por ese servicio. No somos responsables por pérdidas indirectas o consecuentes, incluidas ganancias o datos perdidos.",
      ],
    },
    {
      heading: "10. Ley aplicable",
      paragraphs: [
        "Estos términos se rigen por las leyes del Estado de Nueva Jersey.",
      ],
    },
    {
      heading: "11. Contacto",
      paragraphs: [`Preguntas sobre estos términos: ${CONTACT}`],
    },
  ],
};

// ---------------------------------------------------------------- COOKIES
const cookiesEn: LegalDocument = {
  title: "Cookie Policy",
  updated: "Last updated",
  intro:
    "This site uses very few cookies. There are no advertising cookies and no third-party analytics trackers. Here is the complete list.",
  sections: [
    {
      heading: "1. Strictly necessary",
      paragraphs: [
        "These are required for the site to work. They cannot be turned off without breaking sign-in.",
      ],
      bullets: [
        "Supabase authentication cookies — set only after you sign in. They keep you signed in and are cleared when you log out.",
      ],
    },
    {
      heading: "2. Preferences (browser localStorage, not a cookie)",
      paragraphs: [
        "We store one item in your browser's local storage:",
      ],
      bullets: [
        "vx-lang — remembers whether you chose English or Spanish. It contains only \"en\" or \"es\". It is never sent to our server and it identifies nobody.",
      ],
    },
    {
      heading: "3. What we do not use",
      paragraphs: [
        "No advertising cookies. No cross-site tracking pixels. No Google Analytics, Meta Pixel, or similar third-party analytics. No fingerprinting. We did not build a cookie banner because there is nothing to consent to beyond what is strictly necessary.",
      ],
    },
    {
      heading: "4. Third parties",
      paragraphs: [
        "When you go to Square's hosted checkout, you are on Square's domain and Square's own cookie policy applies there. We do not control it and we receive no tracking data from it.",
      ],
    },
    {
      heading: "5. Controlling cookies",
      paragraphs: [
        "You can clear cookies and local storage in your browser settings at any time. Clearing them will sign you out and reset your language preference to English.",
      ],
    },
  ],
};

const cookiesEs: LegalDocument = {
  title: "Política de Cookies",
  updated: "Última actualización",
  intro:
    "Este sitio usa muy pocas cookies. No hay cookies publicitarias ni rastreadores de analítica de terceros. Esta es la lista completa.",
  sections: [
    {
      heading: "1. Estrictamente necesarias",
      paragraphs: [
        "Son necesarias para que el sitio funcione. No se pueden desactivar sin romper el inicio de sesión.",
      ],
      bullets: [
        "Cookies de autenticación de Supabase — se crean solo después de iniciar sesión. Te mantienen conectado y se eliminan al cerrar sesión.",
      ],
    },
    {
      heading: "2. Preferencias (localStorage del navegador, no una cookie)",
      paragraphs: ["Guardamos un elemento en el almacenamiento local de tu navegador:"],
      bullets: [
        "vx-lang — recuerda si elegiste inglés o español. Contiene solo \"en\" o \"es\". Nunca se envía a nuestro servidor y no identifica a nadie.",
      ],
    },
    {
      heading: "3. Lo que no usamos",
      paragraphs: [
        "Sin cookies publicitarias. Sin píxeles de rastreo entre sitios. Sin Google Analytics, Meta Pixel ni analítica de terceros similar. Sin fingerprinting. No construimos un banner de cookies porque no hay nada que consentir más allá de lo estrictamente necesario.",
      ],
    },
    {
      heading: "4. Terceros",
      paragraphs: [
        "Cuando pasas al checkout alojado de Square, estás en el dominio de Square y aplica su propia política de cookies. No la controlamos y no recibimos datos de rastreo de ella.",
      ],
    },
    {
      heading: "5. Control de cookies",
      paragraphs: [
        "Puedes borrar cookies y almacenamiento local en la configuración de tu navegador en cualquier momento. Borrarlos cerrará tu sesión y restablecerá el idioma a inglés.",
      ],
    },
  ],
};

// ---------------------------------------------------------- ACCESSIBILITY
const a11yEn: LegalDocument = {
  title: "Accessibility Statement",
  updated: "Last updated",
  intro:
    "VYNTEX builds for everyone. This statement describes what we have actually done — and, honestly, what we have not yet verified.",
  sections: [
    {
      heading: "1. Our target",
      paragraphs: [
        "We build toward WCAG 2.1 Level AA. We have not commissioned a third-party audit, so we do not claim certified conformance. We state our target and our known gaps rather than a badge we have not earned.",
      ],
    },
    {
      heading: "2. What this site does",
      paragraphs: ["Implemented across the site:"],
      bullets: [
        "Semantic HTML landmarks and a single, ordered heading hierarchy per page.",
        "A skip-to-content link as the first focusable element.",
        "Full keyboard navigation, with a visible focus ring on every interactive element.",
        "Modals that trap focus and close on the Escape key.",
        "Form labels tied to inputs, errors announced with aria-invalid and inline text.",
        "State never communicated by color alone — every status also carries text.",
        "prefers-reduced-motion respected: all movement is behind motion-safe, so animation is disabled for users who ask for that.",
        "Touch targets of at least 44px in interactive areas.",
        "Data tables with captions, scoped headers, and a stacked-card layout on small screens instead of horizontal scrolling.",
        "Full bilingual English/Spanish parity, with the document lang attribute updated when you switch.",
      ],
    },
    {
      heading: "3. Known limitations",
      paragraphs: [
        "We have tested with keyboard navigation and automated checks. We have not yet completed a full screen-reader pass with JAWS or NVDA. Some animated demonstration components convey their meaning through motion; each has a text equivalent, but we would like to improve them further.",
      ],
    },
    {
      heading: "4. Tell us",
      paragraphs: [
        `If any part of this site is difficult or impossible for you to use, email ${SITE.email} or call ${SITE.phone}. Describe what happened and what you were trying to do. We will respond within one business day and we will fix it.`,
      ],
    },
  ],
};

const a11yEs: LegalDocument = {
  title: "Declaración de Accesibilidad",
  updated: "Última actualización",
  intro:
    "VYNTEX construye para todos. Esta declaración describe lo que realmente hemos hecho — y, honestamente, lo que aún no hemos verificado.",
  sections: [
    {
      heading: "1. Nuestro objetivo",
      paragraphs: [
        "Construimos apuntando a WCAG 2.1 Nivel AA. No hemos encargado una auditoría de terceros, así que no afirmamos conformidad certificada. Declaramos nuestro objetivo y nuestras brechas conocidas en lugar de una insignia que no hemos ganado.",
      ],
    },
    {
      heading: "2. Qué hace este sitio",
      paragraphs: ["Implementado en todo el sitio:"],
      bullets: [
        "Puntos de referencia HTML semánticos y una jerarquía de encabezados única y ordenada por página.",
        "Un enlace de saltar al contenido como primer elemento enfocable.",
        "Navegación completa con teclado, con un anillo de enfoque visible en cada elemento interactivo.",
        "Modales que atrapan el enfoque y se cierran con la tecla Escape.",
        "Etiquetas de formulario vinculadas a los campos, errores anunciados con aria-invalid y texto en línea.",
        "El estado nunca se comunica solo con color — cada estado también lleva texto.",
        "Se respeta prefers-reduced-motion: todo el movimiento está detrás de motion-safe, así que la animación se desactiva para quien lo solicite.",
        "Áreas táctiles de al menos 44px en zonas interactivas.",
        "Tablas de datos con leyendas, encabezados con alcance y diseño de tarjetas apiladas en pantallas pequeñas en lugar de desplazamiento horizontal.",
        "Paridad bilingüe completa inglés/español, con el atributo lang del documento actualizado al cambiar.",
      ],
    },
    {
      heading: "3. Limitaciones conocidas",
      paragraphs: [
        "Hemos probado con navegación por teclado y verificaciones automatizadas. Aún no hemos completado una revisión completa con lector de pantalla usando JAWS o NVDA. Algunos componentes de demostración animados comunican su significado mediante movimiento; cada uno tiene un equivalente textual, pero queremos mejorarlos más.",
      ],
    },
    {
      heading: "4. Cuéntanos",
      paragraphs: [
        `Si alguna parte de este sitio te resulta difícil o imposible de usar, escribe a ${SITE.email} o llama al ${SITE.phone}. Describe qué pasó y qué intentabas hacer. Responderemos en un día hábil y lo arreglaremos.`,
      ],
    },
  ],
};

export const LEGAL: Record<
  "privacy" | "terms" | "cookies" | "accessibility",
  Record<Lang, LegalDocument>
> = {
  privacy: { en: privacyEn, es: privacyEs },
  terms: { en: termsEn, es: termsEs },
  cookies: { en: cookiesEn, es: cookiesEs },
  accessibility: { en: a11yEn, es: a11yEs },
};

export type LegalKey = keyof typeof LEGAL;
