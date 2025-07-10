'use client'
import RegisterForm from "@/components/auth/register-form";
import ProviderButton from "@/components/general/porvider-button";
import ReturnButton from "@/components/general/return-button";

export default function Register() {
  return (
    <main className="flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <ReturnButton href="/" label="Home" />
        <RegisterForm />
      </div>
    </main>

  )
}
