// components/ProtectedRoute.tsx
"use client";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  redirectTo = "/auth/signin",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo);
      } else if (!requireAuth && isAuthenticated) {
        router.push("/actions");
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Redirecting to login...
      </div>
    );
  }

  if (!requireAuth && isAuthenticated) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Redirecting to dashboard...
      </div>
    );
  }

  return <>{children}</>;
}

// Higher-order component version
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requireAuth: boolean = true,
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <AuthProvider>
        <ProtectedRoute requireAuth={requireAuth}>
          <Component {...props} />
        </ProtectedRoute>
      </AuthProvider>
    );
  };
}
