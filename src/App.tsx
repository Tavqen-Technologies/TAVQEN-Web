import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatWeBuild from './components/WhatWeBuild';
import OurProducts from './components/OurProducts';
import RecentWork from './components/RecentWork';
import WhyTavqen from './components/WhyTavqen';
import HowTavqen from './components/HowTavqen';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

// DEDICATED SEPARATE PAGES
import CompanyPage from './pages/CompanyPage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import OurWorkPage from './pages/OurWorkPage';
import StartAProjectPage from './pages/StartAProjectPage';

export type AppRoute = 'home' | 'company' | 'services' | 'products' | 'work' | 'start-a-project';

export default function App() {
  const [route, setRoute] = useState<AppRoute>('home');

  // Parse path from either pathname (e.g. /company) or hash (e.g. #/company)
  const parseCurrentRoute = (): AppRoute => {
    const rawPath = window.location.pathname.toLowerCase().replace(/\/$/, '');
    const rawHash = window.location.hash.toLowerCase().replace(/^#\/?/, '');

    const target = rawHash || rawPath.replace(/^\//, '');

    if (target === 'company') return 'company';
    if (target === 'services') return 'services';
    if (target === 'products') return 'products';
    if (target === 'our-work' || target === 'work') return 'work';
    if (target === 'start-a-project' || target === 'project') return 'start-a-project';

    return 'home';
  };

  useEffect(() => {
    const handleLocationChange = () => {
      const active = parseCurrentRoute();
      setRoute(active);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Initial check
    handleLocationChange();

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    const clean = path.replace(/^\/?/, '').replace(/^#\/?/, '');
    const newRoute = parseCurrentRouteFromString(clean);

    setRoute(newRoute);

    // Update history state smoothly
    if (window.history.pushState) {
      window.history.pushState(null, '', `/${clean}`);
    } else {
      window.location.hash = clean;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const parseCurrentRouteFromString = (target: string): AppRoute => {
    if (target === 'company') return 'company';
    if (target === 'services') return 'services';
    if (target === 'products') return 'products';
    if (target === 'our-work' || target === 'work') return 'work';
    if (target === 'start-a-project' || target === 'project') return 'start-a-project';
    return 'home';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-[#00C4FF]/30 selection:text-[#0B132B] font-sans antialiased flex flex-col justify-between">
      {/* GLOBAL NAVBAR */}
      <Navbar currentRoute={route} onNavigate={navigateTo} />

      {/* MAIN ROUTED CONTENT */}
      <main className="flex-1">
        {/* ========================================================= */}
        {/* HOME PAGE: Main Overview                                  */}
        {/* Order: Navbar -> Hero -> Services -> Products ->         */}
        {/* Recent Work -> Why TAVQEN -> How TAVQEN -> Testimonials   */}
        {/* -> FAQ -> Footer                                          */}
        {/* ========================================================= */}
        {route === 'home' && (
          <>
            {/* HERO SECTION */}
            <Hero />

            {/* SERVICES SECTION (Home shows top 2 services + Explore All) */}
            <WhatWeBuild limit={2} />

            {/* PRODUCTS SECTION (Home shows top 2 products + Explore All) */}
            <OurProducts limit={2} />

            {/* RECENT WORK SECTION (Home shows top 2 projects) */}
            <RecentWork limit={2} />

            {/* WHY TAVQEN SECTION (Interactive smooth scroll process) */}
            <WhyTavqen />

            {/* HOW TAVQEN SECTION (4-step Discover, Design, Build, Evolve) */}
            <HowTavqen />

            {/* CLIENT REVIEWS (Stacked card deck matching design) */}
            <Testimonials />

            {/* FAQ SECTION (Accordion) */}
            <FAQ />
          </>
        )}

        {/* ========================================================= */}
        {/* SEPARATE DEDICATED PAGES                                  */}
        {/* ========================================================= */}

        {/* 1. COMPANY PAGE (/company) */}
        {route === 'company' && <CompanyPage onNavigate={navigateTo} />}

        {/* 2. SERVICES PAGE (/services) */}
        {route === 'services' && <ServicesPage onNavigate={navigateTo} />}

        {/* 3. PRODUCTS PAGE (/products) */}
        {route === 'products' && <ProductsPage onNavigate={navigateTo} />}

        {/* 4. OUR WORK PAGE (/our-work) */}
        {route === 'work' && <OurWorkPage onNavigate={navigateTo} />}

        {/* 5. START A PROJECT PAGE (/start-a-project) */}
        {route === 'start-a-project' && <StartAProjectPage onNavigate={navigateTo} />}
      </main>

      {/* GLOBAL FOOTER */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
