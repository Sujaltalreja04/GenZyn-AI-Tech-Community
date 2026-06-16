import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string | number;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string | number>>(new Set());

  const handleToggle = (id: string | number) => {
    const nextOpenIds = new Set(openIds);
    if (nextOpenIds.has(id)) {
      nextOpenIds.delete(id);
    } else {
      if (!allowMultiple) {
        nextOpenIds.clear();
      }
      nextOpenIds.add(id);
    }
    setOpenIds(nextOpenIds);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            className="accordion-item"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "12px",
              overflow: "hidden",
              background: "rgba(16, 16, 24, 0.4)",
              backdropFilter: "blur(12px)",
              transition: "border-color 0.3s",
            }}
          >
            <button
              onClick={() => handleToggle(item.id)}
              className={`accordion-trigger ${isOpen ? "open" : ""}`}
              style={{
                width: "100%",
                padding: "1.25rem 1.5rem",
                background: "none",
                border: "none",
                color: "var(--text)",
                fontSize: "1.05rem",
                fontWeight: 600,
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "var(--font-family)",
                outline: "none",
              }}
            >
              <span>{item.title}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <ChevronDown size={18} style={{ color: "var(--text-muted)" }} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div
                    style={{
                      padding: "0 1.5rem 1.25rem 1.5rem",
                      color: "var(--text-muted)",
                      lineHeight: "1.6",
                      fontSize: "0.95rem",
                    }}
                  >
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
