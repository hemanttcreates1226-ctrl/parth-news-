import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Filter, FileText, Video, Newspaper, User, ChevronRight, Calendar } from 'lucide-react';
import { db } from '../../services/db';
import { Post, VideoNews, Category } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'news' | 'articles' | 'videos'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const posts = db.getPublishedPosts();
  const articles = db.getPublishedArticles();
  const videos = db.getVideos();
  const categories = db.getCategories();
  const reporters = db.getReporters();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return { posts: [], articles: [], videos: [], reporters: [] };
    }

    const q = query.toLowerCase().trim();

    const filteredPosts = (selectedType === 'all' || selectedType === 'news')
      ? posts.filter(p => {
          const matchCat = selectedCategory === 'all' || p.categorySlug === selectedCategory;
          const matchText = p.title.toLowerCase().includes(q) || 
                            (p.titleHindi && p.titleHindi.toLowerCase().includes(q)) ||
                            p.description.toLowerCase().includes(q) ||
                            p.reporterName.toLowerCase().includes(q) ||
                            p.tags.some(t => t.toLowerCase().includes(q));
          return matchCat && matchText;
        })
      : [];

    const filteredArticles = (selectedType === 'all' || selectedType === 'articles')
      ? articles.filter(a => {
          const matchCat = selectedCategory === 'all' || a.categorySlug === selectedCategory;
          const matchText = a.title.toLowerCase().includes(q) || 
                            (a.titleHindi && a.titleHindi.toLowerCase().includes(q)) ||
                            a.description.toLowerCase().includes(q) ||
                            a.reporterName.toLowerCase().includes(q);
          return matchCat && matchText;
        })
      : [];

    const filteredVideos = (selectedType === 'all' || selectedType === 'videos')
      ? videos.filter(v => {
          const matchCat = selectedCategory === 'all' || v.categorySlug === selectedCategory;
          const matchText = v.title.toLowerCase().includes(q) || 
                            (v.titleHindi && v.titleHindi.toLowerCase().includes(q)) ||
                            v.description.toLowerCase().includes(q) ||
                            v.reporterName.toLowerCase().includes(q);
          return matchCat && matchText;
        })
      : [];

    const filteredReporters = selectedType === 'all'
      ? reporters.filter(r => 
          r.name.toLowerCase().includes(q) ||
          r.reporterId.toLowerCase().includes(q) ||
          r.district.toLowerCase().includes(q)
        )
      : [];

    return {
      posts: filteredPosts,
      articles: filteredArticles,
      videos: filteredVideos,
      reporters: filteredReporters
    };
  }, [query, selectedType, selectedCategory, posts, articles, videos, reporters]);

  if (!isOpen) return null;

  const totalResults = results.posts.length + results.articles.length + results.videos.length + results.reporters.length;

  const handleSelect = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-200 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3 bg-gray-50">
          <Search className="w-5 h-5 text-[#C8102E] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news, Prayagraj, UP politics, videos, reporters... (खोजें)"
            autoFocus
            className="w-full bg-transparent text-base font-medium text-gray-900 placeholder-gray-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2.5 py-1.5 rounded font-semibold transition-colors shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs bg-white">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 font-semibold flex items-center gap-1">
              <Filter className="w-3 h-3" /> Type:
            </span>
            {(['all', 'news', 'articles', 'videos'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-2.5 py-1 rounded-full font-semibold capitalize transition-colors ${
                  selectedType === type
                    ? 'bg-[#C8102E] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 font-semibold">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-100 border border-gray-200 text-gray-800 rounded px-2 py-0.5 text-xs focus:outline-hidden"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {!query.trim() ? (
            <div className="py-12 text-center text-gray-400">
              <Search className="w-10 h-10 mx-auto mb-2 text-gray-300" />
              <p className="text-sm font-medium">Type a keyword to search Parth News archive</p>
              <p className="text-xs text-gray-400 font-hindi mt-1">प्रयागराज, उत्तर प्रदेश, खेल, अपराध, आदि खोजें</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <p className="text-base font-bold text-gray-700">No results found for "{query}"</p>
              <p className="text-xs text-gray-400 mt-1">Try checking for typos or searching in another category.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* News Posts */}
              {results.posts.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#C8102E] uppercase tracking-wider flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5" />
                    <span>News Stories ({results.posts.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.posts.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => handleSelect(`/news/${post.slug}`)}
                        className="group p-2.5 rounded-lg hover:bg-red-50/50 border border-transparent hover:border-red-200 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img 
                            src={post.featuredImage} 
                            alt={post.title} 
                            className="w-12 h-12 rounded object-cover shrink-0" 
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-[#C8102E] uppercase">
                              {post.category}
                            </span>
                            <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#C8102E] truncate font-hindi">
                              {post.titleHindi || post.title}
                            </h4>
                            <p className="text-[11px] text-gray-500 truncate">
                              {post.description}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#C8102E] shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Videos */}
              {results.videos.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" />
                    <span>Video Bulletins ({results.videos.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.videos.map((vid) => (
                      <div
                        key={vid.id}
                        onClick={() => handleSelect(`/videos`)}
                        className="group p-2.5 rounded-lg hover:bg-gray-100 border border-transparent hover:border-gray-300 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img 
                            src={vid.thumbnail} 
                            alt={vid.title} 
                            className="w-12 h-12 rounded object-cover shrink-0" 
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-red-600 uppercase">
                              {vid.category} • {vid.duration}
                            </span>
                            <h4 className="text-xs font-bold text-gray-900 group-hover:text-red-600 truncate font-hindi">
                              {vid.titleHindi || vid.title}
                            </h4>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reporters */}
              {results.reporters.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>Authorized Reporters ({results.reporters.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.reporters.map((rep) => (
                      <div
                        key={rep.id}
                        onClick={() => handleSelect(`/verify-reporter/${rep.reporterId}`)}
                        className="group p-2.5 rounded-lg hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img 
                            src={rep.photo} 
                            alt={rep.name} 
                            className="w-10 h-10 rounded-full object-cover shrink-0 border" 
                          />
                          <div>
                            <h4 className="text-xs font-bold text-gray-900 font-hindi">
                              {rep.name}
                            </h4>
                            <p className="text-[10px] text-gray-500 font-mono">
                              {rep.reporterId} • {rep.designation} • {rep.district}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 group-hover:underline">
                          Verify ID →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
