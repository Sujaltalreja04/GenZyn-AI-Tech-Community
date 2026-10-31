import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Copy, Check } from "./icons";
import { useToast } from "./Toast";

export function TerminalShowcase() {
  const [activeTab, setActiveTab] = useState<"ts" | "rust" | "python">("ts");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<{ id: number; text: string; isCmd?: boolean }[]>([
    { id: 1, text: "Welcome to GenZyn shell v1.0.0" },
    { id: 2, text: "Type 'help' to see list of available commands." },
    { id: 3, text: "" }
  ]);
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  const snippets = {
    ts: `// Import GZ-Engine rendering primitives
import { GZEngine, Scene, Mesh } from "gz-engine";

const canvas = document.querySelector("#canvas");
const engine = new GZEngine({ canvas, antialias: true });

// Instantiate a glowing vector sphere mesh
const sphere = new Mesh.Sphere({
  radius: 2.5,
  segments: 32,
  color: "#E10600",
  glowIntensity: 1.5
});

engine.scene.add(sphere);
engine.animate((dt) => {
  sphere.rotation.y += 0.01 * dt;
});`,
    rust: `// High-performance microservice router in Rust
use axum::{routing::get, Router};
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(home_handler))
        .route("/events", get(list_events))
        .route("/team", get(get_contributors));

    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));
    println!("GenZyn microservices running on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}`,
    python: `# Train custom conversational AI model on codebase
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "genzyn/code-llama-3-8b"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name, 
    device_map="auto", 
    torch_dtype=torch.float16
)

prompt = "Write a fast React hook to fetch events."
inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
outputs = model.generate(**inputs, max_new_tokens=150)
print(tokenizer.decode(outputs[0]))`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    addToast("Code snippet copied!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = "";
    switch (cmd) {
      case "help":
        response = "Available commands:\n  help      - Show this guide\n  about     - About GenZyn\n  stats     - Community statistics\n  events    - Next big event details\n  clear     - Clear terminal logs";
        break;
      case "about":
        response = "GenZyn Tech Community is a global collective of young engineers and founders building open-source tooling, graphics engines, and fine-tuned AI workflows.";
        break;
      case "stats":
        response = "GenZyn stats:\n  - Members: 15,200+\n  - Code Written: 2.4M lines\n  - Active Countries: 85+";
        break;
      case "events":
        response = "Announcement: GenZyn Global Hackathon 2026\n  - Date: August 15-17, 2026\n  - Prize Pool: $50,000 USD\n  - Location: San Francisco & Discord";
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        response = `Command not recognized: '${cmd}'. Type 'help' for suggestions.`;
    }

    const nextId = Date.now();
    setTerminalHistory((prev) => [
      ...prev,
      { id: nextId, text: `genzyn-user$ ${terminalInput}`, isCmd: true },
      { id: nextId + 1, text: response },
      { id: nextId + 2, text: "" }
    ]);
    setTerminalInput("");
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  return (
    <motion.div
      className="terminal-showcase"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2.5rem",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto"
      }}
    >
      {/* Code Snippet Editor (Left) */}
      <div className="terminal-pane" style={{ flex: "1 1 500px" }}>
        <div
          className="card"
          style={{
            padding: 0,
            overflow: "hidden",
            background: "rgba(10, 10, 15, 0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            boxShadow: "var(--shadow-lg)"
          }}
        >
          {/* Header Bar */}
          <div
            className="terminal-toolbar"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(15, 15, 24, 0.5)",
              padding: "0.85rem 1.5rem",
              borderBottom: "1px solid var(--border)"
            }}
          >
            {/* Window Dots */}
            <div style={{ display: "flex", gap: "6px" }}>
              <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
              <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#eab308", display: "inline-block" }} />
              <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            </div>

            {/* Language Selection Tabs */}
            <div className="terminal-tabs" style={{ display: "flex", gap: "6px", background: "rgba(0,0,0,0.2)", padding: "3px", borderRadius: "8px" }}>
              {(["ts", "rust", "python"] as const).map((lang) => {
                const isActive = activeTab === lang;
                const labels = { ts: "main.ts", rust: "main.rs", python: "train.py" };
                return (
                  <button
                    key={lang}
                    onClick={() => setActiveTab(lang)}
                    style={{
                      border: "none",
                      background: isActive ? "var(--red)" : "transparent",
                      color: isActive ? "#fff" : "var(--text-dim)",
                      padding: "4px 12px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                  >
                    {labels[lang]}
                  </button>
                );
              })}
            </div>

            {/* Copy snippet button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-dim)",
                cursor: "pointer",
                padding: "6px",
                display: "flex",
                alignItems: "center"
              }}
            >
              {copied ? <Check size={15} style={{ color: "#22c55e" }} /> : <Copy size={15} />}
            </motion.button>
          </div>

          {/* Smooth Fade Code Panel */}
          <div className="terminal-code-panel" style={{ padding: "1.5rem", position: "relative", minHeight: "350px", maxHeight: "350px", overflowY: "auto", background: "rgba(0,0,0,0.2)" }}>
            <AnimatePresence mode="wait">
              <motion.pre
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                style={{
                  margin: 0,
                  fontSize: "0.85rem",
                  color: "#e2e8f0",
                  fontFamily: "monospace",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all"
                }}
              >
                <code>{snippets[activeTab]}</code>
              </motion.pre>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Interactive Terminal (Right) */}
      <div className="terminal-pane" style={{ flex: "1 1 400px" }}>
        <div
          className="card"
          style={{
            padding: 0,
            overflow: "hidden",
            background: "rgba(3, 3, 5, 0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            boxShadow: "var(--shadow-lg)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            minHeight: "403px",
            maxHeight: "403px"
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(10, 10, 15, 0.5)",
              padding: "0.85rem 1.5rem",
              borderBottom: "1px solid var(--border)",
              color: "var(--text-muted)",
              fontSize: "0.8rem",
              fontWeight: 600
            }}
          >
            <Terminal size={14} style={{ color: "var(--red)" }} />
            <span>Interactive GenZyn Shell</span>
          </div>

          {/* Smooth Terminal Command Line Logger */}
          <div
            style={{
              flexGrow: 1,
              padding: "1.5rem",
              overflowY: "auto",
              fontSize: "0.85rem",
              fontFamily: "monospace",
              color: "var(--text-muted)",
              lineHeight: 1.5,
              display: "flex",
              flexDirection: "column",
              gap: "6px"
            }}
          >
            <AnimatePresence>
              {terminalHistory.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {line.isCmd ? (
                    <span style={{ color: "var(--red)" }}>{line.text}</span>
                  ) : (
                    <span>{line.text}</span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={terminalEndRef} />
          </div>

          {/* Form console input */}
          <form
            className="terminal-input-row"
            onSubmit={handleTerminalSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(10, 10, 15, 0.6)",
              borderTop: "1px solid var(--border)",
              padding: "0.75rem 1.5rem"
            }}
          >
            <span style={{ color: "var(--red)", fontFamily: "monospace", marginRight: "8px", fontSize: "0.85rem", fontWeight: "bold" }}>
              genzyn-user$
            </span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="e.g. stats, events..."
              style={{
                flexGrow: 1,
                border: "none",
                background: "none",
                color: "#fff",
                fontSize: "0.85rem",
                fontFamily: "monospace",
                outline: "none"
              }}
            />
          </form>
        </div>
      </div>
    </motion.div>
  );
}
export default TerminalShowcase;
