// components/LogoLoader.tsx
import { useId } from "react";
import Logo from "../components/logo";

type LogoLoaderProps = {
  size?: number;
  label?: string;
  showLabel?: boolean;
  className?: string;
  logoScale?: number;
};

export default function LogoLoader({
  size = 72,
  label = "Loading…",
  showLabel = true,
  className = "",
  logoScale = 0.65,
}: LogoLoaderProps) {
  const gradientId = useId();
  const glowId = useId();

  const strokeWidth = 2;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const logoSize = Math.round(size * logoScale);

  return (
    <div className={`inline-flex flex-col items-center gap-4 ${className}`}>
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
        role="status"
        aria-live="polite"
        aria-label={label}
      >
        {/* Background energy field */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        {/* Precision SVG Loader */}
        <svg
          className="absolute inset-0 -rotate-90 motion-safe:animate-[orbit_1.6s_linear_infinite]"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden
        >
          {/* Subtle track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-white/[0.06]"
          />

          {/* Energy arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.7}
            strokeLinecap="round"
            filter={`url(#${glowId})`}
          />

          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="40%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="70%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="white" />
            </linearGradient>

            <filter id={glowId}>
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Center Logo */}
        <div
          className="relative z-10 flex items-center justify-center motion-safe:animate-[breathe_3s_ease-in-out_infinite]"
          style={{ width: logoSize, height: logoSize }}
        >
          <Logo />
        </div>
      </div>

      {/* Premium Animated Label */}
      {showLabel && (
        <span className="text-lg font-medium tracking-[0.2em] uppercase text-white/60 motion-safe:animate-[labelFade_2.8s_ease-in-out_infinite]">
          {label}
        </span>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.06);
            opacity: 1;
          }
        }

        /* Premium text animation */
        @keyframes labelFade {
          0%, 100% {
            opacity: 0.5;
            letter-spacing: 0.2em;
          }
          50% {
            opacity: 1;
            letter-spacing: 0.24em;
          }
        }
      `}</style>
    </div>
  );
}