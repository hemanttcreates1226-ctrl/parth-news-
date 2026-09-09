import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  UserPlus, 
  ArrowRight
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
  const settings = db.getSettings();

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
          <div className="space-y-3">
            <h3 className="text-gray-900 font-bold text-sm tracking-wider uppercase border-l-3 border-[#C8102E] pl-2.5">
              News Categories (श्रेणियां)
            </h3>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-3 text-xs text-gray-600 font-medium">
              <li>
                <button onClick={() => handleNav('/category/uttar-pradesh')} className="hover:text-[#C8102E] transition-colors text-left flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-[#C8102E] transition-colors" /> उत्तर प्रदेश
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/prayagraj')} className="hover:text-[#C8102E] transition-colors text-left flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-[#C8102E] transition-colors" /> प्रयागराज
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/india')} className="hover:text-[#C8102E] transition-colors text-left flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-[#C8102E] transition-colors" /> देश / राष्ट्रीय
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/politics')} className="hover:text-[#C8102E] transition-colors text-left flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-[#C8102E] transition-colors" /> राजनीति
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/crime')} className="hover:text-[#C8102E] transition-colors text-left flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-[#C8102E] transition-colors" /> अपराध
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/business')} className="hover:text-[#C8102E] transition-colors text-left flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-[#C8102E] transition-colors" /> व्यापार
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/sports')} className="hover:text-[#C8102E] transition-colors text-left flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-[#C8102E] transition-colors" /> खेल
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/education')} className="hover:text-[#C8102E] transition-colors text-left flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-[#C8102E] transition-colors" /> शिक्षा व रोज़गार
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/articles')} className="hover:text-[#C8102E] transition-colors text-left flex items-center gap-1.5 group font-semibold text-gray-800">
                  <ArrowRight className="w-3 h-3 text-[#C8102E]" /> संपादकीय लेख
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/videos')} className="hover:text-[#C8102E] transition-colors text-left flex items-center gap-1.5 group font-semibold text-red-600">
                  <ArrowRight className="w-3 h-3 text-red-600" /> वीडियो बुलेटिन
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Reporter Management & Verification */}
          <div className="space-y-3">
            <h3 className="text-gray-900 font-bold text-sm tracking-wider uppercase border-l-3 border-[#C8102E] pl-2.5">
              Reporter Portal (संवाददाता सेवा)
            </h3>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => handleNav('/apply-reporter')}
                className="w-full text-left bg-red-50 hover:bg-[#C8102E] hover:text-white text-[#C8102E] border border-red-200 p-2.5 rounded-xl transition-all flex items-center justify-between font-semibold group shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-[#C8102E] group-hover:text-white" />
                  <span>Become a Reporter (आवेदन करें)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleNav('/reporter-status')}
                className="w-full text-left bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 p-2.5 rounded-xl transition-colors flex items-center justify-between font-medium"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Check Application Status</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </button>

              <button
                onClick={() => handleNav('/reporter-id')}
                className="w-full text-left bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 p-2.5 rounded-xl transition-colors flex items-center justify-between font-medium"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Download Digital ID Card PDF</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Col 4: Bureau Addresses */}
          <div className="space-y-3">
            <h3 className="text-gray-900 font-bold text-sm tracking-wider uppercase border-l-3 border-[#C8102E] pl-2.5">
              Head Bureau & Contact
            </h3>
            <div className="text-xs text-gray-600 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                <span className="font-medium text-gray-800">{settings.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                <span className="font-medium text-gray-800">{settings.contactEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal, Quick Links & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-medium">
            <button onClick={() => handleNav('/about')} className="hover:text-[#C8102E] transition-colors">About Us</button>
            <span>•</span>
            <button onClick={() => handleNav('/contact')} className="hover:text-[#C8102E] transition-colors">Contact</button>
            <span>•</span>
            <button onClick={() => handleNav('/advertise')} className="hover:text-[#C8102E] transition-colors">Advertise With Us</button>
            <span>•</span>
            <button onClick={() => handleNav('/privacy-policy')} className="hover:text-[#C8102E] transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => handleNav('/terms')} className="hover:text-[#C8102E] transition-colors">Terms of Service</button>
            <span>•</span>
            <button onClick={() => handleNav('/disclaimer')} className="hover:text-[#C8102E] transition-colors">Disclaimer</button>
          </div>

          <div className="text-center md:text-right text-gray-500 text-[11px]">
            © 2026 <strong className="text-gray-900 font-bold">PARTH NEWS</strong>. All Rights Reserved. सच के साथ, एक कदम आगे।
          </div>
        </div>
      </div>
    </footer>
  );
};

