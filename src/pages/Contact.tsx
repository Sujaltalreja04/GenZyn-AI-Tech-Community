import React, { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "../components/Modal";
import { useToast } from "../components/Toast";
import { Mail, Phone, MapPin, Globe, Send, CheckCircle, HelpCircle } from "../components/icons";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      addToast("Please fill in all form inputs.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addToast("Please provide a valid email structure.", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccessOpen(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1200);
  };

  const offices = [
    { city: "San Francisco", address: "420 Mission St, Suite 100, San Francisco, CA", type: "HQ & Incubator" },
    { city: "Bangalore", address: "Block B, Innovation Park, Indiranagar, Bangalore", type: "Asia Chapter Hub" },
    { city: "Berlin", address: "14 Kreuzberg Strasse, Berlin, Germany", type: "Europe Chapter Hub" },
  ];

  const faqs = [
    { q: "How do I sponsor a hackathon?", a: "Send a message selecting 'Sponsorships' subject and our partnership team will share our sponsorship packages tier document." },
    { q: "Can I receive mentoring?", a: "Yes! Once you join our Discord community, you can register for our peer-led bootcamps which matching you with senior devs." },
    { q: "Where can I get brand media kits?", a: "Contact us via general inquiries and we will link you our asset tokens and graphic logos folder." },
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
          Get In Touch
        </span>
        <h1 className="gradient-text" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", marginBottom: "1.5rem", fontWeight: 800 }}>
          Contact Us
        </h1>
        <p style={{ fontSize: "1.35rem", color: "var(--text-muted)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.7 }}>
          Have a question about our events, hackathons, incubator sponsorship, or want to say hello? Drop us a line.
        </p>
      </div>

      <div className="main-container" style={{ paddingTop: "3rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem" }}>
          {/* Contact Form */}
          <div style={{ flex: "1 1 50%" }}>
            <div className="card glass" style={{ padding: "3rem" }}>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem" }}>Send a Message</h2>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    className="input"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sujal Patel"
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
                    placeholder="sujal@genzyn.com"
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Subject *</label>
                  <select
                    className="input"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={{ background: "#0a0a0f", border: "1px solid var(--border)", color: "#fff" }}
                  >
                    <option value="">Select a topic...</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Sponsorships">Sponsorships & Partnerships</option>
                    <option value="Speaker Request">Speaker / Workshop Hosting</option>
                    <option value="Incubator Labs">Incubator Labs Application</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Message *</label>
                  <textarea
                    className="textarea"
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you'd like to collaborate on..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: "100%", padding: "1rem", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Quick info sidebar */}
          <div style={{ flex: "1 1 35%", display: "flex", flexDirection: "column", gap: "3rem" }}>
            {/* Direct Info */}
            <div className="card glass" style={{ padding: "2.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Direct Inquiries</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Mail size={18} style={{ color: "var(--red)" }} />
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>EMAIL US</div>
                    <span style={{ fontSize: "0.95rem" }}>hello@genzyn.community</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Phone size={18} style={{ color: "var(--red)" }} />
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>CALL US</div>
                    <span style={{ fontSize: "0.95rem" }}>+1 (415) 555-0199</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Globe size={18} style={{ color: "var(--red)" }} />
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>DISCORD GUILD</div>
                    <span style={{ fontSize: "0.95rem" }}>discord.gg/genzyn</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Offices & Map placeholder */}
            <div className="card glass" style={{ padding: "2.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Physical Hub Locations</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {offices.map((office, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "10px" }}>
                    <MapPin size={16} style={{ color: "var(--red)", flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, margin: "0 0 2px 0" }}>{office.city}</h4>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: "0 0 2px 0" }}>{office.address}</p>
                      <span style={{ fontSize: "0.75rem", color: "var(--red)", fontWeight: 600 }}>{office.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick FAQ Strip */}
        <div style={{ marginTop: "6rem" }}>
          <div className="section-header">
            <h2>
              Quick <span className="gradient-text">Answers</span>
            </h2>
            <p>Check out our instant solutions to common collaboration inquiries.</p>
            <div className="section-divider" style={{ background: "var(--accent-gradient)" }} />
          </div>

          <div className="grid-3" style={{ gap: "2rem" }}>
            {faqs.map((faq, idx) => (
              <div key={idx} className="card" style={{ padding: "2rem", background: "rgba(10, 10, 15, 0.4)", border: "1px solid var(--border)", borderRadius: "12px" }}>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "6px" }}>
                  <HelpCircle size={16} style={{ color: "var(--red)" }} />
                  <span>{faq.q}</span>
                </h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Modal Popup */}
      <Modal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} title="Message Sent">
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", padding: "1rem 0" }}>
          <CheckCircle size={56} style={{ color: "var(--success)", filter: "drop-shadow(0 0 10px rgba(16, 185, 129, 0.3))" }} />
          <h3 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0 }}>Thank you for reaching out!</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: 0, lineHeight: 1.6 }}>
            Our community staff members have received your request. We review all partnership, speaker, and general developer inquiries and will email you back within 48 hours.
          </p>
          <button
            onClick={() => setIsSuccessOpen(false)}
            className="btn-primary"
            style={{ width: "100%", padding: "0.75rem", marginTop: "1rem", boxShadow: "none" }}
          >
            Done
          </button>
        </div>
      </Modal>
    </motion.section>
  );
}
export default Contact;
