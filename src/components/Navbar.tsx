import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import tavqenLogo from '../assits/Tavqen-logo.png';

interface NavbarProps {
  currentRoute?: 'home' | 'company' | 'services' | 'products' | 'work' | 'start-a-project';
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
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;

      setScrollProgress(progress);
      setIsScrolled(scrollY > 20);

      // Dynamic Section Detection mapped to menu links when on home page
      if (currentRoute === 'home') {
        const sectionElements = [
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

  // NAVBAR MENU ITEMS
  const navLinks = [
    { name: 'Company', path: '/company', id: 'company' },
    { name: 'Services', path: '/services', id: 'services' },
    { name: 'SaaS Products', path: '/products', id: 'products' },
    { name: 'Our Work', path: '/our-work', id: 'work' },
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
    <header className="fixed top-3.5 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8 pointer-events-none">
      {/* Floating Pill Capsule aligned to Global Layout Container (max-w-[1180px]) */}
      <div
        style={{
          transform: isScrolled ? 'translateY(3px)' : 'translateY(0px)',
        }}
        className={`pointer-events-auto w-full max-w-[1180px] rounded-full transition-all duration-400 ease-out px-5 py-2.5 sm:px-7 sm:py-3 flex items-center justify-between border relative overflow-hidden ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-black/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.08)]'
            : 'bg-white/90 backdrop-blur-md border-black/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.05)]'
        }`}
      >
        {/* Subtle Ambient Glowing Progress Track along Bottom Edge */}
        <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-black/[0.04] rounded-full overflow-hidden pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-[#00D4FF] via-[#0088CC] to-[#00D4FF] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(0,196,255,0.8)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* LEFT: Logo */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => handleNav('/home')}
            className="flex items-center group cursor-pointer select-none border-none bg-transparent p-0"
          >
            <img
              src={tavqenLogo}
              alt="TAVQEN"
              className="h-6 sm:h-7.5 w-auto object-contain hover:opacity-90 transition-opacity"
            />
          </button>
        </div>

        {/* CENTER: Navigation Links with Dynamic Active Indicator */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive =
              currentRoute === link.id || (currentRoute === 'home' && activeSection === link.id);

            return (
              <button
                key={link.name}
                type="button"
                onClick={() => handleNav(link.path)}
                className={`text-[13.5px] transition-colors relative py-1 select-none cursor-pointer border-none bg-transparent ${
                  isActive
                    ? 'font-semibold text-[#0088CC]'
                    : 'font-normal text-[#121212]/80 hover:text-[#121212]'
                }`}
              >
                {link.name}

                {/* Smooth Glowing Cyan Active Line */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gradient-to-r from-[#00D4FF] to-[#0088CC] rounded-full shadow-[0_0_8px_rgba(0,196,255,0.8)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Start a project Pill CTA */}
          <button
            type="button"
            onClick={() => handleNav('/start-a-project')}
            className={`inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-white text-xs sm:text-[13.5px] font-medium shadow-[0_8px_25px_rgba(0,196,255,0.25)] hover:shadow-[0_10px_30px_rgba(0,196,255,0.35)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer ${
              currentRoute === 'start-a-project'
                ? 'bg-gradient-to-r from-[#0088CC] to-[#00C4FF] ring-2 ring-[#00C4FF]'
                : 'bg-gradient-to-r from-[#00D4FF] to-[#0088CC]'
            }`}
          >
            Start a Project
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-gray-700 hover:text-black hover:bg-gray-100 transition-colors focus:outline-hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MODAL */}
      {isMobileMenuOpen && (
        <div className="pointer-events-auto absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-2xl border border-black/[0.08] shadow-2xl p-5 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                currentRoute === link.id || (currentRoute === 'home' && activeSection === link.id);

              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleNav(link.path)}
                  className={`w-full px-3 py-2.5 rounded-xl text-sm transition-colors flex items-center justify-between text-left cursor-pointer border-none ${
                    isActive
                      ? 'bg-[#E0F7FF] text-[#0088CC] font-semibold'
                      : 'bg-transparent text-gray-700 hover:text-black hover:bg-gray-100 font-medium'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0088CC]" />
                  )}
                </button>
              );
            })}

            <div className="pt-3 border-t border-gray-100 mt-1 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleNav('/start-a-project')}
                className="w-full flex items-center justify-center py-3 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white text-sm font-semibold shadow-xs cursor-pointer"
              >
                <span>Start a Project</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
