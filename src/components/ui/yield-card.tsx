import React from 'react';

export interface YieldCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  radius?: number;
  className?: string;
}

export const YieldCard: React.FC<YieldCardProps> = ({
  children,
  title,
  description,
  icon,
  radius = 20,
  className = '',
  style,
  ...props
}) => {
  const hasExplicitPadding = className.split(' ').some(
    (c) =>
      c.startsWith('p-') ||
      c.startsWith('px-') ||
      c.startsWith('py-') ||
      c.startsWith('p-[') ||
      c.includes(':p-')
  );

  const paddingClass = hasExplicitPadding ? '' : 'p-6 sm:p-8';

  return (
    <div
      className={`relative w-full bg-[#09090b] text-white border-2 border-purple-600/50 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/20 ${paddingClass} ${className}`}
      style={{
        borderRadius: `${radius}px`,
        ...style,
      }}
      {...props}
    >
      {children ? (
        children
      ) : (
        <div className="space-y-4">
          {icon && <div className="mb-4">{icon}</div>}
          {title && (
            <p className="font-semibold text-white tracking-tight text-xl sm:text-2xl">
              {title}
            </p>
          )}
          {description && (
            <p className="font-normal text-zinc-400 text-sm leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default YieldCard;
