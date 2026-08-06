import React from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, Code2, Headphones, Sparkles, RefreshCw, Lock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FadeIn, StaggerContainer, StaggerItem, HoverScale } from '../ui/motion';

export const WhyChooseUs: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    { icon: Sparkles, title: t('whyChooseUs.modernDesign'), desc: t('whyChooseUs.modernDesignDesc'), color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
    { icon: Zap, title: t('whyChooseUs.responsive'), desc: t('whyChooseUs.responsiveDesc'), color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { icon: Code2, title: t('whyChooseUs.cleanCode'), desc: t('whyChooseUs.cleanCodeDesc'), color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { icon: Headphones, title: t('whyChooseUs.support'), desc: t('whyChooseUs.supportDesc'), color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
    { icon: RefreshCw, title: t('whyChooseUs.revision'), desc: t('whyChooseUs.revisionDesc'), color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
    { icon: Lock, title: t('whyChooseUs.securePayment'), desc: t('whyChooseUs.securePaymentDesc'), color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
  ];

  return (
    <section className="section-padding relative">
      <div className="container-main space-y-12">
        <FadeIn className="text-center w-full max-w-2xl mx-auto space-y-3">
          <Badge variant="blue">{t('whyChooseUs.title')}</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white">
            Standar <em className="font-serif-italic text-blue-400 font-normal">Kualitas</em> Tertinggi dalam Setiap Baris Kode
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={index}>
                <HoverScale>
                  <Card className="space-y-3 group h-full">
                    <div className={`w-10 h-10 rounded-xl ${item.bg} border flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                  </Card>
                </HoverScale>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
