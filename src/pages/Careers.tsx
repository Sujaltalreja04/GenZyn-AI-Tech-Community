import React, { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "../components/Modal";
import { useToast } from "../components/Toast";
import { FilterTabs } from "../components/FilterTabs";
import { Award, Users, Heart, Star, ChevronRight, Check } from "../components/icons";

export function Careers() {
  const [activeDepartment, setActiveDepartment] = useState("All");
  const [applyJob, setApplyJob] = useState<any | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [resume, setResume] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { addToast } = useToast();

  const departments = ["All", "Engineering", "Design", "Community", "Marketing"];

  const openPositions = [
    {
      title: "Senior React Core Developer",
      dept: "Engineering",
      type: "Part-time / Volunteer",
      compensation: "Stipend + Swag",
      description: "Own the development of our React-based dashboard, components styling library, and code review processes.",
      requirements: ["2+ years React/TypeScript experience", "Strong portfolio of open-source contributions", "Experience mentoring junior devs"],
    },
    {
      title: "DevOps Pipeline Engineer",
      dept: "Engineering",
      type: "Part-time / Volunteer",
      compensation: "Stipend + Cloud Credits",
      description: "Manage and optimize CI/CD pipelines, Docker configs, and deploy scripts for community open-source repositories.",
      requirements: ["Familiarity with GitHub Actions, Docker, and K8s", "Basic AWS/GCP configuration skills", "Strong shell scripting"],
    },
    {
      title: "Interaction Designer",
      dept: "Design",
      type: "Part-time / Volunteer",
      compensation: "Stipend + Swag",
      description: "Prototype interactive micro-interactions, graphics vectors, and design systems assets for GenZyn.",
      requirements: ["Figma proficiency & prototyping", "Knowledge of CSS/Framer Motion is a huge plus", "Portfolio showing UI transitions"],
    },
    {
      title: "Developer Advocate (DevRel)",
      dept: "Community",
      type: "Volunteer",
      compensation: "Event Invites + Swag",
      description: "Coordinate coding bootcamps, moderate our Discord help channels, and represent GenZyn at technical hackathons.",
      requirements: ["Excellent written and verbal communication", "Passionate about helping beginner coders", "Active Discord contributor"],
    },
    {
      title: "Technical Content Writer",
      dept: "Marketing",
      type: "Volunteer",
      compensation: "Stipend per Article",
      description: "Write tutorials, design guidelines summaries, and system design breakdown guides for our blog library.",
      requirements: ["Ability to explain complex CS/System patterns simply", "Basic Markdown experience", "GitHub repository familiarity"],
    },
  ];

  const perks = [
    { title: "Sponsor Grants", desc: "Top contributors and core volunteers receive grants to attend global summits and tech conferences.", icon: <Award size={24} /> },
    { title: "Cloud Credits", desc: "Access free AWS, GCP, OpenAI API, and Vercel hosting credits for your personal/community sandbox hacks.", icon: <Star size={24} /> },
    { title: "Network Access", desc: "Exclusive mock interviews, recommendations, and direct hiring fast-tracks to senior engineering leads.", icon: <Users size={24} /> },
    { title: "Team Retreats", desc: "Annual offline weekend meetup/retreat in SF or Bangalore chapters for brainstorming and alignment.", icon: <Heart size={24} /> },
  ];

  const filteredPositions = openPositions.filter((pos) => {
    return activeDepartment === "All" || pos.dept === activeDepartment;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      addToast("Please fill out required inputs.", "error");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      addToast(`Application for "${applyJob.title}" submitted successfully!`, "success");
      setSubmitting(false);
      setApplyJob(null);
      setName("");
      setEmail("");
      setGithub("");
      setResume("");
    }, 1200);
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
          Careers & Opportunities
        </span>
        <h1 className="gradient-text" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", marginBottom: "1.5rem", fontWeight: 800 }}>
          Life at GenZyn
        </h1>
        <p style={{ fontSize: "1.35rem", color: "var(--text-muted)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.7 }}>
          Want to help build the largest developer ecosystem on the web? Join our core volunteer crew and grow your skills.
        </p>
      </div>

      {/* Perks and Benefits grid */}
      <div className="main-container" style={{ paddingTop: "2rem", marginBottom: "6rem" }}>
        <div className="section-header">
          <h2>
            Perks & <span className="gradient-text">Benefits</span>
          </h2>
          <p>Why developers, designers, and students love volunteer contributions inside the GenZyn core team.</p>
          <div className="section-divider" style={{ background: "var(--accent-gradient)" }} />
        </div>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
          {perks.map((perk, idx) => (
            <div key={idx} className="card glass" style={{ padding: "2.5rem 2rem", background: "rgba(16, 16, 24, 0.4)", border: "1px solid var(--border)", borderRadius: "16px" }}>
              <div style={{ color: "var(--red)", marginBottom: "1.25rem" }}>{perk.icon}</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>{perk.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                {perk.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Positions list */}
      <div className="main-container" style={{ marginBottom: "6rem" }}>
        <div className="section-header">
          <h2>
            Open <span className="gradient-text">Positions</span>
          </h2>
          <p>Filter core operations team opportunities by department. Apply to join within minutes.</p>
          <div className="section-divider" style={{ background: "var(--accent-gradient)" }} />
        </div>

        {/* Filter bar */}
        <div className="standalone-filter-row" style={{ marginBottom: "3rem" }}>
          <FilterTabs categories={departments} activeCategory={activeDepartment} onCategoryChange={setActiveDepartment} />
        </div>

        {/* Positions Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
          {filteredPositions.map((pos, idx) => (
            <div
              key={idx}
              className="card glass"
              style={{
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                background: "rgba(16, 16, 24, 0.4)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                <div>
                  <span className="badge" style={{ fontSize: "0.75rem", marginRight: "10px" }}>{pos.dept}</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>{pos.type} &bull; {pos.compensation}</span>
                </div>
                <button
                  onClick={() => setApplyJob(pos)}
                  className="btn-primary"
                  style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem", boxShadow: "none" }}
                >
                  <span>Apply Now</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              <h3 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0 }}>{pos.title}</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                {pos.description}
              </p>

              <div>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-secondary)" }}>
                  Requirements:
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {pos.requirements.map((req, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--text-muted)" }}>
                      <Check size={14} style={{ color: "var(--success)" }} />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Job Modal */}
      <Modal isOpen={applyJob !== null} onClose={() => setApplyJob(null)} title={applyJob ? `Apply: ${applyJob.title}` : ""}>
        {applyJob && (
          <form onSubmit={handleApplySubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: 0 }}>
              Apply for the <strong>{applyJob.title}</strong> role in the <strong>{applyJob.dept}</strong> department.
            </p>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Full Name *</label>
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
              <label className="form-label">Email Address *</label>
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
              <label className="form-label">GitHub or Portfolio URL *</label>
              <input
                type="url"
                className="input"
                required
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/yourusername"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Resume / Cover Letter Link</label>
              <input
                type="url"
                className="input"
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="https://drive.google.com/... or your website"
              />
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button type="button" onClick={() => setApplyJob(null)} className="btn-secondary" style={{ flex: 1, padding: "0.75rem" }}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ flex: 1, padding: "0.75rem", boxShadow: "none" }}
              >
                {submitting ? "Submitting Application..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </motion.section>
  );
}
export default Careers;
