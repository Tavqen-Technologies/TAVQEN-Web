import { FileCode2, ShieldCheck, Activity, Target } from 'lucide-react';

interface FounderReason {
  number: string;
  title: string;
  description: string;
  icon: typeof FileCode2;
}

const REASONS: FounderReason[] = [
  {
    number: '01',
    title: 'Your Product. Your Code. Your Ownership.',
    description:
      'We believe in building with transparency. Get access to your source code, repositories, project documentation, and agreed design assets, with clear ownership terms and no unnecessary vendor lock-in.',
    icon: FileCode2,
  },
  {
    number: '02',
    title: 'Built for Performance, Security & Scale.',
    description:
      'From optimized architecture to secure development practices, we engineer digital solutions designed to perform reliably and adapt as your business grows.',
    icon: ShieldCheck,
  },
  {
    number: '03',
    title: 'Transparent Process. Visible Progress.',
    description:
      'Stay connected throughout development with defined milestones, regular updates, collaborative reviews, and working builds that keep you informed at every stage.',
    icon: Activity,
  },
  {
    number: '04',
    title: 'Engineering That Understands Your Business.',
    description:
      'We go beyond writing code. By understanding your goals and challenges, we build practical, maintainable technology solutions that support your business today and its ambitions for tomorrow.',
    icon: Target,
  },
];

export default function WhyFoundersServices() {
  return (
    <section className="relative bg-[#F8FAFC] border-t border-[#E2E8F0] py-16 sm:py-20 lg:py-24">
      {/* Soft Ambient Radial Background Accent */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] pointer-events-none opacity-25 -z-10"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0, 212, 255, 0.16) 0%, rgba(155, 227, 223, 0.12) 45%, transparent 72%)',
        }}
      />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* HEADER: Centered, Clean Editorial TAVQEN Style            */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E0F7FF] border border-[#00C4FF]/30 text-[#0088CC] text-xs font-mono font-bold tracking-wider uppercase mb-3.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0088CC] animate-pulse" />
            <span>Why Choose Us</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold tracking-tight text-[#0B132B] leading-[1.18]">
            Why Founders{' '}
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#0088CC] bg-clip-text text-transparent">
              Choose TAVQEN
            </span>
          </h2>

          <p className="mt-3.5 text-[14px] sm:text-[15.5px] text-[#64748B] font-normal leading-relaxed max-w-2xl mx-auto">
            We bring together business understanding, modern technology, and thoughtful engineering to transform ideas into reliable digital products.
          </p>
        </div>

        {/* ========================================================= */}
        {/* COMPACT 2-COLUMN RESPONSIVE GRID (4 REASONS)              */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {REASONS.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.number}
                className="group relative rounded-[20px] sm:rounded-[24px] bg-white border border-[#E2E8F0] p-6 sm:p-7 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_36px_rgba(0,196,255,0.10)] hover:border-[#00C4FF]/50 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle Ambient Hover Glow */}
                <div
                  className="absolute -top-12 -right-12 w-36 h-36 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(0, 212, 255, 0.22) 0%, transparent 70%)',
                  }}
                />

                {/* Top Edge Micro-Highlight Accent */}
                <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#00C4FF]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                <div>
                  {/* Top Row: Icon + Monospace Watermark Number */}
                  <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F0F9FF] to-[#E0F7FF] border border-[#00C4FF]/25 text-[#0088CC] flex items-center justify-center group-hover:bg-[#0088CC] group-hover:text-white transition-all duration-300 shadow-2xs">
                      <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />
                    </div>

                    <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-[#0B132B]/15 group-hover:text-[#0088CC]/40 transition-colors duration-300 tabular-nums select-none">
                      {item.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-[18px] font-bold text-[#0B132B] tracking-tight leading-snug group-hover:text-[#0088CC] transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-[13px] sm:text-[14px] text-[#64748B] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom subtle indicator line */}
                <div className="mt-5 pt-3.5 border-t border-[#F1F5F9] flex items-center justify-between">
                  <span className="text-[10.5px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-[#94A3B8] group-hover:text-[#0088CC] transition-colors">
                    Core Commitment
                  </span>
                  <span className="text-xs text-[#CBD5E1] group-hover:text-[#0088CC] group-hover:translate-x-0.5 transition-all duration-300 select-none">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
