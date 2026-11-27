import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ClipboardCheck,
  Lightbulb,
  Rocket,
  Search,
  Settings,
  Target,
} from 'lucide-react';
import OurProducts from '../components/OurProducts';
import TavqenProductsOrbit from '../components/TavqenProductsOrbit';

gsap.registerPlugin(ScrollTrigger);

interface ProductsPageProps {
  onNavigate?: (path: string) => void;
}

interface TimelineItem {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
}

const WHY_PRINCIPLES: TimelineItem[] = [
  {
    number: '01',
    eyebrow: 'Focus 01',
    title: 'User-Focused Thinking',
    description:
      'We begin by understanding the everyday task people need to complete and the practical friction they face before designing screens.',
    tags: ['Real tasks', 'Friction mapping'],
  },
  {
    number: '02',
    eyebrow: 'Focus 02',
    title: 'Practical Experiences',
    description:
      'We aim to make product workflows clear and understandable so people can focus directly on their task without unnecessary clutter.',
    tags: ['Clear workflows', 'Zero clutter'],
  },
  {
    number: '03',
    eyebrow: 'Focus 03',
    title: 'Ownership & Responsibility',
    description:
      'We build our own products in-house and take direct responsibility for maintaining and improving what we publish.',
    tags: ['Built in-house', 'Direct ownership'],
  },
  {
    number: '04',
    eyebrow: 'Focus 04',
    title: 'Continuous Improvement',
    description:
      'We use real testing, bug reports, and observed usage issues to guide practical improvements and reliable releases.',
    tags: ['Real testing', 'Reliable updates'],
  },
];

const WHY_TRACK_WIDTHS = ['14%', '39%', '64%', '100%'];

const LIFECYCLE_STEPS = [
  {
    step: '01',
    title: 'Research & Discovery',
    summary: 'Understand intended users, their tasks, existing alternatives, and the real problem the product should address.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Planning & Design',
    summary: 'Define product scope, user flows, requirements, and technical structure before writing production code.',
    icon: Lightbulb,
  },
  {
    step: '03',
    title: 'Development',
    summary: 'Build planned functionality and integrate local storage, file workflows, and UI components cleanly.',
    icon: Settings,
  },
  {
    step: '04',
    title: 'Testing & Quality Checks',
    summary: 'Verify core functionality, usability, compatibility, and important edge cases prior to release.',
    icon: ClipboardCheck,
  },
  {
    step: '05',
    title: 'Release',
    summary: 'Prepare verified product details, release notes, and official distribution paths for intended users.',
    icon: Rocket,
  },
  {
    step: '06',
    title: 'Maintenance & Improvement',
    summary: 'Review user feedback and observed issues, then plan fixes and updates based on evidence.',
    icon: Target,
  },
];

interface EditorialTimelineProps {
  items: TimelineItem[];
  activeIdx: number;
  inView: boolean;
  trackWidths: string[];
  revealClass: string;
  onSelect: (idx: number) => void;
}

