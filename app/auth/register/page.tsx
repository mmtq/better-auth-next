import RegisterForm from "@/components/auth/register-form";
import ReturnButton from "@/components/general/return-button";

export default function Register() {
  return (
    <main className="min-h-screen flex items-center justify-center py-2 px-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <ReturnButton href="/" label="Home" />
        <RegisterForm />
      </div>
    </main>

  )
}
