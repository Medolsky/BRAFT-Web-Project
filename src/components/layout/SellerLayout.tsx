import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Clock,
  TrendingUp,
  ShoppingBag,
  Star,
  Tag,
  BarChart3,
  Wallet,
  User,
  Settings,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

export const SellerLayout: React.FC = () => {
  const location = useLocation();

  const sellerLinks = [
    { label: 'Overview', path: '/seller', icon: LayoutDashboard },
    { label: 'My Templates', path: '/seller/templates', icon: Package },
    { label: 'Add Template', path: '/seller/add-template', icon: PlusCircle },
    { label: 'Review Status', path: '/seller/review-status', icon: Clock },
    { label: 'Sales & Revenue', path: '/seller/sales', icon: TrendingUp },
    { label: 'Orders', path: '/seller/orders', icon: ShoppingBag },
    { label: 'Reviews', path: '/seller/reviews', icon: Star },
    { label: 'Coupons', path: '/seller/coupons', icon: Tag },
    { label: 'Analytics', path: '/seller/analytics', icon: BarChart3 },
    { label: 'Payouts', path: '/seller/payouts', icon: Wallet },
    { label: 'Seller Profile', path: '/seller/profile', icon: User },
    { label: 'Settings', path: '/seller/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/80 border-r border-slate-800 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                </div>
              </div>
              <div>
                <span className="font-bold text-white font-display">Seller Center</span>
              </div>
            </Link>
          </div>

          <nav className="space-y-1">
            {sellerLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
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

        <Link
          to="/account"
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white pt-4 border-t border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" /> Back to User Account
        </Link>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
