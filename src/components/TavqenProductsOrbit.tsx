import { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, Play, Pause, FileText, Smartphone, Users, Shield, CheckCircle2, Sparkles, Zap, TrendingUp, Lock } from 'lucide-react';
import tavqenLogo from '../assits/Tavqen-logo.png';

interface TavqenProductsOrbitProps {
  onNavigate?: (path: string) => void;
}

interface OrbitProduct {
  id: string;
  name: string;
  tagline: string;
  flowDescription: string;
  flowTitle: string;
  icon: any;
  category: 'productivity' | 'media' | 'civic';
  badgeColor: string;
}

const ORBIT_PRODUCTS: OrbitProduct[] = [
  {
    id: 'pdf',
    name: 'TAVQEN PDF',
    tagline: 'AI Document Intelligence',
    flowTitle: 'TAVQEN PDF → Cloud Vault',
    flowDescription: 'Documents scanned on mobile are OCR-extracted and encrypted in real-time.',
    icon: FileText,
    category: 'productivity',
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
  },
  {
    id: 'player',
    name: 'Stream Player',
    tagline: '4K Multimedia Engine',
    flowTitle: 'Stream Player → Media Hub',
    flowDescription: 'Hardware-accelerated zero-buffering video streaming and custom audio equalizer.',
    icon: Play,
    category: 'media',
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
  },
  {
    id: 'gramsetu',
    name: 'GramSetu',
    tagline: 'Civic Governance Platform',
    flowTitle: 'GramSetu → Civic Dispatch',
    flowDescription: 'Geotagged public grievance reports are automatically routed to municipal officers.',
    icon: Users,
    category: 'civic',
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
  },
  {
    id: 'vault',
    name: 'Cloud Vault',
    tagline: 'AES-256 Encrypted Storage',
    flowTitle: 'Cloud Vault → Secure Sync',
    flowDescription: 'Zero-knowledge client-side encryption protecting confidential enterprise data.',
    icon: Shield,
    category: 'productivity',
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
  },
  {
    id: 'sign',
    name: 'Smart Sign',
    tagline: 'Legally Binding e-Signatures',
    flowTitle: 'Smart Sign → Contract Engine',
    flowDescription: 'Cryptographically sealed signatures verified with automated audit logs.',
    icon: CheckCircle2,
    category: 'productivity',
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
  },
  {
    id: 'ai',
    name: 'AI Synthesizer',
    tagline: 'Autonomous Document Agent',
    flowTitle: 'AI Synthesizer → Analytics Hub',
    flowDescription: 'Extracts tabular data, summaries, and action items from complex multi-page files.',
    icon: Sparkles,
    category: 'productivity',
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
  },
  {
    id: 'sync',
    name: 'FastAPI Sync',
    tagline: 'Real-Time Edge Pipelines',
    flowTitle: 'FastAPI Sync → Distributed Redis',
    flowDescription: 'High-throughput bi-directional synchronization with sub-50ms edge delivery.',
    icon: Zap,
    category: 'media',
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
  },
  {
    id: 'mobile',
    name: 'Mobile Core',
    tagline: 'Cross-Platform Framework',
    flowTitle: 'Mobile Core → App Store CI/CD',
    flowDescription: 'Unified codebase running natively on iOS and Android with 60 FPS performance.',
    icon: Smartphone,
    category: 'productivity',
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
  },
  {
    id: 'analytics',
    name: 'Analytics Hub',
    tagline: 'Real-Time Telemetry',
    flowTitle: 'Analytics Hub → Executive Dashboards',
    flowDescription: 'Aggregates usage funnels, retention cohorts, and revenue metrics across products.',
    icon: TrendingUp,
    category: 'civic',
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
  },
  {
    id: 'auth',
    name: 'Enterprise SSO',
    tagline: 'Zero-Trust Access Control',
    flowTitle: 'Enterprise SSO → Centralized Gateway',
    flowDescription: 'Single sign-on authentication with multi-factor biometric verification.',
    icon: Lock,
    category: 'productivity',
    badgeColor: 'text-[#0088CC] bg-[#E0F7FF]',
  },
];

