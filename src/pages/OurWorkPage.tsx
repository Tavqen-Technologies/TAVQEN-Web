import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe,
  Layers,
  Play,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import { ProgressiveImage } from '../components/loading';

import product1 from '../assits/products/product1.jpg';
import product2 from '../assits/products/product2.jpg';
import product3 from '../assits/products/product3.jpg';
import product4 from '../assits/products/product4.jpg';

gsap.registerPlugin(ScrollTrigger);

interface OurWorkPageProps {
  onNavigate?: (path: string) => void;
}

interface CaseStudy {
  id: string;
  number: string;
  category: 'web' | 'mobile' | 'saas';
  categoryLabel: string;
  shortTitle: string;
  title: string;
  client: string;
  impact: string;
  overview: string;
  challenge: string;
  solution: string;
  technologies: string[];
  image: string;
  icon: typeof FileText;
  stats: { label: string; value: string }[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'tavqen-pdf',
    number: '01',
    category: 'mobile',
    categoryLabel: 'Mobile App · Productivity',
    shortTitle: 'TAVQEN PDF',
    title: 'TAVQEN PDF — AI Document & OCR App',
    client: 'TAVQEN Flagship Product',
    impact: '300 DPI Smart OCR',
    overview:
      'High-speed mobile and web PDF suite for scanning, OCR extraction, e-signing, and encrypted cloud vault sync.',
    challenge:
      'Slow PDF apps, poor low-light OCR accuracy, and fragmented document sync.',
    solution:
      'On-device edge scanner with smart OCR pipelines and AES-256 encrypted vault.',
    technologies: ['React Native', 'TypeScript', 'Smart OCR', 'AES-256 Vault'],
    image: product1,
    icon: FileText,
    stats: [
      { label: 'Export Quality', value: '300 DPI' },
      { label: 'Scan Speed', value: '0.4s' },
      { label: 'Encryption', value: 'AES-256' },
    ],
  },
  {
    id: 'gramsetu',
    number: '02',
    category: 'web',
    categoryLabel: 'Web Application · Civic Tech',
    shortTitle: 'GramSetu',
    title: 'GramSetu — Digital Governance Portal',
    client: 'TAVQEN Civic Initiative',
    impact: '100% Digital Records',
    overview:
      'Unified civic platform connecting villages and citizens with live grievance tracking, welfare access, and offline sync.',
    challenge:
      'Low-connectivity areas faced delayed grievance tracking and scattered records.',
    solution:
      'Offline-first Next.js & SQLite architecture with voice-first local dialect support.',
    technologies: ['Next.js 14', 'SQLite Sync', 'FastAPI', 'PostgreSQL'],
    image: product3,
    icon: Users,
    stats: [
      { label: 'Offline Mode', value: 'Zero Signal' },
      { label: 'API Speed', value: '62ms' },
      { label: 'Uptime SLA', value: '99.99%' },
    ],
  },
  {
    id: 'tavqen-v-player',
    number: '03',
    category: 'mobile',
    categoryLabel: 'Mobile App · Entertainment',
    shortTitle: 'TAVQEN V Player',
    title: 'TAVQEN V Player — 4K/8K Media Engine',
    client: 'TAVQEN Consumer Suite',
    impact: '4K / 8K Playback',
    overview:
      'Hardware-accelerated video player supporting multi-format 4K/8K playback, smart subtitle sync, and PiP mode.',
    challenge:
      'Heavy 4K streams caused frame drops, audio desync, and high battery drain.',
    solution:
      'Native hardware decoding pipelines with adaptive gestures and background play.',
    technologies: ['Kotlin', 'Swift', 'React Native', 'FFmpeg Core'],
    image: product2,
    icon: Play,
    stats: [
      { label: 'Resolution', value: '4K / 8K' },
      { label: 'Crash-Free', value: '99.95%' },
      { label: 'Modes', value: 'PiP + BG' },
    ],
  },
  {
    id: 'tavqen-saas-studio',
    number: '04',
    category: 'saas',
    categoryLabel: 'SaaS Platform · Enterprise',
    shortTitle: 'TAVQEN Cloud SaaS',
    title: 'TAVQEN Cloud Studio — Web & SaaS Systems',
    client: 'Enterprise & Startup Partners',
    impact: '40+ Products Shipped',
    overview:
      'Multitenant SaaS platforms, workflow engines, and fast web apps built for startups and enterprise teams.',
    challenge:
      'Fragmented legacy tools, sluggish dashboards, and rigid software architectures.',
    solution:
      'Modular Next.js & API systems with Stripe billing, RBAC, and zero-downtime CI/CD.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'AWS / Docker'],
    image: product4,
    icon: Layers,
    stats: [
      { label: 'Shipped', value: '40+' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Rating', value: '4.9 / 5' },
    ],
  },
];

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function buildArcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const start = polar(cx, cy, r, startDeg);
  const end = polar(cx, cy, r, endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

const HUB_SVG_W = 430;
const HUB_SVG_H = 430;
const HUB_CX = 132;
const HUB_CY = 215;
const HUB_R_ARC = 152;

export default function OurWorkPage({ onNavigate }: OurWorkPageProps) {
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'saas'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const param = new URLSearchParams(window.location.search).get('project');
    if (!param) return 0;
    const foundIdx = CASE_STUDIES.findIndex((c) => c.id === param);
    return foundIdx >= 0 ? foundIdx : 0;
  });

