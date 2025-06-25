import RegisterForm from "@/components/auth/register-form";
import ReturnButton from "@/components/general/return-button";

export default function Register() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/" label="Home" />
        <h1 className="text-2xl font-bold">Register</h1>
      </div>

      <RegisterForm />
    </div>
  )
}
