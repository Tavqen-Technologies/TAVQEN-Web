import { useState, useEffect, useRef } from 'react';
import { Smartphone, Monitor, Layers, Cpu, Check, ArrowRight } from 'lucide-react';
import { ProgressiveImage } from './loading';

import mobileImg from '../assits/products/ServcesMobile.png';
import websiteImg from '../assits/products/servicesWeb.png';
import saasImg from '../assits/saas product.avif';
import customImg from '../assits/Custom.avif';

interface ServiceItem {
  number: string;
  count: string;
  title: string;
  description: string;
  icon: any;
  image: string;
  alt: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export interface WhatWeBuildProps {
  limit?: number;
  isFullPage?: boolean;
  onNavigate?: (path: string) => void;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    count: '01 / 04',
    title: 'Mobile App Development',
    description:
      'We design and build high-performance, visually polished mobile applications for both iOS and Android. From MVP to full-scale launch, every product we build is crafted to engage users and drive growth.',
    icon: Smartphone,
    image: mobileImg,
    alt: 'Mobile App Development Mockup',
    features: [
      'Custom iOS & Android development',
      'High-performance, native-feel apps',
      'User-centric UI/UX design',
      'Optimized for App Store & Play Store',
    ],
    ctaText: 'More about Mobile App Development',
    ctaLink: '#contact',
  },
  {
    number: '02',
    count: '02 / 04',
    title: 'Web Application Development',
    description:
      "We create fast, secure, and scalable web applications that deliver exceptional user experiences. Whether it's a customer-facing platform or complex internal software, we engineer for modern scale.",
    icon: Monitor,
    image: websiteImg,
    alt: 'Web Application Development Mockup',
    features: [
      'Modern responsive web experiences',
      'Scalable Next.js & React architecture',
      'API-driven cloud integrations',
      'Performance & security-first development',
    ],
    ctaText: 'More about Web Application Development',
    ctaLink: '#contact',
  },
  {
    number: '03',
    count: '03 / 04',
    title: 'SaaS Product Development',
    description:
      'From zero to product-market fit, we design and architect scalable multitenant SaaS platforms with robust subscription billing, automated workflows, and self-serve client onboarding.',
    icon: Layers,
    image: saasImg,
    alt: 'SaaS Product Development Mockup',
    features: [
      'Multitenant architecture & role management',
      'Automated subscription & billing engines',
      'Real-time analytics & user insights',
      'Rapid MVP to enterprise scaling',
    ],
    ctaText: 'More about SaaS Product Development',
    ctaLink: '#contact',
  },
  {
    number: '04',
    count: '04 / 04',
    title: 'Custom Software Development',
    description:
      'Bespoke digital systems and automated operational tools engineered around your company’s exact operational workflows, legacy systems, and proprietary business logic.',
    icon: Cpu,
    image: customImg,
    alt: 'Custom Software Development Mockup',
    features: [
      'Tailored enterprise workflow engines',
      'Legacy modernization & cloud migration',
      'High-throughput distributed APIs',
      'Continuous maintenance & SLA support',
    ],
    ctaText: 'More about Custom Software Development',
    ctaLink: '#contact',
  },
];

