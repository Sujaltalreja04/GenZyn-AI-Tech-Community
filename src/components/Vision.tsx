import { motion } from "framer-motion";

export function Vision() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="vision main-container" 
      style={{ textAlign: 'center', padding: '6rem 2rem', position: 'relative' }}
    >
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '400px', height: '400px', background: 'radial-gradient(circle, var(--primary) 0%, transparent 60%)',
          filter: 'blur(80px)', zIndex: -1, opacity: 0.2
        }}
      ></motion.div>
      
      <h2 style={{ fontSize: '3.5rem', lineHeight: 1.2, marginBottom: '2rem' }}>
        FROM COMMUNITY<br />
        <span className="gradient-text" style={{ background: 'linear-gradient(to right, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', color: 'transparent' }}>TO ECOSYSTEM</span>
      </h2>
      <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
        Today we build communities.<br />
        Tomorrow we build technologies, products and startups.
      </p>
    </motion.section>
  );
}

