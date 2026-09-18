import React, { useState, useEffect, useMemo } from 'react';
import { Filter, Grid, List, Search, ArrowRight, ChevronRight } from 'lucide-react';
import { db } from '../../services/db';
import { Post, Category } from '../../types';
import { NewsCard } from '../../components/news/NewsCard';

interface NewsArchivePageProps {
  categorySlug?: string;
  isEditorialSection?: boolean;
  onNavigate: (path: string) => void;
}

export const NewsArchivePage: React.FC<NewsArchivePageProps> = ({
  categorySlug,
  isEditorialSection = false,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categorySlug || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [allPosts, setAllPosts] = useState<Post[]>(() => 
    isEditorialSection ? db.getPublishedArticles() : db.getPublishedPosts()
  );
  const [categories, setCategories] = useState<Category[]>(() => db.getCategories());

  useEffect(() => {
    const unsub = db.subscribe(() => {
      setAllPosts(isEditorialSection ? db.getPublishedArticles() : db.getPublishedPosts());
      setCategories(db.getCategories());
    });
    return unsub;
  }, [isEditorialSection]);

  const currentCategoryObj = categories.find(c => c.slug === categorySlug);

  const filteredPosts = useMemo(() => {
    return allPosts.filter(p => {
      const matchCat = (selectedCategory === 'all' || !selectedCategory) 
        ? true 
        : p.categorySlug === selectedCategory || p.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
      
      const matchQuery = !searchQuery.trim()
        ? true
        : p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.titleHindi && p.titleHindi.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchQuery;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  const pageTitle = isEditorialSection 
    ? 'संपादकीय एवं विचार (Articles & Editorial)' 
    : currentCategoryObj 
      ? `${currentCategoryObj.nameHindi || currentCategoryObj.name} समाचार`
      : 'ताज़ा समाचार एवं खबरें (All Latest News)';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header & Breadcrumb */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
          <button onClick={() => onNavigate('/')} className="hover:text-[#C8102E]">होम (Home)</button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#C8102E] font-bold">
            {isEditorialSection ? 'संपादकीय लेख' : currentCategoryObj ? currentCategoryObj.name : 'ताज़ा खबरें'}
          </span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-hindi text-gray-900">
              {pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 font-hindi mt-1">
              {currentCategoryObj ? currentCategoryObj.description : 'पार्थ न्यूज़ का आधिकारिक डिजिटल न्यूज़ आर्काइव — सच के साथ, एक कदम आगे।'}
            </p>
          </div>

          {/* Search bar inside archive */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="इस श्रेणी में खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-gray-800 focus:outline-hidden focus:border-[#C8102E] w-48 sm:w-64"
              />
            </div>

            <div className="hidden sm:flex border border-gray-200 rounded-lg p-0.5 bg-gray-50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-xs text-[#C8102E]' : 'text-gray-500'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-xs text-[#C8102E]' : 'text-gray-500'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        {!isEditorialSection && (
          <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#C8102E] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              सभी समाचार (All)
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.slug
                    ? 'bg-[#C8102E] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name} ({cat.nameHindi})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* News Grid / List */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-200 space-y-3">
          <p className="text-base font-bold text-gray-700 font-hindi">कोई खबर नहीं मिली (No News Stories Found)</p>
          <p className="text-xs text-gray-500">कृपया अन्य श्रेणी चुनें या सर्च कीवर्ड बदलें।</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <NewsCard
              key={post.id}
              post={post}
              onClick={() => onNavigate(isEditorialSection ? `/article/${post.slug}` : `/news/${post.slug}`)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <NewsCard
              key={post.id}
              post={post}
              variant="horizontal"
              onClick={() => onNavigate(isEditorialSection ? `/article/${post.slug}` : `/news/${post.slug}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
