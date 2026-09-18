import React, { useState } from 'react';
import { 
  UserPlus, 
  Upload, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertCircle, 
  FileText, 
  Camera, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { db } from '../../services/db';
import { ReporterApplication } from '../../types';

interface ApplyReporterPageProps {
  onNavigate: (path: string) => void;
}

export const ApplyReporterPage: React.FC<ApplyReporterPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    dob: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    district: 'Prayagraj',
    state: 'Uttar Pradesh',
    pincode: '',
    education: '',
    experience: '',
    previousOrganization: '',
    reason: '',
    profilePhoto: '',
    agreeDeclaration: false
  });

  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [submittedApp, setSubmittedApp] = useState<ReporterApplication | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Photo size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setFormData(prev => ({ ...prev, profilePhoto: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('कृपया अपना पूरा नाम दर्ज करें (Full Name is required)');
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.replace(/\D/g, '').length < 10) {
      setErrorMsg('कृपया मान्य 10-अंकीय मोबाइल नंबर दर्ज करें (Valid 10-digit mobile number required)');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('कृपया मान्य ईमेल पता दर्ज करें (Valid email required)');
      return;
    }
    if (!formData.agreeDeclaration) {
      setErrorMsg('कृपया नियम व शर्तों की घोषणा स्वीकार करें (Please accept declaration)');
      return;
    }
    if (!formData.profilePhoto && !photoPreview) {
      setErrorMsg('कृपया अपनी पासपोर्ट साइज़ फोटो अपलोड करें (Please upload your passport size photo)');
      return;
    }

    setIsSubmitting(true);

    try {
      const created = db.submitApplication({
        fullName: formData.fullName.trim(),
        fatherName: formData.fatherName.trim(),
        dob: formData.dob,
        mobile: formData.mobile.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        district: formData.district.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        education: formData.education.trim(),
        experience: formData.experience.trim(),
        previousOrganization: formData.previousOrganization.trim(),
        reason: formData.reason.trim(),
        profilePhoto: formData.profilePhoto || photoPreview || ''
      });

      setSubmittedApp(created);
      
      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMsg(err.message || 'Application submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (!submittedApp) return;
    navigator.clipboard.writeText(submittedApp.applicationNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {submittedApp ? (
        /* SUCCESS SCREEN */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
              APPLICATION SUBMITTED SUCCESSFULLY
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-hindi text-gray-900">
              आपका संवाददाता आवेदन सफलतापूर्वक दर्ज कर लिया गया है
            </h1>
            <p className="text-sm text-gray-600 max-w-lg mx-auto font-hindi">
              पार्थ न्यूज़ परिवार से जुड़ने के लिए धन्यवाद। आपका आवेदन संपादक मंडल के समक्ष समीक्षा हेतु प्रेषित कर दिया गया है।
            </p>
          </div>

          {/* Tracking Number Card */}
          <div className="bg-red-50/70 border-2 border-dashed border-[#C8102E] rounded-2xl p-6 max-w-md mx-auto space-y-3 text-left">
            <div className="text-xs font-bold text-gray-500 uppercase">
              Your Application Tracking Number (आवेदन क्रमांक):
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-red-200 shadow-xs">
              <span className="font-mono text-xl sm:text-2xl font-black text-[#C8102E] tracking-wider">
                {submittedApp.applicationNumber}
              </span>
              <button
                onClick={handleCopy}
                className="bg-neutral-900 hover:bg-black text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-gray-600 font-hindi">
              ⚠️ कृपया इस आवेदन क्रमांक को सुरक्षित नोट कर लें। इसके द्वारा आप पोर्टल पर अपने आवेदन की स्थिति (Status) देख सकेंगे।
            </p>
          </div>

          {/* Next Steps Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('/reporter-status')}
              className="bg-[#C8102E] hover:bg-[#A30C25] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Track Application Status (स्थिति जांचें)</span>
            </button>
            <button
              onClick={() => onNavigate('/')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm px-6 py-3 rounded-xl"
            >
              Back to Home (होमपेज पर जाएं)
            </button>
          </div>
        </div>
      ) : (
        /* APPLICATION FORM */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl space-y-8">
          {/* Form Header */}
          <div className="text-center space-y-2 pb-6 border-b border-gray-200">
            <div className="inline-flex items-center gap-1.5 bg-red-100 text-[#C8102E] text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
              <UserPlus className="w-3.5 h-3.5" />
              <span>OFFICIAL REPORTER RECRUITMENT 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-hindi text-gray-900">
              Become a Parth News Reporter (संवाददाता बनें)
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 font-hindi max-w-xl mx-auto">
              पार्थ न्यूज़ के साथ जुड़कर अपने शहर व जनपद की निष्पक्ष आवाज़ बनें। संपूर्ण विवरण ध्यानपूर्वक भरें।
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-xl flex items-center gap-3 text-red-800 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Personal Details */}
            <div className="space-y-4">
              <h3 className="text-base font-bold font-hindi text-gray-900 flex items-center gap-2 border-l-4 border-[#C8102E] pl-2.5">
                1. व्यक्तिगत विवरण (Personal Information)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    आवेदक का पूरा नाम (Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. अमित कुमार शर्मा"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-[#C8102E] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    पिता / अभिभावक का नाम (Father's Name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. श्री राम शरण शर्मा"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-[#C8102E] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    जन्म तिथि (Date of Birth) *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-[#C8102E] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    मोबाइल नंबर (Mobile Number) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98390 12345"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-[#C8102E] focus:bg-white transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ईमेल पता (Email Address) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-[#C8102E] focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Location & Address */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-base font-bold font-hindi text-gray-900 flex items-center gap-2 border-l-4 border-[#C8102E] pl-2.5">
                2. पता एवं कार्यक्षेत्र (Address & Reporting Area)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    स्थाई / वर्तमान पता (Full Address) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="मकान संख्या, मोहल्ला / ग्राम, डाकघर"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    शहर / तहसील (City / Tehsil) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. Prayagraj / Handia"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    जनपद (District) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. Prayagraj / Lucknow / Varanasi"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    पिन कोड (PIN Code) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="211001"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Qualification & Media Experience */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-base font-bold font-hindi text-gray-900 flex items-center gap-2 border-l-4 border-[#C8102E] pl-2.5">
                3. शैक्षणिक योग्यता एवं अनुभव (Qualification & Experience)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    उच्चतम शैक्षणिक योग्यता (Education Qualification) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. Graduate / Mass Communication / MA Journalism"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    पत्रकारिता अनुभव (Media Experience) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. 3 वर्ष डिजिटल व प्रिंट रिपोर्टिंग"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    पूर्व संस्थान / अखबार / चैनल (Previous Media Organization)
                  </label>
                  <input
                    type="text"
                    placeholder="यदि कोई पूर्व अनुभव हो (वैकल्पिक)"
                    value={formData.previousOrganization}
                    onChange={(e) => setFormData({ ...formData, previousOrganization: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    आप पार्थ न्यूज़ से क्यों जुड़ना चाहते हैं? (Why join Parth News?) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="अपने विचार एवं प्राथमिक रिपोर्टिंग विषयों का संक्षेप में विवरण दें..."
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3.5 text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Photo Upload */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-base font-bold font-hindi text-gray-900 flex items-center gap-2 border-l-4 border-[#C8102E] pl-2.5">
                4. पासपोर्ट साइज़ फोटो (Profile Photo for Press ID) *
              </h3>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="w-24 h-28 rounded-xl bg-gray-200 border-2 border-dashed border-gray-400 overflow-hidden shrink-0 flex items-center justify-center relative">
                  {photoPreview || formData.profilePhoto ? (
                    <img 
                      src={photoPreview || formData.profilePhoto} 
                      alt="Profile Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-gray-400" />
                  )}
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <span className="text-xs font-bold text-gray-800 block">
                    आधिकारिक प्रेस पहचान पत्र हेतु स्पष्ट पासपोर्ट फोटो चुनें
                  </span>
                  <p className="text-[11px] text-gray-500 font-hindi">
                    JPG / PNG (अधिकतम 5MB)। स्पष्ट चेहरा एवं सादा बैकग्राउंड होना चाहिए।
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{photoPreview || formData.profilePhoto ? 'Change Photo' : 'Upload Photo from Device'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>
                    {(photoPreview || formData.profilePhoto) && (
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoPreview('');
                          setFormData(prev => ({ ...prev, profilePhoto: '' }));
                        }}
                        className="text-xs text-red-600 hover:text-red-700 font-semibold px-3 py-2 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
                      >
                        हटाएं (Remove)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Declaration */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.agreeDeclaration}
                  onChange={(e) => setFormData({ ...formData, agreeDeclaration: e.target.checked })}
                  className="mt-0.5 rounded text-[#C8102E] focus:ring-[#C8102E] w-4 h-4"
                />
                <span className="font-hindi leading-relaxed">
                  मैं प्रमाणित करता हूँ कि मेरे द्वारा दी गई सभी जानकारियां पूर्णतः सत्य हैं। मैं पार्थ न्यूज़ के पत्रकारिता आचार संहिता एवं "सच के साथ, एक कदम आगे" के संकल्प का पूर्ण निष्ठा से पालन करूंगा।
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C8102E] hover:bg-[#A30C25] text-white font-black text-base py-4 rounded-2xl shadow-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>प्रक्रियाधीन है... (Submitting...)</span>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>आवेदन जमा करें (Submit Application)</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
