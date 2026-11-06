import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "./icons";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ addToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let toastId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "success") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container" style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9999, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 4000;
    const interval = 50;
    const step = (interval / duration) * 100;
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p <= 0) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return p - step;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle size={18} />,
    error: <AlertCircle size={18} />,
    info: <Info size={18} />,
  };

  const colors = {
    success: "#22c55e",
    error: "#ef4444",
    info: "#3b82f6",
  };

  return (
    <motion.div
      className="toast"
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      style={{
        background: "rgba(16, 16, 24, 0.95)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${colors[toast.type]}33`,
        borderRadius: "12px",
        padding: "1rem 1.25rem",
        minWidth: "300px",
        maxWidth: "400px",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        position: "relative",
        overflow: "hidden",
        boxShadow: `0 8px 32px rgba(0,0,0,0.4)`,
      }}
    >
      <span style={{ color: colors[toast.type], flexShrink: 0 }}>{icons[toast.type]}</span>
      <span style={{ flex: 1, fontSize: "0.95rem", color: "#e5e7eb" }}>{toast.message}</span>
      <button onClick={onClose} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", padding: "4px", flexShrink: 0 }}>
        <X size={16} />
      </button>
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: "3px",
        width: `${progress}%`,
        background: colors[toast.type],
        transition: "width 50ms linear",
        borderRadius: "0 0 12px 12px",
      }} />
    </motion.div>
  );
}
