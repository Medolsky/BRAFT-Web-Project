import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles, PhoneCall } from 'lucide-react';
import { Button } from '../ui/Button';
import { FadeIn, GlowPulse, ScaleIn } from '../ui/motion';
import { useUIStore } from '../../stores/uiStore';

export const CTASection: React.FC = () => {
  const { t } = useTranslation();
  const openConsultationModal = useUIStore((s) => s.openConsultationModal);

  const openWhatsApp = () => {
    openConsultationModal('Halo BRaft.Dev! Saya tertarik untuk berkonsultasi mengenai jasa pembuatan website.');
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-main">
        <ScaleIn>
          <div className="relative rounded-3xl bg-gradient-to-r from-purple-900/60 via-zinc-900 to-indigo-900/60 border border-purple-500/30 p-8 md:p-14 text-center space-y-8 shadow-2xl backdrop-blur-xl overflow-hidden">
            {/* Animated Glowing Ambient Background */}
            <GlowPulse className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
              <div className="w-full h-full bg-purple-500/20 rounded-full blur-3xl" />
            </GlowPulse>

            {/* Orbiting particles */}
            <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-purple-400/60 animate-ping" />
            <div className="absolute bottom-16 left-16 w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1/3 left-10 w-1 h-1 rounded-full bg-blue-400/60 animate-ping" style={{ animationDelay: '1s' }} />

            <FadeIn className="w-full max-w-2xl mx-auto space-y-4 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                <Sparkles className="w-3.5 h-3.5" /> Ready to Launch?
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white leading-tight">
                Punya <em className="font-serif-italic text-purple-400 font-normal">Ide</em> Website?
              </h2>
              <p className="text-base text-zinc-300">
                Mari ubah menjadi produk digital yang nyata. Konsultasikan ide proyek Anda secara gratis bersama tim kami.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <Link to="/contact">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  {t('cta.button')}
                </Button>
              </Link>
              <Button
                size="lg"
                variant="secondary"
                onClick={openWhatsApp}
                leftIcon={<PhoneCall className="w-4 h-4 text-emerald-400" />}
              >
                Konsultasi WhatsApp
              </Button>
            </FadeIn>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
};
