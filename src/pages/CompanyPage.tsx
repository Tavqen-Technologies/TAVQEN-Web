import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  TrendingUp,
  Users,
  Code2,
  ArrowRight,
  Layers,
  Target,
  Monitor,
  Smartphone,
  Server,
  Cloud,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import HowTavqen from '../components/HowTavqen';
import WhyTavqen from '../components/WhyTavqen';

gsap.registerPlugin(ScrollTrigger);

interface CompanyPageProps {
  onNavigate?: (path: string) => void;
}

const COMPANY_STATS = [
  { target: 40, decimals: 0, suffix: '+', label: 'Digital Products Shipped' },
  { target: 99.9, decimals: 1, suffix: '%', label: 'Production Uptime' },
  { target: 100, decimals: 0, suffix: '%', label: 'Source Code Ownership' },
  { target: 4.9, decimals: 1, suffix: '/5', label: 'Client Satisfaction Score' },
];

export default function CompanyPage({ onNavigate }: CompanyPageProps) {
  const [activeStackIdx, setActiveStackIdx] = useState(0);
  const statsGridRef = useRef<HTMLDivElement | null>(null);
  const statValueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const valuesGridRef = useRef<HTMLDivElement | null>(null);
  const stackPanelRef = useRef<HTMLDivElement | null>(null);
  const stackSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const grid = statsGridRef.current;
    if (!grid) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      COMPANY_STATS.forEach((stat, idx) => {
        const el = statValueRefs.current[idx];
        if (el) el.textContent = `${stat.target.toFixed(stat.decimals)}${stat.suffix}`;
      });
      return;
    }

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.company-stat-card');
      gsap.from(cards, {
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: grid,
          start: 'top 92%',
          once: true,
        },
      });

      COMPANY_STATS.forEach((stat, idx) => {
        const el = statValueRefs.current[idx];
        if (!el) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.target,
          duration: 1.7,
          delay: idx * 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 92%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${counter.val.toFixed(stat.decimals)}${stat.suffix}`;
          },
          onComplete: () => {
            el.textContent = `${stat.target.toFixed(stat.decimals)}${stat.suffix}`;
          },
        });
      });
    }, statsGridRef);

    return () => ctx.revert();
  }, []);

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const TECH_STACK = [
    {
      layer: 'L1',
      category: 'Frontend',
      subtitle: 'Client & UI Engine',
      metric: 'Sub-100ms Interactions',
      summary:
        'Pixel-crisp, type-safe web interfaces engineered with server-side rendering, modular design systems, and fluid 60fps motion.',
      icon: Monitor,
      items: [
        { name: 'React 18', role: 'Concurrent UI Core' },
        { name: 'Next.js 14', role: 'App Router & Edge SSR' },
        { name: 'TypeScript', role: 'End-to-End Type Safety' },
        { name: 'Tailwind CSS', role: 'Utility Design System' },
        { name: 'Vite', role: 'Instant HMR Bundler' },
        { name: 'Framer Motion', role: 'Spring Physics UI' },
      ],
    },
    {
      layer: 'L2',
      category: 'Mobile',
      subtitle: 'iOS & Android Native',
      metric: '99.95% Crash-Free',
      summary:
        'Cross-platform and native mobile applications engineered for smooth offline-first sync, gesture responsiveness, and automated store delivery.',
      icon: Smartphone,
      items: [
        { name: 'React Native', role: 'Unified Native Bridge' },
        { name: 'Expo', role: 'Rapid OTA Delivery' },
        { name: 'iOS Swift', role: 'Native Apple Core' },
        { name: 'Android Kotlin', role: 'Modern Android Runtime' },
        { name: 'App Store CI/CD', role: 'Automated Store Releases' },
      ],
    },
    {
      layer: 'L3',
      category: 'Backend & APIs',
      subtitle: 'Services & Business Logic',
      metric: '< 65ms API Latency',
      summary:
        'Resilient, high-throughput API gateways and microservices designed for strict validation, real-time sockets, and effortless scale.',
      icon: Server,
      items: [
        { name: 'Node.js', role: 'Event-Driven Runtime' },
        { name: 'Python', role: 'AI & Data Services' },
        { name: 'FastAPI', role: 'High-Speed Async APIs' },
        { name: 'Express', role: 'Lightweight REST Core' },
        { name: 'GraphQL', role: 'Typed Schema Queries' },
        { name: 'RESTful APIs', role: 'Clean Contract Endpoints' },
      ],
    },
    {
      layer: 'L4',
      category: 'Data & Cloud',
      subtitle: 'Storage & Global Edge',
      metric: '99.99% Uptime SLA',
      summary:
        'Elastic cloud infrastructure, ACID-compliant relational storage, sub-millisecond caching, and edge compute distributed worldwide.',
      icon: Cloud,
      items: [
        { name: 'PostgreSQL', role: 'ACID Relational Engine' },
        { name: 'Redis', role: 'In-Memory Cache & PubSub' },
        { name: 'Docker', role: 'Immutable Containers' },
        { name: 'AWS', role: 'Elastic Cloud Scale' },
        { name: 'Google Cloud', role: 'Managed AI & Compute' },
        { name: 'Cloudflare Workers', role: 'Zero-Cold-Start Edge' },
      ],
    },
  ];

  const activeStack = TECH_STACK[activeStackIdx] || TECH_STACK[0];

  const CORE_VALUES = [
    {
      number: '01',
      title: 'Obsessive Craftsmanship',
      description: 'We care deeply about every pixel, interaction, query plan, and line of code we deliver.',
      icon: Code2,
      accent: '#0088CC',
      accentDark: '#006BA3',
    },
    {
      number: '02',
      title: 'Transparent Collaboration',
      description: 'Zero agency bureaucracy. You work directly with senior product builders and engineers.',
      icon: Users,
      accent: '#0088CC',
      accentDark: '#006BA3',
    },
    {
      number: '03',
      title: 'Scalable Architecture',
      description: 'We engineer systems designed to handle 10x traffic bursts from day one without breaking.',
      icon: Layers,
      accent: '#0088CC',
      accentDark: '#006BA3',
    },
    {
      number: '04',
      title: 'Business-Driven Engineering',
      description: 'Code is only valuable when it moves your business metrics and delights your users.',
      icon: TrendingUp,
      accent: '#0088CC',
      accentDark: '#006BA3',
    },
  ];

  useEffect(() => {
    const grid = valuesGridRef.current;
    if (!grid) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.culture-value-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.09,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: grid,
            start: 'top 84%',
            once: true,
          },
        }
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  // Animate Production Stack tiles smoothly when switching layers
  useEffect(() => {
    const panel = stackPanelRef.current;
    if (!panel) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stack-tile-item',
        { opacity: 0, y: 14, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
          stagger: 0.05,
          ease: 'power3.out',
          clearProps: 'transform',
        }
      );
    }, panel);

    return () => ctx.revert();
  }, [activeStackIdx]);

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28">
      {/* GLOBAL CONTAINER */}
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home Breadcrumb */}
        <div className="mb-6 sm:mb-8">
          <button
            type="button"
            onClick={() => handleNav('/home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors cursor-pointer"
          >
            <span>← Back to Home</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* HERO SECTION                                              */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            About TAVQEN Technologies
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-[56px] font-medium tracking-tight text-[#0B132B] leading-[1.12]">
            Engineering digital products that shape what&apos;s next.
          </h1>
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] text-[#64748B] font-normal leading-relaxed max-w-2xl mx-auto">
            TAVQEN Technologies is an advanced software engineering and digital product studio. We partner with ambitious founders, startups, and forward-thinking enterprises to design, build, and scale world-class software.
          </p>
        </div>

        {/* ========================================================= */}
        {/* STATS STRIP                                               */}
        {/* ========================================================= */}
        <div
          ref={statsGridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20 sm:mb-24"
        >
          {COMPANY_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="company-stat-card rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-7 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#00C4FF]/40 hover:-translate-y-1 transition-all"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#0088CC] bg-clip-text text-transparent mb-1 font-mono tabular-nums">
                <span
                  ref={(el) => {
                    statValueRefs.current[idx] = el;
                  }}
                >
                  {(0).toFixed(stat.decimals)}
                  {stat.suffix}
                </span>
              </div>
              <div className="text-xs sm:text-[13px] font-medium text-[#64748B]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* VISION & MISSION DUAL CARDS                               */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-20 sm:mb-24">
          {/* Vision */}
          <div className="rounded-[28px] sm:rounded-[36px] bg-white border border-[#E2E8F0] p-8 sm:p-10 shadow-[0_16px_40px_rgba(15,23,42,0.04)] relative overflow-hidden group hover:border-[#00C4FF]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-6 shadow-xs">
              <Target className="w-6 h-6 stroke-[2]" />
            </div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#0088CC] mb-2 block">
              Our Vision
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight mb-4">
              To be the premier engineering foundation for modern software.
            </h3>
            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed font-normal">
              We envision a world where every transformative idea is realized through flawless code, intuitive user experiences, and scalable cloud infrastructure that stands the test of time.
            </p>
          </div>

          {/* Mission */}
          <div className="rounded-[28px] sm:rounded-[36px] bg-white border border-[#E2E8F0] p-8 sm:p-10 shadow-[0_16px_40px_rgba(15,23,42,0.04)] relative overflow-hidden group hover:border-[#00C4FF]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-6 shadow-xs">
              <Code2 className="w-6 h-6 stroke-[2]" />
            </div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#0088CC] mb-2 block">
              Our Mission
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight mb-4">
              To turn ambitious concepts into reliable, production-ready reality.
            </h3>
            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed font-normal">
              Our mission is to eliminate tech debt, remove friction, and build high-leverage digital systems using battle-tested technology and agile cross-functional engineering squads.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* WHY TAVQEN (INTERACTIVE PROCESS)                          */}
      {/* ========================================================= */}
      <WhyTavqen />

      {/* ========================================================= */}
      {/* HOW TAVQEN WORKS (4-STEP FRAMEWORK)                      */}
      {/* ========================================================= */}
      <HowTavqen />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-24">
        {/* ========================================================= */}
        {/* CORE ENGINEERING VALUES (Clean Minimal Cards)             */}
        {/* ========================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16" data-animate="fade-up">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            Engineering Culture
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#0B132B]">
            Values that guide how we build.
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#64748B] font-normal leading-relaxed">
            Every product we touch is guided by four uncompromising principles.
          </p>
        </div>

        <div
          ref={valuesGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 sm:mb-24"
        >
          {CORE_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="culture-value-card group relative rounded-[24px] bg-white border border-[#E2E8F0] p-7 shadow-[0_6px_25px_rgba(15,23,42,0.03)] hover:border-[#00C4FF]/60 hover:shadow-[0_18px_38px_rgba(0,196,255,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top subtle cyan accent line on hover */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#00C4FF]/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-2xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#00D4FF] group-hover:to-[#0088CC] group-hover:text-white transition-all duration-300 shadow-2xs">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#94A3B8] group-hover:text-[#0088CC] transition-colors">
                      {val.number}
                    </span>
                  </div>

                  <h4 className="text-[17px] font-bold text-[#0B132B] tracking-tight mb-2.5 group-hover:text-[#0088CC] transition-colors">
                    {val.title}
                  </h4>

                  <p className="text-xs sm:text-[13.5px] text-[#64748B] leading-relaxed font-normal">
                    {val.description}
                  </p>
                </div>

                <div className="mt-6 h-[3px] w-10 rounded-full bg-[#E0F7FF] group-hover:w-16 group-hover:bg-gradient-to-r group-hover:from-[#00D4FF] group-hover:to-[#0088CC] transition-all duration-300" />
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* PRODUCTION STACK: INTERACTIVE ARCHITECTURE BLUEPRINT      */}
        {/* ========================================================= */}
        <div
          ref={stackSectionRef}
          className="relative rounded-[32px] sm:rounded-[40px] bg-white border border-[#E2E8F0] p-6 sm:p-10 lg:p-12 shadow-[0_24px_60px_rgba(15,23,42,0.05)] mb-20 sm:mb-24 overflow-hidden"
        >
          {/* Subtle Blueprint Grid + Ambient Cyan Corner Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 136, 204, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 136, 204, 0.04) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div
            className="absolute -top-24 -right-24 w-96 h-96 pointer-events-none opacity-45"
            style={{
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.14) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10">
            {/* Header Row + Architecture Telemetry Badge */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
              <div className="max-w-2xl">
                <span className="inline-block px-3 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3">
                  Production Stack
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B132B] tracking-tight">
                  Modern technologies we engineer with.
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-[#64748B] leading-relaxed">
                  We leverage modern, type-safe, and industry-standard tools to build software that is fast, secure, and maintainable.
                </p>
              </div>

              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold text-[#0B132B]">
                  4 Architecture Layers · 23 Tools
                </span>
              </div>
            </div>

            {/* 4 Interactive Architecture Pipeline Nodes (L1 -> L2 -> L3 -> L4) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-8 relative">
              {TECH_STACK.map((group, idx) => {
                const Icon = group.icon;
                const isActive = idx === activeStackIdx;

                return (
                  <button
                    key={group.layer}
                    type="button"
                    onClick={() => setActiveStackIdx(idx)}
                    className={`relative text-left rounded-2xl sm:rounded-[22px] p-4 sm:p-5 border transition-all duration-300 cursor-pointer group ${
                      isActive
                        ? 'bg-gradient-to-br from-[#0B132B] to-[#0F244A] border-[#0088CC] text-white shadow-[0_16px_36px_rgba(0,136,204,0.22)] -translate-y-0.5'
                        : 'bg-[#F8FAFC]/90 border-[#E2E8F0] text-[#0B132B] hover:bg-white hover:border-[#00C4FF]/60 hover:-translate-y-0.5'
                    }`}
                  >
                    {/* Top Row: Layer Pill + Icon */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`font-mono text-[10.5px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/30'
                            : 'bg-[#E0F7FF] text-[#0088CC]'
                        }`}
                      >
                        {group.layer}
                      </span>

                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-white/10 text-[#00D4FF]'
                            : 'bg-white border border-[#E2E8F0] text-[#0088CC] group-hover:border-[#00C4FF]/50'
                        }`}
                      >
                        <Icon className="w-4 h-4 stroke-[2]" />
                      </div>
                    </div>

                    <div
                      className={`text-sm sm:text-base font-bold tracking-tight ${
                        isActive ? 'text-white' : 'text-[#0B132B]'
                      }`}
                    >
                      {group.category}
                    </div>
                    <div
                      className={`text-[11px] sm:text-xs mt-0.5 ${
                        isActive ? 'text-slate-300' : 'text-[#64748B]'
                      }`}
                    >
                      {group.subtitle}
                    </div>

                    {/* Active bottom bar indicator */}
                    <div
                      className={`mt-3.5 h-1 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC]'
                          : 'w-8 bg-[#CBD5E1] group-hover:w-14 group-hover:bg-[#00C4FF]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Layer Blueprint Spotlight & Animated Tech Matrix */}
            <div
              ref={stackPanelRef}
              className="rounded-[24px] sm:rounded-[28px] bg-[#F8FAFC]/90 border border-[#E2E8F0] p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-center">
                {/* Left Summary Panel */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-[11px] font-mono font-bold text-[#0088CC] mb-3.5 shadow-2xs">
                      <Zap className="w-3.5 h-3.5 text-[#00C4FF]" />
                      <span>{activeStack.metric}</span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold text-[#0B132B] tracking-tight mb-2.5">
                      {activeStack.layer} · {activeStack.category}
                    </h4>

                    <p className="text-xs sm:text-[13.5px] text-[#64748B] leading-relaxed">
                      {activeStack.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center gap-2 text-xs font-semibold text-[#0088CC]">
                    <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                    <span>{activeStack.items.length} battle-tested technologies in this layer</span>
                  </div>
                </div>

                {/* Right Interactive Tech Tiles Grid */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {activeStack.items.map((tech, tIdx) => (
                    <div
                      key={`${activeStack.layer}-${tech.name}`}
                      className="stack-tile-item group rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00C4FF]/70 p-4 shadow-[0_4px_16px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_28px_rgba(0,196,255,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="font-mono text-[10px] font-bold text-[#0088CC] bg-[#E0F7FF] px-2 py-0.5 rounded-md">
                          0{tIdx + 1}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#00C4FF]/60 group-hover:bg-[#00C4FF] group-hover:scale-125 transition-all" />
                      </div>

                      <div>
                        <div className="text-[14.5px] font-bold text-[#0B132B] tracking-tight group-hover:text-[#0088CC] transition-colors">
                          {tech.name}
                        </div>
                        <div className="text-[11.5px] text-[#64748B] mt-0.5 font-normal">
                          {tech.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Complete Stack Overview Strip (All 4 Categories Visible at a Glance) */}
            <div className="mt-6 pt-6 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TECH_STACK.map((group, idx) => {
                const isActive = idx === activeStackIdx;
                return (
                  <div
                    key={`summary-${group.layer}`}
                    onClick={() => setActiveStackIdx(idx)}
                    className={`rounded-2xl p-3.5 border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#E0F7FF]/45 border-[#00C4FF]/45'
                        : 'bg-[#F8FAFC]/60 border-transparent hover:border-[#E2E8F0] hover:bg-white'
                    }`}
                  >
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0088CC] mb-2">
                      {group.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((tech) => (
                        <span
                          key={tech.name}
                          className="px-2 py-0.5 rounded-md bg-white border border-[#E2E8F0] text-[11px] font-medium text-[#475569]"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* START A PROJECT CTA BANNER                                */}
        {/* ========================================================= */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-gradient-to-r from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/60 border border-[#00C4FF]/30 p-8 sm:p-12 text-center flex flex-col items-center shadow-[0_20px_50px_rgba(0,196,255,0.08)]">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            Partner with TAVQEN
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0B132B] tracking-tight max-w-xl leading-snug">
            Ready to bring your ambitious digital product to life?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] max-w-lg mb-8 leading-relaxed">
            Schedule an introductory sprint consultation with our engineering squad and receive a clear technical proposal.
          </p>
          <button
            type="button"
            onClick={() => handleNav('/start-a-project')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-sm font-semibold shadow-[0_8px_25px_rgba(0,196,255,0.3)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
