import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, FileText, Sparkles, Users } from 'lucide-react';

import tavqenPdfImg from '../assits/pdf-showcase/showcase-5.png';
import product3 from '../assits/products/product3.webp';

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  number: string;
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  impact: string;
  tags: string[];
  image: string;
  alt: string;
  icon: typeof FileText;
  glowGradient: string;
  accentBorderHover: string;
  iconStyle: string;
  eyebrowColor: string;
}

interface RecentWorkProps {
  onNavigate?: (path: string) => void;
}

const WORK_ITEMS: ProjectItem[] = [
  {
    number: '01',
    id: 'tavqen-pdf',
    eyebrow: 'Mobile App · Productivity',
    title: 'TAVQEN PDF — AI Document & OCR Platform',
    description:
      'A fast document platform engineered for smart 300 DPI scanning, OCR extraction, e-signing, batch merging, and AES-256 encrypted cloud vault sync.',
    impact: '300 DPI Smart OCR',
    tags: ['Mobile App', 'Smart OCR', 'Cloud Vault'],
    image: tavqenPdfImg,
    alt: 'TAVQEN PDF Showcase',
    icon: FileText,
    glowGradient:
      'radial-gradient(circle at 85% 90%, rgba(0, 196, 255, 0.22) 0%, rgba(155, 227, 223, 0.14) 38%, transparent 72%)',
    accentBorderHover: 'hover:border-[#00C4FF]/60',
    iconStyle: 'bg-[#E0F7FF] text-[#0088CC] border-[#00C4FF]/25',
    eyebrowColor: 'text-[#0088CC]',
  },
  {
    number: '02',
    id: 'gramsetu',
    eyebrow: 'Web & Mobile · Civic Tech',
    title: 'GramSetu — Digital Governance & Citizen Portal',
    description:
      'A resilient digital platform connecting villages and citizens with live grievance tracking, direct welfare scheme access, and offline-first data sync.',
    impact: '100% Digital Records',
    tags: ['Web Platform', 'Civic Tech', 'Offline Sync'],
    image: product3,
    alt: 'GramSetu Platform Showcase',
    icon: Users,
    glowGradient:
      'radial-gradient(circle at 85% 90%, rgba(0, 136, 204, 0.20) 0%, rgba(56, 189, 248, 0.14) 38%, transparent 72%)',
    accentBorderHover: 'hover:border-[#0088CC]/55',
    iconStyle: 'bg-[#F0F9FF] text-[#0284C7] border-[#38BDF8]/30',
    eyebrowColor: 'text-[#0284C7]',
  },
];

