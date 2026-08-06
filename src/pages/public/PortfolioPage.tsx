import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { MOCK_PORTFOLIO } from '../../data/mockData';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { FadeIn, SlideIn, ScaleIn } from '../../components/ui/motion';

export const PortfolioPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Web Application', 'E-commerce', 'Company Profile'];

  const filteredItems = MOCK_PORTFOLIO.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <div className="space-y-16 pb-20 pt-8">
      {/* Header */}
      <FadeIn className="text-center w-full max-w-3xl mx-auto container-main space-y-4">
        <Badge variant="purple">{t('portfolio.title')}</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-white">
          Showcase Proyek & <em className="font-serif-italic text-purple-400 font-normal">Studi Kasus Agency</em>
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed">
          Lihat bagaimana kami membantu berbagai brand dan bisnis mentransformasikan gagasan mereka menjadi solusi digital berkinerja tinggi.
        </p>
      </FadeIn>

      {/* Category Filter Tabs */}
      <section className="container-main space-y-10">
        <FadeIn delay={0.15} className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`chip-21st cursor-pointer ${activeCategory === cat ? 'chip-21st-active' : ''}`}
            >
              {cat === 'all' ? 'Semua Proyek' : cat}
            </button>
          ))}
        </FadeIn>

        {/* Portfolio Cases List with Animations */}
        <AnimatePresence mode="wait">
          <div key={activeCategory} className="space-y-12">
            {filteredItems.map((item, idx) => (
              <ScaleIn key={item.id} delay={idx * 0.1}>
                <Card className="p-0 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 border-white/10 hover:border-purple-500/30 group">
                  <SlideIn direction="left" className="lg:col-span-7 bg-zinc-950 aspect-[16/10] overflow-hidden">
                    <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </SlideIn>

                  <SlideIn direction="right" className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="purple">{item.category}</Badge>
                        <Badge variant="slate">{item.industry}</Badge>
                      </div>
                      <h2 className="text-2xl font-bold font-display text-white">{item.title}</h2>
                      <p className="text-xs text-zinc-400 font-medium">Klien: {item.clientName || 'Confidential'}</p>

                      <div className="space-y-3 pt-2">
                        <div>
                          <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider">{t('portfolio.challenge')}</h3>
                          <p className="text-xs text-zinc-300 mt-1">{item.challenge}</p>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{t('portfolio.solution')}</h3>
                          <p className="text-xs text-zinc-300 mt-1">{item.solution}</p>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5" /> {t('portfolio.result')}
                          </h3>
                          <p className="text-xs text-zinc-300 mt-1">{item.result}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-zinc-500">Durasi: {item.duration}</span>
                      <Link to="/services">
                        <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                          Pesan Layanan Serupa
                        </Button>
                      </Link>
                    </div>
                  </SlideIn>
                </Card>
              </ScaleIn>
            ))}
          </div>
        </AnimatePresence>
      </section>
    </div>
  );
};
