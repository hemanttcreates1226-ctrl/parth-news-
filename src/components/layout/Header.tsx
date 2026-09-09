import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  UserPlus, 
  CreditCard, 
  ShieldCheck, 
  Tv, 
  Radio, 
  Calendar, 
  MapPin, 
  ChevronDown,
  Sun,
  Flame,
  Globe
} from 'lucide-react';
import { ParthNewsLogo } from '../common/ParthNewsLogo';
import { db } from '../../services/db';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState(db.getCategories());
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentDateString, setCurrentDateString] = useState('');

  useEffect(() => {
    const unsub = db.subscribe(() => {
      setCategories(db.getCategories());
    });

    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDateString(now.toLocaleDateString('hi-IN', options));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { label: 'Home', labelHindi: 'होम', path: '/' },
    { label: 'Latest News', labelHindi: 'ताज़ा खबरें', path: '/news' },
    { label: 'Uttar Pradesh', labelHindi: 'उत्तर प्रदेश', path: '/category/uttar-pradesh' },
    { label: 'Prayagraj', labelHindi: 'प्रयागराज', path: '/category/prayagraj' },
    { label: 'India', labelHindi: 'देश', path: '/category/india' },
    { label: 'Politics', labelHindi: 'राजनीति', path: '/category/politics' },
    { label: 'Crime', labelHindi: 'अपराध', path: '/category/crime' },
    { label: 'Business', labelHindi: 'व्यापार', path: '/category/business' },
    { label: 'Sports', labelHindi: 'खेल', path: '/category/sports' },
    { label: 'Entertainment', labelHindi: 'मनोरंजन', path: '/category/entertainment' },
    { label: 'Technology', labelHindi: 'तकनीक', path: '/category/technology' },
    { label: 'Education', labelHindi: 'शिक्षा', path: '/category/education' },
    { label: 'Health', labelHindi: 'स्वास्थ्य', path: '/category/health' },
    { label: 'Articles', labelHindi: 'लेख/संपादकीय', path: '/articles' },
    { label: 'Videos', labelHindi: 'वीडियो', path: '/videos' }
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      {/* Main Branding Bar (Second top bar removed as requested, logo enlarged) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        {/* Left: Official Logo (Enlarged for high visibility) */}
        <div 
          onClick={() => handleNavClick('/')}
          className="cursor-pointer transition-transform hover:scale-[1.01] shrink-0 py-1"
          title="पार्थ न्यूज़ - मुख्य पृष्ठ"
        >
          <ParthNewsLogo variant="header" size="lg" />
        </div>

        {/* Center / Right Quick Action CTAs (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Apply as Reporter CTA */}
          <button
            onClick={() => handleNavClick('/apply-reporter')}
            className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#A30C25] text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-xs hover:shadow transition-all group"
          >
            <UserPlus className="w-4 h-4 transition-transform group-hover:scale-110" />
            <div className="text-left leading-tight">
              <div className="font-hindi text-[11px] text-red-100">संवाददाता आवेदन</div>
              <div className="tracking-wide text-[11px]">Apply as Reporter</div>
            </div>
          </button>

          {/* Reporter Status & ID Verification */}
          <button
            onClick={() => handleNavClick('/reporter-status')}
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-gray-300 shadow-2xs transition-all"
          >
            <CreditCard className="w-4 h-4 text-[#C8102E]" />
            <div className="text-left leading-tight">
              <div className="font-hindi text-[11px] text-gray-600 font-medium">कार्ड स्थिति / ID</div>
              <div className="text-[11px] font-bold">Status / ID</div>
            </div>
          </button>

          {/* Reporter ID Direct Download */}
          <button
            onClick={() => handleNavClick('/reporter-id')}
            className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-neutral-800 text-xs font-semibold px-3 py-2.5 rounded-xl transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-[#C8102E]" />
            <span className="font-medium text-[11px]">Download ID</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors border border-gray-200"
            title="Search News (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenSearch}
            className="p-2 text-neutral-700 hover:text-neutral-900 hover:bg-gray-100 rounded-lg"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleNavClick('/apply-reporter')}
            className="bg-[#C8102E] text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Apply</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-800 hover:bg-gray-100 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Navigation Bar (Desktop Sticky) */}
      <nav className="bg-white text-gray-800 border-t border-b border-gray-200 hidden lg:block overflow-x-auto scrollbar-none shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <ul className="flex items-center gap-1 whitespace-nowrap py-1.5 text-[13px] font-semibold">
            {navItems.map((item) => {
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <li key={item.path}>
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`px-3 py-1.5 rounded-lg transition-all relative font-medium ${
                      isActive 
                        ? 'bg-[#C8102E] text-white font-bold shadow-xs' 
                        : 'text-gray-700 hover:text-[#C8102E] hover:bg-red-50/80 font-semibold'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Quick Live TV / E-Paper Flag */}
          <div className="flex items-center gap-2 pl-3">
            <button
              onClick={() => handleNavClick('/videos')}
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs transition-colors"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>LIVE VIDEOS</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[108px] z-50 bg-black/60 backdrop-blur-xs flex flex-col">
          <div className="bg-white text-neutral-900 w-full max-h-[85vh] overflow-y-auto shadow-2xl border-b border-gray-200 p-4 space-y-4">
            {/* Action Buttons in Mobile Drawer */}
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-gray-100">
              <button
                onClick={() => handleNavClick('/apply-reporter')}
                className="bg-[#C8102E] text-white p-2.5 rounded font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                <span>Apply as Reporter</span>
              </button>
              <button
                onClick={() => handleNavClick('/reporter-status')}
                className="bg-neutral-900 text-white p-2.5 rounded font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <CreditCard className="w-4 h-4 text-red-400" />
                <span>Reporter Status</span>
              </button>
              <button
                onClick={() => handleNavClick('/reporter-id')}
                className="bg-gray-100 text-neutral-800 p-2.5 rounded font-bold text-xs flex items-center justify-center gap-1.5 col-span-2 border border-gray-300"
              >
                <ShieldCheck className="w-4 h-4 text-[#C8102E]" />
                <span>Download Digital Reporter ID Card</span>
              </button>
            </div>

            {/* Navigation Category List */}
            <div className="space-y-1">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 py-1">
                News Sections
              </div>
              <div className="grid grid-cols-2 gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`text-left px-3 py-2 rounded text-sm font-medium flex items-center justify-between ${
                      currentPath === item.path ? 'bg-red-50 text-[#C8102E] font-bold' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-hindi text-xs text-gray-400">{item.labelHindi}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links & Legal */}
            <div className="pt-3 border-t border-gray-100 text-xs text-gray-600 space-y-2">
              <div className="flex flex-wrap gap-3">
                <button onClick={() => handleNavClick('/about')} className="hover:text-black">About Parth News</button>
                <button onClick={() => handleNavClick('/contact')} className="hover:text-black">Contact Bureau</button>
                <button onClick={() => handleNavClick('/advertise')} className="hover:text-black">Advertise</button>
              </div>
              <p className="font-hindi text-gray-500 text-[11px] pt-1">
                पार्थ न्यूज़ — सच के साथ, एक कदम आगे
              </p>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}
    </header>
  );
};
