import HeroSection from '../components/Hero';
import ServicesSection from '../components/WhatWeBuild';
import ProductsSection from '../components/OurProducts';
import OurWork from '../components/RecentWork';
import WhyChooseUs from '../components/WhyTavqen';
import AboutSection from '../components/HowTavqen';
import TestimonialsSection from '../components/Testimonials';
import FAQSection from '../components/FAQ';

export interface HomeProps {
  onNavigate?: (path: string) => void;
}

/**
 * Main Home Page Component
 * Manages and renders all core Home Page sections in modular order.
 */
export default function Home({ onNavigate }: HomeProps) {
  return (
    <>
      <HeroSection />
      <ServicesSection limit={2} onNavigate={onNavigate} />
      <ProductsSection limit={2} />
      <OurWork onNavigate={onNavigate} />
      <WhyChooseUs />
      <AboutSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}

// Re-export individual sections for modularity and maintainability
export {
  HeroSection,
  ServicesSection,
  ProductsSection,
  OurWork,
  WhyChooseUs,
  AboutSection,
  TestimonialsSection,
  FAQSection,
};
