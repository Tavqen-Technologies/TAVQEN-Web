import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Smoothly scrolls to a numeric Y offset or selector using GSAP ScrollToPlugin.
 */
export function smoothScrollTo(target: number | string, duration = 0.85) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'auto' });
    } else {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: 'auto' });
    }
    return;
  }

  gsap.to(window, {
    duration,
    scrollTo: { y: target, autoKill: true },
    ease: 'power3.out',
  });
}

/**
 * Initializes inertial desktop wheel smoothing while keeping native scroll,
 * CSS `position: sticky`, touchscreens, and horizontal carousels 100% intact.
 */
export function initSmoothWheelScroll(): () => void {
  if (typeof window === 'undefined') return () => {};

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (prefersReduced || isTouchDevice) {
    return () => {};
  }

  let targetY = window.scrollY;
  let currentY = window.scrollY;
  let isAnimating = false;
  let rafId = 0;

  const stopAnimation = () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
    isAnimating = false;
    currentY = window.scrollY;
    targetY = window.scrollY;
  };

  const isInsideScrollableContainer = (el: HTMLElement | null): boolean => {
    let node: HTMLElement | null = el;
    while (node && node !== document.body && node !== document.documentElement) {
      const style = window.getComputedStyle(node);
      const overflowY = style.overflowY;
      const canScrollY =
        (overflowY === 'auto' || overflowY === 'scroll') &&
        node.scrollHeight > node.clientHeight + 2;
      if (canScrollY) return true;
      node = node.parentElement;
    }
    return false;
  };

  const animate = () => {
    const diff = targetY - currentY;
    if (Math.abs(diff) < 0.4) {
      currentY = targetY;
      window.scrollTo({ top: currentY, left: 0, behavior: 'instant' as ScrollBehavior });
      ScrollTrigger.update();
      isAnimating = false;
      rafId = 0;
      return;
    }

    currentY += diff * 0.115;
    window.scrollTo({ top: currentY, left: 0, behavior: 'instant' as ScrollBehavior });
    ScrollTrigger.update();
    rafId = window.requestAnimationFrame(animate);
  };

  const onWheel = (e: WheelEvent) => {
    if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    if (isInsideScrollableContainer(e.target as HTMLElement | null)) return;

    let delta = e.deltaY;
    if (e.deltaMode === 1) delta *= 32;
    else if (e.deltaMode === 2) delta *= window.innerHeight;

    if (!isAnimating) {
      currentY = window.scrollY;
      targetY = window.scrollY;
    }

    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    targetY = Math.max(0, Math.min(maxScroll, targetY + delta * 0.95));

    e.preventDefault();

    if (!isAnimating) {
      isAnimating = true;
      rafId = window.requestAnimationFrame(animate);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Space', ' '];
    if (scrollKeys.includes(e.key)) {
      stopAnimation();
    }
  };

  const onPointerDown = () => {
    // User might drag scrollbar or click anchor
    if (isAnimating) stopAnimation();
  };

  const onNativeScroll = () => {
    if (!isAnimating) {
      currentY = window.scrollY;
      targetY = window.scrollY;
    }
  };

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('keydown', onKeyDown, { passive: true });
  window.addEventListener('pointerdown', onPointerDown, { passive: true });
  window.addEventListener('scroll', onNativeScroll, { passive: true });

  return () => {
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('scroll', onNativeScroll);
    if (rafId) window.cancelAnimationFrame(rafId);
  };
}

/**
 * Applies clean GPU-composited GSAP ScrollTrigger entrance animations to
 * sections, headings, and card groups across the site without disturbing
 * sticky positioning.
 */
export function registerGlobalScrollAnimations(root: HTMLElement | null): () => void {
  if (!root || typeof window === 'undefined') return () => {};

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return () => {};

  const ctx = gsap.context(() => {
    // Animate elements marked with [data-animate="fade-up"]
    const revealEls = gsap.utils.toArray<HTMLElement>('[data-animate="fade-up"]');
    revealEls.forEach((el) => {
      const delay = Number(el.dataset.delay || 0);
      gsap.fromTo(
        el,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          delay,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      );
    });

    // Staggered children inside [data-animate-stagger]
    const staggerGroups = gsap.utils.toArray<HTMLElement>('[data-animate-stagger]');
    staggerGroups.forEach((group) => {
      const children = Array.from(group.children) as HTMLElement[];
      if (children.length === 0) return;
      gsap.fromTo(
        children,
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.68,
          stagger: 0.09,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: group,
            start: 'top 86%',
            once: true,
          },
        }
      );
    });
  }, root);

  return () => ctx.revert();
}
