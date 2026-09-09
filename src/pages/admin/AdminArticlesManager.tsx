import React, { useState } from 'react';
import { Plus, Search, Edit3, Trash2, FileText, X } from 'lucide-react';
import { db } from '../../services/db';
import { Post, Category } from '../../types';

export const AdminArticlesManager: React.FC = () => {
  const [articles, setArticles] = useState<Post[]>(db.getArticles());
  const [categories] = useState<Category[]>(db.getCategories());
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Post | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    titleHindi: '',
    categorySlug: 'editorial',
    description: '',
    content: '',
    reporterName: 'वरिष्ठ संपादक, पार्थ न्यूज़',
    reporterRole: 'मुख्य संपादकीय मंडल',
    featuredImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
    status: 'published' as 'published' | 'draft'
  });

  const refreshList = () => {
    setArticles(db.getArticles());
  };

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      titleHindi: '',
      categorySlug: 'editorial',
      description: '',
      content: '',
      reporterName: 'वरिष्ठ संपादक, पार्थ न्यूज़',
      reporterRole: 'मुख्य संपादकीय मंडल',
      featuredImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
      status: 'published'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (art: Post) => {
    setEditingArticle(art);
    setFormData({
      title: art.title,
      titleHindi: art.titleHindi || '',
      categorySlug: art.categorySlug,
      description: art.description,
      content: art.content,
      reporterName: art.reporterName,
      reporterRole: art.reporterRole || 'मुख्य संपादकीय मंडल',
      featuredImage: art.featuredImage,
      status: art.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`क्या आप इस आलेख "${title}" को हटाना चाहते हैं?`)) {
      db.deleteArticle(id);
      refreshList();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleHindi.trim() && !formData.title.trim()) return;

    if (editingArticle) {
      db.updateArticle(editingArticle.id, {
        title: formData.title || formData.titleHindi,
        titleHindi: formData.titleHindi,
        category: 'Editorial',
        categorySlug: formData.categorySlug,
        description: formData.description,
        content: formData.content,
        reporterName: formData.reporterName,
        reporterRole: formData.reporterRole,
        featuredImage: formData.featuredImage,
        status: formData.status
      });
    } else {
      db.createArticle({
        title: formData.title || formData.titleHindi,
        titleHindi: formData.titleHindi,
        category: 'Editorial',
        categorySlug: formData.categorySlug,
        description: formData.description,
        content: formData.content,
        reporterName: formData.reporterName,
        reporterRole: formData.reporterRole,
        featuredImage: formData.featuredImage,
        status: formData.status,
        tags: ['संपादकीय', 'विशेष'],
        featured: false,
        breaking: false
      });
    }

    setIsModalOpen(false);
    refreshList();
  };

  const filtered = articles.filter(a =>
    !searchQuery.trim() ||
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (a.titleHindi && a.titleHindi.toLowerCase().includes(searchQuery.toLowerCase())) ||
    a.reporterName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-hindi text-gray-900">
            संपादकीय एवं विचार आलेख (Editorial Columns)
          </h1>
          <p className="text-xs text-gray-500 font-hindi">
            गहन विश्लेषण, विचार एवं संपादकीय स्तंभकारों के लेख प्रबंधन
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-neutral-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>नया आलेख जोड़ें (Write Article)</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="आलेख या लेखक खोजें..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-800 focus:outline-hidden focus:border-[#C8102E]"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-gray-700">
          <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="px-5 py-3">Article</th>
              <th className="px-4 py-3">Author / Columnist</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((art) => (
              <tr key={art.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-5 py-3.5 max-w-md">
                  <h4 className="font-bold text-gray-900 font-hindi truncate">
                    {art.titleHindi || art.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">
                    {art.description}
                  </p>
                </td>
                <td className="px-4 py-3.5 font-hindi font-medium text-gray-800">
                  {art.reporterName}
                </td>
                <td className="px-4 py-3.5 text-gray-500">
                  {new Date(art.createdAt).toLocaleDateString('hi-IN')}
                </td>
                <td className="px-4 py-3.5">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    {art.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right space-x-1.5">
                  <button
                    onClick={() => handleOpenEdit(art)}
                    className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-700"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(art.id, art.titleHindi || art.title)}
                    className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-base font-bold font-hindi text-gray-900">
                {editingArticle ? 'संपादकीय आलेख संपादित करें' : 'नया संपादकीय आलेख जोड़ें'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">आलेख का शीर्षक (Hindi Headline) *</label>
                <input
                  type="text"
                  required
                  value={formData.titleHindi || ''}
                  onChange={(e) => setFormData({ ...formData, titleHindi: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-sm font-hindi text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">लेखक / स्तंभकार का नाम (Author Name) *</label>
                <input
                  type="text"
                  required
                  value={formData.reporterName || ''}
                  onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">संक्षिप्त भूमिका (Summary) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs font-hindi text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">संपूर्ण आलेख सामग्री (Content) *</label>
                <textarea
                  rows={6}
                  required
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs font-hindi text-gray-900 focus:outline-hidden focus:border-[#C8102E] leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-neutral-900 hover:bg-black text-white font-bold px-6 py-2 rounded-xl shadow"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
