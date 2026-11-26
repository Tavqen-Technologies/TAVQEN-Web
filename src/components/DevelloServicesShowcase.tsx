import { useState, useEffect } from 'react';
import { Smartphone, Monitor, Palette, TrendingUp, Database, Bot, ArrowRight, CheckCircle2, Rocket, ShieldCheck, Sparkles, Bell, Check, MousePointer2 } from 'lucide-react';

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
    title: 'Mobile Application',
    windowTitle: 'Mobile Application',
    icon: Smartphone,
    tagline: 'Native iOS & Android Experiences',
    floatingBadge: 'End-to-end delivery',
  },
  {
    id: 'web',
    number: '02',
    title: 'Web Application',
    windowTitle: 'Web Application',
    icon: Monitor,
    tagline: 'High-Speed Cloud Web Platforms',
    floatingBadge: 'End-to-end delivery',
  },
  {
    id: 'design',
    number: '03',
    title: 'Design',
    windowTitle: 'Design',
    icon: Palette,
    tagline: 'Human-Centered Design Systems',
    floatingBadge: 'End-to-end delivery',
  },
  {
    id: 'growth',
    number: '04',
    title: 'Growth',
    windowTitle: 'Growth',
    icon: TrendingUp,
    tagline: 'Product Scaling & SaaS Intelligence',
    floatingBadge: 'End-to-end delivery',
  },
  {
    id: 'crm',
    number: '05',
    title: 'CRM & System',
    windowTitle: 'CRM & System',
    icon: Database,
    tagline: 'Mission-Critical Enterprise Workflows',
    floatingBadge: 'End-to-end delivery',
  },
  {
    id: 'ai',
    number: '06',
    title: 'AI Automation',
    windowTitle: 'AI Automation',
    icon: Bot,
    tagline: 'LLM Agents, RAG & Intelligent Workflows',
    floatingBadge: '99.2% Accuracy',
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
    <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 bg-[#F8FAFC] overflow-hidden">
      {/* Subtle Cyan Ambient Radial Lighting (Light Theme) */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[850px] h-[550px] pointer-events-none opacity-30 -z-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(0, 196, 255, 0.16) 0%, rgba(0, 136, 204, 0.08) 45%, transparent 70%)',
        }}
      />

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ========================================================= */}
          {/* LEFT SIDE: HEADING, SUBTITLE & CTAs (Exact Devello layout) */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Eyebrow Label with horizontal line */}
            <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0088CC]">
                FROM DESIGN TO SCALE
              </span>
              <span className="w-8 h-[1.5px] bg-[#00C4FF]/60" />
            </div>

            {/* Big Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#0B132B] tracking-tight leading-[1.14] mb-5">
              Full-lifecycle digital solutions for mobile and web.
            </h1>

            {/* Subtitle / Description */}
            <p className="text-[14.5px] sm:text-[16px] text-[#64748B] leading-[1.7] mb-8 font-normal">
              We architect the future of mobile and web. More than a service provider, we&apos;re builders at heart — creating scalable, product-grade solutions that grow with your business. From concept to launch and beyond, we&apos;re your end-to-end technology partner.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleNav('/start-a-project')}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-sm font-semibold shadow-[0_8px_25px_rgba(0,196,255,0.25)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.35)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Discuss your project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleNav('/our-work')}
                className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] text-xs sm:text-sm font-semibold hover:border-gray-400 hover:text-[#0088CC] shadow-2xs hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Explore services</span>
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
            {/* Outer Window Container with Clean Light Glassmorphism */}
            <div className="w-full rounded-[30px] sm:rounded-[36px] bg-white/95 backdrop-blur-xl border border-[#E2E8F0] shadow-[0_24px_70px_rgba(15,23,42,0.06)] p-5 sm:p-7 relative overflow-hidden transition-all duration-500">
              {/* Window Header Bar (Mac dots + Dynamic Title + Counter) */}
              <div className="flex items-center justify-between pb-4 sm:pb-5 mb-5 border-b border-[#E2E8F0]">
                {/* Window Dots */}
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/70" />
                  <span className="ml-3 text-xs sm:text-sm font-bold text-[#0B132B] transition-colors duration-300">
                    {activeTab.windowTitle}
                  </span>
                </div>

                {/* Counter (e.g. 01 / 05) */}
                <div className="font-mono text-xs font-bold text-[#64748B]">
                  <span className="text-[#0088CC]">{activeTab.number}</span> / 0{TABS.length}
                </div>
              </div>

              {/* Window Inner Grid: Tabs Column (Left) + Vector Preview Canvas (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
                {/* ----------------------------------------------------- */}
                {/* VERTICAL TABS LIST (Clean TAVQEN styling)             */}
                {/* ----------------------------------------------------- */}
                <div className="md:col-span-5 flex flex-col gap-2.5">
                  {TABS.map((tab, idx) => {
                    const isActive = activeTabIdx === idx;
                    const Icon = tab.icon;

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTabIdx(idx)}
                        className={`w-full text-left px-4 py-3 sm:py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-between group cursor-pointer relative overflow-hidden ${
                          isActive
                            ? 'bg-white shadow-[0_8px_25px_rgba(0,196,255,0.12)] border-2 border-[#00C4FF]/50 text-[#0B132B] scale-[1.02]'
                            : 'bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0]/70 text-[#64748B] hover:text-[#0B132B]'
                        }`}
                      >
                        {/* Tab Content: Icon + Title */}
                        <div className="flex items-center gap-3 relative z-10">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                              isActive
                                ? 'bg-[#E0F7FF] text-[#0088CC]'
                                : 'bg-white border border-[#E2E8F0] text-[#64748B] group-hover:text-[#0B132B]'
                            }`}
                          >
                            <Icon className="w-4 h-4 stroke-[2]" />
                          </div>

                          <span
                            className={`text-xs sm:text-[13px] transition-colors leading-tight ${
                              isActive ? 'font-bold text-[#0B132B]' : 'font-medium'
                            }`}
                          >
                            {tab.title}
                          </span>
                        </div>

                        {/* Step Number on right */}
                        <span
                          className={`text-xs font-mono font-bold relative z-10 transition-colors ${
                            isActive ? 'text-[#0088CC]' : 'text-[#94A3B8]'
                          }`}
                        >
                          {tab.number}
                        </span>

                        {/* Active Bottom Cyan Line */}
                        {isActive && (
                          <span className="absolute bottom-0 left-5 right-5 h-[2.5px] bg-gradient-to-r from-[#00D4FF] to-[#0088CC] rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* ----------------------------------------------------- */}
                {/* DYNAMIC VECTOR PREVIEW CANVAS (Soft Light Gradient)   */}
                {/* ----------------------------------------------------- */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    const detailPath = `/service?id=${activeTab.id}`;
                    if (onNavigate) {
                      onNavigate(detailPath);
                    } else {
                      window.location.href = detailPath;
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      const detailPath = `/service?id=${activeTab.id}`;
                      if (onNavigate) {
                        onNavigate(detailPath);
                      } else {
                        window.location.href = detailPath;
                      }
                    }
                  }}
                  title={`Open ${activeTab.title} details`}
                  className="md:col-span-7 group cursor-pointer rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/50 border border-[#E2E8F0] hover:border-[#00C4FF]/55 p-4 sm:p-5 relative overflow-hidden flex items-center justify-center min-h-[340px] sm:min-h-[380px] shadow-inner transition-colors"
                >
                  {/* Subtle Grid Dot Pattern Background */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30 -z-0"
                    style={{
                      backgroundImage: 'radial-gradient(rgba(0, 196, 255, 0.2) 1px, transparent 1px)',
                      backgroundSize: '18px 18px',
                    }}
                  />

                  {/* ================================================= */}
                  {/* TAB 01: MOBILE APPLICATION (MATCHES SCREENSHOT 1) */}
                  {/* ================================================= */}
                  {activeTabIdx === 0 && (
                    <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-400 py-3">
                      {/* Vector Smartphone Frame */}
                      <div className="w-[185px] sm:w-[200px] h-[290px] sm:h-[310px] rounded-[34px] bg-white border-[3px] border-[#0B132B] shadow-[0_20px_50px_rgba(15,23,42,0.14)] p-3 relative flex flex-col justify-between overflow-hidden">
                        {/* Top Dynamic Island / Notch */}
                        <div className="w-16 h-4 bg-[#0B132B] rounded-full mx-auto mb-2 flex items-center justify-center" />

                        {/* App Header: Gradient Avatar + Text Bars */}
                        <div className="flex items-center gap-2 mb-2 px-1">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#00D4FF] to-[#0088CC] shadow-2xs" />
                          <div className="space-y-1">
                            <div className="w-16 h-2 bg-[#E2E8F0] rounded-full" />
                            <div className="w-10 h-1.5 bg-[#F1F5F9] rounded-full" />
                          </div>
                        </div>

                        {/* Large Featured Card (TAVQEN Cyan Gradient) */}
                        <div className="w-full h-18 rounded-2xl bg-gradient-to-r from-[#00D4FF] via-[#00A3E0] to-[#0088CC] p-3 flex flex-col justify-center space-y-1.5 shadow-sm mb-2">
                          <div className="w-16 h-2 bg-white/90 rounded-full" />
                          <div className="w-10 h-1.5 bg-white/60 rounded-full" />
                        </div>

                        {/* 2x2 Content Cards Grid */}
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div className="h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]" />
                          <div className="h-10 rounded-xl bg-[#E0F7FF]/70 border border-[#00C4FF]/20" />
                          <div className="h-10 rounded-xl bg-[#F0F9FF] border border-[#E2E8F0]" />
                          <div className="h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]" />
                        </div>

                        {/* Bottom Navigation Dock */}
                        <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-around px-1">
                          <div className="w-5 h-2.5 rounded-full bg-[#0088CC]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
                        </div>
                      </div>

                      {/* Floating Card Top-Right: Notification Pill (Exact screenshot match) */}
                      <div className="absolute top-4 right-1 sm:right-3 px-3 py-2 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_12px_30px_rgba(15,23,42,0.1)] flex items-center gap-2 z-20 animate-in slide-in-from-right-4 duration-500">
                        <div className="w-6 h-6 rounded-lg bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center">
                          <Bell className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <div className="space-y-1">
                          <div className="w-14 h-2 bg-[#CBD5E1] rounded-full" />
                          <div className="w-8 h-1.5 bg-[#E2E8F0] rounded-full" />
                        </div>
                      </div>

                      {/* Floating Card Bottom-Left: 5 Stars Review Badge (Exact screenshot match) */}
                      <div className="absolute bottom-6 left-1 sm:left-3 px-3.5 py-2 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_12px_30px_rgba(15,23,42,0.1)] flex items-center gap-1 z-20 animate-in slide-in-from-left-4 duration-500">
                        <span className="text-amber-400 text-xs tracking-widest font-black select-none">
                          ★★★★★
                        </span>
                      </div>
                    </div>
                  )}

                  {/* ================================================= */}
                  {/* TAB 02: WEB APPLICATION (MATCHES SCREENSHOT 2)    */}
                  {/* ================================================= */}
                  {activeTabIdx === 1 && (
                    <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-400 py-3">
                      {/* Vector Browser Window (Exact screenshot match) */}
                      <div className="w-[260px] sm:w-[290px] h-[230px] sm:h-[250px] rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.1)] p-3 sm:p-4 flex flex-col justify-between overflow-hidden">
                        {/* Browser Top Bar with 3 Window Dots */}
                        <div className="flex items-center gap-1.5 pb-2.5 border-b border-[#E2E8F0] mb-2">
                          <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                          <span className="w-24 h-1.5 bg-[#F1F5F9] rounded-full ml-2" />
                        </div>

                        {/* Browser Dashboard Content Area */}
                        <div className="flex-1 grid grid-cols-12 gap-3 items-stretch">
                          {/* Left Sidebar Menu Lines */}
                          <div className="col-span-3 space-y-2 pt-1">
                            <div className="w-full h-2.5 bg-gradient-to-r from-[#00D4FF] to-[#0088CC] rounded-md" />
                            <div className="w-4/5 h-2 bg-[#E2E8F0] rounded-md" />
                            <div className="w-3/5 h-2 bg-[#E2E8F0] rounded-md" />
                            <div className="w-4/5 h-2 bg-[#E2E8F0] rounded-md" />
                          </div>

                          {/* Right Content Area: Top 3 Cards + Graph Card */}
                          <div className="col-span-9 flex flex-col justify-between">
                            {/* Top 3 Pills */}
                            <div className="grid grid-cols-3 gap-1.5 mb-2">
                              <div className="h-6 rounded-md bg-[#E0F7FF] border border-[#00C4FF]/40" />
                              <div className="h-6 rounded-md bg-[#F8FAFC] border border-[#E2E8F0]" />
                              <div className="h-6 rounded-md bg-[#F8FAFC] border border-[#E2E8F0]" />
                            </div>

                            {/* Main Smooth Chart Box */}
                            <div className="flex-1 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-2 relative flex items-end">
                              <svg
                                className="w-full h-full overflow-visible"
                                viewBox="0 0 160 60"
                                preserveAspectRatio="none"
                              >
                                <path
                                  d="M 5 50 Q 40 45, 80 32 T 155 12"
                                  fill="none"
                                  stroke="#0088CC"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Floating Card Bottom-Left: Checkmark Pill (Exact screenshot match) */}
                      <div className="absolute bottom-5 left-1 sm:left-4 px-3 py-2 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_12px_30px_rgba(15,23,42,0.1)] flex items-center gap-2 z-20 animate-in slide-in-from-left-4 duration-500">
                        <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <div className="w-14 h-2 bg-[#CBD5E1] rounded-full" />
                      </div>
                    </div>
                  )}

                  {/* ================================================= */}
                  {/* TAB 03: DESIGN (FIGMA DESIGN TOKEN SYSTEM)         */}
                  {/* ================================================= */}
                  {activeTabIdx === 2 && (
                    <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-400 py-3">
                      {/* Vector Design Artboard */}
                      <div className="w-[260px] sm:w-[290px] h-[230px] sm:h-[250px] rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.1)] p-3 sm:p-4 flex flex-col justify-between overflow-hidden relative">
                        {/* Toolbar Header */}
                        <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                          <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-sm bg-[#0088CC]" />
                            <span className="text-[11px] font-bold text-[#0B132B]">Figma Tokens</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#0088CC] font-bold">Auto-Layout</span>
                        </div>

                        {/* Swatches Row in TAVQEN theme */}
                        <div className="flex items-center gap-2 my-2">
                          <span className="w-6 h-6 rounded-md bg-[#00C4FF] shadow-xs" />
                          <span className="w-6 h-6 rounded-md bg-[#0088CC] shadow-xs" />
                          <span className="w-6 h-6 rounded-md bg-[#0B132B] shadow-xs" />
                          <span className="w-6 h-6 rounded-md bg-[#10B981] shadow-xs" />
                          <div className="flex-1 h-2 bg-[#E2E8F0] rounded-full ml-2" />
                        </div>

                        {/* Component Card */}
                        <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5 relative">
                          <div className="w-24 h-2 bg-[#0B132B] rounded-full" />
                          <div className="w-36 h-1.5 bg-[#CBD5E1] rounded-full" />
                          {/* Animated Vector Pointer */}
                          <div className="absolute -bottom-2 -right-1 text-[#0088CC]">
                            <MousePointer2 className="w-4 h-4 fill-[#0088CC] stroke-white" />
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                          <span>8pt Grid System</span>
                          <span className="text-emerald-600 font-bold">WCAG AAA</span>
                        </div>
                      </div>

                      {/* Floating Design Badge Top-Right */}
                      <div className="absolute top-4 right-1 sm:right-3 px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-md flex items-center gap-1.5 z-20">
                        <Sparkles className="w-3.5 h-3.5 text-[#0088CC]" />
                        <span className="text-[11px] font-bold text-[#0B132B]">Design System</span>
                      </div>
                    </div>
                  )}

                  {/* ================================================= */}
                  {/* TAB 04: GROWTH (EXACT DEVELLO SCREENSHOT REPLICA) */}
                  {/* ================================================= */}
                  {activeTabIdx === 3 && (
                    <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-400 py-3">
                      {/* Clean White Dashboard Card */}
                      <div className="w-[260px] sm:w-[290px] h-[230px] sm:h-[250px] rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.1)] p-3 sm:p-4 flex flex-col justify-between overflow-hidden">
                        {/* Top Indicator Row */}
                        <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-2 bg-[#E2E8F0] rounded-full" />
                            <span className="w-14 h-2 bg-[#F1F5F9] rounded-full" />
                          </div>
                          <span className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <TrendingUp className="w-3 h-3" />
                          </span>
                        </div>

                        {/* Bar Chart & Rising Curve Graphics */}
                        <div className="relative flex items-end justify-between gap-2.5 h-[120px] px-2 my-auto">
                          {/* SVG Rising Curved Green Line */}
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                            viewBox="0 0 200 90"
                            preserveAspectRatio="none"
                          >
                            <path
                              d="M 10 75 Q 65 65, 115 42 T 190 12"
                              fill="none"
                              stroke="#10B981"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            <circle cx="190" cy="12" r="4.5" fill="#10B981" />
                          </svg>

                          {/* 5 Rising Gradient Bars */}
                          <div className="flex-1 bg-gradient-to-t from-[#E0F7FF] to-[#00C4FF]/40 rounded-t-lg h-[35%] transition-all duration-500" />
                          <div className="flex-1 bg-gradient-to-t from-[#E0F7FF] to-[#00C4FF]/50 rounded-t-lg h-[50%] transition-all duration-500" />
                          <div className="flex-1 bg-gradient-to-t from-[#E0F7FF] to-[#00C4FF]/60 rounded-t-lg h-[65%] transition-all duration-500" />
                          <div className="flex-1 bg-gradient-to-t from-[#E0F7FF] to-[#00C4FF]/75 rounded-t-lg h-[80%] transition-all duration-500" />
                          <div className="flex-1 bg-gradient-to-t from-[#0088CC] to-[#00C4FF] rounded-t-lg h-[98%] shadow-xs transition-all duration-500" />
                        </div>
                      </div>

                      {/* Floating Mini Rocket Badge Bottom-Left (Exact screenshot match) */}
                      <div className="absolute bottom-5 left-1 sm:left-4 px-3 py-2 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_12px_30px_rgba(15,23,42,0.1)] flex items-center gap-2 z-20 animate-in slide-in-from-left-4 duration-500">
                        <Rocket className="w-3.5 h-3.5 text-emerald-500" />
                        <div className="w-12 h-2 bg-[#CBD5E1] rounded-full" />
                      </div>
                    </div>
                  )}

                  {/* ================================================= */}
                  {/* TAB 05: CRM & SYSTEM (ARCHITECTURE DIAGRAM)       */}
                  {/* ================================================= */}
                  {activeTabIdx === 4 && (
                    <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-400 py-3">
                      {/* Vector Architecture Console */}
                      <div className="w-[260px] sm:w-[290px] h-[230px] sm:h-[250px] rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.1)] p-3 sm:p-4 flex flex-col justify-between overflow-hidden">
                        <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                          <span className="text-[11px] font-bold text-[#0B132B]">Cloud Architecture</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold font-mono">
                            99.99%
                          </span>
                        </div>

                        {/* Connected Node Pipelines */}
                        <div className="space-y-2 my-auto">
                          <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                            <span className="text-[11px] font-medium text-[#0B132B]">API Gateway & Load Balancer</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          </div>
                          <div className="p-2 rounded-xl bg-[#E0F7FF] border border-[#00C4FF]/30 flex items-center justify-between">
                            <span className="text-[11px] font-medium text-[#0088CC] font-semibold">PostgreSQL High-Availability</span>
                            <span className="text-[10px] font-mono font-bold text-[#0088CC]">Active</span>
                          </div>
                          <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                            <span className="text-[11px] font-medium text-[#0B132B]">Redis Queue Webhook Cache</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                          <span>SOC-2 Certified</span>
                          <span className="text-emerald-600 font-bold">Encrypted</span>
                        </div>
                      </div>

                      {/* Floating Cloud Badge Top-Right */}
                      <div className="absolute top-4 right-1 sm:right-3 px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-md flex items-center gap-1.5 z-20">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#0088CC]" />
                        <span className="text-[11px] font-bold text-[#0B132B]">Zero-Downtime</span>
                      </div>
                    </div>
                  )}

                  {/* ================================================= */}
                  {/* TAB 06: AI AUTOMATION (ANIMATED N8N WORKFLOW)     */}
                  {/* ================================================= */}
                  {activeTab.id === 'ai' && (
                    <div className="relative z-10 w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
                      <div className="w-full max-w-[335px] bg-white rounded-2xl border border-[#E2E8F0] shadow-xl p-3.5 sm:p-4 relative overflow-hidden">
                        {/* n8n Canvas Header */}
                        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#E2E8F0]">
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-[#EA4B71]/10 text-[#EA4B71] text-[10px] font-black tracking-tight font-mono">
                              n8n
                            </span>
                            <span className="text-[11px] font-bold text-[#0B132B]">AI Workflow Engine</span>
                          </div>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            Executing
                          </span>
                        </div>

                        {/* Animated n8n Node Graph Canvas */}
                        <div className="relative h-[185px] rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden p-2.5">
                          <div
                            className="absolute inset-0 opacity-45 pointer-events-none"
                            style={{
                              backgroundImage: 'radial-gradient(#94A3B8 0.9px, transparent 0.9px)',
                              backgroundSize: '14px 14px',
                            }}
                          />

                          {/* SVG Bezier Wires with Animated Data Packets */}
                          <svg
                            viewBox="0 0 300 175"
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            fill="none"
                          >
                            {/* Trigger -> AI Agent */}
                            <path
                              id="n8n-path-1"
                              d="M 68 62 C 92 62, 92 62, 114 62"
                              stroke="#CBD5E1"
                              strokeWidth="2"
                            />
                            <path
                              d="M 68 62 C 92 62, 92 62, 114 62"
                              stroke="#00C4FF"
                              strokeWidth="2"
                              strokeDasharray="4 4"
                            />
                            <circle r="3.2" fill="#0088CC">
                              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 68 62 C 92 62, 92 62, 114 62" />
                            </circle>

                            {/* AI Agent -> CRM Node */}
                            <path
                              d="M 188 54 C 210 54, 210 38, 232 38"
                              stroke="#CBD5E1"
                              strokeWidth="2"
                            />
                            <circle r="3" fill="#00C4FF">
                              <animateMotion dur="1.9s" begin="0.3s" repeatCount="indefinite" path="M 188 54 C 210 54, 210 38, 232 38" />
                            </circle>

                            {/* AI Agent -> Slack/Ops Node */}
                            <path
                              d="M 188 70 C 210 70, 210 92, 232 92"
                              stroke="#CBD5E1"
                              strokeWidth="2"
                            />
                            <circle r="3" fill="#10B981">
                              <animateMotion dur="2.1s" begin="0.6s" repeatCount="indefinite" path="M 188 70 C 210 70, 210 92, 232 92" />
                            </circle>

                            {/* Sub-nodes: LLM + RAG Memory */}
                            <path d="M 140 84 C 140 105, 116 105, 116 122" stroke="#0088CC" strokeWidth="1.5" strokeDasharray="3 3" />
                            <path d="M 162 84 C 162 105, 188 105, 188 122" stroke="#0088CC" strokeWidth="1.5" strokeDasharray="3 3" />
                            <circle r="2.6" fill="#00C4FF">
                              <animateMotion dur="1.6s" repeatCount="indefinite" path="M 116 122 C 116 105, 140 105, 140 84" />
                            </circle>
                          </svg>

                          {/* Node 1: Webhook Trigger */}
                          <div className="absolute left-2.5 top-[38px] w-[58px] rounded-xl bg-white border border-[#E2E8F0] shadow-xs p-1.5 text-center z-10">
                            <div className="w-5 h-5 mx-auto rounded-md bg-[#EA4B71]/10 text-[#EA4B71] flex items-center justify-center mb-1 text-[10px] font-bold">
                              ⚡
                            </div>
                            <p className="text-[8.5px] font-bold text-[#0B132B] leading-tight">Webhook</p>
                            <span className="block text-[7px] text-emerald-600 font-mono">Trigger</span>
                          </div>

                          {/* Node 2: AI Agent Hub */}
                          <div className="absolute left-[110px] top-[34px] w-[82px] rounded-xl bg-white border-2 border-[#00C4FF] shadow-md p-2 text-center z-10">
                            <div className="w-6 h-6 mx-auto rounded-lg bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-1">
                              <Bot className="w-3.5 h-3.5" />
                            </div>
                            <p className="text-[9.5px] font-extrabold text-[#0B132B] leading-tight">AI Agent</p>
                            <span className="block text-[7.5px] text-[#0088CC] font-mono">Orchestrator</span>
                          </div>

                          {/* Node 3A: CRM Sync */}
                          <div className="absolute right-2.5 top-[18px] w-[62px] rounded-xl bg-white border border-[#E2E8F0] shadow-xs p-1.5 text-center z-10">
                            <div className="w-4 h-4 mx-auto rounded bg-emerald-50 text-emerald-600 flex items-center justify-center mb-0.5">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                            <p className="text-[8.5px] font-bold text-[#0B132B]">CRM Sync</p>
                          </div>

                          {/* Node 3B: Slack / API */}
                          <div className="absolute right-2.5 top-[72px] w-[62px] rounded-xl bg-white border border-[#E2E8F0] shadow-xs p-1.5 text-center z-10">
                            <div className="w-4 h-4 mx-auto rounded bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-0.5">
                              <Sparkles className="w-2.5 h-2.5" />
                            </div>
                            <p className="text-[8.5px] font-bold text-[#0B132B]">Slack Alert</p>
                          </div>

                          {/* Sub-nodes Bottom */}
                          <div className="absolute left-[84px] bottom-2.5 px-2 py-1 rounded-full bg-white border border-[#E2E8F0] shadow-xs flex items-center gap-1 z-10">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00C4FF]" />
                            <span className="text-[8px] font-bold text-[#0B132B]">LLM</span>
                          </div>
                          <div className="absolute left-[160px] bottom-2.5 px-2 py-1 rounded-full bg-white border border-[#E2E8F0] shadow-xs flex items-center gap-1 z-10">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[8px] font-bold text-[#0B132B]">RAG DB</span>
                          </div>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                          <span>24/7 Autonomous Nodes</span>
                          <span className="text-emerald-600 font-bold">8x Faster Ops</span>
                        </div>
                      </div>

                      {/* Floating AI Badge Top-Right */}
                      <div className="hidden sm:flex absolute top-3 right-2 px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-md items-center gap-1.5 z-20">
                        <Sparkles className="w-3.5 h-3.5 text-[#0088CC]" />
                        <span className="text-[11px] font-bold text-[#0B132B]">n8n + Agentic AI</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Bottom Badge + Service Detail Action */}
              <div className="mt-4 pt-3 sm:mt-5 sm:pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#64748B] font-medium hidden sm:inline">
                    Service Highlight:
                  </span>
                  <span className="text-xs text-[#0B132B] font-bold">
                    {activeTab.tagline}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 ml-auto">
                  {/* Devello-Style Green Floating Badge */}
                  <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-sm text-xs font-semibold text-[#0B132B]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                    <span>{activeTab.floatingBadge}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const detailPath = `/service?id=${activeTab.id}`;
                      if (onNavigate) {
                        onNavigate(detailPath);
                      } else {
                        window.location.href = detailPath;
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0B132B] hover:bg-[#0088CC] text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    <span>View {activeTab.title} Details</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
