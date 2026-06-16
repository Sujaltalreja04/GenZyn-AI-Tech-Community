import { Search, X } from "lucide-react";

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  placeholder?: string;
  resultCount?: number;
}

export function SearchBar({ query, onQueryChange, placeholder = "Search...", resultCount }: SearchBarProps) {
  return (
    <div style={{ position: "relative", maxWidth: "400px", width: "100%" }}>
      <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#6b7280", pointerEvents: "none" }} />
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "0.75rem 2.5rem 0.75rem 2.75rem",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          color: "#fff",
          fontSize: "0.95rem",
          outline: "none",
          transition: "border-color 0.3s",
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = "rgba(225,6,0,0.5)"}
        onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
      />
      {query && (
        <button
          onClick={() => onQueryChange("")}
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "#6b7280",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
          }}
        >
          <X size={16} />
        </button>
      )}
      {resultCount !== undefined && query && (
        <span style={{ position: "absolute", right: query ? "36px" : "12px", top: "50%", transform: "translateY(-50%)", fontSize: "0.8rem", color: "#6b7280" }}>
          {resultCount} results
        </span>
      )}
    </div>
  );
}
