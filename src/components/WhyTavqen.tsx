import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Layers,
  Cpu,
  Lightbulb,
  UserCheck,
  Users,
  RefreshCw,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

interface StrengthPillar {
  number: string;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  icon: any;
}

const PILLARS: StrengthPillar[] = [
  {
    number: '01',
    tag: 'CORE PRINCIPLE',
    title: 'Product-First Mindset',
    description:
      'We prioritize core product value, practical workflows, and real-world utility over vanity features or unnecessary bloat.',
    bullets: [
      'Problem-first approach to every feature',
      'Eliminating unnecessary feature bloat',
      'Engineered for long-term product viability',
    ],
    icon: Layers,
  },
  {
    number: '02',
    tag: 'PRODUCTION-GRADE',
    title: 'Modern Technology',
    description:
      'Built with production-proven tools like React, TypeScript, Next.js, and scalable APIs for fast load speeds and security.',
    bullets: [
      'Type-safe, modular code architecture',
      'Fast load speeds and responsive interfaces',
      'Cloud-native deployment and automated backups',
    ],
    icon: Cpu,
  },
  {
    number: '03',
    tag: 'INNOVATIVE SOLUTIONS',
    title: 'Creative Thinking',
    description:
      'We find pragmatic, out-of-the-box solutions to complex technical challenges, tailored directly to your business goals.',
    bullets: [
      'Pragmatic system design & architecture',
      'Tailored technical problem solving',
      'Adaptable, scalable digital solutions',
    ],
    icon: Lightbulb,
  },
  {
    number: '04',
    tag: 'INTUITIVE UX',
    title: 'User-Focused Approach',
    description:
      'Every interface is designed for real humans—clean, accessible, and intuitive, reducing friction and learning curves for end users.',
    bullets: [
      'Simple, ergonomic, and clear user flows',
      'Consistent experience across all devices',
      'Accessible layouts and readable typography',
    ],
    icon: UserCheck,
  },
  {
    number: '05',
    tag: 'DIRECT PARTNERSHIP',
    title: 'Collaborative Teamwork',
    description:
      'We work as an extension of your own team with transparent communication, direct developer access, and regular milestone demos.',
    bullets: [
      'Direct, responsive developer access',
      'Regular progress updates and roadmap visibility',
      'True partnership aligned with your success',
    ],
    icon: Users,
  },
  {
    number: '06',
    tag: 'ONGOING ITERATION',
    title: 'Continuous Improvement',
    description:
      'We continuously refine techniques, update security standards, and optimize code performance as technologies evolve.',
    bullets: [
      'Proactive code tuning and security audits',
      'Iterative enhancements and smooth scaling',
      'Dependable ongoing technical support',
    ],
    icon: RefreshCw,
  },
];

interface WhyTavqenProps {
  onNavigate?: (path: string) => void;
}

