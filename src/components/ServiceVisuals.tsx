import {
  Gamepad2,
  Cpu,
  Bot,
  Check,
  Sparkles,
  Bell,
  ShieldCheck,
  Zap,
  Layers,
  Cloud,
  Terminal,
  Activity,
  GitBranch,
} from 'lucide-react';

/* ========================================================================= */
/* 01: MOBILE APP DEVELOPMENT ANIMATED VISUAL                                */
/* ========================================================================= */
export function MobileAppVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 select-none">
      {/* Smartphone Frame */}
      <div className="w-[155px] sm:w-[170px] h-[225px] sm:h-[240px] rounded-[26px] bg-white border-[2.5px] border-[#0B132B] shadow-[0_16px_40px_rgba(15,23,42,0.12)] p-2.5 relative flex flex-col justify-between overflow-hidden">
        {/* Dynamic Island with glowing dot */}
        <div className="w-13 h-3.5 bg-[#0B132B] rounded-full mx-auto mb-1 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C4FF] animate-pulse" />
        </div>

        {/* Header Profile + Bar */}
        <div className="flex items-center gap-1.5 mb-1 px-0.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#00D4FF] to-[#0088CC] shrink-0" />
          <div className="space-y-0.5">
            <div className="w-12 h-1.5 bg-[#E2E8F0] rounded-full" />
            <div className="w-7 h-1 bg-[#F1F5F9] rounded-full" />
          </div>
        </div>

        {/* Featured Card */}
        <div className="w-full h-13 rounded-lg bg-gradient-to-r from-[#00D4FF] via-[#00A3E0] to-[#0088CC] p-2 flex flex-col justify-center space-y-1 shadow-2xs mb-1">
          <div className="w-11 h-1.5 bg-white/90 rounded-full" />
          <div className="w-7 h-1 bg-white/60 rounded-full" />
        </div>

        {/* 2x2 App Grid */}
        <div className="grid grid-cols-2 gap-1 mb-1">
          <div className="h-7 rounded-md bg-[#F8FAFC] border border-[#E2E8F0]" />
          <div className="h-7 rounded-md bg-[#E0F7FF]/70 border border-[#00C4FF]/25" />
          <div className="h-7 rounded-md bg-[#F0F9FF] border border-[#E2E8F0]" />
          <div className="h-7 rounded-md bg-[#F8FAFC] border border-[#E2E8F0]" />
        </div>

        {/* Bottom Nav Dock */}
        <div className="pt-1 border-t border-[#E2E8F0] flex items-center justify-around px-1">
          <div className="w-4 h-1.5 rounded-full bg-[#0088CC]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />
        </div>
      </div>

      {/* Floating Notification Pill */}
      <div className="absolute top-2 right-2 sm:right-6 px-2.5 py-1 rounded-lg bg-white border border-[#E2E8F0] shadow-sm flex items-center gap-1.5 z-10 animate-in fade-in duration-300">
        <div className="w-4 h-4 rounded bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center">
          <Bell className="w-2.5 h-2.5" />
        </div>
        <div className="space-y-0.5">
          <div className="w-10 h-1 bg-[#CBD5E1] rounded-full" />
          <div className="w-6 h-0.5 bg-[#E2E8F0] rounded-full" />
        </div>
      </div>

      {/* Floating Rating Badge */}
      <div className="absolute bottom-3 left-2 sm:left-6 px-2.5 py-1 rounded-lg bg-white border border-[#E2E8F0] shadow-sm flex items-center gap-1 z-10">
        <span className="text-amber-400 text-[10px] font-black tracking-wider select-none">
          ★★★★★
        </span>
        <span className="text-[9.5px] font-mono font-bold text-[#0B132B]">4.9</span>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 02: WEBSITE DEVELOPMENT ANIMATED VISUAL                                   */
