import { useState, useEffect } from 'react';
import { Smartphone, Monitor, Database, Bot, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Bell, Check, Gamepad2 } from 'lucide-react';
import SectionHeading from './SectionHeading';

interface DevelloServicesShowcaseProps {
  onNavigate?: (path: string) => void;
}

interface ServiceTab {
  id: string;
  number: string;
  title: string;
  windowTitle: string;
  icon: any;
  tagline: string;
  floatingBadge: string;
}
const TABS: ServiceTab[] = [
  {
    id: 'mobile',
    number: '01',
    title: 'Mobile App Development',
    windowTitle: 'Mobile App Development',
    icon: Smartphone,
    tagline: 'Modern Android & iOS Applications',
    floatingBadge: 'App Development',
  },
  {
    id: 'web',
    number: '02',
    title: 'Website Development',
    windowTitle: 'Website Development',
    icon: Monitor,
    tagline: 'Modern Websites, CMS & Web Experiences',
    floatingBadge: 'Web Development',
  },
  {
    id: 'ai',
    number: '03',
    title: 'AI Solutions',
    windowTitle: 'AI Solutions & Integration',
    icon: Bot,
    tagline: 'AI-Powered Applications & Smart Integrations',
    floatingBadge: 'AI Integration',
  },
  {
    id: 'software',
    number: '04',
    title: 'Custom Software',
    windowTitle: 'Custom Software Development',
    icon: Database,
    tagline: 'Tailored Software for Real-World Business Needs',
    floatingBadge: 'Custom Solutions',
  },
  {
    id: 'game',
    number: '05',
    title: 'Game Development',
    windowTitle: 'Game Development',
    icon: Gamepad2,
    tagline: 'Interactive Games & Engaging Digital Experiences',
    floatingBadge: 'Game Development',
  },
];

