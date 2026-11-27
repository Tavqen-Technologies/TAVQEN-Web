import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderKanban,
  Layers,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import {
  getProductById,
  TAVQEN_PRODUCTS,
  type ProductGalleryItem,
} from '../data/productsData';

gsap.registerPlugin(ScrollTrigger);

interface OurWorkPageProps {
  onNavigate?: (path: string) => void;
}

interface CaseStudy {
  id: string;
  number: string;
  itemKind: 'product' | 'project';
  targetRoute: string;
  actionLabel: string;
  notesLabel: string;
  categoryLabel: string;
  shortTitle: string;
  title: string;
  badgeText: string;
  impact: string;
  overview: string;
  challenge: string;
  solution: string;
  capabilities: string[];
  image: string;
  alt: string;
  gallery?: ProductGalleryItem[];
  icon: typeof FileText;
  stats: { label: string; value: string }[];
}

const PRODUCT_NOTES: Record<
  string,
  { focus: string; architecture: string; capabilities: string[]; impact: string }
> = {
  pdf: {
    focus:
      'Everyday document workflows—merging files, splitting page ranges, converting images, and shrinking oversized PDFs—often require switching across cluttered apps.',
    architecture:
      'Built an integrated Android workspace with 22+ organized PDF utilities and quick Home tool search inside one clean interface.',
    capabilities: ['Merge & Split PDF', 'Images ↔ PDF', 'Compress PDF'],
    impact: '22+ PDF Tools · Available',
  },
  player: {
    focus:
      'Playing locally stored videos on mobile should stay straightforward and private—without forced accounts, cloud syncing, or losing playback position.',
    architecture:
      'Engineered on-device folder and title search, Continue Watching auto-resume, customizable 10s seek and speed presets, plus dark/system themes.',
    capabilities: ['Continue Watching', '10s Seek · Speed', 'On-Device Search'],
    impact: 'On-Device Playback · v1.0',
  },
  imagetool: {
    focus:
      'Preparing everyday images—resizing dimensions, converting formats, and balancing file size—should not require opening complex desktop design software.',
    architecture:
      'Currently in active development as a streamlined utility for preset resizing, PNG/JPG/WebP conversion, and readable file compression.',
    capabilities: ['Dimension Resize', 'PNG / JPG / WebP', 'Smart Compression'],
    impact: 'In Active Development',
  },
};

const CASE_STUDIES: CaseStudy[] = TAVQEN_PRODUCTS.map((product, idx) => {
  const notes = PRODUCT_NOTES[product.id] ?? {
    focus: product.flowDescription,
    architecture: product.overview,
    capabilities: product.features.slice(0, 3).map((f) => f.title),
    impact: product.status,
  };

  return {
    id: product.id,
    number: `0${idx + 1}`,
    itemKind: 'product',
    targetRoute: `/product?id=${product.id}`,
    actionLabel: 'View Product',
    notesLabel: 'Product Notes',
    categoryLabel: product.categoryLabel,
    shortTitle: product.name,
    title: `${product.name} — ${product.tagline}`,
    badgeText: `${product.version} · ${product.platforms[0] ?? 'Cross-Platform'}`,
    impact: notes.impact,
    overview: product.overview,
    challenge: notes.focus,
    solution: notes.architecture,
    capabilities: notes.capabilities,
    image: product.image,
    alt: product.alt,
    gallery: product.gallery ?? [],
    icon: product.icon,
    stats: product.stats,
  };
});

// Real client projects will be listed here once published
const PROJECT_STUDIES: CaseStudy[] = [];

