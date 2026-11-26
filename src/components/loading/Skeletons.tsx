// ============================================================================
// IMAGE SKELETON
// ============================================================================
export interface ImageSkeletonProps {
  className?: string;
  aspectRatio?: string;
  rounded?: string;
}

export function ImageSkeleton({
  className = '',
  aspectRatio = 'aspect-[16/10]',
  rounded = 'rounded-2xl',
}: ImageSkeletonProps) {
  return (
    <div
      className={`w-full ${aspectRatio} ${rounded} skeleton-shimmer bg-slate-200/80 ${className}`}
      aria-hidden="true"
    />
  );
}

// ============================================================================
// NAVBAR SKELETON
// ============================================================================
export function NavbarSkeleton() {
  return (
    <div className="fixed top-3.5 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="w-full max-w-[1180px] h-14 sm:h-16 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.05)] px-5 sm:px-7 flex items-center justify-between">
        {/* Logo skeleton */}
        <div className="w-24 sm:w-28 h-6 rounded-md skeleton-shimmer bg-slate-200" />
        {/* Nav links skeleton */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-16 h-4 rounded-md skeleton-shimmer bg-slate-200" />
          ))}
        </div>
        {/* CTA skeleton */}
        <div className="w-32 h-9 rounded-full skeleton-shimmer bg-slate-200" />
      </div>
    </div>
  );
}

// ============================================================================
// HERO SKELETON
// ============================================================================
export function HeroSkeleton() {
  return (
    <section className="pt-32 sm:pt-40 pb-20 w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
        {/* Pill Badge */}
        <div className="w-40 h-7 rounded-full skeleton-shimmer bg-slate-200" />
        {/* Big Heading */}
        <div className="w-full max-w-xl h-12 sm:h-14 rounded-2xl skeleton-shimmer bg-slate-200 mt-2" />
        <div className="w-4/5 h-10 sm:h-12 rounded-2xl skeleton-shimmer bg-slate-200" />
        {/* Subtitle */}
        <div className="w-full max-w-lg h-5 rounded-md skeleton-shimmer bg-slate-200 mt-4" />
        <div className="w-3/5 h-5 rounded-md skeleton-shimmer bg-slate-200" />
        {/* CTA Buttons */}
        <div className="flex items-center gap-4 pt-6">
          <div className="w-36 h-11 rounded-full skeleton-shimmer bg-slate-200" />
          <div className="w-32 h-11 rounded-full skeleton-shimmer bg-slate-200" />
        </div>
      </div>

      {/* Hero Showcase Frame */}
      <div className="mt-14 w-full h-72 sm:h-96 lg:h-[420px] rounded-3xl skeleton-shimmer bg-slate-200" />
    </section>
  );
}

// ============================================================================
// SECTION SKELETON
// ============================================================================
export interface SectionSkeletonProps {
  cardCount?: number;
  className?: string;
}