export default function WhatWeBuild({ limit, isFullPage = false, onNavigate }: WhatWeBuildProps) {
  const displayedServices = limit ? SERVICES.slice(0, limit) : SERVICES;
  const [activeIndex, setActiveIndex] = useState(0);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      // Find which service section is closest to the middle of the screen
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
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedServices.length]);

  const activeService = displayedServices[activeIndex] || displayedServices[0];

  return (
    <section
      id="services"
      className={`relative bg-[#F8FAFC] border-t border-[#E2E8F0] ${
        isFullPage ? 'pt-28 sm:pt-36 pb-20 sm:pb-28' : 'section-spacing'
      }`}
    >
      {/* Back to Home Breadcrumb for Full Page View */}
      {isFullPage && (
        <div className="site-container mb-6 sm:mb-8">
          <button
            type="button"
            onClick={() => (onNavigate ? onNavigate('home') : (window.location.hash = ''))}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors cursor-pointer"
          >
            <span>← Back to Home</span>
          </button>
        </div>
      )}

      {/* SECTION HEADING */}
      <div className="site-container mb-12 sm:mb-16 text-center">
        {isFullPage && (
          <span className="section-eyebrow">
            Services & Capabilities
          </span>
        )}
        <h2 className="section-heading max-w-3xl mx-auto">
          {isFullPage ? 'What We Build & Engineer' : 'What We Build'}
        </h2>
        <p className="section-desc max-w-xl mx-auto">
          {isFullPage
            ? 'Comprehensive digital product development covering mobile apps, web applications, SaaS platforms, and custom operational software.'
            : 'Digital products designed to solve real problems, create better experiences, and help businesses grow.'}
        </p>
      </div>

      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: STICKY INTERACTIVE VISUAL CARD               */}
          {/* ========================================================= */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 sticky top-28 xl:top-32">
            <div className="relative w-full h-[430px] xl:h-[470px] rounded-[28px] bg-gradient-to-br from-[#F5F3FF]/80 via-[#F0F9FF]/90 to-[#E0F7FF]/60 border border-[#E2E8F0] shadow-[0_16px_45px_rgba(15,23,42,0.05)] overflow-hidden flex items-center justify-center p-6 transition-all duration-500">
              {/* Subtle Futuristic Background Grid Pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 -z-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.08) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Top-Right Watermark Number (e.g. 01, 02, 03, 04) */}
              <span className="absolute top-3 right-6 text-[90px] xl:text-[110px] font-black font-mono text-[#0088CC]/[0.06] select-none pointer-events-none leading-none">
                {activeService?.number || '01'}
              </span>

              {/* Left Vertical Progress Segment Dashes */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 select-none z-20">
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
                    className={`rounded-full transition-all duration-500 cursor-pointer ${
                      activeIndex === idx
                        ? 'w-1.5 h-7 bg-[#0088CC] shadow-xs'
                        : 'w-1.5 h-3 bg-[#CBD5E1]/70 hover:bg-[#94A3B8]'
                    }`}
                    aria-label={`Jump to service ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Bottom-Left Counter (e.g. 01 / 02 or 01 / 04) */}
              <div className="absolute bottom-6 left-6 font-mono text-[11px] z-20">
                <span className="font-bold text-[#0B132B] text-xs">
                  {activeService?.number || '01'}
                </span>
                <span className="text-[#94A3B8]"> / 0{displayedServices.length}</span>
              </div>

              {/* Floating Mockup Images (Crossfade & subtle scale transition) */}
              <div className="relative w-full h-full flex items-center justify-center">
                {displayedServices.map((item, idx) => (
                  <div
                    key={item.number}
                    className={`absolute inset-0 flex items-center justify-center p-3 transition-all duration-700 ease-out ${
                      activeIndex === idx
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-[0.96] pointer-events-none'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="max-h-[300px] xl:max-h-[340px] max-w-[85%] w-auto object-contain drop-shadow-[0_20px_40px_rgba(15,23,42,0.12)] hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: SCROLLABLE SERVICE DETAILS                  */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-20 sm:space-y-24 lg:py-4">
            {displayedServices.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.number}
                  ref={(el) => (serviceRefs.current[idx] = el)}
                  className="scroll-mt-32"
                >
                  {/* Top Header Badge: Icon in pill + Number & horizontal rule */}
                  <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] shadow-2xs flex items-center justify-center text-[#0088CC]">
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#0B132B]">
                        {item.number}
                      </span>
                      <span className="w-6 h-[2px] bg-[#E2E8F0] rounded-full" />
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#0B132B] tracking-tight leading-[1.2] mb-3.5">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[14.5px] sm:text-[15px] text-[#64748B] leading-relaxed mb-6 max-w-xl font-normal">
                    {item.description}
                  </p>

                  {/* Mobile-Only Image Preview */}
                  <div className="lg:hidden mb-6 rounded-2xl bg-gradient-to-br from-[#F5F3FF] to-[#E0F7FF] border border-[#E2E8F0] p-5 flex items-center justify-center">
                    <ProgressiveImage
                      src={item.image}
                      alt={item.alt}
                      className="max-h-[240px] w-auto object-contain drop-shadow-md"
                      containerClassName="flex items-center justify-center"
                    />
                  </div>

                  {/* Features List */}
                  <div className="space-y-0 mb-6 max-w-xl">
                    {item.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="py-2.5 sm:py-3 border-b border-[#E2E8F0]/80 flex items-center gap-3"
                      >
                        <div className="w-4 h-4 rounded-full bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                        <span className="text-[13.5px] sm:text-[14px] font-medium text-[#475569]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Link CTA */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => (onNavigate ? onNavigate('start-a-project') : (window.location.hash = 'contact'))}
                      className="inline-flex items-center gap-2 text-[13.5px] sm:text-[14px] font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors group cursor-pointer"
                    >
                      <span>{item.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* HOME SECTION: EXPLORE ALL SERVICES BUTTON                 */}
        {/* ========================================================= */}
        {limit && limit < SERVICES.length && (
          <div className="mt-14 sm:mt-18 flex flex-col items-center justify-center text-center">
            <button
              type="button"
              onClick={() => (onNavigate ? onNavigate('services') : (window.location.href = '/services'))}
              className="
                inline-flex items-center gap-2.5
                px-7 sm:px-8 py-3 sm:py-3.5
                rounded-full
                bg-white border border-[#E2E8F0]
                text-[#0B132B] text-xs sm:text-[13.5px] font-semibold
                shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                hover:border-[#0088CC] hover:text-[#0088CC] hover:shadow-[0_8px_25px_rgba(0,196,255,0.15)]
                hover:scale-[1.02] active:scale-95
                transition-all group cursor-pointer
              "
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#0088CC]" />
            </button>
            <p className="mt-2.5 text-xs text-[#94A3B8]">
              View our full capabilities including SaaS & Custom Software engineering
            </p>
          </div>
        )}

        {/* ========================================================= */}
        {/* FULL PAGE VIEW: CALL TO ACTION BANNER                     */}
        {/* ========================================================= */}
        {isFullPage && (
          <div className="mt-20 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#00D4FF]/10 via-[#0088CC]/10 to-transparent p-8 sm:p-10 border border-[#00C4FF]/20 text-center flex flex-col items-center">
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#0B132B] mb-3">
              Ready to build your next product?
            </h3>
            <p className="text-[#64748B] text-sm sm:text-base max-w-lg mb-6">
              Let&apos;s turn your vision into high-performance software designed to scale.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => (onNavigate ? onNavigate('start-a-project') : (window.location.hash = 'project'))}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-sm font-medium shadow-[0_8px_25px_rgba(0,196,255,0.25)] hover:scale-[1.02] transition-all cursor-pointer"
              >
                Start a Project
              </button>
              <button
                type="button"
                onClick={() => (onNavigate ? onNavigate('home') : (window.location.hash = ''))}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white border border-[#E2E8F0] text-gray-700 text-xs sm:text-sm font-medium hover:text-black transition-all cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
