import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Tv, 
  MapPin, 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  UserPlus, 
  TrendingUp, 
  Sparkles, 
  Play,
  Share2,
  Calendar
} from 'lucide-react';
import { HeroSection } from '../../components/news/HeroSection';
import { NewsCard } from '../../components/news/NewsCard';
import { VideoCard } from '../../components/video/VideoCard';
import { VideoPlayerModal } from '../../components/video/VideoPlayerModal';
import { db } from '../../services/db';
import { Post, VideoNews, Category } from '../../types';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<Post[]>(db.getPublishedPosts());
  const [articles, setArticles] = useState<Post[]>(db.getPublishedArticles());
  const [videos, setVideos] = useState<VideoNews[]>(db.getVideos());
  const [categories, setCategories] = useState<Category[]>(db.getCategories());
  const [activeVideo, setActiveVideo] = useState<VideoNews | null>(null);

  useEffect(() => {
    const unsub = db.subscribe(() => {
      setPosts(db.getPublishedPosts());
      setArticles(db.getPublishedArticles());
      setVideos(db.getVideos());
      setCategories(db.getCategories());
    });
    return unsub;
  }, []);

  const featuredPost = posts.find(p => p.featured) || posts[0];
  const prayagrajPosts = posts.filter(p => p.categorySlug === 'prayagraj' || p.category === 'Prayagraj');
  const upPosts = posts.filter(p => p.categorySlug === 'uttar-pradesh' || p.category === 'Uttar Pradesh');
  const nationalPosts = posts.filter(p => p.categorySlug === 'india' || p.category === 'India');
  const crimePosts = posts.filter(p => p.categorySlug === 'crime' || p.category === 'Crime');
  const sportsPosts = posts.filter(p => p.categorySlug === 'sports' || p.category === 'Sports');
  const educationPosts = posts.filter(p => p.categorySlug === 'education' || p.category === 'Education');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* 1. HERO SECTION */}
      <HeroSection
        featuredPost={featuredPost}
        latestPosts={posts}
        onSelectPost={(slug) => onNavigate(`/news/${slug}`)}
        onViewCategory={(catSlug) => onNavigate(`/category/${catSlug}`)}
      />

      {/* 2. REGIONAL FOCUS: PRAYAGRAJ & UTTAR PRADESH */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b-2 border-red-700 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#C8102E]"></span>
            <h2 className="text-xl sm:text-2xl font-bold font-hindi text-gray-900">
              प्रयागराज व उत्तर प्रदेश समाचार (Regional Bureau)
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/category/prayagraj')}
            className="text-xs sm:text-sm font-bold text-[#C8102E] hover:underline flex items-center gap-1"
          >
            <span>सभी देखें</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prayagrajPosts.concat(upPosts).slice(0, 3).map((post) => (
            <NewsCard
              key={post.id}
              post={post}
              onClick={() => onNavigate(`/news/${post.slug}`)}
            />
          ))}
        </div>
      </section>

      {/* 3. REPORTER APPLICATION BANNER */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#990000] via-[#C8102E] to-[#7B0D1E] text-white p-6 sm:p-8 shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-black/30 text-red-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>पार्थ न्यूज़ संवाददाता भर्ती 2026</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-hindi tracking-tight">
              पार्थ न्यूज़ के साथ पत्रकारिता में बनाएं अपनी पहचान
            </h3>
            <p className="text-sm text-red-100 max-w-2xl font-hindi leading-relaxed">
              अपने जनपद और तहसील से ज़मीनी सच को जनता तक पहुंचाएं। डिजिटल मीडिया प्रेस कार्ड, ऑनलाइन वेरिफिकेशन और आधिकारिक मान्यता प्राप्त करें।
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/apply-reporter')}
              className="bg-white hover:bg-gray-100 text-[#C8102E] font-black text-sm px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Apply Online (आवेदन करें)</span>
            </button>
            <button
              onClick={() => onNavigate('/reporter-status')}
              className="bg-black/40 hover:bg-black/60 text-white font-bold text-sm px-4 py-3 rounded-xl border border-white/30 transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Application Status</span>
            </button>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/5 pointer-events-none"></div>
      </section>

      {/* 4. VIDEO NEWS SECTION */}
      <section className="bg-white text-gray-900 rounded-2xl p-5 sm:p-6 shadow-xs border border-gray-200">
        <div className="flex items-center justify-between pb-3 border-b-2 border-red-600 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-xs"></div>
            <h2 className="text-xl sm:text-2xl font-bold font-hindi text-gray-900 flex items-center gap-2">
              <Tv className="w-6 h-6 text-red-600" />
              <span>वीडियो बुलेटिन एवं ग्राउंड रिपोर्ट (Video News)</span>
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/videos')}
            className="text-xs sm:text-sm font-bold text-[#C8102E] hover:underline flex items-center gap-1"
          >
            <span>सभी वीडियो देखें</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.slice(0, 3).map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={() => setActiveVideo(video)}
            />
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL & OPINION ARTICLES */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-900 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-neutral-900"></span>
            <h2 className="text-xl sm:text-2xl font-bold font-hindi text-neutral-900">
              संपादकीय एवं विचार (Editorial & In-Depth Analysis)
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/articles')}
            className="text-xs sm:text-sm font-bold text-neutral-800 hover:underline flex items-center gap-1"
          >
            <span>सभी लेख</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.slice(0, 2).map((art) => (
            <div
              key={art.id}
              onClick={() => onNavigate(`/article/${art.slug}`)}
              className="group p-4 sm:p-5 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50/20 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-bold text-[#C8102E] uppercase">EDITORIAL / विचार</span>
                  <span>{new Date(art.publishedAt || art.createdAt).toLocaleDateString('hi-IN')}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#C8102E] font-hindi mb-2 leading-snug">
                  {art.titleHindi || art.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                  {art.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-700">
                <span className="font-bold text-gray-800">{art.reporterName}</span>
                <span className="text-[#C8102E] font-bold group-hover:underline flex items-center gap-1">
                  पूरा पढ़ें →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. NATIONAL, CRIME & SPORTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* National */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b-2 border-red-700 mb-4">
            <h3 className="font-bold font-hindi text-base text-gray-900">देश / राष्ट्रीय (National)</h3>
            <button onClick={() => onNavigate('/category/india')} className="text-xs font-semibold text-[#C8102E]">View All</button>
          </div>
          <div className="space-y-3">
            {nationalPosts.slice(0, 3).map((p) => (
              <NewsCard key={p.id} post={p} variant="compact" onClick={() => onNavigate(`/news/${p.slug}`)} />
            ))}
          </div>
        </div>

        {/* Crime */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b-2 border-red-700 mb-4">
            <h3 className="font-bold font-hindi text-base text-gray-900">अपराध व कानून (Crime Bureau)</h3>
            <button onClick={() => onNavigate('/category/crime')} className="text-xs font-semibold text-[#C8102E]">View All</button>
          </div>
          <div className="space-y-3">
            {crimePosts.slice(0, 3).map((p) => (
              <NewsCard key={p.id} post={p} variant="compact" onClick={() => onNavigate(`/news/${p.slug}`)} />
            ))}
          </div>
        </div>

        {/* Sports & Education */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b-2 border-red-700 mb-4">
            <h3 className="font-bold font-hindi text-base text-gray-900">खेल व शिक्षा (Sports & Edu)</h3>
            <button onClick={() => onNavigate('/category/sports')} className="text-xs font-semibold text-[#C8102E]">View All</button>
          </div>
          <div className="space-y-3">
            {sportsPosts.concat(educationPosts).slice(0, 3).map((p) => (
              <NewsCard key={p.id} post={p} variant="compact" onClick={() => onNavigate(`/news/${p.slug}`)} />
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal if playing */}
      <VideoPlayerModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
};
