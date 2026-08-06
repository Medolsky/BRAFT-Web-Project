import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Store,
  FileCheck,
  FolderGit2,
  ShoppingBag,
  DollarSign,
  MessageSquare,
  Ticket,
  Star,
  Tag,
  FileText,
  BarChart,
  ShieldCheck,
  Settings,
  ArrowLeft,
} from 'lucide-react';
import { BraftLogo } from '../ui/BraftLogo';

export const AdminLayout: React.FC = () => {
  const location = useLocation();

  const adminLinks = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Users', path: '/admin/users', icon: Users },
    { label: 'Sellers', path: '/admin/sellers', icon: Store },
    { label: 'Template Moderation', path: '/admin/templates', icon: FileCheck },
    { label: 'Service Projects', path: '/admin/projects', icon: FolderGit2 },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Transactions', path: '/admin/payments', icon: DollarSign },
    { label: 'Live Chat', path: '/admin/chat', icon: MessageSquare },
    { label: 'Support Tickets', path: '/admin/tickets', icon: Ticket },
    { label: 'Reviews', path: '/admin/reviews', icon: Star },
    { label: 'Coupons', path: '/admin/coupons', icon: Tag },
    { label: 'Content (CMS)', path: '/admin/content', icon: FileText },
    { label: 'Reports', path: '/admin/reports', icon: BarChart },
    { label: 'Audit Logs', path: '/admin/audit', icon: ShieldCheck },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/90 border-r border-slate-800 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-6">
          <Link to="/">
            <BraftLogo size="md" />
          </Link>

          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-200px)] pr-1">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
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

        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white pt-4 border-t border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Main Website
        </Link>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
