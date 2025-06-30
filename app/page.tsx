import SignOutButton from "@/components/auth/sign-out-button";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          {user ? `Welcome, ${user.name}!` : "Welcome to Our Platform"}
        </h1>

        <p className="text-gray-600 text-lg md:text-xl">
          {user
            ? "You're logged in. Get started by exploring your dashboard or managing your profile."
            : "Create your account or log in to access powerful tools and features."}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          {user ? (
            <>
              <Link href="/profile">
                <Button>Go to Profile</Button>
              </Link>
              <form action="/api/auth/signout" method="post">
                <SignOutButton />
              </form>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button>Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="outline">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
