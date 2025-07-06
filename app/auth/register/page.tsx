'use client'
import RegisterForm from "@/components/auth/register-form";
import ProviderButton from "@/components/general/porvider-button";
import ReturnButton from "@/components/general/return-button";

export default function Register() {
  return (
    <main className="min-h-screen flex items-center justify-center py-2 px-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <ReturnButton href="/" label="Home" />
        <RegisterForm />
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
          <ProviderButton name="google" signIn={false} />
          <ProviderButton name="github" signIn={false} />
        </div>

      </div>
    </main>

  )
}
