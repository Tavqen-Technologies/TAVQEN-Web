import {
  CheckCircle2,
  FileText,
  Lock,
  Play,
  Shield,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

import product1 from '../assits/products/product1.webp';
import product2 from '../assits/products/product2.webp';
import product3 from '../assits/products/product3.webp';
import product4 from '../assits/products/product4.webp';
import mobileImg from '../assits/mobile.avif';
import websiteImg from '../assits/website.avif';
import saasImg from '../assits/saas product.avif';

export interface ProductDetail {
  id: string;
  name: string;
  tagline: string;
  category: 'productivity' | 'media' | 'civic';
  categoryLabel: string;
  flowTitle: string;
  flowDescription: string;
  overview: string;
  image: string;
  icon: typeof FileText;
  badgeColor: string;
  platforms: string[];
  stats: { label: string; value: string }[];
  features: { title: string; description: string }[];
  connectedWith: string[];
}

export const TAVQEN_PRODUCTS: ProductDetail[] = [
  {
    id: 'pdf',
    name: 'TAVQEN PDF',
    tagline: 'AI Document Intelligence',
    category: 'productivity',
    categoryLabel: 'Productivity & OCR',
    flowTitle: 'TAVQEN PDF → Cloud Vault',
    flowDescription: 'Documents scanned on mobile are OCR-extracted and encrypted in real-time.',
    overview:
      'A high-speed document intelligence suite engineered to make scanning, OCR text extraction, PDF editing, digital signing, and encrypted vault archiving effortless across mobile and web.',
    image: product1,
    icon: FileText,
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
    platforms: ['iOS', 'Android', 'Web App'],
    stats: [
      { label: 'Export Resolution', value: '300 DPI' },
      { label: 'OCR Scan Speed', value: '0.4s' },
      { label: 'Encryption', value: 'AES-256' },
    ],
    features: [
      {
        title: 'AI Edge-Detection Scanner',
        description: 'Automatic perspective correction, glare removal, and crisp monochrome/color enhancement.',
      },
      {
        title: 'Multi-Language Smart OCR',
        description: 'Extract editable, searchable text and tables from scanned pages in sub-second latency.',
      },
      {
        title: 'Batch Split, Merge & Compress',
        description: 'Reorganize multi-hundred-page PDFs locally with zero quality degradation.',
      },
      {
        title: 'Real-Time Cloud Vault Sync',
        description: 'Automatically backs up signed and scanned documents into your encrypted workspace.',
      },
    ],
    connectedWith: ['vault', 'sign', 'ai'],
  },
  {
    id: 'player',
    name: 'TAVQEN V Player',
    tagline: '4K Multimedia Engine',
    category: 'media',
    categoryLabel: 'Media & Streaming',
    flowTitle: 'V Player → Media Hub',
    flowDescription: 'Hardware-accelerated zero-buffering video streaming and custom audio equalizer.',
    overview:
      'A modern multimedia player engineered for buttery-smooth 4K and 8K playback across broad codecs, featuring smart subtitle sync, tactile gesture controls, and picture-in-picture mode.',
    image: product2,
    icon: Play,
    badgeColor: 'text-[#E11D48] bg-[#FFE4ED]',
    platforms: ['Android', 'iOS', 'Android TV'],
    stats: [
      { label: 'Max Resolution', value: '4K / 8K' },
      { label: 'Crash-Free Rate', value: '99.95%' },
      { label: 'Playback Modes', value: 'PiP + BG' },
    ],
    features: [
      {
        title: 'Hardware-Accelerated Decoding',
        description: 'Leverages native GPU pipelines for lag-free HEVC, AV1, MKV, and MP4 playback.',
      },
      {
        title: 'Smart Subtitle Auto-Sync',
        description: 'Instant SRT/ASS subtitle matching, styling, and millisecond offset tuning.',
      },
      {
        title: 'Intuitive Gesture Controls',
        description: 'Swipe smoothly for brightness, volume, frame scrubbing, and playback speed.',
      },
      {
        title: 'Picture-in-Picture & Audio Mode',
        description: 'Continue watching in a floating window or switch to background audio seamlessly.',
      },
    ],
    connectedWith: ['sync', 'mobile', 'analytics'],
  },
  {
    id: 'gramsetu',
    name: 'GramSetu',
    tagline: 'Civic Governance Platform',
    category: 'civic',
    categoryLabel: 'Civic & Cloud SaaS',
    flowTitle: 'GramSetu → Civic Dispatch',
    flowDescription: 'Geotagged public grievance reports are automatically routed to municipal officers.',
    overview:
      'A unified civic governance platform connecting villages, panchayats, and citizens with transparent public records, live grievance resolution, welfare schemes, and offline-first sync.',
    image: product3,
    icon: Users,
    badgeColor: 'text-[#0284C7] bg-[#F0F9FF]',
    platforms: ['Android', 'Web Portal', 'Offline Sync'],
    stats: [
      { label: 'Offline Mode', value: 'Zero Signal' },
      { label: 'API Latency', value: '62ms' },
      { label: 'Record Transparency', value: '100%' },
    ],
    features: [
      {
        title: 'Live Citizen Grievance Portal',
        description: 'Submit geotagged reports with photo evidence and track resolution milestones live.',
      },
      {
        title: 'Offline-First SQLite Sync',
        description: 'Captures entries in zero-connectivity regions and syncs automatically once online.',
      },
      {
        title: 'Voice-First Local Dialects',
        description: 'Accessible interface supporting regional languages and guided audio navigation.',
      },
      {
        title: 'Verified Panchayat Records',
        description: 'Digitized local budgets, welfare eligibility checks, and broadcast SMS alerts.',
      },
    ],
    connectedWith: ['sync', 'analytics', 'auth'],
  },
  {
    id: 'vault',
    name: 'Cloud Vault',
    tagline: 'AES-256 Encrypted Storage',
    category: 'productivity',
    categoryLabel: 'Productivity & OCR',
    flowTitle: 'Cloud Vault → Secure Sync',
    flowDescription: 'Zero-knowledge client-side encryption protecting confidential enterprise data.',
    overview:
      'Zero-knowledge enterprise file vault providing hardware-backed encryption, granular role permissions, version history, and instant cross-product document retrieval.',
    image: saasImg,
    icon: Shield,
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
    platforms: ['Web App', 'Desktop', 'API'],
    stats: [
      { label: 'Cipher Suite', value: 'AES-256' },
      { label: 'Durability', value: '99.999%' },
      { label: 'Audit Trail', value: 'Real-Time' },
    ],
    features: [
      {
        title: 'Client-Side Zero Knowledge',
        description: 'Files are encrypted before leaving the device with user-controlled key rotation.',
      },
      {
        title: 'Granular Team Permissions',
        description: 'Time-limited share links, watermarking, and view-only compliance controls.',
      },
      {
        title: 'Immutable Version Snapshots',
        description: 'Restore any prior file revision or audit access history with one click.',
      },
      {
        title: 'Native TAVQEN PDF Bridge',
        description: 'Every scanned or signed document lands directly inside organized encrypted folders.',
      },
    ],
    connectedWith: ['pdf', 'sign', 'auth'],
  },
  {
    id: 'sign',
    name: 'Smart Sign',
    tagline: 'Legally Binding e-Signatures',
    category: 'productivity',
    categoryLabel: 'Productivity & OCR',
    flowTitle: 'Smart Sign → Contract Engine',
    flowDescription: 'Cryptographically sealed signatures verified with automated audit logs.',
    overview:
      'Streamlined digital signature and contract routing engine designed for rapid approvals, multi-party signing orders, tamper-evident cryptographic seals, and automated reminders.',
    image: websiteImg,
    icon: CheckCircle2,
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
    platforms: ['Web App', 'Mobile', 'REST API'],
    stats: [
      { label: 'Turnaround Boost', value: '4.5x Faster' },
      { label: 'Tamper Seal', value: 'SHA-256' },
      { label: 'Uptime SLA', value: '99.99%' },
    ],
    features: [
      {
        title: 'Drag-and-Drop Field Builder',
        description: 'Place signature, date, initials, and conditional form fields in seconds.',
      },
      {
        title: 'Sequential & Parallel Routing',
        description: 'Configure multi-signer approval chains with automated status notifications.',
      },
      {
        title: 'Cryptographic Audit Certificate',
        description: 'Captures timestamp, IP verification, and hash integrity on every completion.',
      },
      {
        title: 'Instant Webhook Triggers',
        description: 'Automatically trigger invoices, onboarding, or CRM updates upon signing.',
      },
    ],
    connectedWith: ['pdf', 'vault', 'auth'],
  },
  {
    id: 'ai',
    name: 'AI Synthesizer',
    tagline: 'Autonomous Document Agent',
    category: 'productivity',
    categoryLabel: 'Productivity & OCR',
    flowTitle: 'AI Synthesizer → Analytics Hub',
    flowDescription: 'Extracts tabular data, summaries, and action items from complex multi-page files.',
    overview:
      'An applied AI document intelligence engine that converts unstructured contracts, invoices, and reports into structured JSON, executive summaries, and actionable insights.',
    image: product4,
    icon: Sparkles,
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
    platforms: ['Cloud API', 'Web Studio'],
    stats: [
      { label: 'Extraction Accuracy', value: '99.2%' },
      { label: 'Processing Speed', value: '< 1.2s' },
      { label: 'Output Formats', value: 'JSON / CSV' },
    ],
    features: [
      {
        title: 'Structured Schema Extraction',
        description: 'Turn invoices, receipts, and forms into clean typed JSON payloads automatically.',
      },
      {
        title: 'Multi-Document Q&A & Summaries',
        description: 'Query across hundreds of pages with grounded citations and clause highlights.',
      },
      {
        title: 'Anomaly & Clause Flagging',
        description: 'Spot missing fields, renewal traps, and mismatched totals before sign-off.',
      },
      {
        title: 'Direct Pipeline Integration',
        description: 'Feeds extracted metrics straight into Analytics Hub and FastAPI Sync.',
      },
    ],
    connectedWith: ['pdf', 'analytics', 'sync'],
  },
  {
    id: 'sync',
    name: 'FastAPI Sync',
    tagline: 'Real-Time Edge Pipelines',
    category: 'civic',
    categoryLabel: 'Civic & Cloud SaaS',
    flowTitle: 'FastAPI Sync → Distributed Redis',
    flowDescription: 'High-throughput bi-directional synchronization with sub-50ms edge delivery.',
    overview:
      'High-concurrency API and real-time synchronization backbone built on Python FastAPI, Redis streams, and edge caching to keep every TAVQEN product synchronized in milliseconds.',
    image: saasImg,
    icon: Zap,
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
    platforms: ['Docker', 'AWS', 'Cloudflare'],
    stats: [
      { label: 'Edge Latency', value: '< 50ms' },
      { label: 'Throughput', value: '25K req/s' },
      { label: 'Availability', value: '99.99%' },
    ],
    features: [
      {
        title: 'Bi-Directional Delta Sync',
        description: 'Transfers only changed record diffs to minimize mobile bandwidth usage.',
      },
      {
        title: 'Redis Event Streaming',
        description: 'Pub/sub event fan-out powering instant dashboards and live push updates.',
      },
      {
        title: 'Strict OpenAPI Contracts',
        description: 'Auto-generated Pydantic schemas and TypeScript clients with zero drift.',
      },
      {
        title: 'Zero-Downtime Rolling Deploys',
        description: 'Containerized blue-green deployments with automatic health rollbacks.',
      },
    ],
    connectedWith: ['gramsetu', 'analytics', 'auth'],
  },
  {
    id: 'mobile',
    name: 'Mobile Core',
    tagline: 'Cross-Platform Framework',
    category: 'media',
    categoryLabel: 'Media & Streaming',
    flowTitle: 'Mobile Core → App Store CI/CD',
    flowDescription: 'Unified codebase running natively on iOS and Android with 60 FPS performance.',
    overview:
      'TAVQEN’s battle-tested mobile foundation combining React Native, TypeScript, native Swift/Kotlin modules, and automated OTA release pipelines for rapid app engineering.',
    image: mobileImg,
    icon: Smartphone,
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
    platforms: ['iOS', 'Android', 'Expo EAS'],
    stats: [
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Code Sharing', value: '92%' },
      { label: 'OTA Rollouts', value: '< 5 min' },
    ],
    features: [
      {
        title: 'Native Gesture & Motion Core',
        description: 'Fluid 60fps transitions and haptics tuned for iOS and Android ergonomics.',
      },
      {
        title: 'Biometric & Passkey Ready',
        description: 'Built-in FaceID, TouchID, and Android keystore security primitives.',
      },
      {
        title: 'Offline Queue & Cache Engine',
        description: 'Graceful network recovery with background task scheduling.',
      },
      {
        title: 'Automated Store Pipelines',
        description: 'One-click TestFlight and Play Console builds with crash telemetry.',
      },
    ],
    connectedWith: ['pdf', 'player', 'auth'],
  },
  {
    id: 'analytics',
    name: 'Analytics Hub',
    tagline: 'Real-Time Telemetry',
    category: 'civic',
    categoryLabel: 'Civic & Cloud SaaS',
    flowTitle: 'Analytics Hub → Executive Dashboards',
    flowDescription: 'Aggregates usage funnels, retention cohorts, and revenue metrics across products.',
    overview:
      'Unified product telemetry and executive analytics platform tracking conversion funnels, retention cohorts, SLA uptime, and feature adoption in real time.',
    image: websiteImg,
    icon: TrendingUp,
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
    platforms: ['Web App', 'SDK', 'SQL Export'],
    stats: [
      { label: 'Query Speed', value: '< 80ms' },
      { label: 'Retention', value: 'Live Cohorts' },
      { label: 'Data Privacy', value: 'GDPR Ready' },
    ],
    features: [
      {
        title: 'Real-Time Funnel Explorer',
        description: 'Pinpoint exact drop-off steps across web onboarding and mobile flows.',
      },
      {
        title: 'Automated Cohort Retention',
        description: 'Measure D1, D7, and D30 engagement automatically across product releases.',
      },
      {
        title: 'Custom KPI Alerting',
        description: 'Instant Slack and email alerts when latency or conversion shifts.',
      },
      {
        title: 'Cross-Product Identity Stitching',
        description: 'Connects user journeys across web, mobile, and billing seamlessly.',
      },
    ],
    connectedWith: ['ai', 'sync', 'gramsetu'],
  },
  {
    id: 'auth',
    name: 'Enterprise SSO',
    tagline: 'Zero-Trust Access Control',
    category: 'productivity',
    categoryLabel: 'Productivity & OCR',
    flowTitle: 'Enterprise SSO → Centralized Gateway',
    flowDescription: 'Single sign-on authentication with multi-factor biometric verification.',
    overview:
      'Centralized identity and role-based access gateway uniting SAML 2.0, OAuth/OIDC, passkeys, and audit logging across every TAVQEN product and partner workspace.',
    image: product4,
    icon: Lock,
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
    platforms: ['SAML 2.0', 'OIDC', 'Passkeys'],
    stats: [
      { label: 'Auth Latency', value: '28ms' },
      { label: 'Protocols', value: 'SAML + OIDC' },
      { label: 'Security', value: 'Zero-Trust' },
    ],
    features: [
      {
        title: 'One-Click Enterprise SSO',
        description: 'Connect Okta, Azure AD, and Google Workspace in under five minutes.',
      },
      {
        title: 'Fine-Grained RBAC Policies',
        description: 'Control workspace, folder, and API scopes per team and environment.',
      },
      {
        title: 'Hardware Key & Biometric MFA',
        description: 'WebAuthn passkey and TOTP enforcement for sensitive admin actions.',
      },
      {
        title: 'Unified Session Management',
        description: 'Sign in once to access TAVQEN PDF, Cloud Vault, Smart Sign, and Analytics.',
      },
    ],
    connectedWith: ['vault', 'sign', 'gramsetu'],
  },
];

export function getProductById(id?: string | null): ProductDetail {
  if (!id) return TAVQEN_PRODUCTS[0];
  return TAVQEN_PRODUCTS.find((p) => p.id === id) || TAVQEN_PRODUCTS[0];
}

