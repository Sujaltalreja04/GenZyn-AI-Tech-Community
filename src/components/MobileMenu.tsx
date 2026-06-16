import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/resources", label: "Resources" },
  { to: "/events", label: "Events" },
  { to: "/blog", label: "Blog" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <>
      <button
        className="hamburger"
        onClick={toggle}
        aria-label="Toggle menu"
        style={{
          display: "none", // CSS shows it on mobile
          flexDirection: "column",
          gap: "5px",
          cursor: "pointer",
          zIndex: 1001,
          background: "none",
          border: "none",
          padding: "8px",
        }}
      >
        {isOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              background: "rgba(3, 3, 5, 0.97)",
              backdropFilter: "blur(20px)",
              zIndex: 999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
              >
                <Link
                  to={link.to}
                  onClick={close}
                  style={{
                    color: location.pathname === link.to ? "#E10600" : "#e5e7eb",
                    fontSize: "1.8rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <Link to="/" onClick={close} className="btn-primary" style={{ marginTop: "1rem", padding: "0.75rem 2rem" }}>
                Join Community
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
