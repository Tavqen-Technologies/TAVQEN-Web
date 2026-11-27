import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Layers,
  Sparkles,
  Wrench,
  ShieldCheck,
} from 'lucide-react';
import {
  getServiceById,
  TAVQEN_SERVICES,
  type ServiceDetail,
} from '../data/servicesData';
import { ServiceAnimatedVisual } from '../components/ServiceVisuals';

interface ServiceDetailPageProps {
  serviceId?: string;
  onNavigate?: (path: string) => void;
}

export default function ServiceDetailPage({ serviceId, onNavigate }: ServiceDetailPageProps) {
  const resolveIdFromLocation = (): string => {
    const params = new URLSearchParams(window.location.search);
    const queryId = params.get('id');
    if (queryId) return queryId;

    const hashQuery = window.location.hash.split('?')[1];
    if (hashQuery) {
      const hParams = new URLSearchParams(hashQuery);
      const hashId = hParams.get('id');
      if (hashId) return hashId;
    }

    const hashPath = window.location.hash.replace(/^#\/?/, '').split('?')[0];
    if (hashPath && hashPath.startsWith('service/')) {
      return hashPath.replace('service/', '');
    }

    return serviceId || 'mobile-app-development';
  };

  const [activeId, setActiveId] = useState<string>(resolveIdFromLocation);

  useEffect(() => {
    const syncFromUrl = () => {
      setActiveId(resolveIdFromLocation());
    };
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, [serviceId]);

  const service: ServiceDetail = getServiceById(activeId);

  const relatedServices = (service.relatedIds || [])
    .map((id) => getServiceById(id))
    .filter((item): item is ServiceDetail => Boolean(item && item.id !== service.id));

  const goTo = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
    }
  };

  const openService = (id: string) => {
    setActiveId(id);
    if (onNavigate) {
      onNavigate(`/service?id=${id}`);
    } else {
      window.location.hash = `/service?id=${id}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* ========================================================= */}
        {/* TOP BREADCRUMB + SERVICE SWITCHER                         */}
        {/* ========================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <button
            type="button"
            onClick={() => goTo('/services')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] text-xs font-semibold hover:border-[#00C4FF]/60 hover:text-[#0088CC] transition-all shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Services</span>
          </button>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mr-1 hidden sm:inline">
              Select Service:
            </span>
            {TAVQEN_SERVICES.map((item: ServiceDetail) => {
              const isCurrent = item.id === service.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openService(item.id)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#0B132B] text-white border-[#0B132B] shadow-xs scale-[1.02]'
                      : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#00C4FF]/50 hover:text-[#0B132B]'
                  }`}
                >
                  {item.number} · {item.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* HERO CARD (Compact, Clean & Professional with Live Visual)*/}
        {/* ========================================================= */}
        <section className="rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] shadow-[0_12px_40px_rgba(11,19,43,0.04)] overflow-hidden mb-8 sm:mb-10 mt-2 sm:mt-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Copy */}
            <div className="lg:col-span-7 p-5 sm:p-7 lg:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E0F7FF] text-[#0088CC] text-[10.5px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    Service {service.number} · {service.badge}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] text-[10.5px] font-semibold">
                    <Clock className="w-3 h-3 text-[#0088CC]" />
                    {service.timeline}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0B132B] tracking-tight leading-snug mb-2.5">
                  {service.title}
                </h1>

                <p className="text-xs sm:text-[13.5px] font-medium text-[#0088CC] leading-relaxed mb-3">
                  {service.tagline}
                </p>

                <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed max-w-xl">
                  {service.overview}
                </p>
              </div>

              {/* Metrics + Actions */}
              <div className="space-y-4 pt-4 border-t border-[#F1F5F9]">
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {service.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/70 p-2.5 sm:p-3 text-center sm:text-left"
                    >
                      <div className="text-base sm:text-lg font-bold text-[#0B132B]">
                        {metric.value}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-medium text-[#64748B] mt-0.5 truncate">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => goTo('/start-a-project')}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white font-semibold text-xs shadow-xs hover:shadow-[#00C4FF]/30 hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <span>Start {service.title.split(' ')[0]} Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] sm:text-xs text-[#64748B]">
                    Model: <strong className="text-[#0B132B] font-semibold">{service.engagementModel}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Visual Showcase (Exact Home Animation for Active Service) */}
            <div className="lg:col-span-5 relative bg-gradient-to-br from-[#F0F9FF] via-[#F8FAFC] to-[#E0F7FF] border-t lg:border-t-0 lg:border-l border-[#E2E8F0] p-4 sm:p-6 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[340px]">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-35 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(rgba(0, 196, 255, 0.3) 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Window Frame with the Active Service's Visual Animation */}
              <div className="relative z-10 w-full max-w-[340px] rounded-2xl bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-[0_16px_40px_rgba(15,23,42,0.08)] p-3 sm:p-3.5 overflow-hidden flex flex-col justify-between">
                {/* Window Header */}
                <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80 shrink-0" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80 shrink-0" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80 shrink-0" />
                    <span className="ml-2 text-[11px] font-bold text-[#0B132B] truncate">
                      {service.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9.5px] font-mono font-bold text-[#0088CC]">ACTIVE</span>
                  </div>
                </div>

                {/* Animated Visual Canvas matching Home */}
                <div className="w-full h-[230px] sm:h-[240px] rounded-xl bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9]/60 border border-[#E2E8F0] flex items-center justify-center relative overflow-hidden">
                  <ServiceAnimatedVisual serviceId={service.id} />
                </div>

                {/* Window Footer Status */}
                <div className="pt-2.5 mt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[10.5px]">
                  <span className="font-medium text-[#64748B] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C4FF]" />
                    Interactive Showcase
                  </span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full text-[9.5px]">
                    Production Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CHALLENGE VS TAVQEN ARCHITECTURE                          */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
          <div className="rounded-2xl bg-white border border-[#E2E8F0] p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
              Common Industry Bottleneck
            </p>
            <h2 className="text-base sm:text-lg font-bold text-[#0B132B] mb-2">The Engineering Challenge</h2>
            <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
              {service.challenge}
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-[#00C4FF]/35 p-5 sm:p-6 shadow-[0_6px_20px_rgba(0,136,204,0.04)]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#0088CC] mb-1.5">
              TAVQEN Architecture
            </p>
            <h2 className="text-base sm:text-lg font-bold text-[#0B132B] mb-2">How We Engineer It</h2>
            <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
              {service.solution}
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CORE DELIVERABLES                                         */}
        {/* ========================================================= */}
        <section className="mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4 sm:mb-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0088CC] block mb-1">
                Scope & Deliverables
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B] tracking-tight">
                What Ships With This Service
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#64748B]">
              <Layers className="w-3.5 h-3.5 text-[#0088CC]" />
              Full source code ownership included
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {service.deliverables.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-xl sm:rounded-2xl bg-white border border-[#E2E8F0] p-4 sm:p-5 hover:border-[#00C4FF]/45 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center font-bold font-mono text-xs shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#0B132B] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* DELIVERY PROCESS & PRODUCTION STACK (TAVQEN THEME)        */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-10 sm:mb-12">
          {/* Left Process */}
          <div className="lg:col-span-8 rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] p-5 sm:p-6 lg:p-7 shadow-[0_4px_24px_rgba(15,23,42,0.03)]">
            <span className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-wider text-[#0088CC] mb-1">
              Execution Cadence
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#0B132B] tracking-tight mb-4">
              How We Take It to Production
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {service.process.map((step, idx) => (
                <div
                  key={step.title || idx}
                  className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 sm:p-4 hover:border-[#00C4FF]/45 hover:bg-white transition-all shadow-2xs"
                >
                  <span className="inline-block text-[10px] font-bold font-mono text-[#0088CC] bg-[#E0F7FF] px-2 py-0.5 rounded-full mb-1.5 border border-[#00C4FF]/20">
                    Phase {step.number || step.phase || `0${idx + 1}`}
                  </span>
                  <h3 className="text-sm font-semibold text-[#0B132B] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#64748B] leading-relaxed">
                    {step.description || step.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Stack Card (Consistent Light TAVQEN Theme) */}
          <div className="lg:col-span-4 rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] p-5 sm:p-6 flex flex-col justify-between gap-5 shadow-[0_4px_24px_rgba(15,23,42,0.03)]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-[#0088CC] mb-1.5">
                <Wrench className="w-3.5 h-3.5 text-[#0088CC]" />
                <span>Production Stack</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0B132B] mb-3">Tools & Frameworks</h3>
              <div className="flex flex-wrap gap-1.5">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-semibold text-[#0B132B] hover:border-[#00C4FF]/50 hover:bg-[#E0F7FF]/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#F1F5F9]">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#64748B] mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% IP & Code Ownership</span>
              </div>
              <button
                type="button"
                onClick={() => goTo('/start-a-project')}
                className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white font-semibold text-xs shadow-xs hover:shadow-[#00C4FF]/25 hover:opacity-95 transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Request Technical Scope</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* RELATED SERVICES                                          */}
        {/* ========================================================= */}
        {relatedServices.length > 0 && (
          <section>
            <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B132B]">
                Explore Related Services
              </h2>
              <button
                type="button"
                onClick={() => goTo('/services')}
                className="text-xs font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors cursor-pointer"
              >
                View All Services →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
              {relatedServices.map((rel) => (
                <button
                  key={rel.id}
                  type="button"
                  onClick={() => openService(rel.id)}
                  className="text-left rounded-2xl bg-white border border-[#E2E8F0] p-4 sm:p-5 hover:border-[#00C4FF]/55 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)] group cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E0F7FF] text-[#0088CC]">
                      {rel.number} · {rel.badge}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#0088CC] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <h3 className="text-sm sm:text-[15px] font-bold text-[#0B132B] mb-1 group-hover:text-[#0088CC] transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                    {rel.tagline}
                  </p>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
