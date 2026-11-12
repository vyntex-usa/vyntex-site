/**
 * Bilingual UI strings (EN default, ES). SINGLE source of visible copy.
 *
 * `en` is the canonical shape; `es` is typed to match it exactly, so a missing
 * or extra key in Spanish is a compile error. Components read strings via
 * `useLang()` + `t.*`. Prices and rates are NOT stored here — they live in
 * lib/pricing.ts and are interpolated into these strings where needed
 * (placeholders like {hourly}) to avoid duplication.
 */

export type Lang = "en" | "es";

const en = {
  language: {
    en: "English",
    es: "Español",
    switchToEn: "Switch to English",
    switchToEs: "Cambiar a Español",
  },

  a11y: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryNav: "Primary",
    logoAlt: "VYNTEX — Connected Business Systems and Technology Solutions",
  },

  actions: {
    getStarted: "Get Started",
    requestQuote: "Request a Quote",
    bookCall: "Book a Call",
    bookConsultation: "Book a Free Consultation",
    seePricing: "See Pricing",
    explorePricing: "Explore Pricing",
    exploreSolutions: "Explore Solutions",
    becomeReseller: "Become a Reseller",
    contactUs: "Contact VYNTEX",
    learnMore: "Learn More",
    clientLogin: "Client Login",
    clientPortal: "Client Portal",
    logout: "Log Out",
  },

  nav: {
    home: "Home",
    solutions: "Solutions",
    services: "Services",
    howItWorks: "How It Works",
    aiAutomation: "AI Automation",
    pricing: "Pricing",
    industries: "Industries",
    caseStudies: "Case Studies",
    about: "About Us",
    partners: "Partners",
    resources: "Resources",
    faq: "FAQ",
    contact: "Contact",
  },

  hero: {
    eyebrow: "AI Automation · Web Development · Digital Technology",
    headlineLead: "Build a smarter business that",
    headlineAccent: "works even when you don't.",
    subtitle:
      "VYNTEX creates AI automations, websites, CRM systems, and digital solutions that help businesses capture leads, respond faster, reduce manual work, and scale with confidence.",
    ctaExplore: "Explore Solutions",
    ctaPricing: "View Pricing",
    ctaConsult: "Book a Free Consultation",
    demoLabel: "Interactive automation example",
    workflow: {
      lead: "Website lead",
      qualify: "AI qualification",
      crm: "CRM record created",
      followup: "Automated follow-up",
      appointment: "Appointment booked",
      notify: "Owner notified",
    },
    terminal: [
      "Capturing a new lead...",
      "Qualifying with AI...",
      "Creating the CRM record...",
      "Sending the follow-up...",
      "Booking the appointment...",
    ],
    trust: {
      bilingual: "English & Spanish service",
      pricing: "Clear one-time & monthly pricing",
      support: "30 days of support included where applicable",
      nationwide: "Nationwide service",
    },
  },

  sections: {
    services: {
      eyebrow: "What we build",
      title: "Everything to launch and grow",
      description:
        "One team for your website, your systems, your automations, and your brand. No agencies, no runaround.",
    },
    howItWorks: {
      eyebrow: "How it works",
      title: "A clear path from idea to launch",
      description:
        "Five deliberate steps. A real person builds your project and answers your questions at each one.",
    },
    aiAutomation: {
      eyebrow: "See what AI can do",
      title: "Automations that work while you sleep",
      description:
        "Interactive demonstrations of the workflows we build — lead handling, chat, pipelines, and onboarding.",
    },
    pricing: {
      eyebrow: "Direct client pricing",
      title: "Clear prices. No surprises.",
      description:
        "Websites, tools, and branding are one-time purchases with support included. CRMs use a setup fee plus a monthly fee. Prices cover our labor only — third-party hosting, domains, and platform fees are billed separately.",
    },
    industries: {
      eyebrow: "Industries we serve",
      title: "Built for the way your business works",
      description:
        "From professional services to restaurants and retail — practical websites and automation, in English and Spanish.",
    },
    caseStudies: {
      eyebrow: "Case studies",
      title: "Recent work",
      description:
        "Verified project write-ups are being prepared. We do not publish results we cannot substantiate.",
    },
    about: {
      eyebrow: "About VYNTEX",
      title: "A real team, not a platform",
      description:
        "VYNTEX is a Northfield, New Jersey digital technology agency helping businesses improve how they attract clients, communicate, operate, and grow.",
    },
    partners: {
      eyebrow: "Authorized Reseller Program",
      title: "Expand what you can offer your clients",
      description:
        "Approved partners offer VYNTEX services under their own client relationship while we handle technical delivery.",
    },
    faq: {
      eyebrow: "Questions & answers",
      title: "Frequently asked questions",
      description:
        "Straight answers about services, pricing, support, and how we work.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about your project",
      description:
        "Tell us what you need. We reply within one business day, in English or Spanish.",
    },
  },

  services: {
    startingAt: "Starting at",
    items: {
      "ai-automation": {
        title: "AI Automation",
        problem: "Manual, repetitive work slows your team down.",
        description:
          "Custom automations that qualify leads, follow up, schedule, and notify your team — connected to the tools you already use.",
      },
      web: {
        title: "Web Development",
        problem: "A slow or dated site costs you clients.",
        description:
          "Fast, mobile-ready websites built to convert, with booking, menus, galleries, maps, and SEO basics.",
      },
      crm: {
        title: "CRM & Sales Pipelines",
        problem: "Leads slip through the cracks.",
        description:
          "Contact and pipeline systems with automated follow-up and reporting, so nothing gets missed.",
      },
      chatbot: {
        title: "AI Chatbots",
        problem: "Visitors leave when no one replies.",
        description:
          "AI assistants that answer questions, capture details, and route serious inquiries to you — day or night.",
      },
      branding: {
        title: "Branding & Digital Identity",
        problem: "An inconsistent brand looks unprofessional.",
        description:
          "Logos, business cards, flyers, and complete brand kits that make your business look the part.",
      },
      marketing: {
        title: "Digital Marketing & Social Media",
        problem: "Great work goes unseen.",
        description:
          "Account setup, content, and ongoing management across the platforms that matter to your customers.",
      },
    },
    process: {
      title: "Business processes we can automate",
      subtitle:
        "Common workflows we set up so your business responds faster with less manual effort.",
      items: [
        "Lead qualification",
        "Appointment scheduling",
        "Missed-call follow-up",
        "Email & SMS sequences",
        "Customer onboarding",
        "Review requests",
        "Internal notifications",
        "Document collection",
        "Invoice reminders",
        "Customer support",
      ],
    },
  },

  howItWorks: {
    steps: [
      {
        id: "discover",
        title: "Discover",
        description:
          "We understand your business, workflow, bottlenecks, goals, and existing systems.",
      },
      {
        id: "design",
        title: "Design",
        description:
          "We map the solution, integrations, user experience, and implementation plan.",
      },
      {
        id: "build",
        title: "Create",
        description:
          "We create the website, automation, CRM, chatbot, or digital system.",
      },
      {
        id: "launch",
        title: "Test & Launch",
        description:
          "We test behavior, mobile responsiveness, notifications, and integrations before launch.",
      },
      {
        id: "support",
        title: "Support & Optimize",
        description:
          "You get the included support period, plus ongoing maintenance whenever you choose it.",
      },
    ],
  },

  aiShowcase: {
    disclaimer:
      "Demonstration of a typical workflow. Final automation depends on the client's systems and project scope. Not connected to a live system.",
    tabs: {
      lead: "Lead Automation",
      chatbot: "AI Chatbot",
      crm: "CRM Pipeline",
      onboarding: "Client Onboarding",
    },
    lead: {
      caption: "A new lead handled end to end, automatically.",
      steps: {
        form: "Form submitted",
        scored: "Lead scored",
        crm: "CRM contact created",
        email: "Email sent",
        sms: "SMS sent",
        appointment: "Appointment scheduled",
        notify: "Team notified",
      },
    },
    chatbot: {
      caption: "An AI assistant that answers and routes real inquiries.",
      visitorLabel: "Visitor",
      assistantLabel: "Assistant",
      messages: {
        visitor1: "I need a website for my restaurant.",
        assistant1:
          "I can help with that. A standard website may be a good fit if you need a menu, gallery, booking integration, Google Maps, and basic SEO.",
        assistant2:
          "Would you like to review pricing or request a consultation?",
      },
    },
    crm: {
      caption: "Leads move through your pipeline as they progress.",
      columns: {
        new: "New Lead",
        contacted: "Contacted",
        proposal: "Proposal",
        won: "Won",
      },
      records: {
        restaurant: "Restaurant Business",
        legal: "Legal Office",
        home: "Home Services Company",
      },
    },
    onboarding: {
      caption: "New clients onboarded without the manual back-and-forth.",
      steps: {
        payment: "Payment confirmed",
        intake: "Intake form sent",
        documents: "Documents collected",
        project: "Project created",
        tasks: "Internal tasks assigned",
        update: "Client status update sent",
      },
    },
  },

  pricing: {
    tabs: {
      websites: "Websites",
      ai: "AI Tools",
      crm: "CRM",
      branding: "Branding",
      social: "Social Media",
    },
    units: {
      oneTime: "one-time",
      setup: "setup",
      perMonth: "/mo",
      perYear: "/year",
      custom: "custom",
    },
    plus: "+",
    badges: {
      popular: "Popular",
      supportIncluded: "30 days support included",
    },
    maintenance: {
      from149: "+ from $149/mo maintenance (optional)",
      from189: "+ from $189/mo maintenance (optional)",
      quoted: "Maintenance quoted per project",
      buyout: "50% deposit · custom maintenance · buyout {range}",
    },
    cta: {
      getStarted: "Get Started",
      requestQuote: "Request a Quote",
    },
    policies: {
      title: "How our pricing works",
      support: "{days} days of support are included after delivery, where applicable.",
      hourly:
        "Standard changes after the included period are {hourly}/hr. Rush changes are {rush}/hr (1-hour minimum, then 30-minute increments).",
      thirdParty:
        "Third-party hosting, domains, licenses, SMS, advertising, plugins, and external platform costs are billed separately by the provider — they are not part of our labor.",
    },
    items: {
      BasicWebsite: {
        name: "Basic Website",
        tagline: "1–3 pages. Perfect starter site.",
        features: ["Mobile-ready design", "Contact form", "Hosting on Cloudflare"],
      },
      StandardWebsite: {
        name: "Standard Website",
        tagline: "5–7 pages. Booking, menu, SEO basics.",
        features: [
          "Up to 7 pages",
          "Booking / menu / gallery",
          "Social links + SEO basics",
          "Google Maps + reviews",
        ],
      },
      CustomizedWebsite: {
        name: "Customized Website",
        tagline: "Anything beyond standard, built to spec.",
        features: ["Custom features & pages", "Advanced integrations"],
      },
      SimpleAiTool: {
        name: "Simple AI Tool",
        tagline: "Chatbot, calculator, or intake form.",
        features: ["One AI-powered tool", "Netlify hosted", "Email notifications"],
      },
      StandardAiAutomation: {
        name: "Standard Automation",
        tagline: "Lead capture + auto-response system.",
        features: [
          "Multi-step automation",
          "Form + email/SMS flow",
          "Connected to your tools",
        ],
      },
      AdvancedAi: {
        name: "Advanced / Custom",
        tagline: "Complex AI systems, built to spec.",
        features: ["Custom AI workflows", "API integrations", "Ongoing tuning"],
      },
      CRMBasic: {
        name: "Basic CRM",
        tagline: "Standard system. Contacts + pipeline.",
        features: ["Contacts & pipeline", "1 automation", "Ongoing support"],
      },
      CRMStandard: {
        name: "Standard CRM",
        tagline: "Pre-built. Follow-up on autopilot.",
        features: [
          "Pipeline + reporting",
          "Email/SMS follow-up",
          "Up to 3 automations",
        ],
      },
      CRMCustomized: {
        name: "Customized CRM",
        tagline: "Built from scratch for your workflow.",
        features: [
          "Fully custom build",
          "Unlimited automations",
          "One-time buyout option",
        ],
      },
      BrandLogo: {
        name: "Brand Logo",
        tagline: "Clean, professional logo design.",
        features: ["2 concepts", "Final files (PNG/SVG)"],
      },
      BrandBundle: {
        name: "Brand Bundle",
        tagline: "Logo + business card + flyer + social media + WhatsApp.",
        features: ["Logo design", "Business card", "Flyer design", "Facebook + Instagram accounts created & branded", "WhatsApp Business branded"],
      },
      BrandKit: {
        name: "Full Brand Kit",
        tagline: "Colors, fonts, templates, guidelines.",
        features: [
          "Full brand guidelines",
          "Social templates",
          "Card + flyer included",
        ],
      },
      SocialMediaSetup: {
        name: "Social Media Setup",
        tagline: "Accounts created & branded (2 platforms).",
        features: ["Profile setup + branding", "Bio, links, first posts"],
      },
      SocialMediaManagement: {
        name: "Social Media Management",
        tagline: "We post and manage for you, monthly.",
        features: ["Content + scheduling", "Up to 12 posts/mo", "Monthly report"],
      },
    },
  },

  industries: {
    challengeLabel: "Challenge",
    solutionLabel: "VYNTEX solution",
    items: [
      { id: "professional", name: "Professional Services", challenge: "Inquiries arrive faster than you can respond.", solution: "Intake forms, AI qualification, and automated follow-up so every inquiry gets a timely reply." },
      { id: "accounting", name: "Accounting & Tax Firms", challenge: "Seasonal surges overwhelm intake and scheduling.", solution: "Client intake, document-collection reminders, appointment scheduling, and bilingual automated updates." },
      { id: "legal", name: "Legal & Document Services", challenge: "Manual intake and document requests slow cases down.", solution: "Structured intake forms, a client pipeline, and automated document-collection reminders." },
      { id: "healthcare", name: "Healthcare & Wellness", challenge: "Front-desk time is spent on scheduling and reminders.", solution: "Appointment tools and privacy-conscious intake; HIPAA-aware architecture may be scoped per project." },
      { id: "homeservices", name: "Home Services", challenge: "Missed calls become missed jobs.", solution: "Missed-call text-back, quote-request forms, and automated follow-up that keeps leads warm." },
      { id: "construction", name: "Construction", challenge: "Estimates and portfolios are scattered.", solution: "Quote-request systems, portfolio websites, and lead automation from first contact to booked job." },
      { id: "realestate", name: "Real Estate", challenge: "Leads go cold without fast follow-up.", solution: "Listing sites, lead capture, and automated email/SMS follow-up through your pipeline." },
      { id: "restaurants", name: "Restaurants", challenge: "Customers expect menus, booking, and reviews online.", solution: "Websites with menus, booking integration, Google Maps, reviews, and social management." },
      { id: "retail", name: "Retail & E-commerce", challenge: "Product sites and inventory eat up your time.", solution: "Product-ready websites, social media management, and order/notification automations." },
      { id: "beauty", name: "Beauty & Personal Care", challenge: "Booking and reminders happen by phone all day.", solution: "Booking integration, brand kits, local SEO, and automated appointment reminders." },
      { id: "automotive", name: "Automotive", challenge: "Service inquiries and scheduling pile up.", solution: "Quote and service-request forms, follow-up automation, and review requests after each visit." },
      { id: "education", name: "Education & Training", challenge: "Enrollment and registration are manual.", solution: "Registration forms, course sites, and automated enrollment and reminder flows." },
      { id: "agencies", name: "Agencies", challenge: "You need delivery capacity without more headcount.", solution: "White-labeled websites, CRM, and automation delivered by VYNTEX under your brand." },
      { id: "multilocation", name: "Multi-location Businesses", challenge: "Consistency across locations is hard to maintain.", solution: "Centralized websites, shared CRM pipelines, and standardized automation across every location." },
    ],
  },

  caseStudies: {
    comingSoon: "Published once verified",
    note: "We are preparing verified project examples. We do not publish client names, statistics, quotes, or outcomes we cannot substantiate.",
    cards: {
      website: "Website Transformation",
      lead: "Lead Automation",
      crm: "CRM Workflow",
    },
  },

  about: {
    intro:
      "VYNTEX is a Northfield, New Jersey digital technology agency helping businesses improve how they attract clients, communicate, operate, and grow.",
    specialtiesLabel: "We specialize in",
    specialties: [
      "AI automation",
      "Website development",
      "CRM systems",
      "AI chatbots",
      "Branding",
      "Digital marketing",
    ],
    approach:
      "Our focus is practical automation that solves real business problems — not technology for its own sake. We keep communication clear, pricing transparent, and every solution built to scale.",
    valuesLabel: "What we stand for",
    values: [
      {
        id: "innovation",
        title: "Practical Innovation",
        description:
          "We apply AI and automation where they save real time and win real business — not for novelty.",
      },
      {
        id: "partnership",
        title: "Clear Partnership",
        description:
          "Straightforward communication, transparent pricing, and service in English and Spanish.",
      },
      {
        id: "growth",
        title: "Built for Growth",
        description:
          "Scalable technology that grows with you, delivered for businesses across the United States.",
      },
    ],
    locationTitle: "Northfield, NJ",
    locationSubtitle: "Serving businesses across the United States",
  },

  partners: {
    intro:
      "The VYNTEX Authorized Reseller Program lets approved partners offer websites, AI tools, CRM systems, branding, and related digital services under their own client relationship while VYNTEX handles technical delivery.",
    factsLabel: "Program overview",
    facts: [
      "$199 annual activation",
      "Minimum four resales per 12-month period",
      "Access to confidential wholesale pricing after approval",
      "You set the client-facing price, subject to agreement terms",
      "You keep the difference between your authorized cost and the client price",
      "Technical delivery handled by VYNTEX",
      "Reseller agreement required",
    ],
    ctaLearn: "Learn About the Program",
    ctaApply: "Apply to Become a Reseller",
    lockedTitle: "Authorized partners only",
    lockedSubtitle:
      "Wholesale pricing and the partner library unlock after approval and activation.",
  },

  faq: {
    items: [
      {
        q: "What does VYNTEX do?",
        a: "We build AI automations, websites, CRM systems, AI chatbots, branding, and digital marketing for businesses. In plain terms: we help you attract clients, respond faster, and reduce manual work.",
      },
      {
        q: "What kinds of businesses do you serve?",
        a: "Businesses of every size across the United States — professional and tax services, legal, healthcare, home services, construction, real estate, restaurants, retail, beauty, automotive, education, agencies, and multi-location businesses.",
      },
      {
        q: "What is AI automation?",
        a: "Automation uses software to handle repetitive steps for you — qualifying a lead, sending a follow-up, scheduling an appointment, or notifying your team — so those things happen consistently without manual effort.",
      },
      {
        q: "Can VYNTEX connect with my existing tools?",
        a: "In most cases, yes. What can be connected depends on your specific systems and the scope of your project. We confirm the integrations during the Discover and Design steps.",
      },
      {
        q: "How much does a project cost?",
        a: "We don't publish prices, because the right package depends on your business. Book a free 30-minute consultation: we'll recommend the package that fits and walk you through its pricing. Need something custom? We start with an AI Blueprint that plans exactly what to build. Third-party platform fees (hosting, domains, software, messaging, advertising) are billed separately.",
      },
      {
        q: "Is there a monthly fee?",
        a: "Systems that keep running for you — such as a CRM, AI tools, or ongoing management — include a monthly plan in addition to the setup. Your written proposal shows every one-time and monthly amount before you decide.",
      },
      {
        q: "What is included in the 30-day support period?",
        a: "Every delivery includes 30 days of support for questions, small fixes, and adjustments after launch. Changes after that period are billed hourly.",
      },
      {
        q: "Are hosting and software fees included?",
        a: "No. Our prices cover our labor only. Third-party hosting, domains, software or CRM licenses, email/SMS sending, ad spend, and premium plugins are billed separately by the provider.",
      },
      {
        q: "Do you provide English and Spanish service?",
        a: "Yes. We work with clients in both English and Spanish, including project communication and client-facing content.",
      },
      {
        q: "How long does a project take?",
        a: "Timelines depend on scope. A simple site or tool moves quickly; custom CRM or automation work takes longer. We give you a timeline during the Design step before any build begins.",
      },
      {
        q: "Do you guarantee leads, sales, or search rankings?",
        a: "No. We build effective, well-structured systems and websites, but we do not guarantee specific leads, sales, or search rankings — anyone who does should be treated with caution.",
      },
      {
        q: "What is the reseller program?",
        a: "Approved partners resell VYNTEX services to their own clients at their own price while we handle delivery. It has a $199 annual activation and a minimum of four resales per year. Wholesale pricing unlocks after approval.",
      },
      {
        q: "Can I request a custom system?",
        a: "Yes. Custom websites, AI systems, and CRMs are scoped and quoted per project. Tell us what you need and we'll map it out.",
      },
      {
        q: "How do I begin?",
        a: "Contact us or book a consultation. We'll talk through your goals, then move into Discover and Design. Reach us at info@vyntexusa.com or call or text 609-780-3218.",
      },
    ],
  },

  contact: {
    infoTitle: "Talk to a real person",
    infoSubtitle:
      "Reach us directly, or use the form to tell us about your project. We reply within one business day.",
    labels: {
      email: "Email",
      phone: "Phone / WhatsApp",
      location: "Location",
      area: "Service area",
      languages: "Languages",
    },
    areaValue: "Nationwide — United States",
    languagesValue: "English & Spanish",
    form: {
      title: "Request a consultation",
      name: "Full name",
      business: "Business name",
      email: "Email",
      phone: "Phone",
      service: "Service interest",
      serviceOptions: [
        "Website",
        "AI automation",
        "CRM",
        "AI chatbot",
        "Branding",
        "Social media",
        "Reseller program",
        "Other",
      ],
      message: "Tell us about your project",
      orReach: "Prefer to reach out directly?",
      preferredContactLabel: "Preferred contact method",
      preferredContact: {
        email: "Email",
        phone: "Phone",
        text: "Text",
        whatsapp: "WhatsApp",
      },
      consent:
        "I agree to be contacted by VYNTEX about my request. I can opt out at any time.",
      submit: "Send message",
      sendAnother: "Send another message",
    },
  },

  finalCta: {
    title: "Ready to build a smarter business?",
    subtitle:
      "Tell us where your business loses time, leads, or opportunities. VYNTEX will help you identify a practical digital solution.",
  },

  forms: {
    send: "Send",
    sending: "Sending...",
    cancel: "Cancel",
    optional: "optional",
    close: "Close",
    errors: {
      required: "This field is required.",
      invalidEmail: "Enter a valid email address.",
      invalidPhone: "Enter a valid phone number.",
      minMessage: "Please use at least {min} characters.",
      consent: "Please provide your consent to continue.",
      selectService: "Please select a service.",
      selectAtLeastOne: "Please select at least one option.",
      tooManyLinks: "Your message contains too many links.",
      rateLimited: "Too many requests. Please try again later.",
      spam: "Your submission could not be processed. Please try again.",
      network: "Network error. Please check your connection and try again.",
      server: "Something went wrong on our end. Please try again.",
      session: "Your session has expired. Please sign in again.",
      emailFailed: "We saved your request but could not send a confirmation email.",
      invalidDate: "Choose a date from today on.",
    },
    success: {
      title: "Message sent",
      body: "Thank you. We received your request and will reply within one business day.",
    },
    partial: {
      title: "Request received",
      body: "We saved your request. A confirmation email may be delayed, but our team has it.",
    },
  },

  consult: {
    openLabel: "Book a Free Consultation",
    title: "Free 30-minute consultation",
    subtitle:
      "In 30 minutes we talk through your business, recommend the package that fits, and walk you through its pricing. We reply within one business day, in English or Spanish. No sales pressure.",
    fields: {
      name: "Full name",
      business: "Business name",
      email: "Email",
      phone: "Phone",
      services: "Services needed",
      budget: "Budget",
      timeline: "Timeline",
      preferredContact: "Preferred contact method",
      referral: "How did you hear about us?",
      message: "Tell us about your project",
      consent:
        "I agree to be contacted by VYNTEX about my request. I can opt out at any time.",
    },
    selectPlaceholder: "Select one",
    referralPlaceholder: "Referral, search, social, etc. (optional)",
    serviceOptions: [
      "Website",
      "AI Automation",
      "AI Chatbot",
      "CRM",
      "Branding",
      "Digital Marketing",
      "Social Media",
      "Reseller Program",
      "Other",
    ],
    budgetOptions: [
      "Under $500",
      "$500–$1,500",
      "$1,500–$5,000",
      "$5,000–$10,000",
      "$10,000+",
      "Not sure yet",
    ],
    timelineOptions: [
      "ASAP",
      "Within 2–4 weeks",
      "Within 1–3 months",
      "Planning ahead",
    ],
    preferredContactOptions: ["Email", "Phone", "Text", "WhatsApp", "Video Call"],
    submit: "Request consultation",
  },

  demo: {
    title: "Book a free demo",
    subtitle:
      "See VYNTEX ERP with a person from our team, set up for your industry. Tell us a little about your business and when works for you. We reply within one business day to confirm the time, in English or Spanish.",
    fields: {
      industry: "Industry",
      teamSize: "Team size",
      preferredDate: "Preferred date",
      preferredTime: "Preferred time (Eastern)",
      message: "Anything you want us to cover? (optional)",
    },
    industryPlaceholder: "For example: construction, cleaning, landscaping",
    teamSizeOptions: ["Just me", "2 to 5 people", "6 to 15 people", "16 to 50 people", "More than 50 people"],
    preferredTimeOptions: [
      "Morning (9 AM to 12 PM)",
      "Midday (12 PM to 3 PM)",
      "Afternoon (3 PM to 5:30 PM)",
      "Any time",
    ],
    submit: "Request my demo",
    success: {
      title: "Demo request received",
      body: "Thanks. We got your request and will reply within one business day to confirm the date and time of your demo.",
    },
    otherHelp: "Need a website, CRM or automation project instead?",
    switchToConsultation: "Book a free consultation",
  },

  auth: {
    login: {
      title: "Client login",
      subtitle:
        "Enter your email and we'll send you a one-time verification code. No password needed.",
      emailLabel: "Email address",
      emailPlaceholder: "you@business.com",
      submit: "Send verification code",
    },
    verify: {
      title: "Enter your code",
      subtitle: "We sent a verification code to {email}. It expires shortly.",
      codeLabel: "Verification code",
      codePlaceholder: "12345678",
      submit: "Verify & continue",
      resend: "Resend code",
      resendIn: "Resend code in {seconds}s",
      changeEmail: "Use a different email",
    },
    errors: {
      invalidEmail: "Enter a valid email address.",
      invalidCode: "That code is invalid. Please check and try again.",
      expiredCode: "That code has expired. Request a new one.",
      otpFailed: "We couldn't send a code. Please try again.",
      tooManyRequests: "Too many attempts. Please wait and try again.",
      missingEmail: "Please start from the login page.",
      generic: "Something went wrong. Please try again.",
    },
    notices: {
      codeSent: "Verification code sent. Check your email.",
      codeResent: "A new code is on its way.",
    },
  },

  portal: {
    welcome: "Welcome back",
    signedInAs: "Signed in as",
    manageAccount: "Manage your account and requests below.",
    sections: {
      profile: "Account profile",
      projects: "Project status",
      orders: "Orders",
      agreements: "Agreements",
      files: "Files",
      support: "Support requests",
    },
    empty: {
      projects: "No active projects yet.",
      orders: "No orders available.",
      agreements: "No agreements available.",
      files: "No files available.",
      support: "You have no support requests yet.",
    },
    profile: {
      title: "Account profile",
      fullName: "Full name",
      businessName: "Business name",
      phone: "Phone",
      language: "Preferred language",
      langEn: "English",
      langEs: "Spanish",
      save: "Save profile",
      saving: "Saving...",
      saved: "Profile saved.",
      error: "Could not save your profile. Please try again.",
    },
    support: {
      title: "Support requests",
      subjectLabel: "Subject",
      subjectPlaceholder: "Brief summary",
      messageLabel: "Message",
      messagePlaceholder: "Describe what you need help with",
      create: "Submit request",
      creating: "Submitting...",
      created: "Support request submitted.",
      error: "Could not submit your request. Please try again.",
      listTitle: "Your requests",
      createdAt: "Submitted",
    },
    status: {
      open: "Open",
      in_progress: "In progress",
      resolved: "Resolved",
      closed: "Closed",
    },
    logout: "Log out",
    loggingOut: "Logging out...",
  },


  footer: {
    tagline: "Connected business systems, CRM implementation, automation, websites, and digital solutions.",
    servicesHeading: "Services",
    companyHeading: "Company",
    contactHeading: "Contact",
    services: {
      websites: "Websites",
      ai: "AI Tools & Automation",
      crm: "CRM & Pipelines",
      branding: "Branding & Identity",
      social: "Social Media",
      marketing: "Digital Marketing",
    },
    company: {
      about: "About",
      howItWorks: "How It Works",
      industries: "Industries",
      partners: "Partners",
      faq: "FAQ",
      contact: "Contact",
    },
    hoursNote: "Bilingual service — English & Spanish",
    laborNote:
      "Prices cover our labor only. Third-party platform fees (hosting, domains, CRM licenses, SMS) are billed separately by the provider.",
    rights: "All rights reserved.",
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookies: "Cookie Policy",
      accessibility: "Accessibility",
    },
  },

  reseller: {
    apply: {
      title: "Apply to the Authorized Reseller Program",
      subtitle:
        "Approved partners offer VYNTEX services under their own client relationship while VYNTEX handles technical delivery. Applying does not grant access or pricing.",
      programHeading: "Program terms",
      programTerms: [
        "{fee} annual activation fee",
        "Minimum of {min} resales per 12-month period",
        "You set your client-facing price, subject to the agreement",
        "You may not advertise or sell below published VYNTEX retail pricing",
        "You bill and collect from your own clients; VYNTEX is paid the partner amount",
        "Third-party costs (hosting, domains, software, SMS, ad spend) are separate",
        "Wholesale pricing is confidential and must not be shared or published",
        "The agreement runs 12 months and renews with each annual activation",
      ],
      stepsHeading: "What happens after you apply",
      steps: [
        "We review your application manually and reply within one business day.",
        "If approved, you receive a partner number.",
        "You sign the Authorized Reseller Agreement in your portal.",
        "You pay the annual activation.",
        "Confidential wholesale pricing unlocks only after all of the above.",
      ],
      fields: {
        fullName: "Full name",
        businessName: "Business name",
        email: "Email",
        phone: "Phone",
        website: "Website",
        city: "City",
        state: "State",
        clientCount: "Number of current clients",
        servicesInterest: "Services you want to resell",
        resellModel: "How do you plan to resell?",
        message: "Tell us about your business and your clients",
        agreementAck:
          "I understand that approval is required, that I must sign the Authorized Reseller Agreement, and that wholesale pricing is confidential.",
        privacyConsent:
          "I agree to be contacted by VYNTEX about this application and accept the Privacy Policy.",
      },
      selectPlaceholder: "Select one",
      clientCountOptions: {
        "0": "No clients yet",
        "1_10": "1–10 clients",
        "11_50": "11–50 clients",
        "51_200": "51–200 clients",
        "200_plus": "200+ clients",
      },
      serviceOptions: {
        websites: "Websites",
        ai_automation: "AI Automation",
        crm: "CRM",
        branding: "Branding",
        social_media: "Social Media",
        digital_marketing: "Digital Marketing",
      },
      modelOptions: {
        add_on_service: "Add-on to an existing service business",
        agency: "Agency or marketing shop",
        referral: "Refer and hand off",
        white_label: "Resell under my own brand",
        other: "Other",
      },
      submit: "Submit application",
      submitting: "Submitting...",
      successTitle: "Application received",
      successBody:
        "Thank you. We will review your application and reply within one business day. Approval is required before any wholesale pricing is shared.",
      partialBody:
        "We saved your application. A confirmation email may be delayed, but our team has it.",
      disclaimer:
        "Submitting this application does not create a partnership, grant access to wholesale pricing, or entitle you to any discount. Approval is at VYNTEX's discretion.",
    },
  },

  partner: {
    title: "Partner portal",
    subtitle: "Your Authorized Reseller status, agreement, orders, and library.",
    backToPortal: "Back to client portal",
    fields: {
      partnerNumber: "Partner number",
      status: "Status",
      activationDate: "Activation date",
      expirationDate: "Expiration date",
      salesCount: "Qualifying sales this term",
      minimumRequired: "Minimum required",
      agreementStatus: "Agreement",
      renewalStatus: "Renewal",
    },
    statusLabels: {
      none: "Not a partner",
      pending: "Pending review",
      approved: "Approved",
      active: "Active",
      suspended: "Suspended",
      expired: "Expired",
      terminated: "Terminated",
    },
    agreementSigned: "Signed",
    agreementUnsigned: "Not signed",
    notApplicable: "—",
    states: {
      none: {
        title: "You are not enrolled in the partner program",
        body: "Apply to the Authorized Reseller Program to get started. Approval is required.",
        cta: "Apply now",
      },
      pending: {
        title: "Your application is under review",
        body: "We received your application and are reviewing it. We reply within one business day. Wholesale pricing is not available until you are approved, have signed the agreement, and your activation payment is confirmed.",
      },
      approvedUnsigned: {
        title: "Sign your reseller agreement",
        body: "You have been approved. The next step is to read and sign the Authorized Reseller Agreement.",
        cta: "Review & sign agreement",
      },
      signedUnpaid: {
        title: "Pay your annual activation",
        body: "Your agreement is signed. Pay the {fee} annual activation fee to activate your partner access for 12 months.",
        cta: "Pay activation ({fee})",
      },
      expired: {
        title: "Your partner access has expired",
        body: "Renew your annual activation to restore access to the confidential wholesale library.",
        cta: "Renew access ({fee})",
      },
      suspended: {
        title: "Your partner access is suspended",
        body: "Your access to wholesale pricing is currently withheld. Please contact us so we can resolve this.",
        cta: "Contact support",
      },
      terminated: {
        title: "Your partner access has been terminated",
        body: "This partner account is closed. Confidentiality and non-circumvention obligations survive termination. Contact us with any questions.",
        cta: "Contact support",
      },
    },
    minimumWarning:
      "You have {count} of {min} qualifying sales this term. Falling short of the minimum may end your access when the term expires.",
    minimumMet: "You have met the minimum of {min} qualifying sales for this term.",
    expiringSoon: "Your partner access expires on {date}. Renew to keep the library open.",
    actions: {
      downloadAgreement: "Download signed agreement",
      preparing: "Preparing...",
      viewOrders: "View my partner orders",
      contactSupport: "Contact support",
      renew: "Renew access",
      placeOrder: "Submit a client order",
    },
    downloadError: "We could not prepare your document. Please try again or contact us.",
  },

  wholesale: {
    title: "Wholesale library",
    subtitle: "Your authorized partner cost, the suggested retail price, and your estimated margin.",
    confidentialBanner:
      "Confidential partner information. Do not publish or share wholesale pricing.",
    columns: {
      service: "Service",
      partnerCost: "Partner cost",
      suggestedRetail: "Suggested retail",
      partnerMargin: "Estimated margin",
      maintenanceCost: "Maintenance cost",
      maintenanceRetail: "Suggested maintenance retail",
    },
    perMonth: "/mo",
    setup: "setup",
    quoteOnly: "Quoted per project — contact VYNTEX for a partner quote.",
    includedHeading: "Included in every service",
    included: [
      "VYNTEX performs the technical delivery",
      "30 days of support after delivery",
      "Changes after 30 days are billed hourly at {hourly}/hr (rush {rush}/hr)",
      "You keep the difference between your partner cost and your client price",
    ],
    thirdPartyHeading: "Not included",
    thirdParty:
      "All prices cover VYNTEX labor and creation only. They do not include third-party fees — hosting, domains, software or CRM licenses, email/SMS sending, ad spend, premium plugins, stock assets, or any service carrying its own monthly fee. You must disclose this to your clients.",
    noUndercutting:
      "You may not advertise, list, or sell any VYNTEX service below the published retail price.",
    orderHeading: "Submit a client order",
    orderSubtitle:
      "Place an order at your partner cost. A qualifying sale is recorded only after payment is confirmed.",
    orderFields: {
      service: "Service",
      clientReference: "Client reference",
      clientReferenceHint:
        "A label only you need to recognize this order, e.g. \"Acme Bakery — homepage\". Do not enter your client's personal details; VYNTEX does not need them.",
      notes: "Project notes",
      terms:
        "I confirm this order is placed under my Authorized Reseller Agreement and that I am responsible for collecting payment from my own client.",
    },
    orderSubmit: "Continue to payment",
    orderSubmitting: "Creating order...",
  },

  agreement: {
    title: "Authorized Reseller Agreement",
    version: "Agreement version {version}",
    languageNote:
      "The Spanish text is a courtesy translation. In the event of any conflict, the English version controls.",
    englishHeading: "English",
    spanishHeading: "Español (courtesy translation)",
    print: "Print",
    download: "Download signed copy",
    signHeading: "Electronic signature",
    signSubtitle:
      "Sign below to accept this agreement. Your typed name, the date and time, and technical details of this submission are recorded as evidence of your signature.",
    notDocusign:
      "This is a typed-name electronic signature with an audit trail. It is not a certificate-based e-signature service such as DocuSign.",
    fields: {
      fullLegalName: "Full legal name",
      legalBusinessName: "Legal business name",
      signerTitle: "Title",
      email: "Email",
      date: "Date",
      typedSignature: "Type your full legal name to sign",
      agreementAccepted: "I have read and agree to the Authorized Reseller Agreement.",
      signatureConsent:
        "I consent to sign this agreement electronically and understand that my typed name is my signature.",
    },
    signSubmit: "Sign agreement",
    signing: "Signing...",
    signedTitle: "Agreement signed",
    signedBody:
      "Your signed agreement has been recorded and emailed to you. The next step is your annual activation payment.",
    signedPartialBody:
      "Your signature is recorded. Your emailed copy or PDF may be delayed — you can download it from your portal at any time.",
    alreadySigned: "You have already signed the current version of this agreement.",
    signedFacts: {
      signedBy: "Signed by",
      signedAt: "Signed at",
      version: "Version",
      hash: "Agreement hash (SHA-256)",
    },
    errors: {
      nameMismatch: "Your typed signature must match your full legal name exactly.",
      notPartner: "Only approved partners can sign this agreement.",
      inactive: "Your partner account cannot sign at this time. Please contact us.",
    },
    disclaimer:
      "This is a business template, not legal advice. Have it reviewed by a licensed attorney in your state before use.",
  },

  checkout: {
    title: "Checkout",
    subtitle: "Review your order and continue to secure payment.",
    summaryHeading: "Order summary",
    detailsHeading: "Your information",
    selectService: "Select a service",
    noService: "Select a service to continue.",
    fields: {
      fullName: "Full name",
      businessName: "Business name",
      email: "Email",
      phone: "Phone",
      notes: "Anything we should know?",
      terms: "I accept the Terms of Service.",
      privacy: "I accept the Privacy Policy.",
    },
    lines: {
      oneTime: "One-time",
      setup: "Setup fee",
      recurring: "Monthly",
      annual: "Annual",
      subtotal: "Subtotal",
      tax: "Tax",
      total: "Total due today",
    },
    recurringNote:
      "The monthly fee of {amount} is billed separately and is not charged today.",
    laborNote:
      "Prices cover VYNTEX labor only. Third-party costs — hosting, domains, software or CRM licenses, SMS, and ad spend — are billed separately by the provider.",
    supportNote: "Includes {days} days of support. Changes after that are billed hourly.",
    quoteOnly:
      "This service is quoted per project and cannot be purchased online. Book a consultation and we will prepare a quote.",
    submit: "Continue to secure payment",
    submitting: "Creating your order...",
    redirecting: "Redirecting to secure payment...",
    poweredBy: "Payment is processed by Square. VYNTEX never sees or stores your card details.",
    errors: {
      unavailable: "Online payment is temporarily unavailable. Please contact us and we will take your order directly.",
      linkFailed: "We could not start the payment. Please try again, or contact us.",
      notActive: "Your partner account is not active. Complete your agreement and activation first.",
      quoteRequired: "This service is quoted per project. Please book a consultation.",
    },
  },

  orders: {
    title: "Orders",
    partnerTitle: "Partner orders",
    subtitle: "Every order you have placed, and its payment status.",
    empty: "You have no orders yet.",
    columns: {
      date: "Date",
      order: "Order",
      reference: "Reference",
      amount: "Amount",
      status: "Status",
    },
    status: {
      pending: "Awaiting payment",
      paid: "Paid",
      failed: "Failed",
      canceled: "Canceled",
      refunded: "Refunded",
    },
    types: {
      direct: "Service order",
      reseller_activation: "Reseller activation",
      reseller_renewal: "Reseller renewal",
      partner_wholesale: "Partner order",
    },
    qualifying: "Counted toward your minimum",
    success: {
      title: "Thank you — we are confirming your payment",
      body: "Square is confirming your payment now. This page updates as soon as we have verified confirmation from the payment processor. You do not need to pay again.",
      pending: "Confirming payment",
      confirmed: "Payment confirmed",
      confirmedBody:
        "Your payment is confirmed. A receipt is on its way to your email.",
      refresh: "Check again",
      viewOrders: "View my orders",
      partnerNext:
        "Your partner access is now active. The wholesale library is open in your partner portal.",
    },
    cancel: {
      title: "Payment canceled",
      body: "Your payment was not completed and you have not been charged. Your order is saved — you can return and pay whenever you are ready.",
      retry: "Try again",
      contact: "Contact us instead",
    },
  },

  legal: {
    questions: "Questions about this policy? Email us at",
    emailAddress: "info@vyntexusa.com",
  },

  admin: {
    title: "Administrator",
    subtitle: "Applications, partners, orders, and system health.",
    tabs: {
      applications: "Applications",
      partners: "Partners",
      orders: "Orders",
      system: "System",
    },
    applications: {
      empty: "No pending applications.",
      pending: "Pending",
      columns: {
        received: "Received",
        business: "Business",
        contact: "Contact",
        location: "Location",
        clients: "Clients",
        model: "Model",
      },
      approve: "Approve",
      approving: "Approving...",
      reject: "Reject",
      rejecting: "Rejecting...",
      approved: "Approved. Partner number: {number}",
      rejected: "Application rejected.",
      confirmReject: "Reject this application? This cannot be undone from the portal.",
      noAuthUser:
        "This applicant has never signed in. Ask them to sign in once at /login (email OTP) so an account exists to attach the partner record to, then approve again.",
      approvalNote:
        "Approving creates a partner with status 'approved' and emails them their partner number. It does NOT unlock wholesale pricing — they must still sign the agreement and pay the activation.",
    },
    partners: {
      empty: "No partners yet.",
      columns: {
        number: "Number",
        business: "Business",
        status: "Status",
        expires: "Expires",
        sales: "Sales",
      },
      suspend: "Suspend",
      reinstate: "Reinstate",
      terminate: "Terminate",
      confirmTerminate:
        "Terminate this partner? Their access is revoked immediately. Confidentiality obligations survive.",
      updated: "Partner updated.",
    },
    orders: {
      empty: "No orders yet.",
      columns: {
        date: "Date",
        customer: "Customer",
        item: "Item",
        amount: "Amount",
        status: "Status",
      },
      paidNote: "Only orders confirmed by a verified Square webhook show as paid.",
    },
    system: {
      title: "System health",
      squareMode: "Square mode",
      sandbox: "SANDBOX — test payments only, no real money moves",
      production: "PRODUCTION — real cards are being charged",
      emailQueue: "Email queue",
      emailPending: "Pending",
      emailAbandoned: "Abandoned (needs attention)",
      emailSent: "Sent",
      cronTitle: "Scheduled jobs",
      cronNever: "Never run",
      lastRun: "Last run",
      configured: "Configured",
      missing: "Not configured",
      allGood: "All required services are configured.",
      healthLink: "Open /api/health for full detail",
    },
    errors: {
      failed: "That action failed. Please try again.",
      rateLimited: "Too many actions. Please slow down.",
    },
  },

  files: {
    title: "Files",
    subtitle: "Upload documents for your project, or download what we've sent you.",
    empty: "No files yet.",
    upload: "Upload a file",
    uploading: "Uploading...",
    choose: "Choose a file",
    maxSize: "Up to 4 MB. PDF, images, Word, Excel, CSV, or ZIP.",
    columns: {
      name: "File",
      size: "Size",
      uploaded: "Uploaded",
    },
    download: "Download",
    preparing: "Preparing...",
    uploaded: "File uploaded.",
    errors: {
      tooLarge:
        "That file is larger than 4 MB. Email it to us instead, or send a share link.",
      badType: "That file type isn't supported. Use PDF, an image, Word, Excel, CSV, or ZIP.",
      failed: "The upload failed. Please try again.",
      downloadFailed: "We couldn't prepare that download. Please try again.",
    },
  },

  chat: {
    open: "Ask a question",
    close: "Close chat",
    title: "VYNTEX Assistant",
    subtitle: "Instant answers about services, VYNTEX ERP and how to start.",
    disclosure:
      "Answers come instantly from VYNTEX's own published information. It never guesses: for anything it doesn't cover, it connects you with a real person.",
    placeholder: "Type your question…",
    send: "Send",
    newChat: "New chat",
    startPrompt: "What would you like to know?",
    topics: {
      pricing: "What does it cost?",
      services: "What do you do?",
      timeline: "How long does it take?",
      included: "What's included?",
      thirdParty: "What's NOT included?",
      reseller: "Reseller program",
      support: "Support & changes",
      languages: "Do you work in Spanish?",
      contact: "Talk to a person",
    },
    backToTopics: "Ask something else",
    humanCta: "Talk to a person",
    bookCta: "Book a free consultation",
  },
  erp: {
    navLabel: "VYNTEX ERP",
    navShort: "VYNTEX ERP",
    navTitle: "VYNTEX ERP: try the live demo and see plans and pricing at erp.vyntexusa.com",
    navBadge: "Live",
    eyebrow: "VYNTEX ERP",
    status: "Live at erp.vyntexusa.com",
    titleA: "Your whole operation,",
    titleB: "run from one command center.",
    lede:
      "Leads, clients, jobs, crews, tasks, documents, scheduling, payments and reports in one place, set up for your industry, with automations that take the repetitive work off your plate.",
    features: [
      {
        title: "Industry editions",
        body: "Starts out speaking your trade: its wording, service types, documents and task lists.",
      },
      {
        title: "Automations you control",
        body: "Rules you switch on or off, and task lists that start by themselves when a job is won or finished.",
      },
      {
        title: "Access by role",
        body: "Owners, managers and office staff each see what their role allows, with a separate portal for crews.",
      },
      {
        title: "English and Spanish",
        body: "Your team and your clients can work in the language they prefer.",
      },
    ],
    ctaDemo: "Explore the live demo",
    ctaOpen: "Open VYNTEX ERP",
    ctaPricing: "See software plans and pricing",
    ctaRequest: "Book a free guided demo",
    demoNote: "The demo opens a sample company with made-up records. Nothing you do there is sent to anyone.",
    shotAlt: "VYNTEX ERP dashboard from the live demo, showing a sample construction company",
    shotCaption: "Real screen from the live demo. Sample company, made-up records.",
    footerHeading: "VYNTEX ERP",
    footerOpen: "VYNTEX ERP",
    footerDemo: "Try the live demo",
    footerPricing: "Plans & pricing",
    footerBook: "Book a free demo",
    ctaTryDemo: "Try Live Demo",
    ctaSoftwarePricing: "View VYNTEX ERP & Pricing",
    ctaBookDemo: "Book a Free Demo",
    ctaGroupLabel: "VYNTEX ERP: demo, pricing and booking",
    ctaNote: "The live demo opens right away with a sample company. No appointment or account needed.",
    ctaOther: "Looking for a website, CRM or automation project instead?",
  },

  /** Header "Sign in" menu, drawer tiles and the Partner Portal links. */
  portals: {
    signIn: "Sign in",
    myPortals: "My portals",
    menuHeading: "Choose your portal",
    client: "Client Portal",
    clientDesc: "Your orders, files and support",
    partner: "Partner Portal",
    partnerDesc: "Invited partners only",
    partnerTitle: "Partner Portal at erp.vyntexusa.com. Invited partners only, sign in with your authenticator app.",
    footerPartner: "Partner Portal",
    existingNote: "Invitation only. Use the email we invited and your authenticator app.",
  },

  theme: {
    toLight: "Switch to day mode",
    toDark: "Switch to night mode",
    day: "Day",
    night: "Night",
  },
};

