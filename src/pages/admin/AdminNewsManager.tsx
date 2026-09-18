import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Flame, 
  Check, 
  X, 
  Tag, 
  Sparkles,
  Newspaper,
  Image as ImageIcon
} from 'lucide-react';
import { db } from '../../services/db';
import { Post, Category } from '../../types';
import { AdminConfirmDialog } from '../../components/admin/AdminConfirmDialog';
import { AdminToast, ToastMessage } from '../../components/admin/AdminToast';

interface AdminNewsManagerProps {
  initialCreateOpen?: boolean;
}

export const AdminNewsManager: React.FC<AdminNewsManagerProps> = ({ initialCreateOpen = false }) => {
  const [posts, setPosts] = useState<Post[]>(db.getPosts());
  const [categories, setCategories] = useState<Category[]>(db.getCategories());
  const [reporters, setReporters] = useState(db.getReporters());

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState('all');

  // Edit / Create Modal State
  const [isModalOpen, setIsModalOpen] = useState(initialCreateOpen);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Delete Dialog & Toast state
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Form Data State
  const [formData, setFormData] = useState({
    title: '',
    titleHindi: '',
    categorySlug: 'prayagraj',
    description: '',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
    breaking: false,
    featured: false,
    status: 'published' as 'published' | 'draft' | 'archived',
    reporterName: 'पार्थ न्यूज़ ब्यूरो',
    reporterRole: 'वरिष्ठ संवाददाता',
    tagsInput: 'प्रयागराज, ताज़ा खबर, यूपी'
  });

  useEffect(() => {
    const unsub = db.subscribe(() => {
      setPosts(db.getPosts());
      setCategories(db.getCategories());
      setReporters(db.getReporters());
    });
    return unsub;
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ id: Date.now().toString(), type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const refreshList = () => {
    setPosts(db.getPosts());
  };

  const handleOpenCreate = () => {
    setEditingPost(null);
    setValidationError(null);
    setFormData({
      title: '',
      titleHindi: '',
      categorySlug: categories[0]?.slug || 'prayagraj',
      description: '',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
      breaking: false,
      featured: false,
      status: 'published',
      reporterName: reporters[0]?.name || 'पार्थ न्यूज़ ब्यूरो',
      reporterRole: 'वरिष्ठ संवाददाता',
      tagsInput: 'प्रयागराज, ताज़ा खबर, यूपी'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: Post) => {
    setEditingPost(post);
    setValidationError(null);
    setFormData({
      title: post.title,
      titleHindi: post.titleHindi || '',
      categorySlug: post.categorySlug,
      description: post.description,
      content: post.content,
      featuredImage: post.featuredImage,
      breaking: post.breaking,
      featured: post.featured,
      status: post.status,
      reporterName: post.reporterName,
      reporterRole: post.reporterRole || 'विशेष संवाददाता',
      tagsInput: post.tags.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string, title: string) => {
    setDeleteTarget({ id, title });
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    db.deletePost(deleteTarget.id);
    showToast(`खबर "${deleteTarget.title}" सफलतापूर्वक हटा दी गई।`, 'success');
    setDeleteTarget(null);
    refreshList();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() && !formData.titleHindi.trim()) {
      setValidationError('कृपया शीर्षक (Title) दर्ज करें');
      return;
    }
    setValidationError(null);

    const catObj = categories.find(c => c.slug === formData.categorySlug);
    const categoryName = catObj ? catObj.name : 'Prayagraj';

    const tags = formData.tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (editingPost) {
      db.updatePost(editingPost.id, {
        title: formData.title || formData.titleHindi,
        titleHindi: formData.titleHindi,
        category: categoryName,
        categorySlug: formData.categorySlug,
        description: formData.description,
        content: formData.content,
        featuredImage: formData.featuredImage,
        breaking: formData.breaking,
        featured: formData.featured,
        status: formData.status,
        reporterName: formData.reporterName,
        reporterRole: formData.reporterRole,
        tags
      });
      showToast('खबर सफलतापूर्वक अपडेट हो गई!', 'success');
    } else {
      db.createPost({
        title: formData.title || formData.titleHindi,
        titleHindi: formData.titleHindi,
        category: categoryName,
        categorySlug: formData.categorySlug,
        description: formData.description,
        content: formData.content,
        featuredImage: formData.featuredImage,
        breaking: formData.breaking,
        featured: formData.featured,
        status: formData.status,
        reporterName: formData.reporterName,
        reporterRole: formData.reporterRole,
        tags
      });
      showToast('नई खबर सफलतापूर्वक प्रकाशित हुई!', 'success');
    }

    setIsModalOpen(false);
    refreshList();
  };

  const filteredPosts = posts.filter(p => {
    const matchCat = selectedCatFilter === 'all' || p.categorySlug === selectedCatFilter;
    const matchQuery = !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.titleHindi && p.titleHindi.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.reporterName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="space-y-6">
      {/* Top Action Strip */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-hindi text-gray-900">
            समाचार प्रबंधन (News Management)
          </h1>
          <p className="text-xs text-gray-500 font-hindi">
            डिजिटल पोर्टल पर नई खबरें प्रकाशित करें, संपादित करें या हटाएं।
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-[#C8102E] hover:bg-[#A30C25] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>नई खबर बनाएं (Publish News)</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="खोजें (Search by headline or reporter)..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-800 focus:outline-hidden focus:border-[#C8102E]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-gray-500 font-semibold shrink-0">Category:</span>
          <select
            value={selectedCatFilter || 'all'}
            onChange={(e) => setSelectedCatFilter(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-hidden"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* News Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-5 py-3">News Story</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Reporter</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    कोई खबर नहीं मिली (No news posts match your criteria)
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={post.featuredImage} 
                          alt={post.title} 
                          className="w-12 h-10 rounded-lg object-cover shrink-0 border"
                        />
                        <div className="min-w-0 max-w-md">
                          <div className="flex items-center gap-1.5">
                            {post.breaking && (
                              <span className="bg-red-600 text-white text-[9px] font-black px-1 rounded flex items-center gap-0.5">
                                <Flame className="w-2.5 h-2.5 fill-white" /> BREAKING
                              </span>
                            )}
                            {post.featured && (
                              <span className="bg-neutral-800 text-white text-[9px] font-bold px-1 rounded">
                                FEATURED
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-gray-900 font-hindi truncate mt-0.5">
                            {post.titleHindi || post.title}
                          </h4>
                          <p className="text-[11px] text-gray-400 truncate">
                            {post.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="bg-red-50 text-[#C8102E] font-bold px-2 py-0.5 rounded text-[11px]">
                        {post.category}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 font-hindi text-gray-800 font-medium">
                      {post.reporterName}
                    </td>

                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        post.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {post.status}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 font-mono text-gray-600">
                      {post.views || 0}
                    </td>

                    <td className="px-5 py-3.5 text-right space-x-1.5">
                      <button
                        onClick={() => handleOpenEdit(post)}
                        className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-700 hover:text-black transition-colors cursor-pointer"
                        title="Edit Story"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(post.id, post.titleHindi || post.title)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete Story"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-200 flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold font-hindi text-gray-900">
                {editingPost ? 'समाचार संपादित करें (Edit News Story)' : 'नया समाचार प्रकाशित करें (Create News Story)'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              {validationError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl font-bold font-hindi text-xs flex items-center justify-between">
                  <span>{validationError}</span>
                  <button type="button" onClick={() => setValidationError(null)} className="text-red-400 hover:text-red-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  मुख्य शीर्षक (Headline in Hindi) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. प्रयागराज में महाकुंभ 2026 की तैयारियों को लेकर उच्चस्तरीय समीक्षा बैठक..."
                  value={formData.titleHindi || ''}
                  onChange={(e) => setFormData({ ...formData, titleHindi: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-hindi text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  अंग्रेजी शीर्षक (English Headline / Slug reference)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Prayagraj Mahakumbh 2026 Preparations High Level Meeting"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    श्रेणी (Category) *
                  </label>
                  <select
                    value={formData.categorySlug || 'prayagraj'}
                    onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name} ({c.nameHindi})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    संवाददाता / लेखक (Reporter Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.reporterName || ''}
                    onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  संक्षिप्त विवरण (Short Description / Lead Paragraph) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="खबर का मुख्य सार संक्षेप में लिखें..."
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs font-hindi text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  विस्तृत समाचार सामग्री (Full Article Content) *
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="विस्तृत समाचार लिखें। (शीर्षकों हेतु '### हेडिंग', कोट्स हेतु '> कोट' का उपयोग कर सकते हैं)..."
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs font-hindi text-gray-900 focus:outline-hidden focus:border-[#C8102E] font-mono leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  फीचर्ड इमेज यूआरएल (Featured Image URL)
                </label>
                <input
                  type="url"
                  value={formData.featuredImage || ''}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  टैग्स (Tags comma separated)
                </label>
                <input
                  type="text"
                  placeholder="प्रयागराज, ताज़ा खबर, यूपी"
                  value={formData.tagsInput || ''}
                  onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              {/* Checkboxes & Flags */}
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.breaking ?? false}
                    onChange={(e) => setFormData({ ...formData, breaking: e.target.checked })}
                    className="rounded text-red-600 w-4 h-4 focus:ring-red-500"
                  />
                  <span className="font-bold text-red-700 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> ब्रेकिंग न्यूज़ (Breaking Ticker)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured ?? false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-neutral-800 w-4 h-4"
                  />
                  <span className="font-bold text-gray-800">
                    होमपेज फीचर्ड स्टोरी (Featured Hero)
                  </span>
                </label>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="font-bold text-gray-600">Status:</span>
                  <select
                    value={formData.status || 'published'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="bg-gray-100 border border-gray-300 rounded-lg px-2 py-1 text-xs font-bold"
                  >
                    <option value="published">Published (प्रकाशित)</option>
                    <option value="draft">Draft (ड्राफ्ट)</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#C8102E] hover:bg-[#A30C25] text-white font-bold px-6 py-2 rounded-xl shadow cursor-pointer"
                >
                  {editingPost ? 'Save Changes' : 'Publish Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AdminConfirmDialog
        isOpen={deleteTarget !== null}
        title="खबर हटाएं (Delete News Story)"
        message={`क्या आप खबर "${deleteTarget?.title}" को हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती और वेबसाइट से तुरंत हट जाएगी।`}
        confirmText="हाँ, हटाएं (Delete)"
        cancelText="रद्द करें (Cancel)"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Toast Notification */}
      <AdminToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};
