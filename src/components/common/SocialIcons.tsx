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

export const WhatsAppIcon: React.FC<SocialIconProps> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg 
    viewBox="0 0 32 32" 
    width={size} 
    height={size} 
    className={`shrink-0 drop-shadow-xs transition-transform hover:scale-110 ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#25D366" />
    <path 
      d="M22.5 9.5a9.2 9.2 0 0 0-13 13l-1.5 4.5 4.6-1.5a9.2 9.2 0 0 0 9.9-16zm-6.5 14.5c-1.5 0-2.9-.4-4.2-1.1l-.3-.2-2.7.9.9-2.6-.2-.3a7.4 7.4 0 1 1 6.5 3.3zm4.1-5.5c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.8.9-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.8-1.1-.7-.6-1.1-1.3-1.3-1.5-.1-.2 0-.4.1-.5.1-.1.2-.2.3-.4.1-.1.1-.2.2-.3 0-.1 0-.3-.1-.4-.1-.1-.5-1.3-.7-1.8-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.1 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.7.1.5-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3z" 
      fill="#FFFFFF" 
    />
  </svg>
);
