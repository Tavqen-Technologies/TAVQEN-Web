import { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Globe,
  Layers,
  Play,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';

import tavqenPdfShowcase from '../assits/pdf-showcase/showcase-5.png';
import vPlayerShowcase from '../assits/pdf-showcase/showcase-6.png';
import cloudSaasShowcase from '../assits/pdf-showcase/showcase-3.png';
import gramsetuShowcase from '../assits/products/product3.webp';

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
  tiltClass: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'tavqen-pdf',
    number: '01',
    category: 'mobile',
    categoryLabel: 'Mobile App · Productivity',
    shortTitle: 'TAVQEN PDF',
    title: 'TAVQEN PDF — Smart PDF Solution',
    client: 'TAVQEN Flagship Product',
    impact: '300 DPI Smart OCR',
    overview:
      'All-in-one mobile PDF studio to scan, merge, split, compress, e-sign, and sync documents securely.',
    challenge:
      'Slow PDF apps, poor low-light OCR accuracy, and fragmented document sync.',
    solution:
      'On-device edge scanner with 22+ smart PDF tools, OCR pipelines, and AES-256 vault.',
    technologies: ['React Native', 'TypeScript', 'Smart OCR', 'AES-256 Vault'],
    image: tavqenPdfShowcase,
    icon: FileText,
    stats: [
      { label: 'Export Quality', value: '300 DPI' },
      { label: 'Scan Speed', value: '0.4s' },
      { label: 'Encryption', value: 'AES-256' },
    ],
    tiltClass: 'lg:rotate-[2deg]',
  },
  {
    id: 'gramsetu',
    number: '02',
    category: 'web',
    categoryLabel: 'Web Platform · Civic Tech',
    shortTitle: 'GramSetu',
    title: 'GramSetu — Digital Governance Portal',
    client: 'TAVQEN Civic Initiative',
    impact: '100% Digital Records',
    overview:
      'Offline-first civic platform connecting villages and citizens with live grievance tracking and welfare access.',
    challenge:
      'Low-connectivity areas faced delayed grievance tracking and scattered records.',
    solution:
      'Offline-first Next.js & SQLite architecture with voice-first local dialect support.',
    technologies: ['Next.js 14', 'SQLite Sync', 'FastAPI', 'PostgreSQL'],
    image: gramsetuShowcase,
    icon: Users,
    stats: [
      { label: 'Offline Mode', value: 'Zero Signal' },
      { label: 'API Speed', value: '62ms' },
      { label: 'Uptime SLA', value: '99.99%' },
    ],
    tiltClass: 'lg:-rotate-[2.4deg]',
  },
  {
    id: 'tavqen-v-player',
    number: '03',
    category: 'mobile',
    categoryLabel: 'Mobile App · Multimedia',
    shortTitle: 'TAVQEN V Player',
    title: 'TAVQEN V Player — 4K/8K Media Suite',
    client: 'TAVQEN Consumer Suite',
    impact: '4K / 8K Playback',
    overview:
      'Hardware-accelerated mobile media suite for 4K/8K playback, instant local search, and unified entertainment.',
    challenge:
      'Heavy 4K streams caused frame drops, audio desync, and high battery drain.',
    solution:
      'Native hardware decoding pipelines with adaptive gestures and background play.',
    technologies: ['Kotlin', 'Swift', 'React Native', 'FFmpeg Core'],
    image: vPlayerShowcase,
    icon: Play,
    stats: [
      { label: 'Resolution', value: '4K / 8K' },
      { label: 'Crash-Free', value: '99.95%' },
      { label: 'Modes', value: 'PiP + BG' },
    ],
    tiltClass: 'lg:rotate-[2.2deg]',
  },
  {
    id: 'tavqen-saas-studio',
    number: '04',
    category: 'saas',
    categoryLabel: 'SaaS Platform · Enterprise',
    shortTitle: 'TAVQEN Cloud SaaS',
    title: 'TAVQEN Cloud Studio — SaaS Products Hub',
    client: 'Enterprise & Startup Partners',
    impact: '40+ Products Shipped',
    overview:
      'Multitenant SaaS dashboards, documentation hubs, and integration marketplaces built for high-growth teams.',
    challenge:
      'Fragmented legacy tools, sluggish dashboards, and rigid software architectures.',
    solution:
      'Modular Next.js & API systems with Stripe billing, RBAC, and zero-downtime CI/CD.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'AWS / Docker'],
    image: cloudSaasShowcase,
    icon: Layers,
    stats: [
      { label: 'Shipped', value: '40+' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Rating', value: '4.9 / 5' },
    ],
    tiltClass: 'lg:-rotate-[2deg]',
  },
];

