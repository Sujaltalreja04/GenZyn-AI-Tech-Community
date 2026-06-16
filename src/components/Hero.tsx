import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Background3D } from "./Background3D";
import { ParticleField } from "./ParticleField";
import { TypewriterText } from "./TypewriterText";

export function Hero() {
  const words = ["Developers", "AI Builders", "Innovators", "Founders", "Creators"];

  return (
    <section className="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="grid-bg"></div>
      <ParticleField />
      <Background3D />
      
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
          <Link to="/contact" className="button" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Join Community</Link>
          <Link to="/events" className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', border: "1px solid var(--border)" }}>Explore Ecosystem</Link>
        </motion.div>
      </div>
    </section>
  );
}


