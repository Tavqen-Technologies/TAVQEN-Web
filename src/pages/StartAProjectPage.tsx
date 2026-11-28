import { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

interface StartAProjectPageProps {
  onNavigate?: (path: string) => void;
}

export default function StartAProjectPage({ onNavigate: _onNavigate }: StartAProjectPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '₹50,000 – ₹1,00,000',
    selectedServices: ['Mobile App Development', 'Custom Software Development'],
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Interactive mouse-tracking pupils for the subtle eyes micro-widget
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 2 });
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
      const distance = Math.min(Math.hypot(deltaX, deltaY) / 28, 3.5);
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
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24">
      {/* Subtle Ambient Radial Lighting (TAVQEN Theme) */}
      <div
        aria-hidden="true"
        className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-[960px] h-[500px] pointer-events-none opacity-30 -z-10"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0, 196, 255, 0.16) 0%, rgba(155, 227, 223, 0.12) 45%, transparent 72%)',
        }}
      />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================= */}
        {/* TOP HEADER: Clean Unified SectionHeading + Interactive Eyes   */}
        {/* ============================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <SectionHeading
            align="left"
            as="h1"
            eyebrow="Start A Project"
            title="Have an idea? Let's turn it into"
            highlight="something real."
            description="Tell us what you're building, what you're trying to solve, or simply where you want to go next."
            className="mb-0 max-w-2xl"
            animate={false}
          />

          {/* Interactive Eyes micro-widget */}
          <div
            ref={eyesRef}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#E2E8F0] shadow-2xs select-none self-start md:self-end shrink-0"
            title="Ready to engineer your vision"
          >
            <div className="flex items-center gap-1">
              <div className="w-5.5 h-5.5 rounded-full bg-white border-[1.75px] border-[#0B132B] flex items-center justify-center relative overflow-hidden">
                <div
                  className="w-2 h-2 rounded-full bg-[#0B132B] transition-transform duration-75"
                  style={{
                    transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                  }}
                />
              </div>
              <div className="w-5.5 h-5.5 rounded-full bg-white border-[1.75px] border-[#0B132B] flex items-center justify-center relative overflow-hidden">
                <div
                  className="w-2 h-2 rounded-full bg-[#0B132B] transition-transform duration-75"
                  style={{
                    transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                  }}
                />
              </div>
            </div>
            <span className="text-xs font-semibold text-[#0088CC] font-mono">
              Ready to Build
            </span>
          </div>
        </div>

        {/* ============================================================= */}
        {/* MAIN STAGE: FORM ON LEFT · BOOK A CALL & CHANNELS ON RIGHT    */}
        {/* ============================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ----------------------------------------------------------- */}
          {/* LEFT COLUMN: PROJECT INQUIRY FORM                           */}
          {/* ----------------------------------------------------------- */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E2E8F0] shadow-[0_16px_45px_rgba(15,23,42,0.04)] p-6 sm:p-8 lg:p-9 relative overflow-hidden">
            {/* Top Cyan Accent Hairline */}
            <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#00C4FF]/70 to-transparent pointer-events-none" />

            {/* Form Title & Indicator */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0B132B] tracking-tight">
                  Project Inquiry
                </h3>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-medium text-[#64748B]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Response within 24h</span>
              </div>
            </div>

            {isSubmitted ? (
              <div className="py-12 sm:py-16 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-400">
                <div className="w-16 h-16 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-5 shadow-xs">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] mb-2 tracking-tight">
                  Inquiry Received!
                </h3>
                <p className="text-[#64748B] text-sm max-w-md mb-8 leading-relaxed font-normal">
                  Thank you, <span className="font-semibold text-[#0B132B]">{formData.name}</span>. A senior engineering director will review your project details and follow up at <span className="font-semibold text-[#0B132B]">{formData.email}</span> within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-white border border-[#E2E8F0] text-xs sm:text-sm font-semibold text-[#0088CC] hover:border-[#00C4FF] shadow-2xs hover:scale-105 transition-all cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Row 1: Your Name + Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-1.5">
                      Your Name <span className="text-[#0088CC]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#00C4FF] focus:bg-white focus:ring-2 focus:ring-[#00C4FF]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-1.5">
                      Work Email <span className="text-[#0088CC]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@startup.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#00C4FF] focus:bg-white focus:ring-2 focus:ring-[#00C4FF]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Phone Number + Company Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp <span className="text-[#94A3B8] font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#00C4FF] focus:bg-white focus:ring-2 focus:ring-[#00C4FF]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-1.5">
                      Company / Project
                    </label>
                    <input
                      type="text"
                      placeholder="Company name or stealth idea"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#00C4FF] focus:bg-white focus:ring-2 focus:ring-[#00C4FF]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Project Budget (Real Indian Rupees ₹) */}
                <div>
                  <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-1.5">
                    Estimated Budget (INR ₹) <span className="text-[#0088CC]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full appearance-none px-4 py-2.5 sm:py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#0B132B] focus:outline-none focus:border-[#00C4FF] focus:bg-white focus:ring-2 focus:ring-[#00C4FF]/20 transition-all cursor-pointer font-medium"
                    >
                      {BUDGET_OPTIONS.map((opt, idx) => (
                        <option key={idx} value={opt} disabled={idx === 0}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Row 4: Service Interest Tags */}
                <div>
                  <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-2">
                    Interested Services
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((service) => {
                      const isSelected = formData.selectedServices.includes(service);
                      return (
                        <button
                          type="button"
                          key={service}
                          onClick={() => toggleService(service)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border cursor-pointer ${
                            isSelected
                              ? 'bg-[#0B132B] text-white border-[#0B132B] shadow-2xs'
                              : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:border-[#00C4FF]/50 hover:text-[#0B132B]'
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
                  <label className="block text-xs font-semibold text-[#0B132B] uppercase tracking-wider mb-1.5">
                    Project Overview &amp; Goals
                  </label>
                  <textarea
                    rows={3.5}
                    placeholder="Tell us about the problem you are solving, core features, launch timeframe, or any reference products you admire..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#00C4FF] focus:bg-white focus:ring-2 focus:ring-[#00C4FF]/20 transition-all leading-relaxed"
                  />
                </div>

                {/* Privacy & NDA Disclaimer + Submit Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
                  <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                    <ShieldCheck className="w-4 h-4 text-[#0088CC] shrink-0" />
                    <span>Mutual NDA protected · Zero spam</span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#00A3E0] to-[#0088CC] text-white font-semibold text-xs sm:text-sm shadow-[0_8px_25px_rgba(0,196,255,0.28)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>Submit Project Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ----------------------------------------------------------- */}
          {/* RIGHT COLUMN: DIRECT CHANNELS + BOOK A 15-MIN CALL CARD     */}
          {/* ----------------------------------------------------------- */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Direct Contact Links */}
            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 sm:p-6 shadow-[0_16px_45px_rgba(15,23,42,0.03)] space-y-3.5 relative overflow-hidden">
              <span className="block text-[11px] font-mono font-bold text-[#0088CC] uppercase tracking-wider mb-2">
                Direct Channels
              </span>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center shrink-0 shadow-2xs">
                  <Mail className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider">
                    Email
                  </span>
                  <a
                    href="mailto:tavqentechnologies@gmail.com"
                    className="text-xs sm:text-sm font-semibold text-[#0B132B] hover:text-[#0088CC] transition-colors break-all"
                  >
                    tavqentechnologies@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center shrink-0 shadow-2xs">
                  <Phone className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider">
                    Direct Phone
                  </span>
                  <a
                    href="tel:+919172360707"
                    className="text-xs sm:text-sm font-semibold text-[#0B132B] hover:text-[#0088CC] transition-colors"
                  >
                    +91 91723 60707
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
                  <MessageSquare className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider">
                    WhatsApp Fast Track
                  </span>
                  <a
                    href="https://wa.me/919172360707"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs sm:text-sm font-semibold text-[#0B132B] hover:text-emerald-600 transition-colors"
                  >
                    Chat with our lead team
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center shrink-0 shadow-2xs">
                  <MapPin className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider">
                    Studio Headquarters
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#0B132B]">
                    Indore, Madhya Pradesh, India
                  </span>
                </div>
              </div>
            </div>

            {/* --------------------------------------------------------- */}
            {/* 2. BOOK A 15-MIN CALL CARD (Replaces previous Let's Build)*/}
            {/* --------------------------------------------------------- */}
            <div className="rounded-3xl bg-gradient-to-br from-[#E0F7FF]/70 via-[#F0F9FF] to-white text-[#0B132B] p-6 sm:p-7 border border-[#00C4FF]/35 shadow-[0_16px_40px_rgba(0,196,255,0.08)] relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white border border-[#00C4FF]/30 text-[#0088CC] flex items-center justify-center shadow-2xs">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#0088CC]">
                    15-Min Strategy Call
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Scheduling
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-[#0B132B] mb-2 leading-snug">
                Schedule a 15-Minute Technical Consultation
              </h4>

              <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed font-normal mb-5">
                Discuss your project roadmap, tech stack, architecture requirements, and budget estimate directly with our senior engineering leads.
              </p>

              {/* Direct Call & WhatsApp Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-4">
                <a
                  href="tel:+919172360707"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white font-semibold text-xs sm:text-sm shadow-[0_8px_20px_rgba(0,196,255,0.25)] hover:shadow-[0_12px_28px_rgba(0,196,255,0.35)] hover:scale-[1.02] active:scale-95 transition-all text-center"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call +91 91723 60707</span>
                </a>

                <a
                  href="https://wa.me/919172360707"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] font-semibold text-xs sm:text-sm hover:border-[#0088CC] hover:text-[#0088CC] shadow-2xs hover:scale-[1.02] active:scale-95 transition-all text-center"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Working Hours Footer */}
              <div className="pt-3.5 border-t border-[#00C4FF]/20 flex items-center gap-2 text-[11px] text-[#64748B]">
                <Clock className="w-3.5 h-3.5 text-[#0088CC] shrink-0" />
                <span>Mon – Fri · 9:30 AM – 7:00 PM IST (GMT+5:30)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
