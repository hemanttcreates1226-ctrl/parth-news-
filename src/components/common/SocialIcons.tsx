import React from 'react';

interface SocialIconProps {
  className?: string;
  size?: number;
}

export const FacebookIcon: React.FC<SocialIconProps> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg 
    viewBox="0 0 32 32" 
    width={size} 
    height={size} 
    className={`shrink-0 drop-shadow-xs transition-transform hover:scale-110 ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#1877F2" />
    <path 
      d="M21.25 16h-3.4v10.5h-4.35V16h-2.1v-3.7h2.1v-2.4c0-2.9 1.75-4.5 4.35-4.5 1.25 0 2.3.1 2.6.15v3.05h-1.8c-1.4 0-1.7.65-1.7 1.65v2.05h3.45l-.45 3.7z" 
      fill="#FFFFFF" 
    />
  </svg>
);

export const TwitterXIcon: React.FC<SocialIconProps> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg 
    viewBox="0 0 32 32" 
    width={size} 
    height={size} 
    className={`shrink-0 drop-shadow-xs transition-transform hover:scale-110 ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#000000" />
    <path 
      d="M19.9 9h2.3l-5 5.75L23.1 23h-4.65l-3.65-4.75L10.65 23H8.35l5.35-6.15L8 9h4.75l3.3 4.35L19.9 9zm-.8 12.6h1.3L12.05 10.3h-1.4L19.1 21.6z" 
      fill="#FFFFFF" 
    />
  </svg>
);

export const YouTubeIcon: React.FC<SocialIconProps> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg 
    viewBox="0 0 32 32" 
    width={size} 
    height={size} 
    className={`shrink-0 drop-shadow-xs transition-transform hover:scale-110 ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#FF0000" />
    <path 
      d="M23.6 12.1c-.2-.7-.7-1.3-1.4-1.5-1.3-.3-6.2-.3-6.2-.3s-4.9 0-6.2.3c-.7.2-1.2.8-1.4 1.5-.3 1.3-.3 4-.3 4s0 2.7.3 4c.2.7.7 1.3 1.4 1.5 1.3.3 6.2.3 6.2.3s4.9 0 6.2-.3c.7-.2 1.2-.8 1.4-1.5.3-1.3.3-4 .3-4s0-2.7-.3-4zm-9.3 6.4v-5l4.4 2.5-4.4 2.5z" 
      fill="#FFFFFF" 
    />
  </svg>
);

export const InstagramIcon: React.FC<SocialIconProps> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg 
    viewBox="0 0 32 32" 
    width={size} 
    height={size} 
    className={`shrink-0 drop-shadow-xs transition-transform hover:scale-110 ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="ig-gradient-real" x1="10%" y1="100%" x2="90%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="16" fill="url(#ig-gradient-real)" />
    <rect x="9.5" y="9.5" width="13" height="13" rx="3.5" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
    <circle cx="16" cy="16" r="3.2" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
    <circle cx="19.8" cy="12.2" r="0.9" fill="#FFFFFF" />
  </svg>
);

export const TelegramIcon: React.FC<SocialIconProps> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg 
    viewBox="0 0 32 32" 
    width={size} 
    height={size} 
    className={`shrink-0 drop-shadow-xs transition-transform hover:scale-110 ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#24A1DE" />
    <path 
      d="M8.5 15.6l13.7-5.3c.6-.2 1.2.2 1 .8l-2.3 11c-.2.8-.7 1-1.3.6l-3.7-2.7-1.8 1.7c-.2.2-.4.4-.8.4l.3-3.8 6.9-6.2c.3-.3 0-.4-.3-.2l-8.5 5.4-3.7-1.2c-.8-.2-.8-.8.2-1.1z" 
      fill="#FFFFFF" 
    />
  </svg>
);

export const WhatsAppIcon: React.FC<SocialIconProps> = ({ className = '', size = 32 }) => (
  <svg 
    viewBox="0 0 32 32" 
    width={size} 
    height={size} 
    style={{ width: size, height: size }}
    className={`shrink-0 drop-shadow-xs transition-transform hover:scale-110 ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#25D366" />
    <g transform="translate(6.8, 6.8) scale(0.765)">
      <path 
        fill="#FFFFFF" 
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" 
      />
    </g>
  </svg>
);
