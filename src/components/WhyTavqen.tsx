import { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Cpu,
  Layers,
  RefreshCw,
  Sparkles,
  Users,
} from 'lucide-react';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

interface PrincipleRow {
  number: string;
  tag: string;
  title: string;
  description: string;
  points: string[];
}

const PRINCIPLES: PrincipleRow[] = [
  {
    number: '01',
    tag: 'PRODUCT-FIRST',
    title: 'Product-First Mindset',
    description:
      'We prioritize core product value, practical workflows, and real-world utility over vanity features or unnecessary bloat.',
    points: [
      'Problem-first approach to every feature',
      'Eliminating unnecessary feature bloat',
      'Engineered for long-term product viability',
    ],
  },
  {
    number: '02',
    tag: 'PRODUCTION-GRADE',
    title: 'Modern Technology',
    description:
      'Built with production-proven technologies and scalable architecture for fast, secure, and reliable digital products.',
    points: [
      'Type-safe, modular code architecture',
      'Fast load speeds and responsive interfaces',
      'Cloud-ready deployment and scalable infrastructure',
    ],
  },
  {
    number: '03',
    tag: 'INNOVATIVE SOLUTIONS',
    title: 'Creative Thinking',
    description:
      'We find pragmatic, out-of-the-box solutions to complex technical challenges, tailored directly to your business goals.',
    points: [
      'Pragmatic system design & architecture',
      'Tailored technical problem solving',
      'Adaptable, scalable digital solutions',
    ],
  },
  {
    number: '04',
    tag: 'INTUITIVE UX',
    title: 'User-Focused Approach',
    description:
      'Every interface is designed for real humans—clean, accessible, and intuitive, reducing friction and learning curves for end users.',
    points: [
      'Simple, ergonomic, and clear user flows',
      'Consistent experience across all devices',
      'Accessible layouts and readable typography',
    ],
  },
  {
    number: '05',
    tag: 'DIRECT PARTNERSHIP',
    title: 'Collaborative Teamwork',
    description:
      'We work as an extension of your own team with transparent communication, direct developer access, and regular milestone demos.',
    points: [
      'Direct, responsive developer access',
      'Regular progress updates and roadmap visibility',
      'True partnership aligned with your success',
    ],
  },
  {
    number: '06',
    tag: 'ONGOING ITERATION',
    title: 'Continuous Improvement',
    description:
      'We continuously refine techniques, update security standards, and optimize code performance as technologies evolve.',
    points: [
      'Proactive code tuning and security audits',
      'Iterative enhancements and smooth scaling',
      'Dependable ongoing technical support',
    ],
  },
];

const PRINCIPLE_ICONS = [Layers, Cpu, Sparkles, Compass, Users, RefreshCw];

interface WhyTavqenProps {
  onNavigate?: (path: string) => void;
}

