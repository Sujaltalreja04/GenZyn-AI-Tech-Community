import { useEffect, useMemo, useState } from "react";
import { BookOpen, CheckCircle, Mail, Settings, Users } from "../components/icons";

type Workspace = "overview" | "content" | "inbox" | "audience" | "settings";

const WORKSPACES: Array<{ id: Workspace; label: string; description: string; Icon: typeof Settings }> = [
  { id: "overview", label: "Overview", description: "Review what needs attention", Icon: CheckCircle },
  { id: "content", label: "Content", description: "Events, projects, blog and resources", Icon: BookOpen },
  { id: "inbox", label: "Inbox", description: "Contact, RSVP and application review", Icon: Mail },
  { id: "audience", label: "Audience", description: "Newsletter consent and engagement", Icon: Users },
  { id: "settings", label: "Settings", description: "Staff access and site settings", Icon: Settings },
];

const contentAreas = [
  ["Events", "Publish upcoming and past events, RSVP capacity, locations, and links."],
  ["Projects", "Maintain featured community work and approved submissions."],
  ["Blog", "Draft, schedule, publish, and archive posts."],
  ["Resources", "Curate learning material and its categories."],
  ["Bootcamps", "Keep programmes, dates, places, and application links current."],
] as const;

export default function Admin() {
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>("overview");
  const convexUrl = import.meta.env.VITE_CONVEX_URL?.trim();
  const active = useMemo(() => WORKSPACES.find((item) => item.id === activeWorkspace)!, [activeWorkspace]);

  useEffect(() => {
    const existing = document.querySelector('meta[name="robots"]');
    const originalContent = existing?.getAttribute("content");
    const robots = existing ?? document.createElement("meta");
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", "noindex, nofollow, noarchive, nosnippet");
    if (!existing) document.head.appendChild(robots);
    return () => {
      if (existing) existing.setAttribute("content", originalContent ?? "");
      else robots.remove();
    };
  }, []);

  return (
    <main className="admin-page">
      <aside className="admin-sidebar" aria-label="Staff workspace navigation">
        <a className="admin-brand" href="/" aria-label="Return to GenZyn website">
          <span>GEN</span>ZYN
          <small>Staff workspace</small>
        </a>
        <nav className="admin-nav">
          {WORKSPACES.map(({ id, label, Icon }) => (
            <button key={id} type="button" className={activeWorkspace === id ? "is-active" : ""} onClick={() => setActiveWorkspace(id)}>
              <Icon size={18} aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>
        <div className="admin-security-note">
          <span className="admin-status-dot" aria-hidden="true" />
          <p>Staff data is protected in Convex. This route is intentionally not linked from the public site.</p>
        </div>
      </aside>

      <section className="admin-main" aria-labelledby="admin-title">
        <header className="admin-header">
          <div>
            <h1 id="admin-title">{active.label}</h1>
            <p>{active.description}</p>
          </div>
          <a className="admin-site-link" href="/">View public site</a>
        </header>

        {!convexUrl && (
          <section className="admin-setup-banner" role="status">
            <div>
              <strong>Convex is not connected yet.</strong>
              <p>Add <code>VITE_CONVEX_URL</code> locally and in Vercel, then deploy the database functions. The setup guide in this repository walks through every step.</p>
            </div>
            <span>See <code>CONVEX_VERCEL_SETUP.md</code> in the project folder.</span>
          </section>
        )}

        {convexUrl && (
          <section className="admin-setup-banner admin-connected" role="status">
            <div>
              <strong>Convex deployment URL is configured.</strong>
              <p>Connect your approved staff identity provider and add the first owner record before exposing live management controls.</p>
            </div>
          </section>
        )}

        {activeWorkspace === "overview" && <Overview />}
        {activeWorkspace === "content" && <Content />}
        {activeWorkspace === "inbox" && <Inbox />}
        {activeWorkspace === "audience" && <Audience />}
        {activeWorkspace === "settings" && <SettingsPanel />}
      </section>
    </main>
  );
}

function Overview() {
  return <>
    <section className="admin-intro">
      <div><h2>One place for the community’s moving parts.</h2><p>When connected, this screen shows live counts and the newest submissions without exposing any member details on public pages.</p></div>
    </section>
    <section className="admin-stat-grid" aria-label="Live data placeholders">
      {[["New inbox items", "Contact, RSVP, project and application submissions"], ["Published content", "Events, projects, articles, resources and bootcamps"], ["Active subscribers", "People with current newsletter consent"], ["Needs review", "Items waiting for a staff decision"]].map(([label, detail]) => (
        <article key={label} className="admin-stat"><strong>—</strong><h3>{label}</h3><p>{detail}</p></article>
      ))}
    </section>
    <section className="admin-empty-state"><CheckCircle size={26} aria-hidden="true" /><div><h2>Ready for a secure connection</h2><p>Live numbers appear only after Convex, staff identity, and the owner allow-list are configured. Until then, no visitor data is simulated or stored in this screen.</p></div></section>
  </>;
}

function Content() {
  return <section className="admin-content-list">
    <div className="admin-panel-heading"><h2>Editorial areas</h2><p>Each collection has draft, scheduled, published, and archived states in the database.</p></div>
    {contentAreas.map(([title, description]) => <article key={title} className="admin-content-row"><div><h3>{title}</h3><p>{description}</p></div><span>Configure access first</span></article>)}
  </section>;
}

function Inbox() {
  return <section className="admin-empty-state"><Mail size={26} aria-hidden="true" /><div><h2>Private review queue</h2><p>Contact messages, event RSVPs, project submissions, career applications, team applications, and incubator applications are separate records with the same review states: new, in review, approved, declined, or closed.</p></div></section>;
}

function Audience() {
  return <section className="admin-empty-state"><Users size={26} aria-hidden="true" /><div><h2>Consent-first audience management</h2><p>Newsletter subscribers remain separate from contact submissions. The database records consent time, source, and unsubscribed status so that outreach stays auditable.</p></div></section>;
}

function SettingsPanel() {
  return <section className="admin-empty-state"><Settings size={26} aria-hidden="true" /><div><h2>Owner-controlled access</h2><p>Only identities present in the <code>admins</code> table may call staff functions. Roles are owner, editor, and reviewer. Never place an admin key or an allow-list secret in <code>VITE_</code> variables.</p></div></section>;
}
