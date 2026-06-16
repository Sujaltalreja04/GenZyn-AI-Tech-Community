import { motion } from "framer-motion";

export function Domains() {
  const domains = [
    { title: "Artificial Intelligence", icon: "🧠" },
    { title: "Cyber Security", icon: "🛡️" },
    { title: "Web Development", icon: "💻" },
    { title: "Cloud Computing", icon: "☁️" },
    { title: "Open Source", icon: "🌍" },
    { title: "Entrepreneurship", icon: "🚀" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="domains" className="main-container" style={{ padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem' }}>
          Technology <span className="gradient-text" style={{ background: 'linear-gradient(to right, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', color: 'transparent' }}>Domains</span>
        </h2>
      </div>
      
      <motion.div 
        className="grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {domains.map((domain, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className="card glass"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(var(--primary-h), var(--primary-s), var(--primary-l), 0.3)" }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
          >
            <div style={{ fontSize: '3rem' }}>{domain.icon}</div>
            <h3 style={{ textAlign: 'center', fontSize: '1.2rem' }}>{domain.title}</h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

