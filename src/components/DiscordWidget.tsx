import { useState, useEffect } from "react";
import { MessageSquare, Users, Sparkles, Send } from "lucide-react";

export function DiscordWidget() {
  const [onlineCount, setOnlineCount] = useState(15243);
  const [activeChat, setActiveChat] = useState<"general" | "announcements" | "showcase">("general");

  // Simulate slowly fluctuating online count
  useEffect(() => {
    const timer = setInterval(() => {
      setOnlineCount((prev) => prev + Math.floor(Math.random() * 11) - 5);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const generalMessages = [
    { user: "sujal.eth", text: "Has anyone checked GZ-Engine rendering speeds on mobile? It feels blazing fast." },
    { user: "aanya_v", text: "Yep, we added WebGL state optimizations last week. Rust WASM bundle is under 12kb!" },
    { user: "rohan_coder", text: "Nice! Are there any active hackathons open right now? Want to join a team." },
    { user: "moderator_bot", text: "RSVPs for GenZyn Hack 2026 are open. Register on the /events page!" },
  ];

  const announcements = [
    { user: "GenZyn Lead", text: "📢 Summit v2.0 registrations are now open. We have speakers from Google AI!" },
    { user: "GZ-Engine Core", text: "🚀 GZ-Engine v2.4 stable is released! Custom Canvas Particle Field is now live." },
  ];

  const showcase = [
    { user: "alex_m", text: "Check out my new Next.js SaaS starter template. Fully modular tailwind." },
    { user: "sofia_designer", text: "Just uploaded our Glassmorphism Figma asset kit. 60+ responsive tokens." },
  ];

  const chatFeeds = {
    general: generalMessages,
    announcements: announcements,
    showcase: showcase,
  };

  return (
    <div
      className="card"
      style={{
        background: "rgba(88, 101, 242, 0.05)", // subtle discord blurple
        border: "1px solid rgba(88, 101, 242, 0.2)",
        borderRadius: "20px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <MessageSquare style={{ color: "#5865F2" }} size={24} />
          <div>
            <h3 style={{ fontSize: "1.2rem", margin: 0, fontWeight: 800 }}>Discord Live Feed</h3>
            <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              {onlineCount.toLocaleString()} Members Online
            </span>
          </div>
        </div>

        <a
          href="https://discord.gg/genzyn"
          target="_blank"
          rel="noreferrer"
          className="button"
          style={{
            background: "#5865F2",
            boxShadow: "0 4px 15px rgba(88, 101, 242, 0.3)",
            fontSize: "0.85rem",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
          }}
        >
          Join Discord
        </a>
      </div>

      {/* Tab selectors for mock channels */}
      <div style={{ display: "flex", gap: "4px", background: "rgba(0,0,0,0.2)", padding: "3px", borderRadius: "8px" }}>
        {(["general", "announcements", "showcase"] as const).map((chan) => {
          const isActive = activeChat === chan;
          return (
            <button
              key={chan}
              onClick={() => setActiveChat(chan)}
              style={{
                flex: 1,
                border: "none",
                background: isActive ? "rgba(88, 101, 242, 0.2)" : "transparent",
                color: isActive ? "#fff" : "var(--text-muted)",
                cursor: "pointer",
                padding: "6px",
                fontSize: "0.8rem",
                borderRadius: "6px",
                fontWeight: 600,
                textTransform: "capitalize",
                transition: "all 0.2s",
              }}
            >
              #{chan}
            </button>
          );
        })}
      </div>

      {/* Messages layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxHeight: "220px",
          overflowY: "auto",
          background: "rgba(0,0,0,0.15)",
          borderRadius: "10px",
          padding: "1rem",
        }}
      >
        {chatFeeds[activeChat].map((msg, idx) => (
          <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#9ca3af" }}>@{msg.user}</span>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
              {msg.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default DiscordWidget;