export function SectionSkeleton({ cardCount = 3, className = '' }: SectionSkeletonProps) {
  return (
    <section className={`py-16 sm:py-24 w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
        <div className="w-28 h-6 rounded-full mx-auto skeleton-shimmer bg-slate-200" />
        <div className="w-72 sm:w-96 h-9 rounded-xl mx-auto skeleton-shimmer bg-slate-200" />
        <div className="w-full max-w-md h-4 rounded-md mx-auto skeleton-shimmer bg-slate-200" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {Array.from({ length: cardCount }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// CARD SKELETON
// ============================================================================
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] p-6 shadow-xs space-y-4 ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl skeleton-shimmer bg-slate-200" />
      <div className="w-2/3 h-6 rounded-lg skeleton-shimmer bg-slate-200" />
      <div className="space-y-2">
        <div className="w-full h-4 rounded-md skeleton-shimmer bg-slate-200" />
        <div className="w-4/5 h-4 rounded-md skeleton-shimmer bg-slate-200" />
      </div>
      <div className="pt-2 flex items-center justify-between">
        <div className="w-20 h-4 rounded-md skeleton-shimmer bg-slate-200" />
        <div className="w-6 h-6 rounded-full skeleton-shimmer bg-slate-200" />
      </div>
    </div>
  );
}

// ============================================================================
// PRODUCT CARD SKELETON
// ============================================================================
export function ProductCardSkeleton() {
  return (
    <div className="rounded-[28px] bg-white border border-[#E2E8F0] p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        {/* Top Eyebrow + Icon */}
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl skeleton-shimmer bg-slate-200" />
          <div className="w-24 h-6 rounded-full skeleton-shimmer bg-slate-200" />
        </div>
        {/* Title & Tagline */}
        <div className="w-3/4 h-7 rounded-lg skeleton-shimmer bg-slate-200" />
        <div className="w-full h-4 rounded-md skeleton-shimmer bg-slate-200" />
        <div className="w-2/3 h-4 rounded-md skeleton-shimmer bg-slate-200" />
      </div>

      {/* Product Image Mockup */}
      <div className="w-full h-48 sm:h-56 rounded-2xl skeleton-shimmer bg-slate-200" />

      {/* Feature bullets skeleton */}
      <div className="space-y-2 pt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full skeleton-shimmer bg-slate-200 flex-shrink-0" />
            <div className="w-full h-3.5 rounded-md skeleton-shimmer bg-slate-200" />
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="w-full h-11 rounded-full skeleton-shimmer bg-slate-200" />
    </div>
  );
}

// ============================================================================
// PROJECT / CASE STUDY CARD SKELETON
// ============================================================================
export function ProjectCardSkeleton() {
  return (
    <div className="rounded-[28px] bg-white border border-[#E2E8F0] overflow-hidden shadow-xs flex flex-col md:flex-row items-stretch">
      {/* Visual media preview */}
      <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[260px] skeleton-shimmer bg-slate-200" />
      {/* Content panel */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="w-28 h-6 rounded-full skeleton-shimmer bg-slate-200" />
          <div className="w-4/5 h-7 rounded-lg skeleton-shimmer bg-slate-200" />
          <div className="w-full h-4 rounded-md skeleton-shimmer bg-slate-200" />
          <div className="w-3/4 h-4 rounded-md skeleton-shimmer bg-slate-200" />
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-3">
          <div className="w-20 h-6 rounded-full skeleton-shimmer bg-slate-200" />
          <div className="w-24 h-6 rounded-full skeleton-shimmer bg-slate-200" />
          <div className="w-16 h-6 rounded-full skeleton-shimmer bg-slate-200" />
        </div>
        {/* Link */}
        <div className="pt-2 w-32 h-5 rounded-md skeleton-shimmer bg-slate-200" />
      </div>
    </div>
  );
}

// ============================================================================
// FORM SKELETON
// ============================================================================
export function FormSkeleton() {
  return (
    <div className="rounded-[28px] bg-white border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-5">
      <div className="w-40 h-6 rounded-lg skeleton-shimmer bg-slate-200" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="w-24 h-4 rounded-md skeleton-shimmer bg-slate-200" />
          <div className="w-full h-11 rounded-2xl skeleton-shimmer bg-slate-200" />
        </div>
        <div className="space-y-2">
          <div className="w-24 h-4 rounded-md skeleton-shimmer bg-slate-200" />
          <div className="w-full h-11 rounded-2xl skeleton-shimmer bg-slate-200" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="w-32 h-4 rounded-md skeleton-shimmer bg-slate-200" />
        <div className="w-full h-11 rounded-2xl skeleton-shimmer bg-slate-200" />
      </div>
      <div className="space-y-2">
        <div className="w-28 h-4 rounded-md skeleton-shimmer bg-slate-200" />
        <div className="w-full h-28 rounded-2xl skeleton-shimmer bg-slate-200" />
      </div>
      <div className="w-36 h-11 rounded-full skeleton-shimmer bg-slate-200" />
    </div>
  );
}

// ============================================================================
// TABLE SKELETON
// ============================================================================
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="w-full rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-xs">
      {/* Header */}
      <div className="grid grid-flow-col auto-cols-fr gap-4 px-6 py-3.5 bg-slate-50 border-b border-[#E2E8F0]">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-4 w-20 rounded-md skeleton-shimmer bg-slate-200" />
        ))}
      </div>
      {/* Rows */}
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, rIdx) => (
          <div key={rIdx} className="grid grid-flow-col auto-cols-fr gap-4 px-6 py-4 items-center">
            {Array.from({ length: cols }).map((_, cIdx) => (
              <div
                key={cIdx}
                className={`h-4 rounded-md skeleton-shimmer bg-slate-200 ${
                  cIdx === 0 ? 'w-3/4' : 'w-1/2'
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// DASHBOARD SKELETON
// ============================================================================
export function DashboardSkeleton() {
  return (
    <div className="space-y-6 w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Stat KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl bg-white border border-[#E2E8F0] p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-20 h-4 rounded-md skeleton-shimmer bg-slate-200" />
              <div className="w-8 h-8 rounded-lg skeleton-shimmer bg-slate-200" />
            </div>
            <div className="w-24 h-7 rounded-lg skeleton-shimmer bg-slate-200" />
            <div className="w-32 h-3.5 rounded-md skeleton-shimmer bg-slate-200" />
          </div>
        ))}
      </div>

      {/* Main Charts / Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-36 h-5 rounded-md skeleton-shimmer bg-slate-200" />
            <div className="w-20 h-7 rounded-lg skeleton-shimmer bg-slate-200" />
          </div>
          <div className="w-full h-64 rounded-xl skeleton-shimmer bg-slate-200" />
        </div>
        <div className="lg:col-span-4 rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-xs space-y-4">
          <div className="w-32 h-5 rounded-md skeleton-shimmer bg-slate-200" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full skeleton-shimmer bg-slate-200 flex-shrink-0" />
                <div className="w-full space-y-1.5">
                  <div className="w-3/4 h-4 rounded-md skeleton-shimmer bg-slate-200" />
                  <div className="w-1/2 h-3 rounded-md skeleton-shimmer bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
