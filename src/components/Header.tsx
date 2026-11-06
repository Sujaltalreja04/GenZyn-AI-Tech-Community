import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="glass" style={{ padding: "1rem 2rem", marginBottom: "2rem" }}>
      <div className="main-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <img src="/genzyn-logo-96.jpg" alt="GenZyn Community" width={40} height={40} decoding="async" style={{ height: "40px" }} />
        <nav>
          <ul style={{ display: "flex", gap: "1.5rem", listStyle: "none", margin: 0, padding: 0 }}>
            <li><a href="#hero">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#community">Community</a></li>
            <li><a href="#footer">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
