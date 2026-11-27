import { TAVQEN_PRODUCTS } from '../data/productsData';

interface ProjectDisplayItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  alt: string;
  link: string;
}

const ALL_PROJECTS: ProjectDisplayItem[] = TAVQEN_PRODUCTS.map((prod) => ({
  id: prod.id,
  title: `${prod.name} — ${prod.tagline}`,
  category: prod.categoryLabel,
  description: prod.overview,
  tags: prod.features.slice(0, 3).map((f) => f.title),
  image: prod.image,
  alt: prod.alt,
  link: `/product?id=${prod.id}`,
}));

interface WorkDetailPageProps {
  projectId?: string;
  onNavigate?: (path: string) => void;
}

export default function WorkDetailPage({ projectId, onNavigate }: WorkDetailPageProps) {
  const id = projectId || ALL_PROJECTS[0]?.id || 'pdf';
  const project = ALL_PROJECTS.find((p) => p.id === id) || ALL_PROJECTS[0];

  if (!project) {
    return (
      <section className="bg-[#F8FAFC] min-h-screen py-24 sm:py-28 lg:py-32 flex items-center justify-center p-4">
        <div className="max-w-3xl text-center">
          <h1 className="text-3xl sm:text-4xl font-medium text-[#0B132B] mb-4">Loading Project...</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F8FAFC] border-t border-[#E2E8F0] relative min-h-screen py-24 sm:py-28 lg:py-32">
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3.5">
            Portfolio & Case Studies
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-[56px] font-medium tracking-tight text-[#0B132B] leading-[1.12]">
            {project.title}
          </h1>
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] text-[#64748B] font-normal leading-relaxed max-w-2xl mx-auto">
            {project.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 sm:px-7 lg:px-12 items-center">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#E0F7FF] text-[#0088CC] text-xs font-bold font-mono uppercase tracking-wider">
                  {project.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight leading-snug mb-3">
                {project.title}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
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
          </div>

          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full h-[360px] sm:h-[440px] lg:h-[480px] rounded-[24px] overflow-hidden border border-black/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.08)] bg-[#F1F5F9] group relative">
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

        {/* Bottom CTA Card */}
        <div className="mt-16 sm:mt-20 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#00D4FF]/10 via-[#0088CC]/10 to-transparent p-8 sm:p-10 border border-[#00C4FF]/20 text-center flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#0B132B] mb-3">
            Have a project in mind?
          </h3>
          <p className="text-[#64748B] text-sm sm:text-base max-w-lg mb-6">
            Let's collaborate to design and engineer a world-class digital experience.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/start-a-project');
                } else {
                  window.location.hash = '/start-a-project';
                }
              }}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs sm:text-sm font-medium shadow-[0_8px_25px_rgba(0,196,255,0.25)] hover:scale-[1.02] transition-all cursor-pointer"
            >
              Start a Project
            </button>
            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/home');
                } else {
                  window.location.hash = '/home';
                }
              }}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white border border-[#E2E8F0] text-gray-700 text-xs sm:text-sm font-medium hover:text-black transition-all cursor-pointer"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
