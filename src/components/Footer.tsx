import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin, Whatsapp } from "./SocialIcons";
import { NewsletterForm } from "./NewsletterForm";

// Replace this with the owner-supplied WhatsApp Community invite URL when available.
const WHATSAPP_URL = "https://www.whatsapp.com/";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" style={{ borderTop: "1px solid var(--border)", background: "var(--bg-secondary)", padding: "5rem 0 2rem" }}>
      <div className="main-container">
        {/* Top footer grid */}
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-col" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, fontFamily: "var(--font-display)" }}>
              GenZyn <span className="gradient-text">Community</span>
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6", maxWidth: "280px" }}>
              A premium, tech-focused ecosystem empowering the next generation of software engineers, designers, and innovators.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/events">Events & Hackathons</Link>
              <Link to="/team">Meet The Team</Link>
              <Link to="/careers">Careers</Link>
            </div>
          </div>

          {/* Column 3: Community & Insights */}
          <div className="footer-col">
            <h4>Resources</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Link to="/resources">Learning Resources</Link>
              <Link to="/blog">Blog Insights</Link>
              <Link to="/contact">Get in Touch</Link>
              <a href="https://github.com/genzyn" target="_blank" rel="noreferrer">GitHub Org</a>
              <a href="https://discord.gg/genzyn" target="_blank" rel="noreferrer">Discord Guild</a>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-col" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h4>Stay Updated</h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
              Subscribe to get latest updates on tech stack guides, newsletters, and exclusive hackathons.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom footer strip */}
        <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "2rem", borderTop: "1px solid var(--border)", marginTop: "3rem" }}>
          <div style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>
            &copy; {currentYear} GenZyn Community. All rights reserved. &bull; <Link to="/privacy" style={{ color: "inherit" }}>Privacy Policy</Link> &bull; <Link to="/terms" style={{ color: "inherit" }}>Terms of Service</Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {/* Social icons */}
            <div className="footer-social" style={{ display: "flex", gap: "0.75rem" }} aria-label="GenZyn social links">
              <a href="https://twitter.com/genzyn" target="_blank" rel="noreferrer" className="btn-icon" aria-label="GenZyn on Twitter" title="Twitter">
                <Twitter size={18} aria-hidden="true" />
              </a>
              <a href="https://github.com/genzyn" target="_blank" rel="noreferrer" className="btn-icon" aria-label="GenZyn on GitHub" title="GitHub">
                <Github size={18} aria-hidden="true" />
              </a>
              <a href="https://linkedin.com/company/genzyn" target="_blank" rel="noreferrer" className="btn-icon" aria-label="GenZyn on LinkedIn" title="LinkedIn">
                <Linkedin size={18} aria-hidden="true" />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-icon" aria-label="GenZyn on WhatsApp" title="WhatsApp">
                <Whatsapp size={19} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

