import { useEffect, useRef, useState } from 'react';
import { FileCode2, ShieldCheck, Activity, Target } from 'lucide-react';
import SectionHeading from './SectionHeading';

interface FounderReason {
  number: string;
  title: string;
  description: string;
  icon: typeof FileCode2;
}

const REASONS: FounderReason[] = [
  {
    number: '01',
    title: 'Your Product. Your Code. Your Ownership.',
    description:
      'We believe in building with transparency. Get access to your source code, repositories, project documentation, and agreed design assets, with clear ownership terms and no unnecessary vendor lock-in.',
    icon: FileCode2,
  },
  {
    number: '02',
    title: 'Built for Performance, Security & Scale.',
    description:
      'From optimized architecture to secure development practices, we engineer digital solutions designed to perform reliably and adapt as your business grows.',
    icon: ShieldCheck,
  },
  {
    number: '03',
    title: 'Transparent Process. Visible Progress.',
    description:
      'Stay connected throughout development with defined milestones, regular updates, collaborative reviews, and working builds that keep you informed at every stage.',
    icon: Activity,
  },
  {
    number: '04',
    title: 'Engineering That Understands Your Business.',
    description:
      'We go beyond writing code. By understanding your goals and challenges, we build practical, maintainable technology solutions that support your business today and its ambitions for tomorrow.',
    icon: Target,
  },
];

export default function WhyFoundersServices() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  // Simple scroll reveal (no extra libraries): cards fade up once
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-[#F8FAFC] border-t border-[#E2E8F0] py-10 xs:py-12 sm:py-18 lg:py-24 overflow-hidden">
      {/* Soft Ambient Radial Background Accent */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-full h-[380px] pointer-events-none opacity-25 -z-10"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0, 212, 255, 0.16) 0%, rgba(155, 227, 223, 0.12) 45%, transparent 72%)',
        }}
      />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* HEADER: Unified SectionHeading System                     */}
        {/* ========================================================= */}
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Founders"
          highlight="Choose TAVQEN."
          description="We bring together business understanding, modern technology, and thoughtful engineering to transform ideas into reliable digital products."
        />

        {/* ========================================================= */}
        {/* COMPACT 2-COLUMN RESPONSIVE GRID (4 REASONS)              */}
        {/* ========================================================= */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 lg:gap-6"
        >
          {REASONS.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              /* Reveal wrapper (keeps card hover transforms independent) */
              <div
                key={item.number}
                style={{ transitionDelay: visible ? `${idx * 100}ms` : '0ms' }}
                className={`h-full min-w-0 transition-all duration-700 ease-out motion-reduce:transition-none ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
              >
                <div className="group relative h-full rounded-[20px] sm:rounded-[24px] bg-white border border-[#E2E8F0] p-6 sm:p-7 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_36px_rgba(0,196,255,0.12)] hover:border-[#00C4FF]/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between">
                  {/* Subtle Ambient Hover Glow */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-12 -right-12 w-36 h-36 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(0, 212, 255, 0.22) 0%, transparent 70%)',
                    }}
                  />

                  {/* Top Edge Micro-Highlight Accent */}
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#00C4FF]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  />

                  <div>
                    {/* Top Row: Solid blue icon + Monospace Watermark Number */}
                    <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#0099DB] to-[#0088CC] text-white flex items-center justify-center shrink-0 shadow-[0_6px_16px_rgba(0,136,204,0.28)] group-hover:shadow-[0_8px_22px_rgba(0,196,255,0.4)] group-hover:scale-105 transition-[box-shadow,transform] duration-300">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-[#0B132B]/15 group-hover:text-[#0088CC]/40 transition-colors duration-300 tabular-nums select-none">
                        {item.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-[18px] font-bold text-[#0B132B] tracking-tight leading-snug group-hover:text-[#0088CC] transition-colors duration-300">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-[13px] sm:text-[14px] text-[#64748B] leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom subtle indicator line */}
                  <div className="mt-5 pt-3.5 border-t border-[#F1F5F9] flex items-center justify-between">
                    <span className="text-[10.5px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-[#94A3B8] group-hover:text-[#0088CC] transition-colors">
                      Core Commitment
                    </span>
                    <span className="text-xs text-[#CBD5E1] group-hover:text-[#0088CC] group-hover:translate-x-0.5 transition-all duration-300 select-none">
                      →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