export default function DevelloServicesShowcase({ onNavigate }: DevelloServicesShowcaseProps) {
  const [activeTabIdx, setActiveTabIdx] = useState(0); // Starts on 01 Mobile Application like screenshot 1
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle tabs smoothly every 4.8s unless hovered
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveTabIdx((prev) => (prev + 1) % TABS.length);
    }, 4800);

    return () => clearInterval(interval);
  }, [isPaused]);

  const activeTab = TABS[activeTabIdx];

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-22 xs:pt-26 sm:pt-36 lg:pt-40 pb-10 xs:pb-14 sm:pb-24 bg-[#F8FAFC] overflow-hidden">
      {/* Subtle Cyan Ambient Radial Lighting (Light Theme) */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[850px] h-[550px] pointer-events-none opacity-30 -z-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(0, 196, 255, 0.16) 0%, rgba(0, 136, 204, 0.08) 45%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* ========================================================= */}
          {/* LEFT SIDE: HEADING, SUBTITLE & CTAs                       */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Header (Unified SectionHeading System) */}
            <SectionHeading
              align="left"
              as="h1"
              eyebrow="Digital Services & Solutions"
              title="We build digital products and software that drive"
              highlight="real growth."
              description="From mobile applications and modern web platforms to AI automations and custom enterprise systems, we partner with founders and teams to build fast, reliable, and user-centric digital experiences."
              className="mb-4 xs:mb-5 sm:mb-7"
              animate={false}
            />

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleNav('/start-a-project')}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-[13px] sm:text-sm font-medium shadow-[0_8px_22px_rgba(0,196,255,0.25)] hover:shadow-[0_12px_28px_rgba(0,196,255,0.35)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => handleNav('/our-work')}
                className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] text-[13px] sm:text-sm font-medium hover:border-[#0088CC]/40 hover:text-[#0088CC] shadow-2xs hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Explore Our Work</span>
              </button>
            </div>
          </div>
          {/* ========================================================= */}
          {/* RIGHT SIDE: INTERACTIVE WINDOW (TAVQEN LIGHT THEME)       */}
          {/* ========================================================= */}
          <div
            className="lg:col-span-7 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Outer Window Container - 100% Fixed Dimensions (No Height Jumping) */}
            <div className="w-full rounded-2xl sm:rounded-[26px] bg-white/95 backdrop-blur-xl border border-[#E2E8F0] shadow-[0_16px_50px_rgba(15,23,42,0.06)] p-3.5 sm:p-5 relative overflow-hidden">
              {/* Window Header Bar (Mac dots + Dynamic Title + Counter) - Fixed Height */}
              <div className="flex items-center justify-between pb-3 sm:pb-3.5 mb-3.5 sm:mb-4 border-b border-[#E2E8F0] h-9">
                {/* Window Dots */}
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#EF4444]/80 shrink-0" />
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#F59E0B]/80 shrink-0" />
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#10B981]/80 shrink-0" />
                  <span className="ml-2.5 text-xs sm:text-[13px] font-bold text-[#0B132B] tracking-tight truncate transition-colors duration-200">
                    {activeTab.windowTitle}
                  </span>
                </div>

                {/* Counter (e.g. 01 / 05) */}
                <div className="font-mono text-[11px] sm:text-xs font-semibold text-[#64748B] shrink-0 ml-2">
                  <span className="text-[#0088CC] font-bold">{activeTab.number}</span> / 0{TABS.length}
                </div>
              </div>

              {/* Window Inner Grid: Tabs Column (Left) + Vector Preview Canvas (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
                {/* ----------------------------------------------------- */}
                {/* VERTICAL TABS LIST (Fixed Height matching Canvas)     */}
                {/* ----------------------------------------------------- */}
                <div className="md:col-span-5 flex flex-col justify-between gap-1.5 sm:gap-2 h-auto md:h-[300px] sm:md:h-[320px]">
                  {TABS.map((tab, idx) => {
                    const isActive = activeTabIdx === idx;
                    const Icon = tab.icon;

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTabIdx(idx)}
                        className={`w-full flex-1 text-left px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer relative overflow-hidden ${
                          isActive
                            ? 'bg-gradient-to-r from-white to-[#F0F9FF] shadow-[0_4px_16px_rgba(0,196,255,0.12)] border border-[#00C4FF]/60 text-[#0B132B]'
                            : 'bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0]/70 text-[#64748B] hover:text-[#0B132B]'
                        }`}
                      >
                        {/* Tab Content: Icon + Title */}
                        <div className="flex items-center gap-2.5 relative z-10 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? 'bg-[#E0F7FF] text-[#0088CC]'
                                : 'bg-white border border-[#E2E8F0] text-[#64748B] group-hover:text-[#0B132B]'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 stroke-[2]" />
                          </div>

                          <span
                            className={`text-[12px] sm:text-[12.5px] truncate transition-colors leading-tight ${
                              isActive ? 'font-bold text-[#0B132B]' : 'font-medium'
                            }`}
                          >
                            {tab.title}
                          </span>
                        </div>

                        {/* Step Number on right */}
                        <span
                          className={`text-[11px] font-mono font-bold shrink-0 ml-2 relative z-10 transition-colors ${
                            isActive ? 'text-[#0088CC]' : 'text-[#94A3B8]'
                          }`}
                        >
                          {tab.number}
                        </span>

                        {/* Active Accent Pill */}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-gradient-to-b from-[#00D4FF] to-[#0088CC] rounded-r-full" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* ----------------------------------------------------- */}
                {/* DYNAMIC VECTOR PREVIEW CANVAS (Exact Fixed Height)    */}
                {/* ----------------------------------------------------- */}
                <div
                  className="md:col-span-7 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/40 border border-[#E2E8F0] p-3 sm:p-4 relative overflow-hidden flex items-center justify-center h-[280px] sm:h-[300px] md:h-[300px] sm:md:h-[320px] shadow-inner select-none"
                >
                  {/* Subtle Grid Dot Pattern Background */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-25 -z-0"
                    style={{
                      backgroundImage: 'radial-gradient(rgba(0, 196, 255, 0.25) 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />

                  {/* ================================================= */}
                  {/* TAB 01: MOBILE APPLICATION                        */}
                  {/* ================================================= */}
                  {activeTab.id === 'mobile' && (
                    <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-250 py-1">
                      {/* Compact Vector Smartphone Frame */}
                      <div className="w-[160px] sm:w-[172px] h-[235px] sm:h-[250px] rounded-[26px] bg-white border-[2.5px] border-[#0B132B] shadow-[0_16px_40px_rgba(15,23,42,0.12)] p-2.5 relative flex flex-col justify-between overflow-hidden">
                        {/* Top Dynamic Island / Notch */}
                        <div className="w-14 h-3 bg-[#0B132B] rounded-full mx-auto mb-1 flex items-center justify-center" />

                        {/* App Header: Gradient Avatar + Text Bars */}
                        <div className="flex items-center gap-1.5 mb-1 px-1">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#00D4FF] to-[#0088CC] shadow-2xs shrink-0" />
                          <div className="space-y-1">
                            <div className="w-12 h-1.5 bg-[#E2E8F0] rounded-full" />
                            <div className="w-7 h-1 bg-[#F1F5F9] rounded-full" />
                          </div>
                        </div>

                        {/* Large Featured Card (TAVQEN Cyan Gradient) */}
                        <div className="w-full h-13 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#00A3E0] to-[#0088CC] p-2 flex flex-col justify-center space-y-1 shadow-xs mb-1">
                          <div className="w-12 h-1.5 bg-white/90 rounded-full" />
                          <div className="w-8 h-1 bg-white/60 rounded-full" />
                        </div>

                        {/* 2x2 Content Cards Grid */}
                        <div className="grid grid-cols-2 gap-1.5 mb-1">
                          <div className="h-7 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]" />
                          <div className="h-7 rounded-lg bg-[#E0F7FF]/70 border border-[#00C4FF]/25" />
                          <div className="h-7 rounded-lg bg-[#F0F9FF] border border-[#E2E8F0]" />
                          <div className="h-7 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]" />
                        </div>

                        {/* Bottom Navigation Dock */}
                        <div className="pt-1 border-t border-[#E2E8F0] flex items-center justify-around px-1">
                          <div className="w-4 h-2 rounded-full bg-[#0088CC]" />
                          <div className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                          <div className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                          <div className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                        </div>
                      </div>

                      {/* Floating Card Top-Right: Notification Pill */}
                      <div className="absolute top-2 right-1 sm:right-2 px-2.5 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-[0_8px_20px_rgba(15,23,42,0.08)] flex items-center gap-1.5 z-20 animate-in slide-in-from-right-3 duration-300">
                        <div className="w-5 h-5 rounded-md bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center">
                          <Bell className="w-3 h-3 stroke-[2.5]" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="w-11 h-1.5 bg-[#CBD5E1] rounded-full" />
                          <div className="w-6 h-1 bg-[#E2E8F0] rounded-full" />
                        </div>
                      </div>

                      {/* Floating Card Bottom-Left: 5 Stars Review Badge */}
                      <div className="absolute bottom-3 left-1 sm:left-2 px-2.5 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-[0_8px_20px_rgba(15,23,42,0.08)] flex items-center gap-1 z-20 animate-in slide-in-from-left-3 duration-300">
                        <span className="text-amber-400 text-[10px] tracking-wider font-black select-none">
                          ★★★★★
                        </span>
                      </div>
                    </div>
                  )}

                  {/* ================================================= */}
                  {/* TAB 02: WEBSITE DEVELOPMENT                       */}
                  {/* ================================================= */}
                  {activeTab.id === 'web' && (
                    <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-250 py-1">
                      {/* Compact Vector Browser Window */}
                      <div className="w-[240px] sm:w-[260px] h-[195px] sm:h-[210px] rounded-xl bg-white border border-[#E2E8F0] shadow-[0_16px_40px_rgba(15,23,42,0.1)] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden">
                        {/* Browser Top Bar with 3 Window Dots */}
                        <div className="flex items-center gap-1.5 pb-2 border-b border-[#E2E8F0] mb-2">
                          <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                          <span className="w-20 h-1.5 bg-[#F1F5F9] rounded-full ml-1.5" />
                        </div>

                        {/* Browser Dashboard Content Area */}
                        <div className="flex-1 grid grid-cols-12 gap-2.5 items-stretch">
                          {/* Left Sidebar Menu Lines */}
                          <div className="col-span-3 space-y-1.5 pt-0.5">
                            <div className="w-full h-2 bg-gradient-to-r from-[#00D4FF] to-[#0088CC] rounded" />
                            <div className="w-4/5 h-1.5 bg-[#E2E8F0] rounded" />
                            <div className="w-3/5 h-1.5 bg-[#E2E8F0] rounded" />
                            <div className="w-4/5 h-1.5 bg-[#E2E8F0] rounded" />
                          </div>

                          {/* Right Content Area: Top 3 Cards + Graph Card */}
                          <div className="col-span-9 flex flex-col justify-between">
                            {/* Top 3 Pills */}
                            <div className="grid grid-cols-3 gap-1 mb-1.5">
                              <div className="h-5 rounded-md bg-[#E0F7FF] border border-[#00C4FF]/30" />
                              <div className="h-5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0]" />
                              <div className="h-5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0]" />
                            </div>

                            {/* Main Smooth Chart Box */}
                            <div className="flex-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] p-1.5 relative flex items-end">
                              <svg
                                className="w-full h-full overflow-visible"
                                viewBox="0 0 160 55"
                                preserveAspectRatio="none"
                              >
                                <path
                                  d="M 5 45 Q 40 40, 80 28 T 155 10"
                                  fill="none"
                                  stroke="#0088CC"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Floating Card Bottom-Left: Checkmark Pill */}
                      <div className="absolute bottom-3 left-1 sm:left-2 px-2.5 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-[0_8px_20px_rgba(15,23,42,0.08)] flex items-center gap-1.5 z-20 animate-in slide-in-from-left-3 duration-300">
                        <div className="w-4 h-4 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <div className="w-12 h-1.5 bg-[#CBD5E1] rounded-full" />
                      </div>
                    </div>
                  )}

                  {/* ================================================= */}
                  {/* TAB 03: AI SOLUTIONS (ANIMATED N8N WORKFLOW)      */}
                  {/* ================================================= */}
                  {activeTab.id === 'ai' && (
                    <div className="relative z-10 w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-250 py-1">
                      <div className="w-full max-w-[285px] bg-white rounded-xl sm:rounded-2xl border border-[#E2E8F0] shadow-md p-2.5 sm:p-3 relative overflow-hidden">
                        {/* n8n Canvas Header */}
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0]">
                          <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 rounded bg-[#EA4B71]/10 text-[#EA4B71] text-[9px] font-black tracking-tight font-mono">
                              n8n
                            </span>
                            <span className="text-[10.5px] font-bold text-[#0B132B]">AI Automation</span>
                          </div>
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[8.5px] font-bold font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            Live Flow
                          </span>
                        </div>

                        {/* Animated n8n Node Graph Canvas */}
                        <div className="relative h-[140px] rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden p-2">
                          <div
                            className="absolute inset-0 opacity-40 pointer-events-none"
                            style={{
                              backgroundImage: 'radial-gradient(#94A3B8 0.8px, transparent 0.8px)',
                              backgroundSize: '12px 12px',
                            }}
                          />

                          {/* SVG Bezier Wires with Animated Data Packets */}
                          <svg
                            viewBox="0 0 270 145"
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            fill="none"
                          >
                            <path
                              d="M 55 52 C 78 52, 78 52, 100 52"
                              stroke="#CBD5E1"
                              strokeWidth="1.8"
                            />
                            <path
                              d="M 55 52 C 78 52, 78 52, 100 52"
                              stroke="#00C4FF"
                              strokeWidth="1.8"
                              strokeDasharray="3 3"
                            />
                            <circle r="2.8" fill="#0088CC">
                              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 55 52 C 78 52, 78 52, 100 52" />
                            </circle>

                            <path
                              d="M 165 46 C 185 46, 185 30, 205 30"
                              stroke="#CBD5E1"
                              strokeWidth="1.8"
                            />
                            <circle r="2.5" fill="#00C4FF">
                              <animateMotion dur="1.9s" begin="0.3s" repeatCount="indefinite" path="M 165 46 C 185 46, 185 30, 205 30" />
                            </circle>

                            <path
                              d="M 165 58 C 185 58, 185 78, 205 78"
                              stroke="#CBD5E1"
                              strokeWidth="1.8"
                            />
                            <circle r="2.5" fill="#10B981">
                              <animateMotion dur="2.1s" begin="0.6s" repeatCount="indefinite" path="M 165 58 C 185 58, 185 78, 205 78" />
                            </circle>
                          </svg>

                          {/* Node 1: Webhook Trigger */}
                          <div className="absolute left-1.5 top-[28px] w-[50px] rounded-lg bg-white border border-[#E2E8F0] shadow-2xs p-1 text-center z-10">
                            <div className="w-4 h-4 mx-auto rounded bg-[#EA4B71]/10 text-[#EA4B71] flex items-center justify-center mb-0.5 text-[9px] font-bold">
                              ⚡
                            </div>
                            <p className="text-[7.5px] font-bold text-[#0B132B]">Trigger</p>
                          </div>

                          {/* Node 2: AI Agent Hub */}
                          <div className="absolute left-[95px] top-[22px] w-[70px] rounded-lg bg-white border-2 border-[#00C4FF] shadow-xs p-1.5 text-center z-10">
                            <div className="w-5 h-5 mx-auto rounded-md bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-0.5">
                              <Bot className="w-3 h-3" />
                            </div>
                            <p className="text-[8px] font-extrabold text-[#0B132B]">AI Agent</p>
                            <span className="block text-[6.5px] text-[#0088CC] font-mono">LLM Brain</span>
                          </div>

                          {/* Node 3A: CRM Sync */}
                          <div className="absolute right-1.5 top-[12px] w-[54px] rounded-lg bg-white border border-[#E2E8F0] shadow-2xs p-1 text-center z-10">
                            <div className="w-3.5 h-3.5 mx-auto rounded bg-emerald-50 text-emerald-600 flex items-center justify-center mb-0.5">
                              <Check className="w-2 h-2" />
                            </div>
                            <p className="text-[7.5px] font-bold text-[#0B132B]">CRM Sync</p>
                          </div>

                          {/* Node 3B: Slack Alert */}
                          <div className="absolute right-1.5 top-[58px] w-[54px] rounded-lg bg-white border border-[#E2E8F0] shadow-2xs p-1 text-center z-10">
                            <div className="w-3.5 h-3.5 mx-auto rounded bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-0.5">
                              <Sparkles className="w-2 h-2" />
                            </div>
                            <p className="text-[7.5px] font-bold text-[#0B132B]">Alert Bot</p>
                          </div>

                          {/* Sub-node Tag */}
                          <div className="absolute left-2.5 bottom-1.5 px-2 py-0.5 rounded-full bg-white border border-[#E2E8F0] shadow-2xs flex items-center gap-1 z-10">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00C4FF]" />
                            <span className="text-[7.5px] font-bold text-[#0B132B]">Autonomous Nodes</span>
                          </div>
                        </div>

                        <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-[#64748B]">
                          <span>Agentic Loop</span>
                          <span className="text-emerald-600 font-bold">10x Output</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================================================= */}
                  {/* TAB 04: CUSTOM SOFTWARE (CLOUD & ARCHITECTURE)    */}
                  {/* ================================================= */}
                  {activeTab.id === 'software' && (
                    <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-250 py-1">
                      {/* Compact Architecture Console */}
                      <div className="w-[240px] sm:w-[260px] h-[195px] sm:h-[210px] rounded-xl bg-white border border-[#E2E8F0] shadow-[0_16px_40px_rgba(15,23,42,0.1)] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden">
                        <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0]">
                          <span className="text-[10.5px] font-bold text-[#0B132B]">Enterprise Software</span>
                          <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[8.5px] font-bold font-mono">
                            99.99% Uptime
                          </span>
                        </div>

                        {/* Connected Node Pipelines */}
                        <div className="space-y-1.5 my-auto">
                          <div className="p-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                            <span className="text-[10px] font-medium text-[#0B132B]">API Gateway & Microservices</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          </div>
                          <div className="p-1.5 rounded-lg bg-[#E0F7FF] border border-[#00C4FF]/30 flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-[#0088CC]">PostgreSQL DB Cluster</span>
                            <span className="text-[9px] font-mono font-bold text-[#0088CC]">Synced</span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                            <span className="text-[10px] font-medium text-[#0B132B]">Queue & Cache Layer</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          </div>
                        </div>

                        <div className="pt-1.5 border-t border-[#E2E8F0] flex items-center justify-between text-[9px] font-mono text-[#64748B]">
                          <span>SOC-2 Ready</span>
                          <span className="text-emerald-600 font-bold">End-to-End Scalable</span>
                        </div>
                      </div>

                      {/* Floating Badge Top-Right */}
                      <div className="absolute top-2 right-1 sm:right-2 px-2.5 py-1 rounded-lg bg-white border border-[#E2E8F0] shadow-md flex items-center gap-1 z-20">
                        <ShieldCheck className="w-3 h-3 text-[#0088CC]" />
                        <span className="text-[10px] font-bold text-[#0B132B]">Secure Architecture</span>
                      </div>
                    </div>
                  )}

                  {/* ================================================= */}
                  {/* TAB 05: GAME DEVELOPMENT                          */}
                  {/* ================================================= */}
                  {activeTab.id === 'game' && (
                    <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-250 py-1">
                      {/* Compact Game Engine Canvas */}
                      <div className="w-[240px] sm:w-[260px] h-[195px] sm:h-[210px] rounded-xl bg-white border border-[#E2E8F0] shadow-[0_16px_40px_rgba(15,23,42,0.1)] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden">
                        <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0]">
                          <div className="flex items-center gap-1.5">
                            <Gamepad2 className="w-3.5 h-3.5 text-[#0088CC]" />
                            <span className="text-[10.5px] font-bold text-[#0B132B]">Interactive Engine</span>
                          </div>
                          <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[8.5px] font-bold font-mono">
                            60 FPS
                          </span>
                        </div>

                        {/* Viewport simulation */}
                        <div className="flex-1 rounded-lg bg-gradient-to-br from-[#0B132B] to-[#1E293B] my-1.5 p-2 flex flex-col justify-between relative overflow-hidden">
                          {/* Ambient glow inside game viewport */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#00C4FF]/25 rounded-full blur-md" />

                          <div className="flex items-center justify-between text-[8px] font-mono text-[#00C4FF] relative z-10">
                            <span>RENDER: 3D / 2D</span>
                            <span>PHYSICS: ACTIVE</span>
                          </div>

                          <div className="text-center relative z-10">
                            <div className="w-8 h-8 mx-auto rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-1 shadow-sm">
                              <Gamepad2 className="w-4 h-4 text-[#00C4FF]" />
                            </div>
                            <span className="text-[9px] font-bold text-white tracking-wide">WebGL / Unity / Canvas</span>
                          </div>

                          <div className="flex items-center justify-between text-[7.5px] font-mono text-slate-400 relative z-10">
                            <span>Multiplayer Sync</span>
                            <span className="text-emerald-400">Low Latency</span>
                          </div>
                        </div>

                        <div className="pt-1.5 border-t border-[#E2E8F0] flex items-center justify-between text-[9px] font-mono text-[#64748B]">
                          <span>Cross-Platform</span>
                          <span className="text-[#0088CC] font-bold">Engaging UX</span>
                        </div>
                      </div>

                      {/* Floating Badge Top-Right */}
                      <div className="absolute top-2 right-1 sm:right-2 px-2.5 py-1 rounded-lg bg-white border border-[#E2E8F0] shadow-md flex items-center gap-1 z-20">
                        <Sparkles className="w-3 h-3 text-[#0088CC]" />
                        <span className="text-[10px] font-bold text-[#0B132B]">Game Development</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Bottom Bar - 100% Fixed Height (No Shifting) */}
              <div className="mt-3 pt-2.5 sm:mt-3.5 sm:pt-3 border-t border-[#E2E8F0] flex items-center justify-between gap-2 h-9">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[11px] text-[#64748B] font-medium hidden sm:inline shrink-0">
                    Service Highlight:
                  </span>
                  <span className="text-[11.5px] sm:text-xs text-[#0B132B] font-bold truncate max-w-[200px] sm:max-w-[260px]">
                    {activeTab.tagline}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-auto">
                  {/* Devello-Style Green Floating Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E2E8F0] shadow-2xs text-[11px] font-semibold text-[#0B132B]">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 fill-emerald-100" />
                    <span>{activeTab.floatingBadge}</span>
                  </div>

                  <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F7FF] border border-[#00C4FF]/30 text-[#0088CC] text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0088CC] animate-pulse" />
                    <span>Live Showcase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
