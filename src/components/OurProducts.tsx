import { useRef } from 'react';
import { ChevronLeft, ChevronRight, FileText, Play, Image as ImageIcon, ArrowRight } from 'lucide-react';

import pdfImg from '../assits/products/product1.webp';
import playerImg from '../assits/products/product2.webp';
import gramsetuImg from '../assits/products/product3.webp';
import mobileImg from '../assits/mobile.avif';
import websiteImg from '../assits/website.avif';
import saasImg from '../assits/saas product.avif';

interface PhoneCard {
  line1: string;
  line2: string;
  badge: string;
  titleColor: string;
  image: string;
}

interface ProductShowcase {
  id: string;
  name: string;
  category: string;
  description: string;
  iconBg: string;
  iconColor: string;
  icon: typeof FileText;
  appStoreUrl: string;
  playStoreUrl: string;
  phones: PhoneCard[];
}

const PRODUCTS: ProductShowcase[] = [
 {
  id: 'tavqen-pdf',
  name: 'TAVQEN PDF',
  category: 'Mobile App · Productivity',
  description:
    'A powerful document solution built to make scanning, editing, converting, signing, and managing PDFs faster and easier — all from one seamless platform.',
  iconBg: 'bg-gradient-to-br from-[#9BE3DF] to-[#0088CC]',
  iconColor: 'text-white',
  icon: FileText,
  appStoreUrl: '#contact',
  playStoreUrl: '#contact',
  phones: [
    {
      line1: 'AI-Powered',
      line2: 'Document Scanner',
      badge: 'Smart OCR',
      titleColor: 'text-[#0088CC]',
      image: mobileImg,
    },
    {
      line1: 'High Quality',
      line2: 'PDF Export',
      badge: '300 DPI',
      titleColor: 'text-[#0B132B]',
      image: pdfImg,
    },
    {
      line1: 'Smart Sign',
      line2: '& Form Filling',
      badge: 'e-Sign Ready',
      titleColor: 'text-[#0088CC]',
      image: websiteImg,
    },
    {
      line1: 'Secure Cloud',
      line2: 'Document Vault',
      badge: 'Encrypted',
      titleColor: 'text-[#0B132B]',
      image: saasImg,
    },
    {
      line1: 'Batch PDF',
      line2: 'Split & Merge',
      badge: 'Fast Processing',
      titleColor: 'text-[#0088CC]',
      image: pdfImg,
    },
    {
      line1: 'Smart Text',
      line2: 'Extraction',
      badge: 'OCR Powered',
      titleColor: 'text-[#0B132B]',
      image: mobileImg,
    },
  ],
},

{
  id: 'tavqen-v-player',
  name: 'TAVQEN V Player',
  category: 'Mobile App · Entertainment',
  description:
    'A modern video player built for smooth, reliable playback with broad format support, smart controls, subtitle support, and a seamless viewing experience.',
  iconBg: 'bg-gradient-to-br from-[#FFE4ED] via-[#FDA4AF] to-[#E11D48]',
  iconColor: 'text-white',
  icon: Play,
  appStoreUrl: '#contact',
  playStoreUrl: '#contact',
  phones: [
    {
      line1: 'Ultra HD',
      line2: '4K / 8K Playback',
      badge: 'High Quality',
      titleColor: 'text-[#E11D48]',
      image: playerImg,
    },
    {
      line1: 'Universal',
      line2: 'Video Support',
      badge: 'Multi Format',
      titleColor: 'text-[#0B132B]',
      image: mobileImg,
    },
    {
      line1: 'Smart Subtitle',
      line2: 'Sync',
      badge: 'Auto Match',
      titleColor: 'text-[#E11D48]',
      image: playerImg,
    },
    {
      line1: 'Smooth Gesture',
      line2: 'Controls',
      badge: 'Touch Ready',
      titleColor: 'text-[#0B132B]',
      image: websiteImg,
    },
    {
      line1: 'Picture in Picture',
      line2: 'Background Play',
      badge: 'PiP Ready',
      titleColor: 'text-[#E11D48]',
      image: playerImg,
    },
    {
      line1: 'Immersive',
      line2: 'Audio Experience',
      badge: 'Audio Controls',
      titleColor: 'text-[#0B132B]',
      image: mobileImg,
    },
  ],
},
  {
    id: 'imagetool',
    name: 'TAVQEN ImageTool',
    category: 'Creative Tools · In Development',
    description:
      'A digital platform connecting villages and citizens through accessible local governance and community services.',
    iconBg: 'bg-gradient-to-br from-[#38BDF8] via-[#0284C7] to-[#0369A1]',
    iconColor: 'text-white',
    icon: ImageIcon,
    appStoreUrl: '#contact',
    playStoreUrl: '#contact',
    phones: [
      {
        line1: 'Resize Dimensions',
        line2: '& Ratios',
        badge: 'Resize Tool',
        titleColor: 'text-[#0284C7]',
        image: gramsetuImg,
      },
      {
        line1: 'PNG, JPG &',
        line2: 'WebP Convert',
        badge: 'Format Convert',
        titleColor: 'text-[#0B132B]',
        image: gramsetuImg,
      },
      {
        line1: 'Balanced Size',
        line2: 'Optimization',
        badge: 'In Development',
        titleColor: 'text-[#0284C7]',
        image: gramsetuImg,
      },
      {
        line1: 'Batch Export',
        line2: 'Workflow',
        badge: 'Planned Utility',
        titleColor: 'text-[#0B132B]',
        image: gramsetuImg,
      },
      {
        line1: 'Clean Local',
        line2: 'Processing',
        badge: 'On-Device',
        titleColor: 'text-[#0284C7]',
        image: gramsetuImg,
      },
      {
        line1: 'Web & Portal',
        line2: 'Upload Presets',
        badge: 'Upcoming',
        titleColor: 'text-[#0B132B]',
        image: gramsetuImg,
      },
    ],
  },
];

