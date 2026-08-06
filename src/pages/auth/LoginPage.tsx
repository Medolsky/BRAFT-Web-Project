import React, { useState, ChangeEvent, FormEvent, ReactNode } from 'react';
import { BraftLogo } from '@/components/ui/BraftLogo';
import { Link, useNavigate } from 'react-router-dom';
import {
  Ripple,
  TechOrbitDisplay,
  AnimatedForm,
} from '@/components/ui/modern-animated-sign-in';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';

interface OrbitIcon {
  component: () => ReactNode;
  className: string;
  duration?: number;
  startAngle?: number;
  radius?: number;
  path?: boolean;
  reverse?: boolean;
}

const iconsArray: OrbitIcon[] = [
  {
    component: () => (
      <img
        width={32}
        height={32}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
        alt="HTML5"
      />
    ),
    className: 'size-[32px] border-none bg-transparent',
    duration: 16,
    startAngle: 0,
    radius: 75,
    path: true,
    reverse: false,
  },
  {
    component: () => (
      <img
        width={32}
        height={32}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
        alt="CSS3"
      />
    ),
    className: 'size-[32px] border-none bg-transparent',
    duration: 16,
    startAngle: 180,
    radius: 75,
    path: true,
    reverse: false,
  },
  {
    component: () => (
      <img
        width={36}
        height={36}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
        alt="TailwindCSS"
      />
    ),
    className: 'size-[36px] border-none bg-transparent',
    duration: 22,
    startAngle: 0,
    radius: 120,
    path: true,
    reverse: true,
  },
  {
    component: () => (
      <img
        width={36}
        height={36}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
        alt="Nextjs"
      />
    ),
    className: 'size-[36px] border-none bg-transparent p-1 bg-white/10 rounded-full',
    duration: 22,
    startAngle: 180,
    radius: 120,
    path: true,
    reverse: true,
  },
  {
    component: () => (
      <img
        width={40}
        height={40}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
        alt="TypeScript"
      />
    ),
    className: 'size-[40px] border-none bg-transparent',
    duration: 28,
    startAngle: 90,
    radius: 170,
    path: true,
    reverse: false,
  },
  {
    component: () => (
      <img
        width={40}
        height={40}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
        alt="JavaScript"
      />
    ),
    className: 'size-[40px] border-none bg-transparent',
    duration: 28,
    startAngle: 270,
    radius: 170,
    path: true,
    reverse: false,
  },
  {
    component: () => (
      <img
        width={44}
        height={44}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
        alt="React"
      />
    ),
    className: 'size-[44px] border-none bg-transparent',
    duration: 34,
    startAngle: 45,
    radius: 215,
    path: true,
    reverse: true,
  },
  {
    component: () => (
      <img
        width={44}
        height={44}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"
        alt="Figma"
      />
    ),
    className: 'size-[44px] border-none bg-transparent',
    duration: 34,
    startAngle: 225,
    radius: 215,
    path: true,
    reverse: true,
  },
];

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    name: 'email' | 'password'
  ) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const email = formData.email.toLowerCase();
      const role = email.includes('admin')
        ? 'admin'
        : email.includes('seller')
        ? 'seller'
        : 'user';

      setUser({
        id: `usr_${role}`,
        email: formData.email || 'admin@braft.dev',
        fullName:
          role === 'admin'
            ? 'Super Admin BRaft.Dev'
            : role === 'seller'
            ? 'Mitra Penjual BRaft.Dev'
            : 'Klien BRaft.Dev',
        role: role,
        isEmailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      toast.success(`Selamat datang kembali, ${role.toUpperCase()} BRaft.Dev!`);

      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'seller') {
        navigate('/seller');
      } else {
        navigate('/account');
      }
    } catch {
      toast.error('Gagal masuk. Periksa email dan kata sandi Anda.');
    }
  };

  const goToForgotPassword = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    event.preventDefault();
    navigate('/forgot-password');
  };

  const formFields = {
    header: 'Masuk ke BRaft.Dev',
    subHeader: 'Akses dashboard pelanggan, penjual, dan manajemen proyek agency',
    fields: [
      {
        label: 'Email',
        required: true,
        type: 'email' as const,
        placeholder: 'Masukkan email Anda (e.g. user@braft.dev)',
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'email'),
      },
      {
        label: 'Password',
        required: true,
        type: 'password' as const,
        placeholder: 'Masukkan password Anda',
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'password'),
      },
    ],
    submitButton: 'Masuk Sekarang',
    textVariantButton: 'Lupa Password?',
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-10 px-4">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Side — Orbit & Ripple Interactive Showcase */}
        <div className="lg:col-span-6 relative h-[500px] max-lg:hidden flex flex-col justify-center items-center rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
          <Ripple mainCircleSize={120} mainCircleOpacity={0.15} numCircles={8} />
          <TechOrbitDisplay iconsArray={iconsArray} text="BRaft.Dev" />
        </div>

        {/* Right Side — Animated Form */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4">
          <div className="mb-6 text-center space-y-2">
            <Link to="/">
              <BraftLogo size="lg" />
            </Link>
          </div>

          <div className="w-full max-w-md bg-zinc-950/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <AnimatedForm
              {...formFields}
              fieldPerRow={1}
              onSubmit={handleSubmit}
              goTo={goToForgotPassword}
              googleLogin="Masuk dengan Google"
            />

            <div className="mt-6 text-center text-xs text-zinc-400 pt-4 border-t border-white/10">
              Belum punya akun?{' '}
              <Link to="/register" className="text-purple-400 hover:underline font-semibold">
                Daftar Akun Baru
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
