import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit3, Trash2, Tv, Play, X, Eye } from 'lucide-react';
import { db } from '../../services/db';
import { VideoNews } from '../../types';
import { AdminConfirmDialog } from '../../components/admin/AdminConfirmDialog';
import { AdminToast, ToastMessage } from '../../components/admin/AdminToast';

interface AdminVideosManagerProps {
  initialCreateOpen?: boolean;
}

export const AdminVideosManager: React.FC<AdminVideosManagerProps> = ({ initialCreateOpen = false }) => {
  const [videos, setVideos] = useState<VideoNews[]>(db.getVideos());
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(initialCreateOpen);
  const [editingVideo, setEditingVideo] = useState<VideoNews | null>(null);

  // Dialog & Toast States
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    const unsub = db.subscribe(() => {
      setVideos(db.getVideos());
    });
    return unsub;
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ id: Date.now().toString(), type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const [formData, setFormData] = useState({
    title: '',
    titleHindi: '',
    category: 'Prayagraj',
    categorySlug: 'prayagraj',
    description: '',
    videoUrl: '',
    embedUrl: '',
    thumbnail: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=1200&q=80',
    duration: '04:15',
    reporterName: 'पार्थ न्यूज़ डिजिटल डेस्क',
    featured: false
  });

  const refresh = () => setVideos(db.getVideos());

  const handleOpenCreate = () => {
    setEditingVideo(null);
    setFormData({
      title: '',
      titleHindi: '',
      category: 'Prayagraj',
      categorySlug: 'prayagraj',
      description: '',
      videoUrl: '',
      embedUrl: '',
      thumbnail: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=1200&q=80',
      duration: '04:15',
      reporterName: 'पार्थ न्यूज़ डिजिटल डेस्क',
      featured: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v: VideoNews) => {
    setEditingVideo(v);
    setFormData({
      title: v.title,
      titleHindi: v.titleHindi || '',
      category: v.category,
      categorySlug: v.categorySlug,
      description: v.description,
      videoUrl: v.videoUrl,
      embedUrl: v.embedUrl || '',
      thumbnail: v.thumbnail,
      duration: v.duration,
      reporterName: v.reporterName,
      featured: v.featured
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string, title: string) => {
    setDeleteTarget({ id, title });
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    db.deleteVideo(deleteTarget.id);
    showToast(`वीडियो "${deleteTarget.title}" सफलतापूर्वक हटा दिया गया।`, 'success');
    setDeleteTarget(null);
    refresh();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleHindi.trim() && !formData.title.trim()) return;

    if (editingVideo) {
      db.updateVideo(editingVideo.id, {
        title: formData.title || formData.titleHindi,
        titleHindi: formData.titleHindi,
        category: formData.category,
        categorySlug: formData.categorySlug,
        description: formData.description,
        videoUrl: formData.videoUrl,
        embedUrl: formData.embedUrl,
        thumbnail: formData.thumbnail,
        duration: formData.duration,
        reporterName: formData.reporterName,
        featured: formData.featured
      });
      showToast('वीडियो बुलेटिन सफलतापूर्वक अपडेट हुआ!', 'success');
    } else {
      db.createVideo({
        title: formData.title || formData.titleHindi,
        titleHindi: formData.titleHindi,
        category: formData.category,
        categorySlug: formData.categorySlug,
        description: formData.description,
        videoUrl: formData.videoUrl,
        embedUrl: formData.embedUrl,
        thumbnail: formData.thumbnail,
        duration: formData.duration,
        reporterName: formData.reporterName,
        featured: formData.featured
      });
      showToast('नया वीडियो बुलेटिन सफलतापूर्वक प्रकाशित हुआ!', 'success');
    }

    setIsModalOpen(false);
    refresh();
  };

  const filtered = videos.filter(v =>
    !searchQuery.trim() ||
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (v.titleHindi && v.titleHindi.toLowerCase().includes(searchQuery.toLowerCase())) ||
    v.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-hindi text-gray-900">
            वीडियो बुलेटिन प्रबंधन (Video News Management)
          </h1>
          <p className="text-xs text-gray-500 font-hindi">
            डिजिटल वीडियो रिपोर्ट्स, यूट्यूब एम्बेड और स्पेशल ग्राउंड बुलेटिन्स जोड़ें।
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-[#C8102E] hover:bg-[#A30C25] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>नया वीडियो जोड़ें (Add Video)</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-5 py-3">Video</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-5 py-3.5 max-w-md">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-9 rounded bg-black shrink-0 overflow-hidden">
                        <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                        <Play className="w-3.5 h-3.5 fill-white text-white absolute inset-0 m-auto" />
                      </div>
                      <div className="min-w-0">
                        {v.featured && (
                          <span className="bg-red-600 text-white text-[9px] font-bold px-1 rounded">
                            FEATURED
                          </span>
                        )}
                        <h4 className="font-bold text-gray-900 font-hindi truncate">
                          {v.titleHindi || v.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 truncate">{v.reporterName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="bg-red-50 text-[#C8102E] font-bold px-2 py-0.5 rounded text-[11px]">
                      {v.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono">{v.duration}</td>
                  <td className="px-4 py-3.5 font-mono">{v.views || 0}</td>
                  <td className="px-5 py-3.5 text-right space-x-1.5">
                    <button onClick={() => handleOpenEdit(v)} className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-700 hover:text-black transition-colors cursor-pointer" title="Edit Video">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteClick(v.id, v.titleHindi || v.title)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors cursor-pointer" title="Delete Video">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-base font-bold font-hindi text-gray-900">
                {editingVideo ? 'वीडियो बुलेटिन संपादित करें' : 'नया वीडियो बुलेटिन जोड़ें'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">वीडियो शीर्षक (Hindi Title) *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. महाकुंभ संगम तट से विशेष ग्राउंड रिपोर्ट..."
                  value={formData.titleHindi || ''}
                  onChange={(e) => setFormData({ ...formData, titleHindi: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-sm font-hindi text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">श्रेणी (Category)</label>
                  <input
                    type="text"
                    value={formData.category || 'Prayagraj'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value, categorySlug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">अवधि (Duration, e.g. 05:20)</label>
                  <input
                    type="text"
                    value={formData.duration || '04:15'}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">वीडियो डायरेक्ट URL या MP4 लिंक *</label>
                <input
                  type="url"
                  required
                  value={formData.videoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">यूट्यूब Embed लिंक (वैकल्पिक)</label>
                <input
                  type="url"
                  placeholder="https://www.youtube-nocookie.com/embed/..."
                  value={formData.embedUrl || ''}
                  onChange={(e) => setFormData({ ...formData, embedUrl: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">थंबनेल इमेज लिंक *</label>
                <input
                  type="url"
                  required
                  value={formData.thumbnail || ''}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">संक्षिप्त विवरण (Description)</label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs font-hindi text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured ?? false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-red-600 w-4 h-4"
                  />
                  <span className="font-bold text-gray-800">फीचर्ड वीडियो बुलेटिन (Featured)</span>
                </label>
              </div>

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
                  className="bg-[#C8102E] hover:bg-[#A30C25] text-white font-bold px-6 py-2 rounded-xl shadow cursor-pointer transition-colors"
                >
                  Save Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AdminConfirmDialog
        isOpen={deleteTarget !== null}
        title="वीडियो हटाएं (Delete Video)"
        message={`क्या आप वीडियो "${deleteTarget?.title}" को हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।`}
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
