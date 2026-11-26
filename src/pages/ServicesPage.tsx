import { Smartphone, Monitor, Layers, Cpu, Bot, Cloud, ArrowRight, ShieldCheck, Zap, RefreshCw, Award } from 'lucide-react';
import WhatWeBuild from '../components/WhatWeBuild';
import DevelloServicesShowcase from '../components/DevelloServicesShowcase';

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

  const SERVICE_BENEFITS = [
    {
      title: 'Full Source Code & IP Ownership',
      description: 'You retain 100% intellectual property, repository access, and design assets from day one with zero vendor lock-in.',
      icon: ShieldCheck,
    },
    {
      title: 'Sub-100ms Performance Targets',
      description: 'We optimize every bundle, query, and cache layer for blistering load speeds and seamless user interactions.',
      icon: Zap,
    },
    {
      title: '2-Week Agile Delivery Sprints',
      description: 'Predictable sprint schedules with weekly live staging builds so you always see working progress before launch.',
      icon: RefreshCw,
    },
    {
      title: 'Senior Engineering Guarantee',
      description: 'No junior outsourcing. Every line of code is reviewed and engineered by experienced software craftspeople.',
      icon: Award,
    },
  ];

  const CAPABILITY_AREAS = [
    {
      icon: Smartphone,
      title: 'Mobile App Engineering',
      description: 'Native iOS and Android applications developed with React Native and modern mobile architectures.',
      tags: ['React Native', 'Expo', 'iOS Swift', 'Android', 'Push Notifications', 'App Store Setup'],
    },
    {
      icon: Monitor,
      title: 'Web Platforms & Frontends',
      description: 'Ultra-fast web apps engineered with React, Next.js, and server-side rendering for top-tier SEO and responsiveness.',
      tags: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Micro-frontends', 'Edge SSR'],
    },
    {
      icon: Layers,
      title: 'Multitenant SaaS Development',
      description: 'Turnkey SaaS products featuring self-serve client onboarding, Stripe billing, and role-based permissions.',
      tags: ['Subscription Billing', 'RBAC & Auth0', 'Multitenancy', 'Usage Analytics', 'Webhooks'],
    },
    {
      icon: Cpu,
      title: 'Custom Enterprise Software',
      description: 'Tailor-made internal tools, operational workflow engines, and backend APIs for mission-critical operations.',
      tags: ['High-throughput APIs', 'Database Sharding', 'Legacy Migration', 'Automated Testing'],
    },
    {
      icon: Bot,
      title: 'AI & Workflow Automation',
      description: 'Integrating intelligent LLMs, OCR document processing, vector search, and robotic process automation.',
      tags: ['OpenAI / Gemini', 'LangChain', 'OCR Engines', 'Vector DBs', 'Custom AI Agents'],
    },
    {
      icon: Cloud,
      title: 'Cloud DevOps & Infrastructure',
      description: 'Automated CI/CD pipelines, containerized Docker infrastructure, and zero-downtime deployments.',
      tags: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Cloudflare', 'PostgreSQL'],
    },
  ];

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
      {/* EXTENDED CAPABILITIES MATRIX                              */}
      {/* ========================================================= */}
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            Specialized Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#0B132B]">
            Full spectrum of software engineering.
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#64748B] font-normal leading-relaxed">
            Every capability needed to take your digital product from concept to high-volume scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-24">
          {CAPABILITY_AREAS.map((cap, idx) => {
            const Icon = cap.icon;
            const serviceIds = ['mobile', 'web', 'saas', 'custom', 'ai', 'cloud'];
            const targetServiceId = serviceIds[idx] || 'mobile';
            const openCapabilityService = () => {
              const targetPath = `/service?id=${targetServiceId}`;
              if (onNavigate) {
                onNavigate(targetPath);
              } else {
                window.location.href = targetPath;
              }
            };
            return (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                onClick={openCapabilityService}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openCapabilityService();
                  }
                }}
                className="group cursor-pointer rounded-3xl bg-white border border-[#E2E8F0] p-7 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:border-[#00C4FF]/55 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(0,136,204,0.08)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F1F5F9]">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0088CC]">
                    0{idx + 1} · Service Details
                  </span>
                  <span className="text-xs font-bold text-[#64748B] group-hover:text-[#0088CC] transition-colors">
                    Explore →
                  </span>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-6 shadow-2xs">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B132B] mb-2.5 tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6 font-normal">
                    {cap.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E2E8F0]/80">
                  {cap.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[#475569] text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* WHY WORK WITH OUR SQUADS (BENEFITS)                       */}
        {/* ========================================================= */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-[#E2E8F0] p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_rgba(15,23,42,0.04)] mb-20 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3">
              The TAVQEN Advantage
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight">
              Why leading founders choose TAVQEN.
            </h3>
            <p className="mt-2.5 text-sm sm:text-base text-[#64748B] leading-relaxed">
              We bridge the gap between creative product design and enterprise-level software engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {SERVICE_BENEFITS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-4 sm:gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0 shadow-2xs mt-1">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-[#0B132B] mb-1.5 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* START A PROJECT CTA BANNER                                */}
        {/* ========================================================= */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-gradient-to-r from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/60 border border-[#00C4FF]/30 p-8 sm:p-12 text-center flex flex-col items-center shadow-[0_20px_50px_rgba(0,196,255,0.08)]">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            Ready to Begin
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0B132B] tracking-tight max-w-xl leading-snug">
            Let&apos;s build your next digital product.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] max-w-lg mb-8 leading-relaxed">
            Tell us about your project requirements and receive a comprehensive architecture roadmap and quote.
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
