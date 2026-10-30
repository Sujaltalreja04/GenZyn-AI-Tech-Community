import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";
import { useToast } from "../components/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      await login(email.trim(), password);
      addToast("Welcome back to GenZyn.", "success");
      navigate(destination, { replace: true });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-hero">
      <div className="container-narrow">
        <div className="card glass" style={{ maxWidth: "520px", margin: "0 auto", padding: "2.5rem" }}>
          <span className="badge">Member access</span>
          <h1 style={{ marginTop: "1rem" }}>Log in to GenZyn</h1>
          <p style={{ color: "var(--text-muted)" }}>Continue to your personal dashboard and notifications.</p>
          {formError && <p role="alert" style={{ color: "var(--red)" }}>{formError}</p>}
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
            <label className="form-group">Email<input className="input" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
            <label className="form-group">Password<input className="input" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
            <button className="btn-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Signing in..." : "Log in"}</button>
          </form>
          <p style={{ color: "var(--text-muted)", marginTop: "1.5rem" }}>New to GenZyn? <Link to="/signup">Create an account</Link></p>
        </div>
      </div>
    </section>
  );
}
