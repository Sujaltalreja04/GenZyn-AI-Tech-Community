import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { events, bootcamps } from "../data/events";
import { CountdownTimer } from "../components/CountdownTimer";
import { FilterTabs } from "../components/FilterTabs";
import { SearchBar } from "../components/SearchBar";
import { Modal } from "../components/Modal";
import { useToast } from "../components/Toast";
import { Calendar, Grid, List, MapPin, Clock, Share2, HelpCircle } from "../components/icons";

export function Events() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  
  // RSVP states
  const [rsvpEvent, setRsvpEvent] = useState<any | null>(null);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [submittingRsvp, setSubmittingRsvp] = useState(false);

  const { addToast } = useToast();

  const categories = ["All", "Hackathon", "Workshop", "Conference", "Networking", "Bootcamp"];

  const handleShare = (title: string) => {
    navigator.clipboard.writeText(window.location.href);
    addToast(`Link to "${title}" copied to clipboard!`, "success");
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpEmail) {
      addToast("Please fill out all RSVP fields.", "error");
      return;
    }
    setSubmittingRsvp(true);
    setTimeout(() => {
      // Store in localStorage for Dashboard syncing
      const rsvps = JSON.parse(localStorage.getItem("genzyn_rsvp_events") || "[]");
      if (!rsvps.find((r: any) => r.id === rsvpEvent.id)) {
        rsvps.push(rsvpEvent);
        localStorage.setItem("genzyn_rsvp_events", JSON.stringify(rsvps));
      }

      addToast(`RSVP Confirmed! See you at ${rsvpEvent.title}!`, "success");
      setSubmittingRsvp(false);
      setRsvpEvent(null);
      setRsvpName("");
      setRsvpEmail("");
    }, 1200);
  };

  // Filter logic
  const filteredEvents = events.filter((evt) => {
    const matchesCategory = activeTab === "All" || evt.type === activeTab;
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredEvent = events.find((e) => e.isFeatured) || events[0];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ paddingBottom: "100px" }}
    >
      {/* Featured Event Hero */}
      <div
        style={{
          position: "relative",
          padding: "160px 0 80px",
          background: "linear-gradient(to bottom, rgba(225,6,0,0.05) 0%, transparent 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="main-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>
              Featured Event
            </span>
            <h1 className="gradient-text" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 800, margin: "0 0 1rem" }}>
              {featuredEvent.title}
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
              {featuredEvent.description}
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)" }}>
                <Calendar size={18} style={{ color: "var(--red)" }} />
                <span>August 15-17, 2026</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)" }}>
                <Clock size={18} style={{ color: "var(--red)" }} />
                <span>Starts at 9:00 AM UTC</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)" }}>
                <MapPin size={18} style={{ color: "var(--red)" }} />
                <span>Hybrid / Discord & SF Office</span>
              </div>
            </div>

            <div style={{ maxWidth: "500px", margin: "0 auto 3rem" }}>
              <CountdownTimer targetDate="2026-08-15T09:00:00" />
            </div>

            <button onClick={() => setRsvpEvent(featuredEvent)} className="btn-primary" style={{ padding: "0.9rem 2.5rem", fontSize: "1.1rem" }}>
              RSVP For Free
            </button>
          </div>
        </div>
      </div>

      {/* Events Listing and Filter Control panel */}
      <div className="main-container" style={{ paddingTop: "5rem" }}>
        <div className="section-header" style={{ marginBottom: "3rem" }}>
          <h2>
            Ecosystem <span className="gradient-text">Events Calendar</span>
          </h2>
          <p>Discover hackathons, live coding workshops, developer networking events, and cohorts.</p>
        </div>

        {/* Filters bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "3rem",
            background: "rgba(255, 255, 255, 0.01)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "1rem 1.5rem",
          }}
        >
          <div style={{ flex: "1 1 300px" }}>
            <SearchBar query={searchQuery} onQueryChange={setSearchQuery} placeholder="Search events or tags..." />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <FilterTabs categories={categories} activeCategory={activeTab} onCategoryChange={setActiveTab} />

            {/* Layout Toggler */}
            <div
              style={{
                display: "flex",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "2px",
              }}
            >
              <button
                onClick={() => setViewMode("grid")}
                style={{
                  background: viewMode === "grid" ? "var(--red)" : "transparent",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                style={{
                  background: viewMode === "list" ? "var(--red)" : "transparent",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Events Layout container */}
        <AnimatePresence mode="popLayout">
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)" }}
            >
              <HelpCircle size={48} style={{ marginBottom: "1rem", color: "var(--text-dim)" }} />
              <h3>No events found matching current criteria.</h3>
              <p>Try clearing filters or changing search query terms.</p>
            </motion.div>
          ) : viewMode === "grid" ? (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
            >
              {filteredEvents.map((evt) => {
                const isExpanded = expandedEventId === evt.id;
                return (
                  <motion.div
                    layout
                    key={evt.id}
                    className="card-interactive"
                    style={{
                      background: "rgba(16, 16, 24, 0.4)",
                      border: "1px solid var(--border)",
                      borderRadius: "16px",
                      padding: "2rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      cursor: "default",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="badge">{evt.type}</span>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => handleShare(evt.title)}
                          className="btn-icon"
                          style={{ width: "32px", height: "32px" }}
                        >
                          <Share2 size={14} />
                        </button>
                      </div>
                    </div>

                    <h3 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0 }}>{evt.title}</h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Calendar size={14} />
                        <span>{evt.date}</span>
                      </div>
                    </div>

                    <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                      {evt.description}
                    </p>

                    {/* Collapsible content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: "hidden", fontSize: "0.9rem", color: "var(--text-secondary)", borderTop: "1px solid var(--border)", paddingTop: "1rem", marginTop: "0.5rem" }}
                        >
                          {evt.isPast ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                              <div><strong>Attendees:</strong> {evt.attendees}+</div>
                              <div><strong>Highlights:</strong> {evt.highlights}</div>
                            </div>
                          ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                              <div><strong>Location:</strong> Hybrid (Online + Discord)</div>
                              <div><strong>Prerequisites:</strong> None. All skill levels welcome.</div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {evt.tags.map((t, idx) => (
                        <span key={idx} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
                      <button
                        onClick={() => setExpandedEventId(isExpanded ? null : evt.id)}
                        className="btn-secondary"
                        style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", flex: 1 }}
                      >
                        {isExpanded ? "Show Less" : "Details"}
                      </button>
                      {!evt.isPast && (
                        <button
                          onClick={() => setRsvpEvent(evt)}
                          className="btn-primary"
                          style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", flex: 1, boxShadow: "none" }}
                        >
                          RSVP
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "rgba(16, 16, 24, 0.4)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "1.25rem 2rem",
                    gap: "1.5rem",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span className="badge" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>{evt.type}</span>
                      <h3 style={{ fontSize: "1.2rem", margin: 0, fontWeight: 700 }}>{evt.title}</h3>
                    </div>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>{evt.date}</span>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    {!evt.isPast && (
                      <button onClick={() => setRsvpEvent(evt)} className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem", boxShadow: "none" }}>
                        RSVP Now
                      </button>
                    )}
                    <button onClick={() => handleShare(evt.title)} className="btn-icon" style={{ width: "36px", height: "36px" }}>
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bootcamps & Cohorts section */}
        <div style={{ marginTop: "6rem" }}>
          <div className="section-header">
            <h2>
              Structured <span className="gradient-text">Bootcamps</span>
            </h2>
            <p>Go from absolute beginner to building production-grade software with peer-led cohorts.</p>
            <div className="section-divider" style={{ background: "var(--accent-gradient)" }} />
          </div>

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {bootcamps.map((camp, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  background: "rgba(10, 10, 15, 0.4)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="tag tag-accent">{camp.level}</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>{camp.duration}</span>
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>{camp.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5, flexGrow: 1 }}>
                  {camp.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <span>Spots: {camp.spots} total</span>
                  <span style={{ color: "var(--red)" }}>{camp.spots - camp.enrolled} left</span>
                </div>

                <button
                  onClick={() =>
                    addToast(`Applications for ${camp.title} cohort will open soon! Stay tuned in Discord.`, "info")
                  }
                  className="btn-secondary"
                  style={{ width: "100%", padding: "0.5rem", fontSize: "0.85rem" }}
                >
                  Apply Cohort
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RSVP Modal Confirmation */}
      <Modal isOpen={rsvpEvent !== null} onClose={() => setRsvpEvent(null)} title="RSVP Confirmation">
        {rsvpEvent && (
          <form onSubmit={handleRsvpSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: 0 }}>
              You are registering for <strong>{rsvpEvent.title}</strong> on <strong>{rsvpEvent.date}</strong>. RSVP is 100% free.
            </p>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="input"
                required
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                placeholder="e.g. Sujal Patel"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="input"
                required
                value={rsvpEmail}
                onChange={(e) => setRsvpEmail(e.target.value)}
                placeholder="name@example.com"
              />
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button
                type="button"
                onClick={() => setRsvpEvent(null)}
                className="btn-secondary"
                style={{ flex: 1, padding: "0.75rem" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingRsvp}
                className="btn-primary"
                style={{ flex: 1, padding: "0.75rem", boxShadow: "none" }}
              >
                {submittingRsvp ? "Registering..." : "Confirm RSVP"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </motion.section>
  );
}
export default Events;
