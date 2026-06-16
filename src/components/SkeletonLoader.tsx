interface SkeletonLoaderProps {
  variant?: "card" | "text" | "image" | "list";
  count?: number;
}

export function SkeletonLoader({ variant = "card", count = 1 }: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case "card":
        return (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "1.5rem",
              width: "100%",
            }}
          >
            {/* Image Placeholder */}
            <div className="skeleton" style={{ height: "180px", borderRadius: "10px", marginBottom: "1rem" }} />
            {/* Title Placeholder */}
            <div className="skeleton" style={{ height: "24px", width: "70%", borderRadius: "4px", marginBottom: "0.75rem" }} />
            {/* Line Placeholder */}
            <div className="skeleton" style={{ height: "14px", width: "100%", borderRadius: "4px", marginBottom: "0.5rem" }} />
            <div className="skeleton" style={{ height: "14px", width: "90%", borderRadius: "4px", marginBottom: "1rem" }} />
            {/* Footer Placeholder */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div className="skeleton" style={{ height: "14px", width: "30%", borderRadius: "4px" }} />
              <div className="skeleton" style={{ height: "28px", width: "20%", borderRadius: "4px" }} />
            </div>
          </div>
        );
      case "text":
        return (
          <div style={{ width: "100%" }}>
            <div className="skeleton" style={{ height: "24px", width: "40%", borderRadius: "4px", marginBottom: "1rem" }} />
            <div className="skeleton" style={{ height: "14px", width: "100%", borderRadius: "4px", marginBottom: "0.5rem" }} />
            <div className="skeleton" style={{ height: "14px", width: "95%", borderRadius: "4px", marginBottom: "0.5rem" }} />
            <div className="skeleton" style={{ height: "14px", width: "80%", borderRadius: "4px" }} />
          </div>
        );
      case "image":
        return (
          <div className="skeleton" style={{ width: "100%", height: "300px", borderRadius: "12px" }} />
        );
      case "list":
        return (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  padding: "0.75rem",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div className="skeleton" style={{ width: "48px", height: "48px", borderRadius: "8px", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ height: "16px", width: "40%", borderRadius: "4px", marginBottom: "6px" }} />
                  <div className="skeleton" style={{ height: "12px", width: "70%", borderRadius: "4px" }} />
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} style={{ width: "100%" }}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
}
