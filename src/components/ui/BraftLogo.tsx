import React from 'react';

interface BraftLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const BraftLogo: React.FC<BraftLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const logoHeights = {
    sm: 'h-12 sm:h-14',
    md: 'h-16 sm:h-20',
    lg: 'h-24 sm:h-32',
  };

  const textSizes = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-4xl sm:text-5xl',
  };

  return (
    <div className={`inline-flex items-center gap-4 group ${className}`}>
      {/* Official BRaft.Dev Pure Frameless Purple Metallic 3D Infinity Logo */}
      <img
        src="/braft-logo.png"
        alt="BRaft.Dev Pure Logo"
        className={`${logoHeights[size]} w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.35)]`}
      />

      {showText && (
        <div className="flex flex-col text-left">
          <span className={`font-extrabold tracking-tight text-white font-display ${textSizes[size]}`}>
            BRaft<span className="text-purple-400">.Dev</span>
          </span>
          <span className="text-[11px] sm:text-[12px] text-purple-300/80 tracking-widest uppercase font-extrabold -mt-1">
            Digital Marketplace
          </span>
        </div>
      )}
    </div>
  );
};

export default BraftLogo;
