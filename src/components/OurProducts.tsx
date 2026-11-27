import { useRef } from 'react';
import { ChevronLeft, ChevronRight, FileText, Play, Users, ArrowRight } from 'lucide-react';

// Real product images from TavqenPdf and tavqenVplayer
import pdfHome from '../assits/TavqenPdf/home.jpg';
import pdfAllTools from '../assits/TavqenPdf/allTools.jpg';
import pdfConversations from '../assits/TavqenPdf/conversations.jpg';
import pdfAllPages from '../assits/TavqenPdf/allpages.jpg';
import pdfMyFiles from '../assits/TavqenPdf/my files.jpg';
import pdfLight from '../assits/TavqenPdf/light.jpg';

import vplayerHome from '../assits/tavqenVplayer/home.jpg';
import vplayerAllPages from '../assits/tavqenVplayer/allpages.jpg';
import vplayerLibrary from '../assits/tavqenVplayer/libaray.jpg';
import vplayerAddTitle from '../assits/tavqenVplayer/addtittle.jpg';
import vplayerLight from '../assits/tavqenVplayer/light.jpg';
import vplayerSearch from '../assits/tavqenVplayer/search.jpg';

import product3 from '../assits/products/product3.jpg';

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
    category: 'Mobile App · Productivity & OCR',
    description:
      'All-in-one document suite engineered for 300 DPI smart scanning, AI OCR extraction, PDF conversions, e-signatures, and encrypted file management.',
    iconBg: 'bg-gradient-to-br from-[#9BE3DF] to-[#0088CC]',
    iconColor: 'text-white',
    icon: FileText,
    appStoreUrl: '#contact',
    playStoreUrl: '#contact',
    phones: [
      {
        line1: 'AI Scanner',
        line2: '300 DPI Export',
        badge: 'Smart Scan',
        titleColor: 'text-[#0088CC]',
        image: pdfHome,
      },
      {
        line1: '30+ Tools',
        line2: 'Merge & Split',
        badge: 'All Tools',
        titleColor: 'text-[#0B132B]',
        image: pdfAllTools,
      },
      {
        line1: 'Smart Convert',
        line2: 'Multi-Format OCR',
        badge: 'AI Converter',
        titleColor: 'text-[#0088CC]',
        image: pdfConversations,
      },
      {
        line1: 'Page Manager',
        line2: 'Reorder & Edit',
        badge: 'All Pages',
        titleColor: 'text-[#0B132B]',
        image: pdfAllPages,
      },
      {
        line1: 'Cloud Vault',
        line2: 'Secure Storage',
        badge: 'My Files',
        titleColor: 'text-[#0088CC]',
        image: pdfMyFiles,
      },
      {
        line1: 'Clean Reader',
        line2: 'Smooth Viewing',
        badge: 'HD View',
        titleColor: 'text-[#0B132B]',
        image: pdfLight,
      },
    ],
  },
  {
    id: 'tavqen-v-player',
    name: 'TAVQEN V Player',
    category: 'Mobile App · Media & Entertainment',
    description:
      'High-performance media player engineered for ultra-smooth 4K playback, universal codec support, smart subtitle sync, and gesture-driven controls.',
    iconBg: 'bg-gradient-to-br from-[#FFE4ED] via-[#FDA4AF] to-[#E11D48]',
    iconColor: 'text-white',
    icon: Play,
    appStoreUrl: '#contact',
    playStoreUrl: '#contact',
    phones: [
      {
        line1: 'Ultra HD',
        line2: '4K Playback',
        badge: '4K Player',
        titleColor: 'text-[#E11D48]',
        image: vplayerHome,
      },
      {
        line1: 'Media Browser',
        line2: 'Smart Playlist',
        badge: 'All Videos',
        titleColor: 'text-[#0B132B]',
        image: vplayerAllPages,
      },
      {
        line1: 'Folder Explorer',
        line2: 'Fast Indexing',
        badge: 'Media Library',
        titleColor: 'text-[#E11D48]',
        image: vplayerLibrary,
      },
      {
        line1: 'Smart Subtitles',
        line2: 'Audio Sync',
        badge: 'Subtitle Engine',
        titleColor: 'text-[#0B132B]',
        image: vplayerAddTitle,
      },
      {
        line1: 'Cinema View',
        line2: 'Gesture Control',
        badge: 'HD Playback',
        titleColor: 'text-[#E11D48]',
        image: vplayerLight,
      },
      {
        line1: 'Instant Search',
        line2: 'Quick Filter',
        badge: 'Universal Search',
        titleColor: 'text-[#0B132B]',
        image: vplayerSearch,
      },
    ],
  },
  {
    id: 'gramsetu',
    name: 'GramSetu',
    category: 'Mobile App · Civic Community',
    description:
      'A digital platform connecting villages and citizens through accessible local governance, offline sync, and real-time community services.',
    iconBg: 'bg-gradient-to-br from-[#38BDF8] via-[#0284C7] to-[#0369A1]',
    iconColor: 'text-white',
    icon: Users,
    appStoreUrl: '#contact',
    playStoreUrl: '#contact',
    phones: [
      {
        line1: 'Citizen Portal',
        line2: 'Live Grievance',
        badge: 'Real-time Action',
        titleColor: 'text-[#0284C7]',
        image: product3,
      },
      {
        line1: 'Panchayat Data',
        line2: '100% Digital',
        badge: 'Verified Records',
        titleColor: 'text-[#0B132B]',
        image: product3,
      },
      {
        line1: 'Welfare Schemes',
        line2: 'Direct Access',
        badge: 'Direct Benefit',
        titleColor: 'text-[#0284C7]',
        image: product3,
      },
      {
        line1: 'Voice First',
        line2: 'Local Dialects',
        badge: 'Accessible UI',
        titleColor: 'text-[#0B132B]',
        image: product3,
      },
      {
        line1: 'Offline Mode',
        line2: 'Zero Signal Sync',
        badge: 'Works Anywhere',
        titleColor: 'text-[#0284C7]',
        image: product3,
      },
      {
        line1: 'Civic Alerts',
        line2: 'Broadcast Feed',
        badge: 'Live SMS & Push',
        titleColor: 'text-[#0B132B]',
        image: product3,
      },
    ],
  },
];

