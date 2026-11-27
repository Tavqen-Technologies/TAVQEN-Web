import { useRef } from 'react';
import { ChevronLeft, ChevronRight, FileText, Play, Image as ImageIcon, ArrowRight } from 'lucide-react';

import pdfOverview from '../assits/products/pdf-overview.jpg';
import pdfHomeDark from '../assits/products/pdf-home-dark.jpg';
import pdfHomeLight from '../assits/products/pdf-home-light.jpg';
import pdfAllTools from '../assits/products/pdf-all-tools.jpg';
import pdfConversion from '../assits/products/pdf-conversion.jpg';
import pdfSettings from '../assits/products/pdf-settings.jpg';
import pdfFiles from '../assits/products/pdf-files.jpg';
import vplayerOverview from '../assits/products/vplayer-overview.jpg';
import vplayerHomeDark from '../assits/products/vplayer-home-dark.jpg';
import vplayerHomeLight from '../assits/products/vplayer-home-light.jpg';
import vplayerLibrary from '../assits/products/vplayer-library.jpg';
import vplayerSearch from '../assits/products/vplayer-search.jpg';
import vplayerCollections from '../assits/products/vplayer-collections.jpg';
import imageToolImg from '../assits/products/product4.webp';
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
  icon: any;
  appStoreUrl: string;
  playStoreUrl: string;
  phones: PhoneCard[];
}

