import { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Code2,
  Cpu,
  Globe,
  Laptop,
  MapPin,
  Palette,
  Send,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface CareersProps {
  isFullPage?: boolean;
  onNavigate?: (path: string) => void;
}

type RoleDepartment = 'all' | 'engineering' | 'mobile' | 'design' | 'ai';

interface JobRole {
  id: string;
  code: string;
  department: Exclude<RoleDepartment, 'all'>;
  departmentLabel: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  compensation: string;
  summary: string;
  responsibilities: string[];
  stack: string[];
  icon: typeof Code2;
}

const OPEN_ROLES: JobRole[] = [
  {
    id: 'senior-fullstack-engineer',
    code: 'ENG-01',
    department: 'engineering',
    departmentLabel: 'Engineering',
    title: 'Senior Full-Stack Engineer',
    location: 'Remote / Indore',
    type: 'Full-Time',
    experience: '3–6 Years',
    compensation: '₹12L – ₹22L / yr',
    summary:
      'Lead end-to-end architecture and shipping of high-traffic Next.js web applications, multitenant SaaS dashboards, and resilient TypeScript APIs.',
    responsibilities: [
      'Architect modular React 18 & Next.js 14 frontends with strict TypeScript safety',
      'Design scalable Node.js & PostgreSQL APIs with sub-100ms p95 response targets',
      'Own features from technical spec through CI/CD deployment and observability',
    ],
    stack: ['React 18', 'Next.js 14', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    icon: Code2,
  },
  {
    id: 'react-native-engineer',
    code: 'MOB-02',
    department: 'mobile',
    departmentLabel: 'Mobile',
    title: 'React Native Mobile Engineer',
    location: 'Remote / Hybrid',
    type: 'Full-Time',
    experience: '2–5 Years',
    compensation: '₹10L – ₹18L / yr',
    summary:
      'Build silky-smooth 60fps iOS & Android experiences powering flagship consumer apps including TAVQEN PDF and TAVQEN V Player.',
    responsibilities: [
      'Craft fluid gesture-driven mobile UIs with React Native, Expo, and Reanimated',
      'Build resilient offline-first local storage sync and native bridge integrations',
      'Maintain 99.95%+ crash-free sessions across App Store & Play Store releases',
    ],
    stack: ['React Native', 'TypeScript', 'Expo', 'iOS Swift', 'Android Kotlin', 'SQLite'],
    icon: Smartphone,
  },
  {
    id: 'backend-cloud-engineer',
    code: 'CLD-03',
    department: 'engineering',
    departmentLabel: 'Engineering',
    title: 'Backend & Cloud Systems Engineer',
    location: 'Remote',
    type: 'Full-Time',
    experience: '2–5 Years',
    compensation: '₹11L – ₹20L / yr',
    summary:
      'Engineer distributed API pipelines, high-throughput queues, zero-downtime Docker deployments, and edge infrastructure across AWS and Cloudflare.',
    responsibilities: [
      'Build async Python FastAPI & Node.js microservices built for 10x traffic bursts',
      'Optimize PostgreSQL query plans, Redis caching, and distributed event workers',
      'Automate containerized CI/CD, security hardening, and multi-region failover',
    ],
    stack: ['Python FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS / GCP'],
    icon: Cpu,
  },
  {
    id: 'product-ui-ux-designer',
    code: 'DES-04',
    department: 'design',
    departmentLabel: 'Design',
    title: 'Senior Product UI/UX Designer',
    location: 'Hybrid / Remote',
    type: 'Full-Time',
    experience: '2–4 Years',
    compensation: '₹8L – ₹15L / yr',
    summary:
      'Shape intuitive user flows, component-driven Figma design systems, and interactive micro-animations across web and mobile products.',
    responsibilities: [
      'Translate complex SaaS workflows into clean, zero-friction user interfaces',
      'Maintain scalable Figma token libraries aligned 1:1 with Tailwind & React',
      'Collaborate closely with engineers on GSAP motion choreography and polish',
    ],
    stack: ['Figma', 'Design Systems', 'Prototyping', 'UX Research', 'Motion Design'],
    icon: Palette,
  },
  {
    id: 'ai-automation-engineer',
    code: 'AI-05',
    department: 'ai',
    departmentLabel: 'Product & AI',
    title: 'AI & Automation Engineer',
    location: 'Remote',
    type: 'Full-Time',
    experience: '1–4 Years',
    compensation: '₹10L – ₹19L / yr',
    summary:
      'Design intelligent LLM agents, smart document OCR extraction pipelines, vector search workflows, and practical AI integrations inside real products.',
    responsibilities: [
      'Develop reliable OCR, structured extraction, and RAG pipelines in Python',
      'Integrate Gemini / OpenAI tool-calling workflows with strict latency budgets',
      'Evaluate model quality, cost efficiency, and guardrails in production',
    ],
    stack: ['Python', 'Gemini / LLMs', 'FastAPI', 'Vector DBs', 'OCR Pipelines', 'TypeScript'],
    icon: Sparkles,
  },
];

const PERKS = [
  {
    title: 'Remote-First Flexibility',
    desc: 'Work asynchronously from anywhere or drop into our Indore engineering studio.',
    icon: Globe,
  },
  {
    title: 'Direct Engineering Ownership',
    desc: 'Zero layers of management. Ship production architecture from week one.',
    icon: Zap,
  },
  {
    title: 'Modern AI & Dev Tooling',
    desc: 'Top-tier hardware, AI coding assistants, and modern cloud sandboxes provided.',
    icon: Laptop,
  },
  {
    title: 'Continuous Learning Budget',
    desc: 'Annual allowance for technical books, certifications, and developer conferences.',
    icon: Briefcase,
  },
];

export default function Careers({ isFullPage = false }: CareersProps) {
  const [department, setDepartment] = useState<RoleDepartment>('all');
  const [selectedRoleId, setSelectedRoleId] = useState<string>(OPEN_ROLES[0].id);
  const [isApplying, setIsApplying] = useState(false);
  const [submittedRole, setSubmittedRole] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    portfolio: '',
    experience: '2–4 Years',
    note: '',
  });

  const sectionRef = useRef<HTMLElement | null>(null);
  const detailPanelRef = useRef<HTMLDivElement | null>(null);

  const filteredRoles = useMemo(
    () =>
      department === 'all'
        ? OPEN_ROLES
        : OPEN_ROLES.filter((r) => r.department === department),
    [department]
  );

  const activeRole = useMemo(
    () => filteredRoles.find((r) => r.id === selectedRoleId) || filteredRoles[0] || OPEN_ROLES[0],
    [filteredRoles, selectedRoleId]
  );

  // Sync selected role when department filter changes
  useEffect(() => {
    if (!filteredRoles.some((r) => r.id === selectedRoleId) && filteredRoles[0]) {
      setSelectedRoleId(filteredRoles[0].id);
    }
    setIsApplying(false);
    setSubmittedRole(null);
  }, [department, filteredRoles, selectedRoleId]);

  // GSAP ScrollTrigger entrance for section perks & board
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.career-perk-card',
        { opacity: 0, y: 22, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: '.career-perks-grid',
            start: 'top 86%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // Smooth GSAP panel transition when switching role or opening quick-apply form
  useEffect(() => {
    const panel = detailPanelRef.current;
    if (!panel) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel,
        { opacity: 0, y: 12, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
          ease: 'power3.out',
          clearProps: 'transform',
        }
      );
    }, panel);

    return () => ctx.revert();
  }, [activeRole.id, isApplying, submittedRole]);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim()) return;
    setSubmittedRole(activeRole.title);
    setIsApplying(false);
    setFormState({
      name: '',
      email: '',
      portfolio: '',
      experience: '2–4 Years',
      note: '',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="careers"
      className={`bg-[#F8FAFC] border-t border-[#E2E8F0] relative overflow-hidden ${
        isFullPage ? 'pt-28 sm:pt-36 pb-20 sm:pb-28' : 'py-20 sm:py-24 lg:py-28'
      }`}
    >
      {/* Subtle Ambient TAVQEN Cyan & Mint Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[880px] h-[460px] pointer-events-none opacity-30 -z-10"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0, 196, 255, 0.14) 0%, rgba(155, 227, 223, 0.12) 45%, transparent 72%)',
        }}
      />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16" data-animate="fade-up">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Careers at TAVQEN · We&apos;re Hiring</span>
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0B132B] leading-[1.14]">
            Build software that ships,{' '}
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#0088CC] bg-clip-text text-transparent">
              scales, and matters.
            </span>
          </h2>

          <p className="mt-3.5 sm:mt-4 text-[14px] sm:text-[16px] text-[#64748B] font-normal leading-relaxed max-w-2xl mx-auto">
            Join a high-ownership engineering and design studio crafting modern web platforms, mobile apps, and AI-powered SaaS products.
          </p>
        </div>

        {/* ========================================================= */}
        {/* CULTURE & PERKS BENTO STRIP                               */}
        {/* ========================================================= */}
        <div className="career-perks-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12 sm:mb-14">
          {PERKS.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className="career-perk-card rounded-2xl sm:rounded-[22px] bg-white border border-[#E2E8F0] p-5 shadow-[0_6px_20px_rgba(15,23,42,0.03)] hover:border-[#00C4FF]/55 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-3.5 group-hover:bg-gradient-to-br group-hover:from-[#00D4FF] group-hover:to-[#0088CC] group-hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-[15px] font-bold text-[#0B132B] tracking-tight mb-1">
                  {perk.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* DEPARTMENT FILTER BAR                                     */}
        {/* ========================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0B132B] tracking-tight">
              Open Positions
            </h3>
            <p className="text-xs sm:text-[13px] text-[#64748B]">
              Select a role to view responsibilities, tech stack, and apply directly.
            </p>
          </div>

          <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-white border border-[#E2E8F0] shadow-2xs">
            {[
              { id: 'all' as const, label: 'All Roles' },
              { id: 'engineering' as const, label: 'Engineering' },
              { id: 'mobile' as const, label: 'Mobile' },
              { id: 'design' as const, label: 'Design' },
              { id: 'ai' as const, label: 'Product & AI' },
            ].map((tab) => {
              const isActive = department === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDepartment(tab.id)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-xl sm:rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white shadow-[0_4px_14px_rgba(0,196,255,0.28)]'
                      : 'text-[#64748B] hover:text-[#0B132B] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* SPLIT INTERACTIVE ROLES WORKSPACE                         */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT COLUMN: Open Roles Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {filteredRoles.map((role) => {
              const Icon = role.icon;
              const isSelected = activeRole.id === role.id;

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => {
                    setSelectedRoleId(role.id);
                    setIsApplying(false);
                    setSubmittedRole(null);
                  }}
                  className={`w-full text-left rounded-[22px] p-5 border transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                    isSelected
                      ? 'bg-white border-[#00C4FF] shadow-[0_18px_40px_rgba(0,196,255,0.14)]'
                      : 'bg-white/90 border-[#E2E8F0] hover:bg-white hover:border-[#00C4FF]/45 shadow-[0_4px_16px_rgba(15,23,42,0.02)]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-gradient-to-b from-[#00D4FF] to-[#0088CC]" />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#00D4FF] to-[#0088CC] text-white shadow-xs'
                            : 'bg-[#E0F7FF] text-[#0088CC]'
                        }`}
                      >
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-mono text-[10.5px] font-bold text-[#0088CC] uppercase tracking-wider">
                            {role.code} · {role.departmentLabel}
                          </span>
                        </div>
                        <h4
                          className={`text-[15.5px] sm:text-base font-bold tracking-tight transition-colors ${
                            isSelected ? 'text-[#0088CC]' : 'text-[#0B132B] group-hover:text-[#0088CC]'
                          }`}
                        >
                          {role.title}
                        </h4>

                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-[#64748B]">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#0088CC]" />
                            {role.location}
                          </span>
                          <span>•</span>
                          <span>{role.experience}</span>
                          <span>•</span>
                          <span className="font-semibold text-[#0B132B]">{role.compensation}</span>
                        </div>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 flex-shrink-0 mt-1 transition-transform duration-300 ${
                        isSelected
                          ? 'text-[#0088CC] translate-x-0.5'
                          : 'text-[#94A3B8] group-hover:text-[#0088CC] group-hover:translate-x-0.5'
                      }`}
                    />
                  </div>
                </button>
              );
            })}

            {/* Spontaneous General Application Hint */}
            <div className="rounded-2xl bg-gradient-to-r from-[#E0F7FF]/60 to-[#F8FAFC] border border-[#00C4FF]/25 p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-[#0B132B]">
                  Don&apos;t see your exact role?
                </p>
                <p className="text-[11.5px] text-[#64748B] mt-0.5">
                  We always welcome standout engineers &amp; builders.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSubmittedRole(null);
                  setIsApplying(true);
                }}
                className="px-3.5 py-2 rounded-full bg-white border border-[#E2E8F0] hover:border-[#0088CC] text-xs font-semibold text-[#0088CC] transition-colors whitespace-nowrap cursor-pointer"
              >
                Pitch Yourself
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Role Inspector & Instant Quick Apply */}
          <div className="lg:col-span-7">
            <div
              ref={detailPanelRef}
              key={`${activeRole.id}-${isApplying}-${submittedRole ?? ''}`}
              className="rounded-[28px] sm:rounded-[34px] bg-white border border-[#E2E8F0] shadow-[0_24px_60px_rgba(15,23,42,0.05)] p-6 sm:p-8 lg:p-10 relative overflow-hidden"
            >
              {/* Top Glowing Cyan Accent */}
              <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#00C4FF]/70 to-transparent pointer-events-none" />
              <div
                className="absolute inset-0 pointer-events-none opacity-65"
                style={{
                  background:
                    'radial-gradient(circle at 92% 90%, rgba(0, 196, 255, 0.11) 0%, rgba(155, 227, 223, 0.08) 38%, transparent 65%)',
                }}
              />

              <div className="relative z-10">
                {submittedRole ? (
                  /* ------------------------------------------------------- */
                  /* APPLICATION SUBMITTED CONFIRMATION                      */
                  /* ------------------------------------------------------- */
                  <div className="py-10 text-center max-w-md mx-auto">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                      Application Received
                    </span>
                    <h3 className="text-2xl font-bold text-[#0B132B] tracking-tight mb-2">
                      Thanks for applying!
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                      Our engineering team has received your profile for{' '}
                      <span className="font-semibold text-[#0B132B]">{submittedRole}</span>. We review every technical application directly and respond within 48 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmittedRole(null)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-sm font-semibold shadow-xs hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <span>Back to Role Details</span>
                    </button>
                  </div>
                ) : isApplying ? (
                  /* ------------------------------------------------------- */
                  /* QUICK APPLICATION FORM                                  */
                  /* ------------------------------------------------------- */
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E2E8F0]">
                      <div>
                        <span className="font-mono text-[11px] font-bold text-[#0088CC] uppercase tracking-wider">
                          Quick Apply · {activeRole.code}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0B132B] tracking-tight mt-0.5">
                          {activeRole.title}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsApplying(false)}
                        className="text-xs font-semibold text-[#64748B] hover:text-[#0B132B] px-3 py-1.5 rounded-full border border-[#E2E8F0] cursor-pointer"
                      >
                        ← Back
                      </button>
                    </div>

                    <form onSubmit={handleApplySubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#0B132B] mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            placeholder="Aarav Sharma"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0088CC] focus:bg-white focus:outline-none text-sm text-[#0B132B]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#0B132B] mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            placeholder="you@domain.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0088CC] focus:bg-white focus:outline-none text-sm text-[#0B132B]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#0B132B] mb-1.5">
                            GitHub / Portfolio / LinkedIn URL
                          </label>
                          <input
                            type="url"
                            value={formState.portfolio}
                            onChange={(e) => setFormState({ ...formState, portfolio: e.target.value })}
                            placeholder="https://github.com/username"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0088CC] focus:bg-white focus:outline-none text-sm text-[#0B132B]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#0B132B] mb-1.5">
                            Experience Level
                          </label>
                          <select
                            value={formState.experience}
                            onChange={(e) => setFormState({ ...formState, experience: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0088CC] focus:bg-white focus:outline-none text-sm text-[#0B132B]"
                          >
                            <option>0–2 Years</option>
                            <option>2–4 Years</option>
                            <option>4–7 Years</option>
                            <option>7+ Years</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0B132B] mb-1.5">
                          What have you built that you&apos;re proudest of?
                        </label>
                        <textarea
                          rows={3}
                          value={formState.note}
                          onChange={(e) => setFormState({ ...formState, note: e.target.value })}
                          placeholder="Share a link or short summary of a product, architecture, or system you engineered..."
                          className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0088CC] focus:bg-white focus:outline-none text-sm text-[#0B132B] resize-none"
                        />
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-[11.5px] text-[#64748B]">
                          Or email resume directly to{' '}
                          <a
                            href="mailto:tavqentechnologies@gmail.com"
                            className="text-[#0088CC] font-semibold hover:underline"
                          >
                            tavqentechnologies@gmail.com
                          </a>
                        </span>

                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-sm font-semibold shadow-[0_8px_22px_rgba(0,196,255,0.28)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                        >
                          <span>Submit Application</span>
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  /* ------------------------------------------------------- */
                  /* ROLE DETAILS SPOTLIGHT VIEW                             */
                  /* ------------------------------------------------------- */
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#E0F7FF] text-[#0088CC] text-[11px] font-mono font-bold uppercase tracking-wider">
                          {activeRole.code} · {activeRole.departmentLabel}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-[11px] font-semibold">
                          {activeRole.type}
                        </span>
                      </div>

                      <span className="font-mono text-xs sm:text-sm font-bold text-[#0B132B]">
                        {activeRole.compensation}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight mb-2">
                      {activeRole.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B] mb-5">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#0088CC]" />
                        {activeRole.location}
                      </span>
                      <span>•</span>
                      <span>Experience: {activeRole.experience}</span>
                    </div>

                    <p className="text-sm sm:text-[15px] text-[#475569] leading-relaxed mb-6">
                      {activeRole.summary}
                    </p>

                    {/* Responsibilities */}
                    <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] mb-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B132B] block mb-3">
                        What You&apos;ll Own
                      </span>
                      <ul className="space-y-2.5">
                        {activeRole.responsibilities.map((item, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-[#475569]">
                            <CheckCircle2 className="w-4 h-4 text-[#0088CC] flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-7">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-2.5">
                        Tech Stack You&apos;ll Work With
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeRole.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-lg bg-[#F1F5F9] text-[#0B132B] text-xs font-mono font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-5 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
                      <div className="text-xs text-[#64748B]">
                        Fast hiring process: <span className="font-semibold text-[#0B132B]">Intro Call → Technical Pairing → Offer</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsApplying(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-sm font-semibold shadow-[0_8px_22px_rgba(0,196,255,0.28)] hover:shadow-[0_12px_30px_rgba(0,196,255,0.38)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
                      >
                        <span>Apply for this Role</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

