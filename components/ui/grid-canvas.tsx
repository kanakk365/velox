'use client';
import { useEffect, useRef } from 'react';

const GRID = 24;
const DOT_BASE = 0.9;
const DOT_WAVE = 1.1;
const COLOR = '139, 92, 246';

export function GridCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      const t = now / 1000;

      const cols = Math.ceil(W / GRID) + 1;
      const rows = Math.ceil(H / GRID) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * GRID;
          const y = r * GRID;

          // Diagonal travelling wave (top-left → bottom-right)
          const wave = Math.sin((x * 0.07 + y * 0.05) - t * 1.8) * 0.5 + 0.5;

          // Secondary slower counter-diagonal wave for depth
          const wave2 = Math.sin((x * 0.04 - y * 0.06) + t * 1.1) * 0.5 + 0.5;

          const combined = wave * 0.7 + wave2 * 0.3;

          // Strong fade toward bottom — dots vanish in bottom ~35%
          const yFade = Math.pow(Math.max(0, 1 - y / H), 1.6);

          // Subtle left-edge fade so the grid feels framed
          const xFade = Math.min(1, x / (GRID * 1.5));

          const opacity = combined * yFade * xFade * 0.55;
          const radius = DOT_BASE + combined * DOT_WAVE * yFade;

          if (opacity < 0.005) continue;

          // Occasional bright "star" dot — every ~8th intersection gets an extra glow
          const isStar = (r * 7 + c * 13) % 9 === 0;

          if (isStar && opacity > 0.2) {
            // Outer soft halo
            const grad = ctx.createRadialGradient(x, y, 0, x, y, radius * 4);
            grad.addColorStop(0, `rgba(${COLOR}, ${opacity * 0.5})`);
            grad.addColorStop(1, `rgba(${COLOR}, 0)`);
            ctx.beginPath();
            ctx.arc(x, y, radius * 4, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
          }

          // Core dot
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${COLOR}, ${opacity})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas);
    resize();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
