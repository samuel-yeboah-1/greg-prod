"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  console.log("ProtectedLayout:", {
    isAuthenticated,
    isLoading,
    hasCheckedAuth,
  });

  useEffect(() => {
    // Only redirect after loading is complete and we've confirmed the user is not authenticated
    if (!isLoading) {
      setHasCheckedAuth(true);

      if (!isAuthenticated) {
        console.log("User not authenticated, redirecting to signin");
        router.replace("/auth/signin");
      } else {
        console.log("User is authenticated, allowing access");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while auth is being checked
  if (isLoading || !hasCheckedAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Only render children if user is authenticated
  if (!isAuthenticated) {
    return null; // Prevent flash of content before redirect
  }

  return <>{children}</>;
}
