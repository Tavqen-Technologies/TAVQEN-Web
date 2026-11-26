import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Palette, Code2, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: typeof Compass;
  accentColor: string;
  badgeBg: string;
}

const STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    tagline: 'Strategy & Insights',
    description:
      'Understand the idea, business goals, users, and challenges before we start building.',
    icon: Compass,
    accentColor: '#0088CC',
    badgeBg: 'bg-[#E0F7FF] text-[#0088CC] border-[#00C4FF]/30',
  },
  {
    number: '02',
    title: 'Design',
    tagline: 'UX/UI & Systems',
    description:
      'Shape the experience, user flow, and product direction into a clear and practical solution.',
    icon: Palette,
    accentColor: '#0284C7',
    badgeBg: 'bg-[#F0F9FF] text-[#0284C7] border-[#38BDF8]/35',
  },
  {
    number: '03',
    title: 'Build',
    tagline: 'Engineering & Scale',
    description:
      'Develop fast, scalable, and reliable digital products using modern technologies.',
    icon: Code2,
    accentColor: '#0F766E',
    badgeBg: 'bg-[#E6FAF8] text-[#0F766E] border-[#9BE3DF]/60',
  },
  {
    number: '04',
    title: 'Evolve',
    tagline: 'Growth & Support',
    description:
      'Launch, improve, and continuously evolve the product based on real-world needs and feedback.',
    icon: Rocket,
    accentColor: '#E11D48',
    badgeBg: 'bg-[#FFE4ED]/80 text-[#E11D48] border-[#FDA4AF]/45',
  },
];

// Serpentine S-curve SVG coordinate system (760 x 684)
const VB_W = 760;
const VB_H = 684;

const SERPENTINE_PATH = [
  'M 290 14',
  'L 104 14',
  'A 82 82 0 0 0 104 178',
  'L 656 178',
  'A 82 82 0 0 1 656 342',
  'L 104 342',
  'A 82 82 0 0 0 104 506',
  'L 656 506',
  'A 82 82 0 0 1 656 670',
  'L 470 670',
].join(' ');

const ROW_POSITIONS = [
  { cx: 104, cy: 96, align: 'left' as const },
  { cx: 656, cy: 260, align: 'right' as const },
  { cx: 104, cy: 424, align: 'left' as const },
  { cx: 656, cy: 588, align: 'right' as const },
];