export interface OurProductsProps {
  limit?: number;
  isFullPage?: boolean;
}

export default function OurProducts({ limit, isFullPage = false }: OurProductsProps) {
  const displayedProducts = limit ? PRODUCTS.slice(0, limit) : PRODUCTS;
  const rowRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
        isFullPage ? 'pt-28 sm:pt-36 pb-20 sm:pb-28' : 'py-20 sm:py-24 lg:py-28'
      }`}
    >
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home Breadcrumb for Full Page View */}
        {isFullPage && (
          <div className="mb-6 sm:mb-8">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0088CC] hover:text-[#00C4FF] transition-colors"
            >
              <span>← Back to Home</span>
            </a>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION HEADER (Clean, balanced typography)               */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 mb-12 sm:mb-16" data-animate="fade-up">
          <div>
            {isFullPage && (
              <span className="inline-block px-3 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3">
                SaaS &amp; Consumer Products
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0B132B] leading-[1.15]">
              Products we design,
              <br />
              build and ship.
            </h2>
          </div>
          <div className="max-w-[380px] md:pt-2">
            <p className="text-[14px] sm:text-[15.5px] text-[#64748B] font-normal leading-relaxed">
              {isFullPage
                ? 'Explore our full suite of mobile applications and platforms engineered in-house for real-world impact.'
                : 'Mobile apps we design, build and run ourselves. We watch how people use them and keep improving them.'}
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
                    <p className="text-[13px] sm:text-[13.5px] text-[#475569] leading-relaxed mb-4 max-w-[260px]">
                      {product.description}
                    </p>

                    {/* Download Badges (App Store & Google Play) */}
                    <div className="flex flex-row lg:flex-col gap-2 mb-4">
                      {/* App Store Badge */}
                      <a
                        href={product.appStoreUrl}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111111] text-white hover:bg-black transition-all shadow-2xs w-fit group"
                      >
                        <svg
                          className="w-3.5 h-3.5 fill-current text-white flex-shrink-0"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-.97 1.7-0.85 2.73 1 .08 1.94-.48 2.56-1.23z" />
                        </svg>
                        <div className="text-left leading-none">
                          <span className="block text-[7.5px] uppercase tracking-wider text-gray-300 mb-0.5">
                            Download on the
                          </span>
                          <span className="text-[11px] font-semibold text-white">
                            App Store
                          </span>
                        </div>
                      </a>

                      {/* Google Play Badge */}
                      <a
                        href={product.playStoreUrl}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111111] text-white hover:bg-black transition-all shadow-2xs w-fit group"
                      >
                        <svg
                          className="w-3.5 h-3.5 fill-current text-white flex-shrink-0"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3.609 1.814L13.792 12 3.61 22.186a2.03 2.03 0 0 1-.22-.932V2.746c0-.348.082-.67.22-.932zM15.207 13.414l2.42 2.42-12.721 7.345 10.301-9.765zm2.42-5.242l-2.42 2.42L4.906.827 17.627 8.172zm1.258 1.259l2.793 1.613c.895.517.895 1.358 0 1.875l-2.793 1.613-2.071-2.07 2.071-2.071z" />
                        </svg>
                        <div className="text-left leading-none">
                          <span className="block text-[7.5px] uppercase tracking-wider text-gray-300 mb-0.5">
                            GET IT ON
                          </span>
                          <span className="text-[11px] font-semibold text-white">
                            Google Play
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Left & Right Circular Arrow Controls */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={() => scrollRow(product.id, 'left')}
                      className="w-7 h-7 rounded-full border border-gray-200 bg-white hover:border-gray-400 text-gray-500 hover:text-black transition-all flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollRow(product.id, 'right')}
                      className="w-7 h-7 rounded-full border border-gray-200 bg-white hover:border-gray-400 text-gray-500 hover:text-black transition-all flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
                      aria-label="Scroll right"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* RIGHT GALLERY COLUMN: Compact Phone Screen Cards     */}
                {/* ---------------------------------------------------- */}
                <div className="flex-1 w-full overflow-hidden relative">
                  <div
                    ref={(el) => (rowRefs.current[product.id] = el)}
                    className="flex gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {product.phones.map((phone, idx) => (
                      <div
                        key={idx}
                        className="w-[130px] sm:w-[145px] md:w-[155px] lg:w-[165px] flex-shrink-0 flex flex-col items-center"
                      >
                        {/* Top 2-Line Tagline Title (Centered above phone) */}
                        <div className="h-8 flex flex-col items-center justify-center text-center px-1 mb-2">
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

                        {/* Compact Phone Mockup Frame */}
                        <div className="w-full h-[240px] sm:h-[260px] md:h-[275px] rounded-2xl sm:rounded-[22px] p-2 bg-[#F8FAFC] border border-[#E2E8F0] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,196,255,0.14)] hover:border-[#00C4FF]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative group cursor-pointer">
                          {/* Inner Screen Container */}
                          <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-[#E2E8F0]/80 relative flex items-center justify-center p-1.5 sm:p-2">
                            <img
                              src={phone.image}
                              alt={phone.line1}
                              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                              loading="lazy"
                            />

                            {/* Bottom Floating Pill Metric */}
                            <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-xs rounded-md py-0.5 px-1.5 border border-black/5 shadow-2xs text-center pointer-events-none">
                              <span className="text-[8px] sm:text-[8.5px] font-extrabold uppercase tracking-wider text-[#0B132B]">
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
              Discover GramSetu and upcoming community platforms
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
