import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Mail, Copy, Check, Sparkles, PhoneCall } from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';
import { CONSULTANTS, getWhatsAppLink, getGmailLink } from '../../config/consultants';
import toast from 'react-hot-toast';

export const ConsultationModal: React.FC = () => {
  const { isConsultationModalOpen, consultationMessage, closeConsultationModal } = useUIStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [customNote, setCustomNote] = useState('');

  const handleCopy = (text: string, id: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success(`${label} berhasil disalin!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWhatsApp = (waNumber: string) => {
    const finalMsg = customNote.trim()
      ? `${consultationMessage ? consultationMessage + '\n\nCatatan Tambahan: ' : ''}${customNote}`
      : consultationMessage;
    const link = getWhatsAppLink(waNumber, finalMsg);
    window.open(link, '_blank');
    closeConsultationModal();
  };

  const handleGmail = (email: string) => {
    const finalMsg = customNote.trim()
      ? `${consultationMessage ? consultationMessage + '\n\nCatatan: ' : ''}${customNote}`
      : consultationMessage;
    const link = getGmailLink(email, 'Konsultasi Proyek Website BRaft.Dev', finalMsg);
    window.open(link, '_blank');
    closeConsultationModal();
  };

  return (
    <AnimatePresence>
      {isConsultationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeConsultationModal}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-2xl bg-zinc-950 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-500/15 overflow-hidden z-10 space-y-6"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4 relative z-10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  Konsultasi Gratis 1-on-1
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white">
                  Pilih Konsultan Senior BRaft.Dev
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Hubungi langsung tim kami melalui WhatsApp atau Gmail untuk respons cepat & konsultasi gratis.
                </p>
              </div>
              <button
                onClick={closeConsultationModal}
                className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Context Message (if available) */}
            {consultationMessage && (
              <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/20 text-xs text-zinc-300 relative z-10">
                <span className="font-bold text-purple-300 block mb-1">Draf Proyek Anda:</span>
                <p className="line-clamp-2 text-zinc-400">{consultationMessage}</p>
              </div>
            )}

            {/* Consultants List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {CONSULTANTS.map((c) => {
                const isPurple = c.color === 'purple';
                const accentBorder = isPurple
                  ? 'border-purple-500/40 hover:border-purple-400'
                  : 'border-cyan-500/40 hover:border-cyan-400';
                const accentGlow = isPurple
                  ? 'shadow-purple-500/10'
                  : 'shadow-cyan-500/10';
                const badgeColor = isPurple
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
                const avatarBg = isPurple
                  ? 'bg-purple-600'
                  : 'bg-cyan-600';

                return (
                  <div
                    key={c.id}
                    className={`p-5 rounded-2xl bg-zinc-900/80 border ${accentBorder} shadow-lg ${accentGlow} transition-all duration-300 flex flex-col justify-between space-y-4 hover:translate-y-[-2px]`}
                  >
                    {/* Top Row: Avatar & Info */}
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-2xl ${avatarBg} text-white font-extrabold text-sm flex items-center justify-center shadow-md`}>
                            {c.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-white">{c.fullName}</h4>
                            <span className="text-[11px] text-zinc-400 font-medium">@{c.handle}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${badgeColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> {c.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug">{c.role}</p>
                    </div>

                    {/* Contact Details & Copy */}
                    <div className="space-y-2 pt-2 border-t border-white/5 text-xs">
                      {/* WhatsApp Info */}
                      <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/60 border border-white/5">
                        <div className="flex items-center gap-2 truncate pr-2">
                          <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="font-mono text-zinc-300 text-[11px]">{c.phone}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(c.phone, `phone_${c.id}`, `Nomor WhatsApp ${c.name}`)}
                          className="text-zinc-400 hover:text-white p-1"
                          title="Salin Nomor"
                        >
                          {copiedId === `phone_${c.id}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Gmail Info */}
                      <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/60 border border-white/5">
                        <div className="flex items-center gap-2 truncate pr-2">
                          <Mail className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span className="font-mono text-zinc-300 text-[11px] truncate">{c.email}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(c.email, `email_${c.id}`, `Email ${c.name}`)}
                          className="text-zinc-400 hover:text-white p-1"
                          title="Salin Email"
                        >
                          {copiedId === `email_${c.id}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        onClick={() => handleWhatsApp(c.waNumber)}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> Chat WA
                      </button>
                      <button
                        onClick={() => handleGmail(c.email)}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs border border-white/10 transition-all cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5 text-red-400" /> Gmail
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Optional Custom Note Input */}
            <div className="relative z-10 pt-2 border-t border-white/10">
              <input
                type="text"
                placeholder="Tulis pesan atau pertanyaan singkat (opsional)..."
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <p className="text-[11px] text-zinc-500 text-center relative z-10">
              ⚡ Konsultasi 100% Bebas Biaya & Tanpa Komitmen. Jam aktif: 08:00 - 23:00 WIB.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConsultationModal;
