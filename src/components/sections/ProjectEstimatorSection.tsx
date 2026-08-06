import React, { useState } from 'react';
import { YieldCard } from '../ui/yield-card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { FadeIn } from '../ui/motion';
import { Calculator, CheckCircle2, Clock, ShieldCheck, MessageSquare, Zap, Code2, Headphones } from 'lucide-react';

type ProjectType = {
  id: string;
  name: string;
  basePrice: number;
  baseDays: number;
  description: string;
  badge: string;
};

type FeatureOption = {
  id: string;
  name: string;
  price: number;
  extraDays: number;
};

const PROJECT_TYPES: ProjectType[] = [
  {
    id: 'landing',
    name: 'Landing Page High Conversion',
    basePrice: 2500000,
    baseDays: 5,
    description: 'Cocok untuk campaign produk, promosi event, & perolehan prospek calon pembeli.',
    badge: 'Paling Populer',
  },
  {
    id: 'company',
    name: 'Website Company Profile',
    basePrice: 4200000,
    baseDays: 7,
    description: 'Profil perusahaan profesional, elegan, berkelas dunia dengan animasi 21st.dev style.',
    badge: 'Rekomendasi Bisnis',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce & Toko Online',
    basePrice: 6800000,
    baseDays: 12,
    description: 'Katalog produk lengkap, sistem checkout, kalkulator ongkir, & Payment Gateway.',
    badge: 'Penjualan Otomatis',
  },
  {
    id: 'custom',
    name: 'Custom Web App / SaaS Platform',
    basePrice: 12500000,
    baseDays: 20,
    description: 'Aplikasi berbasis React/Next.js dengan database Supabase, sistem user role, & API.',
    badge: 'Enterprise Level',
  },
];

const FEATURE_OPTIONS: FeatureOption[] = [
  { id: 'payment', name: 'Integrasi Payment Gateway (Midtrans/Xendit)', price: 1500000, extraDays: 2 },
  { id: 'seo', name: 'SEO Google & Speed Optimization (Score 95+)', price: 1000000, extraDays: 1 },
  { id: 'i18n', name: 'Multi-Language (Bahasa Indonesia & Inggris)', price: 800000, extraDays: 1 },
  { id: 'admin', name: 'Custom Admin Dashboard Analytics', price: 2500000, extraDays: 3 },
  { id: 'chatbot', name: 'AI Chatbot Assistant 24/7 Integration', price: 1800000, extraDays: 2 },
];

