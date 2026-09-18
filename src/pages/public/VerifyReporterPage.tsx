import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  MapPin, 
  Calendar, 
  Award, 
  ArrowLeft,
  Building2,
  ExternalLink
} from 'lucide-react';
import { db } from '../../services/db';
import { ParthNewsLogo } from '../../components/common/ParthNewsLogo';
import { Reporter } from '../../types';

interface VerifyReporterPageProps {
  reporterId: string;
  onNavigate: (path: string) => void;
}

export const VerifyReporterPage: React.FC<VerifyReporterPageProps> = ({ reporterId, onNavigate }) => {
  const normalized = reporterId.trim().toUpperCase();
  const [reporter, setReporter] = useState<Reporter | undefined>(() => db.getReporterById(normalized));
  const [settings, setSettings] = useState(() => db.getSettings());

  useEffect(() => {
    const unsub = db.subscribe(() => {
      setReporter(db.getReporterById(normalized));
      setSettings(db.getSettings());
    });
    return unsub;
  }, [normalized]);

  const isActive = reporter && reporter.status === 'active';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Top Brand Verification Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl text-center space-y-4 relative overflow-hidden">
        {/* Top decorative stripe */}
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-[#990000] via-[#C8102E] to-[#990000]"></div>

        <div className="flex justify-center pt-2">
          <ParthNewsLogo variant="header" size="md" />
        </div>

        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black font-hindi text-gray-900">
            आधिकारिक प्रेस संवाददाता सत्यापन पोर्टल
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">
            OFFICIAL DIGITAL PRESS CREDENTIAL VERIFICATION
          </p>
        </div>

        {/* Verification Result Card */}
        {!reporter ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 space-y-3">
            <XCircle className="w-12 h-12 text-red-600 mx-auto" />
            <h2 className="text-lg font-bold text-red-900 font-hindi">
              संवाददाता रिकॉर्ड नहीं मिला (Invalid / Unrecognized ID)
            </h2>
            <p className="text-xs text-red-700 max-w-md mx-auto">
              आईडी <strong>"{reporterId}"</strong> पार्थ न्यूज़ के अधिकृत डेटाबेस में दर्ज नहीं है। कृपया अनधिकृत कार्डों से सावधान रहें।
            </p>
          </div>
        ) : isActive ? (
          <div className="space-y-6">
            {/* Verified Badge */}
            <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-emerald-900 shadow-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              <div className="text-center sm:text-left">
                <span className="text-sm sm:text-base font-black uppercase tracking-wider block">
                  ✓ VERIFIED PARTH NEWS REPORTER
                </span>
                <span className="text-xs text-emerald-700 font-hindi font-medium">
                  सत्यापित एवं अधिकृत प्रेस प्रतिनिधि — पार्थ न्यूज़ डिजिटल मीडिया
                </span>
              </div>
            </div>

            {/* Reporter Profile Box */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-left">
              <div className="w-28 h-32 rounded-xl overflow-hidden bg-gray-200 border-2 border-[#C8102E] shrink-0 shadow-md">
                <img 
                  src={reporter.photo} 
                  alt={reporter.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-3 w-full">
                <div>
                  <span className="text-[10px] font-bold text-[#C8102E] uppercase tracking-wider">
                    REPORTER ID: {reporter.reporterId}
                  </span>
                  <h3 className="text-xl font-black text-gray-900 font-hindi">
                    {reporter.name}
                  </h3>
                  <div className="inline-block bg-neutral-900 text-white text-xs font-bold px-2.5 py-0.5 rounded mt-1 uppercase">
                    {reporter.designation}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#C8102E]" />
                    <span><strong>जनपद / राज्य:</strong> {reporter.district}, {reporter.state}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span><strong>जारी तिथि:</strong> {reporter.issueDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:col-span-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span><strong>वैधता (Valid Until):</strong> {reporter.validUntil}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bureau Endorsement */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-xs text-gray-600 text-left space-y-1.5">
              <div className="font-bold text-gray-900 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#C8102E]" />
                <span>पार्थ न्यूज़ मुख्यालय अधिदेश (Editorial Endorsement):</span>
              </div>
              <p className="font-hindi leading-relaxed text-[11px] text-gray-600">
                उपरोक्त पत्रकार पार्थ न्यूज़ डिजिटल मीडिया के अधिकृत संवाददाता हैं। समस्त प्रशासनिक, पुलिस एवं विधिक अधिकारियों से पत्रकारिता विशेषाधिकार व सहयोग प्रदान करने का अनुरोध है।
              </p>
            </div>
          </div>
        ) : (
          /* Inactive status */
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-6 space-y-3">
            <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto" />
            <h2 className="text-lg font-bold text-amber-900 font-hindi">
              संवाददाता कार्ड वर्तमान में निष्क्रिय है (Reporter Status Inactive)
            </h2>
            <p className="text-xs text-amber-800 max-w-md mx-auto">
              आईडी <strong>"{reporter.reporterId}"</strong> का कार्यकाल समाप्त या नवीनीकरण प्रक्रियाधीन है। अधिक जानकारी के लिए प्रधान संपादक कार्यालय से संपर्क करें।
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-gray-600 hover:text-black font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>पार्थ न्यूज़ पोर्टल पर जाएं (Go to Parth News)</span>
          </button>

          <span className="text-gray-400 font-mono text-[11px]">
            SECURE-VERIFY-PARTH-NEWS-2026
          </span>
        </div>
      </div>
    </div>
  );
};
