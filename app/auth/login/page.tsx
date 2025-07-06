'use client';
import LoginForm from "@/components/auth/login-form";
import ProviderButton from "@/components/general/porvider-button";
import ReturnButton from "@/components/general/return-button";

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <ReturnButton href="/" label="Home" />
        <LoginForm />
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
          <ProviderButton name="google" signIn={true} />
          <ProviderButton name="github" signIn={true} />
        </div>
      </div>
    </main>
  );
}
