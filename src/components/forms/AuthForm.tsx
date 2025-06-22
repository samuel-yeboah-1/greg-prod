"use client";
import { usePathname } from "next/navigation";
import { SignInForm } from "@/components/forms/SigninForm";
import { SignUpForm } from "@/components/forms/SignupForm";
import Image from "next/image";

export function AuthForm() {
  const pathname = usePathname();
  const currentPath = pathname.trim().split("/").at(-1);
  const isSignUp = currentPath === "signup";

  return (
    <div className="overflow-hidden p-0 flex items-center justify-center">
      <div className="grid p-0  md:px-6">
        {isSignUp ? <SignUpForm /> : <SignInForm />}
      </div>
    </div>
  );
}
