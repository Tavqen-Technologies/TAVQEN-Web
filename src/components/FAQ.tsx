import { useMemo, useState } from 'react';
import { ArrowRight, MessageSquare, Plus, Search, Sparkles } from 'lucide-react';

interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    number: '01',
    category: 'Capabilities',
    question: 'What digital services does TAVQEN Technologies specialize in?',
    answer:
      'We specialize in end-to-end digital product creation—including custom web applications, native & cross-platform iOS/Android mobile applications, multitenant SaaS platforms, AI & n8n workflow automation, and enterprise software systems.',
  },
  {
    id: 'faq-2',
    number: '02',
    category: 'Process',
    question: 'How does your product development process work?',
    answer:
      'We follow our collaborative 4-step framework: Discover, Design, Build, and Evolve. We begin by analyzing your business goals and user flows, craft high-fidelity interactive prototypes in Figma, engineer production-grade code in 2-week agile sprints, and support launch and continuous growth.',
  },
  {
    id: 'faq-3',
    number: '03',
    category: 'Technology',
    question: 'What modern technology stack does your engineering team use?',
    answer:
      'Our core stack includes React 18, Next.js, TypeScript, Tailwind CSS, React Native, Node.js, Python, FastAPI, PostgreSQL, and Redis. We deploy across AWS, Google Cloud, and Cloudflare with containerized Docker environments and zero-downtime CI/CD pipelines.',
  },
  {
    id: 'faq-4',
    number: '04',
    category: 'Timeline',
    question: 'How long does a typical product or MVP take to launch?',
    answer:
      'A focused MVP typically takes between 4 to 8 weeks from initial sprint kickoff to production deployment. Larger multi-platform products or enterprise software suites range from 2 to 4 months, with weekly working demo builds delivered throughout.',
  },
  {
    id: 'faq-5',
    number: '05',
    category: 'Engagement',
    question: 'How is pricing and engagement structured?',
    answer:
      'We provide transparent, flexible models: milestone-based fixed scope contracts for clearly defined MVPs and projects, or dedicated monthly engineering squads for continuous product development, scaling, and feature iteration.',
  },
  {
    id: 'faq-6',
    number: '06',
    category: 'Support',
    question: 'Do you provide ongoing support, maintenance, and SLA guarantees?',
    answer:
      'Yes. Every project includes post-launch warranty support. We also provide ongoing SLA maintenance agreements covering 24/7 uptime monitoring, security patching, cloud performance optimization, and regular feature updates.',
  },
  {
    id: 'faq-7',
    number: '07',
    category: 'Ownership',
    question: 'Who owns the intellectual property and code repository?',
    answer:
      'You own 100% of all intellectual property, source code, UI/UX design assets, and cloud configurations upon project completion. We deliver complete documentation and clean repository handoffs with zero vendor lock-in.',
  },
];

