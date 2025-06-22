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

  useEffect(() => {
    if (!isLoading) {
      setHasCheckedAuth(true);

      if (!isAuthenticated) {
        router.replace("/auth/signin");
      }
    }
  }, [isAuthenticated, isLoading, router]);

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

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
