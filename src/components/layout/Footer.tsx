import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  UserPlus, 
  ArrowRight,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { ParthNewsLogo } from '../common/ParthNewsLogo';
import { 
  FacebookIcon, 
  TwitterXIcon, 
  YouTubeIcon, 
  InstagramIcon, 
  TelegramIcon 
} from '../common/SocialIcons';
import { db } from '../../services/db';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [settings, setSettings] = useState(() => db.getSettings());

  useEffect(() => {
    const unsub = db.subscribe(() => {
      setSettings(db.getSettings());
    });
    return unsub;
  }, []);

  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-gray-800 pt-12 pb-8 border-t-4 border-[#C8102E] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-200">
          {/* Col 1: Brand & Tagline & Mission */}
          <div className="space-y-4">
            <ParthNewsLogo variant="footer" size="md" light={false} />
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              <strong className="text-gray-900 font-semibold">पार्थ न्यूज़</strong> एक अग्रणी डिजिटल न्यूज़ मीडिया संस्थान है, जो निष्पक्ष, निर्भीक और सत्यनिष्ठ पत्रकारिता के माध्यम से ज़मीनी सच को जनता और सत्ता के समक्ष प्रस्तुत करता है।
            </p>
            
            {/* Real Colorful Social Icons */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                सोशल मीडिया पर जुड़ें (Follow Us)
              </span>
              <div className="flex items-center gap-2.5 flex-wrap">
                <a 
                  href={settings.socialLinks?.facebook || 'https://facebook.com'} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:scale-110 transition-transform duration-200"
                  title="Facebook पर फॉलो करें"
                >
                  <FacebookIcon size={34} />
                </a>
                <a 
                  href={settings.socialLinks?.twitter || 'https://twitter.com'} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:scale-110 transition-transform duration-200"
                  title="X (Twitter) पर फॉलो करें"
                >
                  <TwitterXIcon size={34} />
                </a>
                <a 
                  href={settings.socialLinks?.youtube || 'https://youtube.com'} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:scale-110 transition-transform duration-200"
                  title="YouTube चैनल सब्सक्राइब करें"
                >
                  <YouTubeIcon size={34} />
                </a>
                <a 
                  href={settings.socialLinks?.instagram || 'https://instagram.com'} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:scale-110 transition-transform duration-200"
                  title="Instagram पर फॉलो करें"
                >
                  <InstagramIcon size={34} />
                </a>
                <a 
                  href={settings.socialLinks?.telegram || 'https://t.me'} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:scale-110 transition-transform duration-200"
                  title="Telegram चैनल से जुड़ें"
                >
                  <TelegramIcon size={34} />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: News Sections */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 border-l-4 border-[#C8102E] pl-3 py-0.5">
              <h3 className="font-['Outfit',sans-serif] font-black text-sm tracking-wider uppercase text-gray-900">
                News Categories
              </h3>
              <span className="font-['Mukta',sans-serif] font-bold text-xs text-[#C8102E] bg-red-50 border border-red-200/80 px-2 py-0.5 rounded tracking-normal">
                श्रेणियां
              </span>
            </div>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 font-['Mukta',sans-serif] text-[14px] text-gray-700 font-semibold">
              <li>
                <button 
                  onClick={() => handleNav('/category/uttar-pradesh')} 
                  className="hover:text-[#C8102E] transition-all text-left flex items-center gap-1.5 group py-1 cursor-pointer w-full"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#C8102E] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform">उत्तर प्रदेश</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/category/prayagraj')} 
                  className="hover:text-[#C8102E] transition-all text-left flex items-center gap-1.5 group py-1 cursor-pointer w-full"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#C8102E] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform">प्रयागराज</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/category/india')} 
                  className="hover:text-[#C8102E] transition-all text-left flex items-center gap-1.5 group py-1 cursor-pointer w-full"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#C8102E] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform">देश / राष्ट्रीय</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/category/politics')} 
                  className="hover:text-[#C8102E] transition-all text-left flex items-center gap-1.5 group py-1 cursor-pointer w-full"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#C8102E] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform">राजनीति</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/category/crime')} 
                  className="hover:text-[#C8102E] transition-all text-left flex items-center gap-1.5 group py-1 cursor-pointer w-full"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#C8102E] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform">अपराध</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/category/business')} 
                  className="hover:text-[#C8102E] transition-all text-left flex items-center gap-1.5 group py-1 cursor-pointer w-full"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#C8102E] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform">व्यापार</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/category/sports')} 
                  className="hover:text-[#C8102E] transition-all text-left flex items-center gap-1.5 group py-1 cursor-pointer w-full"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#C8102E] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform">खेल</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/category/education')} 
                  className="hover:text-[#C8102E] transition-all text-left flex items-center gap-1.5 group py-1 cursor-pointer w-full"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#C8102E] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform">शिक्षा व रोज़गार</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/articles')} 
                  className="hover:text-[#C8102E] transition-all text-left flex items-center gap-1.5 group py-1 cursor-pointer w-full text-gray-900 font-bold"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#C8102E] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>संपादकीय लेख</span>
                    <span className="text-[10px] font-bold text-[#C8102E] bg-red-50 border border-red-200/80 px-1 py-0.2 rounded leading-none">विचार</span>
                  </span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/videos')} 
                  className="hover:text-[#C8102E] transition-all text-left flex items-center gap-1.5 group py-1 cursor-pointer w-full text-[#C8102E] font-bold"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#C8102E] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform flex items-center gap-1.5">
                    <span>वीडियो बुलेटिन</span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8102E]"></span>
                    </span>
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Reporter Management & Verification */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 border-l-4 border-[#C8102E] pl-3 py-0.5">
              <h3 className="font-['Outfit',sans-serif] font-black text-sm tracking-wider uppercase text-gray-900">
                Reporter Portal
              </h3>
              <span className="font-['Mukta',sans-serif] font-bold text-xs text-[#C8102E] bg-red-50 border border-red-200/80 px-2 py-0.5 rounded tracking-normal">
                संवाददाता सेवा
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => handleNav('/apply-reporter')}
                className="w-full text-left bg-red-50/90 hover:bg-[#C8102E] hover:text-white text-[#C8102E] border border-red-200 p-2.5 rounded-xl transition-all flex items-center justify-between font-semibold group shadow-2xs cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-[#C8102E] group-hover:text-white transition-colors" />
                  <span className="font-['Mukta',sans-serif] text-[13.5px] font-bold">Become a Reporter (आवेदन करें)</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNav('/reporter-status')}
                className="w-full text-left bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 p-2.5 rounded-xl transition-colors flex items-center justify-between font-medium cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-['Mukta',sans-serif] text-[13px] font-semibold text-gray-800">Check Application Status (आवेदन स्थिति)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </button>

              <button
                onClick={() => handleNav('/reporter-id')}
                className="w-full text-left bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 p-2.5 rounded-xl transition-colors flex items-center justify-between font-medium cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span className="font-['Mukta',sans-serif] text-[13px] font-semibold text-gray-800">Download Digital ID Card (प्रेस कार्ड)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Col 4: Bureau Addresses & Contact */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 border-l-4 border-[#C8102E] pl-3 py-0.5">
              <h3 className="font-['Outfit',sans-serif] font-black text-sm tracking-wider uppercase text-gray-900">
                Head Bureau & Contact
              </h3>
            </div>
            <div className="text-xs text-gray-600 space-y-2.5">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#C8102E] shrink-0" />
                <span className="font-['Mukta',sans-serif] text-[13.5px] font-semibold text-gray-900">
                  चैनल हेड (Channel Head): <span className="text-[#C8102E] font-bold">{settings.channelHead || 'राजीव राय'}</span>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                <span className="font-['Mukta',sans-serif] text-[13px] leading-snug text-gray-700">{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                <a href={`tel:${settings.contactPhone}`} className="font-['Outfit',sans-serif] font-bold text-gray-800 hover:text-[#C8102E] transition-colors">
                  Mob: {settings.contactPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                <span className="font-['Outfit',sans-serif] font-medium text-gray-800">{settings.contactEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal, Quick Links & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-['Outfit',sans-serif] font-medium tracking-wide">
            <button onClick={() => handleNav('/about')} className="hover:text-[#C8102E] transition-colors cursor-pointer">About Us</button>
            <span>•</span>
            <button onClick={() => handleNav('/contact')} className="hover:text-[#C8102E] transition-colors cursor-pointer">Contact</button>
            <span>•</span>
            <button onClick={() => handleNav('/advertise')} className="hover:text-[#C8102E] transition-colors cursor-pointer">Advertise With Us</button>
            <span>•</span>
            <button onClick={() => handleNav('/privacy-policy')} className="hover:text-[#C8102E] transition-colors cursor-pointer">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => handleNav('/terms')} className="hover:text-[#C8102E] transition-colors cursor-pointer">Terms of Service</button>
            <span>•</span>
            <button onClick={() => handleNav('/disclaimer')} className="hover:text-[#C8102E] transition-colors cursor-pointer">Disclaimer</button>
          </div>

          <div className="text-center md:text-right text-gray-500 text-[11px] font-['Mukta',sans-serif]">
            © 2026 <strong className="text-gray-900 font-bold font-['Outfit',sans-serif]">PARTH NEWS</strong>. All Rights Reserved. <span className="text-gray-700 font-semibold">सच के साथ, एक कदम आगे।</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

