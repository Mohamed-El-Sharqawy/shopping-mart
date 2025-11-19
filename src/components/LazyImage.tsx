import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Image } from '@mantine/core';

interface LazyImageProps {
  src: string;
  alt: string;
  height?: number;
  width?: number | string;
  className?: string;
  blurHash?: string;
  fallbackColor?: string;
}

export const LazyImage: React.FC<LazyImageProps> = React.memo(({
  src,
  alt,
  height = 200,
  width = '100%',
  className,
  blurHash,
  fallbackColor = '#f0f0f0'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Modern Intersection Observer for lazy loading
  useEffect(() => {
    const current = imgRef.current;
    if (!current) return;

    // Use modern IntersectionObserver without legacy fallbacks
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px' // Larger margin for better UX
      }
    );

    observer.observe(current);
    return () => observer.disconnect();
  }, []);

  // Generate a simple blur placeholder based on the image URL
  const generateBlurPlaceholder = (imageUrl: string) => {
    // Create a simple gradient based on the image URL hash
    const hash = imageUrl.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const hue1 = Math.abs(hash) % 360;
    const hue2 = (hue1 + 60) % 360;
    
    return `linear-gradient(135deg, hsl(${hue1}, 20%, 85%) 0%, hsl(${hue2}, 20%, 90%) 100%)`;
  };

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height, width }}
    >
      {/* Blur placeholder */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: blurHash || generateBlurPlaceholder(src),
          filter: 'blur(20px)',
          transform: 'scale(1.1)'
        }}
      />
      
      {/* Shimmer effect */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse">
          <div 
            className="h-full w-full"
            style={{ backgroundColor: fallbackColor }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Modern image with performance optimizations */}
      {isInView && (
        <Image
          src={hasError ? undefined : src}
          alt={alt}
          height={height}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          fallbackSrc={`data:image/svg+xml;base64,${btoa(`
            <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="${fallbackColor}"/>
              <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#666" font-family="system-ui, sans-serif" font-size="14">
                Image unavailable
              </text>
            </svg>
          `)}`}
        />
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';
