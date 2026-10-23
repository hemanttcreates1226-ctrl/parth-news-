import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Search, 
  Download, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  QrCode, 
  ShieldCheck, 
  Plus, 
  Printer,
  X,
  Edit3,
  Trash2
} from 'lucide-react';
import { db } from '../../services/db';
import { Reporter, IdCardRecord } from '../../types';
import { ReporterIdCard } from '../../components/reporter/ReporterIdCard';
import { generateAndDownloadIdCardPdf } from '../../services/idCardPdf';
import { AdminConfirmDialog } from '../../components/admin/AdminConfirmDialog';
import { AdminToast, ToastMessage } from '../../components/admin/AdminToast';

export const AdminIdCardsManager: React.FC = () => {
  const [reporters, setReporters] = useState<Reporter[]>(db.getReporters());
  const [idCards, setIdCards] = useState<IdCardRecord[]>(db.getIdCards());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReporter, setSelectedReporter] = useState<Reporter | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Dialog & Toast States
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string; reporterId: string } | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Quick Create / Edit Reporter State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingReporter, setEditingReporter] = useState<Reporter | null>(null);
  const [repFormData, setRepFormData] = useState({
    name: '',
    designation: 'REPORTER',
    district: 'Prayagraj',
    state: 'Uttar Pradesh',
    mobile: '',
    email: '',
    photo: '',
    validUntil: '2026-12-31'
  });

  useEffect(() => {
    const unsub = db.subscribe(() => {
      setReporters(db.getReporters());
      setIdCards(db.getIdCards());
    });
    return unsub;
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ id: Date.now().toString(), type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const refresh = () => {
    const reps = db.getReporters();
    setReporters(reps);
    setIdCards(db.getIdCards());
    if (selectedReporter) {
      const updated = reps.find(r => r.id === selectedReporter.id);
      setSelectedReporter(updated || null);
    }
  };

  const handleToggleStatus = (rep: Reporter) => {
    const newStatus = rep.status === 'active' ? 'inactive' : 'active';
    db.updateReporter(rep.id, { status: newStatus });
    showToast(`रिपोर्टर ${rep.name} का कार्ड स्थिति '${newStatus}' में परिवर्तित की गई।`, 'info');
    refresh();
  };

  const handleOpenCreate = () => {
    setEditingReporter(null);
    setRepFormData({
      name: '',
      designation: 'REPORTER',
      district: 'Prayagraj',
      state: 'Uttar Pradesh',
      mobile: '',
      email: '',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      validUntil: '2026-12-31'
    });
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (rep: Reporter) => {
    setEditingReporter(rep);
    setRepFormData({
      name: rep.name,
      designation: rep.designation,
      district: rep.district,
      state: rep.state,
      mobile: rep.mobile,
      email: rep.email,
      photo: rep.photo,
      validUntil: rep.validUntil || '2026-12-31'
    });
    setIsCreateOpen(true);
  };

  const handleDeleteClick = (rep: Reporter) => {
    setDeleteTarget({ id: rep.id, name: rep.name, reporterId: rep.reporterId });
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    db.deleteReporter(deleteTarget.id);
    showToast(`संवाददाता ${deleteTarget.name} (${deleteTarget.reporterId}) का प्रेस कार्ड हटा दिया गया।`, 'success');
    if (selectedReporter?.id === deleteTarget.id) {
      setSelectedReporter(null);
    }
    setDeleteTarget(null);
    refresh();
  };

  const handleSaveReporter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repFormData.name.trim()) return;

    if (editingReporter) {
      db.updateReporter(editingReporter.id, {
        name: repFormData.name.trim(),
        designation: repFormData.designation.toUpperCase(),
        district: repFormData.district.trim(),
        state: repFormData.state.trim(),
        mobile: repFormData.mobile.trim(),
        email: repFormData.email.trim(),
        photo: repFormData.photo,
        validUntil: repFormData.validUntil
      });
      showToast('संवाददाता विवरण सफलतापूर्वक अपडेट किया गया!', 'success');
    } else {
      const created = db.createReporter({
        name: repFormData.name.trim(),
        designation: repFormData.designation.toUpperCase(),
        district: repFormData.district.trim(),
        state: repFormData.state.trim(),
        mobile: repFormData.mobile.trim(),
        email: repFormData.email.trim(),
        photo: repFormData.photo,
        status: 'active'
      });
      showToast(`नया प्रेस कार्ड जारी! आईडी: ${created.reporterId}`, 'success');
    }

    setIsCreateOpen(false);
    refresh();
  };

  const handleDownloadPdf = async (rep: Reporter) => {
    setIsGeneratingPdf(true);
    try {
      await generateAndDownloadIdCardPdf(
        'admin-card-preview-target',
        rep.name,
        rep.reporterId
      );
      showToast('प्रेस आईडी कार्ड PDF सफलतापूर्वक डाउनलोड हो गया!', 'success');
    } catch (err) {
      showToast('PDF जनरेशन में त्रुटि। कृपया पुनः प्रयास करें।', 'error');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const filtered = reporters.filter(r =>
    !searchQuery.trim() ||
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.reporterId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-hindi text-gray-900">
            प्रेस पहचान पत्र एवं सत्यापन (Press ID Card & Credential Center)
          </h1>
          <p className="text-xs text-gray-500 font-hindi">
            डिजिटल प्रेस कार्ड निर्गमन, क्यूआर सत्यापन एवं पीडीएफ प्रिंट प्रबंधन
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-[#C8102E] hover:bg-[#A30C25] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>नया प्रेस कार्ड जारी करें (Issue Press ID)</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="नाम, रिपोर्टर आईडी या जिला खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-800 focus:outline-hidden focus:border-[#C8102E]"
          />
        </div>
      </div>

      {/* ID Cards Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-5 py-3">Reporter</th>
                <th className="px-4 py-3">Press ID No.</th>
                <th className="px-4 py-3">Designation</th>
                <th className="px-4 py-3">District / State</th>
                <th className="px-4 py-3">Validity</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((rep) => (
                <tr key={rep.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img 
                        src={rep.photo} 
                        alt={rep.name} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#C8102E] shrink-0" 
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 font-hindi">{rep.name}</h4>
                        <p className="text-[11px] text-gray-400">{rep.mobile}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 font-mono font-bold text-[#C8102E]">
                    {rep.reporterId}
                  </td>

                  <td className="px-4 py-3.5 font-bold uppercase text-gray-800">
                    {rep.designation}
                  </td>

                  <td className="px-4 py-3.5 font-medium text-gray-700">
                    {rep.district}, {rep.state}
                  </td>

                  <td className="px-4 py-3.5 font-mono text-gray-500">
                    {rep.validUntil}
                  </td>

                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => handleToggleStatus(rep)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                        rep.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                      title="Click to toggle status"
                    >
                      {rep.status}
                    </button>
                  </td>

                  <td className="px-5 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedReporter(rep)}
                      className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-2.5 py-1 rounded-lg font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                      title="Preview card & download PDF"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C8102E]" />
                      <span>View Card</span>
                    </button>
                    <button
                      onClick={() => handleOpenEdit(rep)}
                      className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-700 hover:text-black transition-colors cursor-pointer"
                      title="Edit Reporter Details"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(rep)}
                      className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete Reporter Card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: LIVE PREVIEW & DOWNLOAD ID CARD */}
      {selectedReporter && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden border border-gray-200 flex flex-col max-h-[95vh]">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#C8102E]" />
                <h2 className="text-base font-bold font-hindi text-gray-900">
                  डिजिटल प्रेस पहचान पत्र (Press ID Card Preview)
                </h2>
              </div>
              <button onClick={() => setSelectedReporter(null)} className="p-1 text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex flex-col items-center">
              <div className="w-full flex justify-center py-2">
                <ReporterIdCard
                  id="admin-card-preview-target"
                  reporter={selectedReporter}
                  showBack={true}
                />
              </div>

              {/* Action Buttons */}
              <div className="w-full pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(selectedReporter)}
                    className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-colors ${
                      selectedReporter.status === 'active' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    }`}
                  >
                    {selectedReporter.status === 'active' ? 'Deactivate Card' : 'Activate Card'}
                  </button>
                  <button
                    onClick={() => {
                      const rep = selectedReporter;
                      setSelectedReporter(null);
                      handleOpenEdit(rep);
                    }}
                    className="px-3 py-1.5 rounded-lg font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer transition-colors"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={() => {
                      const rep = selectedReporter;
                      handleDeleteClick(rep);
                    }}
                    className="px-3 py-1.5 rounded-lg font-bold bg-red-50 hover:bg-red-100 text-red-700 cursor-pointer transition-colors"
                  >
                    Delete Card
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadPdf(selectedReporter)}
                    disabled={isGeneratingPdf}
                    className="bg-[#C8102E] hover:bg-[#A30C25] text-white font-bold px-5 py-2.5 rounded-xl shadow flex items-center gap-1.5 disabled:opacity-50 cursor-pointer transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download High-Res PDF'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT REPORTER MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 flex flex-col">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-base font-bold font-hindi text-gray-900">
                {editingReporter ? 'संवाददाता विवरण संपादित करें' : 'नया संवाददाता जोड़ें (Issue Press Card)'}
              </h2>
              <button onClick={() => setIsCreateOpen(false)} className="p-1 text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReporter} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">पूरा नाम (Full Name) *</label>
                <input
                  type="text"
                  required
                  placeholder=""
                  value={repFormData.name || ''}
                  onChange={(e) => setRepFormData({ ...repFormData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-hindi text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">पदनाम (Designation) *</label>
                  <select
                    value={repFormData.designation || 'REPORTER'}
                    onChange={(e) => setRepFormData({ ...repFormData, designation: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  >
                    <option value="REPORTER">Reporter</option>
                    <option value="SENIOR REPORTER">Senior Reporter</option>
                    <option value="SPECIAL CORRESPONDENT">Special Correspondent</option>
                    <option value="BUREAU CHIEF">Bureau Chief</option>
                    <option value="VIDEO JOURNALIST">Video Journalist</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">जनपद (District) *</label>
                  <input
                    type="text"
                    required
                    placeholder=""
                    value={repFormData.district || ''}
                    onChange={(e) => setRepFormData({ ...repFormData, district: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">मोबाइल नंबर</label>
                  <input
                    type="tel"
                    placeholder=""
                    value={repFormData.mobile || ''}
                    onChange={(e) => setRepFormData({ ...repFormData, mobile: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">वैधता तिथि (Valid Until)</label>
                  <input
                    type="text"
                    placeholder="2026-12-31"
                    value={repFormData.validUntil || ''}
                    onChange={(e) => setRepFormData({ ...repFormData, validUntil: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-mono text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">फोटो लिंक (Photo URL)</label>
                <input
                  type="url"
                  value={repFormData.photo || ''}
                  onChange={(e) => setRepFormData({ ...repFormData, photo: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#C8102E] hover:bg-[#A30C25] text-white font-bold px-6 py-2 rounded-xl shadow cursor-pointer"
                >
                  {editingReporter ? 'Save Changes' : 'Generate Press Card'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AdminConfirmDialog
        isOpen={deleteTarget !== null}
        title="प्रेस कार्ड हटाएं (Delete Press ID Card)"
        message={`क्या आप संवाददाता "${deleteTarget?.name}" (${deleteTarget?.reporterId}) का प्रेस कार्ड स्थायी रूप से हटाना चाहते हैं?`}
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
