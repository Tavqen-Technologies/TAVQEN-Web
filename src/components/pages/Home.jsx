import HeroSection from '../Hero';
import ServicesSection from '../WhatWeBuild';
import ProductsSection from '../OurProducts';
import OurWork from '../RecentWork';
import WhyChooseUs from '../WhyTavqen';
import AboutSection from '../HowTavqen';
import TestimonialsSection from '../Testimonials';
import FAQSection from '../FAQ';

/**
 * Home Component
 * Parent component that manages and renders all Home Page sections in clean modular order.
 * 
 * Sections included:
 * - HeroSection
 * - ServicesSection
 * - ProductsSection
 * - OurWork
 * - WhyChooseUs
 * - AboutSection
 * - TestimonialsSection
 * - FAQSection
 */
export default function Home({ onNavigate }) {
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
