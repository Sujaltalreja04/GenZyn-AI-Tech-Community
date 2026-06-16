import React, { useState } from "react";
import { useToast } from "./Toast";
import { Send, Loader } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      addToast("Please enter a valid email address", "error");
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addToast("Please enter a valid email format", "error");
      return;
    }

    setLoading(true);

    // Simulate network submission
    setTimeout(() => {
      // Store in localStorage
      const subs = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
      if (subs.includes(email)) {
        addToast("This email is already subscribed!", "info");
      } else {
        subs.push(email);
        localStorage.setItem("newsletter_subscribers", JSON.stringify(subs));
        addToast("Successfully subscribed to newsletter!", "success");
        setEmail("");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: "relative", width: "100%" }}>
      <div style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            background: "rgba(0, 0, 0, 0.4)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "0.95rem",
            outline: "none",
            transition: "all 0.3s",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--red)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: "8px",
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            height: "100%",
            background: "var(--accent-gradient)",
          }}
        >
          {loading ? (
            <Loader size={16} className="animate-spin" />
          ) : (
            <>
              <span>Subscribe</span>
              <Send size={14} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
