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
  authMethod: "jwt" | "session" | null;
  login: (token: string) => void;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authMethod, setAuthMethod] = useState<"jwt" | "session" | null>(null);
  const router = useRouter();

  const verifyAuthWithBackend = useCallback(async (): Promise<{
    isValid: boolean;
    user: User | null;
    method: "jwt" | "session" | null;
  }> => {
    try {
      const token = localStorage.getItem("access_token");

      // Try JWT authentication first if token exists
      if (token && isValidToken(token)) {
        try {
          console.log("Attempting JWT authentication");
          const response = await authInstance.get("/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: false, // Don't send cookies for JWT auth
          });

          if (response.status === 200 && response.data?.data) {
            const userData = {
              id: response.data.data.id || response.data.data.sub,
              email: response.data.data.email ?? "",
              name: response.data.data.name,
              ...response.data.data,
            };
            console.log("JWT auth successful");
            return { isValid: true, user: userData, method: "jwt" };
          }
        } catch (jwtError: any) {
          console.log(
            "JWT auth failed, will try session auth:",
            jwtError.response?.data?.message,
          );
          // If JWT fails, remove invalid token and try session auth
          if (jwtError.response?.status === 401) {
            localStorage.removeItem("access_token");
          }
        }
      }

      // Try session authentication (cookie-based)
      try {
        console.log("Attempting session authentication");
        const response = await authInstance.get("/users/me", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Send cookies for session auth
        });

        if (response.status === 200 && response.data?.data) {
          const userData = {
            id: response.data.data.id || response.data.data.sub,
            email: response.data.data.email ?? "",
            name: response.data.data.name,
            ...response.data.data,
          };
          console.log("Session auth successful");
          return { isValid: true, user: userData, method: "session" };
        }
      } catch (sessionError: any) {
        console.log(
          "Session auth failed:",
          sessionError.response?.data?.message,
        );
      }

      // Both methods failed
      console.log("Both authentication methods failed");
      return { isValid: false, user: null, method: null };
    } catch (error: any) {
      console.error("Backend verification failed:", error);
      return { isValid: false, user: null, method: null };
    }
  }, []);

  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      // Only refresh if we're using JWT auth method
      if (authMethod !== "jwt") {
        console.log("Not using JWT auth, skipping token refresh");
        return true; // Session auth doesn't need manual refresh
      }

      const currentToken = localStorage.getItem("access_token");
      if (!currentToken) {
        console.log("No token to refresh");
        return false;
      }

      console.log("Attempting token refresh");
      const response = await authInstance.post(
        "/auth/refresh-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, // May need cookies for refresh endpoint
        },
      );

      if (response.status === 200 && response.data.data?.token) {
        const newToken = response.data.data.token;
        localStorage.setItem("access_token", newToken);

        const payload = decodeJWT(newToken);
        if (payload) {
          const userData = {
            id: payload.sub,
            email: payload.email ?? "",
            name: payload.name,
            ...payload,
          };
          setUser(userData);
          setAuthMethod("jwt");
          console.log("Token refresh successful");
          return true;
        }
      }

      return false;
    } catch (error: any) {
      console.error("Token refresh failed:", error);
      // If refresh fails, try to re-verify with backend
      const {
        isValid,
        user: backendUser,
        method,
      } = await verifyAuthWithBackend();
      if (isValid && backendUser) {
        setUser(backendUser);
        setAuthMethod(method);
        return true;
      }
      return false;
    }
  }, [authMethod, verifyAuthWithBackend]);

  // For email/password login - stores JWT token
  const login = useCallback((token: string) => {
    console.log("Login called with JWT token");
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
      setAuthMethod("jwt");
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("JWT login successful, user set");
    }
  }, []);

  // For OAuth login - verifies session cookie
  const verifyOAuthLogin = useCallback(async () => {
    console.log("Verifying OAuth login");
    const {
      isValid,
      user: backendUser,
      method,
    } = await verifyAuthWithBackend();
    if (isValid && backendUser && method === "session") {
      setUser(backendUser);
      setAuthMethod("session");
      console.log("OAuth login verified successfully");
      return true;
    }
    return false;
  }, [verifyAuthWithBackend]);

  const logout = useCallback(async () => {
    console.log("Logout called");

    // try {
    //   // Call logout endpoint to clear server-side session
    //   await authInstance.post(
    //     "/auth/logout",
    //     {},
    //     {
    //       headers:
    //         authMethod === "jwt" && localStorage.getItem("access_token")
    //           ? {
    //               Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //             }
    //           : {},
    //       withCredentials: true, // Clear cookies
    //     },
    //   );
    // } catch (error) {
    //   console.error("Logout endpoint failed:", error);
    // }

    // Clear client-side storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
    setAuthMethod(null);
    router.push("/auth/signin");
  }, [router, authMethod]);

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("Initializing auth...");
      setIsLoading(true);

      const token = localStorage.getItem("access_token");
      console.log("Token in localStorage:", token ? "exists" : "not found");

      // First, try to use existing token if valid
      if (token && isValidToken(token)) {
        console.log("Valid JWT token found, setting user from token");
        const payload = decodeJWT(token);
        if (payload) {
          const userData = {
            id: payload.sub,
            email: payload.email ?? "",
            name: payload.name,
            ...payload,
          };
          setUser(userData);
          setAuthMethod("jwt");
          console.log("User set from JWT token");
        }
      }

      // Always verify with backend to handle both JWT and session auth
      console.log("Verifying authentication with backend...");
      const {
        isValid,
        user: backendUser,
        method,
      } = await verifyAuthWithBackend();

      if (isValid && backendUser) {
        setUser(backendUser);
        setAuthMethod(method);
        console.log(`Authentication verified via ${method}`);
      } else {
        console.log("No valid authentication found");
        // Don't automatically logout here - user might be on public pages
        setUser(null);
        setAuthMethod(null);
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []); // Remove dependencies to prevent infinite loops

  // Token expiration check (only for JWT)
  useEffect(() => {
    if (!user || authMethod !== "jwt") return;

    const checkTokenExpiration = () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.log("No token found during expiration check");
        logout();
        return;
      }

      if (willTokenExpireSoon(token, 5)) {
        console.log("Token will expire soon, refreshing...");
        refreshToken().then((success) => {
          if (!success) {
            console.log("Token refresh failed, logging out");
            logout();
          }
        });
      }
    };

    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000); // Check every 5 minutes
    return () => clearInterval(interval);
  }, [user, authMethod, logout, refreshToken]);

  // Session validation check (for session auth)
  useEffect(() => {
    if (!user || authMethod !== "session") return;

    const validateSession = async () => {
      const { isValid } = await verifyAuthWithBackend();
      if (!isValid) {
        console.log("Session validation failed, logging out");
        logout();
      }
    };

    const interval = setInterval(validateSession, 10 * 60 * 1000); // Check every 10 minutes
    return () => clearInterval(interval);
  }, [user, authMethod, logout, verifyAuthWithBackend]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    authMethod,
    login, // For JWT login
    logout,
    refreshToken,
  };

  // Add verifyOAuthLogin to the context if you need to call it from components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Helper hook for OAuth login verification
export function useOAuthLogin() {
  const { login } = useAuth();

  const verifyOAuthLogin = useCallback(async () => {
    // This will be called after OAuth redirect
    try {
      const response = await authInstance.get("/users/me", {
        withCredentials: true,
      });

      if (response.status === 200 && response.data?.data) {
        // For OAuth, we don't store JWT in localStorage
        // The session is managed via cookies
        return true;
      }
      return false;
    } catch (error) {
      console.error("OAuth verification failed:", error);
      return false;
    }
  }, []);

  return { verifyOAuthLogin };
}
