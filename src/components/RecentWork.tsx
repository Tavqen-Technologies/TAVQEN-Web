import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TAVQEN_PRODUCTS } from '../data/productsData';

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
  icon: (typeof TAVQEN_PRODUCTS)[number]['icon'];
  glowGradient: string;
  accentBorderHover: string;
  iconStyle: string;
  eyebrowColor: string;
}

interface RecentWorkProps {
  onNavigate?: (path: string) => void;
}

const CARD_ACCENTS = [
  {
    glowGradient:
      'radial-gradient(circle at 85% 90%, rgba(0, 196, 255, 0.22) 0%, rgba(155, 227, 223, 0.14) 38%, transparent 72%)',
    accentBorderHover: 'hover:border-[#00C4FF]/60',
    iconStyle: 'bg-[#E0F7FF] text-[#0088CC] border-[#00C4FF]/25',
    eyebrowColor: 'text-[#0088CC]',
  },
  {
    glowGradient:
      'radial-gradient(circle at 85% 90%, rgba(0, 136, 204, 0.20) 0%, rgba(56, 189, 248, 0.14) 38%, transparent 72%)',
    accentBorderHover: 'hover:border-[#0088CC]/55',
    iconStyle: 'bg-[#F0F9FF] text-[#0284C7] border-[#38BDF8]/30',
    eyebrowColor: 'text-[#0284C7]',
  },
  {
    glowGradient:
      'radial-gradient(circle at 85% 90%, rgba(14, 165, 233, 0.18) 0%, rgba(155, 227, 223, 0.14) 38%, transparent 72%)',
    accentBorderHover: 'hover:border-[#00C4FF]/55',
    iconStyle: 'bg-[#E0F7FF] text-[#0088CC] border-[#00C4FF]/25',
    eyebrowColor: 'text-[#0088CC]',
  },
];

