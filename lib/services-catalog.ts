/**
 * VYNTEX service catalog — PUBLIC, PRICE-FREE.
 *
 * Source: the VYNTEX Command Center catalog (the internal sales tool), with all
 * pricing and payment structure removed: no setup fees, monthly fees, deposits,
 * installments, terms, carrier costs, or custom quotes. Custom work is planned
 * through the AI Blueprint instead of a quoted price.
 *
 * To change a service, edit it here (and in the Command Center). Bilingual
 * parity and the no-price rule are enforced by tests/unit/services-catalog.test.ts.
 */

export type Lang = "en" | "es";
export interface Localized<T = string> { en: T; es: T }

export type ServiceGroupId = "packages" | "crm" | "web" | "ai" | "brand";

export interface ServiceGroup {
  id: ServiceGroupId;
  label: Localized;
  /** Three-column layout (true) or two-column (false), as in the Command Center. */
  wide: boolean;
  note: Localized;
}

export interface ServiceItem {
  group: ServiceGroupId;
  id: string;
  popular: boolean;
  readyIn: Localized;
  name: Localized;
  line: Localized;
  bestFor: Localized;
  includes: Localized<string[]>;
  excludes: Localized<string[]>;
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    "id": "packages",
    "label": {
      "en": "Packages",
      "es": "Paquetes"
    },
    "wide": false,
    "note": {
      "en": "Website, CRM and branding built together as one connected system.",
      "es": "Sitio web, CRM e identidad construidos juntos como un solo sistema conectado."
    }
  },
  {
    "id": "crm",
    "label": {
      "en": "CRM only",
      "es": "Solo CRM"
    },
    "wide": false,
    "note": {
      "en": "For a business that already has a website that works.",
      "es": "Para un negocio que ya tiene una página web que sirve."
    }
  },
  {
    "id": "web",
    "label": {
      "en": "Websites",
      "es": "Sitios web"
    },
    "wide": true,
    "note": {
      "en": "Built and hosted by VYNTEX. The care plan keeps it updated, backed up and online.",
      "es": "Construido y alojado por VYNTEX. El plan de mantenimiento lo mantiene actualizado, respaldado y en línea."
    }
  },
  {
    "id": "ai",
    "label": {
      "en": "AI tools",
      "es": "Herramientas de IA"
    },
    "wide": true,
    "note": {
      "en": "One AI piece added to what you already have, without changing your systems.",
      "es": "Una pieza de IA que se agrega a lo que ya tiene, sin cambiar sus sistemas."
    }
  },
  {
    "id": "brand",
    "label": {
      "en": "Branding & social",
      "es": "Identidad y redes"
    },
    "wide": true,
    "note": {
      "en": "How your business looks and how often people see it.",
      "es": "Cómo se ve su negocio y con qué frecuencia lo ven."
    }
  }
];

