import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export interface TestimonialItem {
  id: string;
  code: string;
  quote: string;
  author: string;
  role: string;
  platform: string;
  rating: number;
  avatar?: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    code: '01',
    quote:
      'TAVQEN is really easy to work with & extremely knowledgeable in web and mobile development. They delivered our platform ahead of schedule with unbelievable polish.',
    author: 'Asad R.',
    role: 'Founder, ScaleFlow Ventures',
    platform: 'Verified Client',
    rating: 5,
    avatar: '',
  },
  {
    id: 't-2',
    code: '02',
    quote:
      'Working with TAVQEN felt like having our own in-house CTO and senior engineering squad. They turned our rough architecture into an enterprise-ready SaaS.',
    author: 'Elena Rostova',
    role: 'Head of Product, NeuraCloud',
    platform: 'Enterprise Client',
    rating: 5,
    avatar: '',
  },
  {
    id: 't-3',
    code: '03',
    quote:
      'The attention to detail in their React and mobile architecture is world-class. Fast daily communication, zero fluff, and exceptional technical execution.',
    author: 'David Chen',
    role: 'VP of Engineering, Apex Dynamics',
    platform: 'Verified Review',
    rating: 5,
    avatar: '',
  },
  {
    id: 't-4',
    code: '04',
    quote:
      'TAVQEN redesigned our customer platform and our user engagement and checkout conversion jumped by 38% within the very first month. Outstanding team.',
    author: 'Sarah Jenkins',
    role: 'Co-Founder, Lumin Brands',
    platform: 'Verified Partner',
    rating: 5,
    avatar: '',
  },
  {
    id: 't-5',
    code: '05',
    quote:
      'Transparent updates, weekly demo sprints, and exceptionally clean code. TAVQEN is hands down the best digital technology studio we have ever partnered with.',
    author: 'Marcus Sterling',
    role: 'Managing Director, Horizon Global',
    platform: 'Verified Partner',
    rating: 5,
    avatar: '',
  },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

