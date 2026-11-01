import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, projectCategories } from "../data/projects";
import { FilterTabs } from "../components/FilterTabs";
import { SearchBar } from "../components/SearchBar";
import { ViewModeToggle, type ViewMode } from "../components/ViewModeToggle";
import { Modal } from "../components/Modal";
import { useToast } from "../components/Toast";
import { Star, GitFork, Users, Plus, Award, BookOpen, ExternalLink } from "../components/icons";
import { Github } from "../components/SocialIcons";

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const { addToast } = useToast();

  // Form states
  const [projTitle, setProjTitle] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projTech, setProjTech] = useState("");
  const [projCategory, setProjCategory] = useState("Open Source");
  const [projLink, setProjLink] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Project of the Month (Spotlight)
  const spotlightProject = projects.find((p) => p.id === "ui-glass") || projects[0];

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projDesc || !projLink) {
      addToast("Please fill in all required fields.", "error");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      // Store in localStorage for Dashboard syncing
      const userProj = JSON.parse(localStorage.getItem("genzyn_user_projects") || "[]");
      userProj.push({
        title: projTitle,
        description: projDesc,
        tech: projTech.split(",").map((t) => t.trim()).filter(Boolean),
        category: projCategory,
        link: projLink,
      });
      localStorage.setItem("genzyn_user_projects", JSON.stringify(userProj));

      addToast(`Project "${projTitle}" submitted successfully! Admins will review it.`, "success");
      setSubmitting(false);
      setIsSubmitOpen(false);
      setProjTitle("");
      setProjDesc("");
      setProjTech("");
      setProjCategory("Open Source");
      setProjLink("");
    }, 1200);
  };

  // Stable illustrative contribution graph data (18 weeks x 7 days).
  const weeks = 18;
  const days = 7;
  const contributionGrid = Array.from(
    { length: weeks * days },
    (_, index) => (index * 7 + Math.floor(index / 5)) % 4,
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ paddingBottom: "100px" }}
    >
      {/* Page Hero */}
      <div className="main-container" style={{ paddingTop: "160px", paddingBottom: "3rem", textAlign: "center" }}>
        <span className="badge" style={{ marginBottom: "1.5rem" }}>
          Community Repositories
        </span>
        <h1 className="gradient-text" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", marginBottom: "1.5rem", fontWeight: 800 }}>
          Community Projects
        </h1>
        <p style={{ fontSize: "1.35rem", color: "var(--text-muted)", maxWidth: "800px", margin: "0 auto 3rem", lineHeight: 1.7 }}>
          Discover and contribute to open-source packages, SaaS templates, developer tools, and AI prototypes built by GenZyn members.
        </p>
      </div>

      {/* Project of the Month (Spotlight) */}
      <section className="main-container" style={{ marginBottom: "5rem" }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(225, 6, 0, 0.08) 0%, rgba(16, 16, 24, 0.4) 100%)",
            border: "1px solid rgba(225, 6, 0, 0.25)",
            borderRadius: "24px",
            padding: "3.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          <div style={{ flex: "1 1 400px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem", color: "var(--red)" }}>
              <Award size={20} />
              <span style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
                Project of the Month
              </span>
            </div>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem", fontWeight: 800 }}>{spotlightProject.title}</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              {spotlightProject.longDescription}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
              {spotlightProject.tech.map((t, idx) => (
                <span key={idx} className="tag tag-accent">
                  {t}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="https://github.com/Sujaltalreja04" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ boxShadow: "none" }}>
                <Github size={16} />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>

          {/* GitHub Style Contribution graph simulation */}
          <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className="card" style={{ background: "rgba(0, 0, 0, 0.5)", border: "1px solid var(--border)", padding: "1.5rem" }}>
              <h4 className="light-surface-text" style={{ fontSize: "0.95rem", marginBottom: "1rem", color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
                <BookOpen size={16} style={{ color: "var(--red)" }} />
                <span>Ecosystem Contribution Matrix</span>
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                Real-time merge requests and commits across all GenZyn managed repositories.
              </p>

              {/* Matrix Board */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${weeks}, 12px)`,
                  gridAutoRows: "12px",
                  gap: "3px",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                {contributionGrid.map((level, idx) => {
                  const colors = [
                    "rgba(255, 255, 255, 0.03)", // 0
                    "rgba(225, 6, 0, 0.25)", // 1
                    "rgba(225, 6, 0, 0.55)", // 2
                    "rgba(225, 6, 0, 0.95)", // 3
                  ];
                  return (
                    <div
                      key={idx}
                      style={{
                        background: colors[level],
                        borderRadius: "2px",
                        width: "100%",
                        height: "100%",
                        transition: "background 0.3s",
                      }}
                      title={`${level * 3 + 1} commits in past week`}
                    />
                  );
                })}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", color: "var(--text-dim)" }}>
                <span>Less active</span>
                <span>More active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="main-container">
        <div
          className="filter-toolbar"
          style={{
            marginBottom: "3.5rem",
            background: "rgba(255, 255, 255, 0.01)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
          }}
        >
          <div className="filter-toolbar-search">
            <SearchBar query={searchQuery} onQueryChange={setSearchQuery} placeholder="Search project title or stack..." />
          </div>
          <FilterTabs categories={projectCategories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          <ViewModeToggle value={viewMode} onChange={setViewMode} label="Project layout" />
        </div>

        {/* Project Cards Listing */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)" }}
            >
              <h3>No projects matched the filters.</h3>
              <p>Try resetting the search bar or choosing another category.</p>
            </motion.div>
          ) : viewMode === "grid" ? (
            <motion.div layout className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
              {filteredProjects.map((proj) => (
                <motion.div
                  layout
                  key={proj.id}
                  className="card-interactive"
                  style={{
                    padding: "2.5rem 2rem",
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(16, 16, 24, 0.4)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                  }}
                  whileHover={{ y: -8, borderColor: "var(--border-hover)", boxShadow: "0 8px 30px var(--red-glow)" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <span className="badge" style={{ fontSize: "0.75rem", padding: "4px 10px" }}>
                      {proj.category}
                    </span>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  <h3 style={{ fontSize: "1.4rem", marginBottom: "0.75rem", fontWeight: 700 }}>{proj.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6, flexGrow: 1, marginBottom: "1.5rem" }}>
                    {proj.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "1.5rem" }}>
                    {proj.tech.map((t, idx) => (
                      <span key={idx} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* GitHub Info Footer */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "1rem",
                      borderTop: "1px solid var(--border)",
                      fontSize: "0.8rem",
                      color: "var(--text-dim)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Star size={12} />
                      <span>{proj.stars.toLocaleString()}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Users size={12} />
                      <span>{proj.contributors} contributors</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <GitFork size={12} />
                      <span>{proj.forks}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="project-list"
            >
              {filteredProjects.map((proj) => (
                <motion.article layout key={proj.id} className="card-interactive project-list-item">
                  <div className="project-list-content">
                    <div className="project-list-heading">
                      <span className="badge">{proj.category}</span>
                      <h3>{proj.title}</h3>
                    </div>
                    <p>{proj.description}</p>
                    <div className="project-list-tags">
                      {proj.tech.map((technology) => (
                        <span key={technology} className="tag">{technology}</span>
                      ))}
                    </div>
                  </div>

                  <div className="project-list-actions">
                    <div className="project-list-stats" aria-label="Repository statistics">
                      <span><Star size={14} /> {proj.stars.toLocaleString()}</span>
                      <span><Users size={14} /> {proj.contributors}</span>
                      <span><GitFork size={14} /> {proj.forks}</span>
                    </div>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-icon"
                      aria-label={`Open ${proj.title} repository`}
                      title="Open repository"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* CTA: Submit Your Project */}
      <section className="main-container" style={{ padding: "6rem 2rem 0" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass"
          style={{
            padding: "4rem",
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(225, 6, 0, 0.05) 0%, rgba(10, 10, 15, 0.6) 100%)",
            borderRadius: "24px",
            border: "1px solid rgba(225, 6, 0, 0.15)",
          }}
        >
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Building something cool?</h2>
          <p style={{ fontSize: "1.15rem", color: "var(--text-muted)", marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
            Submit your project repository. We review submissions weekly and feature high-tier developer utilities in our spotlight.
          </p>
          <button
            onClick={() => setIsSubmitOpen(true)}
            className="btn-primary"
            style={{ padding: "0.9rem 2.5rem", fontSize: "1.1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Plus size={18} />
            <span>Submit Your Project</span>
          </button>
        </motion.div>
      </section>

      {/* Project Submission Modal */}
      <Modal isOpen={isSubmitOpen} onClose={() => setIsSubmitOpen(false)} title="Submit Your Project">
        <form onSubmit={handleProjectSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Project Title *</label>
            <input
              type="text"
              className="input"
              required
              placeholder="e.g. Astro-Glow"
              value={projTitle}
              onChange={(e) => setProjTitle(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Brief Description *</label>
            <textarea
              className="textarea"
              required
              placeholder="Explain what it does under 150 characters..."
              value={projDesc}
              onChange={(e) => setProjDesc(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Primary Category</label>
            <select
              className="input"
              value={projCategory}
              onChange={(e) => setProjCategory(e.target.value)}
              style={{ background: "#0a0a0f", border: "1px solid var(--border)", color: "#fff" }}
            >
              <option value="Open Source">Open Source</option>
              <option value="AI/ML">AI/ML</option>
              <option value="DevOps">DevOps</option>
              <option value="Design">Design</option>
              <option value="Blockchain">Blockchain</option>
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Tech Stack (comma-separated)</label>
            <input
              type="text"
              className="input"
              placeholder="e.g. React, Rust, WASM"
              value={projTech}
              onChange={(e) => setProjTech(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">GitHub Repository Link *</label>
            <input
              type="url"
              className="input"
              required
              placeholder="https://github.com/username/project"
              value={projLink}
              onChange={(e) => setProjLink(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button type="button" onClick={() => setIsSubmitOpen(false)} className="btn-secondary" style={{ flex: 1, padding: "0.75rem" }}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary"
              style={{ flex: 1, padding: "0.75rem", boxShadow: "none" }}
            >
              {submitting ? "Submitting..." : "Submit Project"}
            </button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
export default Projects;
