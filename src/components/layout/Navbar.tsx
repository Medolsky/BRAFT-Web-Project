import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Menu,
  X,
  User as UserIcon,
  LayoutDashboard,
  LogOut,
  FolderGit2,
} from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useUIStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { BraftLogo } from '../ui/BraftLogo';

const EASE = [0.22, 1, 0.36, 1] as const;

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const cartItemsCount = useCartStore((state) => state.items.length);
  const { isMobileMenuOpen, setMobileMenuOpen, setCartDrawerOpen } = useUIStore();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.services'), path: '/services' },
    { label: t('nav.templates'), path: '/templates' },
    { label: t('nav.portfolio'), path: '/portfolio' },
    { label: t('nav.pricing'), path: '/pricing' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10 py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container-main relative flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="outline-none">
            <BraftLogo size="md" />
          </Link>

          {/* Centered Floating Pill Navigation — 21st.dev signature style */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-3 py-1 rounded-full text-xs font-medium transition-colors"
                >
                  {/* Animated active indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-zinc-950 font-semibold' : 'text-zinc-400 hover:text-white'}`}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Cart Trigger */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCartDrawerOpen(true)}
              className="relative p-2 rounded-full bg-white/[0.06] border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              title={t('nav.cart')}
            >
              <ShoppingBag className="w-4 h-4 text-purple-400" />
              <AnimatePresence>
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-500 text-white text-[9px] font-bold flex items-center justify-center"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Auth Buttons */}
            {isAuthenticated && user ? (
              <div className="relative group">
                <Link
                  to={
                    user.role === 'admin' || user.role === 'super_admin'
                      ? '/admin'
                      : user.role === 'seller'
                      ? '/seller'
                      : '/account'
                  }
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                    {user.fullName?.charAt(0) || 'U'}
                  </div>
                  <span className="truncate max-w-[90px]">{user.fullName}</span>
                </Link>

                {/* Animated Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl p-2 hidden group-hover:block backdrop-blur-xl">
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <p className="text-xs font-bold text-white truncate">{user.fullName}</p>
                    <p className="text-[10px] text-zinc-400 capitalize">{user.role}</p>
                  </div>
                  <Link
                    to="/account"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <UserIcon className="w-3.5 h-3.5" /> Dashboard Account
                  </Link>
                  {user.role === 'seller' && (
                    <Link
                      to="/seller"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <FolderGit2 className="w-3.5 h-3.5 text-orange-400" /> Seller Dashboard
                    </Link>
                  )}
                  {(user.role === 'admin' || user.role === 'super_admin') && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" /> Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" /> {t('nav.logout')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  {t('nav.login')}
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-all shadow-md inline-block"
                  >
                    {t('nav.getStarted')}
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/10 text-zinc-300 hover:text-white"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu — Animated slide-down */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed top-16 left-0 right-0 z-30 bg-[#09090b]/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden lg:hidden"
          >
            <nav className="container-main py-6 space-y-1">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, ease: EASE }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-white/10 text-white font-semibold'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="pt-4 border-t border-white/10 flex gap-3">
                <Link
                  to="/login"
                  className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 border border-white/10 hover:bg-white/5 transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors"
                >
                  {t('nav.getStarted')}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
