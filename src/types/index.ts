export type PostStatus = 'draft' | 'published' | 'archived';

export interface Post {
  id: string;
  title: string;
  titleHindi?: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  content: string;
  featuredImage: string;
  additionalImages?: string[];
  reporterId?: string;
  reporterName: string;
  reporterRole?: string;
  tags: string[];
  status: PostStatus;
  featured: boolean;
  breaking: boolean;
  views: number;
  readTimeMinutes: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface VideoNews {
  id: string;
  title: string;
  titleHindi?: string;
  slug: string;
  description: string;
  videoUrl: string;
  embedUrl?: string;
  thumbnail: string;
  category: string;
  categorySlug: string;
  reporterName: string;
  duration: string;
  tags: string[];
  views: number;
  featured?: boolean;
  publishedAt: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameHindi: string;
  slug: string;
  description: string;
  order: number;
  color?: string;
}

export type ApplicationStatus = 'pending' | 'under_review' | 'approved' | 'rejected';

export interface ReporterApplication {
  id: string;
  applicationNumber: string; // e.g. PN-REP-2026-00042
  fullName: string;
  fatherName: string;
  dob: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  education: string;
  experience: string;
  previousOrganization?: string;
  reason: string;
  profilePhoto: string;
  status: ApplicationStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  generatedReporterId?: string;
}

export type ReporterStatus = 'active' | 'inactive' | 'suspended';

export interface Reporter {
  id: string;
  reporterId: string; // e.g. PN-RPT-00108
  applicationNumber: string;
  name: string;
  photo: string;
  designation: string; // e.g. "SENIOR REPORTER" / "SPECIAL CORRESPONDENT" / "REPORTER"
  district: string;
  state: string;
  mobile: string;
  email: string;
  status: ReporterStatus;
  issueDate: string;
  validUntil: string;
  createdAt: string;
}

export interface IdCardRecord {
  id: string;
  reporterId: string;
  reporterName: string;
  photo: string;
  designation: string;
  district: string;
  state: string;
  issueDate: string;
  validUntil: string;
  status: ReporterStatus;
  verificationUrl: string;
  qrCodeDataUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface AdvertisementEnquiry {
  id: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  adType: string;
  budget: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'closed';
}

export interface SiteSettings {
  siteName: string;
  siteNameHindi?: string;
  tagline: string;
  taglineHindi?: string;
  logoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber?: string;
  address: string;
  headBureau?: string;
  prayagrajBureau?: string;
  breakingNewsEnabled?: boolean;
  breakingNewsText?: string;
  socialLinks?: {
    facebook: string;
    twitter: string;
    youtube: string;
    instagram: string;
    telegram: string;
  };
  editorName?: string;
  editorDesignation?: string;
  channelHead?: string;
  channelHeadDesignation?: string;
  breakingNewsTickerEnabled?: boolean;
}

export type WebsiteSettings = SiteSettings;

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'super_admin' | 'admin' | 'editor';
}
