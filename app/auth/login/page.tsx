import LoginForm from "@/components/auth/login-form";
import ReturnButton from "@/components/general/return-button";


export default function Login() {
  return (
        <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
          <div className="space-y-8">
            <ReturnButton href="/" label="Home" />
            <h1 className="text-2xl font-bold">Login</h1>
          </div>
            <LoginForm />
        </div>
    
  )
}
