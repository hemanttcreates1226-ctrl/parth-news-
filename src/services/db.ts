import { 
  Post, 
  VideoNews, 
  Category, 
  ReporterApplication, 
  Reporter, 
  IdCardRecord, 
  ContactMessage, 
  AdvertisementEnquiry, 
  SiteSettings,
  ApplicationStatus,
  ReporterStatus
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_POSTS,
  INITIAL_ARTICLES,
  INITIAL_VIDEOS,
  INITIAL_REPORTER_APPLICATIONS,
  INITIAL_REPORTERS,
  INITIAL_ID_CARDS,
  INITIAL_CONTACTS,
  INITIAL_AD_ENQUIRIES,
  INITIAL_SETTINGS
} from './seedData';

// Storage keys
const STORAGE_KEYS = {
  POSTS: 'parth_news_posts_v1',
  ARTICLES: 'parth_news_articles_v1',
  VIDEOS: 'parth_news_videos_v1',
  CATEGORIES: 'parth_news_categories_v1',
  APPLICATIONS: 'parth_news_applications_v1',
  REPORTERS: 'parth_news_reporters_v1',
  ID_CARDS: 'parth_news_id_cards_v1',
  CONTACTS: 'parth_news_contacts_v1',
  AD_ENQUIRIES: 'parth_news_ad_enquiries_v1',
  SETTINGS: 'parth_news_settings_v1',
  MEDIA: 'parth_news_media_v1',
  ADMIN_AUTH: 'parth_news_admin_auth_v1'
};

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  uploadedAt: string;
}

const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'med-1',
    name: 'prayagraj_sangam_mahakumbh.jpg',
    url: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    size: '1.4 MB',
    type: 'image/jpeg',
    uploadedAt: '2026-09-06T03:00:00.000Z'
  },
  {
    id: 'med-2',
    name: 'highcourt_allahabad_verdict.jpg',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    size: '1.2 MB',
    type: 'image/jpeg',
    uploadedAt: '2026-09-05T18:00:00.000Z'
  },
  {
    id: 'med-3',
    name: 'expressway_corridor_up.jpg',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    size: '1.6 MB',
    type: 'image/jpeg',
    uploadedAt: '2026-09-05T13:50:00.000Z'
  },
  {
    id: 'med-4',
    name: 'reporter_amit_sharma.jpg',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    size: '450 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-08-18T14:00:00.000Z'
  }
];