type Dict = typeof en;

const es: Dict = {
  language: {
    en: "English",
    es: "Español",
    switchToEn: "Cambiar a Inglés",
    switchToEs: "Cambiar a Español",
  },

  a11y: {
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    primaryNav: "Principal",
    logoAlt: "VYNTEX — Sistemas Empresariales Conectados y Soluciones Tecnológicas",
  },

  actions: {
    getStarted: "Empezar",
    requestQuote: "Pedir Cotización",
    bookCall: "Agendar Llamada",
    bookConsultation: "Agenda tu Consulta Gratis",
    seePricing: "Ver Precios",
    explorePricing: "Ver Precios",
    exploreSolutions: "Explorar Soluciones",
    becomeReseller: "Ser Revendedor",
    contactUs: "Contactar a VYNTEX",
    learnMore: "Más Información",
    clientLogin: "Acceso de Clientes",
    clientPortal: "Portal de Clientes",
    logout: "Cerrar Sesión",
  },

  nav: {
    home: "Inicio",
    solutions: "Soluciones",
    services: "Servicios",
    howItWorks: "Cómo Funciona",
    aiAutomation: "Automatización IA",
    pricing: "Precios",
    industries: "Industrias",
    caseStudies: "Casos de Éxito",
    about: "Nosotros",
    partners: "Socios",
    resources: "Recursos",
    faq: "Preguntas Frecuentes",
    contact: "Contacto",
  },

  hero: {
    eyebrow: "Automatización IA · Desarrollo Web · Tecnología Digital",
    headlineLead: "Crea un negocio más inteligente que",
    headlineAccent: "trabaja incluso cuando tú no.",
    subtitle:
      "VYNTEX crea automatizaciones con IA, sitios web, sistemas CRM y soluciones digitales que ayudan a los negocios a captar clientes, responder más rápido, reducir el trabajo manual y crecer con confianza.",
    ctaExplore: "Explorar Soluciones",
    ctaPricing: "Ver Precios",
    ctaConsult: "Agenda tu Consulta Gratis",
    demoLabel: "Ejemplo interactivo de automatización",
    workflow: {
      lead: "Cliente potencial",
      qualify: "Calificación con IA",
      crm: "Registro creado en CRM",
      followup: "Seguimiento automático",
      appointment: "Cita agendada",
      notify: "Dueño notificado",
    },
    terminal: [
      "Captando un nuevo cliente...",
      "Calificando con IA...",
      "Creando el registro en el CRM...",
      "Enviando el seguimiento...",
      "Agendando la cita...",
    ],
    trust: {
      bilingual: "Servicio en inglés y español",
      pricing: "Precios claros, únicos y mensuales",
      support: "30 días de soporte incluido cuando aplica",
      nationwide: "Servicio en todo el país",
    },
  },

  sections: {
    services: {
      eyebrow: "Lo que creamos",
      title: "Todo para lanzar y crecer",
      description:
        "Un solo equipo para tu sitio web, tus sistemas, tus automatizaciones y tu marca. Sin agencias, sin complicaciones.",
    },
    howItWorks: {
      eyebrow: "Cómo funciona",
      title: "Un camino claro de la idea al lanzamiento",
      description:
        "Cinco pasos bien definidos. Una persona real construye tu proyecto y responde tus preguntas en cada uno.",
    },
    aiAutomation: {
      eyebrow: "Mira lo que la IA puede hacer",
      title: "Automatizaciones que trabajan mientras duermes",
      description:
        "Demostraciones interactivas de los flujos que creamos — manejo de clientes, chat, embudos y onboarding.",
    },
    pricing: {
      eyebrow: "Precios para cliente directo",
      title: "Precios claros. Sin sorpresas.",
      description:
        "Webs, herramientas y marca son pago único con soporte incluido. Los CRM llevan cuota de configuración más cuota mensual. Los precios cubren solo nuestra mano de obra — hosting, dominios y plataformas de terceros se cobran por separado.",
    },
    industries: {
      eyebrow: "Industrias que atendemos",
      title: "Hecho para la forma en que trabaja tu negocio",
      description:
        "Desde servicios profesionales hasta restaurantes y comercio — webs y automatización prácticas, en inglés y español.",
    },
    caseStudies: {
      eyebrow: "Casos de éxito",
      title: "Trabajo reciente",
      description:
        "Estamos preparando ejemplos de proyectos verificados. No publicamos resultados que no podamos comprobar.",
    },
    about: {
      eyebrow: "Sobre VYNTEX",
      title: "Un equipo real, no una plataforma",
      description:
        "VYNTEX es una agencia de tecnología digital de Northfield, Nueva Jersey que ayuda a los negocios a mejorar cómo atraen clientes, se comunican, operan y crecen.",
    },
    partners: {
      eyebrow: "Programa de Revendedor Autorizado",
      title: "Amplía lo que puedes ofrecer a tus clientes",
      description:
        "Los socios aprobados ofrecen los servicios de VYNTEX bajo su propia relación con el cliente mientras nosotros manejamos la entrega técnica.",
    },
    faq: {
      eyebrow: "Preguntas y respuestas",
      title: "Preguntas frecuentes",
      description:
        "Respuestas claras sobre servicios, precios, soporte y cómo trabajamos.",
    },
    contact: {
      eyebrow: "Contacto",
      title: "Hablemos de tu proyecto",
      description:
        "Cuéntanos qué necesitas. Respondemos en un día hábil, en inglés o español.",
    },
  },

  services: {
    startingAt: "Desde",
    items: {
      "ai-automation": {
        title: "Automatización con IA",
        problem: "El trabajo manual y repetitivo frena a tu equipo.",
        description:
          "Automatizaciones a medida que califican clientes, dan seguimiento, agendan y notifican a tu equipo — conectadas a las herramientas que ya usas.",
      },
      web: {
        title: "Desarrollo Web",
        problem: "Un sitio lento o anticuado te cuesta clientes.",
        description:
          "Sitios web rápidos y adaptados a móvil, hechos para convertir, con reservas, menús, galerías, mapas y SEO básico.",
      },
      crm: {
        title: "CRM y Embudos de Venta",
        problem: "Los clientes potenciales se pierden en el camino.",
        description:
          "Sistemas de contactos y embudos con seguimiento automático y reportes, para que nada se te escape.",
      },
      chatbot: {
        title: "Chatbots con IA",
        problem: "Los visitantes se van cuando nadie responde.",
        description:
          "Asistentes de IA que responden preguntas, capturan datos y te envían las consultas serias — de día o de noche.",
      },
      branding: {
        title: "Imagen de Marca e Identidad Digital",
        problem: "Una marca inconsistente se ve poco profesional.",
        description:
          "Logos, tarjetas de presentación, volantes y kits de marca completos que hacen ver bien a tu negocio.",
      },
      marketing: {
        title: "Marketing Digital y Redes Sociales",
        problem: "El buen trabajo pasa desapercibido.",
        description:
          "Creación de cuentas, contenido y manejo continuo en las plataformas que le importan a tus clientes.",
      },
    },
    process: {
      title: "Procesos de negocio que podemos automatizar",
      subtitle:
        "Flujos comunes que configuramos para que tu negocio responda más rápido con menos esfuerzo manual.",
      items: [
        "Calificación de clientes",
        "Agendado de citas",
        "Seguimiento de llamadas perdidas",
        "Secuencias de correo y SMS",
        "Onboarding de clientes",
        "Solicitud de reseñas",
        "Notificaciones internas",
        "Recolección de documentos",
        "Recordatorios de factura",
        "Atención al cliente",
      ],
    },
  },

  howItWorks: {
    steps: [
      {
        id: "discover",
        title: "Descubrir",
        description:
          "Entendemos tu negocio, flujo de trabajo, cuellos de botella, objetivos y sistemas existentes.",
      },
      {
        id: "design",
        title: "Diseñar",
        description:
          "Mapeamos la solución, las integraciones, la experiencia de usuario y el plan de implementación.",
      },
      {
        id: "build",
        title: "Construir",
        description:
          "Creamos el sitio web, la automatización, el CRM, el chatbot o el sistema digital.",
      },
      {
        id: "launch",
        title: "Probar y Lanzar",
        description:
          "Probamos el comportamiento, la respuesta móvil, las notificaciones y las integraciones antes de lanzar.",
      },
      {
        id: "support",
        title: "Soporte y Optimización",
        description:
          "Recibes el periodo de soporte incluido, más mantenimiento continuo cuando lo elijas.",
      },
    ],
  },

  aiShowcase: {
    disclaimer:
      "Demostración de un flujo típico. La automatización final depende de los sistemas del cliente y del alcance del proyecto. No está conectada a un sistema en vivo.",
    tabs: {
      lead: "Automatización de Clientes",
      chatbot: "Chatbot con IA",
      crm: "Embudo CRM",
      onboarding: "Onboarding de Clientes",
    },
    lead: {
      caption: "Un nuevo cliente atendido de principio a fin, automáticamente.",
      steps: {
        form: "Formulario enviado",
        scored: "Cliente calificado",
        crm: "Contacto creado en CRM",
        email: "Correo enviado",
        sms: "SMS enviado",
        appointment: "Cita agendada",
        notify: "Equipo notificado",
      },
    },
    chatbot: {
      caption: "Un asistente de IA que responde y canaliza consultas reales.",
      visitorLabel: "Visitante",
      assistantLabel: "Asistente",
      messages: {
        visitor1: "Necesito un sitio web para mi restaurante.",
        assistant1:
          "Con gusto te ayudo. Un sitio estándar puede ser ideal si necesitas menú, galería, integración de reservas, Google Maps y SEO básico.",
        assistant2: "¿Prefieres revisar los precios o agendar una consulta?",
      },
    },
    crm: {
      caption: "Los clientes avanzan por tu embudo a medida que progresan.",
      columns: {
        new: "Nuevo",
        contacted: "Contactado",
        proposal: "Propuesta",
        won: "Ganado",
      },
      records: {
        restaurant: "Restaurante",
        legal: "Oficina Legal",
        home: "Servicios para el Hogar",
      },
    },
    onboarding: {
      caption: "Clientes nuevos incorporados sin idas y vueltas manuales.",
      steps: {
        payment: "Pago confirmado",
        intake: "Formulario de ingreso enviado",
        documents: "Documentos recolectados",
        project: "Proyecto creado",
        tasks: "Tareas internas asignadas",
        update: "Actualización enviada al cliente",
      },
    },
  },

  pricing: {
    tabs: {
      websites: "Sitios Web",
      ai: "Herramientas IA",
      crm: "CRM",
      branding: "Marca",
      social: "Redes Sociales",
    },
    units: {
      oneTime: "pago único",
      setup: "configuración",
      perMonth: "/mes",
      perYear: "/año",
      custom: "a medida",
    },
    plus: "+",
    badges: {
      popular: "Popular",
      supportIncluded: "30 días de soporte incluido",
    },
    maintenance: {
      from149: "+ desde $149/mes mantenimiento (opcional)",
      from189: "+ desde $189/mes mantenimiento (opcional)",
      quoted: "Mantenimiento cotizado por proyecto",
      buyout: "50% depósito · mantenimiento a medida · compra {range}",
    },
    cta: {
      getStarted: "Empezar",
      requestQuote: "Pedir Cotización",
    },
    policies: {
      title: "Cómo funcionan nuestros precios",
      support:
        "Se incluyen {days} días de soporte después de la entrega, cuando aplica.",
      hourly:
        "Los cambios después del periodo incluido son {hourly}/hora. Los cambios urgentes son {rush}/hora (mínimo 1 hora, luego en bloques de 30 minutos).",
      thirdParty:
        "Hosting, dominios, licencias, SMS, publicidad, plugins y costos de plataformas externas de terceros los cobra el proveedor por separado — no son parte de nuestra mano de obra.",
    },
    items: {
      BasicWebsite: {
        name: "Web Básica",
        tagline: "1–3 páginas. Sitio inicial ideal.",
        features: ["Diseño móvil", "Formulario de contacto", "Hosting en Cloudflare"],
      },
      StandardWebsite: {
        name: "Web Estándar",
        tagline: "5–7 páginas. Reservas, menú, SEO básico.",
        features: [
          "Hasta 7 páginas",
          "Reservas / menú / galería",
          "Redes + SEO básico",
          "Google Maps + reseñas",
        ],
      },
      CustomizedWebsite: {
        name: "Web a Medida",
        tagline: "Todo lo que va más allá del estándar.",
        features: ["Funciones y páginas a medida", "Integraciones avanzadas"],
      },
      SimpleAiTool: {
        name: "Herramienta IA Simple",
        tagline: "Chatbot, calculadora o formulario.",
        features: ["Una herramienta con IA", "Alojado en Netlify", "Notificaciones por correo"],
      },
      StandardAiAutomation: {
        name: "Automatización Estándar",
        tagline: "Captura de clientes + respuesta automática.",
        features: [
          "Automatización de varios pasos",
          "Formulario + correo/SMS",
          "Conectado a tus herramientas",
        ],
      },
      AdvancedAi: {
        name: "Avanzado / A Medida",
        tagline: "Sistemas de IA complejos a medida.",
        features: ["Flujos de IA a medida", "Integraciones API", "Ajuste continuo"],
      },
      CRMBasic: {
        name: "CRM Básico",
        tagline: "Sistema estándar. Contactos + embudo.",
        features: ["Contactos y embudo", "1 automatización", "Soporte continuo"],
      },
      CRMStandard: {
        name: "CRM Estándar",
        tagline: "Prediseñado. Seguimiento automático.",
        features: [
          "Embudo + reportes",
          "Seguimiento correo/SMS",
          "Hasta 3 automatizaciones",
        ],
      },
      CRMCustomized: {
        name: "CRM a Medida",
        tagline: "Creado desde cero para tu flujo.",
        features: [
          "Construcción a medida",
          "Automatizaciones ilimitadas",
          "Opción de compra total",
        ],
      },
      BrandLogo: {
        name: "Logo",
        tagline: "Diseño de logo limpio y profesional.",
        features: ["2 conceptos", "Archivos finales (PNG/SVG)"],
      },
      BrandBundle: {
        name: "Paquete de Marca",
        tagline: "Logo + tarjeta + volante + redes sociales + WhatsApp.",
        features: ["Diseño de logo", "Tarjeta de presentación", "Diseño de volante", "Facebook + Instagram creados y con tu marca", "WhatsApp Business con tu marca"],
      },
      BrandKit: {
        name: "Kit de Marca Completo",
        tagline: "Colores, fuentes, plantillas, guía.",
        features: [
          "Guía de marca completa",
          "Plantillas para redes",
          "Tarjeta + volante incluidos",
        ],
      },
      SocialMediaSetup: {
        name: "Configuración de Redes",
        tagline: "Cuentas creadas y con marca (2 plataformas).",
        features: ["Perfil + imagen de marca", "Bio, enlaces, primeras publicaciones"],
      },
      SocialMediaManagement: {
        name: "Manejo de Redes",
        tagline: "Publicamos y manejamos por ti, mensual.",
        features: ["Contenido + programación", "Hasta 12 publicaciones/mes", "Reporte mensual"],
      },
    },
  },

  industries: {
    challengeLabel: "Reto",
    solutionLabel: "Solución VYNTEX",
    items: [
      { id: "professional", name: "Servicios Profesionales", challenge: "Las consultas llegan más rápido de lo que puedes responder.", solution: "Formularios de ingreso, calificación con IA y seguimiento automático para que cada consulta reciba una respuesta a tiempo." },
      { id: "accounting", name: "Contabilidad e Impuestos", challenge: "Los picos de temporada saturan el ingreso y el agendado.", solution: "Ingreso de clientes, recordatorios de documentos, agendado de citas y actualizaciones automáticas bilingües." },
      { id: "legal", name: "Servicios Legales y de Documentos", challenge: "El ingreso manual y la solicitud de documentos frenan los casos.", solution: "Formularios de ingreso estructurados, un embudo de clientes y recordatorios automáticos de documentos." },
      { id: "healthcare", name: "Salud y Bienestar", challenge: "La recepción se llena de agendas y recordatorios.", solution: "Herramientas de citas e ingreso con enfoque en privacidad; se puede definir una arquitectura consciente de HIPAA según el proyecto." },
      { id: "homeservices", name: "Servicios para el Hogar", challenge: "Las llamadas perdidas se convierten en trabajos perdidos.", solution: "Respuesta por texto a llamadas perdidas, formularios de cotización y seguimiento automático que mantiene interesados a los clientes." },
      { id: "construction", name: "Construcción", challenge: "Las cotizaciones y los portafolios están dispersos.", solution: "Sistemas de cotización, sitios de portafolio y automatización de clientes desde el primer contacto hasta el trabajo agendado." },
      { id: "realestate", name: "Bienes Raíces", challenge: "Los clientes se enfrían sin un seguimiento rápido.", solution: "Sitios de listados, captura de clientes y seguimiento automático por correo/SMS a través de tu embudo." },
      { id: "restaurants", name: "Restaurantes", challenge: "Los clientes esperan menú, reservas y reseñas en línea.", solution: "Sitios con menú, integración de reservas, Google Maps, reseñas y manejo de redes." },
      { id: "retail", name: "Comercio y E-commerce", challenge: "Los sitios de productos y el inventario consumen tu tiempo.", solution: "Sitios listos para productos, manejo de redes y automatizaciones de pedidos y notificaciones." },
      { id: "beauty", name: "Belleza y Cuidado Personal", challenge: "Las reservas y recordatorios se hacen por teléfono todo el día.", solution: "Integración de reservas, kits de marca, SEO local y recordatorios automáticos de citas." },
      { id: "automotive", name: "Automotriz", challenge: "Las consultas de servicio y el agendado se acumulan.", solution: "Formularios de cotización y servicio, automatización de seguimiento y solicitud de reseñas tras cada visita." },
      { id: "education", name: "Educación y Capacitación", challenge: "La inscripción y el registro son manuales.", solution: "Formularios de registro, sitios de cursos y flujos automáticos de inscripción y recordatorios." },
      { id: "agencies", name: "Agencias", challenge: "Necesitas capacidad de entrega sin más personal.", solution: "Sitios web, CRM y automatización de marca blanca entregados por VYNTEX bajo tu marca." },
      { id: "multilocation", name: "Negocios de Varias Ubicaciones", challenge: "Mantener la consistencia entre ubicaciones es difícil.", solution: "Sitios centralizados, embudos de CRM compartidos y automatización estandarizada en cada ubicación." },
    ],
  },

  caseStudies: {
    comingSoon: "Se publica una vez verificado",
    note: "Estamos preparando ejemplos de proyectos verificados. No publicamos nombres de clientes, estadísticas, testimonios ni resultados que no podamos comprobar.",
    cards: {
      website: "Transformación de Sitio Web",
      lead: "Automatización de Clientes",
      crm: "Flujo de CRM",
    },
  },

  about: {
    intro:
      "VYNTEX es una agencia de tecnología digital de Northfield, Nueva Jersey que ayuda a los negocios a mejorar cómo atraen clientes, se comunican, operan y crecen.",
    specialtiesLabel: "Nos especializamos en",
    specialties: [
      "Automatización con IA",
      "Desarrollo web",
      "Sistemas CRM",
      "Chatbots con IA",
      "Imagen de marca",
      "Marketing digital",
    ],
    approach:
      "Nuestro enfoque es la automatización práctica que resuelve problemas reales del negocio — no tecnología por moda. Mantenemos la comunicación clara, los precios transparentes y cada solución lista para escalar.",
    valuesLabel: "Lo que nos define",
    values: [
      {
        id: "innovation",
        title: "Innovación Práctica",
        description:
          "Aplicamos IA y automatización donde ahorran tiempo real y ganan negocio real — no por novedad.",
      },
      {
        id: "partnership",
        title: "Alianza Clara",
        description:
          "Comunicación directa, precios transparentes y servicio en inglés y español.",
      },
      {
        id: "growth",
        title: "Hecho para Crecer",
        description:
          "Tecnología escalable que crece contigo, entregada para negocios en todo Estados Unidos.",
      },
    ],
    locationTitle: "Northfield, NJ",
    locationSubtitle: "Atendiendo negocios en todo Estados Unidos",
  },

  partners: {
    intro:
      "El Programa de Revendedor Autorizado de VYNTEX permite que los socios aprobados ofrezcan sitios web, herramientas de IA, sistemas CRM, imagen de marca y servicios digitales relacionados bajo su propia relación con el cliente, mientras VYNTEX se encarga de la entrega técnica.",
    factsLabel: "Resumen del programa",
    facts: [
      "$199 de activación anual",
      "Mínimo cuatro reventas por periodo de 12 meses",
      "Acceso al precio mayorista confidencial tras la aprobación",
      "Tú fijas el precio al cliente, según los términos del acuerdo",
      "Te quedas con la diferencia entre tu costo autorizado y el precio al cliente",
      "Entrega técnica a cargo de VYNTEX",
      "Se requiere acuerdo de revendedor",
    ],
    ctaLearn: "Conocer el Programa",
    ctaApply: "Solicitar Ser Revendedor",
    lockedTitle: "Solo socios autorizados",
    lockedSubtitle:
      "El precio mayorista y la librería de socios se desbloquean tras la aprobación y activación.",
  },

  faq: {
    items: [
      {
        q: "¿Qué hace VYNTEX?",
        a: "Creamos automatizaciones con IA, sitios web, sistemas CRM, chatbots con IA, imagen de marca y marketing digital para negocios. En pocas palabras: te ayudamos a atraer clientes, responder más rápido y reducir el trabajo manual.",
      },
      {
        q: "¿A qué tipo de negocios atienden?",
        a: "Negocios de todo tamaño en todo Estados Unidos — servicios profesionales y de impuestos, legales, salud, servicios para el hogar, construcción, bienes raíces, restaurantes, comercio, belleza, automotriz, educación, agencias y negocios de varias ubicaciones.",
      },
      {
        q: "¿Qué es la automatización con IA?",
        a: "La automatización usa software para encargarse de pasos repetitivos por ti — calificar un cliente, enviar un seguimiento, agendar una cita o notificar a tu equipo — para que eso ocurra de forma consistente sin esfuerzo manual.",
      },
      {
        q: "¿VYNTEX puede conectarse con mis herramientas actuales?",
        a: "En la mayoría de los casos, sí. Lo que se puede conectar depende de tus sistemas y del alcance de tu proyecto. Lo confirmamos durante los pasos de Descubrir y Diseñar.",
      },
      {
        q: "¿Cuánto cuesta un proyecto?",
        a: "No publicamos precios, porque el paquete adecuado depende de tu negocio. Agenda una consulta gratis de 30 minutos: te recomendamos el paquete que mejor te conviene y te explicamos su precio. ¿Necesitas algo a la medida? Empezamos con un Plan de IA (AI Blueprint) que define exactamente qué construir. Las tarifas de plataformas de terceros (hosting, dominios, software, mensajería, publicidad) se facturan por separado.",
      },
      {
        q: "¿Hay una cuota mensual?",
        a: "Los sistemas que siguen funcionando para ti — como un CRM, herramientas de IA o gestión continua — incluyen un plan mensual además de la configuración. Tu propuesta por escrito muestra cada monto único y mensual antes de que decidas.",
      },
      {
        q: "¿Qué incluye el periodo de soporte de 30 días?",
        a: "Cada entrega incluye 30 días de soporte para preguntas, pequeños arreglos y ajustes después del lanzamiento. Los cambios después de ese periodo se cobran por hora.",
      },
      {
        q: "¿El hosting y las licencias de software están incluidos?",
        a: "No. Nuestros precios cubren solo nuestra mano de obra. El hosting, dominios, licencias de software o CRM, envío de correos/SMS, pauta publicitaria y plugins premium los cobra el proveedor por separado.",
      },
      {
        q: "¿Ofrecen servicio en inglés y español?",
        a: "Sí. Trabajamos con clientes en inglés y español, incluyendo la comunicación del proyecto y el contenido de cara al cliente.",
      },
      {
        q: "¿Cuánto tarda un proyecto?",
        a: "Los tiempos dependen del alcance. Un sitio o herramienta simple avanza rápido; el trabajo de CRM o automatización a medida toma más tiempo. Te damos un cronograma en el paso de Diseñar antes de comenzar a construir.",
      },
      {
        q: "¿Garantizan clientes, ventas o posiciones en buscadores?",
        a: "No. Construimos sistemas y sitios web efectivos y bien estructurados, pero no garantizamos clientes, ventas ni posiciones específicas en buscadores — desconfía de quien lo haga.",
      },
      {
        q: "¿Qué es el programa de revendedor?",
        a: "Los socios aprobados revenden los servicios de VYNTEX a sus propios clientes a su propio precio mientras nosotros nos encargamos de la entrega. Tiene una activación anual de $199 y un mínimo de cuatro reventas por año. El precio mayorista se desbloquea tras la aprobación.",
      },
      {
        q: "¿Puedo pedir un sistema a medida?",
        a: "Sí. Los sitios web, sistemas de IA y CRM a medida se definen y cotizan por proyecto. Cuéntanos qué necesitas y lo planeamos contigo.",
      },
      {
        q: "¿Cómo empiezo?",
        a: "Contáctanos o agenda una consulta. Hablamos de tus objetivos y luego pasamos a Descubrir y Diseñar. Escríbenos a info@vyntexusa.com o llama o escribe al 609-780-3218.",
      },
    ],
  },

  contact: {
    infoTitle: "Habla con una persona real",
    infoSubtitle:
      "Contáctanos directamente o usa el formulario para contarnos sobre tu proyecto. Respondemos en un día hábil.",
    labels: {
      email: "Correo",
      phone: "Teléfono / WhatsApp",
      location: "Ubicación",
      area: "Área de servicio",
      languages: "Idiomas",
    },
    areaValue: "Todo el país — Estados Unidos",
    languagesValue: "Inglés y Español",
    form: {
      title: "Solicita una consulta",
      name: "Nombre completo",
      business: "Nombre del negocio",
      email: "Correo",
      phone: "Teléfono",
      service: "Servicio de interés",
      serviceOptions: [
        "Sitio web",
        "Automatización con IA",
        "CRM",
        "Chatbot con IA",
        "Imagen de marca",
        "Redes sociales",
        "Programa de revendedor",
        "Otro",
      ],
      message: "Cuéntanos sobre tu proyecto",
      orReach: "¿Prefieres contactarnos directamente?",
      preferredContactLabel: "Método de contacto preferido",
      preferredContact: {
        email: "Correo",
        phone: "Teléfono",
        text: "Texto",
        whatsapp: "WhatsApp",
      },
      consent:
        "Acepto que VYNTEX me contacte sobre mi solicitud. Puedo cancelar en cualquier momento.",
      submit: "Enviar mensaje",
      sendAnother: "Enviar otro mensaje",
    },
  },

  finalCta: {
    title: "¿Listo para construir un negocio más inteligente?",
    subtitle:
      "Cuéntanos dónde tu negocio pierde tiempo, clientes u oportunidades. VYNTEX te ayudará a identificar una solución digital práctica.",
  },

  forms: {
    send: "Enviar",
    sending: "Enviando...",
    cancel: "Cancelar",
    optional: "opcional",
    close: "Cerrar",
    errors: {
      required: "Este campo es obligatorio.",
      invalidEmail: "Ingresa un correo electrónico válido.",
      invalidPhone: "Ingresa un número de teléfono válido.",
      minMessage: "Usa al menos {min} caracteres.",
      consent: "Por favor, otorga tu consentimiento para continuar.",
      selectService: "Por favor, selecciona un servicio.",
      selectAtLeastOne: "Por favor, selecciona al menos una opción.",
      tooManyLinks: "Tu mensaje contiene demasiados enlaces.",
      rateLimited: "Demasiadas solicitudes. Inténtalo de nuevo más tarde.",
      spam: "No se pudo procesar tu envío. Inténtalo de nuevo.",
      network: "Error de red. Revisa tu conexión e inténtalo de nuevo.",
      server: "Ocurrió un problema de nuestro lado. Inténtalo de nuevo.",
      session: "Tu sesión ha expirado. Inicia sesión de nuevo.",
      emailFailed: "Guardamos tu solicitud pero no pudimos enviar el correo de confirmación.",
      invalidDate: "Elige una fecha de hoy en adelante.",
    },
    success: {
      title: "Mensaje enviado",
      body: "Gracias. Recibimos tu solicitud y responderemos en un día hábil.",
    },
    partial: {
      title: "Solicitud recibida",
      body: "Guardamos tu solicitud. El correo de confirmación puede tardar, pero nuestro equipo ya la tiene.",
    },
  },

  consult: {
    openLabel: "Agenda tu Consulta Gratis",
    title: "Consulta gratis de 30 minutos",
    subtitle:
      "En 30 minutos hablamos de tu negocio, te recomendamos el paquete adecuado y te explicamos su precio. Respondemos en un día hábil, en inglés o español. Sin presión de ventas.",
    fields: {
      name: "Nombre completo",
      business: "Nombre del negocio",
      email: "Correo",
      phone: "Teléfono",
      services: "Servicios que necesitas",
      budget: "Presupuesto",
      timeline: "Tiempo estimado",
      preferredContact: "Método de contacto preferido",
      referral: "¿Cómo nos conociste?",
      message: "Cuéntanos sobre tu proyecto",
      consent:
        "Acepto que VYNTEX me contacte sobre mi solicitud. Puedo cancelar en cualquier momento.",
    },
    selectPlaceholder: "Selecciona una opción",
    referralPlaceholder: "Referido, búsqueda, redes, etc. (opcional)",
    serviceOptions: [
      "Sitio web",
      "Automatización con IA",
      "Chatbot con IA",
      "CRM",
      "Imagen de marca",
      "Marketing digital",
      "Redes sociales",
      "Programa de revendedor",
      "Otro",
    ],
    budgetOptions: [
      "Menos de $500",
      "$500–$1,500",
      "$1,500–$5,000",
      "$5,000–$10,000",
      "$10,000+",
      "Aún no estoy seguro",
    ],
    timelineOptions: [
      "Lo antes posible",
      "En 2–4 semanas",
      "En 1–3 meses",
      "Planeando a futuro",
    ],
    preferredContactOptions: ["Correo", "Teléfono", "Texto", "WhatsApp", "Videollamada"],
    submit: "Solicitar consulta",
  },

  demo: {
    title: "Agenda un demo gratis",
    subtitle:
      "Conoce VYNTEX ERP con una persona de nuestro equipo, configurado para tu industria. Cuéntanos un poco de tu negocio y cuándo te queda bien. Te respondemos en un día hábil para confirmar la hora, en inglés o español.",
    fields: {
      industry: "Industria o tipo de negocio",
      teamSize: "Tamaño de tu equipo",
      preferredDate: "Fecha preferida",
      preferredTime: "Hora preferida (hora del Este)",
      message: "¿Hay algo que quieras ver en el demo? (opcional)",
    },
    industryPlaceholder: "Por ejemplo: construcción, limpieza, jardinería",
    teamSizeOptions: ["Solo yo", "De 2 a 5 personas", "De 6 a 15 personas", "De 16 a 50 personas", "Más de 50 personas"],
    preferredTimeOptions: [
      "Mañana (9 AM a 12 PM)",
      "Mediodía (12 PM a 3 PM)",
      "Tarde (3 PM a 5:30 PM)",
      "Cualquier hora",
    ],
    submit: "Solicitar mi demo",
    success: {
      title: "Recibimos tu solicitud de demo",
      body: "Gracias. Ya tenemos tu solicitud y te respondemos en un día hábil para confirmar la fecha y la hora de tu demo.",
    },
    otherHelp: "¿Necesitas un sitio web, un CRM o un proyecto de automatización?",
    switchToConsultation: "Agenda tu consulta gratis",
  },

  auth: {
    login: {
      title: "Acceso de clientes",
      subtitle:
        "Ingresa tu correo y te enviaremos un código de verificación de un solo uso. Sin contraseña.",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@negocio.com",
      submit: "Enviar código de verificación",
    },
    verify: {
      title: "Ingresa tu código",
      subtitle: "Enviamos un código de verificación a {email}. Vence pronto.",
      codeLabel: "Código de verificación",
      codePlaceholder: "12345678",
      submit: "Verificar y continuar",
      resend: "Reenviar código",
      resendIn: "Reenviar código en {seconds}s",
      changeEmail: "Usar otro correo",
    },
    errors: {
      invalidEmail: "Ingresa un correo electrónico válido.",
      invalidCode: "Ese código no es válido. Revísalo e inténtalo de nuevo.",
      expiredCode: "Ese código expiró. Solicita uno nuevo.",
      otpFailed: "No pudimos enviar un código. Inténtalo de nuevo.",
      tooManyRequests: "Demasiados intentos. Espera e inténtalo de nuevo.",
      missingEmail: "Por favor, comienza desde la página de acceso.",
      generic: "Algo salió mal. Inténtalo de nuevo.",
    },
    notices: {
      codeSent: "Código de verificación enviado. Revisa tu correo.",
      codeResent: "Un nuevo código está en camino.",
    },
  },

  portal: {
    welcome: "Bienvenido de nuevo",
    signedInAs: "Sesión iniciada como",
    manageAccount: "Administra tu cuenta y solicitudes a continuación.",
    sections: {
      profile: "Perfil de la cuenta",
      projects: "Estado del proyecto",
      orders: "Pedidos",
      agreements: "Acuerdos",
      files: "Archivos",
      support: "Solicitudes de soporte",
    },
    empty: {
      projects: "Aún no hay proyectos activos.",
      orders: "No hay pedidos disponibles.",
      agreements: "No hay acuerdos disponibles.",
      files: "No hay archivos disponibles.",
      support: "Aún no tienes solicitudes de soporte.",
    },
    profile: {
      title: "Perfil de la cuenta",
      fullName: "Nombre completo",
      businessName: "Nombre del negocio",
      phone: "Teléfono",
      language: "Idioma preferido",
      langEn: "Inglés",
      langEs: "Español",
      save: "Guardar perfil",
      saving: "Guardando...",
      saved: "Perfil guardado.",
      error: "No se pudo guardar tu perfil. Inténtalo de nuevo.",
    },
    support: {
      title: "Solicitudes de soporte",
      subjectLabel: "Asunto",
      subjectPlaceholder: "Resumen breve",
      messageLabel: "Mensaje",
      messagePlaceholder: "Describe en qué necesitas ayuda",
      create: "Enviar solicitud",
      creating: "Enviando...",
      created: "Solicitud de soporte enviada.",
      error: "No se pudo enviar tu solicitud. Inténtalo de nuevo.",
      listTitle: "Tus solicitudes",
      createdAt: "Enviada",
    },
    status: {
      open: "Abierta",
      in_progress: "En progreso",
      resolved: "Resuelta",
      closed: "Cerrada",
    },
    logout: "Cerrar sesión",
    loggingOut: "Cerrando sesión...",
  },


  footer: {
    tagline: "Sistemas empresariales conectados, implementación de CRM, automatización, sitios web y soluciones digitales.",
    servicesHeading: "Servicios",
    companyHeading: "Empresa",
    contactHeading: "Contacto",
    services: {
      websites: "Sitios Web",
      ai: "Herramientas IA y Automatización",
      crm: "CRM y Embudos",
      branding: "Imagen de Marca",
      social: "Redes Sociales",
      marketing: "Marketing Digital",
    },
    company: {
      about: "Nosotros",
      howItWorks: "Cómo Funciona",
      industries: "Industrias",
      partners: "Socios",
      faq: "Preguntas Frecuentes",
      contact: "Contacto",
    },
    hoursNote: "Servicio bilingüe — Inglés y Español",
    laborNote:
      "Los precios cubren solo nuestra mano de obra. Las cuotas de plataformas de terceros (hosting, dominios, licencias de CRM, SMS) las cobra el proveedor por separado.",
    rights: "Todos los derechos reservados.",
    legal: {
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      cookies: "Política de Cookies",
      accessibility: "Accesibilidad",
    },
  },

  reseller: {
    apply: {
      title: "Solicita el Programa de Revendedor Autorizado",
      subtitle:
        "Los socios aprobados ofrecen los servicios de VYNTEX bajo su propia relación con el cliente mientras VYNTEX se encarga de la entrega técnica. Enviar una solicitud no otorga acceso ni precios.",
      programHeading: "Términos del programa",
      programTerms: [
        "Cuota de activación anual de {fee}",
        "Mínimo de {min} reventas por periodo de 12 meses",
        "Tú fijas el precio a tu cliente, sujeto al acuerdo",
        "No puedes anunciar ni vender por debajo del precio de venta al público de VYNTEX",
        "Tú facturas y cobras a tus propios clientes; VYNTEX cobra el monto del socio",
        "Los costos de terceros (hosting, dominios, software, SMS, pauta publicitaria) son aparte",
        "El precio mayorista es confidencial y no debe compartirse ni publicarse",
        "El acuerdo dura 12 meses y se renueva con cada activación anual",
      ],
      stepsHeading: "Qué pasa después de solicitar",
      steps: [
        "Revisamos tu solicitud manualmente y respondemos en un día hábil.",
        "Si eres aprobado, recibes un número de socio.",
        "Firmas el Acuerdo de Revendedor Autorizado en tu portal.",
        "Pagas la activación anual.",
        "El precio mayorista confidencial se desbloquea solo después de todo lo anterior.",
      ],
      fields: {
        fullName: "Nombre completo",
        businessName: "Nombre del negocio",
        email: "Correo electrónico",
        phone: "Teléfono",
        website: "Sitio web",
        city: "Ciudad",
        state: "Estado",
        clientCount: "Número de clientes actuales",
        servicesInterest: "Servicios que quieres revender",
        resellModel: "¿Cómo planeas revender?",
        message: "Cuéntanos sobre tu negocio y tus clientes",
        agreementAck:
          "Entiendo que se requiere aprobación, que debo firmar el Acuerdo de Revendedor Autorizado y que el precio mayorista es confidencial.",
        privacyConsent:
          "Acepto ser contactado por VYNTEX sobre esta solicitud y acepto la Política de Privacidad.",
      },
      selectPlaceholder: "Selecciona una opción",
      clientCountOptions: {
        "0": "Aún sin clientes",
        "1_10": "1–10 clientes",
        "11_50": "11–50 clientes",
        "51_200": "51–200 clientes",
        "200_plus": "200+ clientes",
      },
      serviceOptions: {
        websites: "Sitios web",
        ai_automation: "Automatización con IA",
        crm: "CRM",
        branding: "Imagen de marca",
        social_media: "Redes sociales",
        digital_marketing: "Marketing digital",
      },
      modelOptions: {
        add_on_service: "Complemento a un negocio de servicios existente",
        agency: "Agencia o firma de marketing",
        referral: "Referir y transferir",
        white_label: "Revender bajo mi propia marca",
        other: "Otro",
      },
      submit: "Enviar solicitud",
      submitting: "Enviando...",
      successTitle: "Solicitud recibida",
      successBody:
        "Gracias. Revisaremos tu solicitud y responderemos en un día hábil. Se requiere aprobación antes de compartir cualquier precio mayorista.",
      partialBody:
        "Guardamos tu solicitud. El correo de confirmación puede demorarse, pero nuestro equipo ya la tiene.",
      disclaimer:
        "Enviar esta solicitud no crea una sociedad, no otorga acceso al precio mayorista ni te da derecho a ningún descuento. La aprobación queda a discreción de VYNTEX.",
    },
  },

  partner: {
    title: "Portal de socio",
    subtitle: "Tu estatus de Revendedor Autorizado, acuerdo, pedidos y librería.",
    backToPortal: "Volver al portal de clientes",
    fields: {
      partnerNumber: "Número de socio",
      status: "Estatus",
      activationDate: "Fecha de activación",
      expirationDate: "Fecha de vencimiento",
      salesCount: "Ventas que califican en este periodo",
      minimumRequired: "Mínimo requerido",
      agreementStatus: "Acuerdo",
      renewalStatus: "Renovación",
    },
    statusLabels: {
      none: "No es socio",
      pending: "En revisión",
      approved: "Aprobado",
      active: "Activo",
      suspended: "Suspendido",
      expired: "Vencido",
      terminated: "Terminado",
    },
    agreementSigned: "Firmado",
    agreementUnsigned: "Sin firmar",
    notApplicable: "—",
    states: {
      none: {
        title: "No estás inscrito en el programa de socios",
        body: "Solicita el Programa de Revendedor Autorizado para comenzar. Se requiere aprobación.",
        cta: "Solicitar ahora",
      },
      pending: {
        title: "Tu solicitud está en revisión",
        body: "Recibimos tu solicitud y la estamos revisando. Respondemos en un día hábil. El precio mayorista no está disponible hasta que seas aprobado, firmes el acuerdo y se confirme tu pago de activación.",
      },
      approvedUnsigned: {
        title: "Firma tu acuerdo de revendedor",
        body: "Has sido aprobado. El siguiente paso es leer y firmar el Acuerdo de Revendedor Autorizado.",
        cta: "Revisar y firmar acuerdo",
      },
      signedUnpaid: {
        title: "Paga tu activación anual",
        body: "Tu acuerdo está firmado. Paga la cuota de activación anual de {fee} para activar tu acceso de socio por 12 meses.",
        cta: "Pagar activación ({fee})",
      },
      expired: {
        title: "Tu acceso de socio ha vencido",
        body: "Renueva tu activación anual para restaurar el acceso a la librería mayorista confidencial.",
        cta: "Renovar acceso ({fee})",
      },
      suspended: {
        title: "Tu acceso de socio está suspendido",
        body: "Tu acceso al precio mayorista está retenido por ahora. Contáctanos para resolverlo.",
        cta: "Contactar soporte",
      },
      terminated: {
        title: "Tu acceso de socio ha sido terminado",
        body: "Esta cuenta de socio está cerrada. Las obligaciones de confidencialidad y no circunvención sobreviven la terminación. Contáctanos si tienes preguntas.",
        cta: "Contactar soporte",
      },
    },
    minimumWarning:
      "Tienes {count} de {min} ventas que califican en este periodo. No cumplir el mínimo puede terminar tu acceso al vencer el periodo.",
    minimumMet: "Has cumplido el mínimo de {min} ventas que califican en este periodo.",
    expiringSoon: "Tu acceso de socio vence el {date}. Renueva para mantener la librería abierta.",
    actions: {
      downloadAgreement: "Descargar acuerdo firmado",
      preparing: "Preparando...",
      viewOrders: "Ver mis pedidos de socio",
      contactSupport: "Contactar soporte",
      renew: "Renovar acceso",
      placeOrder: "Enviar un pedido de cliente",
    },
    downloadError: "No pudimos preparar tu documento. Inténtalo de nuevo o contáctanos.",
  },

  wholesale: {
    title: "Librería mayorista",
    subtitle: "Tu costo autorizado de socio, el precio sugerido de venta y tu margen estimado.",
    confidentialBanner:
      "Información confidencial para socios. No publiques ni compartas el precio mayorista.",
    columns: {
      service: "Servicio",
      partnerCost: "Costo de socio",
      suggestedRetail: "Precio sugerido",
      partnerMargin: "Margen estimado",
      maintenanceCost: "Costo de mantenimiento",
      maintenanceRetail: "Mantenimiento sugerido",
    },
    perMonth: "/mes",
    setup: "configuración",
    quoteOnly: "Se cotiza por proyecto — contacta a VYNTEX para una cotización de socio.",
    includedHeading: "Incluido en cada servicio",
    included: [
      "VYNTEX realiza la entrega técnica",
      "30 días de soporte después de la entrega",
      "Los cambios después de 30 días se cobran a {hourly}/hora (urgente {rush}/hora)",
      "Te quedas con la diferencia entre tu costo de socio y el precio a tu cliente",
    ],
    thirdPartyHeading: "No incluido",
    thirdParty:
      "Todos los precios cubren solo la mano de obra y creación de VYNTEX. No incluyen cuotas de terceros — hosting, dominios, licencias de software o CRM, envío de correos/SMS, pauta publicitaria, plugins premium, imágenes de stock, ni ningún servicio con cuota mensual propia. Debes informar esto a tus clientes.",
    noUndercutting:
      "No puedes anunciar, publicar ni vender ningún servicio de VYNTEX por debajo del precio de venta al público publicado.",
    orderHeading: "Enviar un pedido de cliente",
    orderSubtitle:
      "Haz un pedido a tu costo de socio. La venta se registra como calificada solo después de confirmarse el pago.",
    orderFields: {
      service: "Servicio",
      clientReference: "Referencia del cliente",
      clientReferenceHint:
        "Una etiqueta que solo tú necesitas para reconocer este pedido, por ejemplo \"Panadería Acme — página principal\". No ingreses los datos personales de tu cliente; VYNTEX no los necesita.",
      notes: "Notas del proyecto",
      terms:
        "Confirmo que este pedido se hace bajo mi Acuerdo de Revendedor Autorizado y que soy responsable de cobrarle a mi propio cliente.",
    },
    orderSubmit: "Continuar al pago",
    orderSubmitting: "Creando pedido...",
  },

  agreement: {
    title: "Acuerdo de Revendedor Autorizado",
    version: "Versión del acuerdo {version}",
    languageNote:
      "El texto en español es una traducción de cortesía. En caso de conflicto, prevalece la versión en inglés.",
    englishHeading: "English",
    spanishHeading: "Español (traducción de cortesía)",
    print: "Imprimir",
    download: "Descargar copia firmada",
    signHeading: "Firma electrónica",
    signSubtitle:
      "Firma abajo para aceptar este acuerdo. Tu nombre escrito, la fecha y hora, y detalles técnicos de este envío se registran como evidencia de tu firma.",
    notDocusign:
      "Esta es una firma electrónica de nombre escrito con registro de auditoría. No es un servicio de firma electrónica con certificado como DocuSign.",
    fields: {
      fullLegalName: "Nombre legal completo",
      legalBusinessName: "Nombre legal del negocio",
      signerTitle: "Cargo",
      email: "Correo electrónico",
      date: "Fecha",
      typedSignature: "Escribe tu nombre legal completo para firmar",
      agreementAccepted: "He leído y acepto el Acuerdo de Revendedor Autorizado.",
      signatureConsent:
        "Consiento firmar este acuerdo electrónicamente y entiendo que mi nombre escrito es mi firma.",
    },
    signSubmit: "Firmar acuerdo",
    signing: "Firmando...",
    signedTitle: "Acuerdo firmado",
    signedBody:
      "Tu acuerdo firmado quedó registrado y te lo enviamos por correo. El siguiente paso es tu pago de activación anual.",
    signedPartialBody:
      "Tu firma está registrada. Tu copia por correo o el PDF pueden demorarse — puedes descargarlo desde tu portal en cualquier momento.",
    alreadySigned: "Ya firmaste la versión actual de este acuerdo.",
    signedFacts: {
      signedBy: "Firmado por",
      signedAt: "Firmado el",
      version: "Versión",
      hash: "Hash del acuerdo (SHA-256)",
    },
    errors: {
      nameMismatch: "Tu firma escrita debe coincidir exactamente con tu nombre legal completo.",
      notPartner: "Solo los socios aprobados pueden firmar este acuerdo.",
      inactive: "Tu cuenta de socio no puede firmar en este momento. Contáctanos.",
    },
    disclaimer:
      "Esta es una plantilla comercial, no asesoría legal. Que la revise un abogado con licencia en su estado antes de usarla.",
  },

  checkout: {
    title: "Pago",
    subtitle: "Revisa tu pedido y continúa al pago seguro.",
    summaryHeading: "Resumen del pedido",
    detailsHeading: "Tu información",
    selectService: "Selecciona un servicio",
    noService: "Selecciona un servicio para continuar.",
    fields: {
      fullName: "Nombre completo",
      businessName: "Nombre del negocio",
      email: "Correo electrónico",
      phone: "Teléfono",
      notes: "¿Algo que debamos saber?",
      terms: "Acepto los Términos de Servicio.",
      privacy: "Acepto la Política de Privacidad.",
    },
    lines: {
      oneTime: "Pago único",
      setup: "Cuota de configuración",
      recurring: "Mensual",
      annual: "Anual",
      subtotal: "Subtotal",
      tax: "Impuesto",
      total: "Total a pagar hoy",
    },
    recurringNote:
      "La cuota mensual de {amount} se factura por separado y no se cobra hoy.",
    laborNote:
      "Los precios cubren solo la mano de obra de VYNTEX. Los costos de terceros — hosting, dominios, licencias de software o CRM, SMS y pauta publicitaria — se cobran por separado por el proveedor.",
    supportNote: "Incluye {days} días de soporte. Los cambios después se cobran por hora.",
    quoteOnly:
      "Este servicio se cotiza por proyecto y no se puede comprar en línea. Agenda una consulta y prepararemos una cotización.",
    submit: "Continuar al pago seguro",
    submitting: "Creando tu pedido...",
    redirecting: "Redirigiendo al pago seguro...",
    poweredBy: "El pago lo procesa Square. VYNTEX nunca ve ni guarda los datos de tu tarjeta.",
    errors: {
      unavailable: "El pago en línea no está disponible por ahora. Contáctanos y tomamos tu pedido directamente.",
      linkFailed: "No pudimos iniciar el pago. Inténtalo de nuevo o contáctanos.",
      notActive: "Tu cuenta de socio no está activa. Completa tu acuerdo y activación primero.",
      quoteRequired: "Este servicio se cotiza por proyecto. Agenda una consulta.",
    },
  },

  orders: {
    title: "Pedidos",
    partnerTitle: "Pedidos de socio",
    subtitle: "Todos los pedidos que has hecho y su estado de pago.",
    empty: "Aún no tienes pedidos.",
    columns: {
      date: "Fecha",
      order: "Pedido",
      reference: "Referencia",
      amount: "Monto",
      status: "Estado",
    },
    status: {
      pending: "Esperando pago",
      paid: "Pagado",
      failed: "Fallido",
      canceled: "Cancelado",
      refunded: "Reembolsado",
    },
    types: {
      direct: "Pedido de servicio",
      reseller_activation: "Activación de revendedor",
      reseller_renewal: "Renovación de revendedor",
      partner_wholesale: "Pedido de socio",
    },
    qualifying: "Cuenta para tu mínimo",
    success: {
      title: "Gracias — estamos confirmando tu pago",
      body: "Square está confirmando tu pago ahora. Esta página se actualiza en cuanto tengamos la confirmación verificada del procesador de pagos. No necesitas pagar de nuevo.",
      pending: "Confirmando pago",
      confirmed: "Pago confirmado",
      confirmedBody:
        "Tu pago está confirmado. Un recibo va en camino a tu correo.",
      refresh: "Verificar de nuevo",
      viewOrders: "Ver mis pedidos",
      partnerNext:
        "Tu acceso de socio ya está activo. La librería mayorista está abierta en tu portal de socio.",
    },
    cancel: {
      title: "Pago cancelado",
      body: "Tu pago no se completó y no se te ha cobrado. Tu pedido está guardado — puedes volver y pagar cuando estés listo.",
      retry: "Intentar de nuevo",
      contact: "Contactarnos en su lugar",
    },
  },

  legal: {
    questions: "¿Preguntas sobre esta política? Escríbenos a",
    emailAddress: "info@vyntexusa.com",
  },

  admin: {
    title: "Administrador",
    subtitle: "Solicitudes, socios, pedidos y estado del sistema.",
    tabs: {
      applications: "Solicitudes",
      partners: "Socios",
      orders: "Pedidos",
      system: "Sistema",
    },
    applications: {
      empty: "No hay solicitudes pendientes.",
      pending: "Pendiente",
      columns: {
        received: "Recibida",
        business: "Negocio",
        contact: "Contacto",
        location: "Ubicación",
        clients: "Clientes",
        model: "Modelo",
      },
      approve: "Aprobar",
      approving: "Aprobando...",
      reject: "Rechazar",
      rejecting: "Rechazando...",
      approved: "Aprobado. Número de socio: {number}",
      rejected: "Solicitud rechazada.",
      confirmReject: "¿Rechazar esta solicitud? No se puede deshacer desde el portal.",
      noAuthUser:
        "Este solicitante nunca ha iniciado sesión. Pídele que inicie sesión una vez en /login (código por correo) para que exista una cuenta a la cual vincular el registro de socio, y luego aprueba de nuevo.",
      approvalNote:
        "Aprobar crea un socio con estatus 'aprobado' y le envía su número de socio por correo. NO desbloquea el precio mayorista — todavía debe firmar el acuerdo y pagar la activación.",
    },
    partners: {
      empty: "Aún no hay socios.",
      columns: {
        number: "Número",
        business: "Negocio",
        status: "Estatus",
        expires: "Vence",
        sales: "Ventas",
      },
      suspend: "Suspender",
      reinstate: "Reactivar",
      terminate: "Terminar",
      confirmTerminate:
        "¿Terminar este socio? Su acceso se revoca de inmediato. Las obligaciones de confidencialidad continúan.",
      updated: "Socio actualizado.",
    },
    orders: {
      empty: "Aún no hay pedidos.",
      columns: {
        date: "Fecha",
        customer: "Cliente",
        item: "Artículo",
        amount: "Monto",
        status: "Estado",
      },
      paidNote:
        "Solo los pedidos confirmados por un webhook verificado de Square aparecen como pagados.",
    },
    system: {
      title: "Estado del sistema",
      squareMode: "Modo de Square",
      sandbox: "SANDBOX — solo pagos de prueba, no se mueve dinero real",
      production: "PRODUCCIÓN — se están cobrando tarjetas reales",
      emailQueue: "Cola de correo",
      emailPending: "Pendientes",
      emailAbandoned: "Abandonados (requieren atención)",
      emailSent: "Enviados",
      cronTitle: "Trabajos programados",
      cronNever: "Nunca ejecutado",
      lastRun: "Última ejecución",
      configured: "Configurado",
      missing: "No configurado",
      allGood: "Todos los servicios requeridos están configurados.",
      healthLink: "Abrir /api/health para el detalle completo",
    },
    errors: {
      failed: "Esa acción falló. Inténtalo de nuevo.",
      rateLimited: "Demasiadas acciones. Ve más despacio.",
    },
  },

  files: {
    title: "Archivos",
    subtitle: "Sube documentos para tu proyecto, o descarga lo que te hemos enviado.",
    empty: "Aún no hay archivos.",
    upload: "Subir un archivo",
    uploading: "Subiendo...",
    choose: "Elegir archivo",
    maxSize: "Hasta 4 MB. PDF, imágenes, Word, Excel, CSV o ZIP.",
    columns: {
      name: "Archivo",
      size: "Tamaño",
      uploaded: "Subido",
    },
    download: "Descargar",
    preparing: "Preparando...",
    uploaded: "Archivo subido.",
    errors: {
      tooLarge:
        "Ese archivo pesa más de 4 MB. Envíanoslo por correo o mándanos un enlace para compartir.",
      badType:
        "Ese tipo de archivo no es compatible. Usa PDF, una imagen, Word, Excel, CSV o ZIP.",
      failed: "La subida falló. Inténtalo de nuevo.",
      downloadFailed: "No pudimos preparar esa descarga. Inténtalo de nuevo.",
    },
  },

  chat: {
    open: "Hacer una pregunta",
    close: "Cerrar chat",
    title: "Asistente VYNTEX",
    subtitle: "Respuestas inmediatas sobre servicios, VYNTEX ERP y cómo empezar.",
    disclosure:
      "Las respuestas salen al instante de la información publicada de VYNTEX. Nunca adivina: para lo que no cubre, te conecta con una persona real.",
    placeholder: "Escribe tu pregunta…",
    send: "Enviar",
    newChat: "Nueva conversación",
    startPrompt: "¿Qué te gustaría saber?",
    topics: {
      pricing: "¿Cuánto cuesta?",
      services: "¿Qué hacen?",
      timeline: "¿Cuánto tarda?",
      included: "¿Qué incluye?",
      thirdParty: "¿Qué NO incluye?",
      reseller: "Programa de revendedor",
      support: "Soporte y cambios",
      languages: "¿Trabajan en español?",
      contact: "Hablar con una persona",
    },
    backToTopics: "Preguntar otra cosa",
    humanCta: "Hablar con una persona",
    bookCta: "Agenda una consulta gratis",
  },
  erp: {
    navLabel: "VYNTEX ERP",
    navShort: "VYNTEX ERP",
    navTitle: "VYNTEX ERP: prueba el demo en vivo y mira planes y precios en erp.vyntexusa.com",
    navBadge: "En vivo",
    eyebrow: "VYNTEX ERP",
    status: "Disponible en erp.vyntexusa.com",
    titleA: "Todo tu negocio,",
    titleB: "manejado desde un solo centro de mando.",
    lede:
      "Prospectos, clientes, trabajos, equipos, tareas, documentos, agenda, pagos y reportes en un solo lugar, configurado para tu industria y con automatizaciones que se encargan del trabajo repetitivo.",
    features: [
      {
        title: "Ediciones por industria",
        body: "Desde el primer día habla el idioma de tu oficio: sus términos, tipos de servicio, documentos y listas de tareas.",
      },
      {
        title: "Automatizaciones a tu medida",
        body: "Reglas que activas o apagas cuando quieras, y listas de tareas que arrancan solas cuando ganas o terminas un trabajo.",
      },
      {
        title: "Acceso según el rol",
        body: "Dueños, gerentes y personal de oficina ven solo lo que les toca, y tus equipos tienen su propio portal.",
      },
      {
        title: "En inglés y español",
        body: "Tu equipo y tus clientes trabajan en el idioma que prefieran.",
      },
    ],
    ctaDemo: "Prueba el demo en vivo",
    ctaOpen: "Abrir VYNTEX ERP",
    ctaPricing: "Ver planes y precios del software",
    ctaRequest: "Agenda un demo guiado gratis",
    demoNote: "El demo abre una empresa de ejemplo con datos inventados. Nada de lo que hagas ahí se le envía a nadie.",
    shotAlt: "Panel de VYNTEX ERP en el demo en vivo, con una empresa de construcción de ejemplo",
    shotCaption: "Pantalla real del demo en vivo. Empresa de ejemplo, datos inventados.",
    footerHeading: "VYNTEX ERP",
    footerOpen: "VYNTEX ERP",
    footerDemo: "Prueba el demo en vivo",
    footerPricing: "Planes y precios",
    footerBook: "Agenda un demo gratis",
    ctaTryDemo: "Prueba el Demo en Vivo",
    ctaSoftwarePricing: "Ver VYNTEX ERP y Precios",
    ctaBookDemo: "Agenda un Demo Gratis",
    ctaGroupLabel: "VYNTEX ERP: demo, precios y citas",
    ctaNote: "El demo en vivo abre al instante con una empresa de ejemplo. No necesitas cita ni cuenta.",
    ctaOther: "¿Buscas un sitio web, un CRM o un proyecto de automatización?",
  },

  portals: {
    signIn: "Iniciar sesión",
    myPortals: "Mis portales",
    menuHeading: "Elige tu portal",
    client: "Portal de Clientes",
    clientDesc: "Tus pedidos, archivos y soporte",
    partner: "Portal de Socios",
    partnerDesc: "Solo socios invitados",
    partnerTitle: "Portal de Socios en erp.vyntexusa.com. Solo para socios invitados, entras con tu app de autenticación.",
    footerPartner: "Portal de Socios",
    existingNote: "Solo por invitación. Usa el correo con el que te invitamos y tu app de autenticación.",
  },

  theme: {
    toLight: "Cambiar a modo día",
    toDark: "Cambiar a modo noche",
    day: "Día",
    night: "Noche",
  },
};

export const translations: Record<Lang, Dict> = { en, es };

export function getDict(lang: Lang): Dict {
  return translations[lang];
}
