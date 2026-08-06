import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'blue' | 'orange' | 'green' | 'red' | 'slate';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'md',
  className = '',
}) => {
  const variants = {
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    orange: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
    green: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    red: 'bg-red-500/10 text-red-300 border-red-500/20',
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px] font-medium',
    md: 'px-3 py-1 text-xs font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border backdrop-blur-md ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};
