import { useState, useEffect, useRef } from 'react';
import { Smartphone, Monitor, Gamepad2, Cpu, Bot, Check, ArrowRight, Sparkles, Bell, ShieldCheck, Zap } from 'lucide-react';
import SectionHeading from './SectionHeading';

export interface WhatWeBuildProps {
  limit?: number;
  isFullPage?: boolean;
  onNavigate?: (path: string) => void;
}

interface ServiceItem {
  id: string;
  number: string;
  count: string;
  title: string;
  description: string;
  icon: any;
  features: string[];
  ctaText: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'mobile',
    number: '01',
    count: '01 / 05',
    title: 'Mobile App Development',
    description:
      'We develop mobile applications that bring ideas to life. From feature-rich Android apps to cross-platform mobile solutions, we focus on creating functional, responsive, and user-friendly applications.',
    icon: Smartphone,
    features: [
      'Android & cross-platform app development',
      'React Native mobile applications',
      'API & backend integration',
      'App testing and deployment',
    ],
    ctaText: 'Explore Mobile App Development',
  },
  {
    id: 'web',
    number: '02',
    count: '02 / 05',
    title: 'Website Development',
    description:
      'We build modern websites and web applications that help businesses establish their digital presence. From business websites and landing pages to CMS platforms and interactive web applications, we focus on functionality, responsiveness, and performance.',
    icon: Monitor,
    features: [
      'Business websites & landing pages',
      'React & Next.js development',
      'CMS-based website development',
      'Responsive design & deployment',
    ],
    ctaText: 'Explore Website Development',
  },
  {
    id: 'ai',
    number: '03',
    count: '03 / 05',
    title: 'AI Solutions & Integration',
    description:
      'We bring AI capabilities into applications and digital products to create smarter experiences. From AI-powered chatbots to intelligent assistants and API integrations, we help turn practical AI ideas into working solutions.',
    icon: Bot,
    features: [
      'AI-powered chatbots & assistants',
      'Gemini API & LLM integration',
      'AI features for web applications',
      'Intelligent workflow automation',
    ],
    ctaText: 'Explore AI Solutions',
  },
  {
    id: 'custom',
    number: '04',
    count: '04 / 05',
    title: 'Custom Software Development',
    description:
      'We create software tailored to specific business needs. From management systems and custom dashboards to SaaS platforms and backend solutions, we develop applications that simplify everyday operations.',
    icon: Cpu,
    features: [
      'Custom business software',
      'SaaS platforms & web applications',
      'Backend & REST API development',
      'Database design & integration',
    ],
    ctaText: 'Explore Custom Software',
  },
  {
    id: 'game',
    number: '05',
    count: '05 / 05',
    title: 'Game Development',
    description:
      'We develop interactive games that combine creative ideas with engaging gameplay. From simple 2D game concepts to interactive digital experiences, we focus on gameplay functionality and smooth user experiences.',
    icon: Gamepad2,
    features: [
      '2D game development',
      'Interactive gameplay mechanics',
      'Game interface & asset integration',
      'Game testing & optimization',
    ],
    ctaText: 'Explore Game Development',
  },
];

/* ========================================================================= */
/* ANIMATED VISUAL ILLUSTRATIONS FOR EACH SERVICE                            */
/* ========================================================================= */

/** 01: Animated Mobile App Visual */
function MobileAppVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
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

/** 02: Animated Website Visual */
function WebsiteAppVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
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

/** 03: Animated AI Solutions Visual */
function AISolutionsVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
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

/** 04: Animated Custom Software Visual */
function CustomSoftwareVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
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

/** 05: Animated Game Development Visual */
function GameDevVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
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
          {/* Ambient Glow */}
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

      {/* Floating Game Badge */}
      <div className="absolute top-2 right-2 sm:right-5 px-2.5 py-1 rounded-md bg-white border border-[#E2E8F0] shadow-sm flex items-center gap-1 z-10">
        <Sparkles className="w-3 h-3 text-[#0088CC]" />
        <span className="text-[9.5px] font-bold text-[#0B132B]">Game Engine</span>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* MAIN WHAT WE BUILD COMPONENT WITH STICKY SCROLL TRACKING                  */
/* ========================================================================= */

