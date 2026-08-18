import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, PhoneCall, MapPin, Clock, Send, MessageSquare, Copy, Check, Sparkles } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FadeIn, SlideIn, HoverScale } from '../../components/ui/motion';
import { CONSULTANTS, getWhatsAppLink, getGmailLink } from '../../config/consultants';
import { useUIStore } from '../../stores/uiStore';
import toast from 'react-hot-toast';

export const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const openConsultationModal = useUIStore((s) => s.openConsultationModal);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredConsultant: 'rapi',
  });

  const handleCopy = (text: string, id: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success(`${label} berhasil disalin!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const consultant = CONSULTANTS.find((c) => c.id === formData.preferredConsultant) || CONSULTANTS[0]!;
    const message = `Halo ${consultant.fullName}! Nama saya ${formData.name}. Saya ingin berkonsultasi mengenai: ${formData.subject}\n\nDetail: ${formData.message}\nEmail: ${formData.email}\nNo HP: ${formData.phone || '-'}`;
    
    toast.success('Membuka chat konsultasi ke ' + consultant.fullName);
    window.open(getWhatsAppLink(consultant.waNumber, message), '_blank');
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
          Punya pertanyaan seputar layanan pembuatan website, template marketplace, atau penawaran kustom? Tim konsultan kami siap membantu secara gratis.
        </p>
      </FadeIn>

      {/* 2 Consultant Cards Featured Row */}
      <section className="container-main">
        <div className="text-center mb-8 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Konsultan Resmi BRaft.Dev
          </span>
          <h2 className="text-2xl font-bold font-display text-white">Hubungi Konsultan Kami Langsung</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {CONSULTANTS.map((c) => {
            const isPurple = c.color === 'purple';
            return (
              <HoverScale key={c.id}>
                <Card className={`p-6 sm:p-8 space-y-6 ${isPurple ? 'border-purple-500/40' : 'border-cyan-500/40'} relative overflow-hidden flex flex-col justify-between h-full`}>
                  <div className="space-y-4">
                    {/* Top Info */}
                    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl ${isPurple ? 'bg-purple-600' : 'bg-cyan-600'} text-white font-extrabold text-lg flex items-center justify-center shadow-lg`}>
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-base font-extrabold text-white">{c.fullName}</h3>
                          <p className="text-xs text-zinc-400 font-medium">@{c.handle}</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1 ${isPurple ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> {c.status}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed font-medium">{c.role}</p>

                    {/* Contacts List */}
                    <div className="space-y-2.5 pt-2 text-xs">
                      {/* WhatsApp */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/80 border border-white/10">
                        <div className="flex items-center gap-2.5 truncate pr-2">
                          <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="font-mono text-zinc-200 text-xs font-semibold">{c.phone}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(c.phone, `phone_${c.id}`, `Nomor WhatsApp ${c.name}`)}
                          className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                          title="Salin Nomor"
                        >
                          {copiedId === `phone_${c.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Gmail */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/80 border border-white/10">
                        <div className="flex items-center gap-2.5 truncate pr-2">
                          <Mail className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="font-mono text-zinc-200 text-xs font-semibold truncate">{c.email}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(c.email, `email_${c.id}`, `Email ${c.name}`)}
                          className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                          title="Salin Email"
                        >
                          {copiedId === `email_${c.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 1-Click Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                    <a
                      href={getWhatsAppLink(c.waNumber, `Halo ${c.name}! Saya ingin berkonsultasi mengenai pembuatan website BRaft.Dev.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" /> Chat WhatsApp
                    </a>
                    <a
                      href={getGmailLink(c.email, 'Konsultasi Website BRaft.Dev')}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs border border-white/10 transition-all cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-red-400" /> Kirim Gmail
                    </a>
                  </div>
                </Card>
              </HoverScale>
            );
          })}
        </div>
      </section>

      {/* Main Info & Form Section */}
      <section className="container-main grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Office & Operational Info Cards */}
        <SlideIn direction="left" className="lg:col-span-4 space-y-6">
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
                  <p className="text-sm font-bold text-white">Senin - Minggu: 08:00 - 23:00 WIB</p>
                </div>
              </div>
            </Card>
          </HoverScale>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-zinc-950 border border-purple-500/30 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> Butuh Respon Super Cepat?
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Pilih konsultan favorit Anda atau klik tombol di bawah untuk membuka form pemilihan konsultan instan.
            </p>
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={() => openConsultationModal()}
              leftIcon={<MessageSquare className="w-4 h-4" />}
            >
              Pilih Konsultan & Chat
            </Button>
          </div>
        </SlideIn>

        {/* Form Container */}
        <SlideIn direction="right" className="lg:col-span-8">
          <Card className="p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold font-display text-white">Formulir Pesan Konsultasi</h2>
              <p className="text-xs text-zinc-400 mt-1">Isi formulir di bawah untuk mengirimkan pesan WhatsApp terstruktur ke konsultan pilihan.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Preferred Consultant Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase">Pilih Konsultan Tujuan:</label>
                <div className="grid grid-cols-2 gap-3">
                  {CONSULTANTS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredConsultant: c.id })}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        formData.preferredConsultant === c.id
                          ? 'border-purple-500 bg-purple-500/15 text-white'
                          : 'border-white/10 bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{c.fullName}</div>
                        <div className="text-[10px] text-zinc-400">@{c.handle}</div>
                      </div>
                      {formData.preferredConsultant === c.id && (
                        <Check className="w-4 h-4 text-purple-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <Input
                  label={t('contact.name')}
                  placeholder="Nama Lengkap Anda"
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
                  placeholder="e.g. Website Company Profile / E-commerce"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase">{t('contact.message')}</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder="Tuliskan kebutuhan detail, target fitur, atau budget perkiraan proyek Anda..."
                  required
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button variant="primary" type="submit" rightIcon={<Send className="w-4 h-4" />}>
                  Kirim ke WhatsApp Konsultan
                </Button>
              </div>
            </form>
          </Card>
        </SlideIn>
      </section>
    </div>
  );
};
