import { motion } from "framer-motion";

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function FilterTabs({ categories, activeCategory, onCategoryChange }: FilterTabsProps) {
  return (
    <div className="filter-tabs" style={{ position: "relative" }}>
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`filter-tab ${isActive ? "active" : ""}`}
            style={{
              position: "relative",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              background: isActive ? "var(--accent-gradient)" : "rgba(255, 255, 255, 0.04)",
              color: isActive ? "#fff" : "var(--text-muted)",
              padding: "0.6rem 1.25rem",
              borderRadius: "100px",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "0.9rem",
              transition: "color 0.3s, background-color 0.3s",
              outline: "none",
            }}
          >
            {isActive && (
              <motion.span
                layoutId="activeTabPill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "100px",
                  background: "var(--accent-gradient)",
                  zIndex: -1,
                  boxShadow: "0 4px 15px var(--red-glow)",
                }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{category}</span>
          </button>
        );
      })}
    </div>
  );
}
