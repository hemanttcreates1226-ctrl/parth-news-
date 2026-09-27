import React from 'react';
import { Clock, User, ArrowRight, Flame, Eye } from 'lucide-react';
import { Post } from '../../types';
import { WhatsAppIcon } from '../common/SocialIcons';
import { sharePostToWhatsApp } from '../../utils/shareUtils';

interface HeroSectionProps {
  featuredPost?: Post;
  latestPosts: Post[];
  onSelectPost: (slug: string) => void;
  onViewCategory: (cat: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredPost,
  latestPosts,
  onSelectPost,
  onViewCategory
}) => {
  if (!featuredPost && latestPosts.length === 0) return null;

  const lead = featuredPost || latestPosts[0];
  const sidePosts = featuredPost ? latestPosts.filter(p => p.id !== featuredPost.id).slice(0, 4) : latestPosts.slice(1, 5);

  const formatDate = (isoString?: string) => {
    if (!isoString) return '';
    try {
      return new Date(isoString).toLocaleDateString('hi-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return '';
    }
  };

  return (
    <section className="mb-8">
      {/* Top Banner Tagline */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-900 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#C8102E] inline-block"></span>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight font-hindi uppercase">
            मुख्य समाचार (Top Headlines)
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Major Featured Lead Story (8 cols) */}
        {lead && (
          <div 
            onClick={() => onSelectPost(lead.slug)}
            className="lg:col-span-8 group bg-white rounded-2xl overflow-hidden border border-gray-200/90 hover:border-red-300 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Hero Image */}
            <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-gray-900">
              <img 
                src={lead.featuredImage} 
                alt={lead.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewCategory(lead.categorySlug || lead.category.toLowerCase().replace(/\s+/g, '-'));
                  }}
                  className="bg-[#C8102E] hover:bg-[#A30C25] text-white text-xs font-black px-3 py-1 rounded shadow-md uppercase tracking-wider transition-colors"
                >
                  {lead.category}
                </button>
                {lead.breaking && (
                  <span className="bg-neutral-950/90 text-white text-xs font-bold px-2.5 py-1 rounded border border-red-500 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-500 fill-red-500" /> BREAKING
                  </span>
                )}
              </div>

              {/* Title & Overlay Content for mobile/desktop */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight font-hindi group-hover:text-red-300 transition-colors drop-shadow-md mb-2">
                  {lead.titleHindi || lead.title}
                </h1>
                <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 drop-shadow hidden sm:block">
                  {lead.description}
                </p>
              </div>
            </div>

            {/* Bottom Meta & Read Action */}
            <div className="p-4 sm:p-5 bg-white flex flex-wrap items-center justify-between gap-3 border-t border-gray-100">
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1.5 font-bold text-gray-800">
                  <User className="w-4 h-4 text-[#C8102E]" />
                  <span>{lead.reporterName}</span>
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatDate(lead.publishedAt || lead.createdAt)}</span>
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{lead.views}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sharePostToWhatsApp(lead);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold transition-all border border-emerald-200 cursor-pointer"
                  title="WhatsApp पर शेयर करें"
                >
                  <WhatsAppIcon size={18} />
                  <span>शेयर करें</span>
                </button>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C8102E] group-hover:translate-x-1 transition-transform">
                  <span>पूरी खबर पढ़ें</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right: Trending / Latest Headlines Stack (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
          <div className="bg-[#111111] text-white p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#C8102E] fill-[#C8102E]" />
              <span className="font-bold text-xs uppercase tracking-wider">ताज़ा बुलेटिन (Latest Feed)</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          </div>

          <div className="space-y-2.5 flex-1 flex flex-col justify-between">
            {sidePosts.map((post, idx) => (
              <div
                key={post.id}
                onClick={() => onSelectPost(post.slug)}
                className="group flex gap-3 p-3 rounded-xl bg-white hover:bg-red-50/40 border border-gray-200 hover:border-red-300 shadow-xs hover:shadow-sm transition-all cursor-pointer"
              >
                {/* Numbered Index */}
                <div className="w-7 h-7 shrink-0 rounded-full bg-red-100 text-[#C8102E] font-black text-xs flex items-center justify-center group-hover:bg-[#C8102E] group-hover:text-white transition-colors">
                  0{idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <span className="text-[10px] font-bold uppercase text-[#C8102E] tracking-wider">
                      {post.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sharePostToWhatsApp(post);
                      }}
                      className="p-0.5 hover:scale-110 active:scale-95 transition-transform cursor-pointer rounded-full"
                      title="WhatsApp पर शेयर करें"
                    >
                      <WhatsAppIcon size={16} />
                    </button>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#C8102E] line-clamp-2 leading-snug font-hindi transition-colors">
                    {post.titleHindi || post.title}
                  </h4>
                </div>

                {/* Thumbnail */}
                <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
