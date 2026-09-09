import React, { useState } from 'react';
import { Save, CheckCircle2, RotateCcw } from 'lucide-react';
import { db } from '../../services/db';
import { WebsiteSettings } from '../../types';

export const AdminSettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const s = db.getSettings();
    return {
      siteName: s?.siteName || 'Parth News',
      siteNameHindi: s?.siteNameHindi || 'पार्थ न्यूज़',
      tagline: s?.tagline || 'सच के साथ, एक कदम आगे',
      contactEmail: s?.contactEmail || 'editor@parthnews.in',
      contactPhone: s?.contactPhone || '+91 98390 00000',
      address: s?.address || '12-B/4 कस्तूरबा गांधी मार्ग, सिविल लाइन्स, प्रयागराज (उ.प्र.) 211001',
      headBureau: s?.headBureau || 'हजरतगंज, लखनऊ, उत्तर प्रदेश 226001',
      breakingNewsTickerEnabled: s?.breakingNewsTickerEnabled ?? true
    };
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetSeedData = () => {
    if (confirm('चेतावनी: क्या आप सभी डेटा को डिफ़ॉल्ट प्रारंभिक डेटा में रीसेट करना चाहते हैं? (Reset everything to default seed data?)')) {
      db.resetToSeedData();
      const s = db.getSettings();
      setSettings({
        siteName: s?.siteName || 'Parth News',
        siteNameHindi: s?.siteNameHindi || 'पार्थ न्यूज़',
        tagline: s?.tagline || 'सच के साथ, एक कदम आगे',
        contactEmail: s?.contactEmail || 'editor@parthnews.in',
        contactPhone: s?.contactPhone || '+91 98390 00000',
        address: s?.address || '12-B/4 कस्तूरबा गांधी मार्ग, सिविल लाइन्स, प्रयागराज (उ.प्र.) 211001',
        headBureau: s?.headBureau || 'हजरतगंज, लखनऊ, उत्तर प्रदेश 226001',
        breakingNewsTickerEnabled: s?.breakingNewsTickerEnabled ?? true
      });
      alert('डेटाबेस सफलतापूर्वक रीसेट कर दिया गया!');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-hindi text-gray-900">
            पोर्टल एवं न्यूज़रूम सेटिंग्स (Website Settings)
          </h1>
          <p className="text-xs text-gray-500 font-hindi">
            ब्रांडिंग, ब्यूरो पते, संपर्क सूत्र एवं ब्रेकिंग न्यूज़ नियंत्रण
          </p>
        </div>

        {saved && (
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4" />
            <span>सेटिंग्स सुरक्षित हुईं (Saved!)</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6 text-xs">
        {/* Section 1: Branding */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold font-hindi text-gray-900 border-l-4 border-[#C8102E] pl-2.5">
            1. ब्रांडिंग एवं स्लोगन (Portal Identity)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">पोर्टल का नाम (English Name)</label>
              <input
                type="text"
                value={settings.siteName || ''}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">हिंदी नाम (Hindi Name)</label>
              <input
                type="text"
                value={settings.siteNameHindi || ''}
                onChange={(e) => setSettings({ ...settings, siteNameHindi: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-hindi text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-gray-700 mb-1">आधिकारिक स्लोगन (Tagline)</label>
              <input
                type="text"
                value={settings.tagline || ''}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-hindi text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Info */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-bold font-hindi text-gray-900 border-l-4 border-[#C8102E] pl-2.5">
            2. संपर्क एवं ब्यूरो पते (Contact & Bureau Addresses)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">आधिकारिक ईमेल (Contact Email)</label>
              <input
                type="email"
                value={settings.contactEmail || ''}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">हेल्पलाइन फोन (Contact Phone)</label>
              <input
                type="text"
                value={settings.contactPhone || ''}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-gray-700 mb-1">प्रयागराज प्रधान कार्यालय (Prayagraj Bureau)</label>
              <input
                type="text"
                value={settings.address || ''}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-hindi text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-gray-700 mb-1">लखनऊ राज्य ब्यूरो (State Bureau Lucknow)</label>
              <input
                type="text"
                value={settings.headBureau || ''}
                onChange={(e) => setSettings({ ...settings, headBureau: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-hindi text-gray-900 focus:outline-hidden focus:border-[#C8102E]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Breaking News Controls */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-bold font-hindi text-gray-900 border-l-4 border-[#C8102E] pl-2.5">
            3. ब्रेकिंग न्यूज़ टिकर नियंत्रण (Live Ticker Settings)
          </h3>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.breakingNewsTickerEnabled ?? true}
                onChange={(e) => setSettings({ ...settings, breakingNewsTickerEnabled: e.target.checked })}
                className="rounded text-red-600 w-4 h-4 focus:ring-red-500"
              />
              <span className="font-bold text-gray-800">लाइव ब्रेकिंग टिकर सक्रिय रखें (Enable Ticker)</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetSeedData}
            className="text-red-600 hover:text-red-800 font-bold flex items-center gap-1.5 py-2 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data to Initial State</span>
          </button>

          <button
            type="submit"
            className="bg-[#C8102E] hover:bg-[#A30C25] text-white font-bold px-6 py-2.5 rounded-xl shadow flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>सेटिंग्स सुरक्षित करें (Save Settings)</span>
          </button>
        </div>
      </form>
    </div>
  );
};