/* ========================================================================= */
export function WebsiteAppVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 select-none">
      {/* Browser Window Frame */}
      <div className="w-[230px] sm:w-[260px] h-[190px] sm:h-[205px] rounded-xl bg-white border border-[#E2E8F0] shadow-[0_16px_40px_rgba(15,23,42,0.1)] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden">
        {/* Top Browser Bar */}
        <div className="flex items-center gap-1.5 pb-2 border-b border-[#E2E8F0] mb-2">
          <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <div className="w-32 h-2.5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] ml-1.5 px-2 flex items-center">
            <span className="text-[7px] font-mono text-[#64748B]">tavqen.com/web</span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="flex-1 grid grid-cols-12 gap-2.5 items-stretch">
          {/* Sidebar */}
          <div className="col-span-3 space-y-1.5 pt-0.5">
            <div className="w-full h-2 bg-gradient-to-r from-[#00D4FF] to-[#0088CC] rounded" />
            <div className="w-3/4 h-1.5 bg-[#E2E8F0] rounded" />
            <div className="w-1/2 h-1.5 bg-[#E2E8F0] rounded" />
            <div className="w-4/5 h-1.5 bg-[#E2E8F0] rounded" />
          </div>

          {/* Main Area */}
          <div className="col-span-9 flex flex-col justify-between">
            {/* Top 3 pills */}
            <div className="grid grid-cols-3 gap-1 mb-1.5">
              <div className="h-5 rounded bg-[#E0F7FF] border border-[#00C4FF]/30" />
              <div className="h-5 rounded bg-[#F8FAFC] border border-[#E2E8F0]" />
              <div className="h-5 rounded bg-[#F8FAFC] border border-[#E2E8F0]" />
            </div>

            {/* Smooth Chart Box */}
            <div className="flex-1 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] p-1.5 relative flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 150 50" preserveAspectRatio="none">
                <path
                  d="M 5 42 Q 40 35, 75 25 T 145 8"
                  fill="none"
                  stroke="#0088CC"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Speed Badge */}
      <div className="absolute top-2 right-2 sm:right-5 px-2.5 py-1 rounded-md bg-white border border-[#E2E8F0] shadow-sm flex items-center gap-1 z-10">
        <Zap className="w-3 h-3 text-emerald-500 fill-emerald-100" />
        <span className="text-[9.5px] font-mono font-bold text-[#0B132B]">99 Performance</span>
      </div>

      {/* Floating Responsive Pill */}
      <div className="absolute bottom-2 left-2 sm:left-5 px-2.5 py-1 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center gap-1 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00C4FF]" />
        <span className="text-[8.5px] font-bold text-[#0B132B]">Responsive UI</span>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 03: AI & WORKFLOW AUTOMATION ANIMATED VISUAL                              */
