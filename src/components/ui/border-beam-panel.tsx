"use client";

import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface BorderBeamPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  beams?: 1 | 2;
  colors?: [string, string?];
  thickness?: number;
  idleSpeed?: number;
  hoverSpeed?: number;
  glow?: boolean;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * BorderBeamPanel — High Performance Yield-Card Inspired Gradient Border Panel
 * Combines YieldCard's linear-gradient(71deg, #110e0e, #a855f7, #00f2fe, #110e0e) base
 * with dynamic 60FPS laser beam rotation.
 */
export function BorderBeamPanel({
  children,
  beams = 2,
  colors,
  thickness = 2,
  idleSpeed = 42,
  hoverSpeed = 180,
  glow = true,
  radius = 24,
  className,
  style,
  ...props
}: BorderBeamPanelProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const currentSpeed = React.useRef(idleSpeed);
  const targetSpeed = React.useRef(idleSpeed);
  const angleRef = React.useRef(Math.random() * 360);

  React.useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();

    const updateAnimation = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      currentSpeed.current += (targetSpeed.current - currentSpeed.current) * 0.1;
      angleRef.current = (angleRef.current + currentSpeed.current * dt) % 360;

      if (rootRef.current) {
        rootRef.current.style.setProperty("--beam-angle", `${angleRef.current.toFixed(2)}deg`);
      }

      rafId = requestAnimationFrame(updateAnimation);
    };

    rafId = requestAnimationFrame(updateAnimation);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleMouseEnter = () => {
    targetSpeed.current = hoverSpeed;
  };

  const handleMouseLeave = () => {
    targetSpeed.current = idleSpeed;
  };

  const color1 = colors?.[0] || "#a855f7"; // Purple
  const color2 = colors?.[1] || "#00f2fe"; // Cyan

  const conicGradient = beams === 2
    ? `conic-gradient(from var(--beam-angle, 0deg) at 50% 50%, 
        transparent 0deg, 
        ${color1} 45deg, 
        #ffffff 55deg, 
        transparent 65deg, 
        transparent 180deg, 
        ${color2} 225deg, 
        #ffffff 235deg, 
        transparent 245deg, 
        transparent 360deg)`
    : `conic-gradient(from var(--beam-angle, 0deg) at 50% 50%, 
        transparent 0deg, 
        ${color1} 45deg, 
        #ffffff 55deg, 
        transparent 65deg, 
        transparent 360deg)`;

  return (
    <div
      ref={rootRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full border-2 border-transparent bg-gradient-to-br from-[#080509] via-[#1a171c] to-[#080509] p-6 group transition-all duration-300",
        className
      )}
      style={{
        borderRadius: `${radius}px`,
        backgroundClip: 'padding-box',
        isolation: "isolate",
        ...style,
      }}
      {...props}
    >
      {/* YieldCard Base Gradient Border Layer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] -z-10 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(71deg, #110e0e, #a855f7, #00f2fe, #110e0e)',
        }}
      />

      {/* Dynamic Rotating Conic Laser Beam Layer */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-[inherit] -z-10"
        style={{
          padding: `${thickness}px`,
          background: conicGradient,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Outer Glow Halo Layer */}
      {glow && (
        <div
          className="pointer-events-none absolute -inset-[2px] rounded-[inherit] -z-20 transition-opacity duration-300 opacity-40 group-hover:opacity-80"
          style={{
            background: conicGradient,
            filter: "blur(8px)",
          }}
        />
      )}

      {/* Inner Clean Content Area */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default BorderBeamPanel;
