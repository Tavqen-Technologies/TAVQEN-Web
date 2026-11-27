import { useState, useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  initSmoothWheelScroll,
  registerGlobalScrollAnimations,
  scrollToTopInstant,
} from './utils/smoothScroll';
import Navbar from './components/Navbar';
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
import Home from './pages/Home';

export type AppRoute = 'home' | 'company' | 'services' | 'service-detail' | 'products' | 'product-detail' | 'work' | 'work-detail' | 'careers' | 'start-a-project';

export default function App() {
  const [route, setRoute] = useState<AppRoute>('home');
  const appRef = useRef<HTMLDivElement | null>(null);

  const parseCurrentRoute = (): AppRoute => {
    const rawPath = window.location.pathname.toLowerCase().replace(/\/$/, '');
    const rawHash = window.location.hash.toLowerCase().replace(/^#\/?/, '').split('?')[0];

    const target = rawHash || rawPath.replace(/^\//, '');

    if (target === 'company' || target === 'about') return 'company';
    if (target === 'services') return 'services';
    if (target === 'service' || target.startsWith('service/')) return 'service-detail';
    if (target === 'products') return 'products';
    if (target === 'product' || target.startsWith('product/')) return 'product-detail';
    if (target === 'our-work' || target === 'work') return 'work';
    if (target === 'work-detail' || target.includes('work-detail')) return 'work-detail';
    if (target === 'careers' || target === 'career') return 'careers';
    if (target === 'start-a-project' || target === 'project' || target === 'contact') return 'start-a-project';

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
    // Handle in-page anchor navigation on current route (e.g. #faq, #work, #products)
    if (path.startsWith('#') || (path.startsWith('/#') && route === 'home')) {
      const elementId = path.replace(/^(\/)?#/, '');
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    const clean = path.replace(/^\/?/, '').replace(/^#\/?/, '');
    const routePart = clean.split('?')[0];
    const newRoute = parseCurrentRouteFromString(routePart);

    // If target has in-page anchor on home (e.g. home#work or #services)
    if (newRoute === 'home' && routePart.includes('#')) {
      const anchor = routePart.split('#')[1];
      setRoute('home');
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return;
    }

    // Instantly reset scroll to top before mounting the new page to prevent opening mid-page
    scrollToTopInstant();
    setRoute(newRoute);

    if (window.history.pushState) {
      window.history.pushState(null, '', '/' + clean);
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      window.location.hash = clean;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  };

  const parseCurrentRouteFromString = (target: string): AppRoute => {
    if (target === 'company' || target === 'about') return 'company';
    if (target === 'services') return 'services';
    if (target === 'service' || target.startsWith('service/')) return 'service-detail';
    if (target === 'products') return 'products';
    if (target === 'product' || target.startsWith('product/')) return 'product-detail';
    if (target === 'our-work' || target === 'work') return 'work';
    if (target === 'work-detail' || target.includes('work-detail')) return 'work-detail';
    if (target === 'careers' || target === 'career') return 'careers';
    if (target === 'start-a-project' || target === 'project' || target === 'contact') return 'start-a-project';

    return 'home';
  };

  return (
    <div ref={appRef} className="min-h-screen bg-[#F8FAFC] selection:bg-[#00C4FF]/30 selection:text-[#0B132B] font-sans antialiased flex flex-col justify-between">
      <Navbar currentRoute={route} onNavigate={navigateTo} />
      <main className="flex-1">
        {route === 'home' && <Home onNavigate={navigateTo} />}

        {route === 'company' && <CompanyPage onNavigate={navigateTo} />}
        {route === 'services' && <ServicesPage onNavigate={navigateTo} />}
        {route === 'service-detail' && <ServiceDetailPage onNavigate={navigateTo} />}
        {route === 'products' && <ProductsPage onNavigate={navigateTo} />}
        {route === 'product-detail' && <ProductDetailPage onNavigate={navigateTo} />}
        {route === 'work' && <OurWorkPage onNavigate={navigateTo} />}
        {route === 'work-detail' && <WorkDetailPage onNavigate={navigateTo} />}
        {route === 'careers' && <Careers isFullPage onNavigate={navigateTo} />}
        {route === 'start-a-project' && <StartAProjectPage onNavigate={navigateTo} />}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}