export default function OurWorkPage({ onNavigate }: OurWorkPageProps) {
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'saas'>('all');
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(() => {
    if (typeof window === 'undefined') return null;
    const param = new URLSearchParams(window.location.search).get('project');
    return CASE_STUDIES.find((c) => c.id === param) || null;
  });

  const stageRef = useRef<HTMLDivElement | null>(null);
  const tabDockRef = useRef<HTMLDivElement | null>(null);
  const tabPillRef = useRef<HTMLDivElement | null>(null);
  const tabBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hasInitializedPillRef = useRef(false);

  const filterTabs = useMemo(
    () => [
      { id: 'all' as const, label: 'All Projects', icon: Sparkles, count: CASE_STUDIES.length },
      {
        id: 'web' as const,
        label: 'Web',
        icon: Globe,
        count: CASE_STUDIES.filter((c) => c.category === 'web').length,
      },
      {
        id: 'mobile' as const,
        label: 'Mobile',
        icon: Smartphone,
        count: CASE_STUDIES.filter((c) => c.category === 'mobile').length,
      },
      {
        id: 'saas' as const,
        label: 'SaaS',
        icon: Layers,
        count: CASE_STUDIES.filter((c) => c.category === 'saas').length,
      },
    ],
    []
  );

  const filteredStudies = useMemo(
    () => (filter === 'all' ? CASE_STUDIES : CASE_STUDIES.filter((item) => item.category === filter)),
    [filter]
  );

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
          duration: 0.42,
          ease: 'power3.out',
        });
      }
    };

    const isFirstMount = !hasInitializedPillRef.current;
    hasInitializedPillRef.current = true;
    const raf = window.requestAnimationFrame(() => updatePill(isFirstMount));

    const onResize = () => updatePill(true);
    window.addEventListener('resize', onResize);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [filter]);

  useEffect(() => {
    if (!stageRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.pinned-work-card');
      gsap.fromTo(
        cards,
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
        }
      );
    }, stageRef);

    return () => ctx.revert();
  }, [filter]);

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 sm:pt-28 pb-20 sm:pb-28 relative overflow-x-clip">
      {/* Crisp Architectural Grid Backdrop (Matches Reference Sketch Style) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-65"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(203, 213, 225, 0.32) 1px, transparent 1px), linear-gradient(to bottom, rgba(203, 213, 225, 0.32) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 right-[-140px] w-[520px] h-[520px] rounded-full pointer-events-none opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(0, 196, 255, 0.22) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => handleNav('/')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-xs font-semibold text-[#0B132B] hover:border-[#00C4FF]/60 hover:text-[#0088CC] transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* PINNED ZIG-ZAG BOARD (MATCHING REFERENCE SKETCH UI)       */}
        {/* ========================================================= */}
        <div ref={stageRef} className="relative">
          {/* Top-Left Intro + Card 01 Top-Right Asymmetric Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT HERO BLOCK */}
            <div className="lg:col-span-6 pt-2 lg:pt-4 relative">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E0F7FF] text-[#0088CC] text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Portfolio &amp; Case Studies</span>
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-bold tracking-tight text-[#0B132B] leading-[1.12] max-w-lg">
                Work that drives real{' '}
                <span className="bg-gradient-to-r from-[#00C4FF] to-[#0088CC] bg-clip-text text-transparent">
                  measurable impact.
                </span>
              </h1>

              <p className="mt-4 text-sm sm:text-[16px] text-[#64748B] leading-relaxed max-w-md">
                Explore recent digital products, mobile apps, and cloud platforms engineered by TAVQEN Technologies.
              </p>

              {/* Compact Segmented Filter Dock */}
              <div className="mt-6">
                <div
                  ref={tabDockRef}
                  className="relative inline-flex flex-wrap items-center gap-1 p-1.5 rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-[0_10px_28px_rgba(15,23,42,0.05)]"
                >
                  <div
                    ref={tabPillRef}
                    aria-hidden="true"
                    className="absolute top-0 left-0 rounded-xl sm:rounded-full bg-[#0B132B] shadow-sm pointer-events-none"
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
                        className={`relative z-10 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl sm:rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                          isActive ? 'text-white' : 'text-[#64748B] hover:text-[#0B132B]'
                        }`}
                      >
                        <TabIcon
                          className={`w-3.5 h-3.5 ${isActive ? 'text-[#00D4FF]' : 'text-[#0088CC]'}`}
                        />
                        <span>{tab.label}</span>
                        <span
                          className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            isActive ? 'bg-white/15 text-white' : 'bg-[#F1F5F9] text-[#64748B]'
                          }`}
                        >
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tiny Playful Curly Pointer Toward Card 01 (Desktop Only, Matches Sketch) */}
              <svg
                aria-hidden="true"
                viewBox="0 0 110 56"
                className="hidden lg:block w-24 h-12 mt-5 ml-40 text-[#475569]"
                fill="none"
              >
                <path
                  d="M 8 10 C 32 34, 48 10, 62 24 C 74 36, 86 28, 98 20"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
                <path
                  d="M 90 17 L 100 19 L 94 28"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* FIRST PINNED CARD (TOP RIGHT — 01) */}
            {filteredStudies[0] && (
              <div className="lg:col-span-6 lg:pt-2 relative">
                <PinnedWorkCard
                  study={filteredStudies[0]}
                  onSelect={() => setSelectedStudy(filteredStudies[0])}
                  onBuildSimilar={() => handleNav('/start-a-project')}
                />
              </div>
            )}
          </div>

          {/* SUBSEQUENT STAGGERED PINNED CARDS (02 LEFT, 03 RIGHT, 04 LEFT + CURVED DASHED TRAILS) */}
          {filteredStudies.length > 1 && (
            <div className="relative mt-10 lg:mt-4 space-y-10 lg:space-y-2">
              {filteredStudies.slice(1).map((study, sliceIdx) => {
                const realIdx = sliceIdx + 1;
                const isLeft = realIdx % 2 === 1; // 02 (idx 1) Left, 03 (idx 2) Right, 04 (idx 3) Left

                return (
                  <div
                    key={study.id}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                      realIdx === 1 ? 'lg:mt-2' : 'lg:-mt-2'
                    }`}
                  >
                    {isLeft ? (
                      <>
                        <div className="lg:col-span-6 relative z-10">
                          <PinnedWorkCard
                            study={study}
                            onSelect={() => setSelectedStudy(study)}
                            onBuildSimilar={() => handleNav('/start-a-project')}
                          />
                        </div>

                        {/* Right Column: Curved Dashed Connector Sweep (Desktop) */}
                        <div className="hidden lg:flex lg:col-span-6 flex-col items-center justify-center relative min-h-[240px]">
                          {realIdx === 1 ? (
                            <svg
                              viewBox="0 0 380 240"
                              className="w-full max-w-[340px] h-56 text-[#94A3B8]"
                              fill="none"
                            >
                              <path
                                d="M 195 8 C 190 95, 110 120, 12 130"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray="6 6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M 18 165 C 120 185, 210 198, 250 232"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray="6 6"
                                strokeLinecap="round"
                              />
                            </svg>
                          ) : (
                            /* Bottom-right loop tail beside Card 04 matching "Ready to be delivered!" */
                            <div className="flex flex-col items-start pl-6 pt-16">
                              <svg
                                viewBox="0 0 240 120"
                                className="w-56 h-28 text-[#94A3B8] -ml-14 mb-2"
                                fill="none"
                              >
                                <path
                                  d="M 10 20 C 55 85, 130 105, 224 102"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeDasharray="6 6"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <p className="text-xl xl:text-2xl font-bold text-[#0B132B] tracking-tight">
                                Ready to launch yours!
                              </p>
                              <p className="text-xs sm:text-sm text-[#64748B] mt-1 mb-4 max-w-xs">
                                Let&apos;s turn your next product concept into a flagship showcase.
                              </p>
                              <button
                                type="button"
                                onClick={() => handleNav('/start-a-project')}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs font-bold shadow-[0_8px_22px_rgba(0,196,255,0.3)] hover:scale-[1.03] transition-all cursor-pointer"
                              >
                                <span>Start a Project</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Left Column: Curved Dashed Connector Sweep (Desktop) */}
                        <div className="hidden lg:flex lg:col-span-6 items-center justify-center relative min-h-[220px]">
                          <svg
                            viewBox="0 0 380 220"
                            className="w-full max-w-[340px] h-52 text-[#94A3B8]"
                            fill="none"
                          >
                            <path
                              d="M 180 8 C 185 88, 260 112, 366 118"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeDasharray="6 6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M 358 145 C 255 170, 175 182, 130 212"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeDasharray="6 6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>

                        <div className="lg:col-span-6 relative z-10">
                          <PinnedWorkCard
                            study={study}
                            onSelect={() => setSelectedStudy(study)}
                            onBuildSimilar={() => handleNav('/start-a-project')}
                          />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Mobile/Tablet Bottom Ready Anchor CTA */}
          <div className="lg:hidden mt-10 rounded-3xl bg-white border border-[#E2E8F0] p-6 text-center shadow-sm">
            <p className="text-lg font-bold text-[#0B132B]">Ready to launch yours!</p>
            <p className="text-xs text-[#64748B] mt-1 mb-4">
              Partner with TAVQEN to design and engineer your next digital product.
            </p>
            <button
              type="button"
              onClick={() => handleNav('/start-a-project')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs font-bold shadow-md cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CASE STUDY DETAIL MODAL (ON PINNED CARD CLICK)            */}
      {/* ========================================================= */}
      {selectedStudy && (
        <div
          className="fixed inset-0 z-50 bg-[#0B132B]/55 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedStudy(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[24px] sm:rounded-[28px] bg-white border border-[#E2E8F0] shadow-[0_32px_90px_rgba(11,19,43,0.28)] animate-in fade-in zoom-in-95 duration-250 my-auto"
          >
            <button
              type="button"
              onClick={() => setSelectedStudy(null)}
              aria-label="Close case study details"
              className="sticky top-3 float-right mr-3 mt-3 z-20 w-9 h-9 rounded-full bg-white/95 border border-[#E2E8F0] text-[#0B132B] hover:text-[#0088CC] flex items-center justify-center shadow-sm cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="bg-[#F8FAFC] p-3 sm:p-4 border-b border-[#E2E8F0]">
              <img
                src={selectedStudy.image}
                alt={selectedStudy.title}
                className="w-full aspect-video object-contain bg-white rounded-2xl border border-[#E2E8F0]"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#E0F7FF] text-[#0088CC] text-[11px] font-bold font-mono uppercase tracking-wider">
                  {selectedStudy.number} · {selectedStudy.categoryLabel}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                  <TrendingUp className="w-3 h-3" />
                  {selectedStudy.impact}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight">
                  {selectedStudy.title}
                </h2>
                <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
                  {selectedStudy.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div>
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#0B132B] block mb-1">
                    Challenge
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                    {selectedStudy.challenge}
                  </p>
                </div>
                <div className="sm:border-l sm:border-[#E2E8F0] sm:pl-4 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-[#E2E8F0]">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#0088CC] block mb-1">
                    Engineering Solution
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                    {selectedStudy.solution}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {selectedStudy.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-[#F1F5F9] text-[#475569] text-[11px] font-mono font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  {selectedStudy.stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-base sm:text-lg font-extrabold text-[#0B132B] font-mono">
                        {s.value}
                      </div>
                      <div className="text-[11px] text-[#64748B]">{s.label}</div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedStudy(null);
                    handleNav('/start-a-project');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs font-bold shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <span>Build Similar Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface PinnedWorkCardProps {
  study: CaseStudy;
  onSelect: () => void;
  onBuildSimilar: () => void;
}

function PinnedWorkCard({ study, onSelect, onBuildSimilar }: PinnedWorkCardProps) {
  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`pinned-work-card group relative rounded-[26px] sm:rounded-[30px] bg-white p-3.5 sm:p-4 border border-[#E2E8F0] shadow-[0_24px_60px_rgba(11,19,43,0.08)] hover:shadow-[0_30px_70px_rgba(0,136,204,0.14)] hover:border-[#00C4FF]/55 transition-all duration-500 cursor-pointer hover:rotate-0 ${study.tiltClass}`}
    >
      {/* Top Metallic Pin Grommet Eyelet (Matches Reference Image) */}
      <div className="flex justify-center pt-0.5 pb-2.5">
        <span className="w-7 h-7 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] shadow-inner flex items-center justify-center">
          <span className="w-4 h-4 rounded-full bg-gradient-to-b from-[#334155] to-[#0B132B] shadow-[0_2px_4px_rgba(11,19,43,0.35)]" />
        </span>
      </div>

      {/* Inner Recessed Light Tag Surface */}
      <div className="rounded-[18px] sm:rounded-[20px] bg-[#F4F6F9] border border-[#E2E8F0]/80 overflow-hidden">
        {/* Prominent 16:9 Showcase Visual */}
        <div className="relative aspect-video w-full overflow-hidden bg-white">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-contain bg-white group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </div>

        {/* Clean Minimal Copy Below Visual */}
        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-extrabold text-[#0088CC]">
                {study.number}
              </span>
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#64748B]">
                {study.categoryLabel}
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-[10px] font-bold text-emerald-700">
              {study.impact}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-[#0B132B] tracking-tight group-hover:text-[#0088CC] transition-colors">
            {study.shortTitle}
          </h3>

          <p className="mt-1.5 text-xs sm:text-[13px] text-[#64748B] leading-relaxed line-clamp-2">
            {study.overview}
          </p>

          <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
            <span className="text-[11px] font-bold text-[#0088CC] group-hover:underline">
              Inspect Project →
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onBuildSimilar();
              }}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0B132B] hover:bg-[#0088CC] text-white text-[11px] font-bold transition-colors cursor-pointer"
            >
              <span>Build Similar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
