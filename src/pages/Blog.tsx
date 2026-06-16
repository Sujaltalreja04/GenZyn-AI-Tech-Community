import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts, blogCategories } from "../data/blog";
import { SearchBar } from "../components/SearchBar";
import { FilterTabs } from "../components/FilterTabs";
import { NewsletterForm } from "../components/NewsletterForm";
import { useToast } from "../components/Toast";
import { Share2, Clock, User, BookOpen, Award } from "lucide-react";

export function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const { addToast } = useToast();

  const handleShare = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    addToast(`Link to "${title}" copied to clipboard!`, "success");
  };

  // Filter blog posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Extract featured post
  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

  // Extract top popular posts for sidebar (excluding the featured one)
  const popularPosts = blogPosts
    .filter((p) => p.id !== featuredPost.id)
    .slice(0, 4);

  // Pagination posts
  const paginatedPosts = filteredPosts.slice(0, visibleCount);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ paddingBottom: "100px" }}
    >
      {/* Hero */}
      <div className="main-container" style={{ paddingTop: "160px", paddingBottom: "3rem", textAlign: "center" }}>
        <span className="badge" style={{ marginBottom: "1.5rem" }}>
          Community Insights
        </span>
        <h1 className="gradient-text" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", marginBottom: "1.5rem", fontWeight: 800 }}>
          The GenZyn Blog
        </h1>
        <p style={{ fontSize: "1.35rem", color: "var(--text-muted)", maxWidth: "800px", margin: "0 auto 3rem", lineHeight: 1.7 }}>
          Tutorials, architecture reviews, incubator logs, and stories written by developers in our community.
        </p>
      </div>

      {/* Featured Post Panel */}
      <section className="main-container" style={{ marginBottom: "4rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card glass"
          style={{ padding: 0, overflow: "hidden", display: "flex", flexWrap: "wrap", border: "1px solid rgba(225,6,0,0.15)" }}
        >
          <div
            style={{
              flex: "1 1 50%",
              minHeight: "350px",
              background: featuredPost.gradient || "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BookOpen size={64} style={{ color: "rgba(255,255,255,0.2)" }} />
          </div>
          <div style={{ flex: "1 1 50%", padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
              <span className="badge" style={{ alignSelf: "flex-start" }}>
                Featured
              </span>
              <span className="tag">{featuredPost.category}</span>
            </div>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem", lineHeight: 1.2, fontWeight: 800 }}>
              {featuredPost.title}
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "2rem", lineHeight: 1.6 }}>
              {featuredPost.excerpt}
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "var(--red-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    color: "var(--red)",
                    fontSize: "0.85rem",
                  }}
                >
                  {featuredPost.author.charAt(0)}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: "0.95rem" }}>{featuredPost.author}</h4>
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-dim)" }}>
                    {featuredPost.date} &bull; {featuredPost.readTime}
                  </p>
                </div>
              </div>

              <button onClick={(e) => handleShare(featuredPost.title, e)} className="btn-icon" style={{ width: "36px", height: "36px" }}>
                <Share2 size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Blog Workspace Grid + Sidebar */}
      <section className="main-container">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem" }}>
          {/* Main List */}
          <div style={{ flex: "1 1 65%" }}>
            {/* Filters */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                marginBottom: "3rem",
                background: "rgba(255, 255, 255, 0.01)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "1rem 1.5rem",
              }}
            >
              <SearchBar query={searchQuery} onQueryChange={setSearchQuery} placeholder="Search posts, summaries, authors..." />
              <FilterTabs categories={blogCategories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            </div>

            {/* Articles */}
            <AnimatePresence mode="popLayout">
              {filteredPosts.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-dim)" }}>
                  <h3>No blog articles match query criteria.</h3>
                  <p>Try resetting filters or searching another keyword.</p>
                </div>
              ) : (
                <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                  {paginatedPosts.map((post) => (
                    <motion.div
                      layout
                      key={post.id}
                      className="card-interactive"
                      style={{
                        padding: 0,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        background: "rgba(16, 16, 24, 0.4)",
                        border: "1px solid var(--border)",
                        borderRadius: "16px",
                      }}
                      whileHover={{ y: -8, borderColor: "var(--border-hover)", boxShadow: "0 8px 30px var(--red-glow)" }}
                    >
                      <div style={{ height: "120px", background: post.gradient }} />
                      <div style={{ padding: "1.75rem", flexGrow: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span className="badge" style={{ fontSize: "0.75rem", padding: "3px 8px" }}>
                            {post.category}
                          </span>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Clock size={10} />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, lineHeight: 1.3 }}>{post.title}</h3>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, flexGrow: 1, margin: 0 }}>
                          {post.excerpt}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderTop: "1px solid var(--border)",
                            paddingTop: "0.75rem",
                            marginTop: "0.5rem",
                            fontSize: "0.8rem",
                            color: "var(--text-dim)",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <User size={12} />
                            <span>{post.author}</span>
                          </div>
                          <button
                            onClick={(e) => handleShare(post.title, e)}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
                          >
                            <Share2 size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Pagination trigger */}
            {filteredPosts.length > visibleCount && (
              <div style={{ textAlign: "center", marginTop: "3rem" }}>
                <button onClick={() => setVisibleCount((prev) => prev + 6)} className="btn-secondary" style={{ padding: "0.75rem 2.5rem" }}>
                  Load More Articles
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Area */}
          <div style={{ flex: "1 1 28%", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {/* Newsletter widget */}
            <div className="card glass" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Newsletter</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                Get our technical deep-dives and event reminders directly in your inbox.
              </p>
              <NewsletterForm />
            </div>

            {/* Popular Sidebar */}
            <div className="card glass" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                <Award size={16} style={{ color: "var(--red)" }} />
                <span>Trending Now</span>
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {popularPosts.map((post) => (
                  <div
                    key={post.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      borderBottom: "1px solid var(--border)",
                      paddingBottom: "10px",
                    }}
                  >
                    <span style={{ fontSize: "0.7rem", color: "var(--red)", fontWeight: 600, textTransform: "uppercase" }}>
                      {post.category}
                    </span>
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 600, margin: 0, lineHeight: 1.3, cursor: "pointer" }}>
                      {post.title}
                    </h4>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>{post.readTime}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
export default Blog;
