"use client";

import { useEffect, useRef, useCallback } from "react";

interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  className?: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  if (clean.length === 6) {
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16),
    ];
  }
  return [168, 85, 247];
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function DotField({
  dotRadius = 1.5,
  dotSpacing = 14,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = false,
  gradientFrom = "#A855F7",
  gradientTo = "#B497CF",
  glowColor = "#120F17",
  className = "",
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const mouse     = useRef({ x: -99999, y: -99999 });
  const time      = useRef(0);

  const colorA = hexToRgb(gradientFrom);
  const colorB = hexToRgb(gradientTo);
  const glowRGB = hexToRgb(glowColor);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const { x: mx, y: my } = mouse.current;
    const t = time.current;

    ctx.clearRect(0, 0, W, H);

    // ── Glow blob under cursor ─────────────────────────────
    if (glowRadius > 0 && mx > -9000) {
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, glowRadius);
      grad.addColorStop(0,   `rgba(${glowRGB[0]},${glowRGB[1]},${glowRGB[2]},0.22)`);
      grad.addColorStop(0.5, `rgba(${glowRGB[0]},${glowRGB[1]},${glowRGB[2]},0.08)`);
      grad.addColorStop(1,   `rgba(${glowRGB[0]},${glowRGB[1]},${glowRGB[2]},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(mx, my, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // ── Dot grid ──────────────────────────────────────────
    const cols = Math.ceil(W / dotSpacing) + 2;
    const rows = Math.ceil(H / dotSpacing) + 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const baseX = col * dotSpacing;
        const baseY = row * dotSpacing;

        // Wave offset
        let wx = baseX;
        let wy = baseY;
        if (waveAmplitude > 0) {
          wx += Math.sin(baseY / 40 + t * 0.8) * waveAmplitude;
          wy += Math.cos(baseX / 40 + t * 0.6) * waveAmplitude;
        }

        let px = wx;
        let py = wy;
        let r  = dotRadius;
        let alpha = 1;

        // Cursor interaction
        const dx   = wx - mx;
        const dy   = wy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < cursorRadius && mx > -9000) {
          const norm    = dist / cursorRadius;
          const falloff = (1 - norm * norm) * (1 - norm * norm); // smooth quartic
          const force   = falloff * cursorForce * bulgeStrength;

          if (bulgeOnly) {
            const angle = Math.atan2(dy, dx);
            px += Math.cos(angle) * force;
            py += Math.sin(angle) * force;
            r   = dotRadius * (1 + falloff * 0.8);
          } else {
            if (dist > 0.5) {
              px -= (dx / dist) * force;
              py -= (dy / dist) * force;
            }
          }
        }

        if (sparkle) {
          alpha = 0.4 + Math.random() * 0.6;
        }

        // Color: gradient left→right, boosted near cursor
        const cursorInfluence = dist < cursorRadius && mx > -9000
          ? Math.pow(1 - dist / cursorRadius, 2)
          : 0;
        const tx = Math.min(1, Math.max(0, baseX / W + cursorInfluence * 0.4));

        const rr = Math.round(lerp(colorA[0], colorB[0], tx));
        const gg = Math.round(lerp(colorA[1], colorB[1], tx));
        const bb = Math.round(lerp(colorA[2], colorB[2], tx));

        ctx.globalAlpha = alpha;
        ctx.fillStyle   = `rgb(${rr},${gg},${bb})`;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.5, r), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
    time.current   += 0.016;
    animRef.current = requestAnimationFrame(render);
  }, [
    dotRadius, dotSpacing, bulgeStrength, glowRadius,
    sparkle, waveAmplitude, cursorRadius, cursorForce,
    bulgeOnly, colorA, colorB, glowRGB,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size canvas to fill its positioned parent
    const setSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width  = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    setSize();

    const ro = new ResizeObserver(setSize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // Track mouse relative to canvas
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const onLeave = () => { mouse.current = { x: -99999, y: -99999 }; };

    // Listen on window so cursor works even when over the card (z-index)
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
      className={className}
    />
  );
}