export interface OurProductsProps {
  limit?: number;
  isFullPage?: boolean;
  onNavigate?: (path: string) => void;
}

export default function OurProducts({ limit, isFullPage = false, onNavigate }: OurProductsProps) {
  const displayedProducts = limit ? PRODUCTS.slice(0, limit) : PRODUCTS;
  const rowRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleProductClick = (id: string) => {
    const path = `/product?id=${id}`;
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollRow = (id: string, direction: 'left' | 'right') => {
    const el = rowRefs.current[id];
    if (el) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="products"
      className={`bg-white border-t border-[#E2E8F0] relative ${
        isFullPage ? 'py-14 sm:py-20' : 'py-20 sm:py-24 lg:py-28'
      }`}
    >
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========================================================= */}
        {/* SECTION HEADER (Verified PDF Guide Copy)                  */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 mb-12 sm:mb-16" data-animate="fade-up">
          <div>
            {isFullPage && (
              <span className="inline-block px-3 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3">
                SaaS & Consumer Products
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0B132B] leading-[1.15]">
              Software designed to
              <br />
              solve practical problems.
            </h2>
          </div>
          <div className="max-w-[380px] md:pt-2">
            <p className="text-[14px] sm:text-[15.5px] text-[#64748B] font-normal leading-relaxed">
              {isFullPage
                ? 'Explore products owned and developed by TAVQEN Technology, complete with verified features, supported platforms, and current availability.'
                : 'Everyday software products we design, build, and maintain in-house—focused on clarity, utility, and continuous improvement.'}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PRODUCT ROWS (App-gallery format with compact cards)      */}
        {/* ========================================================= */}
        <div className="space-y-12 sm:space-y-16">
          {displayedProducts.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                data-animate="fade-up"
                className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 xl:gap-10 pb-12 sm:pb-16 border-b border-[#E2E8F0] last:border-b-0 last:pb-0"
              >
                {/* ---------------------------------------------------- */}
                {/* LEFT INFO COLUMN: App metadata + Store badges        */}
                {/* ---------------------------------------------------- */}
                <div className="w-full lg:w-[230px] xl:w-[260px] flex-shrink-0 flex flex-col justify-between pt-1">
                  <div>
                    {/* App Icon + Title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-12 h-12 rounded-xl ${product.iconBg} shadow-xs border border-black/[0.06] flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`w-6 h-6 ${product.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-[19px] sm:text-[20px] font-bold text-[#0B132B] tracking-tight leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-[12px] font-medium text-[#64748B] mt-0.5">
                          {product.category}
                        </p>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-[13px] sm:text-[13.5px] text-[#475569] leading-relaxed mb-4 lg:max-w-[260px]">
                      {product.description}
                    </p>

                    {/* Primary Action: View Product Details */}
                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={() => handleProductClick(product.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B132B] hover:bg-[#0088CC] text-white text-xs font-semibold transition-colors cursor-pointer group"
                      >
                        <span>View Product</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>

                  {/* Left & Right Circular Arrow Controls */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={() => scrollRow(product.id, 'left')}
                      className="w-8 h-8 rounded-full border border-[#E2E8F0] bg-white hover:border-[#0088CC] text-gray-600 hover:text-[#0088CC] transition-all flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollRow(product.id, 'right')}
                      className="w-8 h-8 rounded-full border border-[#E2E8F0] bg-white hover:border-[#0088CC] text-gray-600 hover:text-[#0088CC] transition-all flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
                      aria-label="Scroll right"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* RIGHT GALLERY COLUMN: Tall Phone Screen Cards        */}
                {/* ---------------------------------------------------- */}
                <div className="flex-1 w-full min-w-0 overflow-hidden relative">
                  <div
                    ref={(el) => (rowRefs.current[product.id] = el)}
                    className="flex gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {product.phones.map((phone, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleProductClick(product.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleProductClick(product.id);
                          }
                        }}
                        className="w-[150px] sm:w-[168px] md:w-[180px] lg:w-[190px] flex-shrink-0 flex flex-col items-center cursor-pointer"
                      >
                        {/* Top 2-Line Tagline Title (Centered above phone) */}
                        <div className="h-8 flex flex-col items-center justify-center text-center px-1 mb-1.5">
                          <span
                            className={`text-[11px] sm:text-[11.5px] font-bold tracking-tight leading-tight ${phone.titleColor}`}
                          >
                            {phone.line1}
                          </span>
                          <span
                            className={`text-[11px] sm:text-[11.5px] font-bold tracking-tight leading-tight ${phone.titleColor}`}
                          >
                            {phone.line2}
                          </span>
                        </div>

                        {/* iPhone Mockup Frame (Matching screenshot proportions) */}
                        <div className="w-full h-[255px] sm:h-[280px] md:h-[300px] rounded-[22px] sm:rounded-[25px] p-1.5 bg-[#FAF9F6] border border-black/10 shadow-[0_8px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_35px_rgba(0,196,255,0.16)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative group cursor-pointer">
                          {/* Inner Screen with phone bezel */}
                          <div className="w-full h-full rounded-[18px] sm:rounded-[20px] overflow-hidden bg-white border-[2px] border-[#18181b] relative flex flex-col">
                            {/* Dynamic Island Notch */}
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-7 h-2 bg-black rounded-full z-20" />

                            {/* Screen Mockup Image */}
                            <div className="w-full h-full relative overflow-hidden bg-gray-50">
                              <img
                                src={phone.image}
                                alt={phone.line1}
                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
                                loading="lazy"
                              />

                              {/* Bottom Floating Pill Metric */}
                              <div className="absolute bottom-2 left-1.5 right-1.5 bg-white/95 backdrop-blur-md rounded-lg py-0.5 px-1.5 border border-black/5 shadow-2xs text-center">
                                <span className="text-[8px] font-extrabold uppercase tracking-wider text-[#0B132B]">
                                  {phone.badge}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* HOME SECTION: EXPLORE ALL PRODUCTS BUTTON                 */}
        {/* ========================================================= */}
        {limit && limit < PRODUCTS.length && (
          <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center text-center">
            <a
              href="/products"
              className="
                inline-flex items-center gap-2.5
                px-7 sm:px-8 py-3 sm:py-3.5
                rounded-full
                bg-white border border-[#E2E8F0]
                text-[#0B132B] text-xs sm:text-[13.5px] font-semibold
                shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                hover:border-[#0088CC] hover:text-[#0088CC] hover:shadow-[0_8px_25px_rgba(0,196,255,0.15)]
                hover:scale-[1.02] active:scale-95
                transition-all group
              "
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#0088CC]" />
            </a>
            <p className="mt-2.5 text-xs text-[#94A3B8]">
              Discover TAVQEN PDF, TAVQEN VPlayer, and upcoming utilities
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
