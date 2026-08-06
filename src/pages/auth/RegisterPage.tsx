import React from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FadeIn, ScaleIn } from '../../components/ui/motion';

import { BraftLogo } from '../../components/ui/BraftLogo';

export const RegisterPage: React.FC = () => {
  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* 21st.dev Mesh Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header Branding */}
        <FadeIn className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center justify-center mb-2">
            <BraftLogo size="lg" />
          </Link>
          <h1 className="text-2xl font-bold font-display text-white">
            Buat <em className="font-serif-italic text-purple-400 font-normal">Akun Baru</em>
          </h1>
          <p className="text-xs text-zinc-400">Bergabung dengan platform digital agency & marketplace</p>
        </FadeIn>

        <ScaleIn delay={0.15}>
          <div className="card-21st p-6 sm:p-8 space-y-6">
            {/* Social Auth Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-zinc-200 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.30 0-.8.1-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z" />
                  <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 17C3.7 20.7 7.5 24 12 24z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-zinc-200 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <span className="w-full border-t border-white/10" />
              <span className="absolute bg-[#09090b] px-3 text-[11px] uppercase tracking-wider text-zinc-500">
                atau via email
              </span>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input label="Nama Lengkap" placeholder="John Doe" required />
              <Input label="Email" type="email" placeholder="nama@email.com" required />
              <Input label="Password" type="password" placeholder="••••••••" required />
              <Input label="Konfirmasi Password" type="password" placeholder="••••••••" required />

              <div className="text-xs text-zinc-400">
                Dengan mendaftar, Anda menyetujui{' '}
                <Link to="/terms" className="text-purple-400 hover:underline">
                  Syarat & Ketentuan
                </Link>{' '}
                serta{' '}
                <Link to="/privacy" className="text-purple-400 hover:underline">
                  Kebijakan Privasi
                </Link>
                .
              </div>

              <Button variant="primary" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Daftar Akun
              </Button>
            </form>

            <div className="text-center text-xs text-zinc-400 pt-2 border-t border-white/10">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-purple-400 hover:underline font-semibold">
                Masuk di sini
              </Link>
            </div>
          </div>
        </ScaleIn>
      </div>
    </div>
  );
};
