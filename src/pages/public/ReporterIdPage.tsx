import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Download, 
  Search, 
  Printer, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Share2,
  RefreshCw,
  QrCode
} from 'lucide-react';
import { db } from '../../services/db';
import { Reporter, IdCardRecord } from '../../types';
import { ReporterIdCard } from '../../components/reporter/ReporterIdCard';
import { generateAndDownloadIdCardPdf } from '../../services/idCardPdf';

interface ReporterIdPageProps {
  initialId?: string;
  onNavigate: (path: string) => void;
}

export const ReporterIdPage: React.FC<ReporterIdPageProps> = ({ initialId = '', onNavigate }) => {
  const [searchId, setSearchId] = useState(initialId || 'PN-RPT-00001');
  const [reporter, setReporter] = useState<Reporter | undefined>(() => 
    db.getReporterById(initialId || 'PN-RPT-00001')
  );
  const [idCardRecord, setIdCardRecord] = useState<IdCardRecord | undefined>(() =>
    db.getIdCardByReporterId(initialId || 'PN-RPT-00001')
  );
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showBackSide, setShowBackSide] = useState(true);

  useEffect(() => {
    if (initialId) {
      setSearchId(initialId);
      const rep = db.getReporterById(initialId);
      const card = db.getIdCardByReporterId(initialId);
      setReporter(rep);
      setIdCardRecord(card);
    }
  }, [initialId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const query = searchId.trim().toUpperCase();
    if (!query) return;

    // Check in reporters or ID cards
    const rep = db.getReporterById(query);
    const card = db.getIdCardByReporterId(query);

    if (!rep && !card) {
      // Check if it's an application code
      const app = db.getApplicationByNumber(query);
      if (app) {
        if (app.status === 'pending' || app.status === 'under_review') {
          setErrorMsg('Your reporter application has not yet been approved. (आपका आवेदन अभी समीक्षाधीन है)');
        } else if (app.status === 'rejected') {
          setErrorMsg('This application was not approved. (यह आवेदन स्वीकृत नहीं हुआ है)');
        } else if (app.generatedReporterId) {
          const linkedRep = db.getReporterById(app.generatedReporterId);
          if (linkedRep) {
            setReporter(linkedRep);
            setIdCardRecord(db.getIdCardByReporterId(app.generatedReporterId));
            return;
          }
        }
      } else {
        setErrorMsg('Reporter ID not found. (दर्ज की गई रिपोर्टर आईडी रिकॉर्ड में नहीं मिली)');
      }
      setReporter(undefined);
      setIdCardRecord(undefined);
      return;
    }

    setReporter(rep);
    setIdCardRecord(card);
  };

  const handleDownloadPdf = async () => {
    if (!reporter) return;
    setIsGeneratingPdf(true);
    try {
      const success = await generateAndDownloadIdCardPdf(
        'printable-reporter-card',
        reporter.name,
        reporter.reporterId
      );
      if (!success) {
        alert('Failed to generate PDF. You can also print this page directly using Ctrl+P.');
      }
    } catch (err) {
      console.error('PDF error:', err);
      alert('PDF generation error.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#C8102E] text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
          <CreditCard className="w-3.5 h-3.5" />
          <span>OFFICIAL DIGITAL PRESS IDENTITY PORTAL</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-hindi text-gray-900">
          Parth News Reporter ID Card (डिजिटल पहचान पत्र)
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-hindi max-w-xl mx-auto">
          पार्थ न्यूज़ के सभी अधिकृत संवाददाताओं के लिए आधिकारिक डिजिटल प्रेस पहचान पत्र एवं पीडीएफ डाउनलोड।
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-md max-w-xl mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              required
              placeholder="Enter Reporter ID (e.g. PN-RPT-00001)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm font-mono font-bold uppercase focus:outline-hidden focus:border-[#C8102E]"
            />
          </div>
          <button
            type="submit"
            className="bg-neutral-900 hover:bg-black text-white px-5 py-2 rounded-xl text-xs font-bold transition-colors shrink-0"
          >
            Find Card
          </button>
        </form>

        {/* Quick sample chips */}
        <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-gray-100 text-xs">
          <span className="text-[11px] text-gray-400">Sample Active IDs:</span>
          <button
            onClick={() => { setSearchId('PN-RPT-00001'); setReporter(db.getReporterById('PN-RPT-00001')); }}
            className="font-mono text-[11px] font-bold text-[#C8102E] hover:underline"
          >
            PN-RPT-00001
          </button>
          <span>•</span>
          <button
            onClick={() => { setSearchId('PN-RPT-00002'); setReporter(db.getReporterById('PN-RPT-00002')); }}
            className="font-mono text-[11px] font-bold text-[#C8102E] hover:underline"
          >
            PN-RPT-00002
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-xl max-w-xl mx-auto flex items-center gap-3 text-red-800 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ID Card Display */}
      {reporter && (
        <div className="space-y-6">
          {/* Card Status Strip */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-3.5 h-3.5 rounded-full ${reporter.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-red-600'}`}></div>
              <div>
                <span className="text-xs font-bold text-gray-900 uppercase">
                  STATUS: {reporter.status === 'active' ? '✓ ACTIVE & VERIFIED PRESS CORRESPONDENT' : 'INACTIVE / EXPIRED'}
                </span>
                <p className="text-[11px] text-gray-500 font-hindi">
                  वैधता: {reporter.issueDate} से {reporter.validUntil} तक
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowBackSide(!showBackSide)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold"
              >
                {showBackSide ? 'Hide Card Back' : 'Show Card Back'}
              </button>
            </div>
          </div>

          {/* Renderable Live Card Element */}
          <div className="printable-id-card flex justify-center py-2">
            <ReporterIdCard
              id="printable-reporter-card"
              reporter={reporter}
              showBack={showBackSide}
            />
          </div>

          {/* Action Download Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {reporter.status === 'active' ? (
              <>
                <button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="bg-[#C8102E] hover:bg-[#A30C25] text-white font-black text-sm px-6 py-3.5 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Download className="w-5 h-5" />
                  <span>{isGeneratingPdf ? 'Generating Official PDF...' : 'Download ID Card PDF (डाउनलोड करें)'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="bg-neutral-900 hover:bg-black text-white font-bold text-sm px-5 py-3.5 rounded-2xl shadow-md flex items-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Direct Print</span>
                </button>
              </>
            ) : (
              <div className="bg-red-50 text-red-800 p-4 rounded-xl text-xs font-semibold border border-red-200">
                This reporter ID is currently inactive. Please contact the bureau chief for renewal.
              </div>
            )}

            <button
              onClick={() => onNavigate(`/verify-reporter/${reporter.reporterId}`)}
              className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold text-sm px-5 py-3.5 rounded-2xl shadow-xs flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#C8102E]" />
              <span>Public Verification Link</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
