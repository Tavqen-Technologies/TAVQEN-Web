import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Wrench,
} from 'lucide-react';
import {
  getServiceById,
  TAVQEN_SERVICES,
  type ServiceDetail,
} from '../data/servicesData';

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
    return serviceId || 'mobile';
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
  const relatedServices = service.relatedIds
    .map((id) => TAVQEN_SERVICES.find((item) => item.id === id))
    .filter((item): item is ServiceDetail => Boolean(item));

  const goTo = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  const openService = (id: string) => {
    setActiveId(id);
    goTo(`/service?id=${id}`);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-28 sm:pt-32 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Breadcrumb + Quick Service Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10">
          <button
            type="button"
            onClick={() => goTo('/services')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] text-xs sm:text-sm font-semibold hover:border-[#00C4FF]/60 hover:text-[#0088CC] transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748B] mr-1 hidden sm:inline">
              Quick Switch:
            </span>
            {TAVQEN_SERVICES.filter(
              (item) => ['mobile', 'web', 'saas', 'custom', 'ai', 'cloud'].includes(item.id) || item.id === service.id
            ).map((item) => {
              const isCurrent = item.id === service.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openService(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    isCurrent
                      ? 'bg-[#0B132B] text-white border-[#0B132B] shadow-sm'
                      : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#00C4FF]/50 hover:text-[#0B132B]'
                  }`}
                >
                  {item.number} · {item.title.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero Card */}
        <section className="rounded-[2rem] bg-white border border-[#E2E8F0] shadow-[0_24px_60px_rgba(11,19,43,0.06)] overflow-hidden mb-10 sm:mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Copy */}
            <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between gap-8">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F7FF] text-[#0088CC] text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    Service {service.number} · {service.badge}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] text-[11px] font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#0088CC]" />
                    {service.timeline}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight leading-[1.1] mb-4">
                  {service.title}
                </h1>

                <p className="text-base sm:text-lg font-medium text-[#0088CC] leading-relaxed mb-4">
                  {service.tagline}
                </p>

                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-2xl">
                  {service.overview}
                </p>
              </div>

              {/* Metrics + Actions */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-5 border-t border-[#E2E8F0]">
                  {service.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]/80 p-3.5 sm:p-4"
                    >
                      <div className="text-lg sm:text-2xl font-extrabold text-[#0B132B]">
                        {metric.value}
                      </div>
                      <div className="text-[11px] sm:text-xs font-medium text-[#64748B] mt-0.5">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => goTo('/start-a-project')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#00C4FF] to-[#0088CC] text-white font-bold text-sm shadow-lg shadow-[#0088CC]/20 hover:shadow-[#00C4FF]/35 hover:-translate-y-0.5 transition-all"
                  >
                    <span>Start {service.title.split(' ')[0]} Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs sm:text-sm font-medium text-[#64748B]">
                    Model: <strong className="text-[#0B132B]">{service.engagementModel}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Visual Showcase */}
            <div className="lg:col-span-5 relative bg-gradient-to-br from-[#F0F9FF] via-[#F8FAFC] to-[#E0F7FF] border-t lg:border-t-0 lg:border-l border-[#E2E8F0] p-6 sm:p-8 flex items-center justify-center min-h-[280px] sm:min-h-[360px]">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-45 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#0088CC 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden bg-white border border-[#E2E8F0] shadow-[0_20px_50px_rgba(11,19,43,0.12)]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full aspect-video object-contain bg-white"
                />
                <div className="px-4 py-3 bg-white border-t border-[#E2E8F0] flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#0B132B] truncate">
                    {service.badge}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Production Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge vs Engineering Approach */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 sm:mb-14">
          <div className="rounded-3xl bg-white border border-[#E2E8F0] p-7 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#64748B] mb-2">
              Common Bottleneck
            </p>
            <h2 className="text-xl font-bold text-[#0B132B] mb-3">The Engineering Challenge</h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              {service.challenge}
            </p>
          </div>
          <div className="rounded-3xl bg-white border border-[#00C4FF]/35 p-7 sm:p-8 shadow-[0_10px_30px_rgba(0,136,204,0.06)]">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#0088CC] mb-2">
              TAVQEN Architecture
            </p>
            <h2 className="text-xl font-bold text-[#0B132B] mb-3">How We Engineer It</h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              {service.solution}
            </p>
          </div>
        </section>

        {/* Core Deliverables */}
        <section className="mb-10 sm:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#0088CC] block mb-1">
                Scope & Deliverables
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] tracking-tight">
                What Ships With This Service
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B]">
              <Layers className="w-4 h-4 text-[#0088CC]" />
              Full source ownership & CI/CD included
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {service.deliverables.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-7 hover:border-[#00C4FF]/45 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center font-extrabold text-sm shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0B132B] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Delivery Process & Production Stack */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-14 sm:mb-16">
          <div className="lg:col-span-8 rounded-3xl bg-white border border-[#E2E8F0] p-7 sm:p-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#0088CC] block mb-1">
              Execution Cadence
            </span>
            <h2 className="text-2xl font-extrabold text-[#0B132B] tracking-tight mb-6">
              How We Take It to Production
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.process.map((step) => (
                <div
                  key={step.phase}
                  className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-5"
                >
                  <span className="inline-block text-[11px] font-extrabold text-[#0088CC] uppercase tracking-widest mb-1.5">
                    Phase {step.phase}
                  </span>
                  <h3 className="text-base font-bold text-[#0B132B] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {step.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 rounded-3xl bg-[#0B132B] text-white p-7 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00D4FF] mb-2">
                <Wrench className="w-4 h-4" />
                Production Stack
              </div>
              <h3 className="text-xl font-bold mb-4">Tools & Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-white/15">
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Need a tailored architecture breakdown or milestone estimate for your roadmap?
              </p>
              <button
                type="button"
                onClick={() => goTo('/start-a-project')}
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white font-bold text-xs sm:text-sm hover:opacity-95 transition-opacity inline-flex items-center justify-center gap-2"
              >
                <span>Request Technical Scope</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B132B]">
              Explore Related Services
            </h2>
            <button
              type="button"
              onClick={() => goTo('/services')}
              className="text-xs sm:text-sm font-bold text-[#0088CC] hover:text-[#00C4FF] transition-colors"
            >
              View All Services →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedServices.map((rel) => (
              <button
                key={rel.id}
                type="button"
                onClick={() => openService(rel.id)}
                className="text-left rounded-3xl bg-white border border-[#E2E8F0] p-6 hover:border-[#00C4FF]/55 hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] group"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E0F7FF] text-[#0088CC]">
                    {rel.number} · {rel.badge}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#0088CC] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h3 className="text-lg font-bold text-[#0B132B] mb-1.5 group-hover:text-[#0088CC] transition-colors">
                  {rel.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] line-clamp-2 leading-relaxed">
                  {rel.tagline}
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
