import React from "react";

type LogoProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
  durationMs?: number;
  delayMs?: number;
};

export default function NodeALogo({
  size = 50,
  color = "#d4af37",
  strokeWidth = 8,
  durationMs = 5000, // Increased for a more deliberate, high-end pace
  delayMs = 500,    // Added a slight initial start delay
}: LogoProps) {
  const top = { x: 50, y: 18 };
  const left = { x: 22, y: 82 };
  const right = { x: 78, y: 82 };
  const barStart = { x: 34, y: 65 };
  const barEnd = { x: 58, y: 65 };
  const r = 12;

  const lineLength = 70;
  const barLength = 24;

  return (
    <svg
      width={size}
      height={Math.round(size * 0.94)}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Automated Logo"
      style={{ overflow: "visible" }}
    >
      <style>{`
        /* 1. Automated Line Drawing Loop */
        .auto-draw {
          stroke-dasharray: ${lineLength};
          stroke-dashoffset: ${lineLength};
          animation: automaticBuild ${durationMs}ms cubic-bezier(0.65, 0, 0.35, 1) infinite alternate;
        }
        
        .auto-bar {
          stroke-dasharray: ${barLength};
          stroke-dashoffset: ${barLength};
          animation: automaticBuild ${durationMs}ms cubic-bezier(0.65, 0, 0.35, 1) infinite alternate;
        }

        /* 2. Automated Node Scaling Loop */
        .auto-node {
          transform: scale(0);
          animation: automaticPop ${durationMs}ms cubic-bezier(0.34, 1.56, 0.64, 1) infinite alternate;
        }

        /* 3. Global Glow Pulse */
        .logo-aura {
          animation: automaticGlow 5s ease-in-out infinite;
        }

        @keyframes automaticBuild {
          0%, 20% { stroke-dashoffset: ${lineLength}; opacity: 0; }
          /* Hold at fully drawn from 55% to 100% to 'delay' the reverse */
          55%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }

        @keyframes automaticPop {
          0%, 15% { transform: scale(0); opacity: 0; }
          50%, 100% { transform: scale(1); opacity: 1; }
        }

        @keyframes automaticGlow {
          0%, 100% { filter: drop-shadow(0 0 4px ${color}33); }
          50% { filter: drop-shadow(0 0 18px ${color}88); }
        }
      `}</style>

      <g className="logo-aura">
        {/* LEFT DIAGONAL */}
        <line
          className="auto-draw"
          style={{ animationDelay: `${delayMs}ms` }}
          x1={top.x} y1={top.y}
          x2={left.x} y2={left.y}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* RIGHT DIAGONAL */}
        <line
          className="auto-draw"
          style={{ animationDelay: `${delayMs + 300}ms` }}
          x1={top.x} y1={top.y}
          x2={right.x} y2={right.y}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* INNER BAR */}
        <line
          className="auto-bar"
          style={{ animationDelay: `${delayMs + 700}ms` }}
          x1={barStart.x} y1={barStart.y}
          x2={barEnd.x} y2={barEnd.y}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* NODES */}
        <circle 
          className="auto-node" 
          style={{ animationDelay: `${delayMs}ms`, transformOrigin: `${top.x}px ${top.y}px` }}
          cx={top.x} cy={top.y} r={r} fill={color} 
        />
        <circle 
          className="auto-node" 
          style={{ animationDelay: `${delayMs + 900}ms`, transformOrigin: `${left.x}px ${left.y}px` }}
          cx={left.x} cy={left.y} r={r} fill={color} 
        />
        <circle 
          className="auto-node" 
          style={{ animationDelay: `${delayMs + 1200}ms`, transformOrigin: `${right.x}px ${right.y}px` }}
          cx={right.x} cy={right.y} r={r} fill={color} 
        />
      </g>
    </svg>
  );
}