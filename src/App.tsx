import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/common/SearchModal';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { ArticlePage } from './pages/public/ArticlePage';
import { NewsArchivePage } from './pages/public/NewsArchivePage';
import { VideosPage } from './pages/public/VideosPage';
import { ApplyReporterPage } from './pages/public/ApplyReporterPage';
import { ReporterStatusPage } from './pages/public/ReporterStatusPage';
import { ReporterIdPage } from './pages/public/ReporterIdPage';
import { VerifyReporterPage } from './pages/public/VerifyReporterPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { AdvertisePage } from './pages/public/AdvertisePage';
import { LegalPages } from './pages/public/LegalPages';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboardOverview } from './pages/admin/AdminDashboardOverview';
import { AdminNewsManager } from './pages/admin/AdminNewsManager';
import { AdminArticlesManager } from './pages/admin/AdminArticlesManager';
import { AdminVideosManager } from './pages/admin/AdminVideosManager';
import { AdminCategoriesManager } from './pages/admin/AdminCategoriesManager';
import { AdminApplicationsManager } from './pages/admin/AdminApplicationsManager';
import { AdminIdCardsManager } from './pages/admin/AdminIdCardsManager';
import { AdminSettingsManager } from './pages/admin/AdminSettingsManager';

import { db } from './services/db';

function MainApp() {
  const { isAuthenticated } = useAuth();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search;
    }
    return '/';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [adminTab, setAdminTab] = useState('overview');
  const [adminCreateNewsOpen, setAdminCreateNewsOpen] = useState(false);
  const [adminCreateVideoOpen, setAdminCreateVideoOpen] = useState(false);

  // Sync state with browser History API
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Parse path & search params
  const [pathname, searchStr] = currentPath.split('?');
  const urlParams = new URLSearchParams(searchStr || '');

  // Check route matches
  const isAdminRoute = pathname.startsWith('/admin');

  // ADMIN ROUTE HANDLER
  if (isAdminRoute) {
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-neutral-100 flex flex-col justify-between">
          <AdminLoginPage
            onSuccess={() => {
              navigate('/admin');
            }}
            onNavigateHome={() => navigate('/')}
          />
        </div>
      );
    }

    const pendingAppsCount = db.getApplications().filter(a => a.status === 'pending' || a.status === 'under_review').length;

    return (
      <AdminLayout
        activeTab={adminTab}
        onSelectTab={(tab) => setAdminTab(tab)}
        onNavigateSite={() => navigate('/')}
        pendingCount={pendingAppsCount}
      >
        {adminTab === 'overview' && (
          <AdminDashboardOverview
            onNavigateTab={(tab) => setAdminTab(tab)}
            onOpenCreateNews={() => {
              setAdminTab('news');
              setAdminCreateNewsOpen(true);
            }}
            onOpenCreateVideo={() => {
              setAdminTab('videos');
              setAdminCreateVideoOpen(true);
            }}
          />
        )}
        {adminTab === 'news' && (
          <AdminNewsManager initialCreateOpen={adminCreateNewsOpen} />
        )}
        {adminTab === 'articles' && <AdminArticlesManager />}
        {adminTab === 'videos' && (
          <AdminVideosManager initialCreateOpen={adminCreateVideoOpen} />
        )}
        {adminTab === 'categories' && <AdminCategoriesManager />}
        {adminTab === 'applications' && (
          <AdminApplicationsManager
            onNavigateToIdCard={(repId) => {
              setAdminTab('idcards');
            }}
          />
        )}
        {adminTab === 'idcards' && <AdminIdCardsManager />}
        {adminTab === 'settings' && <AdminSettingsManager />}
      </AdminLayout>
    );
  }

  // PUBLIC ROUTE ROUTER
  const renderPublicContent = () => {
    // 1. Home
    if (pathname === '/' || pathname === '') {
      return <HomePage onNavigate={navigate} />;
    }

    // 2. News Detail: /news/:slug
    if (pathname.startsWith('/news/')) {
      const slug = pathname.replace('/news/', '');
      return <ArticlePage slug={slug} isEditorial={false} onNavigate={navigate} />;
    }

    // 3. News Archive: /news
    if (pathname === '/news') {
      return <NewsArchivePage onNavigate={navigate} />;
    }

    // 4. Category Archive: /category/:slug
    if (pathname.startsWith('/category/')) {
      const catSlug = pathname.replace('/category/', '');
      return <NewsArchivePage categorySlug={catSlug} onNavigate={navigate} />;
    }

    // 5. Editorial Articles List: /articles
    if (pathname === '/articles') {
      return <NewsArchivePage isEditorialSection={true} onNavigate={navigate} />;
    }

    // 6. Editorial Article Detail: /article/:slug
    if (pathname.startsWith('/article/')) {
      const slug = pathname.replace('/article/', '');
      return <ArticlePage slug={slug} isEditorial={true} onNavigate={navigate} />;
    }

    // 7. Videos: /videos
    if (pathname === '/videos') {
      return <VideosPage onNavigate={navigate} />;
    }

    // 8. Reporter Application: /apply-reporter
    if (pathname === '/apply-reporter') {
      return <ApplyReporterPage onNavigate={navigate} />;
    }

    // 9. Reporter Status: /reporter-status
    if (pathname === '/reporter-status') {
      return <ReporterStatusPage onNavigate={navigate} />;
    }

    // 10. Reporter ID Card / Download: /reporter-id
    if (pathname === '/reporter-id') {
      const idParam = urlParams.get('id') || '';
      return <ReporterIdPage initialId={idParam} onNavigate={navigate} />;
    }

    // 11. Public Verification: /verify-reporter/:id
    if (pathname.startsWith('/verify-reporter/')) {
      const reporterId = pathname.replace('/verify-reporter/', '');
      return <VerifyReporterPage reporterId={reporterId} onNavigate={navigate} />;
    }

    // 12. About: /about
    if (pathname === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    // 13. Contact: /contact
    if (pathname === '/contact') {
      return <ContactPage />;
    }

    // 14. Advertise: /advertise
    if (pathname === '/advertise') {
      return <AdvertisePage />;
    }

    // 15. Legal
    if (pathname === '/privacy-policy') {
      return <LegalPages type="privacy" />;
    }
    if (pathname === '/terms') {
      return <LegalPages type="terms" />;
    }
    if (pathname === '/disclaimer') {
      return <LegalPages type="disclaimer" />;
    }

    // Fallback: 404
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-3xl font-black text-gray-900 font-hindi">404 - पृष्ठ नहीं मिला</h2>
        <p className="text-sm text-gray-500 font-hindi">यह पेज उपलब्ध नहीं है या इसका पता बदल गया है।</p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#C8102E] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow"
        >
          मुख्य पृष्ठ पर जाएं (Back to Home)
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 flex flex-col justify-between selection:bg-[#C8102E] selection:text-white">
      <div>
        {/* Global Main Header */}
        <Header
          currentPath={pathname}
          onNavigate={navigate}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Main Routed Page Content */}
        <main className="pb-12">
          {renderPublicContent()}
        </main>
      </div>

      {/* Global Footer */}
      <Footer onNavigate={navigate} />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
