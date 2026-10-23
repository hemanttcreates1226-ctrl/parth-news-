import React, { useState } from 'react';
import logoPng from '../../assets/images/parthnews.png';

interface LogoProps {
  variant?: 'full' | 'header' | 'footer' | 'admin' | 'idcard' | 'symbol' | 'imageOnly';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  className?: string;
  light?: boolean;
  showText?: boolean;
}

export const ParthNewsLogo: React.FC<LogoProps> = ({
  variant = 'header',
  size = 'lg',
  className = '',
  light = false,
  showText = true
}) => {
  const [imgError, setImgError] = useState(false);
  const isImageOnly = variant === 'imageOnly' || !showText;
  const isIdCard = variant === 'idcard';
  const isFooter = variant === 'footer';

  // Dimension scaling for the emblem - mobile friendly and desktop enlarged
  const imageSizeClasses = {
    sm: 'h-9 sm:h-12 md:h-14 w-auto',
    md: 'h-10 sm:h-14 md:h-18 w-auto',
    lg: 'h-11 sm:h-16 md:h-22 lg:h-26 w-auto',
    xl: 'h-14 sm:h-20 md:h-26 lg:h-30 w-auto',
    '2xl': 'h-16 sm:h-24 md:h-30 lg:h-36 w-auto',
    hero: 'h-20 sm:h-32 md:h-40 w-auto'
  }[size] || 'h-11 sm:h-16 md:h-22 w-auto';

  const titleSizeClasses = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-2xl md:text-3xl',
    lg: 'text-xl sm:text-2xl md:text-3xl lg:text-[40px]',
    xl: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
    '2xl': 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    hero: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
  }[size] || 'text-xl sm:text-2xl md:text-3xl';

  const taglineSizeClasses = {
    sm: 'text-[9px] sm:text-[10px]',
    md: 'text-[10px] sm:text-[11px] md:text-xs',
    lg: 'text-[10px] sm:text-xs md:text-sm',
    xl: 'text-xs sm:text-sm md:text-base',
    '2xl': 'text-sm sm:text-base',
    hero: 'text-base sm:text-lg'
  }[size] || 'text-[10px] sm:text-xs';

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3.5 select-none ${className}`}>
      {/* Exact 3D Badge Logo Image (Enlarged) */}
      <div className="relative shrink-0 flex items-center justify-center">
        {!imgError ? (
          <img
            src={logoPng || '/parthnews.png'}
            alt="पार्थ न्यूज़ - सच के साथ, एक कदम आगे"
            className={`${imageSizeClasses} object-contain transition-transform duration-200 hover:scale-105`}
            referrerPolicy="no-referrer"
            loading="eager"
            onError={() => {
              // Try fallback path if first failed
              setImgError(true);
            }}
          />
        ) : (
          /* High-Fidelity SVG Fallback if image blocked */
          <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#E50914] via-[#C8102E] to-[#990000] p-4 text-white shadow-lg border border-red-700">
            <span className="font-['Rozha_One',serif] font-bold text-3xl tracking-wider">पार्थ</span>
          </div>
        )}
      </div>

      {/* Prominent Channel Name & Tagline Text in Header */}
      {!isImageOnly && (
        <div className="flex flex-col justify-center leading-tight">
          {/* Main Hindi & English Title with unique classic bold typography */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span 
              className={`font-['Yatra_One','Eczar','Rozha_One',serif] font-bold tracking-tight ${
                light ? 'text-white' : 'text-[#0F172A]'
              } ${titleSizeClasses}`}
              style={{ letterSpacing: '0.01em', lineHeight: 1.15 }}
            >
              पार्थ न्यूज़
            </span>
          </div>

          {/* Official Tagline / Slogan */}
          <div className="flex items-center gap-2 mt-1 sm:mt-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C8102E] shrink-0 animate-pulse shadow-xs"></span>
            <span className={`font-['Martel',serif] font-bold tracking-wide ${
              light ? 'text-gray-300' : 'text-gray-800'
            } ${taglineSizeClasses}`}>
              सच के साथ, एक कदम आगे
            </span>
          </div>
        </div>
      )}
    </div>
  );
};


