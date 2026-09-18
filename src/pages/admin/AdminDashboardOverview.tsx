import React, { useState, useEffect } from 'react';
import { 
  Newspaper, 
  Tv, 
  UserCheck, 
  CreditCard, 
  Eye, 
  Clock, 
  CheckCircle2, 
  Plus, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  FileText
} from 'lucide-react';
import { db } from '../../services/db';
import { Post, ReporterApplication, VideoNews } from '../../types';

interface AdminDashboardOverviewProps {
  onNavigateTab: (tab: string) => void;
  onOpenCreateNews: () => void;
  onOpenCreateVideo: () => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  onNavigateTab,
  onOpenCreateNews,
  onOpenCreateVideo
}) => {
  const [posts, setPosts] = useState<Post[]>(db.getPosts());
  const [videos, setVideos] = useState<VideoNews[]>(db.getVideos());
  const [reporters, setReporters] = useState(db.getReporters());
  const [applications, setApplications] = useState<ReporterApplication[]>(db.getApplications());

  useEffect(() => {
    const unsub = db.subscribe(() => {
      setPosts(db.getPosts());
      setVideos(db.getVideos());
      setReporters(db.getReporters());
      setApplications(db.getApplications());
    });
    return unsub;
  }, []);

  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0) + 
                     videos.reduce((acc, v) => acc + (v.views || 0), 0);

  const pendingApps = applications.filter(a => a.status === 'pending' || a.status === 'under_review');
  const activeReporters = reporters.filter(r => r.status === 'active');

  return (
    <div className="space-y-8">
      {/* Top Welcome Strip */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#C8102E] uppercase tracking-wider">
            NEWSROOM COMMAND CENTER
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-hindi text-gray-900 mt-1">
            पार्थ न्यूज़ मुख्य संपादक एवं प्रशासक डैशबोर्ड
          </h1>
          <p className="text-xs text-gray-500 font-hindi mt-1">
            "सच के साथ, एक कदम आगे" — पोर्टल सांख्यिकी, ब्रेकिंग न्यूज़ एवं संवाददाता नियंत्रण
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={onOpenCreateNews}
            className="bg-[#C8102E] hover:bg-[#A30C25] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Post News (खबर जोड़ें)</span>
          </button>
          <button
            onClick={onOpenCreateVideo}
            className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Tv className="w-4 h-4 text-[#C8102E]" />
            <span>Add Video</span>
          </button>
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: News Stories */}
        <div 
          onClick={() => onNavigateTab('news')}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:border-red-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">कुल प्रकाशित खबरें</span>
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center">
              <Newspaper className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">{posts.length}</span>
            <span className="text-xs text-emerald-600 font-bold">Active Posts</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1 group-hover:text-[#C8102E]">
            <span>Manage Stories</span> <ArrowRight className="w-3 h-3" />
          </p>
        </div>

        {/* Card 2: Video Bulletins */}
        <div 
          onClick={() => onNavigateTab('videos')}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:border-red-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">वीडियो बुलेटिन</span>
            <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center">
              <Tv className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">{videos.length}</span>
            <span className="text-xs text-blue-600 font-bold">Video Reports</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1 group-hover:text-[#C8102E]">
            <span>Manage Videos</span> <ArrowRight className="w-3 h-3" />
          </p>
        </div>

        {/* Card 3: Active Reporters */}
        <div 
          onClick={() => onNavigateTab('idcards')}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">अधिकृत संवाददाता</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">{activeReporters.length}</span>
            <span className="text-xs text-emerald-600 font-bold">Issued Press IDs</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1 group-hover:text-emerald-600">
            <span>View All Press IDs</span> <ArrowRight className="w-3 h-3" />
          </p>
        </div>

        {/* Card 4: Pending Applications */}
        <div 
          onClick={() => onNavigateTab('applications')}
          className={`p-5 rounded-2xl border shadow-xs transition-all cursor-pointer group ${
            pendingApps.length > 0 
              ? 'bg-amber-50/70 border-amber-300 hover:border-amber-400' 
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">लंबित आवेदन</span>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-900">{pendingApps.length}</span>
            <span className="text-xs font-bold text-amber-700">Need Review</span>
          </div>
          <p className="text-[11px] text-amber-800 font-bold mt-2 flex items-center gap-1">
            <span>Review Applications</span> <ArrowRight className="w-3 h-3" />
          </p>
        </div>
      </div>

      {/* 2-Column Split: Pending Applications & Latest News */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Pending Applications Box (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#C8102E]" />
              <h3 className="font-bold font-hindi text-base text-gray-900">
                नवीन संवाददाता आवेदन (Incoming Applications)
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('applications')}
              className="text-xs font-bold text-[#C8102E] hover:underline"
            >
              सभी देखें ({applications.length})
            </button>
          </div>

          <div className="space-y-3">
            {applications.slice(0, 4).map((app) => (
              <div 
                key={app.id} 
                onClick={() => onNavigateTab('applications')}
                className="p-3.5 rounded-xl bg-gray-50 hover:bg-red-50/40 border border-gray-200 hover:border-red-200 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={app.profilePhoto} 
                    alt={app.fullName} 
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 font-hindi">{app.fullName}</h4>
                    <p className="text-[11px] text-gray-500 font-mono">
                      {app.applicationNumber} • {app.district}
                    </p>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  app.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                  app.status === 'under_review' ? 'bg-amber-100 text-amber-800' :
                  app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Published Stories (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-[#C8102E]" />
              <h3 className="font-bold font-hindi text-base text-gray-900">
                हालिया प्रकाशित खबरें (Latest Published News)
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('news')}
              className="text-xs font-bold text-[#C8102E] hover:underline"
            >
              सभी खबरें ({posts.length})
            </button>
          </div>

          <div className="space-y-3">
            {posts.slice(0, 4).map((p) => (
              <div 
                key={p.id} 
                onClick={() => onNavigateTab('news')}
                className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img src={p.featuredImage} alt={p.title} className="w-12 h-10 rounded object-cover shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-[#C8102E] uppercase">{p.category}</span>
                    <h4 className="text-xs font-bold text-gray-900 truncate font-hindi">{p.titleHindi || p.title}</h4>
                  </div>
                </div>
                <div className="text-right text-[11px] text-gray-400 shrink-0">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {p.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
