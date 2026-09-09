import React from 'react';
import { X, User, Calendar, Tag, Share2, Eye } from 'lucide-react';
import { VideoNews } from '../../types';

interface VideoPlayerModalProps {
  video: VideoNews | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video.titleHindi || video.title,
        text: video.description,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Video link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#141414] text-white w-full max-w-4xl rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900 border-b border-neutral-800">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-[#C8102E] text-white text-xs font-black px-2 py-0.5 rounded uppercase">
              {video.category}
            </span>
            <span className="text-sm font-semibold truncate font-hindi">
              {video.titleHindi || video.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          {video.embedUrl ? (
            <iframe
              src={video.embedUrl}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={video.videoUrl}
              poster={video.thumbnail}
              controls
              autoPlay
              className="w-full h-full"
            />
          )}
        </div>

        {/* Video Details */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-hindi text-white">
                {video.titleHindi || video.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-1">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#C8102E]" /> {video.reporterName}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {new Date(video.publishedAt).toLocaleDateString('hi-IN')}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> {video.views} views
                </span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shrink-0"
            >
              <Share2 className="w-4 h-4 text-red-400" />
              <span>Share Video</span>
            </button>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed font-hindi">
            {video.description}
          </p>

          {/* Tags */}
          {video.tags && video.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <Tag className="w-3.5 h-3.5 text-gray-400" />
              {video.tags.map((t, idx) => (
                <span key={idx} className="bg-neutral-800 text-gray-300 text-xs px-2 py-0.5 rounded">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