const WORK_ITEMS: ProjectItem[] = TAVQEN_PRODUCTS.map((product, idx) => {
  const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
  return {
    number: `0${idx + 1}`,
    id: product.id,
    eyebrow: `${product.platforms[0] ?? 'Product'} · ${product.categoryLabel}`,
    title: `${product.name} — ${product.tagline}`,
    description: product.overview,
    impact: `${product.status} · ${product.stats[0]?.value ?? product.version}`,
    tags: product.features.slice(0, 3).map((f) => f.title),
    image: product.image,
    alt: product.alt,
    icon: product.icon,
    ...accent,
  };
});

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
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
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
        const fromX = isDesktop ? (isLeft ? -30 : 30) : 0;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: fromX,
            y: 24,
            scale: 0.98,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: card,
              start: 'top 86%',
              once: true,
            },
          }
        );

        // Activate timeline milestone dot as user scrolls past each row
        ScrollTrigger.create({
          trigger: card,
          start: 'top 70%',
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

    const refreshRaf = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 220);

    return () => {
      window.cancelAnimationFrame(refreshRaf);
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="bg-[#F8FAFC] border-t border-[#E2E8F0] relative py-14 sm:py-18 lg:py-22 overflow-hidden"
    >
      {/* Subtle ambient background glow matching TAVQEN theme */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] pointer-events-none opacity-25 -z-10"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0, 196, 255, 0.14) 0%, rgba(155, 227, 223, 0.12) 45%, transparent 72%)',
        }}
      />

      <div className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION HEADER (Matches TAVQEN typography & palette)       */}
        {/* ========================================================= */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14 lg:mb-16">
          <span className="work-header-item inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-[11px] font-semibold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3 h-3" />
            <span>Our Work</span>
          </span>
          <h2 className="work-header-item text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0B132B] leading-[1.18]">
            Selected work built to{' '}
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#0088CC] bg-clip-text text-transparent">
              perform.
            </span>
          </h2>
          <p className="work-header-item mt-2.5 sm:mt-3 text-[12.5px] sm:text-[13.5px] text-[#64748B] font-normal leading-relaxed">
            Real software products developed in-house by TAVQEN Technology for everyday documents, local video playback, and focused creative tools.
          </p>
        </div>

        {/* ========================================================= */}
        {/* ALTERNATING VERTICAL TIMELINE (Compact & Balanced Layout) */}
        {/* ========================================================= */}
        <div ref={timelineRef} className="relative max-w-[920px] mx-auto">
          {/* Base Spine Track (Left on Mobile, Centered on Desktop) */}
          <div
            className="absolute top-2.5 bottom-2.5 left-3.5 md:left-1/2 md:-translate-x-1/2 w-[1.5px] bg-[#E2E8F0] rounded-full pointer-events-none"
            aria-hidden="true"
          />

          {/* Scroll-Animated Active Spine Fill */}
          <div
            ref={progressLineRef}
            className="absolute top-2.5 bottom-2.5 left-3.5 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-[#00D4FF] via-[#0088CC] to-[#9BE3DF] rounded-full origin-top pointer-events-none shadow-[0_0_10px_rgba(0,196,255,0.4)]"
            style={{ transform: 'scaleY(0)' }}
            aria-hidden="true"
          />

          {/* Timeline Milestones (Tighter vertical spacing) */}
          <div className="space-y-6 sm:space-y-8 md:space-y-6">
            {WORK_ITEMS.map((project, idx) => {
              const Icon = project.icon;
              const isLeft = idx % 2 === 0;
              const isActive = activeSteps.includes(idx);

              return (
                <div
                  key={project.id}
                  className={`relative grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-0 ${
                    idx > 0 ? 'md:-mt-8 lg:-mt-10' : ''
                  }`}
                >
                  {/* Milestone Dot on Center / Mobile-Left Track */}
                  <div
                    className={`absolute left-3.5 md:left-1/2 -translate-x-1/2 top-7 md:top-1/2 md:-translate-y-1/2 z-20 transition-all duration-500 ${
                      isActive ? 'scale-100' : 'scale-90'
                    }`}
                    aria-hidden="true"
                  >
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${
                        isActive
                          ? 'bg-[#00C4FF] border-2 border-white timeline-dot-active'
                          : 'bg-white border-2 border-[#CBD5E1] shadow-2xs'
                      }`}
                    />
                  </div>

                  {/* Card Slot — Alternating Left (idx 0,2) and Right (idx 1,3) */}
                  <div
                    className={`pl-9 md:pl-0 ${
                      isLeft
                        ? 'md:col-start-1 md:pr-7 lg:pr-9'
                        : 'md:col-start-2 md:pl-7 lg:pl-9 md:pt-10 lg:pt-12'
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
                      className={`work-timeline-card group relative rounded-[20px] sm:rounded-[22px] bg-white border border-[#E2E8F0] ${project.accentBorderHover} p-4 sm:p-5 shadow-[0_6px_25px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_40px_rgba(0,196,255,0.12)] hover:-translate-y-1 transition-all duration-400 overflow-hidden cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#00C4FF]/50`}
                    >
                      {/* Subtle Corner Ambient Glow */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: project.glowGradient }}
                      />

                      {/* Subtle Top Edge Highlight */}
                      <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#00C4FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="relative z-10">
                        {/* Card Header Row: Icon + Uppercase Eyebrow + Watermark Index */}
                        <div className="flex items-start justify-between gap-3 mb-2.5">
                          <div className="flex items-center gap-2.5 pt-0.5">
                            <div
                              className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 shadow-2xs transition-transform duration-300 group-hover:scale-105 ${project.iconStyle}`}
                            >
                              <Icon className="w-3.5 h-3.5 stroke-[2]" />
                            </div>
                            <span
                              className={`text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.1em] leading-tight ${project.eyebrowColor}`}
                            >
                              {project.eyebrow}
                            </span>
                          </div>

                          {/* Watermark Number (01, 02, 03) */}
                          <span className="text-3xl sm:text-4xl font-black tracking-tighter tabular-nums text-[#0B132B]/[0.05] group-hover:text-[#0088CC]/[0.12] transition-colors duration-400 leading-none select-none">
                            {project.number}
                          </span>
                        </div>

                        {/* Project Title */}
                        <h3 className="text-base sm:text-[17px] font-bold text-[#0B132B] tracking-tight leading-snug group-hover:text-[#0088CC] transition-colors duration-300">
                          {project.title}
                        </h3>

                        {/* Project Description */}
                        <p className="mt-1.5 text-[11.5px] sm:text-[12.5px] text-[#64748B] leading-relaxed font-normal">
                          {project.description}
                        </p>

                        {/* Compact Project Preview Visual */}
                        <div className="mt-3.5 relative h-[135px] sm:h-[155px] rounded-[14px] overflow-hidden border border-black/[0.06] bg-[#F1F5F9] shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
                          <img
                            src={project.image}
                            alt={project.alt}
                            className="w-full h-full object-cover object-top transition-transform duration-600 ease-out group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                          {/* Floating Status / Metric Badge */}
                          <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.06] shadow-2xs">
                            <span className="text-[10px] font-bold text-[#0B132B]">
                              {project.impact}
                            </span>
                          </div>
                        </div>

                        {/* Footer: Tags + Action */}
                        <div className="mt-3.5 pt-2.5 border-t border-[#E2E8F0]/80 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-1">
                            {project.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/90 border border-[#E2E8F0] text-[#475569] group-hover:border-[#00C4FF]/35 transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0088CC] group-hover:text-[#00C4FF] transition-colors">
                            <span>View Build</span>
                            <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
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
        <div className="mt-10 sm:mt-14 flex flex-col items-center justify-center text-center" data-animate="fade-up">
          <button
            type="button"
            onClick={() => handleNav('/our-work')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] text-xs sm:text-[12.5px] font-semibold shadow-[0_3px_16px_rgba(0,0,0,0.03)] hover:border-[#0088CC] hover:text-[#0088CC] hover:shadow-[0_8px_24px_rgba(0,196,255,0.14)] hover:scale-[1.01] active:scale-95 transition-all duration-300 group cursor-pointer"
          >
            <span>Explore Our Work</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0088CC] transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <p className="mt-2 text-[11px] text-[#94A3B8]">
            Inspect all {WORK_ITEMS.length} TAVQEN products, workflows, and product notes
          </p>
        </div>
      </div>
    </section>
  );
}
