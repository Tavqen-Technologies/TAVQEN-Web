import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Lightbulb, Target, TrendingUp } from 'lucide-react';

import product1 from '../assits/products/product1.webp';
import product2 from '../assits/products/product2.webp';
import product3 from '../assits/products/product3.webp';
import product4 from '../assits/products/product4.webp';

interface OurWorkPageProps {
  onNavigate?: (path: string) => void;
}

type FilterId = 'all' | 'web' | 'mobile' | 'saas';

interface CaseStudy {
  id: string;
  category: Exclude<FilterId, 'all'>;
  categoryLabel: string;
  title: string;
  client: string;
  impact: string;
  overview: string;
  challenge: string;
  solution: string;
  technologies: string[];
  image: string;
  stats: { label: string; value: string }[];
}

/* ------------------------------------------------------------------ */
/* ANIMATION HELPERS (IntersectionObserver based, no extra deps)       */
/* ------------------------------------------------------------------ */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function parseValue(value: string) {
  const m = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  if (!m) return null;
  const raw = m[2];
  return {
    prefix: m[1],
    suffix: m[3],
    num: parseFloat(raw.replace(/,/g, '')),
    decimals: raw.includes('.') ? raw.split('.')[1].length : 0,
    grouped: raw.includes(','),
  };
}

/** Counts up numeric values like "45,000+", "99.99%", "-42%" when scrolled into view */
function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const parsed = parseValue(value);
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView || !parsed) return;
    if (prefersReducedMotion()) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(1 - Math.pow(1 - t, 3)); // easeOutCubic
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, duration, value]);

  if (!parsed) return <span>{value}</span>;

  const current = parsed.num * progress;
  const text = current.toLocaleString('en-US', {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
    useGrouping: parsed.grouped,
  });

  return (
    <span ref={ref}>
      {parsed.prefix}
      {text}
      {parsed.suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* DATA (unchanged content, same ids / categories)                     */
/* ------------------------------------------------------------------ */

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'busypixel',
    category: 'web',
    categoryLabel: 'Web Application · Marketing',
    title: 'BusyPixel — Modern Influencer Marketing Platform',
    client: 'BusyPixel Media',
    impact: '+340% Campaign Engagement',
    overview:
      'A comprehensive creator management ecosystem engineered to connect forward-looking consumer brands with top-tier creators. Features automated contract signing, real-time analytics dashboards, and instant escrow payouts.',
    challenge: 'Managing fragmented communications and delayed milestone reporting across 5,000+ brand ambassadors.',
    solution: 'Architected a modular Next.js web application with real-time websocket activity feeds and automated Stripe invoice handling.',
    technologies: ['Next.js 14', 'React', 'Node.js', 'PostgreSQL', 'Stripe Connect', 'Tailwind CSS'],
    image: product1,
    stats: [
      { label: 'Monthly Active Creators', value: '45,000+' },
      { label: 'Avg Page Load Speed', value: '0.4s' },
      { label: 'Uptime SLA', value: '99.99%' },
    ],
  },
  {
    id: 'alpha',
    category: 'mobile',
    categoryLabel: 'Mobile App · EdTech',
    title: 'Alpha — Smarter Learning Experience for Students',
    client: 'Alpha EduTech Ltd.',
    impact: '120K+ Active Daily Learners',
    overview:
      'An ergonomic, interactive mobile learning application built for secondary and university students. Includes gamified quiz loops, offline lecture caching, and peer-to-peer study sessions.',
    challenge: 'Students in low-bandwidth regions suffered dropped video sessions and corrupted offline data caches.',
    solution: 'Engineered a resilient React Native architecture with local SQLite offline synchronization and adaptive bitrate streaming.',
    technologies: ['React Native', 'TypeScript', 'Expo', 'SQLite', 'Python FastAPI', 'AWS CloudFront'],
    image: product3,
    stats: [
      { label: 'App Store Rating', value: '4.9 / 5.0' },
      { label: 'Daily Quiz Sessions', value: '180,000+' },
      { label: 'Crash-Free Rate', value: '99.95%' },
    ],
  },
  {
    id: 'noisy-them',
    category: 'saas',
    categoryLabel: 'SaaS Platform · Creators',
    title: 'Noisy Them — Creator-First Media & Community Hub',
    client: 'Noisy Media Inc.',
    impact: '3.2x User Growth in Q1',
    overview:
      'A creator subscription and digital asset marketplace with customized community feeds, gated video workshops, and self-serve tiers.',
    challenge: 'High churn caused by sluggish mobile web loading and convoluted subscription billing steps.',
    solution: 'Redesigned the complete UI/UX flow from ground up and optimized server-side rendering for instant page transitions.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Docker', 'Redis', 'Cloudflare Workers'],
    image: product4,
    stats: [
      { label: 'Checkout Conversion', value: '+38%' },
      { label: 'Server Response Time', value: '62ms' },
      { label: 'Active Communities', value: '1,200+' },
    ],
  },
  {
    id: 'frootreet',
    category: 'web',
    categoryLabel: 'Web Experience · E-Commerce',
    title: 'Frootreet — Playful Digital Brand Experience',
    client: 'Frootreet Confections',
    impact: '2.5x Increase in Online Orders',
    overview:
      'An immersive, playful consumer e-commerce storefront crafted for an artisanal dessert brand, packed with micro-interactions and instant local delivery tracking.',
    challenge: 'Generic storefront templates failed to reflect the vibrant boutique brand personality.',
    solution: 'Crafted bespoke organic layout designs, interactive flavor customizers, and sub-second checkout loops.',
    technologies: ['Next.js', 'Framer Motion', 'Headless Shopify', 'Tailwind CSS', 'Vercel Edge'],
    image: product2,
    stats: [
      { label: 'Session Duration', value: '+65%' },
      { label: 'Mobile Bounce Rate', value: '-42%' },
      { label: 'Customer Re-orders', value: '+54%' },
    ],
  },
];

