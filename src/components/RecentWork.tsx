import { ArrowRight } from 'lucide-react';

import product1 from '../assits/products/product1.webp';
import product2 from '../assits/products/product2.webp';
import product3 from '../assits/products/product3.webp';
import product4 from '../assits/products/product4.webp';

export interface ProjectItem {
  id: string;
  title: string;
  category?: string;
  description: string;
  tags: string[];
  image: string;
  alt: string;
  link: string;
  aspectClass: string; // Dynamic height to create exact screenshot asymmetry
}

const ALL_PROJECTS: { col1: ProjectItem[]; col2: ProjectItem[] } = {
  col1: [
    {
      id: 'busypixel',
      title: 'BusyPixel',
      category: 'Web Application · Marketing',
      description:
        'A modern influencer marketing platform, designed and built end to end.',
      tags: ['UI/UX', 'Web Dev', 'Marketing'],
      image: product1,
      alt: 'BusyPixel Monitor Setup Showcase',
      link: '#project',
      // Shorter aspect ratio (matching screenshot top-left)
      aspectClass: 'h-[320px] sm:h-[380px] md:h-[400px]',
    },
    {
      id: 'alpha',
      title: 'Alpha',
      category: 'Mobile App · EdTech',
      description: 'A smarter learning experience built for students.',
      tags: ['UI/UX', 'Mobile App', 'Product Design'],
      image: product3,
      alt: 'Alpha Mobile Experience Showcase',
      link: '#project',
      // Taller aspect ratio (matching screenshot bottom-left)
      aspectClass: 'h-[440px] sm:h-[500px] md:h-[540px]',
    },
  ],
  col2: [
    {
      id: 'noisy-them',
      title: 'Noisy Them',
      category: 'SaaS Platform · Creators',
      description: 'A creator-first platform for influencer marketing.',
      tags: ['Branding', 'UI/UX', 'Web Design'],
      image: product4,
      alt: 'Noisy Them Laptop Showcase',
      link: '#project',
      // Taller aspect ratio (matching screenshot top-right)
      aspectClass: 'h-[420px] sm:h-[480px] md:h-[520px]',
    },
    {
      id: 'frootreet',
      title: 'Frootreet',
      category: 'Web Experience · E-Commerce',
      description:
        'A playful digital experience for a premium ice cream brand.',
      tags: ['Branding', 'Web Design', 'UI/UX'],
      image: product2,
      alt: 'Frootreet Laptop Showcase',
      link: '#project',
      // Shorter aspect ratio (matching screenshot bottom-right)
      aspectClass: 'h-[320px] sm:h-[380px] md:h-[400px]',
    },
  ],
};

interface ProjectCardProps {
  project: ProjectItem;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a href={project.link} className="group block select-none">
      {/* Visual Image Container (Rounded-3xl, shadow, hover scale) */}
      <div
        className={`w-full ${project.aspectClass} rounded-[28px] sm:rounded-[34px] overflow-hidden bg-white border border-black/[0.07] shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(0,196,255,0.16)] hover:-translate-y-1.5 transition-all duration-500 relative cursor-pointer`}
      >
        <img
          src={project.image}
          alt={project.alt}
          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Soft Ambient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Text Info Below Image (Directly on canvas matching screenshot) */}
      <div className="mt-4 sm:mt-5 px-1">
        <h3 className="text-xl sm:text-[22px] font-bold text-[#0B132B] tracking-tight group-hover:text-[#0088CC] transition-colors leading-snug">
          {project.title}
        </h3>
        <p className="mt-1 text-[13.5px] sm:text-[14px] text-[#64748B] leading-relaxed max-w-md font-normal">
          {project.description}
        </p>

        {/* Pill Badges */}
        <div className="mt-3.5 flex flex-wrap gap-2">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full text-[11.5px] sm:text-xs font-medium bg-white border border-[#E2E8F0] text-[#111111] shadow-2xs group-hover:border-[#00C4FF]/40 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export interface RecentWorkProps {
  limit?: number;
  isFullPage?: boolean;
}