const PRODUCTS: ProductShowcase[] = [
  {
    id: 'pdf',
    name: 'TAVQEN PDF',
    category: 'Documents & Productivity · Available',
    description:
      'TAVQEN PDF helps mobile users organize, merge, split, compress, and convert documents between PDFs and images in one clean workspace.',
    iconBg: 'bg-gradient-to-br from-[#9BE3DF] to-[#0088CC]',
    iconColor: 'text-white',
    icon: FileText,
    appStoreUrl: '#contact',
    playStoreUrl: '#contact',
    phones: [
      {
        line1: 'Complete App',
        line2: 'Overview',
        badge: '5-Screen Suite',
        titleColor: 'text-[#0088CC]',
        image: pdfOverview,
      },
      {
        line1: 'Home Workspace',
        line2: 'Dark Mode',
        badge: 'Home · Dark',
        titleColor: 'text-[#0B132B]',
        image: pdfHomeDark,
      },
      {
        line1: 'Home Workspace',
        line2: 'Light Mode',
        badge: 'Home · Light',
        titleColor: 'text-[#0088CC]',
        image: pdfHomeLight,
      },
      {
        line1: 'All 22 PDF',
        line2: 'Utilities',
        badge: 'All Tools',
        titleColor: 'text-[#0B132B]',
        image: pdfAllTools,
      },
      {
        line1: 'Images to',
        line2: 'PDF Document',
        badge: 'Conversion',
        titleColor: 'text-[#0088CC]',
        image: pdfConversion,
      },
      {
        line1: 'My Files',
        line2: 'Document Hub',
        badge: 'My Files',
        titleColor: 'text-[#0B132B]',
        image: pdfFiles,
      },
      {
        line1: 'Appearance &',
        line2: 'Quality Controls',
        badge: 'Settings',
        titleColor: 'text-[#0088CC]',
        image: pdfSettings,
      },
    ],
  },
  {
    id: 'player',
    name: 'TAVQEN VPlayer',
    category: 'Media & Entertainment · Available',
    description:
      'TAVQEN VPlayer helps mobile viewers organize and watch local videos with Continue Watching, custom playback speed, 10s seek steps, and on-device folder search.',
    iconBg: 'bg-gradient-to-br from-[#FFE4ED] via-[#FDA4AF] to-[#E11D48]',
    iconColor: 'text-white',
    icon: Play,
    appStoreUrl: '#contact',
    playStoreUrl: '#contact',
    phones: [
      {
        line1: 'Complete Video',
        line2: 'Suite Overview',
        badge: '5-Screen Suite',
        titleColor: 'text-[#E11D48]',
        image: vplayerOverview,
      },
      {
        line1: 'Continue Watching',
        line2: 'Dark Mode',
        badge: 'Home · Dark',
        titleColor: 'text-[#0B132B]',
        image: vplayerHomeDark,
      },
      {
        line1: 'Clean Player',
        line2: 'Light Mode',
        badge: 'Home · Light',
        titleColor: 'text-[#E11D48]',
        image: vplayerHomeLight,
      },
      {
        line1: 'Organize Movies',
        line2: '& Watchlists',
        badge: 'Library',
        titleColor: 'text-[#0B132B]',
        image: vplayerLibrary,
      },
      {
        line1: 'On-Device Title',
        line2: '& Folder Search',
        badge: 'Private Search',
        titleColor: 'text-[#E11D48]',
        image: vplayerSearch,
      },
      {
        line1: 'Add Titles &',
        line2: 'Collections',
        badge: 'Collections',
        titleColor: 'text-[#0B132B]',
        image: vplayerCollections,
      },
    ],
  },
  {
    id: 'imagetool',
    name: 'TAVQEN ImageTool',
    category: 'Creative Tools · In Development',
    description:
      'TAVQEN ImageTool is an upcoming utility focused on image resizing, format conversion, and everyday visual optimization cleanly on-device.',
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
        image: imageToolImg,
      },
      {
        line1: 'PNG, JPG &',
        line2: 'WebP Convert',
        badge: 'Format Convert',
        titleColor: 'text-[#0B132B]',
        image: websiteImg,
      },
      {
        line1: 'Balanced Size',
        line2: 'Optimization',
        badge: 'In Development',
        titleColor: 'text-[#0284C7]',
        image: imageToolImg,
      },
      {
        line1: 'Batch Export',
        line2: 'Workflow',
        badge: 'Planned Utility',
        titleColor: 'text-[#0B132B]',
        image: mobileImg,
      },
      {
        line1: 'Clean Local',
        line2: 'Processing',
        badge: 'On-Device',
        titleColor: 'text-[#0284C7]',
        image: imageToolImg,
      },
      {
        line1: 'Web & Portal',
        line2: 'Upload Presets',
        badge: 'Upcoming',
        titleColor: 'text-[#0B132B]',
        image: saasImg,
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
                Explore Our Products
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
        {/* PRODUCT ROWS (Matching the screenshot app-gallery format) */}
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
                {/* RIGHT GALLERY COLUMN: Responsive Screen Cards        */}
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
                        {/* Top 2-Line Tagline Title (Centered above screen card) */}
                        <div className="h-8 flex flex-col items-center justify-center text-center px-1 mb-1.5">
                          <span
                            className={`text-[11px] font-bold tracking-tight leading-tight ${phone.titleColor}`}
                          >
                            {phone.line1}
                          </span>
                          <span
                            className={`text-[11px] font-bold tracking-tight leading-tight ${phone.titleColor}`}
                          >
                            {phone.line2}
                          </span>
                        </div>

                        {/* Clean Frameless App Screen Card (uncropped object-contain for full UI clarity) */}
                        <div className="w-full h-[250px] sm:h-[275px] md:h-[295px] rounded-[20px] sm:rounded-[22px] p-1.5 bg-white border border-[#E2E8F0] hover:border-[#00C4FF]/65 shadow-[0_8px_22px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_36px_rgba(0,196,255,0.16)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative group">
                          <div className="w-full h-full rounded-[14px] sm:rounded-[16px] overflow-hidden bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] relative flex items-center justify-center">
                            <img
                              src={phone.image}
                              alt={`${product.name} — ${phone.line1} ${phone.line2}`}
                              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                              loading="lazy"
                            />

                            {/* Bottom Floating Pill Metric */}
                            <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md rounded-lg py-0.5 px-2 border border-black/5 shadow-2xs text-center">
                              <span className="text-[8.5px] font-extrabold uppercase tracking-wider text-[#0B132B]">
                                {phone.badge}
                              </span>
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