const CATEGORIES = ['All', 'Capabilities', 'Process', 'Technology', 'Timeline', 'Engagement', 'Support', 'Ownership'];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [query, setQuery] = useState<string>('');

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((item) => {
      const catOk = selectedCategory === 'All' || item.category === selectedCategory;
      const textOk =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return catOk && textOk;
    });
  }, [selectedCategory, query]);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-24 lg:py-28 bg-white relative overflow-x-clip border-t border-[#E2E8F0]"
    >
      {/* Subtle Architectural Dot & Cyan Ambient Field */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-12 right-[-120px] w-[420px] h-[420px] rounded-full pointer-events-none opacity-35 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(0, 196, 255, 0.16) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ========================================================= */}
          {/* LEFT STICKY COLUMN: HEADER, TOPICS & DIRECT HELP CARD      */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6" data-animate="fade-up">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E0F7FF] text-[#0088CC] text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Questions &amp; Answers
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#0B132B] leading-[1.12]">
                Frequently Asked{' '}
                <span className="bg-gradient-to-r from-[#00C4FF] to-[#0088CC] bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              <p className="mt-3.5 text-[14.5px] sm:text-[15.5px] text-[#64748B] font-normal leading-relaxed lg:max-w-md">
                Clear answers about our engineering workflow, tech stack, launch timelines, and 100% source ownership.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative lg:max-w-md">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search timelines, stack, pricing..."
                aria-label="Search frequently asked questions"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#00C4FF] focus:bg-white focus:outline-hidden text-sm text-[#0B132B] placeholder:text-[#94A3B8] transition-all"
              />
            </div>

            {/* Topic Filter Pills */}
            <div className="flex flex-wrap gap-2 lg:max-w-md">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      const firstMatch = FAQS.find(
                        (f) => category === 'All' || f.category === category
                      );
                      if (firstMatch) setOpenId(firstMatch.id);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0B132B] text-white border-[#0B132B] shadow-xs'
                        : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:border-[#00C4FF]/60 hover:text-[#0B132B]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Direct Engineering CTA Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0B132B] to-[#132145] p-6 text-white shadow-[0_20px_45px_rgba(11,19,43,0.14)] lg:max-w-md relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-[#00C4FF]/20 blur-2xl pointer-events-none"
              />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#00D4FF] mb-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Still Exploring?
                </div>
                <p className="text-base font-bold leading-snug mb-1.5">
                  Have a custom technical challenge or scope question?
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Get a direct architecture walkthrough and milestone estimate from our engineering leads.
                </p>
                <a
                  href="/start-a-project"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs font-bold shadow-md hover:shadow-[#00C4FF]/35 hover:-translate-y-0.5 transition-all"
                >
                  <span>Talk to our engineers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: TACTILE ACCORDION DECK                      */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <div className="rounded-[28px] sm:rounded-[32px] bg-[#F8FAFC]/90 border border-[#E2E8F0] p-2.5 sm:p-4 space-y-2.5 sm:space-y-3 shadow-[0_14px_40px_rgba(15,23,42,0.03)]">
              {filteredFaqs.length === 0 ? (
                <div className="rounded-2xl bg-white border border-[#E2E8F0] p-10 text-center">
                  <p className="text-sm font-bold text-[#0B132B] mb-1">
                    No matching questions found
                  </p>
                  <p className="text-xs text-[#64748B] mb-4">
                    Try another keyword or reset the topic filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setSelectedCategory('All');
                      setOpenId('faq-1');
                    }}
                    className="px-4 py-2 rounded-full bg-[#E0F7FF] text-[#0088CC] text-xs font-bold hover:bg-[#0088CC] hover:text-white transition-colors cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredFaqs.map((faq) => {
                  const isOpen = openId === faq.id;

                  return (
                    <div
                      key={faq.id}
                      className={`relative rounded-[20px] sm:rounded-[22px] border transition-all duration-300 overflow-hidden ${
                        isOpen
                          ? 'bg-white border-[#00C4FF]/55 shadow-[0_16px_38px_rgba(0,136,204,0.09)]'
                          : 'bg-white/75 border-[#E2E8F0]/90 hover:bg-white hover:border-[#00C4FF]/35'
                      }`}
                    >
                      {/* Left Active Vertical Accent Bar */}
                      <div
                        className={`absolute left-0 top-3 bottom-3 w-[3.5px] rounded-r-full bg-gradient-to-b from-[#00D4FF] to-[#0088CC] transition-opacity duration-300 ${
                          isOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full text-left px-4 py-4 sm:px-6 sm:py-5 flex items-start sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-hidden group"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-start gap-3.5 sm:gap-4 pr-2">
                          <span
                            className={`mt-0.5 sm:mt-0 w-8 h-8 rounded-xl font-mono text-xs font-extrabold flex items-center justify-center flex-shrink-0 transition-colors ${
                              isOpen
                                ? 'bg-[#E0F7FF] text-[#0088CC]'
                                : 'bg-[#F1F5F9] text-[#64748B] group-hover:text-[#0B132B]'
                            }`}
                          >
                            {faq.number}
                          </span>

                          <div>
                            <span
                              className={`inline-block text-[10px] font-mono font-bold uppercase tracking-widest mb-1 transition-colors ${
                                isOpen ? 'text-[#0088CC]' : 'text-[#94A3B8]'
                              }`}
                            >
                              {faq.category}
                            </span>
                            <h3
                              className={`text-[15px] sm:text-[17px] font-bold tracking-tight leading-snug transition-colors ${
                                isOpen ? 'text-[#0B132B]' : 'text-[#1E293B] group-hover:text-[#0088CC]'
                              }`}
                            >
                              {faq.question}
                            </h3>
                          </div>
                        </div>

                        <div
                          className={`mt-1 sm:mt-0 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${
                            isOpen
                              ? 'bg-[#0B132B] border-[#0B132B] text-white rotate-45 shadow-xs'
                              : 'bg-white border-[#E2E8F0] text-[#64748B] group-hover:border-[#00C4FF] group-hover:text-[#0088CC]'
                          }`}
                        >
                          <Plus className="w-4 h-4" />
                        </div>
                      </button>

                      {/* Smooth Collapsible Answer */}
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-4 pb-5 sm:px-6 sm:pb-6 sm:pl-[72px]">
                            <div className="pt-3 border-t border-[#E2E8F0]/75 text-[13.5px] sm:text-[14.5px] text-[#64748B] leading-relaxed">
                              {faq.answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
