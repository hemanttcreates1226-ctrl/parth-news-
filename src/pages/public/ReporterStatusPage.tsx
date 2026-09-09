import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  CreditCard,
  User,
  Calendar,
  MapPin
} from 'lucide-react';
import { db } from '../../services/db';
import { ReporterApplication, Reporter } from '../../types';

interface ReporterStatusPageProps {
  onNavigate: (path: string) => void;
}

export const ReporterStatusPage: React.FC<ReporterStatusPageProps> = ({ onNavigate }) => {
  const [searchCode, setSearchCode] = useState('');
  const [searched, setSearched] = useState(false);
  const [application, setApplication] = useState<ReporterApplication | null>(null);
  const [reporterRecord, setReporterRecord] = useState<Reporter | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchCode.trim().toUpperCase();
    if (!query) return;

    setSearched(true);
    
    // Check in applications
    const app = db.getApplicationByNumber(query);
    setApplication(app || null);

    // Check in reporters
    const rep = db.getReporterById(query);
    setReporterRecord(rep || null);

    // If app has generated reporter id, load reporter
    if (app && app.generatedReporterId) {
      const linkedRep = db.getReporterById(app.generatedReporterId);
      if (linkedRep) setReporterRecord(linkedRep);
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          icon: <CheckCircle2 className="w-8 h-8 text-emerald-500" />,
          title: 'Congratulations! Your application has been approved.',
          titleHindi: 'बधाई हो! आपका संवाददाता आवेदन स्वीकृत कर लिया गया है।',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          text: 'पार्थ न्यूज़ परिवार में आपका स्वागत है। आपका आधिकारिक डिजिटल प्रेस आईडी कार्ड सक्रिय कर दिया गया है।'
        };
      case 'under_review':
        return {
          icon: <Clock className="w-8 h-8 text-amber-500" />,
          title: 'Our team is reviewing your application.',
          titleHindi: 'हमारा संपादक मंडल आपके आवेदन की समीक्षा कर रहा है।',
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          text: 'आपके शैक्षणिक व पत्रकारिता दस्तावेजों का सत्यापन जारी है। शीघ्र ही निर्णय अपडेट किया जाएगा।'
        };
      case 'rejected':
        return {
          icon: <XCircle className="w-8 h-8 text-red-500" />,
          title: 'Your application has not been approved.',
          titleHindi: 'आपका आवेदन वर्तमान में स्वीकृत नहीं हो सका है।',
          badge: 'bg-red-100 text-red-800 border-red-300',
          text: 'संपादक मंडल द्वारा निर्धारित पात्रता मापदंड अपूर्ण होने के कारण आवेदन निरस्त किया गया है।'
        };
      case 'pending':
      default:
        return {
          icon: <Clock className="w-8 h-8 text-blue-500" />,
          title: 'Your application is currently under review.',
          titleHindi: 'आपका आवेदन समीक्षा हेतु कतार में है।',
          badge: 'bg-blue-100 text-blue-800 border-blue-300',
          text: 'आपका आवेदन प्राप्त हो चुका है। सामान्यतः 24-48 घंटों के भीतर समीक्षा पूर्ण होती है।'
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-neutral-900 text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
          <span>REPORTER APPLICATION TRACKING PORTAL</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-hindi text-gray-900">
          Reporter Application Status (आवेदन स्थिति)
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-hindi max-w-lg mx-auto">
          अपना आवेदन क्रमांक (Application Number) या प्रेस आईडी (Reporter ID) दर्ज कर वर्तमान स्थिति देखें।
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-lg max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 font-hindi">
              आवेदन संख्या या रिपोर्टर आईडी दर्ज करें:
            </label>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="text"
                required
                placeholder="उदा. PN-REP-2026-00001 या PN-RPT-00001"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl pl-11 pr-4 py-3 text-sm sm:text-base font-mono font-bold text-gray-900 uppercase focus:outline-hidden focus:border-[#C8102E] focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#C8102E] hover:bg-[#A30C25] text-white font-black text-sm py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Check Status (स्थिति जांचें)</span>
          </button>
        </form>

        {/* Quick Demo Fill Buttons for easy testing */}
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <span className="text-[11px] text-gray-400 block mb-2 font-medium">
            त्वरित परीक्षण हेतु नमूना नंबर चुनें (Click to test sample codes):
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <button
              onClick={() => { setSearchCode('PN-REP-2026-00001'); }}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold"
            >
              PN-REP-2026-00001 (Approved)
            </button>
            <button
              onClick={() => { setSearchCode('PN-REP-2026-00002'); }}
              className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold"
            >
              PN-REP-2026-00002 (Under Review)
            </button>
            <button
              onClick={() => { setSearchCode('PN-REP-2026-00004'); }}
              className="bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold"
            >
              PN-REP-2026-00004 (Rejected)
            </button>
          </div>
        </div>
      </div>

      {/* Result Display */}
      {searched && (
        <div className="max-w-2xl mx-auto">
          {!application && !reporterRecord ? (
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md text-center space-y-3">
              <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
              <h3 className="text-lg font-bold text-gray-900 font-hindi">
                कोई विवरण नहीं मिला (Record Not Found)
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                दर्ज किया गया आवेदन संख्या या रिपोर्टर आईडी "{searchCode}" रिकॉर्ड में मौजूद नहीं है। कृपया संख्या की जांच करें।
              </p>
            </div>
          ) : application ? (
            (() => {
              const statusInfo = getStatusDisplay(application.status);
              return (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6">
                  {/* Status Banner */}
                  <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                    <div className="shrink-0">{statusInfo.icon}</div>
                    <div className="space-y-1">
                      <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full border uppercase ${statusInfo.badge}`}>
                        STATUS: {application.status.toUpperCase().replace('_', ' ')}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold font-hindi text-gray-900">
                        {statusInfo.titleHindi}
                      </h3>
                      <p className="text-xs text-gray-600 font-hindi">
                        {statusInfo.text}
                      </p>
                    </div>
                  </div>

                  {/* Summary Details Grid */}
                  <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-200 space-y-3 text-xs">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-gray-500 font-medium">आवेदन क्रमांक (Application No):</span>
                      <span className="font-mono font-bold text-[#C8102E] text-sm">
                        {application.applicationNumber}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-gray-500 font-medium">आवेदक का नाम (Applicant Name):</span>
                      <span className="font-bold text-gray-900 text-sm font-hindi">
                        {application.fullName}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-gray-500 font-medium">जनपद / शहर (District / City):</span>
                      <span className="font-medium text-gray-800">
                        {application.district || application.city}, {application.state}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-medium">आवेदन तिथि (Submitted Date):</span>
                      <span className="text-gray-700">
                        {new Date(application.submittedAt).toLocaleDateString('hi-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    {application.rejectionReason && (
                      <div className="pt-2 border-t border-red-200 text-red-700">
                        <strong>कारण (Note):</strong> {application.rejectionReason}
                      </div>
                    )}
                  </div>

                  {/* If Approved, CTA to view & download ID Card */}
                  {application.status === 'approved' && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-3">
                      <h4 className="font-bold text-sm text-emerald-900 font-hindi">
                        प्रेस पहचान पत्र जारी कर दिया गया है
                      </h4>
                      <p className="text-xs text-emerald-700">
                        आपका प्रेस पहचान पत्र संख्या: <strong>{application.generatedReporterId || 'PN-RPT-00001'}</strong>
                      </p>
                      <button
                        onClick={() => onNavigate(`/reporter-id?id=${application.generatedReporterId || 'PN-RPT-00001'}`)}
                        className="bg-[#C8102E] hover:bg-[#A30C25] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md inline-flex items-center gap-2"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>View & Download ID Card PDF →</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })()
          ) : (
            /* Reporter record found */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                <div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
                    ACTIVE REPORTER
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 font-hindi">
                    सत्यापित पार्थ न्यूज़ संवाददाता
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <img 
                  src={reporterRecord!.photo} 
                  alt={reporterRecord!.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#C8102E]"
                />
                <div className="text-xs space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-900 font-hindi">{reporterRecord!.name}</h4>
                  <p className="font-mono font-bold text-[#C8102E]">{reporterRecord!.reporterId}</p>
                  <p className="text-gray-500">{reporterRecord!.designation} • {reporterRecord!.district}</p>
                </div>
              </div>

              <button
                onClick={() => onNavigate(`/reporter-id?id=${reporterRecord!.reporterId}`)}
                className="w-full bg-[#C8102E] hover:bg-[#A30C25] text-white font-bold text-xs py-3 rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Open Digital ID Card & PDF Download →</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
