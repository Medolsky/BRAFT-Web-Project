import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useDataStore } from '../../stores/dataStore';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { FadeIn, StaggerContainer, StaggerItem, HoverScale } from '../../components/ui/motion';

export const PricingPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const services = useDataStore((s) => s.services);
  const currentService = services[selectedServiceIndex] || services[0];

  return (
    <div className="space-y-16 pb-20 pt-8">
      {/* Header */}
      <FadeIn className="text-center space-y-4 max-w-3xl mx-auto container-main">
        <Badge variant="purple">{t('pricing.title')}</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-white">
          Pilihan Paket <em className="font-serif-italic text-purple-400 font-normal">Transparan</em> Tanpa Biaya Tersembunyi
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed">
          Pilih jenis layanan dan paket yang paling pas untuk skala bisnis Anda saat ini.
        </p>
      </FadeIn>

      {/* Service Selector Tabs */}
      <section className="container-main space-y-12">
        <FadeIn delay={0.15} className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {services.map((srv, idx) => (
            <button
              key={srv.id}
              onClick={() => setSelectedServiceIndex(idx)}
              className={`chip-21st cursor-pointer ${selectedServiceIndex === idx ? 'chip-21st-active' : ''}`}
            >
              {srv.name}
            </button>
          ))}
        </FadeIn>

        {/* Pricing Cards with Animation */}
        <AnimatePresence mode="wait">
          {currentService && currentService.packages.length > 0 ? (
            <StaggerContainer key={selectedServiceIndex} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {currentService.packages.map((pkg) => (
                <StaggerItem key={pkg.id}>
                  <HoverScale>
                    <Card
                      className={`flex flex-col justify-between space-y-6 relative h-full ${
                        pkg.isPopular ? 'border-purple-500 bg-zinc-900/90 shadow-2xl shadow-purple-500/15' : ''
                      }`}
                    >
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-xl font-bold font-display text-white">{pkg.name}</h3>
                            {pkg.isPopular && (
                              <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md shrink-0">
                                {t('pricing.popular')}
                              </span>
                            )}
                          </div>
                          <div className="mt-4 flex items-baseline gap-1">
                            <span className="text-3xl font-extrabold text-purple-400 font-display">
                              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(pkg.price)}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-2">
                            Estimasi pengerjaan: <b>{pkg.estimatedDays} hari kerja</b>
                          </p>
                        </div>

                        <div className="space-y-2.5 pt-4 pb-4 border-t border-white/10 text-xs text-zinc-300">
                          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-3">
                            Termasuk dalam paket:
                          </span>
                          {pkg.features.map((feat, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-2">
                        <Link to="/contact">
                          <Button variant="primary" className="w-full py-3.5 shadow-lg shadow-purple-500/20" rightIcon={<ArrowRight className="w-4 h-4" />}>
                            {t('pricing.getStarted')}
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  </HoverScale>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <Card className="text-center py-12 space-y-4 max-w-xl mx-auto">
              <h3 className="text-lg font-bold text-white">Proyek Kustom / Kebutuhan Khusus</h3>
              <p className="text-xs text-zinc-400">
                Layanan ini memerlukan spesifikasi sistem custom. Hubungi tim kami untuk mendapatkan estimasi penawaran resmi.
              </p>
              <Link to="/contact">
                <Button variant="primary">{t('pricing.requestQuote')}</Button>
              </Link>
            </Card>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};
