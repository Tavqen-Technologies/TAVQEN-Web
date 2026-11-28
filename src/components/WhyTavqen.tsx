import { ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';

interface PrincipleRow {
  number: string;
  tag: string;
  title: string;
  description: string;
  points: string[];
}

const PRINCIPLES: PrincipleRow[] = [
  {
    number: '01',
    tag: 'PRODUCT-FIRST',
    title: 'Product-First Mindset',
    description:
      'We prioritize core product value, practical workflows, and real-world utility over vanity features or unnecessary bloat.',
    points: [
      'Problem-first approach to every feature',
      'Eliminating unnecessary feature bloat',
      'Engineered for long-term product viability',
    ],
  },
  {
    number: '02',
    tag: 'PRODUCTION-GRADE',
    title: 'Modern Technology',
    description:
      'Built with production-proven technologies and scalable architecture for fast, secure, and reliable digital products.',
    points: [
      'Type-safe, modular code architecture',
      'Fast load speeds and responsive interfaces',
      'Cloud-ready deployment and scalable infrastructure',
    ],
  },
  {
    number: '03',
    tag: 'INNOVATIVE SOLUTIONS',
    title: 'Creative Thinking',
    description:
      'We find pragmatic, out-of-the-box solutions to complex technical challenges, tailored directly to your business goals.',
    points: [
      'Pragmatic system design & architecture',
      'Tailored technical problem solving',
      'Adaptable, scalable digital solutions',
    ],
  },
  {
    number: '04',
    tag: 'INTUITIVE UX',
    title: 'User-Focused Approach',
    description:
      'Every interface is designed for real humans—clean, accessible, and intuitive, reducing friction and learning curves for end users.',
    points: [
      'Simple, ergonomic, and clear user flows',
      'Consistent experience across all devices',
      'Accessible layouts and readable typography',
    ],
  },
  {
    number: '05',
    tag: 'DIRECT PARTNERSHIP',
    title: 'Collaborative Teamwork',
    description:
      'We work as an extension of your own team with transparent communication, direct developer access, and regular milestone demos.',
    points: [
      'Direct, responsive developer access',
      'Regular progress updates and roadmap visibility',
      'True partnership aligned with your success',
    ],
  },
  {
    number: '06',
    tag: 'ONGOING ITERATION',
    title: 'Continuous Improvement',
    description:
      'We continuously refine techniques, update security standards, and optimize code performance as technologies evolve.',
    points: [
      'Proactive code tuning and security audits',
      'Iterative enhancements and smooth scaling',
      'Dependable ongoing technical support',
    ],
  },
];

interface WhyTavqenProps {
  onNavigate?: (path: string) => void;
}

export default function WhyTavqen({ onNavigate }: WhyTavqenProps = {}) {
  const handleCta = () => {
    if (onNavigate) {
      onNavigate('/start-a-project');
    } else {
      window.location.hash = '/start-a-project';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="why"
      className="relative bg-[#F8FAFC] border-t border-[#E2E8F0] py-10 xs:py-12 sm:py-18 lg:py-24"
    >
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* CENTERED TOP HEADER: Unified SectionHeading System        */}
        {/* ========================================================= */}
        <SectionHeading
          eyebrow="Why TAVQEN?"
          title="Built to create."
          highlight="Designed to evolve."
          description="Six principles that shape how we think, build, and deliver digital products."
        />

        {/* ========================================================= */}
        {/* MINIMAL HORIZONTAL PRINCIPLE ROWS (Thin-line Editorial)   */}
        {/* ========================================================= */}
        <div className="max-w-[1040px] mx-auto border-b border-[#E2E8F0]">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="group py-4 xs:py-5 sm:py-8 border-t border-[#E2E8F0] transition-colors duration-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-8 items-start">
                
                {/* Left sub-area: Arrow + Principle Tag */}
                <div className="md:col-span-4 flex items-center gap-2.5 pt-0.5">
                  <span className="text-[#94A3B8] group-hover:text-[#0088CC] group-hover:translate-x-1 transition-all duration-200 text-sm font-mono shrink-0 select-none">
                    →
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-[#64748B] group-hover:text-[#0B132B] transition-colors duration-200">
                    {principle.tag}
                  </span>
                </div>

                {/* Right sub-area: Title + Description + Supporting Points */}
                <div className="md:col-span-8">
                  <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#0B132B] tracking-tight group-hover:text-[#0088CC] transition-colors duration-200 leading-snug">
                    {principle.title}
                  </h3>

                  <p className="mt-1.5 text-[12.5px] sm:text-[13.5px] text-[#64748B] leading-relaxed font-normal">
                    {principle.description}
                  </p>

                  {/* Small Supporting Points */}
                  <ul className="mt-3 space-y-1.5 pt-2.5 border-t border-dashed border-[#E2E8F0]/80">
                    {principle.points.map((point, pIdx) => (
                      <li
                        key={pIdx}
                        className="flex items-center gap-2 text-[11.5px] sm:text-[12px] text-[#475569] font-normal"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0088CC]/40 group-hover:bg-[#0088CC] transition-colors shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            type="button"
            onClick={handleCta}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#E2E8F0] hover:border-[#00C4FF]/60 text-xs sm:text-sm font-semibold text-[#0B132B] hover:text-[#0088CC] shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
          >
            <span>Start a project with our team</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#0088CC]" />
          </button>
        </div>

      </div>
    </section>
  );
}
