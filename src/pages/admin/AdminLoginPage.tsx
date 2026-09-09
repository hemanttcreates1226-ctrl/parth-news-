import React, { useState } from 'react';
import { Lock, Mail, ShieldAlert, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ParthNewsLogo } from '../../components/common/ParthNewsLogo';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onNavigateHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess, onNavigateHome }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@parthnews.in');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('कृपया एडमिन पासवर्ड दर्ज करें।');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      onSuccess();
    } catch (err: any) {
      setError(err?.message || 'अमान्य पासवर्ड! कृपया सही एडमिन पासवर्ड (parthnews123) दर्ज करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-2xl w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <ParthNewsLogo variant="full" size="xl" />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-neutral-900 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
            <ShieldCheck className="w-4 h-4 text-red-400" />
            <span>CENTRAL EDITORIAL CMS & ADMIN</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-hindi text-gray-900">
            संपादक व एडमिन लॉगिन (Control Panel)
          </h2>
          <p className="text-xs text-gray-500 font-hindi">
            समाचार प्रकाशन, लाइव वीडियो, रिपोर्टर आवेदन एवं डिजिटल प्रेस कार्ड कंट्रोल
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-600 p-3.5 rounded-r-xl flex items-center gap-2 text-red-800 text-xs font-medium">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              ईमेल पता (Admin Email)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-[#C8102E] focus:bg-white"
                placeholder="admin@parthnews.in"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              एडमिन पासवर्ड (Admin Password) *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-[#C8102E] focus:bg-white font-mono"
                placeholder="एडमिन पासवर्ड दर्ज करें..."
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              एडमिन पैनल एक्सेस हेतु अधिकृत पासवर्ड आवश्यक है।
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C8102E] hover:bg-[#A30C25] text-white font-black text-sm py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            <span>{loading ? 'सत्यापित हो रहा है...' : 'सुरक्षित प्रवेश करें (Enter Admin Panel)'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onNavigateHome}
            className="text-xs text-gray-500 hover:text-black font-semibold"
          >
            ← वापस मुख्य पोर्टल पर जाएं (Back to Main Site)
          </button>
        </div>
      </div>
    </div>
  );
};