export default function WhyTavqen({ onNavigate }: WhyTavqenProps = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Smooth scroll to a specific card index
  const scrollToCard = useCallback((index: number) => {
    const container = sliderRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('[data-card]');
    if (cards[index]) {
      const card = cards[index];
      const scrollLeft = card.offsetLeft - container.offsetLeft;
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  }, []);

  // Slide to next card with looping
  const handleNext = useCallback(() => {
    const nextIdx = (activeIndex + 1) % PILLARS.length;
    scrollToCard(nextIdx);
  }, [activeIndex, scrollToCard]);

  // Slide to previous card
  const handlePrev = useCallback(() => {
    const prevIdx = (activeIndex - 1 + PILLARS.length) % PILLARS.length;
    scrollToCard(prevIdx);
  }, [activeIndex, scrollToCard]);

  // Automatic horizontal sliding carousel (smoothly cycles every 3.8s, pauses on hover)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Sync active index when user manually swipes / scrolls
  const handleScrollSync = () => {
    const container = sliderRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('[data-card]');
    const scrollLeft = container.scrollLeft;

    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardLeft = card.offsetLeft - container.offsetLeft;
      const distance = Math.abs(cardLeft - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx);
  };

  return (
    <section
      id="why"
      className="relative bg-[#F8FAFC] border-t border-[#E2E8F0] py-10 sm:py-14 overflow-hidden"
    >
      {/* Subtle Cyan Ambient Radial Lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[260px] pointer-events-none opacity-20 -z-10"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0, 196, 255, 0.14) 0%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="max-w-xl mx-auto text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E0F7FF]/90 border border-[#00C4FF]/30 text-[#0088CC] text-[10px] font-mono font-semibold tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0088CC]" />
            <span>Why Choose Us</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#0B132B] leading-[1.2]">
            Why{' '}
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#0088CC] bg-clip-text text-transparent">
              TAVQEN?
            </span>
          </h2>

          <p className="mt-2 text-[11.5px] sm:text-[12.5px] text-[#64748B] font-normal leading-relaxed max-w-lg mx-auto">
            We build our own digital products and develop practical technology solutions for businesses. Our focus is on creativity, collaboration, modern technologies, and continuous improvement.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 3-CARD HORIZONTAL SLIDING CAROUSEL (DESKTOP: EXACTLY 3)   */}
        {/* ========================================================= */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Scrollable Track: Exactly 3 cards visible on Desktop (lg), 2 on Tablet (sm/md), 1 on Mobile */}
          <div
            ref={sliderRef}
            onScroll={handleScrollSync}
            className="flex gap-3.5 overflow-x-auto scroll-smooth py-1.5 px-0.5 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activeIndex === idx;

              return (
                <div
                  key={pillar.number}
                  data-card
                  className="w-full sm:w-[calc((100%-0.875rem)/2)] lg:w-[calc((100%-1.75rem)/3)] shrink-0 snap-start rounded-xl bg-white border border-[#E2E8F0] hover:border-[#00C4FF]/50 p-3.5 sm:p-4 shadow-[0_3px_14px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_24px_rgba(0,196,255,0.07)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Icon + Number & Tag Badge */}
                    <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[#F1F5F9]">
                      <div
                        className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-[#E0F7FF] text-[#0088CC]'
                            : 'bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 stroke-[2]" />
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]/70">
                          {pillar.number} / 0{PILLARS.length}
                        </span>
                      </div>
                    </div>

                    {/* Tag pill */}
                    <span className="inline-block text-[9px] font-mono font-bold tracking-wider uppercase text-[#0088CC] mb-0.5">
                      {pillar.tag}
                    </span>

                    {/* Title */}
                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#0B132B] tracking-tight mb-1 leading-snug">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[11px] sm:text-[11.5px] text-[#64748B] leading-relaxed mb-2.5 font-normal">
                      {pillar.description}
                    </p>

                    {/* 3 Checklist Features */}
                    <div className="space-y-1 pt-0.5">
                      {pillar.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center shrink-0">
                            <Check className="w-2 h-2 stroke-[2.5]" />
                          </div>
                          <span className="text-[10.5px] sm:text-[11px] font-medium text-[#475569] leading-snug">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Indicator */}
                  <div className="mt-3 pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[10px]">
                    <span
                      className={`font-semibold transition-colors ${
                        isActive ? 'text-[#0088CC]' : 'text-[#94A3B8]'
                      }`}
                    >
                      {isActive ? 'Active Strength' : 'Core Pillar'}
                    </span>
                    <span
                      className={`transition-transform duration-200 ${
                        isActive ? 'translate-x-0.5 text-[#0088CC]' : 'text-[#94A3B8]'
                      }`}
                    >
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* CAROUSEL PAGINATION DOTS & CONTROLS                       */}
        {/* ========================================================= */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E2E8F0]/70">
          {/* Pagination Indicators */}
          <div className="flex items-center gap-1.5">
            {PILLARS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToCard(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === idx
                    ? 'w-5 h-1 bg-[#0088CC]'
                    : 'w-1.5 h-1 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
            <span className="ml-2 text-[10px] text-[#64748B] font-mono hidden sm:inline">
              Hover to pause sliding
            </span>
          </div>

          {/* Navigation Buttons + CTA */}
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                className="w-7 h-7 rounded-full bg-white border border-[#E2E8F0] hover:border-[#0088CC] hover:text-[#0088CC] text-[#64748B] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                aria-label="Previous strength"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="w-7 h-7 rounded-full bg-white border border-[#E2E8F0] hover:border-[#0088CC] hover:text-[#0088CC] text-[#64748B] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                aria-label="Next strength"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/start-a-project');
                } else {
                  window.location.hash = '/start-a-project';
                }
              }}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0B132B] hover:bg-[#0088CC] text-white text-[11px] font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