export default function HowTavqen() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const desktopStageRef = useRef<HTMLDivElement | null>(null);
  const ribbonProgressRef = useRef<SVGPathElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = desktopStageRef.current;
    const progressPath = ribbonProgressRef.current;
    if (!section || !stage || !progressPath) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const pathLen = progressPath.getTotalLength();
      gsap.set(progressPath, {
        strokeDasharray: pathLen,
        strokeDashoffset: pathLen,
      });

      // Scroll-scrubbed winding S-curve ribbon draw
      gsap.to(progressPath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          start: 'top 74%',
          end: 'bottom 76%',
          scrub: 0.6,
          onUpdate: (self) => {
            const idx = Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length));
            setActiveStep(idx);
          },
        },
      });

      // Geometric peak accents pop along horizontal bridges
      gsap.fromTo(
        '.serpentine-peaks',
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.14,
          ease: 'back.out(1.6)',
          transformOrigin: 'center center',
          scrollTrigger: {
            trigger: stage,
            start: 'top 72%',
            once: true,
          },
        }
      );

      // Medallions & text blocks animate cleanly as each row enters
      const rows = gsap.utils.toArray<HTMLElement>('.serpentine-row');
      rows.forEach((row, idx) => {
        const medallion = row.querySelector('.serpentine-medallion');
        const textBlock = row.querySelector('.serpentine-text');
        const fromX = idx % 2 === 0 ? 28 : -28;

        if (medallion) {
          gsap.fromTo(
            medallion,
            { opacity: 0, scale: 0.75 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: 'back.out(1.4)',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: row,
                start: 'top 82%',
                once: true,
              },
            }
          );
        }

        if (textBlock) {
          gsap.fromTo(
            textBlock,
            { opacity: 0, x: fromX },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              delay: 0.08,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: row,
                start: 'top 82%',
                once: true,
              },
            }
          );
        }
      });

      // Mobile step cards scroll reveal
      const mobileCards = gsap.utils.toArray<HTMLElement>('.how-mobile-card');
      mobileCards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how"
      className="py-20 sm:py-24 lg:py-28 bg-[#F8FAFC] border-t border-[#E2E8F0] relative overflow-hidden"
    >
      {/* Subtle organic light accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[420px] pointer-events-none opacity-30 -z-10"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0, 196, 255, 0.14) 0%, rgba(155, 227, 223, 0.12) 45%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20" data-animate="fade-up">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            Our Approach
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0B132B] leading-[1.15]">
            How TAVQEN
          </h2>
          <p className="mt-3.5 sm:mt-4 text-[14px] sm:text-[15.5px] text-[#64748B] font-normal leading-relaxed">
            We turn ideas into practical digital products through a clear, collaborative, and technology-driven approach.
          </p>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP & TABLET S-CURVE SERPENTINE RIBBON (md+)          */}
        {/* ========================================================= */}
        <div
          ref={desktopStageRef}
          className="hidden md:block relative w-full max-w-[840px] mx-auto"
          style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
        >
          {/* SVG Serpentine Ribbon + Geometric Bridge Chevrons */}
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          >
            <defs>
              <linearGradient id="tavqenSerpentineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D4FF" />
                <stop offset="50%" stopColor="#0088CC" />
                <stop offset="100%" stopColor="#0B132B" />
              </linearGradient>

              <filter id="ribbonShadow" x="-10%" y="-10%" width="120%" height="125%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0F172A" floodOpacity="0.06" />
              </filter>
            </defs>

            {/* Soft White Pill Lane Backdrop along the S-Curve */}
            <path
              d={SERPENTINE_PATH}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="138"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.72"
            />

            {/* Base Slate Ribbon Track */}
            <path
              d={SERPENTINE_PATH}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="7.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#ribbonShadow)"
            />

            {/* Scroll-Animated Cyan-to-Navy Ribbon Fill */}
            <path
              ref={ribbonProgressRef}
              d={SERPENTINE_PATH}
              fill="none"
              stroke="url(#tavqenSerpentineGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Geometric Peak Accents on Horizontal Bridges (matching reference) */}
            {/* Bridge 1 (upward peaks around x=415, y=178) */}
            <g className="serpentine-peaks">
              <polygon points="365,178 390,144 415,178" fill="#00D4FF" opacity="0.88" />
              <polygon points="405,178 424,154 443,178" fill="#0088CC" opacity="0.92" />
              <polygon points="436,178 450,160 464,178" fill="#9BE3DF" opacity="0.95" />
            </g>

            {/* Bridge 2 (downward peaks around x=310, y=342) */}
            <g className="serpentine-peaks">
              <polygon points="265,342 282,364 299,342" fill="#9BE3DF" opacity="0.95" />
              <polygon points="292,342 315,374 338,342" fill="#0088CC" opacity="0.92" />
              <polygon points="330,342 346,362 362,342" fill="#00D4FF" opacity="0.88" />
            </g>

            {/* Bridge 3 (downward peaks around x=480, y=506) */}
            <g className="serpentine-peaks">
              <polygon points="435,506 450,526 465,506" fill="#00D4FF" opacity="0.88" />
              <polygon points="458,506 481,538 504,506" fill="#0088CC" opacity="0.92" />
              <polygon points="496,506 512,526 528,506" fill="#9BE3DF" opacity="0.95" />
            </g>
          </svg>

          {/* 4 Alternating Serpentine Rows: Circular Medallion + Text Block */}
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const pos = ROW_POSITIONS[idx];
            const isLeftMedallion = pos.align === 'left';
            const isActive = idx <= activeStep;

            return (
              <div
                key={step.number}
                onMouseEnter={() => setActiveStep(idx)}
                className="serpentine-row group"
              >
                {/* Circular White Elevated Medallion nestled inside U-turn */}
                <div
                  className="serpentine-medallion absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${(pos.cx / VB_W) * 100}%`,
                    top: `${(pos.cy / VB_H) * 100}%`,
                    width: '16.8%',
                    aspectRatio: '1 / 1',
                  }}
                >
                  <div
                    className={`w-full h-full rounded-full bg-white border-2 flex flex-col items-center justify-center transition-all duration-400 group-hover:scale-105 ${
                      isActive
                        ? 'border-[#00C4FF]/60 shadow-[0_18px_42px_rgba(0,196,255,0.18),0_4px_12px_rgba(15,23,42,0.06)]'
                        : 'border-[#E2E8F0] shadow-[0_14px_32px_rgba(15,23,42,0.08)]'
                    }`}
                  >
                    <div
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center mb-1 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${step.accentColor}14`,
                        color: step.accentColor,
                      }}
                    >
                      <Icon className="w-5 h-5 lg:w-6 lg:h-6 stroke-[2]" />
                    </div>
                    <span className="font-mono text-[10px] lg:text-[11px] font-bold text-[#94A3B8] tracking-wider">
                      STEP {step.number}
                    </span>
                  </div>
                </div>

                {/* Alternating Content Block Inside Horizontal Lane */}
                <div
                  className={`serpentine-text absolute z-10 -translate-y-1/2 w-[54%] ${
                    isLeftMedallion ? 'text-right pr-2' : 'text-left pl-2'
                  }`}
                  style={{
                    top: `${(pos.cy / VB_H) * 100}%`,
                    left: isLeftMedallion ? undefined : '10.5%',
                    right: isLeftMedallion ? '10.5%' : undefined,
                  }}
                >
                  <div
                    className={`inline-flex items-center gap-2 mb-1.5 ${
                      isLeftMedallion ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${step.badgeBg}`}
                    >
                      {step.number} · Step {idx + 1} of 4
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                      {step.tagline}
                    </span>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-[#0B132B] tracking-tight group-hover:text-[#0088CC] transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-xs lg:text-[13.5px] text-[#64748B] leading-relaxed font-normal max-w-[360px] inline-block">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* MOBILE VERTICAL STEP FLOW (< md)                          */}
        {/* ========================================================= */}
        <div className="md:hidden relative pl-6 border-l-2 border-[#00C4FF]/45 space-y-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="how-mobile-card relative rounded-[24px] bg-white border border-[#E2E8F0] p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)]"
              >
                {/* Connector node */}
                <span className="absolute -left-[31px] top-7 w-3.5 h-3.5 rounded-full bg-[#00C4FF] border-2 border-white ring-4 ring-[#00C4FF]/15" />

                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-full border border-[#E2E8F0] shadow-xs flex items-center justify-center"
                      style={{
                        backgroundColor: `${step.accentColor}14`,
                        color: step.accentColor,
                      }}
                    >
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div>
                      <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#94A3B8] block">
                        {step.tagline}
                      </span>
                      <h3 className="text-lg font-bold text-[#0B132B] leading-tight">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${step.badgeBg}`}
                  >
                    {step.number}
                  </span>
                </div>

                <p className="text-[13.5px] text-[#64748B] leading-relaxed">
                  {step.description}
                </p>

                <div className="mt-3 pt-3 border-t border-[#E2E8F0]/70 flex items-center justify-between text-[11.5px] font-medium text-[#94A3B8]">
                  <span>Step {idx + 1} of 4</span>
                  <span className="w-2 h-2 rounded-full bg-[#00C4FF]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
