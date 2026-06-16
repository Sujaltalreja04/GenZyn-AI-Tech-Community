import { useState, useMemo, useCallback } from "react";

export function useSearch<T>(
  items: T[],
  searchFields: (keyof T)[],
  filterField?: keyof T
) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    let result = items;

    if (activeFilter !== "All" && filterField) {
      result = result.filter((item) => {
        const val = item[filterField];
        if (typeof val === "string") return val === activeFilter;
        if (Array.isArray(val)) return val.includes(activeFilter);
        return true;
      });
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((item) =>
        searchFields.some((field) => {
          const val = item[field];
          if (typeof val === "string") return val.toLowerCase().includes(q);
          if (Array.isArray(val)) return val.some((v) => String(v).toLowerCase().includes(q));
          return false;
        })
      );
    }

    return result;
  }, [items, query, activeFilter, searchFields, filterField]);

  const clearSearch = useCallback(() => {
    setQuery("");
  }, []);

  return {
    query,
    setQuery,
    activeFilter,
    setActiveFilter,
    filtered,
    resultCount: filtered.length,
    clearSearch,
  };
}
