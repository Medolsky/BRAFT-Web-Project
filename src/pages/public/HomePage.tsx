import React, { useState, useEffect } from 'react';
import { ArrowRight, Layers, MessageSquare } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { OrbitalHeroSection } from '../../components/ui/orbital-hero-section';
import { YieldCard } from '../../components/ui/yield-card';
import { FadeIn, ScaleIn, AnimatedCounter, FloatingElement } from '../../components/ui/motion';
import { FeaturedServices } from '../../components/sections/FeaturedServices';
import { ProjectEstimatorSection } from '../../components/sections/ProjectEstimatorSection';
import { FeaturedTemplates } from '../../components/sections/FeaturedTemplates';
import { WhyChooseUs } from '../../components/sections/WhyChooseUs';
import { HowItWorks } from '../../components/sections/HowItWorks';
import { PortfolioHighlight } from '../../components/sections/PortfolioHighlight';
import { Testimonials } from '../../components/sections/Testimonials';
import { AgencyFAQSection } from '../../components/sections/AgencyFAQSection';
import { CTASection } from '../../components/sections/CTASection';
import { useUIStore } from '../../stores/uiStore';

/** Hook to handle narrow screen responsive adjustments for the Orbital Hero */
function useNarrow(query = '(max-width: 767px)') {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const sync = () => setNarrow(m.matches);
    sync();
    m.addEventListener('change', sync);
    return () => m.removeEventListener('change', sync);
  }, [query]);
  return narrow;
}

export const HomePage: React.FC = () => {
  const narrow = useNarrow();
  const [activeChip, setActiveChip] = useState('all');

  const chips = [
    { id: 'all', label: 'All Ecosystem' },
    { id: 'agency', label: 'Jasa Pembuatan Website' },
    { id: 'templates', label: 'Template Siap Pakai' },
    { id: 'portfolio', label: 'Portofolio Client' },
    { id: 'estimator', label: 'Kalkulator Biaya Proyek' },
  ];

  const openConsultationModal = useUIStore((s) => s.openConsultationModal);

  const openWhatsAppConsultation = () => {
    openConsultationModal(
      'Halo BRaft.Dev Agency! Saya ingin berkonsultasi mengenai pembuatan website custom untuk bisnis saya.'
    );
  };

  return (
    <div className="w-full min-h-screen space-y-16 overflow-hidden bg-black text-white">
      {/* 3D Cosmic Orbital Hero Section — 21st.dev Component */}
      <section className="relative min-h-[92vh] w-full md:min-h-[800px] border-b border-white/10">
        <OrbitalHeroSection
          focus={narrow ? [0.65, 0.35] : [0.78, 0.28]}
          scrim="none"
          yearSeconds={3}
          driftSpeed={3}
          viewRadius={narrow ? 3.8 : 5.8}
          lead={narrow ? 0.05 : 0.08}
          glow={narrow ? 0.5 : 0.9}
          showSunTrack={true}
          interactive={true}
        >
          <div className="container-main pt-12 pb-20 relative z-10 space-y-10">
            {/* Centered Hero Content Block */}
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-6 pt-4">

              {/* Signature Headline */}
              <FadeIn delay={0.25} y={40}>
                <h1 className="w-full text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-white leading-[1.08]">
                  Solusi Pembuatan <em className="font-serif-italic text-purple-400 font-normal">Website Custom</em> & Marketplace Template <em className="font-serif-italic text-cyan-400 font-normal">Siap Pakai</em>
                </h1>
              </FadeIn>

              {/* Subheadline */}
              <FadeIn delay={0.4}>
                <p className="w-full max-w-2xl text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
                  Solusi fleksibel sesuai kebutuhan & budget Anda. Pilih pengerjaan website custom dari nol bersama tim profesional kami atau gunakan template UI premium siap pakai untuk peluncuran serba cepat.
                </p>
              </FadeIn>

              {/* Action Buttons */}
              <FadeIn delay={0.55}>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <Button
                    size="md"
                    variant="primary"
                    onClick={openWhatsAppConsultation}
                    leftIcon={<MessageSquare className="w-4 h-4" />}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="shadow-lg shadow-purple-500/25 px-6 font-bold"
                  >
                    Pesan Website Custom
                  </Button>
                  <Link to="/templates">
                    <Button size="md" variant="secondary" className="px-6 font-bold">
                      Jelajahi Katalog Template
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Filter Chip Navigation Row */}
            <div className="w-full max-w-3xl mx-auto flex items-center justify-center gap-2 overflow-x-auto pb-2">
              {chips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => setActiveChip(chip.id)}
                  className={`chip-21st ${activeChip === chip.id ? 'chip-21st-active' : ''}`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Interactive Floating Mockup Visual */}
            <ScaleIn delay={0.3}>
              <FloatingElement amplitude={6} duration={6}>
                <div className="w-full max-w-5xl mx-auto pt-2">
                  <YieldCard radius={24} className="p-3 shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 rounded-xl border border-white/10 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                      </div>
                      <div className="px-6 py-1 bg-zinc-900 rounded-full text-[11px] font-mono text-zinc-400 border border-white/10 truncate max-w-[200px] sm:max-w-none">
                        https://braft.dev/dashboard
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                        Agency Live System
                      </span>
                    </div>

                    <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-zinc-950 border border-white/10 flex items-center justify-center p-8 sm:p-12">
                      <img
                        src="/braft-logo.png"
                        alt="BRaft.Dev Ecosystem Interface Mockup"
                        className="max-h-56 sm:max-h-72 w-auto object-contain drop-shadow-[0_0_35px_rgba(168,85,247,0.35)]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

                      {/* Floating Overlay Card */}
                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-zinc-950/90 border border-white/15 backdrop-blur-md">
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                            <Layers className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">Dashboard Manajemen Proyek & Klien Terpusat</h4>
                            <p className="text-[11px] text-zinc-400">Pantau progres revisi, milestone pengerjaan, file, & transaksi secara real-time</p>
                          </div>
                        </div>
                        <Button onClick={openWhatsAppConsultation} variant="accent" size="sm" className="w-full sm:w-auto">
                          Mulai Proyek Sekarang
                        </Button>
                      </div>
                    </div>
                  </YieldCard>
                </div>
              </FloatingElement>
            </ScaleIn>

            {/* Stats Counter Row */}
            <FadeIn delay={0.5}>
              <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 w-full max-w-4xl mx-auto">
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                    <AnimatedCounter value={150} suffix="+" />
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">Proyek Website Selesai</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                    <AnimatedCounter value={99} suffix="%" />
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">Kepuasan Klien Agency</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                    <AnimatedCounter value={50} suffix="+" />
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">Template Siap Pakai</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                    <AnimatedCounter value={4.9} suffix="/5" decimals={1} />
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">Rating Review Klien</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </OrbitalHeroSection>
      </section>

      {/* Main Feature Sections */}
      <FeaturedServices />
      <ProjectEstimatorSection />
      <FeaturedTemplates />
      <WhyChooseUs />
      <HowItWorks />
      <PortfolioHighlight />
      <Testimonials />
      <AgencyFAQSection />
      <CTASection />
    </div>
  );
};
