import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HelpCircle, Home } from "../components/icons";

export function NotFound() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "160px 2rem 100px",
      }}
    >
      <div style={{ position: "relative", marginBottom: "2rem" }}>
        {/* Glow behind logo */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "160px",
            height: "160px",
            background: "var(--accent-gradient)",
            filter: "blur(60px)",
            opacity: 0.45,
            borderRadius: "50%",
            zIndex: -1,
          }}
        />
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <HelpCircle size={88} style={{ color: "var(--red)" }} />
        </motion.div>
      </div>

      <h1
        className="gradient-text"
        style={{
          fontSize: "6rem",
          fontWeight: 900,
          margin: "0 0 1rem 0",
          fontFamily: "var(--font-display)",
          lineHeight: 1,
        }}
      >
        404
      </h1>

      <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 1rem 0" }}>Page Not Found</h2>

      <p style={{ color: "var(--text-muted)", fontSize: "1.15rem", maxWidth: "450px", margin: "0 0 3rem 0", lineHeight: 1.6 }}>
        The repository link or page route you are looking for has been merged, deleted, or relocated to another branch.
      </p>

      <Link
        to="/"
        className="btn-primary"
        style={{
          padding: "0.9rem 2rem",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "1rem",
        }}
      >
        <Home size={18} />
        <span>Return Home</span>
      </Link>
    </motion.section>
  );
}
export default NotFound;
