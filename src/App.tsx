import { useState, useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  initSmoothWheelScroll,
  registerGlobalScrollAnimations,
  scrollToTopInstant,
} from './utils/smoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatWeBuild from './components/WhatWeBuild';
import OurProducts from './components/OurProducts';
import RecentWork from './components/RecentWork';
import WhyTavqen from './components/WhyTavqen';
import HowTavqen from './components/HowTavqen';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Careers from './components/Careers';
import Footer from './components/Footer';

import CompanyPage from './pages/CompanyPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OurWorkPage from './pages/OurWorkPage';
import StartAProjectPage from './pages/StartAProjectPage';
import WorkDetailPage from './pages/WorkDetailPage';

export type AppRoute = 'home' | 'company' | 'services' | 'service-detail' | 'products' | 'product-detail' | 'work' | 'work-detail' | 'careers' | 'start-a-project';

export default function App() {
  const [route, setRoute] = useState<AppRoute>('home');
  const appRef = useRef<HTMLDivElement | null>(null);

  const parseCurrentRoute = (): AppRoute => {
    const rawPath = window.location.pathname.toLowerCase().replace(/\/$/, '');
    const rawHash = window.location.hash.toLowerCase().replace(/^#\/?/, '').split('?')[0];

    const target = rawHash || rawPath.replace(/^\//, '');

    if (target === 'company') return 'company';
    if (target === 'services') return 'services';
    if (target === 'service' || target.startsWith('service/')) return 'service-detail';
    if (target === 'products') return 'products';
    if (target === 'product' || target.startsWith('product/')) return 'product-detail';
    if (target === 'our-work' || target === 'work') return 'work';
    if (target === 'work-detail' || target.includes('work-detail')) return 'work-detail';
    if (target === 'careers' || target === 'career') return 'careers';
    if (target === 'start-a-project' || target === 'project') return 'start-a-project';

    return 'home';
  };

  useEffect(() => {
    const cleanupSmoothWheel = initSmoothWheelScroll();

    const handleLocationChange = () => {
      const active = parseCurrentRoute();
      setRoute(active);
      scrollToTopInstant();
    };

    handleLocationChange();

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      cleanupSmoothWheel();
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    const cleanupAnimations = registerGlobalScrollAnimations(appRef.current);
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      window.clearTimeout(refreshTimer);
      cleanupAnimations();
    };
  }, [route]);

  const navigateTo = (path: string) => {
    const clean = path.replace(/^\/?/, '').replace(/^#\/?/, '');
    const routePart = clean.split('?')[0];
    const newRoute = parseCurrentRouteFromString(routePart);

    if (window.history.pushState) {
      window.history.pushState(null, '', '/' + clean);
    } else {
      window.location.hash = clean;
    }

    setRoute(newRoute);
    scrollToTopInstant();
  };

  const parseCurrentRouteFromString = (target: string): AppRoute => {
    if (target === 'company') return 'company';
    if (target === 'services') return 'services';
    if (target === 'service' || target.startsWith('service/')) return 'service-detail';
    if (target === 'products') return 'products';
    if (target === 'product' || target.startsWith('product/')) return 'product-detail';
    if (target === 'our-work' || target === 'work') return 'work';
    if (target === 'work-detail' || target.includes('work-detail')) return 'work-detail';
    if (target === 'careers' || target === 'career') return 'careers';
    if (target === 'start-a-project' || target === 'project') return 'start-a-project';

    return 'home';
  };

  return (
    <div ref={appRef} className="min-h-screen bg-[#F8FAFC] selection:bg-[#00C4FF]/30 selection:text-[#0B132B] font-sans antialiased flex flex-col justify-between">
      <Navbar currentRoute={route} onNavigate={navigateTo} />
      <main className="flex-1">
        {route === 'home' && (
          <>
            <Hero />
            <WhatWeBuild limit={2} onNavigate={navigateTo} />
            <OurProducts limit={2} onNavigate={navigateTo} />
            <RecentWork onNavigate={navigateTo} />
            <WhyTavqen />
            <HowTavqen />
            <Testimonials />
            <FAQ />
            <Careers onNavigate={navigateTo} />
          </>
        )}

        {route === 'company' && <CompanyPage onNavigate={navigateTo} />}
        {route === 'services' && <ServicesPage onNavigate={navigateTo} />}
        {route === 'service-detail' && <ServiceDetailPage onNavigate={navigateTo} />}
        {route === 'products' && <ProductsPage onNavigate={navigateTo} />}
        {route === 'product-detail' && <ProductDetailPage onNavigate={navigateTo} />}
        {route === 'work' && <OurWorkPage onNavigate={navigateTo} />}
        {route === 'work-detail' && <WorkDetailPage />}
        {route === 'careers' && <Careers isFullPage onNavigate={navigateTo} />}
        {route === 'start-a-project' && <StartAProjectPage onNavigate={navigateTo} />}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}
