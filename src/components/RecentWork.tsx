import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CLIENT_PROJECTS } from '../data/clientProjectsData';

gsap.registerPlugin(ScrollTrigger);

interface RecentWorkProps {
  onNavigate?: (path: string) => void;
}

const WORK_ITEMS = CLIENT_PROJECTS.slice(0, 2);

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
            Custom web platforms, fintech systems, healthcare software, and scalable e-commerce products engineered by TAVQEN Technology.
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
                      onClick={() => handleNav(project.link)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleNav(project.link);
                        }
                      }}
                      className={`work-timeline-card group relative rounded-[18px] sm:rounded-[20px] bg-white border border-[#E2E8F0] ${project.accentBorderHover} p-3.5 sm:p-4 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_36px_rgba(0,196,255,0.12)] hover:-translate-y-1 transition-all duration-400 overflow-hidden cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#00C4FF]/50`}
                    >
                      {/* Subtle Corner Ambient Glow */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: project.glowGradient }}
                      />

                      {/* Unique Viewfinder Top-Right Corner Accent */}
                      <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t-2 border-r-2 border-[#00C4FF]/30 group-hover:border-[#00C4FF] transition-colors rounded-tr-[3px] pointer-events-none" />

                      {/* Subtle Top Edge Highlight */}
                      <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#00C4FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="relative z-10">
                        {/* Card Header Row: Eyebrow + Watermark Index */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2 pt-0.5">
                            <span
                              className={`text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.1em] leading-tight ${project.eyebrowColor}`}
                            >
                              {project.category}
                            </span>
                          </div>

                          {/* Watermark Number (01, 02, 03, 04) */}
                          <span className="text-2xl sm:text-3xl font-black tracking-tighter tabular-nums text-[#0B132B]/[0.06] group-hover:text-[#0088CC]/[0.14] transition-colors duration-400 leading-none select-none">
                            {project.number}
                          </span>
                        </div>

                        {/* Project Title */}
                        <h3 className="text-[15px] sm:text-base font-bold text-[#0B132B] tracking-tight leading-snug group-hover:text-[#0088CC] transition-colors duration-300">
                          {project.title}
                        </h3>

                        {/* Project Description */}
                        <p className="mt-1 text-[11px] sm:text-[11.5px] text-[#64748B] leading-relaxed font-normal line-clamp-2">
                          {project.description}
                        </p>

                        {/* Compact Unique Project Preview Visual */}
                        <div className="mt-2.5 relative h-[115px] sm:h-[130px] rounded-[12px] overflow-hidden border border-[#E2E8F0]/90 bg-gradient-to-br from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/50 shadow-[0_3px_12px_rgba(15,23,42,0.04)]">
                          {/* Tech Micro Blueprint Dot Matrix */}
                          <div
                            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay z-10"
                            style={{
                              backgroundImage: 'radial-gradient(circle, #0088CC 0.75px, transparent 0.75px)',
                              backgroundSize: '12px 12px',
                            }}
                          />

                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover object-top transition-transform duration-600 ease-out group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none z-10" />

                          {/* Viewfinder Bottom-Left Corner Accent */}
                          <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-[#00C4FF]/50 rounded-br-[2px] pointer-events-none z-20" />
                        </div>

                        {/* Footer: Tags + Action */}
                        <div className="mt-2.5 pt-2 border-t border-[#E2E8F0]/80 flex flex-wrap items-center justify-between gap-1.5">
                          <div className="flex flex-wrap gap-1">
                            {project.techStack.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-1.5 py-0.5 rounded-md text-[9px] sm:text-[9.5px] font-medium bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] group-hover:border-[#00C4FF]/35 group-hover:text-[#0088CC] transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <span className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-semibold text-[#0088CC] group-hover:text-[#00C4FF] transition-colors">
                            <span>{project.buttonText || 'View Project'}</span>
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
            Inspect all {CLIENT_PROJECTS.length} client projects, technical architectures, and live platforms
          </p>
        </div>
      </div>
    </section>
  );
}
