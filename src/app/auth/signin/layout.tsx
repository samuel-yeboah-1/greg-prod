"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  console.log("AuthLayout state:", {
    isAuthenticated,
    isLoading,
    hasUser: !!user,
    hasCheckedAuth,
    isRedirecting,
  });

  useEffect(() => {
    // Only proceed once loading is complete
    if (!isLoading) {
      setHasCheckedAuth(true);

      if (isAuthenticated && user) {
        console.log("User is authenticated, redirecting to /actions");
        setIsRedirecting(true);
        router.replace("/actions");
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  // Show loading while auth is being checked
  if (isLoading || !hasCheckedAuth) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show redirecting state
  if (isAuthenticated && (isRedirecting || user)) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  // Only render children if user is definitely not authenticated
  if (!isAuthenticated && !user) {
    console.log("User not authenticated, showing signin form");
    return <>{children}</>;
  }

  // Fallback loading state
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
}
