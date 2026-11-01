import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Accordion } from "../components/Accordion";
import {
  Award,
  Target,
  Compass,
  Heart,
  Users,
  ChevronRight,
  Newspaper,
} from "../components/icons";

export function About() {
  const values = [
    {
      title: "Innovation",
      desc: "Pushing boundaries with cutting-edge tech.",
      icon: <Target size={24} />,
    },
    {
      title: "Collaboration",
      desc: "Together we achieve more than alone.",
      icon: <Users size={24} />,
    },
    {
      title: "Inclusivity",
      desc: "A safe space for developers from all backgrounds.",
      icon: <Heart size={24} />,
    },
    {
      title: "Growth",
      desc: "Continuous learning and professional development.",
      icon: <Compass size={24} />,
    },
  ];

  const timeline = [
    {
      year: "Q1 2024",
      title: "The Inception",
      desc: "Started as a small Discord server for a single local hackathon with just 50 members.",
    },
    {
      year: "Q3 2024",
      title: "Bootcamp Launch",
      desc: "Introduced our first peer-led React and Solidity cohort, graduating 120+ builders.",
    },
    {
      year: "Q1 2025",
      title: "First Summit",
      desc: "Hosted GenZyn Summit v1.0. 5,000 online attendees, featuring tech leads from Google & Vercel.",
    },
    {
      year: "Q2 2025",
      title: "Open Source Platform",
      desc: "Standardized GZ-Engine and launched community monorepo, hitting 100+ contributors.",
    },
    {
      year: "Q4 2025",
      title: "Seed Incubator",
      desc: "Launched incubator lab. Funded 3 projects with $15k matching grant pool.",
    },
    {
      year: "Q1 2026",
      title: "10k Milestone",
      desc: "Surpassed 15,000 active community members worldwide spanning 85 countries.",
    },
    {
      year: "Q2 2026",
      title: "V2 Ecosystem",
      desc: "Completed CSS/layout systems overhaul, launching fully dynamic dashboard platforms.",
    },
    {
      year: "Future",
      title: "Ecosystem Beyond",
      desc: "Aiming to build the first community-governed software university and venture fund.",
    },
  ];

  const founders = [
    {
      name: "Sujal Patel",
      role: "Co-Founder & President",
      bio: "Sujal is a full-stack engineer and open-source advocate. Previously built scaling platforms for 100k+ monthly active users. He manages our partnerships and strategic vision.",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    },
    {
      name: "Aanya Verma",
      role: "Co-Founder & Head of Tech",
      bio: "Aanya is an AI engineer and developer advocate. She conducts our system design cohorts and leads GZ-Engine open-source architecture teams.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
  ];

  const cultureImages = [
    {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
      caption: "Hackathons",
    },
    {
      url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
      caption: "Workshops",
    },
    {
      url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop",
      caption: "Meetups",
    },
    {
      url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
      caption: "Fireside Chats",
    },
  ];

  const pressMentions = [
    {
      outlet: "TechCrunch",
      quote:
        "GenZyn is redefining tech education for the next generation of engineers.",
      date: "Feb 2026",
    },
    {
      outlet: "Wired",
      quote:
        "A community-led engine that bridges student curiosity and real-world scale software.",
      date: "Nov 2025",
    },
    {
      outlet: "HackerNews",
      quote:
        "GZ-Engine is one of the fastest growing graphics libraries built entirely by Gen Z.",
      date: "Aug 2025",
    },
  ];

  const faqs = [
    {
      id: "1",
      title: "What is GenZyn Tech Community?",
      content:
        "GenZyn is a premium ecosystem dedicated to young developers, designers, and innovators. We provide structured learning resources, collaborate on open-source software, host global hackathons, and help members land roles at tech companies.",
    },
    {
      id: "2",
      title: "Is it free to join the community?",
      content:
        "Yes! Joining the community, participating in our Discord guild, accessing resources, and attending hackathons is entirely free.",
    },
    {
      id: "3",
      title: "Who is eligible to participate?",
      content:
        "While we specialize in tech-focused youth (students, recent graduates, junior builders), our programs and resources are open to anyone who is eager to build software and learn.",
    },
    {
      id: "4",
      title: "How can I contribute to GZ-Engine?",
      content:
        "You can visit our projects page, explore the GZ-Engine details, click the GitHub repository, and look for 'good first issue' labels. We have weekly contributor syncs in Discord.",
    },
    {
      id: "5",
      title: "How does the Incubator program work?",
      content:
        "Our incubator helps community members turn software tools into micro-startups. We select 3-5 teams twice a year, providing equity-free grants, cloud credits, and co-founder matchmaking.",
    },
    {
      id: "6",
      title: "Are workshops conducted live?",
      content:
        "Yes, we run weekly live sessions on Discord or Zoom. They are recorded and added to our resources directory for later access.",
    },
    {
      id: "7",
      title: "What tech stack does the community focus on?",
      content:
        "We cover React, TypeScript, Rust, Python, Go, Solidity, Docker, and AI/ML frameworks. We encourage building with robust, scale-focused tools.",
    },
    {
      id: "8",
      title: "How do I RSVP for upcoming events?",
      content:
        "Go to the events page, find the event you are interested in, click 'RSVP Now' and fill out the form. You will receive a confirmation card and calendar invite.",
    },
    {
      id: "9",
      title: "Can I host a workshop or speaker session?",
      content:
        "Absolutely! We love community-led learning. Reach out to one of the moderators on Discord or submit a form via the Contact page with your proposal.",
    },
    {
      id: "10",
      title: "Does GenZyn help with job placement?",
      content:
        "Yes. We have partner companies that hire directly from our projects contributors list. We also run resume reviews, portfolio critiques, and mock interview sessions.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ paddingBottom: "100px" }}
    >
      {/* Hero */}
      <div
        className="main-container"
        style={{
          paddingTop: "160px",
          paddingBottom: "80px",
          textAlign: "center",
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="badge"
          style={{ marginBottom: "1.5rem" }}
        >
          Our Story & Mission
        </motion.span>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="gradient-text"
          style={{
            fontSize: "clamp(3rem, 6vw, 5rem)",
            marginBottom: "1.5rem",
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          We Are{" "}
          <span
            className="light-surface-text"
            style={{
              color: "#ffffff",
              WebkitTextFillColor: "#ffffff",
            }}>
            Gen
          </span>
          Zyn
        </motion.h1>
        <p
          style={{
            fontSize: "1.35rem",
            color: "var(--text-muted)",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          A collective of young innovators, developers, and creators dedicated
          to building the next generation of scalable and robust technologies.
        </p>
      </div>

      {/* Global Impact Grid */}
      <div
        style={{
          background: "rgba(255,255,255,0.01)",
          padding: "5rem 0",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="main-container">
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}
          >
            {[
              { value: "15k+", label: "Ecosystem Members" },
              { value: "85+", label: "Countries Reached" },
              { value: "2.4M+", label: "Lines of Code Written" },
              { value: "100+", label: "Open Contributors" },
            ].map((item, idx) => (
              <div key={idx} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: 800,
                    color: "var(--red)",
                    marginBottom: "4px",
                  }}
                >
                  {item.value}
                </div>
                <div
                  style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Story Panel */}
      <div className="main-container" style={{ padding: "6rem 2rem 0" }}>
        <div className="grid-2" style={{ gap: "3rem", marginBottom: "6rem" }}>
          <div className="card glass" style={{ padding: "3rem" }}>
            <div style={{ color: "var(--red)", marginBottom: "1.5rem" }}>
              <Award size={36} />
            </div>
            <h2
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                fontWeight: 700,
              }}
            >
              Our Origin Story
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "1rem",
                lineHeight: 1.7,
              }}
            >
              Born out of a hackathon in early 2024, GenZyn started as a simple
              Discord server where developers shared libraries, debugged
              systems, and talked about AI. Realizing the immense hunger for
              peer-to-peer technical mentorship, we structured the community.
              Today, we manage critical open-source tooling, incubator grants,
              and technical pipelines for developers worldwide.
            </p>
          </div>

          <div className="card glass" style={{ padding: "3rem" }}>
            <div style={{ color: "var(--red)", marginBottom: "1.5rem" }}>
              <Target size={36} />
            </div>
            <h2
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                fontWeight: 700,
              }}
            >
              Our Vision & Goal
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "1rem",
                lineHeight: 1.7,
              }}
            >
              We exist to bridge the gap between abstract computer science and
              high-scale production systems. We believe high-tier tech training,
              incubator environments, and developer resources should be
              accessible to all, not restricted to traditional tech hubs or
              corporate cohorts. Our focus is pure engineering merit.
            </p>
          </div>
        </div>

        {/* Meet the Founders */}
        <div style={{ marginBottom: "6rem" }}>
          <div className="section-header">
            <h2>
              Meet the <span className="gradient-text">Founders</span>
            </h2>
            <p>
              The core leadership coordinating GenZyn's global operations,
              partnerships, and technical stack.
            </p>
            <div
              className="section-divider"
              style={{ background: "var(--accent-gradient)" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "3rem",
            }}
          >
            {founders.map((founder, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card glass"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  maxWidth: "400px",
                  padding: "3rem 2rem",
                }}
              >
                <img
                  src={founder.avatar}
                  alt={founder.name}
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid var(--red)",
                    marginBottom: "1.5rem",
                  }}
                />
                <h3
                  style={{
                    fontSize: "1.5rem",
                    margin: "0 0 6px 0",
                    fontWeight: 700,
                  }}
                >
                  {founder.name}
                </h3>
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--red)",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: "1.25rem",
                  }}
                >
                  {founder.role}
                </span>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {founder.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Culture Photos Section */}
        <div style={{ marginBottom: "6rem" }}>
          <div className="section-header">
            <h2>
              Our Culture & <span className="gradient-text">Vibe</span>
            </h2>
            <p>
              We are a high-energy community focusing on hacking, collaborating,
              and shipping. Here's a glimpse of our events.
            </p>
            <div
              className="section-divider"
              style={{ background: "var(--accent-gradient)" }}
            />
          </div>

          <div className="grid-4" style={{ gap: "1.5rem" }}>
            {cultureImages.map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                style={{
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  height: "220px",
                  border: "1px solid var(--border)",
                }}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 70%)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "1.25rem",
                  }}
                >
                  <h4 style={{ fontSize: "1.1rem", margin: 0 }}>
                    {img.caption}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline (8 milestones) */}
        <div style={{ marginBottom: "8rem" }}>
          <div className="section-header">
            <h2>
              Our <span className="gradient-text">Journey Timeline</span>
            </h2>
            <p>
              From a 50-person group chat to a globally recognized engineering
              ecosystem.
            </p>
            <div
              className="section-divider"
              style={{ background: "var(--accent-gradient)" }}
            />
          </div>

          <div
            style={{
              position: "relative",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {/* Center line */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: "2px",
                background: "var(--border)",
                transform: "translateX(-50%)",
              }}
            />

            {timeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  style={{
                    display: "flex",
                    justifyContent: isEven ? "flex-start" : "flex-end",
                    marginBottom: "3.5rem",
                    position: "relative",
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "24px",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: "var(--red)",
                      transform: "translate(-50%, -50%)",
                      boxShadow: "0 0 15px var(--red-glow)",
                      zIndex: 2,
                    }}
                  />

                  <div
                    className="glass"
                    style={{
                      width: "45%",
                      padding: "1.75rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.95rem",
                        color: "var(--red)",
                        fontWeight: 700,
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {item.year}
                    </span>
                    <h4
                      style={{
                        fontSize: "1.25rem",
                        margin: "4px 0 8px 0",
                        fontWeight: 700,
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-muted)",
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Press & Media Mention Strip */}
        <div
          style={{
            marginBottom: "6rem",
            background: "rgba(255,255,255,0.01)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "3rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "1.5rem",
            }}
          >
            <Newspaper size={20} className="gradient-text" />
            <h3 style={{ fontSize: "1.25rem", margin: 0, fontWeight: 700 }}>
              Press & Media Mentions
            </h3>
          </div>
          <div className="grid-3" style={{ gap: "2rem" }}>
            {pressMentions.map((mention, idx) => (
              <div
                key={idx}
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <span
                  className="light-surface-text"
                  style={{ fontWeight: 800, color: "#fff", fontSize: "1.1rem" }}
                >
                  {mention.outlet}
                </span>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  "{mention.quote}"
                </p>
                <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
                  {mention.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Careers Highlight Page CTA */}
        <div
          style={{
            marginBottom: "6rem",
            background:
              "linear-gradient(135deg, rgba(71, 142, 204, 0.05) 0%, rgba(225, 6, 0, 0.05) 100%)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "3rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.5rem",
                margin: "0 0 6px 0",
                fontWeight: 700,
              }}
            >
              Want to help shape GenZyn?
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                margin: 0,
                fontSize: "0.95rem",
              }}
            >
              Explore our core volunteer team open positions in developer
              relations, content writing, design, and web dev.
            </p>
          </div>
          <Link
            to="/careers"
            className="btn-primary"
            style={{ boxShadow: "none" }}
          >
            <span>View Open Roles</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Accordion FAQ (10+ Questions) */}
        <div>
          <div className="section-header">
            <h2>
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p>
              Everything you need to know about our community, workshops,
              platform rules, and events.
            </p>
            <div
              className="section-divider"
              style={{ background: "var(--accent-gradient)" }}
            />
          </div>

          <div style={{ maxWidth: "750px", margin: "0 auto" }}>
            <Accordion items={faqs} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
export default About;
