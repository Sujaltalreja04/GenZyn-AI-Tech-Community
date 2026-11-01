import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ParticleField } from "./ParticleField";
import { TypewriterText } from "./TypewriterText";
import { ErrorBoundary } from "./ErrorBoundary";

const loadBackground3D = () => import("./Background3D").then(({ Background3D: Component }) => ({ default: Component }));
const Background3D = lazy(loadBackground3D);

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

export function Hero() {
  const words = ["Developers", "AI Builders", "Innovators", "Founders", "Creators"];
  const [shouldLoad3D, setShouldLoad3D] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(min-width: 900px)").matches ||
      !supportsWebGL()
    ) return;

    let cancelled = false;
    const loadBackground = () => {
      void loadBackground3D()
        .then(() => {
          if (!cancelled) setShouldLoad3D(true);
        })
        .catch(() => {
          // The static hero remains fully usable if WebGL cannot be loaded.
        });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadBackground, { timeout: 800 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = globalThis.setTimeout(loadBackground, 400);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="hero home-hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="grid-bg"></div>
      <ParticleField />
      {shouldLoad3D && (
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <Background3D />
          </Suspense>
        </ErrorBoundary>
      )}
      
      <motion.div 
        className="glow-blob" 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px', background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          filter: 'blur(100px)', zIndex: -1
        }}
      ></motion.div>
      
      <div className="hero-content main-container" style={{ textAlign: 'center', zIndex: 1 }}>
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="badge glass"
          style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '20px', marginBottom: '2rem', color: 'var(--primary)' }}
        >
          Next Generation Tech Ecosystem
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ fontSize: '5rem', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800 }}
        >
          BUILDING THE FUTURE<br />
          <span className="gradient-text" style={{ background: 'linear-gradient(to right, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', color: 'transparent' }}>TOGETHER</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ fontSize: '1.75rem', color: 'var(--text-muted)', marginBottom: '3rem', minHeight: '40px' }}
        >
          We are a community of <TypewriterText words={words} />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="hero-buttons" 
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
        >
          <Link to="https://chat.whatsapp.com/Dysg56bNjuWIdn091XLzZc" target="_blank" className="button" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Join Community</Link>
          <Link to="/events" className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', border: "1px solid var(--border)" }}>Explore Ecosystem</Link>
        </motion.div>
      </div>
    </section>
  );
}
