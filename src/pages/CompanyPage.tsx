import { Shield, Sparkles, Target, Users, Code2, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import HowTavqen from '../components/HowTavqen';
import WhyTavqen from '../components/WhyTavqen';

interface CompanyPageProps {
  onNavigate?: (path: string) => void;
}

export default function CompanyPage({ onNavigate }: CompanyPageProps) {
  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const TECH_STACK = [
    { category: 'Frontend', items: ['React 18', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'] },
    { category: 'Mobile', items: ['React Native', 'Expo', 'iOS Swift', 'Android Kotlin', 'App Store CI/CD'] },
    { category: 'Backend & APIs', items: ['Node.js', 'Python', 'FastAPI', 'Express', 'GraphQL', 'RESTful APIs'] },
    { category: 'Data & Cloud', items: ['PostgreSQL', 'Redis', 'Docker', 'AWS', 'Google Cloud', 'Cloudflare Workers'] },
  ];

  const CORE_VALUES = [
    {
      title: 'Obsessive Craftsmanship',
      description: 'We care deeply about every pixel, interaction, query plan, and line of code we deliver.',
      icon: Sparkles,
    },
    {
      title: 'Transparent Collaboration',
      description: 'Zero agency bureaucracy. You work directly with senior product builders and engineers.',
      icon: Users,
    },
    {
      title: 'Scalable Architecture',
      description: 'We engineer systems designed to handle 10x traffic bursts from day one without breaking.',
      icon: Shield,
    },
    {
      title: 'Business-Driven Engineering',
      description: 'Code is only valuable when it moves your business metrics and delights your users.',
      icon: Target,
    },
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28">
      {/* GLOBAL CONTAINER */}
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home Breadcrumb */}
        <div className="mb-6 sm:mb-8">
          <button
            type="button"
            onClick={() => handleNav('/home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors cursor-pointer"
          >
            <span>← Back to Home</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* HERO SECTION                                              */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            About TAVQEN Technologies
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-[56px] font-medium tracking-tight text-[#0B132B] leading-[1.12]">
            Engineering digital products that shape what&apos;s next.
          </h1>
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] text-[#64748B] font-normal leading-relaxed max-w-2xl mx-auto">
            TAVQEN Technologies is an advanced software engineering and digital product studio. We partner with ambitious founders, startups, and forward-thinking enterprises to design, build, and scale world-class software.
          </p>
        </div>

        {/* ========================================================= */}
        {/* STATS STRIP                                               */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20 sm:mb-24">
          {[
            { value: '40+', label: 'Digital Products Shipped' },
            { value: '99.9%', label: 'Production Uptime' },
            { value: '100%', label: 'Source Code Ownership' },
            { value: '4.9/5', label: 'Client Satisfaction Score' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-7 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#00C4FF]/40 transition-all"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#0088CC] bg-clip-text text-transparent mb-1 font-mono">
                {stat.value}
              </div>
              <div className="text-xs sm:text-[13px] font-medium text-[#64748B]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* VISION & MISSION DUAL CARDS                               */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-20 sm:mb-24">
          {/* Vision */}
          <div className="rounded-[28px] sm:rounded-[36px] bg-white border border-[#E2E8F0] p-8 sm:p-10 shadow-[0_16px_40px_rgba(15,23,42,0.04)] relative overflow-hidden group hover:border-[#00C4FF]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-6 shadow-xs">
              <Target className="w-6 h-6 stroke-[2]" />
            </div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#0088CC] mb-2 block">
              Our Vision
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight mb-4">
              To be the premier engineering foundation for modern software.
            </h3>
            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed font-normal">
              We envision a world where every transformative idea is realized through flawless code, intuitive user experiences, and scalable cloud infrastructure that stands the test of time.
            </p>
          </div>

          {/* Mission */}
          <div className="rounded-[28px] sm:rounded-[36px] bg-white border border-[#E2E8F0] p-8 sm:p-10 shadow-[0_16px_40px_rgba(15,23,42,0.04)] relative overflow-hidden group hover:border-[#00C4FF]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-6 shadow-xs">
              <Code2 className="w-6 h-6 stroke-[2]" />
            </div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#0088CC] mb-2 block">
              Our Mission
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight mb-4">
              To turn ambitious concepts into reliable, production-ready reality.
            </h3>
            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed font-normal">
              Our mission is to eliminate tech debt, remove friction, and build high-leverage digital systems using battle-tested technology and agile cross-functional engineering squads.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* WHY TAVQEN (INTERACTIVE PROCESS)                          */}
      {/* ========================================================= */}
      <WhyTavqen />

      {/* ========================================================= */}
      {/* HOW TAVQEN WORKS (4-STEP FRAMEWORK)                      */}
      {/* ========================================================= */}
      <HowTavqen />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-24">
        {/* ========================================================= */}
        {/* CORE ENGINEERING VALUES                                   */}
        {/* ========================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            Engineering Culture
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#0B132B]">
            Values that guide how we build.
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#64748B] font-normal leading-relaxed">
            Every product we touch is guided by four uncompromising principles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 sm:mb-24">
          {CORE_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] p-7 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:border-[#00C4FF]/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-5 shadow-2xs">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <h4 className="text-lg font-bold text-[#0B132B] mb-2 tracking-tight">
                  {val.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-normal">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* TECHNOLOGIES STACK                                        */}
        {/* ========================================================= */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-[#E2E8F0] p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_rgba(15,23,42,0.04)] mb-20 sm:mb-24">
          <div className="max-w-2xl mb-10 sm:mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3">
              Production Stack
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight">
              Modern technologies we engineer with.
            </h3>
            <p className="mt-2.5 text-sm sm:text-base text-[#64748B] leading-relaxed">
              We leverage modern, type-safe, and industry-standard tools to build software that is fast, secure, and maintainable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TECH_STACK.map((group, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E2E8F0]">
                  <Cpu className="w-4 h-4 text-[#0088CC]" />
                  <h4 className="text-sm font-bold text-[#0B132B] font-mono uppercase tracking-wider">
                    {group.category}
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {group.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-center gap-2 text-xs sm:text-sm text-[#475569] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0088CC] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* START A PROJECT CTA BANNER                                */}
        {/* ========================================================= */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-gradient-to-r from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/60 border border-[#00C4FF]/30 p-8 sm:p-12 text-center flex flex-col items-center shadow-[0_20px_50px_rgba(0,196,255,0.08)]">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            Partner with TAVQEN
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0B132B] tracking-tight max-w-xl leading-snug">
            Ready to bring your ambitious digital product to life?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] max-w-lg mb-8 leading-relaxed">
            Schedule an introductory sprint consultation with our engineering squad and receive a clear technical proposal.
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
