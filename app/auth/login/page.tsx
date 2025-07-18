'use client';
import LoginForm from "@/components/auth/login-form";
import ProviderButton from "@/components/general/porvider-button";
import ReturnButton from "@/components/general/return-button";

export default function Login() {
  return (
    <div className="flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <ReturnButton href="/" label="Home" />
        <LoginForm />
      </div>
    </div>
  );
}