export const SERVICES: ServiceItem[] = [
  {
    "group": "packages",
    "id": "starter",
    "popular": false,
    "readyIn": {
      "en": "7 to 10 business days",
      "es": "7 a 10 días hábiles"
    },
    "name": {
      "en": "Starter",
      "es": "Starter"
    },
    "line": {
      "en": "Get found online and stop losing the calls you are already getting.",
      "es": "Que lo encuentren en internet y deje de perder las llamadas que ya recibe."
    },
    "bestFor": {
      "en": "Barbershop, solo salon, notary, small cleaning service",
      "es": "Barbería, salón individual, notaría, servicio de limpieza pequeño"
    },
    "includes": {
      "en": [
        "Website, 1 to 3 pages, built for phones first",
        "Your own business phone number",
        "Carrier registration so your texts are not blocked",
        "Missed-call text back — every missed call gets an automatic text in seconds",
        "Online booking calendar your customers can use any time",
        "Automatic appointment reminders",
        "Google review requests after every job",
        "One automation built for how you work",
        "Logo design, two concepts, final files are yours",
        "All messages written in English and Spanish",
        "One 60-minute training session",
        "One change request per month",
        "Email support, answered within two business days"
      ],
      "es": [
        "Sitio web de 1 a 3 páginas, hecho primero para celular",
        "Su propio número de teléfono de negocio",
        "Registro con la operadora para que no bloqueen sus mensajes",
        "Mensaje automático por llamada perdida — cada llamada perdida recibe un texto en segundos",
        "Calendario de citas en línea que sus clientes pueden usar a cualquier hora",
        "Recordatorios de citas automáticos",
        "Solicitudes de reseña en Google después de cada trabajo",
        "Una automatización hecha para su forma de trabajar",
        "Diseño de logo, dos conceptos, los archivos finales son suyos",
        "Todos los mensajes escritos en inglés y español",
        "Una sesión de capacitación de 60 minutos",
        "Un cambio solicitado por mes",
        "Soporte por correo, contestado en dos días hábiles"
      ]
    },
    "excludes": {
      "en": [
        "AI chatbot or AI voice receptionist",
        "Follow-up sequences for leads that do not book",
        "Calendars for more than one person",
        "Landing pages beyond the website",
        "Social media posting",
        "Search engine optimization",
        "Paid advertising"
      ],
      "es": [
        "Chatbot con IA o recepcionista con IA",
        "Secuencias de seguimiento para clientes que no agendan",
        "Calendarios para más de una persona",
        "Páginas de aterrizaje aparte del sitio",
        "Publicaciones en redes sociales",
        "Optimización para buscadores",
        "Publicidad pagada"
      ]
    }
  },
  {
    "group": "packages",
    "id": "growth",
    "popular": true,
    "readyIn": {
      "en": "14 to 18 business days",
      "es": "14 a 18 días hábiles"
    },
    "name": {
      "en": "Growth",
      "es": "Growth"
    },
    "line": {
      "en": "Nobody who contacts you gets forgotten. Every lead is answered, followed up and reminded.",
      "es": "Nadie que lo contacte se queda olvidado. Cada cliente recibe respuesta, seguimiento y recordatorio."
    },
    "bestFor": {
      "en": "Contractor, auto shop, multi-chair salon, tax office",
      "es": "Contratista, taller mecánico, salón con varias sillas, oficina de impuestos"
    },
    "includes": {
      "en": [
        "Everything in Starter",
        "Website up to 7 pages with booking, menu or gallery",
        "Search engine basics, Google Maps and reviews on your site",
        "Sales pipeline so you can see every job and where it stands",
        "Monthly report on leads, bookings and reviews",
        "Instant response — every new lead gets a text and email within seconds",
        "You get an alert the moment a lead comes in",
        "Five-touch follow-up sequence by text and email, in both languages",
        "Up to three automations",
        "Up to three calendars or staff members",
        "No-show recovery — automatic rebooking when someone misses",
        "Win-back campaign for customers who stopped coming",
        "Review requests, monitoring and reply templates",
        "Estimates, invoices and pay-by-text",
        "One landing page for a specific offer",
        "Logo, business card and flyer design",
        "Three change requests per month",
        "Priority support, answered within one business day",
        "Quarterly 30-minute strategy call"
      ],
      "es": [
        "Todo lo de Starter",
        "Sitio web hasta 7 páginas con reservas, menú o galería",
        "Bases de SEO, Google Maps y reseñas en su sitio",
        "Flujo de ventas para ver cada trabajo y en qué va",
        "Reporte mensual de clientes, citas y reseñas",
        "Respuesta inmediata — cada cliente nuevo recibe mensaje y correo en segundos",
        "Usted recibe un aviso en el momento que entra un cliente",
        "Secuencia de seguimiento de cinco pasos por mensaje y correo, en los dos idiomas",
        "Hasta tres automatizaciones",
        "Hasta tres calendarios o empleados",
        "Recuperación de citas perdidas — reagendado automático cuando alguien falta",
        "Campaña para recuperar clientes que dejaron de venir",
        "Solicitud de reseñas, monitoreo y plantillas de respuesta",
        "Cotizaciones, facturas y pago por mensaje",
        "Una página de aterrizaje para una oferta específica",
        "Diseño de logo, tarjeta de presentación y volante",
        "Tres cambios solicitados por mes",
        "Soporte prioritario, contestado en un día hábil",
        "Llamada de estrategia trimestral de 30 minutos"
      ]
    },
    "excludes": {
      "en": [
        "AI voice receptionist that answers your phone",
        "AI chatbot",
        "Social media posting",
        "Paid advertising and ad budget",
        "More than three staff calendars"
      ],
      "es": [
        "Recepcionista con IA que contesta su teléfono",
        "Chatbot con IA",
        "Publicaciones en redes sociales",
        "Publicidad pagada y presupuesto de anuncios",
        "Más de tres calendarios de empleados"
      ]
    }
  },
  {
    "group": "packages",
    "id": "complete",
    "popular": false,
    "readyIn": {
      "en": "21 to 28 business days",
      "es": "21 a 28 días hábiles"
    },
    "name": {
      "en": "Complete",
      "es": "Complete"
    },
    "line": {
      "en": "The whole public face of your business, handled — site, system, brand and posts.",
      "es": "Toda la cara pública de su negocio, resuelta — sitio, sistema, marca y publicaciones."
    },
    "bestFor": {
      "en": "Multiple locations, permanent makeup studio, growing contractor",
      "es": "Varias ubicaciones, estudio de maquillaje permanente, contratista en crecimiento"
    },
    "includes": {
      "en": [
        "Everything in Growth",
        "Full brand kit — colors, fonts, guidelines and social templates",
        "Social media accounts set up and branded on two platforms",
        "Social media management, up to 12 posts a month",
        "Monthly social media report",
        "One AI tool of your choice: website chatbot, price calculator or smart intake form",
        "Up to three landing pages",
        "Document collection — customers upload what you need before the appointment",
        "Deposits collected at the time of booking",
        "Monthly 45-minute strategy call"
      ],
      "es": [
        "Todo lo de Growth",
        "Kit de marca completo — colores, tipografías, guías y plantillas para redes",
        "Cuentas de redes sociales creadas y con su marca en dos plataformas",
        "Manejo de redes sociales, hasta 12 publicaciones al mes",
        "Reporte mensual de redes sociales",
        "Una herramienta de IA a elección: chatbot en el sitio, calculadora de precios o formulario inteligente",
        "Hasta tres páginas de aterrizaje",
        "Recolección de documentos — los clientes suben lo que usted necesita antes de la cita",
        "Depósitos cobrados al momento de reservar",
        "Llamada de estrategia mensual de 45 minutos"
      ]
    },
    "excludes": {
      "en": [
        "AI voice receptionist that answers your phone",
        "Paid advertising and ad budget",
        "Custom software development",
        "Photography and video production"
      ],
      "es": [
        "Recepcionista con IA que contesta su teléfono",
        "Publicidad pagada y presupuesto de anuncios",
        "Desarrollo de software a la medida",
        "Fotografía y producción de video"
      ]
    }
  },
  {
    "group": "packages",
    "id": "aifront",
    "popular": false,
    "readyIn": {
      "en": "28 to 35 business days",
      "es": "28 a 35 días hábiles"
    },
    "name": {
      "en": "AI Front Desk",
      "es": "Recepción con IA"
    },
    "line": {
      "en": "Your phone answers itself, 24 hours a day, in English and in Spanish.",
      "es": "Su teléfono contesta solo, 24 horas al día, en inglés y en español."
    },
    "bestFor": {
      "en": "Med spa, permanent makeup, high-ticket contractor, busy office",
      "es": "Spa médico, maquillaje permanente, contratista de alto valor, oficina ocupada"
    },
    "includes": {
      "en": [
        "Everything in Complete",
        "AI voice receptionist answering your calls 24 hours a day, in English and Spanish",
        "It books the appointment straight into your calendar",
        "It routes urgent calls to you instead of taking a message",
        "It texts you a summary of every single call",
        "500 AI voice minutes included every month",
        "AI chatbot on your website, your texts and your Facebook and Instagram messages",
        "Unlimited automations",
        "Up to three separate pipelines",
        "A multi-step automation connected to the tools you already use",
        "Advanced dashboard with call recordings you can listen back to",
        "Monthly tuning of what the AI says and how it answers",
        "Up to two hours of changes per month",
        "Same business day support"
      ],
      "es": [
        "Todo lo de Complete",
        "Recepcionista con IA que contesta sus llamadas 24 horas al día, en inglés y español",
        "Agenda la cita directo en su calendario",
        "Le pasa las llamadas urgentes a usted en lugar de tomar recado",
        "Le manda por mensaje un resumen de cada llamada",
        "500 minutos de voz con IA incluidos cada mes",
        "Chatbot con IA en su sitio web, sus mensajes de texto y sus mensajes de Facebook e Instagram",
        "Automatizaciones ilimitadas",
        "Hasta tres flujos de ventas distintos",
        "Una automatización de varios pasos conectada a las herramientas que ya usa",
        "Panel avanzado con grabaciones de llamadas que puede volver a escuchar",
        "Ajuste mensual de lo que dice la IA y cómo contesta",
        "Hasta dos horas de cambios por mes",
        "Soporte el mismo día hábil"
      ]
    },
    "excludes": {
      "en": [
        "Paid advertising and ad budget",
        "Custom software development",
        "Bookkeeping, tax or legal services",
        "Photography and video production",
        "AI voice minutes beyond the 500 included"
      ],
      "es": [
        "Publicidad pagada y presupuesto de anuncios",
        "Desarrollo de software a la medida",
        "Contabilidad, impuestos o servicios legales",
        "Fotografía y producción de video",
        "Minutos de voz con IA más allá de los 500 incluidos"
      ]
    }
  },
  {
    "group": "crm",
    "id": "crm-basic",
    "popular": false,
    "readyIn": {
      "en": "5 to 7 business days",
      "es": "5 a 7 días hábiles"
    },
    "name": {
      "en": "Basic CRM",
      "es": "CRM básico"
    },
    "line": {
      "en": "Stop losing calls. We do not touch your website.",
      "es": "Deje de perder llamadas. No tocamos su página web."
    },
    "bestFor": {
      "en": "Any business already online that just misses too many calls",
      "es": "Cualquier negocio que ya esté en internet y solo pierde demasiadas llamadas"
    },
    "includes": {
      "en": [
        "Contacts and sales pipeline",
        "Your own business phone number",
        "Carrier registration so your texts are not blocked",
        "Missed-call text back",
        "One online booking calendar",
        "Automatic appointment reminders",
        "Google review requests",
        "One automation",
        "Messages in English and Spanish",
        "One 60-minute training session",
        "One change request per month"
      ],
      "es": [
        "Contactos y flujo de ventas",
        "Su propio número de teléfono de negocio",
        "Registro con la operadora para que no bloqueen sus mensajes",
        "Mensaje automático por llamada perdida",
        "Un calendario de citas en línea",
        "Recordatorios de citas automáticos",
        "Solicitudes de reseña en Google",
        "Una automatización",
        "Mensajes en inglés y español",
        "Una sesión de capacitación de 60 minutos",
        "Un cambio solicitado por mes"
      ]
    },
    "excludes": {
      "en": [
        "Website",
        "AI chatbot or voice receptionist",
        "Follow-up sequences",
        "More than one calendar",
        "Invoices and estimates",
        "Monthly reporting"
      ],
      "es": [
        "Sitio web",
        "Chatbot o recepcionista con IA",
        "Secuencias de seguimiento",
        "Más de un calendario",
        "Facturas y cotizaciones",
        "Reportes mensuales"
      ]
    }
  },
  {
    "group": "crm",
    "id": "crm-standard",
    "popular": true,
    "readyIn": {
      "en": "10 to 14 business days",
      "es": "10 a 14 días hábiles"
    },
    "name": {
      "en": "Standard CRM",
      "es": "CRM estándar"
    },
    "line": {
      "en": "Follow-up on autopilot. Your site brings them in, this makes sure nobody is forgotten.",
      "es": "Seguimiento en piloto automático. Su sitio los trae, esto se asegura de que nadie se olvide."
    },
    "bestFor": {
      "en": "Contractor, auto shop, salon or office with a website that already works",
      "es": "Contratista, taller, salón u oficina con una página que ya funciona"
    },
    "includes": {
      "en": [
        "Everything in Basic CRM",
        "Sales pipeline with reporting",
        "Instant response to every new lead, plus an alert to you",
        "Five-touch follow-up by text and email",
        "Up to three automations",
        "Up to three calendars or staff members",
        "No-show recovery and automatic rebooking",
        "Win-back campaign for lapsed customers",
        "Review requests, monitoring and reply templates",
        "Estimates, invoices and pay-by-text",
        "Monthly performance report",
        "Three change requests per month",
        "Priority support, answered within one business day"
      ],
      "es": [
        "Todo lo del CRM básico",
        "Flujo de ventas con reportes",
        "Respuesta inmediata a cada cliente nuevo, más un aviso para usted",
        "Seguimiento de cinco pasos por mensaje y correo",
        "Hasta tres automatizaciones",
        "Hasta tres calendarios o empleados",
        "Recuperación de citas perdidas y reagendado automático",
        "Campaña para recuperar clientes que dejaron de venir",
        "Solicitud de reseñas, monitoreo y plantillas de respuesta",
        "Cotizaciones, facturas y pago por mensaje",
        "Reporte mensual de resultados",
        "Tres cambios solicitados por mes",
        "Soporte prioritario, contestado en un día hábil"
      ]
    },
    "excludes": {
      "en": [
        "Website",
        "AI voice receptionist or chatbot",
        "Social media",
        "Paid advertising",
        "More than three staff calendars"
      ],
      "es": [
        "Sitio web",
        "Recepcionista con IA o chatbot",
        "Redes sociales",
        "Publicidad pagada",
        "Más de tres calendarios de empleados"
      ]
    }
  },
  {
    "group": "crm",
    "id": "crm-premium",
    "popular": false,
    "readyIn": {
      "en": "15 to 21 business days",
      "es": "15 a 21 días hábiles"
    },
    "name": {
      "en": "Premium CRM",
      "es": "CRM premium"
    },
    "line": {
      "en": "An AI receptionist on your phone, in both languages, without touching your website.",
      "es": "Una recepcionista con IA en su teléfono, en los dos idiomas, sin tocar su página web."
    },
    "bestFor": {
      "en": "A busy phone and Spanish-speaking customers calling after hours",
      "es": "Un teléfono ocupado y clientes hispanohablantes que llaman fuera de horario"
    },
    "includes": {
      "en": [
        "Everything in Standard CRM",
        "AI voice receptionist answering 24 hours a day in English and Spanish",
        "Books appointments straight into your calendar",
        "Routes urgent calls to you",
        "Texts you a summary of every call",
        "500 AI voice minutes included every month",
        "AI chatbot on your website, texts and social messages",
        "Unlimited automations",
        "Up to three pipelines",
        "Document collection from customers",
        "Deposits collected at booking",
        "Advanced dashboard with call recordings",
        "Monthly AI tuning",
        "Up to two hours of changes per month"
      ],
      "es": [
        "Todo lo del CRM estándar",
        "Recepcionista con IA que contesta 24 horas al día en inglés y español",
        "Agenda las citas directo en su calendario",
        "Le pasa las llamadas urgentes a usted",
        "Le manda un resumen de cada llamada por mensaje",
        "500 minutos de voz con IA incluidos cada mes",
        "Chatbot con IA en su sitio, mensajes y redes sociales",
        "Automatizaciones ilimitadas",
        "Hasta tres flujos de ventas",
        "Recolección de documentos de los clientes",
        "Depósitos cobrados al reservar",
        "Panel avanzado con grabaciones de llamadas",
        "Ajuste mensual de la IA",
        "Hasta dos horas de cambios por mes"
      ]
    },
    "excludes": {
      "en": [
        "Website",
        "Paid advertising and ad budget",
        "Social media posting",
        "Custom software development",
        "AI voice minutes beyond the 500 included"
      ],
      "es": [
        "Sitio web",
        "Publicidad pagada y presupuesto de anuncios",
        "Publicaciones en redes sociales",
        "Desarrollo de software a la medida",
        "Minutos de voz con IA más allá de los 500 incluidos"
      ]
    }
  },
  {
    "group": "web",
    "id": "web-basic",
    "popular": false,
    "readyIn": {
      "en": "5 to 7 business days",
      "es": "5 a 7 días hábiles"
    },
    "name": {
      "en": "Basic Website",
      "es": "Sitio web básico"
    },
    "line": {
      "en": "One to three pages. A clean, fast starter site.",
      "es": "De una a tres páginas. Un sitio inicial limpio y rápido."
    },
    "bestFor": {
      "en": "A business that has no site at all, or one that embarrasses them",
      "es": "Un negocio que no tiene sitio, o uno que le da pena"
    },
    "includes": {
      "en": [
        "1 to 3 pages",
        "Designed for phones first",
        "Contact form that emails you",
        "Hosting included",
        "Your business hours, services and location",
        "30 days of support after launch"
      ],
      "es": [
        "De 1 a 3 páginas",
        "Diseñado primero para celular",
        "Formulario de contacto que le llega por correo",
        "Alojamiento incluido",
        "Su horario, servicios y ubicación",
        "30 días de soporte después del lanzamiento"
      ]
    },
    "excludes": {
      "en": [
        "Online booking",
        "Online store",
        "Copywriting — you provide the text",
        "Photography",
        "Search engine optimization beyond the basics",
        "Blog"
      ],
      "es": [
        "Reservas en línea",
        "Tienda en línea",
        "Redacción — usted provee el texto",
        "Fotografía",
        "Optimización para buscadores más allá de lo básico",
        "Blog"
      ]
    }
  },
  {
    "group": "web",
    "id": "web-std",
    "popular": true,
    "readyIn": {
      "en": "10 to 14 business days",
      "es": "10 a 14 días hábiles"
    },
    "name": {
      "en": "Standard Website",
      "es": "Sitio web estándar"
    },
    "line": {
      "en": "Up to seven pages with booking, gallery and Google built in.",
      "es": "Hasta siete páginas con reservas, galería y Google integrados."
    },
    "bestFor": {
      "en": "A business that wants customers to book without calling",
      "es": "Un negocio que quiere que los clientes agenden sin llamar"
    },
    "includes": {
      "en": [
        "Up to 7 pages",
        "Online booking, menu or photo gallery",
        "Google Maps and your reviews shown on the site",
        "Search engine basics so you can be found",
        "Links to your social accounts",
        "Contact and quote forms",
        "Hosting included",
        "30 days of support after launch"
      ],
      "es": [
        "Hasta 7 páginas",
        "Reservas en línea, menú o galería de fotos",
        "Google Maps y sus reseñas mostradas en el sitio",
        "Bases de SEO para que lo encuentren",
        "Enlaces a sus redes sociales",
        "Formularios de contacto y cotización",
        "Alojamiento incluido",
        "30 días de soporte después del lanzamiento"
      ]
    },
    "excludes": {
      "en": [
        "Online store",
        "Customer login area",
        "Copywriting beyond basic editing",
        "Photography",
        "Ongoing search engine optimization",
        "Paid advertising"
      ],
      "es": [
        "Tienda en línea",
        "Área de acceso para clientes",
        "Redacción más allá de edición básica",
        "Fotografía",
        "Optimización continua para buscadores",
        "Publicidad pagada"
      ]
    }
  },
  {
    "group": "web",
    "id": "web-custom",
    "popular": false,
    "readyIn": {
      "en": "Planned through an AI Blueprint",
      "es": "Planificado mediante un AI Blueprint"
    },
    "name": {
      "en": "Custom Website",
      "es": "Sitio web a la medida"
    },
    "line": {
      "en": "Anything beyond standard, built to your specification.",
      "es": "Todo lo que va más allá de lo estándar, hecho a su especificación."
    },
    "bestFor": {
      "en": "Online store, customer portal, or something nobody else has",
      "es": "Tienda en línea, portal de clientes, o algo que nadie más tiene"
    },
    "includes": {
      "en": [
        "Custom pages and features",
        "Advanced integrations with the tools you use",
        "Scope agreed in writing before we start",
        "30 days of support after launch",
        "Planned with you through an AI Blueprint"
      ],
      "es": [
        "Páginas y funciones personalizadas",
        "Integraciones avanzadas con las herramientas que usa",
        "Alcance acordado por escrito antes de empezar",
        "30 días de soporte después del lanzamiento",
        "Planificado con usted mediante un AI Blueprint"
      ]
    },
    "excludes": {
      "en": [
        "Anything not in the signed scope",
        "Photography and video",
        "Content writing unless agreed in writing"
      ],
      "es": [
        "Todo lo que no esté en el alcance firmado",
        "Fotografía y video",
        "Redacción de contenido salvo acuerdo por escrito"
      ]
    }
  },
  {
    "group": "ai",
    "id": "ai-simple",
    "popular": false,
    "readyIn": {
      "en": "5 to 7 business days",
      "es": "5 a 7 días hábiles"
    },
    "name": {
      "en": "Simple AI Tool",
      "es": "Herramienta de IA simple"
    },
    "line": {
      "en": "One AI piece added to what you already have.",
      "es": "Una pieza de IA agregada a lo que ya tiene."
    },
    "bestFor": {
      "en": "A business with a working site that wants one smart addition",
      "es": "Un negocio con un sitio que funciona y quiere una sola adición inteligente"
    },
    "includes": {
      "en": [
        "Your choice of one: website chatbot, price calculator, or smart intake form",
        "Trained on your services and your most common questions",
        "Hosted and maintained by VYNTEX",
        "Email notification every time someone uses it",
        "Available in English and Spanish",
        "30 days of support"
      ],
      "es": [
        "Usted elige uno: chatbot en el sitio, calculadora de precios, o formulario inteligente",
        "Entrenado con sus servicios y sus preguntas más comunes",
        "Alojado y mantenido por VYNTEX",
        "Notificación por correo cada vez que alguien lo usa",
        "Disponible en inglés y español",
        "30 días de soporte"
      ]
    },
    "excludes": {
      "en": [
        "Voice receptionist that answers calls",
        "Multi-step automation",
        "CRM or booking system",
        "Connection to your other software"
      ],
      "es": [
        "Recepcionista por voz que contesta llamadas",
        "Automatización de varios pasos",
        "CRM o sistema de reservas",
        "Conexión con sus otros programas"
      ]
    }
  },
  {
    "group": "ai",
    "id": "ai-standard",
    "popular": true,
    "readyIn": {
      "en": "10 to 14 business days",
      "es": "10 a 14 días hábiles"
    },
    "name": {
      "en": "Standard Automation",
      "es": "Automatización estándar"
    },
    "line": {
      "en": "Capture the lead, then follow up without anyone remembering to.",
      "es": "Capture al cliente y dele seguimiento sin que nadie tenga que acordarse."
    },
    "bestFor": {
      "en": "A business already getting leads that go cold",
      "es": "Un negocio que ya recibe clientes pero se le enfrían"
    },
    "includes": {
      "en": [
        "Multi-step automation built around how you actually work",
        "Form that captures the lead wherever it comes from",
        "Automatic email and text follow-up",
        "Connected to the tools you already use",
        "Alerts to you when something needs a human",
        "Available in English and Spanish",
        "30 days of support"
      ],
      "es": [
        "Automatización de varios pasos hecha según cómo trabaja de verdad",
        "Formulario que captura al cliente venga de donde venga",
        "Seguimiento automático por correo y mensaje",
        "Conectada a las herramientas que ya usa",
        "Avisos para usted cuando algo necesita a una persona",
        "Disponible en inglés y español",
        "30 días de soporte"
      ]
    },
    "excludes": {
      "en": [
        "Voice receptionist that answers calls",
        "Full CRM platform",
        "Website",
        "Paid advertising"
      ],
      "es": [
        "Recepcionista por voz que contesta llamadas",
        "Plataforma CRM completa",
        "Sitio web",
        "Publicidad pagada"
      ]
    }
  },
  {
    "group": "ai",
    "id": "ai-advanced",
    "popular": false,
    "readyIn": {
      "en": "Planned through an AI Blueprint",
      "es": "Planificado mediante un AI Blueprint"
    },
    "name": {
      "en": "Advanced AI",
      "es": "IA avanzada"
    },
    "line": {
      "en": "Complex AI workflows, built to your specification.",
      "es": "Flujos de IA complejos, hechos a su especificación."
    },
    "bestFor": {
      "en": "A business with an unusual process nobody sells off the shelf",
      "es": "Un negocio con un proceso poco común que nadie vende ya hecho"
    },
    "includes": {
      "en": [
        "Custom AI workflows",
        "Connections to your existing software through its API",
        "Ongoing tuning as the business changes",
        "Scope agreed in writing before we start",
        "Planned with you through an AI Blueprint"
      ],
      "es": [
        "Flujos de IA personalizados",
        "Conexiones a sus programas actuales por medio de su API",
        "Ajuste continuo conforme cambia el negocio",
        "Alcance acordado por escrito antes de empezar",
        "Planificado con usted mediante un AI Blueprint"
      ]
    },
    "excludes": {
      "en": [
        "Anything not in the signed scope",
        "Hardware",
        "Third-party software licenses"
      ],
      "es": [
        "Todo lo que no esté en el alcance firmado",
        "Equipo físico",
        "Licencias de software de terceros"
      ]
    }
  },
  {
    "group": "brand",
    "id": "brand-logo",
    "popular": false,
    "readyIn": {
      "en": "3 to 5 business days",
      "es": "3 a 5 días hábiles"
    },
    "name": {
      "en": "Brand Logo",
      "es": "Logo"
    },
    "line": {
      "en": "A clean, professional logo you own outright.",
      "es": "Un logo limpio y profesional que es completamente suyo."
    },
    "bestFor": {
      "en": "A new business, or one still using something made on a phone",
      "es": "Un negocio nuevo, o uno que todavía usa algo hecho en el celular"
    },
    "includes": {
      "en": [
        "Two different concepts to choose from",
        "Two rounds of revisions on the one you pick",
        "Final files in PNG and SVG",
        "Versions for light and dark backgrounds",
        "The files are yours to keep and use anywhere"
      ],
      "es": [
        "Dos conceptos distintos para elegir",
        "Dos rondas de revisiones sobre el que elija",
        "Archivos finales en PNG y SVG",
        "Versiones para fondos claros y oscuros",
        "Los archivos son suyos para quedárselos y usarlos donde quiera"
      ]
    },
    "excludes": {
      "en": [
        "Trademark search or filing",
        "Business cards or flyers",
        "Brand guidelines document",
        "Printing"
      ],
      "es": [
        "Búsqueda o registro de marca",
        "Tarjetas de presentación o volantes",
        "Documento de guías de marca",
        "Impresión"
      ]
    }
  },
  {
    "group": "brand",
    "id": "brand-bundle",
    "popular": true,
    "readyIn": {
      "en": "5 to 8 business days",
      "es": "5 a 8 días hábiles"
    },
    "name": {
      "en": "Brand Bundle",
      "es": "Paquete de marca"
    },
    "line": {
      "en": "Logo, business card and flyer, designed to match, plus your social media accounts and WhatsApp Business created and branded.",
      "es": "Logo, tarjeta de presentación y volante, diseñados para combinar, más sus redes sociales y WhatsApp Business creados y con su marca."
    },
    "bestFor": {
      "en": "A business that needs something to hand people",
      "es": "Un negocio que necesita algo que entregarle a la gente"
    },
    "includes": {
      "en": [
        "Logo design, two concepts",
        "Business card design, print ready",
        "Flyer design, print ready",
        "Facebook and Instagram business accounts created and branded with your logo, cover, bio and links",
        "WhatsApp Business set up and branded: logo, business profile, hours, greeting and quick replies",
        "Three rounds of revisions",
        "All final files are yours"
      ],
      "es": [
        "Diseño de logo, dos conceptos",
        "Diseño de tarjeta de presentación, lista para imprimir",
        "Diseño de volante, listo para imprimir",
        "Cuentas de negocio en Facebook e Instagram creadas y con su marca: logo, portada, bio y enlaces",
        "WhatsApp Business configurado con su marca: logo, perfil de negocio, horario, saludo y respuestas rápidas",
        "Tres rondas de revisiones",
        "Todos los archivos finales son suyos"
      ]
    },
    "excludes": {
      "en": [
        "Trademark search or filing",
        "Printing and delivery",
        "Brand guidelines document",
        "Photography"
      ],
      "es": [
        "Búsqueda o registro de marca",
        "Impresión y entrega",
        "Documento de guías de marca",
        "Fotografía"
      ]
    }
  },
  {
    "group": "brand",
    "id": "brand-kit",
    "popular": false,
    "readyIn": {
      "en": "8 to 12 business days",
      "es": "8 a 12 días hábiles"
    },
    "name": {
      "en": "Full Brand Kit",
      "es": "Kit de marca completo"
    },
    "line": {
      "en": "Everything above, plus the rules so it stays consistent.",
      "es": "Todo lo de arriba, más las reglas para que se mantenga consistente."
    },
    "bestFor": {
      "en": "A business with staff, or one planning to grow",
      "es": "Un negocio con empleados, o uno que planea crecer"
    },
    "includes": {
      "en": [
        "Everything in the Brand Bundle",
        "Written brand guidelines — colors, fonts and how to use them",
        "Social media templates you can reuse",
        "Profile and cover images sized for each platform",
        "Three rounds of revisions"
      ],
      "es": [
        "Todo lo del Paquete de marca",
        "Guías de marca escritas — colores, tipografías y cómo usarlas",
        "Plantillas para redes sociales que puede reutilizar",
        "Imágenes de perfil y portada del tamaño correcto para cada plataforma",
        "Tres rondas de revisiones"
      ]
    },
    "excludes": {
      "en": [
        "Trademark search or filing",
        "Printing",
        "Photography and video",
        "Ongoing design work"
      ],
      "es": [
        "Búsqueda o registro de marca",
        "Impresión",
        "Fotografía y video",
        "Trabajo de diseño continuo"
      ]
    }
  },
  {
    "group": "brand",
    "id": "social-mgmt",
    "popular": false,
    "readyIn": {
      "en": "5 to 8 business days to set up",
      "es": "5 a 8 días hábiles para configurar"
    },
    "name": {
      "en": "Social Media Management",
      "es": "Manejo de redes sociales"
    },
    "line": {
      "en": "We set up your accounts, then we post for you every month.",
      "es": "Configuramos sus cuentas y después publicamos por usted cada mes."
    },
    "bestFor": {
      "en": "A business that keeps meaning to post and never does",
      "es": "Un negocio que siempre piensa publicar y nunca lo hace"
    },
    "includes": {
      "en": [
        "Accounts created and branded on two platforms",
        "Profile, bio, links and first posts written for you",
        "Up to 12 posts a month after that",
        "Posts scheduled ahead so nothing is last minute",
        "Written in English, Spanish or both",
        "Monthly report on reach and engagement"
      ],
      "es": [
        "Cuentas creadas y con su marca en dos plataformas",
        "Perfil, biografía, enlaces y primeras publicaciones escritas por usted",
        "Hasta 12 publicaciones al mes después de eso",
        "Publicaciones programadas con anticipación para que nada sea a última hora",
        "Escritas en inglés, español o los dos",
        "Reporte mensual de alcance e interacción"
      ]
    },
    "excludes": {
      "en": [
        "Paid advertising and ad budget",
        "Original photography or video — you provide photos, or we use approved stock",
        "Replying to comments and direct messages",
        "Influencer or collaboration work",
        "More than two platforms"
      ],
      "es": [
        "Publicidad pagada y presupuesto de anuncios",
        "Fotografía o video original — usted provee fotos, o usamos banco de imágenes aprobado",
        "Responder comentarios y mensajes directos",
        "Trabajo con influencers o colaboraciones",
        "Más de dos plataformas"
      ]
    }
  }
];

/** The AI Blueprint: how custom work is planned. Shown with every custom request. */
export const AI_BLUEPRINT = {
  "name": {
    "en": "AI Blueprint",
    "es": "AI Blueprint"
  },
  "line": {
    "en": "The starting point for anything custom. We review your online presence and give you a written plan of exactly what to build.",
    "es": "El punto de partida para todo lo personalizado. Revisamos su presencia en internet y le entregamos un plan por escrito de exactamente qué construir."
  },
  "includes": {
    "en": [
      "60-minute session",
      "Full review of your online presence",
      "Written blueprint in 3 to 5 business days",
      "30-minute walkthrough call"
    ],
    "es": [
      "Sesión de 60 minutos",
      "Revisión completa de su presencia en internet",
      "Plan por escrito en 3 a 5 días hábiles",
      "Llamada de 30 minutos para revisarlo"
    ]
  }
} as const;

export function servicesInGroup(group: ServiceGroupId): ServiceItem[] {
  return SERVICES.filter((service) => service.group === group);
}
