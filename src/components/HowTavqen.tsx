import { Compass, Palette, Code2, Rocket } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: any;
  tagline: string;
}

const STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    tagline: 'Strategy & Insights',
    description:
      'Understand the idea, business goals, users, and challenges before we start building.',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Design',
    tagline: 'UX/UI & Systems',
    description:
      'Shape the experience, user flow, and product direction into a clear and practical solution.',
    icon: Palette,
  },
  {
    number: '03',
    title: 'Build',
    tagline: 'Engineering & Scale',
    description:
      'Develop fast, scalable, and reliable digital products using modern technologies.',
    icon: Code2,
  },
  {
    number: '04',
    title: 'Evolve',
    tagline: 'Growth & Support',
    description:
      'Launch, improve, and continuously evolve the product based on real-world needs and feedback.',
    icon: Rocket,
  },
];

export default function HowTavqen() {
  return (
    <section id="how" className="py-20 sm:py-24 lg:py-28 bg-[#F8FAFC] border-t border-[#E2E8F0] relative overflow-hidden">
      {/* Subtle organic light accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none opacity-30 -z-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(0, 196, 255, 0.12) 0%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            Our Approach
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0B132B] leading-[1.15]">
            How TAVQEN
          </h2>
          <p className="mt-3.5 sm:mt-4 text-[14px] sm:text-[15.5px] text-[#64748B] font-normal leading-relaxed">
            We turn ideas into practical digital products through a clear, collaborative, and technology-driven approach.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 4-STEP HORIZONTAL PROCESS CARDS                           */}
        {/* ========================================================= */}
        <div className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div
            className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#E2E8F0] via-[#00C4FF]/50 to-[#E2E8F0] -z-0 pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-white rounded-[24px] sm:rounded-[28px] border border-[#E2E8F0] p-6 sm:p-7 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_35px_rgba(0,196,255,0.14)] hover:border-[#00C4FF]/60 hover:-translate-y-1.5 transition-all duration-400 group relative flex flex-col justify-between"
                >
                  {/* Top Bar: Step Number + Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      {/* Step Number Badge */}
                      <span className="font-mono text-xs font-bold text-[#0088CC] bg-[#E0F7FF] px-2.5 py-1 rounded-full border border-[#00C4FF]/20">
                        {step.number}
                      </span>

                      {/* Icon Container */}
                      <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0088CC] group-hover:bg-gradient-to-br group-hover:from-[#00D4FF] group-hover:to-[#0088CC] group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-2xs">
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                    </div>

                    {/* Tagline */}
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] block mb-1">
                      {step.tagline}
                    </span>

                    {/* Step Title */}
                    <h3 className="text-xl font-bold text-[#0B132B] tracking-tight group-hover:text-[#0088CC] transition-colors mb-2.5">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[13.5px] sm:text-[14px] text-[#64748B] leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Card Bottom: Step Progress indicator dot */}
                  <div className="mt-6 pt-4 border-t border-[#E2E8F0]/70 flex items-center justify-between">
                    <span className="text-[12px] font-medium text-[#94A3B8] group-hover:text-[#0088CC] transition-colors">
                      Step {idx + 1} of 4
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#E2E8F0] group-hover:bg-[#00C4FF] transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
