import { Smartphone, Monitor, Cpu, Bot , Gamepad2 ,ArrowRight, } from 'lucide-react';
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


 const CAPABILITY_AREAS = [
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Building user-friendly Android and cross-platform mobile applications with modern technologies and seamless API integration.',
    tags: [
      'React Native',
      'Android Apps',
      'Cross-Platform',
      'API Integration',
      'Mobile UI',
      'App Deployment',
    ],
  },
  {
    icon: Monitor,
    title: 'Website Development',
    description:
      'Creating modern, responsive, and performance-focused websites for businesses, startups, and digital products.',
    tags: [
      'React.js',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Responsive Design',
      'CMS Integration',
    ],
  },
  {
    icon: Bot,
    title: 'AI Solutions & Integration',
    description:
      'Integrating AI-powered features into digital products to build smarter applications and improve everyday workflows.',
    tags: [
      'Gemini API',
      'OpenAI API',
      'AI Chatbots',
      'LLM Integration',
      'AI Assistants',
      'Workflow Automation',
    ],
  },
  {
    icon: Cpu,
    title: 'Custom Software Development',
    description:
      'Developing customized software, web applications, and backend systems designed around specific business requirements.',
    tags: [
      'MERN Stack',
      'Node.js',
      'Express.js',
      'REST APIs',
      'MongoDB',
      'Database Integration',
    ],
  },
  {
    icon: Gamepad2,
    title: 'Game Development',
    description:
      'Creating engaging interactive games with creative gameplay concepts, intuitive interfaces, and immersive experiences.',
    tags: [
      '2D Game Development',
      'Gameplay Mechanics',
      'Interactive UI',
      'Game Logic',
      'Game Testing',
      'Optimization',
    ],
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
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="inline-block px-3 py-0.5 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-[11px] font-semibold uppercase tracking-wider mb-2.5">
            Specialized Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0B132B]">
            Full spectrum of software engineering.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#64748B] font-normal leading-relaxed">
            Every capability needed to take your digital product from concept to high-volume scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5 mb-14 sm:mb-18">
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
                className="group cursor-pointer rounded-2xl bg-white border border-[#E2E8F0] p-4 sm:p-5 shadow-[0_2px_15px_rgba(15,23,42,0.03)] hover:border-[#00C4FF]/55 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,136,204,0.07)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Top: Icon Box + Counter & Arrow */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      <Icon className="w-4.5 h-4.5 stroke-[2]" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] font-bold text-[#94A3B8] group-hover:text-[#0088CC] transition-colors">
                        0{idx + 1}
                      </span>
                      <span className="text-xs text-[#94A3B8] group-hover:text-[#0088CC] group-hover:translate-x-0.5 transition-all">
                        →
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-[17px] font-semibold text-[#0B132B] mb-1.5 tracking-tight group-hover:text-[#0088CC] transition-colors leading-snug">
                    {cap.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[12px] sm:text-[12.5px] text-[#64748B] leading-relaxed mb-3.5 font-normal">
                    {cap.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1 pt-3 border-t border-[#F1F5F9]">
                  {cap.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0]/80 text-[#475569] text-[10.5px] font-medium"
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
        {/* START A PROJECT CTA BANNER                                */}
        {/* ========================================================= */}
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