export default function WhyTavqen({ onNavigate }: WhyTavqenProps = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  const handleCta = () => {
    if (onNavigate) {
      onNavigate('/start-a-project');
    } else {
      window.location.hash = '/start-a-project';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Subtle entrance animation when section enters viewport
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.why-heading',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: section, start: 'top 85%', once: true },
        }
      );

      gsap.fromTo(
        '.why-tab-item',
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: '.why-stage-grid', start: 'top 85%', once: true },
        }
      );

      gsap.fromTo(
        '.why-detail-card',
        { opacity: 0, y: 22, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          delay: 0.12,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: '.why-stage-grid', start: 'top 85%', once: true },
        }
      );

      gsap.fromTo(
        '.why-bottom-cta',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.25,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: '.why-stage-grid', start: 'top 82%', once: true },
        }
      );
    }, section);

    const raf = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  const activePrinciple = PRINCIPLES[activeIndex] || PRINCIPLES[0];
  const ActiveIcon = PRINCIPLE_ICONS[activeIndex] || Layers;

  return (
    <section
      ref={sectionRef}
      id="why"
      className="relative bg-[#F8FAFC] border-t border-[#E2E8F0] pt-8 xs:pt-10 sm:pt-12 lg:pt-16 pb-12 xs:pb-14 sm:pb-20 lg:pb-24 overflow-x-clip"
    >
      {/* Subtle Ambient Cyan Glow (Matches TAVQEN Light Theme) */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1180px] h-[440px] pointer-events-none opacity-35"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0, 196, 255, 0.14) 0%, rgba(155, 227, 223, 0.08) 45%, transparent 72%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* CENTERED TOP HEADER: Unified SectionHeading System        */}
        {/* ========================================================= */}
        <div className="why-heading">
          <SectionHeading
            eyebrow="Why TAVQEN?"
            title="Built to create."
            highlight="Designed to evolve."
            description="Six principles that shape how we think, build, and deliver digital products."
            className="mb-6 sm:mb-9"
          />
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE SPLIT ARCHITECTURAL STAGE                     */}
        {/* ========================================================= */}
        <div className="why-stage-grid grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT COLUMN (5 COLS - DESKTOP ONLY): Hidden on mobile/tablet */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between gap-2.5">
            {PRINCIPLES.map((principle, idx) => {
              const Icon = PRINCIPLE_ICONS[idx] || Layers;
              const isSelected = activeIndex === idx;

              return (
                <button
                  key={principle.number}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`why-tab-item group relative w-full text-left rounded-2xl px-4 py-3.5 transition-all duration-300 cursor-pointer overflow-hidden border ${
                    isSelected
                      ? 'bg-white border-[#00C4FF]/60 shadow-[0_12px_30px_rgba(0,136,204,0.09)] translate-x-1.5'
                      : 'bg-white/65 hover:bg-white border-[#E2E8F0] hover:border-[#00C4FF]/35 shadow-[0_2px_10px_rgba(15,23,42,0.02)]'
                  }`}
                >
                  {/* Left Active Vertical Cyan Accent Bar */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r-full bg-gradient-to-b from-[#00D4FF] to-[#0088CC] transition-opacity duration-300 ${
                      isSelected ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#00D4FF] to-[#0088CC] text-white shadow-[0_6px_16px_rgba(0,136,204,0.25)]'
                            : 'bg-[#E0F7FF] text-[#0088CC] group-hover:bg-[#0088CC] group-hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4 stroke-[2]" />
                      </div>

                      <div className="min-w-0">
                        <span
                          className={`block font-mono text-[10px] font-bold tracking-wider uppercase transition-colors ${
                            isSelected ? 'text-[#0088CC]' : 'text-[#94A3B8]'
                          }`}
                        >
                          {principle.number} · {principle.tag}
                        </span>
                        <h3
                          className={`text-xs sm:text-[14.5px] font-semibold truncate transition-colors ${
                            isSelected ? 'text-[#0B132B]' : 'text-[#334155] group-hover:text-[#0B132B]'
                          }`}
                        >
                          {principle.title}
                        </h3>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                        isSelected
                          ? 'text-[#0088CC] translate-x-0 opacity-100'
                          : 'text-[#CBD5E1] -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN (7 COLS ON DESKTOP, FULL WIDTH ON MOBILE/TABLET) */}
          <div className="why-detail-card lg:col-span-7 relative rounded-[22px] sm:rounded-[30px] bg-gradient-to-br from-white via-[#F9FCFF] to-[#E0F7FF]/55 border border-[#00C4FF]/30 shadow-[0_20px_50px_rgba(0,136,204,0.07)] overflow-hidden flex flex-col justify-between">
            {/* Architectural Dot-Grid & Top Cyan Beam */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(0, 136, 204, 0.14) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute top-0 left-8 right-8 sm:left-12 sm:right-12 h-[2px] bg-gradient-to-r from-transparent via-[#00C4FF] to-transparent z-20"
            />

            {/* Huge Watermark Number */}
            <span
              aria-hidden="true"
              className="absolute -bottom-4 right-4 sm:-bottom-6 sm:right-5 font-mono text-[100px] sm:text-[160px] font-black text-[#0088CC]/[0.05] select-none pointer-events-none leading-none transition-all duration-300"
            >
              {activePrinciple.number}
            </span>

            {/* Top Blueprint Header Bar */}
            <div className="relative z-10 px-4 sm:px-8 py-3.5 sm:py-4 bg-white/85 backdrop-blur-xs border-b border-[#E2E8F0]/80 flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#00C4FF] animate-pulse shrink-0" />
                {/* Mobile: shows only current number (e.g. 04) · Desktop: shows full tag */}
                <span className="sm:hidden font-mono text-xs font-bold text-[#0088CC]">
                  {activePrinciple.number}
                </span>
                <span className="hidden sm:inline font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#0088CC] truncate">
                  {activePrinciple.tag}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Desktop only: 04 / 06 counter */}
                <span className="hidden sm:inline font-mono text-xs font-semibold text-[#64748B]">
                  <strong className="text-[#0B132B]">{activePrinciple.number}</strong> / 0
                  {PRINCIPLES.length}
                </span>

                <div className="flex items-center gap-1.5 ml-1">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) => (prev - 1 + PRINCIPLES.length) % PRINCIPLES.length)
                    }
                    aria-label="Previous principle"
                    className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-white border border-[#E2E8F0] hover:border-[#0088CC] active:scale-95 text-[#475569] hover:text-[#0088CC] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % PRINCIPLES.length)}
                    aria-label="Next principle"
                    className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-white border border-[#E2E8F0] hover:border-[#0088CC] active:scale-95 text-[#475569] hover:text-[#0088CC] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Center Content Body */}
            <div
              key={activePrinciple.number}
              className="relative z-10 p-5 sm:p-8 lg:p-9 flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3 sm:gap-3.5 mb-3.5 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#0088CC] text-white flex items-center justify-center shadow-[0_10px_24px_rgba(0,136,204,0.28)] shrink-0">
                  <ActiveIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </div>

                <div className="min-w-0">
                  <span className="block font-mono text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-widest text-[#0088CC]">
                    Core Principle {activePrinciple.number}
                  </span>
                  <h3 className="text-lg sm:text-2xl lg:text-[26px] font-semibold text-[#0B132B] tracking-[-0.025em] leading-tight">
                    {activePrinciple.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-[13px] sm:text-[15px] text-[#475569] leading-relaxed mb-5 sm:mb-6 font-normal max-w-2xl">
                {activePrinciple.description}
              </p>

              {/* Supporting Points Cards */}
              <div className="space-y-2 sm:space-y-2.5">
                {activePrinciple.points.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/95 border border-[#E2E8F0] shadow-[0_4px_14px_rgba(15,23,42,0.025)] transition-all duration-300"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.75]" />
                    </div>
                    <span className="text-xs sm:text-[13.5px] font-medium text-[#0B132B] leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Progress Bar & CTA Footer */}
            <div className="relative z-10 px-4 sm:px-8 py-3.5 sm:py-4 bg-white/85 backdrop-blur-xs border-t border-[#E2E8F0]/80 flex flex-wrap items-center justify-between gap-3">
              {/* Progress Indicator Pills */}
              <div className="flex items-center gap-1.5">
                {PRINCIPLES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Select principle ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === idx
                        ? 'w-7 bg-[#0088CC]'
                        : 'w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleCta}
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors cursor-pointer group"
              >
                <span>Start a project with our team</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Primary CTA Button */}
        <div className="why-bottom-cta mt-9 sm:mt-14 text-center">
          <button
            type="button"
            onClick={handleCta}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-sm font-semibold shadow-[0_8px_25px_rgba(0,196,255,0.28)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.38)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
          >
            <span>Start a project with our team</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}