import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  MapPin,
  Sparkles,
  Target,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import tavqenFav from '../assits/tavqen-fav.webp';
import tavqenLogo from '../assits/Tavqen-logo.png';
import {
  ABOUT_HERO,
  OUR_STORY,
  VISION_MISSION,
  CULTURE_VALUES,
  OUR_IMPACT,
  OUR_FUTURE,
} from '../data/companyData';

gsap.registerPlugin(ScrollTrigger);

interface CompanyPageProps {
  onNavigate?: (path: string) => void;
}

/* Shared class tokens — keeps every section visually identical */
const SECTION =
  'w-full max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 border-t border-[#E2E8F0]';
const CARD =
  'bg-white rounded-[18px] sm:rounded-[20px] border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:border-[#00C4FF]/50 hover:shadow-[0_12px_30px_rgba(0,196,255,0.10)] hover:-translate-y-1 transition-all duration-300';
const ICON_BOX =
  'rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center shrink-0';
const EYEBROW =
  'text-[11px] font-mono font-medium tracking-[0.12em] uppercase text-[#0088CC]';

export default function CompanyPage({ onNavigate }: CompanyPageProps) {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const handleNav = (path: string) => {
    if (path.startsWith('#')) {
      const el = document.getElementById(path.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Hero entrance (single orchestrated moment on load)
      gsap.fromTo(
        '.co-hero-item',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }
      );

      // 2. Emblem: gentle floating loop
      gsap.to('.co-emblem', {
        y: -7,
        duration: 2.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // 3. Section headings & single blocks — soft reveal once
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });

      // 4. Card grids — children stagger in once
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
        gsap.fromTo(
          Array.from(group.children),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: { trigger: group, start: 'top 88%', once: true },
          }
        );
      });
    }, page);

    const raf = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen bg-[#F8FAFC] text-[#0B132B] pt-24 xs:pt-28 sm:pt-32 pb-12 sm:pb-20 overflow-x-clip"
    >
      {/* Ambient glow (absolute, so it stays stable on zoom) */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[480px] pointer-events-none opacity-30 -z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0, 196, 255, 0.14) 0%, rgba(155, 227, 223, 0.10) 45%, transparent 70%)',
        }}
      />

      {/* ================================================================= */}
      {/* 1. ABOUT US — HERO                                                */}
      {/* ================================================================= */}
      <section className="relative z-10 w-full max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 lg:pb-16 lg:pt-[2rem]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left: content */}
          <div className="lg:col-span-7 min-w-0 flex flex-col items-start text-left">
            <div className="co-hero-item inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F7FF] border border-[#00C4FF]/30 text-[#0088CC] text-[11px] font-semibold tracking-wide uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#00C4FF]" />
              <span>{ABOUT_HERO.eyebrow}</span>
            </div>

            <h1 className="co-hero-item text-[28px] xs:text-[32px] sm:text-4xl lg:text-[44px] font-medium tracking-[-0.035em] text-[#0B132B] leading-[1.15] mb-4 max-w-2xl">
              Building Technology.{' '}
              <span className="bg-gradient-to-r from-[#00D4FF] via-[#0088CC] to-[#006699] bg-clip-text text-transparent">
                Empowering Businesses.
              </span>{' '}
              Creating Impact.
            </h1>

            <p className="co-hero-item text-[13px] xs:text-[14px] sm:text-[16px] text-[#64748B] leading-relaxed max-w-xl mb-4 font-normal">
              {ABOUT_HERO.description}
            </p>

            <div className="co-hero-item inline-flex items-center gap-1.5 text-xs text-[#475569] font-medium mb-6">
              <MapPin className="w-3.5 h-3.5 text-[#0088CC] shrink-0" />
              <span>Indore, Madhya Pradesh, India · Est. {ABOUT_HERO.foundedYear}</span>
            </div>

            <div className="co-hero-item flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleNav('#story')}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-[13.5px] font-medium shadow-[0_8px_25px_rgba(0,196,255,0.25)] hover:shadow-[0_10px_30px_rgba(0,196,255,0.35)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Explore Our Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => handleNav('/start-a-project')}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white/80 backdrop-blur-xs text-[#0B132B] text-xs sm:text-[13.5px] font-medium border border-black/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:bg-white hover:text-[#0088CC] hover:border-[#0088CC]/40 hover:shadow-[0_8px_24px_rgba(0,196,255,0.12)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: brand emblem card */}
          <div className="co-hero-item lg:col-span-5 flex justify-center min-w-0">
            <div className="relative w-full max-w-[340px] sm:max-w-[370px] aspect-square rounded-3xl bg-white border border-[#E2E8F0] p-5 sm:p-7 shadow-[0_12px_36px_rgba(15,23,42,0.05)] flex flex-col justify-between overflow-hidden">
              <div
                className="absolute -top-12 -right-12 w-48 h-48 pointer-events-none opacity-30 blur-xl"
                style={{ background: 'radial-gradient(circle, #00C4FF 0%, transparent 70%)' }}
              />

              <div className="flex items-center justify-between gap-2 z-10">
                <img
                  src={tavqenLogo}
                  alt="TAVQEN"
                  className="h-4 sm:h-5 w-auto object-contain opacity-90"
                />
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[10.5px] font-mono font-medium text-[#64748B]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Est. {ABOUT_HERO.foundedYear}</span>
                </div>
              </div>

              <div className="my-auto py-4 flex items-center justify-center relative">
                <div className="absolute w-40 h-40 sm:w-44 sm:h-44 rounded-full border border-dashed border-[#00C4FF]/35 pointer-events-none animate-[spin_24s_linear_infinite]" />
                <div className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-[#0088CC]/20 pointer-events-none animate-[spin_16s_linear_infinite_reverse]" />
                <div className="absolute w-24 h-24 rounded-full bg-[#00C4FF]/20 blur-xl pointer-events-none" />

                <div className="co-emblem relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0B132B] via-[#0F244A] to-[#0B132B] border border-[#00C4FF]/50 flex items-center justify-center shadow-[0_10px_30px_rgba(0,196,255,0.25)]">
                  <img
                    src={tavqenFav}
                    alt="TAVQEN Emblem"
                    className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-[0_2px_8px_rgba(0,196,255,0.5)]"
                  />
                  <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-[#00C4FF]/60" />
                  <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-[#00C4FF]/60" />
                </div>
              </div>

              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-2 text-[11.5px] text-[#64748B] z-10">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0088CC]" />
                  <span>Indore, India</span>
                </span>
                <span className="font-mono text-[11px] text-[#0088CC] font-medium tracking-wide">
                  Software Solutions
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. OUR STORY — DISTINCT EDITORIAL BLUEPRINT TIMELINE              */}
      {/* ================================================================= */}
      <section id="story" className={`relative z-10 ${SECTION} scroll-mt-24`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left sticky editorial anchor */}
          <div data-reveal className="lg:col-span-5 lg:sticky lg:top-28 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F7FF]/80 border border-[#00C4FF]/25 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C4FF]" />
              <span className={EYEBROW}>{OUR_STORY.eyebrow}</span>
            </div>

            <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-medium text-[#0B132B] tracking-[-0.03em] leading-[1.2] mb-4">
              {OUR_STORY.heading}
            </h2>

            <div className="flex items-center gap-2 mb-5">
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC]" />
              <div className="w-2.5 h-1 rounded-full bg-[#00C4FF]/40" />
            </div>

            {/* Compact origin stamp pill */}
            <div className="inline-flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_4px_16px_rgba(15,23,42,0.03)]">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00D4FF]/15 to-[#0088CC]/15 border border-[#00C4FF]/30 flex items-center justify-center font-mono text-[11px] font-bold text-[#0088CC]">
                {ABOUT_HERO.foundedYear}
              </div>
              <div className="text-left">
                <div className="text-[11px] font-semibold text-[#0B132B] leading-tight">
                  TAVQEN Technologies
                </div>
                <div className="text-[10.5px] font-mono text-[#64748B]">
                  Origin &amp; Engineering Journey
                </div>
              </div>
            </div>
          </div>

          {/* Right distinct blueprint narrative container */}
          <div
            data-reveal
            className="lg:col-span-7 min-w-0 relative rounded-[22px] sm:rounded-[26px] bg-gradient-to-br from-white via-[#F9FCFF] to-[#F0F9FF]/75 border border-[#00C4FF]/25 p-5 sm:p-8 shadow-[0_14px_40px_rgba(0,136,204,0.06)] overflow-hidden"
          >
            {/* Subtle architectural dot-grid & top accent beam */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-35"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(0, 136, 204, 0.14) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#00C4FF] to-transparent"
            />

            {/* Vertical connected narrative chapters */}
            <div className="relative z-10 space-y-6 sm:space-y-7">
              {/* Chapter 01 */}
              <div className="relative pl-7 sm:pl-9">
                <span
                  aria-hidden="true"
                  className="absolute left-[9px] sm:left-[11px] top-6 bottom-[-24px] sm:bottom-[-28px] w-[1.5px] bg-gradient-to-b from-[#00C4FF] to-[#0088CC]/25"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border-2 border-[#00C4FF] shadow-[0_0_0_4px_rgba(0,196,255,0.12)] flex items-center justify-center"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0088CC]" />
                </span>

                <div className="text-[10.5px] font-mono font-semibold uppercase tracking-[0.14em] text-[#0088CC] mb-1.5">
                  01 · The Foundation
                </div>
                <p className="text-[#0B132B] font-medium text-[14px] sm:text-[15.5px] leading-relaxed">
                  {OUR_STORY.description}
                </p>
              </div>

              {/* Chapter 02 */}
              <div className="relative pl-7 sm:pl-9">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0B132B] border-2 border-[#00C4FF] shadow-[0_4px_12px_rgba(0,196,255,0.25)] flex items-center justify-center"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00D4FF]" />
                </span>

                <div className="text-[10.5px] font-mono font-semibold uppercase tracking-[0.14em] text-[#0088CC] mb-1.5">
                  02 · What Drives Us Forward
                </div>
                <div className="rounded-xl bg-white/90 border border-[#E2E8F0] border-l-[3px] border-l-[#00C4FF] px-4 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.02)]">
                  <p className="text-[13px] sm:text-sm text-[#475569] leading-relaxed font-normal">
                    {OUR_STORY.highlight}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. VISION & MISSION                                               */}
      {/* ================================================================= */}
      <section className={`relative z-10 ${SECTION}`}>
        <div data-reveal>
          <SectionHeading
            eyebrow="Direction"
            title="Our Vision &"
            highlight="Mission"
            description="The guiding foundation behind our engineering, client relationships, and technological journey."
            className="mb-6 sm:mb-10"
          />
        </div>

        <div data-stagger className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {[
            { data: VISION_MISSION.vision, Icon: Target },
            { data: VISION_MISSION.mission, Icon: Compass },
          ].map(({ data, Icon }) => (
            <div key={data.badge} className={`${CARD} p-5 sm:p-8`}>
              <div className={`w-10 h-10 mb-5 ${ICON_BOX}`}>
                <Icon className="w-[18px] h-[18px] stroke-[2]" />
              </div>
              <span className={`${EYEBROW} mb-1.5 block`}>{data.badge}</span>
              <h3 className="text-base sm:text-lg font-semibold text-[#0B132B] tracking-tight leading-snug mb-2.5">
                {data.headline}
              </h3>
              <p className="text-[13px] sm:text-sm text-[#64748B] leading-relaxed font-normal">
                {data.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. CULTURE & VALUES                                               */}
      {/* ================================================================= */}
      <section className={`relative z-10 ${SECTION}`}>
        <div data-reveal>
          <SectionHeading
            eyebrow="Our Values"
            title="The Principles That"
            highlight="Shape Our Work"
            description="Six fundamental values guiding our team, decisions, commitments, and client partnerships."
            className="mb-6 sm:mb-10"
          />
        </div>

        <div
          data-stagger
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {CULTURE_VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div key={val.number} className={`${CARD} p-5 sm:p-6 group`}>
                <div className="flex items-center justify-between mb-3.5">
                  <div
                    className={`w-9 h-9 !rounded-lg ${ICON_BOX} group-hover:bg-[#0088CC] group-hover:text-white transition-colors`}
                  >
                    <Icon className="w-4 h-4 stroke-[2]" />
                  </div>
                  <span className="font-mono text-xs font-medium text-[#94A3B8]">
                    {val.number}
                  </span>
                </div>
                <h3 className="text-sm sm:text-[15px] font-semibold text-[#0B132B] mb-1.5 group-hover:text-[#0088CC] transition-colors">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed font-normal">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. OUR IMPACT — CONSISTENT TOP HEADING + ARCHITECTURAL BENTO GRID */}
      {/* ================================================================= */}
      <section className={`relative z-10 ${SECTION}`}>
        <div data-reveal>
          <SectionHeading
            eyebrow={OUR_IMPACT.eyebrow}
            title="Turning Ideas into"
            highlight="Practical Technology Solutions"
            description={OUR_IMPACT.description}
            className="mb-6 sm:mb-10"
          />
        </div>

        {/* Framed Architectural Blueprint Grid */}
        <div
          data-reveal
          className="relative rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-white via-[#F9FCFF] to-[#E0F7FF]/45 border border-[#00C4FF]/25 p-4 sm:p-6 lg:p-7 shadow-[0_14px_40px_rgba(0,136,204,0.05)] overflow-hidden"
        >
          {/* Subtle Architectural Dot Pattern & Top Glow Hairline */}
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
            className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#00C4FF] to-transparent"
          />

          <div
            data-stagger
            className="relative z-10 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4"
          >
            {OUR_IMPACT.categories.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative rounded-[18px] bg-white/95 hover:bg-white border border-[#E2E8F0] hover:border-[#00C4FF]/60 p-4 sm:p-5 shadow-[0_4px_16px_rgba(15,23,42,0.025)] hover:shadow-[0_14px_30px_rgba(0,136,204,0.10)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Row: Icon + Number Index */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#E0F7FF] border border-[#00C4FF]/25 text-[#0088CC] flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#00D4FF] group-hover:to-[#0088CC] group-hover:text-white group-hover:shadow-[0_6px_16px_rgba(0,136,204,0.25)] transition-all duration-300">
                      <Icon className="w-[18px] h-[18px] stroke-[2]" />
                    </div>

                    <span className="px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] font-mono text-[10px] font-semibold text-[#94A3B8] group-hover:border-[#00C4FF]/40 group-hover:text-[#0088CC] transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Bottom Row: Category Pill + Title + Animated Accent Line */}
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-[0.12em] text-[#0088CC] mb-1">
                      <span className="w-1 h-1 rounded-full bg-[#00C4FF]" />
                      <span>{item.badge}</span>
                    </div>

                    <h3 className="text-sm sm:text-[15px] font-semibold text-[#0B132B] tracking-tight leading-snug group-hover:text-[#0088CC] transition-colors">
                      {item.title}
                    </h3>

                    {/* Animated Bottom Accent Bar */}
                    <div className="mt-3.5 h-[2px] w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div className="h-full w-6 group-hover:w-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] rounded-full transition-all duration-500" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. OUR FUTURE                                                     */}
      {/* ================================================================= */}
      <section className={`relative z-10 ${SECTION}`}>
        <div data-reveal>
          <SectionHeading
            eyebrow={OUR_FUTURE.eyebrow}
            title="Building Today for a"
            highlight="More Innovative Tomorrow"
            description={OUR_FUTURE.description}
            className="mb-6 sm:mb-10"
          />
        </div>

        <div
          data-stagger
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {OUR_FUTURE.groups.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.category} className={`${CARD} p-5 sm:p-6`}>
                <div className={`w-9 h-9 mb-3.5 !rounded-lg ${ICON_BOX}`}>
                  <Icon className="w-[18px] h-[18px] stroke-[2]" />
                </div>
                <span className="text-[10px] font-mono font-medium text-[#0088CC] uppercase tracking-wider block mb-1">
                  {group.badge}
                </span>
                <h3 className="text-sm sm:text-[15px] font-semibold text-[#0B132B] tracking-tight mb-1.5">
                  {group.category}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed font-normal">
                  {group.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. FINAL CTA (content from reference image)                       */}
      {/* ================================================================= */}
      <section className="relative z-10 w-full max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        <div
          data-reveal
          className="rounded-[28px] sm:rounded-[40px] bg-gradient-to-r from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/60 border border-[#00C4FF]/30 px-5 py-10 xs:px-7 sm:px-12 sm:py-14 text-center flex flex-col items-center shadow-[0_20px_50px_rgba(0,196,255,0.08)]"
        >
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3.5">
            {"Let's Build the Future"}
          </span>

          <h2 className="text-2xl sm:text-4xl font-bold text-[#0B132B] tracking-tight max-w-xl leading-snug">
            {"Have an idea? Let's turn it into reality."}
          </h2>

          <p className="mt-3 text-[13px] sm:text-base text-[#64748B] max-w-lg mb-8 leading-relaxed">
            {"Whether it's a digital product, website, mobile app, or custom software, TAVQEN Technologies is ready to bring your vision to life."}
          </p>

          <button
            type="button"
            onClick={() => handleNav('/start-a-project')}
            className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-sm font-semibold shadow-[0_8px_25px_rgba(0,196,255,0.3)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}