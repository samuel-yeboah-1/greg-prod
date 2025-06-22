"use client";
import { AuthForm } from "@/components/forms/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect } from "react";

function SignIn() {
  const auth = useAuth();

  // Debug logging
  useEffect(() => {
    console.log("SignIn page - Auth state:", {
      isAuthenticated: auth.isAuthenticated,
      isLoading: auth.isLoading,
      hasUser: !!auth.user,
      user: auth.user,
    });

    // Check localStorage
    const token = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");
    console.log("SignIn page - Storage state:", {
      hasToken: !!token,
      tokenLength: token?.length,
      hasStoredUser: !!storedUser,
      storedUser: storedUser ? JSON.parse(storedUser) : null,
    });
  }, [auth]);

  return (
    <div>
      {/* Temporary debug info - remove this in production */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          background: "black",
          color: "white",
          padding: "10px",
          fontSize: "12px",
          zIndex: 9999,
        }}
      >
        Auth: {auth.isAuthenticated ? "YES" : "NO"} | Loading:{" "}
        {auth.isLoading ? "YES" : "NO"} | User: {auth.user ? "YES" : "NO"}
      </div>

      <AuthForm />
    </div>
  );
}

export default SignIn;
