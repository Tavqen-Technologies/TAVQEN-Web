import mobileImg from '../assits/mobile.avif';
import websiteImg from '../assits/website.avif';
import saasImg from '../assits/saas product.avif';
import customImg from '../assits/Custom.avif';
import product1Img from '../assits/products/product1.jpg';
import product2Img from '../assits/products/product2.jpg';
import product3Img from '../assits/products/product3.jpg';
import product4Img from '../assits/products/product4.jpg';

export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  phase: string;
  title: string;
  summary: string;
}

export interface ServiceMetric {
  label: string;
  value: string;
}

export interface ServiceDetail {
  id: string;
  number: string;
  badge: string;
  title: string;
  tagline: string;
  overview: string;
  challenge: string;
  solution: string;
  timeline: string;
  engagementModel: string;
  image: string;
  accentColor: string;
  deliverables: ServiceDeliverable[];
  process: ServiceProcessStep[];
  techStack: string[];
  metrics: ServiceMetric[];
  relatedIds: string[];
}

export const TAVQEN_SERVICES: ServiceDetail[] = [
  {
    id: 'mobile',
    number: '01',
    badge: 'iOS & Android Engineering',
    title: 'Mobile App Engineering',
    tagline: '60 FPS native-grade mobile applications engineered for consumer scale and enterprise reliability.',
    overview:
      'We design and ship high-performance iOS and Android applications using React Native, Expo, Swift, and Kotlin—complete with offline-first sync, biometric security, push pipelines, and App Store release automation.',
    challenge:
      'Mobile apps often fail due to janky scrolling, battery drain, unreliable offline states, and fragmented iOS/Android codebases that double maintenance cost.',
    solution:
      'We architect shared TypeScript cores with native bridge optimizations, SQLite local persistence, smooth Reanimated gesture pipelines, and automated EAS/Fastlane CI/CD.',
    timeline: '6–12 Weeks to v1 Launch',
    engagementModel: 'Dedicated Pod or Milestone Delivery',
    image: mobileImg,
    accentColor: '#0088CC',
    deliverables: [
      {
        title: 'Cross-Platform Native Architecture',
        description: 'Unified React Native & Expo codebase with native iOS/Android modules where hardware performance demands it.',
      },
      {
        title: 'Offline-First Data & Sync Engine',
        description: 'Encrypted local storage, optimistic UI mutations, and conflict-safe background synchronization on flaky networks.',
      },
      {
        title: 'Auth, Biometrics & Payments',
        description: 'Face ID / Touch ID authentication, secure keychain storage, UPI/Stripe/Apple Pay & Google Pay checkout flows.',
      },
      {
        title: 'App Store & Play Store CI/CD',
        description: 'Automated TestFlight & Play Console release tracks, OTA hotfixes, crash telemetry, and store compliance.',
      },
    ],
    process: [
      { phase: '01', title: 'Product & UX Flow Mapping', summary: 'Interactive Figma wireframes, edge-case offline states, and device compatibility targets.' },
      { phase: '02', title: 'Core App & API Integration', summary: 'Component architecture, auth/payments, real-time sockets, and native hardware bridges.' },
      { phase: '03', title: '60 FPS Profiling & QA', summary: 'Memory profiling, low-bandwidth stress testing, and automated E2E device matrix runs.' },
      { phase: '04', title: 'Store Submission & Telemetry', summary: 'Production review submission, Sentry/Crashlytics observability, and post-launch iteration.' },
    ],
    techStack: ['React Native', 'Expo', 'TypeScript', 'Swift', 'Kotlin', 'SQLite / WatermelonDB', 'Firebase / APNs', 'Fastlane'],
    metrics: [
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Crash-Free Sessions', value: '99.8%' },
      { label: 'Code Reuse', value: '92%+' },
    ],
    relatedIds: ['web', 'design', 'saas'],
  },
  {
    id: 'web',
    number: '02',
    badge: 'Web Platforms & Frontends',
    title: 'Web Application Development',
    tagline: 'Blazing-fast Next.js, React, and full-stack web platforms built for conversion, SEO, and scale.',
    overview:
      'From high-converting customer portals and editorial storefronts to complex real-time enterprise dashboards, we build accessible, type-safe web platforms engineered around Core Web Vitals.',
    challenge:
      'Bloated client bundles, slow TTFB, broken responsive layouts, and brittle state management quietly erode user trust and search visibility.',
    solution:
      'We pair React 18 and Next.js server rendering with edge caching, strict TypeScript API contracts, modular Tailwind design systems, and automated visual/performance checks.',
    timeline: '4–10 Weeks',
    engagementModel: 'Fixed-Scope Build or Sprint Retainer',
    image: websiteImg,
    accentColor: '#00C4FF',
    deliverables: [
      {
        title: 'SSR, Edge & Static Optimization',
        description: 'Sub-second Largest Contentful Paint using React Server Components, ISR, and global CDN edge caching.',
      },
      {
        title: 'Interactive Dashboards & Workflows',
        description: 'Complex tables, charts, drag-and-drop builders, and optimistic state backed by TanStack Query.',
      },
      {
        title: 'Full-Stack API & Auth Layer',
        description: 'Type-safe REST/GraphQL/tRPC endpoints, RBAC sessions, rate limiting, and webhook pipelines.',
      },
      {
        title: 'SEO, Accessibility & Analytics',
        description: 'WCAG AA contrast/keyboard support, structured JSON-LD metadata, and privacy-first event tracking.',
      },
    ],
    process: [
      { phase: '01', title: 'Information Architecture', summary: 'Sitemap, performance budgets, API schema design, and design token foundations.' },
      { phase: '02', title: 'Component & Backend Build', summary: 'Reusable UI primitives, SSR pages, database models, and third-party integrations.' },
      { phase: '03', title: 'Core Web Vitals Audit', summary: 'Lighthouse tuning, bundle splitting, cross-browser QA, and security header checks.' },
      { phase: '04', title: 'Zero-Downtime Rollout', summary: 'Staged DNS cutover, edge deployment, and live uptime & error alerting.' },
    ],
    techStack: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Redis', 'Cloudflare'],
    metrics: [
      { label: 'Lighthouse Score', value: '98+' },
      { label: 'Edge TTFB', value: '< 80ms' },
      { label: 'Uptime SLA', value: '99.95%' },
    ],
    relatedIds: ['saas', 'design', 'growth'],
  },
  {
    id: 'saas',
    number: '03',
    badge: 'Multitenant Cloud Products',
    title: 'SaaS Product Development',
    tagline: 'End-to-end multitenant SaaS platforms with billing, RBAC, audit logs, and API extensibility.',
    overview:
      'Whether launching a category-defining B2B SaaS MVP or re-architecting a legacy monolith for enterprise customers, we engineer multi-tenant platforms ready for SOC2-grade security and recurring revenue.',
    challenge:
      'Early SaaS products often hardcode tenant boundaries or bolt on subscriptions late—causing painful migrations when enterprise buyers ask for SSO, custom roles, and audit trails.',
    solution:
      'We ship clean tenant isolation, Stripe/Razorpay metered billing, SAML/OIDC SSO, granular RBAC permissions, and background job queues from day one.',
    timeline: '8–14 Weeks',
    engagementModel: 'Dedicated Product Engineering Squad',
    image: saasImg,
    accentColor: '#0284C7',
    deliverables: [
      {
        title: 'Tenant Isolation & RBAC Engine',
        description: 'Organization workspaces, invite flows, granular role policies, and immutable audit trails.',
      },
      {
        title: 'Subscription & Metered Billing',
        description: 'Automated plan upgrades, seat-based proration, usage metering, invoicing, and webhook idempotency.',
      },
      {
        title: 'Async Workers & Event Pipelines',
        description: 'Queue-backed exports, email/Slack notifications, scheduled reports, and retry-safe webhooks.',
      },
      {
        title: 'Enterprise Readiness & Observability',
        description: 'SSO/SCIM foundations, tenant rate-limiting, structured logging, and SLA dashboards.',
      },
    ],
    process: [
      { phase: '01', title: 'Domain & Tenant Modeling', summary: 'Database isolation schema, permission matrix, and pricing-tier entitlement rules.' },
      { phase: '02', title: 'Core Platform Sprint', summary: 'Onboarding, billing engine, workspace settings, and core product workflows.' },
      { phase: '03', title: 'Security & Load Testing', summary: 'Tenant boundary penetration checks, query indexing, and concurrency stress tests.' },
      { phase: '04', title: 'GA Launch & Scaling', summary: 'Customer onboarding telemetry, feature flags, and roadmap velocity handover.' },
    ],
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma / Drizzle', 'Stripe', 'Redis / BullMQ', 'AWS', 'Docker'],
    metrics: [
      { label: 'Products Shipped', value: '40+' },
      { label: 'Production Uptime', value: '99.9%' },
      { label: 'Tenant Isolation', value: '100% RLS' },
    ],
    relatedIds: ['web', 'cloud', 'ai'],
  },
  {
    id: 'custom',
    number: '04',
    badge: 'Enterprise & CRM Systems',
    title: 'Custom Software & CRM Systems',
    tagline: 'Bespoke ERP, CRM, and internal operational systems tailored cleanly around your real workflows.',
    overview:
      'Off-the-shelf software forces teams into endless workarounds and per-seat tax. We build custom CRMs, operations consoles, field-service platforms, and legacy modernizations that match your exact business rules.',
    challenge:
      'Teams lose hours every week copying data across disconnected spreadsheets, brittle ERPs, and siloed vendor tools.',
    solution:
      'We unify CRM pipelines, approvals, inventory, invoicing, and third-party ERP connectors into one clean internal operating system with full data ownership.',
    timeline: '8–16 Weeks',
    engagementModel: 'Custom Architecture & Long-Term Partner',
    image: customImg,
    accentColor: '#0EA5E9',
    deliverables: [
      {
        title: 'Custom CRM & Pipeline Engines',
        description: 'Lead routing, SLA timers, automated follow-ups, WhatsApp/Email sync, and deal analytics.',
      },
      {
        title: 'Legacy Data & ERP Integration',
        description: 'Clean ETL migrations and two-way connectors for SAP, Tally, Zoho, Salesforce, and banking APIs.',
      },
      {
        title: 'Approval & Role Workflows',
        description: 'Multi-level sign-offs, document generation, compliance checks, and branch-level permissions.',
      },
      {
        title: 'Executive Reporting & Exports',
        description: 'Real-time operational KPIs, scheduled PDF/CSV digests, and anomaly alerts.',
      },
    ],
    process: [
      { phase: '01', title: 'Operations Shadowing', summary: 'Audit bottlenecks, shadow teams, and map every manual spreadsheet into data models.' },
      { phase: '02', title: 'Modular Core & Connectors', summary: 'Build role consoles, workflow state machines, and external ERP/payment bridges.' },
      { phase: '03', title: 'Parallel Migration & UAT', summary: 'Dry-run historical data imports and train power users in a staging mirror.' },
      { phase: '04', title: 'Rollout & Continuous Evolution', summary: 'Zero-disruption cutover plus ongoing feature sprints as operations grow.' },
    ],
    techStack: ['React', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'GraphQL', 'Docker', 'AWS ECS'],
    metrics: [
      { label: 'Manual Ops Saved', value: '65%' },
      { label: 'Data Accuracy', value: '99.9%' },
      { label: 'User Adoption', value: '96%' },
    ],
    relatedIds: ['saas', 'ai', 'cloud'],
  },
  {
    id: 'design',
    number: '05',
    badge: 'Product UI/UX & Design Systems',
    title: 'Design & Interactive Systems',
    tagline: 'Precision design systems, micro-interactions, and high-clarity interfaces built for engineering parity.',
    overview:
      'Great software feels effortless on first click. Our product designers work directly alongside frontend engineers to craft Figma token libraries, interactive prototypes, and motion-refined UI.',
    challenge:
      'Disconnected agency mockups often look good in slides but break under real data, long localization strings, and responsive breakpoints.',
    solution:
      'We design component systems in Figma mapped 1:1 to Tailwind tokens and accessible React primitives—so shipped code matches design pixel for pixel.',
    timeline: '3–6 Weeks',
    engagementModel: 'Design Sprint or Embedded Product Designer',
    image: product4Img,
    accentColor: '#38BDF8',
    deliverables: [
      {
        title: 'UX Research & User Journeys',
        description: 'Friction audits, information architecture, and clickable prototypes validated before engineering.',
      },
      {
        title: 'Multi-Brand Design System',
        description: 'Color, typography, spacing, and elevation tokens synced cleanly from Figma variables to code.',
      },
      {
        title: 'Responsive Web & Mobile UI',
        description: 'Complete desktop, tablet, and mobile screens including empty, loading, and error states.',
      },
      {
        title: 'Motion & Micro-Interaction Specs',
        description: 'GSAP/Framer motion choreography that clarifies state transitions without slowing workflows.',
      },
    ],
    process: [
      { phase: '01', title: 'UX Audit & Flow Wireframes', summary: 'Strip unnecessary steps and establish clear visual hierarchy.' },
      { phase: '02', title: 'Visual Direction & Tokens', summary: 'Explore two crisp directions and lock typography, contrast, and surfaces.' },
      { phase: '03', title: 'Component Library & Flows', summary: 'Build full interactive screens across every core user journey.' },
      { phase: '04', title: 'Dev Handoff & Polish', summary: 'Pair with engineers during implementation to inspect animations and edge cases.' },
    ],
    techStack: ['Figma', 'Design Tokens', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Radix UI', 'Storybook', 'WCAG AA'],
    metrics: [
      { label: 'Task Completion', value: '+42%' },
      { label: 'UI Reuse', value: '95%' },
      { label: 'Accessibility', value: 'WCAG AA' },
    ],
    relatedIds: ['web', 'mobile', 'growth'],
  },
  {
    id: 'growth',
    number: '06',
    badge: 'Performance & Conversion Engineering',
    title: 'Growth & Conversion Engineering',
    tagline: 'Technical SEO, experimentation engines, onboarding funnels, and product telemetry that compound revenue.',
    overview:
      'Shipping features is half the equation—getting users to activate, retain, and convert is where software compounds. We blend frontend performance engineering with product analytics and A/B experimentation.',
    challenge:
      'Teams spend heavily on acquisition while slow landing pages, leaky onboarding, and blind funnels burn conversions.',
    solution:
      'We instrument full-funnel Mixpanel/PostHog telemetry, optimize landing speed, streamline signup activation, and deploy programmatic SEO pages.',
    timeline: '4–8 Weeks',
    engagementModel: 'Growth Sprint or Monthly Optimization',
    image: product2Img,
    accentColor: '#0088CC',
    deliverables: [
      {
        title: 'Conversion-Focused Landing Architecture',
        description: 'High-clarity product storytelling, interactive demos, and sub-second page loads.',
      },
      {
        title: 'Activation & Onboarding Funnels',
        description: 'Guided checklists, progressive profiling, and friction-free trial-to-paid upgrades.',
      },
      {
        title: 'Telemetry & A/B Experimentation',
        description: 'Clean event schemas, cohort retention tracking, and server-side feature flag experiments.',
      },
      {
        title: 'Programmatic SEO Foundations',
        description: 'Dynamic landing templates, sitemaps, schema markup, and automated OpenGraph previews.',
      },
    ],
    process: [
      { phase: '01', title: 'Funnel & Speed Diagnostics', summary: 'Identify exact drop-off steps and Web Vitals bottlenecks in current analytics.' },
      { phase: '02', title: 'Experiment Roadmap', summary: 'Prioritize high-leverage copy, UX, and speed hypotheses.' },
      { phase: '03', title: 'Rapid Ship & Instrument', summary: 'Deploy A/B variants behind feature flags with deterministic event tracking.' },
      { phase: '04', title: 'Compound Winners', summary: 'Promote winning variants and feed insights into the next sprint.' },
    ],
    techStack: ['Next.js', 'PostHog', 'GA4 / Tag Manager', 'Edge Middleware', 'Schema.org', 'Stripe Checkout', 'Cloudflare', 'Playwright'],
    metrics: [
      { label: 'Signup Lift', value: '+38%' },
      { label: 'Page Speed', value: '0.7s LCP' },
      { label: 'Organic Traffic', value: '3.2x' },
    ],
    relatedIds: ['web', 'design', 'saas'],
  },
  {
    id: 'ai',
    number: '07',
    badge: 'Applied AI & Document Intelligence',
    title: 'AI & Workflow Automation',
    tagline: 'Production LLM agents, RAG knowledge pipelines, and automated document workflows built with guardrails.',
    overview:
      'Move beyond fragile chatbot demos. We engineer deterministic AI workflows—document extraction, semantic search, multi-step operational agents, and evaluation pipelines integrated directly into your product.',
    challenge:
      'Unconstrained LLM wrappers hallucinate, spike token bills, and lack auditability for real business decisions.',
    solution:
      'We combine structured JSON tool-calling, hybrid vector+keyword RAG, human-in-the-loop review queues, and automated accuracy evals.',
    timeline: '5–10 Weeks',
    engagementModel: 'AI Discovery + Production Implementation',
    image: product1Img,
    accentColor: '#00C4FF',
    deliverables: [
      {
        title: 'RAG Knowledge & Semantic Search',
        description: 'Document ingestion, smart chunking, citation-backed answers, and permission-aware retrieval.',
      },
      {
        title: 'Document OCR & Data Extraction',
        description: 'Automated parsing of invoices, PDFs, contracts, and handwritten forms into structured database rows.',
      },
      {
        title: 'Autonomous Workflow Agents',
        description: 'Tool-calling pipelines that triage tickets, draft responses, and trigger CRM/ERP actions safely.',
      },
      {
        title: 'Eval Harnesses & Cost Guardrails',
        description: 'Prompt versioning, semantic caching, latency budgets, and hallucination regression suites.',
      },
    ],
    process: [
      { phase: '01', title: 'Use-Case & ROI Scoping', summary: 'Benchmark latency, accuracy requirements, and gold-standard evaluation datasets.' },
      { phase: '02', title: 'Pipeline & Retrieval Build', summary: 'Vector indexing, structured extraction schemas, and model routing.' },
      { phase: '03', title: 'Eval & Guardrail Tuning', summary: 'Run automated accuracy evals, fallback handling, and PII redaction.' },
      { phase: '04', title: 'Production Telemetry', summary: 'Monitor token cost, citation confidence, and human feedback loops.' },
    ],
    techStack: ['Python', 'FastAPI', 'TypeScript', 'OpenAI / Gemini', 'pgvector', 'Redis Cache', 'LangGraph', 'Docker'],
    metrics: [
      { label: 'Extraction Accuracy', value: '99.2%' },
      { label: 'Processing Speed', value: '8x Faster' },
      { label: 'Median Latency', value: '< 1.2s' },
    ],
    relatedIds: ['saas', 'custom', 'cloud'],
  },
  {
    id: 'cloud',
    number: '08',
    badge: 'Infrastructure, SRE & Security',
    title: 'Cloud DevOps & Infrastructure',
    tagline: 'Automated CI/CD, resilient cloud topologies, Kubernetes/ECS scaling, and 24/7 observability.',
    overview:
      'Reliable software requires rock-solid infrastructure underneath. We design reproducible cloud environments on AWS, GCP, and Cloudflare—eliminating manual server tweaks and late-night deployment scares.',
    challenge:
      'Manual console setups, missing backups, noisy alerts, and unoptimized cloud bills slow engineering teams down.',
    solution:
      'We codify your entire stack in Terraform & Docker with blue/green CI/CD pipelines, automated database failover, and crisp observability dashboards.',
    timeline: '3–6 Weeks',
    engagementModel: 'Infrastructure Overhaul or Fractional SRE',
    image: product3Img,
    accentColor: '#0284C7',
    deliverables: [
      {
        title: 'Infrastructure as Code (IaC)',
        description: 'Version-controlled Terraform modules for VPCs, managed Postgres, Redis, buckets, and secrets.',
      },
      {
        title: 'Zero-Downtime CI/CD Pipelines',
        description: 'Automated test gates, Docker image signing, preview environments, and instant rollbacks.',
      },
      {
        title: 'Observability & Incident Alerting',
        description: 'Unified logs, OpenTelemetry traces, uptime probes, and actionable Slack/PagerDuty alerts.',
      },
      {
        title: 'Cloud FinOps & Security Hardening',
        description: 'IAM least-privilege audits, WAF rules, encrypted backups, and 25–40% cloud spend optimization.',
      },
    ],
    process: [
      { phase: '01', title: 'Architecture & Cost Audit', summary: 'Map single points of failure, security gaps, and over-provisioned compute.' },
      { phase: '02', title: 'IaC & Containerization', summary: 'Codify reproducible staging and production environments with Docker & Terraform.' },
      { phase: '03', title: 'CI/CD & Failover Drills', summary: 'Automate deployments and test backup restore plus blue/green rollback paths.' },
      { phase: '04', title: 'Observability Handover', summary: 'Deliver dashboards, runbooks, and SLA alert thresholds to your team.' },
    ],
    techStack: ['AWS', 'Google Cloud', 'Docker', 'Terraform', 'GitHub Actions', 'Cloudflare', 'PostgreSQL HA', 'OpenTelemetry'],
    metrics: [
      { label: 'Deploy Frequency', value: '10x Daily' },
      { label: 'Uptime SLA', value: '99.95%' },
      { label: 'Cloud Cost Drop', value: '-32%' },
    ],
    relatedIds: ['saas', 'ai', 'web'],
  },
];

const SERVICE_ALIASES: Record<string, string> = {
  crm: 'custom',
  'crm-system': 'custom',
  'mobile-app': 'mobile',
  'web-app': 'web',
  'saas-product': 'saas',
  'custom-software': 'custom',
};

export function getServiceById(id?: string | null): ServiceDetail {
  if (!id) return TAVQEN_SERVICES[0];
  const normalized = id.trim().toLowerCase();
  const mappedId = SERVICE_ALIASES[normalized] || normalized;
  return TAVQEN_SERVICES.find((s) => s.id.toLowerCase() === mappedId) || TAVQEN_SERVICES[0];
}

