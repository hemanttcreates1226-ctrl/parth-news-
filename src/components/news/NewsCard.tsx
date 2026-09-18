import React, { useState } from 'react';
import { Clock, User, Share2, Eye, Flame, ArrowRight, Check } from 'lucide-react';
import { Post } from '../../types';
import { sharePostToWhatsApp, getPostShortUrl } from '../../utils/shareUtils';
import { WhatsAppIcon } from '../common/SocialIcons';

interface NewsCardProps {
  post: Post;
  onClick: () => void;
  variant?: 'standard' | 'horizontal' | 'compact' | 'featured-hero' | 'trending';
}

export const NewsCard: React.FC<NewsCardProps> = ({ post, onClick, variant = 'standard' }) => {
  const [copied, setCopied] = useState(false);

  const formatDate = (isoString: string) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('hi-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return '';
    }
  };

  const handleWhatsAppShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await sharePostToWhatsApp(post);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shortUrl = getPostShortUrl(post);
    if (navigator.share) {
      navigator.share({
        title: post.titleHindi || post.title,
        text: `*${post.titleHindi || post.title}*\n\nपार्थ न्यूज़:\n${shortUrl}`,
        url: shortUrl
      }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (variant === 'compact') {
    return (
      <div 
        onClick={onClick}
        className="group flex gap-3.5 items-center p-2.5 rounded-lg bg-white hover:bg-red-50/40 border border-gray-100 hover:border-red-200 transition-all cursor-pointer shadow-xs hover:shadow-sm"
      >
        <div className="w-20 h-16 shrink-0 rounded-md overflow-hidden relative bg-gray-100">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {post.breaking && (
            <span className="absolute top-1 left-1 bg-[#C8102E] text-white text-[9px] font-black px-1 rounded-xs">
              LIVE
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold text-[#C8102E] uppercase tracking-wide">
            {post.category}
          </span>
          <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#C8102E] line-clamp-2 leading-snug transition-colors">
            {post.titleHindi || post.title}
          </h4>
          <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            <span>•</span>
            <span className="flex items-center gap-0.5">
              <Eye className="w-2.5 h-2.5" /> {post.views}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article 
        onClick={onClick}
        className="group flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white hover:bg-gray-50/60 border border-gray-200/80 hover:border-red-300 hover:shadow-md transition-all duration-300 cursor-pointer"
      >
        <div className="sm:w-56 h-40 shrink-0 rounded-lg overflow-hidden relative bg-gray-100">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            loading="lazy"
          />
          <div className="absolute top-2 left-2 flex gap-1">
            <span className="bg-[#C8102E] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
              {post.category}
            </span>
            {post.breaking && (
              <span className="bg-black/80 text-white text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <Flame className="w-2.5 h-2.5 fill-red-500 text-red-500" /> LIVE
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#C8102E] leading-snug transition-colors font-hindi mb-1.5">
              {post.titleHindi || post.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {post.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100 text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-medium text-gray-700">
                <User className="w-3.5 h-3.5 text-[#C8102E]" /> {post.reporterName}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {formatDate(post.publishedAt || post.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={handleWhatsAppShare}
                className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors"
                title="WhatsApp पर शेयर करें"
              >
                <WhatsAppIcon size={16} />
              </button>
              <button 
                onClick={handleShare}
                className="p-1.5 text-gray-400 hover:text-[#C8102E] hover:bg-red-50 rounded-full transition-colors"
                title="लिंक कॉपी / शेयर करें"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard Card
  return (
    <article 
      onClick={onClick}
      className="group flex flex-col rounded-xl overflow-hidden bg-white border border-gray-200/90 hover:border-red-300 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      {/* Featured Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img 
          src={post.featuredImage} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="bg-[#C8102E] text-white text-[11px] font-black px-2 py-0.5 rounded shadow-sm tracking-wider uppercase">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-[#C8102E] leading-snug transition-colors line-clamp-2 font-hindi mb-2">
            {post.titleHindi || post.title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
            {post.description}
          </p>
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold text-gray-700 truncate">
              {post.reporterName.split('(')[0]}
            </span>
            <span>•</span>
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="flex items-center gap-0.5 text-gray-400 text-[10px] mr-1">
              <Eye className="w-3 h-3" /> {post.views}
            </span>
            <button 
              onClick={handleWhatsAppShare}
              className="p-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
              title="WhatsApp पर शेयर करें"
            >
              <WhatsAppIcon size={15} />
            </button>
            <button 
              onClick={handleShare}
              className="p-1 hover:text-[#C8102E] rounded transition-colors"
              title={copied ? "कॉपी हो गया!" : "शेयर करें"}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
