import { ArrowLeft } from 'lucide-react';
import { CLIENT_PROJECTS, type ClientProject } from '../data/clientProjectsData';

interface WorkDetailPageProps {
  projectId?: string;
  onNavigate?: (path: string) => void;
}

export default function WorkDetailPage({ projectId, onNavigate }: WorkDetailPageProps) {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : '';
  const currentHash = typeof window !== 'undefined' ? window.location.hash.toLowerCase() : '';
  const urlParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('project') : null;

  const project: ClientProject =
    CLIENT_PROJECTS.find(
      (p) =>
        p.id === projectId ||
        (urlParam && (p.id === urlParam || p.link.includes(urlParam))) ||
        (currentPath && currentPath.includes(p.link.toLowerCase())) ||
        (currentHash && currentHash.includes(p.link.toLowerCase().replace(/^\//, '')))
    ) || CLIENT_PROJECTS[0];

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#F8FAFC] border-t border-[#E2E8F0] relative min-h-screen py-24 sm:py-28 lg:py-32">
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          type="button"
          onClick={() => handleNav('/our-work')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Our Work</span>
        </button>

        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            {project.category}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-[52px] font-medium tracking-tight text-[#0B132B] leading-[1.12]">
            {project.title}
          </h1>
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] text-[#64748B] font-normal leading-relaxed max-w-2xl mx-auto">
            {project.description}
          </p>
        </div>

        {/* Project Visual & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 sm:px-4 lg:px-8 items-center mb-14">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-bold text-[#0088CC] tabular-nums">
                  Project {project.number}
                </span>
                <span className="text-[#CBD5E1]">·</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  {project.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight leading-snug mb-3">
                {project.title}
              </h3>

              <p className="text-[14px] text-[#64748B] leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Impact Callout */}
              <div className="p-3.5 rounded-xl bg-[#F0F9FF] border border-[#00C4FF]/30 mb-5">
                <span className="text-[10px] font-bold text-[#0088CC] uppercase tracking-wider block mb-1">
                  Key Impact
                </span>
                <p className="text-sm font-semibold text-[#0B132B]">
                  {project.impact}
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-2">
                  Technology Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-[11.5px] sm:text-xs font-medium bg-white border border-[#E2E8F0] text-[#111111] shadow-2xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full h-[320px] sm:h-[400px] lg:h-[440px] rounded-[22px] overflow-hidden border border-black/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.08)] bg-[#F1F5F9] group relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Detailed Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14 max-w-4xl mx-auto">
          {project.stats.map((s, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs text-center">
              <span className="text-2xl sm:text-3xl font-bold text-[#0B132B] tabular-nums block mb-1">
                {s.value}
              </span>
              <span className="text-xs text-[#64748B] font-medium">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#00D4FF]/10 via-[#0088CC]/10 to-transparent p-8 sm:p-10 border border-[#00C4FF]/20 text-center flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#0B132B] mb-3">
            Ready to build a solution like {project.title}?
          </h3>
          <p className="text-[#64748B] text-sm sm:text-base max-w-lg mb-6">
            Let's collaborate to design and engineer a world-class digital product for your business.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleNav('/start-a-project')}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-sm font-medium shadow-[0_8px_25px_rgba(0,196,255,0.25)] hover:scale-[1.02] transition-all cursor-pointer"
            >
              Start a Project
            </button>
            <button
              type="button"
              onClick={() => handleNav('/our-work')}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white border border-[#E2E8F0] text-gray-700 text-xs sm:text-sm font-medium hover:text-black transition-all cursor-pointer"
            >
              Explore All Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
