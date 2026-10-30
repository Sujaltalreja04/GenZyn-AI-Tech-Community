import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setIsSubmitting(true);
    try {
      await signup(name.trim(), email.trim(), password);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Unable to create your account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-hero">
      <div className="container-narrow">
        <div className="card glass" style={{ maxWidth: "520px", margin: "0 auto", padding: "2.5rem" }}>
          <span className="badge">Join the community</span>
          <h1 style={{ marginTop: "1rem" }}>Create your account</h1>
          <p style={{ color: "var(--text-muted)" }}>Your password is sent only to the backend over HTTPS, where it must be hashed before storage.</p>
          {formError && <p role="alert" style={{ color: "var(--red)" }}>{formError}</p>}
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
            <label className="form-group">Name<input className="input" type="text" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} /></label>
            <label className="form-group">Email<input className="input" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
            <label className="form-group">Password<input className="input" type="password" autoComplete="new-password" minLength={12} required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
            <button className="btn-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Creating account..." : "Sign up"}</button>
          </form>
          <p style={{ color: "var(--text-muted)", marginTop: "1.5rem" }}>Already a member? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </section>
  );
}
