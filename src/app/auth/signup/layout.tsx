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

  useEffect(() => {
    if (!isLoading) {
      setHasCheckedAuth(true);

      if (isAuthenticated && user) {
        setIsRedirecting(true);
        router.replace("/actions");
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

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

  if (isAuthenticated && (isRedirecting || user)) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Redirecting to actions...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !user) {
    return <>{children}</>;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
}
