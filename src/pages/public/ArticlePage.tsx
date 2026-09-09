import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  User, 
  Calendar, 
  Share2, 
  Eye, 
  MessageCircle, 
  ChevronRight, 
  Flame, 
  Tag, 
  Check, 
  Send,
  Bookmark,
  Printer,
  Sparkles
} from 'lucide-react';
import { db } from '../../services/db';
import { Post } from '../../types';
import { NewsCard } from '../../components/news/NewsCard';
import { 
  FacebookIcon, 
  TwitterXIcon, 
  WhatsAppIcon, 
  TelegramIcon 
} from '../../components/common/SocialIcons';

interface ArticlePageProps {
  slug: string;
  isEditorial?: boolean;
  onNavigate: (path: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ slug, isEditorial = false, onNavigate }) => {
  const [post, setPost] = useState<Post | undefined>(() => 
    isEditorial ? db.getArticleBySlug(slug) : db.getPostBySlug(slug)
  );
  const [copied, setCopied] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [comments, setComments] = useState<{ author: string; text: string; time: string }[]>([
    { author: 'राजेश पाठक (प्रयागराज)', text: 'पार्थ न्यूज़ की यह निष्पक्ष और जमीनी रिपोर्ट अत्यंत सराहनीय है। ऐसे ही सच को सामने लाते रहें।', time: '2 घंटे पहले' }
  ]);

  useEffect(() => {
    const found = isEditorial ? db.getArticleBySlug(slug) : db.getPostBySlug(slug);
    setPost(found);
    if (found) {
      db.incrementPostViews(found.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [slug, isEditorial]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 font-hindi">खबर उपलब्ध नहीं है (Article Not Found)</h2>
        <p className="text-sm text-gray-500">यह खबर हटा दी गई है या इसका लिंक बदल गया है।</p>
        <button
          onClick={() => onNavigate('/')}
          className="bg-[#C8102E] text-white px-5 py-2.5 rounded-lg text-sm font-bold"
        >
          होमपेज पर जाएं (Back to Home)
        </button>
      </div>
    );
  }

  const relatedPosts = db.getPublishedPosts()
    .filter(p => p.id !== post.id && (p.categorySlug === post.categorySlug || p.category === post.category))
    .slice(0, 3);

  const trendingPosts = db.getPublishedPosts()
    .filter(p => p.id !== post.id)
    .slice(0, 4);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://parthnews.in/news/${post.slug}`;
  const shareTitle = post.titleHindi || post.title;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`${shareTitle}\n\nपार्थ न्यूज़ (सच के साथ, एक कदम आगे) पर पढ़ें:\n${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${shareTitle} via @ParthNewsLive`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !commentAuthor.trim()) return;
    setComments([
      { author: commentAuthor, text: commentText, time: 'अभी-अभी' },
      ...comments
    ]);
    setCommentText('');
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '';
    try {
      return new Date(isoString).toLocaleDateString('hi-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 font-medium overflow-x-auto whitespace-nowrap">
        <button onClick={() => onNavigate('/')} className="hover:text-[#C8102E]">होम (Home)</button>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <button onClick={() => onNavigate(`/category/${post.categorySlug}`)} className="hover:text-[#C8102E] uppercase font-bold text-red-700">
          {post.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="truncate max-w-xs text-gray-700">{post.titleHindi || post.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Article Content (8 cols) */}
        <article className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-8 border border-gray-200 shadow-xs space-y-6">
          {/* Header */}
          <div className="space-y-3 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="bg-[#C8102E] text-white text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider">
                {post.category}
              </span>
              {post.breaking && (
                <span className="bg-neutral-900 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <Flame className="w-3 h-3 text-red-500 fill-red-500" /> BREAKING
                </span>
              )}
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight font-hindi">
              {post.titleHindi || post.title}
            </h1>

            {post.titleHindi && post.title && (
              <h2 className="text-base sm:text-lg font-semibold text-gray-600 leading-snug">
                {post.title}
              </h2>
            )}

            {/* Subtitle / Lead Paragraph */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-hindi bg-red-50/50 p-3.5 rounded-xl border-l-4 border-[#C8102E]">
              {post.description}
            </p>

            {/* Reporter & Metadata Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-xs text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 border border-red-300 flex items-center justify-center font-bold text-[#C8102E]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm font-hindi">
                    {post.reporterName}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {post.reporterRole || 'वरिष्ठ संवाददाता, पार्थ न्यूज़'}
                  </div>
                </div>
              </div>

              <div className="text-right text-[11px] text-gray-500 space-y-0.5">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>प्रकाशित: {formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
                <div className="flex items-center justify-end gap-2 text-gray-400">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.views} Views</span>
                  <span>•</span>
                  <span>{post.readTimeMinutes || 3} मिनट पठन</span>
                </div>
              </div>
            </div>

            {/* Social Share Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-[#C8102E]" /> शेयर करें (Share):
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs"
                  title="Share on WhatsApp"
                >
                  <WhatsAppIcon size={18} />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={handleShareFacebook}
                  className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs"
                  title="Share on Facebook"
                >
                  <FacebookIcon size={18} />
                  <span>Facebook</span>
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="inline-flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs"
                  title="Share on X"
                >
                  <TwitterXIcon size={18} />
                  <span>X (Twitter)</span>
                </button>
                <button
                  onClick={() => {
                    const text = encodeURIComponent(`${shareTitle}\n${currentUrl}`);
                    window.open(`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
                  }}
                  className="inline-flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs"
                  title="Share on Telegram"
                >
                  <TelegramIcon size={18} />
                  <span>Telegram</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="space-y-2">
            <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-gray-100 shadow-xs">
              <img 
                src={post.featuredImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-gray-500 italic text-center font-hindi">
              फोटो: पार्थ न्यूज़ विशेष ग्राउंड कवरेज
            </p>
          </div>

          {/* Main Article Body */}
          <div className="prose prose-red max-w-none text-gray-800 text-sm sm:text-base leading-relaxed font-hindi space-y-4">
            {post.content.split('\n\n').map((block, idx) => {
              if (block.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl font-black text-gray-900 pt-3 border-l-4 border-[#C8102E] pl-3">
                    {block.replace('### ', '')}
                  </h3>
                );
              }
              if (block.startsWith('#### ')) {
                return (
                  <h4 key={idx} className="text-lg font-bold text-gray-900 pt-2 text-[#C8102E]">
                    {block.replace('#### ', '')}
                  </h4>
                );
              }
              if (block.startsWith('> ')) {
                return (
                  <blockquote key={idx} className="bg-red-50/60 border-l-4 border-[#C8102E] p-4 rounded-r-xl my-4 text-gray-800 italic font-medium">
                    {block.replace('> ', '')}
                  </blockquote>
                );
              }
              if (block.startsWith('- ')) {
                const items = block.split('\n- ');
                return (
                  <ul key={idx} className="list-disc pl-5 space-y-1.5 my-3 text-gray-700">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              if (/^\d+\.\s/.test(block)) {
                const items = block.split(/\n\d+\.\s/);
                return (
                  <ol key={idx} className="list-decimal pl-5 space-y-1.5 my-3 text-gray-700">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={idx} className="text-gray-800 leading-relaxed font-normal">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#C8102E]" /> Tags:
              </span>
              {post.tags.map((t, idx) => (
                <span key={idx} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium cursor-pointer">
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Editorial Trust Statement */}
          <div className="bg-neutral-900 text-white p-4 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C8102E] flex items-center justify-center shrink-0 font-hindi font-black text-lg">
              प
            </div>
            <div className="text-xs">
              <strong className="block font-bold text-sm text-red-300">पार्थ न्यूज़ सत्यनिष्ठा संकल्प</strong>
              <p className="text-gray-300 font-hindi">
                "सच के साथ, एक कदम आगे" — किसी भी तथ्य में त्रुटि होने पर तुरंत हमारे संपादक मंडल को सूचित करें।
              </p>
            </div>
          </div>

          {/* Public Comments Section */}
          <div className="pt-6 border-t border-gray-200 space-y-4">
            <h3 className="text-lg font-bold font-hindi text-gray-900 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#C8102E]" />
              <span>पाठकों की प्रतिक्रिया (Comments & Opinions)</span>
            </h3>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="आपका नाम (Your Name)"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  required
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>
              <textarea
                placeholder="इस समाचार पर अपनी विचार या राय लिखें..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                required
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-xs focus:outline-hidden focus:border-[#C8102E]"
              />
              <button
                type="submit"
                className="bg-[#C8102E] hover:bg-[#A30C25] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>प्रतिक्रिया भेजें (Submit Comment)</span>
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-2.5">
              {comments.map((c, i) => (
                <div key={i} className="p-3 bg-white border border-gray-100 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-900">{c.author}</span>
                    <span className="text-gray-400 text-[11px]">{c.time}</span>
                  </div>
                  <p className="text-xs text-gray-700 font-hindi">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Become a reporter widget */}
          <div className="bg-gradient-to-br from-[#990000] to-[#C8102E] text-white p-5 rounded-2xl shadow-md space-y-3">
            <span className="bg-black/30 text-red-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Join Parth News
            </span>
            <h3 className="text-lg font-bold font-hindi">
              क्या आप बनना चाहते हैं पार्थ न्यूज़ संवाददाता?
            </h3>
            <p className="text-xs text-red-100 font-hindi">
              अपने जिले या शहर से रिपोर्टिंग करें। ऑनलाइन आवेदन कर डिजिटल आईडी कार्ड प्राप्त करें।
            </p>
            <button
              onClick={() => onNavigate('/apply-reporter')}
              className="w-full bg-white text-[#C8102E] font-black text-xs py-2.5 rounded-xl shadow transition-transform hover:scale-[1.02]"
            >
              Apply as Reporter →
            </button>
          </div>

          {/* Related Stories in this Category */}
          {relatedPosts.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold font-hindi text-gray-900 pb-2 border-b-2 border-red-600 flex items-center justify-between">
                <span>संबंधित खबरें (Related Stories)</span>
                <span className="text-xs text-[#C8102E] font-medium">{post.category}</span>
              </h3>
              <div className="space-y-3">
                {relatedPosts.map((p) => (
                  <NewsCard key={p.id} post={p} variant="compact" onClick={() => onNavigate(`/news/${p.slug}`)} />
                ))}
              </div>
            </div>
          )}

          {/* Trending Stories */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold font-hindi text-gray-900 pb-2 border-b-2 border-neutral-900 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-red-600" />
              <span>ट्रेंडिंग समाचार (Trending Now)</span>
            </h3>
            <div className="space-y-3">
              {trendingPosts.map((p) => (
                <NewsCard key={p.id} post={p} variant="compact" onClick={() => onNavigate(`/news/${p.slug}`)} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
