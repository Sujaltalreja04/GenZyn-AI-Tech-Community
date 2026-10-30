import React, { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "../components/Modal";
import { useToast } from "../components/Toast";
import { Rocket, Users, ArrowRight, CheckCircle, DollarSign } from "../components/icons";

export function Incubator() {
  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [solutionDetails, setSolutionDetails] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const { addToast } = useToast();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final submission
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setIsSuccessOpen(true);
        setStep(1);
        setTeamName("");
        setProjectTitle("");
        setProblemDescription("");
        setSolutionDetails("");
        setGithubLink("");
      }, 1500);
    }
  };

  const programs = [
    { title: "Matching Grants", detail: "$5,000 equity-free match for active open-source extensions.", icon: <DollarSign size={24} /> },
    { title: "VC Matchmaking", desc: "Access direct pitching loops to founders and early angels.", icon: <Users size={24} /> },
    { title: "Ecosystem Swag & Hosting", desc: "$10k in Vercel, AWS, and OpenAI credits.", icon: <Rocket size={24} /> },
  ];

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
          Incubator Labs
        </span>
        <h1 className="gradient-text" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", marginBottom: "1.5rem", fontWeight: 800 }}>
          Pitch Portal
        </h1>
        <p style={{ fontSize: "1.35rem", color: "var(--text-muted)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.7 }}>
          Turn your community scripts, utilities, and developer projects into high-scale startups. Get micro-grants, cloud hosting credits, and VC loops.
        </p>
      </div>

      <div className="main-container" style={{ paddingTop: "2rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem" }}>
          {/* Pitch Form Wizard */}
          <div style={{ flex: "1 1 50%" }}>
            <div className="card glass" style={{ padding: "3rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0 }}>Startup Pitch Wizard</h3>
                <span style={{ fontSize: "0.85rem", color: "var(--red)", fontWeight: 700 }}>Step {step} of 3</span>
              </div>

              {/* Progress Bar */}
              <div style={{ background: "rgba(255,255,255,0.05)", height: "4px", borderRadius: "2px", marginBottom: "2rem", overflow: "hidden" }}>
                <div
                  style={{
                    width: `${(step / 3) * 100}%`,
                    height: "100%",
                    background: "var(--accent-gradient)",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>

              <form onSubmit={handleNextStep} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Team / Organization Name *</label>
                      <input
                        type="text"
                        className="input"
                        required
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g. NeuroSync Labs"
                      />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Project / Idea Title *</label>
                      <input
                        type="text"
                        className="input"
                        required
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder="e.g. AI-powered PR reviewer"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">What problem are you solving? *</label>
                      <textarea
                        className="textarea"
                        required
                        value={problemDescription}
                        onChange={(e) => setProblemDescription(e.target.value)}
                        placeholder="Explain user pain points..."
                        rows={4}
                      />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">What is your unique solution? *</label>
                      <textarea
                        className="textarea"
                        required
                        value={solutionDetails}
                        onChange={(e) => setSolutionDetails(e.target.value)}
                        placeholder="Describe the product architecture and value..."
                        rows={4}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">GitHub Repository or Prototype link *</label>
                      <input
                        type="url"
                        className="input"
                        required
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                      By submitting your pitch, you agree to showcase it during GenZyn demo nights. Team cohorts are reviewed every two weeks.
                    </p>
                  </motion.div>
                )}

                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="btn-secondary"
                      style={{ flex: 1, padding: "0.75rem" }}
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary"
                    style={{ flex: 2, padding: "0.75rem", boxShadow: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                  >
                    <span>{step === 3 ? (submitting ? "Submitting..." : "Submit Pitch") : "Continue"}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar Info */}
          <div style={{ flex: "1 1 35%", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <div className="card glass" style={{ padding: "2.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Incubator Perks</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {programs.map((prog, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--red)", flexShrink: 0 }}>{prog.icon}</div>
                    <div>
                      <h4 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 2px 0" }}>{prog.title}</h4>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
                        {prog.desc || prog.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Program timeline */}
            <div className="card glass" style={{ padding: "2.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Application Process</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.9rem" }}>
                <div><strong>1. Online Pitch:</strong> Submit your prototype links via the Wizard.</div>
                <div><strong>2. Technical Interview:</strong> Discuss your codebase architecture with core moderators.</div>
                <div><strong>3. Demo Day:</strong> Present live to GenZyn angels and startup co-founders.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} title="Pitch Submitted!">
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", padding: "1rem 0" }}>
          <CheckCircle size={56} style={{ color: "var(--success)", filter: "drop-shadow(0 0 10px rgba(16, 185, 129, 0.3))" }} />
          <h3 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0 }}>Startup Pitch Received!</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: 0, lineHeight: 1.6 }}>
            Our incubator team will review your problem statement and code repository within 7 days. If selected, we will email you to schedule a technical architecture review.
          </p>
          <button
            onClick={() => setIsSuccessOpen(false)}
            className="btn-primary"
            style={{ width: "100%", padding: "0.75rem", marginTop: "1rem", boxShadow: "none" }}
          >
            Got it
          </button>
        </div>
      </Modal>
    </motion.section>
  );
}
export default Incubator;
