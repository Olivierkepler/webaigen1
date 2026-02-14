"use client";

import React, { useEffect } from "react";
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  animate, 
  MotionValue 
} from "framer-motion";

// --- TYPES ---
type NeuralTriadProps = {
  images?: [string, string, string];
  className?: string;
};

// --- CONFIG ---
const VIEWBOX_SIZE = 400; // Internal coordinate system

export default function NeuralTriad({
  images = [
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=500&q=80", 
    "https://images.unsplash.com/photo-1531297461136-82lwDe4105q?auto=format&fit=crop&w=500&q=80",  
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80", 
  ],
  className = "",
}: NeuralTriadProps) {
  
  // 1. Setup MotionValues for positions (The "Live" State)
  // We use MotionValues so the lines and dots can track the moving divs instantly
  const nodes = [
    useFloatingNode(0.5, 0.15, 0), // Top
    useFloatingNode(0.15, 0.8, 1), // Bottom Left
    useFloatingNode(0.85, 0.8, 2), // Bottom Right
  ];

  const connections = [
    [0, 1], [0, 2], [1, 2]
  ];

  return (
    <div className={`relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] select-none ${className}`}>
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#d4af37]/5 blur-[60px] rounded-full pointer-events-none" />

      {/* SVG Layer (Connections) */}
      <svg 
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
      >
        <defs>
          <linearGradient id="synapse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(212, 175, 55, 0.1)" />
            <stop offset="50%" stopColor="rgba(212, 175, 55, 0.6)" />
            <stop offset="100%" stopColor="rgba(212, 175, 55, 0.1)" />
          </linearGradient>
        </defs>

        {connections.map(([startIdx, endIdx], i) => (
          <ConnectionLine 
            key={i} 
            start={nodes[startIdx]} 
            end={nodes[endIdx]} 
            delay={i * 0.5}
          />
        ))}
      </svg>

      {/* Neurons (Drifting Divs) */}
      {nodes.map((node, i) => (
        <NeuronNode 
            key={i} 
            x={node.x} 
            y={node.y} 
            img={images[i]} 
            delay={i * 2} 
        />
      ))}

      {/* Data Packets (Travelers) */}
      {connections.map(([startIdx, endIdx], i) => (
         <DataPacket 
            key={`packet-${i}`} 
            start={nodes[startIdx]} 
            end={nodes[endIdx]} 
            duration={2 + i} 
         />
      ))}

    </div>
  );
}

// --- HOOKS ---

// Creates a node that drifts organically around a base position
function useFloatingNode(baseX: number, baseY: number, seed: number) {
  const x = useMotionValue(baseX * VIEWBOX_SIZE);
  const y = useMotionValue(baseY * VIEWBOX_SIZE);

  useEffect(() => {
    // Random drift logic
    const animateNode = (axis: MotionValue, base: number, range: number, duration: number) => {
      animate(axis, [
        base * VIEWBOX_SIZE, 
        (base * VIEWBOX_SIZE) + range, 
        (base * VIEWBOX_SIZE) - range, 
        base * VIEWBOX_SIZE
      ], {
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror",
        // Randomize the start time slightly to avoid synchronized dancing
        delay: Math.random() * 2 
      });
    };

    // X drift: +/- 20px, Duration 5-8s
    animateNode(x, baseX, 20 + (seed * 5), 5 + seed);
    // Y drift: +/- 20px, Duration 6-9s
    animateNode(y, baseY, 20 + (seed * 5), 7 - seed);
  }, [x, y, baseX, baseY, seed]);

  return { x, y };
}

// --- SUB-COMPONENTS ---

// 1. The Dynamic SVG Line (Tracks the motion values)
function ConnectionLine({ start, end, delay }: { start: any, end: any, delay: number }) {
  return (
    <g>
      {/* Static faint background line */}
      <motion.line 
        x1={start.x} y1={start.y} 
        x2={end.x} y2={end.y} 
        stroke="white" strokeOpacity="0.08" strokeWidth="1" 
      />
      {/* Pulsing Signal Line Overlay */}
      <motion.line
         x1={start.x} y1={start.y} 
         x2={end.x} y2={end.y}
         stroke="url(#synapse-gradient)" strokeWidth="2"
         initial={{ strokeDasharray: "10 200", strokeDashoffset: 200 }}
         animate={{ strokeDashoffset: -200 }}
         transition={{ repeat: Infinity, duration: 3, ease: "linear", delay }}
      />
    </g>
  );
}

// 2. The Drifting Neuron
function NeuronNode({ x, y, img, delay }: { x: MotionValue, y: MotionValue, img: string, delay: number }) {
    // We transform the coordinate numbers into pixel strings for the CSS
    const xPx = useTransform(x, (val) => `${val}px`);
    const yPx = useTransform(y, (val) => `${val}px`);

    return (
        <motion.div 
            className="absolute w-20 h-20 md:w-24 md:h-24 z-20"
            style={{ left: xPx, top: yPx, x: "-50%", y: "-50%" }} // Centered on the coordinate
        >
            <div className="relative w-full h-full group cursor-pointer">
                
                {/* A. Outer Ring (Rotates) */}
                <motion.div 
                    className="absolute inset-[-10px] rounded-full border border-white/5 border-dashed"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear", delay: delay }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37]" />
                </motion.div>

                {/* B. Middle Ring (Counter-Rotates) */}
                <motion.div 
                    className="absolute inset-[-4px] rounded-full border-[1px] border-transparent border-t-[#d4af37]/40 border-l-[#d4af37]/40"
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear", delay: delay }}
                />

                {/* C. The Core */}
                <div className="absolute inset-0 rounded-full bg-[#050505] overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] group-hover:border-[#d4af37] transition-colors duration-500">
                    <img src={img} alt="Neuron" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
                </div>
            </div>
        </motion.div>
    )
}

// 3. The Smart Data Packet (Calculates path between moving points)
function DataPacket({ start, end, duration }: { start: any, end: any, duration: number }) {
    // We animate a progress value from 0 to 1
    const progress = useMotionValue(0);

    useEffect(() => {
        const controls = animate(progress, [0, 1], {
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut"
        });
        return controls.stop;
    }, [duration]);

    // Calculate dynamic X/Y based on start, end, and current progress
    const x = useTransform(() => {
        const currentProgress = progress.get();
        return start.x.get() + (end.x.get() - start.x.get()) * currentProgress;
    });

    const y = useTransform(() => {
        const currentProgress = progress.get();
        return start.y.get() + (end.y.get() - start.y.get()) * currentProgress;
    });

    return (
        <motion.div
            className="absolute w-1.5 h-1.5 bg-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37] z-10"
            style={{ left: x, top: y, x: "-50%", y: "-50%" }} // Centered
        >
          <motion.div 
             animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
             transition={{ duration: duration, repeat: Infinity, ease: "easeInOut" }}
             className="w-full h-full bg-inherit rounded-full"
          />
        </motion.div>
    )
}