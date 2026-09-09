import React from 'react';
import { Play, Clock, User, Eye, Share2 } from 'lucide-react';
import { VideoNews } from '../../types';

interface VideoCardProps {
  video: VideoNews;
  onPlay: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onPlay }) => {
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
    <div 
      onClick={onPlay}
      className="group bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-red-600 transition-all duration-300 cursor-pointer flex flex-col shadow-md hover:shadow-xl transform hover:-translate-y-1"
    >
      {/* Thumbnail + Play button */}
      <div className="relative h-48 w-full overflow-hidden bg-black">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

        {/* Category & Duration */}
        <div className="absolute top-2.5 left-2.5">
          <span className="bg-[#C8102E] text-white text-[10px] font-black px-2 py-0.5 rounded shadow uppercase tracking-wider">
            {video.category}
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5 bg-black/80 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
          <Clock className="w-3 h-3 text-red-400" />
          <span>{video.duration}</span>
        </div>

        {/* Play Icon Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#C8102E] group-hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:shadow-red-900/50">
            <Play className="w-5 h-5 fill-white text-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col justify-between text-white">
        <div>
          <h3 className="text-sm font-bold group-hover:text-red-400 leading-snug line-clamp-2 font-hindi mb-2 transition-colors">
            {video.titleHindi || video.title}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {video.description}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-1.5 truncate">
            <User className="w-3.5 h-3.5 text-[#C8102E]" />
            <span className="truncate">{video.reporterName}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-0.5">
              <Eye className="w-3 h-3" /> {video.views}
            </span>
            <span>•</span>
            <span>{formatDate(video.publishedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