class DatabaseService {
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_POSTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ARTICLES)) {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(INITIAL_ARTICLES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.VIDEOS)) {
      localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(INITIAL_VIDEOS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_REPORTER_APPLICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REPORTERS)) {
      localStorage.setItem(STORAGE_KEYS.REPORTERS, JSON.stringify(INITIAL_REPORTERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ID_CARDS)) {
      localStorage.setItem(STORAGE_KEYS.ID_CARDS, JSON.stringify(INITIAL_ID_CARDS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CONTACTS)) {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(INITIAL_CONTACTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.AD_ENQUIRIES)) {
      localStorage.setItem(STORAGE_KEYS.AD_ENQUIRIES, JSON.stringify(INITIAL_AD_ENQUIRIES));
    }
    const existingSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!existingSettings) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    } else {
      try {
        const parsed = JSON.parse(existingSettings);
        if (!parsed.channelHead || parsed.contactPhone === '+91 98390 00000' || parsed.address?.includes('कस्तूरबा') || parsed.editorName?.includes('हेमंत')) {
          const updated = {
            ...parsed,
            channelHead: 'राजीव राय',
            channelHeadDesignation: 'चैनल हेड (Channel Head)',
            editorName: 'राजीव राय (Channel Head)',
            editorDesignation: 'चैनल हेड (Channel Head)',
            contactPhone: '+91 9981065457',
            whatsappNumber: '+91 9981065457',
            address: 'अखाई मार्केट, अदालत के सामने मुंगावली जिला अशोकनगर मध्यप्रदेश',
            headBureau: 'मुख्यालय ब्यूरो: अखाई मार्केट, अदालत के सामने मुंगावली, जिला अशोकनगर (म.प्र.)',
            prayagrajBureau: 'अखाई मार्केट, अदालत के सामने मुंगावली, जिला अशोकनगर (म.प्र.)'
          };
          localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
        }
      } catch {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
      }
    }
    if (!localStorage.getItem(STORAGE_KEYS.MEDIA)) {
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(INITIAL_MEDIA));
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  private getItem<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      this.notify();
    } catch (e) {
      console.error('Storage error:', e);
    }
  }

  // --- POSTS ---
  public getPosts(): Post[] {
    return this.getItem<Post[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
  }

  public getPublishedPosts(): Post[] {
    return this.getPosts().filter(p => p.status === 'published');
  }

  public getPostBySlug(slug: string): Post | undefined {
    return this.getPosts().find(p => p.slug === slug);
  }

  public getPostById(id: string): Post | undefined {
    return this.getPosts().find(p => p.id === id);
  }

  public savePost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'readTimeMinutes'> & { id?: string; readTimeMinutes?: number }): Post {
    const posts = this.getPosts();
    const now = new Date().toISOString();

    if (post.id) {
      const index = posts.findIndex(p => p.id === post.id);
      if (index !== -1) {
        const updated: Post = {
          ...posts[index],
          ...post,
          id: post.id,
          updatedAt: now,
          readTimeMinutes: Math.max(1, Math.ceil(post.content.split(/\s+/).length / 180))
        };
        posts[index] = updated;
        this.setItem(STORAGE_KEYS.POSTS, posts);
        return updated;
      }
    }

    const newPost: Post = {
      ...post,
      id: `post-${Date.now()}`,
      views: Math.floor(Math.random() * 50) + 1,
      readTimeMinutes: Math.max(1, Math.ceil(post.content.split(/\s+/).length / 180)),
      createdAt: now,
      updatedAt: now,
      publishedAt: post.status === 'published' ? (post.publishedAt || now) : ''
    };

    posts.unshift(newPost);
    this.setItem(STORAGE_KEYS.POSTS, posts);
    return newPost;
  }

  public createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'slug' | 'readTimeMinutes' | 'publishedAt'> & { slug?: string }): Post {
    const slug = post.slug || (post.title || post.titleHindi || 'news')
      .toLowerCase()
      .replace(/[^\w\u0900-\u097F\s-]/g, '')
      .replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-4);
    return this.savePost({ ...post, slug, publishedAt: new Date().toISOString() });
  }

  public updatePost(id: string, updates: Partial<Post>): Post | null {
    const posts = this.getPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return null;
    const updated = { ...posts[index], ...updates, id, updatedAt: new Date().toISOString() };
    posts[index] = updated;
    this.setItem(STORAGE_KEYS.POSTS, posts);
    return updated;
  }

  public deletePost(id: string): void {
    const posts = this.getPosts().filter(p => p.id !== id);
    this.setItem(STORAGE_KEYS.POSTS, posts);
  }

  public incrementPostViews(id: string): void {
    const posts = this.getPosts();
    const post = posts.find(p => p.id === id);
    if (post) {
      post.views += 1;
      this.setItem(STORAGE_KEYS.POSTS, posts);
    }
  }

  // --- ARTICLES ---
  public getArticles(): Post[] {
    return this.getItem<Post[]>(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
  }

  public getPublishedArticles(): Post[] {
    return this.getArticles().filter(a => a.status === 'published');
  }

  public getArticleBySlug(slug: string): Post | undefined {
    return this.getArticles().find(a => a.slug === slug);
  }

  public saveArticle(article: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'readTimeMinutes'> & { id?: string; readTimeMinutes?: number }): Post {
    const articles = this.getArticles();
    const now = new Date().toISOString();

    if (article.id) {
      const index = articles.findIndex(a => a.id === article.id);
      if (index !== -1) {
        const updated: Post = {
          ...articles[index],
          ...article,
          id: article.id,
          updatedAt: now,
          readTimeMinutes: Math.max(1, Math.ceil(article.content.split(/\s+/).length / 180))
        };
        articles[index] = updated;
        this.setItem(STORAGE_KEYS.ARTICLES, articles);
        return updated;
      }
    }

    const newArticle: Post = {
      ...article,
      id: `art-${Date.now()}`,
      views: Math.floor(Math.random() * 50) + 1,
      readTimeMinutes: Math.max(1, Math.ceil(article.content.split(/\s+/).length / 180)),
      createdAt: now,
      updatedAt: now,
      publishedAt: article.status === 'published' ? (article.publishedAt || now) : ''
    };

    articles.unshift(newArticle);
    this.setItem(STORAGE_KEYS.ARTICLES, articles);
    return newArticle;
  }

  public deleteArticle(id: string): void {
    const articles = this.getArticles().filter(a => a.id !== id);
    this.setItem(STORAGE_KEYS.ARTICLES, articles);
  }

  public createArticle(article: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'slug' | 'readTimeMinutes' | 'publishedAt'> & { slug?: string }): Post {
    const slug = article.slug || (article.title || article.titleHindi || 'article')
      .toLowerCase()
      .replace(/[^\w\u0900-\u097F\s-]/g, '')
      .replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-4);
    return this.saveArticle({ ...article, slug, publishedAt: new Date().toISOString() });
  }

  public updateArticle(id: string, updates: Partial<Post>): Post | null {
    const articles = this.getArticles();
    const index = articles.findIndex(a => a.id === id);
    if (index === -1) return null;
    const updated = { ...articles[index], ...updates, id, updatedAt: new Date().toISOString() };
    articles[index] = updated;
    this.setItem(STORAGE_KEYS.ARTICLES, articles);
    return updated;
  }

  // --- VIDEOS ---
  public getVideos(): VideoNews[] {
    return this.getItem<VideoNews[]>(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS);
  }

  public getVideoBySlug(slug: string): VideoNews | undefined {
    return this.getVideos().find(v => v.slug === slug);
  }

  public saveVideo(video: Omit<VideoNews, 'id' | 'createdAt' | 'views'> & { id?: string }): VideoNews {
    const videos = this.getVideos();
    const now = new Date().toISOString();

    if (video.id) {
      const index = videos.findIndex(v => v.id === video.id);
      if (index !== -1) {
        const updated: VideoNews = {
          ...videos[index],
          ...video,
          id: video.id
        };
        videos[index] = updated;
        this.setItem(STORAGE_KEYS.VIDEOS, videos);
        return updated;
      }
    }

    const newVideo: VideoNews = {
      ...video,
      id: `vid-${Date.now()}`,
      views: Math.floor(Math.random() * 80) + 1,
      createdAt: now,
      publishedAt: video.publishedAt || now
    };

    videos.unshift(newVideo);
    this.setItem(STORAGE_KEYS.VIDEOS, videos);
    return newVideo;
  }

  public createVideo(video: Omit<VideoNews, 'id' | 'createdAt' | 'views' | 'slug' | 'publishedAt' | 'tags'> & { slug?: string; tags?: string[]; publishedAt?: string }): VideoNews {
    const slug = video.slug || (video.title || video.titleHindi || 'video')
      .toLowerCase()
      .replace(/[^\w\u0900-\u097F\s-]/g, '')
      .replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-4);
    return this.saveVideo({ ...video, slug, tags: video.tags || ['वीडियो', 'अपडेट'], publishedAt: video.publishedAt || new Date().toISOString() });
  }

  public updateVideo(id: string, updates: Partial<VideoNews>): VideoNews | null {
    const videos = this.getVideos();
    const index = videos.findIndex(v => v.id === id);
    if (index === -1) return null;
    const updated = { ...videos[index], ...updates, id };
    videos[index] = updated;
    this.setItem(STORAGE_KEYS.VIDEOS, videos);
    return updated;
  }

  public deleteVideo(id: string): void {
    const videos = this.getVideos().filter(v => v.id !== id);
    this.setItem(STORAGE_KEYS.VIDEOS, videos);
  }

  // --- CATEGORIES ---
  public getCategories(): Category[] {
    return this.getItem<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }

  public saveCategory(category: Omit<Category, 'id'> & { id?: string }): Category {
    const categories = this.getCategories();
    if (category.id) {
      const index = categories.findIndex(c => c.id === category.id);
      if (index !== -1) {
        const updated = { ...categories[index], ...category, id: category.id };
        categories[index] = updated;
        this.setItem(STORAGE_KEYS.CATEGORIES, categories);
        return updated;
      }
    }

    const newCategory: Category = {
      ...category,
      id: `cat-${Date.now()}`
    };
    categories.push(newCategory);
    this.setItem(STORAGE_KEYS.CATEGORIES, categories);
    return newCategory;
  }

  public createCategory(cat: Omit<Category, 'id'>): Category {
    return this.saveCategory(cat);
  }

  public updateCategory(id: string, updates: Partial<Category>): Category | null {
    const categories = this.getCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    const updated = { ...categories[index], ...updates, id };
    categories[index] = updated;
    this.setItem(STORAGE_KEYS.CATEGORIES, categories);
    return updated;
  }

  public deleteCategory(id: string): void {
    const categories = this.getCategories().filter(c => c.id !== id);
    this.setItem(STORAGE_KEYS.CATEGORIES, categories);
  }

  // --- REPORTER APPLICATIONS ---
  public getApplications(): ReporterApplication[] {
    return this.getItem<ReporterApplication[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_REPORTER_APPLICATIONS);
  }

  public getApplicationByNumber(num: string): ReporterApplication | undefined {
    const normalized = num.trim().toUpperCase();
    return this.getApplications().find(a => a.applicationNumber.toUpperCase() === normalized);
  }

  public submitApplication(data: Omit<ReporterApplication, 'id' | 'applicationNumber' | 'status' | 'submittedAt'>): ReporterApplication {
    const applications = this.getApplications();
    const count = applications.length + 1;
    const padded = String(count).padStart(5, '0');
    const applicationNumber = `PN-REP-2026-${padded}`;

    const newApp: ReporterApplication = {
      ...data,
      id: `app-${Date.now()}`,
      applicationNumber,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    applications.unshift(newApp);
    this.setItem(STORAGE_KEYS.APPLICATIONS, applications);
    return newApp;
  }

  public updateApplicationStatus(id: string, status: ApplicationStatus, reviewer: string, reason?: string): ReporterApplication | null {
    const applications = this.getApplications();
    const index = applications.findIndex(a => a.id === id);
    if (index === -1) return null;

    const app = applications[index];
    app.status = status;
    app.reviewedAt = new Date().toISOString();
    app.reviewedBy = reviewer;
    if (reason) app.rejectionReason = reason;

    applications[index] = app;
    this.setItem(STORAGE_KEYS.APPLICATIONS, applications);
    return app;
  }

  public approveApplication(id: string, reviewer = 'Chief Editor', designation = 'REPORTER') {
    const res = this.approveReporterApplication(id, designation, reviewer);
    if (!res) throw new Error('Application not found');
    return { application: res.application, reporterId: res.reporter.reporterId };
  }

  public rejectApplication(id: string, reason = 'Not meeting criteria', reviewer = 'Chief Editor') {
    return this.updateApplicationStatus(id, 'rejected', reviewer, reason);
  }

  public setApplicationUnderReview(id: string, reviewer = 'Chief Editor') {
    return this.updateApplicationStatus(id, 'under_review', reviewer);
  }

  public deleteApplication(id: string): void {
    const applications = this.getApplications().filter(a => a.id !== id);
    this.setItem(STORAGE_KEYS.APPLICATIONS, applications);
  }

  public approveReporterApplication(id: string, designation = 'REPORTER', reviewer = 'Chief Editor'): { application: ReporterApplication; reporter: Reporter; idCard: IdCardRecord } | null {
    const applications = this.getApplications();
    const appIndex = applications.findIndex(a => a.id === id);
    if (appIndex === -1) return null;

    const app = applications[appIndex];
    const reporters = this.getReporters();
    
    // Generate reporter ID
    const count = reporters.length + 1;
    const padded = String(count).padStart(5, '0');
    const reporterId = `PN-RPT-${padded}`;

    app.status = 'approved';
    app.reviewedAt = new Date().toISOString();
    app.reviewedBy = reviewer;
    app.generatedReporterId = reporterId;
    applications[appIndex] = app;
    this.setItem(STORAGE_KEYS.APPLICATIONS, applications);

    // Create reporter record
    const today = new Date();
    const oneYearLater = new Date();
    oneYearLater.setFullYear(today.getFullYear() + 1);

    const issueDate = today.toISOString().split('T')[0];
    const validUntil = oneYearLater.toISOString().split('T')[0];

    const newReporter: Reporter = {
      id: `rep-${Date.now()}`,
      reporterId,
      applicationNumber: app.applicationNumber,
      name: app.fullName,
      photo: app.profilePhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80',
      designation: designation.toUpperCase(),
      district: app.district || app.city,
      state: app.state,
      mobile: app.mobile,
      email: app.email,
      status: 'active',
      issueDate,
      validUntil,
      createdAt: new Date().toISOString()
    };

    reporters.unshift(newReporter);
    this.setItem(STORAGE_KEYS.REPORTERS, reporters);

    // Create ID Card record
    const idCards = this.getIdCards();
    const newCard: IdCardRecord = {
      id: `card-${Date.now()}`,
      reporterId,
      reporterName: app.fullName,
      photo: newReporter.photo,
      designation: newReporter.designation,
      district: newReporter.district,
      state: newReporter.state,
      issueDate,
      validUntil,
      status: 'active',
      verificationUrl: `/verify-reporter/${reporterId}`
    };

    idCards.unshift(newCard);
    this.setItem(STORAGE_KEYS.ID_CARDS, idCards);

    return { application: app, reporter: newReporter, idCard: newCard };
  }

  // --- REPORTERS ---
  public getReporters(): Reporter[] {
    return this.getItem<Reporter[]>(STORAGE_KEYS.REPORTERS, INITIAL_REPORTERS);
  }

  public createReporter(data: Omit<Reporter, 'id' | 'reporterId' | 'applicationNumber' | 'issueDate' | 'validUntil' | 'createdAt'> & { reporterId?: string; validUntil?: string; applicationNumber?: string }): Reporter {
    const reporters = this.getReporters();
    const count = reporters.length + 1;
    const padded = String(count).padStart(5, '0');
    const reporterId = data.reporterId || `PN-RPT-${padded}`;
    const today = new Date();
    const oneYearLater = new Date();
    oneYearLater.setFullYear(today.getFullYear() + 1);

    const newReporter: Reporter = {
      ...data,
      id: `rep-${Date.now()}`,
      reporterId,
      applicationNumber: data.applicationNumber || `MANUAL-${Date.now().toString().slice(-4)}`,
      issueDate: today.toISOString().split('T')[0],
      validUntil: data.validUntil || oneYearLater.toISOString().split('T')[0],
      createdAt: today.toISOString()
    };

    reporters.unshift(newReporter);
    this.setItem(STORAGE_KEYS.REPORTERS, reporters);

    // Also create ID card record
    const idCards = this.getIdCards();
    const newCard: IdCardRecord = {
      id: `card-${Date.now()}`,
      reporterId,
      reporterName: newReporter.name,
      photo: newReporter.photo,
      designation: newReporter.designation,
      district: newReporter.district,
      state: newReporter.state,
      issueDate: newReporter.issueDate,
      validUntil: newReporter.validUntil,
      status: 'active',
      verificationUrl: `/verify-reporter/${reporterId}`
    };
    idCards.unshift(newCard);
    this.setItem(STORAGE_KEYS.ID_CARDS, idCards);

    return newReporter;
  }

  public getReporterById(reporterId: string): Reporter | undefined {
    const normalized = reporterId.trim().toUpperCase();
    return this.getReporters().find(r => r.reporterId.toUpperCase() === normalized);
  }

  public updateReporter(id: string, updates: Partial<Reporter>): Reporter | null {
    const reporters = this.getReporters();
    const index = reporters.findIndex(r => r.id === id || r.reporterId === id);
    if (index === -1) return null;

    reporters[index] = { ...reporters[index], ...updates };
    this.setItem(STORAGE_KEYS.REPORTERS, reporters);

    // Sync ID card
    const idCards = this.getIdCards();
    const cardIndex = idCards.findIndex(c => c.reporterId === reporters[index].reporterId);
    if (cardIndex !== -1) {
      if (updates.status) idCards[cardIndex].status = updates.status;
      if (updates.designation) idCards[cardIndex].designation = updates.designation;
      if (updates.validUntil) idCards[cardIndex].validUntil = updates.validUntil;
      if (updates.name) idCards[cardIndex].reporterName = updates.name;
      this.setItem(STORAGE_KEYS.ID_CARDS, idCards);
    }

    return reporters[index];
  }

  public toggleReporterStatus(reporterId: string, status: ReporterStatus): void {
    this.updateReporter(reporterId, { status });
  }

  public deleteReporter(id: string): void {
    const reporters = this.getReporters();
    const rep = reporters.find(r => r.id === id || r.reporterId === id);
    if (!rep) return;
    const filtered = reporters.filter(r => r.id !== rep.id && r.reporterId !== rep.reporterId);
    this.setItem(STORAGE_KEYS.REPORTERS, filtered);

    // Also remove matching ID card
    const idCards = this.getIdCards().filter(c => c.reporterId !== rep.reporterId);
    this.setItem(STORAGE_KEYS.ID_CARDS, idCards);
  }

  // --- ID CARDS ---
  public getIdCards(): IdCardRecord[] {
    return this.getItem<IdCardRecord[]>(STORAGE_KEYS.ID_CARDS, INITIAL_ID_CARDS);
  }

  public getIdCardByReporterId(reporterId: string): IdCardRecord | undefined {
    const normalized = reporterId.trim().toUpperCase();
    return this.getIdCards().find(c => c.reporterId.toUpperCase() === normalized);
  }

  public deleteIdCard(id: string): void {
    const idCards = this.getIdCards().filter(c => c.id !== id && c.reporterId !== id);
    this.setItem(STORAGE_KEYS.ID_CARDS, idCards);
  }

  // --- CONTACTS ---
  public getContacts(): ContactMessage[] {
    return this.getItem<ContactMessage[]>(STORAGE_KEYS.CONTACTS, INITIAL_CONTACTS);
  }

  public submitContact(data: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage {
    const contacts = this.getContacts();
    const newContact: ContactMessage = {
      ...data,
      id: `con-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false
    };
    contacts.unshift(newContact);
    this.setItem(STORAGE_KEYS.CONTACTS, contacts);
    return newContact;
  }

  public markContactRead(id: string): void {
    const contacts = this.getContacts();
    const item = contacts.find(c => c.id === id);
    if (item) {
      item.read = true;
      this.setItem(STORAGE_KEYS.CONTACTS, contacts);
    }
  }

  // --- AD ENQUIRIES ---
  public getAdEnquiries(): AdvertisementEnquiry[] {
    return this.getItem<AdvertisementEnquiry[]>(STORAGE_KEYS.AD_ENQUIRIES, INITIAL_AD_ENQUIRIES);
  }

  public submitAdEnquiry(data: Omit<AdvertisementEnquiry, 'id' | 'createdAt' | 'status'>): AdvertisementEnquiry {
    const enquiries = this.getAdEnquiries();
    const newEnquiry: AdvertisementEnquiry = {
      ...data,
      id: `ad-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    enquiries.unshift(newEnquiry);
    this.setItem(STORAGE_KEYS.AD_ENQUIRIES, enquiries);
    return newEnquiry;
  }

  public updateAdStatus(id: string, status: 'new' | 'contacted' | 'closed'): void {
    const enquiries = this.getAdEnquiries();
    const item = enquiries.find(e => e.id === id);
    if (item) {
      item.status = status;
      this.setItem(STORAGE_KEYS.AD_ENQUIRIES, enquiries);
    }
  }

  // --- SETTINGS ---
  public getSettings(): SiteSettings {
    return this.getItem<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }

  public updateSettings(settings: Partial<SiteSettings>): SiteSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    this.setItem(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  }

  // --- MEDIA ---
  public getMedia(): MediaItem[] {
    return this.getItem<MediaItem[]>(STORAGE_KEYS.MEDIA, INITIAL_MEDIA);
  }

  public addMedia(item: Omit<MediaItem, 'id' | 'uploadedAt'>): MediaItem {
    const media = this.getMedia();
    const newItem: MediaItem = {
      ...item,
      id: `med-${Date.now()}`,
      uploadedAt: new Date().toISOString()
    };
    media.unshift(newItem);
    this.setItem(STORAGE_KEYS.MEDIA, media);
    return newItem;
  }

  public deleteMedia(id: string): void {
    const media = this.getMedia().filter(m => m.id !== id);
    this.setItem(STORAGE_KEYS.MEDIA, media);
  }

  // --- STATS ---
  public getDashboardStats() {
    const posts = this.getPosts();
    const articles = this.getArticles();
    const videos = this.getVideos();
    const apps = this.getApplications();
    const reporters = this.getReporters();
    const idCards = this.getIdCards();
    const contacts = this.getContacts();
    const ads = this.getAdEnquiries();

    return {
      totalPosts: posts.length,
      publishedPosts: posts.filter(p => p.status === 'published').length,
      draftPosts: posts.filter(p => p.status === 'draft').length,
      totalArticles: articles.length,
      totalVideos: videos.length,
      pendingApplications: apps.filter(a => a.status === 'pending').length,
      underReviewApplications: apps.filter(a => a.status === 'under_review').length,
      approvedReporters: reporters.filter(r => r.status === 'active').length,
      totalReporters: reporters.length,
      rejectedApplications: apps.filter(a => a.status === 'rejected').length,
      activeIdCards: idCards.filter(c => c.status === 'active').length,
      unreadContacts: contacts.filter(c => !c.read).length,
      newAdEnquiries: ads.filter(a => a.status === 'new').length,
      totalViews: posts.reduce((acc, p) => acc + (p.views || 0), 0) + videos.reduce((acc, v) => acc + (v.views || 0), 0)
    };
  }

  // --- RESET TO DEMO ---
  public resetToDemo(): void {
    localStorage.removeItem(STORAGE_KEYS.POSTS);
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.VIDEOS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.REPORTERS);
    localStorage.removeItem(STORAGE_KEYS.ID_CARDS);
    localStorage.removeItem(STORAGE_KEYS.CONTACTS);
    localStorage.removeItem(STORAGE_KEYS.AD_ENQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.MEDIA);
    this.init();
    this.notify();
  }

  public resetToSeedData(): void {
    this.resetToDemo();
  }
}

export const db = new DatabaseService();
