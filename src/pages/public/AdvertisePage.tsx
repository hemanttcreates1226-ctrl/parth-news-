import React, { useState } from 'react';
import { Megaphone, BarChart3, Users, Target, Send, CheckCircle2, Award } from 'lucide-react';
import { db } from '../../services/db';

export const AdvertisePage: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    adFormat: 'banner',
    budget: '',
    requirements: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.submitContact({
      name: `${formData.contactPerson} (${formData.businessName})`,
      email: formData.email,
      phone: formData.phone,
      subject: `Advertising Enquiry - ${formData.adFormat}`,
      message: `Budget: ${formData.budget || 'Not specified'}\nFormat: ${formData.adFormat}\n\nRequirements: ${formData.requirements}`
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="bg-red-100 text-[#C8102E] text-xs font-bold px-3 py-1 rounded-full uppercase">
          COMMERCIAL & DIGITAL ADVERTISING SOLUTIONS
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-hindi text-gray-900">
          पार्थ न्यूज़ पर विज्ञापन दें (Advertise With Us)
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-hindi max-w-xl mx-auto">
          उत्तर प्रदेश, प्रयागराज और देश भर के लाखों पाठकों तक अपने ब्रांड और व्यापार का प्रभावी प्रचार करें।
        </p>
      </div>

      {/* Stats / Advantage Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-1">
          <div className="w-10 h-10 rounded-full bg-red-100 text-[#C8102E] flex items-center justify-center mx-auto mb-2">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-gray-900">5,00,000+</div>
          <div className="text-xs text-gray-500 font-hindi">मासिक सक्रिय डिजिटल पाठक</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-1">
          <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto mb-2">
            <Target className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-2xl font-black text-gray-900">UP & Prayagraj</div>
          <div className="text-xs text-gray-500 font-hindi">सटीक लक्षित क्षेत्रीय दर्शक</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-1">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-gray-900">Multi-Format</div>
          <div className="text-xs text-gray-500 font-hindi">बैनर, वीडियो, एवं स्पॉन्सर्ड स्टोरीज़</div>
        </div>
      </div>

      {/* Advertising Enquiry Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-lg max-w-3xl mx-auto">
        <h3 className="text-lg font-bold font-hindi text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-[#C8102E]" />
          <span>विज्ञापन प्रस्ताव फॉर्म (Ad Booking & Query Form)</span>
        </h3>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-emerald-900 font-hindi">
              आपका विज्ञापन अनुरोध प्राप्त हुआ
            </h4>
            <p className="text-xs text-emerald-700 font-hindi">
              हमारी मीडिया मार्केटिंग टीम 24 घंटे के भीतर आपसे संपर्क कर रेट-कार्ड व कस्टमाइज़्ड पैकेज साझा करेगी।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  कंपनी / व्यापार का नाम (Business Name) *
                </label>
                <input
                  type="text"
                  required
                  placeholder=""
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  संपर्क व्यक्ति का नाम (Contact Person) *
                </label>
                <input
                  type="text"
                  required
                  placeholder=""
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  ईमेल पता (Email) *
                </label>
                <input
                  type="email"
                  required
                  placeholder=""
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  मोबाइल / व्हाट्सएप (Phone) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder=""
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  विज्ञापन प्रारूप (Ad Format)
                </label>
                <select
                  value={formData.adFormat}
                  onChange={(e) => setFormData({ ...formData, adFormat: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                >
                  <option value="Header Banner">Top Header Banner (728x90)</option>
                  <option value="Sidebar Ad">Sidebar Rectangle (300x250)</option>
                  <option value="Video Pre-roll">Video Bulletin Sponsor / Pre-Roll</option>
                  <option value="Sponsored Article">Sponsored Editorial Article</option>
                  <option value="Regional Special">Prayagraj / UP Regional Special Focus</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  अनुमानित बजट (Estimated Budget)
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                विज्ञापन अभियान की आवश्यकताएं (Campaign Requirements)
              </label>
              <textarea
                rows={3}
                placeholder="अपने अभियान के लक्ष्य एवं विशिष्ट तिथियां बताएं..."
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#C8102E] hover:bg-[#A30C25] text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>अनुरोध सबमिट करें (Submit Advertising Query)</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
