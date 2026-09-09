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

  // Dimension scaling for the emblem - significantly enlarged
  const imageSizeClasses = {
    sm: 'h-12 sm:h-14 w-auto',
    md: 'h-14 sm:h-16 md:h-20 w-auto',
    lg: 'h-18 sm:h-22 md:h-26 lg:h-28 w-auto',
    xl: 'h-20 sm:h-24 md:h-28 lg:h-32 w-auto',
    '2xl': 'h-24 sm:h-28 md:h-32 lg:h-36 w-auto',
    hero: 'h-28 sm:h-36 md:h-44 w-auto'
  }[size] || 'h-20 sm:h-24 md:h-28 w-auto';

  const titleSizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-2xl sm:text-3xl md:text-4xl lg:text-[42px]',
    xl: 'text-3xl sm:text-4xl md:text-5xl',
    '2xl': 'text-4xl sm:text-5xl lg:text-6xl',
    hero: 'text-5xl sm:text-6xl lg:text-7xl'
  }[size] || 'text-2xl sm:text-3xl md:text-4xl';

  const taglineSizeClasses = {
    sm: 'text-[10px]',
    md: 'text-[11px] sm:text-xs',
    lg: 'text-xs sm:text-[13px] md:text-sm',
    xl: 'text-sm sm:text-base',
    '2xl': 'text-base',
    hero: 'text-lg'
  }[size] || 'text-xs sm:text-sm';

  return (
    <div className={`inline-flex items-center gap-3 sm:gap-4.5 select-none ${className}`}>
      {/* Exact 3D Badge Logo Image (Enlarged) */}
      <div className="relative shrink-0 flex items-center justify-center">
        {!imgError ? (
          <img
            src={logoPng || '/parthnews.png'}
            alt="पार्थ न्यूज़ - सच के साथ, एक कदम आगे"
            className={`${imageSizeClasses} object-contain drop-shadow-md transition-transform duration-200 hover:scale-105`}
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
            <span className="font-['Rozha_One',serif] font-bold text-3xl tracking-wider drop-shadow-md">पार्थ</span>
          </div>
        )}
      </div>

      {/* Prominent Channel Name & Tagline Text in Header */}
      {!isImageOnly && (
        <div className="flex flex-col justify-center leading-tight">
          {/* Main Hindi & English Title with new font style */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span 
              className={`font-['Rozha_One','Martel',serif] tracking-normal drop-shadow-xs ${
                light ? 'text-white' : 'text-[#0F172A]'
              } ${titleSizeClasses}`}
              style={{ letterSpacing: '0.02em', lineHeight: 1.1 }}
            >
              पार्थ न्यूज़
            </span>
            <span className="bg-[#C8102E] text-white px-2.5 py-0.5 rounded-lg font-['Outfit','Plus_Jakarta_Sans',sans-serif] font-black tracking-widest text-[11px] sm:text-xs md:text-sm uppercase shadow-sm border border-red-600/30">
              PARTH NEWS
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