export default function WhatWeBuild({ limit, isFullPage = false, onNavigate }: WhatWeBuildProps) {
  const displayedServices = limit ? SERVICES.slice(0, limit) : SERVICES;
  const [activeIndex, setActiveIndex] = useState(0);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll tracking identical to earlier version: selects service closest to viewport center
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      let closestIdx = 0;
      let minDistance = Infinity;

      serviceRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distance = Math.abs(elementCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedServices.length]);

  const activeService = displayedServices[activeIndex] || displayedServices[0];

  const handleCta = (serviceId: string) => {
    const targetPath = `/service?id=${serviceId}`;
    if (onNavigate) {
      onNavigate(targetPath);
    } else {
      window.location.href = targetPath;
    }
  };

  const renderVisual = (serviceId: string) => {
    switch (serviceId) {
      case 'mobile':
        return <MobileAppVisual />;
      case 'web':
        return <WebsiteAppVisual />;
      case 'ai':
        return <AISolutionsVisual />;
      case 'custom':
        return <CustomSoftwareVisual />;
      case 'game':
        return <GameDevVisual />;
      default:
        return <MobileAppVisual />;
    }
  };

  return (
    <section
      id="services"
      className={`relative bg-[#F8FAFC] border-t border-[#E2E8F0] ${
        isFullPage ? 'pt-20 xs:pt-24 sm:pt-32 pb-12 xs:pb-16 sm:pb-24' : 'py-10 xs:py-12 sm:py-18 lg:py-24'
      }`}
    >
      {/* SECTION HEADING (Unified SectionHeading System) */}
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services & Capabilities"
          title="End-to-End Solutions"
          highlight="Built to Scale."
          description={
            isFullPage
              ? 'Comprehensive digital product development covering mobile apps, web applications, SaaS platforms, and custom operational software.'
              : 'Digital products designed to solve real problems, create better experiences, and help businesses grow.'
          }
        />
      </div>

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: STICKY INTERACTIVE VISUAL CARD (RESTORED)    */}
          {/* ========================================================= */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 sticky top-28 xl:top-32">
            <div className="relative w-full h-[380px] xl:h-[420px] rounded-2xl sm:rounded-[26px] bg-gradient-to-br from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/50 border border-[#E2E8F0] shadow-[0_16px_45px_rgba(15,23,42,0.06)] overflow-hidden flex items-center justify-center p-5 transition-all duration-300">
              {/* Subtle Futuristic Background Grid Pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-25 -z-10"
                style={{
                  backgroundImage: 'radial-gradient(rgba(0, 196, 255, 0.25) 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Top-Right Watermark Number (e.g. 01, 02, 03, 04, 05) */}
              <span className="absolute top-3 right-5 text-[80px] xl:text-[95px] font-black font-mono text-[#0088CC]/[0.06] select-none pointer-events-none leading-none">
                {activeService?.number || '01'}
              </span>

              {/* Left Vertical Progress Segment Dashes */}
              <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 select-none z-20">
                {displayedServices.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      serviceRefs.current[idx]?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                      });
                    }}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === idx
                        ? 'w-1.5 h-6 bg-[#0088CC] shadow-xs'
                        : 'w-1.5 h-2.5 bg-[#CBD5E1]/70 hover:bg-[#94A3B8]'
                    }`}
                    aria-label={`Jump to service ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Bottom-Left Counter (e.g. 01 / 05) */}
              <div className="absolute bottom-5 left-5 font-mono text-[11px] z-20">
                <span className="font-bold text-[#0B132B] text-xs">
                  {activeService?.number || '01'}
                </span>
                <span className="text-[#94A3B8]"> / 0{displayedServices.length}</span>
              </div>

              {/* Dynamic Animated Visual Elements (Smooth Crossfade based on activeIndex) */}
              <div className="relative w-full h-full flex items-center justify-center">
                {displayedServices.map((item, idx) => {
                  const isActive = activeIndex === idx;

                  return (
                    <div
                      key={item.id}
                      className={`absolute inset-0 flex items-center justify-center p-2 transition-all duration-500 ease-out ${
                        isActive
                          ? 'opacity-100 scale-100 pointer-events-auto'
                          : 'opacity-0 scale-[0.96] pointer-events-none'
                      }`}
                    >
                      {renderVisual(item.id)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: SCROLLABLE SERVICE DETAILS (COMPACT & CLEAN) */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-6 xs:space-y-8 sm:space-y-16 lg:py-2">
            {displayedServices.map((item, idx) => {
              const IconComponent = item.icon;
              const isActive = activeIndex === idx;

              return (
                <div
                  key={item.id}
                  ref={(el) => (serviceRefs.current[idx] = el)}
                  className="scroll-mt-28"
                >
                  <div
                    className={`rounded-2xl p-4 sm:p-5 lg:p-6 border transition-all duration-300 ${
                      isActive
                        ? 'bg-white border-[#00C4FF]/50 shadow-[0_12px_36px_rgba(0,196,255,0.08)]'
                        : 'bg-white/70 hover:bg-white border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.02)]'
                    }`}
                  >
                    {/* Top Header Badge */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center shrink-0">
                        <IconComponent className="w-3.5 h-3.5 stroke-[2]" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] font-bold text-[#0088CC]">
                          {item.number}
                        </span>
                        <span className="w-4 h-[1.5px] bg-[#E2E8F0] rounded-full" />
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold text-[#0B132B] tracking-tight leading-snug mb-1.5 sm:mb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[12.5px] sm:text-[13.5px] text-[#64748B] leading-relaxed mb-3.5 max-w-xl font-normal">
                      {item.description}
                    </p>

                    {/* Mobile-Only Visual Preview */}
                    <div className="lg:hidden relative mb-4 rounded-xl bg-gradient-to-br from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/35 border border-[#E2E8F0] p-2.5 flex items-center justify-center h-[200px] overflow-hidden">
                      {renderVisual(item.id)}
                    </div>

                    {/* Features Checklist: Compact 2-Column Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mb-4">
                      {item.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                          </div>
                          <span className="text-[12px] sm:text-[12.5px] font-medium text-[#475569] leading-tight">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Link CTA */}
                    <div className="pt-0.5">
                      <button
                        type="button"
                        onClick={() => handleCta(item.id)}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors group cursor-pointer"
                      >
                        <span>{item.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* HOME SECTION: EXPLORE ALL SERVICES BUTTON */}
        {limit && limit < SERVICES.length && (
          <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center text-center">
            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/services');
                } else {
                  window.location.href = '/services';
                }
              }}
              className="
                inline-flex items-center gap-2
                px-6 sm:px-7 py-2.5 sm:py-3
                rounded-full
                bg-white border border-[#E2E8F0]
                text-[#0B132B] text-xs sm:text-[13px] font-semibold
                shadow-2xs
                hover:border-[#0088CC] hover:text-[#0088CC] hover:shadow-[0_8px_25px_rgba(0,196,255,0.12)]
                hover:scale-[1.02] active:scale-95
                transition-all group cursor-pointer
              "
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#0088CC]" />
            </button>
            <p className="mt-2 text-[11.5px] text-[#94A3B8]">
              View our full capabilities including Custom Software & AI engineering
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
