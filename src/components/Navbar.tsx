import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bell, Menu, Sun, Moon } from "lucide-react";
import logo from "../assets/LOGO.jpeg";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { MobileMenu } from "./MobileMenu";
import { useToast } from "./Toast";

export function Navbar() {
  const { scrollY, scrollDirection, isAtTop } = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const { addToast } = useToast();

  const [theme, setTheme] = useLocalStorage<"dark" | "light">("genzyn_theme", "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    addToast(`Switched to ${nextTheme} theme mode!`, "success");
  };

  const handleNotificationClick = () => {
    if (notifications > 0) {
      addToast(`You have ${notifications} new updates: Check upcoming events and hackathons!`, "info");
      setNotifications(0);
    } else {
      addToast("No new notifications.", "info");
    }
  };

  // Sticky header class & transform logic
  const isHidden = scrollDirection === "down" && scrollY > 100;

  return (
    <>
      <nav
        className={`navbar glass ${!isAtTop ? "scrolled" : ""}`}
        style={{
          padding: !isAtTop ? "15px 5%" : "25px 5%",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 998,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          borderRadius: 0,
          transform: isHidden ? "translateY(-100%)" : "translateY(0)",
          boxShadow: !isAtTop ? "var(--shadow-md)" : "none",
        }}
      >
        <div className="logo" style={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            <img
              src={logo}
              alt="GenZyn Logo"
              style={{ borderRadius: "8px", height: "40px", objectFit: "cover", display: "block" }}
            />
          </Link>
        </div>

        <ul className="nav-links" style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/resources" className={({ isActive }) => (isActive ? "active" : "")}>
              Resources
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" className={({ isActive }) => (isActive ? "active" : "")}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => (isActive ? "active" : "")}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/team" className={({ isActive }) => (isActive ? "active" : "")}>
              Team
            </NavLink>
          </li>
        </ul>

        <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          {/* Notification Bell */}
          <button
            onClick={handleNotificationClick}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              position: "relative",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <Bell size={20} />
            {notifications > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  background: "var(--red)",
                  color: "#fff",
                  fontSize: "0.65rem",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 10px var(--red-glow)",
                }}
              >
                {notifications}
              </span>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            aria-label="Toggle theme mode"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User Dashboard shortcut */}
          <NavLink to="/dashboard" style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-secondary)", marginRight: "4px" }}>
            Dashboard
          </NavLink>

          <Link to="/contact" className="button">
            Join Community
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div style={{ display: "none" }} className="mobile-menu-btn-container">
          {/* We rely on css to display/hide elements in .mobile-menu-btn-container or we can do it inline */}
        </div>
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text)",
            padding: "5px",
            display: "none", // Managed by CSS, but set fallback
          }}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}



