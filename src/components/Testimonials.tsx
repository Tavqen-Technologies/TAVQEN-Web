import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  platform: string;
  rating: number;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    quote:
      'TAVQEN is really easy to work with & extremely knowledgeable in the web and mobile development space. They delivered our platform ahead of schedule with unbelievable polish.',
    author: 'Asad R.',
    role: 'Founder, ScaleFlow Ventures',
    platform: 'Verified Client',
    rating: 5,
  },
  {
    id: 't-2',
    quote:
      'Working with TAVQEN felt like having our own in-house CTO and senior engineering squad. They took our rough architecture and turned it into an enterprise-ready SaaS.',
    author: 'Elena Rostova',
    role: 'Head of Product, NeuraCloud',
    platform: 'Enterprise Client',
    rating: 5,
  },
  {
    id: 't-3',
    quote:
      'The attention to detail in their React and mobile architecture is world-class. Fast daily communication, zero fluff, and exceptional technical execution.',
    author: 'David Chen',
    role: 'VP of Engineering, Apex Dynamics',
    platform: 'Verified Review',
    rating: 5,
  },
  {
    id: 't-4',
    quote:
      'TAVQEN redesigned our customer platform and our user engagement and checkout conversion jumped by 38% within the very first month. Outstanding team.',
    author: 'Sarah Jenkins',
    role: 'Co-Founder, Lumin Brands',
    platform: 'Verified Partner',
    rating: 5,
  },
  {
    id: 't-5',
    quote:
      'Transparent updates, weekly demo sprints, and exceptionally clean code. TAVQEN is hands down the best digital technology studio we have ever partnered with.',
    author: 'Marcus Sterling',
    role: 'Managing Director, Horizon Global',
    platform: 'Verified Partner',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = TESTIMONIALS.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-24 lg:py-28 bg-[#F8FAFC] relative overflow-hidden border-t border-[#E2E8F0]"
    >
      {/* Subtle organic cyan radial lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none opacity-25 -z-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(0, 196, 255, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION HEADER (Clean, matching TAVQEN typography)        */}
        {/* ========================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0088CC]/10 text-[#0088CC] text-xs font-semibold uppercase tracking-wider mb-3">
            Client Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0B132B] leading-[1.12]">
            What clients say.
          </h2>
          <p className="mt-3 text-[14px] sm:text-[15.5px] text-[#64748B] font-normal leading-relaxed">
            Reviews from verified projects, word for word.
          </p>
        </div>

        {/* ========================================================= */}
        {/* STACKED CARD DECK (Screenshot exact visual match)         */}
        {/* ========================================================= */}
        <div className="relative max-w-2xl sm:max-w-3xl mx-auto min-h-[330px] sm:min-h-[350px] flex items-center justify-center">
          {/* Render cards with realistic stacking offset */}
          {TESTIMONIALS.map((item, idx) => {
            // Distance from active card
            const offset = (idx - currentIndex + total) % total;

            // Only render top 3 cards in the stack
            if (offset > 2) return null;

            // Compute stack transform
            const translateY = offset * 12; // 0px, 12px, 24px
            const scale = 1 - offset * 0.04; // 1, 0.96, 0.92
            const zIndex = 30 - offset * 10; // 30, 20, 10
            const opacity = offset === 0 ? 1 : offset === 1 ? 0.75 : 0.45;

            return (
              <div
                key={item.id}
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
                className={`absolute inset-0 transition-all duration-500 ease-out pointer-events-none ${
                  offset === 0 ? 'pointer-events-auto' : ''
                }`}
              >
                <div className="w-full h-full rounded-[28px] sm:rounded-[36px] bg-white border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.05),0_1px_3px_rgba(0,0,0,0.02)] p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
                  {/* Card Content Top */}
                  <div>
                    {/* Big TAVQEN Cyan Quotation Marks */}
                    <div className="text-[#0088CC] text-4xl sm:text-5xl font-serif font-black leading-none mb-4 select-none">
                      “
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-lg sm:text-xl lg:text-[22px] font-medium text-[#0B132B] tracking-tight leading-snug sm:leading-relaxed">
                      {item.quote}
                    </p>
                  </div>

                  {/* Card Divider & Author Bottom Row */}
                  <div className="pt-6 mt-6 border-t border-dashed border-[#E2E8F0] flex items-center justify-between">
                    {/* Author Details */}
                    <div>
                      <h4 className="text-[15px] sm:text-base font-bold text-[#0B132B] leading-tight">
                        {item.author}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5 font-normal">
                        {item.role}
                      </p>
                    </div>

                    {/* Platform Badge & 5-Star Rating */}
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11.5px] font-bold tracking-tight text-[#0B132B]">
                        {item.platform}
                      </span>
                      <div className="flex items-center gap-0.5 text-[#F59E0B]">
                        {[...Array(item.rating)].map((_, sIdx) => (
                          <Star
                            key={sIdx}
                            className="w-3.5 h-3.5 fill-current text-[#F59E0B]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* STACK CONTROLS: Circular < > arrows & Page counter         */}
        {/* ========================================================= */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-4">
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-[#0088CC] text-gray-600 hover:text-[#0088CC] transition-all flex items-center justify-center shadow-2xs active:scale-90 cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Counter */}
            <span className="font-mono text-xs sm:text-sm font-semibold text-[#0B132B] tracking-wider select-none px-1">
              {currentIndex + 1} / {total}
            </span>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-[#0088CC] text-gray-600 hover:text-[#0088CC] transition-all flex items-center justify-center shadow-2xs active:scale-90 cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11.5px] text-[#94A3B8] font-normal tracking-wide">
            Use the arrow buttons or keyboard arrow keys.
          </p>
        </div>
      </div>
    </section>
  );
}
