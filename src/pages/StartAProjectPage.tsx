import { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';

interface StartAProjectPageProps {
  onNavigate?: (path: string) => void;
}

export default function StartAProjectPage({ onNavigate: _onNavigate }: StartAProjectPageProps) {
  const [activeTab, setActiveTab] = useState<'message' | 'call'>('message');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '₹50,000 – ₹1,00,000',
    selectedServices: ['Mobile App (iOS & Android)', 'SaaS Platform & Web App'],
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Interactive mouse-tracking pupils for the eyes illustration
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 3 });
  const eyesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyesRef.current) return;
      const rect = eyesRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.hypot(deltaX, deltaY) / 28, 4.5);
      setPupilOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

 const SERVICE_OPTIONS = [
  'Mobile App Development',
  'Modern Website & CMS',
  'AI Solutions & Integration',
  'Custom Software Development',
  'Game Development',
];

  const BUDGET_OPTIONS = [
    'Select estimated project budget (INR ₹)...',
    '₹25,000 – ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000 – ₹2,50,000',
    '₹2,50,000 – ₹5,00,000',
    '₹5,00,000+',
    'Not sure / Need guidance',
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

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================================= */}
      {/* 1. HERO SECTION (Devzel / TAVQEN Organic Reference)            */}
      {/* ============================================================= */}
      <section className="relative pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-20 bg-[#eae8e4] overflow-hidden">
        {/* DEVZEL ORGANIC LIGHT & CAUSTIC SHADOW TEXTURE */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50 -z-10"
          style={{
            backgroundImage: `
              radial-gradient(at 15% 20%, rgba(255, 255, 255, 0.8) 0px, transparent 55%),
              radial-gradient(at 85% 15%, rgba(0, 0, 0, 0.04) 0px, transparent 50%),
              radial-gradient(at 50% 80%, rgba(155, 227, 223, 0.18) 0px, transparent 60%),
              radial-gradient(at 20% 70%, rgba(255, 228, 237, 0.22) 0px, transparent 50%),
              radial-gradient(at 80% 85%, rgba(0, 0, 0, 0.04) 0px, transparent 55%)
            `,
          }}
        />

        {/* Subtle organic ambient shadow overlay */}
        <div
          className="absolute inset-0 pointer-events-none -z-10 opacity-25 mix-blend-multiply"
          style={{
            background: `radial-gradient(ellipse at 70% 30%, rgba(0,0,0,0.06) 0%, transparent 60%),
                         radial-gradient(ellipse at 20% 60%, rgba(0,0,0,0.04) 0%, transparent 50%)`,
          }}
        />

        {/* Global Container */}
        <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl text-left">
            {/* Main Headline (Exact reference copy & style - slightly smaller & balanced) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal sm:font-medium tracking-[-0.03em] text-[#0B132B] leading-[1.15]">
              Have an idea? Let&apos;s turn it into
              <br />
              something real.
            </h1>

            {/* Supporting Subtitle */}
            <p className="mt-3.5 sm:mt-4 text-[14px] sm:text-[15.5px] text-[#64748B] max-w-[560px] font-normal leading-relaxed">
              Tell us what you&apos;re building, what you&apos;re trying to solve, or simply where you want to go next.
            </p>
          </div>

          {/* ========================================================= */}
          {/* DIVIDER WITH INTERACTIVE EYES (Exact reference layout)     */}
          {/* ========================================================= */}
          <div className="mt-14 sm:mt-20 relative w-full flex flex-col items-center">
            {/* Horizontal Line */}
            <div className="w-full border-t border-black/[0.12] absolute top-5 sm:top-5.5 left-0 z-0" />

            {/* Centered Interactive Eyes */}
            <div
              ref={eyesRef}
              className="relative z-10 px-4 bg-[#eae8e4] flex items-center justify-center gap-1.5"
            >
              {/* Left Eye */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border-[2px] border-[#0B132B] flex items-center justify-center relative overflow-hidden shadow-2xs">
                <div
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#0B132B] transition-transform duration-75"
                  style={{
                    transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                  }}
                />
              </div>

              {/* Right Eye */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border-[2px] border-[#0B132B] flex items-center justify-center relative overflow-hidden shadow-2xs">
                <div
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#0B132B] transition-transform duration-75"
                  style={{
                    transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                  }}
                />
              </div>
            </div>

            {/* "How would you like to start?" label */}
            <p className="text-xs sm:text-[13px] font-medium text-[#64748B] tracking-wide mt-3 text-center">
              How would you like to start?
            </p>

            {/* Quick Action Toggle Pills */}
            <div className="mt-4 sm:mt-5 flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 p-1 rounded-2xl sm:rounded-full bg-white/80 backdrop-blur-xs border border-black/[0.08] shadow-xs max-w-full">
              <button
                type="button"
                onClick={() => setActiveTab('message')}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'message'
                    ? 'bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0B132B]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Send a Message</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('call')}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'call'
                    ? 'bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0B132B]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a 15-Min Call</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 2. FORM & DIRECT CONTACTS SECTION (TAVQEN Light Theme)        */}
      {/* ============================================================= */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white border-b border-[#E2E8F0]">
        <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'call' ? (
            /* Call Booking Card */
            <div className="max-w-2xl mx-auto bg-[#F8FAFC] rounded-3xl sm:rounded-[36px] border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-6 sm:p-10 md:p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mx-auto mb-5 shadow-xs">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] mb-3">
                Schedule a 15-Minute Strategy Call
              </h3>
              <p className="text-[#64748B] text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
                Discuss your project roadmap, tech stack, architectural requirements, and budget with our senior engineering directors.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <a
                  href="tel:+919172360707"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white font-semibold text-sm shadow-[0_8px_25px_rgba(0,196,255,0.25)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.35)] hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +91 91723 60707</span>
                </a>
                <a
                  href="https://wa.me/919172360707"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] font-semibold text-sm hover:border-[#0088CC] hover:text-[#0088CC] shadow-xs hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
              <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex items-center justify-center gap-2 text-xs text-[#64748B]">
                <Clock className="w-4 h-4 text-[#0088CC]" />
                <span>Available Mon – Fri · 9:30 AM to 7:00 PM IST (GMT+5:30)</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* --------------------------------------------------------- */}
              {/* LEFT COLUMN: PROJECT INQUIRY FORM                         */}
              {/* --------------------------------------------------------- */}
              <div className="lg:col-span-7 bg-white rounded-3xl sm:rounded-[36px] border border-[#E2E8F0] shadow-[0_16px_45px_rgba(15,23,42,0.05)] p-6 sm:p-8 md:p-10 relative overflow-hidden">
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
                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    {/* Row 1: Your Name + Email Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                          Your Name <span className="text-[#0088CC]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vikram Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#00C4FF] focus:bg-white focus:ring-2 focus:ring-[#00C4FF]/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                          Work Email <span className="text-[#0088CC]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="vikram@startup.in"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#00C4FF] focus:bg-white focus:ring-2 focus:ring-[#00C4FF]/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone Number + Company Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                          Phone / WhatsApp <span className="text-[#94A3B8] font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#00C4FF] focus:bg-white focus:ring-2 focus:ring-[#00C4FF]/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                          Company / Project
                        </label>
                        <input
                          type="text"
                          placeholder="Company name or stealth idea"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#00C4FF] focus:bg-white focus:ring-2 focus:ring-[#00C4FF]/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 3: Project Budget (Real Indian Rupees ₹) */}
                    <div>
                      <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                        Estimated Budget (INR ₹) <span className="text-[#0088CC]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full appearance-none px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] focus:outline-none focus:border-[#00C4FF] focus:bg-white focus:ring-2 focus:ring-[#00C4FF]/20 transition-all cursor-pointer font-medium"
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

                    {/* Row 4: What are you looking to build? (Pill Selectors) */}
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
                              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
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

                    {/* Row 5: Message Textarea */}
                    <div>
                      <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                        Project Overview &amp; Goals
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about the problem you are solving, core features, launch timeframe, or any reference products you admire..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#00C4FF] focus:bg-white focus:ring-2 focus:ring-[#00C4FF]/20 transition-all leading-relaxed"
                      />
                    </div>

                    {/* Privacy & NDA Disclaimer */}
                    <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                      <ShieldCheck className="w-4 h-4 text-[#0088CC] flex-shrink-0" />
                      <span>Mutual NDA protected. We never share your details or send spam.</span>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#00A3E0] to-[#0088CC] text-white font-semibold text-sm sm:text-base shadow-[0_8px_25px_rgba(0,196,255,0.3)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.45)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                      >
                        <span>Submit Project Inquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* --------------------------------------------------------- */}
              {/* RIGHT COLUMN: DIRECT CONTACTS & TRUST CARD                */}
              {/* --------------------------------------------------------- */}
              <div className="lg:col-span-5 space-y-6">
                {/* Direct Contact Links */}
                <div className="card-standard p-6 sm:p-7 space-y-4.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl">
                  <span className="block text-[11px] font-mono font-bold text-[#0088CC] uppercase tracking-wider mb-2">
                    Direct Channels
                  </span>

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
                        className="text-sm font-semibold text-[#0B132B] hover:text-[#0088CC] transition-colors break-all"
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
                        Direct Phone
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
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
                      <MessageSquare className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                        WhatsApp Fast Track
                      </span>
                      <a
                        href="https://wa.me/919172360707"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-[#0B132B] hover:text-emerald-600 transition-colors"
                      >
                        Chat with our lead team
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
                        Studio Headquarters
                      </span>
                      <span className="text-sm font-semibold text-[#0B132B]">
                        Indore, Madhya Pradesh, India
                      </span>
                    </div>
                  </div>
                </div>

                {/* ----------------------------------------------------- */}
                {/* TAVQEN FAST RESPONSE GUARANTEE CARD                   */}
                {/* ----------------------------------------------------- */}
               <div className="rounded-3xl bg-gradient-to-br from-[#E0F7FF]/60 via-[#F0F9FF] to-white text-[#0B132B] p-6 sm:p-7 border border-[#00C4FF]/30 shadow-[0_12px_35px_rgba(0,196,255,0.08)] relative overflow-hidden">
  <div className="flex items-center gap-2 mb-2">
    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0088CC]">
      LET'S BUILD SOMETHING GREAT
    </span>
  </div>

  <h4 className="text-base sm:text-lg font-bold text-[#0B132B] mb-2 leading-snug">
    From ideas to digital products, we're ready to build with you.
  </h4>

  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed font-normal">
    Share your requirements with our team. We'll discuss your project,
    suggest the right technology, and plan the next steps together.
  </p>

  <div className="mt-4 pt-4 border-t border-[#00C4FF]/20 flex items-center gap-2 text-xs text-[#0088CC] font-semibold">
    <ShieldCheck className="w-4 h-4" />
    <span>Clear Communication & Project-Focused Approach</span>
  </div>
</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
