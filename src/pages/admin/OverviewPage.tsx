import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
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
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export const AdminOverviewPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Sync tab state with URL path
  const getTabFromPath = (path: string) => {
    if (path.includes('/projects')) return 'projects';
    if (path.includes('/templates')) return 'templates';
    if (path.includes('/users') || path.includes('/sellers')) return 'users';
    if (path.includes('/orders') || path.includes('/payments') || path.includes('/reports') || path.includes('/audit')) return 'orders';
    if (path.includes('/settings')) return 'settings';
    return 'overview';
  };

  const [activeTab, setActiveTab] = useState<string>(getTabFromPath(location.pathname));

  useEffect(() => {
    setActiveTab(getTabFromPath(location.pathname));
  }, [location.pathname]);

  const handleTabChange = (tabKey: string, path: string) => {
    setActiveTab(tabKey);
    navigate(path);
  };

  // Mock Admin Data State
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

  const [users] = useState([
    { id: 'USR-001', name: 'Super Admin BRaft.Dev', email: 'admin@braft.dev', role: 'super_admin', status: 'Active' },
    { id: 'USR-002', name: 'Rian Hidayat', email: 'rian@nusantara.id', role: 'user', status: 'Active' },
    { id: 'USR-003', name: 'Studio Code ID', email: 'seller@studiocode.id', role: 'seller', status: 'Verified' },
    { id: 'USR-004', name: 'Budi Santoso', email: 'budi@tokoberkah.com', role: 'user', status: 'Active' },
  ]);

  const [orders] = useState([
    { id: 'ORD-901', item: 'Nexus Pro UI Template', buyer: 'Rian Hidayat', amount: 189000, date: '2026-08-06', status: 'Paid' },
    { id: 'ORD-902', item: 'Velox SaaS Dashboard', buyer: 'Budi Santoso', amount: 249000, date: '2026-08-05', status: 'Paid' },
    { id: 'ORD-903', item: 'Website Company Profile Service', buyer: 'PT Nusantara Digital', amount: 4200000, date: '2026-08-04', status: 'Paid (DP 50%)' },
  ]);

  const handleUpdateProjectStatus = (id: string, newStatus: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    toast.success(`Status proyek ${id} diperbarui ke ${newStatus}!`);
  };

  const handleToggleTemplateStatus = (id: string) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'Published' ? 'Under Review' : 'Published' } : t));
    toast.success(`Status publikasi template ${id} berhasil diperbarui!`);
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="space-y-8">
      {/* Header & Quick Action */}
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
            Pantau arus transaksi, moderasi template UI, kelola pesanan custom client, dan manajemen akun user.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast.success('Laporan transaksi berhasil di-export ke CSV!')}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export Laporan
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => toast.success('Kupon promo diskon 15% berhasil dibuat!')}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Buat Promo Baru
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="p-5 space-y-3 border-purple-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Pendapatan</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-display">Rp 26.000.000</div>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> +18.4% dari bulan lalu
            </span>
          </div>
        </Card>

        <Card className="p-5 space-y-3 border-cyan-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Pesanan Proyek Custom</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <FolderGit2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-display">4 Proyek</div>
            <span className="text-[11px] text-purple-300 mt-1 block">2 In Progress, 1 Completed</span>
          </div>
        </Card>

        <Card className="p-5 space-y-3 border-emerald-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Template Terjual</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-display">142 Lisensi</div>
            <span className="text-[11px] text-emerald-400 mt-1 block">Katalog aktif: 4 Template</span>
          </div>
        </Card>

        <Card className="p-5 space-y-3 border-amber-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Client & User</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-display">388 Pengguna</div>
            <span className="text-[11px] text-zinc-400 mt-1 block">384 Klien, 4 Mitra Seller</span>
          </div>
        </Card>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto pb-2">
        <button
          onClick={() => handleTabChange('overview', '/admin')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" /> Overview & Ringkasan
        </button>
        <button
          onClick={() => handleTabChange('projects', '/admin/projects')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'projects'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <FolderGit2 className="w-4 h-4" /> Proyek Website Custom ({projects.length})
        </button>
        <button
          onClick={() => handleTabChange('templates', '/admin/templates')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'templates'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <FileCheck className="w-4 h-4" /> Moderasi Template ({templates.length})
        </button>
        <button
          onClick={() => handleTabChange('users', '/admin/users')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'users'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <Users className="w-4 h-4" /> Manajemen User ({users.length})
        </button>
        <button
          onClick={() => handleTabChange('orders', '/admin/orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <DollarSign className="w-4 h-4" /> Transaksi ({orders.length})
        </button>
        <button
          onClick={() => handleTabChange('settings', '/admin/settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'settings'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <Settings className="w-4 h-4" /> Pengaturan Platform
        </button>
      </div>

      {/* Tab Content Display */}

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Service Orders Table */}
          <Card className="lg:col-span-8 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-purple-400" /> Pesanan Proyek Agency Terkini
              </h3>
              <Button size="sm" variant="ghost" onClick={() => handleTabChange('projects', '/admin/projects')}>
                Lihat Semua
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-semibold">ID Proyek</th>
                    <th className="pb-3 font-semibold">Klien</th>
                    <th className="pb-3 font-semibold">Tipe Proyek</th>
                    <th className="pb-3 font-semibold">Estimasi Biaya</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 font-bold text-purple-400">{p.id}</td>
                      <td className="py-3.5 font-medium text-white">{p.client}</td>
                      <td className="py-3.5 text-zinc-300">{p.type}</td>
                      <td className="py-3.5 font-extrabold text-white">{formatRupiah(p.price)}</td>
                      <td className="py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          p.status === 'In Progress' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                          'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toast.success(`Membuka detail proyek ${p.id}`)}
                          className="px-2 py-1 text-[11px]"
                        >
                          Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Quick System Status & Moderation Summary */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 space-y-4">
              <h3 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" /> Status Server & Integrasi
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-white/5">
                  <span className="text-zinc-300">Database Supabase</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Terhubung
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-white/5">
                  <span className="text-zinc-300">WhatsApp Gateway</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Aktif (Fast Response)
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-white/5">
                  <span className="text-zinc-300">Vite Build & Edge CDN</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Operational
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Aksi Cepat Admin
              </h3>
              <div className="space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full justify-start text-xs py-2.5"
                  onClick={() => handleTabChange('projects', '/admin/projects')}
                  leftIcon={<FolderGit2 className="w-4 h-4" />}
                >
                  Kelola Proyek Custom ({projects.length})
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full justify-start text-xs py-2.5"
                  onClick={() => handleTabChange('templates', '/admin/templates')}
                  leftIcon={<FileCheck className="w-4 h-4" />}
                >
                  Moderasi Template UI (1 Pending)
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full justify-start text-xs py-2.5"
                  onClick={() => handleTabChange('users', '/admin/users')}
                  leftIcon={<Users className="w-4 h-4" />}
                >
                  Tambah User / Mitra Penjual
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: PROJECTS MANAGEMENT */}
      {activeTab === 'projects' && (
        <Card className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Manajemen Proyek Website Custom</h3>
              <p className="text-xs text-zinc-400">Update status progres pengerjaan website agency untuk klien.</p>
            </div>
            <Button
              size="sm"
              variant="primary"
              onClick={() => toast.success('Form pesanan proyek baru dibuka!')}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Tambah Pesanan Proyek
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">ID Proyek</th>
                  <th className="pb-3 font-semibold">Klien / Perusahaan</th>
                  <th className="pb-3 font-semibold">Layanan</th>
                  <th className="pb-3 font-semibold">Estimasi Hari</th>
                  <th className="pb-3 font-semibold">Total Biaya</th>
                  <th className="pb-3 font-semibold">Status Pengerjaan</th>
                  <th className="pb-3 font-semibold text-right">Ubah Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-purple-400">{p.id}</td>
                    <td className="py-4 font-medium text-white">{p.client}</td>
                    <td className="py-4 text-zinc-300">{p.type}</td>
                    <td className="py-4 text-zinc-400">{p.days} Hari Kerja</td>
                    <td className="py-4 font-extrabold text-white">{formatRupiah(p.price)}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        p.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        p.status === 'In Progress' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                        'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 text-right flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-[11px] px-2.5 py-1"
                        onClick={() => handleUpdateProjectStatus(p.id, p.status === 'In Progress' ? 'Completed' : 'In Progress')}
                      >
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

      {/* TAB 3: TEMPLATES MODERATION */}
      {activeTab === 'templates' && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Moderasi & Katalog Template UI</h3>
              <p className="text-xs text-zinc-400">Setujui atau review template yang diunggah oleh mitra seller.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">ID Template</th>
                  <th className="pb-3 font-semibold">Nama Template</th>
                  <th className="pb-3 font-semibold">Mitra Penjual</th>
                  <th className="pb-3 font-semibold">Harga Promo</th>
                  <th className="pb-3 font-semibold">Terjual</th>
                  <th className="pb-3 font-semibold">Status Moderasi</th>
                  <th className="pb-3 font-semibold text-right">Aksi Moderasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {templates.map((t) => (
                  <tr key={t.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-purple-400">{t.id}</td>
                    <td className="py-4 font-bold text-white">{t.name}</td>
                    <td className="py-4 text-zinc-300">{t.seller}</td>
                    <td className="py-4 font-extrabold text-purple-400">{formatRupiah(t.price)}</td>
                    <td className="py-4 text-zinc-400">{t.sales} Unit</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        t.status === 'Published' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Button
                        size="sm"
                        variant={t.status === 'Published' ? 'outline' : 'primary'}
                        className="text-[11px] px-3 py-1"
                        onClick={() => handleToggleTemplateStatus(t.id)}
                      >
                        {t.status === 'Published' ? 'Tarik dari Katalog' : 'Setujui & Terbitkan'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 4: USERS MANAGEMENT */}
      {activeTab === 'users' && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Manajemen Pengguna & Mitra Seller</h3>
              <p className="text-xs text-zinc-400">Daftar pengguna terdaftar, mitra seller, dan super admin.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">ID User</th>
                  <th className="pb-3 font-semibold">Nama Lengkap</th>
                  <th className="pb-3 font-semibold">Email</th>
                  <th className="pb-3 font-semibold">Role Acc</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-purple-400">{u.id}</td>
                    <td className="py-4 font-bold text-white">{u.name}</td>
                    <td className="py-4 text-zinc-300">{u.email}</td>
                    <td className="py-4">
                      <Badge variant={u.role === 'super_admin' ? 'purple' : u.role === 'seller' ? 'blue' : 'slate'}>
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-4 text-emerald-400 font-semibold">{u.status}</td>
                    <td className="py-4 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[11px] px-2 py-1 text-zinc-400 hover:text-white"
                        onClick={() => toast.success(`Membuka profil ${u.name}`)}
                      >
                        Kelola Profile
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 5: ORDERS & TRANSACTIONS */}
      {activeTab === 'orders' && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Transaksi & Revenue Audit</h3>
              <p className="text-xs text-zinc-400">Riwayat pembayaran masuk dari pesanan proyek dan pembelian template.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">ID Transaksi</th>
                  <th className="pb-3 font-semibold">Produk / Layanan</th>
                  <th className="pb-3 font-semibold">Pembeli</th>
                  <th className="pb-3 font-semibold">Jumlah Biaya</th>
                  <th className="pb-3 font-semibold">Tanggal</th>
                  <th className="pb-3 font-semibold text-right">Status Pembayaran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 font-bold text-purple-400">{o.id}</td>
                    <td className="py-4 font-bold text-white">{o.item}</td>
                    <td className="py-4 text-zinc-300">{o.buyer}</td>
                    <td className="py-4 font-extrabold text-emerald-400">{formatRupiah(o.amount)}</td>
                    <td className="py-4 text-zinc-400">{o.date}</td>
                    <td className="py-4 text-right">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 6: SETTINGS */}
      {activeTab === 'settings' && (
        <Card className="p-6 space-y-6 max-w-3xl">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white">Pengaturan Platform BRaft.Dev</h3>
            <p className="text-xs text-zinc-400">Konfigurasi umum agensi dan integrasi gateway.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-bold">Nama Platform Agency</label>
              <input
                type="text"
                defaultValue="BRaft.Dev — Digital Agency & Template Marketplace"
                className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-medium focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-bold">Nomor WhatsApp Konsultan Admin</label>
              <input
                type="text"
                defaultValue="+62 812-3456-7890"
                className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-medium focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-bold">Email Notifikasi Agency</label>
              <input
                type="email"
                defaultValue="admin@braft.dev"
                className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-medium focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="pt-4 border-t border-white/10">
              <Button
                variant="primary"
                size="md"
                onClick={() => toast.success('Pengaturan platform berhasil disimpan!')}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Simpan Pengaturan
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminOverviewPage;
