import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useDataStore } from '../../stores/dataStore';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { FadeIn, SlideIn, ScaleIn } from '../ui/motion';

export const PortfolioHighlight: React.FC = () => {
  const { t } = useTranslation();
  const portfolio = useDataStore((s) => s.portfolio);
  const featuredItem = portfolio.find(p => p.isFeatured) || portfolio[0];

  if (!featuredItem) return null;

  return (
    <section className="section-padding relative">
      <div className="container-main space-y-12">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <Badge variant="purple" className="mb-3">
                {t('portfolio.title')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white">
                Proyek <em className="font-serif-italic text-purple-400 font-normal">Unggulan</em> Kami
              </h2>
            </div>
            <Link to="/portfolio">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Semua Studi Kasus
              </Button>
            </Link>
          </div>
        </FadeIn>

        {/* Featured Case Study Hero Card */}
        <ScaleIn>
          <Card className="p-0 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 border-purple-500/20 group">
            <SlideIn direction="left" className="lg:col-span-7 aspect-[16/10] bg-zinc-950 overflow-hidden relative flex items-center justify-center p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
              <img
                src={featuredItem.thumbnailUrl}
                alt={featuredItem.title}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out filter drop-shadow-[0_0_25px_rgba(168,85,247,0.3)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent lg:hidden pointer-events-none" />
            </SlideIn>

            <SlideIn direction="right" className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="purple">{featuredItem.category}</Badge>
                  <Badge variant="slate">{featuredItem.industry}</Badge>
                </div>

                <h3 className="text-2xl font-bold text-white leading-tight font-display">
                  {featuredItem.title}
                </h3>

                <div className="space-y-3 pt-2">
                  <div>
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                      {t('portfolio.challenge')}
                    </h4>
                    <p className="text-xs text-zinc-300 mt-1 line-clamp-2">{featuredItem.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> {t('portfolio.result')}
                    </h4>
                    <p className="text-xs text-zinc-300 mt-1 line-clamp-2">{featuredItem.result}</p>
                  </div>
                </div>
              </div>

              {featuredItem.testimonial && (
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 text-xs italic text-zinc-300">
                  "{featuredItem.testimonial.quote}"
                  <p className="not-italic font-bold text-white mt-2">
                    — {featuredItem.testimonial.author}, {featuredItem.testimonial.role}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                <Link to="/portfolio" className="flex-1">
                  <Button variant="primary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    {t('portfolio.viewProject')}
                  </Button>
                </Link>
              </div>
            </SlideIn>
          </Card>
        </ScaleIn>
      </div>
    </section>
  );
};
