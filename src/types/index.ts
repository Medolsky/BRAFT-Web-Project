export type UserRole = 'user' | 'seller' | 'admin' | 'super_admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  phone?: string;
  bio?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SellerProfile {
  id: string;
  userId: string;
  brandName: string;
  slug: string;
  avatarUrl?: string;
  logoUrl?: string;
  bio?: string;
  contactNumber?: string;
  payoutInfo?: Record<string, any>;
  status: 'draft' | 'pending_verification' | 'verified' | 'suspended' | 'rejected';
  totalSales: number;
  totalRevenue: number;
  rating: number;
  createdAt: string;
}

export type LicenseType = 'personal' | 'commercial' | 'extended';

export interface TemplateCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface Template {
  id: string;
  sellerId: string;
  seller?: SellerProfile;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  category?: TemplateCategory;
  tags: string[];
  technology: string[];
  version: string;
  price: number;
  discountPrice?: number;
  licenseOptions: {
    personal: number;
    commercial: number;
    extended: number;
  };
  thumbnailUrl: string;
  previewImages: string[];
  demoUrl: string;
  documentationUrl?: string;
  status: 'draft' | 'submitted' | 'under_review' | 'revision_required' | 'approved' | 'published' | 'rejected';
  salesCount: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ServicePackage {
  id: string;
  serviceId: string;
  name: string;
  slug: string;
  price: number;
  estimatedDays: number;
  features: string[];
  revisions: number;
  supportDuration: string;
  isPopular?: boolean;
}

export interface ServiceAddon {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  startingPrice: number;
  estimatedDays: number;
  icon: string;
  packages: ServicePackage[];
  addons: ServiceAddon[];
  faqs: { question: string; answer: string }[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  clientName?: string;
  category: string;
  industry: string;
  technology: string[];
  thumbnailUrl: string;
  gallery: string[];
  liveUrl?: string;
  challenge: string;
  solution: string;
  result: string;
  duration: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatarUrl?: string;
  };
  isFeatured?: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
  content: string;
  serviceUsed: string;
}

export interface CartItem {
  id: string;
  templateId: string;
  template: Template;
  licenseType: LicenseType;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  totalAmount: number;
  discountAmount: number;
  taxAmount: number;
  finalAmount: number;
  status: 'pending' | 'processing' | 'paid' | 'failed' | 'expired' | 'refunded' | 'cancelled';
  items: {
    id: string;
    templateId: string;
    templateName: string;
    licenseType: LicenseType;
    price: number;
    licenseKey?: string;
  }[];
  paymentMethod?: string;
  createdAt: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
}

export interface Project {
  id: string;
  projectNumber: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  packageName: string;
  title: string;
  status:
    | 'waiting_for_payment'
    | 'payment_confirmed'
    | 'brief_review'
    | 'planning'
    | 'design'
    | 'development'
    | 'client_review'
    | 'revision'
    | 'final_approval'
    | 'deployment'
    | 'completed'
    | 'cancelled';
  progress: number;
  projectManager?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  milestones: ProjectMilestone[];
  startDate: string;
  estimatedEndDate: string;
  createdAt: string;
}
