import tavqenLogo from '../assits/Tavqen-logo.png';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-[#E2E8F0] relative overflow-hidden">

      {/* Main Footer Links */}
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <button
                type="button"
                onClick={() => handleNav('/home')}
                className="inline-block mb-5 cursor-pointer border-none bg-transparent p-0"
              >
                <img
                  src={tavqenLogo}
                  alt="TAVQEN Technologies"
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </button>
              <p className="text-sm text-[#64748B] leading-relaxed max-w-sm mb-6 font-normal">
                TAVQEN Technologies is a digital technology studio engineering modern web applications, mobile experiences, and scalable SaaS platforms.
              </p>

              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569] font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Q1 & Q2 Projects</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-3">
              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#0B132B] hover:border-gray-400 flex items-center justify-center transition-all hover:scale-105"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#0088CC] hover:border-[#0088CC] flex items-center justify-center transition-all hover:scale-105"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#0B132B] hover:border-gray-400 flex items-center justify-center transition-all hover:scale-105"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company Column (Col 5-6) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B132B] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/home')}
                  className="text-[#64748B] hover:text-[#0088CC] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/company')}
                  className="text-[#64748B] hover:text-[#0088CC] transition-colors cursor-pointer"
                >
                  About TAVQEN
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/services')}
                  className="text-[#64748B] hover:text-[#0088CC] transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/products')}
                  className="text-[#64748B] hover:text-[#0088CC] transition-colors cursor-pointer"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/our-work')}
                  className="text-[#64748B] hover:text-[#0088CC] transition-colors cursor-pointer"
                >
                  Our Work
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/start-a-project')}
                  className="text-[#0088CC] font-semibold hover:text-[#00C4FF] transition-colors cursor-pointer"
                >
                  Start a Project
                </button>
              </li>
            </ul>
          </div>

          {/* Services Column (Col 7-9) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B132B] mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/services')}
                  className="text-[#64748B] hover:text-[#0088CC] transition-colors cursor-pointer text-left"
                >
                  Web Application Development
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/services')}
                  className="text-[#64748B] hover:text-[#0088CC] transition-colors cursor-pointer text-left"
                >
                  Mobile App Development (iOS & Android)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/services')}
                  className="text-[#64748B] hover:text-[#0088CC] transition-colors cursor-pointer text-left"
                >
                  SaaS Platform Engineering
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/services')}
                  className="text-[#64748B] hover:text-[#0088CC] transition-colors cursor-pointer text-left"
                >
                  Custom Software Architecture
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/services')}
                  className="text-[#64748B] hover:text-[#0088CC] transition-colors cursor-pointer text-left"
                >
                  UI/UX & Design Systems
                </button>
              </li>
            </ul>
          </div>

          {/* Products & Inquiries Column (Col 10-12) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B132B] mb-4">
              Products & Inquiries
            </h4>
            <ul className="space-y-2.5 text-sm mb-6">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/products')}
                  className="w-full text-[#64748B] hover:text-[#0088CC] transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>TAVQEN PDF</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-[#E0F7FF] text-[#0088CC]">App</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/products')}
                  className="w-full text-[#64748B] hover:text-[#0088CC] transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>TAVQEN Stream Player</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-[#FFE4ED] text-[#E11D48]">App</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/products')}
                  className="w-full text-[#64748B] hover:text-[#0088CC] transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>GramSetu</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-[#F0F9FF] text-[#0284C7]">Civic</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/start-a-project')}
                  className="w-full text-[#0088CC] font-semibold hover:text-[#00C4FF] transition-colors flex items-center justify-between cursor-pointer pt-1"
                >
                  <span>Inquire / Start a Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>

            <div className="pt-4 border-t border-[#E2E8F0] space-y-2 text-xs text-[#64748B]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0088CC]" />
                <a href="mailto:tavqentechnologies@gmail.com" className="hover:text-[#0B132B] transition-colors font-medium">
                  tavqentechnologies@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0088CC]" />
                <span>Indore, Madhya Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-16 pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>© {currentYear} TAVQEN Technologies Private Limited. All rights reserved.</p>

          <div className="flex items-center gap-6 font-medium">
            <button
              type="button"
              onClick={() => handleNav('/company')}
              className="hover:text-[#0B132B] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => handleNav('/company')}
              className="hover:text-[#0B132B] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => handleNav('/start-a-project')}
              className="hover:text-[#0B132B] transition-colors cursor-pointer"
            >
              Security
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
