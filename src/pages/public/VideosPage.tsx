import React, { useState, useEffect } from 'react';
import { Tv, Play, Search, Clock, Eye, Sparkles } from 'lucide-react';
import { db } from '../../services/db';
import { VideoNews } from '../../types';
import { VideoCard } from '../../components/video/VideoCard';
import { VideoPlayerModal } from '../../components/video/VideoPlayerModal';

interface VideosPageProps {
  onNavigate: (path: string) => void;
}

export const VideosPage: React.FC<VideosPageProps> = ({ onNavigate }) => {
  const [videos, setVideos] = useState<VideoNews[]>(() => db.getVideos());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeVideo, setActiveVideo] = useState<VideoNews | null>(null);

  useEffect(() => {
    const unsub = db.subscribe(() => {
      setVideos(db.getVideos());
    });
    return unsub;
  }, []);

  const categories = Array.from(new Set(videos.map(v => v.category)));

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(v => v.category === selectedCategory);

  const featuredVideo = videos.find(v => v.featured) || videos[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header Banner */}
      <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-red-100 text-[#C8102E] text-xs font-bold px-3 py-1 rounded-full uppercase">
            <Tv className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>पार्थ न्यूज़ डिजिटल वीडियो बुलेटिन</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-hindi text-gray-900">
            वीडियो बुलेटिन, ग्राउंड रिपोर्ट व विशेष इंटरव्यू
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-hindi max-w-xl">
            प्रयागराज, उत्तर प्रदेश और देश-दुनिया की हर बड़ी खबर पर पार्थ न्यूज़ की ग्राउंड जीरो से खास वीडियो कवरेज।
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#C8102E] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Videos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#C8102E] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Video Player Spotlight */}
      {featuredVideo && selectedCategory === 'all' && (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg grid grid-cols-1 lg:grid-cols-12">
          <div 
            onClick={() => setActiveVideo(featuredVideo)}
            className="lg:col-span-8 relative aspect-video bg-black cursor-pointer group"
          >
            <img 
              src={featuredVideo.thumbnail} 
              alt={featuredVideo.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#C8102E] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 fill-white text-white ml-1" />
              </div>
            </div>
            <div className="absolute top-4 left-4">
              <span className="bg-[#C8102E] text-white text-xs font-black px-3 py-1 rounded shadow uppercase">
                FEATURED VIDEO
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-[#C8102E] uppercase tracking-wider">
                {featuredVideo.category} • {featuredVideo.duration}
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-hindi text-gray-900 mt-2 mb-3 leading-snug">
                {featuredVideo.titleHindi || featuredVideo.title}
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                {featuredVideo.description}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="font-bold text-gray-700">{featuredVideo.reporterName}</span>
              <button
                onClick={() => setActiveVideo(featuredVideo)}
                className="bg-[#C8102E] hover:bg-[#A30C25] text-white px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play Video</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onPlay={() => setActiveVideo(video)}
          />
        ))}
      </div>

      <VideoPlayerModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
};
