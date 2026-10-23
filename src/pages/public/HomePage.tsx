import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  Tv, 
  MapPin, 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  UserPlus, 
  TrendingUp, 
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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-7 sm:space-y-10">
      {/* 1. HERO SECTION */}
      <HeroSection
        featuredPost={featuredPost}
        latestPosts={posts}
        onSelectPost={(slug) => onNavigate(`/news/${slug}`)}
        onViewCategory={(catSlug) => onNavigate(`/category/${catSlug}`)}
      />

      {/* 2. REGIONAL FOCUS: PRAYAGRAJ & UTTAR PRADESH */}
      <section className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b-2 border-red-700 mb-4 sm:mb-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#C8102E]"></span>
            <h2 className="text-base sm:text-2xl font-bold font-hindi text-gray-900 leading-tight">
              प्रयागराज व उत्तर प्रदेश समाचार (Regional Bureau)
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/category/prayagraj')}
            className="text-xs sm:text-sm font-bold text-[#C8102E] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>सभी देखें</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {prayagrajPosts.concat(upPosts).slice(0, 3).map((post) => (
            <NewsCard
              key={post.id}
              post={post}
              onClick={() => onNavigate(`/news/${post.slug}`)}
            />
          ))}
        </div>
      </section>

      {/* 3. REPORTER APPLICATION BANNER - LIGHT THEMED & ANIMATED */}
      <motion.section 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-rose-50/40 to-red-50/60 border border-red-200/90 hover:border-red-400/80 p-4 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500"
      >
        {/* Floating animated ambient light orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            x: [0, 15, 0],
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            repeatType: 'reverse', 
            ease: 'easeInOut' 
          }}
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-red-400/10 blur-3xl pointer-events-none"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -10, 0],
            y: [0, 15, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            repeatType: 'reverse', 
            ease: 'easeInOut' 
          }}
          className="absolute -bottom-10 left-1/4 w-56 h-56 rounded-full bg-amber-400/10 blur-2xl pointer-events-none"
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2 sm:space-y-3 max-w-2xl">
            {/* Light Themed Bold Title */}
            <h3 className="text-xl sm:text-3xl font-black font-hindi tracking-tight text-gray-900 leading-tight">
              पार्थ न्यूज़ के साथ पत्रकारिता में{' '}
              <span className="text-[#C8102E] relative inline-block">
                बनाएं अपनी पहचान
                <svg className="absolute -bottom-1 left-0 w-full h-1.5 text-red-300" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-[15px] text-gray-600 font-hindi leading-relaxed">
              अपने जनपद और तहसील से ज़मीनी सच को जनता तक पहुंचाएं। डिजिटल मीडिया प्रेस कार्ड, ऑनलाइन वेरिफिकेशन और आधिकारिक मान्यता प्राप्त करें।
            </p>
          </div>

          {/* Animated Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('/apply-reporter')}
              className="flex-1 sm:flex-initial bg-gradient-to-r from-[#C8102E] to-[#A30C25] hover:from-[#B00D27] hover:to-[#8B0A1E] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:shadow-red-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Apply Online (आवेदन करें)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('/reporter-status')}
              className="flex-1 sm:flex-initial bg-white hover:bg-red-50/40 text-gray-800 hover:text-[#C8102E] font-bold text-sm px-5 py-3.5 rounded-xl border border-gray-300 hover:border-red-300 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Application Status</span>
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* 4. VIDEO NEWS SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white text-gray-900 rounded-2xl p-4 sm:p-6 shadow-xs border border-gray-200"
      >
        <div className="flex items-center justify-between pb-3 border-b-2 border-red-600 mb-4 sm:mb-5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-xs"></div>
            <h2 className="text-base sm:text-2xl font-bold font-hindi text-gray-900 flex items-center gap-1.5 sm:gap-2 leading-tight">
              <Tv className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 shrink-0" />
              <span>वीडियो बुलेटिन एवं ग्राउंड रिपोर्ट (Video News)</span>
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/videos')}
            className="text-xs sm:text-sm font-bold text-[#C8102E] hover:underline flex items-center gap-1 group cursor-pointer shrink-0"
          >
            <span>सभी देखें</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {videos.slice(0, 3).map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <VideoCard
                video={video}
                onPlay={() => setActiveVideo(video)}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 5. EDITORIAL & OPINION ARTICLES */}
      <section className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-900 mb-4 sm:mb-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-neutral-900"></span>
            <h2 className="text-base sm:text-2xl font-bold font-hindi text-neutral-900 leading-tight">
              संपादकीय एवं विचार (Editorial & In-Depth Analysis)
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/articles')}
            className="text-xs sm:text-sm font-bold text-neutral-800 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>सभी लेख</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
