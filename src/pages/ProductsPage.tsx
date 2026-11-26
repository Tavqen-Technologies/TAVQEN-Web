import { ArrowRight } from 'lucide-react';
import OurProducts from '../components/OurProducts';
import TavqenProductsOrbit from '../components/TavqenProductsOrbit';

interface ProductsPageProps {
  onNavigate?: (path: string) => void;
}

export default function ProductsPage({ onNavigate }: ProductsPageProps) {
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
      {/* ========================================================= */}
      {/* TAVQEN ORBITAL PRODUCTS COSMOS (TOP HERO SHOWCASE)        */}
      {/* ========================================================= */}
      <TavqenProductsOrbit onNavigate={onNavigate} />

      {/* ========================================================= */}
      {/* FULL PRODUCTS INTERACTIVE GALLERY                         */}
      {/* ========================================================= */}
      <OurProducts isFullPage={true} />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-24">
        {/* ========================================================= */}
        {/* START A PROJECT CTA BANNER                                */}
        {/* ========================================================= */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-gradient-to-r from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/60 border border-[#00C4FF]/30 p-8 sm:p-12 text-center flex flex-col items-center shadow-[0_20px_50px_rgba(0,196,255,0.08)]">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            Custom Software & Products
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0B132B] tracking-tight max-w-xl leading-snug">
            Want to build a custom SaaS or digital product?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] max-w-lg mb-8 leading-relaxed">
            Our product engineers can design, build, and deploy your custom solution with the same polish and speed as our own flagship products.
          </p>
          <button
            type="button"
            onClick={() => handleNav('/start-a-project')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-sm font-semibold shadow-[0_8px_25px_rgba(0,196,255,0.3)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
