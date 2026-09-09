import React, { useState } from 'react';
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
  X
} from 'lucide-react';
import { db } from '../../services/db';
import { Reporter, IdCardRecord } from '../../types';
import { ReporterIdCard } from '../../components/reporter/ReporterIdCard';
import { generateAndDownloadIdCardPdf } from '../../services/idCardPdf';

export const AdminIdCardsManager: React.FC = () => {
  const [reporters, setReporters] = useState<Reporter[]>(db.getReporters());
  const [idCards, setIdCards] = useState<IdCardRecord[]>(db.getIdCards());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReporter, setSelectedReporter] = useState<Reporter | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Quick Create Reporter State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newRepData, setNewRepData] = useState({
    name: '',
    designation: 'REPORTER',
    district: 'Prayagraj',
    state: 'Uttar Pradesh',
    mobile: '',
    email: '',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80'
  });

  const refresh = () => {
    setReporters(db.getReporters());
    setIdCards(db.getIdCards());
  };

  const handleToggleStatus = (rep: Reporter) => {
    const newStatus = rep.status === 'active' ? 'inactive' : 'active';
    db.updateReporter(rep.id, { status: newStatus });
    refresh();
  };

  const handleCreateReporter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRepData.name.trim()) return;

    db.createReporter({
      name: newRepData.name.trim(),
      designation: newRepData.designation.toUpperCase(),
      district: newRepData.district.trim(),
      state: newRepData.state.trim(),
      mobile: newRepData.mobile.trim(),
      email: newRepData.email.trim(),
      photo: newRepData.photo,
      status: 'active'
    });

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
    } catch (err) {
      alert('PDF generation failed');
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
          onClick={() => setIsCreateOpen(true)}
          className="bg-[#C8102E] hover:bg-[#A30C25] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow flex items-center gap-1.5 self-start sm:self-auto"
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
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors ${
                        rep.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {rep.status}
                    </button>
                  </td>

                  <td className="px-5 py-3.5 text-right space-x-1.5">
                    <button
                      onClick={() => setSelectedReporter(rep)}
                      className="bg-neutral-900 hover:bg-black text-white px-2.5 py-1 rounded-lg font-bold inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Card</span>
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
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden border border-gray-200 flex flex-col max-h-[95vh]">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#C8102E]" />
                <h2 className="text-base font-bold font-hindi text-gray-900">
                  डिजिटल प्रेस पहचान पत्र (Press ID Card Preview)
                </h2>
              </div>
              <button onClick={() => setSelectedReporter(null)} className="p-1 text-gray-400 hover:text-gray-700">
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
                    className={`px-3 py-1.5 rounded-lg font-bold ${
                      selectedReporter.status === 'active' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {selectedReporter.status === 'active' ? 'Deactivate Card' : 'Activate Card'}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadPdf(selectedReporter)}
                    disabled={isGeneratingPdf}
                    className="bg-[#C8102E] hover:bg-[#A30C25] text-white font-bold px-5 py-2.5 rounded-xl shadow flex items-center gap-1.5 disabled:opacity-50"
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

      {/* CREATE REPORTER MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 flex flex-col">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-base font-bold font-hindi text-gray-900">
                नया संवाददाता जोड़ें (Issue Press Card)
              </h2>
              <button onClick={() => setIsCreateOpen(false)} className="p-1 text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReporter} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">पूरा नाम (Full Name) *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. अमित कुमार वर्मा"
                  value={newRepData.name || ''}
                  onChange={(e) => setNewRepData({ ...newRepData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-hindi text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">पदनाम (Designation) *</label>
                  <select
                    value={newRepData.designation || 'REPORTER'}
                    onChange={(e) => setNewRepData({ ...newRepData, designation: e.target.value })}
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
                    placeholder="Prayagraj / Lucknow"
                    value={newRepData.district || 'Prayagraj'}
                    onChange={(e) => setNewRepData({ ...newRepData, district: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">मोबाइल नंबर</label>
                  <input
                    type="tel"
                    placeholder="+91 98390 00000"
                    value={newRepData.mobile || ''}
                    onChange={(e) => setNewRepData({ ...newRepData, mobile: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">ईमेल पता</label>
                  <input
                    type="email"
                    placeholder="rep@parthnews.in"
                    value={newRepData.email || ''}
                    onChange={(e) => setNewRepData({ ...newRepData, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">फोटो लिंक (Photo URL)</label>
                <input
                  type="url"
                  value={newRepData.photo || ''}
                  onChange={(e) => setNewRepData({ ...newRepData, photo: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#C8102E] hover:bg-[#A30C25] text-white font-bold px-6 py-2 rounded-xl shadow"
                >
                  Generate Press Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
