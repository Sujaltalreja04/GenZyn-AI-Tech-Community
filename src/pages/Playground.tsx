import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "../components/Toast";
import { Code, Copy, Play, Pause, RotateCcw, Sliders, Settings } from "lucide-react";

export function Playground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { addToast } = useToast();

  // Settings states
  const [speed, setSpeed] = useState(1);
  const [count, setCount] = useState(40);
  const [distance, setDistance] = useState(100);
  const [particleColor, setParticleColor] = useState("#e10600");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 400);

    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.radius = Math.random() * 3 + 2;
      }

      update() {
        if (isPaused) return;

        // adjust velocity dynamically if speed slider changes
        const currentSpeed = Math.hypot(this.vx, this.vy);
        if (currentSpeed > 0 && Math.abs(currentSpeed - speed * 0.4) > 0.05) {
          const ratio = (speed * 0.4) / currentSpeed;
          this.vx *= ratio;
          this.vy *= ratio;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Bounce bounds
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = particleColor;
        c.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    init();

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 600;
      height = canvas.height = 400;
      init();
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < distance) {
            const alpha = (1 - dist / distance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Convert hex to rgb
            const r = parseInt(particleColor.slice(1, 3), 16);
            const g = parseInt(particleColor.slice(3, 5), 16);
            const b = parseInt(particleColor.slice(5, 7), 16);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [count, distance, speed, particleColor, isPaused]);

  const configCode = `import { GZEngine } from "gz-engine";

const scene = new GZEngine({
  container: "#canvas-target",
  particles: {
    count: ${count},
    speed: ${speed},
    color: "${particleColor}",
    connection: {
      distance: ${distance},
      color: "${particleColor}4d"
    }
  }
});

scene.render();`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(configCode);
    addToast("Config code copied to clipboard!", "success");
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ paddingBottom: "100px" }}
    >
      {/* Hero */}
      <div className="main-container" style={{ paddingTop: "160px", paddingBottom: "3rem", textAlign: "center" }}>
        <span className="badge" style={{ marginBottom: "1.5rem" }}>
          Interactive Sandbox
        </span>
        <h1 className="gradient-text" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", marginBottom: "1.5rem", fontWeight: 800 }}>
          GZ-Engine Playground
        </h1>
        <p style={{ fontSize: "1.35rem", color: "var(--text-muted)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.7 }}>
          Customize connection distances, node counts, rendering velocity, and accent colors. Grab the auto-generated boilerplate configuration.
        </p>
      </div>

      <div className="main-container" style={{ paddingTop: "2rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem" }}>
          {/* Visual Canvas Panel */}
          <div style={{ flex: "1 1 55%" }}>
            <div className="card glass" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                  GZ-Engine Real-time Canvas (2D Simulation)
                </span>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="btn-icon"
                    style={{ width: "32px", height: "32px" }}
                    title={isPaused ? "Play" : "Pause"}
                  >
                    {isPaused ? <Play size={14} /> : <Pause size={14} />}
                  </button>
                  <button
                    onClick={() => {
                      setSpeed(1);
                      setCount(40);
                      setDistance(100);
                      setParticleColor("#e10600");
                      setIsPaused(false);
                      addToast("Reset settings to defaults.", "info");
                    }}
                    className="btn-icon"
                    style={{ width: "32px", height: "32px" }}
                    title="Reset"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
              </div>

              {/* Canvas element */}
              <div style={{ background: "#05050a", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden", height: "400px", display: "flex" }}>
                <canvas ref={canvasRef} style={{ width: "100%", display: "block" }} />
              </div>
            </div>
          </div>

          {/* Control Settings & Code */}
          <div style={{ flex: "1 1 35%", display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Sliders Panel */}
            <div className="card glass" style={{ padding: "2rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <Sliders size={18} style={{ color: "var(--red)" }} />
                <span>Engine Settings</span>
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                    <span>Node Count</span>
                    <span>{count} nodes</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    style={{ accentColor: "var(--red)", cursor: "pointer" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                    <span>Simulation Speed</span>
                    <span>{speed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    style={{ accentColor: "var(--red)", cursor: "pointer" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                    <span>Connection Range</span>
                    <span>{distance}px</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))}
                    style={{ accentColor: "var(--red)", cursor: "pointer" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "0.85rem" }}>Accent Hex Color</label>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <input
                      type="color"
                      value={particleColor}
                      onChange={(e) => setParticleColor(e.target.value)}
                      style={{ border: "none", background: "none", cursor: "pointer", width: "40px", height: "40px" }}
                    />
                    <input
                      type="text"
                      className="input"
                      value={particleColor}
                      onChange={(e) => setParticleColor(e.target.value)}
                      style={{ padding: "6px 12px", fontSize: "0.9rem" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Config Output Panel */}
            <div className="card glass" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                  <Code size={16} style={{ color: "var(--red)" }} />
                  <span>Config Boilerplate</span>
                </h3>
                <button
                  onClick={copyToClipboard}
                  className="btn-icon"
                  style={{ width: "32px", height: "32px" }}
                  title="Copy Config Code"
                >
                  <Copy size={12} />
                </button>
              </div>

              <pre
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "1rem",
                  fontSize: "0.8rem",
                  color: "#e5e7eb",
                  overflowX: "auto",
                  fontFamily: "monospace",
                  margin: 0,
                }}
              >
                <code>{configCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
export default Playground;
