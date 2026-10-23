import React, { useState, useEffect } from 'react';
import { Flame, ChevronRight } from 'lucide-react';
import { db } from '../../services/db';

interface BreakingTickerProps {
  onNavigate?: (path: string) => void;
  onSelectPost?: (slug: string) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ onNavigate, onSelectPost }) => {
  const [settings, setSettings] = useState(db.getSettings());
  const [breakingPosts, setBreakingPosts] = useState(db.getPublishedPosts().filter(p => p.breaking));

  const handlePostClick = (slug: string) => {
    if (onNavigate) {
      onNavigate(`/news/${slug}`);
    } else if (onSelectPost) {
      onSelectPost(slug);
    }
  };

  useEffect(() => {
    const unsub = db.subscribe(() => {
      setSettings(db.getSettings());
      setBreakingPosts(db.getPublishedPosts().filter(p => p.breaking));
    });
    return unsub;
  }, []);

  if (!settings.breakingNewsEnabled) return null;

  return (
    <div className="bg-[#111111] text-white border-b border-red-900/40 relative z-30 shadow-inner w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center h-9 sm:h-10 overflow-hidden">
        {/* Breaking Badge */}
        <div className="shrink-0 flex items-center gap-1 sm:gap-1.5 bg-[#C8102E] text-white font-black text-[10px] sm:text-xs uppercase px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm tracking-wider shadow-sm mr-2 sm:mr-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white" />
          <span className="font-['Outfit',sans-serif] font-black">BREAKING</span>
          <span className="font-hindi text-[10px] sm:text-[11px] hidden sm:inline ml-0.5 font-semibold">ताज़ा खबर</span>
        </div>

        {/* Marquee or Dynamic Headlines */}
        <div className="overflow-hidden whitespace-nowrap relative flex-1 text-sm font-medium">
          <div className="animate-marquee inline-flex items-center gap-8 text-gray-200">
            {breakingPosts.length > 0 ? (
              breakingPosts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => handlePostClick(post.slug)}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <span className="text-[#E50914] font-bold">●</span>
                  <span className="font-hindi text-[13px] text-red-300 font-semibold">[{post.category}]</span>
                  <span className="hover:underline">{post.titleHindi || post.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 inline" />
                </button>
              ))
            ) : (
              <span className="text-gray-300 font-hindi">
                {settings.breakingNewsText}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