  const pageRef = useRef<HTMLDivElement | null>(null);
  const arcRef = useRef<SVGPathElement | null>(null);
  const hubRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabDockRef = useRef<HTMLDivElement | null>(null);
  const tabPillRef = useRef<HTMLDivElement | null>(null);
  const tabBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hasInitializedPillRef = useRef(false);
  const prevFilterRef = useRef(filter);
  const activeIndexRef = useRef(activeIndex);
  const skipScrollSyncUntilRef = useRef(0);
  const didInitialDeepLinkRef = useRef(false);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const filterTabs = useMemo(
    () => [
      { id: 'all' as const, label: 'All Projects', icon: Sparkles, count: CASE_STUDIES.length },
      {
        id: 'web' as const,
        label: 'Web Applications',
        icon: Globe,
        count: CASE_STUDIES.filter((c) => c.category === 'web').length,
      },
      {
        id: 'mobile' as const,
        label: 'Mobile Apps',
        icon: Smartphone,
        count: CASE_STUDIES.filter((c) => c.category === 'mobile').length,
      },
      {
        id: 'saas' as const,
        label: 'SaaS Platforms',
        icon: Layers,
        count: CASE_STUDIES.filter((c) => c.category === 'saas').length,
      },
    ],
    []
  );

  // Smooth GSAP sliding pill behind active filter tab
  useEffect(() => {
    const updatePill = (immediate = false) => {
      const pill = tabPillRef.current;
      const btn = tabBtnRefs.current[filter];
      if (!pill || !btn) return;

      const props = {
        x: btn.offsetLeft,
        y: btn.offsetTop,
        width: btn.offsetWidth,
        height: btn.offsetHeight,
      };

      if (immediate) {
        gsap.set(pill, props);
      } else {
        gsap.to(pill, {
          ...props,
          duration: 0.45,
          ease: 'power3.out',
        });
      }
    };

    const isFirstMount = !hasInitializedPillRef.current;
    hasInitializedPillRef.current = true;
    const raf = window.requestAnimationFrame(() => updatePill(isFirstMount));

    const onResize = () => updatePill(true);
    window.addEventListener('resize', onResize);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && tabDockRef.current) {
      observer = new ResizeObserver(() => updatePill(true));
      observer.observe(tabDockRef.current);
    }

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      observer?.disconnect();
    };
  }, [filter]);

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredStudies = useMemo(
    () => (filter === 'all' ? CASE_STUDIES : CASE_STUDIES.filter((item) => item.category === filter)),
    [filter]
  );

  useEffect(() => {
    if (prevFilterRef.current !== filter) {
      prevFilterRef.current = filter;
      setActiveIndex(0);
    }
  }, [filter]);

  const safeActiveIndex = Math.min(activeIndex, Math.max(0, filteredStudies.length - 1));

  const arcNodes = useMemo(() => {
    const count = filteredStudies.length;
    const totalSpan = count === 1 ? 0 : count === 2 ? 58 : 114;
    const step = count <= 1 ? 0 : totalSpan / (count - 1);

    return filteredStudies.map((study, idx) => {
      const deg = count === 1 ? 0 : -totalSpan / 2 + idx * step;
      return {
        study,
        idx,
        deg,
        pos: polar(HUB_CX, HUB_CY, HUB_R_ARC, deg),
        tail: polar(HUB_CX, HUB_CY, HUB_R_ARC + 20, deg),
      };
    });
  }, [filteredStudies]);

  const arcStartDeg = arcNodes.length > 1 ? arcNodes[0].deg - 12 : -30;
  const arcEndDeg = arcNodes.length > 1 ? arcNodes[arcNodes.length - 1].deg + 12 : 30;
  const orbitalArcPath = useMemo(
    () => buildArcPath(HUB_CX, HUB_CY, HUB_R_ARC, arcStartDeg, arcEndDeg),
    [arcStartDeg, arcEndDeg]
  );

  const activeNodeDeg = arcNodes[safeActiveIndex]?.deg ?? 0;
  const activeArcProgressPath = useMemo(
    () =>
      buildArcPath(
        HUB_CX,
        HUB_CY,
        HUB_R_ARC,
        arcStartDeg,
        Math.max(arcStartDeg + 4, activeNodeDeg)
      ),
    [arcStartDeg, activeNodeDeg]
  );

  const scrollToCard = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(filteredStudies.length - 1, idx));
      setActiveIndex(clamped);

      const el = cardRefs.current[clamped];
      if (!el) return;

      skipScrollSyncUntilRef.current = performance.now() + 800;
      const targetTop = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 120);
      smoothScrollTo(targetTop, 0.75);
    },
    [filteredStudies.length]
  );

  const handleStep = useCallback(
    (dir: -1 | 1) => {
      if (filteredStudies.length <= 1) return;
      const next = (activeIndexRef.current + dir + filteredStudies.length) % filteredStudies.length;
      scrollToCard(next);
    },
    [filteredStudies.length, scrollToCard]
  );

  // Sync deep-link ?project= to matching card on initial mount
  useEffect(() => {
    if (didInitialDeepLinkRef.current) return;
    didInitialDeepLinkRef.current = true;

    const param = new URLSearchParams(window.location.search).get('project');
    if (param) {
      const idx = filteredStudies.findIndex((c) => c.id === param);
      if (idx > 0) {
        const timer = window.setTimeout(() => scrollToCard(idx), 180);
        return () => window.clearTimeout(timer);
      }
    }
  }, [filteredStudies, scrollToCard]);

  // GSAP animations + scroll tracking across the cards on the right
  useEffect(() => {
    const container = pageRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (hubRef.current) {
        gsap.fromTo(
          hubRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.75, ease: 'power3.out', clearProps: 'transform' }
        );
      }

      if (arcRef.current) {
        const len = arcRef.current.getTotalLength();
        gsap.fromTo(
          arcRef.current,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' }
        );
      }

      gsap.fromTo(
        '.orbital-dot',
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          stagger: 0.08,
          delay: 0.2,
          ease: 'back.out(1.6)',
          transformOrigin: 'center center',
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>('.work-radial-card');
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: 30, y: 22, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.72,
            delay: idx === 0 ? 0.08 : 0,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: card,
              start: 'top 86%',
              once: true,
            },
          }
        );
      });
    }, container);

    // Closest-card tracking while scrolling past the right column
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        if (performance.now() < skipScrollSyncUntilRef.current) return;

        const targetCenter = window.innerHeight * 0.42;
        let closestIdx = 0;
        let minDist = Infinity;

        cardRefs.current.slice(0, filteredStudies.length).forEach((el, idx) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const dist = Math.abs(cardCenter - targetCenter);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = idx;
          }
        });

        if (closestIdx !== activeIndexRef.current) {
          setActiveIndex(closestIdx);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      ctx.revert();
    };
  }, [filter, filteredStudies.length]);

  // Keyboard ArrowLeft / ArrowRight navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleStep(1);
      else if (e.key === 'ArrowLeft') handleStep(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleStep]);

  return (
    <div ref={pageRef} className="pt-28 sm:pt-36 pb-20 sm:pb-28 bg-[#F8FAFC] relative overflow-x-clip">
      {/* Subtle Ambient TAVQEN Radial Lighting */}
      <div
        className="absolute top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none opacity-30 -z-10"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0, 196, 255, 0.16) 0%, rgba(155, 227, 223, 0.12) 45%, transparent 72%)',
        }}
      />

      <div className="site-container">
        {/* Back to Home Breadcrumb */}
        <div className="mb-6 sm:mb-8">
          <button
            type="button"
            onClick={() => handleNav('/home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* PAGE HERO HEADER                                          */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12" data-animate="fade-up">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portfolio &amp; Case Studies</span>
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-[56px] font-medium tracking-tight text-[#0B132B] leading-[1.12]">
            Work that drives real{' '}
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#0088CC] bg-clip-text text-transparent">
              measurable impact.
            </span>
          </h1>
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] text-[#64748B] font-normal leading-relaxed max-w-2xl mx-auto">
            Explore recent digital products, mobile applications, and web platforms designed and engineered by TAVQEN Technologies.
          </p>
        </div>

        {/* ========================================================= */}
        {/* FILTER SEGMENTED DOCK WITH GLIDING INDICATOR              */}
        {/* ========================================================= */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div
            ref={tabDockRef}
            className="relative inline-flex flex-wrap items-center justify-center gap-1 p-1.5 rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-[0_12px_32px_rgba(15,23,42,0.05)]"
          >
            <div
              ref={tabPillRef}
              aria-hidden="true"
              className="absolute top-0 left-0 rounded-xl sm:rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] shadow-[0_6px_18px_rgba(0,196,255,0.32)] pointer-events-none"
            />

            {filterTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabBtnRefs.current[tab.id] = el;
                  }}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`relative z-10 inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-[13px] font-semibold transition-colors duration-300 cursor-pointer select-none ${
                    isActive
                      ? 'text-white'
                      : 'text-[#64748B] hover:text-[#0B132B]'
                  }`}
                >
                  <TabIcon
                    className={`w-3.5 h-3.5 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-[#0088CC]'
                    }`}
                  />
                  <span>{tab.label}</span>
                  <span
                    className={`font-mono text-[10.5px] font-bold px-1.5 py-0.5 rounded-full transition-colors duration-300 ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'bg-[#F1F5F9] text-[#64748B]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* STICKY LEFT ORBITAL HUB + SCROLLING RIGHT WORK CARDS      */}
        {/* Left section stays sticky until all right cards finish!   */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-20 sm:mb-24">
          {/* LEFT STICKY COLUMN */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start flex flex-col items-center">
            {/* Desktop Radial Arc Stage */}
            <div
              className="hidden lg:block relative mx-auto lg:scale-[0.88] xl:scale-100 origin-left"
              style={{ width: `${HUB_SVG_W}px`, height: `${HUB_SVG_H}px` }}
            >
              <svg
                viewBox={`0 0 ${HUB_SVG_W} ${HUB_SVG_H}`}
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
              >
                <defs>
                  <linearGradient id="workArcGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00D4FF" />
                    <stop offset="55%" stopColor="#0088CC" />
                    <stop offset="100%" stopColor="#0B132B" />
                  </linearGradient>
                </defs>

                {/* Base Orbital Track */}
                <path
                  ref={arcRef}
                  d={orbitalArcPath}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Active Cyan Progress Arc */}
                <path
                  d={activeArcProgressPath}
                  fill="none"
                  stroke="url(#workArcGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />

                {/* End Caps */}
                {(() => {
                  const startCap = polar(HUB_CX, HUB_CY, HUB_R_ARC, arcStartDeg);
                  const endCap = polar(HUB_CX, HUB_CY, HUB_R_ARC, arcEndDeg);
                  return (
                    <>
                      <circle cx={startCap.x} cy={startCap.y} r="3.5" fill="#00D4FF" />
                      <circle cx={endCap.x} cy={endCap.y} r="3.5" fill="#94A3B8" />
                    </>
                  );
                })()}

                {/* Connector Ticks + Clickable Milestone Nodes */}
                {arcNodes.map((node) => {
                  const isActive = node.idx === safeActiveIndex;
                  return (
                    <g
                      key={node.study.id}
                      className="orbital-dot pointer-events-auto cursor-pointer"
                      onClick={() => scrollToCard(node.idx)}
                    >
                      <line
                        x1={node.pos.x}
                        y1={node.pos.y}
                        x2={node.tail.x}
                        y2={node.tail.y}
                        stroke={isActive ? '#00C4FF' : '#CBD5E1'}
                        strokeWidth={isActive ? 2 : 1.25}
                        strokeDasharray={isActive ? undefined : '3 3'}
                      />
                      {isActive && (
                        <circle
                          cx={node.pos.x}
                          cy={node.pos.y}
                          r="13"
                          fill="#00C4FF"
                          fillOpacity="0.18"
                        />
                      )}
                      <circle
                        cx={node.pos.x}
                        cy={node.pos.y}
                        r={isActive ? 7 : 5.5}
                        fill="#FFFFFF"
                        stroke={isActive ? '#00C4FF' : '#0088CC'}
                        strokeWidth={isActive ? 3.5 : 2.5}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Circular White Center Hub */}
              <div
                ref={hubRef}
                className="absolute rounded-full bg-white border border-[#E2E8F0] shadow-[0_24px_65px_rgba(15,23,42,0.08)] flex flex-col items-center justify-center text-center p-6 z-10 overflow-hidden"
                style={{
                  width: '236px',
                  height: '236px',
                  left: `${HUB_CX - 118}px`,
                  top: `${HUB_CY - 118}px`,
                }}
              >
                <div
                  className="absolute inset-2 rounded-full pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 25%, rgba(0, 212, 255, 0.10) 0%, transparent 65%)',
                  }}
                />

                <span className="relative z-10 px-3 py-1 rounded-full bg-[#E0F7FF] text-[#0088CC] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                  TAVQEN Studio
                </span>

                <h2 className="relative z-10 text-lg font-bold text-[#0B132B] tracking-tight leading-snug">
                  Our Work &amp; Products
                </h2>

                <p className="relative z-10 text-[11.5px] text-[#64748B] mt-1.5 leading-relaxed max-w-[175px]">
                  Click any milestone or scroll to explore all projects.
                </p>

                <div className="relative z-10 mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[10.5px] font-mono font-bold text-[#0088CC]">
                  <span>40+ Shipped · 99.9% SLA</span>
                </div>

                {filteredStudies.length > 1 && (
                  <div className="relative z-10 mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStep(-1)}
                      className="w-7 h-7 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0088CC] text-[#475569] hover:text-[#0088CC] flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Previous project"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-[11px] font-bold text-[#0B132B] px-1">
                      0{safeActiveIndex + 1} / 0{filteredStudies.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleStep(1)}
                      className="w-7 h-7 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0088CC] text-[#475569] hover:text-[#0088CC] flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Next project"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Clickable 01..04 Milestone Labels along the Arc */}
              {arcNodes.map((node) => {
                const isActive = node.idx === safeActiveIndex;
                return (
                  <button
                    key={`node-label-${node.study.id}`}
                    type="button"
                    onClick={() => scrollToCard(node.idx)}
                    style={{
                      left: `${node.tail.x + 10}px`,
                      top: `${node.tail.y}px`,
                      transform: 'translateY(-50%)',
                    }}
                    className={`absolute z-20 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all duration-300 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-white border-[#00C4FF] shadow-[0_10px_24px_rgba(0,196,255,0.18)] text-[#0B132B] scale-105'
                        : 'bg-white/85 border-[#E2E8F0]/80 text-[#64748B] hover:text-[#0088CC] hover:border-[#00C4FF]/45 hover:bg-white'
                    }`}
                  >
                    <span className="font-mono text-[11px] font-bold text-[#0088CC]">
                      {node.study.number}
                    </span>
                    <span className="text-xs font-semibold">{node.study.shortTitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile / Tablet Clickable Pills (< lg) */}
            <div className="lg:hidden w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {filteredStudies.map((study, idx) => {
                const isActive = idx === safeActiveIndex;
                return (
                  <button
                    key={study.id}
                    type="button"
                    onClick={() => scrollToCard(idx)}
                    className={`px-3.5 py-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-white border-[#00C4FF] shadow-[0_10px_25px_rgba(0,196,255,0.14)]'
                        : 'bg-white/80 border-[#E2E8F0] hover:border-[#00C4FF]/40'
                    }`}
                  >
                    <div className="font-mono text-[11px] font-bold text-[#0088CC]">
                      {study.number}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#0B132B] truncate mt-0.5">
                      {study.shortTitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SCROLLING COLUMN: Gallery-First Large Visual Showcase Cards */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            {filteredStudies.map((study, idx) => {
              const isActive = idx === safeActiveIndex;
              const isExpanded = expandedId === study.id;
              return (
                <div
                  key={study.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onClick={() => setActiveIndex(idx)}
                  className={`work-radial-card group relative rounded-[26px] sm:rounded-[32px] bg-white border transition-all duration-500 overflow-hidden cursor-pointer ${
                    isActive
                      ? 'border-[#00C4FF]/65 shadow-[0_24px_60px_rgba(0,196,255,0.13)]'
                      : 'border-[#E2E8F0] shadow-[0_14px_40px_rgba(15,23,42,0.04)] hover:border-[#00C4FF]/45 hover:shadow-[0_20px_52px_rgba(0,196,255,0.10)]'
                  }`}
                >
                  {/* Top Active Highlight Hairline */}
                  <div
                    className={`absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#00C4FF]/80 to-transparent pointer-events-none z-20 transition-opacity duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* LARGE HERO VISUAL STAGE */}
                  <div className="relative p-3 sm:p-4 pb-0">
                    <div className="relative w-full h-[240px] sm:h-[310px] xl:h-[345px] rounded-[20px] sm:rounded-[24px] overflow-hidden border border-[#E2E8F0]/80 bg-gradient-to-br from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/55">
                      <ProgressiveImage
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover object-top group-hover:scale-[1.035] transition-transform duration-700 ease-out"
                        containerClassName="w-full h-full"
                      />

                      {/* Soft top & bottom gradient scrims for legible floating pills */}
                      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0B132B]/25 via-[#0B132B]/5 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B132B]/35 via-transparent to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />

                      {/* Top Floating Glass Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/92 backdrop-blur-md border border-white/60 shadow-sm text-[10.5px] font-bold font-mono text-[#0B132B] uppercase tracking-wider">
                          <span className="text-[#0088CC]">{study.number}</span>
                          <span className="text-[#CBD5E1]">·</span>
                          <span>{study.categoryLabel.split('·')[0].trim()}</span>
                        </span>

                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/92 backdrop-blur-md border border-white/60 shadow-sm text-[10.5px] font-bold text-emerald-700">
                          <TrendingUp className="w-3 h-3 text-emerald-600" />
                          <span>{study.impact}</span>
                        </span>
                      </div>

                      {/* Bottom Compact Stack Strip Floating on Visual */}
                      <div className="hidden sm:flex absolute bottom-3.5 left-3.5 right-3.5 items-center justify-between gap-2 z-10">
                        <div className="flex items-center gap-1.5">
                          {study.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-full bg-[#0B132B]/75 backdrop-blur-md text-white/95 text-[10px] font-mono font-medium border border-white/15"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <span className="px-3 py-1 rounded-full bg-white/92 backdrop-blur-md text-[#0B132B] text-[10.5px] font-bold shadow-sm">
                          {study.client}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* MINIMAL EDITORIAL FOOTER */}
                  <div className="relative z-10 px-5 sm:px-7 pt-5 pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-xl sm:text-[22px] font-bold text-[#0B132B] tracking-tight leading-snug group-hover:text-[#0088CC] transition-colors">
                          {study.title}
                        </h3>
                        <p className="mt-1.5 text-xs sm:text-[13.5px] text-[#64748B] leading-relaxed line-clamp-2 max-w-xl">
                          {study.overview}
                        </p>
                      </div>
                    </div>

                    {/* Optional On-Demand Case Notes Drawer */}
                    {isExpanded && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] animate-in fade-in duration-300"
                      >
                        <div>
                          <span className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block mb-0.5">
                            Challenge
                          </span>
                          <p className="text-xs text-[#64748B] leading-snug">{study.challenge}</p>
                        </div>
                        <div className="sm:border-l sm:border-[#E2E8F0] sm:pl-3.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E2E8F0]">
                          <span className="text-[10px] font-bold text-[#0088CC] uppercase tracking-wider block mb-0.5">
                            Solution
                          </span>
                          <p className="text-xs text-[#475569] leading-snug">{study.solution}</p>
                        </div>
                      </div>
                    )}

                    {/* Clean Minimal Metrics + CTA Footer */}
                    <div className="pt-3.5 border-t border-[#E2E8F0]/80 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-4 sm:gap-6">
                        {study.stats.map((s, sIdx) => (
                          <div key={sIdx} className="flex items-baseline gap-1.5">
                            <span className="text-sm sm:text-[15px] font-extrabold text-[#0B132B] font-mono">
                              {s.value}
                            </span>
                            <span className="text-[10.5px] text-[#94A3B8] font-medium hidden sm:inline">
                              {s.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 ml-auto">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedId(isExpanded ? null : study.id);
                          }}
                          className="px-3 py-1.5 rounded-full bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] text-[11.5px] font-semibold transition-colors cursor-pointer"
                        >
                          {isExpanded ? 'Hide Notes' : 'Case Notes'}
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNav('/start-a-project');
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0B132B] hover:bg-[#0088CC] text-white text-[11.5px] font-bold transition-all duration-300 cursor-pointer group/btn shadow-xs"
                        >
                          <span>Build Similar</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* START A PROJECT CTA BANNER                                */}
        {/* ========================================================= */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-gradient-to-r from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/60 border border-[#00C4FF]/30 p-8 sm:p-12 text-center flex flex-col items-center shadow-[0_20px_50px_rgba(0,196,255,0.08)]">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            Your Next Success Story
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0B132B] tracking-tight max-w-xl leading-snug">
            Ready to build your next case study with us?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] max-w-lg mb-8 leading-relaxed">
            Partner with TAVQEN to build a scalable digital product that drives real business results.
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
