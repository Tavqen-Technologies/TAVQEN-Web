import { useState } from 'react';
import { Mail, Clock, ShieldCheck, CheckCircle2, Sparkles, Send, ChevronDown } from 'lucide-react';

interface StartAProjectPageProps {
  onNavigate?: (path: string) => void;
}

export default function StartAProjectPage({ onNavigate }: StartAProjectPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Web Application',
    budget: '$15k - $30k',
    description: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const PROJECT_TYPES = [
    'Web Application',
    'Mobile App (iOS/Android)',
    'Multitenant SaaS',
    'Custom Software',
    'AI & Automation',
    'UI/UX Redesign',
  ];

  const BUDGET_RANGES = [
    '< $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
  ];

  const FAQS = [
    {
      q: 'How fast can our project kickoff after submission?',
      a: 'We review project inquiries within 24 hours. After an initial 30-minute discovery consultation and technical alignment call, we deliver a scoped architecture proposal. Typically, development sprints begin within 5 to 7 business days.',
    },
    {
      q: 'Do you sign Non-Disclosure Agreements (NDAs)?',
      a: 'Absolutely. We respect the confidentiality of your intellectual property and are happy to execute mutual NDAs prior to in-depth technical discussions.',
    },
    {
      q: 'Who owns the source code and design assets?',
      a: 'You retain 100% complete intellectual property ownership. All Git repositories, Figma files, cloud configs, and credentials belong entirely to you from day one.',
    },
    {
      q: 'How are payment and billing milestones structured?',
      a: 'For fixed-scope MVPs, we operate on clear milestone-based billing (e.g. 30% kickoff, 40% beta delivery, 30% final signoff). For ongoing product scaling squads, we operate on bi-weekly or monthly dedicated sprint retainers.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
  };

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
        {/* PAGE HERO HEADER                                          */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            Start a Project with TAVQEN
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-[56px] font-medium tracking-tight text-[#0B132B] leading-[1.12]">
            Let&apos;s Build Something Together.
          </h1>
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] text-[#64748B] font-normal leading-relaxed max-w-2xl mx-auto">
            Have an ambitious software idea, mobile app, or SaaS platform in mind? Share your project details below and our senior engineering squad will get in touch within 24 hours.
          </p>
        </div>

        {/* ========================================================= */}
        {/* MAIN INQUIRY GRID                                         */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-20 sm:mb-24">
          {/* LEFT COLUMN: INQUIRY FORM */}
          <div className="lg:col-span-7 bg-white rounded-[32px] sm:rounded-[40px] border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.05)] p-7 sm:p-10 lg:p-12 relative overflow-hidden">
            {isSubmitted ? (
              <div className="py-12 sm:py-16 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-xs animate-bounce">
                  <CheckCircle2 className="w-9 h-9 stroke-[2]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] mb-3">
                  Project Request Received!
                </h3>
                <p className="text-[#64748B] text-sm sm:text-base max-w-md mb-8 leading-relaxed font-normal">
                  Thank you, <span className="font-semibold text-[#0B132B]">{formData.name}</span>. Our engineering leads are reviewing your project scope and will follow up at <span className="font-semibold text-[#0B132B]">{formData.email}</span> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-white border border-[#E2E8F0] text-sm font-semibold text-[#0088CC] hover:border-[#00C4FF] shadow-2xs transition-all"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B132B] mb-2 tracking-tight">
                    Project Details
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Please share a few details so we can assign the right technical specialists.
                  </p>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                      Your Name <span className="text-[#0088CC]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                      Work Email <span className="text-[#0088CC]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Corp or Stealth Startup"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white transition-all"
                  />
                </div>

                {/* Project Type Selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                    Project Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                          formData.projectType === type
                            ? 'bg-[#E0F7FF] border-[#00C4FF] text-[#0088CC] font-semibold shadow-2xs'
                            : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-gray-400'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estimated Budget */}
                <div>
                  <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                    Estimated Budget Range (USD)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {BUDGET_RANGES.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: b })}
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                          formData.budget === b
                            ? 'bg-[#E0F7FF] border-[#00C4FF] text-[#0088CC] font-semibold shadow-2xs'
                            : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-gray-400'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                    Project Overview & Goals
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you want to build, target audience, core features, or any existing repos/designs..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white transition-all leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#0088CC] to-[#0088CC] text-white font-semibold text-sm sm:text-base shadow-[0_8px_25px_rgba(0,196,255,0.35)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.45)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Project Request</span>
                  <Send className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-[#94A3B8]">
                  By submitting, you agree to our confidential handling of your data. We never share your email.
                </p>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: DIRECT INFORMATION & VALUE REINFORCEMENT */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            {/* Direct Contact Card */}
            <div className="rounded-[32px] bg-white border border-[#E2E8F0] p-7 sm:p-8 shadow-[0_16px_40px_rgba(15,23,42,0.03)]">
              <h4 className="text-lg font-bold text-[#0B132B] mb-5 tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#0088CC]" />
                <span>Direct Information</span>
              </h4>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B132B] uppercase tracking-wider">
                      Direct Inquiries
                    </div>
                    <a
                      href="mailto:contact@tavqen.com"
                      className="text-sm font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors"
                    >
                      contact@tavqen.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B132B] uppercase tracking-wider">
                      Response SLA
                    </div>
                    <div className="text-xs sm:text-sm text-[#64748B]">
                      Within 24 business hours guaranteed
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B132B] uppercase tracking-wider">
                      NDA Protected
                    </div>
                    <div className="text-xs sm:text-sm text-[#64748B]">
                      Strict confidentiality and privacy protection
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="mt-6 pt-5 border-t border-[#E2E8F0] flex items-center gap-2 text-xs font-medium text-[#475569]">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Currently booking Q1 & Q2 Product Sprints</span>
              </div>
            </div>

            {/* What happens next? */}
            <div className="rounded-[32px] bg-gradient-to-br from-[#F8FAFC] to-[#F0F9FF] border border-[#E2E8F0] p-7 sm:p-8">
              <h4 className="text-base font-bold text-[#0B132B] mb-4">
                What happens after you submit?
              </h4>
              <div className="space-y-4">
                {[
                  {
                    step: '01',
                    title: 'Discovery Review',
                    desc: 'Our technical director reviews your requirements and tech stack compatibility.',
                  },
                  {
                    step: '02',
                    title: 'Initial Architecture Call',
                    desc: 'A focused 30-min call to align on goals, budget, and milestone roadmap.',
                  },
                  {
                    step: '03',
                    title: 'Sprint Proposal & Kickoff',
                    desc: 'We present clear fixed-scope milestones and assign your dedicated engineering squad.',
                  },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#E0F7FF] text-[#0088CC] text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 mt-0.5">
                      {s.step}
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#0B132B]">
                        {s.title}
                      </div>
                      <div className="text-xs text-[#64748B] leading-relaxed">
                        {s.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-[28px] bg-white border border-[#E2E8F0] p-6 text-center">
              <span className="text-xs font-semibold text-[#64748B] block mb-3 uppercase tracking-wider">
                Connect on Social Channels
              </span>
              <div className="flex items-center justify-center gap-3">
                {[
                  { name: 'Twitter / X', url: 'https://twitter.com' },
                  { name: 'GitHub', url: 'https://github.com' },
                  { name: 'LinkedIn', url: 'https://linkedin.com' },
                ].map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:text-[#0B132B] hover:border-gray-400 transition-all hover:scale-105"
                  >
                    {soc.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PROJECT INQUIRY FAQS                                      */}
        {/* ========================================================= */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-2">
              Common Questions
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B]">
              Frequently Asked Project Questions
            </h3>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#00C4FF]/50 shadow-xs'
                      : 'bg-white border-[#E2E8F0] hover:border-gray-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#0B132B]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#0088CC] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#E2E8F0]/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
