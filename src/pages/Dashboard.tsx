import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../components/Toast";
import { Link } from "react-router-dom";
import {
  User,
  Bookmark,
  Calendar,
  Code,
  LogOut,
  Settings,
  Shield,
  Briefcase,
  ExternalLink,
  Trash2,
  Rocket
} from "lucide-react";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "bookmarks" | "rsvps" | "projects">("overview");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [userProjects, setUserProjects] = useState<any[]>([]);

  const { addToast } = useToast();

  useEffect(() => {
    // Load Bookmarks
    const savedBookmarks = localStorage.getItem("genzyn_bookmarked_resources");
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

    // Load RSVPs
    const savedRsvps = localStorage.getItem("genzyn_rsvp_events");
    if (savedRsvps) setRsvps(JSON.parse(savedRsvps));

    // Load Projects
    const savedProjects = localStorage.getItem("genzyn_user_projects");
    if (savedProjects) setUserProjects(JSON.parse(savedProjects));
  }, []);

  const handleRemoveBookmark = (title: string) => {
    const next = bookmarks.filter((b) => b !== title);
    setBookmarks(next);
    localStorage.setItem("genzyn_bookmarked_resources", JSON.stringify(next));
    addToast(`Removed "${title}" bookmark.`, "info");
  };

  const handleCancelRsvp = (id: string) => {
    const next = rsvps.filter((r) => r.id !== id);
    setRsvps(next);
    localStorage.setItem("genzyn_rsvp_events", JSON.stringify(next));
    addToast(`Cancelled RSVP.`, "info");
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ paddingBottom: "100px" }}
    >
      <div className="main-container" style={{ paddingTop: "160px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem" }}>
          {/* Sidebar */}
          <div style={{ flex: "1 1 250px" }}>
            <div className="card glass" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "var(--accent-gradient)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "1.2rem",
                  }}
                >
                  G
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", margin: 0, fontWeight: 700 }}>GenZyn Member</h3>
                  <span style={{ fontSize: "0.75rem", color: "var(--red)", fontWeight: 600 }}>Active Developer</span>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: "var(--border)",
                }}
              />

              {/* Sidebar Menu */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  { id: "overview", label: "Overview", icon: <User size={16} /> },
                  { id: "bookmarks", label: "Bookmarked Resources", icon: <Bookmark size={16} /> },
                  { id: "rsvps", label: "Event RSVPs", icon: <Calendar size={16} /> },
                  { id: "projects", label: "My Submitted Projects", icon: <Code size={16} /> },
                ].map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        border: "none",
                        background: isActive ? "rgba(225, 6, 0, 0.1)" : "transparent",
                        color: isActive ? "var(--red)" : "var(--text-muted)",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        textAlign: "left",
                        transition: "all 0.2s",
                      }}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Panel Content */}
          <div style={{ flex: "1 1 60%" }}>
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
                >
                  <div className="card glass" style={{ padding: "2.5rem" }}>
                    <h2 style={{ fontSize: "1.75rem", margin: "0 0 8px 0", fontWeight: 800 }}>Welcome, Builder!</h2>
                    <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "0.95rem" }}>
                      This is your personal GenZyn workspace. Keep track of bookmarks, upcoming event RSVPs, and submissions.
                    </p>
                  </div>

                  {/* Overview Stats */}
                  <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
                    {[
                      { label: "Bookmarked Resources", count: bookmarks.length, icon: <Bookmark size={18} /> },
                      { label: "Confirmed RSVPs", count: rsvps.length, icon: <Calendar size={18} /> },
                      { label: "Projects Submitted", count: userProjects.length, icon: <Code size={18} /> },
                    ].map((stat, idx) => (
                      <div key={idx} className="card" style={{ padding: "1.5rem", background: "rgba(16, 16, 24, 0.4)", border: "1px solid var(--border)", borderRadius: "12px", textAlign: "center" }}>
                        <div style={{ color: "var(--red)", marginBottom: "8px", display: "flex", justifyContent: "center" }}>
                          {stat.icon}
                        </div>
                        <h4 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 4px 0", fontFamily: "var(--font-display)" }}>
                          {stat.count}
                        </h4>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Shortcut CTA */}
                  <div
                    style={{
                      background: "linear-gradient(135deg, rgba(225, 6, 0, 0.05) 0%, rgba(10, 10, 15, 0.6) 100%)",
                      border: "1px solid var(--border)",
                      borderRadius: "16px",
                      padding: "2.5rem",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: "1.3rem", margin: "0 0 4px 0", fontWeight: 700 }}>Apply for Incubator Funding</h3>
                      <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "0.9rem" }}>
                        Pitch your startup or software tool to GenZyn incubators and co-founders.
                      </p>
                    </div>
                    <Link to="/incubator" className="btn-primary" style={{ padding: "0.6rem 1.5rem", fontSize: "0.9rem", boxShadow: "none" }}>
                      <span>Pitch Idea</span>
                      <Rocket size={14} />
                    </Link>
                  </div>
                </motion.div>
              )}

              {activeTab === "bookmarks" && (
                <motion.div
                  key="bookmarks"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                >
                  <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>My Bookmarked Resources</h2>
                  {bookmarks.length === 0 ? (
                    <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                      <p>You haven't bookmarked any guides or roadmaps yet.</p>
                      <Link to="/resources" className="btn-secondary" style={{ display: "inline-block", marginTop: "1rem", fontSize: "0.85rem" }}>
                        Browse Resources
                      </Link>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {bookmarks.map((title) => (
                        <div
                          key={title}
                          className="card"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "rgba(16, 16, 24, 0.4)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            padding: "1.25rem 1.5rem",
                          }}
                        >
                          <div>
                            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0 }}>{title}</h4>
                            <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>Resource Package</span>
                          </div>

                          <div style={{ display: "flex", gap: "8px" }}>
                            <Link to="/resources" className="btn-icon" style={{ width: "36px", height: "36px" }}>
                              <ExternalLink size={14} />
                            </Link>
                            <button
                              onClick={() => handleRemoveBookmark(title)}
                              className="btn-icon"
                              style={{ width: "36px", height: "36px", color: "var(--red)" }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "rsvps" && (
                <motion.div
                  key="rsvps"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                >
                  <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>Active Event RSVPs</h2>
                  {rsvps.length === 0 ? (
                    <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                      <p>You haven't RSVP'd for any upcoming events yet.</p>
                      <Link to="/events" className="btn-secondary" style={{ display: "inline-block", marginTop: "1rem", fontSize: "0.85rem" }}>
                        Explore Events
                      </Link>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {rsvps.map((evt) => (
                        <div
                          key={evt.id}
                          className="card"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "rgba(16, 16, 24, 0.4)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            padding: "1.25rem 1.5rem",
                          }}
                        >
                          <div>
                            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0 }}>{evt.title}</h4>
                            <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                              {evt.date} &bull; {evt.type}
                            </span>
                          </div>

                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={() => handleCancelRsvp(evt.id)}
                              className="btn-secondary"
                              style={{ padding: "6px 12px", fontSize: "0.8rem" }}
                            >
                              Cancel RSVP
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                >
                  <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>My Submitted Projects</h2>
                  {userProjects.length === 0 ? (
                    <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                      <p>You haven't submitted any projects to the showcase repository.</p>
                      <Link to="/projects" className="btn-secondary" style={{ display: "inline-block", marginTop: "1rem", fontSize: "0.85rem" }}>
                        Submit Project
                      </Link>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {userProjects.map((proj, idx) => (
                        <div
                          key={idx}
                          className="card"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "rgba(16, 16, 24, 0.4)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            padding: "1.25rem 1.5rem",
                          }}
                        >
                          <div>
                            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0 }}>{proj.title}</h4>
                            <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                              Category: {proj.category} &bull; Tech: {proj.tech.join(", ")}
                            </span>
                          </div>

                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-icon"
                            style={{ width: "36px", height: "36px" }}
                          >
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
export default Dashboard;
