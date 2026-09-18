import React from 'react';
import { motion } from 'motion/react';
import { Play, Clock, User, Eye, ArrowRight } from 'lucide-react';
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
    <motion.div 
      onClick={onPlay}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-red-500 shadow-xs hover:shadow-xl transition-colors duration-300 cursor-pointer flex flex-col"
    >
      {/* Thumbnail + Play button */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-900">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

        {/* Category & Duration */}
        <div className="absolute top-2.5 left-2.5">
          <span className="bg-[#C8102E] text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider">
            {video.category}
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3 text-red-400" />
          <span>{video.duration}</span>
        </div>

        {/* Animated Play Icon Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Pulsing ring on hover */}
            <span className="absolute w-14 h-14 rounded-full bg-red-600/30 group-hover:animate-ping pointer-events-none transition-all duration-300" />
            <motion.div 
              whileHover={{ scale: 1.15 }}
              className="relative w-12 h-12 rounded-full bg-[#C8102E] group-hover:bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-900/30 group-hover:shadow-red-600/50 transition-all duration-300"
            >
              <Play className="w-5 h-5 fill-white text-white ml-0.5" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Info - Light Themed */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 group-hover:text-[#C8102E] leading-snug line-clamp-2 font-hindi mb-2 transition-colors duration-200">
            {video.titleHindi || video.title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-hindi">
            {video.description}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <div className="flex items-center gap-1.5 truncate font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
            <User className="w-3.5 h-3.5 text-[#C8102E]" />
            <span className="truncate">{video.reporterName}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-gray-400" /> {video.views}
            </span>
            <span>•</span>
            <span>{formatDate(video.publishedAt)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
