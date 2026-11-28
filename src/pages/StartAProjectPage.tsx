import { useState, useRef } from 'react';
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
  Rocket,
  Code2,
  Cpu,
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
  const formRef = useRef<HTMLDivElement | null>(null);
  const callCardRef = useRef<HTMLDivElement | null>(null);

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
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-x-clip pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24">
      {/* Subtle Ambient Radial Lighting (TAVQEN Theme) */}
      <div
        aria-hidden="true"
        className="absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-[1160px] h-[520px] pointer-events-none opacity-35 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0, 196, 255, 0.16) 0%, rgba(155, 227, 223, 0.10) 45%, transparent 72%)',
        }}
      />

      <div className="w-full max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================= */}
        {/* HERO SPLIT: LEFT HEADING + RIGHT 3D PORTAL WITH LIVE SVG FLOW */}
        {/* ============================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-12 sm:mb-16">
          {/* LEFT COLUMN (6 COLS): Clean Executive Header */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <SectionHeading
              align="left"
              as="h1"
              eyebrow="Start A Project"
              title="Have an idea? Let's turn it into"
              highlight="something real."
              description="Tell us what you're building, what you're trying to solve, or simply where you want to go next. Our engineering leads respond within 24 hours."
              className="mb-6 max-w-xl"
              animate={false}
            />

            {/* Professional Dual Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-[13.5px] font-semibold shadow-[0_8px_25px_rgba(0,196,255,0.28)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.38)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Start Project Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  callCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] text-xs sm:text-[13.5px] font-medium shadow-[0_4px_14px_rgba(15,23,42,0.03)] hover:border-[#0088CC]/40 hover:text-[#0088CC] transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#0088CC]" />
                <span>Book 15-Min Call</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN (6 COLS): 3D CYAN PORTAL BG + DYNAMIC SVG FLOW FOREGROUND */}
          <div className="lg:col-span-6 relative h-[320px] sm:h-[350px] flex items-center justify-center select-none">
            {/* ======================================================= */}
            {/* BACKGROUND LAYER: 3D LUMINOUS PORTAL & PEDESTAL STAGE   */}
            {/* ======================================================= */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {/* Soft Ambient Cyan Aura */}
              <div
                className="absolute w-[340px] h-[340px] sm:w-[370px] sm:h-[370px] rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(0, 212, 255, 0.24) 0%, rgba(0, 136, 204, 0.08) 48%, transparent 72%)',
                }}
              />

              {/* Outer Chamber Ring */}
              <div className="absolute w-[300px] h-[300px] sm:w-[325px] sm:h-[325px] rounded-full border border-[#00C4FF]/20 bg-gradient-to-b from-white/75 via-[#E0F7FF]/25 to-transparent" />

              {/* Luminous Glowing Portal Ring */}
              <div className="relative w-[225px] h-[225px] sm:w-[245px] sm:h-[245px] rounded-full p-[3px] bg-gradient-to-b from-[#00E5FF] via-[#00A3E0] to-[#00C4FF]/25 shadow-[0_0_50px_rgba(0,212,255,0.40),inset_0_0_24px_rgba(0,212,255,0.30)]">
                <div
                  className="w-full h-full rounded-full relative overflow-hidden"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 42%, #FFFFFF 0%, #E0F7FF 55%, #BAE6FD 100%)',
                  }}
                >
                  <div className="absolute inset-2 rounded-full border border-white/80" />
                  <span className="absolute top-7 left-11 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#00D4FF] animate-pulse" />
                  <span
                    className="absolute top-12 right-9 w-1 h-1 rounded-full bg-[#0088CC]/60 animate-ping"
                    style={{ animationDuration: '3s' }}
                  />
                </div>
              </div>

              {/* 3D Illuminated Elliptical Pedestal Base */}
              <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-[165px] sm:w-[185px] h-[22px] rounded-[100%] bg-gradient-to-b from-white via-[#F0F9FF] to-[#BAE6FD] border border-white shadow-[0_4px_18px_rgba(0,196,255,0.35)]" />
                <div className="-mt-2.5 w-[200px] sm:w-[225px] h-[24px] rounded-[100%] bg-gradient-to-b from-[#E0F7FF]/90 to-white/95 border border-[#00C4FF]/35 shadow-[0_8px_24px_rgba(0,136,204,0.16)] -z-10" />
                <div className="-mt-3 w-[235px] sm:w-[260px] h-[24px] rounded-[100%] bg-gradient-to-r from-transparent via-[#00C4FF]/25 to-transparent blur-[1px] -z-20" />
              </div>
            </div>

            {/* ======================================================= */}
            {/* FOREGROUND LAYER: DYNAMIC ANIMATED SVG SIGNAL FLOW      */}
            {/* ======================================================= */}
            <div className="relative z-10 w-full max-w-[490px] h-[270px] sm:h-[290px]">
              {/* Curved Animated SVG Signal Wires */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 460 270"
                fill="none"
                preserveAspectRatio="none"
              >
                {/* Path 1: Top-Left (Your Idea) -> Center TAVQEN Core */}
                <path
                  d="M 110 52 C 165 52, 178 135, 224 135"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                />
                <path
                  d="M 110 52 C 165 52, 178 135, 224 135"
                  stroke="#00C4FF"
                  strokeWidth="2.2"
                  strokeDasharray="5 5"
                />
                <circle r="4" fill="#0088CC">
                  <animateMotion
                    dur="1.9s"
                    repeatCount="indefinite"
                    path="M 110 52 C 165 52, 178 135, 224 135"
                  />
                </circle>

                {/* Path 2: Center Core -> Top-Right (Architecture) */}
                <path
                  d="M 246 135 C 295 135, 305 50, 345 50"
                  stroke="#CBD5E1"
                  strokeWidth="1.8"
                />
                <circle r="3.2" fill="#00C4FF">
                  <animateMotion
                    dur="2.1s"
                    begin="0.2s"
                    repeatCount="indefinite"
                    path="M 246 135 C 295 135, 305 50, 345 50"
                  />
                </circle>

                {/* Path 3: Center Core -> Mid-Right (Agile Sprints) */}
                <path
                  d="M 246 135 C 290 135, 315 135, 352 135"
                  stroke="#CBD5E1"
                  strokeWidth="1.8"
                />
                <circle r="3.2" fill="#0088CC">
                  <animateMotion
                    dur="1.8s"
                    begin="0.5s"
                    repeatCount="indefinite"
                    path="M 246 135 C 290 135, 315 135, 352 135"
                  />
                </circle>

                {/* Path 4: Center Core -> Bottom-Right (Live Launch) */}
                <path
                  d="M 246 135 C 295 135, 305 218, 345 218"
                  stroke="#CBD5E1"
                  strokeWidth="1.8"
                />
                <circle r="3.2" fill="#10B981">
                  <animateMotion
                    dur="2.2s"
                    begin="0.8s"
                    repeatCount="indefinite"
                    path="M 246 135 C 295 135, 305 218, 345 218"
                  />
                </circle>
              </svg>

              {/* TOP-LEFT NODE: INPUT · YOUR IDEA */}
              <div className="absolute top-4 left-2 sm:left-4 z-20 inline-flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-xs border border-[#00C4FF]/55 shadow-[0_10px_28px_rgba(0,196,255,0.16)]">
                <div className="w-8 h-8 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-[#0088CC] font-bold leading-none mb-0.5">
                    Input
                  </span>
                  <span className="text-xs sm:text-[13px] font-bold text-[#0B132B]">
                    Your Idea
                  </span>
                </div>
              </div>

              {/* BOTTOM-LEFT BADGE: NDA PROTECTED */}
              <div className="absolute bottom-4 left-2 sm:left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-[#E2E8F0] shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-mono text-[10px] font-semibold text-[#475569]">
                  NDA Protected
                </span>
              </div>

              {/* CENTER NODE: TAVQEN ROCKET CORE (INSIDE PORTAL) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                <div className="absolute w-24 h-24 rounded-full border border-dashed border-[#00C4FF]/55 animate-[spin_20s_linear_infinite]" />
                <div className="w-16 h-16 sm:w-17 sm:h-17 rounded-2xl bg-gradient-to-br from-[#0B132B] via-[#0F244A] to-[#0B132B] border border-[#00E5FF]/65 shadow-[0_14px_34px_rgba(0,136,204,0.36)] flex flex-col items-center justify-center text-white">
                  <Rocket
                    className="w-6 h-6 text-[#00D4FF] mb-0.5 animate-bounce"
                    style={{ animationDuration: '2.8s' }}
                  />
                  <span className="font-mono text-[8px] tracking-widest text-[#00C4FF] font-bold">
                    TAVQEN
                  </span>
                </div>
              </div>

              {/* RIGHT OUTPUT 1: ARCHITECTURE */}
              <div className="absolute top-4 right-2 sm:right-4 z-20 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-xs border border-[#E2E8F0] shadow-[0_8px_22px_rgba(15,23,42,0.06)] flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#0088CC]" />
                <span className="font-mono text-[10.5px] font-bold text-[#0B132B]">
                  Architecture
                </span>
              </div>

              {/* RIGHT OUTPUT 2: AGILE SPRINTS */}
              <div className="absolute top-1/2 -translate-y-1/2 right-1 sm:right-2 z-20 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-xs border border-[#00C4FF]/50 shadow-[0_10px_24px_rgba(0,196,255,0.14)] flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-[#0088CC]" />
                <span className="font-mono text-[10.5px] font-bold text-[#0088CC]">
                  Agile Sprints
                </span>
              </div>

              {/* RIGHT OUTPUT 3: LIVE LAUNCH */}
              <div className="absolute bottom-4 right-2 sm:right-4 z-20 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-xs border border-emerald-200/90 shadow-[0_8px_22px_rgba(16,185,129,0.10)] flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-mono text-[10.5px] font-bold text-emerald-700">
                  Live Launch
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* MAIN STAGE: FORM ON LEFT · BOOK A 15-MIN CALL CARD ON RIGHT   */}
        {/* ============================================================= */}
        <div
          ref={formRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start scroll-mt-28"
        >
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
            {/* 2. BOOK A 15-MIN CALL CARD                                */}
            {/* --------------------------------------------------------- */}
            <div
              ref={callCardRef}
              className="rounded-3xl bg-gradient-to-br from-[#E0F7FF]/70 via-[#F0F9FF] to-white text-[#0B132B] p-6 sm:p-7 border border-[#00C4FF]/35 shadow-[0_16px_40px_rgba(0,196,255,0.08)] relative overflow-hidden"
            >
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