function resolveInitialWorkIndex(): number {
  if (typeof window === 'undefined') return 0;
  const param = new URLSearchParams(window.location.search).get('project');
  if (!param) return 0;
  const resolved = getProductById(param).id;
  const idx = CASE_STUDIES.findIndex((c) => c.id === resolved);
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

const HUB_SVG_W = 450;
const HUB_SVG_H = 430;
const HUB_CX = 148;
const HUB_CY = 215;
const HUB_R_ARC = 150;

export default function OurWorkPage({ onNavigate }: OurWorkPageProps) {
  const [filter, setFilter] = useState<'product' | 'project'>('product');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(resolveInitialWorkIndex);
  const [showAllMobilePills, setShowAllMobilePills] = useState(false);
  const [selectedShotMap, setSelectedShotMap] = useState<Record<string, number>>({});

  const pageRef = useRef<HTMLDivElement | null>(null);
  const galleryRowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const galleryBtnRefs = useRef<Record<string, (HTMLButtonElement | null)[]>>({});
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
      { id: 'product' as const, label: 'Product', icon: Layers, badge: String(CASE_STUDIES.length) },
      { id: 'project' as const, label: 'Project', icon: FolderKanban, badge: String(PROJECT_STUDIES.length) },
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
    () => (filter === 'product' ? CASE_STUDIES : PROJECT_STUDIES),
    [filter]
  );

  useEffect(() => {
    if (prevFilterRef.current !== filter) {
      prevFilterRef.current = filter;
      setActiveIndex(0);
      setExpandedId(null);
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
        const headerOffset = window.innerWidth >= 1024 ? 108 : 174;
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

  // Sync deep-link ?project= to matching product card on initial mount
  useEffect(() => {
    if (didInitialDeepLinkRef.current) return;
    didInitialDeepLinkRef.current = true;

    const param =
      new URLSearchParams(window.location.search).get('project') ||
      new URLSearchParams(window.location.hash.split('?')[1] || '').get('project');
    if (param) {
      const resolved = getProductById(param).id;
      const idx = CASE_STUDIES.findIndex((c) => c.id === resolved);
      if (idx >= 0) {
        setFilter('product');
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
    <div ref={pageRef} className="pt-24 sm:pt-28 pb-0 bg-[#F8FAFC] relative overflow-x-clip">
      {/* Subtle Ambient TAVQEN Radial Lighting */}
      <div
        className="absolute top-28 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[500px] pointer-events-none opacity-30 -z-10"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0, 196, 255, 0.16) 0%, rgba(155, 227, 223, 0.12) 45%, transparent 72%)',
        }}
      />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* PAGE HERO HEADER                                          */}
        {/* ========================================================= */}
        <div className="work-hero-reveal text-center max-w-3xl mx-auto px-1 sm:px-0 mb-4 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-[10.5px] sm:text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-3">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Our Work</span>
          </span>
          <h1 className="text-[24px] sm:text-5xl md:text-[52px] font-semibold tracking-[-0.025em] text-[#0B132B] leading-[1.15] sm:leading-[1.12]">
            Ideas We’ve Turned{' '}
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#0088CC] bg-clip-text text-transparent font-bold">
              Into Reality
            </span>
          </h1>
          <p className="mt-2.5 sm:mt-4 text-[12.5px] sm:text-[16.5px] text-[#64748B] font-normal leading-[1.55] sm:leading-relaxed max-w-[340px] sm:max-w-2xl mx-auto">
            Explore the projects we&apos;ve brought to life at TAVQEN Technology. From innovative websites and mobile applications to custom software and digital solutions, each project reflects our commitment to quality, creativity, and solving real-world challenges through technology.
          </p>
        </div>

        {/* ========================================================= */}
        {/* FILTER SEGMENTED DOCK WITH GLIDING INDICATOR              */}
        {/* ========================================================= */}
        <div className="work-hero-reveal flex justify-center mb-5 sm:mb-9">
          <div
            ref={tabDockRef}
            className="relative inline-flex max-w-full flex-wrap items-center justify-center gap-1 p-1 sm:p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-[0_12px_32px_rgba(15,23,42,0.05)]"
          >
            <div
              ref={tabPillRef}
              aria-hidden="true"
              className="absolute top-0 left-0 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] shadow-[0_6px_18px_rgba(0,196,255,0.32)] pointer-events-none"
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
                  className={`relative z-10 inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold transition-colors duration-300 cursor-pointer select-none ${isActive
                    ? 'text-white'
                    : 'text-[#64748B] hover:text-[#0B132B]'
                    }`}
                >
                  <TabIcon
                    className={`w-3.5 h-3.5 transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#0088CC]'
                      }`}
                  />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10.5px] font-bold tabular-nums px-1.5 py-0.5 rounded-full transition-colors duration-300 ${isActive
                      ? 'bg-white/25 text-white'
                      : 'bg-[#F1F5F9] text-[#64748B]'
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
        <div className="block lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-10 lg:items-start mb-10 sm:mb-12">
          {/* LEFT ORBITAL COLUMN / MOBILE STICKY BAR (stays sticky until all cards finish scrolling) */}
          <div className="sticky top-[74px] sm:top-[84px] lg:top-24 lg:col-span-5 lg:self-start z-30 flex flex-col items-center w-full mb-5 lg:mb-0">
            {/* Desktop Radial Arc Stage (compact scale on 1024px–1279px laptops to avoid overlapping right cards) */}
            <div className="hidden lg:block relative mx-auto w-[364px] h-[350px] xl:w-[450px] xl:h-[430px] overflow-visible">
              <div
                className="relative lg:scale-[0.80] xl:scale-100 origin-top-left"
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

                {/* Circular White Center Hub (clean spacing so text never clips) */}
                <div
                  ref={hubRef}
                  className="absolute rounded-full bg-white border border-[#E2E8F0] shadow-[0_24px_65px_rgba(15,23,42,0.08)] flex flex-col items-center justify-center text-center px-5 py-4 z-10 overflow-hidden"
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

                  <span className="relative z-10 px-2.5 py-0.5 rounded-full bg-[#E0F7FF] text-[#0088CC] text-[9.5px] font-bold uppercase tracking-wider mb-1.5 whitespace-nowrap">
                    TAVQEN Studio
                  </span>

                  <h2 className="relative z-10 text-[16px] font-bold text-[#0B132B] tracking-tight leading-snug">
                    {filter === 'product' ? 'Our Real Products' : 'Client Projects'}
                  </h2>

                  <p className="relative z-10 text-[11px] text-[#64748B] mt-1 leading-snug max-w-[168px]">
                    {filter === 'product'
                      ? 'Click any milestone or scroll to inspect each build.'
                      : 'Real client project showcases will be added soon.'}
                  </p>

                  <div className="relative z-10 mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-bold text-[#0088CC] whitespace-nowrap">
                    <span>
                      {filter === 'product'
                        ? `${CASE_STUDIES.length} In-House Builds`
                        : '0 Projects Published'}
                    </span>
                  </div>

                  {filteredStudies.length > 1 && (
                    <div className="relative z-10 mt-2.5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleStep(-1)}
                        className="w-6 h-6 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0088CC] text-[#475569] hover:text-[#0088CC] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Previous project"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] font-bold tabular-nums text-[#0B132B] px-1">
                        0{safeActiveIndex + 1} / 0{filteredStudies.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleStep(1)}
                        className="w-6 h-6 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0088CC] text-[#475569] hover:text-[#0088CC] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Next project"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Clickable 01..03 Milestone Labels along the Arc (click focuses/scrolls to project card) */}
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
                      className={`group/pill absolute z-20 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all duration-300 cursor-pointer whitespace-nowrap ${isActive
                        ? 'bg-white border-[#00C4FF] shadow-[0_10px_24px_rgba(0,196,255,0.18)] text-[#0B132B] scale-105'
                        : 'bg-white/90 border-[#E2E8F0]/90 text-[#64748B] hover:text-[#0088CC] hover:border-[#00C4FF]/45 hover:bg-white'
                        }`}
                    >
                      <span className="text-[11px] font-bold tabular-nums text-[#0088CC]">
                        {node.study.number}
                      </span>
                      <span className="text-xs font-semibold">{node.study.shortTitle}</span>
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
                        <span className="text-xs font-bold text-[#0B132B] truncate">
                          {filter === 'product' ? 'Our Real Products' : 'Client Projects'}
                        </span>
                      </div>

                      {filteredStudies.length > 1 ? (
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleStep(-1)}
                            className="w-5 h-5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0088CC] text-[#475569] hover:text-[#0088CC] flex items-center justify-center transition-colors cursor-pointer"
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
                            className="w-5 h-5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0088CC] text-[#475569] hover:text-[#0088CC] flex items-center justify-center transition-colors cursor-pointer"
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
                        className={`flex flex-wrap gap-1.5 sm:grid sm:grid-cols-3 sm:gap-2 ${
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
                              className={`px-2.5 py-1.5 rounded-lg border text-left transition-all duration-200 cursor-pointer flex items-center gap-1.5 max-w-full ${isActive
                                ? 'bg-[#F0F9FF] border-[#00C4FF] text-[#0B132B]'
                                : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:border-[#00C4FF]/40'
                                }`}
                            >
                              <span className="text-[10.5px] font-bold tabular-nums text-[#0088CC] shrink-0">
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
                            className="px-2.5 py-1.5 rounded-lg border border-dashed border-[#0088CC]/45 bg-[#F8FAFC] hover:bg-[#F0F9FF] text-[#0088CC] text-[11px] font-bold transition-colors cursor-pointer sm:col-span-3 justify-center flex items-center"
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

            {/* RIGHT STACKED COLUMN: All Real Products (or Honest Empty State for Projects) */}
            <div className="lg:col-span-7 min-w-0">
              {filteredStudies.length > 0 ? (
                <div className="space-y-5 sm:space-y-6 lg:space-y-7">
                  {filteredStudies.map((study, idx) => {
                    const isActive = idx === safeActiveIndex;
                    const isExpanded = expandedId === study.id;
                    const gallery = study.gallery ?? [];
                    const shotIdx = selectedShotMap[study.id] ?? 0;
                    const activeShot = gallery[shotIdx];
                    const displayImg = activeShot?.image ?? study.image;
                    return (
                      <div
                        key={`${study.itemKind}-${study.id}`}
                        ref={(el) => {
                          cardRefs.current[idx] = el;
                        }}
                        onClick={() => handleNav(study.targetRoute)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleNav(study.targetRoute);
                          }
                        }}
                        className={`work-radial-card scroll-mt-[176px] lg:scroll-mt-28 group relative rounded-[20px] sm:rounded-[26px] bg-white border transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-1 ${isActive
                          ? 'border-[#00C4FF]/80 shadow-[0_20px_50px_rgba(0,196,255,0.14)]'
                          : 'border-[#E2E8F0] shadow-[0_12px_32px_rgba(15,23,42,0.05)] hover:border-[#00C4FF]/55 hover:shadow-[0_18px_42px_rgba(0,196,255,0.10)]'
                          }`}
                      >
                        {/* Top Active Highlight Hairline */}
                        <div
                          className={`absolute top-0 left-8 right-8 sm:left-10 sm:right-10 h-[2px] bg-gradient-to-r from-transparent via-[#00C4FF]/85 to-transparent pointer-events-none z-20 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                            }`}
                        />

                        {/* COMPACT HERO VISUAL STAGE (uncropped object-contain for full product clarity) */}
                        <div className="relative p-2 sm:p-3 pb-0">
                          <div className="relative w-full h-[175px] sm:h-[220px] xl:h-[245px] rounded-[16px] sm:rounded-[20px] overflow-hidden border border-[#E2E8F0]/80 bg-gradient-to-br from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/55 p-2.5 sm:p-3 pt-9 sm:pt-3 flex items-center justify-center">
                            <img
                              src={displayImg}
                              alt={activeShot ? `${study.shortTitle} — ${activeShot.title}` : study.alt}
                              className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                            />

                            {/* Top Floating Glass Badges */}
                            <div className="absolute top-2 left-2 right-2 sm:top-2.5 sm:left-2.5 sm:right-2.5 flex flex-wrap items-center justify-between gap-1.5 z-10 pointer-events-none">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-sm text-[9px] sm:text-[10px] font-bold text-[#0B132B] uppercase tracking-wider">
                                <span className="text-[#0088CC] tabular-nums">{study.number}</span>
                                <span className="text-[#CBD5E1]">·</span>
                                <span>{study.categoryLabel}</span>
                              </span>

                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-sm text-[9px] sm:text-[10px] font-bold text-[#0088CC]">
                                <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0088CC]" />
                                <span>{study.impact}</span>
                              </span>
                            </div>
                          </div>

                          {/* Interactive App Screen Gallery Strip with Left / Right Controls */}
                          {gallery.length > 1 && (() => {
                            const selectCardShot = (nextIdx: number) => {
                              const wrapped = (nextIdx + gallery.length) % gallery.length;
                              setSelectedShotMap((prev) => ({ ...prev, [study.id]: wrapped }));
                              const row = galleryRowRefs.current[study.id];
                              const btn = galleryBtnRefs.current[study.id]?.[wrapped];
                              if (row && btn) {
                                const rowRect = row.getBoundingClientRect();
                                const btnRect = btn.getBoundingClientRect();
                                const targetLeft =
                                  row.scrollLeft +
                                  (btnRect.left - rowRect.left) -
                                  (row.clientWidth - btnRect.width) / 2;
                                row.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
                              }
                            };

                            return (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="mt-2 flex items-center gap-1.5"
                              >
                                <button
                                  type="button"
                                  onClick={() => selectCardShot(shotIdx - 1)}
                                  className="w-7 h-7 rounded-full border border-[#E2E8F0] bg-white hover:border-[#0088CC] hover:text-[#0088CC] text-[#475569] shadow-2xs flex items-center justify-center shrink-0 transition-all active:scale-95 cursor-pointer"
                                  aria-label={`Previous ${study.shortTitle} screen`}
                                >
                                  <ChevronLeft className="w-3.5 h-3.5" />
                                </button>

                                <div
                                  ref={(el) => {
                                    galleryRowRefs.current[study.id] = el;
                                  }}
                                  className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5"
                                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                  {gallery.map((shot, gIdx) => {
                                    const isShotSelected = gIdx === shotIdx;
                                    return (
                                      <button
                                        key={shot.title}
                                        ref={(el) => {
                                          if (!galleryBtnRefs.current[study.id]) {
                                            galleryBtnRefs.current[study.id] = [];
                                          }
                                          galleryBtnRefs.current[study.id][gIdx] = el;
                                        }}
                                        type="button"
                                        onClick={() => selectCardShot(gIdx)}
                                        className={`shrink-0 flex items-center gap-1.5 p-0.5 pr-2 rounded-lg border text-left transition-all cursor-pointer ${isShotSelected
                                          ? 'bg-[#F0F9FF] border-[#00C4FF] shadow-[0_3px_10px_rgba(0,196,255,0.16)] text-[#0B132B]'
                                          : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#00C4FF]/50 hover:text-[#0B132B]'
                                          }`}
                                      >
                                        <div className="w-6 h-6 rounded-md bg-[#F8FAFC] border border-[#E2E8F0]/70 overflow-hidden flex items-center justify-center shrink-0">
                                          <img
                                            src={shot.image}
                                            alt={shot.title}
                                            className="w-full h-full object-contain"
                                          />
                                        </div>
                                        <span className="text-[10px] font-semibold whitespace-nowrap">
                                          {shot.title}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => selectCardShot(shotIdx + 1)}
                                  className="w-7 h-7 rounded-full border border-[#E2E8F0] bg-white hover:border-[#0088CC] hover:text-[#0088CC] text-[#475569] shadow-2xs flex items-center justify-center shrink-0 transition-all active:scale-95 cursor-pointer"
                                  aria-label={`Next ${study.shortTitle} screen`}
                                >
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            );
                          })()}
                        </div>

                        {/* COMPACT EDITORIAL FOOTER */}
                        <div className="relative z-10 px-3.5 sm:px-5 pt-2.5 sm:pt-3 pb-3.5 sm:pb-4">
                          <div className="flex flex-wrap items-center gap-1.5 mb-2">
                            {study.capabilities.map((cap) => (
                              <span
                                key={cap}
                                className="px-2 py-0.5 rounded-full bg-[#F0F9FF] text-[#0088CC] border border-[#00C4FF]/25 text-[9.5px] sm:text-[10px] font-semibold"
                              >
                                {cap}
                              </span>
                            ))}
                            <span className="w-full sm:w-auto sm:ml-auto text-[10.5px] font-semibold text-[#64748B] pt-0.5 sm:pt-0">
                              {study.badgeText}
                            </span>
                          </div>

                          <div className="mb-2.5 sm:mb-3">
                            <h3 className="text-base sm:text-[18.5px] font-bold text-[#0B132B] tracking-tight leading-snug group-hover:text-[#0088CC] transition-colors">
                              {study.title}
                            </h3>
                            <p className="mt-1 text-[11.5px] sm:text-[12.5px] text-[#64748B] leading-snug line-clamp-2">
                              {study.overview}
                            </p>
                          </div>

                          {/* Optional On-Demand Notes Drawer */}
                          {isExpanded && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]"
                            >
                              <div>
                                <span className="text-[9.5px] font-bold text-[#0B132B] uppercase tracking-wider block mb-0.5">
                                  Practical Need
                                </span>
                                <p className="text-[11px] text-[#64748B] leading-snug">{study.challenge}</p>
                              </div>
                              <div className="sm:border-l sm:border-[#E2E8F0] sm:pl-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E2E8F0]">
                                <span className="text-[9.5px] font-bold text-[#0088CC] uppercase tracking-wider block mb-0.5">
                                  Built Solution
                                </span>
                                <p className="text-[11px] text-[#475569] leading-snug">{study.solution}</p>
                              </div>
                            </div>
                          )}

                          {/* Clean Minimal Metrics + CTA Footer */}
                          <div className="pt-2.5 border-t border-[#E2E8F0]/80 flex flex-col sm:flex-row flex-wrap sm:items-center justify-between gap-2.5">
                            <div className="grid grid-cols-3 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-1.5">
                              {study.stats.map((s, sIdx) => (
                                <div key={sIdx} className="flex flex-col leading-tight">
                                  <span className="text-xs sm:text-sm font-bold text-[#0B132B] tabular-nums">
                                    {s.value}
                                  </span>
                                  <span className="mt-0.5 text-[9.5px] sm:text-[10px] text-[#64748B] font-medium">
                                    {s.label}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 w-full sm:w-auto sm:ml-auto">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedId(isExpanded ? null : study.id);
                                }}
                                className="px-2.5 py-1 rounded-full bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] text-[11px] font-semibold transition-colors cursor-pointer"
                              >
                                {isExpanded ? 'Hide Notes' : study.notesLabel}
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNav(study.targetRoute);
                                }}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0B132B] hover:bg-[#0088CC] text-white text-[11px] font-bold transition-all duration-300 cursor-pointer group/btn shadow-xs"
                              >
                                <span>{study.actionLabel}</span>
                                <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                              </button>
                            </div>
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
                  className="work-radial-card relative rounded-[22px] sm:rounded-[30px] bg-white border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-6 sm:p-12 text-center overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mx-auto mb-4">
                    <FolderKanban className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-[#0B132B] tracking-tight">
                    No Client Projects Published Yet
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
                    We only showcase real, verified work here. Verified client project case studies will be added soon—meanwhile, explore our 3 real products.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFilter('product')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B132B] hover:bg-[#0088CC] text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      <span>Explore Real Products ({CASE_STUDIES.length})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNav('/contact')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F8FAFC] hover:bg-[#F0F9FF] border border-[#E2E8F0] hover:border-[#00C4FF]/40 text-[#0B132B] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>Start a Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#0088CC]" />
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-7 md:gap-10">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-[11px] font-bold uppercase tracking-[0.2em] mb-3 sm:mb-4">
                Next Step
              </span>
              <h2 className="text-[32px] sm:text-5xl lg:text-[54px] font-semibold tracking-[-0.025em] text-[#0B132B] leading-[1.06]">
                Have a
                <br />
                project{' '}
                <span className="italic font-bold bg-gradient-to-r from-[#00C4FF] to-[#0088CC] bg-clip-text text-transparent pr-1">
                  in mind?
                </span>
              </h2>
              <p className="mt-4 sm:mt-5 text-sm sm:text-[15.5px] text-[#64748B] max-w-sm leading-relaxed">
                Tell us what you&apos;re building and we&apos;ll tell you how we&apos;d build it.
              </p>
            </div>

            <div className="shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => handleNav('/start-a-project')}
                className="inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] text-sm font-semibold shadow-[0_12px_30px_rgba(0,136,204,0.10)] hover:border-[#00C4FF] hover:shadow-[0_16px_38px_rgba(0,196,255,0.22)] hover:scale-[1.02] active:scale-95 transition-all duration-300 group cursor-pointer"
              >
                <span>Start a project</span>
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0088CC] text-white flex items-center justify-center shadow-[0_6px_18px_rgba(0,196,255,0.35)]">
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
