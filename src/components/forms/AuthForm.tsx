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
      <div className="grid p-0 md:grid-cols-2 md:px-6">
        {isSignUp ? <SignUpForm /> : <SignInForm />}
        <div className="bg-muted relative hidden md:block">
          <div className="absolute inset-0 h-full w-full">
            <Image
              src="https://cendlos.gov.gh/training/wp-content/uploads/2024/10/What-is-Artiificial-IntelligenceAI.webp"
              alt="AI Background"
              fill
              priority
              className="object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