export default function TavqenProductsOrbit({ onNavigate }: TavqenProductsOrbitProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-cycle through products every 3.8s if playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ORBIT_PRODUCTS.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeProduct = ORBIT_PRODUCTS[activeIdx];

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-14 sm:pb-20 bg-[#F8FAFC] overflow-hidden">
      {/* CSS Keyframe Style for Smooth GPU-Accelerated Orbit */}
      <style>{`
        @keyframes orbit-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes orbit-counter-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        .orbit-track {
          animation: orbit-spin 55s linear infinite;
        }
        .orbit-item {
          animation: orbit-counter-spin 55s linear infinite;
        }
        .orbit-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Subtle Cyan Ambient Radial Lighting (TAVQEN theme) */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[850px] h-[550px] pointer-events-none opacity-25 -z-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(0, 196, 255, 0.2) 0%, rgba(0, 136, 204, 0.08) 50%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home Breadcrumb (Tight & Clean) */}
        <div className="mb-4 sm:mb-5">
          <button
            type="button"
            onClick={() => handleNav('/home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors cursor-pointer"
          >
            <span>← Back to Home</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: HERO INFORMATION & PRODUCT STATS             */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Eyebrow Label with horizontal line */}
            <div className="flex items-center gap-2.5 mb-3.5 sm:mb-4">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0088CC]">
                TAVQEN PRODUCTS
              </span>
              <span className="w-8 h-[1.5px] bg-[#00C4FF]/60" />
            </div>

            {/* Big Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0B132B] tracking-tight leading-[1.15] mb-4">
              Connected products for every step of the work.
            </h1>

            {/* Subtitle */}
            <p className="text-[14.5px] sm:text-[15.5px] text-[#64748B] leading-[1.7] mb-7 font-normal">
              A cohesive suite of proprietary B2B SaaS and consumer mobile platforms engineered for document intelligence, media streaming, and operational workflows. Start with the one you need; they share data as you grow.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                type="button"
                onClick={scrollToProducts}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-sm font-semibold shadow-[0_8px_25px_rgba(0,196,255,0.25)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.35)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Explore products</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleNav('/start-a-project')}
                className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] text-xs sm:text-sm font-semibold hover:border-gray-400 hover:text-[#0088CC] shadow-2xs hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>View flagship product</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>

            {/* Category Pills Strip */}
            <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-[#E2E8F0]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-xs font-semibold text-[#0B132B] shadow-2xs">
                <span>Productivity & OCR</span>
                <span className="w-4 h-4 rounded-full bg-[#E0F7FF] text-[#0088CC] font-mono text-[10px] flex items-center justify-center font-bold">
                  4
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-xs font-semibold text-[#0B132B] shadow-2xs">
                <span>Media & Streaming</span>
                <span className="w-4 h-4 rounded-full bg-[#E0F7FF] text-[#0088CC] font-mono text-[10px] flex items-center justify-center font-bold">
                  3
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-xs font-semibold text-[#0B132B] shadow-2xs">
                <span>Civic & Cloud SaaS</span>
                <span className="w-4 h-4 rounded-full bg-[#E0F7FF] text-[#0088CC] font-mono text-[10px] flex items-center justify-center font-bold">
                  3
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: ANIMATED ORBITAL PRODUCT COSMOS              */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* The Orbiting Cosmos Arena */}
            <div
              className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] md:w-[480px] md:h-[480px] flex items-center justify-center"
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
            >
              {/* Outer Glow Halo */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#00D4FF]/15 via-[#0088CC]/5 to-transparent pointer-events-none" />

              {/* Orbital Ring Path Line */}
              <div className="absolute inset-8 sm:inset-10 md:inset-12 rounded-full border border-dashed border-[#00C4FF]/35 pointer-events-none" />

              {/* Secondary Inner Orbital Ring */}
              <div className="absolute inset-20 sm:inset-24 md:inset-28 rounded-full border border-[#E2E8F0] pointer-events-none" />

              {/* ----------------------------------------------------- */}
              {/* CENTER HUB: PURE TAVQEN LIGHT THEME CARD              */}
              {/* ----------------------------------------------------- */}
              <div className="relative z-30 w-36 h-28 sm:w-44 sm:h-32 md:w-48 md:h-36 rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-[#00C4FF]/40 shadow-[0_16px_45px_rgba(0,196,255,0.18)] p-4 flex flex-col items-center justify-center text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                {/* Subtle Cyan Center Ambient Glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#00D4FF]/25 to-[#0088CC]/20 rounded-3xl blur-xl -z-10 group-hover:opacity-100 transition-opacity" />

                {/* Original TAVQEN Logo */}
                <div className="flex items-center gap-2 mb-1.5">
                  <img
                    src={tavqenLogo}
                    alt="TAVQEN"
                    className="h-6 sm:h-7.5 w-auto object-contain hover:opacity-90 transition-opacity"
                  />
                </div>

                <span className="text-[11px] sm:text-xs font-mono font-medium text-[#64748B]">
                  10 products · shared data
                </span>

                <div className="mt-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E0F7FF] border border-[#00C4FF]/30 text-[10px] text-[#0088CC] font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0088CC] animate-pulse" />
                  <span>Real-time Sync</span>
                </div>
              </div>

              {/* ----------------------------------------------------- */}
              {/* ORBITING REVOLVING CONTAINER (Continuous 360 Spin)     */}
              {/* ----------------------------------------------------- */}
              <div
                className={`absolute inset-0 flex items-center justify-center orbit-track ${
                  !isPlaying ? 'orbit-paused' : ''
                }`}
              >
                {ORBIT_PRODUCTS.map((prod, idx) => {
                  const Icon = prod.icon;
                  const total = ORBIT_PRODUCTS.length;
                  const angle = (idx / total) * 2 * Math.PI;

                  // Radius responsive scale
                  const radius = 185;
                  const x = Math.round(radius * Math.cos(angle));
                  const y = Math.round(radius * Math.sin(angle));

                  const isSelected = activeIdx === idx;

                  return (
                    <div
                      key={prod.id}
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      className="absolute z-20"
                    >
                      {/* Counter-rotating wrapper so icons stay upright */}
                      <div
                        className={`orbit-item ${!isPlaying ? 'orbit-paused' : ''}`}
                      >
                        <button
                          type="button"
                          onClick={() => setActiveIdx(idx)}
                          className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md relative group ${
                            isSelected
                              ? 'bg-white border-2 border-[#00C4FF] text-[#0088CC] shadow-[0_0_25px_rgba(0,196,255,0.45)] scale-125 z-30 ring-4 ring-[#00C4FF]/15'
                              : 'bg-white border border-[#E2E8F0] text-[#0B132B] hover:border-[#00C4FF] hover:text-[#0088CC] hover:scale-110 shadow-sm'
                          }`}
                          aria-label={`Select ${prod.name}`}
                        >
                          <Icon className="w-5 h-5 stroke-[2]" />

                          {/* Hover Tooltip Pill */}
                          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md bg-[#0B132B] text-white text-[10px] font-semibold tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm z-40">
                            {prod.name}
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ------------------------------------------------------- */}
            {/* BOTTOM LIVE PRODUCT BAR (Pure TAVQEN Light Theme)       */}
            {/* ------------------------------------------------------- */}
            <div className="w-full max-w-lg mt-5 rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] p-4 sm:p-5 shadow-[0_12px_36px_rgba(15,23,42,0.06)] flex items-center justify-between gap-4 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${activeProduct.badgeColor}`}
                >
                  <activeProduct.icon className="w-5 h-5 stroke-[2]" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#0B132B]">
                      {activeProduct.flowTitle}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E0F7FF] text-[#0088CC] font-semibold">
                      Live
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed font-normal">
                    {activeProduct.flowDescription}
                  </p>
                </div>
              </div>

              {/* Pause / Resume Button */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:text-[#0B132B] hover:border-gray-400 transition-all cursor-pointer flex-shrink-0"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#0088CC]" />
                    <span>Resume</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
