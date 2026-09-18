import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock, Building, UserCheck } from 'lucide-react';
import { db } from '../../services/db';
import { 
  FacebookIcon, 
  TwitterXIcon, 
  YouTubeIcon, 
  InstagramIcon, 
  TelegramIcon 
} from '../../components/common/SocialIcons';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const settings = db.getSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    try {
      db.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || 'General Inquiry',
        message: formData.message
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="bg-red-100 text-[#C8102E] text-xs font-bold px-3 py-1 rounded-full uppercase">
          CONTACT BUREAU & EDITORIAL BOARD
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-hindi text-gray-900">
          पार्थ न्यूज़ संपर्क एवं समाचार सूचना केंद्र
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-hindi max-w-lg mx-auto">
          अपने क्षेत्र की खबरें, सुझाव या विचार हमारे मुख्य संपादक मंडल तक सीधे पहुंचाएं।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Information (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white text-gray-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-bold font-hindi text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
              <Building className="w-5 h-5 text-[#C8102E]" />
              <span>मुख्यालय संपर्क विवरण</span>
            </h3>

            <div className="space-y-4 text-xs text-gray-600">
              <div className="flex items-start gap-3 bg-red-50/70 p-3 rounded-2xl border border-red-100">
                <UserCheck className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block font-bold text-sm">चैनल हेड (Channel Head):</strong>
                  <p className="font-hindi text-[#C8102E] font-bold text-base mt-0.5">{settings.channelHead || 'राजीव राय'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block font-bold text-sm">मुख्यालय पता (Office Address):</strong>
                  <p className="font-hindi text-gray-700 mt-0.5 leading-relaxed">{settings.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <strong className="text-gray-900 block font-bold text-sm">मोबाइल नंबर (Mob):</strong>
                  <a href={`tel:${settings.contactPhone}`} className="font-bold text-gray-900 hover:text-[#C8102E] text-sm transition-colors">
                    {settings.contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <strong className="text-gray-900 block font-bold text-sm">ईमेल पता (Email):</strong>
                  <span className="font-semibold text-gray-700">{settings.contactEmail}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <strong className="text-gray-900 block font-bold text-sm">न्यूज़रूम कार्य समय:</strong>
                  <span className="font-semibold text-gray-700">24x7 डिजिटल न्यूज़ डेस्क</span>
                </div>
              </div>
            </div>

            {/* Real Colorful Social Media Badges */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                आधिकारिक सोशल मीडिया चैनल्स
              </span>
              <div className="flex items-center gap-2.5 flex-wrap pt-1">
                <a href={settings.socialLinks?.facebook || '#'} target="_blank" rel="noreferrer" title="Facebook">
                  <FacebookIcon size={32} />
                </a>
                <a href={settings.socialLinks?.twitter || '#'} target="_blank" rel="noreferrer" title="X (Twitter)">
                  <TwitterXIcon size={32} />
                </a>
                <a href={settings.socialLinks?.youtube || '#'} target="_blank" rel="noreferrer" title="YouTube">
                  <YouTubeIcon size={32} />
                </a>
                <a href={settings.socialLinks?.instagram || '#'} target="_blank" rel="noreferrer" title="Instagram">
                  <InstagramIcon size={32} />
                </a>
                <a href={settings.socialLinks?.telegram || '#'} target="_blank" rel="noreferrer" title="Telegram">
                  <TelegramIcon size={32} />
                </a>
              </div>
            </div>

            <div className="pt-3 text-[11px] text-gray-500 font-hindi bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              "सच के साथ, एक कदम आगे" — किसी भी विधिक अथवा संपादकीय शिकायत हेतु ईमेल करें।
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md">
          <h3 className="text-lg font-bold font-hindi text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#C8102E]" />
            <span>संदेश या समाचार सुझाव भेजें (Send Message)</span>
          </h3>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-emerald-900 font-hindi">
                आपका संदेश प्राप्त हो गया है
              </h4>
              <p className="text-xs text-emerald-700 font-hindi">
                पार्थ न्यूज़ न्यूज़रूम टीम आपके संदेश की समीक्षा कर आवश्यक होने पर शीघ्र संपर्क करेगी।
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    आपका नाम (Your Name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. राकेश कुमार"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    मोबाइल नंबर (Mobile)
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98390 00000"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  ईमेल पता (Email) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  विषय / संदर्भ (Subject)
                </label>
                <input
                  type="text"
                  placeholder="उदा. प्रयागराज स्थानीय समाचार संबंधी"
                  value={formData.subject || ''}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  संदेश या सूचना का विवरण (Message) *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="कृपया पूरा विवरण यहाँ लिखें..."
                  value={formData.message || ''}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3.5 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C8102E] hover:bg-[#A30C25] text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>संदेश प्रेषित करें (Submit Message)</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