export default function RecentWork({ onNavigate }: RecentWorkProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const [activeSteps, setActiveSteps] = useState<number[]>([0]);

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const progressLine = progressLineRef.current;
    if (!section || !timeline || !progressLine) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setActiveSteps(WORK_ITEMS.map((_, idx) => idx));
      return;
    }

    const ctx = gsap.context(() => {
      // Header subtle entrance
      gsap.fromTo(
        '.work-header-item',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true,
          },
        }
      );

      // Center vertical line scroll-driven progress draw
      gsap.fromTo(
        progressLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 65%',
            end: 'bottom 70%',
            scrub: 0.55,
          },
        }
      );

      // Alternating staggered card animations + milestone node activation
      const cards = gsap.utils.toArray<HTMLElement>('.work-timeline-card');
      const isDesktop = window.innerWidth >= 768;

      cards.forEach((card, idx) => {
        const isLeft = idx % 2 === 0;
        const fromX = isDesktop ? (isLeft ? -36 : 36) : 0;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: fromX,
            y: 30,
            scale: 0.97,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: card,
              start: 'top 84%',
              once: true,
            },
          }
        );

        // Activate timeline milestone dot as user scrolls past each row
        ScrollTrigger.create({
          trigger: card,
          start: 'top 68%',
          onEnter: () => {
            setActiveSteps((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
          },
          onLeaveBack: () => {
            if (idx > 0) {
              setActiveSteps((prev) => prev.filter((item) => item !== idx));
            }
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="bg-[#F8FAFC] border-t border-[#E2E8F0] relative py-20 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Subtle ambient background glow matching TAVQEN theme */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[440px] pointer-events-none opacity-30 -z-10"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0, 196, 255, 0.14) 0%, rgba(155, 227, 223, 0.12) 45%, transparent 72%)',
        }}
      />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION HEADER (Matches TAVQEN typography & palette)       */}
        {/* ========================================================= */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20 lg:mb-24">
          <span className="work-header-item inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Work</span>
          </span>
          <h2 className="work-header-item text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0B132B] leading-[1.14]">
            Selected work built to{' '}
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#0088CC] bg-clip-text text-transparent">
              perform.
            </span>
          </h2>
          <p className="work-header-item mt-3.5 sm:mt-4 text-[14px] sm:text-[15.5px] text-[#64748B] font-normal leading-relaxed">
            Real digital products, web platforms, and mobile experiences engineered by TAVQEN for measurable business impact.
          </p>
        </div>

        {/* ========================================================= */}
        {/* ALTERNATING VERTICAL TIMELINE (Reference layout + TAVQEN) */}
        {/* ========================================================= */}
        <div ref={timelineRef} className="relative max-w-[1060px] mx-auto">
          {/* Base Spine Track (Left on Mobile, Centered on Desktop) */}
          <div
            className="absolute top-3 bottom-3 left-4 md:left-1/2 md:-translate-x-1/2 w-[1.5px] bg-[#E2E8F0] rounded-full pointer-events-none"
            aria-hidden="true"
          />

          {/* Scroll-Animated Active Spine Fill */}
          <div
            ref={progressLineRef}
            className="absolute top-3 bottom-3 left-4 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-[#00D4FF] via-[#0088CC] to-[#9BE3DF] rounded-full origin-top pointer-events-none shadow-[0_0_12px_rgba(0,196,255,0.45)]"
            style={{ transform: 'scaleY(0)' }}
            aria-hidden="true"
          />

          {/* Timeline Milestones */}
          <div className="space-y-10 sm:space-y-14 md:space-y-6">
            {WORK_ITEMS.map((project, idx) => {
              const Icon = project.icon;
              const isLeft = idx % 2 === 0;
              const isActive = activeSteps.includes(idx);

              return (
                <div
                  key={project.id}
                  className={`relative grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-0 ${
                    idx > 0 ? 'md:-mt-8 lg:-mt-12' : ''
                  }`}
                >
                  {/* Milestone Dot on Center / Mobile-Left Track */}
                  <div
                    className={`absolute left-4 md:left-1/2 -translate-x-1/2 top-9 md:top-1/2 md:-translate-y-1/2 z-20 transition-all duration-500 ${
                      isActive ? 'scale-100' : 'scale-90'
                    }`}
                    aria-hidden="true"
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
                        isActive
                          ? 'bg-[#00C4FF] border-2 border-white timeline-dot-active'
                          : 'bg-white border-2 border-[#CBD5E1] shadow-xs'
                      }`}
                    />
                  </div>

                  {/* Card Slot — Alternating Left (idx 0,2) and Right (idx 1,3) */}
                  <div
                    className={`pl-11 md:pl-0 ${
                      isLeft
                        ? 'md:col-start-1 md:pr-12 lg:pr-16'
                        : 'md:col-start-2 md:pl-12 lg:pl-16 md:pt-16 lg:pt-20'
                    }`}
                  >
                    <article
                      onClick={() => handleNav(`/our-work?project=${project.id}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleNav(`/our-work?project=${project.id}`);
                        }
                      }}
                      className={`work-timeline-card group relative rounded-[24px] sm:rounded-[28px] bg-white border border-[#E2E8F0] ${project.accentBorderHover} p-6 sm:p-7 shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_22px_50px_rgba(0,196,255,0.14)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#00C4FF]/50`}
                    >
                      {/* Subtle Corner Ambient Glow (TAVQEN palette equivalent of reference glow) */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: project.glowGradient }}
                      />

                      {/* Subtle Top Edge Highlight */}
                      <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#00C4FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="relative z-10">
                        {/* Card Header Row: Icon + Uppercase Eyebrow + Large Faded Index */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-2.5 sm:gap-3 pt-1 min-w-0 flex-1">
                            <div
                              className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 shadow-2xs transition-transform duration-300 group-hover:scale-105 ${project.iconStyle}`}
                            >
                              <Icon className="w-4 h-4 stroke-[2]" />
                            </div>
                            <span
                              className={`font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.12em] leading-tight ${project.eyebrowColor}`}
                            >
                              {project.eyebrow}
                            </span>
                          </div>

                          {/* Giant Watermark Number (01, 02, 03, 04) */}
                          <span className="font-mono text-2xl sm:text-5xl font-black tracking-tighter text-[#0B132B]/[0.06] group-hover:text-[#0088CC]/[0.13] transition-colors duration-500 leading-none select-none shrink-0">
                            {project.number}
                          </span>
                        </div>

                        {/* Project Title */}
                        <h3 className="text-lg sm:text-[22px] font-bold text-[#0B132B] tracking-tight leading-snug group-hover:text-[#0088CC] transition-colors duration-300">
                          {project.title}
                        </h3>

                        {/* Project Description */}
                        <p className="mt-2 text-[13.5px] sm:text-[14px] text-[#64748B] leading-relaxed font-normal">
                          {project.description}
                        </p>

                        {/* Aspect-Preserving Project Showcase Visual */}
                        <div className="mt-5 relative aspect-[16/10] w-full rounded-[18px] overflow-hidden border border-black/[0.06] bg-[#F8FAFC] shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
                          <img
                            src={project.image}
                            alt={project.alt}
                            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                          {/* Floating Impact Badge */}
                          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.06] shadow-xs">
                            <span className="text-[11px] font-bold font-mono text-[#0B132B]">
                              {project.impact}
                            </span>
                          </div>
                        </div>

                        {/* Footer: Tags + Case Study Action */}
                        <div className="mt-5 pt-4 border-t border-[#E2E8F0]/80 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/90 border border-[#E2E8F0] text-[#475569] group-hover:border-[#00C4FF]/35 transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0088CC] group-hover:text-[#00C4FF] transition-colors">
                            <span>Case Study</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM CTA: EXPLORE ALL CASE STUDIES                      */}
        {/* ========================================================= */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center justify-center text-center" data-animate="fade-up">
          <button
            type="button"
            onClick={() => handleNav('/our-work')}
            className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] text-xs sm:text-[13.5px] font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:border-[#0088CC] hover:text-[#0088CC] hover:shadow-[0_10px_28px_rgba(0,196,255,0.16)] hover:scale-[1.02] active:scale-95 transition-all duration-300 group cursor-pointer"
          >
            <span>Explore All Case Studies</span>
            <ArrowRight className="w-4 h-4 text-[#0088CC] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <p className="mt-2.5 text-xs text-[#94A3B8]">
            Dive deeper into challenges, architecture, and measurable outcomes
          </p>
        </div>
      </div>
    </section>
  );
}
