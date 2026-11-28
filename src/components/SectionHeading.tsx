import React from 'react';
import { Sparkles, LucideIcon } from 'lucide-react';

export interface SectionHeadingProps {
  /**
   * Uppercase eyebrow badge text, e.g. "OUR WORK", "OUR SERVICES"
   */
  eyebrow: string;
  /**
   * Optional icon to render inside the eyebrow badge.
   * Defaults to Sparkles. Pass null to hide icon.
   */
  icon?: LucideIcon | React.ComponentType<{ className?: string }> | null;
  /**
   * Main heading text preceding the highlighted phrase.
   */
  title: string;
  /**
   * Phrase/keyword highlighted with the signature TAVQEN cyan-to-blue gradient.
   */
  highlight?: string;
  /**
   * Optional trailing title text following the highlight.
   */
  titleSuffix?: string;
  /**
   * Short, muted explanatory description rendered below the heading.
   */
  description?: React.ReactNode;
  /**
   * Semantic heading level. Defaults to 'h2'. Use 'h1' for page hero headers.
   */
  as?: 'h1' | 'h2' | 'h3';
  /**
   * Text alignment. Defaults to 'center'. Supports 'left' for multi-column layouts.
   */
  align?: 'center' | 'left';
  /**
   * Container outer className overrides or additions.
   */
  className?: string;
  /**
   * Title element className additions.
   */
  titleClassName?: string;
  /**
   * Description element className additions.
   */
  descriptionClassName?: string;
  /**
   * Badge element className additions.
   */
  badgeClassName?: string;
  /**
   * Shared class applied to sub-items (e.g. for page-specific GSAP stagger selectors).
   */
  itemClassName?: string;
  /**
   * Whether to attach data-animate="fade-up" for automated global entrance animation.
   * Defaults to true.
   */
  animate?: boolean;
}

/**
 * Unified SectionHeading Component
 * Standardizes section headings across the entire TAVQEN website according to
 * the master "Our Work" visual hierarchy:
 * - Fluid scaling from 320px mobile through 1600px+ large displays
 * - Eyebrow pill badge with subtle cyan/blue accent and icon
 * - Large, bold, responsive heading with gradient keyword highlight
 * - Refined muted description with comfortable line height and constrained width
 */
export default function SectionHeading({
  eyebrow,
  icon: Icon = Sparkles,
  title,
  highlight,
  titleSuffix,
  description,
  as: HeadingTag = 'h2',
  align = 'center',
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  badgeClassName = '',
  itemClassName = '',
  animate = true,
}: SectionHeadingProps) {
  const isLeft = align === 'left';

  return (
    <div
      data-animate={animate ? 'fade-up' : undefined}
      className={`relative w-full ${
        isLeft
          ? 'text-left max-w-xl'
          : 'max-w-2xl mx-auto text-center'
      } mb-5 xs:mb-6 sm:mb-10 lg:mb-14 ${className}`}
    >
      {/* ========================================================= */}
      {/* 1. EYEBROW BADGE                                          */}
      {/* ========================================================= */}
      <div className={isLeft ? 'flex justify-start' : 'flex justify-center'}>
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#0088CC]/10 border border-[#00C4FF]/25 text-[#0088CC] text-[10px] xs:text-[10.5px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3 shadow-2xs select-none max-w-full truncate ${badgeClassName} ${itemClassName}`}
        >
          {Icon && <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />}
          <span className="truncate">{eyebrow}</span>
        </span>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN HEADING WITH GRADIENT HIGHLIGHT                   */}
      {/* ========================================================= */}
      <HeadingTag
        className={`text-[21px] xs:text-[25px] sm:text-3xl md:text-4xl lg:text-[40px] font-semibold sm:font-bold tracking-tight text-[#0B132B] leading-[1.2] sm:leading-[1.16] break-words ${titleClassName} ${itemClassName}`}
      >
        {title}
        {highlight && (
          <>
            {' '}
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#0088CC] bg-clip-text text-transparent font-bold inline-block">
              {highlight}
            </span>
          </>
        )}
        {titleSuffix && <> {titleSuffix}</>}
      </HeadingTag>

      {/* ========================================================= */}
      {/* 3. MUTED EDITORIAL DESCRIPTION                            */}
      {/* ========================================================= */}
      {description && (
        <p
          className={`mt-2.5 sm:mt-3.5 text-[12px] xs:text-[13px] sm:text-[14.5px] text-[#64748B] font-normal leading-relaxed break-words ${
            isLeft ? 'max-w-lg' : 'max-w-xl mx-auto'
          } px-0.5 sm:px-0 ${descriptionClassName} ${itemClassName}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
