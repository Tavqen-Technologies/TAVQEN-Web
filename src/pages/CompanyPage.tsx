
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Shield,
  Sparkles,
  Target,
  Users,
  Code2,
  Monitor,
  Smartphone,
  Server,
  Cloud,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import HowTavqen from '../components/HowTavqen';
import WhyTavqen from '../components/WhyTavqen';

interface CompanyPageProps {
  onNavigate?: (path: string) => void;
}

/* ============================================================= */
/* HELPERS: scroll-reveal, count-up                              */
/* ============================================================= */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
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
      { threshold, rootMargin: '0px 0px -6% 0px' }
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
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function CountUp({
  to,
  decimals = 0,
  suffix = '',
  start,
  duration = 1800,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  start: boolean;
  duration?: number;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setVal(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);

  return (
    <>
      {val.toFixed(decimals)}
      {suffix}
    </>
  );
}

/* ============================================================= */
/* GROWTH CURVE DATA (computed once)                             */
/* ============================================================= */
const W = 600;
const H = 300;
const N = 90;
const curveF = (t: number) => (Math.exp(3.2 * t) - 1) / (Math.exp(3.2) - 1);
const curveY = (t: number) => 290 - 266 * curveF(t);
const POINTS = Array.from({ length: N + 1 }, (_, i) => {
  const t = i / N;
  return { t, x: t * W, y: curveY(t) };
});
const LINE_D = 'M ' + POINTS.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ');
const AREA_D = `${LINE_D} L ${W} ${H} L 0 ${H} Z`;
const LIVE_T = 0.965;
const PHASES = ['Discover', 'Design', 'Build', 'Evolve'];

const STATS = [
  { to: 40, decimals: 0, suffix: '+', label: 'Digital Products Shipped' },
  { to: 99.9, decimals: 1, suffix: '%', label: 'Production Uptime' },
  { to: 100, decimals: 0, suffix: '%', label: 'Source Code Ownership' },
  { to: 4.9, decimals: 1, suffix: '/5', label: 'Client Satisfaction Score' },
];

/* ============================================================= */
/* STATS + GROWTH CHART SHOWCASE                                 */
/* ============================================================= */
function StatsShowcase() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const [hoverT, setHoverT] = useState<number | null>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setHoverT(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
  };

  const phaseIdx = hoverT === null ? 0 : Math.min(3, Math.floor(hoverT * 4));

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20 sm:mb-28">
      {/* LEFT: heading + stats */}
      <div className="lg:col-span-5">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-4">
            By the numbers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight text-[#0B132B] leading-[1.15]">
            Built to compound.{' '}
            <span className="text-[#94A3B8]">Shipped to last.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9">
          {STATS.map((stat, idx) => (
            <Reveal key={stat.label} delay={150 + idx * 120}>
              <div className="border-l-2 border-[#0088CC] pl-4 group">
                <div className="text-3xl sm:text-4xl font-medium tracking-tight text-[#0B132B] tabular-nums">
                  <CountUp
                    to={stat.to}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    start={inView}
                  />
                </div>
                <div className="mt-1 text-xs sm:text-[13px] font-medium text-[#64748B] leading-snug">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* RIGHT: animated growth curve */}
      <Reveal delay={200} className="lg:col-span-7">
        <div className="rounded-[28px] sm:rounded-[36px] bg-white border border-[#E2E8F0] shadow-[0_24px_70px_rgba(15,23,42,0.06)] overflow-hidden">
          <div
            className="relative h-[280px] sm:h-[360px] lg:h-[400px] cursor-crosshair touch-pan-y"
            onPointerMove={handleMove}
            onPointerLeave={() => setHoverT(null)}
            style={{
              backgroundImage:
                'linear-gradient(rgba(148,163,184,0.14) 1px, transparent 1px)',
              backgroundSize: '100% 25%',
            }}
          >
            {/* Floating chip */}
            <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-[#E2E8F0] text-[11px] font-semibold text-[#0B132B] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0088CC] animate-pulse" />
              Delivery velocity
            </div>

            {/* Curve (clip-path reveal left → right) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: inView ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                WebkitClipPath: inView ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                transition: 'clip-path 2200ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <svg
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="cp-curve-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#00D4FF" />
                    <stop offset="1" stopColor="#0088CC" />
                  </linearGradient>
                  <linearGradient id="cp-area-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#00C4FF" stopOpacity="0.18" />
                    <stop offset="1" stopColor="#00C4FF" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {POINTS.map((p) => {
                  const near = hoverT !== null && Math.abs(p.t - hoverT) < 0.035;
                  return (
                    <line
                      key={p.t}
                      x1={p.x}
                      x2={p.x}
                      y1={p.y}
                      y2={H}
                      stroke={near ? '#00A3E0' : '#C3D4E6'}
                      strokeOpacity={near ? 0.95 : 0.55}
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}

                <path d={AREA_D} fill="url(#cp-area-grad)" />
                <path
                  d={LINE_D}
                  fill="none"
                  stroke="url(#cp-curve-grad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            {/* Live pulsing dot near the peak */}
            {hoverT === null && (
              <span
                className={`absolute z-10 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0088CC] ring-4 ring-[#00C4FF]/25 transition-opacity duration-500 ${
                  inView ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  left: `${LIVE_T * 100}%`,
                  top: `${(curveY(LIVE_T) / H) * 100}%`,
                  transitionDelay: inView ? '1900ms' : '0ms',
                }}
              >
                <span className="absolute inset-0 rounded-full bg-[#00C4FF] animate-ping opacity-60" />
              </span>
            )}

            {/* Hover crosshair + dot + tooltip */}
            {hoverT !== null && (
              <>
                <span
                  className="absolute top-0 bottom-0 w-px bg-[#0088CC]/30 pointer-events-none z-10"
                  style={{ left: `${hoverT * 100}%` }}
                />
                <span
                  className="absolute z-20 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-[3px] border-[#0088CC] shadow-[0_0_18px_rgba(0,196,255,0.6)] pointer-events-none"
                  style={{
                    left: `${hoverT * 100}%`,
                    top: `${(curveY(hoverT) / H) * 100}%`,
                  }}
                />
                <span
                  className="absolute z-20 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[#0B132B] text-white text-[11px] font-semibold whitespace-nowrap pointer-events-none shadow-md"
                  style={{
                    left: `${Math.min(88, Math.max(12, hoverT * 100))}%`,
                    top: `calc(${(curveY(hoverT) / H) * 100}% - 44px)`,
                  }}
                >
                  {PHASES[phaseIdx]}
                </span>
              </>
            )}
          </div>

          {/* Phase axis */}
          <div className="grid grid-cols-4 border-t border-[#E2E8F0] bg-[#F8FAFC]/70">
            {PHASES.map((p, i) => (
              <div
                key={p}
                className={`py-3 text-center text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase transition-colors ${
                  hoverT !== null && phaseIdx === i ? 'text-[#0088CC]' : 'text-[#94A3B8]'
                }`}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* ============================================================= */
/* PAGE DATA                                                     */
/* ============================================================= */
const PILLARS = [
  {
    label: 'Our Vision',
    icon: Target,
    title: 'To be the premier engineering foundation for modern software.',
    body: 'We envision a world where every transformative idea is realized through flawless code, intuitive user experiences, and scalable cloud infrastructure that stands the test of time.',
    chips: ['Flawless code', 'Intuitive UX', 'Scalable cloud'],
  },
  {
    label: 'Our Mission',
    icon: Code2,
    title: 'To turn ambitious concepts into reliable, production-ready reality.',
    body: 'Our mission is to eliminate tech debt, remove friction, and build high-leverage digital systems using battle-tested technology and agile cross-functional engineering squads.',
    chips: ['Zero tech debt', 'Less friction', 'Agile squads'],
  },
];

const CORE_VALUES = [
  {
    title: 'Obsessive Craftsmanship',
    description: 'We care deeply about every pixel, interaction, query plan, and line of code we deliver.',
    icon: Sparkles,
  },
  {
    title: 'Transparent Collaboration',
    description: 'Zero agency bureaucracy. You work directly with senior product builders and engineers.',
    icon: Users,
  },
  {
    title: 'Scalable Architecture',
    description: 'We engineer systems designed to handle 10x traffic bursts from day one without breaking.',
    icon: Shield,
  },
  {
    title: 'Business-Driven Engineering',
    description: 'Code is only valuable when it moves your business metrics and delights your users.',
    icon: Target,
  },
];

const TECH_STACK = [
  { category: 'Frontend', icon: Monitor, items: ['React 18', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'] },
  { category: 'Mobile', icon: Smartphone, items: ['React Native', 'Expo', 'iOS Swift', 'Android Kotlin', 'App Store CI/CD'] },
  { category: 'Backend & APIs', icon: Server, items: ['Node.js', 'Python', 'FastAPI', 'Express', 'GraphQL', 'RESTful APIs'] },
  { category: 'Data & Cloud', icon: Cloud, items: ['PostgreSQL', 'Redis', 'Docker', 'AWS', 'Google Cloud', 'Cloudflare Workers'] },
];

/* ============================================================= */
/* PAGE                                                          */
/* ============================================================= */
export default function CompanyPage({ onNavigate }: CompanyPageProps) {
  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="pb-20 sm:pb-28">
      {/* Page-scoped animations */}
      <style>{`
        @keyframes cp-float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-18px) translateX(10px); }
        }
        @keyframes cp-shine {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .cp-float { animation: cp-float 9s ease-in-out infinite; }
        .cp-float-slow { animation: cp-float 13s ease-in-out infinite reverse; }
        .cp-shine { animation: cp-shine 6s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cp-float, .cp-float-slow, .cp-shine { animation: none; }
        }
      `}</style>

      {/* ========================================================= */}
      {/* HERO SECTION                                              */}
      {/* ========================================================= */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,136,204,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,136,204,0.07) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 35%, black 15%, transparent 70%)',
            maskImage: 'radial-gradient(ellipse at 50% 35%, black 15%, transparent 70%)',
          }}
        />
        {/* Floating glow orbs */}
        <div className="cp-float absolute top-24 left-[8%] w-64 h-64 rounded-full bg-[#00D4FF]/20 blur-3xl pointer-events-none" />
        <div className="cp-float-slow absolute top-40 right-[6%] w-72 h-72 rounded-full bg-[#0088CC]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => handleNav('/home')}
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors cursor-pointer"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              <span>Back to Home</span>
            </button>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0088CC]/10 border border-[#00C4FF]/20 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0088CC] animate-pulse" />
                About TAVQEN Technologies
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-4xl sm:text-5xl md:text-[60px] font-medium tracking-[-0.03em] text-[#0B132B] leading-[1.1]">
                Engineering digital products that{' '}
                <span className="cp-shine bg-gradient-to-r from-[#00D4FF] via-[#0088CC] to-[#00D4FF] bg-[length:200%_auto] bg-clip-text text-transparent">
                  shape what&apos;s next.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-5 sm:mt-6 text-[15px] sm:text-[17px] text-[#64748B] font-normal leading-relaxed max-w-2xl mx-auto">
                TAVQEN Technologies is an advanced software engineering and digital product studio. We partner with ambitious founders, startups, and forward-thinking enterprises to design, build, and scale world-class software.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleNav('/start-a-project')}
                  className="group relative overflow-hidden inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-sm font-semibold shadow-[0_8px_25px_rgba(0,196,255,0.3)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.45)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                  <span className="relative">Start a Project</span>
                  <ArrowRight className="relative w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/our-work')}
                  className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] text-sm font-semibold hover:border-[#00C4FF] hover:text-[#0088CC] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  See our work
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* STATS + GROWTH CURVE                                      */}
        {/* ========================================================= */}
        <StatsShowcase />

        {/* ========================================================= */}
        {/* VISION & MISSION DUAL CARDS                               */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-20 sm:mb-24">
          {PILLARS.map((item, idx) => {
            const Icon = item.icon;
            
            return (
              <Reveal key={item.label} delay={idx * 150} className="h-full">
                <div className="group relative h-full rounded-[28px] sm:rounded-[36px] bg-white border border-[#E2E8F0] p-8 sm:p-10 shadow-[0_16px_40px_rgba(15,23,42,0.04)] overflow-hidden hover:border-[#00C4FF]/50 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_rgba(0,196,255,0.14)] transition-all duration-500">
                  {/* Corner glow */}
                  <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#00C4FF]/10 blur-2xl transition-transform duration-700 group-hover:scale-150 pointer-events-none" />

                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#00D4FF] group-hover:to-[#0088CC] group-hover:text-white group-hover:rotate-6">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#0088CC] mb-2 block">
                      {item.label}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight mb-4">
                      {item.title}
                    </h3>
                    <p className="text-[#64748B] text-sm sm:text-base leading-relaxed font-normal">
                      {item.body}
                    </p>
                    <div className="mt-6 pt-5 border-t border-[#E2E8F0] flex flex-wrap gap-2">
                      {item.chips.map((chip) => (
                        <span
                          key={chip}
                          className="px-3 py-1 rounded-full bg-[#F1F5F9] text-[#475569] text-xs font-medium group-hover:bg-[#E0F7FF] group-hover:text-[#0088CC] transition-colors"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* WHY TAVQEN (INTERACTIVE PROCESS)                          */}
      {/* ========================================================= */}
      <WhyTavqen />

      {/* ========================================================= */}
      {/* HOW TAVQEN WORKS (4-STEP FRAMEWORK)                       */}
      {/* ========================================================= */}
      <HowTavqen />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-24">
        {/* ========================================================= */}
        {/* CORE ENGINEERING VALUES                                   */}
        {/* ========================================================= */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
              Engineering Culture
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#0B132B]">
              Values that guide how we build.
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-[#64748B] font-normal leading-relaxed">
              Every product we touch is guided by four uncompromising principles.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 sm:mb-24">
          {CORE_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <Reveal key={val.title} delay={idx * 110} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] p-7 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:border-[#00C4FF]/40 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,196,255,0.12)] transition-all duration-300">
                  {/* Top accent line grows on hover */}
                  <div className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gradient-to-r from-[#00D4FF] to-[#0088CC]" />

                  <span className="absolute top-5 right-6 font-mono text-xs font-bold text-[#CBD5E1] group-hover:text-[#0088CC] transition-colors">
                    0{idx + 1}
                  </span>

                  <div className="w-10 h-10 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#00D4FF] group-hover:to-[#0088CC] group-hover:text-white group-hover:scale-110">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0B132B] mb-2 tracking-tight">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-normal">
                    {val.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* TECHNOLOGIES STACK                                        */}
        {/* ========================================================= */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] bg-white border border-[#E2E8F0] p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_rgba(15,23,42,0.04)] mb-20 sm:mb-24">
            <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#00C4FF]/70 to-transparent pointer-events-none" />

            <div className="max-w-2xl mb-10 sm:mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3">
                Production Stack
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight">
                Modern technologies we engineer with.
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-[#64748B] leading-relaxed">
                We leverage modern, type-safe, and industry-standard tools to build software that is fast, secure, and maintainable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {TECH_STACK.map((group, idx) => {
                const GroupIcon = group.icon;
                return (
                  <Reveal key={group.category} delay={idx * 100}>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5 pb-3 border-b border-[#E2E8F0]">
                        <span className="w-8 h-8 rounded-lg bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center">
                          <GroupIcon className="w-4 h-4" />
                        </span>
                        <h4 className="text-sm font-bold text-[#0B132B] font-mono uppercase tracking-wider">
                          {group.category}
                        </h4>
                      </div>
                      <ul className="space-y-1">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="group/item flex items-center gap-2.5 px-2 py-1.5 -mx-2 rounded-lg text-xs sm:text-sm text-[#475569] font-medium hover:bg-[#F0F9FF] hover:text-[#0B132B] hover:translate-x-1 transition-all duration-200"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0088CC] flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ========================================================= */}
        {/* START A PROJECT CTA BANNER                                */}
        {/* ========================================================= */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] bg-gradient-to-r from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/60 border border-[#00C4FF]/30 p-8 sm:p-14 text-center flex flex-col items-center shadow-[0_20px_50px_rgba(0,196,255,0.08)]">
            {/* Decorative orbs + grid */}
            <div className="cp-float absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[#00D4FF]/20 blur-3xl pointer-events-none" />
            <div className="cp-float-slow absolute -bottom-20 -right-12 w-72 h-72 rounded-full bg-[#0088CC]/15 blur-3xl pointer-events-none" />
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(0,136,204,0.18) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)',
                maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)',
              }}
            />

            <div className="relative flex flex-col items-center">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
                Partner with TAVQEN
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#0B132B] tracking-tight max-w-xl leading-snug">
                Ready to bring your ambitious digital product to life?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#64748B] max-w-lg mb-8 leading-relaxed">
                Schedule an introductory sprint consultation with our engineering squad and receive a clear technical proposal.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleNav('/start-a-project')}
                  className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-sm font-semibold shadow-[0_8px_25px_rgba(0,196,255,0.3)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                  <span className="relative">Start a Project</span>
                  <ArrowRight className="relative w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/our-work')}
                  className="inline-flex items-center px-7 py-3.5 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] text-sm font-semibold hover:border-[#00C4FF] hover:text-[#0088CC] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  View our work
                </button>
              </div>

              <p className="mt-6 text-xs text-[#64748B] font-medium">
                Reply within 24 business hours · NDA protected
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}




