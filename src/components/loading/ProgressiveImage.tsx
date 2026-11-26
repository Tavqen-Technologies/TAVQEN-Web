import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

export interface ProgressiveImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: string; // e.g. "aspect-[16/10]", "aspect-square", "aspect-[4/3]"
  containerClassName?: string;
  priority?: boolean;
}

export default function ProgressiveImage({
  src,
  alt,
  aspectRatio,
  containerClassName = '',
  className = '',
  priority = false,
  ...rest
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${
        aspectRatio ? aspectRatio : ''
      } ${containerClassName}`}
    >
      {/* Skeleton Shimmer Placeholder shown until image is fully loaded */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 skeleton-shimmer bg-slate-200/90 z-10 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4">
          <ImageOff className="w-6 h-6 mb-1 opacity-60" />
          <span className="text-[11px] font-mono">{alt || 'Image unavailable'}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...rest}
        />
      )}
    </div>
  );
}
