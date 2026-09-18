import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Search, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Trash2, 
  X, 
  CreditCard, 
  AlertCircle,
  FileText,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { db } from '../../services/db';
import { ReporterApplication } from '../../types';
import { AdminConfirmDialog } from '../../components/admin/AdminConfirmDialog';
import { AdminToast, ToastMessage } from '../../components/admin/AdminToast';

interface AdminApplicationsManagerProps {
  onNavigateToIdCard?: (reporterId: string) => void;
}

export const AdminApplicationsManager: React.FC<AdminApplicationsManagerProps> = ({ onNavigateToIdCard }) => {
  const [applications, setApplications] = useState<ReporterApplication[]>(db.getApplications());
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<ReporterApplication | null>(null);

  // Dialog States
  const [approveTarget, setApproveTarget] = useState<ReporterApplication | null>(null);
  const [designationChoice, setDesignationChoice] = useState('विशेष संवाददाता (Special Reporter)');
  const [rejectTarget, setRejectTarget] = useState<ReporterApplication | null>(null);
  const [rejectReason, setRejectReason] = useState('शैक्षणिक / विधिक मापदंड अपूर्ण');
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    const unsub = db.subscribe(() => {
      setApplications(db.getApplications());
    });
    return unsub;
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ id: Date.now().toString(), type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const refresh = () => {
    const apps = db.getApplications();
    setApplications(apps);
    if (selectedApp) {
      const updated = apps.find(a => a.id === selectedApp.id);
      setSelectedApp(updated || null);
    }
  };

  const handleApproveClick = (app: ReporterApplication) => {
    setApproveTarget(app);
    setDesignationChoice('विशेष संवाददाता (Special Reporter)');
  };

  const handleConfirmApprove = () => {
    if (!approveTarget) return;
    const cleanDesignation = designationChoice.trim() || 'संवाददाता';
    const result = db.approveReporterApplication(approveTarget.id, cleanDesignation, 'Chief Editor');
    if (result) {
      showToast(`आवेदन स्वीकृत! नया रिपोर्टर आईडी जारी: ${result.reporter.reporterId}`, 'success');
    } else {
      showToast('आवेदन स्वीकृत नहीं हो सका। कृपया पुनः प्रयास करें।', 'error');
    }
    setApproveTarget(null);
    refresh();
  };

  const handleRejectClick = (app: ReporterApplication) => {
    setRejectTarget(app);
    setRejectReason('शैक्षणिक / विधिक मापदंड अपूर्ण');
  };

  const handleConfirmReject = () => {
    if (!rejectTarget) return;
    db.rejectApplication(rejectTarget.id, rejectReason || 'मापदंड अपूर्ण');
    showToast(`आवेदन अस्वीकार कर दिया गया।`, 'info');
    setRejectTarget(null);
    refresh();
  };

  const handleSetUnderReview = (app: ReporterApplication) => {
    db.setApplicationUnderReview(app.id);
    showToast(`${app.fullName} का आवेदन 'जाँच जारी (Under Review)' स्थिति में कर दिया गया।`, 'info');
    refresh();
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteTarget({ id, name });
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    db.deleteApplication(deleteTarget.id);
    showToast(`आवेदन स्थायी रूप से हटा दिया गया।`, 'success');
    if (selectedApp?.id === deleteTarget.id) setSelectedApp(null);
    setDeleteTarget(null);
    refresh();
  };

  const filtered = applications.filter(a => {
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchQuery = !searchQuery.trim() ||
      a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.mobile.includes(searchQuery);
    return matchStatus && matchQuery;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-hindi text-gray-900">
            संवाददाता भर्ती आवेदन (Reporter Applications)
          </h1>
          <p className="text-xs text-gray-500 font-hindi">
            जनपद एवं तहसील स्तर से प्राप्त आवेदनों की समीक्षा, अनुमोदन एवं प्रेस कार्ड निर्गमन
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-xl px-3 py-1.5 text-xs text-gray-800 font-bold focus:outline-hidden"
          >
            <option value="all">All Applications ({applications.length})</option>
            <option value="pending">Pending ({applications.filter(a => a.status === 'pending').length})</option>
            <option value="under_review">Under Review ({applications.filter(a => a.status === 'under_review').length})</option>
            <option value="approved">Approved ({applications.filter(a => a.status === 'approved').length})</option>
            <option value="rejected">Rejected ({applications.filter(a => a.status === 'rejected').length})</option>
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="नाम, आवेदन संख्या, मोबाइल या जिला खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-800 focus:outline-hidden focus:border-[#C8102E]"
          />
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-5 py-3">Applicant Info</th>
                <th className="px-4 py-3">Application No</th>
                <th className="px-4 py-3">District / City</th>
                <th className="px-4 py-3">Submitted Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    कोई आवेदन नहीं मिला (No applications found matching filter)
                  </td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={app.profilePhoto} 
                          alt={app.fullName} 
                          className="w-10 h-10 rounded-full object-cover border shrink-0" 
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 font-hindi">{app.fullName}</h4>
                          <p className="text-[11px] text-gray-400">{app.mobile}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 font-mono font-bold text-[#C8102E]">
                      {app.applicationNumber}
                    </td>

                    <td className="px-4 py-3.5 text-gray-800 font-medium">
                      {app.district || app.city}
                    </td>

                    <td className="px-4 py-3.5 text-gray-500">
                      {new Date(app.submittedAt).toLocaleDateString('hi-IN')}
                    </td>

                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        app.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                        app.status === 'under_review' ? 'bg-amber-100 text-amber-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer"
                        title="View details"
                      >
                        Inspect
                      </button>

                      {app.status !== 'approved' && (
                        <button
                          onClick={() => handleApproveClick(app)}
                          title="Approve & Issue ID"
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                      )}

                      {app.status !== 'rejected' && (
                        <button
                          onClick={() => handleRejectClick(app)}
                          title="Reject Application"
                          className="bg-rose-50 hover:bg-rose-100 text-rose-700 px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteClick(app.id, app.fullName)}
                        className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                        title="Delete record"
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

      {/* INSPECT APPLICANT MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#C8102E]" />
                <h2 className="text-base font-bold font-hindi text-gray-900">
                  आवेदक विवरण (Applicant Profile & Verification)
                </h2>
              </div>
              <button onClick={() => setSelectedApp(null)} className="p-1 text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs">
              {/* Header Profile Box */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <img 
                  src={selectedApp.profilePhoto} 
                  alt={selectedApp.fullName}
                  className="w-24 h-28 rounded-xl object-cover border-2 border-[#C8102E] shrink-0" 
                />
                <div className="space-y-1 text-center sm:text-left">
                  <span className="font-mono text-xs font-bold text-[#C8102E]">
                    {selectedApp.applicationNumber}
                  </span>
                  <h3 className="text-xl font-black font-hindi text-gray-900">
                    {selectedApp.fullName}
                  </h3>
                  <p className="text-gray-500">पिता का नाम: {selectedApp.fatherName || 'एन/ए'}</p>
                  <p className="text-gray-500">जन्म तिथि: {selectedApp.dob || 'एन/ए'}</p>
                  <div className="pt-1">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      selectedApp.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                      selectedApp.status === 'under_review' ? 'bg-amber-100 text-amber-800' :
                      selectedApp.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      STATUS: {selectedApp.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact & Address Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5">
                  <strong className="text-gray-900 block font-bold">संपर्क सूत्र:</strong>
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <Phone className="w-3.5 h-3.5 text-[#C8102E]" /> {selectedApp.mobile}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <Mail className="w-3.5 h-3.5 text-gray-400" /> {selectedApp.email}
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5">
                  <strong className="text-gray-900 block font-bold">पता एवं कार्यक्षेत्र:</strong>
                  <div className="flex items-start gap-1.5 text-gray-700 font-hindi">
                    <MapPin className="w-3.5 h-3.5 text-[#C8102E] shrink-0 mt-0.5" />
                    <span>{selectedApp.address}, {selectedApp.city}, {selectedApp.district}, {selectedApp.state} - {selectedApp.pincode}</span>
                  </div>
                </div>
              </div>

              {/* Experience & Education */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
                <div>
                  <span className="font-bold text-gray-700 block">शैक्षणिक योग्यता (Education):</span>
                  <p className="text-gray-900 font-hindi">{selectedApp.education || 'Graduate'}</p>
                </div>
                <div>
                  <span className="font-bold text-gray-700 block">पत्रकारिता अनुभव (Experience):</span>
                  <p className="text-gray-900 font-hindi">{selectedApp.experience || 'None'}</p>
                </div>
                <div>
                  <span className="font-bold text-gray-700 block">पूर्व संस्थान (Previous Organization):</span>
                  <p className="text-gray-900 font-hindi">{selectedApp.previousOrganization || 'N/A'}</p>
                </div>
                <div>
                  <span className="font-bold text-gray-700 block">जुड़ने का उद्देश्य (Reason to Join):</span>
                  <p className="text-gray-900 font-hindi bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    {selectedApp.reason}
                  </p>
                </div>
              </div>

              {selectedApp.generatedReporterId && (
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-300 text-emerald-900 font-bold flex items-center justify-between">
                  <span>जारी प्रेस आईडी: {selectedApp.generatedReporterId}</span>
                  {onNavigateToIdCard && (
                    <button
                      onClick={() => {
                        setSelectedApp(null);
                        onNavigateToIdCard(selectedApp.generatedReporterId!);
                      }}
                      className="bg-emerald-700 text-white px-2.5 py-1 rounded text-[11px]"
                    >
                      View ID Card →
                    </button>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSetUnderReview(selectedApp)}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-2 rounded-xl font-bold cursor-pointer transition-colors"
                  >
                    Mark Under Review
                  </button>
                  {selectedApp.status !== 'rejected' && (
                    <button
                      onClick={() => handleRejectClick(selectedApp)}
                      className="bg-red-100 hover:bg-red-200 text-red-900 px-3 py-2 rounded-xl font-bold cursor-pointer transition-colors"
                    >
                      Reject Application
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClick(selectedApp.id, selectedApp.fullName)}
                    className="bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700 px-3 py-2 rounded-xl font-bold cursor-pointer transition-colors"
                  >
                    Delete
                  </button>
                </div>

                {selectedApp.status !== 'approved' && (
                  <button
                    onClick={() => handleApproveClick(selectedApp)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl shadow flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Generate Press ID</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* APPROVE APPLICATION MODAL */}
      <AdminConfirmDialog
        isOpen={approveTarget !== null}
        title="आवेदन स्वीकृत करें (Approve Reporter)"
        message={`क्या आप ${approveTarget?.fullName} (${approveTarget?.district}, ${approveTarget?.state}) का संवाददाता आवेदन स्वीकृत करना चाहते हैं? स्वीकृत होते ही आधिकारिक प्रेस आईडी कार्ड (Press ID Card) तुरंत जनरेट हो जाएगा।`}
        confirmText="स्वीकृत करें एवं प्रेस कार्ड जारी करें"
        cancelText="रद्द करें (Cancel)"
        variant="success"
        inputLabel="पदनाम चुनें या दर्ज करें (Designation)"
        inputValue={designationChoice}
        onInputChange={setDesignationChoice}
        inputPresets={[
          'विशेष संवाददाता (Special Reporter)',
          'वरिष्ठ संवाददाता (Senior Reporter)',
          'तहसील संवाददाता (Tehsil Reporter)',
          'ब्यूरो चीफ (Bureau Chief)',
          'क्राइम रिपोर्टर (Crime Reporter)'
        ]}
        onConfirm={handleConfirmApprove}
        onCancel={() => setApproveTarget(null)}
      />

      {/* REJECT APPLICATION MODAL */}
      <AdminConfirmDialog
        isOpen={rejectTarget !== null}
        title="आवेदन अस्वीकार करें (Reject Application)"
        message={`क्या आप ${rejectTarget?.fullName} का आवेदन अस्वीकार करना चाहते हैं? अस्वीकृति का कारण नीचे दर्ज करें:`}
        confirmText="अस्वीकार करें (Reject)"
        cancelText="रद्द करें (Cancel)"
        variant="danger"
        inputLabel="अस्वीकृति का कारण (Reason for Rejection)"
        inputValue={rejectReason}
        onInputChange={setRejectReason}
        inputPresets={[
          'शैक्षणिक / विधिक मापदंड अपूर्ण',
          'पहचान पत्र / दस्तावेज अस्पष्ट',
          'कार्यक्षेत्र में पद रिक्त नहीं',
          'सत्यापन व अनुभव अपर्याप्त'
        ]}
        onConfirm={handleConfirmReject}
        onCancel={() => setRejectTarget(null)}
      />

      {/* DELETE CONFIRM DIALOG */}
      <AdminConfirmDialog
        isOpen={deleteTarget !== null}
        title="आवेदन हटाएं (Delete Application Record)"
        message={`क्या आप ${deleteTarget?.name} का आवेदन स्थायी रूप से हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।`}
        confirmText="हाँ, हटाएं (Delete)"
        cancelText="रद्द करें (Cancel)"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* TOAST NOTIFICATION */}
      <AdminToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};
