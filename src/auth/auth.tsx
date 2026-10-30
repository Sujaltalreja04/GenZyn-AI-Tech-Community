import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const payload = (await response.json().catch(() => null)) as { error?: string; data?: T } | null;
  if (!response.ok) {
    throw new Error(payload?.error ?? `Authentication request failed (${response.status}).`);
  }
  return payload?.data as T;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const session = await request<{ user: AuthUser | null }>("/api/auth/session");
      setUser(session.user);
      setError(null);
    } catch (sessionError) {
      setUser(null);
      setError(sessionError instanceof Error ? sessionError.message : "Unable to restore your session.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      return;
    }

    try {
      const data = await request<{ notifications: Notification[] }>("/api/notifications");
      setNotifications(data.notifications);
    } catch {
      setNotifications([]);
    }
  }, [user]);

  useEffect(() => {
    // Session restoration is an external request; its result must update auth state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refreshSession();
  }, [refreshSession]);

  useEffect(() => {
    // Notifications are synchronized with the authenticated backend session.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refreshNotifications();
  }, [refreshNotifications]);

  const login = useCallback(async (email: string, password: string) => {
    const data = await request<{ user: AuthUser }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setUser(data.user);
    setError(null);
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const data = await request<{ user: AuthUser }>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    setUser(data.user);
    setError(null);
  }, []);

  const logout = useCallback(async () => {
    await request("/api/auth/logout", { method: "POST" });
    setUser(null);
    setNotifications([]);
  }, []);

  const markNotificationRead = useCallback(async (id: string) => {
    await request(`/api/notifications/${encodeURIComponent(id)}/read`, { method: "POST" });
    setNotifications((current) => current.map((notification) => (
      notification.id === id ? { ...notification, read: true } : notification
    )));
  }, []);

  const value = useMemo(() => ({
    user,
    notifications,
    isLoading,
    error,
    login,
    signup,
    logout,
    refreshSession,
    markNotificationRead,
  }), [user, notifications, isLoading, error, login, signup, logout, refreshSession, markNotificationRead]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
}
