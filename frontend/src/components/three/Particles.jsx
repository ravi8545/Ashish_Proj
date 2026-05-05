import { useEffect, useRef } from 'react';

/**
 * Lightweight canvas-based floating particles (stars / light dust).
 * Positioned fixed, full-viewport, behind content. Pauses when tab hidden.
 */
export default function Particles({
  density = 0.00012, // particles per pixel
  className = '',
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);
  const dprRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const resize = () => {
      dprRef.current = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dprRef.current;
      canvas.height = h * dprRef.current;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);

      // rebuild particle field proportional to viewport
      const count = Math.min(180, Math.max(40, Math.floor(w * h * density)));
      particlesRef.current = Array.from({ length: count }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.25 + 0.05),
        a: Math.random() * Math.PI * 2,
        s: Math.random() * 0.015 + 0.005, // twinkle speed
        hue: Math.random() < 0.18 ? 'orange' : 'white',
      }));
    };

    const step = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const ps = particlesRef.current;
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.vx;
        p.y += p.vy;
        p.a += p.s;

        if (p.y < -5) {
          p.y = h + 5;
          p.x = Math.random() * w;
        }
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;

        const twinkle = 0.55 + Math.sin(p.a) * 0.45;
        const alpha = twinkle * 0.85;

        ctx.beginPath();
        if (p.hue === 'orange') {
          ctx.fillStyle = `rgba(212, 165, 116, ${alpha})`;
          ctx.shadowColor = 'rgba(212, 165, 116, 0.85)';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(245, 230, 211, ${alpha})`;
          ctx.shadowColor = 'rgba(245, 230, 211, 0.55)';
          ctx.shadowBlur = 6;
        }
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(step);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else if (!reduceMotion) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    resize();
    if (!reduceMotion) {
      rafRef.current = requestAnimationFrame(step);
    } else {
      // single static frame
      step();
      cancelAnimationFrame(rafRef.current);
    }

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 ${className}`}
    />
  );
}
