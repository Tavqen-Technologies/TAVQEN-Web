import tavqenLogo from '../../assits/Tavqen-logo.png';

// ============================================================================
// TOP ROUTE PROGRESS BAR
// ============================================================================
export interface RouteProgressBarProps {
  isLoading: boolean;
}

export function RouteProgressBar({ isLoading }: RouteProgressBarProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-black/5 overflow-hidden pointer-events-none">
      <div className="h-full bg-gradient-to-r from-[#00D4FF] via-[#0088CC] to-[#00D4FF] animate-pulse w-full shadow-[0_0_12px_rgba(0,196,255,0.85)]" />
    </div>
  );
}

// ============================================================================
// FULL INITIAL / PAGE LOADER
// ============================================================================
export interface PageLoaderProps {
  isLoading?: boolean;
  message?: string;
  isInitial?: boolean;
}

export default function PageLoader({
  isLoading = true,
  message = 'Crafting digital experience...',
}: PageLoaderProps) {
  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[99] flex flex-col items-center justify-center bg-[#F8FAFC]/95 backdrop-blur-md transition-opacity duration-300 ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      role="status"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center text-center p-6 relative">
        {/* Ambient Subtle Glow Behind Logo */}
        <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-[#00D4FF]/20 to-[#0088CC]/20 blur-2xl -z-10 animate-pulse pointer-events-none" />

        {/* TAVQEN Logo */}
        <div className="mb-6 relative">
          <img
            src={tavqenLogo}
            alt="TAVQEN"
            className="h-8 sm:h-9 w-auto object-contain select-none animate-pulse"
          />
        </div>

        {/* Minimal Micro Spinner Track */}
        <div className="w-48 sm:w-56 h-[3px] bg-slate-200/80 rounded-full overflow-hidden mb-3.5 relative">
          <div className="h-full w-1/3 bg-gradient-to-r from-[#00D4FF] via-[#0088CC] to-[#00C4FF] rounded-full shadow-[0_0_8px_rgba(0,196,255,0.7)] animate-marquee" />
        </div>

        {/* Subtle Status Caption */}
        <p className="text-xs font-mono text-[#64748B] tracking-wide select-none">
          {message}
        </p>
      </div>
    </div>
  );
}
