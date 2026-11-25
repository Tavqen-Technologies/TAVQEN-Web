import { useState } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';

import product1 from '../assits/products/product1.webp';
import product2 from '../assits/products/product2.webp';
import product3 from '../assits/products/product3.webp';
import product4 from '../assits/products/product4.webp';

interface OurWorkPageProps {
  onNavigate?: (path: string) => void;
}

export default function OurWorkPage({ onNavigate }: OurWorkPageProps) {
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'saas'>('all');

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const CASE_STUDIES = [
    {
      id: 'busypixel',
      category: 'web',
      categoryLabel: 'Web Application · Marketing',
      title: 'BusyPixel — Modern Influencer Marketing Platform',
      client: 'BusyPixel Media',
      impact: '+340% Campaign Engagement',
      overview:
        'A comprehensive creator management ecosystem engineered to connect forward-looking consumer brands with top-tier creators. Features automated contract signing, real-time analytics dashboards, and instant escrow payouts.',
      challenge: 'Managing fragmented communications and delayed milestone reporting across 5,000+ brand ambassadors.',
      solution: 'Architected a modular Next.js web application with real-time websocket activity feeds and automated Stripe invoice handling.',
      technologies: ['Next.js 14', 'React', 'Node.js', 'PostgreSQL', 'Stripe Connect', 'Tailwind CSS'],
      image: product1,
      stats: [
        { label: 'Monthly Active Creators', value: '45,000+' },
        { label: 'Avg Page Load Speed', value: '0.4s' },
        { label: 'Uptime SLA', value: '99.99%' },
      ],
    },
    {
      id: 'alpha',
      category: 'mobile',
      categoryLabel: 'Mobile App · EdTech',
      title: 'Alpha — Smarter Learning Experience for Students',
      client: 'Alpha EduTech Ltd.',
      impact: '120K+ Active Daily Learners',
      overview:
        'An ergonomic, interactive mobile learning application built for secondary and university students. Includes gamified quiz loops, offline lecture caching, and peer-to-peer study sessions.',
      challenge: 'Students in low-bandwidth regions suffered dropped video sessions and corrupted offline data caches.',
      solution: 'Engineered a resilient React Native architecture with local SQLite offline synchronization and adaptive bitrate streaming.',
      technologies: ['React Native', 'TypeScript', 'Expo', 'SQLite', 'Python FastAPI', 'AWS CloudFront'],
      image: product3,
      stats: [
        { label: 'App Store Rating', value: '4.9 / 5.0' },
        { label: 'Daily Quiz Sessions', value: '180,000+' },
        { label: 'Crash-Free Rate', value: '99.95%' },
      ],
    },
    {
      id: 'noisy-them',
      category: 'saas',
      categoryLabel: 'SaaS Platform · Creators',
      title: 'Noisy Them — Creator-First Media & Community Hub',
      client: 'Noisy Media Inc.',
      impact: '3.2x User Growth in Q1',
      overview:
        'A creator subscription and digital asset marketplace with customized community feeds, gated video workshops, and self-serve tiers.',
      challenge: 'High churn caused by sluggish mobile web loading and convoluted subscription billing steps.',
      solution: 'Redesigned the complete UI/UX flow from ground up and optimized server-side rendering for instant page transitions.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Docker', 'Redis', 'Cloudflare Workers'],
      image: product4,
      stats: [
        { label: 'Checkout Conversion', value: '+38%' },
        { label: 'Server Response Time', value: '62ms' },
        { label: 'Active Communities', value: '1,200+' },
      ],
    },
    {
      id: 'frootreet',
      category: 'web',
      categoryLabel: 'Web Experience · E-Commerce',
      title: 'Frootreet — Playful Digital Brand Experience',
      client: 'Frootreet Confections',
      impact: '2.5x Increase in Online Orders',
      overview:
        'An immersive, playful consumer e-commerce storefront crafted for an artisanal dessert brand, packed with micro-interactions and instant local delivery tracking.',
      challenge: 'Generic storefront templates failed to reflect the vibrant boutique brand personality.',
      solution: 'Crafted bespoke organic layout designs, interactive flavor customizers, and sub-second checkout loops.',
      technologies: ['Next.js', 'Framer Motion', 'Headless Shopify', 'Tailwind CSS', 'Vercel Edge'],
      image: product2,
      stats: [
        { label: 'Session Duration', value: '+65%' },
        { label: 'Mobile Bounce Rate', value: '-42%' },
        { label: 'Customer Re-orders', value: '+54%' },
      ],
    },
  ];

  const filteredStudies =
    filter === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((item) => item.category === filter);

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
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            Portfolio & Case Studies
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-[56px] font-medium tracking-tight text-[#0B132B] leading-[1.12]">
            Work that drives real measurable impact.
          </h1>
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] text-[#64748B] font-normal leading-relaxed max-w-2xl mx-auto">
            Explore recent digital products, mobile applications, and web platforms designed and engineered by TAVQEN Technologies.
          </p>
        </div>

        {/* ========================================================= */}
        {/* FILTER CATEGORY PILLS                                     */}
        {/* ========================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14 sm:mb-18">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'web', label: 'Web Applications' },
            { id: 'mobile', label: 'Mobile Apps' },
            { id: 'saas', label: 'SaaS Platforms' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white shadow-xs scale-105'
                  : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0B132B] hover:border-gray-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* CASE STUDIES DEEP DIVE                                    */}
      {/* ========================================================= */}
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20 mb-20 sm:mb-24">
        {filteredStudies.map((study) => (
          <div
            key={study.id}
            className="rounded-[32px] sm:rounded-[40px] bg-white border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.04)] overflow-hidden hover:border-[#00C4FF]/40 transition-all duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-7 sm:p-10 lg:p-12 items-center">
              {/* Left Column: Story & Outcomes */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#E0F7FF] text-[#0088CC] text-xs font-bold font-mono uppercase tracking-wider">
                      {study.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-semibold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{study.impact}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight leading-snug mb-3">
                    {study.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#0088CC] font-semibold mb-4">
                    Client: {study.client}
                  </p>

                  <p className="text-sm sm:text-[15px] text-[#64748B] leading-relaxed mb-6 font-normal">
                    {study.overview}
                  </p>

                  {/* Challenge & Solution */}
                  <div className="space-y-3 p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] mb-6">
                    <div>
                      <span className="text-xs font-bold text-[#0B132B] uppercase tracking-wider block mb-1">
                        The Challenge:
                      </span>
                      <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#E2E8F0]">
                      <span className="text-xs font-bold text-[#0088CC] uppercase tracking-wider block mb-1">
                        Our Engineering Solution:
                      </span>
                      <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[#475569] text-xs font-medium font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-3 pt-5 border-t border-[#E2E8F0]">
                  {study.stats.map((s, sIdx) => (
                    <div key={sIdx}>
                      <div className="text-base sm:text-lg font-bold text-[#0B132B] font-mono">
                        {s.value}
                      </div>
                      <div className="text-[11px] sm:text-xs text-[#94A3B8]">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Visual Mockup */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="w-full h-[320px] sm:h-[400px] lg:h-[460px] rounded-[24px] overflow-hidden border border-black/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.08)] bg-[#F1F5F9] group relative">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* START A PROJECT CTA BANNER                                */}
      {/* ========================================================= */}
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] sm:rounded-[40px] bg-gradient-to-r from-[#F8FAFC] via-[#F0F9FF] to-[#E0F7FF]/60 border border-[#00C4FF]/30 p-8 sm:p-12 text-center flex flex-col items-center shadow-[0_20px_50px_rgba(0,196,255,0.08)]">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            Your Next Success Story
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0B132B] tracking-tight max-w-xl leading-snug">
            Ready to build your next case study with us?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] max-w-lg mb-8 leading-relaxed">
            Partner with TAVQEN to build a scalable digital product that drives real business results.
          </p>
          <button
            type="button"
            onClick={() => handleNav('/start-a-project')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-sm font-semibold shadow-[0_8px_25px_rgba(0,196,255,0.3)] hover:shadow-[0_12px_32px_rgba(0,196,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
