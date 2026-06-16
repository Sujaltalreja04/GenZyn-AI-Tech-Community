import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resourceCategories, difficultyLevels, type Resource } from "../data/resources";
import { SearchBar } from "../components/SearchBar";
import { FilterTabs } from "../components/FilterTabs";
import { useToast } from "../components/Toast";
import { BookMarked, Bookmark, Download, Search, Check, Info, FileText } from "lucide-react";

export function Resources() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const { addToast } = useToast();

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("genzyn_bookmarked_resources");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const toggleBookmark = (title: string) => {
    let next: string[];
    if (bookmarks.includes(title)) {
      next = bookmarks.filter((b) => b !== title);
      addToast(`Removed "${title}" from bookmarks.`, "info");
    } else {
      next = [...bookmarks, title];
      addToast(`Bookmarked "${title}"!`, "success");
    }
    setBookmarks(next);
    localStorage.setItem("genzyn_bookmarked_resources", JSON.stringify(next));
  };

  const handleDownload = (title: string) => {
    addToast(`Starting download: ${title}...`, "success");
  };

  // Extract recently added resources (highest download count for demo)
  const allResources: { resource: Resource; category: string }[] = [];
  resourceCategories.forEach((cat) => {
    cat.items.forEach((item) => {
      allResources.push({ resource: item, category: cat.category });
    });
  });

  const recentlyAdded = [...allResources]
    .sort((a, b) => b.resource.downloads - a.resource.downloads)
    .slice(0, 3);

  // Filter logic
  const categoryNames = ["All", ...resourceCategories.map((c) => c.category)];

  const filteredCategories = resourceCategories
    .map((section) => {
      const filteredItems = section.items.filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tag.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDifficulty = activeDifficulty === "All" || item.difficulty === activeDifficulty;
        const matchesBookmark = !showBookmarksOnly || bookmarks.includes(item.title);

        return matchesSearch && matchesDifficulty && matchesBookmark;
      });

      return {
        ...section,
        items: filteredItems,
      };
    })
    .filter((section) => {
      const matchesCategory = activeCategory === "All" || section.category === activeCategory;
      return matchesCategory && (section.items.length > 0 || searchQuery !== "" || activeDifficulty !== "All");
    });

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
          Learning Archives
        </span>
        <h1 className="gradient-text" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", marginBottom: "1.5rem", fontWeight: 800 }}>
          Resource Library
        </h1>
        <p style={{ fontSize: "1.35rem", color: "var(--text-muted)", maxWidth: "800px", margin: "0 auto 3rem", lineHeight: 1.7 }}>
          Access premium roadmaps, configurations, configuration dotfiles, design tokens, interview cheat sheets, and SaaS starters.
        </p>
      </div>

      {/* Recently Added Showcase */}
      <section className="main-container" style={{ marginBottom: "5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "10px" }}>
            <FileText size={20} className="gradient-text" />
            <span>Popular Downloads</span>
          </h2>
        </div>
        <div className="grid-3" style={{ display: "grid", gap: "2rem" }}>
          {recentlyAdded.map((item, idx) => (
            <div
              key={idx}
              className="card glass"
              style={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                background: "rgba(225, 6, 0, 0.03)",
                border: "1px solid rgba(225, 6, 0, 0.15)",
                borderRadius: "16px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span className="badge" style={{ fontSize: "0.75rem", padding: "4px 8px" }}>
                  {item.category}
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                  {item.resource.downloads.toLocaleString()} dl
                </span>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>{item.resource.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", flexGrow: 1, margin: "0 0 1.5rem 0" }}>
                {item.resource.description}
              </p>
              <button
                onClick={() => handleDownload(item.resource.title)}
                className="btn-primary"
                style={{ width: "100%", padding: "0.6rem", fontSize: "0.85rem", boxShadow: "none" }}
              >
                <Download size={14} />
                <span>Download Now</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Filtering Control Row */}
      <section className="main-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            marginBottom: "3.5rem",
            background: "rgba(255, 255, 255, 0.01)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "1.5rem 2rem",
          }}
        >
          {/* Row 1: Search and Bookmarks filter */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem", alignItems: "center" }}>
            <div style={{ flex: "1 1 300px" }}>
              <SearchBar query={searchQuery} onQueryChange={setSearchQuery} placeholder="Search learning guides..." />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <button
                onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                className="btn-secondary"
                style={{
                  padding: "0.6rem 1.25rem",
                  fontSize: "0.9rem",
                  borderColor: showBookmarksOnly ? "var(--red)" : "var(--border)",
                  color: showBookmarksOnly ? "#fff" : "var(--text-muted)",
                  background: showBookmarksOnly ? "rgba(225, 6, 0, 0.1)" : "rgba(255,255,255,0.03)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Bookmark size={16} fill={showBookmarksOnly ? "var(--red)" : "none"} />
                <span>Bookmarks ({bookmarks.length})</span>
              </button>
            </div>
          </div>

          {/* Row 2: Category tabs */}
          <div>
            <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--text-dim)", letterSpacing: "1px", marginBottom: "8px" }}>
              Categories
            </h4>
            <FilterTabs categories={categoryNames} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          </div>

          {/* Row 3: Difficulty filters */}
          <div>
            <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--text-dim)", letterSpacing: "1px", marginBottom: "8px" }}>
              Difficulty Level
            </h4>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {difficultyLevels.map((diff) => {
                const isActive = diff === activeDifficulty;
                return (
                  <button
                    key={diff}
                    onClick={() => setActiveDifficulty(diff)}
                    className="tag"
                    style={{
                      cursor: "pointer",
                      padding: "6px 12px",
                      fontSize: "0.8rem",
                      borderRadius: "6px",
                      background: isActive ? "var(--red)" : "rgba(255,255,255,0.05)",
                      color: isActive ? "#fff" : "var(--text-muted)",
                      border: "1px solid var(--border)",
                      transition: "all 0.2s",
                    }}
                  >
                    {diff}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Resources Grid List grouped by categories */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4.5rem" }}>
          {filteredCategories.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-dim)" }}>
              <h3>No resources found matching filter criteria.</h3>
              <p>Try resetting the difficulty or search query filters.</p>
            </div>
          ) : (
            filteredCategories.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h2 style={{ fontSize: "1.75rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span>{section.icon}</span>
                  <span>{section.category}</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", fontWeight: "normal" }}>
                    ({section.items.length})
                  </span>
                </h2>
                <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                  {section.items.map((item, itemIdx) => {
                    const isBookmarked = bookmarks.includes(item.title);
                    return (
                      <motion.div
                        key={itemIdx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: itemIdx * 0.05 }}
                        className="card glass"
                        style={{
                          padding: "2rem 1.5rem",
                          display: "flex",
                          flexDirection: "column",
                          background: "rgba(16, 16, 24, 0.4)",
                          border: "1px solid var(--border)",
                          borderRadius: "16px",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                          <span className="badge" style={{ fontSize: "0.7rem", padding: "3px 8px" }}>
                            {item.type}
                          </span>
                          <button
                            onClick={() => toggleBookmark(item.title)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: isBookmarked ? "var(--red)" : "var(--text-dim)",
                            }}
                          >
                            <Bookmark size={18} fill={isBookmarked ? "var(--red)" : "none"} />
                          </button>
                        </div>

                        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 6px 0", lineHeight: 1.3 }}>
                          {item.title}
                        </h3>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", flexGrow: 1, margin: "0 0 1.25rem 0", lineHeight: 1.5 }}>
                          {item.description}
                        </p>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "var(--text-dim)" }}>
                          <span>Level: {item.difficulty}</span>
                          <span>Downloads: {item.downloads.toLocaleString()}</span>
                        </div>

                        <button
                          onClick={() => handleDownload(item.title)}
                          className="btn-secondary"
                          style={{ marginTop: "1.25rem", width: "100%", padding: "0.5rem", fontSize: "0.85rem" }}
                        >
                          <Download size={12} />
                          <span>Download Archive</span>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Suggest a Resource form trigger */}
      <section className="main-container" style={{ padding: "6rem 2rem 0" }}>
        <div
          className="glass"
          style={{
            padding: "4rem",
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(71,142,204,0.05) 0%, rgba(225,6,0,0.05) 100%)",
            borderRadius: "24px",
            border: "1px solid var(--border)",
          }}
        >
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Suggest a Resource</h2>
          <p style={{ fontSize: "1.15rem", color: "var(--text-muted)", marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
            Found an incredible tutorial, library config, or sandbox setup? Share it with the community staff!
          </p>
          <button
            onClick={() => addToast("Submit Resource form is coming soon in Discord updates!", "info")}
            className="btn-primary"
            style={{ padding: "0.9rem 2.5rem", fontSize: "1.1rem" }}
          >
            Submit Resource
          </button>
        </div>
      </section>
    </motion.div>
  );
}
export default Resources;
