import { Grid, List } from "./icons";

export type ViewMode = "grid" | "list";

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
  label: string;
}

export function ViewModeToggle({ value, onChange, label }: ViewModeToggleProps) {
  return (
    <div className="view-mode-toggle" role="group" aria-label={label}>
      <button
        type="button"
        className={value === "grid" ? "active" : ""}
        onClick={() => onChange("grid")}
        aria-label="Grid view"
        aria-pressed={value === "grid"}
        title="Grid view"
      >
        <Grid size={18} />
      </button>
      <button
        type="button"
        className={value === "list" ? "active" : ""}
        onClick={() => onChange("list")}
        aria-label="List view"
        aria-pressed={value === "list"}
        title="List view"
      >
        <List size={18} />
      </button>
    </div>
  );
}
