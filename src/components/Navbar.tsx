import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import tavqenLogo from '../assits/Tavqen-logo.png';

interface NavbarProps {
  currentRoute?: 'home' | 'company' | 'services' | 'service-detail' | 'products' | 'product-detail' | 'work' | 'work-detail' | 'careers' | 'start-a-project';
  onNavigate?: (path: string) => void;
}

export default function Navbar({ currentRoute = 'home', onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('company');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

      setScrollProgress(progress);
      setIsScrolled(scrollY > 80);

      // Dynamic Section Detection mapped to menu links when on home page
      if (currentRoute === 'home') {
        const sectionElements = [
          { id: 'careers', menuId: 'careers' },
          { id: 'why', menuId: 'company' },
          { id: 'how', menuId: 'company' },
          { id: 'work', menuId: 'work' },
          { id: 'products', menuId: 'products' },
          { id: 'services', menuId: 'services' },
        ];

        let current = 'company';
        for (const item of sectionElements) {
          const el = document.getElementById(item.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.45) {
              current = item.menuId;
              break;
            }
          }
        }

        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentRoute]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentRoute]);

  const navLinks = [
    { name: 'Company', path: '/company', id: 'company' },
    { name: 'Services', path: '/services', id: 'services' },
    { name: 'SaaS Products', path: '/products', id: 'products' },
    { name: 'Our Work', path: '/our-work', id: 'work' },
    { name: 'Careers', path: '/careers', id: 'careers' },
  ];

  const handleNav = (path: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* TOP EDGE SCROLL PROGRESS BAR (Matches 123digi ScrollProgress) */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-[#0B132B]/[0.05] pointer-events-none"
      >
        <span
          className="block h-full origin-left bg-gradient-to-r from-[#00D4FF] to-[#0088CC] transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* FULL-WIDTH FIXED EDITORIAL HEADER WITH FROSTED GLASS ON SCROLL */}
      <header
        style={
          isScrolled
            ? {
                backdropFilter: 'blur(14px) saturate(140%)',
                WebkitBackdropFilter: 'blur(14px) saturate(140%)',
              }
            : undefined
        }
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/75 shadow-[0_8px_30px_rgba(11,19,43,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div
          className={`mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 transition-colors duration-300 ${
            isScrolled ? 'border-b border-[#0B132B]/10' : 'border-b border-transparent'
          }`}
        >
          {/* LEFT: Logo */}
          <button
            type="button"
            onClick={() => handleNav('/home')}
            className="group flex items-center gap-3 cursor-pointer border-none bg-transparent p-0 shrink-0"
            aria-label="TAVQEN home"
          >
            <img
              src={tavqenLogo}
              alt="TAVQEN"
              className="h-7 md:h-8 lg:h-9 w-auto object-contain group-hover:opacity-90 transition-opacity"
            />
          </button>

          {/* CENTER: Uppercase Tracked Links with Animated Underline Slide */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-7 xl:gap-8">
            {navLinks.map((link) => {
              const isActive =
                currentRoute === link.id ||
                (currentRoute === 'service-detail' && link.id === 'services') ||
                (currentRoute === 'product-detail' && link.id === 'products') ||
                (currentRoute === 'home' && activeSection === link.id);

              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleNav(link.path)}
                  className={`group relative text-[10.5px] lg:text-[12px] uppercase tracking-[0.12em] lg:tracking-[0.2em] whitespace-nowrap transition-colors duration-300 py-1 cursor-pointer border-none bg-transparent ${
                    isActive
                      ? 'font-bold text-[#0B132B]'
                      : 'font-medium text-[#0B132B]/65 hover:text-[#0B132B]'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[1.5px] w-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Glass Outline-to-Signal Pill CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => handleNav('/start-a-project')}
              className={`group relative hidden sm:inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 lg:px-6 lg:py-3 text-[10.5px] lg:text-[11px] uppercase tracking-[0.14em] lg:tracking-[0.2em] font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                currentRoute === 'start-a-project'
                  ? 'border-[#0088CC] bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white shadow-[0_8px_24px_rgba(0,196,255,0.28)]'
                  : 'border-[#0B132B]/20 bg-white/60 text-[#0B132B] backdrop-blur-sm hover:border-[#00C4FF] hover:bg-gradient-to-r hover:from-[#00D4FF] hover:to-[#0088CC] hover:text-white hover:shadow-[0_8px_24px_rgba(0,196,255,0.28)]'
              }`}
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>

            {/* 2-Line Editorial Hamburger Trigger (Matches 123digi mobile menu button) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-[#0B132B]/20 bg-white/80 backdrop-blur-sm text-[#0B132B] md:hidden cursor-pointer shrink-0 transition-colors hover:border-[#00C4FF]"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Menu</span>
              <span
                className={`absolute h-[1.5px] w-4 bg-[#0B132B] transition-transform duration-300 ${
                  isMobileMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-1'
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-4 bg-[#0B132B] transition-transform duration-300 ${
                  isMobileMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-VIEWPORT DRAWER OVERLAY */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 pb-8 px-6 md:hidden flex flex-col justify-between animate-in fade-in duration-200 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
            {navLinks.map((link, idx) => {
              const isActive =
                currentRoute === link.id ||
                (currentRoute === 'service-detail' && link.id === 'services') ||
                (currentRoute === 'product-detail' && link.id === 'products') ||
                (currentRoute === 'home' && activeSection === link.id);

              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleNav(link.path)}
                  className="w-full py-5 flex items-center justify-between text-left cursor-pointer border-none bg-transparent group"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold text-[#0088CC]">
                      0{idx + 1}
                    </span>
                    <span
                      className={`text-xl font-bold tracking-tight transition-colors ${
                        isActive ? 'text-[#0088CC]' : 'text-[#0B132B] group-hover:text-[#0088CC]'
                      }`}
                    >
                      {link.name}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                      isActive ? 'text-[#0088CC]' : 'text-[#94A3B8]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="pt-8 space-y-4">
            <button
              type="button"
              onClick={() => handleNav('/start-a-project')}
              className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-[0_10px_28px_rgba(0,196,255,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center font-mono text-[11px] uppercase tracking-widest text-[#64748B]">
              TAVQEN Technologies · Software &amp; Product Studio
            </p>
          </div>
        </div>
      )}
    </>
  );
}
