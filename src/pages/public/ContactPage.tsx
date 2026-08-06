import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, PhoneCall, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FadeIn, SlideIn, HoverScale } from '../../components/ui/motion';
import toast from 'react-hot-toast';

export const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pesan Anda berhasil dikirim! Tim kami akan membalas dalam kurun waktu 1x24 jam.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const openWhatsApp = () => {
    const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '6281234567890';
    const message = encodeURIComponent(
      `Halo BRaft.Dev! Nama saya ${formData.name || 'Pengunjung'}. Saya ingin berkonsultasi mengenai: ${formData.subject || 'Layanan Website'}`
    );
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-16 pb-20 pt-8">
      {/* Header */}
      <FadeIn className="text-center space-y-4 max-w-3xl mx-auto container-main">
        <Badge variant="purple">{t('contact.title')}</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-white">
          Mari Bicara Tentang <em className="font-serif-italic text-purple-400 font-normal">Proyek Website</em> Anda
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed">
          Punya pertanyaan seputar layanan, template marketplace, atau ingin penawaran kustom? Tim kami siap membantu.
        </p>
      </FadeIn>

      <section className="container-main grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards */}
        <SlideIn direction="left" className="lg:col-span-4 space-y-6">
          <HoverScale>
            <Card className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Email Business</h3>
                  <p className="text-sm font-bold text-white">hello@webcraft.app</p>
                </div>
              </div>
            </Card>
          </HoverScale>

          <HoverScale>
            <Card className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">WhatsApp Business</h3>
                  <p className="text-sm font-bold text-white">+62 812-3456-7890</p>
                </div>
              </div>
            </Card>
          </HoverScale>

          <HoverScale>
            <Card className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Lokasi Kantor</h3>
                  <p className="text-sm font-bold text-white">Jakarta Selatan, Indonesia</p>
                </div>
              </div>
            </Card>
          </HoverScale>

          <HoverScale>
            <Card className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Jam Operasional</h3>
                  <p className="text-sm font-bold text-white">Senin - Jumat: 09:00 - 18:00 WIB</p>
                </div>
              </div>
            </Card>
          </HoverScale>
        </SlideIn>

        {/* Form Container */}
        <SlideIn direction="right" className="lg:col-span-8">
          <Card className="p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold font-display text-white">Kirim Pesan Konsultasi</h2>
              <p className="text-xs text-zinc-400 mt-1">Isi formulir di bawah ini dan kami akan segera membalas email Anda.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t('contact.name')}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label={t('contact.email')}
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t('contact.phone')}
                  placeholder="081234567890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <Input
                  label={t('contact.subject')}
                  placeholder="Tanya Jasa Website / Template"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase">{t('contact.message')}</label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Tuliskan pertanyaan atau kebutuhan detail Anda..."
                  required
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button variant="primary" type="submit" rightIcon={<Send className="w-4 h-4" />}>
                  {t('contact.send')}
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={openWhatsApp}
                  leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400" />}
                >
                  {t('contact.whatsapp')}
                </Button>
              </div>
            </form>
          </Card>
        </SlideIn>
      </section>
    </div>
  );
};
