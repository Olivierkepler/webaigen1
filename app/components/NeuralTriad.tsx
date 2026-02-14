"use client";

import React, { useEffect, useMemo, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

type NeuralTriadProps = {
  size?: number;
  images?: [string, string, string];
  className?: string;
  style?: React.CSSProperties;

  labels?: [string, string, string];
  descriptions?: [string, string, string];

  /** Fires on click (or Enter/Space) */
  onNeuronClick?: (index: 0 | 1 | 2) => void;

  /** Optional: enable tooltip card */
  enablePopover?: boolean;
};

const VIEWBOX_SIZE = 400;

type NodeMV = { x: MotionValue<number>; y: MotionValue<number> };

export default function NeuralTriad({
  size = 400,
  images = [
    "https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1654119895136-6aad918f412c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1737644467636-6b0053476bb2?q=80&w=1544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  labels = ["AI Agents", "Automation", "Deployment"],
  descriptions = [
    "Custom assistants that act on your tools.",
    "Workflow orchestration & integrations.",
    "Ship to production with confidence.",
  ],
  className = "",
  style = {},
  onNeuronClick,
  enablePopover = true,
}: NeuralTriadProps) {
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState<0 | 1 | 2 | null>(null);
  const [hovered, setHovered] = useState<0 | 1 | 2 | null>(null);

  const connections = useMemo(
    () => [[0, 1], [0, 2], [1, 2]] as const,
    []
  );

  const nodePx = Math.max(44, Math.round(size * 0.2));

  const node0 = useFloatingNode(0.5, 0.16, 0, !!reduceMotion);
  const node1 = useFloatingNode(0.18, 0.82, 1, !!reduceMotion);
  const node2 = useFloatingNode(0.82, 0.82, 2, !!reduceMotion);

  const nodes = useMemo(
    () => [node0, node1, node2] as const,
    [node0, node1, node2]
  );

  // Close on outside click + Escape
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setActive(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const emphasized = active ?? hovered;

  return (
    <div
      ref={rootRef}
      className={`relative select-none ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-[-18%] bg-[#d4af37]/[0.08] blur-[90px] rounded-full pointer-events-none" />

      {/* Micro-grid */}
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

      {/* Lines */}
      <svg
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
      >
        <defs>
          <linearGradient id={`synapse-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(212,175,55,0.05)" />
            <stop offset="50%" stopColor="rgba(212,175,55,0.85)" />
            <stop offset="100%" stopColor="rgba(212,175,55,0.05)" />
          </linearGradient>

          <filter id={`glow-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
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
            delay={i * 0.35}
            reduceMotion={!!reduceMotion}
            gradientId={`synapse-${uid}`}
            filterId={`glow-${uid}`}
            dim={emphasized !== null && emphasized !== a && emphasized !== b}
            boost={emphasized !== null && (emphasized === a || emphasized === b)}
          />
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <NeuronNode
          key={`node-${i}`}
          index={i as 0 | 1 | 2}
          x={node.x}
          y={node.y}
          img={images[i]}
          size={nodePx}
          reduceMotion={!!reduceMotion}
          isActive={active === i}
          isDim={emphasized !== null && emphasized !== i}
          label={labels[i]}
          onHover={(state) => setHovered(state ? (i as 0 | 1 | 2) : null)}
          onClick={() => {
            setActive((prev) => (prev === i ? null : (i as 0 | 1 | 2)));
            onNeuronClick?.(i as 0 | 1 | 2);
          }}
        />
      ))}

      {/* Popover (collision-aware: TOP node always shows, right node flips left) */}
      <AnimatePresence>
        {enablePopover && active !== null && (
          <NeuronPopover
            key={`popover-${active}`}
            rootSize={size}
            x={nodes[active].x}
            y={nodes[active].y}
            title={labels[active]}
            desc={descriptions[active]}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>

      {/* Packets */}
      {!reduceMotion &&
        connections.map(([a, b], i) => (
          <DataPacket
            key={`packet-${i}`}
            start={nodes[a]}
            end={nodes[b]}
            duration={2.4 + i * 0.45}
            delay={1 + i * 0.65}
            dim={emphasized !== null && emphasized !== a && emphasized !== b}
          />
        ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HOOKS                                                                       */
/* -------------------------------------------------------------------------- */

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

    const range = 22 + seed * 6;
    const opts = { repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const };

    const cx = animate(
      x,
      [baseX * VIEWBOX_SIZE - range, baseX * VIEWBOX_SIZE + range],
      { ...opts, duration: 7.5 + seed * 0.6, delay: seed * 1.2 }
    );

    const cy = animate(
      y,
      [baseY * VIEWBOX_SIZE - range, baseY * VIEWBOX_SIZE + range],
      { ...opts, duration: 9.2 - seed * 0.6, delay: seed * 0.45 }
    );

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
  dim,
  boost,
}: {
  start: NodeMV;
  end: NodeMV;
  delay: number;
  reduceMotion: boolean;
  gradientId: string;
  filterId: string;
  dim?: boolean;
  boost?: boolean;
}) {
  const baseOpacity = dim ? 0.35 : 1;
  const boostWidth = boost ? 2.6 : 2;

  return (
    <g filter={`url(#${filterId})`} opacity={baseOpacity}>
      <motion.line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke="rgba(255,255,255,0.085)"
        strokeWidth="1"
        strokeLinecap="round"
      />

      <motion.line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={`url(#${gradientId})`}
        strokeWidth={boostWidth}
        strokeLinecap="round"
        initial={{ strokeDasharray: "20 420", strokeDashoffset: 420 }}
        animate={reduceMotion ? {} : { strokeDashoffset: -420 }}
        transition={reduceMotion ? {} : { repeat: Infinity, duration: 3.2, ease: "linear", delay }}
      />
    </g>
  );
}

function NeuronNode({
  index,
  x,
  y,
  img,
  size,
  reduceMotion,
  isActive,
  isDim,
  label,
  onClick,
  onHover,
}: {
  index: 0 | 1 | 2;
  x: MotionValue<number>;
  y: MotionValue<number>;
  img: string;
  size: number;
  reduceMotion: boolean;
  isActive: boolean;
  isDim: boolean;
  label: string;
  onClick: () => void;
  onHover: (state: boolean) => void;
}) {
  const opacity = isDim ? 0.7 : 1;

  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      className="group absolute z-20 outline-none"
      style={{
        x,
        y,
        opacity,
        translateX: "-50%",
        translateY: "-50%",
        width: size,
        height: size,
      }}
      whileTap={{ scale: 0.985 }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={
          isActive
            ? { scale: 1.075, filter: "drop-shadow(0 0 18px rgba(212,175,55,0.55))" }
            : { scale: 1, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" }
        }
        transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.6 }}
      >
        <span className="pointer-events-none absolute inset-[-8%] rounded-full ring-0 focus-visible:ring-2 focus-visible:ring-[#d4af37]/60" />

        {/* Orbit */}
        <motion.div
          className="absolute inset-[-22%] rounded-full border border-white/10 border-dashed opacity-0 group-hover:opacity-100"
          animate={reduceMotion ? {} : { rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          style={{ opacity: isActive ? 1 : undefined }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#d4af37] rounded-full shadow-[0_0_12px_#d4af37]" />
        </motion.div>

        {/* Tech ring */}
        <motion.div
          className="absolute inset-[-9%] rounded-full border border-transparent border-t-[#d4af37]/45 border-r-[#d4af37]/35 opacity-55"
          animate={reduceMotion ? {} : { rotate: -360 }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        />

        {/* Core (image never bleeds outside circle) */}
        <div
          className={`absolute inset-0 rounded-full overflow-hidden bg-[#0a0a0a] border shadow-[0_0_30px_rgba(0,0,0,0.6)] transition-all duration-500 ${
            isActive
              ? "border-[#d4af37] shadow-[0_0_28px_rgba(212,175,55,0.35)]"
              : "border-white/10 hover:border-[#d4af37]/70"
          }`}
          style={{
            WebkitMaskImage: "radial-gradient(circle, black 99%, transparent 100%)",
            maskImage: "radial-gradient(circle, black 99%, transparent 100%)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover opacity-85 transition-all duration-700 will-change-transform"
              style={{ transform: "scale(1.02)" }}
            />
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_52%,rgba(0,0,0,0.42)_52%)] bg-[length:100%_4px] pointer-events-none opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.18),transparent_55%)] pointer-events-none" />
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute inset-[-36%] rounded-full border border-[#d4af37]/35"
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: [0, 1, 0], scale: [0.86, 1.06, 1.2] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.05, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/* POPOVER (collision-aware; TOP node always shows)                            */
/* -------------------------------------------------------------------------- */

function NeuronPopover({
  rootSize,
  x,
  y,
  title,
  desc,
  onClose,
}: {
  rootSize: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
  title: string;
  desc: string;
  onClose: () => void;
}) {
  const CARD_W = 260;
  const CARD_H = 180;
  const PAD = 10;
  const OFFSET_X = 34;
  const OFFSET_Y = 70;

  const scale = rootSize / VIEWBOX_SIZE;
  const cardWv = CARD_W / scale;
  const cardHv = CARD_H / scale;

  const leftV = useTransform(
    [x, y],
    (values: number[]): number => {
      const vx = values[0];
      const vy = values[1];
      const nearTop = vy < cardHv * 0.55 + 20;
      const nearRight = vx > VIEWBOX_SIZE - (cardWv + 20);
      if (nearTop) return vx - cardWv / 2;
      if (nearRight) return vx - OFFSET_X - cardWv;
      return vx + OFFSET_X;
    }
  );

  const topV = useTransform(
    [x, y],
    (values: number[]): number => {
      const vy = values[1];
      const nearTop = vy < cardHv * 0.55 + 20;
      if (nearTop) return vy + OFFSET_Y;
      return vy - cardHv / 2;
    }
  );

  const clampedLeftV = useTransform(leftV, (v: number) => clamp(v, PAD, VIEWBOX_SIZE - cardWv - PAD));
  const clampedTopV = useTransform(topV, (v: number) => clamp(v, PAD, VIEWBOX_SIZE - cardHv - PAD));

  const leftPx = useTransform(clampedLeftV, (v: number) => v * scale);
  const topPx = useTransform(clampedTopV, (v: number) => v * scale);

  return (
    <motion.div
      className="absolute z-40 w-[260px]"
      style={{ left: leftPx, top: topPx }}
      initial={{ opacity: 0, y: 10, scale: 0.985, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 10, scale: 0.985, filter: "blur(12px)" }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="relative rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.65)] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(212,175,55,0.08),transparent_55%)]" />

        <div className="relative px-5 pt-5 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37]" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d4af37]/90">
                  Node Activated
                </p>
                <h4 className="mt-1 text-[15px] font-semibold text-white leading-tight">
                  {title}
                </h4>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-6 w-6 items-center justify-center rounded-md text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              ✕
            </button>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-white/70">{desc}</p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="group relative w-full overflow-hidden rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 py-2.5 text-xs font-mono uppercase tracking-[0.24em] text-[#d4af37] transition-all duration-300 hover:border-[#d4af37]/60 hover:text-black"
          >
            <span className="absolute inset-0 w-0 bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
            <span className="relative z-10">View Details</span>
          </button>
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
  dim,
}: {
  start: NodeMV;
  end: NodeMV;
  duration: number;
  delay: number;
  dim?: boolean;
}) {
  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progress, 1, {
      from: 0,
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 0.4,
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [duration, delay, progress]);

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
      style={{
        x,
        y,
        opacity: dim ? 0.35 : 1,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="w-full h-full rounded-full bg-[#d4af37] shadow-[0_0_16px_#d4af37]"
        animate={{ scale: [0.85, 1.6, 0.85], opacity: [0, 1, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* UTILS                                                                       */
/* -------------------------------------------------------------------------- */

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
