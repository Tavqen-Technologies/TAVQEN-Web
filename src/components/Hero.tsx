import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import product1 from '../assits/products/product1.webp';
import product2 from '../assits/products/product2.webp';
import product3 from '../assits/products/product3.webp';
import product4 from '../assits/products/product4.webp';

const PRODUCT_IMAGES_ROW_1 = [
  { id: 'prod-1', src: product1, alt: 'Tavqen Product 1' },
  { id: 'prod-2', src: product2, alt: 'Tavqen Product 2' },
  { id: 'prod-3', src: product3, alt: 'Tavqen Product 3' },
  { id: 'prod-4', src: product4, alt: 'Tavqen Product 4' },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-stagger',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform',
        }
      );
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 overflow-hidden bg-[#eae8e4] flex flex-col justify-between">
      {/* DEVZEL ORGANIC LIGHT & CAUSTIC SHADOW TEXTURE */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(at 15% 20%, rgba(255, 255, 255, 0.75) 0px, transparent 55%),
            radial-gradient(at 85% 15%, rgba(0, 0, 0, 0.04) 0px, transparent 50%),
            radial-gradient(at 50% 80%, rgba(155, 227, 223, 0.16) 0px, transparent 60%),
            radial-gradient(at 20% 70%, rgba(255, 228, 237, 0.20) 0px, transparent 50%),
            radial-gradient(at 80% 85%, rgba(0, 0, 0, 0.04) 0px, transparent 55%)
          `,
        }}
      />

      {/* Subtle organic ambient shadow overlay */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 opacity-25 mix-blend-multiply"
        style={{
          background: `radial-gradient(ellipse at 70% 30%, rgba(0,0,0,0.06) 0%, transparent 60%),
                       radial-gradient(ellipse at 20% 60%, rgba(0,0,0,0.04) 0%, transparent 50%)`,
        }}
      />

      {/* MAIN HERO CONTENT (Exact Devzel layout & typography) */}
     <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col items-center justify-center">

  {/* Headline */}
  <h1 className="hero-stagger text-4xl sm:text-6xl md:text-[68px] lg:text-[76px] font-normal sm:font-medium tracking-[-0.035em] text-[#0B132B] max-w-4xl mx-auto leading-[1.12]">
    Building digital experiences,
    <br className="hidden sm:inline" /> shaping what&apos;s next.
  </h1>

  {/* Subtitle */}
  <p className="hero-stagger mt-5 sm:mt-6 text-[15px] sm:text-[16.5px] text-[#64748B] max-w-[600px] mx-auto font-normal leading-relaxed">
    TAVQEN Technologies is a digital technology company building modern
    websites, software products, and scalable solutions that help
    businesses grow and move forward.
  </p>

  {/* CTA */}
  <div className="hero-stagger mt-7 sm:mt-8 flex justify-center">
    <a
      href="/start-a-project"
      className="
        inline-flex items-center justify-center
        px-6 sm:px-7
        py-2.5 sm:py-3
        rounded-full
        bg-gradient-to-r from-[#00D4FF] to-[#0088CC]
        text-white
        text-xs sm:text-[13.5px]
        font-medium
        shadow-[0_8px_25px_rgba(0,196,255,0.25)]
        hover:shadow-[0_10px_30px_rgba(0,196,255,0.35)]
        hover:scale-[1.02]
        active:scale-95
        transition-all
      "
    >
      <span>Start a Project</span>
    </a>
  </div>

</div>
      {/* CONTINUOUSLY SLIDING PRODUCT IMAGES SHOWCASE */}
      <div className="mt-12 sm:mt-16 w-full relative">
        {/* Soft edge mask so cards fade seamlessly */}
        <div className="mask-radial-edges w-full overflow-hidden py-3 space-y-4 sm:space-y-5">
          {/* TRACK 1: Sliding Left */}
          <div className="animate-marquee pause-on-hover flex gap-4 sm:gap-6">
            {[
              ...PRODUCT_IMAGES_ROW_1,
              ...PRODUCT_IMAGES_ROW_1,
              ...PRODUCT_IMAGES_ROW_1,
            ].map((product, idx) => (
              <div
                key={`${product.id}-${idx}`}
                className="w-[290px] sm:w-[380px] md:w-[440px] h-[190px] sm:h-[250px] md:h-[280px] flex-shrink-0 bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.07] shadow-[0_6px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <img
                  src={product.src}
                  alt={product.alt}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
