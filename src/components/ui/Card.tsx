import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  radius?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  glass = false,
  hoverable = true,
  padding = 'md',
  radius = 20,
  className = '',
  style,
  ...props
}) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hasExplicitPadding = className.split(' ').some(
    (c) =>
      c.startsWith('p-') ||
      c.startsWith('px-') ||
      c.startsWith('py-') ||
      c.startsWith('p-[') ||
      c.includes(':p-')
  );

  const paddingClass = hasExplicitPadding ? '' : paddings[padding];
  const hoverStyles = hoverable
    ? 'hover:-translate-y-1 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/20'
    : '';

  return (
    <div
      className={`relative w-full bg-[#09090b] text-white border-2 border-purple-600/50 transition-all duration-300 ${paddingClass} ${hoverStyles} ${className}`}
      style={{
        borderRadius: `${radius}px`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