export const ProjectEstimatorSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ProjectType>(PROJECT_TYPES[0]!);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['seo']);
  const [urgencyMultiplier, setUrgencyMultiplier] = useState<number>(1); // 1 = Normal, 1.25 = Fast (7 days), 1.5 = Express

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate totals
  const featuresTotal = selectedFeatures.reduce((sum, featId) => {
    const feat = FEATURE_OPTIONS.find((f) => f.id === featId);
    return sum + (feat ? feat.price : 0);
  }, 0);

  const extraDaysTotal = selectedFeatures.reduce((sum, featId) => {
    const feat = FEATURE_OPTIONS.find((f) => f.id === featId);
    return sum + (feat ? feat.extraDays : 0);
  }, 0);

  const rawPrice = (selectedType.basePrice + featuresTotal) * urgencyMultiplier;
  const totalPrice = Math.round(rawPrice / 50000) * 50000;
  const totalDays = Math.max(3, Math.round((selectedType.baseDays + extraDaysTotal) / (urgencyMultiplier === 1.5 ? 2 : urgencyMultiplier === 1.25 ? 1.4 : 1)));

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleConsultation = () => {
    const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '6281234567890';
    const selectedFeatNames = selectedFeatures
      .map((id) => FEATURE_OPTIONS.find((f) => f.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const message = encodeURIComponent(
      `Halo BRaft.Dev Agency! Saya ingin berkonsultasi untuk pembuatan website:\n\n` +
        `📌 *Tipe Proyek*: ${selectedType.name}\n` +
        `🛠️ *Fitur Tambahan*: ${selectedFeatNames || 'Tidak ada'}\n` +
        `⏱️ *Estimasi Pengerjaan*: ~${totalDays} Hari Kerja\n` +
        `💰 *Estimasi Biaya*: ${formatRupiah(totalPrice)}\n\n` +
        `Mohon info ketersediaan slot tim developer & penawaran resminya. Terima kasih!`
    );

    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="section-padding relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-main relative z-10 space-y-12">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="purple" className="mx-auto">
              <Calculator className="w-3.5 h-3.5 mr-1" /> Instant Project Calculator
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white leading-tight">
              Hitung <em className="font-serif-italic text-purple-400 font-normal">Estimasi Biaya</em> & Waktu Pembuatan Website Anda
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Dapatkan perkiraan harga transparan dan durasi pengerjaan secara instan sebelum memulai konsultasi resmi dengan tim kami.
            </p>
          </div>
        </FadeIn>

        {/* Calculator Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Configurator Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Select Project Type */}
            <YieldCard radius={20} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center border border-purple-500/30">
                  1
                </span>
                <h3 className="text-base font-bold text-white">Pilih Tipe & Skala Website</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedType.id === type.id
                        ? 'bg-purple-600/15 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                        : 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:bg-zinc-800/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-sm text-white">{type.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
                        {type.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-normal line-clamp-2 mt-1">
                      {type.description}
                    </p>
                    <div className="mt-3 text-xs font-semibold text-purple-400">
                      Mulai {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(type.basePrice)}
                    </div>
                  </button>
                ))}
              </div>
            </YieldCard>

            {/* Step 2: Select Features */}
            <YieldCard radius={20} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center border border-purple-500/30">
                  2
                </span>
                <h3 className="text-base font-bold text-white">Pilih Fitur Tambahan Proyek</h3>
              </div>

              <div className="space-y-2">
                {FEATURE_OPTIONS.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between gap-3 text-left transition-all ${
                        isChecked
                          ? 'bg-purple-600/15 border-purple-500 text-white'
                          : 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:bg-zinc-800/60 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isChecked
                              ? 'bg-purple-600 border-purple-500 text-white'
                              : 'border-white/20 bg-zinc-900'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-white">{feat.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-purple-400 shrink-0">
                        +{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(feat.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </YieldCard>

            {/* Step 3: Speed & Urgency */}
            <YieldCard radius={20} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center border border-purple-500/30">
                  3
                </span>
                <h3 className="text-base font-bold text-white">Target Kecepatan Pengerjaan</h3>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setUrgencyMultiplier(1)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    urgencyMultiplier === 1
                      ? 'bg-purple-600/15 border-purple-500 text-white'
                      : 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:bg-zinc-800/60'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Normal</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Jadwal Standar</div>
                </button>
                <button
                  onClick={() => setUrgencyMultiplier(1.25)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    urgencyMultiplier === 1.25
                      ? 'bg-purple-600/15 border-purple-500 text-white'
                      : 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:bg-zinc-800/60'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Fast Track ⚡</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Prioritas 1</div>
                </button>
                <button
                  onClick={() => setUrgencyMultiplier(1.5)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    urgencyMultiplier === 1.5
                      ? 'bg-purple-600/15 border-purple-500 text-white'
                      : 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:bg-zinc-800/60'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Express 🚀</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Prioritas Utama</div>
                </button>
              </div>
            </YieldCard>
          </div>

          {/* Right Summary Column — Sticky Result Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <YieldCard radius={24} className="p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold tracking-wider text-purple-400 uppercase">
                  Ringkasan Estimasi Proyek
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Garansi Tepat Waktu
                </span>
              </div>

              <div className="space-y-3">
                <div className="text-zinc-400 text-xs uppercase tracking-wider font-semibold">Tipe Website</div>
                <div className="text-lg font-bold text-white">{selectedType.name}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10">
                <div>
                  <span className="text-zinc-400 text-xs flex items-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5 text-purple-400" /> Estimasi Waktu
                  </span>
                  <span className="text-xl font-extrabold font-display text-white">
                    ~{totalDays} <span className="text-xs font-normal text-zinc-400">Hari Kerja</span>
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 text-xs flex items-center gap-1 mb-1">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" /> Estimasi Total
                  </span>
                  <span className="text-lg font-extrabold font-display text-purple-400">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Perks List */}
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Gratis Domain .com / .co.id & High-Speed Hosting 1 Tahun</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Gratis Maintenance & Bug Fixes 3 Bulan Pertama</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Akses Dashboard Progres Proyek & Source Code 100% Milik Anda</span>
                </div>
              </div>

              <Button
                onClick={handleConsultation}
                size="md"
                variant="primary"
                className="w-full shadow-lg shadow-purple-500/25 py-2.5 text-xs sm:text-sm font-bold"
                leftIcon={<MessageSquare className="w-4 h-4" />}
              >
                Konsultasi Diskon 15% Via WhatsApp
              </Button>

              <p className="text-[11px] text-zinc-400 text-center leading-normal mt-4 pt-1">
                🔒 Bebas diskusi tanpa komitmen awal. Tim konsultan senior kami akan merespons dalam waktu kurang dari 15 menit.
              </p>
            </YieldCard>
          </div>
        </div>

        {/* Agency Trust Guarantee Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6">
          <YieldCard radius={16} className="p-4 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Garansi Kepuasan 100%</h4>
              <p className="text-[11px] text-zinc-400 mt-1">Revisi bebas hingga hasil sesuai kesepakatan desain awal.</p>
            </div>
          </YieldCard>

          <YieldCard radius={16} className="p-4 flex items-start gap-3">
            <Zap className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">PageSpeed Score 95+</h4>
              <p className="text-[11px] text-zinc-400 mt-1">Website ultra cepat untuk pengalaman pengguna terbaik & SEO.</p>
            </div>
          </YieldCard>

          <YieldCard radius={16} className="p-4 flex items-start gap-3">
            <Code2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Clean Tech Stack</h4>
              <p className="text-[11px] text-zinc-400 mt-1">Dibangun dengan React 19, Next.js, & Tailwind CSS tanpa bloatware.</p>
            </div>
          </YieldCard>

          <YieldCard radius={16} className="p-4 flex items-start gap-3">
            <Headphones className="w-6 h-6 text-orange-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Support After Sales 24/7</h4>
              <p className="text-[11px] text-zinc-400 mt-1">Pendampingan teknis dan panduan pengelolaan website lengkap.</p>
            </div>
          </YieldCard>
        </div>
      </div>
    </section>
  );
};
