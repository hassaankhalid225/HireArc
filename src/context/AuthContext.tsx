"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/services/api";
import { config } from "@/config";

// ─── Types ────────────────────────────────────────────────────────────────────
interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  provider?: string;
  role?: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  loginGoogle: () => void;
  loginGithub: () => void;
  logout: () => void;
  isLoading: boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const BACKEND_URL = config.BACKEND_URL;

  // Fetch user from backend on load
  useEffect(() => {
    async function checkAuth() {
      try {
        const userData = await apiClient.get<User>("/auth/me");
        setUser(userData);
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);

  const loginGoogle = useCallback(() => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  }, [BACKEND_URL]);

  const loginGithub = useCallback(() => {
    window.location.href = `${BACKEND_URL}/auth/github`;
  }, [BACKEND_URL]);

  const logout = useCallback(async () => {
    try {
      await apiClient.post("/auth/logout", {});
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
      router.push("/");
      router.refresh();
    }
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginGoogle,
        loginGithub,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
