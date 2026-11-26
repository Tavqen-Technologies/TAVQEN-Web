import { useState, useEffect, useMemo } from 'react';
import { ArrowRight, ArrowDown, Play, Pause } from 'lucide-react';
import tavqenLogo from '../assits/Tavqen-logo.png';
import { TAVQEN_PRODUCTS, type ProductDetail } from '../data/productsData';

interface TavqenProductsOrbitProps {
  onNavigate?: (path: string) => void;
}

type HeroCategory = 'all' | 'productivity' | 'media' | 'civic';

export default function TavqenProductsOrbit({ onNavigate }: TavqenProductsOrbitProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<HeroCategory>('all');
  const [orbitRadius, setOrbitRadius] = useState(185);

  // Keep orbit radius responsive so nodes never overflow on 340px mobile screens
  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 640) setOrbitRadius(108);
      else if (w < 768) setOrbitRadius(164);
      else setOrbitRadius(186);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Auto-cycle through products every 3.8s if playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TAVQEN_PRODUCTS.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeProduct = TAVQEN_PRODUCTS[activeIdx] || TAVQEN_PRODUCTS[0];

  const categoryCounts = useMemo(
    () => ({
      productivity: TAVQEN_PRODUCTS.filter((p) => p.category === 'productivity').length,
      media: TAVQEN_PRODUCTS.filter((p) => p.category === 'media').length,
      civic: TAVQEN_PRODUCTS.filter((p) => p.category === 'civic').length,
    }),
    []
  );

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openProductPage = (product: ProductDetail) => {
    handleNav(`/product?id=${product.id}`);
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-20 bg-[#F8FAFC] overflow-hidden">
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
        className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[850px] h-[550px] pointer-events-none opacity-25 -z-10"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0, 196, 255, 0.2) 0%, rgba(0, 136, 204, 0.08) 50%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home Breadcrumb */}
        <div className="mb-5 sm:mb-6">
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
          {/* LEFT COLUMN: HERO INFORMATION & PRODUCT CATEGORIES        */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-3.5 sm:mb-4">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0088CC]">
                TAVQEN PRODUCT SYSTEM
              </span>
              <span className="w-8 h-[1.5px] bg-[#00C4FF]/60" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0B132B] tracking-tight leading-[1.15] mb-4">
              Connected products for every step of the work.
            </h1>

            <p className="text-[14.5px] sm:text-[15.5px] text-[#64748B] leading-[1.7] mb-7 font-normal">
              A cohesive suite of proprietary B2B SaaS and consumer mobile platforms engineered for document intelligence, media streaming, and civic operations. Click any product below to explore it in detail.
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
                onClick={() => openProductPage(TAVQEN_PRODUCTS[0])}
                className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] text-xs sm:text-sm font-semibold hover:border-[#0088CC] hover:text-[#0088CC] shadow-2xs hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
              >
                <span>View flagship product</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Interactive Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#E2E8F0]">
              {[
                { id: 'all' as const, label: 'All Suite', count: TAVQEN_PRODUCTS.length },
                { id: 'productivity' as const, label: 'Productivity & OCR', count: categoryCounts.productivity },
                { id: 'media' as const, label: 'Media & Streaming', count: categoryCounts.media },
                { id: 'civic' as const, label: 'Civic & Cloud SaaS', count: categoryCounts.civic },
              ].map((cat) => {
                const isCatActive = categoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategoryFilter(cat.id);
                      if (cat.id !== 'all') {
                        const firstMatchIdx = TAVQEN_PRODUCTS.findIndex((p) => p.category === cat.id);
                        if (firstMatchIdx >= 0) setActiveIdx(firstMatchIdx);
                      }
                    }}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                      isCatActive
                        ? 'bg-[#0B132B] border-[#0B132B] text-white shadow-xs'
                        : 'bg-white border-[#E2E8F0] text-[#0B132B] hover:border-[#00C4FF]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`w-4 h-4 rounded-full font-mono text-[10px] flex items-center justify-center font-bold ${
                        isCatActive ? 'bg-[#00D4FF] text-[#0B132B]' : 'bg-[#E0F7FF] text-[#0088CC]'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: ANIMATED ORBITAL PRODUCT COSMOS              */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              className="relative w-[276px] h-[276px] sm:w-[420px] sm:h-[420px] md:w-[470px] md:h-[470px] flex items-center justify-center"
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
            >
              {/* Outer Glow Halo */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#00D4FF]/15 via-[#0088CC]/5 to-transparent pointer-events-none" />

              {/* Orbital Ring Path Line */}
              <div className="absolute inset-6 sm:inset-10 md:inset-12 rounded-full border border-dashed border-[#00C4FF]/35 pointer-events-none" />

              {/* Secondary Inner Orbital Ring */}
              <div className="absolute inset-16 sm:inset-24 md:inset-28 rounded-full border border-[#E2E8F0] pointer-events-none" />

              {/* CENTER HUB */}
              <div className="relative z-30 w-32 min-h-[104px] sm:w-44 sm:h-32 md:w-48 md:h-36 rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-[#00C4FF]/40 shadow-[0_16px_45px_rgba(0,196,255,0.18)] p-3 sm:p-4 flex flex-col items-center justify-center text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#00D4FF]/25 to-[#0088CC]/20 rounded-3xl blur-xl -z-10 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center gap-2 mb-1">
                  <img
                    src={tavqenLogo}
                    alt="TAVQEN"
                    className="h-5 sm:h-7 w-auto object-contain hover:opacity-90 transition-opacity"
                  />
                </div>

                <span className="text-[10px] sm:text-xs font-mono font-medium text-[#64748B] leading-tight">
                  10 products · shared data
                </span>

                <div className="mt-1.5 flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full bg-[#E0F7FF] border border-[#00C4FF]/30 text-[9px] sm:text-[10px] text-[#0088CC] font-mono font-semibold whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0088CC] animate-pulse" />
                  <span>Real-time Sync</span>
                </div>
              </div>

              {/* ORBITING NODES */}
              <div
                className={`absolute inset-0 flex items-center justify-center orbit-track ${
                  !isPlaying ? 'orbit-paused' : ''
                }`}
              >
                {TAVQEN_PRODUCTS.map((prod, idx) => {
                  const Icon = prod.icon;
                  const total = TAVQEN_PRODUCTS.length;
                  const angle = (idx / total) * 2 * Math.PI;
                  const x = Math.round(orbitRadius * Math.cos(angle));
                  const y = Math.round(orbitRadius * Math.sin(angle));

                  const isSelected = activeIdx === idx;
                  const matchesCat = categoryFilter === 'all' || prod.category === categoryFilter;

                  return (
                    <div
                      key={prod.id}
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      className="absolute z-20"
                    >
                      <div className={`orbit-item ${!isPlaying ? 'orbit-paused' : ''}`}>
                        <button
                          type="button"
                          onClick={() => openProductPage(prod)}
                          onMouseEnter={() => setActiveIdx(idx)}
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md relative group ${
                            isSelected
                              ? 'bg-white border-2 border-[#00C4FF] text-[#0088CC] shadow-[0_0_25px_rgba(0,196,255,0.45)] scale-120 z-30 ring-4 ring-[#00C4FF]/15'
                              : matchesCat
                              ? 'bg-white border border-[#E2E8F0] text-[#0B132B] hover:border-[#00C4FF] hover:text-[#0088CC] hover:scale-110 shadow-sm'
                              : 'bg-white/60 border border-[#E2E8F0]/60 text-[#94A3B8] opacity-55 hover:opacity-100'
                          }`}
                          aria-label={`Open ${prod.name} page`}
                        >
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />

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

            {/* LIVE CLICKABLE PRODUCT SPOTLIGHT BAR */}
            <div className="w-full max-w-lg mt-5 rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#00C4FF]/60 p-4 sm:p-5 shadow-[0_12px_36px_rgba(15,23,42,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300">
              <button
                type="button"
                onClick={() => openProductPage(activeProduct)}
                className="flex items-start gap-3 text-left flex-1 cursor-pointer group"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${activeProduct.badgeColor}`}
                >
                  <activeProduct.icon className="w-5 h-5 stroke-[2]" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#0B132B] group-hover:text-[#0088CC] transition-colors">
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
              </button>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => openProductPage(activeProduct)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs font-semibold shadow-xs hover:scale-[1.03] transition-all cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:text-[#0B132B] hover:border-gray-400 transition-all cursor-pointer"
                  aria-label={isPlaying ? 'Pause orbit' : 'Resume orbit'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#0088CC]" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
