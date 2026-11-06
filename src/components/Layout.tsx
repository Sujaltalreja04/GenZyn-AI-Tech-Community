import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout() {
  const glowRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number | null = null;

    const animateGlow = () => {
      const dx = mousePos.current.x - glowPos.current.x;
      const dy = mousePos.current.y - glowPos.current.y;
      glowPos.current.x += dx * 0.1;
      glowPos.current.y += dy * 0.1;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowPos.current.x}px, ${glowPos.current.y}px) translate(-50%, -50%)`;
      }

      if (Math.abs(dx) + Math.abs(dy) > 0.5) {
        animationFrameId = requestAnimationFrame(animateGlow);
      } else {
        animationFrameId = null;
      }
    };

    const startGlowAnimation = (event: MouseEvent) => {
      mousePos.current.x = event.clientX;
      mousePos.current.y = event.clientY;
      if (animationFrameId === null) animationFrameId = requestAnimationFrame(animateGlow);
    };

    window.addEventListener("mousemove", startGlowAnimation, { passive: true });

    return () => {
      window.removeEventListener("mousemove", startGlowAnimation);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow"></div>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
