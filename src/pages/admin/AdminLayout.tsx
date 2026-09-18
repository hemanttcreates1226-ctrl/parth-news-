import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Newspaper, 
  FileText, 
  Tv, 
  FolderTree, 
  UserCheck, 
  CreditCard, 
  Settings, 
  LogOut, 
  ExternalLink,
  Menu,
  X,
  Bell,
  Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ParthNewsLogo } from '../../components/common/ParthNewsLogo';

interface AdminLayoutProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onNavigateSite: () => void;
  children: React.ReactNode;
  pendingCount?: number;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  onSelectTab,
  onNavigateSite,
  children,
  pendingCount = 0
}) => {
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'डैशबोर्ड (Overview)', icon: LayoutDashboard },
    { id: 'news', label: 'समाचार प्रबंधन (News Stories)', icon: Newspaper },
    { id: 'articles', label: 'संपादकीय आलेख (Articles)', icon: FileText },
    { id: 'videos', label: 'वीडियो बुलेटिन (Videos)', icon: Tv },
    { id: 'categories', label: 'श्रेणियां (Categories)', icon: FolderTree },
    { 
      id: 'applications', 
      label: 'संवाददाता आवेदन (Applications)', 
      icon: UserCheck,
      badge: pendingCount > 0 ? pendingCount : undefined 
    },
    { id: 'idcards', label: 'प्रेस कार्ड व सत्यापन (ID Cards)', icon: CreditCard },
    { id: 'settings', label: 'पोर्टल सेटिंग्स (Settings)', icon: Settings },
  ];

  const handleTabClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row">
      {/* Mobile Top Nav */}
      <div className="md:hidden bg-white text-gray-900 p-4 flex items-center justify-between sticky top-0 z-40 border-b border-gray-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1 text-gray-700 hover:text-gray-900">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-bold text-sm tracking-wide text-gray-900">PARTH NEWS CMS</span>
        </div>
        <button
          onClick={onNavigateSite}
          className="text-xs bg-gray-100 hover:bg-gray-200 border border-gray-200 px-3 py-1.5 rounded-lg text-gray-700 font-bold transition-colors"
        >
          View Live Site
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-0 h-screen z-40 w-64 bg-white text-gray-800 flex flex-col justify-between border-r border-gray-200 transition-transform duration-300 shrink-0 shadow-xs
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Brand Header */}
          <div>
            <ParthNewsLogo variant="header" size="sm" light={false} />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#C8102E] text-white font-bold shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-950'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Logout Bottom Bar */}
        <div className="p-4 border-t border-gray-200 bg-gray-50/80 space-y-2">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 p-2 text-xs font-semibold text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer border border-gray-200 bg-white shadow-2xs"
          >
            <LogOut className="w-4 h-4 text-gray-500" />
            <span>Logout</span>
          </button>

          <button
            onClick={onNavigateSite}
            className="w-full bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 shadow-2xs text-xs font-semibold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
            <span>Open Public Website</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};
