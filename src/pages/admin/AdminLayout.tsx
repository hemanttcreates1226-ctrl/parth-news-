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
  ShieldCheck,
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
  const { user, logout } = useAuth();
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
      <div className="md:hidden bg-neutral-900 text-white p-4 flex items-center justify-between sticky top-0 z-40 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-bold text-sm tracking-wide">PARTH NEWS CMS</span>
        </div>
        <button
          onClick={onNavigateSite}
          className="text-xs bg-neutral-800 px-3 py-1 rounded text-gray-300 hover:text-white"
        >
          View Live Site
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-0 h-screen z-40 w-64 bg-[#111111] text-white flex flex-col justify-between border-r border-neutral-800 transition-transform duration-300 shrink-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Brand Header */}
          <div className="space-y-1">
            <ParthNewsLogo variant="footer" size="sm" />
            <div className="flex items-center gap-1.5 pt-2 text-[10px] font-bold text-red-400 uppercase tracking-wider font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Editorial Control Center</span>
            </div>
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#C8102E] text-white font-bold shadow-md'
                      : 'text-gray-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="bg-amber-400 text-black text-[10px] font-black px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Logout Bottom Bar */}
        <div className="p-4 border-t border-neutral-800 bg-[#0c0c0c] space-y-3">
          <div className="flex items-center justify-between">
            <div className="truncate">
              <span className="text-xs font-bold text-white block truncate">{user?.name || 'Administrator'}</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-mono">
                ROLE: {user?.role || 'ADMIN'}
              </span>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onNavigateSite}
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white text-xs font-semibold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
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