/** Shared horizontal-desktop / vertical-mobile animated progress timeline. */
function EditorialTimeline({
  items,
  activeIdx,
  inView,
  trackWidths,
  revealClass,
  onSelect,
}: EditorialTimelineProps) {
  const stepPct = 100 / items.length;

  return (
    <>
      {/* Desktop Animated Horizontal Sequence (lg+) */}
      <div className={`${revealClass} hidden lg:block`}>
        <div className="relative h-9 flex items-center mb-7">
          <div className="relative w-full h-[1.5px] bg-[#CBD5E1]">
            <div
              aria-hidden="true"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[1.5px] h-3 bg-[#94A3B8]"
            />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-gradient-to-r from-[#00D4FF] via-[#0099DB] to-[#0088CC] transition-all duration-700 ease-out shadow-[0_0_12px_rgba(0,196,255,0.45)]"
              style={{
                width: inView ? trackWidths[activeIdx] : '0%',
              }}
            />
          </div>

          {items.map((item, idx) => {
            const isActive = idx === activeIdx;
            const isReached = idx <= activeIdx;
            return (
              <button
                key={item.number}
                type="button"
                onClick={() => onSelect(idx)}
                onMouseEnter={() => onSelect(idx)}
                style={{ left: `${idx * stepPct}%` }}
                aria-label={`Select ${item.title}`}
                className={`absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full text-[11px] font-bold tabular-nums flex items-center justify-center transition-all duration-500 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-br from-[#00D4FF] to-[#0088CC] text-white border-2 border-[#0B132B] shadow-[0_0_0_6px_rgba(0,196,255,0.2)] scale-110'
                    : isReached
                      ? 'bg-gradient-to-br from-[#00C4FF] to-[#0088CC] text-white shadow-[0_4px_14px_rgba(0,136,204,0.25)] hover:scale-105'
                      : 'bg-white text-[#0088CC] border-2 border-[#00C4FF]/50 hover:border-[#0088CC] hover:scale-105'
                }`}
              >
                {item.number}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-4">
          {items.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={item.number}
                onMouseEnter={() => onSelect(idx)}
                onClick={() => onSelect(idx)}
                className="group cursor-pointer pr-3 xl:pr-8 last:pr-0"
              >
                <div
                  className={`h-full rounded-2xl p-3.5 xl:p-4 lg:-ml-2 xl:-ml-4 border transition-all duration-300 ${
                    isActive
                      ? 'bg-white border-[#00C4FF]/45 shadow-[0_14px_34px_rgba(0,136,204,0.1)]'
                      : 'border-transparent hover:bg-white/60 hover:border-[#E2E8F0]'
                  }`}
                >
                  <span
                    className={`block text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2 transition-colors ${
                      isActive ? 'text-[#0088CC]' : 'text-[#64748B]'
                    }`}
                  >
                    {item.eyebrow}
                  </span>
                  <h3
                    className={`text-lg xl:text-[21px] font-bold tracking-tight leading-snug mb-2 transition-colors ${
                      isActive ? 'text-[#0B132B]' : 'text-[#1E293B] group-hover:text-[#0B132B]'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[12.5px] xl:text-[13px] text-[#64748B] leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-[4px] border px-2.5 py-1 text-[11px] transition-colors ${
                          isActive
                            ? 'border-[#00C4FF]/60 bg-[#E0F7FF]/60 text-[#0088CC] font-semibold'
                            : 'border-[#CBD5E1] bg-white text-[#475569]'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile & Tablet Vertical Timeline Flow (< lg) */}
      <div className={`${revealClass} relative lg:hidden pl-11 space-y-6`}>
        <div
          aria-hidden="true"
          className="absolute left-[17px] top-4 bottom-4 w-[1.5px] bg-[#CBD5E1]"
        >
          <div
            className="w-full bg-gradient-to-b from-[#00D4FF] to-[#0088CC] transition-all duration-700 ease-out"
            style={{ height: `${((activeIdx + 1) / items.length) * 100}%` }}
          />
        </div>

        {items.map((item, idx) => {
          const isActive = idx === activeIdx;
          return (
            <div
              key={item.number}
              onClick={() => onSelect(idx)}
              className={`relative rounded-2xl p-4 sm:p-5 border transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-white border-[#00C4FF]/50 shadow-[0_10px_26px_rgba(0,136,204,0.08)]'
                  : 'bg-white/80 border-[#E2E8F0]'
              }`}
            >
              <span
                className={`absolute -left-11 top-4 w-9 h-9 rounded-full text-[11px] font-bold tabular-nums flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-br from-[#00D4FF] to-[#0088CC] text-white border-2 border-[#0B132B] shadow-[0_0_0_4px_rgba(0,196,255,0.2)]'
                    : 'bg-gradient-to-br from-[#00C4FF] to-[#0088CC] text-white'
                }`}
              >
                {item.number}
              </span>

              <span className="block text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#0088CC] mb-1">
                {item.eyebrow}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#0B132B] mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-3">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-0.5 rounded-[4px] border text-[10.5px] ${
                      isActive
                        ? 'border-[#00C4FF]/60 bg-[#E0F7FF]/60 text-[#0088CC] font-semibold'
                        : 'border-[#CBD5E1] bg-white text-[#475569]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

interface EditorialRailProps {
  stepNumber: string;
  verticalLabel: string;
  progressPercent: number;
}

/** Shared left vertical editorial index rail used across process sections. */
function EditorialRail({ stepNumber, verticalLabel, progressPercent }: EditorialRailProps) {
  return (
    <div
      className="hidden lg:flex flex-col items-center shrink-0 w-10 mr-5 xl:mr-8 pt-1 select-none"
      aria-hidden="true"
    >
      <div className="relative w-[1.5px] h-28 bg-[#CBD5E1]/70 overflow-hidden">
        <div
          className="w-full bg-gradient-to-b from-[#00D4FF] to-[#0088CC] transition-all duration-700 ease-out"
          style={{ height: `${progressPercent}%` }}
        />
      </div>

      <div className="my-2 w-7 h-7 rounded-[4px] bg-gradient-to-br from-[#00D4FF] to-[#0088CC] text-white text-[10px] font-bold tabular-nums flex items-center justify-center shadow-[0_4px_12px_rgba(0,136,204,0.28)] transition-transform duration-300">
        {stepNumber}
      </div>

      <span className="mt-2 text-[9.5px] font-bold tracking-[0.22em] uppercase text-[#0088CC] [writing-mode:vertical-rl]">
        {verticalLabel}
      </span>

      <div className="mt-4 w-[1px] flex-1 bg-[#E2E8F0]" />
    </div>
  );
}

export default function ProductsPage({ onNavigate }: ProductsPageProps) {
  const whySectionRef = useRef<HTMLElement | null>(null);
  const howSectionRef = useRef<HTMLElement | null>(null);
  const [activePrinciple, setActivePrinciple] = useState(0);
  const [isWhyPaused, setIsWhyPaused] = useState(false);
  const [whyInView, setWhyInView] = useState(false);
  const [activeLifecycle, setActiveLifecycle] = useState(0);
  const [isHowPaused, setIsHowPaused] = useState(false);
  const [howInView, setHowInView] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (whySectionRef.current) {
        gsap.from('.why-reveal', {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: whySectionRef.current,
            start: 'top 86%',
            once: true,
            onEnter: () => {
              setActivePrinciple(0);
              setWhyInView(true);
            },
          },
        });
      }

      if (howSectionRef.current) {
        gsap.from('.how-reveal', {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: howSectionRef.current,
            start: 'top 86%',
            once: true,
            onEnter: () => {
              setActiveLifecycle(0);
              setHowInView(true);
            },
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!whyInView || isWhyPaused) return;
    const timer = window.setInterval(() => {
      setActivePrinciple((prev) => (prev + 1) % WHY_PRINCIPLES.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [whyInView, isWhyPaused]);

  useEffect(() => {
    if (!howInView || isHowPaused) return;
    const timer = window.setInterval(() => {
      setActiveLifecycle((prev) => (prev + 1) % LIFECYCLE_STEPS.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [howInView, isHowPaused]);

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="pb-16 sm:pb-24 lg:pb-28 bg-[#F8FAFC] overflow-x-clip">
      {/* ========================================================= */}
      {/* EXISTING UI 1: TAVQEN ORBITAL PRODUCTS COSMOS (UNCHANGED) */}
      {/* ========================================================= */}
      <TavqenProductsOrbit onNavigate={onNavigate} />

      {/* ========================================================= */}
      {/* EXISTING UI 2: FULL PRODUCTS GALLERY (UNCHANGED)          */}
      {/* ========================================================= */}
      <OurProducts isFullPage={true} onNavigate={onNavigate} />

      {/* ========================================================= */}
      {/* SECTION: WHY TAVQEN PRODUCTS (EDITORIAL TIMELINE UI)      */}
      {/* ========================================================= */}
      <section
        ref={whySectionRef}
        onMouseEnter={() => setIsWhyPaused(true)}
        onMouseLeave={() => setIsWhyPaused(false)}
        className="relative py-16 sm:py-24 bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-hidden"
      >
        <div className="w-full max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex">
            {/* Left Vertical Editorial Rail (Desktop lg+) */}
            <EditorialRail
              stepNumber={WHY_PRINCIPLES[activePrinciple].number}
              verticalLabel="Why Tavqen"
              progressPercent={((activePrinciple + 1) / WHY_PRINCIPLES.length) * 100}
            />

            {/* Main Editorial Content Canvas */}
            <div className="flex-1 min-w-0">
              {/* Top Asymmetric Split Heading */}
              <div className="why-reveal grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-12 sm:mb-16">
                <div className="lg:col-span-7">
                  <span className="inline-block lg:hidden px-3 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3">
                    Why TAVQEN Products
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#0B132B] tracking-[-0.025em] leading-[1.1]">
                    Built with Purpose.
                    <br />
                    <span className="text-[#0B132B]">
                      Developed Around{' '}
                      <span className="bg-gradient-to-r from-[#0088CC] to-[#00C4FF] bg-clip-text text-transparent font-bold">
                        Real Needs.
                      </span>
                    </span>
                  </h2>
                </div>

                <div className="lg:col-span-5 lg:pb-1">
                  <p className="text-sm sm:text-[15px] text-[#64748B] leading-relaxed max-w-md">
                    At TAVQEN Technology, useful software begins with understanding the people who use it—focusing on practical tasks, clear workflows, and ongoing improvement.
                  </p>
                </div>
              </div>

              <EditorialTimeline
                items={WHY_PRINCIPLES}
                activeIdx={activePrinciple}
                inView={whyInView}
                trackWidths={WHY_TRACK_WIDTHS}
                revealClass="why-reveal"
                onSelect={setActivePrinciple}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION: HOW WE BUILD OUR PRODUCTS (6-PANEL CHEVRON FLOW) */}
      {/* ========================================================= */}
      <section
        ref={howSectionRef}
        onMouseEnter={() => setIsHowPaused(true)}
        onMouseLeave={() => setIsHowPaused(false)}
        className="py-16 sm:py-24 bg-white border-t border-[#E2E8F0] overflow-hidden"
      >
        <div className="w-full max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex">
            {/* Left Vertical Editorial Rail matching Why TAVQEN */}
            <EditorialRail
              stepNumber={LIFECYCLE_STEPS[activeLifecycle].step}
              verticalLabel="How We Build"
              progressPercent={((activeLifecycle + 1) / LIFECYCLE_STEPS.length) * 100}
            />

            <div className="flex-1 min-w-0">
              <div className="how-reveal flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 sm:mb-14">
                <div className="max-w-2xl">
                  <span className="inline-block lg:hidden px-3 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3">
                    How We Build
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#0B132B] tracking-[-0.025em] leading-[1.1]">
                    From Idea to{' '}
                    <span className="bg-gradient-to-r from-[#0088CC] to-[#00C4FF] bg-clip-text text-transparent font-bold">
                      Useful Software.
                    </span>
                  </h2>
                  <p className="mt-3 text-sm sm:text-[15px] text-[#64748B] leading-relaxed">
                    Every product moves through research, planning, engineering, testing, release, and continuous maintenance based on real user feedback.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNav('/company')}
                  className="self-start md:self-auto inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0088CC] hover:text-[#0B132B] transition-colors cursor-pointer shrink-0"
                >
                  <span>Meet TAVQEN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Layered Vertical Paper Strips with Protruding Chevron Ribbons */}
              <div className="how-reveal grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {LIFECYCLE_STEPS.map((item, idx) => {
                  const Icon = item.icon;
                  const isLast = idx === LIFECYCLE_STEPS.length - 1;
                  const isActive = idx === activeLifecycle;
                  return (
                    <div
                      key={item.step}
                      onMouseEnter={() => setActiveLifecycle(idx)}
                      onClick={() => setActiveLifecycle(idx)}
                      className={`group relative pt-9 pb-10 sm:pt-12 sm:pb-12 pl-8 pr-4 sm:pl-7 sm:pr-3.5 flex flex-col items-center text-center transition-colors duration-300 border-b border-[#E2E8F0]/70 lg:border-b-0 cursor-pointer ${
                        isActive ? 'bg-[#F0F9FF]/75' : 'bg-white hover:bg-[#F8FAFC]/80'
                      }`}
                    >
                      {/* Soft Fading Vertical Seam Shadow (left edge) */}
                      <div
                        aria-hidden="true"
                        style={{
                          maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
                          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
                        }}
                        className="pointer-events-none absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-[#0B132B]/[0.09] via-[#0B132B]/[0.025] to-transparent"
                      />

                      {/* Soft Fading Vertical Seam Shadow (closing right edge on last column) */}
                      {isLast && (
                        <div
                          aria-hidden="true"
                          style={{
                            maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
                          }}
                          className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-3.5 bg-gradient-to-l from-[#0B132B]/[0.09] via-[#0B132B]/[0.025] to-transparent"
                        />
                      )}

                      {/* Protruding 2-Tone Folded Chevron Ribbon */}
                      <svg
                        viewBox="0 0 22 60"
                        className={`pointer-events-none absolute left-0 top-[96px] sm:top-[110px] -translate-y-1/2 w-[18px] h-[50px] drop-shadow-[2px_3px_4px_rgba(0,136,204,0.2)] transition-transform duration-300 ${
                          isActive ? 'translate-x-1 scale-105' : 'group-hover:translate-x-0.5'
                        }`}
                        aria-hidden="true"
                      >
                        <polygon points="0,0 20,30 12,30 0,12" fill="#38BDF8" />
                        <polygon points="12,30 20,30 0,60 0,48" fill="#0088CC" />
                      </svg>

                      {/* Minimalist Line Icon */}
                      <div
                        className={`mb-5 flex items-center justify-center w-10 h-10 transition-all duration-300 ${
                          isActive ? 'text-[#0088CC] -translate-y-0.5' : 'text-[#0B132B] group-hover:-translate-y-0.5'
                        }`}
                      >
                        <Icon className="w-8 h-8" strokeWidth={1.35} />
                      </div>

                      {/* Step Number + Uppercase Title */}
                      <span
                        className={`text-[10.5px] font-bold tracking-widest tabular-nums mb-1 transition-colors ${
                          isActive ? 'text-[#0088CC]' : 'text-[#64748B]'
                        }`}
                      >
                        {item.step}
                      </span>
                      <h3 className="text-[12px] sm:text-[12.5px] font-bold uppercase tracking-wider text-[#0B132B] leading-snug mb-2.5 min-h-[2.4em] flex items-center justify-center">
                        {item.title}
                      </h3>

                      {/* Centered Summary Copy */}
                      <p className="text-[12px] text-[#64748B] leading-relaxed max-w-[230px] lg:max-w-none">
                        {item.summary}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* EXISTING FINAL CALL TO ACTION BANNER                      */}
      {/* ========================================================= */}
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="rounded-[24px] sm:rounded-[34px] lg:rounded-[40px] bg-gradient-to-r from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/60 border border-[#00C4FF]/30 p-6 sm:p-10 md:p-12 text-center flex flex-col items-center shadow-[0_20px_50px_rgba(0,196,255,0.08)]">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            TAVQEN Technology Products
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0B132B] tracking-tight max-w-xl leading-snug">
            Find the Right Product for Your Needs
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] max-w-lg mb-7 sm:mb-8 leading-relaxed">
            Explore the products developed by TAVQEN Technology, review supported platforms and features, or contact our team with product questions.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-3.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => scrollToSection('products')}
              className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-sm font-semibold shadow-[0_8px_25px_rgba(0,196,255,0.3)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleNav('/start-a-project')}
              className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-7 py-3 sm:py-3.5 rounded-full bg-white border border-[#E2E8F0] hover:border-[#0088CC] text-[#0B132B] text-sm font-semibold transition-all cursor-pointer"
            >
              <span>Contact TAVQEN</span>
            </button>
          </div>
          <p className="mt-4 text-[11.5px] font-medium text-[#64748B]">
            Check product availability and compatibility before downloading or installing.
          </p>
        </div>
      </div>
    </div>
  );
}
