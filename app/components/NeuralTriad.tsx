"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type NeuralTriadProps = {
  size?: number; // overall square size
  images?: [string, string, string]; // 3 neuron images
  className?: string;
};

export default function NeuralTriad({
  size = 360,
  images = [
    // feel free to swap these with your own
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=512&q=80", // AI / abstract
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=512&q=80", // cyber
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=512&q=80", // code
  ],
  className = "",
}: NeuralTriadProps) {
  const reduceMotion = useReducedMotion();

  // Node positions (relative to container)
  const nodes = [
    { id: "A", x: 0.5, y: 0.18, img: images[0], spin: 16 },
    { id: "B", x: 0.22, y: 0.78, img: images[1], spin: 20 },
    { id: "C", x: 0.78, y: 0.78, img: images[2], spin: 14 },
  ] as const;

  // helper to convert to px
  const px = (v: number) => Math.round(v * size);

  return (
    <div
      className={[
        "relative select-none",
        "rounded-3xl border border-white/10 bg-[#050505]",
        "shadow-[0_20px_60px_rgba(0,0,0,0.55)] overflow-hidden",
        className,
      ].join(" ")}
      style={{ width: size, height: size }}
      aria-label="Neural network triad"
    >
      {/* ambient glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-[#d4af37] opacity-[0.06] blur-[110px]" />

      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* connections (SVG lines) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="wire" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(212,175,55,0.0)" />
            <stop offset="0.5" stopColor="rgba(212,175,55,0.55)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.08)" />
          </linearGradient>

          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* draw fully connected triangle */}
        {[
          [nodes[0], nodes[1]],
          [nodes[0], nodes[2]],
          [nodes[1], nodes[2]],
        ].map(([a, b], i) => (
          <g key={i} filter="url(#softGlow)">
            <line
              x1={px(a.x)}
              y1={px(a.y)}
              x2={px(b.x)}
              y2={px(b.y)}
              stroke="url(#wire)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* faint secondary line for depth */}
            <line
              x1={px(a.x)}
              y1={px(a.y)}
              x2={px(b.x)}
              y2={px(b.y)}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.45"
            />
          </g>
        ))}
      </svg>

      {/* drifting “signal” dots along each edge */}
      {!reduceMotion && (
        <>
          <SignalDot size={size} from={nodes[0]} to={nodes[1]} duration={2.6} delay={0.2} />
          <SignalDot size={size} from={nodes[0]} to={nodes[2]} duration={3.0} delay={0.6} />
          <SignalDot size={size} from={nodes[1]} to={nodes[2]} duration={2.2} delay={1.0} />
        </>
      )}

      {/* neurons */}
      {nodes.map((n) => (
        <Neuron
          key={n.id}
          x={px(n.x)}
          y={px(n.y)}
          img={n.img}
          spinSeconds={n.spin}
          reduceMotion={!!reduceMotion}
        />
      ))}
    </div>
  );
}

function Neuron({
  x,
  y,
  img,
  spinSeconds,
  reduceMotion,
}: {
  x: number;
  y: number;
  img: string;
  spinSeconds: number;
  reduceMotion: boolean;
}) {
  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative w-24 h-24 md:w-28 md:h-28">
        {/* outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={reduceMotion ? {} : { rotate: 360 }}
          transition={reduceMotion ? {} : { repeat: Infinity, duration: spinSeconds, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-0 rounded-full border border-[#d4af37]/20 blur-[0.2px]" />
          {/* dashed ring */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" aria-hidden="true">
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="rgba(212,175,55,0.55)"
              strokeWidth="1.3"
              strokeDasharray="6 10"
              opacity="0.45"
            />
          </svg>
        </motion.div>

        {/* inner counter-rotating ring */}
        <motion.div
          className="absolute inset-[12%] rounded-full"
          animate={reduceMotion ? {} : { rotate: -360 }}
          transition={reduceMotion ? {} : { repeat: Infinity, duration: Math.max(10, spinSeconds - 4), ease: "linear" }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" aria-hidden="true">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1"
              opacity="0.6"
            />
            <path
              d="M50 12V88 M12 50H88"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1"
              strokeDasharray="3 10"
            />
          </svg>
        </motion.div>

        {/* neuron body */}
        <div className="absolute inset-[16%] rounded-full overflow-hidden bg-[#050505] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          {/* image */}
          <img src={img} alt="" className="w-full h-full object-cover opacity-90" />
          {/* cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        </div>

        {/* pulse core */}
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <motion.div
            className="w-2.5 h-2.5 rounded-full bg-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.55)]"
            animate={reduceMotion ? {} : { scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={reduceMotion ? {} : { repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}

function SignalDot({
  size,
  from,
  to,
  duration,
  delay,
}: {
  size: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  duration: number;
  delay: number;
}) {
  const fx = from.x * size;
  const fy = from.y * size;
  const tx = to.x * size;
  const ty = to.y * size;

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_18px_rgba(212,175,55,0.65)]"
      style={{ left: fx, top: fy, transform: "translate(-50%, -50%)" }}
      animate={{
        left: [fx, tx],
        top: [fy, ty],
        opacity: [0, 1, 0],
        scale: [0.8, 1.1, 0.8],
      }}
      transition={{
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}
