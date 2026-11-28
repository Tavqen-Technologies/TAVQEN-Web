import { ArrowRight } from 'lucide-react';
import WhatWeBuild from '../components/WhatWeBuild';
import DevelloServicesShowcase from '../components/DevelloServicesShowcase';
import WhyFoundersServices from '../components/WhyFoundersServices';

interface ServicesPageProps {
  onNavigate?: (path: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
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
      {/* DEVELLO-STYLE INTERACTIVE SERVICES SHOWCASE (AT VERY TOP) */}
      {/* ========================================================= */}
      <DevelloServicesShowcase onNavigate={onNavigate} />

      {/* ========================================================= */}
      {/* IN-DEPTH DETAILED SERVICES EXPANSION                      */}
      {/* ========================================================= */}
      <WhatWeBuild isFullPage={true} onNavigate={onNavigate} />

      {/* ========================================================= */}
      {/* WHY FOUNDERS CHOOSE TAVQEN                                */}
      {/* ========================================================= */}
      <WhyFoundersServices />

      {/* ========================================================= */}
      {/* START A PROJECT CTA BANNER                                */}
      {/* ========================================================= */}
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="rounded-[32px] sm:rounded-[40px] bg-gradient-to-r from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/60 border border-[#00C4FF]/30 p-8 sm:p-12 text-center flex flex-col items-center shadow-[0_20px_50px_rgba(0,196,255,0.08)]">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            Let's Build the Future
          </span>

          <h2 className="text-2xl sm:text-4xl font-bold text-[#0B132B] tracking-tight max-w-xl leading-snug">
            Have an idea? Let's turn it into reality.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#64748B] max-w-lg mb-8 leading-relaxed">
            Whether it's a digital product, website, mobile app, or custom software,
            TAVQEN Technologies is ready to bring your vision to life.
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
