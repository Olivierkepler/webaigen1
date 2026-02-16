import React from "react";

type LogoProps = {
  size?: number;           // optional fixed size
  className?: string;      // allows Tailwind sizing
  color?: string;
  strokeWidth?: number;
  durationMs?: number;
  delayMs?: number;
};

export default function NodeALogo({
  size,
  className,
  color = "#d4af37",
  strokeWidth = 8,
  durationMs = 1200,
  delayMs = 0,
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
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo"
      className={className}
      style={{
        width: size ? size : undefined,
        height: size ? size : undefined,
        overflow: "visible",
      }}
    >
      <style>{`
        .draw-line {
          stroke-dasharray: ${lineLength};
          stroke-dashoffset: ${lineLength};
          animation: drawLineAnim ${durationMs}ms cubic-bezier(0.4, 0, 0.2, 1) ${delayMs}ms forwards;
        }
        
        .draw-bar {
          stroke-dasharray: ${barLength};
          stroke-dashoffset: ${barLength};
          animation: drawLineAnim ${durationMs * 0.8}ms cubic-bezier(0.4, 0, 0.2, 1) ${delayMs + 400}ms forwards;
        }

        .pop-circle {
          transform: scale(0);
          animation: 
            popInAnim 600ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
            pulseAnim 4s ease-in-out ${durationMs + delayMs + 500}ms infinite;
        }

        .logo-group {
          animation: glowPulse 4s ease-in-out ${durationMs + delayMs + 500}ms infinite;
        }

        @keyframes drawLineAnim {
          to { stroke-dashoffset: 0; }
        }

        @keyframes popInAnim {
          to { transform: scale(1); }
        }

        @keyframes pulseAnim {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 2px ${color}66); }
          50% { filter: drop-shadow(0 0 12px ${color}aa); }
        }
      `}</style>

      <g className="logo-group">
        <line
          className="draw-line"
          x1={top.x} y1={top.y}
          x2={left.x} y2={left.y}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        <line
          className="draw-line"
          style={{ animationDelay: `${delayMs + 150}ms` }}
          x1={top.x} y1={top.y}
          x2={right.x} y2={right.y}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        <line
          className="draw-bar"
          x1={barStart.x} y1={barStart.y}
          x2={barEnd.x} y2={barEnd.y}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        <circle
          className="pop-circle"
          cx={top.x}
          cy={top.y}
          r={r}
          fill={color}
        />
        <circle
          className="pop-circle"
          cx={left.x}
          cy={left.y}
          r={r}
          fill={color}
        />
        <circle
          className="pop-circle"
          cx={right.x}
          cy={right.y}
          r={r}
          fill={color}
        />
      </g>
    </svg>
  );
}
