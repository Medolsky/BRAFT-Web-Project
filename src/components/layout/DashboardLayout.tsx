import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  ShoppingBag,
  FolderGit2,
  Bell,
  CreditCard,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { BraftLogo } from '../ui/BraftLogo';

export const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const sidebarLinks = [
    { label: 'Overview', path: '/account', icon: LayoutDashboard },
    { label: 'Projects', path: '/account/projects', icon: FolderGit2 },
    { label: 'Purchases', path: '/account/purchases', icon: ShoppingBag },
    { label: 'Notifications', path: '/account/notifications', icon: Bell },
    { label: 'Profile', path: '/account/profile', icon: User },
    { label: 'Billing', path: '/account/billing', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/50 border-r border-slate-800 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-6">
          <Link to="/">
            <BraftLogo size="md" />
          </Link>

          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.fullName || 'User'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
