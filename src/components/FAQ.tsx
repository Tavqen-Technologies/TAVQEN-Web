import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Capabilities',
    question: 'What digital services does TAVQEN Technologies specialize in?',
    answer:
      'We specialize in end-to-end digital product creation—including custom web applications, native & cross-platform iOS/Android mobile applications, multitenant SaaS platforms, and enterprise software systems. We also engineer and ship our own proprietary SaaS and consumer products.',
  },
  {
    id: 'faq-2',
    category: 'Process',
    question: 'How does your product development process work?',
    answer:
      'We follow our collaborative 4-step framework: Discover, Design, Build, and Evolve. We begin by analyzing your business goals and user flows, craft high-fidelity interactive prototypes in Figma, engineer production-grade code in 2-week agile sprints, and support launch and continuous product growth.',
  },
  {
    id: 'faq-3',
    category: 'Technology',
    question: 'What modern technology stack does your engineering team use?',
    answer:
      'Our core stack includes React, Next.js, TypeScript, Tailwind CSS, React Native, Node.js, Python, PostgreSQL, and Redis. We deploy across AWS, Google Cloud, and Cloudflare with containerized Docker environments, automated testing, and zero-downtime CI/CD pipelines.',
  },
  {
    id: 'faq-4',
    category: 'Timeline',
    question: 'How long does a typical product or MVP take to launch?',
    answer:
      'A focused MVP typically takes between 4 to 8 weeks from initial sprint kickoff to production deployment. Larger multi-platform products or enterprise software suites typically range from 2 to 4 months, with weekly working demo builds delivered throughout.',
  },
  {
    id: 'faq-5',
    category: 'Engagement',
    question: 'How is pricing and engagement structured?',
    answer:
      'We provide transparent, flexible models: milestone-based fixed scope contracts for clearly defined MVPs and projects, or dedicated monthly engineering squads for continuous product development, scaling, and feature iteration.',
  },
  {
    id: 'faq-6',
    category: 'Support',
    question: 'Do you provide ongoing support, maintenance, and SLA guarantees?',
    answer:
      'Yes. Every project includes post-launch warranty support. We also provide ongoing SLA maintenance agreements covering 24/7 uptime monitoring, security patching, cloud performance optimization, and regular feature updates.',
  },
  {
    id: 'faq-7',
    category: 'Ownership',
    question: 'Who owns the intellectual property and code repository?',
    answer:
      'You own 100% of all intellectual property, source code, UI/UX design assets, and cloud configurations upon project completion. We deliver complete documentation and clean repository handoffs with zero vendor lock-in.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-24 lg:py-28 bg-white relative overflow-hidden border-t border-[#E2E8F0]"
    >
      {/* Subtle ambient cyan glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none opacity-20 -z-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(0, 196, 255, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            Questions & Answers
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0B132B] leading-[1.15]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3.5 text-[14px] sm:text-[15.5px] text-[#64748B] font-normal leading-relaxed">
            Everything you need to know about partnering with TAVQEN, our engineering approach, timelines, and product delivery.
          </p>
        </div>

        {/* ========================================================= */}
        {/* ACCORDION LIST                                            */}
        {/* ========================================================= */}
        <div className="space-y-3.5 sm:space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-[20px] sm:rounded-[24px] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#F8FAFC] border-[#00C4FF]/50 shadow-[0_8px_30px_rgba(0,196,255,0.08)]'
                    : 'bg-white border-[#E2E8F0] hover:border-gray-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left px-6 py-5 sm:px-7 sm:py-5.5 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`text-xs font-semibold font-mono px-2 py-0.5 rounded-md transition-colors ${
                        isOpen
                          ? 'bg-[#0088CC] text-white'
                          : 'bg-[#F1F5F9] text-[#64748B]'
                      }`}
                    >
                      {faq.category}
                    </span>
                    <span className="text-[15.5px] sm:text-[17px] font-semibold text-[#0B132B] tracking-tight">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#0088CC] text-white rotate-180 shadow-2xs'
                        : 'bg-[#F1F5F9] text-[#64748B]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Collapsible Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-1 sm:px-7 sm:pb-6 text-[14px] sm:text-[15px] text-[#64748B] leading-relaxed border-t border-[#E2E8F0]/60 mt-1">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* BOTTOM HELP CTA                                           */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <p className="text-xs sm:text-sm text-[#475569] font-medium">
              Have a custom technical challenge or need a project estimate?
            </p>
            <a
              href="#project"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs font-semibold shadow-xs hover:scale-105 active:scale-95 transition-all"
            >
              <span>Talk to our engineers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
