import { useEffect, useRef } from "react";

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let isRunning = false;
    let lastFrameTime = 0;
    let mouse = { x: -1000, y: -1000 };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio, 1.25);
      canvas.width = canvas.offsetWidth * pixelRatio;
      canvas.height = canvas.offsetHeight * pixelRatio;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const particleColors = [
      [255, 72, 0],
      [255, 112, 0],
      [239, 44, 0],
      [225, 6, 0],
    ];
    const count = canvas.offsetWidth < 700 ? 80 : 135;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.42,
      vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.42,
      r: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.32 + 0.5,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 1.2 + 0.65,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
    }));

    const draw = (timestamp: number) => {
      if (!isRunning) return;
      animId = requestAnimationFrame(draw);
      if (timestamp - lastFrameTime < 1000 / 30) return;
      lastFrameTime = timestamp;

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }

        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distanceSquared = dx * dx + dy * dy;
        if (!prefersReducedMotion && distanceSquared < 200 * 200) {
          p.vx += dx * 0.00005;
          p.vy += dy * 0.00005;
        }

        const pulse = prefersReducedMotion
          ? 1
          : 0.78 + Math.sin(timestamp * 0.001 * p.pulseSpeed + p.phase) * 0.22;
        const radius = p.r * pulse;
        const [red, green, blue] = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${p.alpha * pulse})`;
        ctx.shadowBlur = radius > 1.8 ? 7 : 0;
        ctx.shadowColor = `rgba(${red}, ${green}, ${blue}, 0.45)`;
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared < 120 * 120) {
            const dist = Math.sqrt(distanceSquared);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255, 86, 0, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

    };

    const start = () => {
      if (isRunning || document.hidden) return;
      isRunning = true;
      lastFrameTime = 0;
      animId = requestAnimationFrame(draw);
    };

    const stop = () => {
      isRunning = false;
      cancelAnimationFrame(animId);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    }, { threshold: 0.01 });

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    observer.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
