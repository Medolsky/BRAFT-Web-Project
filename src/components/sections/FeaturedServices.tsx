import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Code2, LayoutTemplate, MessageSquare } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { FadeIn, StaggerContainer, StaggerItem, HoverScale } from '../ui/motion';

export const FeaturedServices: React.FC = () => {
  const openWhatsAppCustom = () => {
    const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '6281234567890';
    const text = encodeURIComponent('Halo Admin BRaft.Dev! Saya berminat untuk memesan Website Custom (Perusahaan/Startup/E-commerce). Mohon informasi konsultasi & penawarannya.');
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="section-padding relative">
      <div className="container-main space-y-12">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="purple">Pilihan Paket & Solusi Agency</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
              Solusi Fleksibel Sesuai <em className="font-serif-italic text-purple-400 font-normal">Kebutuhan & Budget</em> Anda
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Pilih pengerjaan website custom dari nol bersama tim profesional agency kami atau gunakan template UI premium siap pakai untuk peluncuran serba cepat.
            </p>
          </div>
        </FadeIn>

        {/* 2-Column Solution Cards */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Kolom 1: Jasa Pembuatan Website Custom */}
          <StaggerItem>
            <HoverScale>
              <Card className="p-8 sm:p-10 flex flex-col justify-between h-full space-y-8 relative group border-purple-500/40">
                <div className="space-y-6">
                  {/* Icon & Badge Header */}
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:border-purple-400 transition-all duration-300">
                      <Code2 className="w-7 h-7" />
                    </div>
                    <Badge variant="purple" className="px-3 py-1">
                      Agency Custom Service
                    </Badge>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold font-display text-white group-hover:text-purple-400 transition-colors">
                      Jasa Pembuatan Website Custom
                    </h3>
                    <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200">
                      <span className="font-bold text-purple-300">Cocok untuk:</span> Perusahaan, Startup, E-commerce besar, dan Brand yang butuh identitas unik.
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Keunggulan & Fitur Utama:</h4>
                    <div className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>Desain 100% custom sesuai brand identity</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>Konsultasi arsitektur sistem mendalam</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>Integrasi fitur kompleks (API, Payment Gateway, dll)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action Button */}
                <div className="pt-4 border-t border-white/10">
                  <Button
                    onClick={openWhatsAppCustom}
                    size="md"
                    variant="primary"
                    className="w-full py-3 shadow-lg shadow-purple-500/25 font-bold"
                    leftIcon={<MessageSquare className="w-4 h-4" />}
                  >
                    Pesan Website Custom Sekarang
                  </Button>
                </div>
              </Card>
            </HoverScale>
          </StaggerItem>

          {/* Kolom 2: Marketplace Template Siap Pakai */}
          <StaggerItem>
            <HoverScale>
              <Card className="p-8 sm:p-10 flex flex-col justify-between h-full space-y-8 relative group border-purple-500/40">
                <div className="space-y-6">
                  {/* Icon & Badge Header */}
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300">
                      <LayoutTemplate className="w-7 h-7" />
                    </div>
                    <Badge variant="blue" className="px-3 py-1">
                      Instant UI Marketplace
                    </Badge>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold font-display text-white group-hover:text-cyan-400 transition-colors">
                      Marketplace Template Siap Pakai
                    </h3>
                    <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200">
                      <span className="font-bold text-cyan-300">Cocok untuk:</span> UMKM, Freelancer, Pemilik Bisnis Pemula yang butuh cepat dan hemat.
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Keunggulan & Fitur Utama:</h4>
                    <div className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>Tinggal install dan sesuaikan konten</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>Desain modern, responsive, & SEO-friendly</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>Harga jauh lebih terjangkau dengan kualitas premium</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action Button */}
                <div className="pt-4 border-t border-white/10">
                  <Link to="/templates" className="w-full block">
                    <Button
                      size="md"
                      variant="primary"
                      className="w-full py-3 shadow-lg shadow-purple-500/25 font-bold"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Jelajahi Katalog Template
                    </Button>
                  </Link>
                </div>
              </Card>
            </HoverScale>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default FeaturedServices;
