'use client';
import React, {
  memo,
  ReactNode,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  forwardRef,
} from 'react';
import {
  motion,
  useAnimation,
  useInView,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper component to replace next/image in Vite/React
const Image = ({
  src,
  alt = '',
  width,
  height,
  className,
}: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}) => (
  <img src={src} alt={alt} width={width} height={height} className={className} />
);

// ==================== Input Component ====================

const Input = memo(
  forwardRef(function Input(
    { className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) {
    const radius = 100;
    const [visible, setVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
      currentTarget,
      clientX,
      clientY,
    }: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          rgba(168, 85, 247, 0.4),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-xl p-[1px] transition duration-300"
      >
        <input
          type={type}
          className={cn(
            `flex h-11 w-full rounded-xl border border-white/10 bg-zinc-900/90 px-3.5 py-2 text-sm text-white transition duration-300 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:border-purple-500 disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  })
);

Input.displayName = 'Input';

// ==================== BoxReveal Component ====================

type BoxRevealProps = {
  children: ReactNode;
  width?: string;
  boxColor?: string;
  duration?: number;
  overflow?: string;
  position?: string;
  className?: string;
};

const BoxReveal = memo(function BoxReveal({
  children,
  width = 'fit-content',
  boxColor,
  duration,
  overflow = 'hidden',
  position = 'relative',
  className,
}: BoxRevealProps) {
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      slideControls.start('visible');
      mainControls.start('visible');
    } else {
      slideControls.start('hidden');
      mainControls.start('hidden');
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <section
      ref={ref}
      style={{
        position: position as
          | 'relative'
          | 'absolute'
          | 'fixed'
          | 'sticky'
          | 'static',
        width,
        overflow,
      }}
      className={className}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: duration ?? 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{ hidden: { left: 0 }, visible: { left: '100%' } }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: duration ?? 0.5, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor ?? '#a855f7',
          borderRadius: 4,
        }}
      />
    </section>
  );
});

// ==================== Ripple Component ====================

type RippleProps = {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
};

const Ripple = memo(function Ripple({
  mainCircleSize = 120,
  mainCircleOpacity = 0.15,
  numCircles = 8,
  className = '',
}: RippleProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:linear-gradient(to_bottom,white,transparent)]',
        className
      )}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 65;
        const opacity = Math.max(0.02, mainCircleOpacity - i * 0.015);
        const animationDelay = `${i * 0.06}s`;

        return (
          <span
            key={i}
            className="absolute animate-ripple rounded-full border border-white/10"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              animationDelay: animationDelay,
              borderWidth: '1px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </div>
  );
});

// ==================== OrbitingCircles Component ====================

type OrbitingCirclesProps = {
  className?: string;
  iconClassName?: string;
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  startAngle?: number;
  radius?: number;
  path?: boolean;
};

const OrbitingCircles = memo(function OrbitingCircles({
  iconClassName,
  children,
  reverse = false,
  duration = 20,
  startAngle = 0,
  radius = 100,
  path = true,
}: OrbitingCirclesProps) {
  const start = startAngle;
  const end = reverse ? start - 360 : start + 360;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {/* SVG Orbit Path Line */}
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <circle
            className="stroke-white/20 stroke-1"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeDasharray="4 4"
          />
        </svg>
      )}

      {/* Orbiting Rotating Container */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        animate={{ rotate: [start, end] }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Offset Wrapper displaced by radius along Y axis */}
        <div
          style={{ transform: `translateY(-${radius}px)` }}
          className="pointer-events-auto absolute flex items-center justify-center"
        >
          {/* Counter-rotation to keep logo upright */}
          <motion.div
            animate={{ rotate: [-start, -end] }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: 'linear',
            }}
            className={cn('flex items-center justify-center', iconClassName)}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
});

// ==================== TechOrbitDisplay Component ====================

type IconConfig = {
  className?: string;
  duration?: number;
  startAngle?: number;
  radius?: number;
  path?: boolean;
  reverse?: boolean;
  component: () => React.ReactNode;
};

type TechnologyOrbitDisplayProps = {
  iconsArray: IconConfig[];
  text?: string;
};

const TechOrbitDisplay = memo(function TechOrbitDisplay({
  iconsArray,
  text = 'Animated Login',
}: TechnologyOrbitDisplayProps) {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg">
      {/* Center Text */}
      <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-center text-5xl md:text-6xl font-extrabold leading-none text-transparent tracking-tight drop-shadow-md">
        {text}
      </span>

      {/* Orbiting Icons */}
      {iconsArray.map((icon, index) => (
        <OrbitingCircles
          key={index}
          iconClassName={icon.className}
          duration={icon.duration || 20}
          startAngle={icon.startAngle || 0}
          radius={icon.radius || 100}
          path={icon.path !== false}
          reverse={icon.reverse || false}
        >
          {icon.component()}
        </OrbitingCircles>
      ))}
    </section>
  );
});

// ==================== AnimatedForm Component ====================

type FieldType = 'text' | 'email' | 'password';

type Field = {
  label: string;
  required?: boolean;
  type: FieldType;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

type AnimatedFormProps = {
  header: string;
  subHeader?: string;
  fields: Field[];
  submitButton: string;
  textVariantButton?: string;
  errorField?: string;
  fieldPerRow?: number;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  googleLogin?: string;
  goTo?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type Errors = {
  [key: string]: string;
};

const AnimatedForm = memo(function AnimatedForm({
  header,
  subHeader,
  fields,
  submitButton,
  textVariantButton,
  errorField,
  fieldPerRow = 1,
  onSubmit,
  googleLogin,
  goTo,
}: AnimatedFormProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const toggleVisibility = () => setVisible(!visible);

  const validateForm = (event: FormEvent<HTMLFormElement>) => {
    const currentErrors: Errors = {};
    fields.forEach((field) => {
      const value = (event.target as HTMLFormElement)[field.label]?.value;

      if (field.required && !value) {
        currentErrors[field.label] = `${field.label} is required`;
      }

      if (field.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
        currentErrors[field.label] = 'Invalid email address';
      }

      if (field.type === 'password' && value && value.length < 6) {
        currentErrors[field.label] =
          'Password must be at least 6 characters long';
      }
    });
    return currentErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formErrors = validateForm(event);

    if (Object.keys(formErrors).length === 0) {
      onSubmit(event);
      console.log('Form submitted');
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <section className="max-md:w-full flex flex-col gap-4 w-full max-w-sm mx-auto">
      <BoxReveal boxColor="#a855f7" duration={0.3}>
        <h2 className="font-bold text-3xl text-white font-display">
          {header}
        </h2>
      </BoxReveal>

      {subHeader && (
        <BoxReveal boxColor="#a855f7" duration={0.3} className="pb-2">
          <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
            {subHeader}
          </p>
        </BoxReveal>
      )}

      {googleLogin && (
        <>
          <BoxReveal
            boxColor="#a855f7"
            duration={0.3}
            overflow="visible"
            width="unset"
          >
            <button
              className="group/btn bg-zinc-900/90 hover:bg-zinc-800/90 w-full rounded-xl border border-white/10 h-10 font-medium outline-hidden hover:cursor-pointer transition-colors"
              type="button"
              onClick={() => console.log('Google login clicked')}
            >
              <span className="flex items-center justify-center w-full h-full gap-3 text-xs font-semibold text-white">
                <Image
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  width={22}
                  height={22}
                  alt="Google Icon"
                />
                {googleLogin}
              </span>

              <BottomGradient />
            </button>
          </BoxReveal>

          <BoxReveal boxColor="#a855f7" duration={0.3} width="100%">
            <section className="flex items-center gap-4 my-1">
              <hr className="flex-1 border-t border-dashed border-zinc-800" />
              <p className="text-zinc-500 text-xs font-medium uppercase">
                or
              </p>
              <hr className="flex-1 border-t border-dashed border-zinc-800" />
            </section>
          </BoxReveal>
        </>
      )}

      <form onSubmit={handleSubmit}>
        <section
          className={`grid grid-cols-1 md:grid-cols-${fieldPerRow} mb-4 gap-4`}
        >
          {fields.map((field) => (
            <section key={field.label} className="flex flex-col gap-2">
              <BoxReveal boxColor="#a855f7" duration={0.3}>
                <Label htmlFor={field.label}>
                  {field.label} <span className="text-purple-400">*</span>
                </Label>
              </BoxReveal>

              <BoxReveal
                width="100%"
                boxColor="#a855f7"
                duration={0.3}
                className="flex flex-col space-y-2 w-full"
              >
                <section className="relative">
                  <Input
                    type={
                      field.type === 'password'
                        ? visible
                          ? 'text'
                          : 'password'
                        : field.type
                    }
                    id={field.label}
                    name={field.label}
                    placeholder={field.placeholder}
                    onChange={field.onChange}
                  />

                  {field.type === 'password' && (
                    <button
                      type="button"
                      onClick={toggleVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-zinc-400 hover:text-white"
                    >
                      {visible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </section>

                <section className="h-3">
                  {errors[field.label] && (
                    <p className="text-red-400 text-xs">
                      {errors[field.label]}
                    </p>
                  )}
                </section>
              </BoxReveal>
            </section>
          ))}
        </section>

        <BoxReveal width="100%" boxColor="#a855f7" duration={0.3}>
          {errorField && (
            <p className="text-red-400 text-xs mb-4">{errorField}</p>
          )}
        </BoxReveal>

        <BoxReveal
          width="100%"
          boxColor="#a855f7"
          duration={0.3}
          overflow="visible"
        >
          <button
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500
            block text-white rounded-xl h-11 text-xs font-semibold shadow-lg shadow-purple-500/25
            outline-hidden hover:cursor-pointer w-full transition-all"
            type="submit"
          >
            {submitButton} &rarr;
            <BottomGradient />
          </button>
        </BoxReveal>

        {textVariantButton && goTo && (
          <BoxReveal boxColor="#a855f7" duration={0.3}>
            <section className="mt-3 text-center hover:cursor-pointer">
              <button
                type="button"
                className="text-xs text-purple-400 hover:underline outline-hidden font-medium"
                onClick={goTo}
              >
                {textVariantButton}
              </button>
            </section>
          </BoxReveal>
        )}
      </form>
    </section>
  );
});

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    </>
  );
};

// ==================== AuthTabs Component ====================

interface AuthTabsProps {
  formFields: {
    header: string;
    subHeader?: string;
    fields: Array<{
      label: string;
      required?: boolean;
      type: 'text' | 'email' | 'password';
      placeholder: string;
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }>;
    submitButton: string;
    textVariantButton?: string;
  };
  goTo: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const AuthTabs = memo(function AuthTabs({
  formFields,
  goTo,
  handleSubmit,
}: AuthTabsProps) {
  return (
    <div className="flex max-lg:justify-center w-full md:w-auto">
      {/* Right Side */}
      <div className="w-full lg:w-1/2 min-h-[80vh] flex flex-col justify-center items-center max-lg:px-[5%]">
        <AnimatedForm
          {...formFields}
          fieldPerRow={1}
          onSubmit={handleSubmit}
          goTo={goTo}
          googleLogin="Login with Google"
        />
      </div>
    </div>
  );
});

// ==================== Label Component ====================

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

const Label = memo(function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'text-xs font-semibold text-zinc-300 uppercase tracking-wider',
        className
      )}
      {...props}
    />
  );
});

// ==================== Exports ====================

export {
  Input,
  BoxReveal,
  Ripple,
  OrbitingCircles,
  TechOrbitDisplay,
  AnimatedForm,
  AuthTabs,
  Label,
  BottomGradient,
};
