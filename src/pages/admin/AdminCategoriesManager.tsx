import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, FolderTree, X, Check } from 'lucide-react';
import { db } from '../../services/db';
import { Category } from '../../types';
import { AdminConfirmDialog } from '../../components/admin/AdminConfirmDialog';
import { AdminToast, ToastMessage } from '../../components/admin/AdminToast';

export const AdminCategoriesManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(db.getCategories());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Dialog & Toast States
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    const unsub = db.subscribe(() => {
      setCategories(db.getCategories());
    });
    return unsub;
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ id: Date.now().toString(), type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const [formData, setFormData] = useState({
    name: '',
    nameHindi: '',
    slug: '',
    description: '',
    color: '#C8102E',
    order: 1
  });

  const refresh = () => setCategories(db.getCategories());

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      nameHindi: '',
      slug: '',
      description: '',
      color: '#C8102E',
      order: categories.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      nameHindi: cat.nameHindi || '',
      slug: cat.slug,
      description: cat.description || '',
      color: cat.color || '#C8102E',
      order: cat.order || 1
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteTarget({ id, name });
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    db.deleteCategory(deleteTarget.id);
    showToast(`श्रेणी "${deleteTarget.name}" सफलतापूर्वक हटा दी गई।`, 'success');
    setDeleteTarget(null);
    refresh();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const slug = formData.slug.trim() || formData.name.toLowerCase().replace(/\s+/g, '-');

    if (editingCategory) {
      db.updateCategory(editingCategory.id, {
        name: formData.name,
        nameHindi: formData.nameHindi,
        slug,
        description: formData.description,
        color: formData.color,
        order: Number(formData.order)
      });
      showToast('श्रेणी सफलतापूर्वक अपडेट हुई!', 'success');
    } else {
      db.createCategory({
        name: formData.name,
        nameHindi: formData.nameHindi,
        slug,
        description: formData.description,
        color: formData.color,
        order: Number(formData.order)
      });
      showToast('नई श्रेणी सफलतापूर्वक जोड़ी गई!', 'success');
    }

    setIsModalOpen(false);
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-hindi text-gray-900">
            समाचार श्रेणियां (Category Management)
          </h1>
          <p className="text-xs text-gray-500 font-hindi">
            नेविगेशन बार एवं होमपेज सेक्शन की श्रेणियों का प्रबंधन
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-[#C8102E] hover:bg-[#A30C25] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>नई श्रेणी बनाएं (Add Category)</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-gray-700">
          <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Category Name</th>
              <th className="px-4 py-3">Hindi Label</th>
              <th className="px-4 py-3">Slug / URL</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-5 py-3.5 font-bold font-mono text-gray-500">#{c.order}</td>
                <td className="px-5 py-3.5 font-bold text-gray-900">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color || '#C8102E' }}></span>
                    <span>{c.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 font-hindi font-semibold text-gray-800">{c.nameHindi}</td>
                <td className="px-4 py-3.5 font-mono text-gray-500">/category/{c.slug}</td>
                <td className="px-5 py-3.5 text-right space-x-1.5">
                  <button 
                    onClick={() => handleOpenEdit(c)} 
                    className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-700 hover:text-black transition-colors cursor-pointer"
                    title="Edit Category"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(c.id, c.name)} 
                    className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 flex flex-col">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-base font-bold font-hindi text-gray-900">
                {editingCategory ? 'श्रेणी संपादित करें' : 'नई श्रेणी जोड़ें'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">अंग्रेजी नाम (English Name) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prayagraj / Crime / Sports"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">हिंदी नाम (Hindi Name) *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. प्रयागराज / अपराध / खेल"
                  value={formData.nameHindi || ''}
                  onChange={(e) => setFormData({ ...formData, nameHindi: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-hindi text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Slug (URL Path)</label>
                <input
                  type="text"
                  placeholder="prayagraj"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-mono text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">क्रम संख्या (Order)</label>
                  <input
                    type="number"
                    value={formData.order ?? 1}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Color Theme</label>
                  <input
                    type="color"
                    value={formData.color || '#C8102E'}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full h-9 rounded-xl border border-gray-300 p-1 cursor-pointer"
                  />
                </div>
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
                  className="bg-[#C8102E] hover:bg-[#A30C25] text-white font-bold px-6 py-2 rounded-xl shadow cursor-pointer"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AdminConfirmDialog
        isOpen={deleteTarget !== null}
        title="श्रेणी हटाएं (Delete Category)"
        message={`क्या आप श्रेणी "${deleteTarget?.name}" को हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।`}
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
