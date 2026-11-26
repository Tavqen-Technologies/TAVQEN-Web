import { useState, useEffect, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';

import product1 from '../assits/products/product1.webp';
import product2 from '../assits/products/product2.webp';
import product3 from '../assits/products/product3.webp';
import product4 from '../assits/products/product4.webp';
import saasImg from '../assits/saas product.avif';

interface ValueStep {
  number: string;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  alt: string;
}

const STEPS: ValueStep[] = [
  {
    number: '01',
    tag: 'PRODUCT MINDSET',
    title: 'Problem First, Not Feature First',
    description:
      'We start by understanding the real business problem before choosing any technology solution. This helps us build something useful, focused, and worth the investment without unnecessary feature bloat.',
    bullets: [
      'Focus on business ROI and tangible metrics',
      'Continuous user feedback loops from prototype to scale',
      'Eliminating complexity in favor of high-leverage outcomes',
    ],
    image: product1,
    alt: 'Product Strategy & Problem Solving Workshop',
  },
  {
    number: '02',
    tag: 'MODERN TECHNOLOGY',
    title: 'Production-Grade Architecture',
    description:
      'We use modern tools, frameworks, and engineering practices to create reliable, blazing-fast, and secure digital platforms that handle real traffic with zero drama.',
    bullets: [
      'Type-safe React, TypeScript & scalable API backends',
      'Zero-downtime CI/CD deployment pipelines',
      'Cloud-native security standards & automated backups',
    ],
    image: saasImg,
    alt: 'Modern Cloud Architecture & High Performance Code',
  },
  {
    number: '03',
    tag: 'USER FIRST',
    title: 'Simple, Intuitive & User-Centric',
    description:
      'We keep the experience simple, intuitive, and focused on the people who use the product every day. Interfaces so thoughtful and clear that they require zero training.',
    bullets: [
      'Fast, snappy interactions with sub-100ms response targets',
      'Accessibility & responsive layout across every device',
      'Ergonomic flows that turn new visitors into loyal power users',
    ],
    image: product3,
    alt: 'Human-Centered Ergonomic UX Design',
  },
  {
    number: '04',
    tag: 'BUILT TO SCALE',
    title: 'Engineered from Day One for Growth',
    description:
      'We build with performance, maintainability, clean documentation, and future growth in mind. Systems that stay rock-solid as your customer base multiplies tenfold.',
    bullets: [
      'Modular micro-service & component architecture',
      'Elastic cloud database caching and query optimization',
      'SLA-ready stability with active monitoring and alerts',
    ],
    image: product2,
    alt: 'Scalable Enterprise Digital Platforms',
  },
  {
    number: '05',
    tag: 'ONE TEAM',
    title: 'We Work As One Team With You',
    description:
      'From idea and roadmap to development and ongoing improvement, we work as one unified team with our clients. Direct communication, transparent updates, and shared commitment.',
    bullets: [
      'Shared Slack/Discord channels with real engineers',
      'Weekly demo sprints and roadmap visibility',
      'True partnership aligned with your long-term success',
    ],
    image: product4,
    alt: 'Collaborative Team Engineering Culture',
  },
];

export default function WhyTavqen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Smooth scroll listener tracking continuous scroll progression
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const section = sectionRef.current;
          if (!section) {
            ticking = false;
            return;
          }

          const rect = section.getBoundingClientRect();
          const sectionHeight = section.offsetHeight;
          const windowHeight = window.innerHeight;

          // Scrollable range through this section
          const totalScrollableDistance = sectionHeight - windowHeight;
          if (totalScrollableDistance <= 0) {
            ticking = false;
            return;
          }

          const scrollOffset = -rect.top;
          const progress = Math.max(0, Math.min(1, scrollOffset / totalScrollableDistance));
          setScrollProgress(progress);

          // Calculate active step with smooth thresholds
          const stepIndex = Math.min(
            STEPS.length - 1,
            Math.floor(progress * STEPS.length)
          );

          setActiveIndex(stepIndex);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth jump to specific step when clicking a step button
  const jumpToStep = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;
    const totalScrollableDistance = sectionHeight - windowHeight;

    // Scroll to the midpoint of the selected step segment for stable centering
    const targetProgress = (index + 0.5) / STEPS.length;
    const targetScrollY = sectionTop + targetProgress * totalScrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="why"
      className="relative bg-[#F8FAFC] border-t border-[#E2E8F0] lg:min-h-[380vh]"
    >
      {/* ========================================================= */}
      {/* STICKY CONTAINER (Sticky on lg+ where 2-col fits height)  */}
      {/* ========================================================= */}
      <div className="lg:sticky lg:top-20 py-14 sm:py-16 lg:py-8 overflow-hidden flex flex-col justify-center">
        {/* Subtle ambient lighting */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] pointer-events-none opacity-25 -z-10"
          style={{
            background:
              'radial-gradient(ellipse, rgba(0, 196, 255, 0.16) 0%, transparent 70%)',
          }}
        />

        <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* ===================================================== */}
          {/* TOP SECTION HEADER (Two-tone matching screenshot)      */}
          {/* ===================================================== */}
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0B132B] leading-[1.12]">
              Why{' '}
              <span className="bg-gradient-to-r from-[#00D4FF] to-[#0088CC] bg-clip-text text-transparent">
                TAVQEN?
              </span>
            </h2>
            <p className="mt-3 text-[14px] sm:text-[15.5px] text-[#64748B] font-normal leading-relaxed max-w-2xl mx-auto">
              We combine technology, creativity, and a product-first mindset to build digital experiences that are made to matter.
            </p>
          </div>

          {/* ===================================================== */}
          {/* HORIZONTAL PROCESS BAR (Matching screenshot track)     */}
          {/* ===================================================== */}
          <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="flex items-center justify-between relative px-2 sm:px-4">
              {STEPS.map((step, idx) => {
                const isActive = activeIndex === idx;
                const isPassed = activeIndex > idx;

                // Continuous smooth liquid progress for the connecting line
                const numLines = STEPS.length - 1;
                const lineStart = idx / numLines;
                const lineProgress = Math.max(
                  0,
                  Math.min(1, (scrollProgress - lineStart) * numLines)
                );

                return (
                  <div key={step.number} className="flex-1 flex items-center">
                    {/* Squircle Step Button */}
                    <button
                      type="button"
                      onClick={() => jumpToStep(idx)}
                      className={`relative z-10 w-9 h-9 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-[22px] flex items-center justify-center font-mono font-bold transition-all duration-300 cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-white border-2 border-[#00C4FF] text-[#0088CC] text-xs sm:text-lg shadow-[0_0_25px_rgba(0,196,255,0.35)] ring-2 sm:ring-4 ring-[#00C4FF]/15 scale-105'
                          : isPassed
                          ? 'bg-white border border-[#0088CC]/50 text-[#0088CC] text-xs sm:text-base hover:border-[#00C4FF]'
                          : 'bg-white border border-[#E2E8F0] text-[#94A3B8] text-xs sm:text-base hover:border-gray-400 hover:text-[#0B132B]'
                      }`}
                      aria-label={`Jump to why step ${step.number}: ${step.title}`}
                    >
                      <span>{step.number}</span>
                    </button>

                    {/* Connecting line to next step with smooth fluid fill */}
                    {idx < STEPS.length - 1 && (
                      <div className="flex-1 min-w-[12px] h-[2px] mx-1 sm:mx-2 bg-[#E2E8F0] rounded-full overflow-hidden relative">
                        <div
                          className="h-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] transition-all duration-150 ease-out"
                          style={{ width: `${Math.round(lineProgress * 100)}%` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===================================================== */}
          {/* MAIN INTERACTIVE DISPLAY CARD WITH SMOOTH TRANSITION  */}
          {/* ===================================================== */}
          <div className="w-full rounded-[32px] sm:rounded-[40px] bg-white border border-[#E2E8F0] shadow-[0_24px_70px_rgba(15,23,42,0.06)] p-7 sm:p-10 lg:p-12 relative overflow-hidden transition-all duration-500">
            {/* Top ambient glowing accent line (matches screenshot top glow) */}
            <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#00C4FF]/70 to-transparent pointer-events-none" />

            {/* Subtle inner ambient card glow */}
            <div
              className="absolute -top-24 -left-24 w-80 h-80 pointer-events-none opacity-40 -z-0"
              style={{
                background: 'radial-gradient(circle, rgba(0, 196, 255, 0.12) 0%, transparent 70%)',
              }}
            />

            {/* Crossfading Step Panels for Silky-Smooth Scroll Progression */}
            <div className="relative min-h-[340px] sm:min-h-[360px] lg:min-h-[370px]">
              {STEPS.map((step, idx) => {
                const isCurrent = activeIndex === idx;

                return (
                  <div
                    key={step.number}
                    className={`transition-all duration-500 ease-out grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                      isCurrent
                        ? 'opacity-100 translate-y-0 scale-100 relative z-10 pointer-events-auto'
                        : 'opacity-0 translate-y-3 scale-[0.98] absolute inset-0 pointer-events-none'
                    }`}
                  >
                    {/* LEFT COLUMN: Pillar Metadata & Story */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                      {/* Tag pill with pulsating status indicator */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F7FF]/90 text-[#0088CC] text-[11px] font-bold tracking-widest uppercase mb-4 sm:mb-5 border border-[#00C4FF]/30 w-fit shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-[#0088CC] animate-pulse" />
                        <span>{step.tag}</span>
                      </div>

                      {/* Main Heading */}
                      <h3 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#0B132B] tracking-[-0.025em] leading-[1.2] mb-4">
                        {step.title}
                      </h3>

                      {/* Detailed Description */}
                      <p className="text-[14.5px] sm:text-[16px] text-[#64748B] leading-[1.7] mb-6 font-normal max-w-xl">
                        {step.description}
                      </p>

                      {/* Key Checklist Features */}
                      <div className="space-y-3 pt-1">
                        {step.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0 shadow-2xs">
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                            <span className="text-[13.5px] sm:text-[14px] font-medium text-[#475569]">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Card Footer: Step Counter & Action CTA */}
                      <div className="mt-8 pt-5 border-t border-[#E2E8F0]/70 flex items-center justify-between">
                        <span className="text-xs text-[#94A3B8] font-mono tracking-wider">
                          Pillar <span className="text-[#0B132B] font-bold">{step.number}</span> of 05
                        </span>
                        <a
                          href="#project"
                          className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors group"
                        >
                          <span>Start a Project</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Realistic Preview Visual */}
                    <div className="lg:col-span-5 w-full flex items-center justify-center">
                      <div className="w-full h-[210px] sm:h-[270px] lg:h-[310px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-black/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.08)] relative bg-[#F1F5F9] group">
                        <img
                          src={step.image}
                          alt={step.alt}
                          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.03]"
                          loading="lazy"
                        />

                        {/* Soft ambient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.12] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
