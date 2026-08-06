import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, ArrowRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

export const FAQPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apa perbedaan antara Jasa Pembuatan Website dan Template Marketplace?',
      a: 'Jasa Pembuatan Website adalah layanan agency di mana tim kami pengerjakan proyek secara turnkey dari konsultasi hingga peluncuran. Sementara Template Marketplace memungkinkan Anda membeli source code yang sudah jadi untuk di-host dan disesuaikan sendiri.',
    },
    {
      q: 'Bagaimana prosedur revisi untuk proyek pembuatan website?',
      a: 'Setiap paket layanan mencakup kuota revisi (misal: 2x hingga unlimited). Revisi dapat diajukan secara mudah melalui Dashboard Klien dengan mencantumkan catatan detail.',
    },
    {
      q: 'Apakah template yang dibeli mendapatkan akses update gratis?',
      a: 'Ya! Setiap pembelian template sudah mencakup update versi secara gratis yang dapat diunduh langsung dari menu Downloads di dashboard akun Anda.',
    },
    {
      q: 'Metode pembayaran apa saja yang didukung?',
      a: 'Kami menerima pembayaran otomatis via QRIS (Gopay, OVO, Dana, LinkAja), Transfer Bank Virtual Account (BCA, Mandiri, BNI, BRI), Kartu Kredit, dan Indomaret/Alfamart via Midtrans.',
    },
    {
      q: 'Bagaimana cara mendaftar sebagai Seller Template?',
      a: 'Anda cukup mendaftar akun biasa, lalu membuka menu Seller Dashboard untuk melengkapi profil kreator Anda. Setelah verifikasi, Anda dapat mengunggah karya template Anda.',
    },
  ];

  const filteredFaqs = faqs.filter((item) =>
    item.q.toLowerCase().includes(search.toLowerCase()) ||
    item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-16 pb-20 pt-8">
      {/* Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto container-main">
        <Badge variant="purple">Pertanyaan Umum</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-white">
          Frequently Asked <span className="gradient-text">Questions (FAQ)</span>
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Temukan jawaban atas pertanyaan seputar pemesanan jasa, pembelian template, lisensi, dan pembayaran.
        </p>
      </section>

      <section className="container-main max-w-3xl space-y-8">
        <Input
          placeholder="Cari pertanyaan Anda di sini..."
          leftIcon={<Search className="w-4 h-4" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Card key={index} className="p-0 overflow-hidden cursor-pointer" onClick={() => setOpenIndex(isOpen ? null : index)}>
                <div className="p-5 flex items-center justify-between gap-4 bg-slate-900/80 hover:bg-slate-800/50 transition-colors">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" />
                    {faq.q}
                  </h3>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                {isOpen && (
                  <div className="p-5 pt-0 bg-slate-900/40 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <Card className="text-center p-8 space-y-4 bg-purple-900/10 border-purple-500/20">
          <h3 className="text-base font-bold text-white">Tidak menemukan jawaban yang Anda cari?</h3>
          <p className="text-xs text-slate-400">Tim customer support kami siap membantu menjawab semua pertanyaan Anda.</p>
          <Link to="/contact">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Hubungi Support
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
};
