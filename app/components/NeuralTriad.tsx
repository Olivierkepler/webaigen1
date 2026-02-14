"use client";

import React, { useEffect, useMemo, useId } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  MotionValue,
  useReducedMotion,
} from "framer-motion";

type NeuralTriadProps = {
  size?: number; // Overall container size in px
  images?: [string, string, string];
  className?: string;
  style?: React.CSSProperties;
};

// Internal coordinate system (virtual pixels)
const VIEWBOX_SIZE = 400;

type NodeMV = { x: MotionValue<number>; y: MotionValue<number> };

export default function NeuralTriad({
  size = 400,
  images = [
    "https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1654119895136-6aad918f412c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1737644467636-6b0053476bb2?q=80&w=1544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  className = "",
  style = {},
}: NeuralTriadProps) {
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  const connections = useMemo(
    () => [[0, 1], [0, 2], [1, 2]] as const,
    []
  );

  // Responsive node sizing variables
  const nodePx = Math.max(40, Math.round(size * 0.2));
  const nodePxMd = Math.max(50, Math.round(size * 0.24)); // (kept for future use)

  // ✅ Hooks must be called unconditionally and in a stable order.
  const node0 = useFloatingNode(0.5, 0.16, 0, !!reduceMotion); // Top
  const node1 = useFloatingNode(0.18, 0.82, 1, !!reduceMotion); // Bottom Left
  const node2 = useFloatingNode(0.82, 0.82, 2, !!reduceMotion); // Bottom Right

  const nodes = useMemo(() => [node0, node1, node2] as const, [node0, node1, node2]);

  return (
    <div
      className={`select-none ${className}`}
      style={{
        // Don't set position here! The parent will control positioning.
        width: size,
        height: size,
        ...style,
        position: style.position || "relative",
      }}
      aria-hidden="true"
    >
      {/* 1. Ambient Glow (Backdrop) */}
      <div className="absolute blur-[80px] rounded-full pointer-events-none" />

      {/* 2. Micro-Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none rounded-full"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(circle at center, black 40%, transparent 80%)",
        }}
      />

      {/* 3. The Synaptic Network (SVG Layer) */}
      <svg
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
      >
        <defs>
          <linearGradient id={`synapse-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(212,175,55,0.05)" />
            <stop offset="50%" stopColor="rgba(212,175,55,0.8)" />
            <stop offset="100%" stopColor="rgba(212,175,55,0.05)" />
          </linearGradient>

          <filter id={`glow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {connections.map(([a, b], i) => (
          <ConnectionLine
            key={`conn-${i}`}
            start={nodes[a]}
            end={nodes[b]}
            delay={i * 0.4}
            reduceMotion={!!reduceMotion}
            gradientId={`synapse-${uid}`}
            filterId={`glow-${uid}`}
          />
        ))}
      </svg>

      {/* 4. The Neural Nodes (Div Layer) */}
      {nodes.map((node, i) => (
        <NeuronNode
          key={`node-${i}`}
          x={node.x}
          y={node.y}
          img={images[i]}
          size={nodePx}
          sizeMd={nodePxMd}
          delay={i * 0.5}
          reduceMotion={!!reduceMotion}
        />
      ))}

      {/* 5. Active Data Packets (Particle Layer) */}
      {!reduceMotion &&
        connections.map(([a, b], i) => (
          <DataPacket
            key={`packet-${i}`}
            start={nodes[a]}
            end={nodes[b]}
            duration={2.5 + i * 0.5}
            delay={1 + i * 0.8}
          />
        ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HOOKS                                                                       */
/* -------------------------------------------------------------------------- */

// Fixes to use correct animate signatures with motion values
function useFloatingNode(
  baseX: number,
  baseY: number,
  seed: number,
  reduceMotion: boolean
): NodeMV {
  const x = useMotionValue(baseX * VIEWBOX_SIZE);
  const y = useMotionValue(baseY * VIEWBOX_SIZE);

  useEffect(() => {
    if (reduceMotion) return;

    const range = 25 + seed * 5;

    const animOptions = {
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut" as const,
    };

    const xKeyframes = [
      baseX * VIEWBOX_SIZE - range,
      baseX * VIEWBOX_SIZE + range,
    ];
    const yKeyframes = [
      baseY * VIEWBOX_SIZE - range,
      baseY * VIEWBOX_SIZE + range,
    ];

    // Animate MotionValue with keyframes (assert: TS picks object overload; value+keyframes overload is correct at runtime)
    const cx = animate(x, xKeyframes as never, {
      ...animOptions,
      duration: 7 + seed,
      delay: seed * 1.5,
    });

    const cy = animate(y, yKeyframes as never, {
      ...animOptions,
      duration: 9 - seed,
      delay: seed * 0.5,
    });

    return () => {
      cx.stop();
      cy.stop();
    };
  }, [x, y, baseX, baseY, seed, reduceMotion]);

  return { x, y };
}

/* -------------------------------------------------------------------------- */
/* SUB-COMPONENTS                                                             */
/* -------------------------------------------------------------------------- */

function ConnectionLine({
  start,
  end,
  delay,
  reduceMotion,
  gradientId,
  filterId,
}: {
  start: NodeMV;
  end: NodeMV;
  delay: number;
  reduceMotion: boolean;
  gradientId: string;
  filterId: string;
}) {
  return (
    <g filter={`url(#${filterId})`}>
      <motion.line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        strokeLinecap="round"
      />

      <motion.line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ strokeDasharray: "20 400", strokeDashoffset: 400 }}
        animate={reduceMotion ? {} : { strokeDashoffset: -400 }}
        transition={
          reduceMotion
            ? {}
            : { repeat: Infinity, duration: 3.5, ease: "linear", delay }
        }
      />
    </g>
  );
}

function NeuronNode({
  x,
  y,
  img,
  size,
  sizeMd, // (currently unused; safe to remove if you want)
  delay,
  reduceMotion,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  img: string;
  size: number;
  sizeMd: number;
  delay: number;
  reduceMotion: boolean;
}) {
  void sizeMd;

  return (
    <motion.div
      className="absolute z-20"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width: size,
        height: size,
      }}
    >
      <div className="relative w-full h-full group cursor-pointer">
        <motion.div
          className="absolute inset-[-20%] rounded-full border border-white/10 border-dashed opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={reduceMotion ? {} : { rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear", delay }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37]" />
        </motion.div>

        <motion.div
          className="absolute inset-[-8%] rounded-full border border-transparent border-t-[#d4af37]/40 border-r-[#d4af37]/40 opacity-50"
          animate={reduceMotion ? {} : { rotate: -360 }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "linear",
            delay: delay + 1,
          }}
        />

        <div className="absolute inset-0 rounded-full overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.6)] group-hover:border-[#d4af37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-500">
          <img
            src={img}
            alt=""
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />
        </div>
      </div>
    </motion.div>
  );
}

function DataPacket({
  start,
  end,
  duration,
  delay,
}: {
  start: NodeMV;
  end: NodeMV;
  duration: number;
  delay: number;
}) {
  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progress, 1, {
      from: 0,
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 0.5,
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [duration, delay, progress]);

  // Use `useTransform` with input as [progress], accessing .get() for start/end
  const x = useTransform(progress, (p) => {
    const sx = start.x.get();
    const ex = end.x.get();
    return sx + (ex - sx) * p;
  });
  const y = useTransform(progress, (p) => {
    const sy = start.y.get();
    const ey = end.y.get();
    return sy + (ey - sy) * p;
  });

  return (
    <motion.div
      className="absolute z-10 w-2 h-2"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        className="w-full h-full rounded-full bg-[#d4af37] shadow-[0_0_15px_#d4af37]"
        animate={{ scale: [0.8, 1.5, 0.8], opacity: [0, 1, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
