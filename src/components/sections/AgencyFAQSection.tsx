import React, { useState } from 'react';
import { YieldCard } from '../ui/yield-card';
import { Badge } from '../ui/Badge';
import { FadeIn } from '../ui/motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const FAQS: FAQItem[] = [
  {
    question: 'Berapa lama waktu pengerjaan proyek website di BRaft.Dev?',
    answer: 'Durasi pengerjaan bergantung pada kompleksitas proyek. Untuk Landing Page standar membutuhkan waktu 3-5 hari kerja, Company Profile 5-7 hari kerja, E-commerce 10-14 hari kerja, dan aplikasi web custom sekitar 14-20 hari kerja. Kami juga menyediakan opsi layanan Express untuk penyelesaian kilat.',
  },
  {
    question: 'Apakah biaya pembuatan website sudah termasuk domain & hosting?',
    answer: 'Ya, seluruh paket layanan jasa pembuatan website di BRaft.Dev sudah termasuk gratis pendaftaran nama domain pilihan (.com / .co.id) serta High-Speed Cloud Hosting dengan garansi uptime 99.9% selama 1 tahun penuh.',
  },
  {
    question: 'Bagaimana sistem pembayaran dan garansi pengerjaannya?',
    answer: 'Pembayaran dilakukan dengan skema DP (Down Payment) 50% di awal sebelum proyek dimulai, dan pelunasan 50% dilakukan setelah website selesai diuji coba & siap dirilis. Kami memberikan garansi revisi bebas hingga sesuai kesepakatan awal serta garansi refund 100% jika kami terlambat menyelesaikan proyek.',
  },
  {
    question: 'Apakah saya bisa mengubah atau menambah isi konten website sendiri?',
    answer: 'Tentu saja! Setiap website yang kami buat dilengkapi dengan modul Admin Dashboard atau CMS (Content Management System) yang intuitif. Kami juga memberikan video panduan serta pendampingan langsung agar tim Anda dapat mengelola produk, artikel, dan gambar dengan sangat mudah.',
  },
  {
    question: 'Apakah source code dan aset website sepenuhnya milik saya?',
    answer: '100% Milik Anda. Setelah proses pelunasan selesai, seluruh akses server, database, domain, dan berkas source code proyek akan diserahkan sepenuhnya kepada Anda tanpa ada biaya tersembunyi atau penguncian lisensi.',
  },
];

export const AgencyFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding relative">
      <div className="container-main max-w-4xl mx-auto space-y-10 relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="text-center space-y-4">
            <Badge variant="purple" className="mx-auto">
              <HelpCircle className="w-3.5 h-3.5 mr-1" /> Pertanyaan Populer
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
              Segala Hal yang Perlu Anda <em className="font-serif-italic text-purple-400 font-normal">Ketahui</em>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
              Jawaban transparan untuk pertanyaan yang sering diajukan calon klien sebelum memulai proyek jasa pembuatan website di BRaft.Dev.
            </p>
          </div>
        </FadeIn>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <YieldCard key={index} radius={18} className="p-0 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 group cursor-pointer transition-colors hover:bg-white/[0.02]"
                >
                  <span className="text-sm sm:text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zinc-300 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-purple-600 text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/10 pt-4">
                    {faq.answer}
                  </div>
                )}
              </YieldCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
