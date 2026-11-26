import { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, MessageSquare, ArrowRight, CheckCircle2, ChevronDown, Compass, ShieldCheck } from 'lucide-react';

interface StartAProjectPageProps {
  onNavigate?: (path: string) => void;
}

export default function StartAProjectPage({ onNavigate }: StartAProjectPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '₹1,00,000 – ₹3,00,000 (1 - 3 Lakhs)',
    selectedServices: ['Mobile App', 'Web Platform'],
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First open by default

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const SERVICE_OPTIONS = [
    'Mobile app',
    'Website',
    'Web platform',
    'UI/UX Design',
    'AI & Automation',
    'Other / All-in',
  ];

  const BUDGET_OPTIONS = [
    'Select a budget (INR ₹)...',
    '< ₹1,00,000 (< 1 Lakh)',
    '₹1,00,000 – ₹3,00,000 (1 - 3 Lakhs)',
    '₹3,00,000 – ₹7,00,000 (3 - 7 Lakhs)',
    '₹7,00,000 – ₹15,00,000 (7 - 15 Lakhs)',
    '₹15,00,000+ (15 Lakhs+ / Enterprise)',
  ];

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(service);
      if (exists) {
        return {
          ...prev,
          selectedServices: prev.selectedServices.filter((s) => s !== service),
        };
      } else {
        return {
          ...prev,
          selectedServices: [...prev.selectedServices, service],
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
  };

  const FAQS = [
    {
      q: 'How long does it take to start a project?',
      a: 'Most projects kick off within 1 to 2 weeks. After you reach out, we organize an initial discovery call within 24 hours, followed by a scoped architectural proposal and sprint kickoff schedule.',
    },
    {
      q: 'How do you structure pricing and milestones?',
      a: 'For fixed-scope MVPs, we operate on clear milestone-based billing (e.g. 30% kickoff, 40% beta delivery, 30% final signoff). For ongoing product scaling squads, we operate on dedicated bi-weekly or monthly sprint retainers.',
    },
    {
      q: 'Do you sign an NDA before we share our ideas?',
      a: 'Yes, absolutely. We treat your intellectual property with complete confidentiality and will gladly execute a mutual Non-Disclosure Agreement (NDA) before any detailed technical or architectural discussions.',
    },
    {
      q: 'Who will be working on our project?',
      a: 'You collaborate directly with dedicated senior full-stack engineers, UI/UX designers, and a technical project architect. We do not use anonymous subcontracting; you have direct Slack and meeting access to the builders.',
    },
    {
      q: 'Will we own all source code and design files?',
      a: 'Yes, 100%. All Git repositories, Figma design systems, cloud deployment configs, CI/CD pipelines, and credentials belong entirely to you from day one. There is zero vendor lock-in.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================================= */}
      {/* 1. TAVQEN LIGHT THEME HERO HEADER                             */}
      {/* ============================================================= */}
      <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 bg-[#F8FAFC] border-b border-[#E2E8F0] overflow-hidden">
        {/* Subtle Cyan Ambient Radial Lighting (TAVQEN Signature Theme) */}
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[750px] h-[500px] pointer-events-none opacity-30 -z-0"
          style={{
            background: 'radial-gradient(ellipse, rgba(0, 196, 255, 0.22) 0%, rgba(0, 136, 204, 0.08) 50%, transparent 70%)',
          }}
        />

        {/* Global Container */}
        <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Back Link */}
          <div className="mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => handleNav('/home')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors cursor-pointer"
            >
              <span>← Back to Home</span>
            </button>
          </div>

          <div className="max-w-3xl">
            {/* Eyebrow Label with horizontal line */}
            <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0088CC]">
                START A PROJECT
              </span>
              <span className="w-8 h-[1.5px] bg-[#00C4FF]/60" />
            </div>

            {/* Big Headline with Italicized Accent */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-bold text-[#0B132B] tracking-tight leading-[1.1] mb-6">
              Tell us what <br />
              <span className="font-serif italic font-normal text-[#0088CC]">
                you&apos;re building
              </span>
            </h1>

            {/* Subtitle with Compass/Globe Icon */}
            <div className="flex items-start gap-3.5 max-w-2xl text-[#64748B] text-sm sm:text-base leading-relaxed">
              <div className="w-7 h-7 rounded-full bg-[#E0F7FF] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#0088CC]">
                <Compass className="w-4 h-4" />
              </div>
              <p>
                We work with ambitious founders and enterprises globally, headquartered in Indore, Madhya Pradesh with remote clients worldwide. Describe your project in a few sentences and we&apos;ll reply within 24 hours on business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 2. FORM & DIRECT CONTACTS SECTION (TAVQEN Light Theme)        */}
      {/* ============================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E2E8F0]">
        <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* --------------------------------------------------------- */}
            {/* LEFT COLUMN: PROJECT INQUIRY FORM                         */}
            {/* --------------------------------------------------------- */}
            <div className="lg:col-span-7 bg-white rounded-[32px] sm:rounded-[36px] border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-6 sm:p-10 relative overflow-hidden">
              {isSubmitted ? (
                <div className="py-12 sm:py-16 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-400">
                  <div className="w-16 h-16 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-6 shadow-xs">
                    <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] mb-3">
                    Inquiry Received!
                  </h3>
                  <p className="text-[#64748B] text-sm sm:text-base max-w-md mb-8 leading-relaxed font-normal">
                    Thank you, <span className="font-semibold text-[#0B132B]">{formData.name}</span>. A senior engineering director will review your project details and follow up at <span className="font-semibold text-[#0B132B]">{formData.email}</span> within 24 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-white border border-[#E2E8F0] text-sm font-semibold text-[#0088CC] hover:border-[#00C4FF] shadow-2xs hover:scale-105 transition-all cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Your Name + Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                        Your Name <span className="text-[#0088CC]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white focus:ring-3 focus:ring-[#00C4FF]/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                        Email Address <span className="text-[#0088CC]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white focus:ring-3 focus:ring-[#00C4FF]/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company Name + Project Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Company or project"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white focus:ring-3 focus:ring-[#00C4FF]/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                        Project Budget (INR ₹)
                      </label>
                      <div className="relative">
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full appearance-none px-4 py-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white focus:ring-3 focus:ring-[#00C4FF]/10 transition-all cursor-pointer"
                        >
                          {BUDGET_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#64748B] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: What are you looking to build? (Pill Selectors) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2.5">
                      What are you looking to build?
                    </label>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {SERVICE_OPTIONS.map((service) => {
                        const isSelected = formData.selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white shadow-[0_4px_15px_rgba(0,196,255,0.25)] scale-[1.02]'
                                : 'bg-[#F8FAFC] hover:bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#00C4FF]/50'
                            }`}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 4: Message Textarea */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your project, target launch date, core features, or any reference links..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#00C4FF] focus:bg-white focus:ring-3 focus:ring-[#00C4FF]/10 transition-all leading-relaxed"
                    />
                  </div>

                  {/* Privacy Policy Disclaimer */}
                  <p className="text-xs text-[#94A3B8] font-normal">
                    By sending you agree to our{' '}
                    <span className="text-[#0088CC] underline cursor-pointer hover:text-[#00C4FF]">
                      Privacy Policy
                    </span>
                    .
                  </p>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#00A3E0] to-[#0088CC] text-white font-semibold text-sm sm:text-base shadow-[0_8px_25px_rgba(0,196,255,0.3)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.45)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Send message</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* --------------------------------------------------------- */}
            {/* RIGHT COLUMN: DIRECT CONTACTS & LIGHT FAST RESPONSE CARD */}
            {/* --------------------------------------------------------- */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Contact Links */}
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Mail className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                      Email
                    </span>
                    <a
                      href="mailto:tavqentechnologies@gmail.com"
                      className="text-sm font-semibold text-[#0B132B] hover:text-[#0088CC] transition-colors"
                    >
                      tavqentechnologies@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Phone className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                      Phone
                    </span>
                    <a
                      href="tel:+919172360707"
                      className="text-sm font-semibold text-[#0B132B] hover:text-[#0088CC] transition-colors"
                    >
                      +91 91723 60707
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <MessageSquare className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                      WhatsApp
                    </span>
                    <a
                      href="https://wa.me/919172360707"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-[#0B132B] hover:text-[#0088CC] transition-colors"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <MapPin className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                      Location
                    </span>
                    <span className="text-sm font-semibold text-[#0B132B]">
                      Indore, Madhya Pradesh, India
                    </span>
                  </div>
                </div>

                {/* Discovery Call */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Calendar className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                      Consultation
                    </span>
                    <span className="text-sm font-semibold text-[#0B132B]">
                      Schedule a 15-min discovery call
                    </span>
                  </div>
                </div>
              </div>

              {/* ----------------------------------------------------- */}
              {/* TAVQEN THEME HIGHLIGHT CARD (Light with Cyan Accents) */}
              {/* ----------------------------------------------------- */}
              <div className="rounded-3xl bg-gradient-to-br from-[#E0F7FF]/50 via-[#F0F9FF] to-white text-[#0B132B] p-6 sm:p-7 border border-[#00C4FF]/30 shadow-[0_12px_35px_rgba(0,196,255,0.08)] relative overflow-hidden">
                <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-[#0088CC] mb-2.5">
                  FAST RESPONSE
                </span>

                <h4 className="text-base sm:text-lg font-bold text-[#0B132B] mb-2 leading-snug">
                  A reply from a senior member in 24 hours on business days.
                </h4>

                <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed font-normal">
                  We will answer your questions and share a ballpark estimate if the project scope is clear.
                </p>

                <div className="mt-4 pt-4 border-t border-[#00C4FF]/20 flex items-center gap-2 text-xs text-[#0088CC] font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Strict NDA Protected &amp; Zero Spam Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 3. "WHAT HELPS US REPLY FAST" SECTION                         */}
      {/* ============================================================= */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            {/* Eyebrow Label with horizontal line */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0088CC]">
                PROJECT GUIDELINES
              </span>
              <span className="w-8 h-[1.5px] bg-[#00C4FF]/60" />
            </div>

            {/* Headline with Italicized Serif Accent */}
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#0B132B] tracking-tight leading-[1.12] mb-4">
              What helps us{' '}
              <span className="font-serif italic font-normal text-[#0088CC]">
                reply fast
              </span>
            </h2>

            <p className="text-[14.5px] sm:text-[16px] text-[#64748B] leading-[1.7] font-normal">
              You don&apos;t need a formal brief. A few bullet points on these topics are enough for us to understand what you&apos;re building, who it&apos;s for, and how we can help.
            </p>
          </div>

          {/* 4 Guidance Cards Grid (Exact screenshot 2x2 layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Card 1 */}
            <div className="space-y-2.5">
              <h3 className="text-base sm:text-lg font-bold text-[#0B132B] tracking-tight">
                What you want to build
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                The problem you want to solve, what the product should do, who will use it, and what success looks like for your business.
              </p>
            </div>

            {/* Card 2 */}
            <div className="space-y-2.5">
              <h3 className="text-base sm:text-lg font-bold text-[#0B132B] tracking-tight">
                What you have today
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Whether you&apos;re starting from a napkin sketch, Figma designs, a working prototype, or an existing legacy codebase in production.
              </p>
            </div>

            {/* Card 3 */}
            <div className="space-y-2.5">
              <h3 className="text-base sm:text-lg font-bold text-[#0B132B] tracking-tight">
                Timing and budget, if you know them
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                A rough target launch date, hard deadlines, and the budget window you&apos;re planning for so we can propose the best engineering approach.
              </p>
            </div>

            {/* Card 4 */}
            <div className="space-y-2.5">
              <h3 className="text-base sm:text-lg font-bold text-[#0B132B] tracking-tight">
                Examples you like
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Apps or products you admire the feel of, whether for their visual aesthetics, snappy micro-interactions, or streamlined UX onboarding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 4. "QUICK ANSWERS" FAQ SECTION                                */}
      {/* ============================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            {/* Eyebrow Label with horizontal line */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0088CC]">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <span className="w-8 h-[1.5px] bg-[#00C4FF]/60" />
            </div>

            {/* Headline with Italicized Serif Accent */}
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#0B132B] tracking-tight leading-[1.12]">
              Quick{' '}
              <span className="font-serif italic font-normal text-[#0088CC]">
                answers
              </span>
            </h2>
          </div>

          {/* Clean Border Accordion List */}
          <div className="border-t border-[#E2E8F0] divide-y divide-[#E2E8F0]">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-5 sm:py-6 flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#0B132B] group-hover:text-[#0088CC] transition-colors">
                      {faq.q}
                    </span>
                    <span
                      className={`text-xl font-mono text-[#0088CC] transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-6 pt-1 text-xs sm:text-[15px] text-[#64748B] leading-relaxed max-w-3xl animate-in fade-in duration-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
