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

  Eye,
  Trash2,
  Copy,
  AlertTriangle,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

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
    'Published': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'Under Review': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Active': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'Verified': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
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

  /* ─── Mock Data ─── */
  const [projects, setProjects] = useState([
    { id: 'PRJ-801', client: 'PT Nusantara Digital', type: 'Website Company Profile', price: 4200000, days: 7, status: 'In Progress', date: '2026-08-05' },
    { id: 'PRJ-802', client: 'CV Borneo Creative', type: 'Landing Page High Conversion', price: 2500000, days: 4, status: 'Pending Payment', date: '2026-08-06' },
    { id: 'PRJ-803', client: 'Maju Jaya Tech', type: 'Custom Web App / SaaS', price: 12500000, days: 20, status: 'Completed', date: '2026-08-01' },
    { id: 'PRJ-804', client: 'Toko Berkah Utama', type: 'E-commerce & Toko Online', price: 6800000, days: 12, status: 'In Progress', date: '2026-08-03' },
  ]);

  const [templates, setTemplates] = useState([
    { id: 'TPL-101', name: 'Nexus Pro - Agency Landing Page', seller: 'Studio Code ID', price: 189000, sales: 42, status: 'Published' },
    { id: 'TPL-102', name: 'Velox - SaaS Dashboard System', seller: 'Braft Studio', price: 249000, sales: 28, status: 'Published' },
    { id: 'TPL-103', name: 'Aura - Modern E-Commerce UI', seller: 'PixelCraft', price: 329000, sales: 15, status: 'Under Review' },
    { id: 'TPL-104', name: 'Pulse - Startup Portfolio Template', seller: 'Digital Hero', price: 149000, sales: 57, status: 'Published' },
  ]);

  const [sellers] = useState([
    { id: 'SLR-01', name: 'Studio Code ID', email: 'seller@studiocode.id', templates: 3, totalSales: 89, revenue: 21600000, status: 'Verified' },
    { id: 'SLR-02', name: 'Braft Studio', email: 'studio@braft.dev', templates: 2, totalSales: 45, revenue: 11200000, status: 'Verified' },
    { id: 'SLR-03', name: 'PixelCraft', email: 'hello@pixelcraft.id', templates: 1, totalSales: 15, revenue: 4935000, status: 'Under Review' },
    { id: 'SLR-04', name: 'Digital Hero', email: 'info@digitalhero.co', templates: 1, totalSales: 57, revenue: 8493000, status: 'Verified' },
  ]);

  const [users] = useState([
    { id: 'USR-001', name: 'Super Admin BRaft.Dev', email: 'admin@braft.dev', role: 'super_admin', status: 'Active', joined: '2026-01-01' },
    { id: 'USR-002', name: 'Rian Hidayat', email: 'rian@nusantara.id', role: 'user', status: 'Active', joined: '2026-06-12' },
    { id: 'USR-003', name: 'Budi Santoso', email: 'budi@tokoberkah.com', role: 'user', status: 'Active', joined: '2026-07-20' },
    { id: 'USR-004', name: 'Dewi Kartika', email: 'dewi@kreasi.co', role: 'user', status: 'Active', joined: '2026-07-28' },
    { id: 'USR-005', name: 'Ahmad Fauzi', email: 'ahmad@fauzi.me', role: 'user', status: 'Active', joined: '2026-08-01' },
  ]);

  const [orders] = useState([
    { id: 'ORD-901', item: 'Nexus Pro UI Template', buyer: 'Rian Hidayat', amount: 189000, date: '2026-08-06', type: 'Template', status: 'Paid' },
    { id: 'ORD-902', item: 'Velox SaaS Dashboard', buyer: 'Budi Santoso', amount: 249000, date: '2026-08-05', type: 'Template', status: 'Paid' },
    { id: 'ORD-903', item: 'Website Company Profile', buyer: 'PT Nusantara Digital', amount: 4200000, date: '2026-08-04', type: 'Proyek Custom', status: 'Paid (DP 50%)' },
    { id: 'ORD-904', item: 'Pulse Portfolio Template', buyer: 'Dewi Kartika', amount: 149000, date: '2026-08-03', type: 'Template', status: 'Paid' },
  ]);

  const [transactions] = useState([
    { id: 'TXN-001', ref: 'ORD-901', method: 'BCA Virtual Account', amount: 189000, date: '2026-08-06 14:32', status: 'Paid' },
    { id: 'TXN-002', ref: 'ORD-902', method: 'GoPay', amount: 249000, date: '2026-08-05 09:15', status: 'Paid' },
    { id: 'TXN-003', ref: 'ORD-903', method: 'Transfer Bank Mandiri', amount: 2100000, date: '2026-08-04 11:22', status: 'Paid (DP 50%)' },
    { id: 'TXN-004', ref: 'PRJ-804', method: 'QRIS', amount: 3400000, date: '2026-08-03 16:45', status: 'Paid' },
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

  const [reviews] = useState([
    { id: 'REV-01', product: 'Nexus Pro - Agency Landing Page', reviewer: 'Rian Hidayat', rating: 5, comment: 'Template sangat bagus dan responsif! Dokumentasi lengkap.', date: '2026-08-05' },
    { id: 'REV-02', product: 'Velox - SaaS Dashboard System', reviewer: 'Budi Santoso', rating: 4, comment: 'Desain keren, tapi ada sedikit bug di dark mode chart.', date: '2026-08-04' },
    { id: 'REV-03', product: 'Jasa Custom Website', reviewer: 'PT Nusantara Digital', rating: 5, comment: 'Tim BRaft.Dev sangat profesional. Website company profile kami jadi sangat premium!', date: '2026-08-02' },
  ]);

  const [coupons, setCoupons] = useState([
    { id: 'CPN-01', code: 'BRAFT15', discount: '15%', minOrder: 200000, maxUse: 100, used: 34, expiry: '2026-09-30', status: 'Active' },
    { id: 'CPN-02', code: 'MERDEKA50K', discount: 'Rp 50.000', minOrder: 300000, maxUse: 50, used: 12, expiry: '2026-08-17', status: 'Active' },
    { id: 'CPN-03', code: 'WELCOME10', discount: '10%', minOrder: 100000, maxUse: 200, used: 200, expiry: '2026-07-31', status: 'Expired' },
  ]);

  const [cmsContent] = useState([
    { id: 'CMS-01', title: 'Landing Page Hero Section', type: 'Section', lastEdit: '2026-08-05', author: 'Super Admin', status: 'Published' },
    { id: 'CMS-02', title: 'Halaman Tentang Kami', type: 'Page', lastEdit: '2026-08-03', author: 'Super Admin', status: 'Published' },
    { id: 'CMS-03', title: 'Blog: Tips Memilih Template Website', type: 'Blog Post', lastEdit: '2026-08-01', author: 'Super Admin', status: 'Draft' },
    { id: 'CMS-04', title: 'FAQ - Pertanyaan yang Sering Diajukan', type: 'Page', lastEdit: '2026-07-28', author: 'Super Admin', status: 'Published' },
  ]);

  const [auditLogs] = useState([
    { id: 'LOG-001', action: 'Template TPL-103 di-approve & diterbitkan', actor: 'Super Admin', ip: '103.152.xx.xx', time: '2026-08-06 14:30:12' },
    { id: 'LOG-002', action: 'Status proyek PRJ-801 diubah menjadi In Progress', actor: 'Super Admin', ip: '103.152.xx.xx', time: '2026-08-05 09:12:44' },
    { id: 'LOG-003', action: 'Kupon BRAFT15 berhasil dibuat', actor: 'Super Admin', ip: '103.152.xx.xx', time: '2026-08-04 16:55:03' },
    { id: 'LOG-004', action: 'User USR-005 (Ahmad Fauzi) berhasil terdaftar', actor: 'System', ip: '-', time: '2026-08-01 10:22:11' },
    { id: 'LOG-005', action: 'Seller SLR-03 (PixelCraft) mendaftar sebagai mitra', actor: 'System', ip: '180.244.xx.xx', time: '2026-07-30 08:45:33' },
  ]);

  /* ─── Handlers ─── */
  const handleUpdateProjectStatus = (id: string, newStatus: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    toast.success(`Status proyek ${id} diperbarui ke "${newStatus}"!`);
  };

  const handleToggleTemplateStatus = (id: string) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'Published' ? 'Under Review' : 'Published' } : t));
    toast.success(`Status template ${id} berhasil diperbarui!`);
  };

  const handleResolveTicket = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));
    toast.success(`Tiket ${id} telah ditandai Resolved!`);
  };

  const handleMarkChatRead = (id: string) => {
    setChatMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const handleSendReply = (toName: string) => {
    if (!chatReply.trim()) { toast.error('Ketik pesan balasan terlebih dahulu!'); return; }
    toast.success(`Pesan balasan berhasil dikirim ke ${toName}!`);
    setChatReply('');
  };

  const handleDeleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    toast.success(`Kupon ${id} berhasil dihapus!`);
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
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> System Live
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Manajemen Platform & Proyek Agency
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Pantau arus transaksi, moderasi template, kelola pesanan client, dan manajemen akun user.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button size="sm" variant="outline" onClick={() => toast.success('Laporan berhasil di-export ke CSV!')} leftIcon={<Download className="w-4 h-4" />}>Export</Button>
          <Button size="sm" variant="primary" onClick={() => toast.success('Kupon promo baru dibuat!')} leftIcon={<Plus className="w-4 h-4" />}>Buat Promo</Button>
        </div>
      </div>

      {/* ── KPI CARDS (always visible) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Pendapatan', value: 'Rp 26.000.000', sub: '+18.4% dari bulan lalu', icon: <DollarSign className="w-5 h-5" />, color: 'purple' },
          { label: 'Pesanan Proyek Custom', value: `${projects.length} Proyek`, sub: `${projects.filter(p => p.status === 'In Progress').length} In Progress`, icon: <FolderGit2 className="w-5 h-5" />, color: 'cyan' },
          { label: 'Template Terjual', value: '142 Lisensi', sub: `Katalog aktif: ${templates.filter(t => t.status === 'Published').length} Template`, icon: <ShoppingBag className="w-5 h-5" />, color: 'emerald' },
          { label: 'Total Client & User', value: `${users.length + sellers.length} Pengguna`, sub: `${users.length} Klien, ${sellers.length} Mitra Seller`, icon: <Users className="w-5 h-5" />, color: 'amber' },
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
         TAB CONTENT — one per sidebar link
         ═══════════════════════════════════════ */}

      {/* ───── 1. OVERVIEW ───── */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Card className="lg:col-span-8 p-6 space-y-4">
            <SectionHeader title="Pesanan Proyek Agency Terkini" subtitle="4 proyek aktif" icon={<FolderGit2 className="w-4 h-4 text-purple-400" />} action={<Button size="sm" variant="ghost" onClick={() => navigate('/admin/projects')}>Lihat Semua</Button>} />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead><tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3">ID</th><th className="pb-3">Klien</th><th className="pb-3">Tipe</th><th className="pb-3">Biaya</th><th className="pb-3">Status</th><th className="pb-3 text-right">Aksi</th>
                </tr></thead>
                <tbody className="divide-y divide-white/5">
                  {projects.map(p => (
                    <tr key={p.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 font-bold text-purple-400">{p.id}</td>
                      <td className="py-3.5 font-medium text-white">{p.client}</td>
                      <td className="py-3.5 text-zinc-300">{p.type}</td>
                      <td className="py-3.5 font-extrabold text-white">{formatRupiah(p.price)}</td>
                      <td className="py-3.5"><StatusBadge status={p.status} /></td>
                      <td className="py-3.5 text-right"><Button size="sm" variant="ghost" onClick={() => navigate('/admin/projects')} className="px-2 py-1 text-[11px]">Detail</Button></td>
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
                {['Database Supabase', 'WhatsApp Gateway', 'Vite CDN & Build'].map(s => (
                  <div key={s} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-white/5">
                    <span className="text-zinc-300">{s}</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Online</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6 space-y-4">
              <h3 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-400" /> Aksi Cepat</h3>
              <div className="space-y-2">
                {[
                  { label: `Kelola Proyek Custom (${projects.length})`, path: '/admin/projects', icon: <FolderGit2 className="w-4 h-4" /> },
                  { label: `Moderasi Template (${templates.filter(t => t.status === 'Under Review').length} Pending)`, path: '/admin/templates', icon: <FileCheck className="w-4 h-4" /> },
                  { label: `Tiket Support (${tickets.filter(t => t.status === 'Open').length} Open)`, path: '/admin/tickets', icon: <Ticket className="w-4 h-4" /> },
                  { label: `Live Chat (${chatMessages.filter(m => !m.read).length} Belum Dibaca)`, path: '/admin/chat', icon: <MessageSquare className="w-4 h-4" /> },
                ].map(a => (
                  <Button key={a.path} size="sm" variant="outline" className="w-full justify-start text-xs py-2.5" onClick={() => navigate(a.path)} leftIcon={a.icon}>{a.label}</Button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ───── 2. USERS ───── */}
      {activeTab === 'users' && (
        <Card className="p-6 space-y-6">
          <SectionHeader title="Manajemen Pengguna (Klien)" subtitle="Daftar semua klien / pembeli yang terdaftar." icon={<Users className="w-5 h-5 text-purple-400" />} />
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
                    <td className="py-4 text-right"><Button size="sm" variant="ghost" onClick={() => toast.success(`Membuka profil ${u.name}`)} className="text-[11px]">Kelola</Button></td>
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
                <th className="pb-3">ID Seller</th><th className="pb-3">Nama Mitra</th><th className="pb-3">Email</th><th className="pb-3">Template</th><th className="pb-3">Total Penjualan</th><th className="pb-3">Revenue</th><th className="pb-3">Status</th><th className="pb-3 text-right">Aksi</th>
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
                    <td className="py-4 text-right"><Button size="sm" variant="ghost" onClick={() => toast.success(`Membuka profil seller ${s.name}`)} className="text-[11px]">Kelola</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ───── 4. TEMPLATE MODERATION ───── */}
      {activeTab === 'templates' && (
        <Card className="p-6 space-y-6">
          <SectionHeader title="Moderasi & Katalog Template UI" subtitle="Setujui atau tarik template yang diunggah mitra seller." icon={<FileCheck className="w-5 h-5 text-purple-400" />} />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead><tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3">ID</th><th className="pb-3">Nama Template</th><th className="pb-3">Seller</th><th className="pb-3">Harga</th><th className="pb-3">Terjual</th><th className="pb-3">Status</th><th className="pb-3 text-right">Aksi</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {templates.map(t => (
                  <tr key={t.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-purple-400">{t.id}</td>
                    <td className="py-4 font-bold text-white">{t.name}</td>
                    <td className="py-4 text-zinc-300">{t.seller}</td>
                    <td className="py-4 font-extrabold text-purple-400">{formatRupiah(t.price)}</td>
                    <td className="py-4 text-zinc-400">{t.sales} Unit</td>
                    <td className="py-4"><StatusBadge status={t.status} /></td>
                    <td className="py-4 text-right">
                      <Button size="sm" variant={t.status === 'Published' ? 'outline' : 'primary'} className="text-[11px] px-3 py-1" onClick={() => handleToggleTemplateStatus(t.id)}>
                        {t.status === 'Published' ? 'Tarik' : 'Terbitkan'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ───── 5. SERVICE PROJECTS ───── */}
      {activeTab === 'projects' && (
        <Card className="p-6 space-y-6">
          <SectionHeader
            title="Manajemen Proyek Website Custom"
            subtitle="Update status pengerjaan website agency untuk klien."
            icon={<FolderGit2 className="w-5 h-5 text-purple-400" />}
            action={<Button size="sm" variant="primary" onClick={() => toast.success('Form pesanan proyek baru dibuka!')} leftIcon={<Plus className="w-4 h-4" />}>Tambah Proyek</Button>}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead><tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3">ID</th><th className="pb-3">Klien</th><th className="pb-3">Layanan</th><th className="pb-3">Estimasi</th><th className="pb-3">Biaya</th><th className="pb-3">Status</th><th className="pb-3 text-right">Ubah Status</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {projects.map(p => (
                  <tr key={p.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-purple-400">{p.id}</td>
                    <td className="py-4 font-medium text-white">{p.client}</td>
                    <td className="py-4 text-zinc-300">{p.type}</td>
                    <td className="py-4 text-zinc-400">{p.days} Hari</td>
                    <td className="py-4 font-extrabold text-white">{formatRupiah(p.price)}</td>
                    <td className="py-4"><StatusBadge status={p.status} /></td>
                    <td className="py-4 text-right">
                      <Button size="sm" variant="outline" className="text-[11px] px-2.5 py-1" onClick={() => handleUpdateProjectStatus(p.id, p.status === 'In Progress' ? 'Completed' : 'In Progress')}>
                        {p.status === 'In Progress' ? 'Tandai Selesai' : 'Set In-Progress'}
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
                  <Button size="sm" variant="primary" onClick={() => { handleMarkChatRead(m.id); handleSendReply(m.from); }} leftIcon={<Send className="w-3.5 h-3.5" />} className="text-[11px]">Kirim</Button>
                  {!m.read && <Button size="sm" variant="ghost" onClick={() => { handleMarkChatRead(m.id); toast.success('Pesan ditandai sudah dibaca'); }} className="text-[11px]"><Eye className="w-3.5 h-3.5" /></Button>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ───── 9. SUPPORT TICKETS ───── */}
      {activeTab === 'tickets' && (
        <Card className="p-6 space-y-6">
          <SectionHeader title="Support Tickets" subtitle={`${tickets.filter(t => t.status === 'Open').length} tiket masih terbuka.`} icon={<Ticket className="w-5 h-5 text-amber-400" />} />
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
                    <td className="py-4"><Badge variant={t.priority === 'High' ? 'red' : t.priority === 'Medium' ? 'orange' : 'slate'} size="sm">{t.priority}</Badge></td>
                    <td className="py-4 text-zinc-400">{t.date}</td>
                    <td className="py-4"><StatusBadge status={t.status} /></td>
                    <td className="py-4 text-right">
                      {t.status === 'Open' ? (
                        <Button size="sm" variant="primary" className="text-[11px] px-3 py-1" onClick={() => handleResolveTicket(t.id)}>Resolve</Button>
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

      {/* ───── 10. REVIEWS ───── */}
      {activeTab === 'reviews' && (
        <Card className="p-6 space-y-6">
          <SectionHeader title="Ulasan & Rating Produk" subtitle="Review dari klien dan pembeli template." icon={<Star className="w-5 h-5 text-amber-400" />} />
          <div className="space-y-4">
            {reviews.map(r => (
              <div key={r.id} className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-sm">{r.reviewer}</span>
                    <span className="text-zinc-500 text-xs ml-2">pada <span className="text-purple-400 font-semibold">{r.product}</span></span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-zinc-300">&quot;{r.comment}&quot;</p>
                <span className="text-[10px] text-zinc-500">{r.date}</span>
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
            action={<Button size="sm" variant="primary" onClick={() => toast.success('Form kupon baru dibuka!')} leftIcon={<Plus className="w-4 h-4" />}>Buat Kupon Baru</Button>}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead><tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3">ID</th><th className="pb-3">Kode Kupon</th><th className="pb-3">Diskon</th><th className="pb-3">Min Order</th><th className="pb-3">Pemakaian</th><th className="pb-3">Berlaku</th><th className="pb-3">Status</th><th className="pb-3 text-right">Aksi</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {coupons.map(c => (
                  <tr key={c.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-purple-400">{c.id}</td>
                    <td className="py-4">
                      <span className="font-mono font-bold text-white bg-zinc-800 px-2 py-1 rounded">{c.code}</span>
                    </td>
                    <td className="py-4 font-extrabold text-emerald-400">{c.discount}</td>
                    <td className="py-4 text-zinc-300">{formatRupiah(c.minOrder)}</td>
                    <td className="py-4 text-zinc-400">{c.used}/{c.maxUse}</td>
                    <td className="py-4 text-zinc-400">{c.expiry}</td>
                    <td className="py-4"><StatusBadge status={c.status} /></td>
                    <td className="py-4 text-right flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => { navigator.clipboard.writeText(c.code); toast.success(`Kode "${c.code}" disalin!`); }} className="text-[11px] px-2 py-1"><Copy className="w-3.5 h-3.5" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteCoupon(c.id)} className="text-[11px] px-2 py-1 text-red-400 hover:text-red-300"><Trash2 className="w-3.5 h-3.5" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ───── 12. CONTENT (CMS) ───── */}
      {activeTab === 'content' && (
        <Card className="p-6 space-y-6">
          <SectionHeader
            title="Content Management System (CMS)"
            subtitle="Kelola halaman, section, dan artikel blog."
            icon={<FileText className="w-5 h-5 text-purple-400" />}
            action={<Button size="sm" variant="primary" onClick={() => toast.success('Editor konten baru dibuka!')} leftIcon={<Plus className="w-4 h-4" />}>Buat Konten Baru</Button>}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead><tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3">ID</th><th className="pb-3">Judul Konten</th><th className="pb-3">Tipe</th><th className="pb-3">Terakhir Diedit</th><th className="pb-3">Penulis</th><th className="pb-3">Status</th><th className="pb-3 text-right">Aksi</th>
              </tr></thead>
              <tbody className="divide-y divide-white/5">
                {cmsContent.map(c => (
                  <tr key={c.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-purple-400">{c.id}</td>
                    <td className="py-4 font-bold text-white">{c.title}</td>
                    <td className="py-4"><Badge variant={c.type === 'Blog Post' ? 'blue' : c.type === 'Page' ? 'green' : 'purple'} size="sm">{c.type}</Badge></td>
                    <td className="py-4 text-zinc-400">{c.lastEdit}</td>
                    <td className="py-4 text-zinc-300">{c.author}</td>
                    <td className="py-4"><StatusBadge status={c.status} /></td>
                    <td className="py-4 text-right">
                      <Button size="sm" variant="ghost" onClick={() => toast.success(`Membuka editor "${c.title}"`)} className="text-[11px]">Edit</Button>
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
          <SectionHeader title="Laporan & Analitik Platform" subtitle="Ringkasan performa bisnis BRaft.Dev." icon={<BarChart className="w-5 h-5 text-purple-400" />} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { label: 'Pendapatan Bulan Ini', value: 'Rp 26.000.000', change: '+18.4%', up: true },
              { label: 'Penjualan Template', value: '142 Unit', change: '+24 unit', up: true },
              { label: 'Proyek Custom Aktif', value: '4 Proyek', change: '+2 proyek', up: true },
              { label: 'Pendaftaran User Baru', value: '38 User', change: '+12 dari Juli', up: true },
              { label: 'Rata-rata Rating', value: '4.7 / 5.0', change: '+0.2', up: true },
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
          <div className="pt-4">
            <Button variant="outline" onClick={() => toast.success('Laporan lengkap berhasil di-download sebagai PDF!')} leftIcon={<Download className="w-4 h-4" />}>Download Laporan PDF</Button>
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

      {/* ───── 15. SETTINGS ───── */}
      {activeTab === 'settings' && (
        <Card className="p-6 space-y-6 max-w-3xl">
          <SectionHeader title="Pengaturan Platform BRaft.Dev" subtitle="Konfigurasi umum agensi dan integrasi gateway." icon={<Settings className="w-5 h-5 text-zinc-400" />} />
          <div className="space-y-4 text-xs">
            {[
              { label: 'Nama Platform Agency', defaultVal: 'BRaft.Dev — Digital Agency & Template Marketplace', type: 'text' },
              { label: 'Nomor WhatsApp Admin', defaultVal: '+62 812-3456-7890', type: 'text' },
              { label: 'Email Notifikasi Agency', defaultVal: 'admin@braft.dev', type: 'email' },
              { label: 'Komisi Marketplace (%)', defaultVal: '15', type: 'number' },
              { label: 'URL Website Utama', defaultVal: 'https://braft.dev', type: 'url' },
            ].map((field, i) => (
              <div key={i} className="space-y-1.5">
                <label className="text-zinc-300 font-bold">{field.label}</label>
                <input
                  type={field.type}
                  defaultValue={field.defaultVal}
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-medium focus:outline-none focus:border-purple-500"
                />
              </div>
            ))}
            <div className="pt-4 border-t border-white/10">
              <Button variant="primary" onClick={() => toast.success('Pengaturan platform berhasil disimpan!')} leftIcon={<Save className="w-4 h-4" />}>Simpan Pengaturan</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminOverviewPage;