const FILTER_TABS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Applications' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'saas', label: 'SaaS Platforms' },
];

const ALL_TECHNOLOGIES = Array.from(new Set(CASE_STUDIES.flatMap((s) => s.technologies)));

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */

export default function OurWorkPage({ onNavigate }: OurWorkPageProps) {
  const [filter, setFilter] = useState<FilterId>('all');

  const handleNav = (path: string) => {
    
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredStudies =
    filter === 'all' ? CASE_STUDIES : CASE_STUDIES.filter((item) => item.category === filter);

  const countFor = (id: FilterId) =>
    id === 'all' ? CASE_STUDIES.length : CASE_STUDIES.filter((s) => s.category === id).length;

  return (
    <div className="relative pt-28 sm:pt-36 pb-20 sm:pb-28">
      {/* Page-scoped keyframes (kept local so no other file needs editing) */}
      <style>{`
        @keyframes ow-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ow-float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50%      { transform: translate3d(0, -14px, 0); }
        }
        @keyframes ow-ping-soft {
          0%   { transform: scale(1); opacity: 0.55; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes ow-shimmer {
          0%   { transform: translateX(-120%) skewX(-18deg); }
          100% { transform: translateX(260%) skewX(-18deg); }
        }
        .ow-fade-up { opacity: 0; animation: ow-fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .ow-float { animation: ow-float 7s ease-in-out infinite; }
        .ow-ping-soft { animation: ow-ping-soft 2.2s ease-out infinite; }
        .ow-shimmer::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0; left: 0;
          width: 35%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
          animation: ow-shimmer 3.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ow-fade-up { opacity: 1; animation: none; }
          .ow-float, .ow-ping-soft, .ow-shimmer::after { animation: none; }
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="absolute inset-x-0 top-0 h-[700px] overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div
          className="ow-float absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[520px] opacity-40"
          style={{
            background:
              'radial-gradient(ellipse, rgba(0,196,255,0.20) 0%, rgba(0,136,204,0.07) 45%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-40 -right-32 w-[420px] h-[420px] opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(255,228,237,0.9) 0%, transparent 65%)' }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 85%)',
          }}
        />
      </div>

      {/* ========================================================= */}
      {/* HEADER                                                    */}
      {/* ========================================================= */}
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home Breadcrumb */}
        <div className="mb-6 sm:mb-8 ow-fade-up">
          <button
            type="button"
            onClick={() => handleNav('/home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors cursor-pointer group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Back to Home</span>
          </button>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span
            className="ow-fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur border border-[#00C4FF]/30 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm"
            style={{ animationDelay: '80ms' }}
          >
            <span className="relative flex w-2 h-2">
              <span className="ow-ping-soft absolute inset-0 rounded-full bg-[#00C4FF]" />
              <span className="relative w-2 h-2 rounded-full bg-[#0088CC]" />
            </span>
            Portfolio &amp; Case Studies
          </span>

          <h1
            className="ow-fade-up text-4xl sm:text-5xl md:text-[60px] font-medium tracking-[-0.03em] text-[#0B132B] leading-[1.1]"
            style={{ animationDelay: '160ms' }}
          >
            Work that drives{' '}
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#0088CC] bg-clip-text text-transparent">
              real measurable impact.
            </span>
          </h1>

          <p
            className="ow-fade-up mt-5 text-[15px] sm:text-[17px] text-[#64748B] font-normal leading-relaxed max-w-2xl mx-auto"
            style={{ animationDelay: '260ms' }}
          >
            Explore recent digital products, mobile applications, and web platforms designed and engineered by TAVQEN Technologies.
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TECH MARQUEE (uses existing .animate-marquee utilities)   */}
      {/* ========================================================= */}
      <div className="mb-14 sm:mb-16">
        <p className="text-center text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#94A3B8] mb-4">
          Built with
        </p>
        <div className="mask-radial-edges w-full overflow-hidden">
          <div className="animate-marquee pause-on-hover gap-3">
            {[...ALL_TECHNOLOGIES, ...ALL_TECHNOLOGIES].map((tech, idx) => (
              <span
                key={`${tech}-${idx}`}
                className="flex-shrink-0 px-4 py-2 rounded-full bg-white border border-[#E2E8F0] text-[12.5px] font-mono font-medium text-[#475569] shadow-sm hover:border-[#00C4FF]/60 hover:text-[#0088CC] transition-colors mr-3"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* FILTER + CASE STUDIES                                     */}
      {/* ========================================================= */}
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sticky filter bar */}
        <div className="sticky top-[84px] sm:top-[96px] z-30 flex justify-center mb-10 sm:mb-14 pointer-events-none">
          <div
            role="tablist"
            aria-label="Filter projects"
            className="pointer-events-auto flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-[26px] sm:rounded-full bg-white/80 backdrop-blur-xl border border-black/[0.06] shadow-[0_10px_35px_rgba(15,23,42,0.08)]"
          >
            {FILTER_TABS.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13.5px] font-semibold transition-all duration-300 cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white shadow-[0_6px_18px_rgba(0,196,255,0.35)]'
                      : 'text-[#64748B] hover:text-[#0B132B] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`min-w-[20px] h-5 px-1.5 rounded-full text-[10.5px] font-mono font-bold flex items-center justify-center transition-colors ${
                      active ? 'bg-white/25 text-white' : 'bg-[#E0F7FF] text-[#0088CC]'
                    }`}
                  >
                    {countFor(tab.id)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {filteredStudies.length} of {CASE_STUDIES.length} projects
        </p>

        {/* Case studies (key re-mounts list so reveal animations replay on filter change) */}
        <div key={filter} className="space-y-14 sm:space-y-20 mb-20 sm:mb-28">
          {filteredStudies.map((study, idx) => {
            const [name, ...rest] = study.title.split(' — ');
            const tagline = rest.join(' — ');
            const imageFirst = idx % 2 === 1;

            return (
              <Reveal key={study.id}>
                <article
                  id={`case-${study.id}`}
                  className="group/card relative rounded-[32px] sm:rounded-[40px] bg-white border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.04)] overflow-hidden hover:border-[#00C4FF]/50 hover:shadow-[0_28px_70px_rgba(0,196,255,0.12)] transition-all duration-500"
                >
                  {/* top accent line */}
                  <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#00C4FF]/70 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12 items-center">
                    {/* ---------------- Story column ---------------- */}
                    <div className={`lg:col-span-7 flex flex-col ${imageFirst ? 'lg:order-2' : ''}`}>
                      <div className="flex flex-wrap items-center gap-2.5 mb-4">
                        <span className="font-mono text-xs font-bold text-[#0B132B]">
                          {String(idx + 1).padStart(2, '0')}
                          <span className="text-[#94A3B8]"> / {String(filteredStudies.length).padStart(2, '0')}</span>
                        </span>
                        <span className="w-6 h-[2px] bg-[#E2E8F0] rounded-full" />
                        <span className="px-3 py-1 rounded-full bg-[#E0F7FF] text-[#0088CC] text-[11px] sm:text-xs font-bold font-mono uppercase tracking-wider">
                          {study.categoryLabel}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0B132B] tracking-tight leading-[1.2] mb-3">
                        {name}
                        {tagline && (
                          <span className="block mt-1 text-lg sm:text-xl lg:text-[22px] font-medium text-[#64748B] tracking-tight">
                            {tagline}
                          </span>
                        )}
                      </h3>

                      <div className="flex items-center gap-2.5 mb-5">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0088CC] text-white text-xs font-bold flex items-center justify-center shadow-sm">
                          {study.client.charAt(0)}
                        </span>
                        <p className="text-xs sm:text-sm text-[#475569]">
                          Client: <span className="font-semibold text-[#0088CC]">{study.client}</span>
                        </p>
                      </div>

                      <p className="text-sm sm:text-[15px] text-[#64748B] leading-[1.75] mb-6 font-normal">
                        {study.overview}
                      </p>

                      {/* Challenge & Solution */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                        <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-7 h-7 rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] flex items-center justify-center">
                              <Target className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-[11px] font-bold text-[#0B132B] uppercase tracking-wider">
                              The Challenge
                            </span>
                          </div>
                          <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">{study.challenge}</p>
                        </div>

                        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#E0F7FF]/70 to-[#F0F9FF] border border-[#00C4FF]/25 hover:border-[#00C4FF]/50 transition-colors">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-7 h-7 rounded-lg bg-white border border-[#00C4FF]/30 text-[#0088CC] flex items-center justify-center">
                              <Lightbulb className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-[11px] font-bold text-[#0088CC] uppercase tracking-wider">
                              Our Engineering Solution
                            </span>
                          </div>
                          <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed">{study.solution}</p>
                        </div>
                      </div>

                      {/* Technology tags */}
                      <div className="flex flex-wrap gap-2 mb-7">
                        {study.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[#475569] text-xs font-medium font-mono border border-transparent hover:border-[#00C4FF]/40 hover:bg-white hover:text-[#0088CC] hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Key Metrics (animated count-up) */}
                      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-6 border-t border-[#E2E8F0]">
                        {study.stats.map((s) => (
                          <div
                            key={s.label}
                            className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 sm:p-4 hover:bg-white hover:border-[#00C4FF]/40 hover:shadow-[0_10px_25px_rgba(0,196,255,0.10)] transition-all duration-300"
                          >
                            <div className="text-base sm:text-xl font-bold text-[#0B132B] font-mono leading-tight">
                              <CountUp value={s.value} />
                            </div>
                            <div className="mt-1 text-[10.5px] sm:text-xs text-[#94A3B8] leading-snug">{s.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Card CTA */}
                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={() => handleNav('/start-a-project')}
                          className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors cursor-pointer group/cta"
                        >
                          <span>Build something similar</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
                        </button>
                      </div>
                    </div>

                    {/* ---------------- Visual column ---------------- */}
                    <div className={`lg:col-span-5 ${imageFirst ? 'lg:order-1' : ''}`}>
                      <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[540px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-black/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.08)] bg-[#F1F5F9] group/img">
                        <img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-full object-cover object-top group-hover/img:scale-[1.06] transition-transform duration-[900ms] ease-out"
                          loading="lazy"
                        />

                        {/* soft vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/35 via-transparent to-transparent pointer-events-none" />

                        {/* light sweep on hover */}
                        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/img:translate-x-[320%] skew-x-[-18deg] transition-transform duration-1000 pointer-events-none" />

                        {/* Impact glass chip */}
                        <div className="absolute left-3 right-3 bottom-3 sm:left-4 sm:right-4 sm:bottom-4 flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-[0_12px_30px_rgba(15,23,42,0.18)] translate-y-0 group-hover/img:-translate-y-1 transition-transform duration-500">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/70 flex items-center justify-center flex-shrink-0">
                              <TrendingUp className="w-4 h-4" />
                            </span>
                            <div className="min-w-0">
                              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
                                Result
                              </div>
                              <div className="text-[13px] sm:text-sm font-bold text-[#0B132B] truncate">
                                {study.impact}
                              </div>
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-[#0088CC] flex-shrink-0 transition-transform group-hover/img:translate-x-0.5 group-hover/img:-translate-y-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* START A PROJECT CTA BANNER                                */}
      {/* ========================================================= */}
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] bg-gradient-to-r from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/60 border border-[#00C4FF]/30 p-8 sm:p-14 text-center flex flex-col items-center shadow-[0_20px_50px_rgba(0,196,255,0.08)]">
            {/* floating orbs */}
            <div
              className="ow-float absolute -top-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,196,255,0.22), transparent 70%)' }}
            />
            <div
              className="ow-float absolute -bottom-20 -right-10 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,228,237,0.85), transparent 70%)',
                animationDelay: '1.5s',
              }}
            />

            <span className="relative inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
              Your Next Success Story
            </span>
            <h2 className="relative text-2xl sm:text-4xl font-bold text-[#0B132B] tracking-tight max-w-xl leading-snug">
              Ready to build your next case study with us?
            </h2>
            <p className="relative mt-3 text-sm sm:text-base text-[#64748B] max-w-lg mb-8 leading-relaxed">
              Partner with TAVQEN to build a scalable digital product that drives real business results.
            </p>

            <div className="relative flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleNav('/start-a-project')}
                className="ow-shimmer relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-sm font-semibold shadow-[0_8px_25px_rgba(0,196,255,0.3)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleNav('/services')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] text-sm font-semibold hover:border-[#0088CC] hover:text-[#0088CC] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Explore Services</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
