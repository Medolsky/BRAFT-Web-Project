import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Target, ShieldCheck } from 'lucide-react';
import { useDataStore } from '../../stores/dataStore';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { FadeIn, SlideIn, ScaleIn, HoverScale } from '../../components/ui/motion';

export const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const FOUNDER_DATA = useDataStore((s) => s.founderData);

  return (
    <div className="space-y-16 pb-20 pt-8">
      {/* Header */}
      <FadeIn className="text-center space-y-4 max-w-3xl mx-auto container-main">
        <Badge variant="purple">{t('about.title')}</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-white">
          Membangun Masa Depan <em className="font-serif-italic text-purple-400 font-normal">Ekosistem Web</em> Indonesia
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed">
          BRaft.Dev menghubungkan layanan digital agency kelas atas dan marketplace template website dalam satu ekosistem yang terintegrasi.
        </p>
      </FadeIn>

      {/* Founder Profile Feature Showcase */}
      <section className="container-main">
        <ScaleIn>
          <Card className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-purple-500/30">
            <SlideIn direction="left" className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden border-2 border-purple-500/40 p-1 bg-zinc-900 shadow-2xl">
                  <img
                    src={FOUNDER_DATA.avatarUrl}
                    alt={FOUNDER_DATA.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-zinc-950 border border-white/10 p-3 rounded-2xl shadow-xl flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="text-xs font-bold text-white block">{FOUNDER_DATA.experienceYears}+ Tahun Exp</span>
                    <span className="text-[10px] text-zinc-400">Digital Architect</span>
                  </div>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="right" className="lg:col-span-8 space-y-4">
              <Badge variant="purple">{t('about.founder')}</Badge>
              <h2 className="text-3xl font-extrabold font-display text-white">{FOUNDER_DATA.name}</h2>
              <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">{FOUNDER_DATA.role}</p>

              <p className="text-sm text-zinc-300 leading-relaxed">{FOUNDER_DATA.bio}</p>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 space-y-2">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Filosofi Kerja</h4>
                <p className="text-xs italic text-zinc-300">"{FOUNDER_DATA.philosophy}"</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Keahlian Utama:</h4>
                <div className="flex flex-wrap gap-2">
                  {FOUNDER_DATA.skills.map((skill, i) => (
                    <Badge key={i} variant="slate" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </SlideIn>
          </Card>
        </ScaleIn>
      </section>

      {/* Vision & Mission Cards */}
      <section className="container-main grid grid-cols-1 md:grid-cols-2 gap-6">
        <FadeIn delay={0.1}>
          <HoverScale>
            <Card className="space-y-4 h-full">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">{t('about.vision')}</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Menjadi platform utama pilihan para bisnis dan developer di Indonesia untuk mempublikasikan, menjual, dan memesan website berkualitas tinggi dengan standar dunia.
              </p>
            </Card>
          </HoverScale>
        </FadeIn>

        <FadeIn delay={0.2}>
          <HoverScale>
            <Card className="space-y-4 h-full">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">{t('about.mission')}</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Memberdayakan talenta digital kreator lokal melalui sistem komisi transparan marketplace, sekaligus menyediakan jasa pembuatan website yang aman, cepat, dan modern untuk klien.
              </p>
            </Card>
          </HoverScale>
        </FadeIn>
      </section>
    </div>
  );
};
