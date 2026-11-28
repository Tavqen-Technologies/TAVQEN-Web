import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Cloud,
  FolderKanban,
  Globe,
  Layers,
  Smartphone,
} from 'lucide-react';
import {
  CLIENT_PROJECTS,
  type ClientProject,
} from '../data/clientProjectsData';
import SectionHeading from '../components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

interface OurWorkPageProps {
  onNavigate?: (path: string) => void;
}

type WorkCategory = 'all' | 'Web & Mobile Platform' | 'FinTech Dashboard' | 'Healthcare Platform' | 'E-Commerce';

function resolveInitialWorkIndex(): number {
  if (typeof window === 'undefined') return 0;
  const param = new URLSearchParams(window.location.search).get('project');
  if (!param) return 0;
  const idx = CLIENT_PROJECTS.findIndex((c) => c.id === param || c.link.includes(param));
  return idx >= 0 ? idx : 0;
}

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

const HUB_SVG_W = 390;
const HUB_SVG_H = 390;
const HUB_CX = 118;
const HUB_CY = 195;
const HUB_R_ARC = 124;

export default function OurWorkPage({ onNavigate }: OurWorkPageProps) {
  const [filter, setFilter] = useState<WorkCategory>('all');
  const [activeIndex, setActiveIndex] = useState(resolveInitialWorkIndex);
  const [showAllMobilePills, setShowAllMobilePills] = useState(false);

  const pageRef = useRef<HTMLDivElement | null>(null);
  const arcRef = useRef<SVGPathElement | null>(null);
  const hubRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabDockRef = useRef<HTMLDivElement | null>(null);
  const tabPillRef = useRef<HTMLDivElement | null>(null);
  const tabBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hasInitializedPillRef = useRef(false);
  const hasAnimatedHeroRef = useRef(false);
  const prevFilterRef = useRef(filter);
  const activeIndexRef = useRef(activeIndex);
  const didInitialDeepLinkRef = useRef(false);
  const skipScrollSyncUntilRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const filterTabs = useMemo(
    () => [
      { id: 'all' as const, label: 'All Projects', icon: Layers, badge: String(CLIENT_PROJECTS.length) },
      { id: 'Web & Mobile Platform' as const, label: 'Web & Mobile', icon: Smartphone, badge: '1' },
      { id: 'FinTech Dashboard' as const, label: 'FinTech', icon: Globe, badge: '1' },
      { id: 'Healthcare Platform' as const, label: 'Healthcare', icon: Cloud, badge: '1' },
      { id: 'E-Commerce' as const, label: 'E-Commerce', icon: FolderKanban, badge: '1' },
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
    () => (filter === 'all' ? CLIENT_PROJECTS : CLIENT_PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  useEffect(() => {
    if (prevFilterRef.current !== filter) {
      prevFilterRef.current = filter;
      setActiveIndex(0);
      setShowAllMobilePills(false);
    }
  }, [filter]);

  const safeActiveIndex = Math.min(activeIndex, Math.max(0, filteredStudies.length - 1));

  const arcNodes = useMemo(() => {
    const count = filteredStudies.length;
    const totalSpan = count === 1 ? 0 : count === 2 ? 58 : 104;
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

  const arcStartDeg = arcNodes.length > 1 ? arcNodes[0].deg - 14 : -26;
  const arcEndDeg = arcNodes.length > 1 ? arcNodes[arcNodes.length - 1].deg + 14 : 26;
  const orbitalArcPath = useMemo(
    () => buildArcPath(HUB_CX, HUB_CY, HUB_R_ARC, arcStartDeg, arcEndDeg),
    [arcStartDeg, arcEndDeg]
  );

  // Smooth dashoffset math for continuous animated progress along the circular arc
  const totalArcLen = useMemo(
    () => HUB_R_ARC * (((arcEndDeg - arcStartDeg) * Math.PI) / 180),
    [arcStartDeg, arcEndDeg]
  );
  const activeNodeDeg = arcNodes[safeActiveIndex]?.deg ?? 0;
  const arcProgressFraction = useMemo(() => {
    if (arcNodes.length === 0) return 0;
    const span = Math.max(1, arcEndDeg - arcStartDeg);
    return Math.max(0.04, Math.min(1, (activeNodeDeg - arcStartDeg) / span));
  }, [arcNodes.length, arcStartDeg, arcEndDeg, activeNodeDeg]);

  const scrollToCard = useCallback(
    (idx: number) => {
      if (filteredStudies.length === 0) return;
      const clamped = Math.max(0, Math.min(filteredStudies.length - 1, idx));
      setActiveIndex(clamped);
      skipScrollSyncUntilRef.current = Date.now() + 1100;

      const target = cardRefs.current[clamped];
      if (target) {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const headerOffset =
          window.innerWidth >= 1024 ? 108 : window.innerWidth >= 640 ? 176 : 188;
        gsap.killTweensOf(window);
        const rect = target.getBoundingClientRect();
        const targetTop = Math.max(0, rect.top + window.scrollY - headerOffset);
        window.scrollTo({
          top: targetTop,
          behavior: prefersReduced ? 'auto' : 'smooth',
        });
      }
    },
    [filteredStudies.length]
  );

  // Sync sticky orbital milestone highlight while scrolling through stacked cards
  useEffect(() => {
    if (filteredStudies.length <= 1) return;

    let rafId = 0;
    const updateActiveOnScroll = () => {
      rafId = 0;
      if (Date.now() < skipScrollSyncUntilRef.current) return;

      const focusY = window.innerHeight * 0.42;
      let closestIdx = activeIndexRef.current;
      let closestDist = Infinity;

      filteredStudies.forEach((_, idx) => {
        const el = cardRefs.current[idx];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height * 0.45;
        const dist = Math.abs(cardCenter - focusY);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      });

      if (closestIdx !== activeIndexRef.current) {
        setActiveIndex(closestIdx);
      }
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateActiveOnScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [filteredStudies]);

  const handleStep = useCallback(
    (dir: -1 | 1) => {
      if (filteredStudies.length <= 1) return;
      const next = (activeIndexRef.current + dir + filteredStudies.length) % filteredStudies.length;
      scrollToCard(next);
    },
    [filteredStudies.length, scrollToCard]
  );

  // Sync deep-link ?project= to matching project card on initial mount
  useEffect(() => {
    if (didInitialDeepLinkRef.current) return;
    didInitialDeepLinkRef.current = true;

    const param =
      new URLSearchParams(window.location.search).get('project') ||
      new URLSearchParams(window.location.hash.split('?')[1] || '').get('project');
    if (param) {
      const idx = CLIENT_PROJECTS.findIndex(
        (c: ClientProject) => c.id === param || c.link.includes(param)
      );
      if (idx >= 0) {
        setActiveIndex(idx);
      }
    }
  }, []);

  // GSAP initial entrance animation for hero and orbital stage
  useEffect(() => {
    const container = pageRef.current;
    if (!container || hasAnimatedHeroRef.current) return;
    hasAnimatedHeroRef.current = true;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set('.work-radial-card, .orbital-dot, .work-hero-reveal', {
        clearProps: 'all',
        opacity: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-hero-reveal',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }
      );

      if (hubRef.current) {
        gsap.fromTo(
          hubRef.current,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          }
        );
      }

      if (arcRef.current) {
        const len = arcRef.current.getTotalLength();
        gsap.fromTo(
          arcRef.current,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 0.85, ease: 'power2.out' }
        );
      }

      gsap.fromTo(
        '.orbital-dot',
        { opacity: 0, scale: 0.4 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          stagger: 0.08,
          delay: 0.12,
          ease: 'back.out(1.6)',
          transformOrigin: 'center center',
          clearProps: 'transform,opacity',
        }
      );
    }, container);

    const refreshRaf = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(refreshRaf);
      ctx.revert();
    };
  }, []);

  // Smoothly animate visible cards / empty state when filter tab switches
  useEffect(() => {
    const cards = cardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    if (cards.length === 0) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(cards, { clearProps: 'all', opacity: 1 });
      return;
    }

    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 18, scale: 0.985 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      }
    );

    return () => {
      tween.kill();
    };
  }, [filter]);

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
    <div ref={pageRef} className="w-full pt-20 sm:pt-24 lg:pt-[10rem] pb-0 bg-[#F8FAFC] relative overflow-x-clip">
      {/* Subtle Ambient TAVQEN Radial Lighting */}
      <div
        className="absolute top-28 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[420px] sm:h-[500px] pointer-events-none opacity-30 -z-10"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0, 196, 255, 0.16) 0%, rgba(155, 227, 223, 0.12) 45%, transparent 72%)',
        }}
      />

      <div className="w-full max-w-[1180px] mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* PAGE HERO HEADER (Unified SectionHeading System)          */}
        {/* ========================================================= */}
        <SectionHeading
          as="h1"
          className="work-hero-reveal max-w-3xl mb-5 sm:mb-8"
          eyebrow="Our Work"
          title="Ideas We’ve Turned"
          highlight="Into Reality"
          description="Explore the projects we've brought to life at TAVQEN Technology. From innovative websites and mobile applications to custom software and digital solutions, each project reflects our commitment to quality, creativity, and solving real-world challenges through technology."
          itemClassName="work-hero-reveal"
          animate={false}
        />

        {/* ========================================================= */}
        {/* FILTER SEGMENTED DOCK WITH GLIDING INDICATOR              */}
        {/* ========================================================= */}
        <div className="work-hero-reveal flex justify-center mb-5 sm:mb-9">
          <div
            ref={tabDockRef}
            className="relative inline-flex max-w-full flex-wrap items-center justify-center gap-1 p-1 sm:p-1.5 rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-[0_12px_32px_rgba(15,23,42,0.05)]"
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
                  className={`relative z-10 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 md:px-6 py-1.5 sm:py-2.5 rounded-xl sm:rounded-full text-[11px] sm:text-[13px] font-semibold transition-colors duration-300 cursor-pointer select-none ${
                    isActive ? 'text-white' : 'text-[#64748B] hover:text-[#0B132B]'
                  }`}
                >
                  <TabIcon
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-[#0088CC]'
                    }`}
                  />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] sm:text-[10.5px] font-bold tabular-nums px-1.5 py-0.5 rounded-full transition-colors duration-300 ${
                      isActive ? 'bg-white/25 text-white' : 'bg-[#F1F5F9] text-[#64748B]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sticky orbital hub (desktop) & sticky compact bar (mobile) paired with stacked showcase cards */}
        <div className="block lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-14 lg:items-start mb-14 sm:mb-20">
          {/* LEFT ORBITAL COLUMN / MOBILE STICKY BAR (stays sticky until all cards finish scrolling) */}
          <div className="sticky top-[70px] sm:top-[84px] lg:top-24 lg:col-span-5 lg:self-start z-30 flex flex-col items-center w-full mb-5 sm:mb-6 lg:mb-0">
            {/* Desktop Radial Arc Stage (responsive scale on lg so zero overlap with right cards) */}
            <div className="hidden lg:block relative mx-auto w-full max-w-[345px] xl:max-w-[390px] h-[345px] xl:h-[390px] overflow-visible">
              <div
                className="relative origin-top-left scale-[0.86] xl:scale-100"
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

                  {/* Smoothly Animated Active Cyan Progress Arc via strokeDashoffset */}
                  <path
                    d={orbitalArcPath}
                    fill="none"
                    stroke="url(#workArcGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray={totalArcLen}
                    strokeDashoffset={totalArcLen * (1 - arcProgressFraction)}
                    style={{
                      transition: 'stroke-dashoffset 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
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
                          style={{ transition: 'stroke 0.35s ease' }}
                        />
                        {isActive && (
                          <>
                            <circle
                              cx={node.pos.x}
                              cy={node.pos.y}
                              r="14"
                              fill="#00C4FF"
                              fillOpacity="0.16"
                            />
                            <circle
                              cx={node.pos.x}
                              cy={node.pos.y}
                              r="10"
                              fill="none"
                              stroke="#00C4FF"
                              strokeWidth="1.5"
                              className="animate-ping"
                              style={{ transformOrigin: `${node.pos.x}px ${node.pos.y}px` }}
                            />
                          </>
                        )}
                        <circle
                          cx={node.pos.x}
                          cy={node.pos.y}
                          r={isActive ? 7 : 5.5}
                          fill="#FFFFFF"
                          stroke={isActive ? '#00C4FF' : '#0088CC'}
                          strokeWidth={isActive ? 3.5 : 2.5}
                          style={{ transition: 'all 0.3s ease' }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Circular White Center Hub */}
                <div
                  ref={hubRef}
                  className="absolute rounded-full bg-white border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.06)] flex flex-col items-center justify-center text-center px-4 py-3 z-10 overflow-hidden"
                  style={{
                    width: '200px',
                    height: '200px',
                    left: `${HUB_CX - 100}px`,
                    top: `${HUB_CY - 100}px`,
                  }}
                >
                  <div
                    className="absolute inset-2 rounded-full pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 25%, rgba(0, 212, 255, 0.10) 0%, transparent 65%)',
                    }}
                  />

                  <span className="relative z-10 px-2.5 py-0.5 rounded-full bg-[#E0F7FF] text-[#0088CC] text-[9px] font-bold uppercase tracking-wider mb-1 whitespace-nowrap">
                    Client Portfolio
                  </span>

                  <h2 className="relative z-10 text-[15px] font-bold text-[#0B132B] tracking-tight leading-snug">
                    Client Solutions
                  </h2>

                  <p className="relative z-10 text-[10.5px] text-[#64748B] mt-0.5 leading-snug max-w-[150px]">
                    Click any milestone or scroll to inspect projects.
                  </p>

                  <div className="relative z-10 mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[9.5px] font-bold text-[#0088CC] whitespace-nowrap">
                    <span>{filteredStudies.length} Client Deliverables</span>
                  </div>

                  {filteredStudies.length > 1 && (
                    <div className="relative z-10 mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleStep(-1)}
                        className="w-6 h-6 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0088CC] text-[#475569] hover:text-[#0088CC] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Previous project"
                      >
                        <ChevronLeft className="w-3 h-3" />
                      </button>
                      <span className="text-[10.5px] font-bold tabular-nums text-[#0B132B] px-1">
                        0{safeActiveIndex + 1} / 0{filteredStudies.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleStep(1)}
                        className="w-6 h-6 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0088CC] text-[#475569] hover:text-[#0088CC] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Next project"
                      >
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Clickable Milestone Labels along the Arc */}
                {arcNodes.map((node) => {
                  const isActive = node.idx === safeActiveIndex;
                  return (
                    <button
                      key={`node-label-${node.study.id}`}
                      type="button"
                      onClick={() => scrollToCard(node.idx)}
                      style={{
                        left: `${node.tail.x + 8}px`,
                        top: `${node.tail.y}px`,
                        transform: 'translateY(-50%)',
                      }}
                      className={`group/pill absolute z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-300 cursor-pointer whitespace-nowrap shadow-2xs ${
                        isActive
                          ? 'bg-white border-[#00C4FF] shadow-[0_8px_22px_rgba(0,196,255,0.22)] text-[#0B132B] scale-105'
                          : 'bg-white/95 border-[#E2E8F0] text-[#64748B] hover:text-[#0088CC] hover:border-[#00C4FF]/50 hover:bg-white'
                      }`}
                    >
                      <span className="text-[10px] font-bold tabular-nums text-[#0088CC] bg-[#E0F7FF] px-1.5 py-0.5 rounded-md">
                        0{node.idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-[#0B132B] group-hover/pill:text-[#0088CC] transition-colors max-w-[140px] xl:max-w-[175px] truncate">
                        {node.study.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile / Tablet Simple Sticky Selector (< lg) — stays pinned until all cards finish scrolling */}
            {(() => {
              const MOBILE_VISIBLE_LIMIT = 3;
              const hasOverflow = filteredStudies.length > MOBILE_VISIBLE_LIMIT;
              const visibleMobileStudies =
                showAllMobilePills || !hasOverflow
                  ? filteredStudies.map((study, idx) => ({ study, idx }))
                  : [
                      ...filteredStudies
                        .slice(0, MOBILE_VISIBLE_LIMIT)
                        .map((study, idx) => ({ study, idx })),
                      ...(safeActiveIndex >= MOBILE_VISIBLE_LIMIT
                        ? [{ study: filteredStudies[safeActiveIndex], idx: safeActiveIndex }]
                        : []),
                    ];

              const hiddenCount = Math.max(
                0,
                filteredStudies.length - visibleMobileStudies.length
              );

              return (
                <div className="lg:hidden w-full rounded-2xl bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-[0_10px_24px_rgba(15,23,42,0.07)] px-3 py-2 sm:px-3.5 sm:py-2.5">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-[#00C4FF] shrink-0" />
                      <span className="text-[11.5px] sm:text-xs font-bold text-[#0B132B] truncate">
                        Client Projects &; Deliverables
                      </span>
                    </div>

                    {filteredStudies.length > 1 ? (
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleStep(-1)}
                          className="w-6 h-6 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0088CC] text-[#475569] hover:text-[#0088CC] flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Previous item"
                        >
                          <ChevronLeft className="w-3 h-3" />
                        </button>
                        <span className="text-[11px] font-bold tabular-nums text-[#0088CC] px-1">
                          {String(safeActiveIndex + 1).padStart(2, '0')} /{' '}
                          {String(filteredStudies.length).padStart(2, '0')}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleStep(1)}
                          className="w-6 h-6 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0088CC] text-[#475569] hover:text-[#0088CC] flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Next item"
                        >
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] font-bold tabular-nums text-[#0088CC] shrink-0">
                        {filteredStudies.length > 0 ? '01 / 01' : '0 / 0'}
                      </span>
                    )}
                  </div>

                  {filteredStudies.length > 0 && (
                    <div
                      className={`grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 ${
                        showAllMobilePills && hasOverflow ? 'max-h-40 overflow-y-auto pr-0.5' : ''
                      }`}
                    >
                      {visibleMobileStudies.map(({ study, idx }) => {
                        const isActive = idx === safeActiveIndex;
                        return (
                          <button
                            key={study.id}
                            type="button"
                            onClick={() => {
                              setShowAllMobilePills(false);
                              scrollToCard(idx);
                            }}
                            className={`px-2.5 py-1.5 rounded-lg border text-left transition-all duration-200 cursor-pointer flex items-center gap-1.5 min-w-0 ${
                              isActive
                                ? 'bg-[#F0F9FF] border-[#00C4FF] text-[#0B132B]'
                                : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:border-[#00C4FF]/40'
                            }`}
                          >
                            <span className="text-[10px] sm:text-[10.5px] font-bold tabular-nums text-[#0088CC] shrink-0">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[11px] font-semibold truncate">
                              {study.shortTitle}
                            </span>
                          </button>
                        );
                      })}

                      {hasOverflow && (
                        <button
                          type="button"
                          onClick={() => setShowAllMobilePills((prev) => !prev)}
                          className="px-2.5 py-1.5 rounded-lg border border-dashed border-[#0088CC]/45 bg-[#F8FAFC] hover:bg-[#F0F9FF] text-[#0088CC] text-[11px] font-bold transition-colors cursor-pointer col-span-2 sm:col-span-3 justify-center flex items-center"
                        >
                          {showAllMobilePills
                            ? 'Show Less'
                            : `+${hiddenCount} More (${filteredStudies.length})`}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* RIGHT STACKED COLUMN: All Client Deliverables */}
          <div className="lg:col-span-7 min-w-0">
            {filteredStudies.length > 0 ? (
              <div className="space-y-5 sm:space-y-8 lg:space-y-9">
                {filteredStudies.map((project, idx) => {
                  const isActive = idx === safeActiveIndex;
                  return (
                    <div
                      key={project.id}
                      ref={(el) => {
                        cardRefs.current[idx] = el;
                      }}
                      onClick={() => handleNav(project.link)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleNav(project.link);
                        }
                      }}
                      className={`work-radial-card scroll-mt-[192px] sm:scroll-mt-[178px] lg:scroll-mt-28 group relative rounded-[20px] sm:rounded-[26px] bg-white border transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-1 ${project.accentBorderHover} ${
                        isActive
                          ? 'border-[#00C4FF]/85 shadow-[0_18px_45px_rgba(0,196,255,0.16)]'
                          : 'border-[#E2E8F0] shadow-[0_8px_26px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_40px_rgba(0,196,255,0.12)]'
                      }`}
                    >
                      {/* Hover Ambient Glow */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: project.glowGradient }}
                      />

                      {/* Top Active Highlight Hairline */}
                      <div
                        className={`absolute top-0 left-6 right-6 sm:left-10 sm:right-10 h-[2px] bg-gradient-to-r from-transparent via-[#00C4FF]/85 to-transparent pointer-events-none z-20 transition-opacity duration-500 ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                        }`}
                      />

                      {/* HERO VISUAL STAGE */}
                      <div className="relative p-2 sm:p-3 pb-0">
                        <div className="relative w-full h-[165px] sm:h-[215px] xl:h-[245px] rounded-[14px] sm:rounded-[20px] overflow-hidden border border-[#E2E8F0]/80 bg-gradient-to-br from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/50 p-1.5 sm:p-2.5 flex items-center justify-center">
                          {/* Tech Blueprint Micro-Grid Pattern */}
                          <div
                            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay z-0"
                            style={{
                              backgroundImage:
                                'radial-gradient(circle, #0088CC 0.75px, transparent 0.75px)',
                              backgroundSize: '12px 12px',
                            }}
                          />

                          {/* Viewfinder Micro Corner Cyber Accents */}
                          <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00C4FF]/50 rounded-tr-[3px] pointer-events-none z-20" />
                          <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00C4FF]/50 rounded-br-[3px] pointer-events-none z-20" />

                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover object-top group-hover:scale-[1.025] transition-transform duration-700 ease-out relative z-10 rounded-[10px] sm:rounded-[12px]"
                          />

                          {/* Top Floating Number Badge */}
                          <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-20 pointer-events-none max-w-[calc(100%-1rem)]">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-2xs text-[9px] sm:text-[10px] font-bold text-[#0B132B] uppercase tracking-wider max-w-full">
                              <span className="relative flex h-1.5 w-1.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C4FF] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00C4FF]"></span>
                              </span>
                              <span className="text-[#0088CC] tabular-nums shrink-0">
                                {project.number}
                              </span>
                              <span className="text-[#CBD5E1] shrink-0">·</span>
                              <span className={`${project.eyebrowColor} truncate`}>
                                {project.category}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* REFINED EDITORIAL FOOTER */}
                      <div className="relative z-10 px-3.5 sm:px-5 pt-3 sm:pt-3.5 pb-3.5 sm:pb-4">
                        {/* CATEGORY EYEBROW */}
                        <div className="mb-1">
                          <span
                            className={`text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.1em] ${project.eyebrowColor}`}
                          >
                            {project.category}
                          </span>
                        </div>

                        {/* PROJECT TITLE */}
                        <h3 className="text-[15px] sm:text-lg lg:text-xl font-bold text-[#0B132B] tracking-tight leading-snug group-hover:text-[#0088CC] transition-colors">
                          {project.title}
                        </h3>

                        {/* SHORT DESCRIPTION */}
                        <p className="mt-1 text-xs sm:text-[13px] text-[#64748B] leading-relaxed line-clamp-2">
                          {project.description}
                        </p>

                        {/* TECH STACK BADGES */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-2.5 sm:mt-3">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 sm:px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#0088CC] border border-[#00C4FF]/25 text-[10px] sm:text-[10.5px] font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* CLEAN BOTTOM ROW: 01 / 04 and View Project → */}
                        <div className="pt-3 mt-3 sm:mt-3.5 border-t border-[#E2E8F0]/80 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-bold tabular-nums text-[#64748B]">
                            {project.number}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNav(project.link);
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0B132B] hover:bg-[#0088CC] text-white text-[11.5px] sm:text-xs font-bold transition-all duration-300 cursor-pointer group/btn shadow-xs"
                          >
                            <span>{project.buttonText}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                ref={(el) => {
                  cardRefs.current = el ? [el] : [];
                }}
                className="work-radial-card relative rounded-[20px] sm:rounded-[30px] bg-white border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-6 sm:p-12 text-center overflow-hidden"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mx-auto mb-4">
                  <FolderKanban className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-[#0B132B] tracking-tight">
                  No Projects In This Category
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
                  Switch back to All Projects to explore all verified client deliverables.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFilter('all')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B132B] hover:bg-[#0088CC] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>View All Projects ({CLIENT_PROJECTS.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* NEXT STEP: TAVQEN LIGHT ARCHITECTURAL GRID CTA SECTION    */}
      {/* ========================================================= */}
      <section className="relative bg-gradient-to-br from-white via-[#F4FAFF] to-[#E6F7FF]/80 border-t border-[#E2E8F0] overflow-hidden">
        {/* Subtle Architectural Grid Pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0, 136, 204, 0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 136, 204, 0.055) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        {/* Soft TAVQEN Cyan Radial Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 46% 68% at 14% 58%, rgba(0, 212, 255, 0.14), rgba(155, 227, 223, 0.12) 42%, transparent 72%)',
          }}
        />

        <div className="relative z-10 w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-7 md:gap-10">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mb-3 sm:mb-4">
                Next Step
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-[-0.025em] text-[#0B132B] leading-[1.08]">
                Have a
                <br />
                project{' '}
                <span className="italic font-bold bg-gradient-to-r from-[#00C4FF] to-[#0088CC] bg-clip-text text-transparent pr-1">
                  in mind?
                </span>
              </h2>
              <p className="mt-3.5 sm:mt-5 text-xs sm:text-[15.5px] text-[#64748B] max-w-sm leading-relaxed">
                Tell us what you{"'"}re building and we{"'"}ll tell you how we{"'"}d build it.
              </p>
            </div>

            <div className="w-full sm:w-auto shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => handleNav('/start-a-project')}
                className="w-full sm:w-auto justify-between sm:justify-start inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] text-sm font-semibold shadow-[0_12px_30px_rgba(0,136,204,0.10)] hover:border-[#00C4FF] hover:shadow-[0_16px_38px_rgba(0,196,255,0.22)] hover:scale-[1.02] active:scale-95 transition-all duration-300 group cursor-pointer"
              >
                <span>Start a project</span>
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0088CC] text-white flex items-center justify-center shadow-[0_6px_18px_rgba(0,196,255,0.35)] shrink-0">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}