/* ========================================================================= */
export function AISolutionsVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 select-none">
      <div className="w-[230px] sm:w-[260px] h-[190px] sm:h-[205px] rounded-xl bg-white border border-[#E2E8F0] shadow-[0_16px_40px_rgba(15,23,42,0.1)] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0] mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center">
              <Bot className="w-3 h-3" />
            </span>
            <span className="text-[10px] font-bold text-[#0B132B]">Neural Engine</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[8.5px] font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Active Loop
          </span>
        </div>

        {/* Neural Network & Nodes Canvas */}
        <div className="relative flex-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] p-2 flex flex-col justify-between overflow-hidden">
          {/* Animated SVG Neural Wire */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 90" fill="none">
            <path d="M 30 45 C 65 45, 65 45, 100 45" stroke="#CBD5E1" strokeWidth="1.8" />
            <path d="M 30 45 C 65 45, 65 45, 100 45" stroke="#00C4FF" strokeWidth="1.8" strokeDasharray="3 3" />
            <circle r="2.8" fill="#0088CC">
              <animateMotion dur="1.6s" repeatCount="indefinite" path="M 30 45 C 65 45, 65 45, 100 45" />
            </circle>

            <path d="M 100 45 C 135 45, 135 25, 170 25" stroke="#CBD5E1" strokeWidth="1.8" />
            <circle r="2.5" fill="#00C4FF">
              <animateMotion dur="1.8s" begin="0.3s" repeatCount="indefinite" path="M 100 45 C 135 45, 135 25, 170 25" />
            </circle>

            <path d="M 100 45 C 135 45, 135 68, 170 68" stroke="#CBD5E1" strokeWidth="1.8" />
            <circle r="2.5" fill="#10B981">
              <animateMotion dur="2s" begin="0.6s" repeatCount="indefinite" path="M 100 45 C 135 45, 135 68, 170 68" />
            </circle>
          </svg>

          {/* Node 1: Input prompt */}
          <div className="relative z-10 w-fit px-2 py-0.5 rounded bg-white border border-[#E2E8F0] shadow-2xs text-[7.5px] font-mono text-[#0B132B]">
            Query Trigger
          </div>

          {/* Central AI Node */}
          <div className="relative z-10 mx-auto w-9 h-9 rounded-full bg-gradient-to-tr from-[#00D4FF] to-[#0088CC] flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>

          {/* Outputs */}
          <div className="relative z-10 flex justify-between items-center text-[7.5px] font-mono">
            <span className="px-2 py-0.5 rounded bg-white border border-[#E2E8F0] text-emerald-600 font-bold">
              Gemini LLM
            </span>
            <span className="px-2 py-0.5 rounded bg-white border border-[#E2E8F0] text-[#0088CC] font-bold">
              Vector DB
            </span>
          </div>
        </div>
      </div>

      {/* Floating Model Badge */}
      <div className="absolute top-2 right-2 sm:right-5 px-2.5 py-1 rounded-md bg-white border border-[#E2E8F0] shadow-sm flex items-center gap-1 z-10">
        <Sparkles className="w-3 h-3 text-[#0088CC]" />
        <span className="text-[9.5px] font-bold text-[#0B132B]">AI Automation</span>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 04: CUSTOM SOFTWARE & ARCHITECTURE ANIMATED VISUAL                        */
/* ========================================================================= */
export function CustomSoftwareVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 select-none">
      <div className="w-[230px] sm:w-[260px] h-[190px] sm:h-[205px] rounded-xl bg-white border border-[#E2E8F0] shadow-[0_16px_40px_rgba(15,23,42,0.1)] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0] mb-2">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#0088CC]" />
            <span className="text-[10px] font-bold text-[#0B132B]">Architecture Console</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[8.5px] font-mono font-bold">
            99.99%
          </span>
        </div>

        {/* Modules List */}
        <div className="space-y-1.5 my-auto">
          <div className="p-1.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
            <span className="text-[9.5px] font-medium text-[#0B132B]">API Gateway & Load Balancer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <div className="p-1.5 rounded-md bg-[#E0F7FF] border border-[#00C4FF]/30 flex items-center justify-between">
            <span className="text-[9.5px] font-semibold text-[#0088CC]">PostgreSQL DB Cluster</span>
            <span className="text-[8.5px] font-mono font-bold text-[#0088CC]">Active</span>
          </div>
          <div className="p-1.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
            <span className="text-[9.5px] font-medium text-[#0B132B]">Redis Cache & Webhook Queue</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>

        <div className="pt-1.5 border-t border-[#E2E8F0] flex items-center justify-between text-[8.5px] font-mono text-[#64748B]">
          <span>SOC-2 Certified</span>
          <span className="text-emerald-600 font-bold">Encrypted</span>
        </div>
      </div>

      {/* Floating Badge */}
      <div className="absolute top-2 right-2 sm:right-5 px-2.5 py-1 rounded-md bg-white border border-[#E2E8F0] shadow-sm flex items-center gap-1 z-10">
        <ShieldCheck className="w-3 h-3 text-[#0088CC]" />
        <span className="text-[9.5px] font-bold text-[#0B132B]">Scalable Cloud</span>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 05: SAAS PRODUCT DEVELOPMENT ANIMATED VISUAL                              */
/* ========================================================================= */
export function SaasProductVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 select-none">
      <div className="w-[230px] sm:w-[260px] h-[190px] sm:h-[205px] rounded-xl bg-white border border-[#E2E8F0] shadow-[0_16px_40px_rgba(15,23,42,0.1)] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden">
        {/* Header: Workspace switcher */}
        <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0] mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-[#0088CC] text-white flex items-center justify-center text-[9px] font-black">
              T
            </div>
            <span className="text-[10px] font-bold text-[#0B132B]">Acme Corp · Prod</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[8.5px] font-mono font-bold">
            Multi-Tenant
          </span>
        </div>

        {/* MRR & Billing Pipeline Metrics */}
        <div className="grid grid-cols-2 gap-1.5 mb-1.5">
          <div className="p-1.5 rounded-md bg-[#E0F7FF]/70 border border-[#00C4FF]/30">
            <div className="text-[8px] font-medium text-[#64748B]">Monthly MRR</div>
            <div className="text-xs font-bold text-[#0088CC]">$48,250</div>
          </div>
          <div className="p-1.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="text-[8px] font-medium text-[#64748B]">Active Seats</div>
            <div className="text-xs font-bold text-[#0B132B]">1,420</div>
          </div>
        </div>

        {/* Tenant Activity Feed */}
        <div className="space-y-1 my-auto">
          <div className="px-2 py-1 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-[8px]">
            <span className="font-mono text-[#0B132B]">Stripe Metered Hook</span>
            <span className="text-emerald-600 font-bold">200 OK</span>
          </div>
          <div className="px-2 py-1 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-[8px]">
            <span className="font-mono text-[#0B132B]">SSO / SAML 2.0 Auth</span>
            <span className="text-[#0088CC] font-bold">Active</span>
          </div>
        </div>

        <div className="pt-1.5 border-t border-[#E2E8F0] flex items-center justify-between text-[8.5px] font-mono text-[#64748B]">
          <span>Row-Level Security</span>
          <span className="text-[#0088CC] font-bold">Auto-Scale</span>
        </div>
      </div>

      {/* Floating Badge */}
      <div className="absolute top-2 right-2 sm:right-5 px-2.5 py-1 rounded-md bg-white border border-[#E2E8F0] shadow-sm flex items-center gap-1 z-10">
        <Activity className="w-3 h-3 text-[#0088CC]" />
        <span className="text-[9.5px] font-bold text-[#0B132B]">SaaS Engine</span>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 06: DESIGN SYSTEMS & UI/UX ANIMATED VISUAL                                */
/* ========================================================================= */
export function DesignSystemVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 select-none">
      <div className="w-[230px] sm:w-[260px] h-[190px] sm:h-[205px] rounded-xl bg-white border border-[#E2E8F0] shadow-[0_16px_40px_rgba(15,23,42,0.1)] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden">
        {/* Header: Design tokens */}
        <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0] mb-2">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#0088CC]" />
            <span className="text-[10px] font-bold text-[#0B132B]">Figma Design System</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D4FF]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#0088CC]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#0B132B]" />
          </div>
        </div>

        {/* Interactive Canvas Artboard */}
        <div className="relative flex-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] p-2 flex flex-col justify-between overflow-hidden">
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#94A3B8 0.8px, transparent 0.8px)',
              backgroundSize: '10px 10px',
            }}
          />

          {/* Component States */}
          <div className="relative z-10 flex items-center gap-1.5">
            <div className="px-2 py-0.5 rounded-full bg-[#0088CC] text-white text-[7.5px] font-semibold">
              Primary Button
            </div>
            <div className="px-2 py-0.5 rounded-full bg-white border border-[#E2E8F0] text-[#0B132B] text-[7.5px] font-semibold">
              Ghost State
            </div>
          </div>

          {/* Vector Bezier Curve */}
          <div className="relative z-10 my-1">
            <svg className="w-full h-8 overflow-visible" viewBox="0 0 160 30">
              <path
                d="M 5 25 C 45 5, 115 5, 155 25"
                fill="none"
                stroke="#00C4FF"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
              <circle cx="5" cy="25" r="3" fill="#0088CC" />
              <circle cx="80" cy="15" r="3" fill="#00D4FF" />
              <circle cx="155" cy="25" r="3" fill="#0B132B" />
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[7.5px] font-mono text-[#64748B]">
            <span>1:1 Code Tokens</span>
            <span className="text-[#0088CC] font-bold">Tailwind Sync</span>
          </div>
        </div>

        <div className="pt-1.5 border-t border-[#E2E8F0] flex items-center justify-between text-[8.5px] font-mono text-[#64748B]">
          <span>WCAG AA Ready</span>
          <span className="text-emerald-600 font-bold">100% Precision</span>
        </div>
      </div>

      {/* Floating Badge */}
      <div className="absolute top-2 right-2 sm:right-5 px-2.5 py-1 rounded-md bg-white border border-[#E2E8F0] shadow-sm flex items-center gap-1 z-10">
        <Sparkles className="w-3 h-3 text-[#0088CC]" />
        <span className="text-[9.5px] font-bold text-[#0B132B]">Interactive UI</span>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 07: CLOUD DEVOPS & INFRASTRUCTURE ANIMATED VISUAL                         */
/* ========================================================================= */
export function CloudDevopsVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 select-none">
      <div className="w-[230px] sm:w-[260px] h-[190px] sm:h-[205px] rounded-xl bg-white border border-[#E2E8F0] shadow-[0_16px_40px_rgba(15,23,42,0.1)] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0] mb-2">
          <div className="flex items-center gap-1.5">
            <Cloud className="w-3.5 h-3.5 text-[#0088CC]" />
            <span className="text-[10px] font-bold text-[#0B132B]">CI/CD & Kubernetes</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[8.5px] font-mono font-bold">
            Zero-Downtime
          </span>
        </div>

        {/* Deployment Pipeline */}
        <div className="space-y-1.5 my-auto">
          <div className="p-1.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <GitBranch className="w-3 h-3 text-[#0088CC]" />
              <span className="text-[9px] font-mono text-[#0B132B]">git push origin main</span>
            </div>
            <Check className="w-3 h-3 text-emerald-500" />
          </div>

          <div className="p-1.5 rounded-md bg-[#E0F7FF] border border-[#00C4FF]/30 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-[#0088CC]" />
              <span className="text-[9px] font-semibold text-[#0088CC]">Docker Build & Scan</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C4FF] animate-ping" />
          </div>

          <div className="p-1.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[9px] font-medium text-[#0B132B]">K8s Pods (3/3 Healthy)</span>
            </div>
            <span className="text-[8px] font-mono text-emerald-600 font-bold">&lt; 80ms</span>
          </div>
        </div>

        <div className="pt-1.5 border-t border-[#E2E8F0] flex items-center justify-between text-[8.5px] font-mono text-[#64748B]">
          <span>Terraform IaC</span>
          <span className="text-emerald-600 font-bold">Automated</span>
        </div>
      </div>

      {/* Floating Badge */}
      <div className="absolute top-2 right-2 sm:right-5 px-2.5 py-1 rounded-md bg-white border border-[#E2E8F0] shadow-sm flex items-center gap-1 z-10">
        <ShieldCheck className="w-3 h-3 text-[#0088CC]" />
        <span className="text-[9.5px] font-bold text-[#0B132B]">AWS / GCP SRE</span>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 08: GAME DEVELOPMENT ANIMATED VISUAL                                      */
/* ========================================================================= */
export function GameDevVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 select-none">
      <div className="w-[230px] sm:w-[260px] h-[190px] sm:h-[205px] rounded-xl bg-white border border-[#E2E8F0] shadow-[0_16px_40px_rgba(15,23,42,0.1)] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0] mb-1.5">
          <div className="flex items-center gap-1.5">
            <Gamepad2 className="w-3.5 h-3.5 text-[#0088CC]" />
            <span className="text-[10px] font-bold text-[#0B132B]">Interactive Canvas</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[8.5px] font-mono font-bold">
            60 FPS
          </span>
        </div>

        {/* Viewport Simulation */}
        <div className="flex-1 rounded-lg bg-gradient-to-br from-[#0B132B] to-[#1E293B] p-2 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#00C4FF]/25 rounded-full blur-sm" />
          <div className="flex items-center justify-between text-[7.5px] font-mono text-[#00C4FF] relative z-10">
            <span>2D/3D ENGINE</span>
            <span>PHYSICS ON</span>
          </div>
          <div className="text-center relative z-10">
            <div className="w-7 h-7 mx-auto rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-0.5 shadow-2xs">
              <Gamepad2 className="w-3.5 h-3.5 text-[#00C4FF]" />
            </div>
            <span className="text-[8.5px] font-bold text-white tracking-wide">WebGL / Unity Canvas</span>
          </div>
          <div className="flex items-center justify-between text-[7px] font-mono text-slate-400 relative z-10">
            <span>Real-time Sync</span>
            <span className="text-emerald-400 font-bold">Low Latency</span>
          </div>
        </div>

        <div className="pt-1.5 border-t border-[#E2E8F0] flex items-center justify-between text-[8.5px] font-mono text-[#64748B]">
          <span>Engaging UX</span>
          <span className="text-[#0088CC] font-bold">Interactive</span>
        </div>
      </div>

      <div className="absolute top-2 right-2 sm:right-5 px-2.5 py-1 rounded-md bg-white border border-[#E2E8F0] shadow-sm flex items-center gap-1 z-10">
        <Sparkles className="w-3 h-3 text-[#0088CC]" />
        <span className="text-[9.5px] font-bold text-[#0B132B]">Game Engine</span>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* UNIVERSAL SERVICE VISUAL SELECTOR                                         */
/* Maps any service ID to its high-precision animated mockup                 */
/* ========================================================================= */
export function ServiceAnimatedVisual({ serviceId }: { serviceId: string }) {
  const normId = (serviceId || '').toLowerCase().trim();

  if (normId.includes('mobile') || normId.includes('ios') || normId.includes('android')) {
    return <MobileAppVisual />;
  }
  if (normId.includes('web') || normId.includes('frontend')) {
    return <WebsiteAppVisual />;
  }
  if (normId.includes('ai') || normId.includes('n8n') || normId.includes('llm') || normId.includes('automation')) {
    return <AISolutionsVisual />;
  }
  if (normId.includes('game') || normId.includes('gaming') || normId.includes('unity')) {
    return <GameDevVisual />;
  }
  if (normId.includes('saas')) {
    return <SaasProductVisual />;
  }
  if (normId.includes('design') || normId.includes('ui') || normId.includes('ux')) {
    return <DesignSystemVisual />;
  }
  if (normId.includes('cloud') || normId.includes('devops') || normId.includes('infra') || normId.includes('sre')) {
    return <CloudDevopsVisual />;
  }
  if (normId.includes('custom') || normId.includes('software') || normId.includes('crm') || normId.includes('erp')) {
    return <CustomSoftwareVisual />;
  }

  return <MobileAppVisual />;
}
