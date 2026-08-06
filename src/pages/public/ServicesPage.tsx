import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { MOCK_SERVICES } from '../../data/mockData';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { FadeIn, StaggerContainer, StaggerItem, HoverScale } from '../../components/ui/motion';
import toast from 'react-hot-toast';

export const ServicesPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<typeof MOCK_SERVICES[0] | null>(null);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);

  const handleOrder = (service: typeof MOCK_SERVICES[0]) => {
    setSelectedService(service);
    setIsBriefModalOpen(true);
  };

  const handleBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBriefModalOpen(false);
    toast.success('Permintaan proyek berhasil dikirim! Admin kami akan segera menghubungi Anda.');
  };

  return (
    <div className="space-y-16 pb-20 pt-8">
      {/* Header */}
      <FadeIn className="text-center w-full max-w-3xl mx-auto container-main space-y-4">
        <Badge variant="purple">Layanan Agency Digital</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-white">
          Jasa Pembuatan Website <em className="font-serif-italic text-purple-400 font-normal">Profesional</em> & Bergaransi
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed">
          Dari landing page berkonversi tinggi hingga aplikasi web skala enterprise — kami mewujudkan ide bisnis Anda dengan desain terbaik dan kode bersih.
        </p>
      </FadeIn>

      {/* Services List with Packages */}
      <section className="container-main space-y-16">
        {MOCK_SERVICES.map((service) => (
          <FadeIn key={service.id} y={40}>
            <div className="space-y-8 p-8 bg-zinc-950/40 border border-white/10 rounded-3xl backdrop-blur-md hover:border-purple-500/30 transition-colors duration-500">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
                <div className="space-y-2">
                  <Badge variant="purple">{service.name}</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold font-display text-white">{service.name}</h2>
                  <p className="text-sm text-zinc-400 max-w-2xl">{service.description}</p>
                </div>
                <Button variant="primary" onClick={() => handleOrder(service)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Mulai Proyek Ini
                </Button>
              </div>

              {/* Packages Grid */}
              {service.packages.length > 0 && (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {service.packages.map((pkg) => (
                    <StaggerItem key={pkg.id}>
                      <HoverScale>
                        <Card
                          className={`flex flex-col justify-between space-y-6 relative h-full ${
                            pkg.isPopular ? 'border-purple-500/50 bg-zinc-900/90 shadow-xl shadow-purple-500/10' : ''
                          }`}
                        >
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center justify-between gap-2">
                                <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                                {pkg.isPopular && (
                                  <span className="px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md shrink-0">
                                    {t('pricing.popular')}
                                  </span>
                                )}
                              </div>
                              <div className="mt-2 flex items-baseline gap-1">
                                <span className="text-2xl font-extrabold text-purple-400 font-display">
                                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(pkg.price)}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-2.5 pt-4 pb-4 border-t border-white/10 text-xs text-zinc-300">
                              {pkg.features.map((feat, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                                  <span>{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6 pt-2">
                            <Button variant="primary" className="w-full py-3.5 shadow-lg shadow-purple-500/20" onClick={() => handleOrder(service)}>
                              Pilih Paket {pkg.name}
                            </Button>
                          </div>
                        </Card>
                      </HoverScale>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </div>
          </FadeIn>
        ))}
      </section>

      {/* Project Brief Modal */}
      <Modal isOpen={isBriefModalOpen} onClose={() => setIsBriefModalOpen(false)} title={`Pesan ${selectedService?.name || 'Layanan'}`}>
        <form onSubmit={handleBriefSubmit} className="space-y-4 text-left">
          <Input label="Nama Lengkap" placeholder="John Doe" required />
          <Input label="Email Aktif" type="email" placeholder="nama@email.com" required />
          <Input label="Nomor WhatsApp" placeholder="081234567890" required />
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-300 uppercase">Catatan Brief Kebutuhan</label>
            <textarea
              rows={3}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Jelaskan kebutuhan website Anda (contoh: jenis usaha, referensi website yang disukai, deadline...)"
              required
            />
          </div>

          <Button variant="primary" type="submit" className="w-full">
            Kirim Brief Proyek
          </Button>
        </form>
      </Modal>
    </div>
  );
};
