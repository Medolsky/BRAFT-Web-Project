/**
 * Motion primitives — reusable Framer Motion animation wrappers
 * inspired by 21st.dev's fluid, scroll-triggered entrance animations.
 *
 * Usage:
 *   <FadeIn>  content fades + lifts into view on scroll  </FadeIn>
 *   <SlideIn direction="left">  slides from the left  </SlideIn>
 *   <StaggerContainer>
 *     <StaggerItem> card 1 </StaggerItem>
 *     <StaggerItem> card 2 </StaggerItem>
 *   </StaggerContainer>
 *   <ScaleIn>  pops in  </ScaleIn>
 *   <AnimatedCounter value={150} suffix="+" />
 */
import React from 'react';
import { motion, useInView, animate, type Variants } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Shared defaults                                                    */
/* ------------------------------------------------------------------ */

const VIEWPORT = { once: true, margin: '-60px' } as const;
const EASE = [0.22, 1, 0.36, 1] as const; // cubic-bezier like 21st.dev

/* ------------------------------------------------------------------ */
/*  FadeIn — fade + vertical lift                                      */
/* ------------------------------------------------------------------ */

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  y = 30,
  className = '',
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={VIEWPORT}
    transition={{ duration, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ------------------------------------------------------------------ */
/*  SlideIn — directional slide                                        */
/* ------------------------------------------------------------------ */

interface SlideInProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 60,
  className = '',
}) => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const sign = direction === 'right' || direction === 'down' ? 1 : -1;
  const initial = { opacity: 0, [axis]: sign * distance };
  const animate = { opacity: 1, [axis]: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  StaggerContainer + StaggerItem — cascading entrance                */
/* ------------------------------------------------------------------ */

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer: React.FC<StaggerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
}) => (
  <motion.div
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: staggerDelay, delayChildren: 0.05 } },
    }}
    initial="hidden"
    whileInView="show"
    viewport={VIEWPORT}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <motion.div variants={staggerChild} className={className}>
    {children}
  </motion.div>
);

/* ------------------------------------------------------------------ */
/*  ScaleIn — pop / zoom entrance                                      */
/* ------------------------------------------------------------------ */

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.88 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={VIEWPORT}
    transition={{ duration, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ------------------------------------------------------------------ */
/*  TextReveal — word-by-word or character reveal                      */
/* ------------------------------------------------------------------ */

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  as: Tag = 'h2',
}) => {
  const words = children.split(' ');
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.4, delay: delay + i * 0.04, ease: EASE }}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
};

/* ------------------------------------------------------------------ */
/*  AnimatedCounter — number that counts up on scroll                  */
/* ------------------------------------------------------------------ */

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  decimals = 0,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => ctrl.stop();
  }, [isInView, value, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  FloatingElement — ambient float / bob                              */
/* ------------------------------------------------------------------ */

interface FloatingProps {
  children: React.ReactNode;
  amplitude?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export const FloatingElement: React.FC<FloatingProps> = ({
  children,
  amplitude = 12,
  duration = 4,
  delay = 0,
  className = '',
}) => (
  <motion.div
    animate={{ y: [-amplitude, amplitude, -amplitude] }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
      delay,
    }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ------------------------------------------------------------------ */
/*  GlowPulse — subtle pulsing glow                                   */
/* ------------------------------------------------------------------ */

export const GlowPulse: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <motion.div
    animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1.02, 0.98] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ------------------------------------------------------------------ */
/*  HoverScale — interactive hover lift                                */
/* ------------------------------------------------------------------ */

export const HoverScale: React.FC<{ children: React.ReactNode; className?: string; scale?: number }> = ({
  children,
  className = '',
  scale = 1.03,
}) => (
  <motion.div
    whileHover={{ scale, y: -4 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ------------------------------------------------------------------ */
/*  ParallaxLayer — subtle scroll parallax                             */
/* ------------------------------------------------------------------ */

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxLayer: React.FC<ParallaxProps> = ({
  children,
  speed = 0.3,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const screenCenter = window.innerHeight / 2;
      setOffset((center - screenCenter) * speed * -0.1);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y: offset }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
