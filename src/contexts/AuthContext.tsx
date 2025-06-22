"use client";
import { authInstance } from "@/lib/axios";
import { decodeJWT, isValidToken, willTokenExpireSoon } from "@/lib/jwt";
import { useRouter } from "next/navigation";
import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  name?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const verifyTokenWithBackend = useCallback(
    async (token: string): Promise<boolean> => {
      try {
        const response = await authInstance.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.status === 200;
      } catch (error) {
        return false;
      }
    },
    [],
  );

  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const currentToken = localStorage.getItem("access_token");
      if (!currentToken) return false;

      const response = await authInstance.get("/auth/refresh-token", {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      if (response.status === 200 && response.data.data.token) {
        const newToken = response.data.data.token;
        localStorage.setItem("access_token", newToken);

        const payload = decodeJWT(newToken);
        if (payload) {
          setUser({
            id: payload.sub,
            email: payload.email ?? "",
            name: payload.name,
            ...payload,
          });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    }
  }, []);

  // Login function
  const login = useCallback((token: string) => {
    localStorage.setItem("access_token", token);
    const payload = decodeJWT(token);
    if (payload) {
      const userData = {
        id: payload.sub,
        email: payload.email ?? "",
        name: payload.name,
        ...payload,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/auth/signin");
  }, [router]);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);

      const token = localStorage.getItem("access_token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      if (!isValidToken(token)) {
        logout();
        return;
      }

      const payload = decodeJWT(token);
      if (payload) {
        const userData = {
          id: payload.sub,
          email: payload.email ?? "",
          name: payload.name,
          ...payload,
        };
        setUser(userData);

        setTimeout(() => {
          verifyTokenWithBackend(token).then((isValid) => {
            if (!isValid) {
              logout();
            } else {
            }
          });
        }, 100);
      } else {
        logout();
        return;
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [logout, verifyTokenWithBackend]);

  useEffect(() => {
    if (!user) return;

    const checkTokenExpiration = () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        logout();
        return;
      }

      if (willTokenExpireSoon(token, 5)) {
        refreshToken().then((success) => {
          if (!success) {
            logout();
          }
        });
      }
    };

    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user, logout, refreshToken]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