function ClientAvatar({ name, src }: { name: string; src?: string }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(src && src.trim().length > 0 && !imgFailed);

  return (
    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden flex-shrink-0 border border-[#00C4FF]/30 bg-gradient-to-br from-[#E0F7FF] via-[#BEEAE9] to-[#9BE3DF]/60 shadow-[0_3px_10px_rgba(0,136,204,0.10)] flex items-center justify-center">
      {showImage ? (
        <img
          src={src}
          alt={name}
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      ) : (
        <span className="font-mono text-[10px] sm:text-[11px] font-extrabold tracking-tight text-[#0088CC] select-none">
          {getInitials(name)}
        </span>
      )}
    </div>
  );
}

function getHandMetrics() {
  if (typeof window === 'undefined') {
    return { stepX: 30, stepRot: 5.2, frontRot: 3.5, arcY: 3, sweepX: 200 };
  }
  const w = window.innerWidth;
  if (w < 400) {
    return { stepX: 10, stepRot: 3.0, frontRot: 2.0, arcY: 1.5, sweepX: 110 };
  }
  if (w < 640) {
    return { stepX: 14, stepRot: 4.0, frontRot: 2.5, arcY: 2.0, sweepX: 140 };
  }
  if (w < 1024) {
    return { stepX: 24, stepRot: 4.8, frontRot: 3.0, arcY: 2.6, sweepX: 180 };
  }
  return { stepX: 30, stepRot: 5.2, frontRot: 3.5, arcY: 3.0, sweepX: 210 };
}

function getHandSlot(idx: number, activeIdx: number, total: number): number {
  return (idx - activeIdx + total) % total;
}

function getSlotTransform(slot: number) {
  const { stepX, stepRot, frontRot, arcY } = getHandMetrics();
  const yCurve = slot === 0 ? 0 : -slot * arcY + slot * slot * 0.55;

  return {
    x: -slot * stepX,
    y: yCurve,
    rotation: frontRot - slot * stepRot,
    scale: 1 - slot * 0.015,
    opacity: slot === 0 ? 1 : 1 - slot * 0.04,
    zIndex: 50 - slot * 10,
  };
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const handRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentIndexRef = useRef(0);
  const dragStartX = useRef<number | null>(null);

  const total = TESTIMONIALS.length;

  const dealToIndex = useCallback(
    (nextIdx: number, mode: 'next' | 'prev' | 'pick' = 'next') => {
      const prevIdx = currentIndexRef.current;
      if (nextIdx === prevIdx) return;

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      currentIndexRef.current = nextIdx;
      setCurrentIndex(nextIdx);

      const { sweepX } = getHandMetrics();

      if (prefersReduced) {
        TESTIMONIALS.forEach((_, idx) => {
          const el = cardRefs.current[idx];
          if (!el) return;
          const slot = getHandSlot(idx, nextIdx, total);
          gsap.set(el, getSlotTransform(slot));
        });
        return;
      }

      TESTIMONIALS.forEach((_, idx) => {
        const el = cardRefs.current[idx];
        if (!el) return;

        gsap.killTweensOf(el);
        const targetSlot = getHandSlot(idx, nextIdx, total);
        const target = getSlotTransform(targetSlot);

        if (mode === 'next' && idx === prevIdx) {
          const tl = gsap.timeline();
          tl.to(el, {
            x: -sweepX,
            y: -15,
            rotation: -20,
            scale: 0.96,
            opacity: 0.92,
            duration: 0.34,
            ease: 'sine.inOut',
          })
            .set(el, { zIndex: target.zIndex })
            .to(el, {
              x: target.x,
              y: target.y,
              rotation: target.rotation,
              scale: target.scale,
              opacity: target.opacity,
              duration: 0.52,
              ease: 'power3.out',
            });
          return;
        }

        if ((mode === 'prev' || mode === 'pick') && idx === nextIdx) {
          const tl = gsap.timeline();
          tl.to(el, {
            x: mode === 'prev' ? -sweepX * 0.85 : 120,
            y: -16,
            rotation: mode === 'prev' ? -20 : 11,
            scale: 0.985,
            opacity: 0.98,
            duration: 0.32,
            ease: 'sine.inOut',
          })
            .set(el, { zIndex: target.zIndex })
            .to(el, {
              x: target.x,
              y: target.y,
              rotation: target.rotation,
              scale: target.scale,
              opacity: target.opacity,
              duration: 0.52,
              ease: 'power3.out',
            });
          return;
        }

        gsap.set(el, { zIndex: target.zIndex });
        gsap.to(el, {
          x: target.x,
          y: target.y,
          rotation: target.rotation,
          scale: target.scale,
          opacity: target.opacity,
          duration: 0.68,
          delay: targetSlot * 0.02,
          ease: 'power3.out',
        });
      });
    },
    [total]
  );

  const handleNext = useCallback(() => {
    const next = (currentIndexRef.current + 1) % total;
    dealToIndex(next, 'next');
  }, [dealToIndex, total]);

  const handlePrev = useCallback(() => {
    const prev = (currentIndexRef.current - 1 + total) % total;
    dealToIndex(prev, 'prev');
  }, [dealToIndex, total]);

  useEffect(() => {
    const section = sectionRef.current;
    const hand = handRef.current;
    if (!section || !hand) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      TESTIMONIALS.forEach((_, idx) => {
        const el = cardRefs.current[idx];
        if (!el) return;
        const slot = getHandSlot(idx, currentIndexRef.current, total);
        const target = getSlotTransform(slot);

        if (prefersReduced) {
          gsap.set(el, { ...target, transformOrigin: '35% 115%' });
        } else {
          gsap.set(el, {
            x: 0,
            y: 8,
            rotation: 0,
            scale: 0.96,
            opacity: slot === 0 ? 1 : 0.75,
            zIndex: target.zIndex,
            transformOrigin: '35% 115%',
          });
        }
      });

      if (prefersReduced) return;

      ScrollTrigger.create({
        trigger: hand,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          TESTIMONIALS.forEach((_, idx) => {
            const el = cardRefs.current[idx];
            if (!el) return;
            const slot = getHandSlot(idx, currentIndexRef.current, total);
            const target = getSlotTransform(slot);

            gsap.to(el, {
              x: target.x,
              y: target.y,
              rotation: target.rotation,
              scale: target.scale,
              opacity: target.opacity,
              duration: 0.88,
              delay: slot * 0.05,
              ease: 'power3.out',
            });
          });
        },
      });
    }, section);

    const onResize = () => {
      TESTIMONIALS.forEach((_, idx) => {
        const el = cardRefs.current[idx];
        if (!el) return;
        const slot = getHandSlot(idx, currentIndexRef.current, total);
        const target = getSlotTransform(slot);
        gsap.to(el, { ...target, duration: 0.4, ease: 'power2.out' });
      });
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, [total]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev]);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;

    if (dx < -40) handleNext();
    else if (dx > 40) handlePrev();
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-10 xs:py-12 sm:py-16 lg:py-18 bg-[#F8FAFC] relative overflow-hidden border-t border-[#E2E8F0]"
    >
      {/* Subtle organic cyan radial lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none opacity-20 -z-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(0, 196, 255, 0.14) 0%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-[1060px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION HEADER (Unified SectionHeading System)            */}
        {/* ========================================================= */}
        <SectionHeading
          eyebrow="Client Testimonials"
          title="What Founders Say"
          highlight="About Working With Us."
          description="Reviews from verified client projects, architectures, and delivered software."
        />

        {/* ========================================================= */}
        {/* COMPACT LEFT-FANNED CARD HAND                             */}
        {/* ========================================================= */}
        <div
          ref={handRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="relative flex items-center justify-center min-h-[310px] sm:min-h-[330px] select-none touch-pan-y"
        >
          <div className="relative w-[235px] xs:w-[265px] sm:w-[380px] md:w-[430px] h-[275px] sm:h-[295px] translate-x-[14px] xs:translate-x-[24px] sm:translate-x-[48px] md:translate-x-[60px]">
            {TESTIMONIALS.map((item, idx) => {
              const isFront = idx === currentIndex;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onClick={() => {
                    if (isFront) {
                      handleNext();
                    } else {
                      dealToIndex(idx, 'pick');
                    }
                  }}
                  className="absolute inset-0 will-change-transform cursor-pointer group"
                >
                  <div
                    className={`w-full h-full rounded-[18px] sm:rounded-[22px] bg-white border transition-[border-color,box-shadow] duration-400 ease-out p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden ${
                      isFront
                        ? 'border-[#00C4FF]/45 shadow-[0_16px_40px_rgba(15,23,42,0.08),0_6px_18px_rgba(0,196,255,0.08)]'
                        : 'border-[#E2E8F0] shadow-[0_10px_24px_rgba(15,23,42,0.05)] group-hover:border-[#00C4FF]/45'
                    }`}
                  >
                    {/* Subtle cyan top accent on active front card */}
                    <div
                      className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#00C4FF]/70 to-transparent pointer-events-none transition-opacity duration-400 ${
                        isFront ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    {/* Top Row: Index + 5-Star Rating */}
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex flex-col items-center leading-none">
                        <span
                          className={`font-mono text-xs sm:text-[13px] font-black tracking-tight transition-colors duration-300 ${
                            isFront ? 'text-[#0088CC]' : 'text-[#0B132B]/70 group-hover:text-[#0088CC]'
                          }`}
                        >
                          {item.code}
                        </span>
                        <span className="text-[#0088CC] text-lg sm:text-xl font-serif font-black leading-none mt-0.5">
                          “
                        </span>
                      </div>

                      <div className="flex items-center gap-0.5 text-[#F59E0B] pt-0.5">
                        {[...Array(item.rating)].map((_, sIdx) => (
                          <Star
                            key={sIdx}
                            className="w-3 h-3 fill-current text-[#F59E0B]"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Quote Body */}
                    <div className="my-auto py-1 pl-1 sm:pl-2">
                      <p className="text-[12.5px] sm:text-[14px] md:text-[15px] font-medium text-[#0B132B] tracking-tight leading-relaxed">
                        {item.quote}
                      </p>
                    </div>

                    {/* Footer: Client Avatar + Name & Platform */}
                    <div className="pt-3 border-t border-dashed border-[#E2E8F0] flex items-center justify-between gap-2.5 pl-1 sm:pl-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <ClientAvatar name={item.author} src={item.avatar} />
                        <div className="min-w-0">
                          <h4 className="text-[12.5px] sm:text-[13.5px] font-bold text-[#0B132B] leading-tight truncate">
                            {item.author}
                          </h4>
                          <p className="text-[10.5px] sm:text-[11.5px] text-[#64748B] mt-0.5 font-normal truncate">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[9.5px] font-semibold text-[#0088CC] whitespace-nowrap flex-shrink-0">
                        {item.platform}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* CONTROLS: Arrows & Counter                                 */}
        {/* ========================================================= */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:border-[#0088CC] text-gray-600 hover:text-[#0088CC] transition-all flex items-center justify-center shadow-2xs active:scale-90 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <span className="font-mono text-xs font-semibold text-[#0B132B] tracking-wider select-none px-1">
              {currentIndex + 1} / {total}
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:border-[#0088CC] text-gray-600 hover:text-[#0088CC] transition-all flex items-center justify-center shadow-2xs active:scale-90 cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[10.5px] text-[#94A3B8] font-normal tracking-wide">
            Click any card in the fan or use arrow buttons.
          </p>
        </div>
      </div>
    </section>
  );
}
