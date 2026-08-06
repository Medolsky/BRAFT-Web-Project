import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Template,
  Service,
  PortfolioItem,
  Testimonial,
  TemplateCategory,
} from '../types';
import {
  MOCK_TEMPLATES,
  MOCK_SERVICES,
  MOCK_PORTFOLIO,
  MOCK_TESTIMONIALS,
  MOCK_CATEGORIES,
  FOUNDER_DATA,
} from '../data/mockData';

/* ─────────────────────────────────────────────
   Extra Types
   ───────────────────────────────────────────── */
export interface FounderData {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  skills: string[];
  philosophy: string;
  experienceYears: number;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
    email: string;
  };
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  whatsappNumber: string;
  email: string;
  marketplaceCommission: number;
  siteUrl: string;
}

/* ─────────────────────────────────────────────
   Store Interface
   ───────────────────────────────────────────── */
interface DataState {
  // ── Data ──
  templates: Template[];
  categories: TemplateCategory[];
  services: Service[];
  portfolio: PortfolioItem[];
  testimonials: Testimonial[];
  founderData: FounderData;
  siteSettings: SiteSettings;

  // ── Templates CRUD ──
  addTemplate: (t: Template) => void;
  updateTemplate: (id: string, data: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;

  // ── Services CRUD ──
  addService: (s: Service) => void;
  updateService: (id: string, data: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // ── Portfolio CRUD ──
  addPortfolio: (p: PortfolioItem) => void;
  updatePortfolio: (id: string, data: Partial<PortfolioItem>) => void;
  deletePortfolio: (id: string) => void;

  // ── Testimonials CRUD ──
  addTestimonial: (t: Testimonial) => void;
  updateTestimonial: (id: string, data: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // ── Founder & Settings ──
  updateFounder: (data: Partial<FounderData>) => void;
  updateSiteSettings: (data: Partial<SiteSettings>) => void;

  // ── Reset ──
  resetToDefaults: () => void;
}

/* ─────────────────────────────────────────────
   Default Values
   ───────────────────────────────────────────── */
const defaultFounder: FounderData = {
  name: FOUNDER_DATA.name,
  role: FOUNDER_DATA.role,
  bio: FOUNDER_DATA.bio,
  avatarUrl: FOUNDER_DATA.avatarUrl,
  skills: FOUNDER_DATA.skills,
  philosophy: FOUNDER_DATA.philosophy,
  experienceYears: FOUNDER_DATA.experienceYears,
  socialLinks: { ...FOUNDER_DATA.socialLinks },
};

const defaultSiteSettings: SiteSettings = {
  brandName: 'BRaft.Dev — Digital Agency & Template Marketplace',
  tagline: 'Solusi Pembuatan Website Custom & Marketplace Template Siap Pakai',
  whatsappNumber: '+62 812-3456-7890',
  email: 'admin@braft.dev',
  marketplaceCommission: 15,
  siteUrl: 'https://braft.dev',
};

/* ─────────────────────────────────────────────
   Zustand Store
   ───────────────────────────────────────────── */
export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      // ── Initial Data ──
      templates: [...MOCK_TEMPLATES],
      categories: [...MOCK_CATEGORIES],
      services: [...MOCK_SERVICES],
      portfolio: [...MOCK_PORTFOLIO],
      testimonials: [...MOCK_TESTIMONIALS],
      founderData: { ...defaultFounder },
      siteSettings: { ...defaultSiteSettings },

      // ── Templates CRUD ──
      addTemplate: (t) =>
        set((s) => ({ templates: [...s.templates, t] })),
      updateTemplate: (id, data) =>
        set((s) => ({
          templates: s.templates.map((t) =>
            t.id === id ? { ...t, ...data } : t
          ),
        })),
      deleteTemplate: (id) =>
        set((s) => ({
          templates: s.templates.filter((t) => t.id !== id),
        })),

      // ── Services CRUD ──
      addService: (svc) =>
        set((s) => ({ services: [...s.services, svc] })),
      updateService: (id, data) =>
        set((s) => ({
          services: s.services.map((svc) =>
            svc.id === id ? { ...svc, ...data } : svc
          ),
        })),
      deleteService: (id) =>
        set((s) => ({
          services: s.services.filter((svc) => svc.id !== id),
        })),

      // ── Portfolio CRUD ──
      addPortfolio: (p) =>
        set((s) => ({ portfolio: [...s.portfolio, p] })),
      updatePortfolio: (id, data) =>
        set((s) => ({
          portfolio: s.portfolio.map((p) =>
            p.id === id ? { ...p, ...data } : p
          ),
        })),
      deletePortfolio: (id) =>
        set((s) => ({
          portfolio: s.portfolio.filter((p) => p.id !== id),
        })),

      // ── Testimonials CRUD ──
      addTestimonial: (t) =>
        set((s) => ({ testimonials: [...s.testimonials, t] })),
      updateTestimonial: (id, data) =>
        set((s) => ({
          testimonials: s.testimonials.map((t) =>
            t.id === id ? { ...t, ...data } : t
          ),
        })),
      deleteTestimonial: (id) =>
        set((s) => ({
          testimonials: s.testimonials.filter((t) => t.id !== id),
        })),

      // ── Founder & Settings ──
      updateFounder: (data) =>
        set((s) => ({
          founderData: { ...s.founderData, ...data },
        })),
      updateSiteSettings: (data) =>
        set((s) => ({
          siteSettings: { ...s.siteSettings, ...data },
        })),

      // ── Reset ──
      resetToDefaults: () =>
        set({
          templates: [...MOCK_TEMPLATES],
          categories: [...MOCK_CATEGORIES],
          services: [...MOCK_SERVICES],
          portfolio: [...MOCK_PORTFOLIO],
          testimonials: [...MOCK_TESTIMONIALS],
          founderData: { ...defaultFounder },
          siteSettings: { ...defaultSiteSettings },
        }),
    }),
    {
      name: 'braft-data-store',
    }
  )
);
