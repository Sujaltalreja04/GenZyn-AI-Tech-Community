import { useState } from "react";
import { motion } from "framer-motion";
import { leadership, engineering, design, community, ambassadors } from "../data/team";
import { Modal } from "../components/Modal";
import { useToast } from "../components/Toast";
import { Mail, Heart, Globe, Award, ChevronRight } from "lucide-react";
import { Twitter, Github, Linkedin } from "../components/SocialIcons";

export function Team() {
  const [appRole, setAppRole] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      addToast("Please fill in your name and email.", "error");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      addToast(`Application for ${appRole} role received! We will follow up.`, "success");
      setSubmitting(false);
      setAppRole(null);
      setName("");
      setEmail("");
      setPortfolio("");
    }, 1200);
  };

  const TeamGrid = ({ members, delayOffset = 0, colorVar = "--red" }: { members: any[]; delayOffset?: number; colorVar?: string }) => (
    <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
      {members.map((member, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 + delayOffset }}
          className="card glass"
          style={{
            padding: "2.5rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            background: "rgba(16, 16, 24, 0.4)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
          }}
          whileHover={{
            y: -10,
            borderColor: `var(${colorVar}-hover, var(--border-hover))`,
            boxShadow: `0 12px 30px var(--red-glow)`,
          }}
        >
          {/* Avatar container */}
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, var(${colorVar}, --red), var(--accent))`,
              margin: "0 auto 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.75rem",
              fontWeight: 800,
              fontFamily: "var(--font-display)",
              color: "#fff",
              boxShadow: `0 0 20px var(--red-glow)`,
            }}
          >
            {member.name.charAt(0)}
          </div>

          <h3 style={{ fontSize: "1.25rem", margin: "0 0 4px 0", fontWeight: 700 }}>{member.name}</h3>
          <p style={{ color: `var(${colorVar}, --red)`, fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem" }}>
            {member.role}
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.6, flexGrow: 1, margin: 0 }}>
            {member.bio}
          </p>

          {/* Socials */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "1.5rem" }}>
            {member.twitter && (
              <a href={member.twitter} target="_blank" rel="noreferrer" className="btn-icon" style={{ width: "32px", height: "32px" }}>
                <Twitter size={14} />
              </a>
            )}
            {member.github && (
              <a href={member.github} target="_blank" rel="noreferrer" className="btn-icon" style={{ width: "32px", height: "32px" }}>
                <Github size={14} />
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noreferrer" className="btn-icon" style={{ width: "32px", height: "32px" }}>
                <Linkedin size={14} />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ paddingBottom: "100px" }}
    >
      <div className="main-container" style={{ paddingTop: "160px", paddingBottom: "4rem", textAlign: "center" }}>
        <span className="badge" style={{ marginBottom: "1.5rem" }}>
          Core Contributors
        </span>
        <h1 className="gradient-text" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", marginBottom: "1rem", fontWeight: 800, lineHeight: 1.1 }}>
          Meet The Team
        </h1>
        <p style={{ fontSize: "1.35rem", color: "var(--text-muted)", maxWidth: "800px", margin: "0 auto" }}>
          The passionate developers, designers, and growth advocates shaping the GenZyn ecosystem.
        </p>
      </div>

      {/* Leadership */}
      <div className="main-container" style={{ marginBottom: "6rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Leadership Board</h2>
          <div style={{ width: "40px", height: "4px", background: "var(--accent-gradient)", borderRadius: "2px" }} />
        </div>
        <TeamGrid members={leadership} colorVar="--red" />
      </div>

      {/* Engineering */}
      <div style={{ background: "rgba(255,255,255,0.01)", padding: "5rem 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: "6rem" }}>
        <div className="main-container">
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Core Engineering</h2>
            <div style={{ width: "40px", height: "4px", background: "var(--accent-gradient)", borderRadius: "2px" }} />
          </div>
          <TeamGrid members={engineering} delayOffset={0.15} />
        </div>
      </div>

      {/* Design & Creative */}
      <div className="main-container" style={{ marginBottom: "6rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Design & Creative</h2>
          <div style={{ width: "40px", height: "4px", background: "var(--accent-gradient)", borderRadius: "2px" }} />
        </div>
        <TeamGrid members={design} delayOffset={0.1} />
      </div>

      {/* Community & Growth */}
      <div style={{ background: "rgba(255,255,255,0.01)", padding: "5rem 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: "6rem" }}>
        <div className="main-container">
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Community & Growth</h2>
            <div style={{ width: "40px", height: "4px", background: "var(--accent-gradient)", borderRadius: "2px" }} />
          </div>
          <TeamGrid members={community} delayOffset={0.1} />
        </div>
      </div>

      {/* Ambassadors */}
      <div className="main-container" style={{ marginBottom: "6rem" }}>
        <div className="section-header">
          <h2>
            Global <span className="gradient-text">Ambassadors</span>
          </h2>
          <p>Organizing hacking cohorts, meetups, and workshops in technology hubs across the world.</p>
          <div className="section-divider" style={{ background: "var(--accent-gradient)" }} />
        </div>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {ambassadors.map((amb, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass"
              style={{
                padding: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                background: "rgba(16, 16, 24, 0.4)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, var(--red), var(--primary))`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "1rem",
                }}
              >
                {amb.region.charAt(0)}
              </div>
              <div>
                <h4 style={{ fontSize: "1.05rem", margin: "0 0 2px 0", fontWeight: 700 }}>{amb.name}</h4>
                <div style={{ color: "var(--red)", fontSize: "0.8rem", fontWeight: 600 }}>{amb.region}</div>
                <div style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>
                  {amb.city} &bull; {amb.members.toLocaleString()} members
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Join CTA */}
      <div className="main-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass"
          style={{
            padding: "5rem 2rem",
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(225,6,0,0.05) 0%, rgba(10, 10, 15, 0.6) 100%)",
            borderRadius: "24px",
            border: "1px solid rgba(225, 6, 0, 0.15)",
          }}
        >
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Join The <span className="gradient-text">Core Team</span>
          </h2>
          <p style={{ fontSize: "1.15rem", color: "var(--text-muted)", marginBottom: "3rem", maxWidth: "600px", margin: "0 auto 3rem" }}>
            We are looking for motivated volunteer leaders in technical coaching, writing, designing, and system dev.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setAppRole("General Volunteer")} className="btn-primary" style={{ padding: "0.9rem 2rem" }}>
              Apply Core Staff
            </button>
            <button onClick={() => setAppRole("Campus Ambassador")} className="btn-secondary" style={{ padding: "0.9rem 2rem" }}>
              Become Ambassador
            </button>
          </div>
        </motion.div>
      </div>

      {/* Job Application Modal */}
      <Modal isOpen={appRole !== null} onClose={() => setAppRole(null)} title={`Apply for ${appRole}`}>
        {appRole && (
          <form onSubmit={handleApplySubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: 0 }}>
              Apply to join the GenZyn operational team. We'll review your links and get in touch within a week.
            </p>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Name</label>
              <input
                type="text"
                className="input"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aarav Chen"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Email</label>
              <input
                type="email"
                className="input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">GitHub / Portfolio Link</label>
              <input
                type="url"
                className="input"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button type="button" onClick={() => setAppRole(null)} className="btn-secondary" style={{ flex: 1, padding: "0.75rem" }}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ flex: 1, padding: "0.75rem", boxShadow: "none" }}
              >
                {submitting ? "Sending..." : "Submit Application"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </motion.section>
  );
}
export default Team;