export default function RecentWork({ limit, isFullPage = false }: RecentWorkProps) {
  // If limit is 2 (for Home page):
  // Col 1 gets 1 item (BusyPixel: shorter)
  // Col 2 gets 1 item (Noisy Them: taller)
  const isLimited = limit === 2;
  const col1Projects = isLimited
    ? [ALL_PROJECTS.col1[0]]
    : ALL_PROJECTS.col1;
  const col2Projects = isLimited
    ? [ALL_PROJECTS.col2[0]]
    : ALL_PROJECTS.col2;

  return (
    <section
      id="work"
      className={`bg-[#F8FAFC] border-t border-[#E2E8F0] relative ${
        isFullPage ? 'pt-28 sm:pt-36 pb-20 sm:pb-28' : 'py-20 sm:py-24 lg:py-28'
      }`}
    >
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home Breadcrumb for Full Page View */}
        {isFullPage && (
          <div className="mb-6 sm:mb-8">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors"
            >
              <span>← Back to Home</span>
            </a>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION HEADER (Exact screenshot layout & typography)     */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0B132B] leading-[1.12]">
              Recent work
            </h2>
            <p className="mt-2.5 text-[14px] sm:text-[15px] text-[#64748B] font-normal leading-relaxed">
              Websites, products and brands we have designed and built.
            </p>
          </div>

          <div className="pt-1 sm:pt-2">
            <a
              href="/our-work"
              className="text-xs sm:text-[13px] font-semibold text-[#0B132B] hover:text-[#0088CC] underline underline-offset-4 decoration-black/20 hover:decoration-[#0088CC] transition-all inline-flex items-center gap-1 group"
            >
              <span>See all case studies</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#0088CC]" />
            </a>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2-COLUMN ASYMMETRIC MASONRY GRID (Screenshot exact match) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* COLUMN 1 */}
          <div className="space-y-10 sm:space-y-12">
            {col1Projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* COLUMN 2 */}
          <div className="space-y-10 sm:space-y-12">
            {col2Projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* HOME SECTION: EXPLORE ALL BUTTON                          */}
        {/* ========================================================= */}
        {isLimited && (
          <div className="mt-14 sm:mt-18 flex flex-col items-center justify-center text-center">
            <a
              href="/our-work"
              className="
                inline-flex items-center gap-2.5
                px-7 sm:px-8 py-3 sm:py-3.5
                rounded-full
                bg-white border border-[#E2E8F0]
                text-[#0B132B] text-xs sm:text-[13.5px] font-semibold
                shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                hover:border-[#0088CC] hover:text-[#0088CC] hover:shadow-[0_8px_25px_rgba(0,196,255,0.15)]
                hover:scale-[1.02] active:scale-95
                transition-all group
              "
            >
              <span>Explore All Case Studies</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#0088CC]" />
            </a>
          </div>
        )}

        {/* ========================================================= */}
        {/* FULL PAGE VIEW: CALL TO ACTION BANNER                     */}
        {/* ========================================================= */}
        {isFullPage && (
          <div className="mt-16 sm:mt-20 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#00D4FF]/10 via-[#0088CC]/10 to-transparent p-8 sm:p-10 border border-[#00C4FF]/20 text-center flex flex-col items-center">
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#0B132B] mb-3">
              Have a project in mind?
            </h3>
            <p className="text-[#64748B] text-sm sm:text-base max-w-lg mb-6">
              Let&apos;s collaborate to design and engineer a world-class digital experience.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#project"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-sm font-medium shadow-[0_8px_25px_rgba(0,196,255,0.25)] hover:scale-[1.02] transition-all"
              >
                Start a Project
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white border border-[#E2E8F0] text-gray-700 text-xs sm:text-sm font-medium hover:text-black transition-all"
              >
                Return to Home
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
