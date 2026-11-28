import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  MapPin,
  Sparkles,
  Target,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import tavqenFav from '../assits/tavqen-fav.webp';
import tavqenLogo from '../assits/Tavqen-logo.png';
import {
  ABOUT_HERO,
  OUR_STORY,
  VISION_MISSION,
  CULTURE_VALUES,
  OUR_IMPACT,
  OUR_FUTURE,
  JOIN_CTA,
} from '../data/companyData';

interface CompanyPageProps {
  onNavigate?: (path: string) => void;
}

export default function CompanyPage({ onNavigate }: CompanyPageProps) {
  const handleNav = (path: string) => {
    if (path.startsWith('#')) {
      const el = document.getElementById(path.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B132B] pt-24 xs:pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-x-clip">
      {/* Subtle Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[480px] pointer-events-none opacity-25 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0, 196, 255, 0.12) 0%, rgba(155, 227, 223, 0.08) 45%, transparent 70%)',
        }}
      />

      {/* ================================================================= */}
      {/* 1. ABOUT US — HERO SECTION                                        */}
      {/* ================================================================= */}
      <section className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Heading + Description + Metadata + CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F7FF] border border-[#00C4FF]/30 text-[#0088CC] text-[11px] font-semibold tracking-wide uppercase mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#00C4FF]" />
              <span>{ABOUT_HERO.eyebrow}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-semibold tracking-tight text-[#0B132B] leading-[1.25] mb-4">
              Building Technology.{' '}
              <span className="bg-gradient-to-r from-[#00D4FF] via-[#0088CC] to-[#006699] bg-clip-text text-transparent">
                Empowering Businesses.
              </span>{' '}
              Creating Impact.
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-[15px] text-[#64748B] leading-relaxed max-w-xl mb-4 font-normal">
              {ABOUT_HERO.description}
            </p>

            {/* Metadata */}
            <div className="inline-flex items-center gap-1.5 text-xs text-[#475569] font-medium mb-6">
              <MapPin className="w-3.5 h-3.5 text-[#0088CC]" />
              <span>Indore, Madhya Pradesh, India · Est. {ABOUT_HERO.foundedYear}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleNav('#story')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-[13px] font-medium shadow-[0_4px_16px_rgba(0,196,255,0.22)] hover:shadow-[0_8px_24px_rgba(0,196,255,0.32)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Explore Our Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => handleNav('/start-a-project')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E2E8F0] hover:border-[#00C4FF] text-[#0B132B] hover:text-[#0088CC] text-xs sm:text-[13px] font-medium shadow-2xs hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Clean Animated TAVQEN Brand Emblem */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[370px] aspect-square rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-7 shadow-[0_12px_36px_rgba(15,23,42,0.03)] flex flex-col justify-between overflow-hidden group">
              {/* Soft Ambient Radial Corner Accent */}
              <div
                className="absolute -top-12 -right-12 w-48 h-48 pointer-events-none opacity-30 blur-xl"
                style={{
                  background: 'radial-gradient(circle, #00C4FF 0%, transparent 70%)',
                }}
              />

              {/* Status Header */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <img src={tavqenLogo} alt="TAVQEN" className="h-4 sm:h-4.5 w-auto object-contain opacity-85" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[10.5px] font-mono font-medium text-[#64748B]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Est. {ABOUT_HERO.foundedYear}</span>
                </div>
              </div>

              {/* Animated TAVQEN Emblem Stage */}
              <div className="my-auto py-5 flex items-center justify-center relative">
                {/* Subtle Rotating Tech Rings */}
                <div
                  className="absolute w-44 h-44 rounded-full border border-dashed border-[#00C4FF]/35 pointer-events-none animate-[spin_24s_linear_infinite]"
                  style={{ transformOrigin: 'center' }}
                />
                <div
                  className="absolute w-36 h-36 rounded-full border border-[#0088CC]/20 pointer-events-none animate-[spin_16s_linear_infinite_reverse]"
                  style={{ transformOrigin: 'center' }}
                />

                {/* Ambient Breathing Cyan Glow */}
                <div className="absolute w-24 h-24 rounded-full bg-[#00C4FF]/20 blur-xl animate-pulse pointer-events-none" />

                {/* Floating Central Emblem Card */}
                <div className="relative z-10 w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-br from-[#0B132B] via-[#0F244A] to-[#0B132B] border border-[#00C4FF]/50 flex items-center justify-center shadow-[0_10px_30px_rgba(0,196,255,0.25)] transition-transform duration-500 hover:scale-105 animate-[bounce_4s_ease-in-out_infinite]">
                  <img
                    src={tavqenFav}
                    alt="TAVQEN Emblem"
                    className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter drop-shadow-[0_2px_8px_rgba(0,196,255,0.5)]"
                  />
                  {/* Subtle corner tech tick marks */}
                  <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-[#00C4FF]/60" />
                  <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-[#00C4FF]/60" />
                </div>
              </div>

              {/* Footer info */}
              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11.5px] text-[#64748B] z-10">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0088CC]" />
                  <span>Indore, India</span>
                </span>
                <span className="font-mono text-[11px] text-[#0088CC] font-medium tracking-wide">
                  Software Solutions
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. OUR STORY                                                      */}
      {/* ================================================================= */}
      <section
        id="story"
        className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 border-t border-[#E2E8F0]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Left Column: Heading & Eyebrow */}
          <div className="lg:col-span-5">
            <span className="text-[11px] font-mono font-medium tracking-wider uppercase text-[#0088CC] mb-2 block">
              {OUR_STORY.eyebrow}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-[#0B132B] tracking-tight leading-snug mb-3">
              {OUR_STORY.heading}
            </h2>
            <div className="w-10 h-0.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC]" />
          </div>

          {/* Right Column: Story Content */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-[0_4px_24px_rgba(15,23,42,0.02)] space-y-3.5 text-xs sm:text-sm text-[#64748B] leading-relaxed">
            <p className="text-[#0B132B] font-medium sm:text-[15px]">
              {OUR_STORY.description}
            </p>
            <p className="font-normal text-[#64748B]">
              {OUR_STORY.highlight}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. OUR VISION & MISSION (Two Balanced Cards)                      */}
      {/* ================================================================= */}
      <section className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 border-t border-[#E2E8F0]">
        <SectionHeading
          eyebrow="Direction"
          title="Our Vision &"
          highlight="Mission"
          description="The guiding foundation behind our engineering, client relationships, and technological journey."
          className="mb-6 sm:mb-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Vision Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-[#00C4FF]/50 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-5 shadow-2xs">
                <Target className="w-4.5 h-4.5 stroke-[2]" />
              </div>
              <span className="text-[10.5px] font-mono font-medium tracking-wider uppercase text-[#0088CC] mb-1.5 block">
                {VISION_MISSION.vision.badge}
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-[#0B132B] tracking-tight leading-snug mb-3">
                {VISION_MISSION.vision.headline}
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-normal">
                {VISION_MISSION.vision.body}
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-[#00C4FF]/50 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-5 shadow-2xs">
                <Compass className="w-4.5 h-4.5 stroke-[2]" />
              </div>
              <span className="text-[10.5px] font-mono font-medium tracking-wider uppercase text-[#0088CC] mb-1.5 block">
                {VISION_MISSION.mission.badge}
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-[#0B132B] tracking-tight leading-snug mb-3">
                {VISION_MISSION.mission.headline}
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-normal">
                {VISION_MISSION.mission.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. OUR CULTURE & VALUES                                           */}
      {/* ================================================================= */}
      <section className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 border-t border-[#E2E8F0]">
        <SectionHeading
          eyebrow="OUR VALUES"
          title="The Principles That"
          highlight="Shape Our Work"
          description="Six fundamental values guiding our team, decisions, commitments, and client partnerships."
          className="mb-6 sm:mb-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {CULTURE_VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.number}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-[#00C4FF]/50 hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-9 h-9 rounded-lg bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center group-hover:bg-[#0088CC] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>
                    <span className="font-mono text-xs font-medium text-[#94A3B8]">
                      {val.number}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-[15px] font-semibold text-[#0B132B] mb-1.5 group-hover:text-[#0088CC] transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed font-normal">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. OUR IMPACT                                                     */}
      {/* ================================================================= */}
      <section className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 border-t border-[#E2E8F0]">
        <SectionHeading
          eyebrow={OUR_IMPACT.eyebrow}
          title="Turning Ideas into"
          highlight="Practical Technology Solutions"
          description={OUR_IMPACT.description}
          className="mb-6 sm:mb-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {OUR_IMPACT.categories.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-[0_4px_16px_rgba(15,23,42,0.02)] hover:border-[#00C4FF]/50 hover:-translate-y-0.5 transition-all flex items-center gap-3.5"
              >
                <div className="w-9 h-9 rounded-lg bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5 stroke-[2]" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-medium uppercase text-[#0088CC] tracking-wider mb-0.5">
                    {item.badge}
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-[#0B132B] tracking-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. OUR FUTURE                                                     */}
      {/* ================================================================= */}
      <section className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 border-t border-[#E2E8F0]">
        <SectionHeading
          eyebrow={OUR_FUTURE.eyebrow}
          title="Building Today for a"
          highlight="More Innovative Tomorrow"
          description={OUR_FUTURE.description}
          className="mb-6 sm:mb-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {OUR_FUTURE.groups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.category}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-[#00C4FF]/50 hover:-translate-y-0.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#E0F7FF] text-[#0088CC] flex items-center justify-center mb-3.5 shadow-2xs">
                    <Icon className="w-4.5 h-4.5 stroke-[2]" />
                  </div>

                  <span className="text-[9.5px] font-mono font-medium text-[#0088CC] uppercase tracking-wider block mb-1">
                    {group.badge}
                  </span>

                  <h3 className="text-sm sm:text-[15px] font-semibold text-[#0B132B] tracking-tight mb-1.5">
                    {group.category}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed font-normal">
                    {group.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. FINAL CTA — JOIN TAVQEN                                        */}
      {/* ================================================================= */}
      <section className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-12 text-center flex flex-col items-center shadow-[0_12px_40px_rgba(15,23,42,0.04)] relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(0, 196, 255, 0.16) 0%, transparent 70%)',
            }}
          />

          <span className="relative z-10 text-[11px] font-mono font-medium tracking-wider uppercase text-[#0088CC] mb-2.5 block">
            {JOIN_CTA.eyebrow}
          </span>

          <h2 className="relative z-10 text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0B132B] tracking-tight mb-3">
            {JOIN_CTA.heading}
          </h2>

          <p className="relative z-10 text-xs sm:text-sm text-[#64748B] max-w-lg mb-6 leading-relaxed font-normal">
            {JOIN_CTA.description}
          </p>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleNav('/start-a-project')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-[13px] font-medium shadow-[0_4px_16px_rgba(0,196,255,0.25)] hover:shadow-[0_8px_24px_rgba(0,196,255,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>{JOIN_CTA.primaryButton}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => handleNav('/start-a-project')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#00C4FF] text-[#0B132B] hover:text-[#0088CC] text-xs sm:text-[13px] font-medium shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>{JOIN_CTA.secondaryButton}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
