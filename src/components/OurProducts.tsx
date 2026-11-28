import { useRef } from 'react';
import { ChevronLeft, ChevronRight, FileText, Play, Image as ImageIcon, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';

import pdfImg from '../assits/products/product1.webp';
import playerImg from '../assits/products/product2.webp';
import gramsetuImg from '../assits/products/product3.webp';
import mobileImg from '../assits/mobile.avif';
import websiteImg from '../assits/website.avif';

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
      image: pdfImg,
    },
    {
      line1: 'Universal',
      line2: 'Format Convert',
      badge: 'DOCX · XLS',
      titleColor: 'text-[#0088CC]',
      image: mobileImg,
    },
    {
      line1: 'Organize',
      line2: 'Pages & Merge',
      badge: 'Multi-Page',
      titleColor: 'text-[#0B132B]',
      image: pdfImg,
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
      'A practical utility designed for fast, browser-friendly image editing, resizing, format conversion, and compression without quality loss.',
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
      const scrollAmount = direction === 'left' ? -240 : 240;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="products"
      className={`bg-white border-t border-[#E2E8F0] relative ${
        isFullPage ? 'py-8 xs:py-10 sm:py-14' : 'py-10 xs:py-12 sm:py-18 lg:py-20'
      }`}
    >
      <div className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========================================================= */}
        {/* SECTION HEADER (Unified SectionHeading System)            */}
        {/* ========================================================= */}
        <SectionHeading
          eyebrow={isFullPage ? 'SaaS & Consumer Products' : 'Our Products'}
          title="Software Designed to"
          highlight="Solve Practical Problems."
          description={
            isFullPage
              ? 'Explore products owned and developed by TAVQEN Technology, complete with verified features, supported platforms, and current availability.'
              : 'Everyday software products we design, build, and maintain in-house—focused on clarity, utility, and continuous improvement.'
          }
        />

        {/* ========================================================= */}
        {/* PRODUCT ROWS (App-gallery format with compact cards)      */}
        {/* ========================================================= */}
        <div className="space-y-6 xs:space-y-8 sm:space-y-10">
          {displayedProducts.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                data-animate="fade-up"
                className="flex flex-col lg:flex-row items-start gap-4 sm:gap-5 lg:gap-7 xl:gap-8 pb-6 xs:pb-8 sm:pb-10 border-b border-[#E2E8F0] last:border-b-0 last:pb-0"
              >
                {/* ---------------------------------------------------- */}
                {/* LEFT INFO COLUMN: App metadata + Store badges        */}
                {/* ---------------------------------------------------- */}
                <div className="w-full lg:w-[210px] xl:w-[230px] flex-shrink-0 flex flex-col justify-between pt-0.5">
                  <div>
                    {/* App Icon + Title */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div
                        className={`w-10 h-10 rounded-lg ${product.iconBg} shadow-xs border border-black/[0.06] flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`w-5 h-5 ${product.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-[16px] sm:text-[17px] font-bold text-[#0B132B] tracking-tight leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-[11px] font-medium text-[#64748B] mt-0.5">
                          {product.category}
                        </p>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-[12px] sm:text-[12.5px] text-[#475569] leading-relaxed mb-3.5 lg:max-w-[230px]">
                      {product.description}
                    </p>

                    {/* Primary Action: View Product Details */}
                    <div className="mb-3">
                      <button
                        type="button"
                        onClick={() => handleProductClick(product.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0B132B] hover:bg-[#0088CC] text-white text-[11px] font-semibold transition-colors cursor-pointer group shadow-2xs"
                      >
                        <span>View Product</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>

                  {/* Left & Right Circular Arrow Controls */}
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <button
                      type="button"
                      onClick={() => scrollRow(product.id, 'left')}
                      className="w-7 h-7 rounded-full border border-[#E2E8F0] bg-white hover:border-[#0088CC] text-gray-600 hover:text-[#0088CC] transition-all flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollRow(product.id, 'right')}
                      className="w-7 h-7 rounded-full border border-[#E2E8F0] bg-white hover:border-[#0088CC] text-gray-600 hover:text-[#0088CC] transition-all flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
                      aria-label="Scroll right"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* RIGHT GALLERY COLUMN: Compact Phone Screen Cards     */}
                {/* ---------------------------------------------------- */}
                <div className="flex-1 w-full min-w-0 overflow-hidden relative">
                  <div
                    ref={(el) => (rowRefs.current[product.id] = el)}
                    className="flex gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth py-1 px-0.5"
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
                        className="w-[125px] sm:w-[138px] md:w-[148px] lg:w-[155px] flex-shrink-0 flex flex-col items-center cursor-pointer"
                      >
                        {/* Top 2-Line Tagline Title (Centered above phone) */}
                        <div className="h-7 flex flex-col items-center justify-center text-center px-1 mb-1">
                          <span
                            className={`text-[9.5px] sm:text-[10px] font-bold tracking-tight leading-tight ${phone.titleColor}`}
                          >
                            {phone.line1}
                          </span>
                          <span
                            className={`text-[9.5px] sm:text-[10px] font-bold tracking-tight leading-tight ${phone.titleColor}`}
                          >
                            {phone.line2}
                          </span>
                        </div>

                        {/* iPhone Mockup Frame (Compact Proportions) */}
                        <div className="w-full h-[210px] sm:h-[235px] md:h-[250px] rounded-[18px] sm:rounded-[20px] p-1 bg-[#FAF9F6] border border-black/10 shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_24px_rgba(0,196,255,0.14)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden relative group cursor-pointer">
                          {/* Inner Screen with phone bezel */}
                          <div className="w-full h-full rounded-[15px] sm:rounded-[17px] overflow-hidden bg-white border-[1.5px] border-[#18181b] relative flex flex-col">
                            {/* Dynamic Island Notch */}
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-5 h-1.5 bg-black rounded-full z-20" />

                            {/* Screen Mockup Image */}
                            <div className="w-full h-full relative overflow-hidden bg-gray-50">
                              <img
                                src={phone.image}
                                alt={phone.line1}
                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                                loading="lazy"
                              />

                              {/* Bottom Floating Pill Metric */}
                              <div className="absolute bottom-1.5 left-1 right-1 bg-white/95 backdrop-blur-md rounded-md py-0.5 px-1 border border-black/5 shadow-2xs text-center">
                                <span className="text-[7.5px] font-bold uppercase tracking-wider text-[#0B132B]">
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
          <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center text-center">
            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/products');
                } else {
                  window.location.hash = '/products';
                }
              }}
              className="
                inline-flex items-center gap-2
                px-6 py-2.5
                rounded-full
                bg-white border border-[#E2E8F0]
                text-[#0B132B] text-xs sm:text-[12.5px] font-semibold
                shadow-[0_2px_12px_rgba(0,0,0,0.03)]
                hover:border-[#0088CC] hover:text-[#0088CC] hover:shadow-[0_6px_20px_rgba(0,196,255,0.12)]
                hover:scale-[1.01] active:scale-95
                transition-all group cursor-pointer
              "
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#0088CC]" />
            </button>
            <p className="mt-2 text-[11px] text-[#94A3B8]">
              Discover TAVQEN PDF, TAVQEN VPlayer, and upcoming utilities
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
