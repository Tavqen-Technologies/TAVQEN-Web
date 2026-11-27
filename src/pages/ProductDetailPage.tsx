import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { TAVQEN_PRODUCTS, getProductById, type ProductStatus } from '../data/productsData';

interface ProductDetailPageProps {
  productId?: string;
  onNavigate?: (path: string) => void;
}

const STATUS_BADGE_MAP: Record<ProductStatus, string> = {
  Available: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
  Beta: 'bg-[#E0F7FF] text-[#0088CC] border-[#00C4FF]/40',
  'In Development': 'bg-amber-50 text-amber-700 border-amber-200/70',
  Planned: 'bg-slate-100 text-slate-600 border-slate-200',
};

export default function ProductDetailPage({ productId, onNavigate }: ProductDetailPageProps) {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const galleryRowRef = useRef<HTMLDivElement | null>(null);
  const galleryBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeShotIdx, setActiveShotIdx] = useState(0);

  const resolvedId =
    productId ||
    (typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('id')
      : null);

  const product = getProductById(resolvedId);
  const Icon = product.icon;
  const gallery = product.gallery ?? [];
  const activeShot = gallery[activeShotIdx];
  const displayImage = activeShot?.image ?? product.image;

  const selectShot = (nextIdx: number) => {
    if (gallery.length === 0) return;
    const wrapped = (nextIdx + gallery.length) % gallery.length;
    setActiveShotIdx(wrapped);
    const row = galleryRowRef.current;
    const btn = galleryBtnRefs.current[wrapped];
    if (row && btn) {
      const rowRect = row.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const targetLeft =
        row.scrollLeft + (btnRect.left - rowRect.left) - (row.clientWidth - btnRect.width) / 2;
      row.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setActiveShotIdx(0);
    if (galleryRowRef.current) {
      galleryRowRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [product.id]);

  const connectedProducts = product.connectedWith
    .map((cid) => TAVQEN_PRODUCTS.find((p) => p.id === cid))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pd-animate',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }
      );
    }, el);

    return () => ctx.revert();
  }, [product.id]);

  return (
    <div ref={pageRef} className="pt-24 sm:pt-28 pb-16 sm:pb-20 bg-[#F8FAFC] relative overflow-x-clip">
      {/* Subtle Ambient Cyan Glow */}
      <div
        className="absolute top-32 left-1/2 -translate-x-1/2 w-full max-w-[880px] h-[460px] pointer-events-none opacity-30 -z-10"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0, 196, 255, 0.16) 0%, rgba(155, 227, 223, 0.12) 45%, transparent 72%)',
        }}
      />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb Navigation */}
        <div className="mb-5 sm:mb-8 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => handleNav('/products')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Products</span>
          </button>

          <span className="px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-[10.5px] sm:text-[11px] font-mono font-semibold text-[#64748B]">
            {product.version} · {product.categoryLabel}
          </span>
        </div>

        {/* ========================================================= */}
        {/* PRODUCT HERO SPOTLIGHT CARD (EXISTING CLEAN UI)           */}
        {/* ========================================================= */}
        <div className="pd-animate rounded-[24px] sm:rounded-[34px] lg:rounded-[38px] bg-white border border-[#E2E8F0] shadow-[0_24px_65px_rgba(15,23,42,0.05)] p-5 sm:p-10 lg:p-12 mb-10 sm:mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[#00C4FF]/70 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-12 items-center">
            {/* Left Product Info */}
            <div className="lg:col-span-7 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-4">
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shadow-2xs ${product.badgeColor}`}
                >
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#E0F7FF] text-[#0088CC] text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider">
                  {product.categoryLabel}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border text-[11px] sm:text-xs font-semibold ${STATUS_BADGE_MAP[product.status]
                    }`}
                >
                  <span>{product.status}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-[46px] font-bold text-[#0B132B] tracking-tight leading-[1.15] mb-2.5 sm:mb-3">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base font-semibold text-[#0088CC] mb-3 sm:mb-4">
                {product.tagline}
              </p>

              <p className="text-xs sm:text-[15.5px] lg:text-[16px] text-[#64748B] leading-relaxed mb-5 sm:mb-6">
                {product.overview}
              </p>

              {/* Supported Platforms */}
              <div className="flex flex-wrap items-center gap-2 mb-5 sm:mb-7">
                {product.platforms.map((plat) => (
                  <span
                    key={plat}
                    className="px-3 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono font-semibold text-[#0B132B]"
                  >
                    {plat}
                  </span>
                ))}
              </div>

              {/* Key Stats Row */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 py-3.5 sm:py-4 px-3.5 sm:px-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] mb-6 sm:mb-7">
                {product.stats.map((stat) => (
                  <div key={stat.label} className="min-w-0">
                    <div className="text-sm sm:text-xl font-bold text-[#0B132B] font-mono truncate">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-[#64748B] truncate">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleNav('/start-a-project')}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-sm font-semibold shadow-[0_8px_25px_rgba(0,196,255,0.28)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.38)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  <span>Contact TAVQEN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('/products')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] text-xs sm:text-sm font-semibold hover:border-[#0088CC] hover:text-[#0088CC] transition-all cursor-pointer"
                >
                  <span>Explore Products</span>
                </button>
              </div>
            </div>

            {/* Right Visual Mockup */}
            <div className="lg:col-span-5 min-w-0">
              <div className="w-full rounded-[24px] overflow-hidden border border-black/[0.08] shadow-[0_18px_45px_rgba(15,23,42,0.1)] bg-[#F8FAFC] group">
                <div className="w-full aspect-video lg:aspect-[16/11] bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F9FF] overflow-hidden p-2 sm:p-3 flex items-center justify-center">
                  <img
                    src={displayImage}
                    alt={activeShot ? `${product.name} — ${activeShot.title}` : product.alt}
                    className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <div className="px-4 py-3 bg-white border-t border-[#E2E8F0] flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#0B132B] truncate">
                    {activeShot ? `${product.name} · ${activeShot.title}` : `${product.name} · ${product.version}`}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#E0F7FF] text-[#0088CC] shrink-0">
                    {product.status}
                  </span>
                </div>
              </div>

              {gallery.length > 1 && (
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => selectShot(activeShotIdx - 1)}
                    className="w-8 h-8 rounded-full border border-[#E2E8F0] bg-white hover:border-[#0088CC] hover:text-[#0088CC] text-[#475569] shadow-2xs flex items-center justify-center shrink-0 transition-all active:scale-95 cursor-pointer"
                    aria-label="Previous screen"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div
                    ref={galleryRowRef}
                    className="flex-1 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {gallery.map((shot, idx) => {
                      const isShotActive = idx === activeShotIdx;
                      return (
                        <button
                          key={shot.title}
                          ref={(el) => {
                            galleryBtnRefs.current[idx] = el;
                          }}
                          type="button"
                          onClick={() => selectShot(idx)}
                          className={`shrink-0 w-16 sm:w-20 rounded-xl border overflow-hidden bg-white transition-all cursor-pointer p-1 text-left ${isShotActive
                            ? 'border-[#00C4FF] shadow-[0_6px_16px_rgba(0,196,255,0.20)] ring-2 ring-[#00C4FF]/20'
                            : 'border-[#E2E8F0] opacity-75 hover:opacity-100 hover:border-[#00C4FF]/50'
                            }`}
                          aria-label={`Preview ${shot.title}`}
                        >
                          <div className="w-full h-11 rounded-lg bg-[#F8FAFC] overflow-hidden flex items-center justify-center">
                            <img
                              src={shot.image}
                              alt={shot.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className="block mt-1 text-[9.5px] font-semibold text-[#0B132B] truncate text-center">
                            {shot.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => selectShot(activeShotIdx + 1)}
                    className="w-8 h-8 rounded-full border border-[#E2E8F0] bg-white hover:border-[#0088CC] hover:text-[#0088CC] text-[#475569] shadow-2xs flex items-center justify-center shrink-0 transition-all active:scale-95 cursor-pointer"
                    aria-label="Next screen"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* KEY PRODUCT CAPABILITIES GRID                             */}
        {/* ========================================================= */}
        <div className="pd-animate mb-14 sm:mb-16">
          <div className="max-w-2xl mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Features &amp; Benefits</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight">
              What {product.name} helps you do.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {product.features.map((feat) => (
              <div
                key={feat.title}
                className="rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-7 shadow-[0_6px_24px_rgba(15,23,42,0.03)] hover:border-[#00C4FF]/55 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0B132B] tracking-tight">
                    {feat.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-2">
                  {feat.description}
                </p>
                <p className="text-xs text-[#0088CC] font-medium leading-relaxed">
                  {feat.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* OTHER TAVQEN PRODUCTS                                     */}
        {/* ========================================================= */}
        <div className="pd-animate mb-14 sm:mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0088CC] block mb-1">
                Product Catalogue
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B132B] tracking-tight">
                More TAVQEN products
              </h3>
            </div>
            <button
              type="button"
              onClick={() => handleNav('/products')}
              className="text-xs sm:text-sm font-semibold text-[#0088CC] hover:text-[#00C4FF] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>View all products</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {connectedProducts.map((rel) => {
              const RelIcon = rel.icon;
              return (
                <button
                  key={rel.id}
                  type="button"
                  onClick={() => handleNav(`/product?id=${rel.id}`)}
                  className="text-left rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00C4FF] p-5 shadow-[0_6px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_14px_34px_rgba(0,196,255,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${rel.badgeColor}`}>
                      <RelIcon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0088CC] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="text-base font-bold text-[#0B132B] group-hover:text-[#0088CC] transition-colors">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                    {rel.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
