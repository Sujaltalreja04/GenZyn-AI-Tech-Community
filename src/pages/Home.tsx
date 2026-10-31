import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { Domains } from "../components/Domains";
import { Vision } from "../components/Vision";
import { CountdownTimer } from "../components/CountdownTimer";
import { DiscordWidget } from "../components/DiscordWidget";
import { TerminalShowcase } from "../components/TerminalShowcase";
import { projects } from "../data/projects";
import { blogPosts } from "../data/blog";
import { events } from "../data/events";
import { Zap, Users, Code, ChevronRight, Discord } from "../components/icons";

export function Home() {
  // Get 3 featured projects
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  // Get 3 latest blog posts
  const latestBlogPosts = blogPosts.slice(0, 3);

  // Get next big event
  const nextEvent = events.find((event) => !event.isPast) || events[0] || {
    id: "global-hackathon",
    title: "GenZyn Global Hackathon 2026",
    date: "2026-08-15T09:00:00.000Z",
    startDate: "2026-08-15T09:00:00.000Z",
    description: "Join developers from around the world for a 48-hour sprint to build the future of AI and Web3.",
  };

  const howItWorks = [
    {
      step: "01",
      title: "Connect & Align",
      description: "Join our vibrant Discord community and attend local meetups to match with like-minded builders.",
      icon: <Users size={28} className="gradient-text" />,
    },
    {
      step: "02",
      title: "Collaborate & Build",
      description: "Team up in hackathons, contribute to community open-source repositories, and build real products.",
      icon: <Code size={28} className="gradient-text" />,
    },
    {
      step: "03",
      title: "Scale & Succeed",
      description: "Launch your products, pitch to co-founders, get mentorship, and secure roles at leading tech startups.",
      icon: <Zap size={28} className="gradient-text" />,
    },
  ];

  const communitySpotlight = [
    {
      name: "Aarav Sharma",
      role: "Founder, NeuroSync",
      story: "Met my co-founders during the GenZyn winter hackathon. We built a neural network for real-time video summarization, got funded, and now have 12 full-time engineers.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
    {
      name: "Emily Chen",
      role: "Core Contributor, GZ-Engine",
      story: "Started as a junior contributor. The code reviews from senior members were better than any bootcamp. Today I am leading the WebGL rendering optimization module.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    },
    {
      name: "Tariq Mahmood",
      role: "AI Engineer, Anthropic",
      story: "GenZyn's interview prep channel was a lifesaver. Mock interviews, system design guides, and constant feedback helped me land my dream role at Anthropic.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    },
  ];

  const testimonials = [
    {
      name: "Jessica L.",
      role: "Frontend Engineer",
      text: "GenZyn completely changed my trajectory. I found my co-founders here and we just raised our seed round!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      name: "Mark D.",
      role: "AI Researcher",
      text: "The resources and the network are unmatched. The weekly bootcamps helped me land my first ML job.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
    },
    {
      name: "Sarah K.",
      role: "Student",
      text: "I went from knowing zero code to shipping my first full-stack app in 3 months thanks to the GenZyn community.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    {
      name: "Rohan Patel",
      role: "Solidity Developer",
      text: "GenZyn's Web3 incubator helped me audit my smart contracts and connect with Web3 venture funds.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      name: "Sofia Alvarez",
      role: "UI/UX Designer",
      text: "Collaborating with developers on open-source projects let me test my designs with actual users.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
    {
      name: "David Kim",
      role: "DevOps Engineer",
      text: "Leading the infrastructure setup for GenZyn's projects taught me scale patterns I use every day at work.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
    {
      name: "Nisha Gupta",
      role: "Data Scientist",
      text: "The community-led ML workshops are incredibly hands-on. Highly recommend to anyone breaking into AI.",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop",
    },
    {
      name: "Alex Mercer",
      role: "Fullstack Dev",
      text: "I built open-source tools with developers globally. The support system is positive, energetic, and brilliant.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
    },
  ];

  const partners = ["Google", "Microsoft", "Vercel", "AWS", "GitHub", "Stripe"];

  return (
    <>
      <Hero />
      
      {/* Code Showcase & Interactive Shell */}
      <section className="main-container" style={{ padding: "4rem 2rem 2rem" }}>
        <TerminalShowcase />
      </section>

      <Stats />

      {/* Countdown Promo Strip */}
      <section className="main-container" style={{ padding: "3rem 2rem 5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass"
          style={{
            padding: "3.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "3rem",
            alignItems: "center",
            background: "linear-gradient(135deg, rgba(225, 6, 0, 0.08) 0%, rgba(10, 10, 15, 0.6) 100%)",
            borderRadius: "24px",
            border: "1px solid rgba(225, 6, 0, 0.2)",
          }}
        >
          <div style={{ flex: "1 1 400px" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>
              Next Flagship Event
            </span>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem", lineHeight: 1.1 }}>{nextEvent.title}</h2>
            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              {nextEvent.description} Join 10k+ innovators online and offline.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link to="/events" className="button">
                Register Free
              </Link>
            </div>
          </div>
          <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h4 style={{ textAlign: "center", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.85rem" }}>
              Registration Closes In
            </h4>
            <CountdownTimer targetDate={nextEvent.startDate} />
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "6rem 0", background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
        <div className="main-container">
          <div className="section-header">
            <h2>
              How GenZyn <span className="gradient-text">Works</span>
            </h2>
            <p>Our structured community workflow transforms curious tinkerers into high-scale engineering leaders.</p>
            <div className="section-divider" style={{ background: "var(--accent-gradient)" }} />
          </div>

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {howItWorks.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="card"
                style={{
                  background: "rgba(3, 3, 5, 0.5)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "2.5rem 2rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "2rem",
                    fontSize: "3rem",
                    fontWeight: 900,
                    color: "rgba(255, 255, 255, 0.03)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {item.step}
                </div>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "12px",
                    background: "var(--red-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    border: "1px solid rgba(225, 6, 0, 0.15)",
                  }}
                >
                  {item.icon}
                </div>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem", fontFamily: "var(--font-display)" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="main-container" style={{ padding: "6rem 2rem" }}>
        <div className="section-header">
          <h2>
            Featured Open Source <span className="gradient-text">Projects</span>
          </h2>
          <p>Explore cutting-edge software repositories built, maintained, and scaling within our ecosystem.</p>
          <div className="section-divider" style={{ background: "var(--accent-gradient)" }} />
        </div>

        <div className="grid-3" style={{ display: "grid", gap: "2rem" }}>
          {featuredProjects.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card-interactive"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "2.5rem",
                borderRadius: "16px",
                background: "rgba(10, 10, 15, 0.4)",
                border: "1px solid var(--border)",
              }}
            >
              <span className="badge" style={{ alignSelf: "flex-start", marginBottom: "1rem" }}>
                {p.category}
              </span>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.75rem", fontWeight: 700 }}>{p.title}</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "1.5rem", flexGrow: 1 }}>
                {p.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                {p.tech.map((t, i) => (
                  <span key={i} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--border)",
                  fontSize: "0.85rem",
                  color: "var(--text-dim)",
                }}
              >
                <span>&bull; {p.stars} stars</span>
                <span>&bull; {p.contributors} contributors</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link to="/projects" className="btn-secondary">
            <span>Explore All Projects</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* Community Member Spotlight */}
      <section style={{ padding: "6rem 0", background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
        <div className="main-container">
          <div className="section-header">
            <h2>
              Community <span className="gradient-text">Spotlight</span>
            </h2>
            <p>Read inspiring success stories from community members who turned their ideas into impactful careers.</p>
            <div className="section-divider" style={{ background: "var(--accent-gradient)" }} />
          </div>

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            {communitySpotlight.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="card glass"
                style={{
                  padding: "2.5rem",
                  background: "rgba(3, 3, 5, 0.4)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--red)" }}
                  />
                  <div>
                    <h4 style={{ fontSize: "1.1rem", margin: 0, fontWeight: 700 }}>{member.name}</h4>
                    <p style={{ fontSize: "0.85rem", color: "var(--red)", fontWeight: 500, margin: 0 }}>{member.role}</p>
                  </div>
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>
                  "{member.story}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains Showcase */}
      <Domains />

      {/* Testimonials (Wall of Love) */}
      <section className="main-container" style={{ padding: "6rem 2rem" }}>
        <div className="section-header">
          <h2>
            Wall of <span className="gradient-text">Love</span>
          </h2>
          <p>What engineers, founders, and students are saying about their journey inside GenZyn.</p>
          <div className="section-divider" style={{ background: "var(--accent-gradient)" }} />
        </div>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card glass"
              style={{
                padding: "2rem",
                background: "rgba(16, 16, 24, 0.3)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  decoding="async"
                  style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <h4 style={{ fontSize: "1rem", margin: 0 }}>{t.name}</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", margin: 0 }}>{t.role}</p>
                </div>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>
                "{t.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partners Logos section */}
      <section style={{ padding: "4rem 0", background: "rgba(255,255,255,0.01)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="main-container">
          <p style={{ textAlign: "center", color: "var(--text-dim)", marginBottom: "2rem", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.85rem" }}>
            Ecosystem Partners & Backers
          </p>
          <div className="partner-list" style={{ display: "flex", justifyContent: "center", gap: "4rem", flexWrap: "wrap", opacity: 0.45 }}>
            {partners.map((p, i) => (
              <div
                key={i}
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: "var(--text)",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.5px",
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discord Live widget section */}
      <section className="main-container" style={{ padding: "4rem 2rem 2rem" }}>
        <DiscordWidget />
      </section>

      {/* Latest Blog Posts */}
      <section className="main-container" style={{ padding: "6rem 2rem" }}>
        <div className="section-header">
          <h2>
            Latest From The <span className="gradient-text">Blog</span>
          </h2>
          <p>Get insights into emerging technologies, system design guides, and career launch tips.</p>
          <div className="section-divider" style={{ background: "var(--accent-gradient)" }} />
        </div>

        <div className="grid-3" style={{ display: "grid", gap: "2rem" }}>
          {latestBlogPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card-interactive"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "2rem",
                borderRadius: "16px",
                background: "rgba(10, 10, 15, 0.4)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-dim)", marginBottom: "0.75rem" }}>
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem", lineHeight: 1.3, fontWeight: 700 }}>{post.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1.5rem", flexGrow: 1 }}>
                {post.excerpt}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <span>By {post.author}</span>
                <Link to="/blog" className="gradient-text" style={{ fontWeight: 600, display: "flex", alignItems: "center" }}>
                  <span>Read</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Vision />

      {/* Floating Join Discord CTA */}
      <div
        className="floating-community-cta"
        style={{
          position: "fixed",
          bottom: "2rem",
          left: "2rem",
          zIndex: 99,
        }}
      >
        <motion.a
          href="https://discord.gg/genzyn"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1.25rem",
            borderRadius: "100px",
            background: "#5865F2", // Discord color
            color: "#fff",
            fontSize: "0.9rem",
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(88, 101, 242, 0.35)",
            textDecoration: "none",
          }}
        >
          <Discord size={20} aria-hidden="true" />
          <span>15.2k online</span>
        </motion.a>
      </div>
    </>
  );
}
export default Home;
