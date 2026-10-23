import React from 'react';
import { 
  Home, 
  Flame, 
  MapPin, 
  Tv, 
  ShieldCheck,
  UserPlus
} from 'lucide-react';

interface MobileBottomBarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ currentPath, onNavigate }) => {
  const tabs = [
    {
      id: 'home',
      labelHindi: 'होम',
      labelEng: 'Home',
      path: '/',
      icon: Home,
      isActive: currentPath === '/'
    },
    {
      id: 'news',
      labelHindi: 'ताज़ा खबरें',
      labelEng: 'Latest',
      path: '/news',
      icon: Flame,
      isActive: currentPath.startsWith('/news') || currentPath.startsWith('/p/')
    },
    {
      id: 'prayagraj',
      labelHindi: 'प्रयागराज',
      labelEng: 'Prayagraj',
      path: '/category/prayagraj',
      icon: MapPin,
      isActive: currentPath.includes('prayagraj')
    },
    {
      id: 'videos',
      labelHindi: 'वीडियो',
      labelEng: 'Videos',
      path: '/videos',
      icon: Tv,
      isActive: currentPath.startsWith('/videos')
    },
    {
      id: 'reporter',
      labelHindi: 'रिपोर्टर ID',
      labelEng: 'ID Card',
      path: '/reporter-id',
      icon: ShieldCheck,
      isActive: currentPath.startsWith('/reporter') || currentPath.startsWith('/apply-reporter')
    }
  ];

  return (
    <nav 
      aria-label="Mobile Navigation" 
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-[0_-3px_10px_rgba(0,0,0,0.06)] lg:hidden transition-transform duration-200"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-5 h-14 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                onNavigate(tab.path);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center h-full w-full py-1 transition-all active:scale-95 cursor-pointer relative ${
                tab.isActive 
                  ? 'text-[#C8102E]' 
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${tab.isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.75]'}`} />
                {tab.id === 'news' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                )}
              </div>
              <span className={`text-[10px] font-hindi tracking-tight mt-0.5 leading-tight ${
                tab.isActive ? 'font-bold text-[#C8102E]' : 'font-medium'
              }`}>
                {tab.labelHindi}
              </span>
              {tab.isActive && (
                <span className="absolute top-0 inset-x-3 h-0.5 bg-[#C8102E] rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
