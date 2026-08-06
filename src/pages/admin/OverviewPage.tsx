import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Users,
  Store,
  FolderGit2,
  FileCheck,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Plus,
  Shield,
  Download,
  Sparkles,
  Settings,
  Save,
  MessageSquare,
  Ticket,
  Star,
  Tag,
  FileText,
  BarChart,
  ShieldCheck,
  Send,
  Clock,
  Trash2,
  AlertTriangle,
  Edit,
  RotateCcw,
  X,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { useDataStore } from '@/stores/dataStore';
import { Template, Service, PortfolioItem, Testimonial } from '@/types';

/* ─────────────────────────────────────────────
   HELPER: Format IDR Rupiah
   ───────────────────────────────────────────── */
const formatRupiah = (num: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

/* ─────────────────────────────────────────────
   HELPER: Status Badge
   ───────────────────────────────────────────── */
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colorMap: Record<string, string> = {
    'Completed': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'In Progress': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Pending Payment': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'published': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'Published': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'under_review': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Under Review': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Active': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'Verified': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'verified': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'Paid': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'Paid (DP 50%)': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Open': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Resolved': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'Expired': 'bg-red-500/20 text-red-300 border-red-500/30',
    'Draft': 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
  };
  const color = colorMap[status] || 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30';
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${color}`}>
      {status}
    </span>
  );
};

/* ─────────────────────────────────────────────
   HELPER: Section Header
   ───────────────────────────────────────────── */
const SectionHeader: React.FC<{ title: string; subtitle: string; icon: React.ReactNode; action?: React.ReactNode }> = ({ title, subtitle, icon, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
    <div>
      <h3 className="text-lg font-bold text-white flex items-center gap-2">{icon} {title}</h3>
      <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>
    </div>
    {action}
  </div>
);

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export const AdminOverviewPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Connected Zustand Store
  const {
    templates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    services,
    addService,
    updateService,
    deleteService,
    portfolio,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    founderData,
    updateFounder,
    siteSettings,
    updateSiteSettings,
    resetToDefaults,
  } = useDataStore();

  // Map every sidebar URL path to a unique tab key
  const getTabFromPath = (path: string): string => {
    const segments = path.replace('/admin', '').replace(/^\//, '');
    if (!segments) return 'overview';
    const map: Record<string, string> = {
      'users': 'users',
      'sellers': 'sellers',
      'templates': 'templates',
      'projects': 'projects',
      'orders': 'orders',
      'payments': 'payments',
      'chat': 'chat',
      'tickets': 'tickets',
      'reviews': 'reviews',
      'coupons': 'coupons',
      'content': 'content',
      'reports': 'reports',
      'audit': 'audit',
      'settings': 'settings',
    };
    return map[segments] || 'overview';
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath(location.pathname));

  useEffect(() => {
    setActiveTab(getTabFromPath(location.pathname));
  }, [location.pathname]);

  /* ── Modal State for CRUD ── */
  const [modalType, setModalType] = useState<string | null>(null); // 'addTemplate' | 'editTemplate' | 'addService' | 'editService' | 'addPortfolio' | 'editPortfolio' | 'addTestimonial' | 'editTestimonial'
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form Field States
  const [formFields, setFormFields] = useState<Record<string, any>>({});

  const openModal = (type: string, item: any = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      setFormFields({ ...item });
    } else {
      setFormFields({});
    }
  };

  const closeModal = () => {
    setModalType(null);
    setEditingItem(null);
    setFormFields({});
  };

  /* ── Mock Data for static tables ── */
  const [sellers] = useState([
    { id: 'sel1', name: 'CraftStudio', email: 'seller@craftstudio.id', templates: 2, totalSales: 342, revenue: 85000000, status: 'verified' },
    { id: 'sel2', name: 'PixelMaster', email: 'hello@pixelmaster.id', templates: 1, totalSales: 189, revenue: 42000000, status: 'verified' },
    { id: 'sel3', name: 'NovaDesign', email: 'info@novadesign.co', templates: 1, totalSales: 76, revenue: 15000000, status: 'verified' },
  ]);

  const [users] = useState([
    { id: 'USR-001', name: 'Super Admin BRaft.Dev', email: 'admin@braft.dev', role: 'super_admin', status: 'Active', joined: '2026-01-01' },
    { id: 'USR-002', name: 'Rian Hidayat', email: 'rian@nusantara.id', role: 'user', status: 'Active', joined: '2026-06-12' },
    { id: 'USR-003', name: 'Budi Santoso', email: 'budi@tokoberkah.com', role: 'user', status: 'Active', joined: '2026-07-20' },
    { id: 'USR-004', name: 'Dewi Kartika', email: 'dewi@kreasi.co', role: 'user', status: 'Active', joined: '2026-07-28' },
    { id: 'USR-005', name: 'Ahmad Fauzi', email: 'ahmad@fauzi.me', role: 'user', status: 'Active', joined: '2026-08-01' },
  ]);

  const [orders] = useState([
    { id: 'ORD-901', item: 'Nexus SaaS & Agency Dashboard Template', buyer: 'Rian Hidayat', amount: 199000, date: '2026-08-06', type: 'Template', status: 'Paid' },
    { id: 'ORD-902', item: 'Velox E-commerce & Store UI Kit', buyer: 'Budi Santoso', amount: 279000, date: '2026-08-05', type: 'Template', status: 'Paid' },
    { id: 'ORD-903', item: 'Website Company Profile', buyer: 'PT Nusantara Digital', amount: 2500000, date: '2026-08-04', type: 'Proyek Custom', status: 'Paid (DP 50%)' },
    { id: 'ORD-904', item: 'FolioX Creator Portfolio', buyer: 'Dewi Kartika', amount: 189000, date: '2026-08-03', type: 'Template', status: 'Paid' },
  ]);

  const [transactions] = useState([
    { id: 'TXN-001', ref: 'ORD-901', method: 'BCA Virtual Account', amount: 199000, date: '2026-08-06 14:32', status: 'Paid' },
    { id: 'TXN-002', ref: 'ORD-902', method: 'GoPay', amount: 279000, date: '2026-08-05 09:15', status: 'Paid' },
    { id: 'TXN-003', ref: 'ORD-903', method: 'Transfer Bank Mandiri', amount: 1250000, date: '2026-08-04 11:22', status: 'Paid (DP 50%)' },
  ]);

  const [chatMessages, setChatMessages] = useState([
    { id: 'MSG-01', from: 'Rian Hidayat', message: 'Halo, saya mau tanya soal template Nexus Pro. Apakah bisa custom warna?', time: '14:32', read: false },
    { id: 'MSG-02', from: 'PT Nusantara Digital', message: 'Progress website kami sudah sampai mana ya?', time: '12:10', read: true },
    { id: 'MSG-03', from: 'Dewi Kartika', message: 'Saya tertarik jasa custom landing page, budget sekitar 3jt bisa?', time: '10:45', read: false },
  ]);
  const [chatReply, setChatReply] = useState('');

  const [tickets, setTickets] = useState([
    { id: 'TKT-101', subject: 'Template tidak bisa di-download setelah pembayaran', from: 'Budi Santoso', priority: 'High', status: 'Open', date: '2026-08-06' },
    { id: 'TKT-102', subject: 'Request revisi logo pada proyek Company Profile', from: 'PT Nusantara Digital', priority: 'Medium', status: 'Open', date: '2026-08-05' },
    { id: 'TKT-103', subject: 'Pertanyaan tentang lisensi template marketplace', from: 'Ahmad Fauzi', priority: 'Low', status: 'Resolved', date: '2026-08-03' },
  ]);

  const [coupons] = useState([
    { id: 'CPN-01', code: 'BRAFT15', discount: '15%', minOrder: 200000, maxUse: 100, used: 34, expiry: '2026-09-30', status: 'Active' },
    { id: 'CPN-02', code: 'MERDEKA50K', discount: 'Rp 50.000', minOrder: 300000, maxUse: 50, used: 12, expiry: '2026-08-17', status: 'Active' },
  ]);

  const [auditLogs] = useState([
    { id: 'LOG-001', action: 'Data template & layanan diperbarui via Admin Panel', actor: 'Super Admin', ip: '103.152.xx.xx', time: '2026-08-06 14:30:12' },
    { id: 'LOG-002', action: 'Kupon BRAFT15 berhasil dibuat', actor: 'Super Admin', ip: '103.152.xx.xx', time: '2026-08-04 16:55:03' },
  ]);

  /* ── Action Handlers ── */
  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    const nowStr = new Date().toISOString();
    if (editingItem) {
      updateTemplate(editingItem.id, {
        name: formFields.name || editingItem.name,
        price: Number(formFields.price) || editingItem.price,
        discountPrice: formFields.discountPrice ? Number(formFields.discountPrice) : undefined,
        shortDescription: formFields.shortDescription || editingItem.shortDescription,
        status: formFields.status || editingItem.status,
      });
      toast.success(`Template "${formFields.name || editingItem.name}" berhasil diperbarui!`);
    } else {
      const newTpl: Template = {
        id: `t_${Date.now()}`,
        sellerId: 'sel1',
        name: formFields.name || 'Template Baru',
        slug: (formFields.name || 'template-baru').toLowerCase().replace(/\s+/g, '-'),
        shortDescription: formFields.shortDescription || 'Deskripsi singkat template baru.',
        description: formFields.shortDescription || 'Deskripsi lengkap template baru.',
        categoryId: '1',
        tags: ['React', 'Tailwind', 'New'],
        technology: ['React', 'Tailwind CSS'],
        version: '1.0.0',
        price: Number(formFields.price) || 199000,
        discountPrice: formFields.discountPrice ? Number(formFields.discountPrice) : undefined,
        licenseOptions: { personal: Number(formFields.price) || 199000, commercial: 499000, extended: 999000 },
        thumbnailUrl: formFields.thumbnailUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
        previewImages: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop'],
        demoUrl: formFields.demoUrl || 'https://braft.dev',
        status: 'published',
        salesCount: 0,
        rating: 5.0,
        reviewCount: 0,
        createdAt: nowStr,
        updatedAt: nowStr,
      };
      addTemplate(newTpl);
      toast.success(`Template "${newTpl.name}" berhasil ditambahkan ke marketplace!`);
    }
    closeModal();
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateService(editingItem.id, {
        name: formFields.name || editingItem.name,
        startingPrice: Number(formFields.startingPrice) || editingItem.startingPrice,
        estimatedDays: Number(formFields.estimatedDays) || editingItem.estimatedDays,
        shortDescription: formFields.shortDescription || editingItem.shortDescription,
      });
      toast.success(`Layanan "${formFields.name || editingItem.name}" berhasil diperbarui!`);
    } else {
      const newSvc: Service = {
        id: `s_${Date.now()}`,
        name: formFields.name || 'Layanan Baru',
        slug: (formFields.name || 'layanan-baru').toLowerCase().replace(/\s+/g, '-'),
        shortDescription: formFields.shortDescription || 'Deskripsi singkat layanan.',
        description: formFields.shortDescription || 'Deskripsi lengkap layanan.',
        startingPrice: Number(formFields.startingPrice) || 2500000,
        estimatedDays: Number(formFields.estimatedDays) || 5,
        icon: 'Sparkles',
        packages: [],
        addons: [],
        faqs: [],
      };
      addService(newSvc);
      toast.success(`Layanan "${newSvc.name}" berhasil ditambahkan!`);
    }
    closeModal();
  };

  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    const nowStr = new Date().toISOString();
    if (editingItem) {
      updatePortfolio(editingItem.id, {
        title: formFields.title || editingItem.title,
        clientName: formFields.clientName || editingItem.clientName,
        category: formFields.category || editingItem.category,
        industry: formFields.industry || editingItem.industry,
      });
      toast.success(`Portofolio "${formFields.title || editingItem.title}" berhasil diperbarui!`);
    } else {
      const newPort: PortfolioItem = {
        id: `p_${Date.now()}`,
        title: formFields.title || 'Proyek Portofolio Baru',
        slug: (formFields.title || 'proyek-baru').toLowerCase().replace(/\s+/g, '-'),
        clientName: formFields.clientName || 'Klien Inc',
        category: formFields.category || 'Web Application',
        industry: formFields.industry || 'Technology',
        technology: ['React', 'TypeScript', 'Tailwind CSS'],
        thumbnailUrl: formFields.thumbnailUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
        gallery: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop'],
        challenge: 'Tantangan pengerjaan proyek.',
        solution: 'Solusi teknis yang diberikan.',
        result: 'Hasil akhir yang dicapai.',
        duration: '4 Minggu',
        isFeatured: true,
        createdAt: nowStr,
      };
      addPortfolio(newPort);
      toast.success(`Portofolio "${newPort.title}" berhasil ditambahkan!`);
    }
    closeModal();
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateTestimonial(editingItem.id, {
        name: formFields.name || editingItem.name,
        role: formFields.role || editingItem.role,
        company: formFields.company || editingItem.company,
        content: formFields.content || editingItem.content,
        rating: Number(formFields.rating) || editingItem.rating,
      });
      toast.success(`Testimoni dari "${formFields.name || editingItem.name}" berhasil diperbarui!`);
    } else {
      const newTm: Testimonial = {
        id: `tm_${Date.now()}`,
        name: formFields.name || 'Nama Klien',
        role: formFields.role || 'CEO',
        company: formFields.company || 'Perusahaan',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        rating: Number(formFields.rating) || 5,
        content: formFields.content || 'Layanan sangat memuaskan!',
        serviceUsed: 'Jasa Pembuatan Website',
      };
      addTestimonial(newTm);
      toast.success(`Testimoni dari "${newTm.name}" berhasil ditambahkan!`);
    }
    closeModal();
  };

  const handleTogglePublish = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'published' ? 'under_review' : 'published';
    updateTemplate(id, { status: nextStatus });
    toast.success(`Status template diperbarui ke "${nextStatus}"!`);
  };

  /* ═══════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════ */
  return (
    <div className="space-y-8">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple">Super Admin Control Panel</Badge>
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Data Store Live (Persisted)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            {siteSettings.brandName}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Kontrol penuh CRUD untuk seluruh aset website: Template, Layanan, Portofolio, Testimoni, & Pengaturan.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              resetToDefaults();
              toast.success('Semua data website di-reset ke default!');
            }}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Reset Data Default
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast.success('Laporan di-export!')} leftIcon={<Download className="w-4 h-4" />}>
            Export CSV
          </Button>
        </div>
      </div>

      {/* ── KPI CARDS (Live Data from Store) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Pendapatan', value: 'Rp 142.000.000', sub: '+18.4% dari bulan lalu', icon: <DollarSign className="w-5 h-5" />, color: 'purple' },
          { label: 'Paket Layanan Agency', value: `${services.length} Paket`, sub: 'Aktif di halaman /services', icon: <FolderGit2 className="w-5 h-5" />, color: 'cyan' },
          { label: 'Marketplace Templates', value: `${templates.length} Template`, sub: `${templates.filter(t => t.status === 'published').length} Terbit di /templates`, icon: <ShoppingBag className="w-5 h-5" />, color: 'emerald' },
          { label: 'Portofolio & Testimoni', value: `${portfolio.length} Karya / ${testimonials.length} Ulasan`, sub: 'Tampil di /portfolio & landing page', icon: <Users className="w-5 h-5" />, color: 'amber' },
        ].map((kpi, idx) => (
          <Card key={idx} className={`p-5 space-y-3 border-${kpi.color}-500/30`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{kpi.label}</span>
              <div className={`w-9 h-9 rounded-xl bg-${kpi.color}-500/10 border border-${kpi.color}-500/20 flex items-center justify-center text-${kpi.color}-400`}>{kpi.icon}</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white font-display">{kpi.value}</div>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" /> {kpi.sub}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* ═══════════════════════════════════════
         TAB CONTENT — CRUD Enabled
         ═══════════════════════════════════════ */}

      {/* ───── 1. OVERVIEW ───── */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Card className="lg:col-span-8 p-6 space-y-4">
            <SectionHeader
              title="Katalog Template Marketplace (Data Live)"
              subtitle={`${templates.length} template terdaftar di store`}
              icon={<ShoppingBag className="w-4 h-4 text-purple-400" />}
              action={<Button size="sm" variant="ghost" onClick={() => navigate('/admin/templates')}>Kelola Lengkap</Button>}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead><tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Nama Template</th><th className="pb-3">Harga</th><th className="pb-3">Penjualan</th><th className="pb-3">Status</th>
                </tr></thead>
                <tbody className="divide-y divide-white/5">
                  {templates.map(t => (
                    <tr key={t.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 font-bold text-white">{t.name}</td>
                      <td className="py-3.5 font-extrabold text-purple-400">{formatRupiah(t.discountPrice || t.price)}</td>
                      <td className="py-3.5 text-zinc-300">{t.salesCount} Unit</td>
                      <td className="py-3.5"><StatusBadge status={t.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 space-y-4">
              <h3 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-400" /> Status Sistem</h3>
              <div className="space-y-3 text-xs">
                {['Database Supabase', 'Zustand Data Store (Persisted)', 'WhatsApp Gateway'].map(s => (
                  <div key={s} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-white/5">
                    <span className="text-zinc-300">{s}</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Online</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6 space-y-4">
              <h3 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-400" /> Aksi CRUD Cepat</h3>
              <div className="space-y-2">
                <Button size="sm" variant="primary" className="w-full justify-start text-xs py-2.5" onClick={() => openModal('addTemplate')} leftIcon={<Plus className="w-4 h-4" />}>
                  Tambah Template Baru
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start text-xs py-2.5" onClick={() => openModal('addService')} leftIcon={<Plus className="w-4 h-4" />}>
                  Tambah Layanan Agency
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start text-xs py-2.5" onClick={() => openModal('addPortfolio')} leftIcon={<Plus className="w-4 h-4" />}>
                  Tambah Karya Portofolio
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ───── 2. USERS ───── */}
      {activeTab === 'users' && (
        <Card className="p-6 space-y-6">
          <SectionHeader title="Manajemen Pengguna (Klien)" subtitle="Daftar semua klien / pembeli terdaftar." icon={<Users className="w-5 h-5 text-purple-400" />} />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead><tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3">ID</th><th className="pb-3">Nama</th><th className="pb-3">Email</th><th className="pb-3">Role</th><th className="pb-3">Bergabung</th><th className="pb-3">Status</th><th className="pb-3 text-right">Aksi</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-purple-400">{u.id}</td>
                    <td className="py-4 font-bold text-white">{u.name}</td>
                    <td className="py-4 text-zinc-300">{u.email}</td>
                    <td className="py-4"><Badge variant={u.role === 'super_admin' ? 'purple' : 'slate'}>{u.role}</Badge></td>
                    <td className="py-4 text-zinc-400">{u.joined}</td>
                    <td className="py-4"><StatusBadge status={u.status} /></td>
                    <td className="py-4 text-right"><Button size="sm" variant="ghost" onClick={() => toast.success(`Profil ${u.name}`)} className="text-[11px]">Kelola</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ───── 3. SELLERS ───── */}
      {activeTab === 'sellers' && (
        <Card className="p-6 space-y-6">
          <SectionHeader title="Manajemen Mitra Seller" subtitle="Daftar seller / publisher template di marketplace BRaft.Dev." icon={<Store className="w-5 h-5 text-purple-400" />} />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead><tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3">ID Seller</th><th className="pb-3">Nama Mitra</th><th className="pb-3">Email</th><th className="pb-3">Template</th><th className="pb-3">Total Penjualan</th><th className="pb-3">Revenue</th><th className="pb-3">Status</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {sellers.map(s => (
                  <tr key={s.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-purple-400">{s.id}</td>
                    <td className="py-4 font-bold text-white">{s.name}</td>
                    <td className="py-4 text-zinc-300">{s.email}</td>
                    <td className="py-4 text-zinc-300">{s.templates} Template</td>
                    <td className="py-4 text-zinc-300">{s.totalSales} Unit</td>
                    <td className="py-4 font-extrabold text-emerald-400">{formatRupiah(s.revenue)}</td>
                    <td className="py-4"><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ───── 4. TEMPLATE MODERATION & CRUD ───── */}
      {activeTab === 'templates' && (
        <Card className="p-6 space-y-6">
          <SectionHeader
            title="Katalog & Moderasi Template (CRUD Live)"
            subtitle="Tambah, edit, hapus, atau publikasikan template di marketplace."
            icon={<FileCheck className="w-5 h-5 text-purple-400" />}
            action={
              <Button size="sm" variant="primary" onClick={() => openModal('addTemplate')} leftIcon={<Plus className="w-4 h-4" />}>
                Tambah Template Baru
              </Button>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead><tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3">Nama Template</th><th className="pb-3">Harga Promo</th><th className="pb-3">Terjual</th><th className="pb-3">Status</th><th className="pb-3 text-right">Aksi CRUD</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {templates.map(t => (
                  <tr key={t.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-white">
                      <div>{t.name}</div>
                      <div className="text-[10px] text-zinc-400 font-normal line-clamp-1">{t.shortDescription}</div>
                    </td>
                    <td className="py-4 font-extrabold text-purple-400">{formatRupiah(t.discountPrice || t.price)}</td>
                    <td className="py-4 text-zinc-400">{t.salesCount} Unit</td>
                    <td className="py-4"><StatusBadge status={t.status} /></td>
                    <td className="py-4 text-right flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" className="text-[11px] px-2.5 py-1" onClick={() => handleTogglePublish(t.id, t.status)}>
                        {t.status === 'published' ? 'Tarik' : 'Terbitkan'}
                      </Button>
                      <Button size="sm" variant="ghost" className="text-[11px] px-2 py-1" onClick={() => openModal('editTemplate', t)}>
                        <Edit className="w-3.5 h-3.5 text-cyan-400" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-[11px] px-2 py-1" onClick={() => { deleteTemplate(t.id); toast.success(`Template ${t.name} dihapus!`); }}>
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ───── 5. SERVICE PROJECTS CRUD ───── */}
      {activeTab === 'projects' && (
        <Card className="p-6 space-y-6">
          <SectionHeader
            title="Layanan & Paket Agency Custom (CRUD Live)"
            subtitle="Tambah, edit, atau hapus paket layanan pembuatan website."
            icon={<FolderGit2 className="w-5 h-5 text-purple-400" />}
            action={
              <Button size="sm" variant="primary" onClick={() => openModal('addService')} leftIcon={<Plus className="w-4 h-4" />}>
                Tambah Layanan Baru
              </Button>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead><tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3">Nama Layanan</th><th className="pb-3">Mulai Dari</th><th className="pb-3">Estimasi</th><th className="pb-3">Jumlah Paket</th><th className="pb-3 text-right">Aksi CRUD</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {services.map(s => (
                  <tr key={s.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-white">
                      <div>{s.name}</div>
                      <div className="text-[10px] text-zinc-400 font-normal line-clamp-1">{s.shortDescription}</div>
                    </td>
                    <td className="py-4 font-extrabold text-emerald-400">{formatRupiah(s.startingPrice)}</td>
                    <td className="py-4 text-zinc-400">{s.estimatedDays} Hari Kerja</td>
                    <td className="py-4 text-zinc-300">{s.packages.length} Paket</td>
                    <td className="py-4 text-right flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost" className="text-[11px] px-2 py-1" onClick={() => openModal('editService', s)}>
                        <Edit className="w-3.5 h-3.5 text-cyan-400" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-[11px] px-2 py-1" onClick={() => { deleteService(s.id); toast.success(`Layanan ${s.name} dihapus!`); }}>
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ───── 6. ORDERS ───── */}
      {activeTab === 'orders' && (
        <Card className="p-6 space-y-6">
          <SectionHeader title="Pesanan Masuk (Orders)" subtitle="Semua pesanan template marketplace dan proyek custom." icon={<ShoppingBag className="w-5 h-5 text-purple-400" />} />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead><tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3">ID Order</th><th className="pb-3">Produk / Layanan</th><th className="pb-3">Pembeli</th><th className="pb-3">Tipe</th><th className="pb-3">Jumlah</th><th className="pb-3">Tanggal</th><th className="pb-3 text-right">Status</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-purple-400">{o.id}</td>
                    <td className="py-4 font-bold text-white">{o.item}</td>
                    <td className="py-4 text-zinc-300">{o.buyer}</td>
                    <td className="py-4"><Badge variant={o.type === 'Template' ? 'blue' : 'purple'} size="sm">{o.type}</Badge></td>
                    <td className="py-4 font-extrabold text-emerald-400">{formatRupiah(o.amount)}</td>
                    <td className="py-4 text-zinc-400">{o.date}</td>
                    <td className="py-4 text-right"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ───── 7. TRANSACTIONS ───── */}
      {activeTab === 'payments' && (
        <Card className="p-6 space-y-6">
          <SectionHeader title="Riwayat Transaksi & Pembayaran" subtitle="Log transaksi pembayaran masuk dari semua gateway." icon={<DollarSign className="w-5 h-5 text-emerald-400" />} />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead><tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3">ID Transaksi</th><th className="pb-3">Ref Order</th><th className="pb-3">Metode</th><th className="pb-3">Jumlah</th><th className="pb-3">Waktu</th><th className="pb-3 text-right">Status</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map(t => (
                  <tr key={t.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-purple-400">{t.id}</td>
                    <td className="py-4 text-zinc-300">{t.ref}</td>
                    <td className="py-4 text-white">{t.method}</td>
                    <td className="py-4 font-extrabold text-emerald-400">{formatRupiah(t.amount)}</td>
                    <td className="py-4 text-zinc-400">{t.date}</td>
                    <td className="py-4 text-right"><StatusBadge status={t.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ───── 8. LIVE CHAT ───── */}
      {activeTab === 'chat' && (
        <Card className="p-6 space-y-6">
          <SectionHeader title="Live Chat — Pesan Masuk" subtitle={`${chatMessages.filter(m => !m.read).length} pesan belum dibaca.`} icon={<MessageSquare className="w-5 h-5 text-cyan-400" />} />
          <div className="space-y-4">
            {chatMessages.map(m => (
              <div key={m.id} className={`p-4 rounded-xl border transition-all ${m.read ? 'bg-zinc-900/50 border-white/5' : 'bg-purple-500/5 border-purple-500/20'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{m.from}</span>
                    {!m.read && <Badge variant="purple" size="sm">Baru</Badge>}
                  </div>
                  <span className="text-[11px] text-zinc-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {m.time}</span>
                </div>
                <p className="text-xs text-zinc-300 mb-3">{m.message}</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ketik balasan..."
                    value={chatReply}
                    onChange={e => setChatReply(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                  <Button size="sm" variant="primary" onClick={() => { setChatMessages(prev => prev.map(msg => msg.id === m.id ? { ...msg, read: true } : msg)); toast.success(`Balasan dikirim ke ${m.from}`); setChatReply(''); }} leftIcon={<Send className="w-3.5 h-3.5" />} className="text-[11px]">Kirim</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ───── 9. SUPPORT TICKETS ───── */}
      {activeTab === 'tickets' && (
        <Card className="p-6 space-y-6">
          <SectionHeader title="Support Tickets" subtitle={`${tickets.filter(t => t.status === 'Open').length} tiket terbuka.`} icon={<Ticket className="w-5 h-5 text-amber-400" />} />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead><tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3">ID Tiket</th><th className="pb-3">Subjek</th><th className="pb-3">Dari</th><th className="pb-3">Prioritas</th><th className="pb-3">Tanggal</th><th className="pb-3">Status</th><th className="pb-3 text-right">Aksi</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {tickets.map(t => (
                  <tr key={t.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-purple-400">{t.id}</td>
                    <td className="py-4 font-medium text-white max-w-xs">{t.subject}</td>
                    <td className="py-4 text-zinc-300">{t.from}</td>
                    <td className="py-4"><Badge variant={t.priority === 'High' ? 'red' : 'orange'} size="sm">{t.priority}</Badge></td>
                    <td className="py-4 text-zinc-400">{t.date}</td>
                    <td className="py-4"><StatusBadge status={t.status} /></td>
                    <td className="py-4 text-right">
                      {t.status === 'Open' ? (
                        <Button size="sm" variant="primary" className="text-[11px] px-3 py-1" onClick={() => { setTickets(prev => prev.map(tick => tick.id === t.id ? { ...tick, status: 'Resolved' } : tick)); toast.success(`Tiket ${t.id} resolved!`); }}>Resolve</Button>
                      ) : (
                        <span className="text-[11px] text-zinc-500">Selesai</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ───── 10. REVIEWS & TESTIMONIALS CRUD ───── */}
      {activeTab === 'reviews' && (
        <Card className="p-6 space-y-6">
          <SectionHeader
            title="Ulasan & Testimoni Klien (CRUD Live)"
            subtitle="Kelola testimoni yang tampil di halaman utama."
            icon={<Star className="w-5 h-5 text-amber-400" />}
            action={
              <Button size="sm" variant="primary" onClick={() => openModal('addTestimonial')} leftIcon={<Plus className="w-4 h-4" />}>
                Tambah Testimoni Baru
              </Button>
            }
          />
          <div className="space-y-4">
            {testimonials.map(r => (
              <div key={r.id} className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-sm">{r.name}</span>
                    <span className="text-zinc-400 text-xs ml-2">({r.role} at {r.company})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'}`} />
                      ))}
                    </div>
                    <Button size="sm" variant="ghost" className="text-[11px] px-2 py-1" onClick={() => openModal('editTestimonial', r)}>
                      <Edit className="w-3.5 h-3.5 text-cyan-400" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-[11px] px-2 py-1" onClick={() => { deleteTestimonial(r.id); toast.success('Testimoni dihapus!'); }}>
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-zinc-300">&quot;{r.content}&quot;</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ───── 11. COUPONS ───── */}
      {activeTab === 'coupons' && (
        <Card className="p-6 space-y-6">
          <SectionHeader
            title="Manajemen Kupon & Promo"
            subtitle="Buat, edit, atau hapus kupon diskon."
            icon={<Tag className="w-5 h-5 text-purple-400" />}
            action={<Button size="sm" variant="primary" onClick={() => toast.success('Form kupon baru!')} leftIcon={<Plus className="w-4 h-4" />}>Buat Kupon Baru</Button>}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead><tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3">ID</th><th className="pb-3">Kode Kupon</th><th className="pb-3">Diskon</th><th className="pb-3">Min Order</th><th className="pb-3">Pemakaian</th><th className="pb-3">Berlaku</th><th className="pb-3">Status</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {coupons.map(c => (
                  <tr key={c.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-purple-400">{c.id}</td>
                    <td className="py-4"><span className="font-mono font-bold text-white bg-zinc-800 px-2 py-1 rounded">{c.code}</span></td>
                    <td className="py-4 font-extrabold text-emerald-400">{c.discount}</td>
                    <td className="py-4 text-zinc-300">{formatRupiah(c.minOrder)}</td>
                    <td className="py-4 text-zinc-400">{c.used}/{c.maxUse}</td>
                    <td className="py-4 text-zinc-400">{c.expiry}</td>
                    <td className="py-4"><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ───── 12. CONTENT (CMS / PORTFOLIO CRUD) ───── */}
      {activeTab === 'content' && (
        <Card className="p-6 space-y-6">
          <SectionHeader
            title="Content Management System — Karya Portofolio (CRUD Live)"
            subtitle="Tambah, edit, atau hapus item portofolio yang tampil di /portfolio."
            icon={<FileText className="w-5 h-5 text-purple-400" />}
            action={
              <Button size="sm" variant="primary" onClick={() => openModal('addPortfolio')} leftIcon={<Plus className="w-4 h-4" />}>
                Tambah Portofolio Baru
              </Button>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead><tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3">Judul Karya</th><th className="pb-3">Klien</th><th className="pb-3">Kategori</th><th className="pb-3">Industri</th><th className="pb-3 text-right">Aksi CRUD</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {portfolio.map(p => (
                  <tr key={p.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-white">{p.title}</td>
                    <td className="py-4 text-zinc-300">{p.clientName || '-'}</td>
                    <td className="py-4"><Badge variant="purple" size="sm">{p.category}</Badge></td>
                    <td className="py-4 text-zinc-400">{p.industry}</td>
                    <td className="py-4 text-right flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost" className="text-[11px] px-2 py-1" onClick={() => openModal('editPortfolio', p)}>
                        <Edit className="w-3.5 h-3.5 text-cyan-400" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-[11px] px-2 py-1" onClick={() => { deletePortfolio(p.id); toast.success(`Portofolio ${p.title} dihapus!`); }}>
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ───── 13. REPORTS ───── */}
      {activeTab === 'reports' && (
        <Card className="p-6 space-y-6">
          <SectionHeader title="Laporan & Analitik Platform" subtitle="Ringkasan performa bisnis BRaft.Dev dari data live." icon={<BarChart className="w-5 h-5 text-purple-400" />} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { label: 'Pendapatan Bulan Ini', value: 'Rp 142.000.000', change: '+18.4%', up: true },
              { label: 'Marketplace Templates', value: `${templates.length} Template`, change: `${templates.filter(t => t.status === 'published').length} Terbit`, up: true },
              { label: 'Paket Layanan Agency', value: `${services.length} Paket`, change: 'Aktif di website', up: true },
              { label: 'Portofolio Client', value: `${portfolio.length} Karya`, change: 'Live Showcase', up: true },
              { label: 'Testimoni Klien', value: `${testimonials.length} Ulasan`, change: 'Rating 4.9/5', up: true },
              { label: 'Tiket Support Terbuka', value: `${tickets.filter(t => t.status === 'Open').length} Tiket`, change: 'Perlu ditangani', up: false },
            ].map((r, i) => (
              <div key={i} className="p-5 rounded-xl bg-zinc-900/50 border border-white/5 space-y-2">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">{r.label}</span>
                <div className="text-xl font-extrabold text-white font-display">{r.value}</div>
                <span className={`text-[11px] font-semibold flex items-center gap-1 ${r.up ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {r.up ? <TrendingUp className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />} {r.change}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ───── 14. AUDIT LOGS ───── */}
      {activeTab === 'audit' && (
        <Card className="p-6 space-y-6">
          <SectionHeader title="Audit Log Sistem" subtitle="Riwayat semua aksi admin & event sistem." icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />} />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead><tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3">ID Log</th><th className="pb-3">Aksi</th><th className="pb-3">Aktor</th><th className="pb-3">IP Address</th><th className="pb-3 text-right">Waktu</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {auditLogs.map(l => (
                  <tr key={l.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-purple-400">{l.id}</td>
                    <td className="py-4 text-white">{l.action}</td>
                    <td className="py-4 text-zinc-300">{l.actor}</td>
                    <td className="py-4 font-mono text-zinc-500 text-[11px]">{l.ip}</td>
                    <td className="py-4 text-zinc-400 text-right">{l.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ───── 15. SETTINGS (Live Settings & Founder Data CRUD) ───── */}
      {activeTab === 'settings' && (
        <div className="space-y-8 max-w-3xl">
          <Card className="p-6 space-y-6">
            <SectionHeader title="Pengaturan Platform Website" subtitle="Ubah nama brand, nomor WA, dan info kontak publik." icon={<Settings className="w-5 h-5 text-zinc-400" />} />
            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold">Nama Platform Agency</label>
                <input
                  type="text"
                  value={siteSettings.brandName}
                  onChange={e => updateSiteSettings({ brandName: e.target.value })}
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-medium focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold">Nomor WhatsApp Admin</label>
                <input
                  type="text"
                  value={siteSettings.whatsappNumber}
                  onChange={e => updateSiteSettings({ whatsappNumber: e.target.value })}
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-medium focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold">Email Notifikasi Agency</label>
                <input
                  type="email"
                  value={siteSettings.email}
                  onChange={e => updateSiteSettings({ email: e.target.value })}
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-medium focus:outline-none focus:border-purple-500"
                />
              </div>
              <Button variant="primary" onClick={() => toast.success('Pengaturan platform disimpan!')} leftIcon={<Save className="w-4 h-4" />}>
                Simpan Pengaturan
              </Button>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <SectionHeader title="Profil Founder (Halaman Tentang Kami)" subtitle="Edit bio, filosofi, dan keahlian founder yang tampil di /about." icon={<Users className="w-5 h-5 text-purple-400" />} />
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-bold">Nama Founder</label>
                  <input
                    type="text"
                    value={founderData.name}
                    onChange={e => updateFounder({ name: e.target.value })}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-medium focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-bold">Peran / Jabatan</label>
                  <input
                    type="text"
                    value={founderData.role}
                    onChange={e => updateFounder({ role: e.target.value })}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-medium focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold">Bio Founder</label>
                <textarea
                  rows={3}
                  value={founderData.bio}
                  onChange={e => updateFounder({ bio: e.target.value })}
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-medium focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold">Filosofi Kerja</label>
                <textarea
                  rows={2}
                  value={founderData.philosophy}
                  onChange={e => updateFounder({ philosophy: e.target.value })}
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-medium focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>
              <Button variant="primary" onClick={() => toast.success('Profil Founder diperbarui!')} leftIcon={<Save className="w-4 h-4" />}>
                Simpan Profil Founder
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* ═══════════════════════════════════════
         MODAL FORM UNTUK CRUD
         ═══════════════════════════════════════ */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-purple-500/30 w-full max-w-lg rounded-2xl p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white capitalize">
                {modalType.startsWith('add') ? 'Tambah' : 'Edit'} {modalType.includes('Template') ? 'Template Marketplace' : modalType.includes('Service') ? 'Layanan Agency' : modalType.includes('Portfolio') ? 'Karya Portofolio' : 'Testimoni Klien'}
              </h3>
              <button onClick={closeModal} className="text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            {/* Template Form */}
            {modalType.includes('Template') && (
              <form onSubmit={handleSaveTemplate} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-bold">Nama Template</label>
                  <input
                    type="text"
                    required
                    value={formFields.name || ''}
                    onChange={e => setFormFields(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Nexus Pro UI Kit"
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-bold">Harga Normal (IDR)</label>
                    <input
                      type="number"
                      required
                      value={formFields.price || ''}
                      onChange={e => setFormFields(f => ({ ...f, price: e.target.value }))}
                      placeholder="299000"
                      className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-bold">Harga Promo (IDR)</label>
                    <input
                      type="number"
                      value={formFields.discountPrice || ''}
                      onChange={e => setFormFields(f => ({ ...f, discountPrice: e.target.value }))}
                      placeholder="199000"
                      className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-bold">Deskripsi Singkat</label>
                  <textarea
                    rows={2}
                    value={formFields.shortDescription || ''}
                    onChange={e => setFormFields(f => ({ ...f, shortDescription: e.target.value }))}
                    placeholder="Deskripsi singkat template..."
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={closeModal}>Batal</Button>
                  <Button type="submit" variant="primary" size="sm">Simpan Template</Button>
                </div>
              </form>
            )}

            {/* Service Form */}
            {modalType.includes('Service') && (
              <form onSubmit={handleSaveService} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-bold">Nama Layanan</label>
                  <input
                    type="text"
                    required
                    value={formFields.name || ''}
                    onChange={e => setFormFields(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Website Company Profile"
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-bold">Harga Mulai Dari (IDR)</label>
                    <input
                      type="number"
                      required
                      value={formFields.startingPrice || ''}
                      onChange={e => setFormFields(f => ({ ...f, startingPrice: e.target.value }))}
                      placeholder="2500000"
                      className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-bold">Estimasi (Hari)</label>
                    <input
                      type="number"
                      required
                      value={formFields.estimatedDays || ''}
                      onChange={e => setFormFields(f => ({ ...f, estimatedDays: e.target.value }))}
                      placeholder="5"
                      className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-bold">Deskripsi Layanan</label>
                  <textarea
                    rows={2}
                    value={formFields.shortDescription || ''}
                    onChange={e => setFormFields(f => ({ ...f, shortDescription: e.target.value }))}
                    placeholder="Penjelasan singkat..."
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={closeModal}>Batal</Button>
                  <Button type="submit" variant="primary" size="sm">Simpan Layanan</Button>
                </div>
              </form>
            )}

            {/* Portfolio Form */}
            {modalType.includes('Portfolio') && (
              <form onSubmit={handleSavePortfolio} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-bold">Judul Karya / Proyek</label>
                  <input
                    type="text"
                    required
                    value={formFields.title || ''}
                    onChange={e => setFormFields(f => ({ ...f, title: e.target.value }))}
                    placeholder="e.g. Fintech Mobile Dashboard"
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-bold">Nama Klien</label>
                    <input
                      type="text"
                      value={formFields.clientName || ''}
                      onChange={e => setFormFields(f => ({ ...f, clientName: e.target.value }))}
                      placeholder="e.g. PT PayFlow"
                      className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-bold">Kategori</label>
                    <select
                      value={formFields.category || 'Web Application'}
                      onChange={e => setFormFields(f => ({ ...f, category: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Web Application">Web Application</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Company Profile">Company Profile</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={closeModal}>Batal</Button>
                  <Button type="submit" variant="primary" size="sm">Simpan Portofolio</Button>
                </div>
              </form>
            )}

            {/* Testimonial Form */}
            {modalType.includes('Testimonial') && (
              <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-bold">Nama Klien</label>
                    <input
                      type="text"
                      required
                      value={formFields.name || ''}
                      onChange={e => setFormFields(f => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Andi Pratama"
                      className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-bold">Jabatan & Perusahaan</label>
                    <input
                      type="text"
                      value={formFields.role || ''}
                      onChange={e => setFormFields(f => ({ ...f, role: e.target.value }))}
                      placeholder="e.g. CEO, Nusa Capital"
                      className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-bold">Isi Testimoni</label>
                  <textarea
                    rows={3}
                    required
                    value={formFields.content || ''}
                    onChange={e => setFormFields(f => ({ ...f, content: e.target.value }))}
                    placeholder="Ulasan tentang layanan..."
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={closeModal}>Batal</Button>
                  <Button type="submit" variant="primary" size="sm">Simpan Testimoni</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOverviewPage;
