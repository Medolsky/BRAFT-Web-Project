import React from 'react';
import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';
import { MOCK_TESTIMONIALS } from '../../data/mockData';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Rating } from '../ui/Rating';
import { FadeIn, StaggerContainer, StaggerItem, HoverScale } from '../ui/motion';

export const Testimonials: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-zinc-950/50 border-y border-white/10 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-orange-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main space-y-12 relative z-10">
        <FadeIn className="text-center w-full max-w-xl mx-auto space-y-3">
          <Badge variant="orange">{t('testimonials.title')}</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white">
            Apa Kata <em className="font-serif-italic text-orange-400 font-normal">Klien</em> Kami
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
          {MOCK_TESTIMONIALS.map((item) => (
            <StaggerItem key={item.id}>
              <HoverScale>
                <Card className="space-y-4 flex flex-col justify-between relative h-full">
                  <Quote className="w-8 h-8 text-purple-500/15 absolute top-4 right-4" />
                  <div className="space-y-3">
                    <Rating value={item.rating} size="sm" showValue={false} />
                    <p className="text-xs text-zinc-300 leading-relaxed italic">
                      "{item.content}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <img
                      src={item.avatarUrl}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-purple-500/30"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.name}</h4>
                      <p className="text-[10px] text-zinc-400">
                        {item.role}, <span className="text-purple-400">{item.company}</span>
                      </p>
                    </div>
                  </div>
                </Card>
              </HoverScale>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
